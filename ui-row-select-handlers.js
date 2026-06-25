// ==========================================
// START OF FILE: ui-row-select-handlers.js
// ==========================================

module.exports = {
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
  