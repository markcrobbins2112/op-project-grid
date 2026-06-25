// ==========================================
// START OF FILE: menu-state.js
// ==========================================

const MenuStateSort = require('./menu-state-sort');
const MenuStateUtils = require('./menu-state-utils');

module.exports = {
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

// ==========================================
// END OF FILE: menu-state.js
// ==========================================
