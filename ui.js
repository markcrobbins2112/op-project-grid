// ==========================================
// START OF FILE: ui.js
// ==========================================

const UiDropdown = require('./ui-dropdown');
const UiRow = require('./ui-row');
const GridConfig = require('./grid-config');

module.exports = {
  activeInputTarget: null, 
  activeRowTarget: null, 
  activeFocusTarget: null, 
  observerRef: null,

  generateHeaderCell() {
    this.ensureThreePortalsExist();

    const noteHeaderCell = document.createElement('th');
    noteHeaderCell.style.width = '25%';
    
    const filterContainer = document.createElement('div');
    filterContainer.className = 'projectgrid-filter-wrapper';

    const filterInput = document.createElement('input');
    filterInput.type = 'text'; filterInput.placeholder = 'Filter notes...';
    filterInput.className = 'projectgrid-filter-input';

    const clearButton = document.createElement('span');
    clearButton.className = 'projectgrid-clear-btn'; clearButton.innerHTML = '✕';

    filterContainer.appendChild(filterInput); filterContainer.appendChild(clearButton);
    noteHeaderCell.appendChild(filterContainer);

    filterInput.addEventListener('focus', () => {
      this.activeInputTarget = filterInput;
      if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(filterInput);
      if (window.ProjectGridTriggerTutorHelpBoxRedraw) window.ProjectGridTriggerTutorHelpBoxRedraw(filterInput, 'search-input');
    });
    filterInput.addEventListener('blur', () => {
      this.activeInputTarget = null;
      if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(null);
      if (window.ProjectGridTriggerTutorHelpBoxRedraw) window.ProjectGridTriggerTutorHelpBoxRedraw(null);
    });

    setTimeout(() => this.bindInteriorScrollListeners(filterInput), 50);
    return { cell: noteHeaderCell, input: filterInput, clearBtn: clearButton };
  },

  ensureThreePortalsExist() {
    const self = this;
    const portals = [
      { id: 'projectgrid-global-focus-overlay', class: 'projectgrid-focus-overlay-portal', winFunc: 'ProjectGridUpdateFocusOverlay', targetRef: 'activeFocusTarget' },
      { id: 'projectgrid-global-input-overlay', class: 'projectgrid-input-overlay-portal', winFunc: 'ProjectGridUpdateInputOverlay', targetRef: 'activeInputTarget' },
      { id: 'projectgrid-global-row-overlay', class: 'projectgrid-row-overlay-portal', winFunc: 'ProjectGridUpdateRowOverlay', targetRef: 'activeRowTarget' }
    ];

    portals.forEach(p => {
      let el = document.getElementById(p.id);
      if (!el) { el = document.createElement('div'); el.id = p.id; el.className = p.class; document.body.appendChild(el); }
      window[p.winFunc] = (targetElement) => {
        self[p.targetRef] = targetElement;
        if (!targetElement) { el.style.display = 'none'; return; }
        const rect = targetElement.getBoundingClientRect();
        Object.assign(el.style, { display: 'block', top: `${rect.top}px`, left: `${rect.left}px`, width: `${rect.width}px`, height: `${rect.height}px` });
      };
    });

    let hud = document.getElementById('projectgrid-tutor-hud-overlay');
    if (!hud) {
      hud = document.createElement('div'); hud.id = 'projectgrid-tutor-hud-overlay';
      hud.className = 'projectgrid-tutor-tooltip-portal'; document.body.appendChild(hud);
    }

    const tutorShortcutsMap = {
      'search-input': { title: '⌨️ Search Field Focus', keys: '• Type: Filter project titles<br>• ScrollLock: Toggle Command Picker Menu<br>• ArrowDown: Navigate matrix grid notes' }
    };

    // FIX: Fall back to global scope reference check to bridge hidden closure walls
    const activeConfig = globalThis.GridConfig || GridConfig;

    if (activeConfig && activeConfig.columns) {
      activeConfig.columns.forEach(col => {
        if (col.tutorKeys) {
          tutorShortcutsMap[col.key] = { title: `${col.icon} ${col.label} View Box`, keys: col.tutorKeys };
        }
      });
    }

    window.ProjectGridTriggerTutorHelpBoxRedraw = (targetElement, contextKey) => {
      if (!window.ProjectGridTutorModeActive || !targetElement || !contextKey || !tutorShortcutsMap[contextKey]) {
        if (hud) hud.style.display = 'none'; return;
      }
      const data = tutorShortcutsMap[contextKey];
      hud.innerHTML = `<div class="projectgrid-tutor-heading">${data.title}</div><div class="projectgrid-tutor-shortcut">${data.keys}</div>`;
      
      const rect = targetElement.getBoundingClientRect();
      Object.assign(hud.style, {
        display: 'block', left: `${rect.left}px`,
        top: `${rect.bottom + window.scrollY + 6}px`
      });
    };

    window.ProjectGridForceOverlayRecalc = () => {
      portals.forEach(p => {
        const liveTarget = self[p.targetRef]; let el = document.getElementById(p.id);
        if (liveTarget && el && el.style.display === 'block') {
          const rect = liveTarget.getBoundingClientRect();
          Object.assign(el.style, { top: `${rect.top}px`, left: `${rect.left}px`, width: `${rect.width}px`, height: `${rect.height}px` });
        }
      });
      if (window.ProjectGridTutorModeActive && hud && hud.style.display === 'block') {
        const activeNode = self.activeFocusTarget || self.activeInputTarget;
        if (activeNode) { const r = activeNode.getBoundingClientRect(); hud.style.left = `${r.left}px`; hud.style.top = `${r.bottom + window.scrollY + 6}px`; }
      }
    };
  },

  bindInteriorScrollListeners(elementContext) {
    if (!elementContext) return;
    const scroller = elementContext.closest('.cm-scroller') || elementContext.closest('.markdown-preview-view') || elementContext.closest('.markdown-rendered');
    if (scroller) {
      scroller.removeEventListener('scroll', window.ProjectGridForceOverlayRecalc);
      scroller.addEventListener('scroll', window.ProjectGridForceOverlayRecalc, { passive: true });
    }
    if (this.observerRef) this.observerRef.disconnect();
    this.observerRef = new ResizeObserver(() => { if (window.ProjectGridForceOverlayRecalc) window.ProjectGridForceOverlayRecalc(); });
    const tableParent = elementContext.closest('table') || elementContext.parentElement;
    if (tableParent) this.observerRef.observe(tableParent);
  },

  buildHeaderDropup(titleIcon, key, defaults, rowsArray) { 
    const targetInstance = globalThis.UiDropdown || UiDropdown;
    return targetInstance.buildHeaderDropup(titleIcon, key, defaults, rowsArray); 
  },
  buildRow(folder, absoluteVaultRoot, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput) { 
    return UiRow.buildRow(folder, absoluteVaultRoot, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput); 
  }
};

// ==========================================
// END OF FILE: ui.js
// ==========================================
