// ==========================================
// START OF FILE: ui-row.js
// ==========================================

const UiColor = require('./ui-color');

module.exports = {
  buildRow(folder, absoluteVaultRoot, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput) {
    const absoluteLocalPath = `${absoluteVaultRoot}\\${folder.path}`.replace(/[/\\]+/g, '\\');
    const tableRow = document.createElement('tr');
    tableRow.className = 'projectgrid-matrix-row';

    // Column 1: Core Note hyperlink cell
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

    // Columns 2-4: Launcher cells with dedicated filtering metadata attributes
    rowTrackingReference.launcherValues = { dopus: 'Active', cursor: 'Active', obsidian: 'Active' };

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

    // Columns 5-12: YAML Metadata dropdown field configurations
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
      
      const select = document.createElement('select');
      select.className = 'projectgrid-yaml-select';
      select.setAttribute('data-field-index', fieldIdx);
      
      const rawVal = frontmatter && frontmatter[cfg.key] !== undefined ? String(frontmatter[cfg.key]) : '';
      rowTrackingReference.yamlMetadataValues[cfg.key] = rawVal || '⬛';

      let options = [...cfg.defaults];
      if (rawVal && !options.includes(rawVal)) options.push(rawVal);
      
      select.appendChild(new Option('⬛', ''));
      options.forEach(opt => select.appendChild(new Option(opt, opt)));
      select.value = rawVal;

      // FIX: FORCE DROPDOWN TO ALWAYS BE TALL ENOUGH TO REVEAL ALL ITEMS WITHOUT INTERNAL SCROLLBARS
      select.addEventListener('focus', () => {
        select.size = select.options.length; // Dynamically expands element height to completely match options count
        select.style.position = 'absolute';
        select.style.zIndex = '10005';
        select.style.height = 'auto'; // Breaks free from restricted row heights
      });

      const collapseSelector = () => {
        select.size = 1; // Snaps back safely to single row layout
        select.style.position = 'static';
        select.style.height = ''; 
      };

      select.addEventListener('blur', collapseSelector);

      select.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
          evt.preventDefault();
          collapseSelector();
          filterInput.focus();
        } else if (evt.key === 'ArrowDown' && evt.altKey) {
          evt.preventDefault();
          select.focus();
        } else if (!cfg.isExtendable && (evt.key === 'ArrowRight' || evt.key === 'ArrowLeft')) {
          evt.preventDefault();
          collapseSelector();
          const rowSelects = tableRow.querySelectorAll('.projectgrid-yaml-select');
          let nextIdx = fieldIdx + (evt.key === 'ArrowRight' ? 1 : -1);
          if (nextIdx >= 0 && nextIdx < rowSelects.length) rowSelects[nextIdx].focus();
        }
      });

      select.addEventListener('change', async () => {
        const fileAbstract = app.vault.getAbstractFileByPath(expectedNotePath);
        if (fileAbstract) {
          await app.fileManager.processFrontMatter(fileAbstract, (fm) => {
            if (select.value === '') {
              delete fm[cfg.key];
              rowTrackingReference.yamlMetadataValues[cfg.key] = '⬛';
            } else {
              fm[cfg.key] = select.value;
              rowTrackingReference.yamlMetadataValues[cfg.key] = select.value;
            }
          });
          
          collapseSelector();
          if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
          
          const rowSelects = tableRow.querySelectorAll('.projectgrid-yaml-select');
          if (fieldIdx + 1 < rowSelects.length) rowSelects[fieldIdx + 1].focus();
          else filterInput.focus();
        }
      });

      cell.appendChild(select);
      tableRow.appendChild(cell);
    });

    return tableRow;
  }
};

// ==========================================
// END OF FILE: ui-row.js
// ==========================================
