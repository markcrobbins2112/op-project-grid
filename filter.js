// ==========================================
// START OF FILE: filter.js
// ==========================================

const MenuCore = require('./menu-core');

module.exports = {
  initializeTableFilter(filterInput, clearButton, rowsArray, containerElement) {
    let currentFocusedIndex = -1;

    const clearRowHighlights = () => {
      rowsArray.forEach(row => row.element.classList.remove('projectgrid-row-focused'));
    };

    const applyFilter = () => {
      const val = filterInput.value.toLowerCase().trim();
      clearButton.style.visibility = val ? 'visible' : 'hidden';
      currentFocusedIndex = -1;
      clearRowHighlights();
      
      rowsArray.forEach(row => {
        const passText = row.searchText.includes(val);
        const passDropdowns = Object.values(row.dropdownFilters || {}).every(status => status === true);
        
        if (passText && passDropdowns) {
          row.element.style.display = ''; // Clear inline styles to display row natively
        } else {
          row.element.style.display = 'none';
        }
      });
    };

    filterInput.addEventListener('input', applyFilter);

    // FIX: Core visibility checking condition updated to cleanly match visible row element arrays
    MenuCore.bindKeyboardEvents(filterInput, rowsArray, containerElement, () => {
      return rowsArray.filter(row => row.element.style.display !== 'none');
    }, (index) => {
      currentFocusedIndex = index;
      clearRowHighlights();
    });

    clearButton.addEventListener('click', () => {
      filterInput.value = '';
      applyFilter();
      filterInput.focus();
    });

    window.ProjectGridTriggerFilterUpdate = applyFilter;
  }
};

// ==========================================
// END OF FILE: filter.js
// ==========================================
