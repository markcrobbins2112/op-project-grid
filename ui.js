// ==========================================
// START OF FILE: ui.js
// ==========================================

const UiDropdown = require('./ui-dropdown');
const UiRow = require('./ui-row');

module.exports = {
  generateHeaderCell() {
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

    return { cell: noteHeaderCell, input: filterInput, clearBtn: clearButton };
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
