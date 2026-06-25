// ==========================================
// START OF FILE: filter.js
// ==========================================

const MenuCore = require('./menu-core');

module.exports = {
  initializeTableFilter(filterInput, clearButton, rowsArray, containerElement) {
    let currentFocusedIndex = -1;

    const clearRowHighlights = () => {
      rowsArray.forEach(row => {
        if (row.element && row.element.classList) {
          row.element.classList.remove('projectgrid-row-focused');
        }
      });
    };

    const applyFilter = () => {
      const val = filterInput.value.toLowerCase().trim();
      clearButton.style.visibility = val ? 'visible' : 'hidden';
      currentFocusedIndex = -1;
      clearRowHighlights();
      
      // Dictionary maps to track live visible value matches for the counters
      const globalCounts = {};
      const visibleCounts = {};

      // First run: Calculate base structural counts across the dataset
      rowsArray.forEach(row => {
        const metadata = row.yamlMetadataValues || {};
        const launchers = row.launcherValues || {};
        
        // Merge field scopes for dynamic indexing
        const allFields = { ...metadata, ...launchers };

        Object.keys(allFields).forEach(key => {
          const valueStr = String(allFields[key]);
          if (!globalCounts[key]) globalCounts[key] = { total: 0, valMap: {} };
          if (!visibleCounts[key]) visibleCounts[key] = { valMap: {} };

          globalCounts[key].total++;
          globalCounts[key].valMap[valueStr] = (globalCounts[key].valMap[valueStr] || 0) + 1;
        });

        // Evaluate standard visibility parameters matching active filters
        const passText = row.searchText.includes(val);
        const passDropdowns = Object.values(row.dropdownFilters || {}).every(status => status === true);
        
        if (passText && passDropdowns) {
          row.element.style.display = '';
          
          // Increment visibility statistics maps
          Object.keys(allFields).forEach(key => {
            const valueStr = String(allFields[key]);
            visibleCounts[key].valMap[valueStr] = (visibleCounts[key].valMap[valueStr] || 0) + 1;
          });
        } else {
          row.element.style.display = 'none';
        }
      });

      // Second run: Push structural counter data directly back into the live dropdown elements
      rowsArray.forEach(row => {
        if (!row.element) return;
        const selects = row.element.querySelectorAll('.projectgrid-custom-select-btn');
        
        selects.forEach(btn => {
          const fIdx = btn.getAttribute('data-field-index');
          const fieldsConfigKeys = ['stars', 'value', 'size', 'depth', 'priority', 'status', 'lang', 'target'];
          const key = fieldsConfigKeys[fIdx];
          if (!key) return;

          const currentVal = row.yamlMetadataValues ? String(row.yamlMetadataValues[key]) : '⬛';
          const visNum = visibleCounts[key]?.valMap[currentVal] || 0;
          const totNum = globalCounts[key]?.valMap[currentVal] || 0;

          // Strip previous count trails to rewrite cleanly
          const baseText = currentVal;
          btn.textContent = `${baseText} {${visNum}/${totNum}}`;
        });
      });

      // Third run: Update header titles and filter panel option labels dynamically
      document.querySelectorAll('.projectgrid-header-dropup-trigger').forEach(trigger => {
        const key = trigger.getAttribute('data-key');
        if (!key) return;

        const totalItems = globalCounts[key]?.total || 0;
        const visibleItems = Object.values(visibleCounts[key]?.valMap || {}).reduce((a, b) => a + b, 0);
        
        const baseIcon = trigger.textContent.split(' ')[0];
        trigger.textContent = `${baseIcon} {${visibleItems}/${totalItems}}`;
      });
    };

    filterInput.addEventListener('input', applyFilter);

    MenuCore.bindKeyboardEvents(filterInput, rowsArray, containerElement, () => {
      return rowsArray.filter(row => row.element && row.element.style.display !== 'none');
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
    
    // Initial data run to render layout counters accurately on bootup
    setTimeout(applyFilter, 50);
  }
};

// ==========================================
// END OF FILE: filter.js
// ==========================================
