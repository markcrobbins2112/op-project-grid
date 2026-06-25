// ==========================================
// START OF FILE: ui-row-tags-dom.js
// ==========================================

module.exports = {
    createTagsContainer(btnElement) {
      const dropdown = document.createElement('div');
      dropdown.className = 'projectgrid-dropup-panel projectgrid-tags-portal-panel';
  
      const rect = btnElement.getBoundingClientRect();
      Object.assign(dropdown.style, {
        position: 'fixed', 
        top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`, 
        width: '170px',
        zIndex: '250000', 
        height: 'auto', 
        maxHeight: '300px', 
        display: 'flex', 
        flexDirection: 'column'
      });
  
      const label = document.createElement('div');
      label.className = 'projectgrid-dropup-header-title';
      label.textContent = '🏷️ Multi-Select Tags';
      dropdown.appendChild(label);
  
      return dropdown;
    },
  
    buildCustomInput(dropdown) {
      const inputWrapper = document.createElement('div');
      inputWrapper.className = 'projectgrid-tags-input-container';
      
      const customInput = document.createElement('input');
      customInput.type = 'text'; 
      customInput.className = 'projectgrid-tags-custom-entry-field';
      customInput.placeholder = '➕ Filter / Add Tag...';
      
      inputWrapper.appendChild(customInput);
      dropdown.appendChild(inputWrapper);
      
      return customInput;
    },
  
    gatherUniqueAvailableTags() {
      const globalTagsSet = new Set();
      document.querySelectorAll('.projectgrid-tags-cell-btn').forEach(b => {
        if (b.textContent !== '⬛') {
          b.textContent.split(', ').forEach(t => globalTagsSet.add(t.trim()));
        }
      });
      return Array.from(globalTagsSet).sort();
    },
  
    populateTagsList(scrollingContainer, uniqueAvailableTags, activeTagsArray, onToggle) {
      uniqueAvailableTags.forEach((tag) => {
        const itemWrapper = document.createElement('label');
        itemWrapper.className = 'projectgrid-dropup-option';
  
        const cb = document.createElement('input');
        cb.type = 'checkbox'; 
        cb.checked = activeTagsArray.includes(tag); 
        cb.tabIndex = -1;
        
        cb.addEventListener('change', () => onToggle(tag, cb.checked));
  
        itemWrapper.appendChild(cb); 
        itemWrapper.appendChild(document.createTextNode(tag));
        scrollingContainer.appendChild(itemWrapper);
      });
    }
  };
  
  // ==========================================
  // END OF FILE: ui-row-tags-dom.js
  // ==========================================
  