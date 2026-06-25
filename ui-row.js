// ==========================================
// START OF FILE: ui-row.js
// ==========================================

const fs = require('fs');
const path = require('path');
const UiColor = require('./ui-color');
const UiRowDates = require('./ui-row-dates');
const UiRowActions = require('./ui-row-actions');
const UiRowTags = require('./ui-row-tags');
const UiRowTasks = require('./ui-row-tasks');
const UiRowSelect = require('./ui-row-select');

module.exports = {
  buildRow(folder, absoluteVaultRoot, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput) {
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

    UiRowTasks.buildTasksColumn(tableRow, expectedNotePath, app, rowTrackingReference);
    UiRowDates.appendDirectoryTimestamps(tableRow, folder, absoluteVaultRoot, rowTrackingReference);
    UiRowActions.appendLauncherButtons(tableRow, folder, absoluteVaultRoot, app);
    UiRowTags.buildInteractiveTagsColumn(tableRow, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput);

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

    fieldsConfig.forEach((cfg, fieldIdx) => {
      const cell = document.createElement('td');
      cell.className = 'projectgrid-matrix-cell select-cell projectgrid-uniform-yaml-td';
      UiRowSelect.buildSelectButton(cell, tableRow, fieldIdx, cfg, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput);
      tableRow.appendChild(cell);
    });

    const absoluteFolderDiskPath = path.join(absoluteVaultRoot, folder.path);
    rowTrackingReference.yamlMetadataValues = rowTrackingReference.yamlMetadataValues || {};
    
    // Check 1: .git directory detection
    const gitPath = path.join(absoluteFolderDiskPath, '.git');
    const hasGit = fs.existsSync(gitPath);
    const gitStatusMarker = hasGit ? '✅' : '❌';
    rowTrackingReference.yamlMetadataValues['git'] = gitStatusMarker;

    const gitCell = document.createElement('td');
    gitCell.className = 'projectgrid-matrix-cell projectgrid-readonly-scanner-td projectgrid-uniform-yaml-td';
    gitCell.textContent = gitStatusMarker;
    gitCell.title = hasGit ? '.git directory identified' : 'No local deployment branch found';
    tableRow.appendChild(gitCell);

    // Check 2: AGENTS.md configuration detection
    const agentsPath = path.join(absoluteFolderDiskPath, 'AGENTS.md');
    const hasAgents = fs.existsSync(agentsPath);
    const agentsStatusMarker = hasAgents ? '✅' : '❌';
    rowTrackingReference.yamlMetadataValues['agents'] = agentsStatusMarker;

    const agentsCell = document.createElement('td');
    agentsCell.className = 'projectgrid-matrix-cell projectgrid-readonly-scanner-td projectgrid-uniform-yaml-td';
    agentsCell.textContent = agentsStatusMarker;
    agentsCell.title = hasAgents ? 'AGENTS.md configuration discovered' : 'No structural bot routines mapped';
    tableRow.appendChild(agentsCell);

    return tableRow;
  }
};

// ==========================================
// END OF FILE: ui-row.js
// ==========================================
