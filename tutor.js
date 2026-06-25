// ==========================================
// START OF FILE: tutor.js
// ==========================================

module.exports = {
    isTutorModeActive: false,
    tutorOverlayEl: null,
  
    initializeTutorEngine() {
      if (this.tutorOverlayEl) return;
      this.tutorOverlayEl = document.createElement('div');
      this.tutorOverlayEl.id = 'projectgrid-tutor-hud';
      
      // Style as a non-interactive, sleek dark floating layout hud card
      Object.assign(this.tutorOverlayEl.style, {
        position: 'fixed', bottom: '16px', right: '16px', width: '260px',
        backgroundColor: '#1e1e24', border: '1px solid #70a1ff', borderRadius: '6px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.5)', padding: '10px', fontSize: '10px',
        color: '#dddddd', lineHeight: '1.4', zIndex: '999999', display: 'none', pointerEvents: 'none'
      });
      document.body.appendChild(this.tutorOverlayEl);
  
      // Bind real-time focused elements listeners parameters
      document.addEventListener('focusin', (e) => this.evaluateActiveContext(e.target));
    },
  
    toggleTutorMode(buttonNode) {
      this.initializeTutorEngine();
      this.isTutorModeActive = !this.isTutorModeActive;
      
      if (this.isTutorModeActive) {
        buttonNode.style.border = '1px solid #70a1ff';
        this.evaluateActiveContext(document.activeElement);
      } else {
        buttonNode.style.border = 'none';
        this.tutorOverlayEl.style.display = 'none';
      }
    },
  
    evaluateActiveContext(el) {
      if (!this.isTutorModeActive || !this.tutorOverlayEl || !el) return;
  
      let title = '💬 General Layout Context';
      let instructions = `• <b>ScrollLock</b>: Open Command wheel<br>• <b>Arrows Up/Down</b>: Cycle notes rows grid`;
  
      if (el.classList?.contains('projectgrid-filter-input')) {
        title = '🔍 Main Search Context';
        instructions = `• <b>ScrollLock</b>: Spawn Picker dropdown menu<br>• <b>Arrows Up/Down</b>: Navigate underlying project rows`;
      } else if (el.classList?.contains('projectgrid-tags-cell-btn')) {
        title = '🏷️ Multi-Select Tags Cell';
        instructions = `• <b>Enter / Space</b>: Expand custom checkboxes panel<br>• <b>Arrows Up/Down</b>: Jump vertically to adjacent row cell`;
      } else if (el.classList?.contains('projectgrid-tasks-trigger-btn')) {
        title = '🔧 Checklist Tasks Field';
        instructions = `• <b>Enter</b>: Launch Markdown tasks panel checklist<br>• <b>Arrows Up/Down</b>: Navigate cell position vertically`;
      } else if (el.classList?.contains('projectgrid-custom-select-btn')) {
        title = '📊 Frontmatter Select Button';
        instructions = `• <b>Arrows Up/Down</b>: Shift row focus vertically<br>• <b>Alt + Down</b>: Open option items dropdown`;
      } else if (el.classList?.contains('projectgrid-header-dropup-trigger')) {
        title = '📶 Header Filter Trigger';
        instructions = `• <b>Enter / Space</b>: Deploy filter checkbox list<br>• <b>Alt + Down</b>: Force choice box drop-up menu open`;
      } else if (el.closest('.projectgrid-tags-portal-panel') || el.closest('.projectgrid-dropup-panel')) {
        title = '📂 Inside Options Portal Panel';
        instructions = `• <b>Arrows Up/Down</b>: Step through checkbox items<br>• <b>Enter (Empty text)</b>: Toggle chosen checkbox<br>• <b>Type text + Enter</b>: Add new extensible value`;
      }
  
      this.tutorOverlayEl.innerHTML = `<div style="font-weight:700; color:#70a1ff; margin-bottom:6px;">${title}</div><div>${instructions}</div>`;
      this.tutorOverlayEl.style.display = 'block';
    }
  };
  
  // ==========================================
  // END OF FILE: tutor.js
  // ==========================================
  