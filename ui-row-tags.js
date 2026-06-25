// ==========================================
// START OF FILE: ui-row-tags.js
// ==========================================

const UiRowKeys = require('./ui-row-keys');

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
      activeTagsDropdown = document.createElement('div');
      activeTagsDropdown.className = 'projectgrid-dropup-panel projectgrid-tags-portal-panel';

      const globalTagsSet = new Set();
      document.querySelectorAll('.projectgrid-tags-cell-btn').forEach(b => {
        if (b.textContent !== '⬛') b.textContent.split(', ').forEach(t => globalTagsSet.add(t.trim()));
      });
      const uniqueAvailableTags = Array.from(globalTagsSet).sort();

      const rect = tagsBtn.getBoundingClientRect();
      Object.assign(activeTagsDropdown.style, {
        position: 'fixed', top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`, width: '170px',
        zIndex: '250000', height: 'auto', maxHeight: '300px', display: 'flex', flexDirection: 'column'
      });

      const label = document.createElement('div');
      label.className = 'projectgrid-dropup-header-title';
      label.textContent = '🏷️ Multi-Select Tags';
      activeTagsDropdown.appendChild(label);

      const inputWrapper = document.createElement('div');
      inputWrapper.className = 'projectgrid-tags-input-container';
      
      const customInput = document.createElement('input');
      customInput.type = 'text'; customInput.className = 'projectgrid-tags-custom-entry-field';
      customInput.placeholder = '➕ Filter / Add Tag...';
      inputWrapper.appendChild(customInput);
      activeTagsDropdown.appendChild(inputWrapper);

      const scrollingContainer = document.createElement('div');
      scrollingContainer.style.overflowY = 'auto'; scrollingContainer.style.flex = '1';

      uniqueAvailableTags.forEach((tag, tIdx) => {
        const itemWrapper = document.createElement('label');
        itemWrapper.className = 'projectgrid-dropup-option';

        const cb = document.createElement('input');
        cb.type = 'checkbox'; cb.checked = activeTagsArray.includes(tag); cb.tabIndex = -1;
        cb.addEventListener('change', () => toggleTagValue(tag, cb.checked));

        itemWrapper.appendChild(cb); itemWrapper.appendChild(document.createTextNode(tag));
        scrollingContainer.appendChild(itemWrapper);
      });
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
            if (lIdx === tagsSelectionIdx) {
              lbl.classList.add('projectgrid-row-focused');
              if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(lbl);
              lbl.scrollIntoView({ block: 'nearest' });
            } else { lbl.classList.remove('projectgrid-row-focused'); }
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
        } else if (e.key === 'Escape' || (e.key === 'Enter' && e.ctrlKey)) {
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

    // FIX: CLOSED TAG ARROW KEY INTERCEPTOR TRIGGERS VERTICAL FOCUS ROW HOPS JUMPS
    tagsBtn.addEventListener('keydown', (evt) => {
      if (activeTagsDropdown) return;
      if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp') {
        UiRowKeys.jumpToVerticalRowCell(evt, tableRow, '.projectgrid-tags-cell-btn', 0);
      } else if (evt.key === 'Enter' || evt.key === ' ') {
        evt.preventDefault(); evt.stopPropagation(); openTagsDropdown();
      }
    });

    tagsBtn.addEventListener('focus', () => {
      if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(tagsBtn);
      if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(tableRow);
    });

    tagsBtn.addEventListener('blur', () => {
      setTimeout(() => { if (activeTagsDropdown && !activeTagsDropdown.contains(document.activeElement)) closeTagsDropdown(); }, 180);
      if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(null);
      if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(null);
    });

    tagsBtn.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      if (activeTagsDropdown && !isOpeningPanel) closeTagsDropdown();
      else { tagsBtn.focus(); openTagsDropdown(); }
    });

    tagsCell.appendChild(tagsBtn);
    tableRow.appendChild(tagsCell);
  }
};

// ==========================================
// END OF FILE: ui-row-tags.js
// ==========================================
