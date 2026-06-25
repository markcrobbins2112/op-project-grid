// ==========================================
// START OF FILE: styles-components-toolbar.js
// ==========================================

module.exports = {
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
  