// ==========================================
// START OF FILE: ui-color.js
// ==========================================

module.exports = {
    getColorForFirstCharacter(filename) {
      if (!filename) return 'var(--text-accent)';
      const cleanStr = filename.replace(/^\+/, '').trim().toUpperCase();
      if (cleanStr.length === 0) return 'var(--text-accent)';
      
      const code = cleanStr.charCodeAt(0);
      // Map strictly over uppercase alphabet bounds (A=65 to Z=90)
      if (code >= 65 && code <= 90) {
        const step = (code - 65) / 25; 
        const hue = step * 360; 
        return `hsl(${hue}, 85%, 65%)`; 
      }
      return 'var(--text-normal)';
    }
  };
  
  // ==========================================
  // END OF FILE: ui-color.js
  // ==========================================
  