// ==========================================
// START OF FILE: _main.js
// ==========================================

const { Plugin } = require('obsidian');

const StylesManager = (function() {
// ==========================================
// START OF FILE: styles.js
// ==========================================


const StylesCore = (function() {
// ==========================================
// START OF FILE: styles-core.js
// ==========================================

return {
    getCoreStyles() {
      return `
        .cm-embed-block:has(.projectgrid-matrix-table),
        .block-language-projectgrid {
          max-width: 100% !important;
          width: 100% !important;
          grid-column: 1 / -1 !important;
        }
        .projectgrid-matrix-table {
          width: 100% !important;
          border-collapse: collapse !important;
          margin-top: 6px !important;
          margin-bottom: 12px !important;
          font-size: 11px !important;
          line-height: 1.4 !important;
          position: relative !important;
        }
        .projectgrid-matrix-table th {
          font-weight: 600 !important;
          color: var(--text-muted, #888888) !important;
          border-bottom: 2px solid rgba(255, 255, 255, 0.4) !important;
          border-right: 1px solid rgba(255, 255, 255, 0.28) !important;
          padding: 4px 2px !important;
          vertical-align: middle;
          position: relative !important;
          text-align: center !important;
        }
        .projectgrid-matrix-table th:first-child {
          text-align: left !important;
        }
  
        .projectgrid-timestamp-scaled-td {
          font-size: 11px !important; 
          text-align: center !important;
          white-space: nowrap !important;
          width: 90px !important; 
          padding: 4px 2px !important;
          color: var(--text-muted) !important;
        }
  
        .projectgrid-uniform-yaml-th,
        .projectgrid-uniform-yaml-td {
          width: 50px !important;
          min-width: 50px !important;
          max-width: 50px !important;
          text-align: center !important;
          box-sizing: border-box !important;
          padding: 2px 1px !important;
        }
  
        .projectgrid-filter-wrapper {
          position: relative !important;
          display: flex !important;
          align-items: center !important;
          width: 100% !important;
        }
        .projectgrid-filter-input {
          width: 100% !important;
          padding: 4px 24px 4px 8px !important;
          font-size: 11px !important;
          border-radius: 4px !important;
          border: 1px solid var(--background-modifier-border, #3a3a3a) !important;
          background-color: var(--background-primary, #1e1e1e) !important;
          color: var(--text-normal, #ffffff) !important;
          height: 24px !important;
          outline: none !important;
          box-shadow: none !important;
        }
        
        .projectgrid-clear-btn {
          position: absolute !important;
          right: 8px !important;
          cursor: pointer !important;
          color: var(--text-muted, #888888) !important;
          font-size: 10px !important;
          visibility: hidden;
          user-select: none !important;
        }
        .projectgrid-clear-btn:hover { color: var(--text-accent, #70a1ff) !important; }
  
        /* BRIGHTNESS: Boosted structural borders clarity by 15% across all mesh coordinates */
        .projectgrid-matrix-cell { 
          padding: 4px 2px !important; 
          vertical-align: middle !important; 
          border-right: 1px solid rgba(255, 255, 255, 0.28) !important;
        }
        .note-title-cell { font-weight: 500 !important; white-space: nowrap !important; max-width: 140px !important; overflow: hidden; text-overflow: ellipsis; }
        .projectgrid-matrix-link { text-decoration: none !important; }
        .action-icon-cell { text-align: center !important; width: 24px !important; }
        .action-icon-cell a { text-decoration: none !important; }
        .projectgrid-aip-icon-btn.is-vault-missing { opacity: 0.15 !important; }
        .projectgrid-empty-warning-message { font-size: 12px !important; color: var(--text-muted, #888888) !important; font-style: italic !important; }
        
        .projectgrid-readonly-scanner-td {
          font-size: 11px !important;
          text-align: center !important;
          width: 32px !important;
          padding: 4px 2px !important;
          user-select: none;
        }

        /* BRIGHTNESS: Boosted bottom line structural dividers opacity metrics */
        .projectgrid-matrix-row {
          border-bottom: 1px solid rgba(255, 255, 255, 0.28) !important;
          position: relative !important;
          box-sizing: border-box !important;
        }
      `;
    }
  };
  
  // ==========================================
  // END OF FILE: styles-core.js
  // ==========================================
})();
globalThis.StylesCore = StylesCore;

const StylesAnimation = (function() {
// ==========================================
// START OF FILE: styles-animation.js
// ==========================================

return {
    getAnimationStyles() {
      return `
        @keyframes projectgrid-master-hue-spin {
          0% { border-color: #ff4757; filter: hue-rotate(0deg); }
          100% { border-color: #ff4757; filter: hue-rotate(360deg); }
        }
  
        /* STRICT LAYER OVERRIDES: FORCES THE ROW INDICATOR TO STAY AS THE LOWEST LAYER UNDER THE MENU PANELS */
        .projectgrid-focus-overlay-portal,
        .projectgrid-input-overlay-portal,
        .projectgrid-row-overlay-portal {
          position: fixed !important;
          pointer-events: none !important;
          box-sizing: border-box !important;
          border: 2px solid #ff4757 !important;
          border-radius: 4px !important;
          display: none;
          animation: projectgrid-master-hue-spin 3s linear infinite !important;
        }
        
        /* Stacking Layer 1: Topmost overlay for all list selection tracking */
        .projectgrid-focus-overlay-portal {
          z-index: 999999 !important;
        }
        
        /* Stacking Layer 2: Middle overlay for text fields and filter headers */
        .projectgrid-input-overlay-portal {
          z-index: 999998 !important;
        }
        
        /* FIX: BASE LAYER SET TO LOWEST TRACKING STATE SO POPUPS FLOAT HIGHER NATIVELY */
        .projectgrid-row-overlay-portal {
          z-index: 10 !important; 
        }
  
        .projectgrid-matrix-row {
          border-bottom: 1px solid var(--background-modifier-border, #2a2a2a) !important;
          position: relative !important;
          box-sizing: border-box !important;
        }
        .projectgrid-matrix-row:hover { background-color: transparent !important; }
      `;
    }
  };
  
  // ==========================================
  // END OF FILE: styles-animation.js
  // ==========================================
})();
globalThis.StylesAnimation = StylesAnimation;

const StylesComponentsToolbar = (function() {
// ==========================================
// START OF FILE: styles-components-toolbar.js
// ==========================================

return {
    getToolbarStyles() {
      return `
        /* INTERACTIVE BUTTON DASHBOARD TOOLBAR */
        .projectgrid-toolbar {
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
          width: 100% !important;
          background-color: var(--background-secondary, #1e1e1e) !important;
          border: 1px solid var(--background-modifier-border, #2e2e2e) !important;
          border-radius: 6px 6px 0 0 !important;
          padding: 6px 8px !important;
          box-sizing: border-box !important;
        }
        .projectgrid-toolbar-btn {
          background: transparent !important;
          border: none !important;
          cursor: pointer !important;
          font-size: 14px !important;
          padding: 4px !important;
          border-radius: 4px !important;
          outline: none !important;
          user-select: none !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .projectgrid-toolbar-btn:hover {
          background-color: var(--background-modifier-hover, rgba(255,255,255,0.04)) !important;
        }
  
        .projectgrid-header-dropup-trigger {
          cursor: pointer !important;
          display: inline-block !important;
          padding: 4px 2px !important;
          border-radius: 4px !important;
          user-select: none !important;
          font-size: 13px !important;
          width: 100% !important;
          box-sizing: border-box !important;
          outline: none !important;
          border: 2px solid transparent !important;
        }
        .projectgrid-header-dropup-trigger:hover { background-color: transparent !important; }
      `;
    }
  };
  
  // ==========================================
  // END OF FILE: styles-components-toolbar.js
  // ==========================================
})();
globalThis.StylesComponentsToolbar = StylesComponentsToolbar;

const StylesComponentsDropdown = (function() {
// ==========================================
// START OF FILE: styles-components-dropdown.js
// ==========================================

return {
    getDropdownStyles() {
      return `
        /* MENU PANELS FLOAT HIGH ABOVE ALL ROW INDICATORS NATIVELY */
        .projectgrid-dropup-panel {
          display: flex !important;
          flex-direction: column !important; 
          background-color: var(--background-secondary, #1a1a1a) !important;
          border: 1px solid var(--background-modifier-border, #3d3d3d) !important;
          border-radius: 6px !important;
          padding: 6px !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.45) !important;
          min-width: 125px !important;
          max-height: 260px !important;
          overflow-y: auto !important;
          box-sizing: border-box !important;
          z-index: 600000 !important; 
        }
        
        .projectgrid-dropup-header-title {
          font-size: 10px !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          color: var(--text-accent, #70a1ff) !important;
          padding: 4px 6px !important;
          border-bottom: 1px dashed var(--background-modifier-border, #3d3d3d) !important;
          margin-bottom: 4px !important;
          user-select: none !important;
          pointer-events: none !important;
        }
  
        .projectgrid-dropup-option {
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
          padding: 4px 6px !important;
          cursor: pointer !important;
          user-select: none !important;
          color: var(--text-normal, #ffffff) !important;
          font-size: 11px !important;
          box-sizing: border-box !important;
          width: 100% !important;
          border: 2px solid transparent !important;
          background-color: transparent !important;
        }
        .projectgrid-dropup-option:hover { background-color: transparent !important; }
        .projectgrid-dropup-option input[type="checkbox"] { margin: 0 !important; cursor: pointer !important; }
  
        .projectgrid-custom-select-btn {
          background-color: var(--background-secondary, #252525) !important;
          color: var(--text-normal, #dddddd) !important;
          border: 1px solid var(--background-modifier-border, #3d3d3d) !important;
          border-radius: 4px !important;
          padding: 4px 2px !important;
          font-size: 11px !important;
          width: 100% !important;
          box-sizing: border-box !important;
          display: inline-block !important;
          cursor: pointer !important;
          position: relative !important;
          user-select: none !important;
          text-align: center !important;
          text-overflow: ellipsis !important;
          overflow: hidden !important;
          white-space: nowrap !important;
        }
  
        .projectgrid-custom-dropdown-list {
          display: flex !important;
          flex-direction: column !important;
          background-color: var(--background-secondary, #202020) !important;
          border: 1px solid var(--background-modifier-border, #3d3d3d) !important;
          border-radius: 4px !important;
          margin: 4px 0 0 0 !important;
          padding: 4px 0 !important;
          list-style: none !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25) !important;
          box-sizing: border-box !important;
          z-index: 600000 !important; 
        }
        .projectgrid-custom-dropdown-item {
          padding: 4px 4px !important;
          cursor: pointer !important;
          color: var(--text-normal) !important;
          text-align: center !important;
          font-size: 11px !important;
          box-sizing: border-box !important;
          width: 100% !important;
          border: 2px solid transparent !important;
          background-color: transparent !important;
        }
  
        /* Renders high-contrast background configurations over active selected nodes */
        .projectgrid-custom-dropdown-item.projectgrid-picker-highlight,
        .projectgrid-custom-dropdown-item.projectgrid-row-focused,
        .projectgrid-custom-dropdown-item:hover {
          background-color: var(--background-modifier-hover, rgba(255,255,255,0.08)) !important;
          color: var(--text-accent, #70a1ff) !important;
          border-radius: 4px !important;
        }
      `;
    }
  };
  
  // ==========================================
  // END OF FILE: styles-components-dropdown.js
  // ==========================================
})();
globalThis.StylesComponentsDropdown = StylesComponentsDropdown;

const StylesComponentsOverlays = (function() {
// ==========================================
// START OF FILE: styles-components-overlays.js
// ==========================================

return {
    getOverlayStyles() {
      return `
        .projectgrid-command-picker {
          position: fixed !important; 
          background-color: var(--background-secondary, #1e1e1e) !important;
          border: 1px solid #3d3d3d !important; 
          border-radius: 6px !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5) !important;
          padding: 6px !important;
          min-width: 220px !important;
          box-sizing: border-box !important;
          z-index: 650000 !important; 
        }
        .projectgrid-picker-item {
          padding: 6px 10px !important;
          cursor: pointer !important;
          border-radius: 4px !important;
          color: var(--text-normal, #ffffff) !important;
          font-size: 12px !important;
          box-sizing: border-box !important;
          border: 2px solid transparent !important; 
          background-color: transparent !important; 
        }
        .projectgrid-picker-item.projectgrid-picker-highlight {
          background-color: var(--background-modifier-hover, rgba(255,255,255,0.08)) !important;
          color: var(--text-accent, #70a1ff) !important;
        }
  
        .projectgrid-wide-tasks-portal {
          display: flex !important;
          flex-direction: column !important;
          background-color: var(--background-secondary, #1a1a1a) !important;
          border: 2px solid var(--text-accent, #70a1ff) !important;
          border-radius: 6px !important;
          padding: 8px !important;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6) !important;
          z-index: 700000 !important;
          box-sizing: border-box !important;
        }
        .projectgrid-tutor-tooltip-portal {
          position: fixed !important;
          background-color: #1a1a2e !important;
          border: 2px solid var(--text-accent, #70a1ff) !important;
          border-radius: 6px !important;
          padding: 8px 12px !important;
          box-shadow: 0 10px 32px rgba(0, 0, 0, 0.75) !important;
          z-index: 999999 !important;
          pointer-events: none !important;
          max-width: 280px !important;
          display: none;
          box-sizing: border-box !important;
        }
        .projectgrid-tutor-heading {
          font-size: 10px !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          color: #ff4757 !important;
          margin-bottom: 4px !important;
          border-bottom: 1px dashed rgba(255,255,255,0.15) !important;
          padding-bottom: 2px !important;
        }
        .projectgrid-tutor-shortcut {
          font-size: 10px !important;
          color: #ffffff !important;
          line-height: 1.4 !important;
          font-family: var(--font-monospace) !important;
        }
      `;
    }
  };
  
  // ==========================================
  // END OF FILE: styles-components-overlays.js
  // ==========================================
})();
globalThis.StylesComponentsOverlays = StylesComponentsOverlays;

return {
  injectStyles() {
    let styleElement = document.getElementById('obsidian-projectgrid-styles');
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'obsidian-projectgrid-styles';
      document.head.appendChild(styleElement);
    }

    const compiledCss = `
      ${StylesCore.getCoreStyles()}
      ${StylesAnimation.getAnimationStyles()}
      ${StylesComponentsToolbar.getToolbarStyles()}
      ${StylesComponentsDropdown.getDropdownStyles()}
      ${StylesComponentsOverlays.getOverlayStyles()}
    `;

    styleElement.textContent = compiledCss;
  }
};

// ==========================================
// END OF FILE: styles.js
// ==========================================
})();
globalThis.StylesManager = StylesManager;

