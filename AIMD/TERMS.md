<!-- markdownlint-disable MD013 -->
# TERMS

## 📑 AI Primary Files
- 🔹 [AGENTS.md](../AGENTS.md)
- 🔹 [ARCHIVE.md](ARCHIVE.md)
- 🔹 [BUILD.md](BUILD.md)
- 🔹 [CODE.md](CODE.md)
- 🔹 [DESIGN.md](DESIGN.md)
- 🔹 [FEATURES.md](FEATURES.md)
- 🔹 [LOG.md](LOG.md)
- 🔹 [MANUAL.md](MANUAL.md)
- 🔹 [README.md](../README.md)
- 🔹 [SPEC.md](SPEC.md)
- 🔹 [TASKS.md](TASKS.md)
- 🔸 [TERMS.md](TERMS.md)
- 🔹 [TESTING.md](TESTING.md)
- 🔹 [VERSIONS.md](VERSIONS.md)

## 🔍 Table of Contents
- [[#🔤 Core Glossary A-Z]] ^toc-glossary
- [[#🗂️ System Acronym Quick-Reference]] ^toc-acronyms
- [[#Go to...]] ^toc-goto

## 🔤 Core Glossary A-Z
[[#^toc-glossary|TOC]]

### AIP Protocol
- **Definition:** Custom URI scheme (`aip://{protocol}/{path}`) used to delegate folder-open actions to external Windows applications (Directory Opus, Cursor, Obsidian, AIMD initializer).
- **Code Implementation Context:** Generated in `ui-row-actions.js` and `ui-row.js` (agents missing link). Consumed by system-level protocol handlers, not parsed inside the plugin.
- **Synonyms / Avoid:** Do not call these "deep links" or "file://" URLs in code comments.

### AIMD
- **Definition:** AI Markdown Documentation — the standardized doc set (`AGENTS.md`, `AIMD/*.md`) scaffolded per project folder for AI agent context.
- **Code Implementation Context:** `scanner-check` column targets `AGENTS.md`. Missing file links to `aip://aimd/_ {path}` for initialization.
- **Synonyms / Avoid:** Do not abbreviate as "AI docs" in formal spec references.

### Folder Note
- **Definition:** A markdown file naming convention `+{folderName}.md` stored inside the folder it describes. Required for a folder to appear in the ProjectGrid matrix.
- **Code Implementation Context:** Path constructed in `main-scanner.js` as `` `${folder.path}/+${folder.name}.md` ``.
- **Synonyms / Avoid:** Avoid "index note" — use "folder note" consistently.

### Frontmatter
- **Definition:** YAML metadata block at the top of an Obsidian note, delimited by `---`. ProjectGrid reads/writes keys defined in `grid-config.js`.
- **Code Implementation Context:** Read via `app.metadataCache.getCache()`; written via `app.fileManager.processFrontMatter()` in `ui-row-select.js` and `ui-row-tags.js`.
- **Synonyms / Avoid:** Do not call it "metadata header" in logs.

### IIFE Bundle
- **Definition:** Immediately Invoked Function Expression wrapper applied to each source module by `build.js`, isolating scope in the single `main.js` output file.
- **Code Implementation Context:** `build.js` `resolveDependencies()` generates `const Module = (function() { ... })(); globalThis.Module = Module;`.
- **Synonyms / Avoid:** Do not refer to the output as "webpack bundle" — no webpack is used.

### Incoming Tasks
- **Definition:** Markdown section in folder notes headed `## Incoming Tasks` containing `- [ ]` / `- [x]` checkbox task lines.
- **Code Implementation Context:** Parsed by `main-scanner.js`, `tasks-markdown-sync.js`, `tasks-markdown-writer.js`. Vault-wide task strings aggregated into `ProjectGridDiscoveredActualTasksList`.
- **Synonyms / Avoid:** Do not use "TODO section" — the exact heading string is part of the contract.

### ProjectGrid Code Block
- **Definition:** Obsidian fenced code block with language identifier `projectgrid`. Source text sets the vault folder path prefix filter.
- **Code Implementation Context:** Registered in `_main.js` via `registerMarkdownCodeBlockProcessor('projectgrid', ...)`.
- **Synonyms / Avoid:** Do not call it a "widget" or "embed" in spec docs.

### Row Tracking Reference
- **Definition:** Per-row JavaScript object in `rowsArray` holding DOM element, search text, metadata value caches, and filter state for one project folder.
- **Code Implementation Context:** Created in `main-scanner.js`; fields include `yamlMetadataValues`, `launcherValues`, `folderDatesValues`, `dropdownFilters`, `element`.
- **Synonyms / Avoid:** Avoid "row model" or "row DTO".

### Scanner Check
- **Definition:** Column type that displays ✅ or ❌ based on filesystem existence of a target file (e.g., `.git`, `AGENTS.md`) in the project folder.
- **Code Implementation Context:** `ui-row.js` `col.type === 'scanner-check'` branch uses `fs.existsSync`.
- **Synonyms / Avoid:** Do not call it "boolean column".

### Sentinel Value (⬛)
- **Definition:** Unicode black square used as the empty/unset marker for yaml-select columns and filter null detection.
- **Code Implementation Context:** Default in `grid-config.js` defaults arrays; deleted from frontmatter when selected; excluded from non-null counts in `filter.js`.
- **Synonyms / Avoid:** Do not substitute `-`, `null`, or `N/A` as empty markers in column defaults.

### Sort Chain
- **Definition:** Ordered list of up to 3 column keys defining multi-level row sort priority, visualized with 🟢🟡🔴 badges.
- **Code Implementation Context:** `menu-state-sort.js` `activeSortChain` array; exposed as `window.ProjectGridActiveSortChainList`.
- **Synonyms / Avoid:** Do not call it "multi-sort stack" in user-facing docs.

### YAML Select
- **Definition:** Column type rendering a dropdown button that reads/writes a single frontmatter key with preset emoji-coded options.
- **Code Implementation Context:** `grid-config.js` `type: 'yaml-select'`; rendered by `ui-row-select.js`. Extendable columns allow custom value entry.
- **Synonyms / Avoid:** Do not call it "enum column" in user docs.

---

## 🗂️ System Acronym Quick-Reference
[[#^toc-acronyms|TOC]]

| Acronym / Token | Full Expansion | Technical Scope |
| :--- | :--- | :--- |
| **`AIP`** | Application Integration Protocol | Custom `aip://` URI scheme for external app launchers |
| **`AIMD`** | AI Markdown Documentation | Standardized per-project doc framework (`AGENTS.md` + `AIMD/`) |
| **`IIFE`** | Immediately Invoked Function Expression | Module isolation pattern in bundled `main.js` |
| **`DOM`** | Document Object Model | HTML table UI rendered inside Obsidian preview pane |
| **`YAML`** | YAML Ain't Markup Language | Frontmatter metadata format on folder notes |
| **`HUD`** | Heads-Up Display | Tutor overlay showing contextual keyboard help |
| **`TD`** | Table Data Cell | `<td>` elements in project matrix rows |

---
## 🚀 Go to...
[[#^toc-goto|TOC]]
- 🔹 [AGENTS.md](../AGENTS.md)
- 🔹 [ARCHIVE.md](ARCHIVE.md)
- 🔹 [BUILD.md](BUILD.md)
- 🔹 [CODE.md](CODE.md)
- 🔹 [DESIGN.md](DESIGN.md)
- 🔹 [FEATURES.md](FEATURES.md)
- 🔹 [LOG.md](LOG.md)
- 🔹 [MANUAL.md](MANUAL.md)
- 🔹 [README.md](../README.md)
- 🔹 [SPEC.md](SPEC.md)
- 🔹 [TASKS.md](TASKS.md)
- 🔸 [TERMS.md](TERMS.md)
- 🔹 [TESTING.md](TESTING.md)
- 🔹 [VERSIONS.md](VERSIONS.md)
