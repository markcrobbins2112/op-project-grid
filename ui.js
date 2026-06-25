// ==========================================
// START OF FILE: ui.js
// ==========================================

const UiDropdown = require('./ui-dropdown');
const UiRow = require('./ui-row');

module.exports = {
  generateHeaderCell() {
    this.ensureFocusOverlaysExist();

    const noteHeaderCell = document.createElement('th');
    noteHeaderCell.style.width = '25%';
    
    const filterContainer = document.createElement('div');
    filterContainer.className = 'projectgrid-filter-wrapper';

    const filterInput = document.createElement('input');
    filterInput.type = 'text';
    filterInput.placeholder = 'Filter notes...';
    filterInput.className = 'projectgrid-filter-input';

    const clearButton = document.createElement('span');
    clearButton.className = 'projectgrid-clear-btn';
    clearButton.innerHTML = '✕';

    filterContainer.appendChild(filterInput);
    filterContainer.appendChild(clearButton);
    noteHeaderCell.appendChild(filterContainer);

    // Attach active search field focus event listeners to register overlay highlights instantly
    filterInput.addEventListener('focus', () => {
      if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(filterInput);
    });
    filterInput.addEventListener('blur', () => {
      if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
    });

    return { cell: noteHeaderCell, input: filterInput, clearBtn: clearButton };
  },

  // FIX: INITIALIZES DUAL SEPARATED NON-INTERACTIVE OVERLAY PORTALS APPENDED STRAIGHT TO DOM BODY
  ensureFocusOverlaysExist() {
    let focusOverlay = document.getElementById('projectgrid-global-focus-overlay');
    if (!focusOverlay) {
      focusOverlay = document.createElement('div');
      focusOverlay.id = 'projectgrid-global-focus-overlay';
      focusOverlay.className = 'projectgrid-focus-overlay-portal';
      document.body.appendChild(focusOverlay);
    }

    let rowOverlay = document.getElementById('projectgrid-global-row-overlay');
    if (!rowOverlay) {
      rowOverlay = document.createElement('div');
      rowOverlay.id = 'projectgrid-global-row-overlay';
      rowOverlay.className = 'projectgrid-row-overlay-portal';
      document.body.appendChild(rowOverlay);
    }

    // Connect global window execution tracking macros
    window.ProjectGridUpdateFocusOverlay = (targetElement) => {
      if (!targetElement) { focusOverlay.style.display = 'none'; return; }
      const rect = targetElement.getBoundingClientRect();
      Object.assign(focusOverlay.style, {
        display: 'block', top: `${rect.top + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`, width: `${rect.width}px`, height: `${rect.height}px`
      });
    };

    window.ProjectGridUpdateRowOverlay = (targetRow) => {
      if (!targetRow) { rowOverlay.style.display = 'none'; return; }
      const rect = targetRow.getBoundingClientRect();
      Object.assign(rowOverlay.style, {
        display: 'block', top: `${rect.top + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`, width: `${rect.width}px`, height: `${rect.height}px`
      });
    };
  },

  buildHeaderDropup(titleIcon, key, defaults, rowsArray) {
    return UiDropdown.buildHeaderDropup(titleIcon, key, defaults, rowsArray);
  },

  buildRow(folder, absoluteVaultRoot, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput) {
    return UiRow.buildRow(folder, absoluteVaultRoot, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput);
  }
};

// ==========================================
// END OF FILE: ui.js
// ==========================================
