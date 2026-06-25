// ==========================================
// START OF FILE: menu-state-sort.js
// ==========================================

module.exports = {
    activeSortChain: [],
  
    executeDynamicSortChain(rowsArray) {
      this.updateToolbarLabel();
      window.ProjectGridActiveSortChainList = this.activeSortChain;
  
      const liveTableBody = document.querySelector('.projectgrid-matrix-table tbody');
      if (!liveTableBody || !rowsArray || rowsArray.length === 0) {
        if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
        return;
      }
  
      if (this.activeSortChain.length === 0) {
        rowsArray.sort((a, b) => String(a.searchText || '').localeCompare(String(b.searchText || '')));
      } else {
        rowsArray.sort((rowA, rowB) => {
          const valsA = rowA.yamlMetadataValues || {}; const valsB = rowB.yamlMetadataValues || {};
          const datesA = rowA.folderDatesValues || {}; const datesB = rowB.folderDatesValues || {};
          const launchersA = rowA.launcherValues || {}; const launchersB = rowB.launcherValues || {};
          
          const mergedA = { ...valsA, ...datesA, ...launchersA }; 
          const mergedB = { ...valsB, ...datesB, ...launchersB };
  
          for (let i = 0; i < this.activeSortChain.length; i++) {
            const currentKey = this.activeSortChain[i];
            let valA = ''; let valB = '';
  
            if (currentKey === 'created' || currentKey === 'updated') {
              valA = String(datesA[currentKey] || ''); valB = String(datesB[currentKey] || '');
            } else if (currentKey === 'tasks') {
              const taskStrA = String(launchersA['tasks'] || '0/0').split('/');
              const taskStrB = String(launchersB['tasks'] || '0/0').split('/');
              valA = String(taskStrA[0] || '0').padStart(5, '0');
              valB = String(taskStrB[0] || '0').padStart(5, '0');
            } else if (currentKey === 'tagcount') {
              const tagStrA = String(valsA['tags'] || '⬛'); const tagStrB = String(valsB['tags'] || '⬛');
              const countA = (tagStrA === '⬛' || tagStrA.trim() === '') ? 0 : tagStrA.split(',').length;
              const countB = (tagStrB === '⬛' || tagStrB.trim() === '') ? 0 : tagStrB.split(',').length;
              valA = String(countA).padStart(5, '0'); valB = String(countB).padStart(5, '0');
            } else {
              valA = String(mergedA[currentKey] || '').replace(/[^\w]/g, '');
              valB = String(mergedB[currentKey] || '').replace(/[^\w]/g, '');
            }
  
            if (valA !== valB) {
              return valB.localeCompare(valA, undefined, { numeric: true, sensitivity: 'base' });
            }
          }
          return 0;
        });
      }
  
      rowsArray.forEach(row => { if (row.element) liveTableBody.appendChild(row.element); });
      window.ProjectGridTriggerSortReRun = () => this.executeDynamicSortChain(rowsArray);
      if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
    },
  
    updateToolbarLabel() {
      const indicator = document.getElementById('projectgrid-sort-toolbar-label'); if (!indicator) return;
      if (this.activeSortChain.length === 0) {
        indicator.textContent = '📶 Default Directory Sort Order'; indicator.style.color = 'var(--text-muted)';
      } else {
        const formattedChain = this.activeSortChain.map((k, idx) => {
          let symbol = '🟢'; if (idx === 1) symbol = '🟡'; if (idx === 2) symbol = '🔴'; 
          return `${symbol}${k.toUpperCase()}`;
        }).join(' ➔ ');
        indicator.textContent = `📶 Sort Chain: ${formattedChain}`; indicator.style.color = 'var(--text-accent)';
      }
    }
  };
  
  // ==========================================
  // END OF FILE: menu-state-sort.js
  // ==========================================
  