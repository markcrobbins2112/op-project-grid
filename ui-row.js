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

    const activeConfig = globalThis.GridConfig || GridConfig;
    const columnsList = (activeConfig && activeConfig.columns) ? activeConfig.columns : [];

    columnsList.forEach((col, idx) => {
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
        UiRowDates.appendSingleTimestampCell(tableRow, folder, absoluteVaultRoot, col.key, rowTrackingReference);
      } 
      else if (col.type === 'launcher') {
        UiRowActions.appendSingleLauncherButtonCell(tableRow, folder, absoluteVaultRoot, col, app);
      } 
      else if (col.type === 'tags-cell') {
        UiRowTags.buildInteractiveTagsColumn(tableRow, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput);
      } 
      else if (col.type === 'yaml-select' || col.key === 'tasks') {
        cell.className += ' select-cell projectgrid-uniform-yaml-td';
        
        // DATA REALIGNMENT PASSTHROUGH: Swap placeholder indexes with real data strings dynamically
        let targetColumnSchema = col;
        if (col.key === 'tasks') {
          const liveDiscoveredTasks = window.ProjectGridDiscoveredActualTasksList || [];
          targetColumnSchema = {
            ...col,
            // Re-map column option array records dynamically on the fly to match note content strings
            defaults: liveDiscoveredTasks.length > 0 ? liveDiscoveredTasks : ['No tasks found']
          };
        }

        UiRowSelect.buildSelectButton(cell, tableRow, idx, targetColumnSchema, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput);
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
