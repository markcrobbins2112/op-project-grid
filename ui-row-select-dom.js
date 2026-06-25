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
        minWidth: '300px',
        maxWidth: '800px', // Fluid scale boundaries parameters limits up to 800px
        width: 'max-content',
        maxHeight: '320px',
        display: 'flex', 
        flexDirection: 'column',
        boxSizing: 'border-box'
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
      inputWrapper.style.width = '100%';
      inputWrapper.style.boxSizing = 'border-box';
      
      const customInput = document.createElement('input');
      customInput.type = 'text';
      customInput.className = 'projectgrid-tags-custom-entry-field';
      customInput.placeholder = '➕ Filter list / Create item...';
      
      Object.assign(customInput.style, {
        width: '100%',
        boxSizing: 'border-box',
        display: 'block'
      });
      
      inputWrapper.appendChild(customInput);
      dropdown.appendChild(inputWrapper);
      
      return customInput;
    },
  
    populateItemsList(scrollingContainer, optionsList, isMultiSelect, activeValuesArray, onDeleteClickCallback) {
      scrollingContainer.innerHTML = ''; // Ensure tracking grids clear cleanly
      
      optionsList.forEach((opt) => {
        const li = document.createElement('div');
        li.className = 'projectgrid-custom-dropdown-item';
        li.setAttribute('data-value', opt);
        
        // Structure row elements using flex layout to isolate left indicators from right delete keys
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.justifyContent = 'space-between';
        li.style.gap = '12px';
        li.style.width = '100%';
        li.style.boxSizing = 'border-box';
  
        const leftSegment = document.createElement('div');
        leftSegment.style.display = 'flex';
        leftSegment.style.alignItems = 'center';
        leftSegment.style.gap = '6px';
        leftSegment.style.flex = '1';
        leftSegment.style.overflow = 'hidden';
        leftSegment.style.textOverflow = 'ellipsis';
        leftSegment.style.whiteSpace = 'nowrap';
  
        if (isMultiSelect) {
          const cb = document.createElement('input');
          cb.type = 'checkbox';
          cb.tabIndex = -1;
          cb.checked = activeValuesArray.includes(opt);
          cb.style.margin = '0';
          cb.style.cursor = 'pointer';
          leftSegment.appendChild(cb);
        }
        
        leftSegment.appendChild(document.createTextNode(opt));
        li.appendChild(leftSegment);
  
        // RIGHT ALIGNED DELETE TRAP: Add the ❌ anchor to support physical node drop updates
        if (isMultiSelect) {
          const delBtn = document.createElement('span');
          delBtn.innerHTML = '✕';
          Object.assign(delBtn.style, {
            color: 'var(--text-error, #ff4757)',
            cursor: 'pointer',
            fontWeight: 'bold',
            padding: '2px 6px',
            userSelect: 'none',
            fontSize: '12px'
          });
          
          delBtn.addEventListener('click', (e) => {
            e.preventDefault(); e.stopPropagation();
            onDeleteClickCallback(opt);
          });
          li.appendChild(delBtn);
        }
        
        scrollingContainer.appendChild(li);
      });
    }
  };
  
  // ==========================================
  // END OF FILE: ui-row-select-dom.js
  // ==========================================
  