// ==========================================
// START OF FILE: styles-components-overlays.js
// ==========================================

module.exports = {
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

  