// ==========================================
// START OF FILE: ui-row-actions.js
// ==========================================

const fs = require('fs');
const path = require('path');

module.exports = {
  // FIX: Added singular execution handle to cleanly align launcher button injection with your dynamic configuration matrix loop
  appendSingleLauncherButtonCell(tableRow, folder, absoluteVaultRoot, columnConfig, app) {
    const absoluteLocalPath = path.join(absoluteVaultRoot, folder.path).replace(/[/\\]+/g, '\\');
    
    const dotObsidianPhysicalPath = path.join(absoluteVaultRoot, folder.path, '.obsidian');
    const hasObsidianVault = fs.existsSync(dotObsidianPhysicalPath);

    // Determine path missing states depending on the current iteration target protocol
    let isVaultLinkMissing = false;
    if (columnConfig.protocol === 'obsidian') {
      isVaultLinkMissing = !hasObsidianVault;
    }

    const cell = document.createElement('td');
    cell.className = 'projectgrid-matrix-cell action-icon-cell';
    
    const fileAnchor = document.createElement('a');
    fileAnchor.href = `aip://${columnConfig.protocol}/${absoluteLocalPath}`;
    fileAnchor.className = 'projectgrid-aip-icon-btn';
    fileAnchor.textContent = columnConfig.icon;
    fileAnchor.title = `Open workspace path branch in ${columnConfig.label}`;

    if (isVaultLinkMissing) {
      fileAnchor.classList.add('is-vault-missing');
    }

    // Write parameters to tracker structures safely
    tableRow.rowTrackingReference = tableRow.rowTrackingReference || {};
    tableRow.rowTrackingReference.launcherValues = tableRow.rowTrackingReference.launcherValues || {};
    tableRow.rowTrackingReference.launcherValues[columnConfig.key] = columnConfig.icon;

    cell.appendChild(fileAnchor);
    tableRow.appendChild(cell);
  }
};

// ==========================================
// END OF FILE: ui-row-actions.js
// ==========================================
