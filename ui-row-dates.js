// ==========================================
// START OF FILE: ui-row-dates.js
// ==========================================

const fs = require('fs');
const path = require('path');

module.exports = {
  formatDateString(dateObj) {
    if (!dateObj || isNaN(dateObj.getTime())) return '0000.00.00 00';
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const hh = String(dateObj.getHours()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd} ${hh}`;
  },

  appendDirectoryTimestamps(tableRow, folder, absoluteVaultRoot, rowTrackingReference) {
    const absoluteFolderDiskPath = path.join(absoluteVaultRoot, folder.path);
    let createdDateStr = '0000.00.00 00';
    let updatedDateStr = '0000.00.00 00';

    try {
      if (fs.existsSync(absoluteFolderDiskPath)) {
        const directoryStats = fs.statSync(absoluteFolderDiskPath);
        createdDateStr = this.formatDateString(directoryStats.birthtime);
        updatedDateStr = this.formatDateString(directoryStats.mtime);
      }
    } catch (err) {
      console.error(`[ProjectGrid] Timestamp fetch error:`, err.message);
    }

    rowTrackingReference.folderDatesValues = { created: createdDateStr, updated: updatedDateStr };

    const createdCell = document.createElement('td');
    createdCell.className = 'projectgrid-matrix-cell projectgrid-timestamp-scaled-td';
    createdCell.textContent = createdDateStr;
    tableRow.appendChild(createdCell);

    const updatedCell = document.createElement('td');
    updatedCell.className = 'projectgrid-matrix-cell projectgrid-timestamp-scaled-td';
    updatedCell.textContent = updatedDateStr;
    tableRow.appendChild(updatedCell);
  }
};

// ==========================================
// END OF FILE: ui-row-dates.js
// ==========================================
