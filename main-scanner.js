// ==========================================
// START OF FILE: main-scanner.js
// ==========================================

const UiBuilder = require('./ui');

module.exports = {
  scanVaultProjectsFolders(app, rootTarget, absoluteVaultRoot, tableBody, rowsArray, filterInputElement) {
    const universalTagsSet = new Set();
    const targetFolders = app.vault.getAllLoadedFiles().filter(file => file.children && file.path.startsWith(rootTarget));

    targetFolders.forEach(folder => {
      const expectedNotePath = `${folder.path}/+${folder.name}.md`;
      if (app.vault.getAbstractFileByPath(expectedNotePath)) {
        const fileCache = app.metadataCache.getCache(expectedNotePath);
        const frontmatter = fileCache ? fileCache.frontmatter : null;

        if (frontmatter && frontmatter.tags) {
          const rawTags = Array.isArray(frontmatter.tags) ? frontmatter.tags : String(frontmatter.tags).split(/[\s,]+/);
          rawTags.forEach(t => { if(t) universalTagsSet.add(String(t).trim()); });
        }

        const rowRef = { element: null, searchText: `+${folder.name}.md`.toLowerCase() };
        rowRef.element = UiBuilder.buildRow(folder, absoluteVaultRoot, expectedNotePath, app, frontmatter, rowRef, filterInputElement);
        
        tableBody.appendChild(rowRef.element);
        rowsArray.push(rowRef);
      }
    });

    return universalTagsSet;
  }
};

// ==========================================
// END OF FILE: main-scanner.js
// ==========================================
