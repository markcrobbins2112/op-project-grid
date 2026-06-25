// ==========================================
// START OF FILE: menu-state.js
// ==========================================

module.exports = {
    activeSortChain: [], // Tracks up to 3 active sorting keys: string elements
  
    getMenuSchema(filterInput, rowsArray, containerElement, closeMenuCallback) {
      const activeRow = rowsArray.find(row => row.element.classList.contains('projectgrid-row-focused'));
  
      // Baseline definitions of all available sortable parameters
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
  
      // Build the dynamic items array for the Sort sub-menu block
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
          items: [
            { name: '🏷️ Tags Filter', action: () => this.openHeaderDropup('tags') },
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
            { name: '⭐ Stars Column', action: () => this.focusRowCell(activeRow, 7) },
            { name: '💲 Value Column', action: () => this.focusRowCell(activeRow, 8) },
            { name: '🐘 Size Column', action: () => this.focusRowCell(activeRow, 9) },
            { name: '🎱 Depth Column', action: () => this.focusRowCell(activeRow, 10) },
            { name: '🏅 Priority Column', action: () => this.focusRowCell(activeRow, 11) },
            { name: '🚦 Status Column', action: () => this.focusRowCell(activeRow, 12) },
            { name: '🔤 Lang Column', action: () => this.focusRowCell(activeRow, 13) },
            { name: '🎯 Target Column', action: () => this.focusRowCell(activeRow, 14) }
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
          items: sortMenuItems
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
  
    handleSortChainClick(key, rowsArray) {
      const existingIdx = this.activeSortChain.indexOf(key);
  
      if (existingIdx > -1) {
        // Member exists: remove it, and other remaining items slide up in rank
        this.activeSortChain.splice(existingIdx, 1);
      } else {
        // Member doesn't exist: append if space allows, otherwise inject at index 0
        if (this.activeSortChain.length < 3) {
          this.activeSortChain.push(key);
        } else {
          this.activeSortChain.unshift(key);
          if (this.activeSortChain.length > 3) {
            this.activeSortChain.pop(); // Remove old trailing key to stay inside 3 elements max
          }
        }
      }
  
      // Execute sorting computation immediately on user input
      this.executeDynamicSortChain(rowsArray);
    },
  
    clearSortPipeline(rowsArray) {
      this.activeSortChain = [];
      this.updateToolbarLabel();
      const parentTableBody = rowsArray[0]?.element?.parentElement;
      if (parentTableBody) {
        rowsArray.sort((a, b) => String(a.searchText).localeCompare(String(b.searchText)));
        rowsArray.forEach(row => parentTableBody.appendChild(row.element));
      }
      if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
    },
  
    executeDynamicSortChain(rowsArray) {
      this.updateToolbarLabel();
      if (this.activeSortChain.length === 0) return;
  
      const parentTableBody = rowsArray[0]?.element?.parentElement;
      if (!parentTableBody) return;
  
      rowsArray.sort((rowA, rowB) => {
        const valsA = rowA.yamlMetadataValues || {};
        const valsB = rowB.yamlMetadataValues || {};
        const datesA = rowA.folderDatesValues || {};
        const datesB = rowB.folderDatesValues || {};
        const launchersA = rowA.launcherValues || {};
        const launchersB = rowB.launcherValues || {};
  
        for (let i = 0; i < this.activeSortChain.length; i++) {
          const currentKey = this.activeSortChain[i];
          let valA = '';
          let valB = '';
  
          if (currentKey === 'created' || currentKey === 'updated') {
            valA = String(datesA[currentKey] || '');
            valB = String(datesB[currentKey] || '');
          } else if (currentKey === 'tasks') {
            // Extracts the raw incomplete task count integer from the fraction string "X/Y"
            const taskStrA = String(launchersA['tasks'] || '0/0').split('/')[0];
            const taskStrB = String(launchersB['tasks'] || '0/0').split('/')[0];
            valA = String(taskStrA).padStart(5, '0');
            valB = String(taskStrB).padStart(5, '0');
          } else if (currentKey === 'tagcount') {
            // Counts the array slice elements inside comma-delimited strings
            const tagStrA = String(valsA['tags'] || '⬛');
            const tagStrB = String(valsB['tags'] || '⬛');
            const countA = (tagStrA === '⬛' || tagStrA.trim() === '') ? 0 : tagStrA.split(',').length;
            const countB = (tagStrB === '⬛' || tagStrB.trim() === '') ? 0 : tagStrB.split(',').length;
            valA = String(countA).padStart(5, '0');
            valB = String(countB).padStart(5, '0');
          } else {
            valA = String(valsA[currentKey] || '').replace(/[^\w]/g, '');
            valB = String(valsB[currentKey] || '').replace(/[^\w]/g, '');
          }
  
          if (valA !== valB) {
            return valA.localeCompare(valB, undefined, { numeric: true, sensitivity: 'base' });
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
        const formattedChain = this.activeSortChain.map((k, idx) => {
          let symbol = '🟢';
          if (idx === 1) symbol = '🟡';
          if (idx === 2) symbol = '🔴';
          return `${symbol}${k.toUpperCase()}`;
        }).join(' ➔ ');
        indicator.textContent = `📶 Sort Chain: ${formattedChain}`;
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
  