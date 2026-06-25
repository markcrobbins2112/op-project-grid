// ==========================================
// START OF FILE: ui.js
// ==========================================

const UiDropdown = require('./ui-dropdown');
const UiRow = require('./ui-row');

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
    filterInput.type = 'text';
    filterInput.placeholder = 'Filter notes...';
    filterInput.className = 'projectgrid-filter-input';

    const clearButton = document.createElement('span');
    clearButton.className = 'projectgrid-clear-btn';
    clearButton.innerHTML = '✕';

    filterContainer.appendChild(filterInput);
    filterContainer.appendChild(clearButton);
    noteHeaderCell.appendChild(filterContainer);

    filterInput.addEventListener('focus', () => {
      this.activeInputTarget = filterInput;
      if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(filterInput);
    });
    filterInput.addEventListener('blur', () => {
      this.activeInputTarget = null;
      if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(null);
    });

    // FIX: Dynamically wire up parent container scroller hooks right as the dashboard renders
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
      if (!el) {
        el = document.createElement('div');
        el.id = p.id;
        el.className = p.class;
        document.body.appendChild(el);
      }

      window[p.winFunc] = (targetElement) => {
        self[p.targetRef] = targetElement;
        if (!targetElement) { el.style.display = 'none'; return; }
        const rect = targetElement.getBoundingClientRect();
        Object.assign(el.style, {
          display: 'block', top: `${rect.top}px`, left: `${rect.left}px`,
          width: `${rect.width}px`, height: `${rect.height}px`
        });
      };
    });

    window.ProjectGridForceOverlayRecalc = () => {
      portals.forEach(p => {
        const liveTarget = self[p.targetRef];
        let el = document.getElementById(p.id);
        if (liveTarget && el && el.style.display === 'block') {
          const rect = liveTarget.getBoundingClientRect();
          el.style.top = `${rect.top}px`;
          el.style.left = `${rect.left}px`;
          el.style.width = `${rect.width}px`;
          el.style.height = `${rect.height}px`;
        }
      });
    };
  },

  // FIX: TRACK OBSIDIAN INTERNAL SCROLL CONTAINERS DIRECTLY VIA DOM HEURISTICS
  bindInteriorScrollListeners(elementContext) {
    if (!elementContext) return;
    
    // Climb up the DOM tree to find Obsidian note preview scroll parents (.cm-scroller or markdown view panels)
    const obsidianScroller = elementContext.closest('.cm-scroller') || 
                             elementContext.closest('.markdown-preview-view') || 
                             elementContext.closest('.markdown-rendered');

    if (obsidianScroller) {
      // Bind live reposition rules to the exact panel handling your scroll wheels
      obsidianScroller.removeEventListener('scroll', window.ProjectGridForceOverlayRecalc);
      obsidianScroller.addEventListener('scroll', window.ProjectGridForceOverlayRecalc, { passive: true });
    }

    // Attach a backup ResizeObserver to handle pane splitting, dragging, or structural folding jumps safely
    if (this.observerRef) this.observerRef.disconnect();
    this.observerRef = new ResizeObserver(() => {
      if (window.ProjectGridForceOverlayRecalc) window.ProjectGridForceOverlayRecalc();
    });
    
    const tableParent = elementContext.closest('table') || elementContext.parentElement;
    if (tableParent) this.observerRef.observe(tableParent);
  },

  buildHeaderDropup(titleIcon, key, defaults, rowsArray) {
    return UiDropdown.buildHeaderDropup(titleIcon, key, defaults, rowsArray);
  },

  buildRow(folder, absoluteVaultRoot, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput) {
    return UiRow.buildRow(folder, absoluteVaultRoot, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput);
  }
};

// ==========================================
// END OF FILE: ui.js
// ==========================================
