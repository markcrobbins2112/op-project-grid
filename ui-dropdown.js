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
        Object.assign(activePanel.style, {
          position: 'fixed', top: `${rect.bottom + window.scrollY + 4}px`,
          left: `${rect.left + window.scrollX}px`, zIndex: '300000', height: 'auto'
        });
  
        fullOptionsList.forEach((opt, oIdx) => {
          const wrapper = document.createElement('label');
          wrapper.className = 'projectgrid-dropup-option';
          
          if (oIdx === selectionIdx && window.ProjectGridUpdateFocusOverlay) {
            setTimeout(() => window.ProjectGridUpdateFocusOverlay(wrapper), 10);
          }
  
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.tabIndex = -1; 
          
          if (opt === '[ALL]') checkbox.checked = (activeFilters.size === defaults.length);
          else checkbox.checked = activeFilters.has(opt);
  
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
          boxes.checked = (activeFilters.size === defaults.length);
          defaults.forEach((d, idx) => { boxes[idx + 1].checked = activeFilters.has(d); });
        }
  
        rowsArray.forEach(row => {
          if (!row.dropdownFilters) row.dropdownFilters = {};
          const currentVal = row.yamlMetadataValues && row.yamlMetadataValues[key] ? String(row.yamlMetadataValues[key]) : '⬛';
          row.dropdownFilters[key] = activeFilters.has(currentVal) || (currentVal === '⬛' && activeFilters.has('⬛'));
        });
  
        if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
      };
  
      // FIX: SUPPORTS COMPREHENSIVE DOWNSTREAM PANELS KEYBOARD LOOPS FOR NAVIGATION CHECKS
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
  
      // FIX: ADDED ADVANCED TRIGGER MACROS FOR OPENING THE FILTER MENU WITHOUT PREVIOUS CELL SELECTIONS
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
  