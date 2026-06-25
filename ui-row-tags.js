// ==========================================
// START OF FILE: ui-row-tags.js
// ==========================================

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
  
      const closeTagsDropdown = () => {
        if (activeTagsDropdown) { activeTagsDropdown.remove(); activeTagsDropdown = null; }
        if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
      };
  
      const openTagsDropdown = () => {
        closeTagsDropdown();
        tagsSelectionIdx = 0;
        activeTagsDropdown = document.createElement('div');
        activeTagsDropdown.className = 'projectgrid-dropup-panel projectgrid-tags-portal-panel';
  
        const globalTagsSet = new Set();
        document.querySelectorAll('.projectgrid-tags-cell-btn').forEach(b => {
          if (b.textContent !== '⬛') {
            b.textContent.split(', ').forEach(t => globalTagsSet.add(t.trim()));
          }
        });
        const uniqueAvailableTags = Array.from(globalTagsSet).sort();
  
        const rect = tagsBtn.getBoundingClientRect();
        Object.assign(activeTagsDropdown.style, {
          position: 'fixed', top: `${rect.bottom + window.scrollY}px`,
          left: `${rect.left + window.scrollX}px`, width: '160px',
          zIndex: '250000', height: 'auto', maxHeight: '280px', display: 'flex', flexDirection: 'column'
        });
  
        const label = document.createElement('div');
        label.className = 'projectgrid-dropup-header-title';
        label.textContent = '🏷️ Multi-Select Tags';
        activeTagsDropdown.appendChild(label);
  
        const scrollingContainer = document.createElement('div');
        scrollingContainer.style.overflowY = 'auto';
        scrollingContainer.style.flex = '1';
  
        uniqueAvailableTags.forEach((tag, tIdx) => {
          const itemWrapper = document.createElement('label');
          itemWrapper.className = 'projectgrid-dropup-option';
  
          const cb = document.createElement('input');
          cb.type = 'checkbox';
          cb.checked = activeTagsArray.includes(tag);
          cb.tabIndex = -1;
  
          cb.addEventListener('change', () => toggleTagValue(tag, cb.checked));
  
          itemWrapper.appendChild(cb);
          itemWrapper.appendChild(document.createTextNode(tag));
          scrollingContainer.appendChild(itemWrapper);
        });
        activeTagsDropdown.appendChild(scrollingContainer);
  
        const inputWrapper = document.createElement('div');
        inputWrapper.className = 'projectgrid-tags-input-container';
        
        const customInput = document.createElement('input');
        customInput.type = 'text';
        customInput.className = 'projectgrid-tags-custom-entry-field';
        customInput.placeholder = '+ Add Custom Tag...';
        
        customInput.addEventListener('keydown', async (e) => {
          if (e.key === 'Enter') {
            e.preventDefault(); e.stopPropagation();
            const newTagText = customInput.value.trim().replace(/#/g, '');
            if (newTagText && !activeTagsArray.includes(newTagText)) {
              await toggleTagValue(newTagText, true);
              closeTagsDropdown(); tagsBtn.focus();
            }
          } else if (e.key === 'Escape') {
            e.preventDefault(); closeTagsDropdown(); tagsBtn.focus();
          }
        });
        
        inputWrapper.appendChild(customInput);
        activeTagsDropdown.appendChild(inputWrapper);
        document.body.appendChild(activeTagsDropdown);
  
        setTimeout(() => {
          const firstOpt = scrollingContainer.querySelector('.projectgrid-dropup-option');
          if (firstOpt && window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(firstOpt);
        }, 10);
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
  
      function handleTagsKeys(evt) {
        if (!activeTagsDropdown) return;
        const options = activeTagsDropdown.querySelectorAll('.projectgrid-dropup-option');
  
        if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp') {
          evt.preventDefault(); evt.stopPropagation();
          if (options.length === 0) return;
          tagsSelectionIdx = evt.key === 'ArrowDown' ? ((tagsSelectionIdx + 1) % options.length) : ((tagsSelectionIdx - 1 + options.length) % options.length);
  
          options.forEach((lbl, lIdx) => {
            if (lIdx === tagsSelectionIdx) {
              lbl.classList.add('projectgrid-row-focused');
              if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(lbl);
            } else { lbl.classList.remove('projectgrid-row-focused'); }
          });
        } else if (evt.key === ' ' || evt.key === 'Spacebar') {
          evt.preventDefault();
          if (options[tagsSelectionIdx]) {
            const cb = options[tagsSelectionIdx].querySelector('input[type="checkbox"]');
            cb.checked = !cb.checked;
            toggleTagValue(options[tagsSelectionIdx].textContent.trim(), cb.checked);
          }
        } else if (evt.key === 'Enter') {
          evt.preventDefault();
          const customField = activeTagsDropdown.querySelector('.projectgrid-tags-custom-entry-field');
          if (customField) customField.focus();
        } else if (evt.key === 'Escape') {
          evt.preventDefault(); closeTagsDropdown(); tagsBtn.focus();
        }
      }
  
      tagsBtn.addEventListener('focus', () => {
        openTagsDropdown();
        if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(tagsBtn);
        if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(tableRow);
      });
  
      tagsBtn.addEventListener('blur', () => {
        setTimeout(() => {
          if (activeTagsDropdown && !activeTagsDropdown.contains(document.activeElement)) {
            tagsBtn.removeEventListener('keydown', handleTagsKeys); closeTagsDropdown();
          }
        }, 150);
        if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(null);
        if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(null);
      });
  
      tagsBtn.addEventListener('mousedown', (e) => { e.stopPropagation(); tagsBtn.focus(); });
      tagsBtn.addEventListener('keydown', (evt) => {
        if (activeTagsDropdown) { handleTagsKeys(evt); return; }
        if (!activeTagsDropdown && evt.key === 'ArrowDown' && evt.altKey) { evt.preventDefault(); openTagsDropdown(); }
      });
  
      tagsCell.appendChild(tagsBtn);
      tableRow.appendChild(tagsCell);
    }
  };
  
  // ==========================================
  // END OF FILE: ui-row-tags.js
  // ==========================================
  