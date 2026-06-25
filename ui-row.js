// ==========================================
// START OF FILE: ui-row.js
// ==========================================

const fs = require('fs');
const path = require('path');
const UiColor = require('./ui-color');
const UiRowActions = require('./ui-row-actions');
const UiRowSelect = require('./ui-row-select');

module.exports = {
  // Pure JavaScript Date formatting tool matching: yyyy.mm.dd hh (24-hour format)
  formatDateString(dateObj) {
    if (!dateObj || isNaN(dateObj.getTime())) return '0000.00.00 00';
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const hh = String(dateObj.getHours()).padStart(2, '0'); // Explicit 24-hour hour string extraction
    return `${yyyy}.${mm}.${dd} ${hh}`;
  },

  buildRow(folder, absoluteVaultRoot, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput) {
    const tableRow = document.createElement('tr');
    tableRow.className = 'projectgrid-matrix-row';

    // Column 1: Core dynamic Note hyperlink cell
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

    // --- FIX: READ DIRECT DISK METADATA STATS OUT OF CONTAINING FOLDER DIRECTORY ---
    const absoluteFolderDiskPath = path.join(absoluteVaultRoot, folder.path);
    let createdDateStr = '0000.00.00 00';
    let updatedDateStr = '0000.00.00 00';

    try {
      if (fs.existsSync(absoluteFolderDiskPath)) {
        const directoryStats = fs.statSync(absoluteFolderDiskPath);
        createdDateStr = this.formatDateString(directoryStats.birthtime); // Folder created timestamp
        updatedDateStr = this.formatDateString(directoryStats.mtime);     // Folder modified timestamp
      }
    } catch (err) {
      console.error(`[ProjectGrid] Timestamp fetch error on drive target ${absoluteFolderDiskPath}:`, err.message);
    }

    // Column 2: Created Date Cell
    const createdCell = document.createElement('td');
    createdCell.className = 'projectgrid-matrix-cell timestamp-td-cell';
    createdCell.style.textAlign = 'center';
    createdCell.style.color = 'var(--text-muted)';
    createdCell.textContent = createdDateStr;
    tableRow.appendChild(createdCell);

    // Column 3: Updated Date Cell
    const updatedCell = document.createElement('td');
    updatedCell.className = 'projectgrid-matrix-cell timestamp-td-cell';
    updatedCell.style.textAlign = 'center';
    updatedCell.style.color = 'var(--text-muted)';
    updatedCell.textContent = updatedDateStr;
    tableRow.appendChild(updatedCell);
    // -------------------------------------------------------------------------------

    // Columns 4, 5, 6: Launcher Button Links (Appended modularly)
    UiRowActions.appendLauncherButtons(tableRow, folder, absoluteVaultRoot, app);

    // Columns 7 through 14: Define the 8 interactive field dropdown tracks
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
      cell.className = 'projectgrid-matrix-cell select-cell projectgrid-uniform-yaml-td';
      
      UiRowSelect.buildSelectButton(cell, tableRow, fieldIdx, cfg, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput);
      
      tableRow.appendChild(cell);
    });

    return tableRow;
  }
};

// ==========================================
// END OF FILE: ui-row.js
// ==========================================
