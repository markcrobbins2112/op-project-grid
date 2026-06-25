// ==========================================
// START OF FILE: _main.js
// ==========================================

// 1. Core Framework Dependencies
const Obsidian = require('obsidian'); 
const GridConfig = require('./grid-config');
const UiBuilder = require('./ui');
const MainToolbar = require('./main-toolbar');
const MainScanner = require('./main-scanner');
const FilterManager = require('./filter');

// 2. Menu Subsystems & Layout Generators
// FIXED PASS: Load the DOM renderer FIRST so its methods are registered before core listeners execute
const MenuDom = require('./menu-dom');
const MenuStateSort = require('./menu-state-sort');
const MenuStateUtils = require('./menu-state-utils');
const MenuState = require('./menu-state');
const MenuCore = require('./menu-core');

// 3. Grid Row UI Element Factories
const UiColor = require('./ui-color');
const UiRowKeys = require('./ui-row-keys');
const UiRow = require('./ui-row');
const UiRowDates = require('./ui-row-dates');
const UiRowActions = require('./ui-row-actions');
const UiRowTags = require('./ui-row-tags');
const UiRowTagsDom = require('./ui-row-tags-dom');

// 4. Custom Metadata Selector Micro-Modules
const UiRowSelect = require('./ui-row-select');
const UiRowSelectDom = require('./ui-row-select-dom');
const UiRowSelectState = require('./ui-row-select-state');
const UiRowSelectHandlers = require('./ui-row-select-handlers');
const UiRowSelectKeys = require('./ui-row-select-keys');
const UiRowSelectActions = require('./ui-row-select-actions');
const UiRowSelectJumper = require('./ui-row-select-jumper');

// 5. Backend Filesystem Data Sync Hooks
const TasksMarkdownSync = require('./tasks-markdown-sync');
const TasksMarkdownWriter = require('./tasks-markdown-writer');
const TasksGitExtractor = require('./tasks-git-extractor');

class ProjectGridPlugin extends Obsidian.Plugin {
  async onload() {
    console.log('🚀 Loading Project Matrix Grid Dashboard Engine...');

    const StylesAggregator = require('./styles');
    if (StylesAggregator && typeof StylesAggregator.injectStyles === 'function') {
      StylesAggregator.injectStyles();
    }

    this.registerMarkdownCodeBlockProcessor('projectgrid', (sourceText, el, ctx) => {
      const MainRenderer = require('./main-renderer');
      el.className += ' block-language-projectgrid';
      MainRenderer.renderProjectGridDashboard(this, sourceText, el);
    });
  }

  onunload() {
    console.log('🛑 Unloading Project Matrix Grid Dashboard Engine.');
    const styleElement = document.getElementById('obsidian-projectgrid-styles');
    if (styleElement) styleElement.remove();
  }
}

module.exports = ProjectGridPlugin;

// ==========================================
// END OF FILE: _main.js
// ==========================================
