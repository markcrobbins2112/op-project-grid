module.exports = {
    generateHeaderCell() {
      const noteHeaderCell = document.createElement('th');
      noteHeaderCell.style.width = '55%';
      
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
  
    buildRow(folder, absoluteVaultRoot, expectedNotePath, appWorkspace) {
      const absoluteLocalPath = `${absoluteVaultRoot}\\${folder.path}`.replace(/[/\\]+/g, '\\');
      const tableRow = document.createElement('tr');
      tableRow.className = 'projectgrid-matrix-row';
  
      // Note cell mapping
      const noteCell = document.createElement('td');
      noteCell.className = 'projectgrid-matrix-cell note-title-cell';
      const fileAnchor = document.createElement('a');
      fileAnchor.className = 'internal-link projectgrid-matrix-link';
      fileAnchor.setAttribute('data-href', expectedNotePath);
      fileAnchor.textContent = `+${folder.name}.md`;
      
      fileAnchor.addEventListener('click', (evt) => {
        evt.preventDefault();
        appWorkspace.openLinkText(expectedNotePath, '', false);
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
  
      return tableRow;
    }
  };
  