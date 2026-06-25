// ==========================================
// START OF FILE: menu-state-utils.js
// ==========================================

module.exports = {
    openHeaderDropup(key) {
      const trigger = document.querySelector(`.projectgrid-header-dropup-trigger[data-key="${key}"]`);
      if (trigger) {
        // Cleanly destroy active pickers to decouple focus loops
        const activePicker = document.querySelector('.projectgrid-command-picker');
        if (activePicker) activePicker.remove();
  
        // FIX: ROUTE THROUGH ANIMATION TIMERS TO GUARANTEE CONTEXT BOOT STRAP STABILITY
        requestAnimationFrame(() => {
          const mousedownEvent = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
          trigger.dispatchEvent(mousedownEvent);
          
          setTimeout(() => {
            const activePanel = document.querySelector('.projectgrid-dropup-panel');
            if (activePanel) {
              activePanel.tabIndex = 0;
              activePanel.focus();
            }
          }, 50);
        });
      }
    },
  
    focusRowCell(rowObj, cellIndex) {
      if (!rowObj || !rowObj.element) return alert('Highlight a row project using arrow keys first.');
      const activePicker = document.querySelector('.projectgrid-command-picker');
      if (activePicker) activePicker.remove();
  
      const targetCell = rowObj.element.children[cellIndex];
      const interactive = targetCell ? targetCell.querySelector('.projectgrid-custom-select-btn, .projectgrid-tags-cell-btn, .projectgrid-tasks-trigger-btn, a, input') : null;
      if (interactive) {
        interactive.focus();
      }
    },
  
    fireProtocol(rowObj, protocol) {
      if (!rowObj || !rowObj.element) return alert('Highlight a row project using arrow keys first.');
      const linkEl = rowObj.element.querySelector(`a[href^="aip://${protocol}"]`);
      if (linkEl) window.location.href = linkEl.getAttribute('href');
    },
  
    clearAllSystemFilters(filterInput) {
      filterInput.value = '';
      document.querySelectorAll('.projectgrid-dropup-panel input[type="checkbox"]').forEach(cb => cb.checked = true);
      if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
      filterInput.focus();
    },
  
    reloadActiveAppWorkspace() {
      const activeLeaf = window.app.workspace.getActiveViewOfType(require('obsidian').MarkdownView);
      if (activeLeaf) activeLeaf.previewMode?.rerender(true);
    }
  };
  
  // ==========================================
  // END OF FILE: menu-state-utils.js
  // ==========================================
  