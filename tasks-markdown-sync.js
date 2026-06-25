// ==========================================
// START OF FILE: tasks-markdown-sync.js
// ==========================================

const tasksMarkdownSyncModule = {
    getInitialCheckedList(linesArray) {
      let insideTasksHeaderZone = false;
      const checkedTasksList = [];
  
      for (let i = 0; i < linesArray.length; i++) {
        const currentLineText = linesArray[i];
        if (currentLineText.trim().startsWith('## Incoming Tasks')) { insideTasksHeaderZone = true; continue; }
        if (insideTasksHeaderZone && currentLineText.trim().startsWith('##')) { break; }
        
        if (insideTasksHeaderZone) {
          const checkboxMatchSignature = currentLineText.match(/^\s*-\s*\[([ xX])\]\s*(.*)$/);
          if (checkboxMatchSignature) {
            const isChecked = checkboxMatchSignature[1].toLowerCase() === 'x';
            const taskTextString = checkboxMatchSignature[2].trim();
            if (isChecked && taskTextString) {
              checkedTasksList.push(taskTextString);
            }
          }
        }
      }
      return checkedTasksList;
    },
  
    mutateMarkdownCheckboxes(linesArray, targetTaskString, isNowCheckedState) {
      let insideTasks = false;
      for (let i = 0; i < linesArray.length; i++) {
        const line = linesArray[i];
        if (line.trim().startsWith('## Incoming Tasks')) { insideTasks = true; continue; }
        if (insideTasks && line.trim().startsWith('##')) { break; }
        
        if (insideTasks) {
          const match = line.match(/^\s*-\s*\[([ xX])\]\s*(.*)$/);
          if (match && match[2].trim() === targetTaskString) {
            const checkedTokenMarker = isNowCheckedState ? 'x' : ' ';
            linesArray[i] = line.replace(/-\s*\[[ xX]\]/, `- [${checkedTokenMarker}]`);
            break;
          }
        }
      }
      return linesArray.join('\n');
    }
  };
  
  // GLOBAL REGISTRY LOCK: Bypasses hidden IIFE closure walls safely
  globalThis.TasksMarkdownSync = tasksMarkdownSyncModule;
  module.exports = tasksMarkdownSyncModule;
  
  // ==========================================
  // END OF FILE: tasks-markdown-sync.js
  // ==========================================
  