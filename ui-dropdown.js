// ==========================================
// START OF FILE: ui-dropdown.js
// ==========================================

const UiDropdownDom = require('./ui-dropdown-dom');

const uiDropdownModule = {
  activeDropdownInstances: {},

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
      if (window.ProjectGridTriggerTutorHelpBoxRedraw) window.ProjectGridTriggerTutorHelpBoxRedraw(null);
      document.removeEventListener('mousedown', handleOutsideClickGlobalClosure);
    };

    const handleOutsideClickGlobalClosure = (e) => {
      if (activePanel && !activePanel.contains(e.target) && !trigger.contains(e.target)) {
        closePanel();
      }
    };

    const openPanel = () => {
      if (activePanel) return;
      isOpeningPanel = true;
      
      document.querySelectorAll('.projectgrid-dropup-panel').forEach(p => p.remove());

      selectionIdx = 0;
      activePanel = UiDropdownDom.createPanelContainer(trigger);

      const labelHeader = document.createElement('div');
      labelHeader.className = 'projectgrid-dropup-header-title';
      labelHeader.textContent = `📋 Filters: ${key.toUpperCase()}`;
      activePanel.appendChild(labelHeader);

      const scrollingContainer = document.createElement('div');
      scrollingContainer.style.overflowY = 'auto';
      scrollingContainer.style.flex = '1';

      UiDropdownDom.buildOptionsList(scrollingContainer, fullOptionsList, defaults, activeFilters, handleToggle);
      activePanel.appendChild(scrollingContainer);
      document.body.appendChild(activePanel);

      activePanel.tabIndex = 0;
      activePanel.focus();

      activePanel.addEventListener('keydown', (e) => {
        const options = scrollingContainer.querySelectorAll('.projectgrid-dropup-option');
        if (options.length === 0) return;

        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault(); e.stopPropagation();
          selectionIdx = e.key === 'ArrowDown' ? ((selectionIdx + 1) % options.length) : ((selectionIdx - 1 + options.length) % options.length);
          
          options.forEach((lbl, lIdx) => {
            if (lIdx === selectionIdx) {
              lbl.classList.add('projectgrid-row-focused');
              if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(lbl);
              lbl.scrollIntoView({ block: 'nearest' });
            } else { lbl.classList.remove('projectgrid-row-focused'); }
          });
        } else if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter') {
          e.preventDefault(); e.stopPropagation();
          if (options[selectionIdx]) {
            const cb = options[selectionIdx].querySelector('input[type="checkbox"]');
            cb.checked = !cb.checked;
            handleToggle(fullOptionsList[selectionIdx], cb.checked);
          }
        } else if (e.key === 'Escape') {
          e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
          closePanel(); 
          trigger.focus();
        }
      });

      requestAnimationFrame(() => {
        document.addEventListener('mousedown', handleOutsideClickGlobalClosure);
        isOpeningPanel = false;
        if (activePanel) activePanel.focus();
        
        const firstOpt = scrollingContainer.querySelector('.projectgrid-dropup-option');
        if (firstOpt && window.ProjectGridUpdateFocusOverlay) {
          firstOpt.classList.add('projectgrid-row-focused');
          window.ProjectGridUpdateFocusOverlay(firstOpt);
        }
        if (window.ProjectGridTriggerTutorHelpBoxRedraw) window.ProjectGridTriggerTutorHelpBoxRedraw(activePanel, 'filter-panel');
      });
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
          if (sanitizedRaw === sanitizedFilter || (sanitizedRaw === '⬛' && sanitizedFilter === '⬛')) isMatchFound = true;
        });
        row.dropdownFilters[key] = isMatchFound;
      });
      if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
    };

    trigger.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault(); evt.stopPropagation(); evt.stopImmediatePropagation();
        trigger.blur();

        const rootContainer = trigger.closest('.block-language-projectgrid') || document;
        const targetInput = rootContainer.querySelector('.projectgrid-filter-input');
        
        if (targetInput) {
          requestAnimationFrame(() => { targetInput.focus(); targetInput.select(); });
        }
        return;
      }

      if (!activePanel) {
        if (evt.key === 'Enter' || evt.key === ' ' || (evt.key === 'ArrowDown' && evt.altKey) || evt.key === 'ArrowDown') {
          evt.preventDefault(); evt.stopPropagation(); openPanel();
        }
      }
    }, true);

    trigger.addEventListener('focus', () => {
      if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(trigger);
      if (window.ProjectGridTriggerTutorHelpBoxRedraw) window.ProjectGridTriggerTutorHelpBoxRedraw(trigger, 'filter-header');
    });

    trigger.addEventListener('mousedown', (e) => {
      e.preventDefault(); e.stopPropagation();
      if (activePanel && !isOpeningPanel) closePanel();
      else { trigger.focus(); openPanel(); }
    });

    this.activeDropdownInstances[key] = { open: openPanel, triggerElement: trigger };

    th.appendChild(trigger);
    return th;
  }
};

globalThis.UiDropdown = uiDropdownModule;
module.exports = uiDropdownModule;

// ==========================================
// END OF FILE: ui-dropdown.js
// ==========================================
