const { Plugin } = require('obsidian');
const StylesManager = require('./styles');
const FilterManager = require('./filter');
const UiBuilder = require('./ui');

module.exports = class ProjectGridPlugin extends Plugin {
  async onload() {
    console.log('%c[ProjectGrid]%c Core initialized...', 'color: #00d2d3; font-weight: bold;', 'color: default;');
    StylesManager.injectStyles();

    this.registerMarkdownCodeBlockProcessor('projectgrid', (sourceText, element) => {
      this.renderProjectGridDashboard(sourceText, element);
    });
  }

  onunload() {
    const styleEl = document.getElementById('obsidian-projectgrid-styles');
    if (styleEl) styleEl.remove();
  }

  renderProjectGridDashboard(sourceText, containerElement) {
    const rootTarget = sourceText.trim() || "__";
    const absoluteVaultRoot = this.app.vault.adapter.getBasePath();
    const targetFolders = this.app.vault.getAllLoadedFiles().filter(file => file.children && file.path.startsWith(rootTarget));

    const tableElement = document.createElement('table');
    tableElement.className = 'projectgrid-matrix-table';

    const tableHeader = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const headerSetup = UiBuilder.generateHeaderCell();
    headerRow.appendChild(headerSetup.cell);
    headerRow.insertAdjacentHTML('beforeend', `
      <th style="width: 15%; text-align: center;">Dopus</th>
      <th style="width: 15%; text-align: center;">Cursor</th>
      <th style="width: 15%; text-align: center;">Obsidian</th>
    `);
    tableHeader.appendChild(headerRow);
    tableElement.appendChild(tableHeader);

    const tableBody = document.createElement('tbody');
    const rowsArray = [];

    targetFolders.forEach(folder => {
      const expectedNotePath = `${folder.path}/+${folder.name}.md`;
      if (this.app.vault.getAbstractFileByPath(expectedNotePath)) {
        const tableRow = UiBuilder.buildRow(folder, absoluteVaultRoot, expectedNotePath, this.app.workspace);
        tableBody.appendChild(tableRow);
        rowsArray.push({ element: tableRow, searchText: `+${folder.name}.md`.toLowerCase() });
      }
    });

    tableElement.appendChild(tableBody);
    FilterManager.initializeTableFilter(headerSetup.input, headerSetup.clearBtn, rowsArray);

    if (rowsArray.length > 0) {
      containerElement.appendChild(tableElement);
    } else {
      containerElement.insertAdjacentHTML('beforeend', `<p class="projectgrid-empty-warning-message">ℹ️ *No folders matching \`${rootTarget}/Folder/+Folder.md\` were discovered.*</p>`);
    }
  }
};
