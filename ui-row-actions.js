// ==========================================
// START OF FILE: ui-row-actions.js
// ==========================================

module.exports = {
    appendLauncherButtons(tableRow, folder, absoluteVaultRoot, app) {
      const absoluteLocalPath = `${absoluteVaultRoot}\\${folder.path}`.replace(/[/\\]+/g, '\\');
      
      // Check if the directory target features a hidden configuration folder path track
      const dotObsidianPath = `${folder.path}/.obsidian`;
      const hasObsidianVault = app.vault.getAbstractFileByPath(dotObsidianPath) !== null;
  
      const actions = [
        { protocol: 'dopus', icon: '📁', title: 'Open folder in Directory Opus', isMissing: false },
        { protocol: 'cursor', icon: '💻', title: 'Open workspace in Cursor', isMissing: false },
        { protocol: 'obsidian', icon: '💜', title: 'Open directory as Obsidian Vault', isMissing: !hasObsidianVault }
      ];
  
      actions.forEach(act => {
        const cell = document.createElement('td');
        cell.className = 'projectgrid-matrix-cell action-icon-cell';
        
        const fileAnchor = document.createElement('a');
        fileAnchor.href = `aip://${act.protocol}/${absoluteLocalPath}`;
        fileAnchor.className = 'projectgrid-aip-icon-btn';
        fileAnchor.textContent = act.icon;
        fileAnchor.title = act.title;
  
        // FIX: ATTACH GHOST TRANSPARENCY SHADOW STATE IF DOT OBSIDIAN FILE ATTRIBUTES MISSING
        if (act.isMissing) {
          fileAnchor.classList.add('is-vault-missing');
        }
  
        cell.appendChild(fileAnchor);
        tableRow.appendChild(cell);
      });
    }
  };
  
  // ==========================================
  // END OF FILE: ui-row-actions.js
  // ==========================================
  