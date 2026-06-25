// ==========================================
// START OF FILE: tutor.js
// ==========================================

const GridConfig = require('./grid-config');

module.exports = {
  isTutorModeActive: false,
  tutorOverlayEl: null,

  evaluateActiveContext(el) {
    if (!this.isTutorModeActive || !this.tutorOverlayEl || !el) return;

    let title = '💬 General Layout Context';
    let instructions = `• <b>ScrollLock</b>: Open Command wheel<br>• <b>Arrows Up/Down</b>: Cycle notes rows grid`;

    const fieldIdx = el.getAttribute('data-field-index');
    if (fieldIdx !== null) {
      // CONSOLIDATED ENTRY: Recover matching contextual descriptions right from unified settings profiles array tracks
      const selectableColumns = GridConfig.columns.filter(c => c.type === 'yaml-select' || c.type === 'tags-cell');
      const targetCol = selectableColumns[fieldIdx];
      
      if (targetCol && targetCol.tutorKeys) {
        title = `${targetCol.icon} ${targetCol.label} Controller`;
        instructions = targetCol.tutorKeys;
      }
    }

    this.tutorOverlayEl.innerHTML = `<div style="font-weight:700; color:#70a1ff; margin-bottom:6px;">${title}</div><div>${instructions}</div>`;
  }
};

// ==========================================
// END OF FILE: tutor.js
// ==========================================
