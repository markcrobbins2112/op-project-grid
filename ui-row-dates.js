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

  // FIX: Added single cell execution handle to support dynamic configuration loop injection passes
  appendSingleTimestampCell(tableRow, folder, absoluteVaultRoot, columnKey, rowTrackingReference) {
    const absoluteFolderDiskPath = path.join(absoluteVaultRoot, folder.path);
    let targetedDateStr = '0000.00.00 00';

    try {
      if (fs.existsSync(absoluteFolderDiskPath)) {
        const directoryStats = fs.statSync(absoluteFolderDiskPath);
        
        // Dynamically select the exact filesystem handle based on configuration requirements
        if (columnKey === 'created') {
          targetedDateStr = this.formatDateString(directoryStats.birthtime);
        } else if (columnKey === 'updated') {
          targetedDateStr = this.formatDateString(directoryStats.mtime);
        }
      }
    } catch (err) {
      console.error(`[ProjectGrid] Dynamic timestamp tracking error:`, err.message);
    }

    // Cache metrics locally inside the state checker tracking registry register object records
    rowTrackingReference.folderDatesValues = rowTrackingReference.folderDatesValues || {};
    rowTrackingReference.folderDatesValues[columnKey] = targetedDateStr;

    const cell = document.createElement('td');
    cell.className = 'projectgrid-matrix-cell projectgrid-timestamp-scaled-td';
    cell.textContent = targetedDateStr;
    tableRow.appendChild(cell);
  }
};

// ==========================================
// END OF FILE: ui-row-dates.js
// ==========================================
