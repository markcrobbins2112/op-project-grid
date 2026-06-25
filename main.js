// ==========================================
// START OF FILE: _main.js
// ==========================================

const { Plugin } = require('obsidian');
const StylesManager = (function() {
return {
    injectStyles() {
      if (document.getElementById('obsidian-projectgrid-styles')) return;
  
      const styleEl = document.createElement('style');
      styleEl.id = 'obsidian-projectgrid-styles';
  
      styleEl.innerHTML = `
        .cm-embed-block:has(.projectgrid-matrix-table),
        .block-language-projectgrid {
          max-width: 100% !important;
          width: 100% !important;
          grid-column: 1 / -1 !important;
        }
        .projectgrid-matrix-table {
          width: 100% !important;
          border-collapse: collapse !important;
          margin-top: 12px !important;
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
  
        /* MASTER HUE-CYCLING CRITICAL DEFINITION MAP */
        @keyframes projectgrid-hue-cycle {
          0% { box-shadow: inset 0 0 0 2px #ff4757 !important; filter: hue-rotate(0deg); }
          100% { box-shadow: inset 0 0 0 2px #ff4757 !important; filter: hue-rotate(360deg); }
        }
        .projectgrid-matrix-row {
          border-bottom: 1px solid var(--background-modifier-border, #2a2a2a) !important;
          position: relative !important;
          box-sizing: border-box !important;
        }
        .projectgrid-matrix-row:hover {
          background-color: var(--background-modifier-hover, rgba(255, 255, 255, 0.01)) !important;
        }
        
        /* FIX: ENACTIVE ROTATING HUE INNER GLOW ENFORCED BOUNDS FOR ROW TRACKS */
        .projectgrid-row-focused {
          background-color: var(--background-modifier-hover, rgba(112, 161, 255, 0.08)) !important;
          animation: projectgrid-hue-cycle 3s linear infinite !important;
        }
  
        .projectgrid-matrix-cell { padding: 6px 4px !important; vertical-align: middle !important; }
        .note-title-cell { font-weight: 500 !important; white-space: nowrap !important; }
        .projectgrid-matrix-link { text-decoration: none !important; }
        .projectgrid-matrix-link:hover { text-decoration: none !important; }
        
        /* FIX: FORCE NO UNDERLINES ON THE LAUNCH COLUMNS LINK HANDLERS */
        .action-icon-cell { text-align: center !important; }
        .action-icon-cell a { text-decoration: none !important; }
        .action-icon-cell a:hover { text-decoration: none !important; }
  
        .projectgrid-header-dropup-trigger {
          cursor: pointer !important;
          display: inline-block !important;
          padding: 4px 2px !important;
          border-radius: 4px !important;
          user-select: none !important;
          font-size: 13px !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }
        .projectgrid-header-dropup-trigger:hover {
          background-color: var(--background-modifier-hover, rgba(255, 255, 255, 0.08)) !important;
        }
  
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
        
        /* FIX: ENFORCE NATIVE HUE BORDER ALIGNMENT STATES TO ACTIVE CHECKBOX INDICATORS TOO */
        .projectgrid-dropup-option.projectgrid-row-focused {
          animation: projectgrid-hue-cycle 3s linear infinite !important;
        }
        .projectgrid-dropup-option:hover {
          background-color: var(--background-modifier-hover, rgba(255,255,255,0.03)) !important;
        }
        .projectgrid-dropup-option input[type="checkbox"] {
          margin: 0 !important;
          cursor: pointer !important;
        }
  
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
        .projectgrid-custom-select-btn:focus {
          border-color: var(--text-accent, #70a1ff) !important;
          outline: none !important;
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
        
        /* FIX: SUB-SELECTION ITEM BOX OUTLINES ENFORCE ONLY HUE REVOLVING CHROME BOUNDS */
        .projectgrid-custom-dropdown-item {
          padding: 4px 4px !important;
          cursor: pointer !important;
          color: var(--text-normal) !important;
          text-align: center !important;
          font-size: 11px !important;
          box-sizing: border-box !important;
          width: 100% !important;
          border: 2px solid transparent !important;
        }
  
        .projectgrid-command-picker {
          position: absolute !important;
          background-color: var(--background-secondary, #1e1e1e) !important;
          border: 1px solid var(--text-accent, #70a1ff) !important;
          border-radius: 6px !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4) !important;
          z-index: 10000 !important;
          padding: 6px !important;
          min-width: 200px !important;
          box-sizing: border-box !important;
        }
        .projectgrid-picker-item {
          padding: 6px 10px !important;
          cursor: pointer !important;
          border-radius: 4px !important;
          color: var(--text-normal, #ffffff) !important;
          font-size: 12px !important;
        }
        .projectgrid-picker-highlight,
        .projectgrid-picker-item:hover {
          background-color: var(--text-accent, #70a1ff) !important;
          color: #000000 !important;
        }
      `;
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
            { name: '✕ Clear All Filters', action: () => this.clearAllSystemFilters(filterInput) },
            { name: '🔄 Reload Component', action: () => this.reloadActiveAppWorkspace() }
          ]
        }
      ];
    },
  
    // FIX: ROUTER FORCES ACTIVE FOCUS TO SHIFT FROM COMPLETED SELECTION DIRECTLY INTO PANEL NODES
    openHeaderDropup(key) {
      const trigger = document.querySelector(`.projectgrid-header-dropup-trigger[data-key="${key}"]`);
      if (trigger) {
        // Simulate click down to build and mount the portal panel layout
        const mousedownEvent = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
        trigger.dispatchEvent(mousedownEvent);
        
        // Delay execution a fraction of a millisecond to let portal finish spawning
        setTimeout(() => {
          const activePanel = document.querySelector('.projectgrid-dropup-panel');
          if (activePanel) {
            // Put focus inside the newly deployed filter container box
            trigger.focus();
          }
        }, 50);
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
      
      // Position picker panel directly aligned beneath the text search field
      picker.style.top = `${filterInput.offsetTop + filterInput.offsetHeight + 4}px`;
      picker.style.left = `${filterInput.offsetLeft}px`;
  
      itemsList.forEach((item, idx) => {
        const el = document.createElement('div');
        el.className = 'projectgrid-picker-item';
        if (idx === selectedIndex) el.classList.add('projectgrid-picker-highlight');
        el.textContent = item.name;
  
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          onItemClick(idx);
        });
  
        picker.appendChild(el);
      });
  
      containerElement.appendChild(picker);
  
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
      const existing = containerElement.querySelectorAll('.projectgrid-command-picker');
      existing.forEach(p => p.remove());
    }
  };
})();

