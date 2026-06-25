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
          // FIX: Removed "Focus on" verbiage and mapped exactly to the same 8 columns as the filters
          name: '📊 Columns',
          items: [
            { name: '⭐ Stars Column', action: () => this.focusRowCell(activeRow, 4) },
            { name: '💲 Value Column', action: () => this.focusRowCell(activeRow, 5) },
            { name: '🐘 Size Column', action: () => this.focusRowCell(activeRow, 6) },
            { name: '🎱 Depth Column', action: () => this.focusRowCell(activeRow, 7) },
            { name: '🏅 Priority Column', action: () => this.focusRowCell(activeRow, 8) },
            { name: '🚦 Status Column', action: () => this.focusRowCell(activeRow, 9) },
            { name: '🔤 Lang Column', action: () => this.focusRowCell(activeRow, 10) },
            { name: '🎯 Target Column', action: () => this.focusRowCell(activeRow, 11) }
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
            { name: '📶 Sort: Status ➔ Stars ➔ Priority', action: () => this.executeThreeColumnSortChain(rowsArray, ['status', 'stars', 'priority']) },
            { name: '📶 Sort: Priority ➔ Value ➔ Size', action: () => this.executeThreeColumnSortChain(rowsArray, ['priority', 'value', 'size']) },
            { name: '📶 Sort: Lang ➔ Target ➔ Stars', action: () => this.executeThreeColumnSortChain(rowsArray, ['lang', 'target', 'stars']) },
            { name: '✕ Clear All Filters', action: () => this.clearAllSystemFilters(filterInput) },
            { name: '🔄 Reload Component', action: () => this.reloadActiveAppWorkspace() }
          ]
        }
      ];
    },
  
    executeThreeColumnSortChain(rowsArray, keysArray) {
      const parentTableBody = rowsArray[0]?.element?.parentElement;
      if (!parentTableBody) return;
  
      rowsArray.sort((rowA, rowB) => {
        const valsA = rowA.yamlMetadataValues || {};
        const valsB = rowB.yamlMetadataValues || {};
  
        const valA1 = String(valsA[keysArray[0]] || '').replace(/[^\w]/g, '');
        const valB1 = String(valsB[keysArray[0]] || '').replace(/[^\w]/g, '');
        if (valA1 !== valB1) return valA1.localeCompare(valB1, undefined, { numeric: true });
  
        const valA2 = String(valsA[keysArray[1]] || '').replace(/[^\w]/g, '');
        const valB2 = String(valsB[keysArray[1]] || '').replace(/[^\w]/g, '');
        if (valA2 !== valB2) return valA2.localeCompare(valB2, undefined, { numeric: true });
  
        const valA3 = String(valsA[keysArray[2]] || '').replace(/[^\w]/g, '');
        const valB3 = String(valsB[keysArray[2]] || '').replace(/[^\w]/g, '');
        return valA3.localeCompare(valB3, undefined, { numeric: true });
      });
  
      rowsArray.forEach(row => parentTableBody.appendChild(row.element));
      if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
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
      if (interactive) {
        interactive.focus();
      }
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
  