// ==========================================
// START OF FILE: styles-animation.js
// ==========================================

module.exports = {
    getAnimationStyles() {
      return `
        @keyframes projectgrid-master-hue-spin {
          0% { border-color: #ff4757; filter: hue-rotate(0deg); }
          100% { border-color: #ff4757; filter: hue-rotate(360deg); }
        }
  
        .projectgrid-focus-overlay-portal,
        .projectgrid-row-overlay-portal {
          position: fixed !important;
          pointer-events: none !important;
          box-sizing: border-box !important;
          border: 2px solid #ff4757 !important;
          border-radius: 4px !important;
          display: none;
          animation: projectgrid-master-hue-spin 3s linear infinite !important;
        }
        
        .projectgrid-focus-overlay-portal {
          z-index: 999999 !important;
        }
        
        .projectgrid-row-overlay-portal {
          z-index: 999998 !important;
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
  