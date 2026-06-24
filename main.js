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
          padding: 6px 8px !important;
          vertical-align: middle !important;
          position: relative !important;
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
  
        /* DEFINITIVE OVERLAY GLOW ROW INDICATOR TRACKS */
        @keyframes projectgrid-border-glow-cycle {
          0% { border-color: #ff4757; filter: hue-rotate(0deg); }
          100% { border-color: #ff4757; filter: hue-rotate(360deg); }
        }
        .projectgrid-matrix-row {
          border-bottom: 1px solid var(--background-modifier-border, #2a2a2a) !important;
          position: relative !important;
        }
        .projectgrid-matrix-row:hover {
          background-color: var(--background-modifier-hover, rgba(255, 255, 255, 0.01)) !important;
        }
        .projectgrid-row-focused {
          background-color: var(--background-modifier-hover, rgba(112, 161, 255, 0.08)) !important;
        }
        .projectgrid-row-focused::after {
          content: "" !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          border: 2px solid #ff4757 !important;
          box-sizing: border-box !important;
          pointer-events: none !important;
          z-index: 10 !important;
          animation: projectgrid-border-glow-cycle 3s linear infinite !important;
        }
  
        .projectgrid-matrix-cell { padding: 6px 8px !important; vertical-align: middle !important; }
        .note-title-cell { font-weight: 500 !important; }
        .action-icon-cell { text-align: center !important; }
  
        /* DROP-UP MULTI-SELECT PANEL DESIGN SHEETS */
        .projectgrid-header-dropup-trigger {
          cursor: pointer !important;
          display: inline-block !important;
          padding: 2px 6px !important;
          border-radius: 4px !important;
          user-select: none !important;
          font-size: 14px !important;
        }
        .projectgrid-header-dropup-trigger:hover {
          background-color: var(--background-modifier-hover, rgba(255, 255, 255, 0.05)) !important;
        }
        .projectgrid-dropup-panel {
          position: absolute !important;
          bottom: 100% !important;
          left: 0 !important;
          background-color: var(--background-secondary, #202020) !important;
          border: 1px solid var(--background-modifier-border, #3a3a3a) !important;
          border-radius: 6px !important;
          padding: 8px !important;
          z-index: 9999 !important;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.3) !important;
          display: none;
          min-width: 140px !important;
          max-height: 220px !important;
          overflow-y: auto !important;
        }
        .projectgrid-dropup-panel.is-open { display: block !important; }
        .projectgrid-dropup-option {
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
          padding: 4px 6px !important;
          cursor: pointer !important;
          user-select: none !important;
          color: var(--text-normal, #ffffff) !important;
        }
        .projectgrid-dropup-option:hover {
          background-color: var(--background-modifier-hover, rgba(255, 255, 255, 0.03)) !important;
        }
  
        .projectgrid-yaml-select {
          background-color: var(--background-secondary, #252525) !important;
          color: var(--text-normal, #dddddd) !important;
          border: 1px solid var(--background-modifier-border, #3d3d3d) !important;
          border-radius: 4px !important;
          padding: 2px 4px !important;
          font-size: 11px !important;
          max-width: 95px !important;
          cursor: pointer !important;
        }
        .projectgrid-yaml-select:focus {
          border-color: var(--text-accent, #70a1ff) !important;
          outline: none !important;
        }
        .projectgrid-aip-icon-btn {
          display: inline-block !important;
          text-decoration: none !important;
          font-size: 14px !important;
          cursor: pointer !important;
          opacity: 0.7 !important;
          transition: transform 0.1s ease, opacity 0.1s ease !important;
        }
        .projectgrid-aip-icon-btn:hover {
          opacity: 1.0 !important;
          transform: scale(1.15) !important;
        }
        .projectgrid-matrix-link { text-decoration: none !important; font-weight: bold !important; }
        .projectgrid-matrix-link:hover { text-decoration: underline !important; }
        .projectgrid-empty-warning-message { font-size: 12px !important; color: var(--text-muted, #888888) !important; font-style: italic !important; }
  
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
          transition: background-color 0.1s ease, color 0.1s ease !important;
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
  
    openHeaderDropup(key) {
      const trigger = document.querySelector(`.projectgrid-header-dropup-trigger[data-key="${key}"]`);
      if (trigger) trigger.click();
    },
  
    focusRowCell(rowObj, cellIndex) {
      if (!rowObj) return alert('Highlight a row project using arrow keys first.');
      const targetCell = rowObj.element.children[cellIndex];
      const interactive = targetCell ? targetCell.querySelector('select, a, input') : null;
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
      document.querySelectorAll('.projectgrid-yaml-select').forEach(sel => sel.value = '');
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
    let pickerLevel = 0; // 0 = Closed, 1 = Main Categories, 2 = Sub Items wheel
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
          // Open level 1 menu: Main Categories wheel
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
        // --- INTERCEPT LOGIC FOR ACTIVE PROMPT PICKERS ---
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
            // Drop back from sub-items to root category layout list
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
        // Step into sub-picker array items wheel context
        storedCategoryIndex = activeIndex;
        activeItems = activeItems[activeIndex].items;
        pickerLevel = 2;
        activeIndex = 0;
        render();
      } else if (pickerLevel === 2) {
        // Fire action and return focus cleanly back to search bar
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
          row.element.style.display = '';
        } else {
          row.element.style.display = 'none';
        }
      });
    };

    filterInput.addEventListener('input', applyFilter);

    // Initialize the modular key controller sequence
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
      const th = document.createElement('th');
      th.style.width = '8%';
      th.style.textAlign = 'center';
      
      const trigger = document.createElement('div');
      trigger.className = 'projectgrid-header-dropup-trigger';
      trigger.setAttribute('data-key', key);
      trigger.textContent = titleIcon;
  
      const panel = document.createElement('div');
      panel.className = 'projectgrid-dropup-panel';
  
      const activeFilters = new Set(defaults);
  
      defaults.forEach(opt => {
        const wrapper = document.createElement('label');
        wrapper.className = 'projectgrid-dropup-option';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
  
        checkbox.addEventListener('change', () => {
          if (checkbox.checked) activeFilters.add(opt);
          else activeFilters.delete(opt);
          
          rowsArray.forEach(row => {
            if (!row.dropdownFilters) row.dropdownFilters = {};
            const currentVal = row.yamlMetadataValues && row.yamlMetadataValues[key] ? String(row.yamlMetadataValues[key]) : '⬛';
            row.dropdownFilters[key] = activeFilters.has(currentVal) || (currentVal === '⬛' && activeFilters.has('⬛'));
          });
  
          if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
        });
  
        wrapper.appendChild(checkbox);
        wrapper.appendChild(document.createTextNode(opt));
        panel.appendChild(wrapper);
      });
  
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.projectgrid-dropup-panel').forEach(p => { if(p !== panel) p.classList.remove('is-open'); });
        panel.classList.toggle('is-open');
      });
  
      document.addEventListener('click', () => panel.classList.remove('is-open'));
      th.appendChild(trigger);
      th.appendChild(panel);
      return th;
    },
  
    buildRow(folder, absoluteVaultRoot, expectedNotePath, app, frontmatter, rowTrackingReference) {
      const absoluteLocalPath = `${absoluteVaultRoot}\\${folder.path}`.replace(/[/\\]+/g, '\\');
      const tableRow = document.createElement('tr');
      tableRow.className = 'projectgrid-matrix-row';
  
      // Note Cell with Alphabetical Hue Spectral Multi-Mapping rules
      const noteCell = document.createElement('td');
      noteCell.className = 'projectgrid-matrix-cell note-title-cell';
      const fileAnchor = document.createElement('a');
      fileAnchor.className = 'internal-link projectgrid-matrix-link';
      fileAnchor.setAttribute('data-href', expectedNotePath);
      
      const cleanFileName = `+${folder.name}.md`;
      fileAnchor.textContent = cleanFileName;
  
      // --- AUTOMATED COLOR SHIFT ALGORITHM ---
      // A=0, Z=25, maps clean spectrum where Z bends back to Red (0 to 360 loop)
      const firstChar = folder.name.charAt(0).toLowerCase();
      let charCode = firstChar.charCodeAt(0) - 97; 
      if (charCode < 0 || charCode > 25) charCode = 0; // Fallback bound
      const hueAngle = Math.round((charCode / 26) * 360);
      fileAnchor.style.color = `hsl(${hueAngle}, 95%, 65%)`;
  
      fileAnchor.addEventListener('click', (evt) => {
        evt.preventDefault();
        app.workspace.openLinkText(expectedNotePath, '', false);
      });
      noteCell.appendChild(fileAnchor);
      tableRow.appendChild(noteCell);
  
      // Protocol launch cells
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
  
      // YAML Fields configuration with inverted number-first layouts
      const fieldsConfig = [
        { key: 'stars', defaults: ['0','1','2','3','4','5'], icon: '⭐', revOrder: true },
        { key: 'value', defaults: ['0','1','2','3','4','5','6','7','8','9'], icon: '💲', revOrder: true },
        { key: 'size', defaults: ['0','1','2','3','4','5'], icon: '🐘', revOrder: true },
        { key: 'depth', defaults: ['0','1','2','3','4','5'], icon: '🎱', revOrder: true },
        { key: 'priority', defaults: ['0','1','2','3','4','5'], icon: '🏅', revOrder: true },
        { key: 'status', defaults: ['hold🛑', 'plan🌐', 'dev🛠', 'test🧪', 'ship📦'], icon: '', revOrder: false },
        { key: 'lang', defaults: ['js', 'ts', 'au3', 'ahk'], icon: '', revOrder: false },
        { key: 'target', defaults: ['ce', 'op', 'app', 'link'], icon: '', revOrder: false }
      ];
  
      rowTrackingReference.yamlMetadataValues = {};
  
      fieldsConfig.forEach(cfg => {
        const cell = document.createElement('td');
        cell.className = 'projectgrid-matrix-cell select-cell';
        
        const select = document.createElement('select');
        select.className = 'projectgrid-yaml-select';
        
        const rawVal = frontmatter && frontmatter[cfg.key] !== undefined ? String(frontmatter[cfg.key]) : '';
        rowTrackingReference.yamlMetadataValues[cfg.key] = rawVal || '⬛';
  
        let options = [...cfg.defaults];
        if (rawVal && !options.includes(rawVal)) options.push(rawVal);
        
        // Null option shows a literal dark placeholder square emoji
        select.appendChild(new Option('⬛', ''));
        
        options.forEach(opt => {
          // Apply inverted alignment layouts so number parameters appear strictly before item emojis
          const displayLabel = (cfg.revOrder && cfg.icon) ? `${opt} ${cfg.icon}` : opt;
          select.appendChild(new Option(displayLabel, opt));
        });
        
        select.value = rawVal;
  
        select.addEventListener('change', async () => {
          const fileAbstract = app.vault.getAbstractFileByPath(expectedNotePath);
          if (fileAbstract) {
            await app.fileManager.processFrontMatter(fileAbstract, (fm) => {
              if (select.value === '') {
                delete fm[cfg.key];
                rowTrackingReference.yamlMetadataValues[cfg.key] = '⬛';
              } else {
                fm[cfg.key] = select.value;
                rowTrackingReference.yamlMetadataValues[cfg.key] = select.value;
              }
            });
            if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
          }
        });
  
        cell.appendChild(select);
        tableRow.appendChild(cell);
      });
  
      return tableRow;
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

    const headerSetup = UiBuilder.generateHeaderCell();
    headerRow.appendChild(headerSetup.cell);
    
    // Convert table text headers into direct compact icon layout blocks
    headerRow.insertAdjacentHTML('beforeend', `
      <th style="width: 5%; text-align: center;">📁</th>
      <th style="width: 5%; text-align: center;">💻</th>
      <th style="width: 5%; text-align: center;">💜</th>
    `);

    // Invert the default dropup list item arrays to read number-first format tracking parameters
    const columnDropdowns = [
      { icon: '⭐', key: 'stars', options: ['⬛','0 ⭐','1 ⭐','2 ⭐','3 ⭐','4 ⭐','5 ⭐'] },
      { icon: '💲', key: 'value', options: ['⬛','0 💲','1 💲','2 💲','3 💲','4 💲','5 💲','6 💲','7 💲','8 💲','9 💲'] },
      { icon: '🐘', key: 'size', options: ['⬛','0 🐘','1 🐘','2 🐘','3 🐘','4 🐘','5 🐘'] },
      { icon: '🎱', key: 'depth', options: ['⬛','0 🎱','1 🎱','2 🎱','3 🎱','4 🎱','5 🎱'] },
      { icon: '🏅', key: 'priority', options: ['⬛','0 🏅','1 🏅','2 🏅','3 🏅','4 🏅','5 🏅'] },
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
        rowRef.element = UiBuilder.buildRow(folder, absoluteVaultRoot, expectedNotePath, this.app, frontmatter, rowRef);
        
        tableBody.appendChild(rowRef.element);
        rowsArray.push(rowRef);
      }
    });

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
