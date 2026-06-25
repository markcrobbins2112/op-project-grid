// ==========================================
// START OF FILE: tasks-git-extractor.js
// ==========================================

const fs = require('fs');
const path = require('path');

module.exports = {
  extractRemoteUrl(absoluteFolderPath) {
    try {
      const configPath = path.join(absoluteFolderPath, '.git', 'config');
      if (!fs.existsSync(configPath)) return '';

      const content = fs.readFileSync(configPath, 'utf8');
      const lines = content.split('\n');
      
      let insideRemoteOriginBlock = false;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line.startsWith('[remote "origin"]')) {
          insideRemoteOriginBlock = true;
          continue;
        }
        
        if (insideRemoteOriginBlock && line.startsWith('[')) {
          break; // Entered a new section, break out
        }
        
        if (insideRemoteOriginBlock && line.startsWith('url =')) {
          return line.split('url =')[1].trim();
        }
      }
    } catch (err) {
      console.error('[ProjectGrid Git Extractor] Fail:', err.message);
    }
    return '';
  }
};

globalThis.TasksGitExtractor = module.exports;

// ==========================================
// END OF FILE: tasks-git-extractor.js
// ==========================================
