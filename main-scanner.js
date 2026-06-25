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
        // GIT REMOTE URL EXTRACTION & CLICK RUNNER HOOK
        // =========================================================================
        const gitCell = rowRef.element.querySelector('.projectgrid-readonly-scanner-td');
        if (gitCell && gitCell.textContent === '✅') {
          const absoluteFolderDiskPath = path.join(absoluteVaultRoot, folder.path);
          const globalGitExtractorInstance = globalThis.TasksGitExtractor || TasksGitExtractor;
          const remoteUrl = globalGitExtractorInstance.extractRemoteUrl(absoluteFolderDiskPath);
          
          if (remoteUrl) {
            rowRef.gitRemoteUrl = remoteUrl;
            gitCell.title = `🔗 Click to open Remote Origin:\n${remoteUrl}`;
            
            // Apply clickable link characteristics natively via style properties
            gitCell.style.cursor = 'pointer';
            gitCell.style.color = 'var(--text-accent, #70a1ff)';
            gitCell.style.fontWeight = 'bold';
            
            // LAUNCH EXTERNAL BROWSER: Open the link directly using electron/browser capabilities
            gitCell.addEventListener('click', (e) => {
              e.preventDefault(); e.stopPropagation();
              
              // Map standard SSH origin markers cleanly into clear web address structures if required
              let cleanWebUrl = remoteUrl.trim();
              if (cleanWebUrl.startsWith('git@')) {
                cleanWebUrl = 'https://' + cleanWebUrl.replace(':', '/').replace('git@', '');
              }
              if (cleanWebUrl.endsWith('.git')) {
                cleanWebUrl = cleanWebUrl.substring(0, cleanWebUrl.length - 4);
              }

              // Use window.open to safely invoke your default operating system browser frame
              window.open(cleanWebUrl, '_blank');
            });
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
