// ==========================================
// START OF FILE: main-scanner.js
// ==========================================

const fs = require('fs');
const path = require('path');
const UiBuilder = require('./ui');

module.exports = {
  scanVaultProjectsFolders(app, rootTarget, absoluteVaultRoot, tableBody, rowsArray, filterInputElement) {
    const universalTagsSet = new Set();
    const targetFolders = app.vault.getAllLoadedFiles().filter(file => file.children && file.path.startsWith(rootTarget));

    targetFolders.forEach(folder => {
      const expectedNotePath = `${folder.path}/+${folder.name}.md`;
      if (app.vault.getAbstractFileByPath(expectedNotePath)) {
        const fileCache = app.metadataCache.getCache(expectedNotePath);
        const frontmatter = fileCache ? { ...fileCache.frontmatter } : {};

        if (frontmatter && frontmatter.tags) {
          const rawTags = Array.isArray(frontmatter.tags) ? frontmatter.tags : String(frontmatter.tags).split(/[\s,]+/);
          rawTags.forEach(t => { if(t) universalTagsSet.add(String(t).trim()); });
        }

        // TASK SCRAPER BLOCK START - Short comment prevents bundler stripping bugs
        let checkedTasksList = [];
        try {
          const absolutePathOnDisk = path.join(absoluteVaultRoot, expectedNotePath);
          if (fs.existsSync(absolutePathOnDisk)) {
            const fileContentBuffer = fs.readFileSync(absolutePathOnDisk, 'utf8');
            const linesArray = fileContentBuffer.split('\n');
            let insideTasksHeaderZone = false;

            for (let i = 0; i < linesArray.length; i++) {
              const currentLineText = linesArray[i];
              if (currentLineText.trim().startsWith('## Incoming Tasks')) { insideTasksHeaderZone = true; continue; }
              if (insideTasksHeaderZone && currentLineText.trim().startsWith('##')) { break; }
              
              if (insideTasksHeaderZone) {
                const checkboxMatchSignature = currentLineText.match(/^\s*-\s*\[([ xX])\]\s*(.*)$/);
                if (checkboxMatchSignature) {
                  const isChecked = checkboxMatchSignature[1].toLowerCase() === 'x';
                  const taskTextString = checkboxMatchSignature[2].trim();
                  
                  if (isChecked && taskTextString) {
                    checkedTasksList.push(taskTextString);
                  }
                }
              }
            }
          }
        } catch (fileErr) {
          console.error(`[ProjectGrid Scraper] Failed to load markdown checkboxes for ${folder.name}:`, fileErr.message);
        }

        frontmatter['tasks'] = checkedTasksList.length > 0 ? checkedTasksList.join(', ') : '⬛';
        // TASK SCRAPER BLOCK END

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
