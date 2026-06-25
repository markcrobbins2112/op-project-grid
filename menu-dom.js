// ==========================================
// START OF FILE: menu-dom.js
// ==========================================

module.exports = {
    renderPickerBox(filterInput, itemsList, selectedIndex, containerElement, onItemClick, onClose) {
      this.destroyActivePickers(containerElement);
  
      const picker = document.createElement('div');
      picker.className = 'projectgrid-command-picker';
      
      // Position parameters tracking viewports boundary targets cleanly
      const rect = filterInput.getBoundingClientRect();
      picker.style.top = `${rect.bottom + window.scrollY + 4}px`;
      picker.style.left = `${rect.left + window.scrollX}px`;
  
      itemsList.forEach((item, idx) => {
        const el = document.createElement('div');
        el.className = 'projectgrid-picker-item';
        
        // FIX: ENSURE BOTH CONTEXT CLASSES ARE LAYERED ON GENERATION AHEAD OF KEYBOARD SCAN EVENTS
        if (idx === selectedIndex) {
          el.classList.add('projectgrid-picker-highlight');
          el.classList.add('projectgrid-row-focused');
        }
        
        el.textContent = item.name;
  
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          onItemClick(idx);
        });
  
        picker.appendChild(el);
      });
  
      document.body.appendChild(picker); 
  
      const outsideClickListener = (e) => {
        if (!picker.contains(e.target) && e.target !== filterInput) {
          onClose();
          document.removeEventListener('click', outsideClickListener);
        }
      };
      setTimeout(() => document.addEventListener('click', outsideClickListener), 10);
  
      return picker;
    },
  
    destroyActivePickers(containerElement) {
      const existing = document.querySelectorAll('.projectgrid-command-picker');
      existing.forEach(p => p.remove());
      if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
    }
  };
  
  // ==========================================
  // END OF FILE: menu-dom.js
  // ==========================================
  