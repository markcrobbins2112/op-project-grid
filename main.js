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
  
        .projectgrid-focus-overlay-portal,
        .projectgrid-row-overlay-portal {
          position: fixed !important;
          pointer-events: none !important;
          box-sizing: border-box !important;
          border: 2px solid #ff4757 !important;
          border-radius: 4px !important;
          display: none;
          animation: projectgrid-master-hue-spin 3s linear infinite !important;
        }
        
        .projectgrid-focus-overlay-portal {
          z-index: 999999 !important;
        }
        
        .projectgrid-row-overlay-portal {
          z-index: 999998 !important;
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
          z-index: 10010 !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25) !important;
          box-sizing: border-box !important;
        }
        .projectgrid-custom-dropdown-item {
          padding: 4px 4px !important;
          cursor: pointer !important;
          color: var(--text-normal) !important;
          text-align: center !important;
          font-size: 11px !important;
          box-sizing: border-box !important;
          width: 100% !important;
          background-color: transparent !important;
        }
  
        .projectgrid-command-picker {
          position: fixed !important; 
          background-color: var(--background-secondary, #1e1e1e) !important;
          border: 1px solid #3d3d3d !important; 
          border-radius: 6px !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5) !important;
          z-index: 500000 !important; 
          padding: 6px !important;
          min-width: 220px !important;
          box-sizing: border-box !important;
        }
        .projectgrid-picker-item {
          padding: 6px 10px !important;
          cursor: pointer !important;
          border-radius: 4px !important;
          color: var(--text-normal, #ffffff) !important;
          font-size: 12px !important;
          box-sizing: border-box !important;
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
return {
    getMenuSchema(filterInput, rowsArray, containerElement, closeMenuCallback) {
      const activeRow = rowsArray.find(row => row.element.classList.contains('projectgrid-row-focused'));
  
      return [
        {
          name: '📁 Filters',
          items: [
            { name: '⭐ Stars Filter', action: () => this.openHeaderDropup('stars') },
            { name: '💲 Value Filter', action: () => this.openHeaderDropup('value') },
            { name: '🐘 Size Filter', action: () => this.openHeaderDropup('size') },
            { name: '🎱 Depth Filter', action: () => this.openHeaderDropup('depth') },
            { name: '🏅 Priority Filter', action: () => this.openHeaderDropup('priority') },
            { name: '🚦 Status Filter', action: () => this.openHeaderDropup('status') },
            { name: '🔤 Lang Filter', action: () => this.openHeaderDropup('lang') },
            { name: '🎯 Target Filter', action: () => this.openHeaderDropup('target') }
          ]
        },
        {
          name: '📊 Columns',
          items: [
            { name: 'Focus Note Cell', action: () => this.focusRowCell(activeRow, 0) },
            { name: 'Focus Stars Field', action: () => this.focusRowCell(activeRow, 4) },
            { name: 'Focus Status Field', action: () => this.focusRowCell(activeRow, 9) }
          ]
        },
        {
          name: '🚀 Launch',
          items: [
            { name: '📁 Directory Opus', action: () => this.fireProtocol(activeRow, 'dopus') },
            { name: '💻 Cursor Editor', action: () => this.fireProtocol(activeRow, 'cursor') },
            { name: '💜 Obsidian Vault', action: () => this.fireProtocol(activeRow, 'obsidian') }
          ]
        },
        {
          name: '⚙️ System',
          items: [
            // FIX: SYSTEM CONTROLLER MENU APPENDS MULTI-CHAIN COLUMN SORTING DISPATCH OPTIONS
            { name: '🔀 Sort Chain: Status > Priority > Stars', action: () => this.executeMultiColumnSort(rowsArray, ['status', 'priority', 'stars']) },
            { name: '🔀 Sort Chain: Stars > Value > Size', action: () => this.executeMultiColumnSort(rowsArray, ['stars', 'value', 'size']) },
            { name: '🔀 Sort Chain: Lang > Target > Status', action: () => this.executeMultiColumnSort(rowsArray, ['lang', 'target', 'status']) },
            { name: '✕ Clear All Filters', action: () => this.clearAllSystemFilters(filterInput) },
            { name: '🔄 Reload Component', action: () => this.reloadActiveAppWorkspace() }
          ]
        }
      ];
    },
  
    // FIX: ADVANCED TRIPLE-TIER DATA MATRIX CHRONOLOGICAL MULTI-COLUMN SORT ENGINE
    executeMultiColumnSort(rowsArray, sortKeysChain) {
      const parentTableBody = rowsArray[0].element.parentElement;
      
      rowsArray.sort((rowA, rowB) => {
        // Isolate chain layer variables explicitly
        const k1 = sortKeysChain[0], k2 = sortKeysChain[1], k3 = sortKeysChain[2];
        
        const vA1 = String(rowA.yamlMetadataValues[k1] || '⬛'), vB1 = String(rowB.yamlMetadataValues[k1] || '⬛');
        const vA2 = String(rowA.yamlMetadataValues[k2] || '⬛'), vB2 = String(rowB.yamlMetadataValues[k2] || '⬛');
        const vA3 = String(rowA.yamlMetadataValues[k3] || '⬛'), vB3 = String(rowB.yamlMetadataValues[k3] || '⬛');
  
        // Tier 1 Compare Evaluation
        if (vA1 !== vB1) return vA1.localeCompare(vB1);
        // Tier 2 Compare Evaluation
        if (vA2 !== vB2) return vA2.localeCompare(vB2);
        // Tier 3 Compare Evaluation
        return vA3.localeCompare(vB3);
      });
  
      // Detach and re-append sorted row elements onto the master parent body layout track
      rowsArray.forEach(rowObj => {
        parentTableBody.appendChild(rowObj.element);
      });
    },
  
    openHeaderDropup(key) {
      const trigger = document.querySelector(`.projectgrid-header-dropup-trigger[data-key="${key}"]`);
      if (trigger) {
        const mousedownEvent = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
        trigger.dispatchEvent(mousedownEvent);
        setTimeout(() => { trigger.focus(); }, 50);
      }
    },
  
    focusRowCell(rowObj, cellIndex) {
      if (!rowObj) return alert('Highlight a row project using arrow keys first.');
      const targetCell = rowObj.element.children[cellIndex];
      const interactive = targetCell ? targetCell.querySelector('.projectgrid-custom-select-btn, a, input') : null;
      if (interactive) interactive.focus();
    },
  
    fireProtocol(rowObj, protocol) {
      if (!rowObj) return alert('Highlight a row project using arrow keys first.');
      const linkEl = rowObj.element.querySelector(`a[href^="aip://${protocol}"]`);
      if (linkEl) window.location.href = linkEl.getAttribute('href');
    },
  
    clearAllSystemFilters(filterInput) {
      filterInput.value = '';
      document.querySelectorAll('.projectgrid-dropup-panel input[type="checkbox"]').forEach(cb => cb.checked = true);
      document.querySelectorAll('.projectgrid-custom-select-btn').forEach(btn => btn.textContent = '⬛');
      if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
      filterInput.focus();
    },
  
    reloadActiveAppWorkspace() {
      const activeLeaf = window.app.workspace.getActiveViewOfType(require('obsidian').MarkdownView);
      if (activeLeaf) activeLeaf.previewMode?.rerender(true);
    }
  };
})();
const MenuDom = (function() {
return {
    renderPickerBox(filterInput, itemsList, selectedIndex, containerElement, onItemClick, onClose) {
      this.destroyActivePickers(containerElement);
  
      const picker = document.createElement('div');
      picker.className = 'projectgrid-command-picker';
      
      // FIX: Map coordinates dynamically relative to the window viewport to bypass card layer restraints
      const rect = filterInput.getBoundingClientRect();
      picker.style.top = `${rect.bottom + window.scrollY + 4}px`;
      picker.style.left = `${rect.left + window.scrollX}px`;
  
      itemsList.forEach((item, idx) => {
        const el = document.createElement('div');
        el.className = 'projectgrid-picker-item';
        
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
  
      document.body.appendChild(picker); // Attached straight to highest body tracking scope
  
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
    }
  };
})();

return {
  bindKeyboardEvents(filterInput, rowsArray, containerElement, getVisibleRows, updateFocusIndex) {
    let pickerLevel = 0; 
    let activeItems = [];
    let activeIndex = 0;
    let storedCategoryIndex = 0;

    const closeAllPickers = () => {
      pickerLevel = 0;
      MenuDom.destroyActivePickers(containerElement);
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
          render();
        }
      }
    });

    filterInput.addEventListener('keydown', (evt) => {
      const visibleRows = getVisibleRows();

      if (pickerLevel > 0) {
        if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp') {
          evt.preventDefault();
          activeIndex = evt.key === 'ArrowDown' ? ((activeIndex + 1) % activeItems.length) : ((activeIndex - 1 + activeItems.length) % activeItems.length);
          render();
        } else if (evt.key === 'Enter') {
          evt.preventDefault();
          executeSelection();
        } else if (evt.key === 'Escape') {
          evt.preventDefault();
          if (pickerLevel === 2) {
            pickerLevel = 1;
            activeItems = MenuState.getMenuSchema(filterInput, rowsArray, containerElement, closeAllPickers);
            activeIndex = storedCategoryIndex;
            render();
          } else {
            closeAllPickers();
          }
        }
        return;
      }

      // --- CRITICAL DOWNSTREAM ROW SELECTION ENGINE FIXED OVERLAY SYNCS ---
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
        
        // Ensure row indicators follow focus cleanly
        if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(targetRow);
        targetRow.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    });

    const render = () => {
      const pickerEl = MenuDom.renderPickerBox(filterInput, activeItems, activeIndex, containerElement, (idx) => {
        activeIndex = idx;
        executeSelection();
      }, closeAllPickers);

      setTimeout(() => {
        const targetItem = pickerEl.querySelectorAll('.projectgrid-picker-item')[activeIndex];
        if (targetItem && window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(targetItem);
      }, 10);
    };

    const executeSelection = () => {
      if (pickerLevel === 1) {
        storedCategoryIndex = activeIndex;
        activeItems = activeItems[activeIndex].items;
        pickerLevel = 2;
        activeIndex = 0;
        render();
      } else if (pickerLevel === 2) {
        const selectedAction = activeItems[activeIndex].action;
        closeAllPickers();
        if (selectedAction) selectedAction();
      }
    };
  }
};
})();

