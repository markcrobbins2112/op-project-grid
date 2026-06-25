// ==========================================
// START OF FILE: build.js
// ==========================================

const fs = require('fs');
const path = require('path');

const ENTRY_FILE = '_main.js';
const OUTPUT_FILE = 'main.js';
const SOURCE_DIR = process.cwd();

console.log(`🚀 Starting IIFE Encapsulation Bundler Engine in: ${SOURCE_DIR}`);

let baseDir = path.basename(SOURCE_DIR); 
let outDir = baseDir.replace(/^[^-]+-/, ''); 
const destDir = path.join('c:\\_o\\.obsidian\\plugins', outDir);

function bundle() {
    const entryPath = path.join(SOURCE_DIR, ENTRY_FILE);
    
    if (!fs.existsSync(entryPath)) {
        console.error(`❌ Error: Core entry file missing -> ${entryPath}`);
        process.exit(1);
    }

    let bundledContent = fs.readFileSync(entryPath, 'utf8');
    const processedModules = new Set();

    function resolveDependencies(fileContent) {
        const requireRegex = /(?:const|let|var)\s+([\w{},\s]+)\s*=\s*require\s*\(\s*['"]\.\/([^'"]+)['"]\s*\);?/g;
        let match;
        let updatedContent = fileContent;

        requireRegex.lastIndex = 0;

        while ((match = requireRegex.exec(fileContent)) !== null) {
            // FIX: Map code-block search strings safely to their index arrays to avoid undefined evaluation crashes
            const fullStatement = match[0];
            const variableName = match[1].trim();
            const moduleName = match[2].trim();
            
            const moduleFileName = moduleName.endsWith('.js') ? moduleName : `${moduleName}.js`;
            const modulePath = path.join(SOURCE_DIR, moduleFileName);

            if (fs.existsSync(modulePath)) {
                if (processedModules.has(moduleFileName)) {
                    updatedContent = updatedContent.replace(fullStatement, '');
                    continue;
                }

                console.log(`📦 Bundling with IIFE Isolation: ${moduleFileName}`);
                processedModules.add(moduleFileName);

                let moduleContent = fs.readFileSync(modulePath, 'utf8');
                moduleContent = moduleContent.replace(/\/\/ ==========================================[\s\S]*?\/\/ ==========================================/g, '');
                moduleContent = resolveDependencies(moduleContent);

                let clearContent = moduleContent.replace(/module\.exports\s*=\s*/g, 'return ');
                const isolatedBlock = `const ${variableName} = (function() {\n${clearContent.trim()}\n})();`;
                updatedContent = updatedContent.replace(fullStatement, isolatedBlock);
            } else {
                console.error(`⚠️ Warning: Referenced module file missing -> ${modulePath}`);
            }
        }
        return updatedContent;
    }

    bundledContent = resolveDependencies(bundledContent);

    const outputPath = path.join(SOURCE_DIR, OUTPUT_FILE);
    fs.writeFileSync(outputPath, bundledContent, 'utf8');
    console.log(`✅ Compilation successfully sealed into unified production track: ${OUTPUT_FILE}`);

    deployToObsidian();
}

function deployToObsidian() {
    try {
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
            console.log(`📁 Created deployment directory: ${destDir}`);
        }

        // CONSOLIDATION FIX: Added grid-config.js to the duplication protection tracking blacklist
        const blacklistedFiles = ['_main.js', 'build.js', 'styles.js', 'filter.js', 'ui.js', 'menu-core.js', 'menu-state.js', 'menu-dom.js', 'ui-color.js', 'ui-dropdown.js', 'ui-row.js', 'ui-row-actions.js', 'ui-row-keys.js', 'ui-row-select.js', 'styles-core.js', 'styles-animation.js', 'styles-components.js', 'ui-row-dates.js', 'ui-row-tags.js', 'ui-row-tasks.js', 'menu-state-sort.js', 'menu-state-utils.js', 'tasks-parser.js', 'tasks-dom.js', 'main-toolbar.js', 'main-scanner.js', 'grid-config.js'];
        const allowedExtensions = ['.js', '.json', '.css', '.html'];
        const allItems = fs.readdirSync(SOURCE_DIR);
        let copyCount = 0;

        allItems.forEach(item => {
            if (blacklistedFiles.includes(item)) return;

            const sourcePath = path.join(SOURCE_DIR, item);
            const destPath = path.join(destDir, item);
            
            const isFile = fs.statSync(sourcePath).isFile();
            const ext = path.extname(item).toLowerCase();

            if (isFile && allowedExtensions.includes(ext)) {
                fs.copyFileSync(sourcePath, destPath);
                console.log(`🚚 Synced asset: ${item}`);
                copyCount++;
            }
        });

        console.log(`🎉 Sync completed successfully. ${copyCount} files active inside Obsidian workspace.`);
    } catch (error) {
        console.error('❌ An error occurred during file deployment loop:', error.message);
    }
}

bundle();

// ==========================================
// END OF FILE: build.js
// ==========================================
