// ==========================================
// START OF FILE: ui-dropdown.js
// ==========================================

module.exports = {
    buildHeaderDropup(titleIcon, key, defaults, rowsArray) {
      const th = document.createElement('th');
      th.className = 'projectgrid-uniform-yaml-th';
      
      const trigger = document.createElement('div');
      trigger.className = 'projectgrid-header-dropup-trigger';
      trigger.setAttribute('data-key', key);
      trigger.tabIndex = 0; 
      trigger.textContent = titleIcon;
  
      let activePanel = null;
      let selectionIdx = 0;
      const activeFilters = new Set(defaults);
      const fullOptionsList = ['[ALL]', ...defaults];
  
      const closePanel = () => {
        if (activePanel) { activePanel.remove(); activePanel = null; }
        if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
      };
  
      const openPanel = () => {
        closePanel();
        selectionIdx = 0;
        activePanel = document.createElement('div');
        activePanel.className = 'projectgrid-dropup-panel';
  
        const rect = trigger.getBoundingClientRect();
        activePanel.style.position = 'fixed';
        
        // FIX 1: ALTER BOUNDING BOX POSITION FROM RECT.BOTTOM TO RECT.TOP TO FORCE DROP-UP BEHAVIOR
        // Using an implicit margin offset handles vertical clearance smoothly
        activePanel.style.bottom = `${window.innerHeight - rect.top + 4}px`;
        activePanel.style.left = `${rect.left + window.scrollX}px`;
        activePanel.style.zIndex = '300000';
        activePanel.style.height = 'auto';
  
        fullOptionsList.forEach((opt, oIdx) => {
          const wrapper = document.createElement('label');
          wrapper.className = 'projectgrid-dropup-option';
          
          if (oIdx === selectionIdx && window.ProjectGridUpdateFocusOverlay) {
            setTimeout(() => window.ProjectGridUpdateFocusOverlay(wrapper), 10);
          }
  
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.tabIndex = -1; 
          
          if (opt === '[ALL]') {
            checkbox.checked = (activeFilters.size === defaults.length);
          } else {
            checkbox.checked = activeFilters.has(opt);
          }
  
          checkbox.addEventListener('change', () => handleToggle(opt, checkbox.checked));
  
          wrapper.appendChild(checkbox);
          wrapper.appendChild(document.createTextNode(opt));
          activePanel.appendChild(wrapper);
        });
  
        trigger.addEventListener('keydown', handlePanelKeys);
        activePanel.addEventListener('mousedown', (e) => e.stopPropagation());
        document.body.appendChild(activePanel);
      };
  
      const handleToggle = (opt, isChecked) => {
        if (opt === '[ALL]') {
          if (isChecked) defaults.forEach(d => activeFilters.add(d));
          else activeFilters.clear();
        } else {
          if (isChecked) activeFilters.add(opt);
          else activeFilters.delete(opt);
        }
  
        if (activePanel) {
          const boxes = activePanel.querySelectorAll('input[type="checkbox"]');
          boxes[0].checked = (activeFilters.size === defaults.length);
          defaults.forEach((d, idx) => { boxes[idx + 1].checked = activeFilters.has(d); });
        }
  
        // FIX 2: STRIP EXTRA ICON TRAILS NATIVELY TO RESOLVE FILTER RE-SYNC CACHE MISSES
        rowsArray.forEach(row => {
          if (!row.dropdownFilters) row.dropdownFilters = {};
          
          const rawVal = row.yamlMetadataValues && row.yamlMetadataValues[key] ? String(row.yamlMetadataValues[key]) : '⬛';
          const sanitizedRaw = rawVal.replace(/[⭐💲🐘🎱🏅🛑🌐🛠🧪📦]/g, '').trim();
  
          // Check if our active validation pool contains matching sanitized elements
          let isMatchFound = false;
          activeFilters.forEach(filterOpt => {
            const sanitizedFilter = filterOpt.replace(/[⭐💲🐘🎱🏅🛑🌐🛠🧪📦]/g, '').trim();
            if (sanitizedRaw === sanitizedFilter || (sanitizedRaw === '⬛' && sanitizedFilter === '⬛')) {
              isMatchFound = true;
            }
          });
  
          row.dropdownFilters[key] = isMatchFound;
        });
  
        if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
      };
  
      function handlePanelKeys(evt) {
        if (!activePanel) return;
  
        if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp') {
          evt.preventDefault();
          evt.stopPropagation();
          
          selectionIdx = evt.key === 'ArrowDown' ? ((selectionIdx + 1) % fullOptionsList.length) : ((selectionIdx - 1 + fullOptionsList.length) % fullOptionsList.length);
  
          const labels = activePanel.querySelectorAll('.projectgrid-dropup-option');
          if (labels[selectionIdx] && window.ProjectGridUpdateFocusOverlay) {
            window.ProjectGridUpdateFocusOverlay(labels[selectionIdx]);
          }
        } else if (evt.key === ' ' || evt.key === 'Spacebar') {
          evt.preventDefault();
          const cb = activePanel.querySelectorAll('input[type="checkbox"]')[selectionIdx];
          cb.checked = !cb.checked;
          handleToggle(fullOptionsList[selectionIdx], cb.checked);
        } else if (evt.key === 'Enter' || evt.key === 'Escape') {
          evt.preventDefault();
          trigger.removeEventListener('keydown', handlePanelKeys);
          closePanel(); trigger.focus();
        }
      }
  
      trigger.addEventListener('keydown', (evt) => {
        if (!activePanel) {
          if ((evt.key === 'ArrowDown' && evt.altKey) || evt.key === ' ' || evt.key === 'ArrowDown' || evt.key === 'Enter') {
            evt.preventDefault();
            openPanel();
          }
        }
      });
  
      trigger.addEventListener('focus', () => {
        if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(trigger);
      });
      trigger.addEventListener('blur', () => {
        setTimeout(() => {
          if (activePanel && !activePanel.contains(document.activeElement)) {
            trigger.removeEventListener('keydown', handlePanelKeys);
            closePanel();
          }
        }, 150);
      });
  
      trigger.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.projectgrid-dropup-panel').forEach(p => p.remove());
        if (activePanel) closePanel(); else openPanel();
      });
  
      document.addEventListener('mousedown', function closeHeaderMenu(e) {
        if (activePanel && !trigger.contains(e.target) && !activePanel.contains(e.target)) {
          trigger.removeEventListener('keydown', handlePanelKeys);
          closePanel();
        }
      });
  
      th.appendChild(trigger);
      return th;
    }
  };
  
  // ==========================================
  // END OF FILE: ui-dropdown.js
  // ==========================================
  