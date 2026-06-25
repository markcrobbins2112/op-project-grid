// ==========================================
// START OF FILE: tasks-markdown-writer.js
// ==========================================

const tasksMarkdownWriterModule = {
    async appendAndRefreshVault(app, expectedNotePath, taskText, btnElement) {
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
      
      if (window.ProjectGridTriggerFilterUpdate) {
        const liveContainer = btnElement.closest('.block-language-projectgrid');
        const mainTableBody = liveContainer ? liveContainer.querySelector('tbody') : null;
        const mainInput = liveContainer ? liveContainer.querySelector('.projectgrid-filter-input') : null;
        
        if (mainTableBody && mainInput && window.ProjectGridActiveRowsTrackingArrayRegistryPool) {
          mainTableBody.innerHTML = '';
          window.ProjectGridActiveRowsTrackingArrayRegistryPool.length = 0;
          
          const MainScanner = require('./main-scanner');
          const absoluteVaultRoot = app.vault.adapter.getBasePath();
          const rootTarget = liveContainer.closest('.cm-embed-block')?.textContent?.trim() || "__";
          
          MainScanner.scanVaultProjectsFolders(
            app, rootTarget, absoluteVaultRoot, mainTableBody, window.ProjectGridActiveRowsTrackingArrayRegistryPool, mainInput
          );
        }
      }
    }
  };
  
  // GLOBAL REGISTRY LOCK: Bypasses hidden IIFE closure walls safely
  globalThis.TasksMarkdownWriter = tasksMarkdownWriterModule;
  module.exports = tasksMarkdownWriterModule;
  
  // ==========================================
  // END OF FILE: tasks-markdown-writer.js
  // ==========================================
  