const MainShortcuts = (function() {
// ==========================================
// START OF FILE: main-shortcuts.js
// ==========================================


const MenuState = (function() {
// ==========================================
// START OF FILE: menu-state.js
// ==========================================


const GridConfig = (function() {
// ==========================================
// START OF FILE: grid-config.js
// ==========================================

const gridConfigModule = {
    columns: [
      {
        key: 'title',
        icon: '📝',
        label: 'Project Note Title',
        type: 'static',
        width: '25%'
      },
      {
        key: 'created',
        icon: '🆕',
        label: 'Created Date',
        type: 'timestamp',
        width: '6%'
      },
      {
        key: 'updated',
        icon: '🆙',
        label: 'Updated Date',
        type: 'timestamp',
        width: '6%'
      },
      {
        key: 'dopus',
        icon: '📁',
        label: 'Directory Opus',
        type: 'launcher',
        protocol: 'dopus',
        width: '4%'
      },
      {
        key: 'cursor',
        icon: '💻',
        label: 'Cursor Workspace',
        type: 'launcher',
        protocol: 'cursor',
        width: '4%'
      },
      {
        key: 'obsidian',
        icon: '💜',
        label: 'Obsidian Vault',
        type: 'launcher',
        protocol: 'obsidian',
        width: '4%'
      },
      {
        key: 'tasks',
        icon: '🔧',
        label: 'Tasks Todo',
        type: 'yaml-select',
        // DUMMY DATA ADDITION: Populated exactly 5 standard mock task completion metric choices
        defaults: ['0/5', '1/5', '2/5', '3/5', '4/5', '5/5'],
        isExtendable: true,
        tutorKeys: '• Click: Focus tasks dropdown cell<br>• ArrowUp/Down: Shift vertical grid rows<br>• Escape: Focus main search input field',
        width: '5%'
      },
      {
        key: 'tags',
        icon: '🏷️',
        label: 'Tag Count',
        type: 'tags-cell',
        defaults: ['⬛'],
        isExtendable: true,
        tutorKeys: '• Type text: Filter or add custom tag values<br>• Enter: Toggle checkmark item state<br>• Escape: Close dropdown menu panel',
        width: '6%'
      },
      {
        key: 'stars',
        icon: '⭐',
        label: 'Stars Rating',
        type: 'yaml-select',
        defaults: ['⬛','0⭐','1⭐','2⭐','3⭐','4⭐','5⭐'],
        isExtendable: false,
        tutorKeys: '• Arrows Up/Down: Cycle value selection options<br>• Enter/Spacebar: Commit frontline choices<br>• Escape: Dismiss context container view panel',
        width: '5%'
      },
      {
        key: 'value',
        icon: '💲',
        label: 'Project Value',
        type: 'yaml-select',
        defaults: ['⬛','0💲','1💲','2💲','3💲','4💲','5💲','6💲','7💲','8💲','9💲'],
        isExtendable: false,
        tutorKeys: '• Arrows Up/Down: Change numeric parameter settings<br>• Tab/Shift+Tab: Horizontal navigation tracking',
        width: '5%'
      },
      {
        key: 'size',
        icon: '🐘',
        label: 'Folder Size',
        type: 'yaml-select',
        defaults: ['⬛','0🐘','1🐘','2🐘','3🐘','4🐘','5🐘'],
        isExtendable: false,
        tutorKeys: '• Highlight items using arrow hotkey channels<br>• Escape: Focus main search filter field',
        width: '5%'
      },
      {
        key: 'depth',
        icon: '🎱',
        label: 'Nesting Depth',
        type: 'yaml-select',
        defaults: ['⬛','0🎱','1🎱','2🎱','3🎱','4🎱','5🎱'],
        isExtendable: false,
        tutorKeys: '• Cycle cells frame focus parameters cleanly',
        width: '5%'
      },
      {
        key: 'priority',
        icon: '🏅',
        label: 'Priority Tier',
        type: 'yaml-select',
        defaults: ['⬛','0🏅','1🏅','2🏅','3🏅','4🏅','5🏅'],
        isExtendable: false,
        tutorKeys: '• Toggle priority weights instantly via keyboard items',
        width: '5%'
      },
      {
        key: 'status',
        icon: '🚦',
        label: 'Deployment Status',
        type: 'yaml-select',
        defaults: ['⬛','hold🛑', 'plan🌐', 'dev🛠', 'test🧪', 'ship📦'],
        isExtendable: false,
        tutorKeys: '• Modify status metadata tags dynamically',
        width: '6%'
      },
      {
        key: 'lang',
        icon: '🔤',
        label: 'Source Language',
        type: 'yaml-select',
        defaults: ['js', 'ts', 'au3', 'ahk'],
        isExtendable: true,
        tutorKeys: '• Type text: Append extensible text elements<br>• Escape: Shift cursor straight to main filter bar',
        width: '5%'
      },
      {
        key: 'target',
        icon: '🎯',
        label: 'Build Target',
        type: 'yaml-select',
        defaults: ['ce', 'op', 'app', 'link'],
        isExtendable: true,
        tutorKeys: '• Add custom compilation environment strings directly',
        width: '5%'
      },
      {
        key: 'git',
        icon: '💿',
        label: 'Git Repository',
        type: 'scanner-check',
        targetFile: '.git',
        width: '4%'
      },
      {
        key: 'agents',
        icon: '🤖',
        label: 'Agent Matrix File',
        type: 'scanner-check',
        targetFile: 'AGENTS.md',
        width: '4%'
      }
    ]
  };
  
  // FIX: Expose directly on the global scope to pass through custom IIFE bundler restrictions
  globalThis.GridConfig = gridConfigModule;
  return gridConfigModule;
  
  // ==========================================
  // END OF FILE: grid-config.js
  // ==========================================
})();
globalThis.GridConfig = GridConfig;

const MenuStateUtils = (function() {
// ==========================================
// START OF FILE: menu-state-utils.js
// ==========================================


const UiDropdown = (function() {
// ==========================================
// START OF FILE: ui-dropdown.js
// ==========================================


const UiDropdownDom = (function() {
// ==========================================
// START OF FILE: ui-dropdown-dom.js
// ==========================================

return {
    createPanelContainer(triggerElement) {
      const panel = document.createElement('div');
      panel.className = 'projectgrid-dropup-panel';
  
      const rect = triggerElement.getBoundingClientRect();
      Object.assign(panel.style, {
        position: 'fixed', 
        bottom: `${window.innerHeight - rect.top + 4}px`,
        left: `${rect.left + window.scrollX}px`, 
        zIndex: '300000', 
        height: 'auto',
        display: 'flex', 
        flexDirection: 'column', 
        width: '150px'
      });
  
      return panel;
    },
  
    buildOptionsList(scrollingContainer, fullOptionsList, defaults, activeFilters, onToggle) {
      fullOptionsList.forEach((opt) => {
        const wrapper = document.createElement('label');
        wrapper.className = 'projectgrid-dropup-option';
  
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.tabIndex = -1; 
        
        if (opt === '[ALL]') {
          checkbox.checked = (activeFilters.size === defaults.length);
        } else {
          checkbox.checked = activeFilters.has(opt);
        }
  
        checkbox.addEventListener('change', () => onToggle(opt, checkbox.checked));
  
        wrapper.appendChild(checkbox);
        wrapper.appendChild(document.createTextNode(opt));
        scrollingContainer.appendChild(wrapper);
      });
    }
  };
  
  // ==========================================
  // END OF FILE: ui-dropdown-dom.js
  // ==========================================
})();
globalThis.UiDropdownDom = UiDropdownDom;

const uiDropdownModule = {
  activeDropdownInstances: {},

  buildHeaderDropup(titleIcon, key, defaults, rowsArray) {
    const th = document.createElement('th');
    th.className = 'projectgrid-uniform-yaml-th';
    
    const trigger = document.createElement('div');
    trigger.className = 'projectgrid-header-dropup-trigger';
    trigger.setAttribute('data-key', key);
    trigger.tabIndex = 0; 
    trigger.textContent = titleIcon;

    let activePanel = null;
    let selectionIdx = 0;
    const activeFilters = new Set(defaults);
    const fullOptionsList = ['[ALL]', ...defaults];
    let isOpeningPanel = false;

    const closePanel = () => {
      if (activePanel) { activePanel.remove(); activePanel = null; }
      if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
      if (window.ProjectGridTriggerTutorHelpBoxRedraw) window.ProjectGridTriggerTutorHelpBoxRedraw(null);
      document.removeEventListener('mousedown', handleOutsideClickGlobalClosure);
    };

    const handleOutsideClickGlobalClosure = (e) => {
      if (activePanel && !activePanel.contains(e.target) && !trigger.contains(e.target)) {
        closePanel();
      }
    };

    const openPanel = () => {
      if (activePanel) return;
      isOpeningPanel = true;
      
      document.querySelectorAll('.projectgrid-dropup-panel').forEach(p => p.remove());

      selectionIdx = 0;
      activePanel = UiDropdownDom.createPanelContainer(trigger);

      const labelHeader = document.createElement('div');
      labelHeader.className = 'projectgrid-dropup-header-title';
      labelHeader.textContent = `📋 Filters: ${key.toUpperCase()}`;
      activePanel.appendChild(labelHeader);

      const scrollingContainer = document.createElement('div');
      scrollingContainer.style.overflowY = 'auto';
      scrollingContainer.style.flex = '1';

      UiDropdownDom.buildOptionsList(scrollingContainer, fullOptionsList, defaults, activeFilters, handleToggle);
      activePanel.appendChild(scrollingContainer);
      document.body.appendChild(activePanel);

      activePanel.tabIndex = 0;
      activePanel.focus();

      activePanel.addEventListener('keydown', (e) => {
        const options = scrollingContainer.querySelectorAll('.projectgrid-dropup-option');
        if (options.length === 0) return;

        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault(); e.stopPropagation();
          selectionIdx = e.key === 'ArrowDown' ? ((selectionIdx + 1) % options.length) : ((selectionIdx - 1 + options.length) % options.length);
          
          options.forEach((lbl, lIdx) => {
            if (lIdx === selectionIdx) {
              lbl.classList.add('projectgrid-row-focused');
              if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(lbl);
              lbl.scrollIntoView({ block: 'nearest' });
            } else { lbl.classList.remove('projectgrid-row-focused'); }
          });
        } else if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter') {
          e.preventDefault(); e.stopPropagation();
          if (options[selectionIdx]) {
            const cb = options[selectionIdx].querySelector('input[type="checkbox"]');
            cb.checked = !cb.checked;
            handleToggle(fullOptionsList[selectionIdx], cb.checked);
          }
        } else if (e.key === 'Escape') {
          e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
          closePanel(); 
          trigger.focus();
        }
      });

      requestAnimationFrame(() => {
        document.addEventListener('mousedown', handleOutsideClickGlobalClosure);
        isOpeningPanel = false;
        if (activePanel) activePanel.focus();
        
        const firstOpt = scrollingContainer.querySelector('.projectgrid-dropup-option');
        if (firstOpt && window.ProjectGridUpdateFocusOverlay) {
          firstOpt.classList.add('projectgrid-row-focused');
          window.ProjectGridUpdateFocusOverlay(firstOpt);
        }
        if (window.ProjectGridTriggerTutorHelpBoxRedraw) window.ProjectGridTriggerTutorHelpBoxRedraw(activePanel, 'filter-panel');
      });
    };

    const handleToggle = (opt, isChecked) => {
      if (opt === '[ALL]') {
        if (isChecked) defaults.forEach(d => activeFilters.add(d));
        else activeFilters.clear();
      } else {
        if (isChecked) activeFilters.add(opt);
        else activeFilters.delete(opt);
      }
      if (activePanel) {
        const boxes = activePanel.querySelectorAll('input[type="checkbox"]');
        if (boxes && boxes.length > 0) {
          boxes[0].checked = (activeFilters.size === defaults.length);
          defaults.forEach((d, idx) => { if (boxes[idx + 1]) boxes[idx + 1].checked = activeFilters.has(d); });
        }
      }
      rowsArray.forEach(row => {
        if (!row.dropdownFilters) row.dropdownFilters = {};
        const rawVal = row.yamlMetadataValues && row.yamlMetadataValues[key] ? String(row.yamlMetadataValues[key]) : '⬛';
        const sanitizedRaw = rawVal.replace(/[⭐💲🐘🎱🏅🛑🌐🛠🧪📦]/g, '').trim();
        let isMatchFound = false;
        activeFilters.forEach(filterOpt => {
          const sanitizedFilter = filterOpt.replace(/[⭐💲🐘🎱🏅🛑🌐🛠🧪📦]/g, '').trim();
          if (sanitizedRaw === sanitizedFilter || (sanitizedRaw === '⬛' && sanitizedFilter === '⬛')) isMatchFound = true;
        });
        row.dropdownFilters[key] = isMatchFound;
      });
      if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
    };

    trigger.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault(); evt.stopPropagation(); evt.stopImmediatePropagation();
        trigger.blur();

        const rootContainer = trigger.closest('.block-language-projectgrid') || document;
        const targetInput = rootContainer.querySelector('.projectgrid-filter-input');
        
        if (targetInput) {
          requestAnimationFrame(() => { targetInput.focus(); targetInput.select(); });
        }
        return;
      }

      if (!activePanel) {
        if (evt.key === 'Enter' || evt.key === ' ' || (evt.key === 'ArrowDown' && evt.altKey) || evt.key === 'ArrowDown') {
          evt.preventDefault(); evt.stopPropagation(); openPanel();
        }
      }
    }, true);

    trigger.addEventListener('focus', () => {
      if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(trigger);
      if (window.ProjectGridTriggerTutorHelpBoxRedraw) window.ProjectGridTriggerTutorHelpBoxRedraw(trigger, 'filter-header');
    });

    trigger.addEventListener('mousedown', (e) => {
      e.preventDefault(); e.stopPropagation();
      if (activePanel && !isOpeningPanel) closePanel();
      else { trigger.focus(); openPanel(); }
    });

    this.activeDropdownInstances[key] = { open: openPanel, triggerElement: trigger };

    th.appendChild(trigger);
    return th;
  }
};

globalThis.UiDropdown = uiDropdownModule;
return uiDropdownModule;

// ==========================================
// END OF FILE: ui-dropdown.js
// ==========================================
})();
globalThis.UiDropdown = UiDropdown;

return {
  openHeaderDropup(key) {
    const activePicker = document.querySelector('.projectgrid-command-picker');
    if (activePicker) activePicker.remove();

    const targetDropdownInstance = UiDropdown.activeDropdownInstances && UiDropdown.activeDropdownInstances[key];
    
    if (targetDropdownInstance && typeof targetDropdownInstance.open === 'function') {
      requestAnimationFrame(() => {
        if (targetDropdownInstance.triggerElement) {
          targetDropdownInstance.triggerElement.focus();
        }
        targetDropdownInstance.open();
      });
    }
  },

  focusRowCell(rowObj, cellIndex) {
    if (!rowObj || !rowObj.element) return alert('Highlight a row project using arrow keys first.');
    const activePicker = document.querySelector('.projectgrid-command-picker');
    if (activePicker) activePicker.remove();

    const targetCell = rowObj.element.children[cellIndex];
    const interactive = targetCell ? targetCell.querySelector('.projectgrid-custom-select-btn, .projectgrid-tags-cell-btn, .projectgrid-tasks-trigger-btn, a, input') : null;
    
    if (interactive) {
      requestAnimationFrame(() => {
        interactive.focus();
        // FIX: Programmatically trigger the local open handle to unpack dropdown lists instantly when requested from picker wheel menus
        if (typeof interactive.openDropdown === 'function') {
          interactive.openDropdown();
        }
      });
    }
  },

  fireProtocol(rowObj, protocol) {
    if (!rowObj || !rowObj.element) return alert('Highlight a row project using arrow keys first.');
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
// END OF FILE: menu-state-utils.js
// ==========================================
})();
globalThis.MenuStateUtils = MenuStateUtils;

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
return menuStateModule;

// ==========================================
// END OF FILE: menu-state.js
// ==========================================
})();
globalThis.MenuState = MenuState;

