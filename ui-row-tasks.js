// ==========================================
// START OF FILE: ui-row-tasks.js
// ==========================================

const TasksParser = require('./tasks-parser');
const TasksDom = require('./tasks-dom');

module.exports = {
  buildTasksColumn(tableRow, expectedNotePath, app, rowTrackingReference) {
    const cell = document.createElement('td');
    cell.className = 'projectgrid-matrix-cell select-cell projectgrid-uniform-yaml-td';
    
    const btn = document.createElement('div');
    btn.className = 'projectgrid-custom-select-btn projectgrid-tasks-trigger-btn';
    btn.tabIndex = 0;
    btn.textContent = '0/0';

    let activePanel = null;
    let selectionIdx = 0;

    const updateCountersText = async () => {
      const file = app.vault.getAbstractFileByPath(expectedNotePath);
      if (!file) return;
      const content = await app.vault.read(file);
      const parsed = TasksParser.parseTasksSection(content);
      
      btn.textContent = `${parsed.uncheckedCount}/${parsed.totalCount}`;
      rowTrackingReference.launcherValues = rowTrackingReference.launcherValues || {};
      rowTrackingReference.launcherValues['tasks'] = `${parsed.uncheckedCount}/${parsed.totalCount}`;
    };

    const openWideTasksPanel = async () => {
      if (activePanel) activePanel.remove();
      
      activePanel = TasksDom.createPortalContainer(btn);
      const file = app.vault.getAbstractFileByPath(expectedNotePath);
      if (!file) return;
      const content = await app.vault.read(file);
      const data = TasksParser.parseTasksSection(content);
      
      selectionIdx = data.tasks.length > 0 ? 0 : -1;

      const title = document.createElement('div');
      title.className = 'projectgrid-dropup-header-title';
      title.textContent = `🔧 Incoming Tasks List (${data.uncheckedCount} Pending)`;
      activePanel.appendChild(title);

      const inputWrap = document.createElement('div');
      inputWrap.className = 'projectgrid-tags-input-container';
      inputWrap.style.marginBottom = '6px';
      
      const textIn = document.createElement('input');
      textIn.type = 'text'; textIn.className = 'projectgrid-tags-custom-entry-field';
      textIn.placeholder = '➕ Create New Checklist Item...';
      inputWrap.appendChild(textIn);
      activePanel.appendChild(inputWrap);

      const itemsBox = document.createElement('div');
      itemsBox.style.maxHeight = '220px'; itemsBox.style.overflowY = 'auto';
      
      TasksDom.renderInteriorList(itemsBox, data, app, expectedNotePath, openWideTasksPanel);
      activePanel.appendChild(itemsBox);

      const taskOptionRows = itemsBox.querySelectorAll('.projectgrid-dropup-option');

      requestAnimationFrame(() => { 
        if (textIn) textIn.focus(); 
        if (taskOptionRows.length > 0 && selectionIdx === 0) {
          TasksDom.updateVisualRowHighlight(taskOptionRows, 0);
        }
      });

      // PARITY FIX: High-priority capture listener acts as a shell blocking CodeMirror interceptors
      textIn.addEventListener('keydown', async (e) => {
        if (e.key === 'Escape') {
          e.preventDefault(); 
          e.stopPropagation(); 
          e.stopImmediatePropagation(); // Destroys Obsidian canvas editing interception overrides
          
          closeWideTasksPanel();
          return;
        }

        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          if (taskOptionRows.length === 0) return;
          e.preventDefault(); e.stopPropagation();
          
          if (e.key === 'ArrowDown') {
            selectionIdx = (selectionIdx + 1 >= taskOptionRows.length) ? 0 : selectionIdx + 1;
          } else {
            selectionIdx = (selectionIdx - 1 < 0) ? taskOptionRows.length - 1 : selectionIdx - 1;
          }
          TasksDom.updateVisualRowHighlight(taskOptionRows, selectionIdx);
        } 
        else if (e.key === 'Enter') {
          e.preventDefault(); e.stopPropagation();
          const typedText = textIn.value.trim();

          if (typedText === '') {
            if (selectionIdx >= 0 && data.tasks[selectionIdx]) {
              const task = data.tasks[selectionIdx];
              const lineStr = task.checked ? '- [ ] ' + task.text : '- [x] ' + task.text;
              await TasksParser.writeTaskStateChange(app, expectedNotePath, task.lineIndex, lineStr);
              openWideTasksPanel();
            }
          } else {
            await TasksParser.appendNewTaskLine(app, expectedNotePath, '- [ ] ' + typedText, data.lines);
            openWideTasksPanel();
          }
        } 
      }, true); // Capturing parameter intercepts the keystroke before CodeMirror sees it

      document.body.appendChild(activePanel);
      if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(activePanel);
    };

    const closeWideTasksPanel = () => {
      if (activePanel) { activePanel.remove(); activePanel = null; }
      btn.focus(); // Returns focus securely to the cell button trigger
      if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
    };

    btn.addEventListener('focus', () => {
      openWideTasksPanel();
      if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(btn);
      if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(tableRow);
    });

    btn.addEventListener('blur', () => {
      setTimeout(() => {
        if (activePanel && !activePanel.contains(document.activeElement) && document.activeElement !== btn) {
          activePanel.remove(); activePanel = null;
          if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
        }
      }, 180);
      if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(null);
      if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(null);
    });

    btn.addEventListener('mousedown', (e) => { e.stopPropagation(); btn.focus(); });
    
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
        closeWideTasksPanel();
      }
    }, true);

    setTimeout(updateCountersText, 20);
    cell.appendChild(btn);
    tableRow.appendChild(cell);
  }
};

// ==========================================
// END OF FILE: ui-row-tasks.js
// ==========================================
