// ==========================================
// START OF FILE: menu-state.js
// ==========================================

module.exports = {
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
  
  // ==========================================
  // END OF FILE: menu-state.js
  // ==========================================
  