const MenuDom = (function() {
// ==========================================
// START OF FILE: menu-dom.js
// ==========================================

return {
    renderPickerBox(filterInput, itemsList, selectedIndex, containerElement, onItemClick, onClose) {
      this.destroyActivePickers(containerElement);
  
      const picker = document.createElement('div');
      picker.className = 'projectgrid-command-picker';
      
      // Position parameters tracking viewports boundary targets cleanly
      const rect = filterInput.getBoundingClientRect();
      picker.style.top = `${rect.bottom + window.scrollY + 4}px`;
      picker.style.left = `${rect.left + window.scrollX}px`;
  
      itemsList.forEach((item, idx) => {
        const el = document.createElement('div');
        el.className = 'projectgrid-picker-item';
        
        // FIX: ENSURE BOTH CONTEXT CLASSES ARE LAYERED ON GENERATION AHEAD OF KEYBOARD SCAN EVENTS
        if (idx === selectedIndex) {
          el.classList.add('projectgrid-picker-highlight');
          el.classList.add('projectgrid-row-focused');
        }
        
        el.textContent = item.name;
  
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          onItemClick(idx);
        });
  
        picker.appendChild(el);
      });
  
      document.body.appendChild(picker); 
  
      const outsideClickListener = (e) => {
        if (!picker.contains(e.target) && e.target !== filterInput) {
          onClose();
          document.removeEventListener('click', outsideClickListener);
        }
      };
      setTimeout(() => document.addEventListener('click', outsideClickListener), 10);
  
      return picker;
    },
  
    destroyActivePickers(containerElement) {
      const existing = document.querySelectorAll('.projectgrid-command-picker');
      existing.forEach(p => p.remove());
      if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
    }
  };
  
  // ==========================================
  // END OF FILE: menu-dom.js
  // ==========================================
})();
globalThis.MenuDom = MenuDom;

return {
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
})();
globalThis.MainShortcuts = MainShortcuts;

