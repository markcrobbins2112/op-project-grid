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

      document.querySelectorAll('.projectgrid-header-dropup-trigger').forEach(trigger => {
        const key = trigger.getAttribute('data-key');
        if (!key) return;
        const totalItems = globalCounts[key]?.total || 0;
        const visibleItems = Object.values(visibleCounts[key]?.valMap || {}).reduce((a, b) => a + b, 0);
        const baseIcon = trigger.textContent.split(' ');
        trigger.textContent = `${baseIcon} ${visibleItems}/${totalItems}`;
      });

      const visibleRows = rowsArray.filter(row => row.element && row.element.style.display !== 'none');
      
      if (visibleRows.length > 0) {
        let targetMatchIdx = 0;

        if (lastTrackedRowElement && !visibleRows.some(r => r.element === lastTrackedRowElement)) {
          let absoluteOldIdx = rowsArray.findIndex(r => r.element === lastTrackedRowElement);
          let minimumDistance = Infinity;

          visibleRows.forEach((vRow, vIdx) => {
            let absoluteNewIdx = rowsArray.findIndex(r => r.element === vRow.element);
            let currentDist = Math.abs(absoluteOldIdx - absoluteNewIdx);
            if (currentDist < minimumDistance) {
              minimumDistance = currentDist;
              targetMatchIdx = vIdx;
            }
          });
        } else if (lastTrackedRowElement) {
          targetMatchIdx = visibleRows.findIndex(r => r.element === lastTrackedRowElement);
        }

        currentFocusedIndex = targetMatchIdx >= 0 ? targetMatchIdx : 0;
        const finalTargetRow = visibleRows[currentFocusedIndex].element;
        
        finalTargetRow.classList.add('projectgrid-row-focused');
        lastTrackedRowElement = finalTargetRow;
        
        if (window.ProjectGridUpdateRowOverlay) {
          window.ProjectGridUpdateRowOverlay(finalTargetRow);
        }
      } else {
        currentFocusedIndex = -1;
        lastTrackedRowElement = null;
        if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(null);
      }

      // FIX: Force immediate recalculation to snap position grids perfectly right after filtering data
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
