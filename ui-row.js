// ==========================================
// START OF FILE: ui-row.js
// ==========================================

const UiColor = require('./ui-color');

module.exports = {
  buildRow(folder, absoluteVaultRoot, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput) {
    const absoluteLocalPath = `${absoluteVaultRoot}\\${folder.path}`.replace(/[/\\]+/g, '\\');
    const tableRow = document.createElement('tr');
    tableRow.className = 'projectgrid-matrix-row';

    const noteCell = document.createElement('td');
    noteCell.className = 'projectgrid-matrix-cell note-title-cell';
    const fileAnchor = document.createElement('a');
    fileAnchor.className = 'internal-link projectgrid-matrix-link';
    fileAnchor.setAttribute('data-href', expectedNotePath);
    fileAnchor.textContent = `+${folder.name}.md`;
    
    fileAnchor.style.color = UiColor.getColorForFirstCharacter(folder.name);
    
    fileAnchor.addEventListener('click', (evt) => {
      evt.preventDefault();
      app.workspace.openLinkText(expectedNotePath, '', false);
    });
    noteCell.appendChild(fileAnchor);
    tableRow.appendChild(noteCell);

    // Columns 2, 3, 4: Standard Launcher links mapping the 3 action protocols
    const actions = [
      { protocol: 'dopus', icon: '📁', title: 'Open folder in Directory Opus' },
      { protocol: 'cursor', icon: '💻', title: 'Open workspace in Cursor' },
      { protocol: 'obsidian', icon: '💜', title: 'Open directory as Obsidian Vault' }
    ];

    actions.forEach(act => {
      const cell = document.createElement('td');
      cell.className = 'projectgrid-matrix-cell action-icon-cell';
      cell.innerHTML = `<a href="aip://${act.protocol}/${absoluteLocalPath}" class="projectgrid-aip-icon-btn" title="${act.title}">${act.icon}</a>`;
      tableRow.appendChild(cell);
    });

    // Columns 5 through 12: Matches the 8 exact frontmatter keys with corrected option values
    const fieldsConfig = [
      { key: 'stars', defaults: ['0⭐','1⭐','2⭐','3⭐','4⭐','5⭐'], isExtendable: false },
      { key: 'value', defaults: ['0💲','1💲','2💲','3💲','4💲','5💲','6💲','7💲','8💲','9💲'], isExtendable: false },
      { key: 'size', defaults: ['0🐘','1🐘','2🐘','3🐘','4🐘','5🐘'], isExtendable: false },
      { key: 'depth', defaults: ['0🎱','1🎱','2🎱','3🎱','4🎱','5🎱'], isExtendable: false },
      { key: 'priority', defaults: ['0🏅','1🏅','2🏅','3🏅','4🏅','5🏅'], isExtendable: false },
      { key: 'status', defaults: ['hold🛑', 'plan🌐', 'dev🛠', 'test🧪', 'ship📦'], isExtendable: false },
      { key: 'lang', defaults: ['js', 'ts', 'au3', 'ahk'], isExtendable: true },
      { key: 'target', defaults: ['ce', 'op', 'app', 'link'], isExtendable: true }
    ];

    rowTrackingReference.yamlMetadataValues = {};

    fieldsConfig.forEach((cfg, fieldIdx) => {
      const cell = document.createElement('td');
      cell.className = 'projectgrid-matrix-cell select-cell';
      
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

      const closeDropdown = () => {
        if (activeDropdown) { activeDropdown.remove(); activeDropdown = null; }
      };

      const openDropdown = () => {
        closeDropdown();
        activeDropdown = document.createElement('ul');
        activeDropdown.className = 'projectgrid-custom-dropdown-list';
        
        const rect = btn.getBoundingClientRect();
        activeDropdown.style.position = 'fixed';
        activeDropdown.style.top = `${rect.bottom + window.scrollY}px`;
        activeDropdown.style.left = `${rect.left + window.scrollX}px`;
        activeDropdown.style.width = `${Math.max(rect.width, 100)}px`;
        activeDropdown.style.zIndex = '200000';
        
        optionsList.forEach((opt, oIdx) => {
          const li = document.createElement('li');
          li.className = 'projectgrid-custom-dropdown-item';
          li.textContent = opt;
          
          if (oIdx === selectionIdx) li.classList.add('projectgrid-row-focused');
          
          li.addEventListener('mousedown', (e) => {
            e.preventDefault();
            commitSelection(opt);
          });
          activeDropdown.appendChild(li);
        });
        
        document.body.appendChild(activeDropdown);
      };

      const commitSelection = async (value) => {
        const fileAbstract = app.vault.getAbstractFileByPath(expectedNotePath);
        const finalVal = value === '⬛' ? '' : value;
        
        if (fileAbstract) {
          await app.fileManager.processFrontMatter(fileAbstract, (fm) => {
            if (finalVal === '') {
              delete fm[cfg.key];
              rowTrackingReference.yamlMetadataValues[cfg.key] = '⬛';
            } else {
              fm[cfg.key] = finalVal;
              rowTrackingReference.yamlMetadataValues[cfg.key] = finalVal;
            }
          });
          
          btn.textContent = value;
          closeDropdown();
          if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
          
          const siblingButtons = tableRow.querySelectorAll('.projectgrid-custom-select-btn');
          if (fieldIdx + 1 < siblingButtons.length) {
            siblingButtons[fieldIdx + 1].focus();
          } else {
            filterInput.focus();
          }
        }
      };

      btn.addEventListener('blur', () => {
        setTimeout(closeDropdown, 120);
      });
      btn.addEventListener('mousedown', (e) => { 
        e.stopPropagation(); 
        btn.focus();
        if (activeDropdown) closeDropdown(); else openDropdown(); 
      });

      btn.addEventListener('keydown', (evt) => {
        if (activeDropdown) {
          if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp') {
            evt.preventDefault();
            if (evt.key === 'ArrowDown') {
              selectionIdx = (selectionIdx + 1) >= optionsList.length ? 0 : selectionIdx + 1;
            } else {
              selectionIdx = (selectionIdx - 1) < 0 ? optionsList.length - 1 : selectionIdx - 1;
            }

            activeDropdown.querySelectorAll('.projectgrid-custom-dropdown-item').forEach((li, lIdx) => {
              if (lIdx === selectionIdx) li.classList.add('projectgrid-row-focused');
              else li.classList.remove('projectgrid-row-focused');
            });
            return;
          } else if (evt.key === 'Enter') {
            evt.preventDefault();
            commitSelection(optionsList[selectionIdx]);
            return;
          } else if (evt.key === 'Escape') {
            evt.preventDefault();
            closeDropdown();
            btn.focus();
            return;
          }
        }

        if (!activeDropdown) {
          if (evt.key === 'Escape') {
            evt.preventDefault();
            filterInput.focus();
          } else if (evt.key === 'Tab') {
            evt.preventDefault();
            const siblingButtons = tableRow.querySelectorAll('.projectgrid-custom-select-btn');
            let nextIdx = fieldIdx + (evt.shiftKey ? -1 : 1);
            
            if (nextIdx >= 0 && nextIdx < siblingButtons.length) {
              siblingButtons[nextIdx].focus();
            } else if (nextIdx < 0) {
              filterInput.focus();
            }
          } else if (evt.key === 'ArrowDown' && evt.altKey) {
            evt.preventDefault();
            openDropdown();
          } else if (!cfg.isExtendable && (evt.key === 'ArrowRight' || evt.key === 'ArrowLeft')) {
            evt.preventDefault();
            const siblingButtons = tableRow.querySelectorAll('.projectgrid-custom-select-btn');
            let nextIdx = fieldIdx + (evt.key === 'ArrowRight' ? 1 : -1);
            if (nextIdx >= 0 && nextIdx < siblingButtons.length) siblingButtons[nextIdx].focus();
          }
        }
      });

      cell.appendChild(btn);
      tableRow.appendChild(cell);
    });

    return tableRow;
  }
};

// ==========================================
// END OF FILE: ui-row.js
// ==========================================
