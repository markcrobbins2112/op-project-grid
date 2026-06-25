// ==========================================
// START OF FILE: ui-row-select.js
// ==========================================

const UiRowKeys = require('./ui-row-keys');
const UiRowSelectDom = require('./ui-row-select-dom');

module.exports = {
  buildSelectButton(cell, tableRow, fieldIdx, cfg, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput) {
    const btn = document.createElement('div');
    btn.className = 'projectgrid-custom-select-btn';
    btn.tabIndex = 0;
    btn.setAttribute('data-field-index', fieldIdx);

    const isMultiSelect = (cfg.type === 'multi-select' || cfg.key === 'tasks');
    const rawVal = frontmatter && frontmatter[cfg.key] !== undefined ? String(frontmatter[cfg.key]) : '';
    
    // Process initial values array state parameters
    let activeValuesArray = [];
    if (isMultiSelect && rawVal && rawVal !== '⬛') {
      activeValuesArray = rawVal.split(',').map(v => v.trim()).filter(v => v.length > 0);
    }

    // Set fallback values metrics text representations
    if (isMultiSelect) {
      const totalCount = cfg.defaults.filter(d => d !== '⬛').length;
      btn.textContent = `${activeValuesArray.length}/${totalCount}`;
      rowTrackingReference.yamlMetadataValues[cfg.key] = btn.textContent;
    } else {
      btn.textContent = rawVal || '⬛';
      rowTrackingReference.yamlMetadataValues[cfg.key] = rawVal || '⬛';
    }

    let optionsList = cfg.defaults.filter(d => d !== '⬛');
    if (!isMultiSelect) optionsList = ['⬛', ...optionsList];
    if (rawVal && !isMultiSelect && !optionsList.includes(rawVal)) optionsList.push(rawVal);

    let activeDropdown = null;
    let isOpening = false;

    const closeDropdown = () => { 
      if (activeDropdown) { activeDropdown.remove(); activeDropdown = null; } 
      if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
    };

    const openDropdown = () => {
      if (activeDropdown) return;
      isOpening = true;
      
      document.querySelectorAll('.projectgrid-dropup-panel').forEach(p => p.remove());
      let selectionIdx = 0;

      activeDropdown = UiRowSelectDom.createDropdownContainer(btn, cfg.key);

      let customInput = null;
      if (cfg.isExtendable) {
        customInput = UiRowSelectDom.buildCustomInput(activeDropdown);
      }

      const scrollingContainer = document.createElement('div');
      scrollingContainer.style.overflowY = 'auto';
      scrollingContainer.style.flex = '1';

      UiRowSelectDom.populateItemsList(scrollingContainer, optionsList, isMultiSelect, activeValuesArray);
      activeDropdown.appendChild(scrollingContainer);
      document.body.appendChild(activeDropdown);

      const items = scrollingContainer.querySelectorAll('.projectgrid-custom-dropdown-item');
      
      const updateVisualSelection = () => {
        items.forEach((li, lIdx) => {
          const isHighlighted = (lIdx === selectionIdx);
          li.classList.toggle('projectgrid-picker-highlight', isHighlighted);
          li.classList.toggle('projectgrid-row-focused', isHighlighted);
          if (isHighlighted && window.ProjectGridUpdateFocusOverlay) {
            window.ProjectGridUpdateFocusOverlay(li);
            li.scrollIntoView({ block: 'nearest' });
          }
        });
      };

      const handleKeyRouting = async (e, isInputNode) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault(); e.stopPropagation();
          selectionIdx = e.key === 'ArrowDown' ? ((selectionIdx + 1) % optionsList.length) : ((selectionIdx - 1 + optionsList.length) % optionsList.length);
          updateVisualSelection();
        } 
        else if (e.key === 'Enter' || (!isInputNode && (e.key === ' ' || e.key === 'Spacebar'))) {
          e.preventDefault(); e.stopPropagation();
          
          if (isMultiSelect) {
            const targetVal = optionsList[selectionIdx];
            if (activeValuesArray.includes(targetVal)) {
              activeValuesArray = activeValuesArray.filter(v => v !== targetVal);
            } else {
              activeValuesArray.push(targetVal);
            }
            
            // Re-render item checklist indicators on demand
            const cb = items[selectionIdx].querySelector('input[type="checkbox"]');
            if (cb) cb.checked = activeValuesArray.includes(targetVal);
            
            // Immediately commit value strings back to frontmatter
            await commitSelection(activeValuesArray.join(', '));
          } else {
            const val = isInputNode ? customInput.value.trim() : '';
            if (isInputNode && val !== '') commitSelection(val);
            else commitSelection(optionsList[selectionIdx]);
          }
        } 
        else if (e.key === 'Escape') { 
          e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
          closeDropdown(); 
          btn.focus(); 
        }
      };

      if (customInput) {
        requestAnimationFrame(() => { customInput.focus(); });
        customInput.addEventListener('keydown', (e) => handleKeyRouting(e, true));
      } else {
        activeDropdown.tabIndex = 0;
        requestAnimationFrame(() => { if (activeDropdown) activeDropdown.focus(); });
        activeDropdown.addEventListener('keydown', (e) => handleKeyRouting(e, false));
      }

      // Mouse click handlers for item selections
      items.forEach((item, idx) => {
        item.addEventListener('click', async (e) => {
          e.preventDefault(); e.stopPropagation();
          selectionIdx = idx;
          if (isMultiSelect) {
            const targetVal = optionsList[idx];
            if (activeValuesArray.includes(targetVal)) activeValuesArray = activeValuesArray.filter(v => v !== targetVal);
            else activeValuesArray.push(targetVal);
            const cb = item.querySelector('input[type="checkbox"]');
            if (cb) cb.checked = activeValuesArray.includes(targetVal);
            await commitSelection(activeValuesArray.join(', '));
            updateVisualSelection();
          } else {
            commitSelection(optionsList[idx]);
          }
        });
      });

      setTimeout(() => { updateVisualSelection(); isOpening = false; }, 20);
    };

    const commitSelection = async (value) => {
      const fileAbstract = app.vault.getAbstractFileByPath(expectedNotePath);
      if (fileAbstract) {
        await app.fileManager.processFrontMatter(fileAbstract, (fm) => {
          if (value === '' || value === '⬛') delete fm[cfg.key];
          else fm[cfg.key] = value;
        });

        if (isMultiSelect) {
          const totalCount = cfg.defaults.filter(d => d !== '⬛').length;
          btn.textContent = `${activeValuesArray.length}/${totalCount}`;
          rowTrackingReference.yamlMetadataValues[cfg.key] = btn.textContent;
        } else {
          btn.textContent = value;
          rowTrackingReference.yamlMetadataValues[cfg.key] = value;
        }

        const activeChain = window.ProjectGridActiveSortChainList || [];
        if (activeChain.includes(cfg.key) && window.ProjectGridTriggerSortReRun) window.ProjectGridTriggerSortReRun();
        else if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
      }
    };

    btn.addEventListener('focus', () => { if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(btn); if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(tableRow); });
    btn.addEventListener('blur', () => { setTimeout(() => { if (activeDropdown && !activeDropdown.contains(document.activeElement) && document.activeElement !== btn) closeDropdown(); }, 180); if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(null); if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(null); });
    btn.addEventListener('mousedown', (e) => { e.stopPropagation(); if (activeDropdown && !isOpening) closeDropdown(); else { btn.focus(); openDropdown(); } });
    
    btn.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault(); evt.stopPropagation(); evt.stopImmediatePropagation();
        btn.blur();
        const rootContainer = btn.closest('.block-language-projectgrid') || document;
        const targetInput = rootContainer.querySelector('.projectgrid-filter-input');
        if (targetInput) requestAnimationFrame(() => { targetInput.focus(); targetInput.select(); });
        return;
      }
      if (!activeDropdown) {
        if (evt.key === 'Enter' || evt.key === ' ' || evt.key === 'Spacebar') { evt.preventDefault(); openDropdown(); return; }
        const handled = UiRowKeys.handleClosedNavigation(evt, btn, tableRow, fieldIdx, cfg, filterInput);
        if (handled) { evt.preventDefault(); evt.stopPropagation(); }
      }
    }, true);

    btn.openDropdown = openDropdown;
    cell.appendChild(btn);
  }
};

// ==========================================
// END OF FILE: ui-row-select.js
// ==========================================
