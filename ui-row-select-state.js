// ==========================================
// START OF FILE: ui-row-select-state.js
// ==========================================

module.exports = {
    initializeButtonState(btn, cfg, frontmatter, rowTrackingReference) {
      const isMarkdownFileTarget = (cfg.key === 'tasks');
      const rawVal = frontmatter && frontmatter[cfg.key] !== undefined ? String(frontmatter[cfg.key]) : '';
      
      let activeValuesArray = (rawVal && rawVal !== '⬛') ? rawVal.split(',').map(v => v.trim()).filter(v => v.length > 0) : [];
  
      if (isMarkdownFileTarget) {
        const totalCount = cfg.defaults.filter(d => d !== '⬛').length;
        btn.textContent = `${activeValuesArray.length}/${totalCount}`;
      } else {
        btn.textContent = rawVal || '⬛';
      }
      
      if (rowTrackingReference && rowTrackingReference.yamlMetadataValues) {
        rowTrackingReference.yamlMetadataValues[cfg.key] = btn.textContent;
      }
  
      let optionsList = isMarkdownFileTarget ? [...cfg.defaults.filter(d => d !== '⬛')] : ['⬛', ...cfg.defaults.filter(d => d !== '⬛')];
      if (rawVal && !isMarkdownFileTarget && !optionsList.includes(rawVal)) optionsList.push(rawVal);
  
      return { isMarkdownFileTarget, activeValuesArray, optionsList };
    }
  };
  
  globalThis.UiRowSelectState = module.exports;
  
  // ==========================================
  // END OF FILE: ui-row-select-state.js
  // ==========================================
  