const MainRenderer = (function() {
// ==========================================
// START OF FILE: main-renderer.js
// ==========================================


const UiBuilder = (function() {
// ==========================================
// START OF FILE: ui.js
// ==========================================



const UiRow = (function() {
// ==========================================
// START OF FILE: ui-row.js
// ==========================================

const fs = require('fs');
const path = require('path');


const UiColor = (function() {
// ==========================================
// START OF FILE: ui-color.js
// ==========================================

return {
    getColorForFirstCharacter(filename) {
      if (!filename) return 'var(--text-accent)';
      const cleanStr = filename.replace(/^\+/, '').trim().toUpperCase();
      if (cleanStr.length === 0) return 'var(--text-accent)';
      
      const code = cleanStr.charCodeAt(0);
      // Map strictly over uppercase alphabet bounds (A=65 to Z=90)
      if (code >= 65 && code <= 90) {
        const step = (code - 65) / 25; 
        const hue = step * 360; 
        return `hsl(${hue}, 85%, 65%)`; 
      }
      return 'var(--text-normal)';
    }
  };
  
  // ==========================================
  // END OF FILE: ui-color.js
  // ==========================================
})();
globalThis.UiColor = UiColor;

const UiRowDates = (function() {
// ==========================================
// START OF FILE: ui-row-dates.js
// ==========================================

const fs = require('fs');
const path = require('path');

return {
  formatDateString(dateObj) {
    if (!dateObj || isNaN(dateObj.getTime())) return '0000.00.00 00';
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const hh = String(dateObj.getHours()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd} ${hh}`;
  },

  // FIX: Added single cell execution handle to support dynamic configuration loop injection passes
  appendSingleTimestampCell(tableRow, folder, absoluteVaultRoot, columnKey, rowTrackingReference) {
    const absoluteFolderDiskPath = path.join(absoluteVaultRoot, folder.path);
    let targetedDateStr = '0000.00.00 00';

    try {
      if (fs.existsSync(absoluteFolderDiskPath)) {
        const directoryStats = fs.statSync(absoluteFolderDiskPath);
        
        // Dynamically select the exact filesystem handle based on configuration requirements
        if (columnKey === 'created') {
          targetedDateStr = this.formatDateString(directoryStats.birthtime);
        } else if (columnKey === 'updated') {
          targetedDateStr = this.formatDateString(directoryStats.mtime);
        }
      }
    } catch (err) {
      console.error(`[ProjectGrid] Dynamic timestamp tracking error:`, err.message);
    }

    // Cache metrics locally inside the state checker tracking registry register object records
    rowTrackingReference.folderDatesValues = rowTrackingReference.folderDatesValues || {};
    rowTrackingReference.folderDatesValues[columnKey] = targetedDateStr;

    const cell = document.createElement('td');
    cell.className = 'projectgrid-matrix-cell projectgrid-timestamp-scaled-td';
    cell.textContent = targetedDateStr;
    tableRow.appendChild(cell);
  }
};

// ==========================================
// END OF FILE: ui-row-dates.js
// ==========================================
})();
globalThis.UiRowDates = UiRowDates;

const UiRowActions = (function() {
// ==========================================
// START OF FILE: ui-row-actions.js
// ==========================================

const fs = require('fs');
const path = require('path');

return {
  // FIX: Added singular execution handle to cleanly align launcher button injection with your dynamic configuration matrix loop
  appendSingleLauncherButtonCell(tableRow, folder, absoluteVaultRoot, columnConfig, app) {
    const absoluteLocalPath = path.join(absoluteVaultRoot, folder.path).replace(/[/\\]+/g, '\\');
    
    const dotObsidianPhysicalPath = path.join(absoluteVaultRoot, folder.path, '.obsidian');
    const hasObsidianVault = fs.existsSync(dotObsidianPhysicalPath);

    // Determine path missing states depending on the current iteration target protocol
    let isVaultLinkMissing = false;
    if (columnConfig.protocol === 'obsidian') {
      isVaultLinkMissing = !hasObsidianVault;
    }

    const cell = document.createElement('td');
    cell.className = 'projectgrid-matrix-cell action-icon-cell';
    
    const fileAnchor = document.createElement('a');
    fileAnchor.href = `aip://${columnConfig.protocol}/${absoluteLocalPath}`;
    fileAnchor.className = 'projectgrid-aip-icon-btn';
    fileAnchor.textContent = columnConfig.icon;
    fileAnchor.title = `Open workspace path branch in ${columnConfig.label}`;

    if (isVaultLinkMissing) {
      fileAnchor.classList.add('is-vault-missing');
    }

    // Write parameters to tracker structures safely
    tableRow.rowTrackingReference = tableRow.rowTrackingReference || {};
    tableRow.rowTrackingReference.launcherValues = tableRow.rowTrackingReference.launcherValues || {};
    tableRow.rowTrackingReference.launcherValues[columnConfig.key] = columnConfig.icon;

    cell.appendChild(fileAnchor);
    tableRow.appendChild(cell);
  }
};

// ==========================================
// END OF FILE: ui-row-actions.js
// ==========================================
})();
globalThis.UiRowActions = UiRowActions;

const UiRowTags = (function() {
// ==========================================
// START OF FILE: ui-row-tags.js
// ==========================================


const UiRowKeys = (function() {
// ==========================================
// START OF FILE: ui-row-keys.js
// ==========================================

return {
    handleClosedNavigation(evt, btn, tableRow, fieldIdx, cfg, filterInput) {
      if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp') {
        evt.preventDefault(); evt.stopPropagation();
        this.jumpToVerticalRowCell(evt, tableRow, '.projectgrid-custom-select-btn, .projectgrid-tags-cell-btn, .projectgrid-tasks-trigger-btn', fieldIdx);
        return true;
      }
  
      if (evt.key === 'ArrowLeft' || evt.key === 'ArrowRight') {
        evt.preventDefault(); evt.stopPropagation();
        const siblings = Array.from(tableRow.querySelectorAll('.projectgrid-custom-select-btn, .projectgrid-tags-cell-btn, .projectgrid-tasks-trigger-btn'));
        let currentPosition = siblings.indexOf(btn);
        let targetPosition = currentPosition + (evt.key === 'ArrowRight' ? 1 : -1);
  
        if (targetPosition >= 0 && targetPosition < siblings.length) {
          siblings[targetPosition].focus();
        }
        return true;
      }
  
      if (evt.key === 'Tab') {
        evt.preventDefault();
        const siblingButtons = Array.from(tableRow.querySelectorAll('.projectgrid-custom-select-btn, .projectgrid-tags-cell-btn, .projectgrid-tasks-trigger-btn'));
        let currentIdx = siblingButtons.indexOf(btn);
        let nextIdx = currentIdx + (evt.shiftKey ? -1 : 1);
        if (nextIdx >= 0 && nextIdx < siblingButtons.length) siblingButtons[nextIdx].focus();
        else if (nextIdx < 0) {
          let fallbackInput = filterInput || document.querySelector('.projectgrid-filter-input');
          if (fallbackInput) fallbackInput.focus();
        }
        return true;
      }
      return false;
    },
  
    jumpToVerticalRowCell(evt, currentTableRow, elementSelector, currentCellIndex = 0) {
      const parentTableBody = currentTableRow.parentElement;
      if (!parentTableBody) return;
  
      const visibleRows = Array.from(parentTableBody.querySelectorAll('.projectgrid-matrix-row'))
        .filter(r => r.style.display !== 'none');
      
      const currentRowIdx = visibleRows.indexOf(currentTableRow);
      let nextRowIdx = currentRowIdx + (evt.key === 'ArrowDown' ? 1 : -1);
  
      if (nextRowIdx >= 0 && nextRowIdx < visibleRows.length) {
        const targetRow = visibleRows[nextRowIdx];
        
        parentTableBody.querySelectorAll('.projectgrid-matrix-row').forEach(r => {
          r.classList.remove('projectgrid-row-focused');
        });
        
        targetRow.classList.add('projectgrid-row-focused');
  
        const interactiveTargets = Array.from(targetRow.querySelectorAll(elementSelector));
        const targetElement = interactiveTargets[currentCellIndex] || interactiveTargets;
        
        if (targetElement) {
          targetElement.focus();
          targetRow.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }
    }
  };
  
  // ==========================================
  // END OF FILE: ui-row-keys.js
  // ==========================================
})();
globalThis.UiRowKeys = UiRowKeys;

const UiRowTagsDom = (function() {
// ==========================================
// START OF FILE: ui-row-tags-dom.js
// ==========================================

return {
    createTagsContainer(btnElement) {
      const dropdown = document.createElement('div');
      dropdown.className = 'projectgrid-dropup-panel projectgrid-tags-portal-panel';
  
      const rect = btnElement.getBoundingClientRect();
      Object.assign(dropdown.style, {
        position: 'fixed', 
        top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`, 
        width: '170px',
        zIndex: '250000', 
        height: 'auto', 
        maxHeight: '300px', 
        display: 'flex', 
        flexDirection: 'column'
      });
  
      const label = document.createElement('div');
      label.className = 'projectgrid-dropup-header-title';
      label.textContent = '🏷️ Multi-Select Tags';
      dropdown.appendChild(label);
  
      return dropdown;
    },
  
    buildCustomInput(dropdown) {
      const inputWrapper = document.createElement('div');
      inputWrapper.className = 'projectgrid-tags-input-container';
      
      const customInput = document.createElement('input');
      customInput.type = 'text'; 
      customInput.className = 'projectgrid-tags-custom-entry-field';
      customInput.placeholder = '➕ Filter / Add Tag...';
      
      inputWrapper.appendChild(customInput);
      dropdown.appendChild(inputWrapper);
      
      return customInput;
    },
  
    gatherUniqueAvailableTags() {
      const globalTagsSet = new Set();
      document.querySelectorAll('.projectgrid-tags-cell-btn').forEach(b => {
        if (b.textContent !== '⬛') {
          b.textContent.split(', ').forEach(t => globalTagsSet.add(t.trim()));
        }
      });
      return Array.from(globalTagsSet).sort();
    },
  
    populateTagsList(scrollingContainer, uniqueAvailableTags, activeTagsArray, onToggle) {
      uniqueAvailableTags.forEach((tag) => {
        const itemWrapper = document.createElement('label');
        itemWrapper.className = 'projectgrid-dropup-option';
  
        const cb = document.createElement('input');
        cb.type = 'checkbox'; 
        cb.checked = activeTagsArray.includes(tag); 
        cb.tabIndex = -1;
        
        cb.addEventListener('change', () => onToggle(tag, cb.checked));
  
        itemWrapper.appendChild(cb); 
        itemWrapper.appendChild(document.createTextNode(tag));
        scrollingContainer.appendChild(itemWrapper);
      });
    }
  };
  
  // ==========================================
  // END OF FILE: ui-row-tags-dom.js
  // ==========================================
})();
globalThis.UiRowTagsDom = UiRowTagsDom;

return {
  buildInteractiveTagsColumn(tableRow, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput) {
    const tagsCell = document.createElement('td');
    tagsCell.className = 'projectgrid-matrix-cell select-cell projectgrid-uniform-yaml-td';
    
    const tagsBtn = document.createElement('div');
    tagsBtn.className = 'projectgrid-custom-select-btn projectgrid-tags-cell-btn';
    tagsBtn.tabIndex = 0;

    let activeTagsArray = [];
    if (frontmatter && frontmatter.tags) {
      activeTagsArray = Array.isArray(frontmatter.tags) ? frontmatter.tags : String(frontmatter.tags).split(/[\s,]+/);
      activeTagsArray = activeTagsArray.map(t => String(t).trim()).filter(t => t.length > 0);
    }

    rowTrackingReference.yamlMetadataValues = rowTrackingReference.yamlMetadataValues || {};
    rowTrackingReference.yamlMetadataValues['tags'] = activeTagsArray.length > 0 ? activeTagsArray.join(', ') : '⬛';
    tagsBtn.textContent = activeTagsArray.length > 0 ? activeTagsArray.join(', ') : '⬛';

    let activeTagsDropdown = null;
    let tagsSelectionIdx = 0;
    let isOpeningPanel = false;

    const closeTagsDropdown = () => {
      if (activeTagsDropdown) { activeTagsDropdown.remove(); activeTagsDropdown = null; }
      if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
    };

    const openTagsDropdown = () => {
      if (activeTagsDropdown) return;
      isOpeningPanel = true; tagsSelectionIdx = 0;
      
      activeTagsDropdown = UiRowTagsDom.createTagsContainer(tagsBtn);
      const uniqueAvailableTags = UiRowTagsDom.gatherUniqueAvailableTags();

      const customInput = UiRowTagsDom.buildCustomInput(activeTagsDropdown);
      const scrollingContainer = document.createElement('div');
      scrollingContainer.style.overflowY = 'auto'; scrollingContainer.style.flex = '1';

      UiRowTagsDom.populateTagsList(scrollingContainer, uniqueAvailableTags, activeTagsArray, toggleTagValue);
      activeTagsDropdown.appendChild(scrollingContainer);
      document.body.appendChild(activeTagsDropdown);

      customInput.focus();

      customInput.addEventListener('keydown', async (e) => {
        const options = scrollingContainer.querySelectorAll('.projectgrid-dropup-option');

        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault(); e.stopPropagation();
          if (options.length === 0) return;
          tagsSelectionIdx = e.key === 'ArrowDown' ? ((tagsSelectionIdx + 1) % options.length) : ((tagsSelectionIdx - 1 + options.length) % options.length);

          options.forEach((lbl, lIdx) => {
            lbl.classList.toggle('projectgrid-row-focused', lIdx === tagsSelectionIdx);
            if (lIdx === tagsSelectionIdx && window.ProjectGridUpdateFocusOverlay) {
              window.ProjectGridUpdateFocusOverlay(lbl);
              lbl.scrollIntoView({ block: 'nearest' });
            }
          });
        } else if (e.key === 'Enter') {
          e.preventDefault(); e.stopPropagation();
          const typedText = customInput.value.trim().replace(/#/g, '');

          if (typedText === '') {
            if (options[tagsSelectionIdx]) {
              const cb = options[tagsSelectionIdx].querySelector('input[type="checkbox"]');
              cb.checked = !cb.checked;
              await toggleTagValue(options[tagsSelectionIdx].textContent.trim(), cb.checked);
            }
          } else {
            if (!activeTagsArray.includes(typedText)) await toggleTagValue(typedText, true);
            closeTagsDropdown(); tagsBtn.focus();
          }
        } else if (e.key === 'Escape') {
          e.preventDefault(); e.stopPropagation(); closeTagsDropdown(); tagsBtn.focus();
        }
      });

      setTimeout(() => {
        isOpeningPanel = false;
        const firstOpt = scrollingContainer.querySelector('.projectgrid-dropup-option');
        if (firstOpt && window.ProjectGridUpdateFocusOverlay) {
          firstOpt.classList.add('projectgrid-row-focused');
          window.ProjectGridUpdateFocusOverlay(firstOpt);
        }
      }, 20);
    };

    const toggleTagValue = async (tag, isChecked) => {
      const fileAbstract = app.vault.getAbstractFileByPath(expectedNotePath);
      if (fileAbstract) {
        await app.fileManager.processFrontMatter(fileAbstract, (fm) => {
          let currentTags = fm.tags ? (Array.isArray(fm.tags) ? [...fm.tags] : String(fm.tags).split(/[\s,]+/)) : [];
          currentTags = currentTags.map(t => String(t).trim()).filter(t => t.length > 0);
          if (isChecked) { if (!currentTags.includes(tag)) currentTags.push(tag); } 
          else { currentTags = currentTags.filter(t => t !== tag); }
          if (currentTags.length === 0) delete fm.tags;
          else fm.tags = currentTags;
          activeTagsArray = currentTags;
        });
        const newLabel = activeTagsArray.length > 0 ? activeTagsArray.join(', ') : '⬛';
        tagsBtn.textContent = newLabel; tagsBtn.title = newLabel;
        rowTrackingReference.yamlMetadataValues['tags'] = newLabel;
        if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
      }
    };

    tagsBtn.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault(); evt.stopPropagation(); evt.stopImmediatePropagation();
        tagsBtn.blur();
        const rootContainer = tagsBtn.closest('.block-language-projectgrid') || document;
        const targetInput = rootContainer.querySelector('.projectgrid-filter-input');
        if (targetInput) requestAnimationFrame(() => { targetInput.focus(); targetInput.select(); });
        return;
      }
      if (!activeTagsDropdown) {
        if (evt.key === 'Enter' || evt.key === ' ' || evt.key === 'Spacebar') {
          evt.preventDefault(); evt.stopPropagation(); openTagsDropdown(); return;
        }
        const mockCfg = { key: 'tags', defaults: ['⬛'], isExtendable: true };
        const handled = UiRowKeys.handleClosedNavigation(evt, tagsBtn, tableRow, 7, mockCfg, filterInput);
        if (handled) { evt.preventDefault(); evt.stopPropagation(); }
      }
    }, true);

    tagsBtn.addEventListener('focus', () => { if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(tagsBtn); if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(tableRow); });
    tagsBtn.addEventListener('blur', () => { setTimeout(() => { if (activeTagsDropdown && !activeTagsDropdown.contains(document.activeElement) && document.activeElement !== tagsBtn) closeTagsDropdown(); }, 180); if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(null); if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(null); });
    tagsBtn.addEventListener('mousedown', (e) => { e.stopPropagation(); if (activeTagsDropdown && !isOpeningPanel) closeTagsDropdown(); else { tagsBtn.focus(); openTagsDropdown(); } });

    tagsCell.appendChild(tagsBtn);
    tableRow.appendChild(tagsCell);
  }
};

// ==========================================
// END OF FILE: ui-row-tags.js
// ==========================================
})();
globalThis.UiRowTags = UiRowTags;

const UiRowSelect = (function() {
// ==========================================
// START OF FILE: ui-row-select.js
// ==========================================



const UiRowSelectDom = (function() {
// ==========================================
// START OF FILE: ui-row-select-dom.js
// ==========================================

return {
    createDropdownContainer(btnElement, configKey) {
      const dropdown = document.createElement('div');
      dropdown.className = 'projectgrid-dropup-panel';
      
      const rect = btnElement.getBoundingClientRect();
      Object.assign(dropdown.style, {
        position: 'fixed', 
        top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`, 
        minWidth: '300px',
        maxWidth: '800px', // Fluid scale boundaries parameters limits up to 800px
        width: 'max-content',
        maxHeight: '320px',
        display: 'flex', 
        flexDirection: 'column',
        boxSizing: 'border-box'
      });
  
      const label = document.createElement('div');
      label.className = 'projectgrid-dropup-header-title';
      label.textContent = `📋 ${configKey.toUpperCase()}`;
      dropdown.appendChild(label);
  
      return dropdown;
    },
  
    buildCustomInput(dropdown) {
      const inputWrapper = document.createElement('div');
      inputWrapper.className = 'projectgrid-tags-input-container';
      inputWrapper.style.width = '100%';
      inputWrapper.style.boxSizing = 'border-box';
      
      const customInput = document.createElement('input');
      customInput.type = 'text';
      customInput.className = 'projectgrid-tags-custom-entry-field';
      customInput.placeholder = '➕ Filter list / Create item...';
      
      Object.assign(customInput.style, {
        width: '100%',
        boxSizing: 'border-box',
        display: 'block'
      });
      
      inputWrapper.appendChild(customInput);
      dropdown.appendChild(inputWrapper);
      
      return customInput;
    },
  
    populateItemsList(scrollingContainer, optionsList, isMultiSelect, activeValuesArray, onDeleteClickCallback) {
      scrollingContainer.innerHTML = ''; // Ensure tracking grids clear cleanly
      
      optionsList.forEach((opt) => {
        const li = document.createElement('div');
        li.className = 'projectgrid-custom-dropdown-item';
        li.setAttribute('data-value', opt);
        
        // Structure row elements using flex layout to isolate left indicators from right delete keys
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.justifyContent = 'space-between';
        li.style.gap = '12px';
        li.style.width = '100%';
        li.style.boxSizing = 'border-box';
  
        const leftSegment = document.createElement('div');
        leftSegment.style.display = 'flex';
        leftSegment.style.alignItems = 'center';
        leftSegment.style.gap = '6px';
        leftSegment.style.flex = '1';
        leftSegment.style.overflow = 'hidden';
        leftSegment.style.textOverflow = 'ellipsis';
        leftSegment.style.whiteSpace = 'nowrap';
  
        if (isMultiSelect) {
          const cb = document.createElement('input');
          cb.type = 'checkbox';
          cb.tabIndex = -1;
          cb.checked = activeValuesArray.includes(opt);
          cb.style.margin = '0';
          cb.style.cursor = 'pointer';
          leftSegment.appendChild(cb);
        }
        
        leftSegment.appendChild(document.createTextNode(opt));
        li.appendChild(leftSegment);
  
        // RIGHT ALIGNED DELETE TRAP: Add the ❌ anchor to support physical node drop updates
        if (isMultiSelect) {
          const delBtn = document.createElement('span');
          delBtn.innerHTML = '✕';
          Object.assign(delBtn.style, {
            color: 'var(--text-error, #ff4757)',
            cursor: 'pointer',
            fontWeight: 'bold',
            padding: '2px 6px',
            userSelect: 'none',
            fontSize: '12px'
          });
          
          delBtn.addEventListener('click', (e) => {
            e.preventDefault(); e.stopPropagation();
            onDeleteClickCallback(opt);
          });
          li.appendChild(delBtn);
        }
        
        scrollingContainer.appendChild(li);
      });
    }
  };
  
  // ==========================================
  // END OF FILE: ui-row-select-dom.js
  // ==========================================
})();
globalThis.UiRowSelectDom = UiRowSelectDom;

const UiRowSelectState = (function() {
// ==========================================
// START OF FILE: ui-row-select-state.js
// ==========================================

return {
    initializeButtonState(btn, cfg, frontmatter, rowTrackingReference) {
      const isMarkdownFileTarget = (cfg.key === 'tasks');
      const rawVal = frontmatter && frontmatter[cfg.key] !== undefined ? String(frontmatter[cfg.key]) : '';
      
      let activeValuesArray = (rawVal && rawVal !== '⬛') ? rawVal.split(',').map(v => v.trim()).filter(v => v.length > 0) : [];
  
      if (isMarkdownFileTarget) {
        const totalCount = cfg.defaults.filter(d => d !== '⬛').length;
        btn.textContent = `${activeValuesArray.length}/${totalCount}`;
      } else {
        btn.textContent = rawVal || '⬛';
      }
      
      if (rowTrackingReference && rowTrackingReference.yamlMetadataValues) {
        rowTrackingReference.yamlMetadataValues[cfg.key] = btn.textContent;
      }
  
      let optionsList = isMarkdownFileTarget ? [...cfg.defaults.filter(d => d !== '⬛')] : ['⬛', ...cfg.defaults.filter(d => d !== '⬛')];
      if (rawVal && !isMarkdownFileTarget && !optionsList.includes(rawVal)) optionsList.push(rawVal);
  
      return { isMarkdownFileTarget, activeValuesArray, optionsList };
    }
  };
  
  globalThis.UiRowSelectState = module.exports;
  
  // ==========================================
  // END OF FILE: ui-row-select-state.js
  // ==========================================
})();
globalThis.UiRowSelectState = UiRowSelectState;

const UiRowSelectHandlers = (function() {
// ==========================================
// START OF FILE: ui-row-select-handlers.js
// ==========================================

return {
    bindLifecycleFocus(btn, tableRow, closeDropdownCallback) {
      btn.addEventListener('focus', () => { 
        if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(btn); 
        if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(tableRow); 
      });
  
      btn.addEventListener('blur', () => { 
        setTimeout(() => { 
          const openPanel = document.querySelector('.projectgrid-dropup-panel');
          if (openPanel && !openPanel.contains(document.activeElement) && document.activeElement !== btn) {
            closeDropdownCallback(); 
          } 
        }, 180); 
        if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(null); 
        if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(null); 
      });
    }
  };
  
  globalThis.UiRowSelectHandlers = module.exports;
  
  // ==========================================
  // END OF FILE: ui-row-select-handlers.js
  // ==========================================
})();
globalThis.UiRowSelectHandlers = UiRowSelectHandlers;

const UiRowSelectKeys = (function() {
// ==========================================
// START OF FILE: ui-row-select-keys.js
// ==========================================

return {
    setupKeyboardRouting(ctx, isMarkdownFileTarget, itemsContainer, customInput, onCommitCallback, onCloseCallback, onDeleteCallback, onF2JumpCallback) {
      
      const filterDropdownItemsList = () => {
        if (!customInput) return;
        const queryText = customInput.value.toLowerCase().trim();
        const itemsList = itemsContainer.querySelectorAll('.projectgrid-custom-dropdown-item');
        
        let firstVisibleIdx = -1;
        let idxCounter = 0;
  
        itemsList.forEach((li) => {
          const valueText = li.getAttribute('data-value').toLowerCase();
          let matchPosition = 0;
          let isMatchFound = true;
          
          for (let charIdx = 0; charIdx < queryText.length; charIdx++) {
            matchPosition = valueText.indexOf(queryText[charIdx], matchPosition);
            if (matchPosition === -1) { isMatchFound = false; break; }
            matchPosition++;
          }
  
          if (isMatchFound) {
            li.style.display = 'flex';
            if (firstVisibleIdx === -1) firstVisibleIdx = idxCounter;
          } else {
            li.style.display = 'none';
          }
          idxCounter++;
        });
  
        if (firstVisibleIdx !== -1 && !itemsList[ctx.selectionIdx]?.style.display === 'none') {
          // Retain position if it passes query constraints
        } else if (firstVisibleIdx !== -1) {
          ctx.selectionIdx = firstVisibleIdx;
          ctx.updateVisualSelection();
        }
      };
  
      if (customInput) {
        customInput.addEventListener('input', filterDropdownItemsList);
      }
  
      const handleKeyRouting = async (e, isInputNode) => {
        const itemsList = Array.from(itemsContainer.querySelectorAll('.projectgrid-custom-dropdown-item'));
        const visibleItems = itemsList.filter(item => item.style.display !== 'none');
        
        if (e.ctrlKey && (e.key === 'Delete' || e.key === 'Backspace')) {
          e.preventDefault(); e.stopPropagation();
          if (isMarkdownFileTarget && itemsList[ctx.selectionIdx]) {
            await onDeleteCallback(itemsList[ctx.selectionIdx].getAttribute('data-value'));
          }
          return;
        }
  
        if (e.key === 'F2') {
          e.preventDefault(); e.stopPropagation();
          const targetVal = itemsList[ctx.selectionIdx] ? itemsList[ctx.selectionIdx].getAttribute('data-value') : null;
          onF2JumpCallback(targetVal);
          return;
        }
  
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault(); e.stopPropagation();
          if (visibleItems.length === 0) return;
          
          let currentVisibleIdx = visibleItems.indexOf(itemsList[ctx.selectionIdx]);
          if (currentVisibleIdx === -1) currentVisibleIdx = 0;
  
          let nextVisibleIdx = e.key === 'ArrowDown' ? 
            ((currentVisibleIdx + 1) % visibleItems.length) : 
            ((currentVisibleIdx - 1 + visibleItems.length) % visibleItems.length);
            
          ctx.selectionIdx = itemsList.indexOf(visibleItems[nextVisibleIdx]);
          ctx.updateVisualSelection();
          return;
        }
  
        if (e.key === 'Enter' || (!isInputNode && (e.key === ' ' || e.key === 'Spacebar'))) {
          e.preventDefault(); e.stopPropagation();
          
          const typedVal = customInput ? customInput.value.trim() : '';
          const matchingNode = visibleItems.find(item => item.getAttribute('data-value').toLowerCase() === typedVal.toLowerCase());
          
          if (matchingNode) {
            ctx.selectionIdx = itemsList.indexOf(matchingNode);
            await onCommitCallback('', false);
          } else {
            await onCommitCallback(typedVal, isInputNode);
          }
          if (customInput) customInput.value = '';
          filterDropdownItemsList();
          return;
        }
  
        if (e.key === 'Escape') { 
          e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
          onCloseCallback();
        }
      };
  
      if (customInput) {
        customInput.addEventListener('keydown', (e) => handleKeyRouting(e, true));
      } else {
        itemsContainer.parentElement.addEventListener('keydown', (e) => handleKeyRouting(e, false));
      }
      
      // Return filter refresh hook handles to align layout resets
      return { triggerFuzzyReset: filterDropdownItemsList };
    }
  };
  
  globalThis.UiRowSelectKeys = module.exports;
  
  // ==========================================
  // END OF FILE: ui-row-select-keys.js
  // ==========================================
})();
globalThis.UiRowSelectKeys = UiRowSelectKeys;

const UiRowSelectActions = (function() {
// ==========================================
// START OF FILE: ui-row-select-actions.js
// ==========================================

return {
    async executeItemDeletion(valueToDestroy, expectedNotePath, cfg, app, btnElement, state, ctx, refreshCallback) {
      const fileAbstract = app.vault.getAbstractFileByPath(expectedNotePath);
      if (!fileAbstract || !globalThis.TasksMarkdownSync) return;
  
      const rawContent = await app.vault.read(fileAbstract);
      const processedText = globalThis.TasksMarkdownSync.deleteTaskLineEntry(rawContent.split('\n'), valueToDestroy);
      await app.vault.modify(fileAbstract, processedText);
      
      // Purge item traces out of cached memory structures synchronously
      state.optionsList = state.optionsList.filter(o => o !== valueToDestroy);
      state.activeValuesArray = state.activeValuesArray.filter(v => v !== valueToDestroy);
      if (window.ProjectGridDiscoveredActualTasksList) {
        window.ProjectGridDiscoveredActualTasksList = window.ProjectGridDiscoveredActualTasksList.filter(t => t !== valueToDestroy);
      }
      
      btnElement.textContent = `${state.activeValuesArray.length}/${state.optionsList.length}`;
      ctx.selectionIdx = 0;
      
      refreshCallback();
      ctx.updateVisualSelection();
      if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
    }
  };
  
  globalThis.UiRowSelectActions = module.exports;
  
  // ==========================================
  // END OF FILE: ui-row-select-actions.js
  // ==========================================
})();
globalThis.UiRowSelectActions = UiRowSelectActions;

const UiRowSelectJumper = (function() {
// ==========================================
// START OF FILE: ui-row-select-jumper.js
// ==========================================

return {
    async jumpToSourceLineLocation(taskTextToFind, expectedNotePath, app, closeDropdownCallback) {
      closeDropdownCallback();
      await app.workspace.openLinkText(expectedNotePath, '', false);
      
      if (!taskTextToFind) return;
      
      setTimeout(() => {
        const activeLeafView = app.workspace.getActiveViewOfType(require('obsidian').MarkdownView);
        if (activeLeafView && activeLeafView.editor) {
          const editorInstance = activeLeafView.editor;
          const fullTextDoc = editorInstance.getValue();
          const textLines = fullTextDoc.split('\n');
          
          let matchedLineIndex = -1;
          for (let i = 0; i < textLines.length; i++) {
            if (textLines[i].includes(taskTextToFind)) {
              matchedLineIndex = i;
              break;
            }
          }
  
          if (matchedLineIndex !== -1) {
            editorInstance.setCursor({ line: matchedLineIndex, ch: 0 });
            editorInstance.focus();
            
            if (typeof editorInstance.scrollIntoView === 'function') {
              editorInstance.scrollIntoView({ 
                from: { line: matchedLineIndex, ch: 0 }, 
                to: { line: matchedLineIndex, ch: 20 } 
              }, true);
            }
          }
        }
      }, 120);
    }
  };
  
  globalThis.UiRowSelectJumper = module.exports;
  
  // ==========================================
  // END OF FILE: ui-row-select-jumper.js
  // ==========================================
})();
globalThis.UiRowSelectJumper = UiRowSelectJumper;

return {
  buildSelectButton(cell, tableRow, fieldIdx, cfg, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput) {
    const btn = document.createElement('div');
    btn.className = 'projectgrid-custom-select-btn';
    btn.tabIndex = 0; btn.setAttribute('data-field-index', fieldIdx);

    const state = UiRowSelectState.initializeButtonState(btn, cfg, frontmatter, rowTrackingReference);
    let activeDropdown = null; let isOpening = false; const ctx = { selectionIdx: 0 };

    const closeDropdown = () => { if (activeDropdown) { activeDropdown.remove(); activeDropdown = null; } if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null); };
    UiRowSelectHandlers.bindLifecycleFocus(btn, tableRow, closeDropdown);

    const openDropdown = () => {
      if (activeDropdown) return;
      isOpening = true; document.querySelectorAll('.projectgrid-dropup-panel').forEach(p => p.remove());
      ctx.selectionIdx = 0;

      activeDropdown = UiRowSelectDom.createDropdownContainer(btn, cfg.key);
      let customInput = cfg.isExtendable ? UiRowSelectDom.buildCustomInput(activeDropdown) : null;

      const scrollingContainer = document.createElement('div');
      scrollingContainer.style.overflowY = 'auto'; scrollingContainer.style.flex = '1';
      
      const refreshDropdownListInterior = () => {
        UiRowSelectDom.populateItemsList(scrollingContainer, state.optionsList, state.isMarkdownFileTarget, state.activeValuesArray, (val) => globalThis.UiRowSelectActions.executeItemDeletion(val, expectedNotePath, cfg, app, btn, state, ctx, refreshDropdownListInterior));
        bindMouseClicks();
      };

      refreshDropdownListInterior(); activeDropdown.appendChild(scrollingContainer); document.body.appendChild(activeDropdown);

      ctx.updateVisualSelection = (forcedIdx = null) => {
        if (forcedIdx !== null) ctx.selectionIdx = forcedIdx;
        const itemsList = scrollingContainer.querySelectorAll('.projectgrid-custom-dropdown-item');
        itemsList.forEach((li, lIdx) => {
          const isSel = lIdx === ctx.selectionIdx;
          li.classList.toggle('projectgrid-picker-highlight', isSel); li.classList.toggle('projectgrid-row-focused', isSel);
          if (isSel && window.ProjectGridUpdateFocusOverlay) { window.ProjectGridUpdateFocusOverlay(li); li.scrollIntoView({ block: 'nearest' }); }
        });
      };

      const onKeyEnterCommit = async (typedValue, isInputNode) => {
        if (state.isMarkdownFileTarget) {
          if (isInputNode && typedValue !== '') {
            await globalThis.TasksMarkdownWriter.appendAndRefreshVault(app, expectedNotePath, typedValue, btn, scrollingContainer, state.optionsList, state.activeValuesArray, ctx.updateVisualSelection);
            refreshDropdownListInterior(); ctx.updateVisualSelection(); return;
          }
          const targetVal = state.optionsList[ctx.selectionIdx];
          if (state.activeValuesArray.includes(targetVal)) state.activeValuesArray = state.activeValuesArray.filter(v => v !== targetVal);
          else state.activeValuesArray.push(targetVal);
          const cb = scrollingContainer.querySelectorAll('.projectgrid-custom-dropdown-item')[ctx.selectionIdx]?.querySelector('input[type="checkbox"]');
          if (cb) cb.checked = state.activeValuesArray.includes(targetVal);
          await commitSelection(state.activeValuesArray.join(', '), targetVal, state.activeValuesArray.includes(targetVal));
        } else {
          if (isInputNode && typedValue !== '') commitSelection(typedValue); else commitSelection(state.optionsList[ctx.selectionIdx]);
        }
      };

      const keyRoutingEngine = globalThis.UiRowSelectKeys.setupKeyboardRouting(ctx, state.isMarkdownFileTarget, scrollingContainer, customInput, onKeyEnterCommit, () => { closeDropdown(); btn.focus(); }, (val) => globalThis.UiRowSelectActions.executeItemDeletion(val, expectedNotePath, cfg, app, btn, state, ctx, refreshDropdownListInterior), (val) => globalThis.UiRowSelectJumper.jumpToSourceLineLocation(val, expectedNotePath, app, closeDropdown));

      function bindMouseClicks() {
        scrollingContainer.querySelectorAll('.projectgrid-custom-dropdown-item').forEach((item, idx) => {
          const leftArea = item.firstChild; if (!leftArea) return;
          leftArea.addEventListener('click', async (e) => {
            e.preventDefault(); e.stopPropagation(); ctx.selectionIdx = idx;
            if (state.isMarkdownFileTarget) {
              const targetVal = state.optionsList[idx];
              if (state.activeValuesArray.includes(targetVal)) state.activeValuesArray = state.activeValuesArray.filter(v => v !== targetVal);
              else state.activeValuesArray.push(targetVal);
              const cb = item.querySelector('input[type="checkbox"]'); if (cb) cb.checked = state.activeValuesArray.includes(targetVal);
              await commitSelection(state.activeValuesArray.join(', '), targetVal, state.activeValuesArray.includes(targetVal)); ctx.updateVisualSelection();
            } else { commitSelection(state.optionsList[idx]); }
          });
        });
      }

      if (customInput) requestAnimationFrame(() => customInput.focus());
      else { activeDropdown.tabIndex = 0; requestAnimationFrame(() => activeDropdown.focus()); }
      setTimeout(() => { ctx.updateVisualSelection(); isOpening = false; }, 20);
    };

    const commitSelection = async (value, targetString = '', isChecked = false) => {
      const fileAbstract = app.vault.getAbstractFileByPath(expectedNotePath);
      if (fileAbstract) {
        if (state.isMarkdownFileTarget && targetString) {
          const rawContent = await app.vault.read(fileAbstract);
          const updatedText = globalThis.TasksMarkdownSync.mutateMarkdownCheckboxes(rawContent.split('\n'), targetString, isChecked);
          await app.vault.modify(fileAbstract, updatedText);
        } else {
          await app.fileManager.processFrontMatter(fileAbstract, (fm) => { if (value === '' || value === '⬛') delete fm[cfg.key]; else fm[cfg.key] = value; });
        }
        if (state.isMarkdownFileTarget) { btn.textContent = `${state.activeValuesArray.length}/${state.optionsList.length}`; } 
        else { btn.textContent = value; }
        if (rowTrackingReference && rowTrackingReference.yamlMetadataValues) rowTrackingReference.yamlMetadataValues[cfg.key] = btn.textContent;
        if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
      }
    };

    this._triggerDirectCommit = commitSelection;
    btn.addEventListener('mousedown', (e) => { e.stopPropagation(); if (activeDropdown && !isOpening) closeDropdown(); else { btn.focus(); openDropdown(); } });
    btn.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') { evt.preventDefault(); evt.stopPropagation(); evt.stopImmediatePropagation(); btn.blur(); const rootContainer = btn.closest('.block-language-projectgrid') || document; const targetInput = rootContainer.querySelector('.projectgrid-filter-input'); if (targetInput) requestAnimationFrame(() => { targetInput.focus(); targetInput.select(); }); return; }
      if (!activeDropdown) { if (evt.key === 'Enter' || evt.key === ' ' || evt.key === 'Spacebar') { evt.preventDefault(); openDropdown(); return; } const handled = UiRowKeys.handleClosedNavigation(evt, btn, tableRow, fieldIdx, cfg, filterInput); if (handled) { evt.preventDefault(); evt.stopPropagation(); } }
    }, true);

    btn.openDropdown = openDropdown; cell.appendChild(btn);
  }
};

globalThis.UiRowSelect = module.exports;

// ==========================================
// END OF FILE: ui-row-select.js
// ==========================================
})();
globalThis.UiRowSelect = UiRowSelect;

return {
  buildRow(folder, absoluteVaultRoot, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput) {
    const tableRow = document.createElement('tr');
    tableRow.className = 'projectgrid-matrix-row';

    rowTrackingReference.yamlMetadataValues = {};
    rowTrackingReference.launcherValues = {};
    rowTrackingReference.folderDatesValues = {};

    const activeConfig = globalThis.GridConfig || GridConfig;
    const columnsList = (activeConfig && activeConfig.columns) ? activeConfig.columns : [];

    columnsList.forEach((col, idx) => {
      const cell = document.createElement('td');
      cell.className = 'projectgrid-matrix-cell';

      if (col.key === 'title') {
        cell.className += ' note-title-cell';
        const fileAnchor = document.createElement('a');
        fileAnchor.className = 'internal-link projectgrid-matrix-link';
        fileAnchor.setAttribute('data-href', expectedNotePath);
        fileAnchor.textContent = `+${folder.name}.md`;
        fileAnchor.style.color = UiColor.getColorForFirstCharacter(folder.name);
        fileAnchor.addEventListener('click', (e) => { e.preventDefault(); app.workspace.openLinkText(expectedNotePath, '', false); });
        cell.appendChild(fileAnchor);
        tableRow.appendChild(cell);
      } 
      else if (col.type === 'timestamp') {
        UiRowDates.appendSingleTimestampCell(tableRow, folder, absoluteVaultRoot, col.key, rowTrackingReference);
      } 
      else if (col.type === 'launcher') {
        UiRowActions.appendSingleLauncherButtonCell(tableRow, folder, absoluteVaultRoot, col, app);
      } 
      else if (col.type === 'tags-cell') {
        UiRowTags.buildInteractiveTagsColumn(tableRow, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput);
      } 
      else if (col.type === 'yaml-select' || col.key === 'tasks') {
        cell.className += ' select-cell projectgrid-uniform-yaml-td';
        
        // DATA REALIGNMENT PASSTHROUGH: Swap placeholder indexes with real data strings dynamically
        let targetColumnSchema = col;
        if (col.key === 'tasks') {
          const liveDiscoveredTasks = window.ProjectGridDiscoveredActualTasksList || [];
          targetColumnSchema = {
            ...col,
            // Re-map column option array records dynamically on the fly to match note content strings
            defaults: liveDiscoveredTasks.length > 0 ? liveDiscoveredTasks : ['No tasks found']
          };
        }

        UiRowSelect.buildSelectButton(cell, tableRow, idx, targetColumnSchema, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput);
        tableRow.appendChild(cell);
      } 
      else if (col.type === 'scanner-check') {
        const absoluteFolderDiskPath = path.join(absoluteVaultRoot, folder.path);
        const checkPath = path.join(absoluteFolderDiskPath, col.targetFile);
        const hasFile = fs.existsSync(checkPath);
        const marker = hasFile ? '✅' : '❌';
        
        rowTrackingReference.yamlMetadataValues[col.key] = marker;
        cell.className += ' projectgrid-readonly-scanner-td projectgrid-uniform-yaml-td';
        cell.textContent = marker;
        tableRow.appendChild(cell);
      }
    });

    return tableRow;
  }
};

// ==========================================
// END OF FILE: ui-row.js
// ==========================================
})();
globalThis.UiRow = UiRow;


