module.exports = {
    injectStyles() {
      if (document.getElementById('obsidian-projectgrid-styles')) return;
  
      const styleEl = document.createElement('style');
      styleEl.id = 'obsidian-projectgrid-styles';
  
      styleEl.innerHTML = `
        .projectgrid-matrix-table {
          width: 100% !important;
          border-collapse: collapse !important;
          margin-top: 12px !important;
          margin-bottom: 12px !important;
          font-size: 13px !important;
          line-height: 1.5 !important;
        }
        .projectgrid-matrix-table th {
          font-weight: 600 !important;
          color: var(--text-muted, #888888) !important;
          border-bottom: 2px solid var(--background-modifier-border, #3a3a3a) !important;
          padding: 8px 10px !important;
          vertical-align: middle !important;
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
          font-size: 12px !important;
          border-radius: 4px !important;
          border: 1px solid var(--background-modifier-border, #3a3a3a) !important;
          background-color: var(--background-primary, #1e1e1e) !important;
          color: var(--text-normal, #ffffff) !important;
          height: 26px !important;
        }
        .projectgrid-clear-btn {
          position: absolute !important;
          right: 8px !important;
          cursor: pointer !important;
          color: var(--text-muted, #888888) !important;
          font-size: 11px !important;
          visibility: hidden;
          user-select: none !important;
          transition: color 0.15s ease !important;
        }
        .projectgrid-clear-btn:hover { color: var(--text-accent, #70a1ff) !important; }
        .projectgrid-matrix-row {
          border-bottom: 1px solid var(--background-modifier-border, #2a2a2a) !important;
          transition: background-color 0.15s ease !important;
        }
        .projectgrid-matrix-row:hover {
          background-color: var(--background-modifier-hover, rgba(255, 255, 255, 0.02)) !important;
        }
        .projectgrid-matrix-cell { padding: 8px 10px !important; vertical-align: middle !important; }
        .note-title-cell { font-weight: 500 !important; }
        .action-icon-cell { text-align: center !important; }
        .projectgrid-aip-icon-btn {
          display: inline-block !important;
          text-decoration: none !important;
          font-size: 15px !important;
          cursor: pointer !important;
          opacity: 0.75 !important;
          transition: transform 0.15s ease, opacity 0.15s ease !important;
        }
        .projectgrid-aip-icon-btn:hover { opacity: 1.0 !important; transform: scale(1.15) !important; }
        .projectgrid-matrix-link { color: var(--text-accent, #70a1ff) !important; text-decoration: none !important; }
        .projectgrid-matrix-link:hover { text-decoration: underline !important; }
        .projectgrid-empty-warning-message { font-size: 12px !important; color: var(--text-muted, #888888) !important; font-style: italic !important; }
      `;
      document.head.appendChild(styleEl);
    }
  };
  