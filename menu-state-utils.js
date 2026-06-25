// ==========================================
// START OF FILE: menu-state-utils.js
// ==========================================

const UiDropdown = require('./ui-dropdown');

module.exports = {
  openHeaderDropup(key) {
    const activePicker = document.querySelector('.projectgrid-command-picker');
    if (activePicker) activePicker.remove();

    const targetDropdownInstance = UiDropdown.activeDropdownInstances && UiDropdown.activeDropdownInstances[key];
    
    if (targetDropdownInstance && typeof targetDropdownInstance.open === 'function') {
      requestAnimationFrame(() => {
        if (targetDropdownInstance.triggerElement) {
          targetDropdownInstance.triggerElement.focus();
        }
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
      requestAnimationFrame(() => {
        interactive.focus();
        // FIX: Programmatically trigger the local open handle to unpack dropdown lists instantly when requested from picker wheel menus
        if (typeof interactive.openDropdown === 'function') {
          interactive.openDropdown();
        }
      });
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