return {
  activeInputTarget: null, 
  activeRowTarget: null, 
  activeFocusTarget: null, 
  observerRef: null,

  generateHeaderCell() {
    this.ensureThreePortalsExist();

    const noteHeaderCell = document.createElement('th');
    noteHeaderCell.style.width = '25%';
    
    const filterContainer = document.createElement('div');
    filterContainer.className = 'projectgrid-filter-wrapper';

    const filterInput = document.createElement('input');
    filterInput.type = 'text'; filterInput.placeholder = 'Filter notes...';
    filterInput.className = 'projectgrid-filter-input';

    const clearButton = document.createElement('span');
    clearButton.className = 'projectgrid-clear-btn'; clearButton.innerHTML = '✕';

    filterContainer.appendChild(filterInput); filterContainer.appendChild(clearButton);
    noteHeaderCell.appendChild(filterContainer);

    filterInput.addEventListener('focus', () => {
      this.activeInputTarget = filterInput;
      if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(filterInput);
      if (window.ProjectGridTriggerTutorHelpBoxRedraw) window.ProjectGridTriggerTutorHelpBoxRedraw(filterInput, 'search-input');
    });
    filterInput.addEventListener('blur', () => {
      this.activeInputTarget = null;
      if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(null);
      if (window.ProjectGridTriggerTutorHelpBoxRedraw) window.ProjectGridTriggerTutorHelpBoxRedraw(null);
    });

    setTimeout(() => this.bindInteriorScrollListeners(filterInput), 50);
    return { cell: noteHeaderCell, input: filterInput, clearBtn: clearButton };
  },

  ensureThreePortalsExist() {
    const self = this;
    const portals = [
      { id: 'projectgrid-global-focus-overlay', class: 'projectgrid-focus-overlay-portal', winFunc: 'ProjectGridUpdateFocusOverlay', targetRef: 'activeFocusTarget' },
      { id: 'projectgrid-global-input-overlay', class: 'projectgrid-input-overlay-portal', winFunc: 'ProjectGridUpdateInputOverlay', targetRef: 'activeInputTarget' },
      { id: 'projectgrid-global-row-overlay', class: 'projectgrid-row-overlay-portal', winFunc: 'ProjectGridUpdateRowOverlay', targetRef: 'activeRowTarget' }
    ];

    portals.forEach(p => {
      let el = document.getElementById(p.id);
      if (!el) { el = document.createElement('div'); el.id = p.id; el.className = p.class; document.body.appendChild(el); }
      window[p.winFunc] = (targetElement) => {
        self[p.targetRef] = targetElement;
        if (!targetElement) { el.style.display = 'none'; return; }
        const rect = targetElement.getBoundingClientRect();
        Object.assign(el.style, { display: 'block', top: `${rect.top}px`, left: `${rect.left}px`, width: `${rect.width}px`, height: `${rect.height}px` });
      };
    });

    let hud = document.getElementById('projectgrid-tutor-hud-overlay');
    if (!hud) {
      hud = document.createElement('div'); hud.id = 'projectgrid-tutor-hud-overlay';
      hud.className = 'projectgrid-tutor-tooltip-portal'; document.body.appendChild(hud);
    }

    const tutorShortcutsMap = {
      'search-input': { title: '⌨️ Search Field Focus', keys: '• Type: Filter project titles<br>• ScrollLock: Toggle Command Picker Menu<br>• ArrowDown: Navigate matrix grid notes' }
    };

    // FIX: Fall back to global scope reference check to bridge hidden closure walls
    const activeConfig = globalThis.GridConfig || GridConfig;

    if (activeConfig && activeConfig.columns) {
      activeConfig.columns.forEach(col => {
        if (col.tutorKeys) {
          tutorShortcutsMap[col.key] = { title: `${col.icon} ${col.label} View Box`, keys: col.tutorKeys };
        }
      });
    }

    window.ProjectGridTriggerTutorHelpBoxRedraw = (targetElement, contextKey) => {
      if (!window.ProjectGridTutorModeActive || !targetElement || !contextKey || !tutorShortcutsMap[contextKey]) {
        if (hud) hud.style.display = 'none'; return;
      }
      const data = tutorShortcutsMap[contextKey];
      hud.innerHTML = `<div class="projectgrid-tutor-heading">${data.title}</div><div class="projectgrid-tutor-shortcut">${data.keys}</div>`;
      
      const rect = targetElement.getBoundingClientRect();
      Object.assign(hud.style, {
        display: 'block', left: `${rect.left}px`,
        top: `${rect.bottom + window.scrollY + 6}px`
      });
    };

    window.ProjectGridForceOverlayRecalc = () => {
      portals.forEach(p => {
        const liveTarget = self[p.targetRef]; let el = document.getElementById(p.id);
        if (liveTarget && el && el.style.display === 'block') {
          const rect = liveTarget.getBoundingClientRect();
          Object.assign(el.style, { top: `${rect.top}px`, left: `${rect.left}px`, width: `${rect.width}px`, height: `${rect.height}px` });
        }
      });
      if (window.ProjectGridTutorModeActive && hud && hud.style.display === 'block') {
        const activeNode = self.activeFocusTarget || self.activeInputTarget;
        if (activeNode) { const r = activeNode.getBoundingClientRect(); hud.style.left = `${r.left}px`; hud.style.top = `${r.bottom + window.scrollY + 6}px`; }
      }
    };
  },

  bindInteriorScrollListeners(elementContext) {
    if (!elementContext) return;
    const scroller = elementContext.closest('.cm-scroller') || elementContext.closest('.markdown-preview-view') || elementContext.closest('.markdown-rendered');
    if (scroller) {
      scroller.removeEventListener('scroll', window.ProjectGridForceOverlayRecalc);
      scroller.addEventListener('scroll', window.ProjectGridForceOverlayRecalc, { passive: true });
    }
    if (this.observerRef) this.observerRef.disconnect();
    this.observerRef = new ResizeObserver(() => { if (window.ProjectGridForceOverlayRecalc) window.ProjectGridForceOverlayRecalc(); });
    const tableParent = elementContext.closest('table') || elementContext.parentElement;
    if (tableParent) this.observerRef.observe(tableParent);
  },

  buildHeaderDropup(titleIcon, key, defaults, rowsArray) { 
    const targetInstance = globalThis.UiDropdown || UiDropdown;
    return targetInstance.buildHeaderDropup(titleIcon, key, defaults, rowsArray); 
  },
  buildRow(folder, absoluteVaultRoot, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput) { 
    return UiRow.buildRow(folder, absoluteVaultRoot, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput); 
  }
};

