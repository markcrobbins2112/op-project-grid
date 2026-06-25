// ==========================================
// START OF FILE: ui-row-select.js
// ==========================================

const UiRowKeys = require('./ui-row-keys');
const UiRowSelectDom = require('./ui-row-select-dom');

module.exports = {
  buildSelectButton(cell, tableRow, fieldIdx, cfg, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput) {
    const btn = document.createElement('div');
    btn.className = 'projectgrid-custom-select-btn';
    btn.tabIndex = 0; btn.setAttribute('data-field-index', fieldIdx);

    const isMarkdownFileTarget = (cfg.key === 'tasks');
    const rawVal = frontmatter && frontmatter[cfg.key] !== undefined ? String(frontmatter[cfg.key]) : '';
    let activeValuesArray = (rawVal && rawVal !== '⬛') ? rawVal.split(',').map(v => v.trim()).filter(v => v.length > 0) : [];

    if (isMarkdownFileTarget) {
      const totalCount = cfg.defaults.filter(d => d !== '⬛').length;
      btn.textContent = `${activeValuesArray.length}/${totalCount}`;
      rowTrackingReference.yamlMetadataValues[cfg.key] = btn.textContent;
    } else {
      btn.textContent = rawVal || '⬛'; rowTrackingReference.yamlMetadataValues[cfg.key] = rawVal || '⬛';
    }

    let optionsList = isMarkdownFileTarget ? cfg.defaults.filter(d => d !== '⬛') : ['⬛', ...cfg.defaults.filter(d => d !== '⬛')];
    if (rawVal && !isMarkdownFileTarget && !optionsList.includes(rawVal)) optionsList.push(rawVal);

    let activeDropdown = null; let isOpening = false;
    const closeDropdown = () => { if (activeDropdown) { activeDropdown.remove(); activeDropdown = null; } if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null); };

    const openDropdown = () => {
      if (activeDropdown) return;
      isOpening = true; document.querySelectorAll('.projectgrid-dropup-panel').forEach(p => p.remove());
      let selectionIdx = 0;

      activeDropdown = UiRowSelectDom.createDropdownContainer(btn, cfg.key);
      let customInput = cfg.isExtendable ? UiRowSelectDom.buildCustomInput(activeDropdown) : null;

      const scrollingContainer = document.createElement('div');
      scrollingContainer.style.overflowY = 'auto'; scrollingContainer.style.flex = '1';

      UiRowSelectDom.populateItemsList(scrollingContainer, optionsList, isMarkdownFileTarget, activeValuesArray);
      activeDropdown.appendChild(scrollingContainer); document.body.appendChild(activeDropdown);

      const items = scrollingContainer.querySelectorAll('.projectgrid-custom-dropdown-item');
      const updateVisualSelection = () => {
        items.forEach((li, lIdx) => {
          li.classList.toggle('projectgrid-picker-highlight', lIdx === selectionIdx);
          li.classList.toggle('projectgrid-row-focused', lIdx === selectionIdx);
          if (lIdx === selectionIdx && window.ProjectGridUpdateFocusOverlay) { window.ProjectGridUpdateFocusOverlay(li); li.scrollIntoView({ block: 'nearest' }); }
        });
      };

      const handleKeyRouting = async (e, isInputNode) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault(); e.stopPropagation();
          selectionIdx = e.key === 'ArrowDown' ? ((selectionIdx + 1) % optionsList.length) : ((selectionIdx - 1 + optionsList.length) % optionsList.length);
          updateVisualSelection();
        } else if (e.key === 'Enter' || (!isInputNode && (e.key === ' ' || e.key === 'Spacebar'))) {
          e.preventDefault(); e.stopPropagation();
          const val = isInputNode ? customInput.value.trim() : '';
          
          if (isMarkdownFileTarget) {
            // RESOLVE VIA GLOBAL SCOPE: Look up writer engine fallback variables directly from global context
            const activeWriter = globalThis.TasksMarkdownWriter;
            if (isInputNode && val !== '' && activeWriter) {
              await activeWriter.appendAndRefreshVault(app, expectedNotePath, val, btn);
              closeDropdown(); openDropdown(); return;
            }
            const targetVal = optionsList[selectionIdx];
            if (activeValuesArray.includes(targetVal)) activeValuesArray = activeValuesArray.filter(v => v !== targetVal);
            else activeValuesArray.push(targetVal);
            const cb = items[selectionIdx].querySelector('input[type="checkbox"]');
            if (cb) cb.checked = activeValuesArray.includes(targetVal);
            await commitSelection(activeValuesArray.join(', '), targetVal, activeValuesArray.includes(targetVal));
          } else {
            if (isInputNode && val !== '') commitSelection(val); else commitSelection(optionsList[selectionIdx]);
          }
        } else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation(); closeDropdown(); btn.focus(); }
      };

      if (customInput) { requestAnimationFrame(() => { customInput.focus(); }); customInput.addEventListener('keydown', (e) => handleKeyRouting(e, true)); }
      else { activeDropdown.tabIndex = 0; requestAnimationFrame(() => { if (activeDropdown) activeDropdown.focus(); }); activeDropdown.addEventListener('keydown', (e) => handleKeyRouting(e, false)); }

      items.forEach((item, idx) => {
        item.addEventListener('click', async (e) => {
          e.preventDefault(); e.stopPropagation(); selectionIdx = idx;
          if (isMarkdownFileTarget) {
            const targetVal = optionsList[idx];
            if (activeValuesArray.includes(targetVal)) activeValuesArray = activeValuesArray.filter(v => v !== targetVal);
            else activeValuesArray.push(targetVal);
            const cb = item.querySelector('input[type="checkbox"]');
            if (cb) cb.checked = activeValuesArray.includes(targetVal);
            await commitSelection(activeValuesArray.join(', '), targetVal, activeValuesArray.includes(targetVal));
            updateVisualSelection();
          } else { commitSelection(optionsList[idx]); }
        });
      });
      setTimeout(() => { updateVisualSelection(); isOpening = false; }, 20);
    };

    const commitSelection = async (value, targetString = '', isChecked = false) => {
      const fileAbstract = app.vault.getAbstractFileByPath(expectedNotePath);
      if (fileAbstract) {
        // RESOLVE VIA GLOBAL SCOPE: Look up sync engine fallback variables directly from global context
        const activeSyncEngine = globalThis.TasksMarkdownSync;
        if (isMarkdownFileTarget && targetString && activeSyncEngine) {
          const rawContent = await app.vault.read(fileAbstract);
          const updatedText = activeSyncEngine.mutateMarkdownCheckboxes(rawContent.split('\n'), targetString, isChecked);
          await app.vault.modify(fileAbstract, updatedText);
        } else {
          await app.fileManager.processFrontMatter(fileAbstract, (fm) => { if (value === '' || value === '⬛') delete fm[cfg.key]; else fm[cfg.key] = value; });
        }
        if (isMarkdownFileTarget) {
          const totalCount = cfg.defaults.filter(d => d !== '⬛').length;
          btn.textContent = `${activeValuesArray.length}/${totalCount}`;
          rowTrackingReference.yamlMetadataValues[cfg.key] = btn.textContent;
        } else { btn.textContent = value; rowTrackingReference.yamlMetadataValues[cfg.key] = value; }
        if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
      }
    };

    btn.addEventListener('focus', () => { if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(btn); if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(tableRow); });
    btn.addEventListener('blur', () => { setTimeout(() => { if (activeDropdown && !activeDropdown.contains(document.activeElement) && document.activeElement !== btn) closeDropdown(); }, 180); if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(null); if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(null); });
    btn.addEventListener('mousedown', (e) => { e.stopPropagation(); if (activeDropdown && !isOpening) closeDropdown(); else { btn.focus(); openDropdown(); } });
    btn.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') { evt.preventDefault(); evt.stopPropagation(); evt.stopImmediatePropagation(); btn.blur(); const rootContainer = btn.closest('.block-language-projectgrid') || document; const targetInput = rootContainer.querySelector('.projectgrid-filter-input'); if (targetInput) requestAnimationFrame(() => { targetInput.focus(); targetInput.select(); }); return; }
      if (!activeDropdown) { if (evt.key === 'Enter' || evt.key === ' ' || evt.key === 'Spacebar') { evt.preventDefault(); openDropdown(); return; } const handled = UiRowKeys.handleClosedNavigation(evt, btn, tableRow, fieldIdx, cfg, filterInput); if (handled) { evt.preventDefault(); evt.stopPropagation(); } }
    }, true);

    btn.openDropdown = openDropdown; cell.appendChild(btn);
  }
};

// ==========================================
// END OF FILE: ui-row-select.js
// ==========================================
