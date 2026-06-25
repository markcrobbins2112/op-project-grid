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
      clearRowHighlights();
      
      const globalCounts = {};
      const visibleCounts = {};

      rowsArray.forEach(row => {
        const metadata = row.yamlMetadataValues || {};
        const launchers = row.launcherValues || {};
        const allFields = { ...metadata, ...launchers };

        Object.keys(allFields).forEach(key => {
          const valueStr = String(allFields[key]);
          if (!globalCounts[key]) globalCounts[key] = { total: 0, valMap: {} };
          if (!visibleCounts[key]) visibleCounts[key] = { valMap: {} };

          globalCounts[key].total++;
          globalCounts[key].valMap[valueStr] = (globalCounts[key].valMap[valueStr] || 0) + 1;
        });

        const passText = row.searchText.includes(val);
        const passDropdowns = Object.values(row.dropdownFilters || {}).every(status => status === true);
        
        if (passText && passDropdowns) {
          row.element.style.display = '';
          Object.keys(allFields).forEach(key => {
            const valueStr = String(allFields[key]);
            visibleCounts[key].valMap[valueStr] = (visibleCounts[key].valMap[valueStr] || 0) + 1;
          });
        } else {
          row.element.style.display = 'none';
        }
      });

      // Update counters text without curly braces
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
          btn.textContent = `${currentVal} ${visNum}/${totNum}`;
        });
      });

      // Re-sync header counters text layouts
      document.querySelectorAll('.projectgrid-header-dropup-trigger').forEach(trigger => {
        const key = trigger.getAttribute('data-key');
        if (!key) return;
        const totalItems = globalCounts[key]?.total || 0;
        const visibleItems = Object.values(visibleCounts[key]?.valMap || {}).reduce((a, b) => a + b, 0);
        const baseIcon = trigger.textContent.split(' ')[0];
        trigger.textContent = `${baseIcon} ${visibleItems}/${totalItems}`;
      });

      // --- FIX: AUTOMATICALLY ENSURE A ROW INDICATOR IS ALWAYS ACTIVE ---
      const visibleRows = rowsArray.filter(row => row.element && row.element.style.display !== 'none');
      if (visibleRows.length > 0) {
        // If our pointer was cleared or went out of bounds, snap it cleanly to the first visible row
        if (currentFocusedIndex < 0 || currentFocusedIndex >= visibleRows.length) {
          currentFocusedIndex = 0;
        }
        const targetRow = visibleRows[currentFocusedIndex].element;
        targetRow.classList.add('projectgrid-row-focused');
        
        if (window.ProjectGridUpdateRowOverlay) {
          window.ProjectGridUpdateRowOverlay(targetRow);
        }
      } else {
        currentFocusedIndex = -1;
        if (window.ProjectGridUpdateRowOverlay) {
          window.ProjectGridUpdateRowOverlay(null);
        }
      }
    };

    filterInput.addEventListener('input', applyFilter);

    MenuCore.bindKeyboardEvents(filterInput, rowsArray, containerElement, () => {
      return rowsArray.filter(row => row.element && row.element.style.display !== 'none');
    }, (index) => {
      currentFocusedIndex = index;
      // Re-evaluate overlays using a safe structural tracking loop
      const visibleRows = rowsArray.filter(row => row.element && row.element.style.display !== 'none');
      clearRowHighlights();
      if (visibleRows[index]) {
        visibleRows[index].element.classList.add('projectgrid-row-focused');
        if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(visibleRows[index].element);
      }
    });

    clearButton.addEventListener('click', () => {
      filterInput.value = '';
      applyFilter();
      filterInput.focus();
    });

    window.ProjectGridTriggerFilterUpdate = applyFilter;
    setTimeout(applyFilter, 50);
  }
};

// ==========================================
// END OF FILE: filter.js
// ==========================================
