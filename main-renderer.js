// ==========================================
// START OF FILE: main-renderer.js
// ==========================================

const UiBuilder = require('./ui');
const MainToolbar = require('./main-toolbar');
const MainScanner = require('./main-scanner');
const GridConfig = require('./grid-config');
const MenuState = require('./menu-state');
const MenuDom = require('./menu-dom');
const FilterManager = require('./filter');

module.exports = {
  renderProjectGridDashboard(pluginContext, sourceText, containerElement) {
    const rootTarget = sourceText.trim() || "__";
    const absoluteVaultRoot = pluginContext.app.vault.adapter.getBasePath();

    const headerSetup = UiBuilder.generateHeaderCell();
    
    const toolbarSetup = MainToolbar.createToolbarLayout(containerElement, () => {
      const targetMenuStateInstance = globalThis.MenuState || MenuState;
      const activeItems = targetMenuStateInstance.getMenuSchema(headerSetup.input, rowsArray, containerElement, () => {
        MenuDom.destroyActivePickers(containerElement);
        headerSetup.input.focus();
      });
      if (window.ProjectGridTriggerMenuCorePickerSpawn) {
        headerSetup.input.focus();
        window.ProjectGridTriggerMenuCorePickerSpawn(activeItems);
      }
    });

    const tableElement = document.createElement('table');
    tableElement.className = 'projectgrid-matrix-table';

    const tableHeader = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.appendChild(headerSetup.cell);
    
    const activeConfig = globalThis.GridConfig || GridConfig;

    if (activeConfig && activeConfig.columns) {
      activeConfig.columns.forEach(col => {
        if (col.key === 'title') return;
        
        if (col.type === 'timestamp' || col.type === 'launcher') {
          headerRow.insertAdjacentHTML('beforeend', `
            <th style="width: ${col.width} !important; text-align: center;" title="${col.label}">${col.icon}</th>
          `);
        } else {
          const innerRowsArray = [];
          const dropupTh = UiBuilder.buildHeaderDropup(col.icon, col.key, col.defaults || ['⬛'], innerRowsArray);
          dropupTh.style.width = col.width;
          headerRow.appendChild(dropupTh);
        }
      });
    }

    const tableBody = document.createElement('tbody');
    const rowsArray = [];
    
    window.ProjectGridActiveRowsTrackingArrayRegistryPool = rowsArray;

    const universalTagsSet = MainScanner.scanVaultProjectsFolders(
      pluginContext.app, rootTarget, absoluteVaultRoot, tableBody, rowsArray, headerSetup.input
    );

    tableHeader.appendChild(headerRow);
    tableElement.appendChild(tableHeader);
    tableElement.appendChild(tableBody);
    
    FilterManager.initializeTableFilter(headerSetup.input, headerSetup.clearBtn, rowsArray, containerElement);

    const hotkeyListener = (evt) => {
      if (evt.ctrlKey && evt.altKey && evt.key.toLowerCase() === 't') {
        evt.preventDefault();
        toolbarSetup.handleTutorToggle();
      }
    };
    window.removeEventListener('keydown', hotkeyListener);
    window.addEventListener('keydown', hotkeyListener);

    if (rowsArray.length > 0) {
      containerElement.appendChild(tableElement);
    }
  }
};

// ==========================================
// END OF FILE: main-renderer.js
// ==========================================
