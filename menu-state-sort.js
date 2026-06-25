// ==========================================
// START OF FILE: menu-state-sort.js
// ==========================================

const menuStateSortModule = {
    activeSortChain: [], // Array holds up to 3 active column keys
  
    executeDynamicSortChain(rowsArray) {
      this.updateToolbarLabel();
      window.ProjectGridActiveSortChainList = this.activeSortChain;
  
      const liveTableBody = document.querySelector('.projectgrid-matrix-table tbody');
      if (!liveTableBody || !rowsArray || rowsArray.length === 0) {
        if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
        return;
      }
  
      // FIXED BASELINE EXTRACTION: Extracts the isolated trailing base directory name (e.g., "ce-idx" from "C:\_o\__\ce-idx")
      const getRowBaseDirName = (r) => {
        if (!r.folder || !r.folder.path) return '';
        const cleanPath = String(r.folder.path).replace(/[/\\]+$/, ''); // Strip trailing slashes
        const parts = cleanPath.split(/[/\\]+/);
        return parts[parts.length - 1] || '';
      };
  
      if (this.activeSortChain.length === 0) {
        // FALLBACK BASELINE: Sorts rows strictly by isolated base directory name alphabetically
        rowsArray.sort((rowA, rowB) => {
          return getRowBaseDirName(rowA).localeCompare(getRowBaseDirName(rowB), undefined, { numeric: true, sensitivity: 'base' });
        });
      } else {
        rowsArray.sort((rowA, rowB) => {
          const valsA = rowA.yamlMetadataValues || {}; const valsB = rowB.yamlMetadataValues || {};
          const datesA = rowA.folderDatesValues || {}; const datesB = rowB.folderDatesValues || {};
          const launchersA = rowA.launcherValues || {}; const launchersB = rowB.launcherValues || {};
          
          const mergedA = { ...valsA, ...datesA, ...launchersA }; 
          const mergedB = { ...valsB, ...datesB, ...launchersB };
  
          for (let i = 0; i < this.activeSortChain.length; i++) {
            const currentKey = this.activeSortChain[i];
            const isNumericField = ['tasks', 'tagcount', 'stars', 'value', 'size', 'depth', 'priority'].includes(currentKey);
            
            let valA = ''; let valB = '';
  
            if (currentKey === 'created' || currentKey === 'updated') {
              valA = String(datesA[currentKey] || ''); valB = String(datesB[currentKey] || '');
            } else if (currentKey === 'tasks') {
              const taskStrA = String(valsA['tasks'] || '0/0').split('/');
              const taskStrB = String(valsB['tasks'] || '0/0').split('/');
              valA = parseInt(taskStrA[0], 10) || 0;
              valB = parseInt(taskStrB[0], 10) || 0;
            } else if (currentKey === 'tagcount') {
              const tagStrA = String(valsA['tags'] || '⬛'); const tagStrB = String(valsB['tags'] || '⬛');
              valA = (tagStrA === '⬛' || tagStrA.trim() === '') ? 0 : tagStrA.split(',').length;
              valB = (tagStrB === '⬛' || tagStrB.trim() === '') ? 0 : tagStrB.split(',').length;
            } else if (isNumericField) {
              const cleanA = String(mergedA[currentKey] || '').replace(/[^\d]/g, '');
              const cleanB = String(mergedB[currentKey] || '').replace(/[^\d]/g, '');
              valA = cleanA !== '' ? parseInt(cleanA, 10) : -1;
              valB = cleanB !== '' ? parseInt(cleanB, 10) : -1;
            } else {
              valA = String(mergedA[currentKey] || '').replace(/[^\w]/g, '').toLowerCase();
              valB = String(mergedB[currentKey] || '').replace(/[^\w]/g, '').toLowerCase();
              if (valA === '' || valA === '⬛') valA = 'zzzzz';
              if (valB === '' || valB === '⬛') valB = 'zzzzz';
            }
  
            if (valA !== valB) {
              if (isNumericField) {
                return valB - valA; // Descending math comparisons
              } else {
                return valA.localeCompare(valB, undefined, { numeric: true, sensitivity: 'base' });
              }
            }
          }
          
          // ALIGNED TIE-BREAKER PASSTHROUGH: Uses isolated base directory name on sorting collisions
          return getRowBaseDirName(rowA).localeCompare(getRowBaseDirName(rowB), undefined, { numeric: true, sensitivity: 'base' });
        });
      }
  
      rowsArray.forEach(row => { if (row.element) liveTableBody.appendChild(row.element); });
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
  
  globalThis.MenuStateSort = menuStateSortModule;
  module.exports = menuStateSortModule;
  
  // ==========================================
  // END OF FILE: menu-state-sort.js
  // ==========================================
