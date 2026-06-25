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
    let fallbackRowTrackIdx = 0; // Keep track of current selected spreadsheet row index

    const getActiveDomEngine = () => globalThis.MenuDom || MenuDom;

    const closeAllPickers = () => {
      pickerLevel = 0;
      const domEngine = getActiveDomEngine();
      if (domEngine && typeof domEngine.destroyActivePickers === 'function') {
        domEngine.destroyActivePickers(containerElement);
      }
      activePickerEl = null;
      filterInput.focus();
      if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(null);
    };

    const renderMenu = () => {
      const domEngine = getActiveDomEngine();
      if (!domEngine || typeof domEngine.renderPickerBox !== 'function') return;

      activePickerEl = domEngine.renderPickerBox(filterInput, activeItems, activeIndex, containerElement, (idx) => {
        activeIndex = idx;
        executeSelection();
      }, closeAllPickers);

      setTimeout(() => {
        const items = activePickerEl.querySelectorAll('.projectgrid-picker-item');
        if (items.length > 0 && activeItems[activeIndex]?.isHeaderTitle) {
          activeIndex = (activeIndex + 1) % activeItems.length;
          renderMenu();
          return;
        }

        const activeItem = activePickerEl.querySelector('.projectgrid-picker-highlight');
        if (activeItem && window.ProjectGridUpdateFocusOverlay) {
          window.ProjectGridUpdateFocusOverlay(activeItem);
        }
      }, 10);
    };

    const executeSelection = () => {
      if (pickerLevel === 1) {
        storedCategoryIndex = activeIndex;
        // Inject current row lookup fallback tracks parameters explicitly
        const targetMenuStateInstance = globalThis.MenuState || MenuState;
        const schemaWithLivePaths = targetMenuStateInstance.getMenuSchema(filterInput, rowsArray, containerElement, closeAllPickers, fallbackRowTrackIdx);
        
        activeItems = schemaWithLivePaths[activeIndex].items;
        pickerLevel = 2;
        activeIndex = (activeItems && activeItems[0]?.isHeaderTitle) ? 1 : 0;
        renderMenu();
      } else if (pickerLevel === 2) {
        const selectedAction = activeItems[activeIndex].action;
        if (selectedAction) {
          selectedAction();
          
          const currentCategoryText = (storedCategoryIndex === 3) ? 'Sort' : '';
          if (currentCategoryText === 'Sort') {
            const targetMenuStateInstance = globalThis.MenuState || MenuState;
            const masterSchema = targetMenuStateInstance.getMenuSchema(filterInput, rowsArray, containerElement, closeAllPickers, fallbackRowTrackIdx);
            activeItems = masterSchema[storedCategoryIndex].items;
            renderMenu(); 
            return;
          }
        }
        closeAllPickers();
      }
    };

    window.ProjectGridTriggerMenuCorePickerSpawn = (customActiveItems) => {
      pickerLevel = 1; activeIndex = 0; activeItems = customActiveItems;
      renderMenu();
    };

    window.addEventListener('keydown', (evt) => {
      if (evt.key === 'ScrollLock') {
        evt.preventDefault();
        if (document.activeElement !== filterInput) {
          filterInput.focus(); filterInput.select();
        } else {
          pickerLevel = 1; activeIndex = 0;
          const targetMenuStateInstance = globalThis.MenuState || MenuState;
          activeItems = targetMenuStateInstance.getMenuSchema(filterInput, rowsArray, containerElement, closeAllPickers, fallbackRowTrackIdx);
          renderMenu();
        }
      }
    });

    filterInput.addEventListener('keydown', (evt) => {
      const visibleRows = getVisibleRows();

      if (pickerLevel > 0 && activePickerEl) {
        // FIXED MNEMONIC BACKSPACE INTERCEPT: Redirects Backspace keys strokes straight into Escape handles loops
        if (evt.key === 'Escape' || evt.key === 'Backspace') {
          evt.preventDefault(); evt.stopPropagation();
          if (pickerLevel === 2) {
            pickerLevel = 1;
            const targetMenuStateInstance = globalThis.MenuState || MenuState;
            activeItems = targetMenuStateInstance.getMenuSchema(filterInput, rowsArray, containerElement, closeAllPickers, fallbackRowTrackIdx);
            activeIndex = storedCategoryIndex;
            renderMenu();
          } else {
            closeAllPickers();
          }
          return;
        }

        if (pickerLevel === 1) {
          const typedChar = evt.key.toLowerCase();
          const matchedCategoryIdx = activeItems.findIndex(cat => cat.acceleratorKey === typedChar);
          if (matchedCategoryIdx > -1) {
            evt.preventDefault(); evt.stopPropagation();
            activeIndex = matchedCategoryIdx; executeSelection(); return;
          }
        }

        if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp') {
          evt.preventDefault();
          let attempts = 0;
          do {
            activeIndex = evt.key === 'ArrowDown' ? ((activeIndex + 1) % activeItems.length) : ((activeIndex - 1 + activeItems.length) % activeItems.length);
            attempts++;
          } while (activeItems[activeIndex]?.isHeaderTitle && attempts < activeItems.length);
          
          const items = activePickerEl.querySelectorAll('.projectgrid-picker-item, .projectgrid-dropup-header-title');
          items.forEach((item, idx) => {
            if (idx === activeIndex && !activeItems[idx].isHeaderTitle) {
              item.classList.add('projectgrid-picker-highlight');
              if (window.ProjectGridUpdateFocusOverlay) window.ProjectGridUpdateFocusOverlay(item);
            } else {
              item.classList.remove('projectgrid-picker-highlight');
            }
          });
          return;
        } else if (evt.key === 'Enter') {
          evt.preventDefault(); executeSelection(); return;
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

        // Cache baseline index tracking to bridge variable voids
        fallbackRowTrackIdx = rowsArray.indexOf(visibleRows[visibleIdx]);

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
