// ==========================================
// START OF FILE: ui-row-keys.js
// ==========================================

module.exports = {
    handleClosedNavigation(evt, btn, tableRow, fieldIdx, cfg, filterInput) {
      // FIX: EXTENSIBLE OR STATIC ROWS ESCAPE INTERCEPT JUMPS VERTICALLY ACROSS THE RE-SORTED CANVAS
      if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp') {
        evt.preventDefault(); evt.stopPropagation();
        const parentTable = tableRow.parentElement;
        const visibleRows = Array.from(parentTable.querySelectorAll('.projectgrid-matrix-row')).filter(r => r.style.display !== 'none');
        const currentRowIdx = visibleRows.indexOf(tableRow);
        let nextRowIdx = currentRowIdx + (evt.key === 'ArrowDown' ? 1 : -1);
  
        if (nextRowIdx >= 0 && nextRowIdx < visibleRows.length) {
          const targetRow = visibleRows[nextRowIdx];
          parentTable.querySelectorAll('.projectgrid-matrix-row').forEach(r => r.classList.remove('projectgrid-row-focused'));
          
          targetRow.classList.add('projectgrid-row-focused');
          // Find matching interactive child node depending on columns layout index offset geometry
          const targetSelectBtn = targetRow.children[btn.parentElement.cellIndex]?.querySelector('.projectgrid-custom-select-btn, .projectgrid-tags-cell-btn, .projectgrid-tasks-trigger-btn');
          if (targetSelectBtn) {
            targetSelectBtn.focus();
            targetRow.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          }
        }
        return true;
      }
  
      if (evt.key === 'Escape') {
        evt.preventDefault(); filterInput.focus(); return true;
      }
  
      if (evt.key === 'Tab') {
        evt.preventDefault();
        const siblingButtons = Array.from(tableRow.querySelectorAll('.projectgrid-custom-select-btn, .projectgrid-tags-cell-btn, .projectgrid-tasks-trigger-btn'));
        let currentIdx = siblingButtons.indexOf(btn);
        let nextIdx = currentIdx + (evt.shiftKey ? -1 : 1);
        if (nextIdx >= 0 && nextIdx < siblingButtons.length) siblingButtons[nextIdx].focus();
        else if (nextIdx < 0) filterInput.focus();
        return true;
      }
      return false;
    }
  };
  
  // ==========================================
  // END OF FILE: ui-row-keys.js
  // ==========================================
  