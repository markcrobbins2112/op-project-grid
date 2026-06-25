// ==========================================
// START OF FILE: tasks-dom.js
// ==========================================

const TasksParser = require('./tasks-parser');

module.exports = {
  createPortalContainer(btn) {
    const panel = document.createElement('div');
    panel.className = 'projectgrid-wide-tasks-portal';

    const rect = btn.getBoundingClientRect();
    Object.assign(panel.style, {
      position: 'fixed', 
      top: `${rect.bottom + window.scrollY + 4}px`,
      left: `${Math.max(10, rect.left - 100)}px`, 
      width: '380px',
      display: 'flex',
      flexDirection: 'column'
    });
    return panel;
  },

  renderInteriorList(itemsBox, data, app, expectedNotePath, onRefresh) {
    itemsBox.innerHTML = '';
    
    data.tasks.forEach((task, tIdx) => {
      const row = document.createElement('div');
      row.className = 'projectgrid-dropup-option';
      row.style.justifyContent = 'space-between';
      row.style.cursor = 'pointer';
      row.setAttribute('data-task-index', tIdx);

      // Protect text selection container boundaries from dropping workspace handles
      row.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });

      const left = document.createElement('div');
      left.style.display = 'flex'; 
      left.style.alignItems = 'center'; 
      left.style.gap = '8px';
      left.style.width = '100%';
      
      // SIMULATION LAYER: Replicate checkbox styling with a high-utility text token block
      const simulatedCheckbox = document.createElement('span');
      simulatedCheckbox.style.fontFamily = 'var(--font-monospace, monospace)';
      simulatedCheckbox.style.fontWeight = 'bold';
      simulatedCheckbox.style.color = task.checked ? 'var(--text-accent, #70a1ff)' : 'var(--text-muted, #888888)';
      simulatedCheckbox.textContent = task.checked ? '[x]' : '[ ]';
      
      const textLabel = document.createElement('span');
      textLabel.textContent = task.text;
      if (task.checked) {
        textLabel.style.textDecoration = 'line-through';
        textLabel.style.opacity = '0.5';
      }

      left.appendChild(simulatedCheckbox);
      left.appendChild(textLabel);
      row.appendChild(left);

      // Handle simulated row click selections programmatically
      row.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const lineStr = !task.checked ? '- [x] ' + task.text : '- [ ] ' + task.text;
        await TasksParser.writeTaskStateChange(app, expectedNotePath, task.lineIndex, lineStr);
        onRefresh();
      });

      const del = document.createElement('span');
      del.innerHTML = '✕'; 
      del.style.cursor = 'pointer'; 
      del.style.color = 'var(--text-error, #ff4757)';
      del.style.paddingLeft = '6px';
      
      del.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
      
      del.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await TasksParser.writeTaskStateChange(app, expectedNotePath, task.lineIndex, null);
        onRefresh();
      });
      row.appendChild(del);
      itemsBox.appendChild(row);
    });
  },

  updateVisualRowHighlight(taskOptionRows, currentSelectionIndex) {
    taskOptionRows.forEach((rowEl, rIdx) => {
      if (rIdx === currentSelectionIndex) {
        rowEl.classList.add('projectgrid-picker-highlight');
        rowEl.classList.add('projectgrid-row-focused');
        rowEl.scrollIntoView({ block: 'nearest' });
      } else {
        rowEl.classList.remove('projectgrid-picker-highlight');
        rowEl.classList.remove('projectgrid-row-focused');
      }
    });
  }
};

// ==========================================
// END OF FILE: tasks-dom.js
// ==========================================
