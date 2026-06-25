// ==========================================
// START OF FILE: main-scanner.js
// ==========================================

const fs = require('fs');
const path = require('path');
const UiBuilder = require('./ui');
const TasksGitExtractor = require('./tasks-git-extractor');

module.exports = {
  scanVaultProjectsFolders(app, rootTarget, absoluteVaultRoot, tableBody, rowsArray, filterInputElement) {
    const universalTagsSet = new Set();
    const actualVaultTasksSet = new Set();
    
    const targetFolders = app.vault.getAllLoadedFiles().filter(file => file.children && file.path.startsWith(rootTarget));

    targetFolders.forEach(folder => {
      const expectedNotePath = `${folder.path}/+${folder.name}.md`;
      try {
        const absolutePathOnDisk = path.join(absoluteVaultRoot, folder.path);
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
                const taskTextString = checkboxMatchSignature[2].trim();
                if (taskTextString) actualVaultTasksSet.add(taskTextString);
              }
            }
          }
        }
      } catch (e) {}
    });

    window.ProjectGridDiscoveredActualTasksList = Array.from(actualVaultTasksSet).sort();

    targetFolders.forEach(folder => {
      const expectedNotePath = `${folder.path}/+${folder.name}.md`;
      if (app.vault.getAbstractFileByPath(expectedNotePath)) {
        const fileCache = app.metadataCache.getCache(expectedNotePath);
        const frontmatter = fileCache ? { ...fileCache.frontmatter } : {};

        if (frontmatter && frontmatter.tags) {
          const rawTags = Array.isArray(frontmatter.tags) ? frontmatter.tags : String(frontmatter.tags).split(/[\s,]+/);
          rawTags.forEach(t => { if(t) universalTagsSet.add(String(t).trim()); });
        }

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
                  if (isChecked && taskTextString) checkedTasksList.push(taskTextString);
                }
              }
            }
          }
        } catch (fileErr) {}

        frontmatter['tasks'] = checkedTasksList.length > 0 ? checkedTasksList.join(', ') : '⬛';

        const rowRef = { element: null, searchText: `+${folder.name}.md`.toLowerCase() };
        rowRef.element = UiBuilder.buildRow(folder, absoluteVaultRoot, expectedNotePath, app, frontmatter, rowRef, filterInputElement);
        
        // =========================================================================
        // GIT REMOTE URL EXTRACTION HOOK
        // =========================================================================
        const gitCell = rowRef.element.querySelector('.projectgrid-readonly-scanner-td');
        if (gitCell && gitCell.textContent === '✅') {
          const absoluteFolderDiskPath = path.join(absoluteVaultRoot, folder.path);
          const globalGitExtractorInstance = globalThis.TasksGitExtractor || TasksGitExtractor;
          const remoteUrl = globalGitExtractorInstance.extractRemoteUrl(absoluteFolderDiskPath);
          
          if (remoteUrl) {
            // Apply the URL onto the row data cache object and inject a clean HTML tooltip title hover
            rowRef.gitRemoteUrl = remoteUrl;
            gitCell.title = `Remote Origin: ${remoteUrl}`;
            gitCell.style.cursor = 'help';
          }
        }
        // =========================================================================

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
