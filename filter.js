// ==========================================
// START OF FILE: filter.js
// ==========================================

const MenuCore = require('./menu-core');

module.exports = {
  initializeTableFilter(filterInput, clearButton, rowsArray, containerElement) {
    let currentFocusedIndex = -1;

    const applyFilter = () => {
      const val = filterInput.value.toLowerCase().trim();
      clearButton.style.visibility = val ? 'visible' : 'hidden';
      
      rowsArray.forEach(row => {
        const passText = row.searchText.includes(val);
        const passDropdowns = Object.values(row.dropdownFilters || {}).every(status => status === true);
        if (row.element) {
          row.element.style.display = (passText && passDropdowns) ? '' : 'none';
        }
      });

      const globalCounts = {};
      const visibleCounts = {};

      rowsArray.forEach(row => {
        const metadata = row.yamlMetadataValues || {};
        const launchers = row.launcherValues || {};
        const dates = row.folderDatesValues || {};
        
        const allFields = { ...metadata, ...launchers, ...dates };
        const isRowVisible = row.element && row.element.style.display !== 'none';

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

      const headerIconsMap = {
        tasks: '🔧', created: '🆕', updated: '🆙', tags: '🏷️', stars: '⭐', 
        value: '💲', size: '🐘', depth: '🎱', priority: '🏅', status: '🚦', lang: '🔤', target: '🎯',
        git: '💿', agents: '🤖'
      };

      const activeSortChain = window.ProjectGridActiveSortChainList || [];

      // Update interactive filter headers triggers
      document.querySelectorAll('.projectgrid-header-dropup-trigger').forEach(trigger => {
        const key = trigger.getAttribute('data-key');
        if (!key || !headerIconsMap[key]) return;

        let baseIcon = headerIconsMap[key];
        const chainIdx = activeSortChain.indexOf(key);
        
        // Append micro-font rank badge strings next to active column headers
        if (chainIdx === 0) baseIcon = '<span style="font-size:9px; vertical-align:middle;">🟢</span>' + baseIcon;
        else if (chainIdx === 1) baseIcon = '<span style="font-size:9px; vertical-align:middle;">🟡</span>' + baseIcon;
        else if (chainIdx === 2) baseIcon = '<span style="font-size:9px; vertical-align:middle;">🔴</span>' + baseIcon;

        let nonNullVis = visibleCounts[key]?.nonNullVisible || 0;
        let nonNullTot = globalCounts[key]?.nonNullTotal || 0;

        if (key === 'tasks' || key === 'created' || key === 'updated') {
          nonNullVis = rowsArray.filter(r => r.element && r.element.style.display !== 'none').length;
          nonNullTot = rowsArray.length;
        }

        trigger.innerHTML = `${baseIcon} ${nonNullVis}/${nonNullTot}`;
      });

      // Update static read-only table headers elements
      document.querySelectorAll('.projectgrid-matrix-table th').forEach(th => {
        const contentStr = th.textContent.trim();
        let targetKey = '';
        let baseEmoji = '';
        
        if (contentStr.includes('💿')) { targetKey = 'git'; baseEmoji = '💿'; }
        if (contentStr.includes('🤖')) { targetKey = 'agents'; baseEmoji = '🤖'; }
        
        if (targetKey) {
          const chainIdx = activeSortChain.indexOf(targetKey);
          let badgePrefix = '';
          if (chainIdx === 0) badgePrefix = '<span style="font-size:8px; vertical-align:middle;">🟢</span>';
          if (chainIdx === 1) badgePrefix = '<span style="font-size:8px; vertical-align:middle;">🟡</span>';
          if (chainIdx === 2) badgePrefix = '<span style="font-size:8px; vertical-align:middle;">🔴</span>';

          const checkedVis = rowsArray.filter(r => r.element && r.element.style.display !== 'none' && r.yamlMetadataValues?.[targetKey] === '✅').length;
          const checkedTotal = rowsArray.filter(r => r.yamlMetadataValues?.[targetKey] === '✅').length;
          
          th.innerHTML = `${badgePrefix}${baseEmoji} ${checkedVis}/${checkedTotal}`;
        }
      });

      const visibleRows = rowsArray.filter(row => row.element && row.element.style.display !== 'none');
      if (visibleRows.length > 0) {
        if (currentFocusedIndex < 0 || currentFocusedIndex >= visibleRows.length) currentFocusedIndex = 0;
        const finalTargetRow = visibleRows[currentFocusedIndex].element;
        if (finalTargetRow) {
          finalTargetRow.classList.add('projectgrid-row-focused');
          if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(finalTargetRow);
        }
      }
    };

    filterInput.addEventListener('input', applyFilter);

    MenuCore.bindKeyboardEvents(filterInput, rowsArray, containerElement, () => {
      return rowsArray.filter(row => row.element && row.element.style.display !== 'none');
    }, (index) => {
      currentFocusedIndex = index;
      const visibleRows = rowsArray.filter(row => row.element && row.element.style.display !== 'none');
      rowsArray.forEach(row => { if (row.element) row.element.classList.remove('projectgrid-row-focused'); });
      if (visibleRows[index] && visibleRows[index].element) {
        visibleRows[index].element.classList.add('projectgrid-row-focused');
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
