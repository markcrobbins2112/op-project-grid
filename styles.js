// ==========================================
// START OF FILE: styles.js
// ==========================================

module.exports = {
    injectStyles() {
      if (document.getElementById('obsidian-projectgrid-styles')) return;
  
      const styleEl = document.createElement('style');
      styleEl.id = 'obsidian-projectgrid-styles';
  
      styleEl.innerHTML = `
        .cm-embed-block:has(.projectgrid-matrix-table),
        .block-language-projectgrid {
          max-width: 100% !important;
          width: 100% !important;
          grid-column: 1 / -1 !important;
        }
        .projectgrid-matrix-table {
          width: 100% !important;
          border-collapse: collapse !important;
          margin-top: 12px !important;
          margin-bottom: 12px !important;
          font-size: 11px !important;
          line-height: 1.4 !important;
          position: relative !important;
        }
        .projectgrid-matrix-table th {
          font-weight: 600 !important;
          color: var(--text-muted, #888888) !important;
          border-bottom: 2px solid var(--background-modifier-border, #3a3a3a) !important;
          padding: 8px !important;
          vertical-align: middle;
          position: relative !important;
          text-align: center !important;
        }
        .projectgrid-matrix-table th:first-child {
          text-align: left !important;
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
  
        @keyframes projectgrid-hue-cycle {
          0% { box-shadow: inset 0 0 0 2px #ff4757 !important; filter: hue-rotate(0deg); }
          100% { box-shadow: inset 0 0 0 2px #ff4757 !important; filter: hue-rotate(360deg); }
        }
        .projectgrid-matrix-row {
          border-bottom: 1px solid var(--background-modifier-border, #2a2a2a) !important;
          position: relative !important;
          box-sizing: border-box !important;
        }
        .projectgrid-matrix-row:hover {
          background-color: var(--background-modifier-hover, rgba(255, 255, 255, 0.01)) !important;
        }
        .projectgrid-row-focused {
          background-color: var(--background-modifier-hover, rgba(112, 161, 255, 0.08)) !important;
          animation: projectgrid-hue-cycle 3s linear infinite !important;
        }
  
        .projectgrid-matrix-cell { padding: 6px 8px !important; vertical-align: middle !important; }
        .note-title-cell { font-weight: 500 !important; white-space: nowrap !important; }
        .projectgrid-matrix-link { text-decoration: none !important; }
        .projectgrid-matrix-link:hover { text-decoration: none !important; }
        .action-icon-cell { text-align: center !important; }
  
        .projectgrid-header-dropup-trigger {
          cursor: pointer !important;
          display: inline-block !important;
          padding: 4px 8px !important;
          border-radius: 4px !important;
          user-select: none !important;
          font-size: 13px !important;
        }
        .projectgrid-header-dropup-trigger:hover {
          background-color: var(--background-modifier-hover, rgba(255, 255, 255, 0.08)) !important;
        }
  
        /* FIX: FLOATING DIALOG CONFIGURATION THAT BYPASSES TABLE LAYOUT DISTORTIONS Completely */
        .projectgrid-dropup-panel {
          background-color: var(--background-secondary, #1a1a1a) !important;
          border: 1px solid var(--background-modifier-border, #3d3d3d) !important;
          border-radius: 6px !important;
          padding: 6px !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.45) !important;
          min-width: 120px !important;
          max-height: 240px !important;
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
        }
        .projectgrid-dropup-option:hover {
          background-color: var(--text-accent, #70a1ff) !important;
          color: #000000 !important;
          border-radius: 4px !important;
        }
        .projectgrid-dropup-option input[type="checkbox"] {
          margin: 0 !important;
          cursor: pointer !important;
        }
  
        .projectgrid-custom-select-btn {
          background-color: var(--background-secondary, #252525) !important;
          color: var(--text-normal, #dddddd) !important;
          border: 1px solid var(--background-modifier-border, #3d3d3d) !important;
          border-radius: 4px !important;
          padding: 4px 6px !important;
          font-size: 11px !important;
          width: 100% !important;
          box-sizing: border-box !important;
          display: inline-block !important;
          cursor: pointer !important;
          position: relative !important;
          user-select: none !important;
          text-align: center !important;
        }
        .projectgrid-custom-select-btn:focus {
          border-color: var(--text-accent, #70a1ff) !important;
          outline: none !important;
        }
  
        .projectgrid-custom-dropdown-list {
          position: absolute !important;
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
          padding: 4px 8px !important;
          cursor: pointer !important;
          color: var(--text-normal) !important;
          text-align: center !important;
        }
        .projectgrid-item-indicator-focused {
          background-color: var(--background-modifier-hover, rgba(112, 161, 255, 0.06)) !important;
          animation: projectgrid-hue-cycle 2s linear infinite !important;
        }
  
        .projectgrid-command-picker {
          position: absolute !important;
          background-color: var(--background-secondary, #1e1e1e) !important;
          border: 1px solid var(--text-accent, #70a1ff) !important;
          border-radius: 6px !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4) !important;
          z-index: 10000 !important;
          padding: 6px !important;
          min-width: 200px !important;
          box-sizing: border-box !important;
        }
        .projectgrid-picker-item {
          padding: 6px 10px !important;
          cursor: pointer !important;
          border-radius: 4px !important;
          color: var(--text-normal, #ffffff) !important;
          font-size: 12px !important;
        }
        .projectgrid-picker-highlight,
        .projectgrid-picker-item:hover {
          background-color: var(--text-accent, #70a1ff) !important;
          color: #000000 !important;
        }
      `;
      document.head.appendChild(styleEl);
    }
  };
  
  // ==========================================
  // END OF FILE: styles.js
  // ==========================================
  