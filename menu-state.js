// ==========================================
// START OF FILE: menu-state.js
// ==========================================

const GridConfig = require('./grid-config');
const MenuStateUtils = require('./menu-state-utils');
const MenuStateSort = require('./menu-state-sort');

const menuStateModule = {
  getMenuSchema(filterInput, rowsArray, containerElement, closeMenuCallback) {
    const activeRow = rowsArray.find(row => row.element && row.element.classList.contains('projectgrid-row-focused'));
    const config = globalThis.GridConfig || GridConfig || { columns: [] };
    const columnsList = config.columns || [];
    
    const selectableColumns = columnsList.filter(c => c.type === 'yaml-select' || c.type === 'tags-cell');
    const interactiveFocusColumns = columnsList
      .map((col, idx) => ({ col, originalIdx: idx }))
      .filter(item => item.col.type === 'yaml-select' || item.col.type === 'tags-cell');
    const launcherColumns = columnsList.filter(c => c.type === 'launcher');
    const sortableColumns = columnsList.filter(c => c.key !== 'title' && c.type !== 'launcher');

    const activeSortEngine = globalThis.MenuStateSort || MenuStateSort;
    const currentChain = activeSortEngine ? activeSortEngine.activeSortChain || [] : [];
    const rawDirPath = (activeRow && activeRow.folder && activeRow.folder.path) ? String(activeRow.folder.path) : 'No folder selected';

    return [
      {
        name: 'Filters', // FIX: Plain-text key protects background string verification lookups
        displayName: '<u>F</u>ilters',
        acceleratorKey: 'f',
        items: selectableColumns.map(f => ({ 
          name: `${f.icon} ${f.label} Filter`, 
          action: () => MenuStateUtils.openHeaderDropup(f.key) 
        }))
      },
      {
        name: 'Columns',
        displayName: '<u>C</u>olumns',
        acceleratorKey: 'c',
        items: [
          { name: `📂 ${rawDirPath}`, isHeaderTitle: true },
          ...interactiveFocusColumns.map(item => ({ 
            name: `${item.col.icon} ${item.col.label} Column`, 
            action: () => MenuStateUtils.focusRowCell(activeRow, item.originalIdx) 
          }))
        ]
      },
      {
        name: 'Launcher',
        displayName: '<u>L</u>auncher',
        acceleratorKey: 'l',
        items: [
          { name: `📂 ${rawDirPath}`, isHeaderTitle: true },
          ...launcherColumns.map(l => ({ 
            name: `${l.icon} Open in ${l.label}`, 
            action: () => MenuStateUtils.fireProtocol(activeRow, l.key) 
          }))
        ]
      },
      {
        name: 'Sort',
        displayName: '<u>S</u>ort',
        acceleratorKey: 's',
        items: [
          {
            name: '❌ Clear Sort Chain Parameters',
            action: () => {
              if (activeSortEngine) {
                activeSortEngine.activeSortChain = [];
                activeSortEngine.executeDynamicSortChain(rowsArray);
              }
            }
          },
          ...sortableColumns.map(s => {
            const chainIdx = currentChain.indexOf(s.key);
            let statusIcon = '⚫';
            if (chainIdx === 0) statusIcon = '🟢';
            if (chainIdx === 1) statusIcon = '🟡';
            if (chainIdx === 2) statusIcon = '🔴';

            return {
              name: `${statusIcon} ${s.icon} ${s.label}`,
              action: () => {
                if (activeSortEngine) {
                  let chain = [...activeSortEngine.activeSortChain];
                  const existingIdx = chain.indexOf(s.key);

                  if (existingIdx > -1) {
                    chain.splice(existingIdx, 1);
                  } else {
                    if (chain.length < 3) {
                      chain.push(s.key);
                    } else {
                      chain.unshift(s.key);
                      if (chain.length > 3) chain.pop();
                    }
                  }
                  activeSortEngine.activeSortChain = chain;
                  activeSortEngine.executeDynamicSortChain(rowsArray);
                }
              }
            };
          })
        ]
      }
    ];
  }
};

globalThis.MenuState = menuStateModule;
module.exports = menuStateModule;

// ==========================================
// END OF FILE: menu-state.js
// ==========================================
