// ==========================================
// START OF FILE: _main.js
// ==========================================

const { Plugin } = require('obsidian');
const StylesManager = (function() {
const StylesCore = (function() {
return {
    getCoreStyles() {
      return `
        .cm-embed-block:has(.projectgrid-matrix-table),
        .block-language-projectgrid {
          max-width: 100% !important;
          width: 100% !important;
          grid-column: 1 / -1 !important;
        }
        .projectgrid-matrix-table {
          width: 100% !important;
          border-collapse: collapse !important;
          margin-top: 6px !important;
          margin-bottom: 12px !important;
          font-size: 11px !important;
          line-height: 1.4 !important;
          position: relative !important;
        }
        .projectgrid-matrix-table th {
          font-weight: 600 !important;
          color: var(--text-muted, #888888) !important;
          border-bottom: 2px solid var(--background-modifier-border, #3a3a3a) !important;
          padding: 6px 4px !important;
          vertical-align: middle;
          position: relative !important;
          text-align: center !important;
        }
        .projectgrid-matrix-table th:first-child {
          text-align: left !important;
        }
  
        /* FIX: CELL PADDING REDUCED BY 40% TO FORCE ABSOLUTE COMPRESSION TO DATE COLUMNS BOUNDARIES */
        .projectgrid-timestamp-scaled-td {
          font-size: 8px !important; 
          text-align: center !important;
          white-space: nowrap !important;
          width: 1% !important; 
          padding: 6px 2px !important; /* Horizontally squashes track borders tighter around text values */
          color: var(--text-muted) !important;
        }
  
        .projectgrid-uniform-yaml-th,
        .projectgrid-uniform-yaml-td {
          width: 62px !important;
          min-width: 62px !important;
          max-width: 62px !important;
          text-align: center !important;
          box-sizing: border-box !important;
        }
  
        .projectgrid-filter-wrapper {
          position: relative !important;
          display: flex !important;
          align-items: center !important;
          width: 100% !important;
        }
        .projectgrid-filter-input {
          width: 100% !important;
          padding: 4px 24px 4px 8px !important;
          font-size: 11px !important;
          border-radius: 4px !important;
          border: 1px solid var(--background-modifier-border, #3a3a3a) !important;
          background-color: var(--background-primary, #1e1e1e) !important;
          color: var(--text-normal, #ffffff) !important;
          height: 24px !important;
          outline: none !important;
          box-shadow: none !important;
        }
        .projectgrid-filter-input:focus {
          background-color: var(--background-primary, #1e1e1e) !important;
          border-color: var(--background-modifier-border, #3a3a3a) !important;
          outline: none !important;
          box-shadow: none !important;
        }
        
        .projectgrid-clear-btn {
          position: absolute !important;
          right: 8px !important;
          cursor: pointer !important;
          color: var(--text-muted, #888888) !important;
          font-size: 10px !important;
          visibility: hidden;
          user-select: none !important;
        }
        .projectgrid-clear-btn:hover { color: var(--text-accent, #70a1ff) !important; }
  
        .projectgrid-matrix-cell { padding: 6px 4px !important; vertical-align: middle !important; }
        .note-title-cell { font-weight: 500 !important; white-space: nowrap !important; }
        .projectgrid-matrix-link { text-decoration: none !important; }
        .projectgrid-matrix-link:hover { text-decoration: none !important; }
        .action-icon-cell { text-align: center !important; }
        .action-icon-cell a { text-decoration: none !important; }
        .action-icon-cell a:hover { text-decoration: none !important; }
        .projectgrid-aip-icon-btn.is-vault-missing { opacity: 0.15 !important; }
        .projectgrid-empty-warning-message { font-size: 12px !important; color: var(--text-muted, #888888) !important; font-style: italic !important; }
      `;
    }
  };
})();
const StylesAnimation = (function() {
return {
    getAnimationStyles() {
      return `
        @keyframes projectgrid-master-hue-spin {
          0% { border-color: #ff4757; filter: hue-rotate(0deg); }
          100% { border-color: #ff4757; filter: hue-rotate(360deg); }
        }
  
        /* STRICT LAYER OVERRIDES: FORCES THE ROW INDICATOR TO STAY AS THE LOWEST LAYER UNDER THE MENU PANELS */
        .projectgrid-focus-overlay-portal,
        .projectgrid-input-overlay-portal,
        .projectgrid-row-overlay-portal {
          position: fixed !important;
          pointer-events: none !important;
          box-sizing: border-box !important;
          border: 2px solid #ff4757 !important;
          border-radius: 4px !important;
          display: none;
          animation: projectgrid-master-hue-spin 3s linear infinite !important;
        }
        
        /* Stacking Layer 1: Topmost overlay for all list selection tracking */
        .projectgrid-focus-overlay-portal {
          z-index: 999999 !important;
        }
        
        /* Stacking Layer 2: Middle overlay for text fields and filter headers */
        .projectgrid-input-overlay-portal {
          z-index: 999998 !important;
        }
        
        /* FIX: BASE LAYER SET TO LOWEST TRACKING STATE SO POPUPS FLOAT HIGHER NATIVELY */
        .projectgrid-row-overlay-portal {
          z-index: 10 !important; 
        }
  
        .projectgrid-matrix-row {
          border-bottom: 1px solid var(--background-modifier-border, #2a2a2a) !important;
          position: relative !important;
          box-sizing: border-box !important;
        }
        .projectgrid-matrix-row:hover { background-color: transparent !important; }
      `;
    }
  };
})();
const StylesComponents = (function() {
return {
    getComponentStyles() {
      return `
        /* INTERACTIVE BUTTON DASHBOARD TOOLBAR */
        .projectgrid-toolbar {
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
          width: 100% !important;
          background-color: var(--background-secondary, #1e1e1e) !important;
          border: 1px solid var(--background-modifier-border, #2e2e2e) !important;
          border-radius: 6px 6px 0 0 !important;
          padding: 6px 8px !important;
          box-sizing: border-box !important;
        }
        .projectgrid-toolbar-btn {
          background: transparent !important;
          border: none !important;
          cursor: pointer !important;
          font-size: 14px !important;
          padding: 4px !important;
          border-radius: 4px !important;
          outline: none !important;
          user-select: none !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .projectgrid-toolbar-btn:hover {
          background-color: var(--background-modifier-hover, rgba(255,255,255,0.04)) !important;
        }
  
        .projectgrid-header-dropup-trigger {
          cursor: pointer !important;
          display: inline-block !important;
          padding: 4px 2px !important;
          border-radius: 4px !important;
          user-select: none !important;
          font-size: 13px !important;
          width: 100% !important;
          box-sizing: border-box !important;
          outline: none !important;
          border: 2px solid transparent !important;
        }
        .projectgrid-header-dropup-trigger:hover { background-color: transparent !important; }
  
        /* MENU PANELS FLOAT HIGH ABOVE ALL ROW INDICATORS NATIVELY */
        .projectgrid-dropup-panel {
          display: flex !important;
          flex-direction: column !important; 
          background-color: var(--background-secondary, #1a1a1a) !important;
          border: 1px solid var(--background-modifier-border, #3d3d3d) !important;
          border-radius: 6px !important;
          padding: 6px !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.45) !important;
          min-width: 125px !important;
          max-height: 260px !important;
          overflow-y: auto !important;
          box-sizing: border-box !important;
          z-index: 600000 !important; 
        }
        
        /* UN-FOCUSABLE UN-CLICKABLE LABELS FOR DESCRIPTION ENHANCEMENTS */
        .projectgrid-dropup-header-title {
          font-size: 10px !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          color: var(--text-accent, #70a1ff) !important;
          padding: 4px 6px !important;
          border-bottom: 1px dashed var(--background-modifier-border, #3d3d3d) !important;
          margin-bottom: 4px !important;
          user-select: none !important;
          pointer-events: none !important;
        }
  
        .projectgrid-dropup-option {
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
          padding: 4px 6px !important;
          cursor: pointer !important;
          user-select: none !important;
          color: var(--text-normal, #ffffff) !important;
          font-size: 11px !important;
          box-sizing: border-box !important;
          width: 100% !important;
          border: 2px solid transparent !important;
          background-color: transparent !important;
        }
        .projectgrid-dropup-option:hover { background-color: transparent !important; }
        .projectgrid-dropup-option input[type="checkbox"] { margin: 0 !important; cursor: pointer !important; }
  
        .projectgrid-custom-select-btn {
          background-color: var(--background-secondary, #252525) !important;
          color: var(--text-normal, #dddddd) !important;
          border: 1px solid var(--background-modifier-border, #3d3d3d) !important;
          border-radius: 4px !important;
          padding: 4px 2px !important;
          font-size: 11px !important;
          width: 100% !important;
          box-sizing: border-box !important;
          display: inline-block !important;
          cursor: pointer !important;
          position: relative !important;
          user-select: none !important;
          text-align: center !important;
          text-overflow: ellipsis !important;
          overflow: hidden !important;
          white-space: nowrap !important;
        }
  
        .projectgrid-custom-dropdown-list {
          display: flex !important;
          flex-direction: column !important;
          background-color: var(--background-secondary, #202020) !important;
          border: 1px solid var(--background-modifier-border, #3d3d3d) !important;
          border-radius: 4px !important;
          margin: 4px 0 0 0 !important;
          padding: 4px 0 !important;
          list-style: none !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25) !important;
          box-sizing: border-box !important;
          z-index: 600000 !important; 
        }
        .projectgrid-custom-dropdown-item {
          padding: 4px 4px !important;
          cursor: pointer !important;
          color: var(--text-normal) !important;
          text-align: center !important;
          font-size: 11px !important;
          box-sizing: border-box !important;
          width: 100% !important;
          border: 2px solid transparent !important;
          background-color: transparent !important;
        }
  
        .projectgrid-command-picker {
          position: fixed !important; 
          background-color: var(--background-secondary, #1e1e1e) !important;
          border: 1px solid #3d3d3d !important; 
          border-radius: 6px !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5) !important;
          padding: 6px !important;
          min-width: 220px !important;
          box-sizing: border-box !important;
          z-index: 650000 !important; 
        }
        .projectgrid-picker-item {
          padding: 6px 10px !important;
          cursor: pointer !important;
          border-radius: 4px !important;
          color: var(--text-normal, #ffffff) !important;
          font-size: 12px !important;
          box-sizing: border-box !important;
          border: 2px solid transparent !important; 
          background-color: transparent !important; 
        }
        /* HIGH PRIORITIZED PORTAL DISPLAY PANEL FOR DASHBOARD INLINE CHECKBOXES TASKS OVERLAY LISTS */
        .projectgrid-wide-tasks-portal {
            display: flex !important;
            flex-direction: column !important;
            background-color: var(--background-secondary, #1a1a1a) !important;
            border: 2px solid var(--text-accent, #70a1ff) !important;
            border-radius: 6px !important;
            padding: 8px !important;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6) !important;
            z-index: 700000 !important; /* Floats above standard filters choice panels layout context layers */
            box-sizing: border-box !important;
        }
        /* HIGH CONTRAST NON-INTERACTIVE FLOATING TUTOR HUD OVERLAY PANEL */
        .projectgrid-tutor-tooltip-portal {
            position: fixed !important;
            background-color: #1a1a2e !important;
            border: 2px solid var(--text-accent, #70a1ff) !important;
            border-radius: 6px !important;
            padding: 8px 12px !important;
            box-shadow: 0 10px 32px rgba(0, 0, 0, 0.75) !important;
            z-index: 999999 !important; /* Floats above everything */
            pointer-events: none !important; /* Click-through transparency */
            max-width: 280px !important;
            display: none;
            box-sizing: border-box !important;
        }
        .projectgrid-tutor-heading {
            font-size: 10px !important;
            font-weight: 700 !important;
            text-transform: uppercase !important;
            color: #ff4757 !important;
            margin-bottom: 4px !important;
            border-bottom: 1px dashed rgba(255,255,255,0.15) !important;
            padding-bottom: 2px !important;
        }
        .projectgrid-tutor-shortcut {
            font-size: 10px !important;
            color: #ffffff !important;
            line-height: 1.4 !important;
            font-family: var(--font-monospace) !important;
        }

      `;
    }
  };
})();

return {
  injectStyles() {
    if (document.getElementById('obsidian-projectgrid-styles')) return;

    const styleEl = document.createElement('style');
    styleEl.id = 'obsidian-projectgrid-styles';

    // Concatenate your isolated logical modules sequentially into the template rule
    styleEl.innerHTML = 
      StylesCore.getCoreStyles() + 
      StylesAnimation.getAnimationStyles() + 
      StylesComponents.getComponentStyles();

    document.head.appendChild(styleEl);
  }
};
})();
const FilterManager = (function() {
const MenuCore = (function() {
const MenuState = (function() {
const MenuStateSort = (function() {
return {
    activeSortChain: [],
  
    executeDynamicSortChain(rowsArray) {
      this.updateToolbarLabel();
      window.ProjectGridActiveSortChainList = this.activeSortChain;
  
      const liveTableBody = document.querySelector('.projectgrid-matrix-table tbody');
      if (!liveTableBody || !rowsArray || rowsArray.length === 0) {
        if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
        return;
      }
  
      if (this.activeSortChain.length === 0) {
        rowsArray.sort((a, b) => String(a.searchText || '').localeCompare(String(b.searchText || '')));
      } else {
        rowsArray.sort((rowA, rowB) => {
          const valsA = rowA.yamlMetadataValues || {}; const valsB = rowB.yamlMetadataValues || {};
          const datesA = rowA.folderDatesValues || {}; const datesB = rowB.folderDatesValues || {};
          const launchersA = rowA.launcherValues || {}; const launchersB = rowB.launcherValues || {};
          
          const mergedA = { ...valsA, ...datesA, ...launchersA }; 
          const mergedB = { ...valsB, ...datesB, ...launchersB };
  
          for (let i = 0; i < this.activeSortChain.length; i++) {
            const currentKey = this.activeSortChain[i];
            let valA = ''; let valB = '';
  
            if (currentKey === 'created' || currentKey === 'updated') {
              valA = String(datesA[currentKey] || ''); valB = String(datesB[currentKey] || '');
            } else if (currentKey === 'tasks') {
              const taskStrA = String(launchersA['tasks'] || '0/0').split('/');
              const taskStrB = String(launchersB['tasks'] || '0/0').split('/');
              valA = String(taskStrA[0] || '0').padStart(5, '0');
              valB = String(taskStrB[0] || '0').padStart(5, '0');
            } else if (currentKey === 'tagcount') {
              const tagStrA = String(valsA['tags'] || '⬛'); const tagStrB = String(valsB['tags'] || '⬛');
              const countA = (tagStrA === '⬛' || tagStrA.trim() === '') ? 0 : tagStrA.split(',').length;
              const countB = (tagStrB === '⬛' || tagStrB.trim() === '') ? 0 : tagStrB.split(',').length;
              valA = String(countA).padStart(5, '0'); valB = String(countB).padStart(5, '0');
            } else {
              valA = String(mergedA[currentKey] || '').replace(/[^\w]/g, '');
              valB = String(mergedB[currentKey] || '').replace(/[^\w]/g, '');
            }
  
            if (valA !== valB) {
              return valB.localeCompare(valA, undefined, { numeric: true, sensitivity: 'base' });
            }
          }
          return 0;
        });
      }
  
      rowsArray.forEach(row => { if (row.element) liveTableBody.appendChild(row.element); });
      window.ProjectGridTriggerSortReRun = () => this.executeDynamicSortChain(rowsArray);
      if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
    },
  
    updateToolbarLabel() {
      const indicator = document.getElementById('projectgrid-sort-toolbar-label'); if (!indicator) return;
      if (this.activeSortChain.length === 0) {
        indicator.textContent = '📶 Default Directory Sort Order'; indicator.style.color = 'var(--text-muted)';
      } else {
        const formattedChain = this.activeSortChain.map((k, idx) => {
          let symbol = '🟢'; if (idx === 1) symbol = '🟡'; if (idx === 2) symbol = '🔴'; 
          return `${symbol}${k.toUpperCase()}`;
        }).join(' ➔ ');
        indicator.textContent = `📶 Sort Chain: ${formattedChain}`; indicator.style.color = 'var(--text-accent)';
      }
    }
  };
})();
const MenuStateUtils = (function() {
return {
    openHeaderDropup(key) {
      const trigger = document.querySelector(`.projectgrid-header-dropup-trigger[data-key="${key}"]`);
      if (trigger) {
        // Cleanly destroy active pickers to decouple focus loops
        const activePicker = document.querySelector('.projectgrid-command-picker');
        if (activePicker) activePicker.remove();
  
        // FIX: ROUTE THROUGH ANIMATION TIMERS TO GUARANTEE CONTEXT BOOT STRAP STABILITY
        requestAnimationFrame(() => {
          const mousedownEvent = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
          trigger.dispatchEvent(mousedownEvent);
          
          setTimeout(() => {
            const activePanel = document.querySelector('.projectgrid-dropup-panel');
            if (activePanel) {
              activePanel.tabIndex = 0;
              activePanel.focus();
            }
          }, 50);
        });
      }
    },
  
    focusRowCell(rowObj, cellIndex) {
      if (!rowObj || !rowObj.element) return alert('Highlight a row project using arrow keys first.');
      const activePicker = document.querySelector('.projectgrid-command-picker');
      if (activePicker) activePicker.remove();
  
      const targetCell = rowObj.element.children[cellIndex];
      const interactive = targetCell ? targetCell.querySelector('.projectgrid-custom-select-btn, .projectgrid-tags-cell-btn, .projectgrid-tasks-trigger-btn, a, input') : null;
      if (interactive) {
        interactive.focus();
      }
    },
  
    fireProtocol(rowObj, protocol) {
      if (!rowObj || !rowObj.element) return alert('Highlight a row project using arrow keys first.');
      const linkEl = rowObj.element.querySelector(`a[href^="aip://${protocol}"]`);
      if (linkEl) window.location.href = linkEl.getAttribute('href');
    },
  
    clearAllSystemFilters(filterInput) {
      filterInput.value = '';
      document.querySelectorAll('.projectgrid-dropup-panel input[type="checkbox"]').forEach(cb => cb.checked = true);
      if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
      filterInput.focus();
    },
  
    reloadActiveAppWorkspace() {
      const activeLeaf = window.app.workspace.getActiveViewOfType(require('obsidian').MarkdownView);
      if (activeLeaf) activeLeaf.previewMode?.rerender(true);
    }
  };
})();

return {
  get activeSortChain() { return MenuStateSort.activeSortChain; },
  set activeSortChain(val) { MenuStateSort.activeSortChain = val; },

  getMenuSchema(filterInput, rowsArray, containerElement, closeMenuCallback) {
    const activeRow = rowsArray.find(row => row.element && row.element.classList.contains('projectgrid-row-focused'));

    const sortingFields = [
      { key: 'tasks', label: 'Tasks Todo', icon: '🔧' },
      { key: 'created', label: 'Created Date', icon: '🆕' },
      { key: 'updated', label: 'Updated Date', icon: '🆙' },
      { key: 'tagcount', label: 'Tag Count', icon: '🏷️' },
      { key: 'stars', label: 'Stars', icon: '⭐' },
      { key: 'value', label: 'Value', icon: '💲' },
      { key: 'size', label: 'Size', icon: '🐘' },
      { key: 'depth', label: 'Depth', icon: '🎱' },
      { key: 'priority', label: 'Priority', icon: '🏅' },
      { key: 'status', label: 'Status', icon: '🚦' },
      { key: 'lang', label: 'Lang', icon: '🔤' },
      { key: 'target', label: 'Target', icon: '🎯' }
    ];

    const sortMenuItems = [
      { name: '✕ Clear All Sort Chains', action: () => this.clearSortPipeline(rowsArray) }
    ];

    sortingFields.forEach(field => {
      const chainIndex = this.activeSortChain.indexOf(field.key);
      let prefix = '⚫ ';
      if (chainIndex === 0) prefix = '🟢 ';
      else if (chainIndex === 1) prefix = '🟡 ';
      else if (chainIndex === 2) prefix = '🔴 ';

      sortMenuItems.push({
        name: `${prefix}${field.icon} ${field.label}`,
        action: () => this.handleSortChainClick(field.key, rowsArray)
      });
    });

    return [
      {
        name: '📁 Filters',
        items: sortingFields.slice(4).map(f => ({ name: `${f.icon} ${f.label} Filter`, action: () => MenuStateUtils.openHeaderDropup(f.key) }))
      },
      {
        name: '📊 Columns',
        items: [
          { name: '🔧 Tasks Column', action: () => MenuStateUtils.focusRowCell(activeRow, 1) },
          { name: '🏷️ Tags Column', action: () => MenuStateUtils.focusRowCell(activeRow, 6) },
          ...sortingFields.slice(4).map((f, i) => ({ name: `${f.icon} ${f.label} Column`, action: () => MenuStateUtils.focusRowCell(activeRow, 7 + i) }))
        ]
      },
      {
        name: '🚀 Launch',
        items: [
          { name: '📁 Directory Opus', action: () => MenuStateUtils.fireProtocol(activeRow, 'dopus') },
          { name: '💻 Cursor Editor', action: () => MenuStateUtils.fireProtocol(activeRow, 'cursor') },
          { name: '💜 Obsidian Vault', action: () => MenuStateUtils.fireProtocol(activeRow, 'obsidian') }
        ]
      },
      { name: '📶 Sort', items: sortMenuItems },
      {
        name: '⚙️ System',
        items: [
          { name: '✕ Clear All Filters', action: () => MenuStateUtils.clearAllSystemFilters(filterInput) },
          { name: '🔄 Reload Component', action: () => MenuStateUtils.reloadActiveAppWorkspace() }
        ]
      }
    ];
  },

  handleSortChainClick(key, rowsArray) {
    const existingIdx = this.activeSortChain.indexOf(key);
    if (existingIdx > -1) this.activeSortChain.splice(existingIdx, 1);
    else {
      if (this.activeSortChain.length < 3) this.activeSortChain.push(key);
      else { this.activeSortChain.unshift(key); if (this.activeSortChain.length > 3) this.activeSortChain.pop(); }
    }
    MenuStateSort.executeDynamicSortChain(rowsArray);
  },

  clearSortPipeline(rowsArray) {
    this.activeSortChain = []; MenuStateSort.executeDynamicSortChain(rowsArray);
  }
};
})();
const MenuDom = (function() {
return {
    renderPickerBox(filterInput, itemsList, selectedIndex, containerElement, onItemClick, onClose) {
      this.destroyActivePickers(containerElement);
  
      const picker = document.createElement('div');
      picker.className = 'projectgrid-command-picker';
      
      // Position parameters tracking viewports boundary targets cleanly
      const rect = filterInput.getBoundingClientRect();
      picker.style.top = `${rect.bottom + window.scrollY + 4}px`;
      picker.style.left = `${rect.left + window.scrollX}px`;
  
      itemsList.forEach((item, idx) => {
        const el = document.createElement('div');
        el.className = 'projectgrid-picker-item';
        
        // FIX: ENSURE BOTH CONTEXT CLASSES ARE LAYERED ON GENERATION AHEAD OF KEYBOARD SCAN EVENTS
        if (idx === selectedIndex) {
          el.classList.add('projectgrid-picker-highlight');
          el.classList.add('projectgrid-row-focused');
        }
        
        el.textContent = item.name;
  
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          onItemClick(idx);
        });
  
        picker.appendChild(el);
      });
  
      document.body.appendChild(picker); 
  
      const outsideClickListener = (e) => {
        if (!picker.contains(e.target) && e.target !== filterInput) {
          onClose();
          document.removeEventListener('click', outsideClickListener);
        }
      };
      setTimeout(() => document.addEventListener('click', outsideClickListener), 10);
  
      return picker;
    },
  
    destroyActivePickers(containerElement) {
      const existing = document.querySelectorAll('.projectgrid-command-picker');
      existing.forEach(p => p.remove());
      if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
    }
  };
})();

return {
  bindKeyboardEvents(filterInput, rowsArray, containerElement, getVisibleRows, updateFocusIndex) {
    let pickerLevel = 0; // 0 = Closed, 1 = Category Node, 2 = Action Command Item
    let activeItems = [];
    let activeIndex = 0;
    let storedCategoryIndex = 0;
    let activePickerEl = null;

    const closeAllPickers = () => {
      pickerLevel = 0;
      MenuDom.destroyActivePickers(containerElement);
      activePickerEl = null;
      filterInput.focus();
      if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
    };

    window.addEventListener('keydown', (evt) => {
      if (evt.key === 'ScrollLock') {
        evt.preventDefault();
        if (document.activeElement !== filterInput) {
          filterInput.focus();
          filterInput.select();
        } else {
          pickerLevel = 1;
          activeIndex = 0;
          activeItems = MenuState.getMenuSchema(filterInput, rowsArray, containerElement, closeAllPickers);
          renderMenu();
        }
      }
    });

    filterInput.addEventListener('keydown', (evt) => {
      const visibleRows = getVisibleRows();

      if (pickerLevel > 0 && activePickerEl) {
        if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp') {
          evt.preventDefault();
          activeIndex = evt.key === 'ArrowDown' ? ((activeIndex + 1) % activeItems.length) : ((activeIndex - 1 + activeItems.length) % activeItems.length);
          
          const items = activePickerEl.querySelectorAll('.projectgrid-picker-item');
          items.forEach((item, idx) => {
            if (idx === activeIndex) {
              item.classList.add('projectgrid-picker-highlight');
              if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(item);
            } else {
              item.classList.remove('projectgrid-picker-highlight');
            }
          });
          return;
        } else if (evt.key === 'Enter') {
          evt.preventDefault();
          executeSelection();
          return;
        } else if (evt.key === 'Escape') {
          evt.preventDefault();
          if (pickerLevel === 2) {
            pickerLevel = 1;
            activeItems = MenuState.getMenuSchema(filterInput, rowsArray, containerElement, closeAllPickers);
            activeIndex = storedCategoryIndex;
            renderMenu();
          } else {
            closeAllPickers();
          }
          return;
        }
      }

      if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp') {
        if (visibleRows.length === 0) return;
        evt.preventDefault();
        
        let idx = rowsArray.findIndex(r => r.element.classList.contains('projectgrid-row-focused'));
        let visibleIdx = visibleRows.findIndex(r => r.element === rowsArray[idx]?.element);

        if (evt.key === 'ArrowDown') {
          visibleIdx = (visibleIdx + 1) >= visibleRows.length ? 0 : visibleIdx + 1;
        } else {
          visibleIdx = (visibleIdx - 1) < 0 ? visibleRows.length - 1 : visibleIdx - 1;
        }

        updateFocusIndex(visibleIdx);
        const targetRow = visibleRows[visibleIdx].element;
        
        if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(targetRow);
        targetRow.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    });

    const renderMenu = () => {
      activePickerEl = MenuDom.renderPickerBox(filterInput, activeItems, activeIndex, containerElement, (idx) => {
        activeIndex = idx;
        executeSelection();
      }, closeAllPickers);

      setTimeout(() => {
        const activeItem = activePickerEl.querySelector('.projectgrid-picker-highlight');
        if (activeItem && window.ProjectGridUpdateFocusOverlay) {
          window.ProjectGridUpdateFocusOverlay(activeItem);
        }
      }, 10);
    };

    const executeSelection = () => {
      if (pickerLevel === 1) {
        storedCategoryIndex = activeIndex;
        activeItems = activeItems[activeIndex].items;
        pickerLevel = 2;
        activeIndex = 0;
        renderMenu();
      } else if (pickerLevel === 2) {
        // FIX: IF SORT LEVEL 2 ROOT IS ACTIVE, RUN ACTION WITHOUT DESTROYING MENUS PREMATURELY
        const selectedAction = activeItems[activeIndex].action;
        if (selectedAction) {
          selectedAction();
          
          // Re-scaffold schema bounds to instantly render modified 🟢/🟡/🔴 icons states
          const currentCategoryText = storedCategoryIndex === 3 ? '📶 Sort' : '';
          if (currentCategoryText === '📶 Sort') {
            const masterSchema = MenuState.getMenuSchema(filterInput, rowsArray, containerElement, closeAllPickers);
            activeItems = masterSchema[storedCategoryIndex].items;
            renderMenu(); // Re-render updates immediately
            return;
          }
        }
        closeAllPickers();
      }
    };
  }
};
})();

