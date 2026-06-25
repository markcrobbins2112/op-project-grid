// ==========================================
// START OF FILE: _main.js
// ==========================================

const { Plugin } = require('obsidian');
const StylesManager = require('./styles');
const FilterManager = require('./filter');
const UiBuilder = require('./ui');

module.exports = class ProjectGridPlugin extends Plugin {
  async onload() {
    console.log('%c[ProjectGrid]%c Core initialized...', 'color: #00d2d3; font-weight: bold;', 'color: default;');
    StylesManager.injectStyles();

    // Initialize the global tutor state tracker defaults to false on first boot
    window.ProjectGridTutorModeActive = false;

    this.registerMarkdownCodeBlockProcessor('projectgrid', (sourceText, element) => {
      this.renderProjectGridDashboard(sourceText, element);
    });
  }

  onunload() {
    const styleEl = document.getElementById('obsidian-projectgrid-styles');
    if (styleEl) styleEl.remove();
    document.querySelectorAll('.projectgrid-focus-overlay-portal, .projectgrid-input-overlay-portal, .projectgrid-row-overlay-portal, .projectgrid-wide-tasks-portal, .projectgrid-tutor-tooltip-portal').forEach(el => el.remove());
  }

  renderProjectGridDashboard(sourceText, containerElement) {
    const rootTarget = sourceText.trim() || "__";
    const absoluteVaultRoot = this.app.vault.adapter.getBasePath();
    const targetFolders = this.app.vault.getAllLoadedFiles().filter(file => file.children && file.path.startsWith(rootTarget));

    // Create the master horizontal toolbar wrapper
    const toolbar = document.createElement('div');
    toolbar.className = 'projectgrid-toolbar';
    
    // System command picker gear configuration btn button icon
    const toolbarBtn = document.createElement('button');
    toolbarBtn.className = 'projectgrid-toolbar-btn';
    toolbarBtn.innerHTML = '⚙️';
    toolbarBtn.title = 'Open ScrollLock System Commands Picker Menu';
    toolbar.appendChild(toolbarBtn);

    // FIX: ADD THE INTERACTIVE TUTOR TOGGLE BUTTON TRACK NEXT TO THE GEAR ICON Btn
    const tutorToggleBtn = document.createElement('button');
    tutorToggleBtn.className = 'projectgrid-toolbar-btn projectgrid-tutor-toggle-btn';
    tutorToggleBtn.innerHTML = '❔';
    tutorToggleBtn.title = 'Toggle Tutor HUD Context Help Box Overlay (Ctrl+Alt+T)';
    toolbar.appendChild(tutorToggleBtn);

    // Dynamic text span string block layout displaying multi-choice sort chain pipelines
    const sortLabel = document.createElement('span');
    sortLabel.id = 'projectgrid-sort-toolbar-label';
    sortLabel.className = 'projectgrid-sort-indicator-label';
    sortLabel.style.fontSize = '11px';
    sortLabel.style.marginLeft = '8px';
    sortLabel.style.color = 'var(--text-muted)';
    sortLabel.textContent = '📶 Default Directory Sort Order';
    toolbar.appendChild(sortLabel);
    
    containerElement.appendChild(toolbar);

    const tableElement = document.createElement('table');
    tableElement.className = 'projectgrid-matrix-table';

    const tableHeader = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const headerSetup = UiBuilder.generateHeaderCell();
    headerRow.appendChild(headerSetup.cell);
    
    // Core structural intermediate layout headers mappings
    headerRow.insertAdjacentHTML('beforeend', `
      <th style="width: 7% !important; text-align: center;"><div class="projectgrid-header-dropup-trigger" data-key="tasks" title="Tasks Todo">🔧</div></th>
      <th style="width: 6% !important; text-align: center;"><div class="projectgrid-header-dropup-trigger" data-key="created" title="Folder Created Date">🆕</div></th>
      <th style="width: 6% !important; text-align: center;"><div class="projectgrid-header-dropup-trigger" data-key="updated" title="Folder Updated Date">🆙</div></th>
      <th style="width: 5%; text-align: center;" title="Directory Opus">📁</th>
      <th style="width: 5%; text-align: center;" title="Cursor Workspace">💻</th>
      <th style="width: 5%; text-align: center;" title="Obsidian Vault">💜</th>
    `);

    // Define multi-select dropdown column targets schema configurations
    const columnDropdowns = [
      { icon: '🏷️', key: 'tags', options: ['⬛'] },
      { icon: '⭐', key: 'stars', options: ['⬛','0⭐','1⭐','2⭐','3⭐','4⭐','5⭐'] },
      { icon: '💲', key: 'value', options: ['⬛','0💲','1💲','2💲','3💲','4💲','5💲','6💲','7💲','8💲','9💲'] },
      { icon: '🐘', key: 'size', options: ['⬛','0🐘','1🐘','2🐘','3🐘','4🐘','5🐘'] },
      { icon: '🎱', key: 'depth', options: ['⬛','0🎱','1🎱','2🎱','3🎱','4🎱','5🎱'] },
      { icon: '🏅', key: 'priority', options: ['⬛','0🏅','1🏅','2🏅','3🏅','4🏅','5🏅'] },
      { icon: '🚦', key: 'status', options: ['⬛','hold🛑', 'plan🌐', 'dev🛠', 'test🧪', 'ship📦'] },
      { icon: '🔤', key: 'lang', options: ['⬛','js', 'ts', 'au3', 'ahk'] },
      { icon: '🎯', key: 'target', options: ['⬛','ce', 'op', 'app', 'link'] }
    ];

    const tableBody = document.createElement('tbody');
    const rowsArray = [];
    const universalTagsSet = new Set();

    targetFolders.forEach(folder => {
      const expectedNotePath = `${folder.path}/+${folder.name}.md`;
      if (this.app.vault.getAbstractFileByPath(expectedNotePath)) {
        const fileCache = this.app.metadataCache.getCache(expectedNotePath);
        const frontmatter = fileCache ? fileCache.frontmatter : null;

        if (frontmatter && frontmatter.tags) {
          const rawTags = Array.isArray(frontmatter.tags) ? frontmatter.tags : String(frontmatter.tags).split(/[\s,]+/);
          rawTags.forEach(t => { if(t) universalTagsSet.add(String(t).trim()); });
        }

        const rowRef = { element: null, searchText: `+${folder.name}.md`.toLowerCase() };
        rowRef.element = UiBuilder.buildRow(folder, absoluteVaultRoot, expectedNotePath, this.app, frontmatter, rowRef, headerSetup.input);
        
        tableBody.appendChild(rowRef.element);
        rowsArray.push(rowRef);
      }
    });

    const tagsConfig = columnDropdowns.find(c => c.key === 'tags');
    if (tagsConfig) {
      Array.from(universalTagsSet).sort().forEach(t => tagsConfig.options.push(t));
    }

    columnDropdowns.forEach(col => {
      const dropupTh = UiBuilder.buildHeaderDropup(col.icon, col.key, col.options, rowsArray);
      headerRow.appendChild(dropupTh);
    });

    tableHeader.appendChild(headerRow);
    tableElement.appendChild(tableHeader);
    tableElement.appendChild(tableBody);
    
    FilterManager.initializeTableFilter(headerSetup.input, headerSetup.clearBtn, rowsArray, containerElement);

    // System Picker Command Core execution dispatch trigger wire rules
    toolbarBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      headerSetup.input.focus();
      const scrollLockEvt = new KeyboardEvent('keydown', { key: 'ScrollLock', bubbles: true });
      window.dispatchEvent(scrollLockEvt);
    });

    // FIX: ATTACH CLICK HANDLER TO SWITCH ACCENT BACKGROUND AND MANAGE GLOBALS IN TUTOR HOOKS
    const handleTutorToggle = () => {
      window.ProjectGridTutorModeActive = !window.ProjectGridTutorModeActive;
      if (window.ProjectGridTutorModeActive) {
        tutorToggleBtn.classList.add('projectgrid-tutor-active');
        tutorToggleBtn.style.backgroundColor = 'var(--text-accent, #70a1ff)';
        tutorToggleBtn.style.color = '#000000';
        // Immediately force recalculations to show help boxes right away over active nodes
        if (window.ProjectGridTriggerTutorHelpBoxRedraw) {
          window.ProjectGridTriggerTutorHelpBoxRedraw(document.activeElement);
        }
      } else {
        tutorToggleBtn.classList.remove('projectgrid-tutor-active');
        tutorToggleBtn.style.backgroundColor = 'transparent';
        tutorToggleBtn.style.color = 'var(--text-normal)';
        const oldTip = document.getElementById('projectgrid-tutor-tooltip-portal');
        if (oldTip) oldTip.style.display = 'none';
      }
    };

    tutorToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      handleTutorToggle();
    });

    // Global background keyboard shortcuts listener trap (Ctrl+Alt+T handles fast accessibility toggles)
    const hotkeyListener = (evt) => {
      if (evt.ctrlKey && evt.altKey && evt.key.toLowerCase() === 't') {
        evt.preventDefault();
        handleTutorToggle();
      }
    };
    window.removeEventListener('keydown', hotkeyListener);
    window.addEventListener('keydown', hotkeyListener);

    if (rowsArray.length > 0) {
      containerElement.appendChild(tableElement);
    } else {
      containerElement.insertAdjacentHTML('beforeend', `<p class="projectgrid-empty-warning-message">ℹ️ *No folders matching \`${rootTarget}/Folder/+Folder.md\` were discovered.*</p>`);
    }
  }
};

// ==========================================
// END OF FILE: _main.js
// ==========================================
