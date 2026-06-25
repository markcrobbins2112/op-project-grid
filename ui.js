// ==========================================
// START OF FILE: ui.js
// ==========================================

const UiDropdown = require('./ui-dropdown');
const UiRow = require('./ui-row');

module.exports = {
  generateHeaderCell() {
    this.ensureThreePortalsExist();

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

    filterInput.addEventListener('focus', () => {
      if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(filterInput);
    });
    filterInput.addEventListener('blur', () => {
      if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(null);
    });

    return { cell: noteHeaderCell, input: filterInput, clearBtn: clearButton };
  },

  ensureThreePortalsExist() {
    const portals = [
      { id: 'projectgrid-global-focus-overlay', class: 'projectgrid-focus-overlay-portal', winFunc: 'ProjectGridUpdateFocusOverlay' },
      { id: 'projectgrid-global-input-overlay', class: 'projectgrid-input-overlay-portal', winFunc: 'ProjectGridUpdateInputOverlay' },
      { id: 'projectgrid-global-row-overlay', class: 'projectgrid-row-overlay-portal', winFunc: 'ProjectGridUpdateRowOverlay' }
    ];

    portals.forEach(p => {
      let el = document.getElementById(p.id);
      if (!el) {
        el = document.createElement('div');
        el.id = p.id;
        el.className = p.class;
        document.body.appendChild(el);
      }

      window[p.winFunc] = (targetElement) => {
        if (!targetElement) { el.style.display = 'none'; return; }
        const rect = targetElement.getBoundingClientRect();
        Object.assign(el.style, {
          display: 'block',
          top: `${rect.top + window.scrollY}px`,
          left: `${rect.left + window.scrollX}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`
        });
      };
    });
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
