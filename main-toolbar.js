// ==========================================
// START OF FILE: main-toolbar.js
// ==========================================

module.exports = {
    createToolbarLayout(containerElement, onGearClick) {
      const toolbar = document.createElement('div');
      toolbar.className = 'projectgrid-toolbar';
      
      const toolbarBtn = document.createElement('button');
      toolbarBtn.className = 'projectgrid-toolbar-btn';
      toolbarBtn.innerHTML = '⚙️';
      toolbarBtn.title = 'Open ScrollLock System Commands Picker Menu';
      toolbar.appendChild(toolbarBtn);
  
      const tutorToggleBtn = document.createElement('button');
      tutorToggleBtn.className = 'projectgrid-toolbar-btn projectgrid-tutor-toggle-btn';
      tutorToggleBtn.innerHTML = '❔';
      tutorToggleBtn.title = 'Toggle Tutor HUD Context Help Box Overlay (Ctrl+Alt+T)';
      toolbar.appendChild(tutorToggleBtn);
  
      const sortLabel = document.createElement('span');
      sortLabel.id = 'projectgrid-sort-toolbar-label';
      sortLabel.className = 'projectgrid-sort-indicator-label';
      sortLabel.style.fontSize = '11px';
      sortLabel.style.marginLeft = '8px';
      sortLabel.style.color = 'var(--text-muted)';
      sortLabel.textContent = '📶 Default Directory Sort Order';
      toolbar.appendChild(sortLabel);
      
      containerElement.appendChild(toolbar);
  
      toolbarBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        onGearClick();
      });
  
      const handleTutorToggle = () => {
        window.ProjectGridTutorModeActive = !window.ProjectGridTutorModeActive;
        if (window.ProjectGridTutorModeActive) {
          tutorToggleBtn.classList.add('projectgrid-tutor-active');
          tutorToggleBtn.style.backgroundColor = 'var(--text-accent, #70a1ff)';
          tutorToggleBtn.style.color = '#000000';
          if (window.ProjectGridTriggerTutorHelpBoxRedraw) {
            window.ProjectGridTriggerTutorHelpBoxRedraw(document.activeElement);
          }
        } else {
          tutorToggleBtn.classList.remove('projectgrid-tutor-active');
          tutorToggleBtn.style.backgroundColor = 'transparent';
          tutorToggleBtn.style.color = 'var(--text-normal)';
          const oldTip = document.getElementById('projectgrid-tutor-tooltip-portal');
          if (oldTip) oldTip.style.display = 'none';
        }
      };
  
      tutorToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleTutorToggle();
      });
  
      return { handleTutorToggle };
    }
  };
  
  // ==========================================
  // END OF FILE: main-toolbar.js
  // ==========================================
  