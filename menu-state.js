// ==========================================
// START OF FILE: menu-state.js
// ==========================================

const GridConfig = require('./grid-config');
const MenuStateUtils = require('./menu-state-utils');

const menuStateModule = {
  getMenuSchema(filterInput, rowsArray, containerElement, closeMenuCallback) {
    const activeRow = rowsArray.find(row => row.element && row.element.classList.contains('projectgrid-row-focused'));
    
    // SAFE FALLBACK PASS: Protect against un-instantiated global variables states during late module load frames
    const config = globalThis.GridConfig || GridConfig || { columns: [] };
    const columnsList = config.columns || [];
    
    const selectableColumns = columnsList.filter(c => c.type === 'yaml-select' || c.type === 'tags-cell');

    return [
      {
        name: '📁 Filters',
        items: selectableColumns.map(f => ({ name: `${f.icon} ${f.label} Filter`, action: () => MenuStateUtils.openHeaderDropup(f.key) }))
      },
      {
        name: '📊 Columns',
        items: columnsList.map((col, idx) => ({
          name: `${col.icon} ${col.label} Column`,
          action: () => MenuStateUtils.focusRowCell(activeRow, idx)
        }))
      },
      {
        name: '🚀 Launch',
        items: columnsList.filter(c => c.type === 'launcher').map(l => ({
          name: `${l.icon} Open in ${l.label}`, action: () => MenuStateUtils.fireProtocol(activeRow, l.key)
        }))
      }
    ];
  }
};

globalThis.MenuState = menuStateModule;
module.exports = menuStateModule;

// ==========================================
// END OF FILE: menu-state.js
// ==========================================
