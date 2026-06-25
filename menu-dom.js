// ==========================================
// START OF FILE: menu-dom.js
// ==========================================

module.exports = {
    renderPickerBox(filterInput, itemsList, selectedIndex, containerElement, onItemClick, onClose) {
      this.destroyActivePickers(containerElement);
  
      const picker = document.createElement('div');
      picker.className = 'projectgrid-command-picker';
      
      // Align beneath search input
      picker.style.top = `${filterInput.offsetTop + filterInput.offsetHeight + 4}px`;
      picker.style.left = `${filterInput.offsetLeft}px`;
  
      itemsList.forEach((item, idx) => {
        const el = document.createElement('div');
        el.className = 'projectgrid-picker-item';
        
        // Apply hue rotating focus border if this picker item is selected
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
  
      containerElement.appendChild(picker);
  
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
      const existing = containerElement.querySelectorAll('.projectgrid-command-picker');
      existing.forEach(p => p.remove());
    }
  };
  
  // ==========================================
  // END OF FILE: menu-dom.js
  // ==========================================
  