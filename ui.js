// ==========================================
// START OF FILE: ui.js
// ==========================================

module.exports = {
    generateHeaderCell() {
      const noteHeaderCell = document.createElement('th');
      noteHeaderCell.style.width = '25%';
      
      const filterContainer = document.createElement('div');
      filterContainer.className = 'projectgrid-filter-wrapper';
  
      const filterInput = document.createElement('input');
      filterInput.type = 'text';
      filterInput.placeholder = 'Filter notes...';
      filterInput.className = 'projectgrid-filter-input';
  
      const clearButton = document.createElement('span');
      clearButton.className = 'projectgrid-clear-btn';
      clearButton.innerHTML = '✕';
  
      filterContainer.appendChild(filterInput);
      filterContainer.appendChild(clearButton);
      noteHeaderCell.appendChild(filterContainer);
  
      return { cell: noteHeaderCell, input: filterInput, clearBtn: clearButton };
    },
  
    buildHeaderDropup(titleIcon, key, defaults, rowsArray) {
      const th = document.createElement('th');
      th.style.width = '8%';
      th.style.textAlign = 'center';
      
      const trigger = document.createElement('div');
      trigger.className = 'projectgrid-header-dropup-trigger';
      trigger.setAttribute('data-key', key);
      trigger.textContent = titleIcon;
  
      const panel = document.createElement('div');
      panel.className = 'projectgrid-dropup-panel';
  
      const activeFilters = new Set(defaults);
  
      defaults.forEach(opt => {
        const wrapper = document.createElement('label');
        wrapper.className = 'projectgrid-dropup-option';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
  
        checkbox.addEventListener('change', () => {
          if (checkbox.checked) activeFilters.add(opt);
          else activeFilters.delete(opt);
          
          rowsArray.forEach(row => {
            if (!row.dropdownFilters) row.dropdownFilters = {};
            const currentVal = row.yamlMetadataValues && row.yamlMetadataValues[key] ? String(row.yamlMetadataValues[key]) : '⬛';
            row.dropdownFilters[key] = activeFilters.has(currentVal) || (currentVal === '⬛' && activeFilters.has('⬛'));
          });
  
          if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
        });
  
        wrapper.appendChild(checkbox);
        wrapper.appendChild(document.createTextNode(opt));
        panel.appendChild(wrapper);
      });
  
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.projectgrid-dropup-panel').forEach(p => { if(p !== panel) p.classList.remove('is-open'); });
        panel.classList.toggle('is-open');
      });
  
      document.addEventListener('click', () => panel.classList.remove('is-open'));
      th.appendChild(trigger);
      th.appendChild(panel);
      return th;
    },
  
    buildRow(folder, absoluteVaultRoot, expectedNotePath, app, frontmatter, rowTrackingReference) {
      const absoluteLocalPath = `${absoluteVaultRoot}\\${folder.path}`.replace(/[/\\]+/g, '\\');
      const tableRow = document.createElement('tr');
      tableRow.className = 'projectgrid-matrix-row';
  
      // Note Cell with Alphabetical Hue Spectral Multi-Mapping rules
      const noteCell = document.createElement('td');
      noteCell.className = 'projectgrid-matrix-cell note-title-cell';
      const fileAnchor = document.createElement('a');
      fileAnchor.className = 'internal-link projectgrid-matrix-link';
      fileAnchor.setAttribute('data-href', expectedNotePath);
      
      const cleanFileName = `+${folder.name}.md`;
      fileAnchor.textContent = cleanFileName;
  
      // --- AUTOMATED COLOR SHIFT ALGORITHM ---
      // A=0, Z=25, maps clean spectrum where Z bends back to Red (0 to 360 loop)
      const firstChar = folder.name.charAt(0).toLowerCase();
      let charCode = firstChar.charCodeAt(0) - 97; 
      if (charCode < 0 || charCode > 25) charCode = 0; // Fallback bound
      const hueAngle = Math.round((charCode / 26) * 360);
      fileAnchor.style.color = `hsl(${hueAngle}, 95%, 65%)`;
  
      fileAnchor.addEventListener('click', (evt) => {
        evt.preventDefault();
        app.workspace.openLinkText(expectedNotePath, '', false);
      });
      noteCell.appendChild(fileAnchor);
      tableRow.appendChild(noteCell);
  
      // Protocol launch cells
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
  
      // YAML Fields configuration with inverted number-first layouts
      const fieldsConfig = [
        { key: 'stars', defaults: ['0','1','2','3','4','5'], icon: '⭐', revOrder: true },
        { key: 'value', defaults: ['0','1','2','3','4','5','6','7','8','9'], icon: '💲', revOrder: true },
        { key: 'size', defaults: ['0','1','2','3','4','5'], icon: '🐘', revOrder: true },
        { key: 'depth', defaults: ['0','1','2','3','4','5'], icon: '🎱', revOrder: true },
        { key: 'priority', defaults: ['0','1','2','3','4','5'], icon: '🏅', revOrder: true },
        { key: 'status', defaults: ['hold🛑', 'plan🌐', 'dev🛠', 'test🧪', 'ship📦'], icon: '', revOrder: false },
        { key: 'lang', defaults: ['js', 'ts', 'au3', 'ahk'], icon: '', revOrder: false },
        { key: 'target', defaults: ['ce', 'op', 'app', 'link'], icon: '', revOrder: false }
      ];
  
      rowTrackingReference.yamlMetadataValues = {};
  
      fieldsConfig.forEach(cfg => {
        const cell = document.createElement('td');
        cell.className = 'projectgrid-matrix-cell select-cell';
        
        const select = document.createElement('select');
        select.className = 'projectgrid-yaml-select';
        
        const rawVal = frontmatter && frontmatter[cfg.key] !== undefined ? String(frontmatter[cfg.key]) : '';
        rowTrackingReference.yamlMetadataValues[cfg.key] = rawVal || '⬛';
  
        let options = [...cfg.defaults];
        if (rawVal && !options.includes(rawVal)) options.push(rawVal);
        
        // Null option shows a literal dark placeholder square emoji
        select.appendChild(new Option('⬛', ''));
        
        options.forEach(opt => {
          // Apply inverted alignment layouts so number parameters appear strictly before item emojis
          const displayLabel = (cfg.revOrder && cfg.icon) ? `${opt} ${cfg.icon}` : opt;
          select.appendChild(new Option(displayLabel, opt));
        });
        
        select.value = rawVal;
  
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
            if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
          }
        });
  
        cell.appendChild(select);
        tableRow.appendChild(cell);
      });
  
      return tableRow;
    }
  };
  
  // ==========================================
  // END OF FILE: ui.js
  // ==========================================
  