// ==========================================
// START OF FILE: ui-row-tasks.js
// ==========================================

module.exports = {
    buildTasksColumn(tableRow, expectedNotePath, app, rowTrackingReference) {
      const cell = document.createElement('td');
      cell.className = 'projectgrid-matrix-cell select-cell projectgrid-uniform-yaml-td';
      
      const btn = document.createElement('div');
      btn.className = 'projectgrid-custom-select-btn projectgrid-tasks-trigger-btn';
      btn.tabIndex = 0;
      btn.textContent = '0/0';
  
      let activePanel = null;
  
      const updateCountersText = async () => {
        const file = app.vault.getAbstractFileByPath(expectedNotePath);
        if (!file) return;
        const content = await app.vault.read(file);
        const parsed = parseTasksSection(content);
        
        btn.textContent = `${parsed.uncheckedCount}/${parsed.totalCount}`;
        rowTrackingReference.launcherValues = rowTrackingReference.launcherValues || {};
        rowTrackingReference.launcherValues['tasks'] = `${parsed.uncheckedCount}/${parsed.totalCount}`;
      };
  
      const parseTasksSection = (text) => {
        const lines = text.split('\n');
        let insideTasks = false;
        const tasksList = [];
        let unchecked = 0;
  
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (line.trim().startsWith('## Incoming Tasks')) { insideTasks = true; continue; }
          if (insideTasks && line.trim().startsWith('##')) { break; }
          
          if (insideTasks) {
            const match = line.match(/^\s*-\s*\[([ xX])\]\s*(.*)$/);
            if (match) {
              const isChecked = match[1].toLowerCase() === 'x';
              if (!isChecked) unchecked++;
              tasksList.push({ lineIndex: i, text: match[2].trim(), checked: isChecked, rawLine: line });
            }
          }
        }
        return { tasks: tasksList, uncheckedCount: unchecked, totalCount: tasksList.length, lines };
      };
  
      const openWideTasksPanel = async () => {
        if (activePanel) activePanel.remove();
        activePanel = document.createElement('div');
        activePanel.className = 'projectgrid-wide-tasks-portal';
  
        const rect = btn.getBoundingClientRect();
        Object.assign(activePanel.style, {
          position: 'fixed', top: `${rect.bottom + window.scrollY + 4}px`,
          left: `${Math.max(10, rect.left - 200)}px`, width: '380px'
        });
  
        const file = app.vault.getAbstractFileByPath(expectedNotePath);
        if (!file) return;
        const content = await app.vault.read(file);
        const data = parseTasksSection(content);
  
        const title = document.createElement('div');
        title.className = 'projectgrid-dropup-header-title';
        title.textContent = `🔧 Incoming Tasks List (${data.uncheckedCount} Pending)`;
        activePanel.appendChild(title);
  
        const itemsBox = document.createElement('div');
        itemsBox.style.maxHeight = '220px';
        itemsBox.style.overflowY = 'auto';
  
        data.tasks.forEach(task => {
          const row = document.createElement('div');
          row.className = 'projectgrid-dropup-option';
          row.style.justifyContent = 'space-between';
  
          const left = document.createElement('label');
          left.style.display = 'flex'; left.style.alignItems = 'center'; left.style.gap = '6px';
          
          const cb = document.createElement('input');
          cb.type = 'checkbox'; cb.checked = task.checked;
          cb.tabIndex = -1;
          cb.addEventListener('change', async () => {
            await writeTaskStateChange(task.lineIndex, cb.checked ? '- [x] ' + task.text : '- [ ] ' + task.text);
            openWideTasksPanel();
          });
  
          left.appendChild(cb);
          left.appendChild(document.createTextNode(task.text));
          row.appendChild(left);
  
          const del = document.createElement('span');
          del.innerHTML = '✕'; del.style.cursor = 'pointer'; del.style.color = 'var(--text-error, #ff4757)';
          del.addEventListener('click', async (e) => {
            e.stopPropagation();
            await writeTaskStateChange(task.lineIndex, null);
            openWideTasksPanel();
          });
          row.appendChild(del);
          itemsBox.appendChild(row);
        });
        activePanel.appendChild(itemsBox);
  
        const inputWrap = document.createElement('div');
        inputWrap.className = 'projectgrid-tags-input-container';
        
        const textIn = document.createElement('input');
        textIn.type = 'text'; textIn.className = 'projectgrid-tags-custom-entry-field';
        textIn.placeholder = '➕ Create New Checklist Item...';
        
        textIn.addEventListener('keydown', async (e) => {
          if (e.key === 'Enter' && textIn.value.trim()) {
            e.preventDefault();
            await appendNewTaskLine('- [ ] ' + textIn.value.trim(), data.lines);
            openWideTasksPanel();
          }
        });
        inputWrap.appendChild(textIn);
        activePanel.appendChild(inputWrap);
  
        // --- FIX: ABSOLUTE PORTAL ESCAPE INTERCEPTOR CLOSES PANEL AND FOCUSES BUTTON ---
        activePanel.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            e.preventDefault();
            e.stopPropagation();
            closeWideTasksPanel();
          }
        });
        // ------------------------------------------------------------------------------
  
        document.body.appendChild(activePanel);
        
        // Update our topmost global overlay framework tracker immediately
        if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(activePanel);
      };
  
      const closeWideTasksPanel = () => {
        if (activePanel) {
          activePanel.remove();
          activePanel = null;
        }
        btn.focus(); // Returns active cursor selection cleanly back to the task grid column
        if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
      };
  
      const writeTaskStateChange = async (lineIdx, newlineValue) => {
        const file = app.vault.getAbstractFileByPath(expectedNotePath);
        if (!file) return;
        const content = await app.vault.read(file);
        const lines = content.split('\n');
  
        if (newlineValue === null) lines.splice(lineIdx, 1);
        else lines[lineIdx] = newlineValue;
  
        await app.vault.modify(file, lines.join('\n'));
        await updateCountersText();
      };
  
      const appendNewTaskLine = async (rawLineText, existingLines) => {
        const file = app.vault.getAbstractFileByPath(expectedNotePath);
        if (!file) return;
        
        let headingIndex = existingLines.findIndex(l => l.trim().startsWith('## Incoming Tasks'));
        if (headingIndex === -1) {
          existingLines.push('\n## Incoming Tasks');
          existingLines.push(rawLineText);
        } else {
          existingLines.splice(headingIndex + 1, 0, rawLineText);
        }
  
        await app.vault.modify(file, existingLines.join('\n'));
        await updateCountersText();
      };
  
      btn.addEventListener('focus', () => {
        openWideTasksPanel();
        if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(btn);
        if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(tableRow);
      });
  
      btn.addEventListener('blur', () => {
        // Buffer delay prevents premature destruction when focusing interior inputs
        setTimeout(() => {
          if (activePanel && !activePanel.contains(document.activeElement) && document.activeElement !== btn) {
            activePanel.remove();
            activePanel = null;
            if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
          }
        }, 150);
        if (window.ProjectGridUpdateInputOverlay) window.ProjectGridUpdateInputOverlay(null);
        if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(null);
      });
  
      btn.addEventListener('mousedown', (e) => { e.stopPropagation(); btn.focus(); });
      
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          closeWideTasksPanel();
        }
      });
  
      setTimeout(updateCountersText, 20);
      cell.appendChild(btn);
      tableRow.appendChild(cell);
    }
  };
  
  // ==========================================
  // END OF FILE: ui-row-tasks.js
  // ==========================================
  