// ==========================================
// END OF FILE: ui.js
// ==========================================
})();
globalThis.UiBuilder = UiBuilder;

const MainToolbar = (function() {
// ==========================================
// START OF FILE: main-toolbar.js
// ==========================================

return {
    createToolbarLayout(containerElement, onGearClick) {
      const toolbar = document.createElement('div');
      toolbar.className = 'projectgrid-toolbar';
      
      const toolbarBtn = document.createElement('button');
      toolbarBtn.className = 'projectgrid-toolbar-btn';
      toolbarBtn.innerHTML = '⚙️';
      toolbarBtn.title = 'Open ScrollLock System Commands Picker Menu';
      toolbar.appendChild(toolbarBtn);
  
      const tutorToggleBtn = document.createElement('button');
      tutorToggleBtn.className = 'projectgrid-toolbar-btn projectgrid-tutor-toggle-btn';
      tutorToggleBtn.innerHTML = '❔';
      tutorToggleBtn.title = 'Toggle Tutor HUD Context Help Box Overlay (Ctrl+Alt+T)';
      toolbar.appendChild(tutorToggleBtn);
  
      const sortLabel = document.createElement('span');
      sortLabel.id = 'projectgrid-sort-toolbar-label';
      sortLabel.className = 'projectgrid-sort-indicator-label';
      sortLabel.style.fontSize = '11px';
      sortLabel.style.marginLeft = '8px';
      sortLabel.style.color = 'var(--text-muted)';
      sortLabel.textContent = '📶 Default Directory Sort Order';
      toolbar.appendChild(sortLabel);
      
      containerElement.appendChild(toolbar);
  
      toolbarBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        onGearClick();
      });
  
      const handleTutorToggle = () => {
        window.ProjectGridTutorModeActive = !window.ProjectGridTutorModeActive;
        if (window.ProjectGridTutorModeActive) {
          tutorToggleBtn.classList.add('projectgrid-tutor-active');
          tutorToggleBtn.style.backgroundColor = 'var(--text-accent, #70a1ff)';
          tutorToggleBtn.style.color = '#000000';
          if (window.ProjectGridTriggerTutorHelpBoxRedraw) {
            window.ProjectGridTriggerTutorHelpBoxRedraw(document.activeElement);
          }
        } else {
          tutorToggleBtn.classList.remove('projectgrid-tutor-active');
          tutorToggleBtn.style.backgroundColor = 'transparent';
          tutorToggleBtn.style.color = 'var(--text-normal)';
          const oldTip = document.getElementById('projectgrid-tutor-tooltip-portal');
          if (oldTip) oldTip.style.display = 'none';
        }
      };
  
      tutorToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleTutorToggle();
      });
  
      return { handleTutorToggle };
    }
  };
  
  // ==========================================
  // END OF FILE: main-toolbar.js
  // ==========================================
})();
globalThis.MainToolbar = MainToolbar;

