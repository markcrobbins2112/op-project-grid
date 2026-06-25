// ==========================================
// START OF FILE: filter.js
// ==========================================

const MenuCore = require('./menu-core');

module.exports = {
  initializeTableFilter(filterInput, clearButton, rowsArray, containerElement) {
    let currentFocusedIndex = -1;
    let lastTrackedRowElement = null;

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

      // 1. Process rows visibility flags
      rowsArray.forEach(row => {
        const passText = row.searchText.includes(val);
        const passDropdowns = Object.values(row.dropdownFilters || {}).every(status => status === true);
        
        if (passText && passDropdowns) {
          row.element.style.display = '';
        } else {
          row.element.style.display = 'none';
        }
      });

      // 2. Loop through the row items data to compute accurate non-null metrics counters
      rowsArray.forEach(row => {
        const metadata = row.yamlMetadataValues || {};
        const launchers = row.launcherValues || {};
        const allFields = { ...metadata, ...launchers };
        const isRowVisible = row.element.style.display !== 'none';

        Object.keys(allFields).forEach(key => {
          if (!globalCounts[key]) globalCounts[key] = { nonNullTotal: 0 };
          if (!visibleCounts[key]) visibleCounts[key] = { nonNullVisible: 0 };

          const valueStr = String(allFields[key]).trim();
          
          // FIX 1: FILTER ENGINE EXCLUDES EMPTY '⬛' PLACEHOLDERS FROM THE COUNT TALLIES
          if (valueStr && valueStr !== '⬛' && valueStr !== '') {
            globalCounts[key].nonNullTotal++;
            if (isRowVisible) {
              visibleCounts[key].nonNullVisible++;
            }
          }
        });
      });

      // 3. Render select cell text items cleanly without trails
      rowsArray.forEach(row => {
        if (!row.element) return;
        const selects = row.element.querySelectorAll('.projectgrid-custom-select-btn');
        
        selects.forEach(btn => {
          const fIdx = btn.getAttribute('data-field-index');
          
          // Fallback array selector routing matching column cell geometry indexes
          const fieldsConfigKeys = ['stars', 'value', 'size', 'depth', 'priority', 'status', 'lang', 'target'];
          const key = fieldsConfigKeys[fIdx];
          if (!key) return;

          const currentVal = row.yamlMetadataValues ? String(row.yamlMetadataValues[key]) : '⬛';
          
          // Pull visibility matches purely for rows displaying this specific property choice value
          let valueSpecificVisible = 0;
          let valueSpecificTotal = 0;

          rowsArray.forEach(r => {
            const rVal = r.yamlMetadataValues ? String(r.yamlMetadataValues[key]) : '⬛';
            if (rVal === currentVal) {
              valueSpecificTotal++;
              if (r.element.style.display !== 'none') {
                valueSpecificVisible++;
              }
            }
          });

          btn.textContent = `${currentVal} ${valueSpecificVisible}/${valueSpecificTotal}`;
        });
      });

      // 4. Update the interactive table column header triggers text blocks cleanly
      // Maps explicit, clean matching icon key indexes arrays to completely avoid string slice accumulation bugs
      const headerIconsMap = {
        tags: '🏷️', stars: '⭐', value: '💲', size: '🐘',
        depth: '🎱', priority: '🏅', status: '🚦', lang: '🔤', target: '🎯'
      };

      document.querySelectorAll('.projectgrid-header-dropup-trigger').forEach(trigger => {
        const key = trigger.getAttribute('data-key');
        if (!key || !headerIconsMap[key]) return;

        // FIX 2: RE-WRITE CONTENT GRIDS BY COMPLETELY ERASING OLD VALUES USING HARDCODED BASE ICONS MAPS
        const baseIcon = headerIconsMap[key];
        const nonNullVis = visibleCounts[key]?.nonNullVisible || 0;
        const nonNullTot = globalCounts[key]?.nonNullTotal || 0;

        trigger.textContent = `${baseIcon} ${nonNullVis}/${nonNullTot}`;
      });

      // 5. Restore core row indicator outlines positions cleanly
      const visibleRows = rowsArray.filter(row => row.element && row.element.style.display !== 'none');
      if (visibleRows.length > 0) {
        if (currentFocusedIndex < 0 || currentFocusedIndex >= visibleRows.length) {
          currentFocusedIndex = 0;
        }
        const finalTargetRow = visibleRows[currentFocusedIndex].element;
        finalTargetRow.classList.add('projectgrid-row-focused');
        lastTrackedRowElement = finalTargetRow;
        if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(finalTargetRow);
      } else {
        currentFocusedIndex = -1;
        lastTrackedRowElement = null;
        if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(null);
      }

      if (window.ProjectGridForceOverlayRecalc) window.ProjectGridForceOverlayRecalc();
    };

    filterInput.addEventListener('input', applyFilter);

    MenuCore.bindKeyboardEvents(filterInput, rowsArray, containerElement, () => {
      return rowsArray.filter(row => row.element && row.element.style.display !== 'none');
    }, (index) => {
      currentFocusedIndex = index;
      const visibleRows = rowsArray.filter(row => row.element && row.element.style.display !== 'none');
      clearRowHighlights();
      if (visibleRows[index]) {
        visibleRows[index].element.classList.add('projectgrid-row-focused');
        lastTrackedRowElement = visibleRows[index].element;
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
