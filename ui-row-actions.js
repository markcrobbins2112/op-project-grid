// ==========================================
// START OF FILE: ui-row-actions.js
// ==========================================

module.exports = {
    appendLauncherButtons(tableRow, folder, absoluteVaultRoot) {
      const absoluteLocalPath = `${absoluteVaultRoot}\\${folder.path}`.replace(/[/\\]+/g, '\\');
      
      const actions = [
        { protocol: 'dopus', icon: '📁', title: 'Open folder in Directory Opus' },
        { protocol: 'cursor', icon: '💻', title: 'Open workspace in Cursor' },
        { protocol: 'obsidian', icon: '💜', title: 'Open directory as Obsidian Vault' }
      ];
  
      actions.forEach(act => {
        const cell = document.createElement('td');
        cell.className = 'projectgrid-matrix-cell action-icon-cell';
        cell.innerHTML = `<a href="aip://${act.protocol}/${absoluteLocalPath}" class="projectgrid-aip-icon-btn" title="${act.title}">${act.icon}</a>`;
        tableRow.appendChild(cell);
      });
    }
  };
  
  // ==========================================
  // END OF FILE: ui-row-actions.js
  // ==========================================
  