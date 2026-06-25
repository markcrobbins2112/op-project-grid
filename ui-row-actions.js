// ==========================================
// START OF FILE: ui-row-actions.js
// ==========================================

// FIX: Pull in Node's native File System module to perform direct physical disk lookups
const fs = require('fs');
const path = require('path');

module.exports = {
  appendLauncherButtons(tableRow, folder, absoluteVaultRoot, app) {
    const absoluteLocalPath = `${absoluteVaultRoot}\\${folder.path}`.replace(/[/\\]+/g, '\\');
    
    // --- FIX: USE RAW UNMASKED DISK QUERIES TO IDENTIFY MOUNTED DIRECTORY JUNCTIONS ---
    const dotObsidianPhysicalPath = path.join(absoluteVaultRoot, folder.path, '.obsidian');
    const hasObsidianVault = fs.existsSync(dotObsidianPhysicalPath);
    // ----------------------------------------------------------------------------------

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

      // Apply ghost transparency overlay strictly if the path is genuinely missing from your drive
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
