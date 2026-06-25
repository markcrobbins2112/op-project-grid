// ==========================================
// START OF FILE: main-shortcuts.js
// ==========================================

const MenuState = require('./menu-state');
const MenuDom = require('./menu-dom');

module.exports = {
  registerGlobalPluginScopes(pluginInstance) {
    pluginInstance.app.workspace.on('layout-ready', () => {
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

      // 2. BULLETPROOF SYSTEM COMMAND PICKER HOTKEY (Ctrl + Shift + Space)
      pluginInstance.scope.register(['Ctrl', 'Shift'], ' ', (evt) => {
        evt.preventDefault();

        console.log(
          '%c[ProjectGrid CAPTURE]%c Captured Ctrl+Shift+Space stroke. Active focus element:', 
          'color: #00d2d3; font-weight: bold;', 
          'color: default;', 
          document.activeElement
        );

        const filterInput = document.querySelector('.projectgrid-filter-input');
        const containerElement = document.querySelector('.block-language-projectgrid') || document.body;

        if (!filterInput) {
          console.error('%c[ProjectGrid ERROR]%c Could not find .projectgrid-filter-input bar on screen!', 'color: #ee5253; font-weight: bold;');
          return true;
        }

        filterInput.focus();
        filterInput.select();

        const existingPicker = document.querySelector('.projectgrid-command-picker');
        if (existingPicker) {
          existingPicker.remove();
          if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
          return false;
        }

        const targetMenuStateInstance = globalThis.MenuState || MenuState;
        
        try {
          const rowsArray = window.ProjectGridActiveRowsTrackingArrayRegistryPool || [];
          const activeItems = targetMenuStateInstance.getMenuSchema(filterInput, rowsArray, containerElement, () => {
            MenuDom.destroyActivePickers(containerElement);
            filterInput.focus();
          });

          console.log('%c[ProjectGrid]%c Packaging dynamic picker layout data map items:', 'color: #10ac84; font-weight: bold;', 'color: default;', activeItems);

          if (window.ProjectGridTriggerMenuCorePickerSpawn) {
            window.ProjectGridTriggerMenuCorePickerSpawn(activeItems);
          }
        } catch (err) {
          console.error('%c[ProjectGrid EXCEPTION]%c Command Picker compilation crashed:', 'color: #ee5253; font-weight: bold;', 'color: default;', err.message);
        }

        return false; 
      });
    });
  }
};

// ==========================================
// END OF FILE: main-shortcuts.js
// ==========================================
