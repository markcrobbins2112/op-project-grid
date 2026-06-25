// ==========================================
// START OF FILE: ui-row.js
// ==========================================

const UiColor = require('./ui-color');
const UiRowActions = require('./ui-row-actions');
const UiRowSelect = require('./ui-row-select');

module.exports = {
  buildRow(folder, absoluteVaultRoot, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput) {
    const tableRow = document.createElement('tr');
    tableRow.className = 'projectgrid-matrix-row';

    // Column 1: Core Note link cell
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

    // Columns 2, 3, 4: Launcher Buttons (Appended modularly)
    UiRowActions.appendLauncherButtons(tableRow, folder, absoluteVaultRoot);

    // Columns 5 through 12: Define the 8 metadata keys
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
      
      // Call custom select button builder (Defined in ui-row-select.js)
      UiRowSelect.buildSelectButton(cell, tableRow, fieldIdx, cfg, expectedNotePath, app, frontmatter, rowTrackingReference, filterInput);
      
      tableRow.appendChild(cell);
    });

    return tableRow;
  }
};

// ==========================================
// END OF FILE: ui-row.js
// ==========================================
