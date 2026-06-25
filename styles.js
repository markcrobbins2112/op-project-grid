// ==========================================
// START OF FILE: styles.js
// ==========================================

const StylesCore = require('./styles-core');
const StylesAnimation = require('./styles-animation');
const StylesComponents = require('./styles-components');

module.exports = {
  injectStyles() {
    if (document.getElementById('obsidian-projectgrid-styles')) return;

    const styleEl = document.createElement('style');
    styleEl.id = 'obsidian-projectgrid-styles';

    // Concatenate your isolated logical modules sequentially into the template rule
    styleEl.innerHTML = 
      StylesCore.getCoreStyles() + 
      StylesAnimation.getAnimationStyles() + 
      StylesComponents.getComponentStyles();

    document.head.appendChild(styleEl);
  }
};

// ==========================================
// END OF FILE: styles.js
// ==========================================
