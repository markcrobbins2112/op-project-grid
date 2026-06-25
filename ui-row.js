// ==========================================
// START OF FILE: ui-row.js
// ==========================================

const fs = require('fs');
const path = require('path');
const GridConfig = require('./grid-config');
const UiColor = require('./ui-color');
const UiRowDates = require('./ui-row-dates');
const UiRowActions = require('./ui-row-actions');
const UiRowTags = require('./ui-row-tags');
const UiRowSelect = require('./ui-row-select');

module.exports = {
  buildRow(folder, absoluteVaultRoot, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput) {
    const tableRow = document.createElement('tr');
    tableRow.className = 'projectgrid-matrix-row';

    rowTrackingReference.yamlMetadataValues = {};
    rowTrackingReference.launcherValues = {};
    rowTrackingReference.folderDatesValues = {};

    // CONSOLIDATED INJECTION PARSING LOOP: Evaluates and appends exact horizontal coordinates fields matching core array order
    GridConfig.columns.forEach((col, idx) => {
      const cell = document.createElement('td');
      cell.className = 'projectgrid-matrix-cell';

      if (col.key === 'title') {
        cell.className += ' note-title-cell';
        const fileAnchor = document.createElement('a');
        fileAnchor.className = 'internal-link projectgrid-matrix-link';
        fileAnchor.setAttribute('data-href', expectedNotePath);
        fileAnchor.textContent = `+${folder.name}.md`;
        fileAnchor.style.color = UiColor.getColorForFirstCharacter(folder.name);
        fileAnchor.addEventListener('click', (e) => { e.preventDefault(); app.workspace.openLinkText(expectedNotePath, '', false); });
        cell.appendChild(fileAnchor);
        tableRow.appendChild(cell);
      } 
      else if (col.type === 'timestamp') {
        // Appends the specific timestamp row cell targets (created vs updated)
        UiRowDates.appendSingleTimestampCell(tableRow, folder, absoluteVaultRoot, col.key, rowTrackingReference);
      } 
      else if (col.type === 'launcher') {
        UiRowActions.appendSingleLauncherButtonCell(tableRow, folder, absoluteVaultRoot, col, app);
      } 
      else if (col.type === 'tags-cell') {
        UiRowTags.buildInteractiveTagsColumn(tableRow, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput);
      } 
      else if (col.type === 'yaml-select') {
        cell.className += ' select-cell projectgrid-uniform-yaml-td';
        UiRowSelect.buildSelectButton(cell, tableRow, idx, col, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput);
        tableRow.appendChild(cell);
      } 
      else if (col.type === 'scanner-check') {
        const absoluteFolderDiskPath = path.join(absoluteVaultRoot, folder.path);
        const checkPath = path.join(absoluteFolderDiskPath, col.targetFile);
        const hasFile = fs.existsSync(checkPath);
        const marker = hasFile ? '✅' : '❌';
        
        rowTrackingReference.yamlMetadataValues[col.key] = marker;
        cell.className += ' projectgrid-readonly-scanner-td projectgrid-uniform-yaml-td';
        cell.textContent = marker;
        tableRow.appendChild(cell);
      }
    });

    return tableRow;
  }
};

// ==========================================
// END OF FILE: ui-row.js
// ==========================================
