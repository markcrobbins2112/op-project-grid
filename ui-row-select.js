// ==========================================
// START OF FILE: ui-row-select.js
// ==========================================

const UiRowKeys = require('./ui-row-keys');

module.exports = {
  buildSelectButton(cell, tableRow, fieldIdx, cfg, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput) {
    const btn = document.createElement('div');
    btn.className = 'projectgrid-custom-select-btn';
    btn.tabIndex = 0;
    btn.setAttribute('data-field-index', fieldIdx);

    const rawVal = frontmatter && frontmatter[cfg.key] !== undefined ? String(frontmatter[cfg.key]) : '';
    rowTrackingReference.yamlMetadataValues[cfg.key] = rawVal || '⬛';
    btn.textContent = rawVal || '⬛';

    let optionsList = ['⬛', ...cfg.defaults];
    if (rawVal && !optionsList.includes(rawVal)) optionsList.push(rawVal);

    let activeDropdown = null;
    let selectionIdx = optionsList.indexOf(rawVal || '⬛');
    let isOpening = false;

    const closeDropdown = () => { 
      if (activeDropdown) { activeDropdown.remove(); activeDropdown = null; } 
      if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
    };

    const openDropdown = () => {
      if (activeDropdown) return;
      isOpening = true;
      
      document.querySelectorAll('.projectgrid-dropup-panel').forEach(p => p.remove());

      const cleanBtnText = btn.textContent.trim().split(' ')[0];
      selectionIdx = optionsList.indexOf(cleanBtnText);
      if (selectionIdx === -1) selectionIdx = 0;

      activeDropdown = document.createElement('div');
      activeDropdown.className = 'projectgrid-dropup-panel';
      
      const rect = btn.getBoundingClientRect();
      Object.assign(activeDropdown.style, {
        position: 'fixed', top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`, width: `${rect.width + 30}px`,
        zIndex: '200000', height: 'auto', display: 'flex', flexDirection: 'column'
      });

      const label = document.createElement('div');
      label.className = 'projectgrid-dropup-header-title';
      label.textContent = `📋 ${cfg.key.toUpperCase()}`;
      activeDropdown.appendChild(label);

      let customInput = null;
      if (cfg.isExtendable) {
        const inputWrapper = document.createElement('div');
        inputWrapper.className = 'projectgrid-tags-input-container';
        
        customInput = document.createElement('input');
        customInput.type = 'text';
        customInput.className = 'projectgrid-tags-custom-entry-field';
        customInput.placeholder = '➕ Filter / Add...';
        inputWrapper.appendChild(customInput);
        activeDropdown.appendChild(inputWrapper);
      }

      const scrollingContainer = document.createElement('div');
      scrollingContainer.style.overflowY = 'auto';
      scrollingContainer.style.flex = '1';

      optionsList.forEach((opt, oIdx) => {
        const li = document.createElement('div');
        li.className = 'projectgrid-custom-dropdown-item';
        li.textContent = opt;
        scrollingContainer.appendChild(li);
      });
      activeDropdown.appendChild(scrollingContainer);
      document.body.appendChild(activeDropdown);

      const items = scrollingContainer.querySelectorAll('.projectgrid-custom-dropdown-item');
      
      const updateVisualSelection = () => {
        items.forEach((li, lIdx) => {
          if (lIdx === selectionIdx) {
            li.classList.add('projectgrid-picker-highlight');
            li.classList.add('projectgrid-row-focused');
            if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(li);
            li.scrollIntoView({ block: 'nearest' });
          } else { 
            li.classList.remove('projectgrid-picker-highlight');
            li.classList.remove('projectgrid-row-focused');
          }
        });
      };

      if (customInput) {
        customInput.focus();
        customInput.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault(); e.stopPropagation();
            selectionIdx = e.key === 'ArrowDown' ? ((selectionIdx + 1) % optionsList.length) : ((selectionIdx - 1 + optionsList.length) % optionsList.length);
            updateVisualSelection();
          } else if (e.key === 'Enter') {
            e.preventDefault(); e.stopPropagation();
            const val = customInput.value.trim();
            if (val === '') commitSelection(optionsList[selectionIdx]);
            else commitSelection(val);
          } else if (e.key === 'Escape') { 
            // STAGE 1: Escape inside dynamic list inputs closes the list and highlights the cell button
            e.preventDefault(); e.stopPropagation();
            closeDropdown(); 
            btn.focus(); 
          }
        });
      } else {
        activeDropdown.tabIndex = 0;
        requestAnimationFrame(() => {
          if (activeDropdown) activeDropdown.focus();
        });

        activeDropdown.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault(); e.stopPropagation();
            selectionIdx = e.key === 'ArrowDown' ? ((selectionIdx + 1) % optionsList.length) : ((selectionIdx - 1 + optionsList.length) % optionsList.length);
            updateVisualSelection();
          } else if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault(); e.stopPropagation();
            commitSelection(optionsList[selectionIdx]);
          } else if (e.key === 'Escape') { 
            // STAGE 1: Escape inside standard list choices closes the list and highlights the cell button
            e.preventDefault(); e.stopPropagation();
            closeDropdown(); 
            btn.focus(); 
          }
        });
      }

      setTimeout(() => {
        updateVisualSelection();
        isOpening = false;
        if (window.ProjectGridTriggerTutorHelpBoxRedraw) {
          window.ProjectGridTriggerTutorHelpBoxRedraw(customInput || activeDropdown);
        }
      }, 20);
    };

    const commitSelection = async (value) => {
      const fileAbstract = app.vault.getAbstractFileByPath(expectedNotePath);
      const finalVal = value === '⬛' ? '' : value;
      if (fileAbstract) {
        await app.fileManager.processFrontMatter(fileAbstract, (fm) => {
          if (finalVal === '') delete fm[cfg.key];
          else fm[cfg.key] = finalVal;
        });
        btn.textContent = value; closeDropdown();
        
        const activeChain = window.ProjectGridActiveSortChainList || [];
        if (activeChain.includes(cfg.key) && window.ProjectGridTriggerSortReRun) window.ProjectGridTriggerSortReRun();
        else if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();

        btn.focus();
      }
    };

    btn.addEventListener('focus', () => {
      if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(btn);
      if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(tableRow);
      if (window.ProjectGridTriggerTutorHelpBoxRedraw) window.ProjectGridTriggerTutorHelpBoxRedraw(btn);
    });
    
    btn.addEventListener('blur', () => {
      setTimeout(() => { 
        if (activeDropdown && !activeDropdown.contains(document.activeElement) && document.activeElement !== btn) {
          closeDropdown(); 
        }
      }, 180);
      if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(null);
      if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(null);
    });
    
    btn.addEventListener('mousedown', (e) => { 
      e.stopPropagation(); 
      if (activeDropdown && !isOpening) {
        closeDropdown(); 
      } else { 
        btn.focus(); 
        openDropdown(); 
      } 
    });
    
    btn.addEventListener('keydown', (evt) => {
      if (!activeDropdown) {
        if (evt.key === 'Enter' || evt.key === ' ' || evt.key === 'Spacebar' || (evt.key === 'ArrowDown' && evt.altKey)) {
          evt.preventDefault(); openDropdown(); return;
        }
        // STAGE 2: If list is closed, delegate escape interception directly to the row keys system mapper
        UiRowKeys.handleClosedNavigation(evt, btn, tableRow, fieldIdx, cfg, filterInput);
      }
    });

    btn.openDropdown = openDropdown;

    cell.appendChild(btn);
  }
};

// ==========================================
// END OF FILE: ui-row-select.js
// ==========================================