const MainScanner = (function() {
// ==========================================
// START OF FILE: main-scanner.js
// ==========================================

const fs = require('fs');
const path = require('path');


return {
  scanVaultProjectsFolders(app, rootTarget, absoluteVaultRoot, tableBody, rowsArray, filterInputElement) {
    const universalTagsSet = new Set();
    // TRACKER STORAGE: Collects every unique markdown checkbox text description string found across the vault target files
    const actualVaultTasksSet = new Set();
    
    const targetFolders = app.vault.getAllLoadedFiles().filter(file => file.children && file.path.startsWith(rootTarget));

    // Pass 1: Scan files to pre-aggregate all unique checkbox items to dynamically populate dropdown option pools
    targetFolders.forEach(folder => {
      const expectedNotePath = `${folder.path}/+${folder.name}.md`;
      try {
        const absolutePathOnDisk = path.join(absoluteVaultRoot, expectedNotePath);
        if (fs.existsSync(absolutePathOnDisk)) {
          const fileContentBuffer = fs.readFileSync(absolutePathOnDisk, 'utf8');
          const linesArray = fileContentBuffer.split('\n');
          let insideTasksHeaderZone = false;

          for (let i = 0; i < linesArray.length; i++) {
            const currentLineText = linesArray[i];
            if (currentLineText.trim().startsWith('## Incoming Tasks')) { insideTasksHeaderZone = true; continue; }
            if (insideTasksHeaderZone && currentLineText.trim().startsWith('##')) { break; }
            
            if (insideTasksHeaderZone) {
              const checkboxMatchSignature = currentLineText.match(/^\s*-\s*\[([ xX])\]\s*(.*)$/);
              if (checkboxMatchSignature) {
                const taskTextString = checkboxMatchSignature[2].trim();
                if (taskTextString) {
                  actualVaultTasksSet.add(taskTextString);
                }
              }
            }
          }
        }
      } catch (e) {}
    });

    // Globally cache the actual discovered text data strings array so other loops can match config targets
    window.ProjectGridDiscoveredActualTasksList = Array.from(actualVaultTasksSet).sort();

    // Pass 2: Map row cells and compile frontmatter indicators matching note properties
    targetFolders.forEach(folder => {
      const expectedNotePath = `${folder.path}/+${folder.name}.md`;
      if (app.vault.getAbstractFileByPath(expectedNotePath)) {
        const fileCache = app.metadataCache.getCache(expectedNotePath);
        const frontmatter = fileCache ? { ...fileCache.frontmatter } : {};

        if (frontmatter && frontmatter.tags) {
          const rawTags = Array.isArray(frontmatter.tags) ? frontmatter.tags : String(frontmatter.tags).split(/[\s,]+/);
          rawTags.forEach(t => { if(t) universalTagsSet.add(String(t).trim()); });
        }

        // TASK SCRAPER BLOCK START
        let checkedTasksList = [];
        try {
          const absolutePathOnDisk = path.join(absoluteVaultRoot, expectedNotePath);
          if (fs.existsSync(absolutePathOnDisk)) {
            const fileContentBuffer = fs.readFileSync(absolutePathOnDisk, 'utf8');
            const linesArray = fileContentBuffer.split('\n');
            let insideTasksHeaderZone = false;

            for (let i = 0; i < linesArray.length; i++) {
              const currentLineText = linesArray[i];
              if (currentLineText.trim().startsWith('## Incoming Tasks')) { insideTasksHeaderZone = true; continue; }
              if (insideTasksHeaderZone && currentLineText.trim().startsWith('##')) { break; }
              
              if (insideTasksHeaderZone) {
                const checkboxMatchSignature = currentLineText.match(/^\s*-\s*\[([ xX])\]\s*(.*)$/);
                if (checkboxMatchSignature) {
                  const isChecked = checkboxMatchSignature[1].toLowerCase() === 'x';
                  const taskTextString = checkboxMatchSignature[2].trim();
                  
                  if (isChecked && taskTextString) {
                    checkedTasksList.push(taskTextString);
                  }
                }
              }
            }
          }
        } catch (fileErr) {
          console.error(`[ProjectGrid Scraper] Failed to load markdown checkboxes for ${folder.name}:`, fileErr.message);
        }

        // Expose a text string of completed checkboxes to feed row validation states smoothly
        frontmatter['tasks'] = checkedTasksList.length > 0 ? checkedTasksList.join(', ') : '⬛';
        // TASK SCRAPER BLOCK END

        const rowRef = { element: null, searchText: `+${folder.name}.md`.toLowerCase() };
        rowRef.element = UiBuilder.buildRow(folder, absoluteVaultRoot, expectedNotePath, app, frontmatter, rowRef, filterInputElement);
        
        tableBody.appendChild(rowRef.element);
        rowsArray.push(rowRef);
      }
    });

    return universalTagsSet;
  }
};

// ==========================================
// END OF FILE: main-scanner.js
// ==========================================
})();
globalThis.MainScanner = MainScanner;




