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
      trigger.tabIndex = 0; // FIX: ENABLES TITLES FILTER BUTTONS TO BE SEPARATELY FOCUSABLE VIA KEYBOARD
      trigger.textContent = titleIcon;
  
      let activePanel = null;
      let selectionIdx = 0;
      const activeFilters = new Set(defaults);
      const fullOptionsList = ['[ALL]', ...defaults];
  
      const closePanel = () => {
        if (activePanel) { activePanel.remove(); activePanel = null; }
        trigger.classList.remove('projectgrid-header-focused-indicator');
      };
  
      // FIX: ATTACH INDICATOR HIGHLIGHT WHEN CELL TRIGGER CAPTURES ACTIVE FOCUS
      trigger.addEventListener('focus', () => {
        trigger.classList.add('projectgrid-header-focused-indicator');
      });
      trigger.addEventListener('blur', () => {
        setTimeout(() => {
          if (!activePanel) trigger.classList.remove('projectgrid-header-focused-indicator');
        }, 150);
      });
  
      const openPanel = () => {
        closePanel();
        selectionIdx = 0;
        trigger.classList.add('projectgrid-header-focused-indicator');
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
          if (oIdx === selectionIdx) wrapper.classList.add('projectgrid-row-focused');
          
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.tabIndex = -1;
          
          let visibleCount = 0;
          let totalCount = 0;
  
          // FIX: CALCULATE DYNAMIC VISIBLE/TOTAL VALUE METRICS FOR EACH DROPDOWN ITEM SELECTOR
          if (opt === '[ALL]') {
            checkbox.checked = (activeFilters.size === defaults.length);
            totalCount = rowsArray.length;
            visibleCount = rowsArray.filter(r => r.element.style.display !== 'none').length;
          } else {
            checkbox.checked = activeFilters.has(opt);
            rowsArray.forEach(r => {
              const currentVal = r.yamlMetadataValues && r.yamlMetadataValues[key] ? String(r.yamlMetadataValues[key]) : '⬛';
              const normOpt = opt === '⬛' ? '' : opt;
              const normCurrent = currentVal === '⬛' ? '' : currentVal;
              if (normCurrent === normOpt) {
                totalCount++;
                if (r.element.style.display !== 'none') visibleCount++;
              }
            });
          }
  
          checkbox.addEventListener('change', () => handleToggle(opt, checkbox.checked));
  
          wrapper.appendChild(checkbox);
          
          // Format layout string to display counts inside trailing tags: Icon {visible/total}
          const textLabel = document.createTextNode(` ${opt} {${visibleCount}/${totalCount}}`);
          wrapper.appendChild(textLabel);
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
  
        rowsArray.forEach(row => {
          if (!row.dropdownFilters) row.dropdownFilters = {};
          const currentVal = row.yamlMetadataValues && row.yamlMetadataValues[key] ? String(row.yamlMetadataValues[key]) : '⬛';
          row.dropdownFilters[key] = activeFilters.has(currentVal) || (currentVal === '⬛' && activeFilters.has('⬛'));
        });
  
        if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
      };
  
      function handlePanelKeys(evt) {
        if (!activePanel) return;
        if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp') {
          evt.preventDefault(); evt.stopPropagation();
          selectionIdx = evt.key === 'ArrowDown' ? ((selectionIdx + 1) % fullOptionsList.length) : ((selectionIdx - 1 + fullOptionsList.length) % fullOptionsList.length);
          activePanel.querySelectorAll('.projectgrid-dropup-option').forEach((lbl, lIdx) => {
            lbl.className = lIdx === selectionIdx ? 'projectgrid-dropup-option projectgrid-row-focused' : 'projectgrid-dropup-option';
          });
        } else if (evt.key === ' ' || evt.key === 'Spacebar') {
          evt.preventDefault();
          const cb = activePanel.querySelectorAll('input[type="checkbox"]')[selectionIdx];
          cb.checked = !cb.checked;
          handleToggle(fullOptionsList[selectionIdx], cb.checked);
        } else if (evt.key === 'Enter' || evt.key === 'Escape') {
          evt.preventDefault();
          trigger.removeEventListener('keydown', handlePanelKeys);
          closePanel();
          trigger.focus();
        }
      }
  
      trigger.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.projectgrid-dropup-panel').forEach(p => p.remove());
        if (activePanel) closePanel(); else openPanel();
      });
  
      trigger.addEventListener('blur', () => {
        setTimeout(() => {
          if (activePanel && !activePanel.contains(document.activeElement)) {
            trigger.removeEventListener('keydown', handlePanelKeys);
            closePanel();
          }
        }, 150);
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
  