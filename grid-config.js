// ==========================================
// START OF FILE: grid-config.js
// ==========================================

const gridConfigModule = {
    columns: [
      { key: 'title', icon: '📝', label: 'Project Note Title', type: 'static', width: '25%' },
      { key: 'created', icon: '🆕', label: 'Created Date', type: 'timestamp', width: '6%' },
      { key: 'updated', icon: '🆙', label: 'Updated Date', type: 'timestamp', width: '6%' },
      { key: 'dopus', icon: '📁', label: 'Directory Opus', type: 'launcher', protocol: 'dopus', width: '4%' },
      { key: 'cursor', icon: '💻', label: 'Cursor Workspace', type: 'launcher', protocol: 'cursor', width: '4%' },
      { key: 'obsidian', icon: '💜', label: 'Obsidian Vault', type: 'launcher', protocol: 'obsidian', width: '4%' },
      {
        key: 'tasks',
        icon: '🔧',
        label: 'Tasks Todo',
        type: 'yaml-select',
        defaults: ['0/5', '1/5', '2/5', '3/5', '4/5', '5/5'],
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
      { key: 'stars', icon: '⭐', label: 'Stars Rating', type: 'yaml-select', defaults: ['⬛','0⭐','1⭐','2⭐','3⭐','4⭐','5⭐'], isExtendable: false, width: '5%' },
      { key: 'value', icon: '💲', label: 'Project Value', type: 'yaml-select', defaults: ['⬛','0💲','1💲','2💲','3💲','4💲','5💲','6💲','7💲','8💲','9💲'], isExtendable: false, width: '5%' },
      { key: 'size', icon: '🐘', label: 'Folder Size', type: 'yaml-select', defaults: ['⬛','0🐘','1🐘','2🐘','3🐘','4🐘','5🐘'], isExtendable: false, width: '5%' },
      { key: 'depth', icon: '🎱', label: 'Nesting Depth', type: 'yaml-select', defaults: ['⬛','0🎱','1🎱','2🎱','3🎱','4🎱','5🎱'], isExtendable: false, width: '5%' },
      { key: 'priority', icon: '🏅', label: 'Priority Tier', type: 'yaml-select', defaults: ['⬛','0🏅','1🏅','2🏅','3🏅','4🏅','5🏅'], isExtendable: false, width: '5%' },
      { key: 'status', icon: '🚦', label: 'Deployment Status', type: 'yaml-select', defaults: ['⬛','hold🛑', 'plan🌐', 'dev🛠', 'test🧪', 'ship📦'], isExtendable: false, width: '6%' },
      { key: 'lang', icon: '🔤', label: 'Source Language', type: 'yaml-select', defaults: ['js', 'ts', 'au3', 'ahk'], isExtendable: true, width: '5%' },
      { key: 'target', icon: '🎯', label: 'Build Target', type: 'yaml-select', defaults: ['ce', 'op', 'app', 'link'], isExtendable: true, width: '5%' },
      { key: 'git', icon: '💿', label: 'Git Repository', type: 'scanner-check', targetFile: '.git', width: '4%' },
      // DYNAMIC REMAPPING: Configured AI Agents column type parameters to support launcher routing rules
      {
        key: 'agents',
        icon: '🤖',
        label: 'Agent Matrix File',
        type: 'scanner-check', // Keeps scanner check loop active
        targetFile: 'AGENTS.md',
        width: '4%'
      }
    ]
  };
  
  globalThis.GridConfig = gridConfigModule;
  module.exports = gridConfigModule;
  
  // ==========================================
  // END OF FILE: grid-config.js
  // ==========================================
  