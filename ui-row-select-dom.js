// ==========================================
// START OF FILE: ui-row-select-dom.js
// ==========================================

module.exports = {
    createDropdownContainer(btnElement, configKey) {
      const dropdown = document.createElement('div');
      dropdown.className = 'projectgrid-dropup-panel';
      
      const rect = btnElement.getBoundingClientRect();
      Object.assign(dropdown.style, {
        position: 'fixed', 
        top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`, 
        width: `${rect.width + 30}px`,
        zIndex: '200000', 
        height: 'auto', 
        display: 'flex', 
        flexDirection: 'column'
      });
  
      const label = document.createElement('div');
      label.className = 'projectgrid-dropup-header-title';
      label.textContent = `📋 ${configKey.toUpperCase()}`;
      dropdown.appendChild(label);
  
      return dropdown;
    },
  
    buildCustomInput(dropdown) {
      const inputWrapper = document.createElement('div');
      inputWrapper.className = 'projectgrid-tags-input-container';
      
      const customInput = document.createElement('input');
      customInput.type = 'text';
      customInput.className = 'projectgrid-tags-custom-entry-field';
      customInput.placeholder = '➕ Filter / Add...';
      
      inputWrapper.appendChild(customInput);
      dropdown.appendChild(inputWrapper);
      
      return customInput;
    },
  
    populateItemsList(scrollingContainer, optionsList) {
      optionsList.forEach((opt) => {
        const li = document.createElement('div');
        li.className = 'projectgrid-custom-dropdown-item';
        li.textContent = opt;
        scrollingContainer.appendChild(li);
      });
    }
  };
  
  // ==========================================
  // END OF FILE: ui-row-select-dom.js
  // ==========================================
  