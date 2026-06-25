// ==========================================
// START OF FILE: ui-row-select-keys.js
// ==========================================

module.exports = {
    setupKeyboardRouting(ctx, optionsList, isMarkdownFileTarget, itemsContainer, customInput, onCommitCallback, onCloseCallback) {
      const handleKeyRouting = async (e, isInputNode) => {
        const currentItemsCount = itemsContainer.querySelectorAll('.projectgrid-custom-dropdown-item').length;
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault(); e.stopPropagation();
          ctx.selectionIdx = e.key === 'ArrowDown' ? ((ctx.selectionIdx + 1) % currentItemsCount) : ((ctx.selectionIdx - 1 + currentItemsCount) % currentItemsCount);
          ctx.updateVisualSelection();
        } else if (e.key === 'Enter' || (!isInputNode && (e.key === ' ' || e.key === 'Spacebar'))) {
          e.preventDefault(); e.stopPropagation();
          const val = isInputNode ? customInput.value.trim() : '';
          await onCommitCallback(val, isInputNode);
        } else if (e.key === 'Escape') { 
          e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
          onCloseCallback();
        }
      };
  
      if (customInput) {
        customInput.addEventListener('keydown', (e) => handleKeyRouting(e, true));
      } else {
        itemsContainer.parentElement.addEventListener('keydown', (e) => handleKeyRouting(e, false));
      }
    }
  };
  
  globalThis.UiRowSelectKeys = module.exports;
  
  // ==========================================
  // END OF FILE: ui-row-select-keys.js
  // ==========================================
  