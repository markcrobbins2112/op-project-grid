// ==========================================
// START OF FILE: ui-dropdown-dom.js
// ==========================================

module.exports = {
    createPanelContainer(triggerElement) {
      const panel = document.createElement('div');
      panel.className = 'projectgrid-dropup-panel';
  
      const rect = triggerElement.getBoundingClientRect();
      Object.assign(panel.style, {
        position: 'fixed', 
        bottom: `${window.innerHeight - rect.top + 4}px`,
        left: `${rect.left + window.scrollX}px`, 
        zIndex: '300000', 
        height: 'auto',
        display: 'flex', 
        flexDirection: 'column', 
        width: '150px'
      });
  
      return panel;
    },
  
    buildOptionsList(scrollingContainer, fullOptionsList, defaults, activeFilters, onToggle) {
      fullOptionsList.forEach((opt) => {
        const wrapper = document.createElement('label');
        wrapper.className = 'projectgrid-dropup-option';
  
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.tabIndex = -1; 
        
        if (opt === '[ALL]') {
          checkbox.checked = (activeFilters.size === defaults.length);
        } else {
          checkbox.checked = activeFilters.has(opt);
        }
  
        checkbox.addEventListener('change', () => onToggle(opt, checkbox.checked));
  
        wrapper.appendChild(checkbox);
        wrapper.appendChild(document.createTextNode(opt));
        scrollingContainer.appendChild(wrapper);
      });
    }
  };
  
  // ==========================================
  // END OF FILE: ui-dropdown-dom.js
  // ==========================================
  