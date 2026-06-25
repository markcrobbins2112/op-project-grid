// ==========================================
// START OF FILE: styles-components.js
// ==========================================

module.exports = {
    getComponentStyles() {
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
          z-index: 10010 !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25) !important;
          box-sizing: border-box !important;
        }
        .projectgrid-custom-dropdown-item {
          padding: 4px 4px !important;
          cursor: pointer !important;
          color: var(--text-normal) !important;
          text-align: center !important;
          font-size: 11px !important;
          box-sizing: border-box !important;
          width: 100% !important;
          background-color: transparent !important;
        }
  
        .projectgrid-command-picker {
          position: fixed !important; 
          background-color: var(--background-secondary, #1e1e1e) !important;
          border: 1px solid #3d3d3d !important; 
          border-radius: 6px !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5) !important;
          z-index: 500000 !important; 
          padding: 6px !important;
          min-width: 220px !important;
          box-sizing: border-box !important;
        }
        .projectgrid-picker-item {
          padding: 6px 10px !important;
          cursor: pointer !important;
          border-radius: 4px !important;
          color: var(--text-normal, #ffffff) !important;
          font-size: 12px !important;
          box-sizing: border-box !important;
        }
      `;
    }
  };
  
  // ==========================================
  // END OF FILE: styles-components.js
  // ==========================================
  