return {
  bindKeyboardEvents(filterInput, rowsArray, containerElement, getVisibleRows, updateFocusIndex) {
    let pickerLevel = 0; // 0 = Closed, 1 = Categories Wheel, 2 = Sub Items list
    let activeItems = [];
    let activeIndex = 0;
    let storedCategoryIndex = 0;

    const closeAllPickers = () => {
      pickerLevel = 0;
      MenuDom.destroyActivePickers(containerElement);
      filterInput.focus();
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

      // FIX: IF EXTENSION DROPDOWN HEADER PANEL IS OPENED, FORWARD KEYBOARD ARROW CONTROL TRACKS
      const openHeaderPanel = document.querySelector('.projectgrid-dropup-panel');
      if (openHeaderPanel) {
        // Drop standard text cursor movements while menu handles selections
        if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp' || evt.key === 'Escape' || evt.key === 'Enter') {
          return; 
        }
      }

      if (pickerLevel > 0) {
        if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp') {
          evt.preventDefault();
          if (evt.key === 'ArrowDown') {
            activeIndex = (activeIndex + 1) >= activeItems.length ? 0 : activeIndex + 1;
          } else {
            activeIndex = (activeIndex - 1) < 0 ? activeItems.length - 1 : activeIndex - 1;
          }
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

      // --- STANDARD DOWNSTREAM ROW SELECTION ENGINE ---
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
        const targetRow = visibleRows[visibleIdx];
        targetRow.element.classList.add('projectgrid-row-focused');
        targetRow.element.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    });

    const render = () => {
      MenuDom.renderPickerBox(filterInput, activeItems, activeIndex, containerElement, (idx) => {
        activeIndex = idx;
        executeSelection();
      }, closeAllPickers);
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
      rowsArray.forEach(row => row.element.classList.remove('projectgrid-row-focused'));
    };

    const applyFilter = () => {
      const val = filterInput.value.toLowerCase().trim();
      clearButton.style.visibility = val ? 'visible' : 'hidden';
      currentFocusedIndex = -1;
      clearRowHighlights();
      
      rowsArray.forEach(row => {
        const passText = row.searchText.includes(val);
        const passDropdowns = Object.values(row.dropdownFilters || {}).every(status => status === true);
        
        if (passText && passDropdowns) {
          row.element.style.display = ''; // Clear inline styles to display row natively
        } else {
          row.element.style.display = 'none';
        }
      });
    };

    filterInput.addEventListener('input', applyFilter);

    // FIX: Core visibility checking condition updated to cleanly match visible row element arrays
    MenuCore.bindKeyboardEvents(filterInput, rowsArray, containerElement, () => {
      return rowsArray.filter(row => row.element.style.display !== 'none');
    }, (index) => {
      currentFocusedIndex = index;
      clearRowHighlights();
    });

    clearButton.addEventListener('click', () => {
      filterInput.value = '';
      applyFilter();
      filterInput.focus();
    });

    window.ProjectGridTriggerFilterUpdate = applyFilter;
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
      trigger.tabIndex = 0; // Allows headers to receive explicit keyboard focus
      trigger.textContent = titleIcon;
  
      let activePanel = null;
      let selectionIdx = 0;
      const activeFilters = new Set(defaults);
      const fullOptionsList = ['[ALL]', ...defaults];
  
      const closePanel = () => {
        if (activePanel) { activePanel.remove(); activePanel = null; }
      };
  
      const openPanel = () => {
        closePanel();
        selectionIdx = 0;
        activePanel = document.createElement('div');
        activePanel.className = 'projectgrid-dropup-panel';
  
        const rect = trigger.getBoundingClientRect();
        activePanel.style.position = 'fixed';
        activePanel.style.top = `${rect.bottom + window.scrollY + 4}px`;
        activePanel.style.left = `${rect.left + window.scrollX}px`;
        activePanel.style.zIndex = '300000';
        activePanel.style.height = 'auto';
  
        fullOptionsList.forEach((opt, oIdx) => {
          const wrapper = document.createElement('label');
          wrapper.className = 'projectgrid-dropup-option';
          
          // FIX: APPLY HUE ROTATING BORDER TO CURRENTLY CHOSEN KEYBOARD SELECTION INDICATOR
          if (oIdx === selectionIdx) wrapper.classList.add('projectgrid-row-focused');
          
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.tabIndex = -1; // Keep focus locked on the parent container
          
          if (opt === '[ALL]') {
            checkbox.checked = (activeFilters.size === defaults.length);
          } else {
            checkbox.checked = activeFilters.has(opt);
          }
  
          checkbox.addEventListener('change', () => {
            handleToggle(opt, checkbox.checked);
          });
  
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
          defaults.forEach((d, idx) => {
            boxes[idx + 1].checked = activeFilters.has(d);
          });
        }
  
        rowsArray.forEach(row => {
          if (!row.dropdownFilters) row.dropdownFilters = {};
          const currentVal = row.yamlMetadataValues && row.yamlMetadataValues[key] ? String(row.yamlMetadataValues[key]) : '⬛';
          row.dropdownFilters[key] = activeFilters.has(currentVal) || (currentVal === '⬛' && activeFilters.has('⬛'));
        });
  
        if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
      };
  
      // FIX: NATIVE CAPTURING ROUTINE STEPS CHROME BORDER INDICATOR SELECTIONS RELIABLY
      function handlePanelKeys(evt) {
        if (!activePanel) return;
  
        if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp') {
          evt.preventDefault();
          evt.stopPropagation(); // Stop parent components from executing main row drift jumps
          
          if (evt.key === 'ArrowDown') {
            selectionIdx = (selectionIdx + 1) >= fullOptionsList.length ? 0 : selectionIdx + 1;
          } else {
            selectionIdx = (selectionIdx - 1) < 0 ? fullOptionsList.length - 1 : selectionIdx - 1;
          }
  
          activePanel.querySelectorAll('.projectgrid-dropup-option').forEach((lbl, lIdx) => {
            if (lIdx === selectionIdx) lbl.className = 'projectgrid-dropup-option projectgrid-row-focused';
            else lbl.className = 'projectgrid-dropup-option';
          });
        } else if (evt.key === ' ' || evt.key === 'Spacebar') {
          evt.preventDefault();
          const cb = activePanel.querySelectorAll('input[type="checkbox"]')[selectionIdx];
          cb.checked = !cb.checked;
          handleToggle(fullOptionsList[selectionIdx], cb.checked);
        } else if (evt.key === 'Enter' || evt.key === 'Escape') {
          evt.preventDefault();
          trigger.removeEventListener('keydown', handlePanelKeys);
          closePanel();
          trigger.focus();
        }
      }
  
      trigger.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.projectgrid-dropup-panel').forEach(p => p.remove());
        if (activePanel) closePanel(); else openPanel();
      });
  
      // Ensure listeners drop when user exits container
      trigger.addEventListener('blur', () => {
        setTimeout(() => {
          if (activePanel && !activePanel.contains(document.activeElement)) {
            trigger.removeEventListener('keydown', handlePanelKeys);
            closePanel();
          }
        }, 150);
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
return {
    appendLauncherButtons(tableRow, folder, absoluteVaultRoot) {
      const absoluteLocalPath = `${absoluteVaultRoot}\\${folder.path}`.replace(/[/\\]+/g, '\\');
      
      const actions = [
        { protocol: 'dopus', icon: '📁', title: 'Open folder in Directory Opus' },
        { protocol: 'cursor', icon: '💻', title: 'Open workspace in Cursor' },
        { protocol: 'obsidian', icon: '💜', title: 'Open directory as Obsidian Vault' }
      ];
  
      actions.forEach(act => {
        const cell = document.createElement('td');
        cell.className = 'projectgrid-matrix-cell action-icon-cell';
        cell.innerHTML = `<a href="aip://${act.protocol}/${absoluteLocalPath}" class="projectgrid-aip-icon-btn" title="${act.title}">${act.icon}</a>`;
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
        li.className = oIdx === selectionIdx ? 'projectgrid-custom-dropdown-item projectgrid-row-focused' : 'projectgrid-custom-dropdown-item';
        li.textContent = opt;
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

    btn.addEventListener('blur', () => setTimeout(closeDropdown, 120));
    btn.addEventListener('mousedown', (e) => { e.stopPropagation(); btn.focus(); if (activeDropdown) closeDropdown(); else openDropdown(); });

    btn.addEventListener('keydown', (evt) => {
      if (activeDropdown) {
        if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp') {
          evt.preventDefault();
          selectionIdx = evt.key === 'ArrowDown' ? ((selectionIdx + 1) % optionsList.length) : ((selectionIdx - 1 + optionsList.length) % optionsList.length);
          activeDropdown.querySelectorAll('.projectgrid-custom-dropdown-item').forEach((li, lIdx) => {
            li.className = lIdx === selectionIdx ? 'projectgrid-custom-dropdown-item projectgrid-row-focused' : 'projectgrid-custom-dropdown-item';
          });
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
  buildRow(folder, absoluteVaultRoot, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput) {
    const tableRow = document.createElement('tr');
    tableRow.className = 'projectgrid-matrix-row';

    // Column 1: Core Note link cell
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

    // Columns 2, 3, 4: Launcher Buttons (Appended modularly)
    UiRowActions.appendLauncherButtons(tableRow, folder, absoluteVaultRoot);

    // Columns 5 through 12: Define the 8 metadata keys
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
      
      // Call custom select button builder (Defined in ui-row-select.js)
      UiRowSelect.buildSelectButton(cell, tableRow, fieldIdx, cfg, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput);
      
      tableRow.appendChild(cell);
    });

    return tableRow;
  }
};
})();

return {
  generateHeaderCell() {
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

    return { cell: noteHeaderCell, input: filterInput, clearBtn: clearButton };
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
  }

  renderProjectGridDashboard(sourceText, containerElement) {
    const rootTarget = sourceText.trim() || "__";
    const absoluteVaultRoot = this.app.vault.adapter.getBasePath();
    const targetFolders = this.app.vault.getAllLoadedFiles().filter(file => file.children && file.path.startsWith(rootTarget));

    const tableElement = document.createElement('table');
    tableElement.className = 'projectgrid-matrix-table';

    const tableHeader = document.createElement('thead');
    const headerRow = document.createElement('tr');

    // Column 1: Core dynamic search input filter field container (25% width)
    const headerSetup = UiBuilder.generateHeaderCell();
    headerRow.appendChild(headerSetup.cell);
    
    // Columns 2, 3, 4: Generates the 3 unique static table header icons
    headerRow.insertAdjacentHTML('beforeend', `
      <th style="width: 5%; text-align: center;" title="Directory Opus">📁</th>
      <th style="width: 5%; text-align: center;" title="Cursor Workspace">💻</th>
      <th style="width: 5%; text-align: center;" title="Obsidian Vault">💜</th>
    `);

    // FIX: COMPLETELY ELIMINATED THE launcherColumns ARRAY LOOP TO STOP THE 3 DUPLICATE ICONS FROM SHIFTING COLS

    // Define the 8 exact YAML frontmatter metadata columns (Columns 5 through 12)
    // Stars column (⭐) explicitly includes the comprehensive choice array to render all choices inside the dropup panel
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

    // Pre-assemble row model references mapping metadata values instantly
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
