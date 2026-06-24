module.exports = {
    initializeTableFilter(filterInput, clearButton, rowsArray) {
      const applyFilter = () => {
        const val = filterInput.value.toLowerCase().trim();
        clearButton.style.visibility = val ? 'visible' : 'hidden';
        
        rowsArray.forEach(row => {
          if (row.searchText.includes(val)) {
            row.element.style.display = '';
          } else {
            row.element.style.display = 'none';
          }
        });
      };
  
      filterInput.addEventListener('input', applyFilter);
      
      clearButton.addEventListener('click', () => {
        filterInput.value = '';
        applyFilter();
        filterInput.focus();
      });
    }
  };
  