// ==========================================
// START OF FILE: build.js
// ==========================================

const fs = require('fs');
const path = require('path');

const ENTRY_FILE = '_main.js';
const OUTPUT_FILE = 'main.js';
const MANIFEST_FILE = 'manifest.json';
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

        // TARGETED DEPLOYMENT: Only allow these two files into the vault
        const whitelistFiles = [OUTPUT_FILE, MANIFEST_FILE];
        let copyCount = 0;

        whitelistFiles.forEach(item => {
            const sourcePath = path.join(SOURCE_DIR, item);
            const destPath = path.join(destDir, item);

            if (fs.existsSync(sourcePath) && fs.statSync(sourcePath).isFile()) {
                fs.copyFileSync(sourcePath, destPath);
                console.log(`🚚 Synced targeted asset: ${item}`);
                copyCount++;
            } else {
                if (item === MANIFEST_FILE) {
                    console.warn(`⚠️ Warning: ${MANIFEST_FILE} was not found in your source directory. Please create it.`);
                }
            }
        });

        console.log(`🎉 Sync completed successfully. ${copyCount} deployment files active inside Obsidian workspace.`);
    } catch (error) {
        console.error('❌ An error occurred during file deployment loop:', error.message);
    }
}

bundle();

// ==========================================
// END OF FILE: build.js
// ==========================================
