// ==========================================
// START OF FILE: ui-dropdown.js
// ==========================================

module.exports = {
    buildHeaderDropup(titleIcon, key, defaults, rowsArray) {
      const th = document.createElement('th');
      th.style.width = '8%';
      
      const trigger = document.createElement('div');
      trigger.className = 'projectgrid-header-dropup-trigger';
      trigger.setAttribute('data-key', key);
      trigger.textContent = titleIcon;
  
      const panel = document.createElement('div');
      panel.className = 'projectgrid-dropup-panel';
  
      const activeFilters = new Set(defaults);
  
      defaults.forEach(opt => {
        const wrapper = document.createElement('label');
        wrapper.className = 'projectgrid-dropup-option';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
  
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
        panel.appendChild(wrapper);
      });
  
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.projectgrid-dropup-panel').forEach(p => { if(p !== panel) p.classList.remove('is-open'); });
        panel.classList.toggle('is-open');
      });
  
      document.addEventListener('click', () => panel.classList.remove('is-open'));
      th.appendChild(trigger);
      th.appendChild(panel);
      return th;
    }
  };
  
  // ==========================================
  // END OF FILE: ui-dropdown.js
  // ==========================================
  