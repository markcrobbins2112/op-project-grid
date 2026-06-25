// ==========================================
// START OF FILE: ui-row-actions.js
// ==========================================

module.exports = {
    appendLauncherButtons(tableRow, folder, absoluteVaultRoot, appInstance) {
      const absoluteLocalPath = `${absoluteVaultRoot}\\${folder.path}`.replace(/[/\\]+/g, '\\');
      
      const cellDopus = document.createElement('td');
      cellDopus.className = 'projectgrid-matrix-cell action-icon-cell';
      cellDopus.innerHTML = `<a href="aip://dopus/${absoluteLocalPath}" class="projectgrid-aip-icon-btn" title="Open folder in Directory Opus">📁</a>`;
      tableRow.appendChild(cellDopus);
  
      const cellCursor = document.createElement('td');
      cellCursor.className = 'projectgrid-matrix-cell action-icon-cell';
      cellCursor.innerHTML = `<a href="aip://cursor/${absoluteLocalPath}" class="projectgrid-aip-icon-btn" title="Open workspace in Cursor">💻</a>`;
      tableRow.appendChild(cellCursor);
  
      const cellObsidian = document.createElement('td');
      cellObsidian.className = 'projectgrid-matrix-cell action-icon-cell';
      
      const obsidianAnchor = document.createElement('a');
      obsidianAnchor.href = `aip://obsidian/${absoluteLocalPath}`;
      obsidianAnchor.className = 'projectgrid-aip-icon-btn';
      obsidianAnchor.title = 'Open directory as Obsidian Vault';
      obsidianAnchor.textContent = '💜';
  
      // FIX: ASYNCHRONOUSLY EVALUATE VAULT EXISTENCE TO ENFORCE TRANSPARENCY WITHOUT FREEZING THE INTERFACE
      const checkPath = `${folder.path}/.obsidian`;
      appInstance.vault.adapter.exists(checkPath).then((vaultConfigFolderExists) => {
        if (!vaultConfigFolderExists) {
          // Apply 35% opacity rendering to handle the required visual transparency state layout parameters
          obsidianAnchor.style.opacity = '0.25';
          obsidianAnchor.style.filter = 'grayscale(100%)';
        }
      });
  
      cellObsidian.appendChild(obsidianAnchor);
      tableRow.appendChild(cellObsidian);
    }
  };
  
  // ==========================================
  // END OF FILE: ui-row-actions.js
  // ==========================================
  