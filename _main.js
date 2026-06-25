// ==========================================
// START OF FILE: _main.js
// ==========================================

const { Plugin } = require('obsidian');
const StylesManager = require('./styles');
const MainShortcuts = require('./main-shortcuts');
const MainRenderer = require('./main-renderer');

module.exports = class ProjectGridPlugin extends Plugin {
  async onload() {
    console.log('%c[ProjectGrid]%c Core initialized...', 'color: #00d2d3; font-weight: bold;', 'color: default;');
    StylesManager.injectStyles();

    window.ProjectGridTutorModeActive = false;

    // DELEGATE SHORTCUTS: Hook shortcuts array priorities securely via the dedicated manager module
    MainShortcuts.registerGlobalPluginScopes(this);

    this.registerMarkdownCodeBlockProcessor('projectgrid', (sourceText, element) => {
      // DELEGATE RENDERING: Render grid elements cleanly via our isolated factory engine module
      MainRenderer.renderProjectGridDashboard(this, sourceText, element);
    });
  }

  onunload() {
    const styleEl = document.getElementById('obsidian-projectgrid-styles');
    if (styleEl) styleEl.remove();
    document.querySelectorAll('.projectgrid-focus-overlay-portal, .projectgrid-input-overlay-portal, .projectgrid-row-overlay-portal, .projectgrid-wide-tasks-portal, .projectgrid-tutor-tooltip-portal').forEach(el => el.remove());
  }
};

// ==========================================
// END OF FILE: _main.js
// ==========================================
