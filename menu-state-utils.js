// ==========================================
// START OF FILE: menu-state-utils.js
// ==========================================

const UiDropdown = require('./ui-dropdown');

module.exports = {
  // FIX 2: SYSTEM ROUTER DIRECTLY INVOKES EXPORTED DROPDOWN HANDLES TO BYPASS PREVENTDEFAULT CONFLICTS
  openHeaderDropup(key) {
    const activePicker = document.querySelector('.projectgrid-command-picker');
    if (activePicker) activePicker.remove();

    // Pull functional instances right from the shared repository pool
    const targetDropdownInstance = UiDropdown.activeDropdownInstances && UiDropdown.activeDropdownInstances[key];
    
    if (targetDropdownInstance && typeof targetDropdownInstance.open === 'function') {
      requestAnimationFrame(() => {
        // Force focus onto trigger head to maintain context bounds
        if (targetDropdownInstance.triggerElement) {
          targetDropdownInstance.triggerElement.focus();
        }
        // Direct method call bypasses volatile DOM click events completely
        targetDropdownInstance.open();
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
