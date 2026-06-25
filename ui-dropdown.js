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
      let isOpeningPanel = false;
  
      const closePanel = () => {
        if (activePanel) { activePanel.remove(); activePanel = null; }
        if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
      };
  
      const openPanel = () => {
        if (activePanel) return;
        isOpeningPanel = true;
        selectionIdx = 0;
        activePanel = document.createElement('div');
        activePanel.className = 'projectgrid-dropup-panel';
  
        const rect = trigger.getBoundingClientRect();
        Object.assign(activePanel.style, {
          position: 'fixed', bottom: `${window.innerHeight - rect.top + 4}px`,
          left: `${rect.left + window.scrollX}px`, zIndex: '300000', height: 'auto',
          display: 'flex', flexDirection: 'column', width: '150px'
        });
  
        // FIX 1: TITLE HEADER REDRAWN FIRST AT THE TOP LINE ROW
        const labelHeader = document.createElement('div');
        labelHeader.className = 'projectgrid-dropup-header-title';
        labelHeader.textContent = `📋 Columns: ${key.toUpperCase()}`;
        activePanel.appendChild(labelHeader);
  
        // FIX 2: SEARCH INPUT COMPONENT PLACED DIRECTLY BELOW TITLE BLOCK ROWS
        const inputWrapper = document.createElement('div');
        inputWrapper.className = 'projectgrid-tags-input-container';
        inputWrapper.style.borderTop = 'none';
        inputWrapper.style.borderBottom = '1px solid var(--background-modifier-border, #2e2e2e)';
        inputWrapper.style.marginBottom = '4px';
        
        const customInput = document.createElement('input');
        customInput.type = 'text';
        customInput.className = 'projectgrid-tags-custom-entry-field';
        customInput.placeholder = '➕ Filter options...';
        inputWrapper.appendChild(customInput);
        activePanel.appendChild(inputWrapper);
  
        const scrollingContainer = document.createElement('div');
        scrollingContainer.style.overflowY = 'auto';
        scrollingContainer.style.flex = '1';
  
        fullOptionsList.forEach((opt, oIdx) => {
          const wrapper = document.createElement('label');
          wrapper.className = 'projectgrid-dropup-option';
  
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.tabIndex = -1; 
          
          if (opt === '[ALL]') checkbox.checked = (activeFilters.size === defaults.length);
          else checkbox.checked = activeFilters.has(opt);
  
          checkbox.addEventListener('change', () => handleToggle(opt, checkbox.checked));
  
          wrapper.appendChild(checkbox);
          wrapper.appendChild(document.createTextNode(opt));
          scrollingContainer.appendChild(wrapper);
        });
        activePanel.appendChild(scrollingContainer);
        document.body.appendChild(activePanel);
  
        customInput.focus();
  
        customInput.addEventListener('keydown', (e) => {
          const options = scrollingContainer.querySelectorAll('.projectgrid-dropup-option');
  
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault(); e.stopPropagation();
            if (options.length === 0) return;
  
            selectionIdx = e.key === 'ArrowDown' ? ((selectionIdx + 1) % fullOptionsList.length) : ((selectionIdx - 1 + fullOptionsList.length) % fullOptionsList.length);
  
            options.forEach((lbl, lIdx) => {
              if (lIdx === selectionIdx) {
                lbl.classList.add('projectgrid-row-focused');
                if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(lbl);
                lbl.scrollIntoView({ block: 'nearest' });
              } else {
                lbl.classList.remove('projectgrid-row-focused');
              }
            });
          } else if (e.key === 'Enter') {
            e.preventDefault(); e.stopPropagation();
            const typedText = customInput.value.trim();
  
            // FIX 3: EMPTY TEXT FIELDS RUN ON ENTER KEY WILL TOGGLE THE HIGHLIGHTED CHOICE CHECKBOX
            if (typedText === '') {
              if (options[selectionIdx]) {
                const cb = options[selectionIdx].querySelector('input[type="checkbox"]');
                cb.checked = !cb.checked;
                handleToggle(fullOptionsList[selectionIdx], cb.checked);
              }
            } else {
              if (!fullOptionsList.includes(typedText)) {
                defaults.push(typedText);
                activeFilters.add(typedText);
                handleToggle(typedText, true);
              }
              closePanel();
              trigger.focus();
            }
          } else if (e.key === 'Escape' || (e.key === 'Enter' && e.ctrlKey)) {
            e.preventDefault(); e.stopPropagation();
            closePanel();
            trigger.focus();
          }
        });
  
        setTimeout(() => {
          isOpeningPanel = false;
          const firstOpt = scrollingContainer.querySelector('.projectgrid-dropup-option');
          if (firstOpt && window.ProjectGridUpdateFocusOverlay) {
            firstOpt.classList.add('projectgrid-row-focused');
            window.ProjectGridUpdateFocusOverlay(firstOpt);
          }
        }, 20);
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
          if (boxes && boxes.length > 0) {
            boxes[0].checked = (activeFilters.size === defaults.length);
            defaults.forEach((d, idx) => { if (boxes[idx + 1]) boxes[idx + 1].checked = activeFilters.has(d); });
          }
        }
  
        rowsArray.forEach(row => {
          if (!row.dropdownFilters) row.dropdownFilters = {};
          const rawVal = row.yamlMetadataValues && row.yamlMetadataValues[key] ? String(row.yamlMetadataValues[key]) : '⬛';
          const sanitizedRaw = rawVal.replace(/[⭐💲🐘🎱🏅🛑🌐🛠🧪📦]/g, '').trim();
  
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
  
      trigger.addEventListener('keydown', (evt) => {
        if (!activePanel) {
          if (evt.key === 'Enter' || evt.key === ' ' || (evt.key === 'ArrowDown' && evt.altKey) || evt.key === 'ArrowDown') {
            evt.preventDefault(); evt.stopPropagation();
            openPanel();
          }
        }
      });
  
      trigger.addEventListener('focus', () => {
        if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(trigger);
      });
      trigger.addEventListener('blur', () => {
        setTimeout(() => {
          if (activePanel && !activePanel.contains(document.activeElement)) { closePanel(); }
        }, 180);
        if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(null);
      });
  
      // FIX 4: COMBINED CLICKS DISPATCH LOCK TO ELIMINATE THE RAPID PROGRAMMATIC FOCUS JUMP COLLISION CLOSURES
      trigger.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        if (activePanel && !isOpeningPanel) {
          closePanel();
        } else {
          trigger.focus();
          openPanel();
        }
      });
  
      th.appendChild(trigger);
      return th;
    }
  };
  
  // ==========================================
  // END OF FILE: ui-dropdown.js
  // ==========================================
  