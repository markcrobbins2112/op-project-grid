// ==========================================
// START OF FILE: ui-row-keys.js
// ==========================================

module.exports = {
    handleClosedNavigation(evt, btn, tableRow, fieldIdx, cfg, filterInput) {
      if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp') {
        evt.preventDefault(); evt.stopPropagation();
        this.jumpToVerticalRowCell(evt, tableRow, '.projectgrid-custom-select-btn', fieldIdx);
        return true;
      }
  
      if (evt.key === 'Escape') {
        evt.preventDefault(); 
        evt.stopPropagation();
        
        // FIX: Add a bulletproof DOM traversal fallback to find the bar if reference piping breaks
        let targetInput = filterInput;
        if (!targetInput) {
          const rootContainer = tableRow.closest('.block-language-projectgrid') || tableRow.closest('table')?.parentElement;
          targetInput = rootContainer?.querySelector('.projectgrid-filter-input');
        }
  
        if (targetInput) {
          targetInput.focus();
          targetInput.select();
        }
        return true;
      }
  
      if (evt.key === 'Tab') {
        evt.preventDefault();
        const siblingButtons = Array.from(tableRow.querySelectorAll('.projectgrid-custom-select-btn, .projectgrid-tags-cell-btn, .projectgrid-tasks-trigger-btn'));
        let currentIdx = siblingButtons.indexOf(btn);
        let nextIdx = currentIdx + (evt.shiftKey ? -1 : 1);
        if (nextIdx >= 0 && nextIdx < siblingButtons.length) siblingButtons[nextIdx].focus();
        else if (nextIdx < 0 && filterInput) filterInput.focus();
        return true;
      }
      return false;
    },
  
    jumpToVerticalRowCell(evt, currentTableRow, elementSelector, fieldIndex = 0) {
      const parentTableBody = currentTableRow.parentElement;
      if (!parentTableBody) return;
  
      const visibleRows = Array.from(parentTableBody.querySelectorAll('.projectgrid-matrix-row'))
        .filter(r => r.style.display !== 'none');
      
      const currentRowIdx = visibleRows.indexOf(currentTableRow);
      let nextRowIdx = currentRowIdx + (evt.key === 'ArrowDown' ? 1 : -1);
  
      if (nextRowIdx >= 0 && nextRowIdx < visibleRows.length) {
        const targetRow = visibleRows[nextRowIdx];
        
        parentTableBody.querySelectorAll('.projectgrid-matrix-row').forEach(r => {
          r.classList.remove('projectgrid-row-focused');
        });
        
        targetRow.classList.add('projectgrid-row-focused');
  
        const interactiveTargets = Array.from(targetRow.querySelectorAll(elementSelector));
        const targetElement = interactiveTargets[fieldIndex];
        
        if (targetElement) {
          targetElement.focus();
          targetRow.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }
    }
  };
  
  // ==========================================
  // END OF FILE: ui-row-keys.js
  // ==========================================
  