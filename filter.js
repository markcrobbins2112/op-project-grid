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
        const passText = row.searchText.includes(val);
        const passDropdowns = Object.values(row.dropdownFilters || {}).every(status => status === true);
        if (passText && passDropdowns) row.element.style.display = '';
        else row.element.style.display = 'none';
      });

      rowsArray.forEach(row => {
        const metadata = row.yamlMetadataValues || {};
        const launchers = row.launcherValues || {};
        const dates = row.folderDatesValues || {};
        
        const allFields = { ...metadata, ...launchers, ...dates };
        const isRowVisible = row.element.style.display !== 'none';

        Object.keys(allFields).forEach(key => {
          if (!globalCounts[key]) globalCounts[key] = { nonNullTotal: 0 };
          if (!visibleCounts[key]) visibleCounts[key] = { nonNullVisible: 0 };
          const valueStr = String(allFields[key]).trim();
          if (valueStr && valueStr !== '⬛' && valueStr !== '' && valueStr !== '0000.00.00 00' && valueStr !== '0/0') {
            globalCounts[key].nonNullTotal++;
            if (isRowVisible) visibleCounts[key].nonNullVisible++;
          }
        });
      });

      rowsArray.forEach(row => {
        if (!row.element) return;
        const selects = row.element.querySelectorAll('.projectgrid-custom-select-btn:not(.projectgrid-tasks-trigger-btn):not(.projectgrid-tags-cell-btn)');
        selects.forEach(btn => {
          const fIdx = btn.getAttribute('data-field-index');
          const fieldsConfigKeys = ['stars', 'value', 'size', 'depth', 'priority', 'status', 'lang', 'target'];
          const key = fieldsConfigKeys[fIdx];
          if (!key) return;

          const currentVal = row.yamlMetadataValues ? String(row.yamlMetadataValues[key]) : '⬛';
          let valueSpecificVisible = 0; let valueSpecificTotal = 0;

          rowsArray.forEach(r => {
            const rVal = r.yamlMetadataValues ? String(r.yamlMetadataValues[key]) : '⬛';
            if (rVal === currentVal) {
              valueSpecificTotal++;
              if (r.element.style.display !== 'none') valueSpecificVisible++;
            }
          });
          btn.textContent = `${currentVal} ${valueSpecificVisible}/${valueSpecificTotal}`;
        });
      });

      const headerIconsMap = {
        tasks: '🔧', created: '🆕', updated: '🆙', tags: '🏷️', stars: '⭐', 
        value: '💲', size: '🐘', depth: '🎱', priority: '🏅', status: '🚦', lang: '🔤', target: '🎯',
        git: '💿', agents: '🤖'
      };

      const activeSortChain = window.ProjectGridActiveSortChainList || [];

      document.querySelectorAll('.projectgrid-header-dropup-trigger').forEach(trigger => {
        const key = trigger.getAttribute('data-key');
        if (!key || !headerIconsMap[key]) return;

        let baseIcon = headerIconsMap[key];
        const chainIdx = activeSortChain.indexOf(key);
        
        if (chainIdx === 0) baseIcon = '🟢' + baseIcon;
        else if (chainIdx === 1) baseIcon = '🟡' + baseIcon;
        else if (chainIdx === 2) baseIcon = '🔴' + baseIcon;

        let nonNullVis = visibleCounts[key]?.nonNullVisible || 0;
        let nonNullTot = globalCounts[key]?.nonNullTotal || 0;

        if (key === 'tasks' || key === 'created' || key === 'updated' || key === 'git' || key === 'agents') {
          nonNullVis = rowsArray.filter(r => r.element.style.display !== 'none').length;
          nonNullTot = rowsArray.length;
        }

        trigger.textContent = `${baseIcon} ${nonNullVis}/${nonNullTot}`;
      });

      const visibleRows = rowsArray.filter(row => row.element && row.element.style.display !== 'none');
      if (visibleRows.length > 0) {
        if (currentFocusedIndex < 0 || currentFocusedIndex >= visibleRows.length) currentFocusedIndex = 0;
        const finalTargetRow = visibleRows[currentFocusedIndex].element;
        finalTargetRow.classList.add('projectgrid-row-focused');
        lastTrackedRowElement = finalTargetRow;
        if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(finalTargetRow);
      } else {
        currentFocusedIndex = -1; lastTrackedRowElement = null;
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
      filterInput.value = ''; applyFilter(); filterInput.focus();
    });

    window.ProjectGridTriggerFilterUpdate = applyFilter;
    setTimeout(applyFilter, 50);
  }
};

// ==========================================
// END OF FILE: filter.js
// ==========================================
