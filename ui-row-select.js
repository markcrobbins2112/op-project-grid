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

    const closeDropdown = () => { if (activeDropdown) { activeDropdown.remove(); activeDropdown = null; } };

    const openDropdown = () => {
      closeDropdown();
      activeDropdown = document.createElement('ul');
      activeDropdown.className = 'projectgrid-custom-dropdown-list';
      
      const rect = btn.getBoundingClientRect();
      Object.assign(activeDropdown.style, {
        position: 'fixed', top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`, width: `${rect.width}px`,
        zIndex: '200000', height: 'auto', maxHeight: 'none'
      });

      optionsList.forEach((opt, oIdx) => {
        const li = document.createElement('li');
        li.className = 'projectgrid-custom-dropdown-item';
        li.textContent = opt;
        
        // Items focus traces topmost overlay portal loop
        if (oIdx === selectionIdx && window.ProjectGridUpdateFocusOverlay) {
          setTimeout(() => window.ProjectGridUpdateFocusOverlay(li), 10);
        }

        li.addEventListener('mousedown', (e) => { e.preventDefault(); commitSelection(opt); });
        activeDropdown.appendChild(li);
      });
      document.body.appendChild(activeDropdown);
    };

    const commitSelection = async (value) => {
      const fileAbstract = app.vault.getAbstractFileByPath(expectedNotePath);
      const finalVal = value === '⬛' ? '' : value;
      if (fileAbstract) {
        await app.fileManager.processFrontMatter(fileAbstract, (fm) => {
          if (finalVal === '') { delete fm[cfg.key]; rowTrackingReference.yamlMetadataValues[cfg.key] = '⬛'; }
          else { fm[cfg.key] = finalVal; rowTrackingReference.yamlMetadataValues[cfg.key] = finalVal; }
        });
        btn.textContent = value; closeDropdown();
        if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
        const siblingButtons = tableRow.querySelectorAll('.projectgrid-custom-select-btn');
        if (fieldIdx + 1 < siblingButtons.length) siblingButtons[fieldIdx + 1].focus();
        else filterInput.focus();
      }
    };

    // FIX: BUTTON INTERFACE TRIGGERS MIDDLE INPUTS OVERLAY AND ASSIGNS BASE MATRICES OVERLAY TO THE ACTIVE ROW
    btn.addEventListener('focus', () => {
      openDropdown();
      if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(btn);
      if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(tableRow);
    });
    
    btn.addEventListener('blur', () => {
      setTimeout(closeDropdown, 120);
      if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(null);
      if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(null);
      if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
    });
    
    btn.addEventListener('mousedown', (e) => { e.stopPropagation(); btn.focus(); });

    btn.addEventListener('keydown', (evt) => {
      if (activeDropdown) {
        if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp') {
          evt.preventDefault();
          selectionIdx = evt.key === 'ArrowDown' ? ((selectionIdx + 1) % optionsList.length) : ((selectionIdx - 1 + optionsList.length) % optionsList.length);
          
          const items = activeDropdown.querySelectorAll('.projectgrid-custom-dropdown-item');
          if (items[selectionIdx] && window.ProjectGridUpdateFocusOverlay) {
            window.ProjectGridUpdateFocusOverlay(items[selectionIdx]);
          }
          return;
        } else if (evt.key === 'Enter') { evt.preventDefault(); commitSelection(optionsList[selectionIdx]); return; }
        else if (evt.key === 'Escape') { evt.preventDefault(); closeDropdown(); btn.focus(); return; }
      }
      if (!activeDropdown) {
        if (evt.key === 'ArrowDown' && evt.altKey) { evt.preventDefault(); openDropdown(); return; }
        UiRowKeys.handleClosedNavigation(evt, btn, tableRow, fieldIdx, cfg, filterInput);
      }
    });

    cell.appendChild(btn);
  }
};

// ==========================================
// END OF FILE: ui-row-select.js
// ==========================================
