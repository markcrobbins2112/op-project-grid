// ==========================================
// START OF FILE: grid-config.js
// ==========================================

const gridConfigModule = {
    columns: [
      {
        key: 'title',
        icon: '📝',
        label: 'Project Note Title',
        type: 'static',
        width: '25%'
      },
      {
        key: 'created',
        icon: '🆕',
        label: 'Created Date',
        type: 'timestamp',
        width: '6%'
      },
      {
        key: 'updated',
        icon: '🆙',
        label: 'Updated Date',
        type: 'timestamp',
        width: '6%'
      },
      {
        key: 'dopus',
        icon: '📁',
        label: 'Directory Opus',
        type: 'launcher',
        protocol: 'dopus',
        width: '4%'
      },
      {
        key: 'cursor',
        icon: '💻',
        label: 'Cursor Workspace',
        type: 'launcher',
        protocol: 'cursor',
        width: '4%'
      },
      {
        key: 'obsidian',
        icon: '💜',
        label: 'Obsidian Vault',
        type: 'launcher',
        protocol: 'obsidian',
        width: '4%'
      },
      {
        key: 'tasks',
        icon: '🔧',
        label: 'Tasks Todo',
        type: 'yaml-select',
        defaults: ['0/0', '0/1', '1/1', '0/2', '1/2', '2/2'],
        isExtendable: true,
        tutorKeys: '• Click: Focus tasks dropdown cell<br>• ArrowUp/Down: Shift vertical grid rows<br>• Escape: Focus main search input field',
        width: '5%'
      },
      {
        key: 'tags',
        icon: '🏷️',
        label: 'Tag Count',
        type: 'tags-cell',
        defaults: ['⬛'],
        isExtendable: true,
        tutorKeys: '• Type text: Filter or add custom tag values<br>• Enter: Toggle checkmark item state<br>• Escape: Close dropdown menu panel',
        width: '6%'
      },
      {
        key: 'stars',
        icon: '⭐',
        label: 'Stars Rating',
        type: 'yaml-select',
        defaults: ['⬛','0⭐','1⭐','2⭐','3⭐','4⭐','5⭐'],
        isExtendable: false,
        tutorKeys: '• Arrows Up/Down: Cycle value selection options<br>• Enter/Spacebar: Commit frontline choices<br>• Escape: Dismiss context container view panel',
        width: '5%'
      },
      {
        key: 'value',
        icon: '💲',
        label: 'Project Value',
        type: 'yaml-select',
        defaults: ['⬛','0💲','1💲','2💲','3💲','4💲','5💲','6💲','7💲','8💲','9💲'],
        isExtendable: false,
        tutorKeys: '• Arrows Up/Down: Change numeric parameter settings<br>• Tab/Shift+Tab: Horizontal navigation tracking',
        width: '5%'
      },
      {
        key: 'size',
        icon: '🐘',
        label: 'Folder Size',
        type: 'yaml-select',
        defaults: ['⬛','0🐘','1🐘','2🐘','3🐘','4🐘','5🐘'],
        isExtendable: false,
        tutorKeys: '• Highlight items using arrow hotkey channels<br>• Escape: Focus main search filter field',
        width: '5%'
      },
      {
        key: 'depth',
        icon: '🎱',
        label: 'Nesting Depth',
        type: 'yaml-select',
        defaults: ['⬛','0🎱','1🎱','2🎱','3🎱','4🎱','5🎱'],
        isExtendable: false,
        tutorKeys: '• Cycle cells frame focus parameters cleanly',
        width: '5%'
      },
      {
        key: 'priority',
        icon: '🏅',
        label: 'Priority Tier',
        type: 'yaml-select',
        defaults: ['⬛','0🏅','1🏅','2🏅','3🏅','4🏅','5🏅'],
        isExtendable: false,
        tutorKeys: '• Toggle priority weights instantly via keyboard items',
        width: '5%'
      },
      {
        key: 'status',
        icon: '🚦',
        label: 'Deployment Status',
        type: 'yaml-select',
        defaults: ['⬛','hold🛑', 'plan🌐', 'dev🛠', 'test🧪', 'ship📦'],
        isExtendable: false,
        tutorKeys: '• Modify status metadata tags dynamically',
        width: '6%'
      },
      {
        key: 'lang',
        icon: '🔤',
        label: 'Source Language',
        type: 'yaml-select',
        defaults: ['js', 'ts', 'au3', 'ahk'],
        isExtendable: true,
        tutorKeys: '• Type text: Append extensible text elements<br>• Escape: Shift cursor straight to main filter bar',
        width: '5%'
      },
      {
        key: 'target',
        icon: '🎯',
        label: 'Build Target',
        type: 'yaml-select',
        defaults: ['ce', 'op', 'app', 'link'],
        isExtendable: true,
        tutorKeys: '• Add custom compilation environment strings directly',
        width: '5%'
      },
      {
        key: 'git',
        icon: '💿',
        label: 'Git Repository',
        type: 'scanner-check',
        targetFile: '.git',
        width: '4%'
      },
      {
        key: 'agents',
        icon: '🤖',
        label: 'Agent Matrix File',
        type: 'scanner-check',
        targetFile: 'AGENTS.md',
        width: '4%'
      }
    ]
  };
  
  // FIX: Expose directly on the global scope to pass through custom IIFE bundler restrictions
  globalThis.GridConfig = gridConfigModule;
  module.exports = gridConfigModule;
  
  // ==========================================
  // END OF FILE: grid-config.js
  // ==========================================
  