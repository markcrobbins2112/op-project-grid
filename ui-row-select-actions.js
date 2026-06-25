// ==========================================
// START OF FILE: ui-row-select-actions.js
// ==========================================

module.exports = {
    async executeItemDeletion(valueToDestroy, expectedNotePath, cfg, app, btnElement, state, ctx, refreshCallback) {
      const fileAbstract = app.vault.getAbstractFileByPath(expectedNotePath);
      if (!fileAbstract || !globalThis.TasksMarkdownSync) return;
  
      const rawContent = await app.vault.read(fileAbstract);
      const processedText = globalThis.TasksMarkdownSync.deleteTaskLineEntry(rawContent.split('\n'), valueToDestroy);
      await app.vault.modify(fileAbstract, processedText);
      
      // Purge item traces out of cached memory structures synchronously
      state.optionsList = state.optionsList.filter(o => o !== valueToDestroy);
      state.activeValuesArray = state.activeValuesArray.filter(v => v !== valueToDestroy);
      if (window.ProjectGridDiscoveredActualTasksList) {
        window.ProjectGridDiscoveredActualTasksList = window.ProjectGridDiscoveredActualTasksList.filter(t => t !== valueToDestroy);
      }
      
      btnElement.textContent = `${state.activeValuesArray.length}/${state.optionsList.length}`;
      ctx.selectionIdx = 0;
      
      refreshCallback();
      ctx.updateVisualSelection();
      if (window.ProjectGridTriggerFilterUpdate) window.ProjectGridTriggerFilterUpdate();
    }
  };
  
  globalThis.UiRowSelectActions = module.exports;
  
  // ==========================================
  // END OF FILE: ui-row-select-actions.js
  // ==========================================
  