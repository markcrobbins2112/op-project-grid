// ==========================================
// START OF FILE: ui-row-select-jumper.js
// ==========================================

module.exports = {
    async jumpToSourceLineLocation(taskTextToFind, expectedNotePath, app, closeDropdownCallback) {
      closeDropdownCallback();
      await app.workspace.openLinkText(expectedNotePath, '', false);
      
      if (!taskTextToFind) return;
      
      setTimeout(() => {
        const activeLeafView = app.workspace.getActiveViewOfType(require('obsidian').MarkdownView);
        if (activeLeafView && activeLeafView.editor) {
          const editorInstance = activeLeafView.editor;
          const fullTextDoc = editorInstance.getValue();
          const textLines = fullTextDoc.split('\n');
          
          let matchedLineIndex = -1;
          for (let i = 0; i < textLines.length; i++) {
            if (textLines[i].includes(taskTextToFind)) {
              matchedLineIndex = i;
              break;
            }
          }
  
          if (matchedLineIndex !== -1) {
            editorInstance.setCursor({ line: matchedLineIndex, ch: 0 });
            editorInstance.focus();
            
            if (typeof editorInstance.scrollIntoView === 'function') {
              editorInstance.scrollIntoView({ 
                from: { line: matchedLineIndex, ch: 0 }, 
                to: { line: matchedLineIndex, ch: 20 } 
              }, true);
            }
          }
        }
      }, 120);
    }
  };
  
  globalThis.UiRowSelectJumper = module.exports;
  
  // ==========================================
  // END OF FILE: ui-row-select-jumper.js
  // ==========================================
  