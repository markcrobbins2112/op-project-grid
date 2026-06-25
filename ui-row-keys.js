// ==========================================
// START OF FILE: ui-row-keys.js
// ==========================================

module.exports = {
    handleClosedNavigation(evt, btn, tableRow, fieldIdx, cfg, filterInput) {
      if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp') {
        evt.preventDefault();
        const parentTable = tableRow.parentElement;
        const visibleRows = Array.from(parentTable.querySelectorAll('.projectgrid-matrix-row')).filter(r => r.style.display !== 'none');
        const currentRowIdx = visibleRows.indexOf(tableRow);
        let nextRowIdx = currentRowIdx + (evt.key === 'ArrowDown' ? 1 : -1);
  
        if (nextRowIdx >= 0 && nextRowIdx < visibleRows.length) {
          const targetRow = visibleRows[nextRowIdx];
          parentTable.querySelectorAll('.projectgrid-matrix-row').forEach(r => r.classList.remove('projectgrid-row-focused'));
          
          targetRow.classList.add('projectgrid-row-focused');
          const targetSelectBtn = targetRow.querySelectorAll('.projectgrid-custom-select-btn')[fieldIdx];
          if (targetSelectBtn) {
            targetSelectBtn.focus();
            targetRow.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          }
        }
        return true;
      }
  
      if (evt.key === 'Escape') {
        evt.preventDefault();
        filterInput.focus();
        return true;
      }
  
      if (evt.key === 'Tab') {
        evt.preventDefault();
        const siblingButtons = tableRow.querySelectorAll('.projectgrid-custom-select-btn');
        let nextIdx = fieldIdx + (evt.shiftKey ? -1 : 1);
        if (nextIdx >= 0 && nextIdx < siblingButtons.length) siblingButtons[nextIdx].focus();
        else if (nextIdx < 0) filterInput.focus();
        return true;
      }
  
      if (!cfg.isExtendable && (evt.key === 'ArrowRight' || evt.key === 'ArrowLeft')) {
        evt.preventDefault();
        const siblingButtons = tableRow.querySelectorAll('.projectgrid-custom-select-btn');
        let nextIdx = fieldIdx + (evt.key === 'ArrowRight' ? 1 : -1);
        if (nextIdx >= 0 && nextIdx < siblingButtons.length) siblingButtons[nextIdx].focus();
        return true;
      }
      
      return false;
    }
  };
  
  // ==========================================
  // END OF FILE: ui-row-keys.js
  // ==========================================
  