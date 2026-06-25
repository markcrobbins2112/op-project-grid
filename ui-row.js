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

    // DATA STAMP INJECTION: Calculate the absolute system path and bind it directly to the HTML node
    const absoluteFolderDiskPath = path.join(absoluteVaultRoot, folder.path).replace(/[/\\]+/g, '\\');
    tableRow.setAttribute('data-directory', absoluteFolderDiskPath);

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
        let targetColumnSchema = col;
        if (col.key === 'tasks') {
          const liveDiscoveredTasks = window.ProjectGridDiscoveredActualTasksList || [];
          targetColumnSchema = {
            ...col,
            defaults: liveDiscoveredTasks.length > 0 ? liveDiscoveredTasks : ['No tasks found']
          };
        }
        UiRowSelect.buildSelectButton(cell, tableRow, idx, targetColumnSchema, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput);
        tableRow.appendChild(cell);
      } 
      else if (col.type === 'scanner-check') {
        const checkPath = path.join(absoluteFolderDiskPath, col.targetFile);
        const hasFile = fs.existsSync(checkPath);
        
        cell.className += ' projectgrid-readonly-scanner-td projectgrid-uniform-yaml-td';

        if (col.key === 'agents' && !hasFile) {
          const fileAnchor = document.createElement('a');
          
          fileAnchor.href = `aip://aimd/_ ${absoluteFolderDiskPath}`;
          fileAnchor.className = 'projectgrid-aip-icon-btn';
          fileAnchor.textContent = '❌';
          fileAnchor.title = `AGENTS.md missing! Click to initialize framework layout via aip://aimd/ using the "_" default template.`;
          fileAnchor.style.textDecoration = 'none';
          fileAnchor.style.cursor = 'pointer';

          fileAnchor.addEventListener('click', () => {
            let totalPollAttempts = 0;
            const maxPollAttemptsLimit = 15;

            const liveFileWatcherInterval = setInterval(() => {
              totalPollAttempts++;
              const isFileNowPresentOnDisk = fs.existsSync(checkPath);

              if (isFileNowPresentOnDisk || totalPollAttempts >= maxPollAttemptsLimit) {
                clearInterval(liveFileWatcherInterval);
                if (isFileNowPresentOnDisk && window.ProjectGridTriggerFilterUpdate) {
                  rowTrackingReference.yamlMetadataValues[col.key] = '✅';
                  cell.innerHTML = '✅';
                  window.ProjectGridTriggerFilterUpdate();
                }
              }
            }, 200);
          });

          rowTrackingReference.yamlMetadataValues[col.key] = '❌';
          cell.appendChild(fileAnchor);
        } else {
          const marker = hasFile ? '✅' : '❌';
          rowTrackingReference.yamlMetadataValues[col.key] = marker;
          cell.textContent = marker;
        }
        tableRow.appendChild(cell);
      }
    });

    return tableRow;
  }
};

// ==========================================
// END OF FILE: ui-row.js
// ==========================================
