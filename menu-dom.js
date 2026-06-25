// ==========================================
// START OF FILE: menu-dom.js
// ==========================================

module.exports = {
    renderPickerBox(filterInput, itemsList, selectedIndex, containerElement, onItemClick, onClose) {
      this.destroyActivePickers(containerElement);
  
      const picker = document.createElement('div');
      picker.className = 'projectgrid-command-picker';
      
      const rect = filterInput.getBoundingClientRect();
      picker.style.top = `${rect.bottom + window.scrollY + 4}px`;
      picker.style.left = `${rect.left + window.scrollX}px`;
  
      itemsList.forEach((item, idx) => {
        const el = document.createElement('div');
        
        if (item.isHeaderTitle) {
          el.className = 'projectgrid-dropup-header-title';
          el.style.borderBottom = '1px dashed var(--background-modifier-border, #3d3d3d)';
          el.style.padding = '6px 10px';
          el.style.fontSize = '10px';
          el.style.color = 'var(--text-accent, #70a1ff)';
          el.style.fontWeight = '700';
          el.style.pointerEvents = 'none';
        } else {
          el.className = 'projectgrid-picker-item';
          if (idx === selectedIndex) {
            el.classList.add('projectgrid-picker-highlight');
            el.classList.add('projectgrid-row-focused');
          }
          
          el.addEventListener('click', (e) => {
            e.preventDefault(); e.stopPropagation();
            onItemClick(idx);
          });
        }
        
        // UNIFIED VISUAL INJECTION: Combine restored emojis and mnemonic underline structures
        if (item.icon && item.displayName) {
          el.innerHTML = `${item.icon} ${item.displayName}`;
        } else {
          el.innerHTML = item.displayName || item.name;
        }
        
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
  
  globalThis.MenuDom = module.exports;
  
  // ==========================================
  // END OF FILE: menu-dom.js
  // ==========================================
  