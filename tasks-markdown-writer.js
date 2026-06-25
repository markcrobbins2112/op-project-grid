// ==========================================
// START OF FILE: tasks-markdown-writer.js
// ==========================================

const tasksMarkdownWriterModule = {
    async appendAndRefreshVault(app, expectedNotePath, taskText, btnElement, scrollingContainer, optionsList, activeValuesArray, updateVisualSelectionCallback) {
      const fileAbstract = app.vault.getAbstractFileByPath(expectedNotePath);
      if (!fileAbstract) return;
  
      const rawContent = await app.vault.read(fileAbstract);
      const lines = rawContent.split('\n');
      
      let headingIndex = lines.findIndex(l => l.trim().startsWith('## Incoming Tasks'));
      const newTaskLineStr = `- [ ] ${taskText}`;
  
      if (headingIndex === -1) {
        lines.push('\n## Incoming Tasks');
        lines.push(newTaskLineStr);
      } else {
        lines.splice(headingIndex + 1, 0, newTaskLineStr);
      }
  
      await app.vault.modify(fileAbstract, lines.join('\n'));
      
      if (!optionsList.includes(taskText)) {
        optionsList.push(taskText);
        
        if (!window.ProjectGridDiscoveredActualTasksList) window.ProjectGridDiscoveredActualTasksList = [];
        if (!window.ProjectGridDiscoveredActualTasksList.includes(taskText)) {
          window.ProjectGridDiscoveredActualTasksList.push(taskText);
          window.ProjectGridDiscoveredActualTasksList.sort();
        }
  
        const li = document.createElement('div');
        li.className = 'projectgrid-custom-dropdown-item';
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.gap = '6px';
        li.style.textAlign = 'left';
  
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.tabIndex = -1;
        cb.checked = activeValuesArray.includes(taskText);
        cb.style.margin = '0';
        cb.style.cursor = 'pointer';
  
        li.appendChild(cb);
        li.appendChild(document.createTextNode(taskText));
        scrollingContainer.appendChild(li);
  
        // FIXED: Bind the interaction handler once, immediately on generation. No DOM mutation cascades.
        li.addEventListener('click', async (e) => {
          e.preventDefault(); e.stopPropagation();
          
          if (activeValuesArray.includes(taskText)) {
            activeValuesArray.splice(activeValuesArray.indexOf(taskText), 1);
          } else {
            activeValuesArray.push(taskText);
          }
          cb.checked = activeValuesArray.includes(taskText);
          
          const activeSelectModule = globalThis.UiRowSelect || require('./ui-row-select');
          if (activeSelectModule && typeof activeSelectModule._triggerDirectCommit === 'function') {
            await activeSelectModule._triggerDirectCommit(app, expectedNotePath, activeValuesArray.join(', '), taskText, cb.checked, btnElement, optionsList, activeValuesArray);
          }
          updateVisualSelectionCallback(optionsList.indexOf(taskText));
        });
      }
  
      const totalCount = optionsList.length;
      btnElement.textContent = `${activeValuesArray.length}/${totalCount}`;
      
      updateVisualSelectionCallback(optionsList.length - 1);
    }
  };
  
  globalThis.TasksMarkdownWriter = tasksMarkdownWriterModule;
  module.exports = tasksMarkdownWriterModule;
  
  // ==========================================
  // END OF FILE: tasks-markdown-writer.js
  // ==========================================
  