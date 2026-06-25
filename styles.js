// ==========================================
// START OF FILE: styles.js
// ==========================================

const StylesCore = require('./styles-core');
const StylesAnimation = require('./styles-animation');
const StylesComponentsToolbar = require('./styles-components-toolbar');
const StylesComponentsDropdown = require('./styles-components-dropdown');
const StylesComponentsOverlays = require('./styles-components-overlays');

module.exports = {
  injectStyles() {
    let styleElement = document.getElementById('obsidian-projectgrid-styles');
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'obsidian-projectgrid-styles';
      document.head.appendChild(styleElement);
    }

    const compiledCss = `
      ${StylesCore.getCoreStyles()}
      ${StylesAnimation.getAnimationStyles()}
      ${StylesComponentsToolbar.getToolbarStyles()}
      ${StylesComponentsDropdown.getDropdownStyles()}
      ${StylesComponentsOverlays.getOverlayStyles()}
    `;

    styleElement.textContent = compiledCss;
  }
};

// ==========================================
// END OF FILE: styles.js
// ==========================================
