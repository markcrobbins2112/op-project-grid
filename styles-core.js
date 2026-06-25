// ==========================================
// START OF FILE: styles-core.js
// ==========================================

module.exports = {
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