return {
  initializeTableFilter(filterInput, clearButton, rowsArray, containerElement) {
    let currentFocusedIndex = -1;
    let lastTrackedRowElement = null;

    const clearRowHighlights = () => {
      rowsArray.forEach(row => {
        if (row.element && row.element.classList) {
          row.element.classList.remove('projectgrid-row-focused');
        }
      });
    };

    const applyFilter = () => {
      const val = filterInput.value.toLowerCase().trim();
      clearButton.style.visibility = val ? 'visible' : 'hidden';
      clearRowHighlights();
      
      const globalCounts = {};
      const visibleCounts = {};

      rowsArray.forEach(row => {
        const passText = row.searchText.includes(val);
        const passDropdowns = Object.values(row.dropdownFilters || {}).every(status => status === true);
        if (passText && passDropdowns) row.element.style.display = '';
        else row.element.style.display = 'none';
      });

      rowsArray.forEach(row => {
        const metadata = row.yamlMetadataValues || {};
        const launchers = row.launcherValues || {};
        const dates = row.folderDatesValues || {};
        
        const allFields = { ...metadata, ...launchers, ...dates };
        const isRowVisible = row.element.style.display !== 'none';

        Object.keys(allFields).forEach(key => {
          if (!globalCounts[key]) globalCounts[key] = { nonNullTotal: 0 };
          if (!visibleCounts[key]) visibleCounts[key] = { nonNullVisible: 0 };
          const valueStr = String(allFields[key]).trim();
          if (valueStr && valueStr !== '⬛' && valueStr !== '' && valueStr !== '0000.00.00 00' && valueStr !== '0/0') {
            globalCounts[key].nonNullTotal++;
            if (isRowVisible) visibleCounts[key].nonNullVisible++;
          }
        });
      });

      rowsArray.forEach(row => {
        if (!row.element) return;
        const selects = row.element.querySelectorAll('.projectgrid-custom-select-btn:not(.projectgrid-tasks-trigger-btn):not(.projectgrid-tags-cell-btn)');
        selects.forEach(btn => {
          const fIdx = btn.getAttribute('data-field-index');
          const fieldsConfigKeys = ['stars', 'value', 'size', 'depth', 'priority', 'status', 'lang', 'target'];
          const key = fieldsConfigKeys[fIdx];
          if (!key) return;

          const currentVal = row.yamlMetadataValues ? String(row.yamlMetadataValues[key]) : '⬛';
          let valueSpecificVisible = 0; let valueSpecificTotal = 0;

          rowsArray.forEach(r => {
            const rVal = r.yamlMetadataValues ? String(r.yamlMetadataValues[key]) : '⬛';
            if (rVal === currentVal) {
              valueSpecificTotal++;
              if (r.element.style.display !== 'none') valueSpecificVisible++;
            }
          });
          btn.textContent = `${currentVal} ${valueSpecificVisible}/${valueSpecificTotal}`;
        });
      });

      const headerIconsMap = {
        tasks: '🔧', created: '🆕', updated: '🆙', tags: '🏷️', stars: '⭐', 
        value: '💲', size: '🐘', depth: '🎱', priority: '🏅', status: '🚦', lang: '🔤', target: '🎯'
      };

      const activeSortChain = window.ProjectGridActiveSortChainList || [];

      document.querySelectorAll('.projectgrid-header-dropup-trigger').forEach(trigger => {
        const key = trigger.getAttribute('data-key');
        if (!key || !headerIconsMap[key]) return;

        // FIX 3: THE STRIP-AND-REWRITE ENGINE REMOVES ACCIDENTALLY RETAINED MARKERS ON COLUMNS DE-SELECTION
        let baseIcon = headerIconsMap[key];
        const chainIdx = activeSortChain.indexOf(key);
        
        if (chainIdx === 0) baseIcon = '🟢' + baseIcon;
        else if (chainIdx === 1) baseIcon = '🟡' + baseIcon;
        else if (chainIdx === 2) baseIcon = '🔴' + baseIcon;

        let nonNullVis = visibleCounts[key]?.nonNullVisible || 0;
        let nonNullTot = globalCounts[key]?.nonNullTotal || 0;

        if (key === 'tasks' || key === 'created' || key === 'updated') {
          nonNullVis = rowsArray.filter(r => r.element.style.display !== 'none').length;
          nonNullTot = rowsArray.length;
        }

        trigger.textContent = `${baseIcon} ${nonNullVis}/${nonNullTot}`;
      });

      const visibleRows = rowsArray.filter(row => row.element && row.element.style.display !== 'none');
      if (visibleRows.length > 0) {
        if (currentFocusedIndex < 0 || currentFocusedIndex >= visibleRows.length) currentFocusedIndex = 0;
        const finalTargetRow = visibleRows[currentFocusedIndex].element;
        finalTargetRow.classList.add('projectgrid-row-focused');
        lastTrackedRowElement = finalTargetRow;
        if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(finalTargetRow);
      } else {
        currentFocusedIndex = -1; lastTrackedRowElement = null;
        if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(null);
      }

      if (window.ProjectGridForceOverlayRecalc) window.ProjectGridForceOverlayRecalc();
    };

    filterInput.addEventListener('input', applyFilter);

    MenuCore.bindKeyboardEvents(filterInput, rowsArray, containerElement, () => {
      return rowsArray.filter(row => row.element && row.element.style.display !== 'none');
    }, (index) => {
      currentFocusedIndex = index;
      const visibleRows = rowsArray.filter(row => row.element && row.element.style.display !== 'none');
      clearRowHighlights();
      if (visibleRows[index]) {
        visibleRows[index].element.classList.add('projectgrid-row-focused');
        lastTrackedRowElement = visibleRows[index].element;
        if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(visibleRows[index].element);
      }
    });

    clearButton.addEventListener('click', () => {
      filterInput.value = ''; applyFilter(); filterInput.focus();
    });

    window.ProjectGridTriggerFilterUpdate = applyFilter;
    setTimeout(applyFilter, 50);
  }
};
})();
const UiBuilder = (function() {
const UiDropdown = (function() {
return {
    buildHeaderDropup(titleIcon, key, defaults, rowsArray) {
      const th = document.createElement('th');
      th.className = 'projectgrid-uniform-yaml-th';
      
      const trigger = document.createElement('div');
      trigger.className = 'projectgrid-header-dropup-trigger';
      trigger.setAttribute('data-key', key);
      trigger.tabIndex = 0; 
      trigger.textContent = titleIcon;
  
      let activePanel = null;
      let selectionIdx = 0;
      const activeFilters = new Set(defaults);
      const fullOptionsList = ['[ALL]', ...defaults];
      let isOpeningPanel = false;
  
      const closePanel = () => {
        if (activePanel) { activePanel.remove(); activePanel = null; }
        if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
        if (window.ProjectGridTriggerTutorHelpBoxRedraw) window.ProjectGridTriggerTutorHelpBoxRedraw(null);
        document.removeEventListener('mousedown', handleOutsideClickGlobalClosure);
      };
  
      const handleOutsideClickGlobalClosure = (e) => {
        if (activePanel && !activePanel.contains(e.target) && !trigger.contains(e.target)) {
          closePanel();
        }
      };
  
      const openPanel = () => {
        if (activePanel) return;
        isOpeningPanel = true;
        selectionIdx = 0;
        activePanel = document.createElement('div');
        activePanel.className = 'projectgrid-dropup-panel';
  
        const rect = trigger.getBoundingClientRect();
        Object.assign(activePanel.style, {
          position: 'fixed', bottom: `${window.innerHeight - rect.top + 4}px`,
          left: `${rect.left + window.scrollX}px`, zIndex: '300000', height: 'auto',
          display: 'flex', flexDirection: 'column', width: '150px'
        });
  
        const labelHeader = document.createElement('div');
        labelHeader.className = 'projectgrid-dropup-header-title';
        labelHeader.textContent = `📋 Filters: ${key.toUpperCase()}`;
        activePanel.appendChild(labelHeader);
  
        const scrollingContainer = document.createElement('div');
        scrollingContainer.style.overflowY = 'auto';
        scrollingContainer.style.flex = '1';
  
        fullOptionsList.forEach((opt, oIdx) => {
          const wrapper = document.createElement('label');
          wrapper.className = 'projectgrid-dropup-option';
  
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.tabIndex = -1; 
          
          if (opt === '[ALL]') checkbox.checked = (activeFilters.size === defaults.length);
          else checkbox.checked = activeFilters.has(opt);
  
          checkbox.addEventListener('change', () => handleToggle(opt, checkbox.checked));
  
          wrapper.appendChild(checkbox);
          wrapper.appendChild(document.createTextNode(opt));
          scrollingContainer.appendChild(wrapper);
        });
        activePanel.appendChild(scrollingContainer);
        document.body.appendChild(activePanel);
  
        activePanel.tabIndex = 0;
        activePanel.focus();
  
        activePanel.addEventListener('keydown', (e) => {
          const options = scrollingContainer.querySelectorAll('.projectgrid-dropup-option');
          if (options.length === 0) return;
  
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault(); e.stopPropagation();
            
            selectionIdx = e.key === 'ArrowDown' ? 
              ((selectionIdx + 1) % options.length) : 
              ((selectionIdx - 1 + options.length) % options.length);
            
            options.forEach((lbl, lIdx) => {
              if (lIdx === selectionIdx) {
                lbl.classList.add('projectgrid-row-focused');
                if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(lbl);
                lbl.scrollIntoView({ block: 'nearest' });
              } else { 
                lbl.classList.remove('projectgrid-row-focused'); 
              }
            });
          } else if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter') {
            e.preventDefault(); e.stopPropagation();
            if (options[selectionIdx]) {
              const cb = options[selectionIdx].querySelector('input[type="checkbox"]');
              cb.checked = !cb.checked;
              handleToggle(fullOptionsList[selectionIdx], cb.checked);
            }
          } else if (e.key === 'Escape') {
            e.preventDefault(); e.stopPropagation(); closePanel(); trigger.focus();
          }
        });
  
        // FIX 1: DELAY GLOBAL MOUSE LISTENER TRACKS VIA ANIMATION FRAMES TO BYPASS BUBBLING COLLISIONS
        requestAnimationFrame(() => {
          document.addEventListener('mousedown', handleOutsideClickGlobalClosure);
          isOpeningPanel = false;
          if (activePanel) activePanel.focus();
          
          const firstOpt = scrollingContainer.querySelector('.projectgrid-dropup-option');
          if (firstOpt && window.ProjectGridUpdateFocusOverlay) {
            firstOpt.classList.add('projectgrid-row-focused');
            window.ProjectGridUpdateFocusOverlay(firstOpt);
          }
          if (window.ProjectGridTriggerTutorHelpBoxRedraw) window.ProjectGridTriggerTutorHelpBoxRedraw(activePanel, 'filter-panel');
        });
      };
  
      const handleToggle = (opt, isChecked) => {
        if (opt === '[ALL]') {
          if (isChecked) defaults.forEach(d => activeFilters.add(d));
          else activeFilters.clear();
        } else {
          if (isChecked) activeFilters.add(opt);
          else activeFilters.delete(opt);
        }
        if (activePanel) {
          const boxes = activePanel.querySelectorAll('input[type="checkbox"]');
          if (boxes && boxes.length > 0) {
            boxes.checked = (activeFilters.size === defaults.length);
            defaults.forEach((d, idx) => { if (boxes[idx + 1]) boxes[idx + 1].checked = activeFilters.has(d); });
          }
        }
        rowsArray.forEach(row => {
          if (!row.dropdownFilters) row.dropdownFilters = {};
          const rawVal = row.yamlMetadataValues && row.yamlMetadataValues[key] ? String(row.yamlMetadataValues[key]) : '⬛';
          const sanitizedRaw = rawVal.replace(/[⭐💲🐘🎱🏅🛑🌐🛠🧪📦]/g, '').trim();
          let isMatchFound = false;
          activeFilters.forEach(filterOpt => {
            const sanitizedFilter = filterOpt.replace(/[⭐💲🐘🎱🏅🛑🌐🛠🧪📦]/g, '').trim();
            if (sanitizedRaw === sanitizedFilter || (sanitizedRaw === '⬛' && sanitizedFilter === '⬛')) isMatchFound = true;
          });
          row.dropdownFilters[key] = isMatchFound;
        });
        if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
      };
  
      trigger.addEventListener('keydown', (evt) => {
        if (!activePanel) {
          if (evt.key === 'Enter' || evt.key === ' ' || (evt.key === 'ArrowDown' && evt.altKey) || evt.key === 'ArrowDown') {
            evt.preventDefault(); evt.stopPropagation(); openPanel();
          }
        }
      });
  
      trigger.addEventListener('focus', () => {
        if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(trigger);
        if (window.ProjectGridTriggerTutorHelpBoxRedraw) window.ProjectGridTriggerTutorHelpBoxRedraw(trigger, 'filter-header');
      });
  
      trigger.addEventListener('mousedown', (e) => {
        // FIX 2: PREVENT BUBBLING STOP AT CELL BASELINE TO BLOCK ACCIDENTAL IMMEDIATE CLOSURES
        e.preventDefault();
        e.stopPropagation();
        if (activePanel && !isOpeningPanel) {
          closePanel();
        } else {
          trigger.focus();
          openPanel();
        }
      });
  
      th.appendChild(trigger);
      return th;
    }
  };
})();
const UiRow = (function() {
const UiColor = (function() {
return {
    getColorForFirstCharacter(filename) {
      if (!filename) return 'var(--text-accent)';
      const cleanStr = filename.replace(/^\+/, '').trim().toUpperCase();
      if (cleanStr.length === 0) return 'var(--text-accent)';
      
      const code = cleanStr.charCodeAt(0);
      // Map strictly over uppercase alphabet bounds (A=65 to Z=90)
      if (code >= 65 && code <= 90) {
        const step = (code - 65) / 25; 
        const hue = step * 360; 
        return `hsl(${hue}, 85%, 65%)`; 
      }
      return 'var(--text-normal)';
    }
  };
})();
const UiRowDates = (function() {
const fs = require('fs');
const path = require('path');

return {
  formatDateString(dateObj) {
    if (!dateObj || isNaN(dateObj.getTime())) return '0000.00.00 00';
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const hh = String(dateObj.getHours()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd} ${hh}`;
  },

  appendDirectoryTimestamps(tableRow, folder, absoluteVaultRoot, rowTrackingReference) {
    const absoluteFolderDiskPath = path.join(absoluteVaultRoot, folder.path);
    let createdDateStr = '0000.00.00 00';
    let updatedDateStr = '0000.00.00 00';

    try {
      if (fs.existsSync(absoluteFolderDiskPath)) {
        const directoryStats = fs.statSync(absoluteFolderDiskPath);
        createdDateStr = this.formatDateString(directoryStats.birthtime);
        updatedDateStr = this.formatDateString(directoryStats.mtime);
      }
    } catch (err) {
      console.error(`[ProjectGrid] Timestamp fetch error:`, err.message);
    }

    rowTrackingReference.folderDatesValues = { created: createdDateStr, updated: updatedDateStr };

    const createdCell = document.createElement('td');
    createdCell.className = 'projectgrid-matrix-cell projectgrid-timestamp-scaled-td';
    createdCell.textContent = createdDateStr;
    tableRow.appendChild(createdCell);

    const updatedCell = document.createElement('td');
    updatedCell.className = 'projectgrid-matrix-cell projectgrid-timestamp-scaled-td';
    updatedCell.textContent = updatedDateStr;
    tableRow.appendChild(updatedCell);
  }
};
})();
const UiRowActions = (function() {
// FIX: Pull in Node's native File System module to perform direct physical disk lookups
const fs = require('fs');
const path = require('path');

return {
  appendLauncherButtons(tableRow, folder, absoluteVaultRoot, app) {
    const absoluteLocalPath = `${absoluteVaultRoot}\\${folder.path}`.replace(/[/\\]+/g, '\\');
    
    // --- FIX: USE RAW UNMASKED DISK QUERIES TO IDENTIFY MOUNTED DIRECTORY JUNCTIONS ---
    const dotObsidianPhysicalPath = path.join(absoluteVaultRoot, folder.path, '.obsidian');
    const hasObsidianVault = fs.existsSync(dotObsidianPhysicalPath);
    // ----------------------------------------------------------------------------------

    const actions = [
      { protocol: 'dopus', icon: '📁', title: 'Open folder in Directory Opus', isMissing: false },
      { protocol: 'cursor', icon: '💻', title: 'Open workspace in Cursor', isMissing: false },
      { protocol: 'obsidian', icon: '💜', title: 'Open directory as Obsidian Vault', isMissing: !hasObsidianVault }
    ];

    actions.forEach(act => {
      const cell = document.createElement('td');
      cell.className = 'projectgrid-matrix-cell action-icon-cell';
      
      const fileAnchor = document.createElement('a');
      fileAnchor.href = `aip://${act.protocol}/${absoluteLocalPath}`;
      fileAnchor.className = 'projectgrid-aip-icon-btn';
      fileAnchor.textContent = act.icon;
      fileAnchor.title = act.title;

      // Apply ghost transparency overlay strictly if the path is genuinely missing from your drive
      if (act.isMissing) {
        fileAnchor.classList.add('is-vault-missing');
      }

      cell.appendChild(fileAnchor);
      tableRow.appendChild(cell);
    });
  }
};
})();
const UiRowTags = (function() {
const UiRowKeys = (function() {
return {
    handleClosedNavigation(evt, btn, tableRow, fieldIdx, cfg, filterInput) {
      // FIX: EXTENSIBLE OR STATIC ROWS ESCAPE INTERCEPT JUMPS VERTICALLY ACROSS THE RE-SORTED CANVAS
      if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp') {
        evt.preventDefault(); evt.stopPropagation();
        const parentTable = tableRow.parentElement;
        const visibleRows = Array.from(parentTable.querySelectorAll('.projectgrid-matrix-row')).filter(r => r.style.display !== 'none');
        const currentRowIdx = visibleRows.indexOf(tableRow);
        let nextRowIdx = currentRowIdx + (evt.key === 'ArrowDown' ? 1 : -1);
  
        if (nextRowIdx >= 0 && nextRowIdx < visibleRows.length) {
          const targetRow = visibleRows[nextRowIdx];
          parentTable.querySelectorAll('.projectgrid-matrix-row').forEach(r => r.classList.remove('projectgrid-row-focused'));
          
          targetRow.classList.add('projectgrid-row-focused');
          // Find matching interactive child node depending on columns layout index offset geometry
          const targetSelectBtn = targetRow.children[btn.parentElement.cellIndex]?.querySelector('.projectgrid-custom-select-btn, .projectgrid-tags-cell-btn, .projectgrid-tasks-trigger-btn');
          if (targetSelectBtn) {
            targetSelectBtn.focus();
            targetRow.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          }
        }
        return true;
      }
  
      if (evt.key === 'Escape') {
        evt.preventDefault(); filterInput.focus(); return true;
      }
  
      if (evt.key === 'Tab') {
        evt.preventDefault();
        const siblingButtons = Array.from(tableRow.querySelectorAll('.projectgrid-custom-select-btn, .projectgrid-tags-cell-btn, .projectgrid-tasks-trigger-btn'));
        let currentIdx = siblingButtons.indexOf(btn);
        let nextIdx = currentIdx + (evt.shiftKey ? -1 : 1);
        if (nextIdx >= 0 && nextIdx < siblingButtons.length) siblingButtons[nextIdx].focus();
        else if (nextIdx < 0) filterInput.focus();
        return true;
      }
      return false;
    }
  };
})();

return {
  buildInteractiveTagsColumn(tableRow, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput) {
    const tagsCell = document.createElement('td');
    tagsCell.className = 'projectgrid-matrix-cell select-cell projectgrid-uniform-yaml-td';
    
    const tagsBtn = document.createElement('div');
    tagsBtn.className = 'projectgrid-custom-select-btn projectgrid-tags-cell-btn';
    tagsBtn.tabIndex = 0;

    let activeTagsArray = [];
    if (frontmatter && frontmatter.tags) {
      activeTagsArray = Array.isArray(frontmatter.tags) ? frontmatter.tags : String(frontmatter.tags).split(/[\s,]+/);
      activeTagsArray = activeTagsArray.map(t => String(t).trim()).filter(t => t.length > 0);
    }

    rowTrackingReference.yamlMetadataValues = rowTrackingReference.yamlMetadataValues || {};
    rowTrackingReference.yamlMetadataValues['tags'] = activeTagsArray.length > 0 ? activeTagsArray.join(', ') : '⬛';
    tagsBtn.textContent = activeTagsArray.length > 0 ? activeTagsArray.join(', ') : '⬛';

    let activeTagsDropdown = null;
    let tagsSelectionIdx = 0;
    let isOpeningPanel = false;

    const closeTagsDropdown = () => {
      if (activeTagsDropdown) { activeTagsDropdown.remove(); activeTagsDropdown = null; }
      if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
    };

    const openTagsDropdown = () => {
      if (activeTagsDropdown) return;
      isOpeningPanel = true; tagsSelectionIdx = 0;
      activeTagsDropdown = document.createElement('div');
      activeTagsDropdown.className = 'projectgrid-dropup-panel projectgrid-tags-portal-panel';

      const globalTagsSet = new Set();
      document.querySelectorAll('.projectgrid-tags-cell-btn').forEach(b => {
        if (b.textContent !== '⬛') b.textContent.split(', ').forEach(t => globalTagsSet.add(t.trim()));
      });
      const uniqueAvailableTags = Array.from(globalTagsSet).sort();

      const rect = tagsBtn.getBoundingClientRect();
      Object.assign(activeTagsDropdown.style, {
        position: 'fixed', top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`, width: '170px',
        zIndex: '250000', height: 'auto', maxHeight: '300px', display: 'flex', flexDirection: 'column'
      });

      const label = document.createElement('div');
      label.className = 'projectgrid-dropup-header-title';
      label.textContent = '🏷️ Multi-Select Tags';
      activeTagsDropdown.appendChild(label);

      const inputWrapper = document.createElement('div');
      inputWrapper.className = 'projectgrid-tags-input-container';
      
      const customInput = document.createElement('input');
      customInput.type = 'text'; customInput.className = 'projectgrid-tags-custom-entry-field';
      customInput.placeholder = '➕ Filter / Add Tag...';
      inputWrapper.appendChild(customInput);
      activeTagsDropdown.appendChild(inputWrapper);

      const scrollingContainer = document.createElement('div');
      scrollingContainer.style.overflowY = 'auto'; scrollingContainer.style.flex = '1';

      uniqueAvailableTags.forEach((tag, tIdx) => {
        const itemWrapper = document.createElement('label');
        itemWrapper.className = 'projectgrid-dropup-option';

        const cb = document.createElement('input');
        cb.type = 'checkbox'; cb.checked = activeTagsArray.includes(tag); cb.tabIndex = -1;
        cb.addEventListener('change', () => toggleTagValue(tag, cb.checked));

        itemWrapper.appendChild(cb); itemWrapper.appendChild(document.createTextNode(tag));
        scrollingContainer.appendChild(itemWrapper);
      });
      activeTagsDropdown.appendChild(scrollingContainer);
      document.body.appendChild(activeTagsDropdown);

      customInput.focus();

      customInput.addEventListener('keydown', async (e) => {
        const options = scrollingContainer.querySelectorAll('.projectgrid-dropup-option');

        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault(); e.stopPropagation();
          if (options.length === 0) return;
          tagsSelectionIdx = e.key === 'ArrowDown' ? ((tagsSelectionIdx + 1) % options.length) : ((tagsSelectionIdx - 1 + options.length) % options.length);

          options.forEach((lbl, lIdx) => {
            if (lIdx === tagsSelectionIdx) {
              lbl.classList.add('projectgrid-row-focused');
              if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(lbl);
              lbl.scrollIntoView({ block: 'nearest' });
            } else { lbl.classList.remove('projectgrid-row-focused'); }
          });
        } else if (e.key === 'Enter') {
          e.preventDefault(); e.stopPropagation();
          const typedText = customInput.value.trim().replace(/#/g, '');

          if (typedText === '') {
            if (options[tagsSelectionIdx]) {
              const cb = options[tagsSelectionIdx].querySelector('input[type="checkbox"]');
              cb.checked = !cb.checked;
              await toggleTagValue(options[tagsSelectionIdx].textContent.trim(), cb.checked);
            }
          } else {
            if (!activeTagsArray.includes(typedText)) await toggleTagValue(typedText, true);
            closeTagsDropdown(); tagsBtn.focus();
          }
        } else if (e.key === 'Escape' || (e.key === 'Enter' && e.ctrlKey)) {
          e.preventDefault(); e.stopPropagation(); closeTagsDropdown(); tagsBtn.focus();
        }
      });

      setTimeout(() => {
        isOpeningPanel = false;
        const firstOpt = scrollingContainer.querySelector('.projectgrid-dropup-option');
        if (firstOpt && window.ProjectGridUpdateFocusOverlay) {
          firstOpt.classList.add('projectgrid-row-focused');
          window.ProjectGridUpdateFocusOverlay(firstOpt);
        }
      }, 20);
    };

    const toggleTagValue = async (tag, isChecked) => {
      const fileAbstract = app.vault.getAbstractFileByPath(expectedNotePath);
      if (fileAbstract) {
        await app.fileManager.processFrontMatter(fileAbstract, (fm) => {
          let currentTags = fm.tags ? (Array.isArray(fm.tags) ? [...fm.tags] : String(fm.tags).split(/[\s,]+/)) : [];
          currentTags = currentTags.map(t => String(t).trim()).filter(t => t.length > 0);
          if (isChecked) { if (!currentTags.includes(tag)) currentTags.push(tag); } 
          else { currentTags = currentTags.filter(t => t !== tag); }
          if (currentTags.length === 0) delete fm.tags;
          else fm.tags = currentTags;
          activeTagsArray = currentTags;
        });
        const newLabel = activeTagsArray.length > 0 ? activeTagsArray.join(', ') : '⬛';
        tagsBtn.textContent = newLabel; tagsBtn.title = newLabel;
        rowTrackingReference.yamlMetadataValues['tags'] = newLabel;
        if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
      }
    };

    // FIX: CLOSED TAG ARROW KEY INTERCEPTOR TRIGGERS VERTICAL FOCUS ROW HOPS JUMPS
    tagsBtn.addEventListener('keydown', (evt) => {
      if (activeTagsDropdown) return;
      if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp') {
        UiRowKeys.jumpToVerticalRowCell(evt, tableRow, '.projectgrid-tags-cell-btn', 0);
      } else if (evt.key === 'Enter' || evt.key === ' ') {
        evt.preventDefault(); evt.stopPropagation(); openTagsDropdown();
      }
    });

    tagsBtn.addEventListener('focus', () => {
      if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(tagsBtn);
      if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(tableRow);
    });

    tagsBtn.addEventListener('blur', () => {
      setTimeout(() => { if (activeTagsDropdown && !activeTagsDropdown.contains(document.activeElement)) closeTagsDropdown(); }, 180);
      if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(null);
      if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(null);
    });

    tagsBtn.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      if (activeTagsDropdown && !isOpeningPanel) closeTagsDropdown();
      else { tagsBtn.focus(); openTagsDropdown(); }
    });

    tagsCell.appendChild(tagsBtn);
    tableRow.appendChild(tagsCell);
  }
};
})();
const UiRowTasks = (function() {
return {
    buildTasksColumn(tableRow, expectedNotePath, app, rowTrackingReference) {
      const cell = document.createElement('td');
      cell.className = 'projectgrid-matrix-cell select-cell projectgrid-uniform-yaml-td';
      
      const btn = document.createElement('div');
      btn.className = 'projectgrid-custom-select-btn projectgrid-tasks-trigger-btn';
      btn.tabIndex = 0;
      btn.textContent = '0/0';
  
      let activePanel = null;
  
      const updateCountersText = async () => {
        const file = app.vault.getAbstractFileByPath(expectedNotePath);
        if (!file) return;
        const content = await app.vault.read(file);
        const parsed = parseTasksSection(content);
        
        btn.textContent = `${parsed.uncheckedCount}/${parsed.totalCount}`;
        rowTrackingReference.launcherValues = rowTrackingReference.launcherValues || {};
        rowTrackingReference.launcherValues['tasks'] = `${parsed.uncheckedCount}/${parsed.totalCount}`;
      };
  
      const parseTasksSection = (text) => {
        const lines = text.split('\n');
        let insideTasks = false;
        const tasksList = [];
        let unchecked = 0;
  
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (line.trim().startsWith('## Incoming Tasks')) { insideTasks = true; continue; }
          if (insideTasks && line.trim().startsWith('##')) { break; }
          
          if (insideTasks) {
            const match = line.match(/^\s*-\s*\[([ xX])\]\s*(.*)$/);
            if (match) {
              const isChecked = match[1].toLowerCase() === 'x';
              if (!isChecked) unchecked++;
              tasksList.push({ lineIndex: i, text: match[2].trim(), checked: isChecked, rawLine: line });
            }
          }
        }
        return { tasks: tasksList, uncheckedCount: unchecked, totalCount: tasksList.length, lines };
      };
  
      const openWideTasksPanel = async () => {
        if (activePanel) activePanel.remove();
        activePanel = document.createElement('div');
        activePanel.className = 'projectgrid-wide-tasks-portal';
  
        const rect = btn.getBoundingClientRect();
        Object.assign(activePanel.style, {
          position: 'fixed', top: `${rect.bottom + window.scrollY + 4}px`,
          left: `${Math.max(10, rect.left - 200)}px`, width: '380px'
        });
  
        const file = app.vault.getAbstractFileByPath(expectedNotePath);
        if (!file) return;
        const content = await app.vault.read(file);
        const data = parseTasksSection(content);
  
        const title = document.createElement('div');
        title.className = 'projectgrid-dropup-header-title';
        title.textContent = `🔧 Incoming Tasks List (${data.uncheckedCount} Pending)`;
        activePanel.appendChild(title);
  
        const itemsBox = document.createElement('div');
        itemsBox.style.maxHeight = '220px';
        itemsBox.style.overflowY = 'auto';
  
        data.tasks.forEach(task => {
          const row = document.createElement('div');
          row.className = 'projectgrid-dropup-option';
          row.style.justifyContent = 'space-between';
  
          const left = document.createElement('label');
          left.style.display = 'flex'; left.style.alignItems = 'center'; left.style.gap = '6px';
          
          const cb = document.createElement('input');
          cb.type = 'checkbox'; cb.checked = task.checked;
          cb.tabIndex = -1;
          cb.addEventListener('change', async () => {
            await writeTaskStateChange(task.lineIndex, cb.checked ? '- [x] ' + task.text : '- [ ] ' + task.text);
            openWideTasksPanel();
          });
  
          left.appendChild(cb);
          left.appendChild(document.createTextNode(task.text));
          row.appendChild(left);
  
          const del = document.createElement('span');
          del.innerHTML = '✕'; del.style.cursor = 'pointer'; del.style.color = 'var(--text-error, #ff4757)';
          del.addEventListener('click', async (e) => {
            e.stopPropagation();
            await writeTaskStateChange(task.lineIndex, null);
            openWideTasksPanel();
          });
          row.appendChild(del);
          itemsBox.appendChild(row);
        });
        activePanel.appendChild(itemsBox);
  
        const inputWrap = document.createElement('div');
        inputWrap.className = 'projectgrid-tags-input-container';
        
        const textIn = document.createElement('input');
        textIn.type = 'text'; textIn.className = 'projectgrid-tags-custom-entry-field';
        textIn.placeholder = '➕ Create New Checklist Item...';
        
        textIn.addEventListener('keydown', async (e) => {
          if (e.key === 'Enter' && textIn.value.trim()) {
            e.preventDefault();
            await appendNewTaskLine('- [ ] ' + textIn.value.trim(), data.lines);
            openWideTasksPanel();
          }
        });
        inputWrap.appendChild(textIn);
        activePanel.appendChild(inputWrap);
  
        // --- FIX: ABSOLUTE PORTAL ESCAPE INTERCEPTOR CLOSES PANEL AND FOCUSES BUTTON ---
        activePanel.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            e.preventDefault();
            e.stopPropagation();
            closeWideTasksPanel();
          }
        });
        // ------------------------------------------------------------------------------
  
        document.body.appendChild(activePanel);
        
        // Update our topmost global overlay framework tracker immediately
        if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(activePanel);
      };
  
      const closeWideTasksPanel = () => {
        if (activePanel) {
          activePanel.remove();
          activePanel = null;
        }
        btn.focus(); // Returns active cursor selection cleanly back to the task grid column
        if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
      };
  
      const writeTaskStateChange = async (lineIdx, newlineValue) => {
        const file = app.vault.getAbstractFileByPath(expectedNotePath);
        if (!file) return;
        const content = await app.vault.read(file);
        const lines = content.split('\n');
  
        if (newlineValue === null) lines.splice(lineIdx, 1);
        else lines[lineIdx] = newlineValue;
  
        await app.vault.modify(file, lines.join('\n'));
        await updateCountersText();
      };
  
      const appendNewTaskLine = async (rawLineText, existingLines) => {
        const file = app.vault.getAbstractFileByPath(expectedNotePath);
        if (!file) return;
        
        let headingIndex = existingLines.findIndex(l => l.trim().startsWith('## Incoming Tasks'));
        if (headingIndex === -1) {
          existingLines.push('\n## Incoming Tasks');
          existingLines.push(rawLineText);
        } else {
          existingLines.splice(headingIndex + 1, 0, rawLineText);
        }
  
        await app.vault.modify(file, existingLines.join('\n'));
        await updateCountersText();
      };
  
      btn.addEventListener('focus', () => {
        openWideTasksPanel();
        if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(btn);
        if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(tableRow);
      });
  
      btn.addEventListener('blur', () => {
        // Buffer delay prevents premature destruction when focusing interior inputs
        setTimeout(() => {
          if (activePanel && !activePanel.contains(document.activeElement) && document.activeElement !== btn) {
            activePanel.remove();
            activePanel = null;
            if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
          }
        }, 150);
        if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(null);
        if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(null);
      });
  
      btn.addEventListener('mousedown', (e) => { e.stopPropagation(); btn.focus(); });
      
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          closeWideTasksPanel();
        }
      });
  
      setTimeout(updateCountersText, 20);
      cell.appendChild(btn);
      tableRow.appendChild(cell);
    }
  };
})();
const UiRowSelect = (function() {
return {
  buildSelectButton(cell, tableRow, fieldIdx, cfg, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput) {
    const btn = document.createElement('div');
    btn.className = 'projectgrid-custom-select-btn';
    btn.tabIndex = 0;
    btn.setAttribute('data-field-index', fieldIdx);

    const rawVal = frontmatter && frontmatter[cfg.key] !== undefined ? String(frontmatter[cfg.key]) : '';
    rowTrackingReference.yamlMetadataValues[cfg.key] = rawVal || '⬛';
    btn.textContent = rawVal || '⬛';

    let optionsList = ['⬛', ...cfg.defaults];
    if (rawVal && !optionsList.includes(rawVal)) optionsList.push(rawVal);

    let activeDropdown = null;
    let selectionIdx = optionsList.indexOf(rawVal || '⬛');

    const closeDropdown = () => { 
      if (activeDropdown) { activeDropdown.remove(); activeDropdown = null; } 
      if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
    };

    const openDropdown = () => {
      closeDropdown();
      selectionIdx = optionsList.indexOf(btn.textContent.split(' ')[0]);
      if (selectionIdx === -1) selectionIdx = 0;

      activeDropdown = document.createElement('div');
      activeDropdown.className = 'projectgrid-dropup-panel';
      
      const rect = btn.getBoundingClientRect();
      Object.assign(activeDropdown.style, {
        position: 'fixed', top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`, width: `${rect.width + 30}px`,
        zIndex: '200000', height: 'auto', display: 'flex', flexDirection: 'column'
      });

      const label = document.createElement('div');
      label.className = 'projectgrid-dropup-header-title';
      label.textContent = `📋 ${cfg.key.toUpperCase()}`;
      activeDropdown.appendChild(label);

      // FIX: DISABALES THE INPUT BOX FOR ALL STATIC FIELDS EXCEPT LANGUAGES AND TARGETS
      let customInput = null;
      if (cfg.isExtendable) {
        const inputWrapper = document.createElement('div');
        inputWrapper.className = 'projectgrid-tags-input-container';
        
        customInput = document.createElement('input');
        customInput.type = 'text';
        customInput.className = 'projectgrid-tags-custom-entry-field';
        customInput.placeholder = '➕ Filter / Add...';
        inputWrapper.appendChild(customInput);
        activeDropdown.appendChild(inputWrapper);
      }

      const scrollingContainer = document.createElement('div');
      scrollingContainer.style.overflowY = 'auto';
      scrollingContainer.style.flex = '1';

      optionsList.forEach((opt, oIdx) => {
        const li = document.createElement('div');
        li.className = 'projectgrid-custom-dropdown-item';
        li.textContent = opt;
        scrollingContainer.appendChild(li);
      });
      activeDropdown.appendChild(scrollingContainer);
      document.body.appendChild(activeDropdown);

      const items = scrollingContainer.querySelectorAll('.projectgrid-custom-dropdown-item');
      
      const updateVisualSelection = () => {
        items.forEach((li, lIdx) => {
          if (lIdx === selectionIdx) {
            li.classList.add('projectgrid-row-focused');
            if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(li);
            li.scrollIntoView({ block: 'nearest' });
          } else { li.classList.remove('projectgrid-row-focused'); }
        });
      };

      if (customInput) {
        customInput.focus();
        customInput.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault(); e.stopPropagation();
            selectionIdx = e.key === 'ArrowDown' ? ((selectionIdx + 1) % optionsList.length) : ((selectionIdx - 1 + optionsList.length) % optionsList.length);
            updateVisualSelection();
          } else if (e.key === 'Enter') {
            e.preventDefault(); e.stopPropagation();
            const val = customInput.value.trim();
            if (val === '') commitSelection(optionsList[selectionIdx]);
            else commitSelection(val);
          } else if (e.key === 'Escape') { e.preventDefault(); closeDropdown(); btn.focus(); }
        });
      } else {
        activeDropdown.tabIndex = 0;
        activeDropdown.focus();
        activeDropdown.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault(); e.stopPropagation();
            selectionIdx = e.key === 'ArrowDown' ? ((selectionIdx + 1) % optionsList.length) : ((selectionIdx - 1 + optionsList.length) % optionsList.length);
            updateVisualSelection();
          } else if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault(); e.stopPropagation();
            commitSelection(optionsList[selectionIdx]);
          } else if (e.key === 'Escape') { e.preventDefault(); closeDropdown(); btn.focus(); }
        });
      }

      setTimeout(() => {
        updateVisualSelection();
        if (window.ProjectGridTriggerTutorHelpBoxRedraw) {
          window.ProjectGridTriggerTutorHelpBoxRedraw(customInput || activeDropdown);
        }
      }, 20);
    };

    const commitSelection = async (value) => {
      const fileAbstract = app.vault.getAbstractFileByPath(expectedNotePath);
      const finalVal = value === '⬛' ? '' : value;
      if (fileAbstract) {
        await app.fileManager.processFrontMatter(fileAbstract, (fm) => {
          if (finalVal === '') delete fm[cfg.key];
          else fm[cfg.key] = finalVal;
        });
        btn.textContent = value; closeDropdown();
        
        const activeChain = window.ProjectGridActiveSortChainList || [];
        if (activeChain.includes(cfg.key) && window.ProjectGridTriggerSortReRun) window.ProjectGridTriggerSortReRun();
        else if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();

        btn.focus();
      }
    };

    btn.addEventListener('focus', () => {
      if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(btn);
      if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(tableRow);
      if (window.ProjectGridTriggerTutorHelpBoxRedraw) window.ProjectGridTriggerTutorHelpBoxRedraw(btn);
    });
    
    btn.addEventListener('blur', () => {
      setTimeout(() => { if (activeDropdown && !activeDropdown.contains(document.activeElement)) closeDropdown(); }, 180);
      if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(null);
      if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(null);
    });
    
    btn.addEventListener('mousedown', (e) => { e.stopPropagation(); btn.focus(); if (activeDropdown) closeDropdown(); else openDropdown(); });
    
    btn.addEventListener('keydown', (evt) => {
      if (!activeDropdown) {
        if (evt.key === 'Enter' || evt.key === ' ' || evt.key === 'Spacebar' || (evt.key === 'ArrowDown' && evt.altKey)) {
          evt.preventDefault(); openDropdown(); return;
        }
        UiRowKeys.handleClosedNavigation(evt, btn, tableRow, fieldIdx, cfg, filterInput);
      }
    });

    cell.appendChild(btn);
  }
};
})();

