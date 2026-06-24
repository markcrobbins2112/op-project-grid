// ==========================================
// START OF FILE: ui-dropdown.js
// ==========================================

module.exports = {
    buildHeaderDropup(titleIcon, key, defaults, rowsArray) {
      const th = document.createElement('th');
      th.style.width = '8%';
      th.style.textAlign = 'center';
      
      const trigger = document.createElement('div');
      trigger.className = 'projectgrid-header-dropup-trigger';
      trigger.setAttribute('data-key', key);
      trigger.textContent = titleIcon;
  
      let activePanel = null;
      const activeFilters = new Set(defaults);
  
      const closePanel = () => {
        if (activePanel) { activePanel.remove(); activePanel = null; }
      };
  
      const openPanel = () => {
        closePanel();
        activePanel = document.createElement('div');
        activePanel.className = 'projectgrid-dropup-panel';
  
        // Calculate placement boundaries dynamically relative to the screen viewport
        const rect = trigger.getBoundingClientRect();
        activePanel.style.position = 'fixed';
        activePanel.style.top = `${rect.bottom + window.scrollY + 4}px`;
        activePanel.style.left = `${rect.left + window.scrollX}px`;
        activePanel.style.zIndex = '300000'; // Higher portal priority tracking plane
  
        defaults.forEach(opt => {
          const wrapper = document.createElement('label');
          wrapper.className = 'projectgrid-dropup-option';
          
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.checked = activeFilters.has(opt);
  
          checkbox.addEventListener('change', () => {
            if (checkbox.checked) activeFilters.add(opt);
            else activeFilters.delete(opt);
            
            rowsArray.forEach(row => {
              if (!row.dropdownFilters) row.dropdownFilters = {};
              const currentVal = row.yamlMetadataValues && row.yamlMetadataValues[key] ? String(row.yamlMetadataValues[key]) : '⬛';
              row.dropdownFilters[key] = activeFilters.has(currentVal) || (currentVal === '⬛' && activeFilters.has('⬛'));
            });
  
            if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
          });
  
          wrapper.appendChild(checkbox);
          wrapper.appendChild(document.createTextNode(opt));
          activePanel.appendChild(wrapper);
        });
  
        // Prevent panel clicks from closing the dropdown prematurely
        activePanel.addEventListener('mousedown', (e) => e.stopPropagation());
  
        document.body.appendChild(activePanel);
      };
  
      trigger.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        // Close any other open filter panels before toggling this one
        document.querySelectorAll('.projectgrid-dropup-panel').forEach(p => p.remove());
        if (activePanel) closePanel(); else openPanel();
      });
  
      // Close listener when clicking anywhere else on the note canvas
      document.addEventListener('mousedown', function closeHeaderMenu(e) {
        if (activePanel && !trigger.contains(e.target)) {
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
  