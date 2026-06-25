// ==========================================
// START OF FILE: menu-state.js
// ==========================================

module.exports = {
    activeSortChain: [],
  
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
          // FIX: CELLS FOCUS SELECTION MARGINS UPDATED TO ACCOUNT FOR THE 2 NEW INTERMEDIATE FIELDS (+2 OFFSETS)
          name: '📊 Columns',
          items: [
            { name: '⭐ Stars Column', action: () => this.focusRowCell(activeRow, 6) },
            { name: '💲 Value Column', action: () => this.focusRowCell(activeRow, 7) },
            { name: '🐘 Size Column', action: () => this.focusRowCell(activeRow, 8) },
            { name: '🎱 Depth Column', action: () => this.focusRowCell(activeRow, 9) },
            { name: '🏅 Priority Column', action: () => this.focusRowCell(activeRow, 10) },
            { name: '🚦 Status Column', action: () => this.focusRowCell(activeRow, 11) },
            { name: '🔤 Lang Column', action: () => this.focusRowCell(activeRow, 12) },
            { name: '🎯 Target Column', action: () => this.focusRowCell(activeRow, 13) }
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
          name: '📶 Sort',
          items: [
            { name: '⭐ Stars to Sort Chain', action: () => this.toggleSortChainKey('stars', rowsArray) },
            { name: '💲 Value to Sort Chain', action: () => this.toggleSortChainKey('value', rowsArray) },
            { name: '🐘 Size to Sort Chain', action: () => this.toggleSortChainKey('size', rowsArray) },
            { name: '🎱 Depth to Sort Chain', action: () => this.toggleSortChainKey('depth', rowsArray) },
            { name: '🏅 Priority to Sort Chain', action: () => this.toggleSortChainKey('priority', rowsArray) },
            { name: '🚦 Status to Sort Chain', action: () => this.toggleSortChainKey('status', rowsArray) },
            { name: '🔤 Lang to Sort Chain', action: () => this.toggleSortChainKey('lang', rowsArray) },
            { name: '🎯 Target to Sort Chain', action: () => this.toggleSortChainKey('target', rowsArray) },
            { name: '✕ Clear All Sort Chains', action: () => this.clearSortPipeline(rowsArray) }
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
  
    toggleSortChainKey(key, rowsArray) {
      const existingIdx = this.activeSortChain.indexOf(key);
      if (existingIdx > -1) {
        this.activeSortChain.splice(existingIdx, 1);
      } else {
        if (this.activeSortChain.length >= 3) {
          alert("Maximum sort chain hierarchy length reached! Please clear sorts or drop a column first.");
          return;
        }
        this.activeSortChain.push(key);
      }
      this.executeDynamicSortChain(rowsArray);
    },
  
    clearSortPipeline(rowsArray) {
      this.activeSortChain = [];
      this.updateToolbarLabel();
      const parentTableBody = rowsArray?.element?.parentElement;
      if (parentTableBody) {
        rowsArray.sort((a, b) => String(a.searchText).localeCompare(String(b.searchText)));
        rowsArray.forEach(row => parentTableBody.appendChild(row.element));
      }
      if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
    },
  
    executeDynamicSortChain(rowsArray) {
      this.updateToolbarLabel();
      if (this.activeSortChain.length === 0) return;
  
      const parentTableBody = rowsArray?.element?.parentElement;
      if (!parentTableBody) return;
  
      rowsArray.sort((rowA, rowB) => {
        const valsA = rowA.yamlMetadataValues || {};
        const valsB = rowB.yamlMetadataValues || {};
  
        for (let i = 0; i < this.activeSortChain.length; i++) {
          const currentKey = this.activeSortChain[i];
          const valA = String(valsA[currentKey] || '').replace(/[^\w]/g, '');
          const valB = String(valsB[currentKey] || '').replace(/[^\w]/g, '');
          if (valA !== valB) {
            return valA.localeCompare(valB, undefined, { numeric: true });
          }
        }
        return 0;
      });
  
      rowsArray.forEach(row => parentTableBody.appendChild(row.element));
      if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
    },
  
    updateToolbarLabel() {
      const indicator = document.getElementById('projectgrid-sort-toolbar-label');
      if (!indicator) return;
  
      if (this.activeSortChain.length === 0) {
        indicator.textContent = '📶 Default Directory Sort Order';
        indicator.style.color = 'var(--text-muted)';
      } else {
        const formattedChain = this.activeSortChain.map(k => k.toUpperCase()).join(' ➔ ');
        indicator.textContent = `📶 Sorted by: ${formattedChain}`;
        indicator.style.color = 'var(--text-accent)';
      }
    },
  
    openHeaderDropup(key) {
      const trigger = document.querySelector(`.projectgrid-header-dropup-trigger[data-key="${key}"]`);
      if (trigger) {
        const mousedownEvent = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
        trigger.dispatchEvent(mousedownEvent);
        setTimeout(() => trigger.focus(), 50);
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
      if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
      filterInput.focus();
    },
  
    reloadActiveAppWorkspace() {
      const activeLeaf = window.app.workspace.getActiveViewOfType(require('obsidian').MarkdownView);
      if (activeLeaf) activeLeaf.previewMode?.rerender(true);
    }
  };
  
  // ==========================================
  // END OF FILE: menu-state.js
  // ==========================================
  