return {
  buildRow(folder, absoluteVaultRoot, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput) {
    const tableRow = document.createElement('tr');
    tableRow.className = 'projectgrid-matrix-row';

    const noteCell = document.createElement('td');
    noteCell.className = 'projectgrid-matrix-cell note-title-cell';
    const fileAnchor = document.createElement('a');
    fileAnchor.className = 'internal-link projectgrid-matrix-link';
    fileAnchor.setAttribute('data-href', expectedNotePath);
    fileAnchor.textContent = `+${folder.name}.md`;
    fileAnchor.style.color = UiColor.getColorForFirstCharacter(folder.name);
    
    fileAnchor.addEventListener('click', (evt) => {
      evt.preventDefault();
      app.workspace.openLinkText(expectedNotePath, '', false);
    });
    noteCell.appendChild(fileAnchor);
    tableRow.appendChild(noteCell);

    // Column 2: Checkbox Tasks module injection
    UiRowTasks.buildTasksColumn(tableRow, expectedNotePath, app, rowTrackingReference);

    // Columns 3 & 4: Directory timestamps
    UiRowDates.appendDirectoryTimestamps(tableRow, folder, absoluteVaultRoot, rowTrackingReference);

    // Columns 5, 6, 7: Application launcher short tracks links
    UiRowActions.appendLauncherButtons(tableRow, folder, absoluteVaultRoot, app);

    // Column 8: User extensible Tags collection field selector layout
    UiRowTags.buildInteractiveTagsColumn(tableRow, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput);

    // Columns 9 through 16: Frontmatter metadata columns tracks
    const fieldsConfig = [
      { key: 'stars', defaults: ['0⭐','1⭐','2⭐','3⭐','4⭐','5⭐'], isExtendable: false },
      { key: 'value', defaults: ['0💲','1💲','2💲','3💲','4💲','5💲','6💲','7💲','8💲','9💲'], isExtendable: false },
      { key: 'size', defaults: ['0🐘','1🐘','2🐘','3🐘','4🐘','5🐘'], isExtendable: false },
      { key: 'depth', defaults: ['0🎱','1🎱','2🎱','3🎱','4🎱','5🎱'], isExtendable: false },
      { key: 'priority', defaults: ['0🏅','1🏅','2🏅','3🏅','4🏅','5🏅'], isExtendable: false },
      { key: 'status', defaults: ['hold🛑', 'plan🌐', 'dev🛠', 'test🧪', 'ship📦'], isExtendable: false },
      { key: 'lang', defaults: ['js', 'ts', 'au3', 'ahk'], isExtendable: true },
      { key: 'target', defaults: ['ce', 'op', 'app', 'link'], isExtendable: true }
    ];

    fieldsConfig.forEach((cfg, fieldIdx) => {
      const cell = document.createElement('td');
      cell.className = 'projectgrid-matrix-cell select-cell projectgrid-uniform-yaml-td';
      UiRowSelect.buildSelectButton(cell, tableRow, fieldIdx, cfg, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput);
      tableRow.appendChild(cell);
    });

    return tableRow;
  }
};
})();

