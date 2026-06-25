// ==========================================
// START OF FILE: tasks-parser.js
// ==========================================

module.exports = {
    parseTasksSection(text) {
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
    },
  
    async writeTaskStateChange(app, expectedNotePath, lineIdx, newlineValue) {
      const file = app.vault.getAbstractFileByPath(expectedNotePath);
      if (!file) return;
      const content = await app.vault.read(file);
      const lines = content.split('\n');
  
      if (newlineValue === null) lines.splice(lineIdx, 1);
      else lines[lineIdx] = newlineValue;
  
      await app.vault.modify(file, lines.join('\n'));
    },
  
    async appendNewTaskLine(app, expectedNotePath, rawLineText, existingLines) {
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
    }
  };
  
  // ==========================================
  // END OF FILE: tasks-parser.js
  // ==========================================
  