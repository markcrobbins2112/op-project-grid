// ==========================================
// START OF FILE: styles-components-dropdown.js
// ==========================================

module.exports = {
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
  