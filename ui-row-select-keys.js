// ==========================================
// START OF FILE: ui-row-select-keys.js
// ==========================================

module.exports = {
    setupKeyboardRouting(ctx, isMarkdownFileTarget, itemsContainer, customInput, onCommitCallback, onCloseCallback, onDeleteCallback, onF2JumpCallback) {
      
      const filterDropdownItemsList = () => {
        if (!customInput) return;
        const queryText = customInput.value.toLowerCase().trim();
        const itemsList = itemsContainer.querySelectorAll('.projectgrid-custom-dropdown-item');
        
        let firstVisibleIdx = -1;
        let idxCounter = 0;
  
        itemsList.forEach((li) => {
          const valueText = li.getAttribute('data-value').toLowerCase();
          let matchPosition = 0;
          let isMatchFound = true;
          
          for (let charIdx = 0; charIdx < queryText.length; charIdx++) {
            matchPosition = valueText.indexOf(queryText[charIdx], matchPosition);
            if (matchPosition === -1) { isMatchFound = false; break; }
            matchPosition++;
          }
  
          if (isMatchFound) {
            li.style.display = 'flex';
            if (firstVisibleIdx === -1) firstVisibleIdx = idxCounter;
          } else {
            li.style.display = 'none';
          }
          idxCounter++;
        });
  
        if (firstVisibleIdx !== -1 && !itemsList[ctx.selectionIdx]?.style.display === 'none') {
          // Retain position if it passes query constraints
        } else if (firstVisibleIdx !== -1) {
          ctx.selectionIdx = firstVisibleIdx;
          ctx.updateVisualSelection();
        }
      };
  
      if (customInput) {
        customInput.addEventListener('input', filterDropdownItemsList);
      }
  
      const handleKeyRouting = async (e, isInputNode) => {
        const itemsList = Array.from(itemsContainer.querySelectorAll('.projectgrid-custom-dropdown-item'));
        const visibleItems = itemsList.filter(item => item.style.display !== 'none');
        
        if (e.ctrlKey && (e.key === 'Delete' || e.key === 'Backspace')) {
          e.preventDefault(); e.stopPropagation();
          if (isMarkdownFileTarget && itemsList[ctx.selectionIdx]) {
            await onDeleteCallback(itemsList[ctx.selectionIdx].getAttribute('data-value'));
          }
          return;
        }
  
        if (e.key === 'F2') {
          e.preventDefault(); e.stopPropagation();
          const targetVal = itemsList[ctx.selectionIdx] ? itemsList[ctx.selectionIdx].getAttribute('data-value') : null;
          onF2JumpCallback(targetVal);
          return;
        }
  
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault(); e.stopPropagation();
          if (visibleItems.length === 0) return;
          
          let currentVisibleIdx = visibleItems.indexOf(itemsList[ctx.selectionIdx]);
          if (currentVisibleIdx === -1) currentVisibleIdx = 0;
  
          let nextVisibleIdx = e.key === 'ArrowDown' ? 
            ((currentVisibleIdx + 1) % visibleItems.length) : 
            ((currentVisibleIdx - 1 + visibleItems.length) % visibleItems.length);
            
          ctx.selectionIdx = itemsList.indexOf(visibleItems[nextVisibleIdx]);
          ctx.updateVisualSelection();
          return;
        }
  
        if (e.key === 'Enter' || (!isInputNode && (e.key === ' ' || e.key === 'Spacebar'))) {
          e.preventDefault(); e.stopPropagation();
          
          const typedVal = customInput ? customInput.value.trim() : '';
          const matchingNode = visibleItems.find(item => item.getAttribute('data-value').toLowerCase() === typedVal.toLowerCase());
          
          if (matchingNode) {
            ctx.selectionIdx = itemsList.indexOf(matchingNode);
            await onCommitCallback('', false);
          } else {
            await onCommitCallback(typedVal, isInputNode);
          }
          if (customInput) customInput.value = '';
          filterDropdownItemsList();
          return;
        }
  
        if (e.key === 'Escape') { 
          e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
          onCloseCallback();
        }
      };
  
      if (customInput) {
        customInput.addEventListener('keydown', (e) => handleKeyRouting(e, true));
      } else {
        itemsContainer.parentElement.addEventListener('keydown', (e) => handleKeyRouting(e, false));
      }
      
      // Return filter refresh hook handles to align layout resets
      return { triggerFuzzyReset: filterDropdownItemsList };
    }
  };
  
  globalThis.UiRowSelectKeys = module.exports;
  
  // ==========================================
  // END OF FILE: ui-row-select-keys.js
  // ==========================================
  