return {
  initializeTableFilter(filterInput, clearButton, rowsArray, containerElement) {
    let currentFocusedIndex = -1;

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
        const metadata = row.yamlMetadataValues || {};
        const launchers = row.launcherValues || {};
        const allFields = { ...metadata, ...launchers };

        Object.keys(allFields).forEach(key => {
          const valueStr = String(allFields[key]);
          if (!globalCounts[key]) globalCounts[key] = { total: 0, valMap: {} };
          if (!visibleCounts[key]) visibleCounts[key] = { valMap: {} };

          globalCounts[key].total++;
          globalCounts[key].valMap[valueStr] = (globalCounts[key].valMap[valueStr] || 0) + 1;
        });

        const passText = row.searchText.includes(val);
        const passDropdowns = Object.values(row.dropdownFilters || {}).every(status => status === true);
        
        if (passText && passDropdowns) {
          row.element.style.display = '';
          Object.keys(allFields).forEach(key => {
            const valueStr = String(allFields[key]);
            visibleCounts[key].valMap[valueStr] = (visibleCounts[key].valMap[valueStr] || 0) + 1;
          });
        } else {
          row.element.style.display = 'none';
        }
      });

      // Update counters text without curly braces
      rowsArray.forEach(row => {
        if (!row.element) return;
        const selects = row.element.querySelectorAll('.projectgrid-custom-select-btn');
        
        selects.forEach(btn => {
          const fIdx = btn.getAttribute('data-field-index');
          const fieldsConfigKeys = ['stars', 'value', 'size', 'depth', 'priority', 'status', 'lang', 'target'];
          const key = fieldsConfigKeys[fIdx];
          if (!key) return;

          const currentVal = row.yamlMetadataValues ? String(row.yamlMetadataValues[key]) : '⬛';
          const visNum = visibleCounts[key]?.valMap[currentVal] || 0;
          const totNum = globalCounts[key]?.valMap[currentVal] || 0;
          btn.textContent = `${currentVal} ${visNum}/${totNum}`;
        });
      });

      // Re-sync header counters text layouts
      document.querySelectorAll('.projectgrid-header-dropup-trigger').forEach(trigger => {
        const key = trigger.getAttribute('data-key');
        if (!key) return;
        const totalItems = globalCounts[key]?.total || 0;
        const visibleItems = Object.values(visibleCounts[key]?.valMap || {}).reduce((a, b) => a + b, 0);
        const baseIcon = trigger.textContent.split(' ')[0];
        trigger.textContent = `${baseIcon} ${visibleItems}/${totalItems}`;
      });

      // --- FIX: AUTOMATICALLY ENSURE A ROW INDICATOR IS ALWAYS ACTIVE ---
      const visibleRows = rowsArray.filter(row => row.element && row.element.style.display !== 'none');
      if (visibleRows.length > 0) {
        // If our pointer was cleared or went out of bounds, snap it cleanly to the first visible row
        if (currentFocusedIndex < 0 || currentFocusedIndex >= visibleRows.length) {
          currentFocusedIndex = 0;
        }
        const targetRow = visibleRows[currentFocusedIndex].element;
        targetRow.classList.add('projectgrid-row-focused');
        
        if (window.ProjectGridUpdateRowOverlay) {
          window.ProjectGridUpdateRowOverlay(targetRow);
        }
      } else {
        currentFocusedIndex = -1;
        if (window.ProjectGridUpdateRowOverlay) {
          window.ProjectGridUpdateRowOverlay(null);
        }
      }
    };

    filterInput.addEventListener('input', applyFilter);

    MenuCore.bindKeyboardEvents(filterInput, rowsArray, containerElement, () => {
      return rowsArray.filter(row => row.element && row.element.style.display !== 'none');
    }, (index) => {
      currentFocusedIndex = index;
      // Re-evaluate overlays using a safe structural tracking loop
      const visibleRows = rowsArray.filter(row => row.element && row.element.style.display !== 'none');
      clearRowHighlights();
      if (visibleRows[index]) {
        visibleRows[index].element.classList.add('projectgrid-row-focused');
        if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(visibleRows[index].element);
      }
    });

    clearButton.addEventListener('click', () => {
      filterInput.value = '';
      applyFilter();
      filterInput.focus();
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
  
      const closePanel = () => {
        if (activePanel) { activePanel.remove(); activePanel = null; }
        if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
      };
  
      const openPanel = () => {
        closePanel();
        selectionIdx = 0;
        activePanel = document.createElement('div');
        activePanel.className = 'projectgrid-dropup-panel';
  
        const rect = trigger.getBoundingClientRect();
        activePanel.style.position = 'fixed';
        
        // FIX 1: ALTER BOUNDING BOX POSITION FROM RECT.BOTTOM TO RECT.TOP TO FORCE DROP-UP BEHAVIOR
        // Using an implicit margin offset handles vertical clearance smoothly
        activePanel.style.bottom = `${window.innerHeight - rect.top + 4}px`;
        activePanel.style.left = `${rect.left + window.scrollX}px`;
        activePanel.style.zIndex = '300000';
        activePanel.style.height = 'auto';
  
        fullOptionsList.forEach((opt, oIdx) => {
          const wrapper = document.createElement('label');
          wrapper.className = 'projectgrid-dropup-option';
          
          if (oIdx === selectionIdx && window.ProjectGridUpdateFocusOverlay) {
            setTimeout(() => window.ProjectGridUpdateFocusOverlay(wrapper), 10);
          }
  
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.tabIndex = -1; 
          
          if (opt === '[ALL]') {
            checkbox.checked = (activeFilters.size === defaults.length);
          } else {
            checkbox.checked = activeFilters.has(opt);
          }
  
          checkbox.addEventListener('change', () => handleToggle(opt, checkbox.checked));
  
          wrapper.appendChild(checkbox);
          wrapper.appendChild(document.createTextNode(opt));
          activePanel.appendChild(wrapper);
        });
  
        trigger.addEventListener('keydown', handlePanelKeys);
        activePanel.addEventListener('mousedown', (e) => e.stopPropagation());
        document.body.appendChild(activePanel);
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
          boxes[0].checked = (activeFilters.size === defaults.length);
          defaults.forEach((d, idx) => { boxes[idx + 1].checked = activeFilters.has(d); });
        }
  
        // FIX 2: STRIP EXTRA ICON TRAILS NATIVELY TO RESOLVE FILTER RE-SYNC CACHE MISSES
        rowsArray.forEach(row => {
          if (!row.dropdownFilters) row.dropdownFilters = {};
          
          const rawVal = row.yamlMetadataValues && row.yamlMetadataValues[key] ? String(row.yamlMetadataValues[key]) : '⬛';
          const sanitizedRaw = rawVal.replace(/[⭐💲🐘🎱🏅🛑🌐🛠🧪📦]/g, '').trim();
  
          // Check if our active validation pool contains matching sanitized elements
          let isMatchFound = false;
          activeFilters.forEach(filterOpt => {
            const sanitizedFilter = filterOpt.replace(/[⭐💲🐘🎱🏅🛑🌐🛠🧪📦]/g, '').trim();
            if (sanitizedRaw === sanitizedFilter || (sanitizedRaw === '⬛' && sanitizedFilter === '⬛')) {
              isMatchFound = true;
            }
          });
  
          row.dropdownFilters[key] = isMatchFound;
        });
  
        if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
      };
  
      function handlePanelKeys(evt) {
        if (!activePanel) return;
  
        if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp') {
          evt.preventDefault();
          evt.stopPropagation();
          
          selectionIdx = evt.key === 'ArrowDown' ? ((selectionIdx + 1) % fullOptionsList.length) : ((selectionIdx - 1 + fullOptionsList.length) % fullOptionsList.length);
  
          const labels = activePanel.querySelectorAll('.projectgrid-dropup-option');
          if (labels[selectionIdx] && window.ProjectGridUpdateFocusOverlay) {
            window.ProjectGridUpdateFocusOverlay(labels[selectionIdx]);
          }
        } else if (evt.key === ' ' || evt.key === 'Spacebar') {
          evt.preventDefault();
          const cb = activePanel.querySelectorAll('input[type="checkbox"]')[selectionIdx];
          cb.checked = !cb.checked;
          handleToggle(fullOptionsList[selectionIdx], cb.checked);
        } else if (evt.key === 'Enter' || evt.key === 'Escape') {
          evt.preventDefault();
          trigger.removeEventListener('keydown', handlePanelKeys);
          closePanel(); trigger.focus();
        }
      }
  
      trigger.addEventListener('keydown', (evt) => {
        if (!activePanel) {
          if ((evt.key === 'ArrowDown' && evt.altKey) || evt.key === ' ' || evt.key === 'ArrowDown' || evt.key === 'Enter') {
            evt.preventDefault();
            openPanel();
          }
        }
      });
  
      trigger.addEventListener('focus', () => {
        if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(trigger);
      });
      trigger.addEventListener('blur', () => {
        setTimeout(() => {
          if (activePanel && !activePanel.contains(document.activeElement)) {
            trigger.removeEventListener('keydown', handlePanelKeys);
            closePanel();
          }
        }, 150);
      });
  
      trigger.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.projectgrid-dropup-panel').forEach(p => p.remove());
        if (activePanel) closePanel(); else openPanel();
      });
  
      document.addEventListener('mousedown', function closeHeaderMenu(e) {
        if (activePanel && !trigger.contains(e.target) && !activePanel.contains(e.target)) {
          trigger.removeEventListener('keydown', handlePanelKeys);
          closePanel();
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
const UiRowSelect = (function() {
const UiRowKeys = (function() {
return {
    handleClosedNavigation(evt, btn, tableRow, fieldIdx, cfg, filterInput) {
      if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp') {
        evt.preventDefault();
        const parentTable = tableRow.parentElement;
        const visibleRows = Array.from(parentTable.querySelectorAll('.projectgrid-matrix-row')).filter(r => r.style.display !== 'none');
        const currentRowIdx = visibleRows.indexOf(tableRow);
        let nextRowIdx = currentRowIdx + (evt.key === 'ArrowDown' ? 1 : -1);
  
        if (nextRowIdx >= 0 && nextRowIdx < visibleRows.length) {
          const targetRow = visibleRows[nextRowIdx];
          parentTable.querySelectorAll('.projectgrid-matrix-row').forEach(r => r.classList.remove('projectgrid-row-focused'));
          
          targetRow.classList.add('projectgrid-row-focused');
          const targetSelectBtn = targetRow.querySelectorAll('.projectgrid-custom-select-btn')[fieldIdx];
          if (targetSelectBtn) {
            targetSelectBtn.focus();
            targetRow.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          }
        }
        return true;
      }
  
      if (evt.key === 'Escape') {
        evt.preventDefault();
        filterInput.focus();
        return true;
      }
  
      if (evt.key === 'Tab') {
        evt.preventDefault();
        const siblingButtons = tableRow.querySelectorAll('.projectgrid-custom-select-btn');
        let nextIdx = fieldIdx + (evt.shiftKey ? -1 : 1);
        if (nextIdx >= 0 && nextIdx < siblingButtons.length) siblingButtons[nextIdx].focus();
        else if (nextIdx < 0) filterInput.focus();
        return true;
      }
  
      if (!cfg.isExtendable && (evt.key === 'ArrowRight' || evt.key === 'ArrowLeft')) {
        evt.preventDefault();
        const siblingButtons = tableRow.querySelectorAll('.projectgrid-custom-select-btn');
        let nextIdx = fieldIdx + (evt.key === 'ArrowRight' ? 1 : -1);
        if (nextIdx >= 0 && nextIdx < siblingButtons.length) siblingButtons[nextIdx].focus();
        return true;
      }
      
      return false;
    }
  };
})();

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

    const closeDropdown = () => { if (activeDropdown) { activeDropdown.remove(); activeDropdown = null; } };

    const openDropdown = () => {
      closeDropdown();
      activeDropdown = document.createElement('ul');
      activeDropdown.className = 'projectgrid-custom-dropdown-list';
      
      const rect = btn.getBoundingClientRect();
      Object.assign(activeDropdown.style, {
        position: 'fixed', top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`, width: `${rect.width}px`,
        zIndex: '200000', height: 'auto', maxHeight: 'none'
      });

      optionsList.forEach((opt, oIdx) => {
        const li = document.createElement('li');
        li.className = 'projectgrid-custom-dropdown-item';
        li.textContent = opt;
        
        if (oIdx === selectionIdx && window.ProjectGridUpdateFocusOverlay) {
          setTimeout(() => window.ProjectGridUpdateFocusOverlay(li), 10);
        }

        li.addEventListener('mousedown', (e) => { e.preventDefault(); commitSelection(opt); });
        activeDropdown.appendChild(li);
      });
      document.body.appendChild(activeDropdown);
    };

    const commitSelection = async (value) => {
      const fileAbstract = app.vault.getAbstractFileByPath(expectedNotePath);
      const finalVal = value === '⬛' ? '' : value;
      if (fileAbstract) {
        await app.fileManager.processFrontMatter(fileAbstract, (fm) => {
          if (finalVal === '') { delete fm[cfg.key]; rowTrackingReference.yamlMetadataValues[cfg.key] = '⬛'; }
          else { fm[cfg.key] = finalVal; rowTrackingReference.yamlMetadataValues[cfg.key] = finalVal; }
        });
        btn.textContent = value; closeDropdown();
        if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
        const siblingButtons = tableRow.querySelectorAll('.projectgrid-custom-select-btn');
        if (fieldIdx + 1 < siblingButtons.length) siblingButtons[fieldIdx + 1].focus();
        else filterInput.focus();
      }
    };

    btn.addEventListener('focus', () => {
      if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(btn);
      if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(tableRow);
    });
    
    btn.addEventListener('blur', () => {
      setTimeout(closeDropdown, 120);
      if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
      if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(null);
    });
    
    btn.addEventListener('mousedown', (e) => { e.stopPropagation(); btn.focus(); if (activeDropdown) closeDropdown(); else openDropdown(); });

    btn.addEventListener('keydown', (evt) => {
      if (activeDropdown) {
        if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp') {
          evt.preventDefault();
          selectionIdx = evt.key === 'ArrowDown' ? ((selectionIdx + 1) % optionsList.length) : ((selectionIdx - 1 + optionsList.length) % optionsList.length);
          
          const items = activeDropdown.querySelectorAll('.projectgrid-custom-dropdown-item');
          if (items[selectionIdx] && window.ProjectGridUpdateFocusOverlay) {
            window.ProjectGridUpdateFocusOverlay(items[selectionIdx]);
          }
          return;
        } else if (evt.key === 'Enter') { evt.preventDefault(); commitSelection(optionsList[selectionIdx]); return; }
        else if (evt.key === 'Escape') { evt.preventDefault(); closeDropdown(); btn.focus(); return; }
      }
      if (!activeDropdown) {
        if (evt.key === 'ArrowDown' && evt.altKey) { evt.preventDefault(); openDropdown(); return; }
        UiRowKeys.handleClosedNavigation(evt, btn, tableRow, fieldIdx, cfg, filterInput);
      }
    });

    cell.appendChild(btn);
  }
};
})();

return {
  buildRow(folder, absoluteVaultRoot, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput, rowsArray) {
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

    // Columns 2, 3, 4: App Launcher shortcuts (Passes app context layer)
    UiRowActions.appendLauncherButtons(tableRow, folder, absoluteVaultRoot, app);

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

    rowTrackingReference.yamlMetadataValues = {};

    fieldsConfig.forEach((cfg, fieldIdx) => {
      const cell = document.createElement('td');
      cell.className = 'projectgrid-matrix-cell select-cell projectgrid-uniform-yaml-td';
      
      // RELAYS CURRENT WORKSPACE ROW MATRIX ARRAYS FOR DYNAMIC SELECTION OVERLAY PROCESSING
      UiRowSelect.buildSelectButton(cell, tableRow, fieldIdx, cfg, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput, rowsArray);
      
      tableRow.appendChild(cell);
    });

    return tableRow;
  }
};
})();

return {
  generateHeaderCell() {
    this.ensureFocusOverlaysExist();

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

    // Attach active search field focus event listeners to register overlay highlights instantly
    filterInput.addEventListener('focus', () => {
      if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(filterInput);
    });
    filterInput.addEventListener('blur', () => {
      if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
    });

    return { cell: noteHeaderCell, input: filterInput, clearBtn: clearButton };
  },

  // FIX: INITIALIZES DUAL SEPARATED NON-INTERACTIVE OVERLAY PORTALS APPENDED STRAIGHT TO DOM BODY
  ensureFocusOverlaysExist() {
    let focusOverlay = document.getElementById('projectgrid-global-focus-overlay');
    if (!focusOverlay) {
      focusOverlay = document.createElement('div');
      focusOverlay.id = 'projectgrid-global-focus-overlay';
      focusOverlay.className = 'projectgrid-focus-overlay-portal';
      document.body.appendChild(focusOverlay);
    }

    let rowOverlay = document.getElementById('projectgrid-global-row-overlay');
    if (!rowOverlay) {
      rowOverlay = document.createElement('div');
      rowOverlay.id = 'projectgrid-global-row-overlay';
      rowOverlay.className = 'projectgrid-row-overlay-portal';
      document.body.appendChild(rowOverlay);
    }

    // Connect global window execution tracking macros
    window.ProjectGridUpdateFocusOverlay = (targetElement) => {
      if (!targetElement) { focusOverlay.style.display = 'none'; return; }
      const rect = targetElement.getBoundingClientRect();
      Object.assign(focusOverlay.style, {
        display: 'block', top: `${rect.top + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`, width: `${rect.width}px`, height: `${rect.height}px`
      });
    };

    window.ProjectGridUpdateRowOverlay = (targetRow) => {
      if (!targetRow) { rowOverlay.style.display = 'none'; return; }
      const rect = targetRow.getBoundingClientRect();
      Object.assign(rowOverlay.style, {
        display: 'block', top: `${rect.top + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`, width: `${rect.width}px`, height: `${rect.height}px`
      });
    };
  },

  buildHeaderDropup(titleIcon, key, defaults, rowsArray) {
    return UiDropdown.buildHeaderDropup(titleIcon, key, defaults, rowsArray);
  },

  buildRow(folder, absoluteVaultRoot, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput) {
    return UiRow.buildRow(folder, absoluteVaultRoot, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput);
  }
};
})();

module.exports = class ProjectGridPlugin extends Plugin {
  async onload() {
    console.log('%c[ProjectGrid]%c Core initialized...', 'color: #00d2d3; font-weight: bold;', 'color: default;');
    StylesManager.injectStyles();

    this.registerMarkdownCodeBlockProcessor('projectgrid', (sourceText, element) => {
      this.renderProjectGridDashboard(sourceText, element);
    });
  }

  onunload() {
    const styleEl = document.getElementById('obsidian-projectgrid-styles');
    if (styleEl) styleEl.remove();
    const overlay = document.getElementById('projectgrid-global-focus-overlay');
    if (overlay) overlay.remove();
    const rOverlay = document.getElementById('projectgrid-global-row-overlay');
    if (rOverlay) rOverlay.remove();
  }

  renderProjectGridDashboard(sourceText, containerElement) {
    const rootTarget = sourceText.trim() || "__";
    const absoluteVaultRoot = this.app.vault.adapter.getBasePath();
    const targetFolders = this.app.vault.getAllLoadedFiles().filter(file => file.children && file.path.startsWith(rootTarget));

    const toolbar = document.createElement('div');
    toolbar.className = 'projectgrid-toolbar';
    
    const toolbarBtn = document.createElement('button');
    toolbarBtn.className = 'projectgrid-toolbar-btn';
    toolbarBtn.innerHTML = '⚙️';
    toolbarBtn.title = 'Open ScrollLock System Commands Picker Menu';
    toolbar.appendChild(toolbarBtn);
    containerElement.appendChild(toolbar);

    const tableElement = document.createElement('table');
    tableElement.className = 'projectgrid-matrix-table';

    const tableHeader = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const headerSetup = UiBuilder.generateHeaderCell();
    headerRow.appendChild(headerSetup.cell);
    
    // Columns 2, 3, 4: Generates the 3 unique static table header icons
    headerRow.insertAdjacentHTML('beforeend', `
      <th style="width: 5%; text-align: center;" title="Directory Opus">📁</th>
      <th style="width: 5%; text-align: center;" title="Cursor Workspace">💻</th>
      <th style="width: 5%; text-align: center;" title="Obsidian Vault">💜</th>
    `);

    // FIX: COMPLETELY REMOVED THE LAUNCHERCOLUMNS INTERACTIVE HEADERS LOOP TO STOP COLUMN SHIFTING

    // Define the 8 exact YAML frontmatter metadata columns matching your metadata fields (Columns 5 through 12)
    const columnDropdowns = [
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

    targetFolders.forEach(folder => {
      const expectedNotePath = `${folder.path}/+${folder.name}.md`;
      if (this.app.vault.getAbstractFileByPath(expectedNotePath)) {
        const fileCache = this.app.metadataCache.getCache(expectedNotePath);
        const frontmatter = fileCache ? fileCache.frontmatter : null;

        const rowRef = { element: null, searchText: `+${folder.name}.md`.toLowerCase() };
        rowRef.element = UiBuilder.buildRow(folder, absoluteVaultRoot, expectedNotePath, this.app, frontmatter, rowRef, headerSetup.input);
        
        tableBody.appendChild(rowRef.element);
        rowsArray.push(rowRef);
      }
    });

    // Build and append the 8 interactive YAML metadata dropup filter headers directly over columns 5-12
    columnDropdowns.forEach(col => {
      const dropupTh = UiBuilder.buildHeaderDropup(col.icon, col.key, col.options, rowsArray);
      headerRow.appendChild(dropupTh);
    });

    tableHeader.appendChild(headerRow);
    tableElement.appendChild(tableHeader);
    tableElement.appendChild(tableBody);
    
    FilterManager.initializeTableFilter(headerSetup.input, headerSetup.clearBtn, rowsArray, containerElement);

    toolbarBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      headerSetup.input.focus();
      const scrollLockEvt = new KeyboardEvent('keydown', { key: 'ScrollLock', bubbles: true });
      window.dispatchEvent(scrollLockEvt);
    });

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
