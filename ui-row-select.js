// ==========================================
// START OF FILE: ui-row-select.js
// ==========================================

const UiRowKeys = require('./ui-row-keys');
const UiRowSelectDom = require('./ui-row-select-dom');
const UiRowSelectState = require('./ui-row-select-state');
const UiRowSelectHandlers = require('./ui-row-select-handlers');
const UiRowSelectKeys = require('./ui-row-select-keys');
const TasksMarkdownSync = require('./tasks-markdown-sync');
const TasksMarkdownWriter = require('./tasks-markdown-writer');

module.exports = {
  buildSelectButton(cell, tableRow, fieldIdx, cfg, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput) {
    const btn = document.createElement('div');
    btn.className = 'projectgrid-custom-select-btn';
    btn.tabIndex = 0; btn.setAttribute('data-field-index', fieldIdx);

    const state = UiRowSelectState.initializeButtonState(btn, cfg, frontmatter, rowTrackingReference);
    let activeDropdown = null; let isOpening = false; const ctx = { selectionIdx: 0 };

    const closeDropdown = () => { if (activeDropdown) { activeDropdown.remove(); activeDropdown = null; } if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null); };
    UiRowSelectHandlers.bindLifecycleFocus(btn, tableRow, closeDropdown);

    const openDropdown = () => {
      if (activeDropdown) return;
      isOpening = true; document.querySelectorAll('.projectgrid-dropup-panel').forEach(p => p.remove());
      ctx.selectionIdx = 0;

      activeDropdown = UiRowSelectDom.createDropdownContainer(btn, cfg.key);
      let customInput = cfg.isExtendable ? UiRowSelectDom.buildCustomInput(activeDropdown) : null;

      const scrollingContainer = document.createElement('div');
      scrollingContainer.style.overflowY = 'auto'; scrollingContainer.style.flex = '1';
      UiRowSelectDom.populateItemsList(scrollingContainer, state.optionsList, state.isMarkdownFileTarget, state.activeValuesArray);
      activeDropdown.appendChild(scrollingContainer); document.body.appendChild(activeDropdown);

      ctx.updateVisualSelection = (forcedIdx = null) => {
        if (forcedIdx !== null) ctx.selectionIdx = forcedIdx;
        const itemsList = scrollingContainer.querySelectorAll('.projectgrid-custom-dropdown-item');
        itemsList.forEach((li, lIdx) => {
          const isSel = lIdx === ctx.selectionIdx;
          li.classList.toggle('projectgrid-picker-highlight', isSel); li.classList.toggle('projectgrid-row-focused', isSel);
          if (isSel && window.ProjectGridUpdateFocusOverlay) { window.ProjectGridUpdateFocusOverlay(li); li.scrollIntoView({ block: 'nearest' }); }
        });
      };

      const onKeyEnterCommit = async (typedValue, isInputNode) => {
        if (state.isMarkdownFileTarget) {
          if (isInputNode && typedValue !== '') {
            await globalThis.TasksMarkdownWriter.appendAndRefreshVault(app, expectedNotePath, typedValue, btn, scrollingContainer, state.optionsList, state.activeValuesArray, ctx.updateVisualSelection);
            customInput.value = ''; return;
          }
          const targetVal = state.optionsList[ctx.selectionIdx];
          if (state.activeValuesArray.includes(targetVal)) state.activeValuesArray = state.activeValuesArray.filter(v => v !== targetVal);
          else state.activeValuesArray.push(targetVal);
          const cb = scrollingContainer.querySelectorAll('.projectgrid-custom-dropdown-item')[ctx.selectionIdx]?.querySelector('input[type="checkbox"]');
          if (cb) cb.checked = state.activeValuesArray.includes(targetVal);
          await commitSelection(state.activeValuesArray.join(', '), targetVal, state.activeValuesArray.includes(targetVal));
        } else {
          if (isInputNode && typedValue !== '') commitSelection(typedValue); else commitSelection(state.optionsList[ctx.selectionIdx]);
        }
      };

      UiRowSelectKeys.setupKeyboardRouting(ctx, state.optionsList, state.isMarkdownFileTarget, scrollingContainer, customInput, onKeyEnterCommit, () => { closeDropdown(); btn.focus(); });

      // FIXED: Bind mouse clicks linearly on initial panel opening pass. No MutationObserver infinite loops.
      scrollingContainer.querySelectorAll('.projectgrid-custom-dropdown-item').forEach((item, idx) => {
        item.addEventListener('click', async (e) => {
          e.preventDefault(); e.stopPropagation(); ctx.selectionIdx = idx;
          if (state.isMarkdownFileTarget) {
            const targetVal = state.optionsList[idx];
            if (state.activeValuesArray.includes(targetVal)) state.activeValuesArray = state.activeValuesArray.filter(v => v !== targetVal);
            else state.activeValuesArray.push(targetVal);
            const cb = item.querySelector('input[type="checkbox"]'); if (cb) cb.checked = state.activeValuesArray.includes(targetVal);
            await commitSelection(state.activeValuesArray.join(', '), targetVal, state.activeValuesArray.includes(targetVal)); ctx.updateVisualSelection();
          } else { commitSelection(state.optionsList[idx]); }
        });
      });

      if (customInput) requestAnimationFrame(() => customInput.focus());
      else { activeDropdown.tabIndex = 0; requestAnimationFrame(() => activeDropdown.focus()); }
      setTimeout(() => { ctx.updateVisualSelection(); isOpening = false; }, 20);
    };

    const commitSelection = async (value, targetString = '', isChecked = false) => {
      const fileAbstract = app.vault.getAbstractFileByPath(expectedNotePath);
      if (fileAbstract) {
        if (state.isMarkdownFileTarget && targetString) {
          const rawContent = await app.vault.read(fileAbstract);
          const updatedText = globalThis.TasksMarkdownSync.mutateMarkdownCheckboxes(rawContent.split('\n'), targetString, isChecked);
          await app.vault.modify(fileAbstract, updatedText);
        } else {
          await app.fileManager.processFrontMatter(fileAbstract, (fm) => { if (value === '' || value === '⬛') delete fm[cfg.key]; else fm[cfg.key] = value; });
        }
        if (state.isMarkdownFileTarget) { btn.textContent = `${state.activeValuesArray.length}/${state.optionsList.length}`; } 
        else { btn.textContent = value; }
        if (rowTrackingReference && rowTrackingReference.yamlMetadataValues) rowTrackingReference.yamlMetadataValues[cfg.key] = btn.textContent;
        if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
      }
    };

    this._triggerDirectCommit = commitSelection;
    btn.addEventListener('mousedown', (e) => { e.stopPropagation(); if (activeDropdown && !isOpening) closeDropdown(); else { btn.focus(); openDropdown(); } });
    btn.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') { evt.preventDefault(); evt.stopPropagation(); evt.stopImmediatePropagation(); btn.blur(); const rootContainer = btn.closest('.block-language-projectgrid') || document; const targetInput = rootContainer.querySelector('.projectgrid-filter-input'); if (targetInput) requestAnimationFrame(() => { targetInput.focus(); targetInput.select(); }); return; }
      if (!activeDropdown) { if (evt.key === 'Enter' || evt.key === ' ' || evt.key === 'Spacebar') { evt.preventDefault(); openDropdown(); return; } const handled = UiRowKeys.handleClosedNavigation(evt, btn, tableRow, fieldIdx, cfg, filterInput); if (handled) { evt.preventDefault(); evt.stopPropagation(); } }
    }, true);

    btn.openDropdown = openDropdown; cell.appendChild(btn);
  }
};

globalThis.UiRowSelect = module.exports;

// ==========================================
// END OF FILE: ui-row-select.js
// ==========================================
