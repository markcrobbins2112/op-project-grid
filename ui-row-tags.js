// ==========================================
// START OF FILE: ui-row-tags.js
// ==========================================

const UiRowKeys = require('./ui-row-keys');
const UiRowTagsDom = require('./ui-row-tags-dom');

module.exports = {
  buildInteractiveTagsColumn(tableRow, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput) {
    const tagsCell = document.createElement('td');
    tagsCell.className = 'projectgrid-matrix-cell select-cell projectgrid-uniform-yaml-td';
    
    const tagsBtn = document.createElement('div');
    tagsBtn.className = 'projectgrid-custom-select-btn projectgrid-tags-cell-btn';
    tagsBtn.tabIndex = 0;

    let activeTagsArray = [];
    if (frontmatter && frontmatter.tags) {
      activeTagsArray = Array.isArray(frontmatter.tags) ? frontmatter.tags : String(frontmatter.tags).split(/[\s,]+/);
      activeTagsArray = activeTagsArray.map(t => String(t).trim()).filter(t => t.length > 0);
    }

    rowTrackingReference.yamlMetadataValues = rowTrackingReference.yamlMetadataValues || {};
    rowTrackingReference.yamlMetadataValues['tags'] = activeTagsArray.length > 0 ? activeTagsArray.join(', ') : '⬛';
    tagsBtn.textContent = activeTagsArray.length > 0 ? activeTagsArray.join(', ') : '⬛';

    let activeTagsDropdown = null;
    let tagsSelectionIdx = 0;
    let isOpeningPanel = false;

    const closeTagsDropdown = () => {
      if (activeTagsDropdown) { activeTagsDropdown.remove(); activeTagsDropdown = null; }
      if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
    };

    const openTagsDropdown = () => {
      if (activeTagsDropdown) return;
      isOpeningPanel = true; tagsSelectionIdx = 0;
      
      activeTagsDropdown = UiRowTagsDom.createTagsContainer(tagsBtn);
      const uniqueAvailableTags = UiRowTagsDom.gatherUniqueAvailableTags();

      const customInput = UiRowTagsDom.buildCustomInput(activeTagsDropdown);
      const scrollingContainer = document.createElement('div');
      scrollingContainer.style.overflowY = 'auto'; scrollingContainer.style.flex = '1';

      UiRowTagsDom.populateTagsList(scrollingContainer, uniqueAvailableTags, activeTagsArray, toggleTagValue);
      activeTagsDropdown.appendChild(scrollingContainer);
      document.body.appendChild(activeTagsDropdown);

      customInput.focus();

      customInput.addEventListener('keydown', async (e) => {
        const options = scrollingContainer.querySelectorAll('.projectgrid-dropup-option');

        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault(); e.stopPropagation();
          if (options.length === 0) return;
          tagsSelectionIdx = e.key === 'ArrowDown' ? ((tagsSelectionIdx + 1) % options.length) : ((tagsSelectionIdx - 1 + options.length) % options.length);

          options.forEach((lbl, lIdx) => {
            lbl.classList.toggle('projectgrid-row-focused', lIdx === tagsSelectionIdx);
            if (lIdx === tagsSelectionIdx && window.ProjectGridUpdateFocusOverlay) {
              window.ProjectGridUpdateFocusOverlay(lbl);
              lbl.scrollIntoView({ block: 'nearest' });
            }
          });
        } else if (e.key === 'Enter') {
          e.preventDefault(); e.stopPropagation();
          const typedText = customInput.value.trim().replace(/#/g, '');

          if (typedText === '') {
            if (options[tagsSelectionIdx]) {
              const cb = options[tagsSelectionIdx].querySelector('input[type="checkbox"]');
              cb.checked = !cb.checked;
              await toggleTagValue(options[tagsSelectionIdx].textContent.trim(), cb.checked);
            }
          } else {
            if (!activeTagsArray.includes(typedText)) await toggleTagValue(typedText, true);
            closeTagsDropdown(); tagsBtn.focus();
          }
        } else if (e.key === 'Escape') {
          e.preventDefault(); e.stopPropagation(); closeTagsDropdown(); tagsBtn.focus();
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

    const toggleTagValue = async (tag, isChecked) => {
      const fileAbstract = app.vault.getAbstractFileByPath(expectedNotePath);
      if (fileAbstract) {
        await app.fileManager.processFrontMatter(fileAbstract, (fm) => {
          let currentTags = fm.tags ? (Array.isArray(fm.tags) ? [...fm.tags] : String(fm.tags).split(/[\s,]+/)) : [];
          currentTags = currentTags.map(t => String(t).trim()).filter(t => t.length > 0);
          if (isChecked) { if (!currentTags.includes(tag)) currentTags.push(tag); } 
          else { currentTags = currentTags.filter(t => t !== tag); }
          if (currentTags.length === 0) delete fm.tags;
          else fm.tags = currentTags;
          activeTagsArray = currentTags;
        });
        const newLabel = activeTagsArray.length > 0 ? activeTagsArray.join(', ') : '⬛';
        tagsBtn.textContent = newLabel; tagsBtn.title = newLabel;
        rowTrackingReference.yamlMetadataValues['tags'] = newLabel;
        if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
      }
    };

    tagsBtn.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault(); evt.stopPropagation(); evt.stopImmediatePropagation();
        tagsBtn.blur();
        const rootContainer = tagsBtn.closest('.block-language-projectgrid') || document;
        const targetInput = rootContainer.querySelector('.projectgrid-filter-input');
        if (targetInput) requestAnimationFrame(() => { targetInput.focus(); targetInput.select(); });
        return;
      }
      if (!activeTagsDropdown) {
        if (evt.key === 'Enter' || evt.key === ' ' || evt.key === 'Spacebar') {
          evt.preventDefault(); evt.stopPropagation(); openTagsDropdown(); return;
        }
        const mockCfg = { key: 'tags', defaults: ['⬛'], isExtendable: true };
        const handled = UiRowKeys.handleClosedNavigation(evt, tagsBtn, tableRow, 7, mockCfg, filterInput);
        if (handled) { evt.preventDefault(); evt.stopPropagation(); }
      }
    }, true);

    tagsBtn.addEventListener('focus', () => { if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(tagsBtn); if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(tableRow); });
    tagsBtn.addEventListener('blur', () => { setTimeout(() => { if (activeTagsDropdown && !activeTagsDropdown.contains(document.activeElement) && document.activeElement !== tagsBtn) closeTagsDropdown(); }, 180); if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(null); if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(null); });
    tagsBtn.addEventListener('mousedown', (e) => { e.stopPropagation(); if (activeTagsDropdown && !isOpeningPanel) closeTagsDropdown(); else { tagsBtn.focus(); openTagsDropdown(); } });

    tagsCell.appendChild(tagsBtn);
    tableRow.appendChild(tagsCell);
  }
};

// ==========================================
// END OF FILE: ui-row-tags.js
// ==========================================
