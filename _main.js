// ==========================================
// START OF FILE: _main.js
// ==========================================

const { Plugin } = require('obsidian');
const StylesManager = require('./styles');
const FilterManager = require('./filter');
const UiBuilder = require('./ui');
const MainToolbar = require('./main-toolbar');
const MainScanner = require('./main-scanner');
const GridConfig = require('./grid-config');
const MenuState = require('./menu-state');
const MenuDom = require('./menu-dom');

module.exports = class ProjectGridPlugin extends Plugin {
  async onload() {
    console.log('%c[ProjectGrid]%c Core initialized...', 'color: #00d2d3; font-weight: bold;', 'color: default;');
    StylesManager.injectStyles();

    window.ProjectGridTutorModeActive = false;
    const pluginInstance = this;

    this.app.workspace.on('layout-ready', () => {
      if (!pluginInstance.scope) return;

      // 1. UNIVERSAL PANEL ESCAPE OVERRIDE SHORTCUT
      pluginInstance.scope.register([], 'Escape', (evt) => {
        const widePanel = document.querySelector('.projectgrid-wide-tasks-portal');
        if (widePanel) {
          evt.preventDefault();
          const activeTasksTrigger = document.querySelector('.projectgrid-tasks-trigger-btn:focus') || 
                                     document.querySelector('.projectgrid-row-focused .projectgrid-tasks-trigger-btn') ||
                                     document.querySelector('.projectgrid-tasks-trigger-btn');
          widePanel.remove();
          if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
          if (activeTasksTrigger) requestAnimationFrame(() => { activeTasksTrigger.focus(); });
          return false;
        }

        const activeNode = document.activeElement;
        if (activeNode && activeNode.closest('.projectgrid-matrix-table')) {
          evt.preventDefault();
          const container = activeNode.closest('.block-language-projectgrid') || document;
          const filterInput = container.querySelector('.projectgrid-filter-input');
          if (filterInput) { filterInput.focus(); filterInput.select(); }
          return false;
        }
        return true; 
      });

      // 2. NEW BULLETPROOF SYSTEM COMMAND PICKER HOTKEY (Ctrl + Shift + Space)
      // This official application scope hook guarantees execution priority over CodeMirror or Obsidian defaults
      pluginInstance.scope.register(['Ctrl', 'Shift'], ' ', (evt) => {
        evt.preventDefault();

        // 📶 REAL-TIME TELEMETRY DIAGNOSTIC INDICATOR PASS
        console.log(
          '%c[ProjectGrid CAPTURE]%c Captured Ctrl+Shift+Space stroke. Active focus element:', 
          'color: #00d2d3; font-weight: bold;', 
          'color: default;', 
          document.activeElement
        );

        // Dynamically discover the active block layout search query bar on screen
        const filterInput = document.querySelector('.projectgrid-filter-input');
        const containerElement = document.querySelector('.block-language-projectgrid') || document.body;

        if (!filterInput) {
          console.error('%c[ProjectGrid ERROR]%c Could not find .projectgrid-filter-input bar on screen!', 'color: #ee5253; font-weight: bold;');
          return true;
        }

        // Force focus straight to the search field to maintain structural alignment tracks
        filterInput.focus();
        filterInput.select();

        // Destroy any active pickers to refresh views cleanly
        const existingPicker = document.querySelector('.projectgrid-command-picker');
        if (existingPicker) {
          existingPicker.remove();
          if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
          return false;
        }

        const targetMenuStateInstance = globalThis.MenuState || MenuState;
        
        try {
          // Look up active note lists rows registers
          const rowsArray = window.ProjectGridActiveRowsTrackingArrayRegistryPool || [];
          const activeItems = targetMenuStateInstance.getMenuSchema(filterInput, rowsArray, containerElement, () => {
            MenuDom.destroyActivePickers(containerElement);
            filterInput.focus();
          });

          console.log('%c[ProjectGrid]%c Packaging dynamic picker layout data map items:', 'color: #10ac84; font-weight: bold;', 'color: default;', activeItems);

          // Force programmatic invocation routing using MenuCore's internal dispatcher mechanics
          if (window.ProjectGridTriggerMenuCorePickerSpawn) {
            window.ProjectGridTriggerMenuCorePickerSpawn(activeItems);
          }
        } catch (err) {
          console.error('%c[ProjectGrid EXCEPTION]%c Command Picker compilation crashed:', 'color: #ee5253; font-weight: bold;', 'color: default;', err.message);
        }

        return false; // Tells Obsidian to swallow this hotkey event completely
      });
    });

    this.registerMarkdownCodeBlockProcessor('projectgrid', (sourceText, element) => {
      this.renderProjectGridDashboard(sourceText, element);
    });
  }

  onunload() {
    const styleEl = document.getElementById('obsidian-projectgrid-styles');
    if (styleEl) styleEl.remove();
    document.querySelectorAll('.projectgrid-focus-overlay-portal, .projectgrid-input-overlay-portal, .projectgrid-row-overlay-portal, .projectgrid-wide-tasks-portal, .projectgrid-tutor-tooltip-portal').forEach(el => el.remove());
  }

  renderProjectGridDashboard(sourceText, containerElement) {
    const rootTarget = sourceText.trim() || "__";
    const absoluteVaultRoot = this.app.vault.adapter.getBasePath();

    const headerSetup = UiBuilder.generateHeaderCell();
    
    // Wire up the top toolbar gear button to execute the exact same command trigger sequence
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
    
    // Globally register rows so our shortcut interceptor can pull data parameters on demand
    window.ProjectGridActiveRowsTrackingArrayRegistryPool = rowsArray;

    const universalTagsSet = MainScanner.scanVaultProjectsFolders(
      this.app, rootTarget, absoluteVaultRoot, tableBody, rowsArray, headerSetup.input
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
// END OF FILE: _main.js
// ==========================================
