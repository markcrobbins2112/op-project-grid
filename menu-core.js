// ==========================================
// START OF FILE: menu-core.js
// ==========================================

const MenuState = require('./menu-state');
const MenuDom = require('./menu-dom');

module.exports = {
  bindKeyboardEvents(filterInput, rowsArray, containerElement, getVisibleRows, updateFocusIndex) {
    let pickerLevel = 0; // 0 = Closed, 1 = Category Node, 2 = Action Command Item
    let activeItems = [];
    let activeIndex = 0;
    let storedCategoryIndex = 0;
    let activePickerEl = null;

    const closeAllPickers = () => {
      pickerLevel = 0;
      MenuDom.destroyActivePickers(containerElement);
      activePickerEl = null;
      filterInput.focus();
      if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
    };

    const renderMenu = () => {
      activePickerEl = MenuDom.renderPickerBox(filterInput, activeItems, activeIndex, containerElement, (idx) => {
        activeIndex = idx;
        executeSelection();
      }, closeAllPickers);

      setTimeout(() => {
        const activeItem = activePickerEl.querySelector('.projectgrid-picker-highlight');
        if (activeItem && window.ProjectGridUpdateFocusOverlay) {
          window.ProjectGridUpdateFocusOverlay(activeItem);
        }
      }, 10);
    };

    const executeSelection = () => {
      if (pickerLevel === 1) {
        storedCategoryIndex = activeIndex;
        activeItems = activeItems[activeIndex].items;
        pickerLevel = 2;
        activeIndex = 0;
        renderMenu();
      } else if (pickerLevel === 2) {
        const selectedAction = activeItems[activeIndex].action;
        if (selectedAction) {
          selectedAction();
          
          const currentCategoryText = storedCategoryIndex === 3 ? '📶 Sort' : '';
          if (currentCategoryText === '📶 Sort') {
            const targetMenuStateInstance = globalThis.MenuState || MenuState;
            const masterSchema = targetMenuStateInstance.getMenuSchema(filterInput, rowsArray, containerElement, closeAllPickers);
            activeItems = masterSchema[storedCategoryIndex].items;
            renderMenu(); 
            return;
          }
        }
        closeAllPickers();
      }
    };

    // =========================================================================
    // FIXED GLOBAL PORTAL MAPPER
    // =========================================================================
    // Explicitly connects the hamburger toolbar click to your rendering channel
    window.ProjectGridTriggerMenuCorePickerSpawn = (customActiveItems) => {
      pickerLevel = 1; // Explicitly toggle category mode selection
      activeIndex = 0;
      activeItems = customActiveItems;
      renderMenu();
    };
    // =========================================================================

    window.addEventListener('keydown', (evt) => {
      if (evt.key === 'ScrollLock') {
        evt.preventDefault();
        
        if (document.activeElement !== filterInput) {
          filterInput.focus();
          filterInput.select();
        } else {
          pickerLevel = 1;
          activeIndex = 0;
          
          const targetMenuStateInstance = globalThis.MenuState || MenuState;
          activeItems = targetMenuStateInstance.getMenuSchema(filterInput, rowsArray, containerElement, closeAllPickers);
          renderMenu();
        }
      }
    });

    filterInput.addEventListener('keydown', (evt) => {
      const visibleRows = getVisibleRows();

      if (pickerLevel > 0 && activePickerEl) {
        if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp') {
          evt.preventDefault();
          activeIndex = evt.key === 'ArrowDown' ? ((activeIndex + 1) % activeItems.length) : ((activeIndex - 1 + activeItems.length) % activeItems.length);
          
          const items = activePickerEl.querySelectorAll('.projectgrid-picker-item');
          items.forEach((item, idx) => {
            if (idx === activeIndex) {
              item.classList.add('projectgrid-picker-highlight');
              if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(item);
            } else {
              item.classList.remove('projectgrid-picker-highlight');
            }
          });
          return;
        } else if (evt.key === 'Enter') {
          evt.preventDefault();
          executeSelection();
          return;
        } else if (evt.key === 'Escape') {
          evt.preventDefault();
          if (pickerLevel === 2) {
            pickerLevel = 1;
            const targetMenuStateInstance = globalThis.MenuState || MenuState;
            activeItems = targetMenuStateInstance.getMenuSchema(filterInput, rowsArray, containerElement, closeAllPickers);
            activeIndex = storedCategoryIndex;
            renderMenu();
          } else {
            closeAllPickers();
          }
          return;
        }
      }

      if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp') {
        if (visibleRows.length === 0) return;
        evt.preventDefault();
        
        let idx = rowsArray.findIndex(r => r.element && r.element.classList.contains('projectgrid-row-focused'));
        let visibleIdx = visibleRows.findIndex(r => r.element === rowsArray[idx]?.element);

        if (evt.key === 'ArrowDown') {
          visibleIdx = (visibleIdx + 1) >= visibleRows.length ? 0 : visibleIdx + 1;
        } else {
          visibleIdx = (visibleIdx - 1) < 0 ? visibleRows.length - 1 : visibleIdx - 1;
        }

        updateFocusIndex(visibleIdx);
        const targetRow = visibleRows[visibleIdx].element;
        if (window.ProjectGridUpdateRowOverlay) window.ProjectGridUpdateRowOverlay(targetRow);
        if (targetRow) targetRow.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    });
  }
};

// ==========================================
// END OF FILE: menu-core.js
// ==========================================