const FilterManager = (function() {
// ==========================================
// START OF FILE: filter.js
// ==========================================


const MenuCore = (function() {
// ==========================================
// START OF FILE: menu-core.js
// ==========================================




return {
  bindKeyboardEvents(filterInput, rowsArray, containerElement, getVisibleRows, updateFocusIndex) {
    let pickerLevel = 0; // 0 = Closed, 1 = Category Node, 2 = Action Command Item
    let activeItems = [];
    let activeIndex = 0;
    let storedCategoryIndex = 0;
    let activePickerEl = null;

    const closeAllPickers = () => {
      pickerLevel = 0;
      MenuDom.destroyActivePickers(containerElement);
      activePickerEl = null;
      filterInput.focus();
      if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
    };

    // RESTORED: Standard ScrollLock event capture sequence behaves exactly like your proven historical baseline
    window.addEventListener('keydown', (evt) => {
      if (evt.key === 'ScrollLock') {
        evt.preventDefault();
        
        if (document.activeElement !== filterInput) {
          filterInput.focus();
          filterInput.select();
        } else {
          pickerLevel = 1;
          activeIndex = 0;
          
          const targetMenuStateInstance = globalThis.MenuState || MenuState;
          activeItems = targetMenuStateInstance.getMenuSchema(filterInput, rowsArray, containerElement, closeAllPickers);
          renderMenu();
        }
      }
    });

    filterInput.addEventListener('keydown', (evt) => {
      const visibleRows = getVisibleRows();

      if (pickerLevel > 0 && activePickerEl) {
        if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp') {
          evt.preventDefault();
          activeIndex = evt.key === 'ArrowDown' ? ((activeIndex + 1) % activeItems.length) : ((activeIndex - 1 + activeItems.length) % activeItems.length);
          
          const items = activePickerEl.querySelectorAll('.projectgrid-picker-item');
          items.forEach((item, idx) => {
            if (idx === activeIndex) {
              item.classList.add('projectgrid-picker-highlight');
              if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(item);
            } else {
              item.classList.remove('projectgrid-picker-highlight');
            }
          });
          return;
        } else if (evt.key === 'Enter') {
          evt.preventDefault();
          executeSelection();
          return;
        } else if (evt.key === 'Escape') {
          evt.preventDefault();
          if (pickerLevel === 2) {
            pickerLevel = 1;
            const targetMenuStateInstance = globalThis.MenuState || MenuState;
            activeItems = targetMenuStateInstance.getMenuSchema(filterInput, rowsArray, containerElement, closeAllPickers);
            activeIndex = storedCategoryIndex;
            renderMenu();
          } else {
            closeAllPickers();
          }
          return;
        }
      }

      if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp') {
        if (visibleRows.length === 0) return;
        evt.preventDefault();
        
        let idx = rowsArray.findIndex(r => r.element && r.element.classList.contains('projectgrid-row-focused'));
        let visibleIdx = visibleRows.findIndex(r => r.element === rowsArray[idx]?.element);

        if (evt.key === 'ArrowDown') {
          visibleIdx = (visibleIdx + 1) >= visibleRows.length ? 0 : visibleIdx + 1;
        } else {
          visibleIdx = (visibleIdx - 1) < 0 ? visibleRows.length - 1 : visibleIdx - 1;
        }

        updateFocusIndex(visibleIdx);
        const targetRow = visibleRows[visibleIdx].element;
        if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(targetRow);
        if (targetRow) targetRow.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    });

    const renderMenu = () => {
      activePickerEl = MenuDom.renderPickerBox(filterInput, activeItems, activeIndex, containerElement, (idx) => {
        activeIndex = idx;
        executeSelection();
      }, closeAllPickers);

      setTimeout(() => {
        const activeItem = activePickerEl.querySelector('.projectgrid-picker-highlight');
        if (activeItem && window.ProjectGridUpdateFocusOverlay) {
          window.ProjectGridUpdateFocusOverlay(activeItem);
        }
      }, 10);
    };

    const executeSelection = () => {
      if (pickerLevel === 1) {
        storedCategoryIndex = activeIndex;
        activeItems = activeItems[activeIndex].items;
        pickerLevel = 2;
        activeIndex = 0;
        renderMenu();
      } else if (pickerLevel === 2) {
        const selectedAction = activeItems[activeIndex].action;
        if (selectedAction) {
          selectedAction();
          
          const currentCategoryText = storedCategoryIndex === 3 ? '📶 Sort' : '';
          if (currentCategoryText === '📶 Sort') {
            const targetMenuStateInstance = globalThis.MenuState || MenuState;
            const masterSchema = targetMenuStateInstance.getMenuSchema(filterInput, rowsArray, containerElement, closeAllPickers);
            activeItems = masterSchema[storedCategoryIndex].items;
            renderMenu(); 
            return;
          }
        }
        closeAllPickers();
      }
    };
  }
};

// ==========================================
// END OF FILE: menu-core.js
// ==========================================
})();
globalThis.MenuCore = MenuCore;

return {
  initializeTableFilter(filterInput, clearButton, rowsArray, containerElement) {
    let currentFocusedIndex = -1;

    const applyFilter = () => {
      const val = filterInput.value.toLowerCase().trim();
      clearButton.style.visibility = val ? 'visible' : 'hidden';
      
      rowsArray.forEach(row => {
        const passText = row.searchText.includes(val);
        const passDropdowns = Object.values(row.dropdownFilters || {}).every(status => status === true);
        if (row.element) {
          row.element.style.display = (passText && passDropdowns) ? '' : 'none';
        }
      });

      const globalCounts = {};
      const visibleCounts = {};

      rowsArray.forEach(row => {
        const metadata = row.yamlMetadataValues || {};
        const launchers = row.launcherValues || {};
        const dates = row.folderDatesValues || {};
        
        const allFields = { ...metadata, ...launchers, ...dates };
        const isRowVisible = row.element && row.element.style.display !== 'none';

        Object.keys(allFields).forEach(key => {
          if (!globalCounts[key]) globalCounts[key] = { nonNullTotal: 0 };
          if (!visibleCounts[key]) visibleCounts[key] = { nonNullVisible: 0 };
          const valueStr = String(allFields[key]).trim();
          if (valueStr && valueStr !== '⬛' && valueStr !== '' && valueStr !== '0000.00.00 00' && valueStr !== '0/0') {
            globalCounts[key].nonNullTotal++;
            if (isRowVisible) visibleCounts[key].nonNullVisible++;
          }
        });
      });

      // FIX: Static, bulletproof backup map eliminates runtime object lookup race conditions entirely
      const headerIconsMap = {
        tasks: '🔧', created: '🆕', updated: '🆙', tags: '🏷️', stars: '⭐', 
        value: '💲', size: '🐘', depth: '🎱', priority: '🏅', status: '🚦', lang: '🔤', target: '🎯',
        git: '💿', agents: '🤖'
      };

      const activeSortChain = window.ProjectGridActiveSortChainList || [];

      document.querySelectorAll('.projectgrid-header-dropup-trigger').forEach(trigger => {
        const key = trigger.getAttribute('data-key');
        if (!key || !headerIconsMap[key]) return;

        let baseIcon = headerIconsMap[key];
        const chainIdx = activeSortChain.indexOf(key);
        
        if (chainIdx === 0) baseIcon = '🟢' + baseIcon;
        else if (chainIdx === 1) baseIcon = '🟡' + baseIcon;
        else if (chainIdx === 2) baseIcon = '🔴' + baseIcon;

        let nonNullVis = visibleCounts[key]?.nonNullVisible || 0;
        let nonNullTot = globalCounts[key]?.nonNullTotal || 0;

        if (key === 'tasks' || key === 'created' || key === 'updated' || key === 'git' || key === 'agents') {
          nonNullVis = rowsArray.filter(r => r.element && r.element.style.display !== 'none').length;
          nonNullTot = rowsArray.length;
        }

        trigger.textContent = `${baseIcon} ${nonNullVis}/${nonNullTot}`;
      });

      const visibleRows = rowsArray.filter(row => row.element && row.element.style.display !== 'none');
      if (visibleRows.length > 0) {
        if (currentFocusedIndex < 0 || currentFocusedIndex >= visibleRows.length) currentFocusedIndex = 0;
        const finalTargetRow = visibleRows[currentFocusedIndex].element;
        if (finalTargetRow) {
          finalTargetRow.classList.add('projectgrid-row-focused');
          if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(finalTargetRow);
        }
      }
    };

    filterInput.addEventListener('input', applyFilter);

    // RESTORED: Localized keyboard events binding track fires perfectly now that initialization is safe
    MenuCore.bindKeyboardEvents(filterInput, rowsArray, containerElement, () => {
      return rowsArray.filter(row => row.element && row.element.style.display !== 'none');
    }, (index) => {
      currentFocusedIndex = index;
      const visibleRows = rowsArray.filter(row => row.element && row.element.style.display !== 'none');
      rowsArray.forEach(row => { if (row.element) row.element.classList.remove('projectgrid-row-focused'); });
      if (visibleRows[index] && visibleRows[index].element) {
        visibleRows[index].element.classList.add('projectgrid-row-focused');
        if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(visibleRows[index].element);
      }
    });

    clearButton.addEventListener('click', () => {
      filterInput.value = ''; applyFilter(); filterInput.focus();
    });

    window.ProjectGridTriggerFilterUpdate = applyFilter;
    setTimeout(applyFilter, 50);
  }
};

// ==========================================
// END OF FILE: filter.js
// ==========================================
})();
globalThis.FilterManager = FilterManager;

return {
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
})();
globalThis.MainRenderer = MainRenderer;

const TasksMarkdownSync = (function() {
// ==========================================
// START OF FILE: tasks-markdown-sync.js
// ==========================================

const tasksMarkdownSyncModule = {
    getInitialCheckedList(linesArray) {
      let insideTasksHeaderZone = false;
      const checkedTasksList = [];
  
      for (let i = 0; i < linesArray.length; i++) {
        const currentLineText = linesArray[i];
        if (currentLineText.trim().startsWith('## Incoming Tasks')) { insideTasksHeaderZone = true; continue; }
        if (insideTasksHeaderZone && currentLineText.trim().startsWith('##')) { break; }
        
        if (insideTasksHeaderZone) {
          const checkboxMatchSignature = currentLineText.match(/^\s*-\s*\[([ xX])\]\s*(.*)$/);
          if (checkboxMatchSignature) {
            const isChecked = checkboxMatchSignature[1].toLowerCase() === 'x';
            const taskTextString = checkboxMatchSignature[2].trim();
            if (isChecked && taskTextString) {
              checkedTasksList.push(taskTextString);
            }
          }
        }
      }
      return checkedTasksList;
    },
  
    mutateMarkdownCheckboxes(linesArray, targetTaskString, isNowCheckedState) {
      let insideTasks = false;
      for (let i = 0; i < linesArray.length; i++) {
        const line = linesArray[i];
        if (line.trim().startsWith('## Incoming Tasks')) { insideTasks = true; continue; }
        if (insideTasks && line.trim().startsWith('##')) { break; }
        
        if (insideTasks) {
          const match = line.match(/^\s*-\s*\[([ xX])\]\s*(.*)$/);
          if (match && match[2].trim() === targetTaskString) {
            const checkedTokenMarker = isNowCheckedState ? 'x' : ' ';
            linesArray[i] = line.replace(/-\s*\[[ xX]\]/, `- [${checkedTokenMarker}]`);
            break;
          }
        }
      }
      return linesArray.join('\n');
    },
  
    // HARD RESTRUCTURING DELETE TRAP: Slices out targeted checkbox lines matches out of raw file text streams
    deleteTaskLineEntry(linesArray, targetTaskString) {
      let insideTasks = false;
      for (let i = 0; i < linesArray.length; i++) {
        const line = linesArray[i];
        if (line.trim().startsWith('## Incoming Tasks')) { insideTasks = true; continue; }
        if (insideTasks && line.trim().startsWith('##')) { break; }
        
        if (insideTasks) {
          const match = line.match(/^\s*-\s*\[([ xX])\]\s*(.*)$/);
          if (match && match[2].trim() === targetTaskString) {
            linesArray.splice(i, 1);
            break;
          }
        }
      }
      return linesArray.join('\n');
    }
  };
  
  globalThis.TasksMarkdownSync = tasksMarkdownSyncModule;
  return tasksMarkdownSyncModule;
  
  // ==========================================
  // END OF FILE: tasks-markdown-sync.js
  // ==========================================
})();
globalThis.TasksMarkdownSync = TasksMarkdownSync;

const TasksMarkdownWriter = (function() {
// ==========================================
// START OF FILE: tasks-markdown-writer.js
// ==========================================

const tasksMarkdownWriterModule = {
    async appendAndRefreshVault(app, expectedNotePath, taskText, btnElement, scrollingContainer, optionsList, activeValuesArray, updateVisualSelectionCallback) {
      const fileAbstract = app.vault.getAbstractFileByPath(expectedNotePath);
      if (!fileAbstract) return;
  
      const rawContent = await app.vault.read(fileAbstract);
      const lines = rawContent.split('\n');
      
      let headingIndex = lines.findIndex(l => l.trim().startsWith('## Incoming Tasks'));
      const newTaskLineStr = `- [ ] ${taskText}`;
  
      if (headingIndex === -1) {
        lines.push('\n## Incoming Tasks');
        lines.push(newTaskLineStr);
      } else {
        lines.splice(headingIndex + 1, 0, newTaskLineStr);
      }
  
      await app.vault.modify(fileAbstract, lines.join('\n'));
      
      if (!optionsList.includes(taskText)) {
        optionsList.push(taskText);
        
        if (!window.ProjectGridDiscoveredActualTasksList) window.ProjectGridDiscoveredActualTasksList = [];
        if (!window.ProjectGridDiscoveredActualTasksList.includes(taskText)) {
          window.ProjectGridDiscoveredActualTasksList.push(taskText);
          window.ProjectGridDiscoveredActualTasksList.sort();
        }
  
        const li = document.createElement('div');
        li.className = 'projectgrid-custom-dropdown-item';
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.gap = '6px';
        li.style.textAlign = 'left';
  
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.tabIndex = -1;
        cb.checked = activeValuesArray.includes(taskText);
        cb.style.margin = '0';
        cb.style.cursor = 'pointer';
  
        li.appendChild(cb);
        li.appendChild(document.createTextNode(taskText));
        scrollingContainer.appendChild(li);
  
        // FIXED: Bind the interaction handler once, immediately on generation. No DOM mutation cascades.
        li.addEventListener('click', async (e) => {
          e.preventDefault(); e.stopPropagation();
          
          if (activeValuesArray.includes(taskText)) {
            activeValuesArray.splice(activeValuesArray.indexOf(taskText), 1);
          } else {
            activeValuesArray.push(taskText);
          }
          cb.checked = activeValuesArray.includes(taskText);
          
          const activeSelectModule = globalThis.UiRowSelect || require('./ui-row-select');
          if (activeSelectModule && typeof activeSelectModule._triggerDirectCommit === 'function') {
            await activeSelectModule._triggerDirectCommit(app, expectedNotePath, activeValuesArray.join(', '), taskText, cb.checked, btnElement, optionsList, activeValuesArray);
          }
          updateVisualSelectionCallback(optionsList.indexOf(taskText));
        });
      }
  
      const totalCount = optionsList.length;
      btnElement.textContent = `${activeValuesArray.length}/${totalCount}`;
      
      updateVisualSelectionCallback(optionsList.length - 1);
    }
  };
  
  globalThis.TasksMarkdownWriter = tasksMarkdownWriterModule;
  return tasksMarkdownWriterModule;
  
  // ==========================================
  // END OF FILE: tasks-markdown-writer.js
  // ==========================================
})();
globalThis.TasksMarkdownWriter = TasksMarkdownWriter;

module.exports = class ProjectGridPlugin extends Plugin {
  async onload() {
    console.log('%c[ProjectGrid]%c Core initialized...', 'color: #00d2d3; font-weight: bold;', 'color: default;');
    StylesManager.injectStyles();

    window.ProjectGridTutorModeActive = false;

    // DELEGATE SHORTCUTS: Hook shortcuts array priorities securely via the dedicated manager module
    MainShortcuts.registerGlobalPluginScopes(this);

    this.registerMarkdownCodeBlockProcessor('projectgrid', (sourceText, element) => {
      // DELEGATE RENDERING: Render grid elements cleanly via our isolated factory engine module
      MainRenderer.renderProjectGridDashboard(this, sourceText, element);
    });
  }

  onunload() {
    const styleEl = document.getElementById('obsidian-projectgrid-styles');
    if (styleEl) styleEl.remove();
    document.querySelectorAll('.projectgrid-focus-overlay-portal, .projectgrid-input-overlay-portal, .projectgrid-row-overlay-portal, .projectgrid-wide-tasks-portal, .projectgrid-tutor-tooltip-portal').forEach(el => el.remove());
  }
};

// ==========================================
// END OF FILE: _main.js
// ==========================================