return {
  activeInputTarget: null, activeRowTarget: null, activeFocusTarget: null, observerRef: null,

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

    // --- FIX: GLOBAL TUTOR INTERACTIVE HUD OVERLAY GENERATOR ---
    let hud = document.getElementById('projectgrid-tutor-hud-overlay');
    if (!hud) {
      hud = document.createElement('div'); hud.id = 'projectgrid-tutor-hud-overlay';
      hud.className = 'projectgrid-tutor-tooltip-portal'; document.body.appendChild(hud);
    }

    const tutorShortcutsMap = {
      'search-input': { title: '⌨️ Search Field Focus', keys: '• Type: Filter project titles<br>• ScrollLock: Toggle Command Picker Menu<br>• ArrowDown: Navigate matrix grid notes' },
      'filter-header': { title: '🎛️ Column Filter Header', keys: '• Enter / Space: Open multi-choice list<br>• Alt+Down: Toggle menu open<br>• Tab / Shift+Tab: Move horizontal focus' },
      'filter-panel': { title: '📋 Active Filter List Menu', keys: '• ArrowUp / Down: Highlight choice row<br>• Enter / Space: Toggle visible selection<br>• Escape: Close dropdown menu panel' },
      'cell-btn': { title: '📊 Frontmatter Cell Controller', keys: '• Enter / Space: Open options dropdown<br>• ArrowUp / Down: Move focus vertically to next row<br>• Tab / Shift+Tab: Jump cells horizontally' },
      'tags-cell': { title: '🏷️ Extensible Tags Panel', keys: '• Type: Filter / Add a custom string value<br>• ArrowUp / Down: Move choice frame<br>• Enter: Toggle check / Add tag item' },
      'tasks-cell': { title: '🔧 Tasks Checklist Manager', keys: '• Click checkbox: Toggle task state change<br>• Type: Create new item bullet<br>• Escape: Collapse menu, return focus' }
    };

    window.ProjectGridTriggerTutorHelpBoxRedraw = (targetElement, contextKey) => {
      if (!window.ProjectGridTutorModeActive || !targetElement || !contextKey || !tutorShortcutsMap[contextKey]) {
        hud.style.display = 'none'; return;
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
      // Realignment positioning parameters for the HUD tooltip if active
      if (window.ProjectGridTutorModeActive && hud.style.display === 'block') {
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

  buildHeaderDropup(titleIcon, key, defaults, rowsArray) { return UiDropdown.buildHeaderDropup(titleIcon, key, defaults, rowsArray); },
  buildRow(folder, absoluteVaultRoot, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput) { return UiRow.buildRow(folder, absoluteVaultRoot, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput); }
};
})();

module.exports = class ProjectGridPlugin extends Plugin {
  async onload() {
    console.log('%c[ProjectGrid]%c Core initialized...', 'color: #00d2d3; font-weight: bold;', 'color: default;');
    StylesManager.injectStyles();

    // Initialize the global tutor state tracker defaults to false on first boot
    window.ProjectGridTutorModeActive = false;

    this.registerMarkdownCodeBlockProcessor('projectgrid', (sourceText, element) => {
      this.renderProjectGridDashboard(sourceText, element);
    });
  }

  onunload() {
    const styleEl = document.getElementById('obsidian-projectgrid-styles');
    if (styleEl) styleEl.remove();
    document.querySelectorAll('.projectgrid-focus-overlay-portal, .projectgrid-input-overlay-portal, .projectgrid-row-overlay-portal, .projectgrid-wide-tasks-portal, .projectgrid-tutor-tooltip-portal').forEach(el => el.remove());
  }

  renderProjectGridDashboard(sourceText, containerElement) {
    const rootTarget = sourceText.trim() || "__";
    const absoluteVaultRoot = this.app.vault.adapter.getBasePath();
    const targetFolders = this.app.vault.getAllLoadedFiles().filter(file => file.children && file.path.startsWith(rootTarget));

    // Create the master horizontal toolbar wrapper
    const toolbar = document.createElement('div');
    toolbar.className = 'projectgrid-toolbar';
    
    // System command picker gear configuration btn button icon
    const toolbarBtn = document.createElement('button');
    toolbarBtn.className = 'projectgrid-toolbar-btn';
    toolbarBtn.innerHTML = '⚙️';
    toolbarBtn.title = 'Open ScrollLock System Commands Picker Menu';
    toolbar.appendChild(toolbarBtn);

    // FIX: ADD THE INTERACTIVE TUTOR TOGGLE BUTTON TRACK NEXT TO THE GEAR ICON Btn
    const tutorToggleBtn = document.createElement('button');
    tutorToggleBtn.className = 'projectgrid-toolbar-btn projectgrid-tutor-toggle-btn';
    tutorToggleBtn.innerHTML = '❔';
    tutorToggleBtn.title = 'Toggle Tutor HUD Context Help Box Overlay (Ctrl+Alt+T)';
    toolbar.appendChild(tutorToggleBtn);

    // Dynamic text span string block layout displaying multi-choice sort chain pipelines
    const sortLabel = document.createElement('span');
    sortLabel.id = 'projectgrid-sort-toolbar-label';
    sortLabel.className = 'projectgrid-sort-indicator-label';
    sortLabel.style.fontSize = '11px';
    sortLabel.style.marginLeft = '8px';
    sortLabel.style.color = 'var(--text-muted)';
    sortLabel.textContent = '📶 Default Directory Sort Order';
    toolbar.appendChild(sortLabel);
    
    containerElement.appendChild(toolbar);

    const tableElement = document.createElement('table');
    tableElement.className = 'projectgrid-matrix-table';

    const tableHeader = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const headerSetup = UiBuilder.generateHeaderCell();
    headerRow.appendChild(headerSetup.cell);
    
    // Core structural intermediate layout headers mappings
    headerRow.insertAdjacentHTML('beforeend', `
      <th style="width: 7% !important; text-align: center;"><div class="projectgrid-header-dropup-trigger" data-key="tasks" title="Tasks Todo">🔧</div></th>
      <th style="width: 6% !important; text-align: center;"><div class="projectgrid-header-dropup-trigger" data-key="created" title="Folder Created Date">🆕</div></th>
      <th style="width: 6% !important; text-align: center;"><div class="projectgrid-header-dropup-trigger" data-key="updated" title="Folder Updated Date">🆙</div></th>
      <th style="width: 5%; text-align: center;" title="Directory Opus">📁</th>
      <th style="width: 5%; text-align: center;" title="Cursor Workspace">💻</th>
      <th style="width: 5%; text-align: center;" title="Obsidian Vault">💜</th>
    `);

    // Define multi-select dropdown column targets schema configurations
    const columnDropdowns = [
      { icon: '🏷️', key: 'tags', options: ['⬛'] },
      { icon: '⭐', key: 'stars', options: ['⬛','0⭐','1⭐','2⭐','3⭐','4⭐','5⭐'] },
      { icon: '💲', key: 'value', options: ['⬛','0💲','1💲','2💲','3💲','4💲','5💲','6💲','7💲','8💲','9💲'] },
      { icon: '🐘', key: 'size', options: ['⬛','0🐘','1🐘','2🐘','3🐘','4🐘','5🐘'] },
      { icon: '🎱', key: 'depth', options: ['⬛','0🎱','1🎱','2🎱','3🎱','4🎱','5🎱'] },
      { icon: '🏅', key: 'priority', options: ['⬛','0🏅','1🏅','2🏅','3🏅','4🏅','5🏅'] },
      { icon: '🚦', key: 'status', options: ['⬛','hold🛑', 'plan🌐', 'dev🛠', 'test🧪', 'ship📦'] },
      { icon: '🔤', key: 'lang', options: ['⬛','js', 'ts', 'au3', 'ahk'] },
      { icon: '🎯', key: 'target', options: ['⬛','ce', 'op', 'app', 'link'] }
    ];

    const tableBody = document.createElement('tbody');
    const rowsArray = [];
    const universalTagsSet = new Set();

    targetFolders.forEach(folder => {
      const expectedNotePath = `${folder.path}/+${folder.name}.md`;
      if (this.app.vault.getAbstractFileByPath(expectedNotePath)) {
        const fileCache = this.app.metadataCache.getCache(expectedNotePath);
        const frontmatter = fileCache ? fileCache.frontmatter : null;

        if (frontmatter && frontmatter.tags) {
          const rawTags = Array.isArray(frontmatter.tags) ? frontmatter.tags : String(frontmatter.tags).split(/[\s,]+/);
          rawTags.forEach(t => { if(t) universalTagsSet.add(String(t).trim()); });
        }

        const rowRef = { element: null, searchText: `+${folder.name}.md`.toLowerCase() };
        rowRef.element = UiBuilder.buildRow(folder, absoluteVaultRoot, expectedNotePath, this.app, frontmatter, rowRef, headerSetup.input);
        
        tableBody.appendChild(rowRef.element);
        rowsArray.push(rowRef);
      }
    });

    const tagsConfig = columnDropdowns.find(c => c.key === 'tags');
    if (tagsConfig) {
      Array.from(universalTagsSet).sort().forEach(t => tagsConfig.options.push(t));
    }

    columnDropdowns.forEach(col => {
      const dropupTh = UiBuilder.buildHeaderDropup(col.icon, col.key, col.options, rowsArray);
      headerRow.appendChild(dropupTh);
    });

    tableHeader.appendChild(headerRow);
    tableElement.appendChild(tableHeader);
    tableElement.appendChild(tableBody);
    
    FilterManager.initializeTableFilter(headerSetup.input, headerSetup.clearBtn, rowsArray, containerElement);

    // System Picker Command Core execution dispatch trigger wire rules
    toolbarBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      headerSetup.input.focus();
      const scrollLockEvt = new KeyboardEvent('keydown', { key: 'ScrollLock', bubbles: true });
      window.dispatchEvent(scrollLockEvt);
    });

    // FIX: ATTACH CLICK HANDLER TO SWITCH ACCENT BACKGROUND AND MANAGE GLOBALS IN TUTOR HOOKS
    const handleTutorToggle = () => {
      window.ProjectGridTutorModeActive = !window.ProjectGridTutorModeActive;
      if (window.ProjectGridTutorModeActive) {
        tutorToggleBtn.classList.add('projectgrid-tutor-active');
        tutorToggleBtn.style.backgroundColor = 'var(--text-accent, #70a1ff)';
        tutorToggleBtn.style.color = '#000000';
        // Immediately force recalculations to show help boxes right away over active nodes
        if (window.ProjectGridTriggerTutorHelpBoxRedraw) {
          window.ProjectGridTriggerTutorHelpBoxRedraw(document.activeElement);
        }
      } else {
        tutorToggleBtn.classList.remove('projectgrid-tutor-active');
        tutorToggleBtn.style.backgroundColor = 'transparent';
        tutorToggleBtn.style.color = 'var(--text-normal)';
        const oldTip = document.getElementById('projectgrid-tutor-tooltip-portal');
        if (oldTip) oldTip.style.display = 'none';
      }
    };

    tutorToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      handleTutorToggle();
    });

    // Global background keyboard shortcuts listener trap (Ctrl+Alt+T handles fast accessibility toggles)
    const hotkeyListener = (evt) => {
      if (evt.ctrlKey && evt.altKey && evt.key.toLowerCase() === 't') {
        evt.preventDefault();
        handleTutorToggle();
      }
    };
    window.removeEventListener('keydown', hotkeyListener);
    window.addEventListener('keydown', hotkeyListener);

    if (rowsArray.length > 0) {
      containerElement.appendChild(tableElement);
    } else {
      containerElement.insertAdjacentHTML('beforeend', `<p class="projectgrid-empty-warning-message">ℹ️ *No folders matching \`${rootTarget}/Folder/+Folder.md\` were discovered.*</p>`);
    }
  }
};

// ==========================================
// END OF FILE: _main.js
// ==========================================
