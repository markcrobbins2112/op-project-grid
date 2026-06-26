<!-- markdownlint-disable MD013 -->
# DESIGN

## 📑 AI Primary Files
- 🔹 [AGENTS.md](../AGENTS.md)
- 🔹 [ARCHIVE.md](ARCHIVE.md)
- 🔹 [BUILD.md](BUILD.md)
- 🔹 [CODE.md](CODE.md)
- 🔸 [DESIGN.md](DESIGN.md)
- 🔹 [FEATURES.md](FEATURES.md)
- 🔹 [LOG.md](LOG.md)
- 🔹 [MANUAL.md](MANUAL.md)
- 🔹 [README.md](../README.md)
- 🔹 [SPEC.md](SPEC.md)
- 🔹 [TASKS.md](TASKS.md)
- 🔹 [TERMS.md](TERMS.md)
- 🔹 [TESTING.md](TESTING.md)
- 🔹 [VERSIONS.md](VERSIONS.md)

## 🔍 Table of Contents
- [[#🗺️ System Topology & Context Map]] ^toc-topology
- [[#💻 High-Level Components & Communication]] ^toc-components
- [[#💾 Data Architecture & Schema Rules]] ^toc-data
- [[#📂 Core File Structure Layout]] ^toc-layout
- [[#🚦 Design Principles & Guardrails]] ^toc-guardrails
- [[#🚀 Go to...]] ^toc-goto

## 🗺️ System Topology & Context Map
[[#^toc-topology|TOC]]
- **Architecture Style:** Config-driven modular monolith — single Obsidian plugin with IIFE-isolated JS modules, DOM-rendered UI, no SPA framework.
- **Primary Language Stack:** JavaScript (CommonJS), CSS-in-JS strings, HTML table DOM.
- **Frameworks & Core Runtimes:** Obsidian Plugin API, Node.js `fs`/`path` (bundled for filesystem access in renderer), Electron `window.open` for external URLs.

## 💻 High-Level Components & Communication
[[#^toc-components|TOC]]
- **Plugin Entry (`_main.js`)**: Registers `projectgrid` markdown code-block processor; injects CSS on load.
- **Renderer (`main-renderer.js`)**: Orchestrates toolbar, table header/body, filter init, tutor hotkey.
- **Scanner (`main-scanner.js`)**: Discovers vault folders with folder notes; builds row DOM; aggregates tasks and tags.
- **Row Factory (`ui-row.js`)**: Iterates `grid-config.js` columns to build cells by type.
- **Filter Engine (`filter.js`)**: Text filter + column dropup filters; updates header counts; row focus tracking.
- **Command Menu (`menu-core.js`, `menu-state.js`, `menu-dom.js`)**: ScrollLock-activated two-level picker (Filters, Columns, Launcher, Sort).
- **Tasks Backend (`tasks-markdown-sync.js`, `tasks-markdown-writer.js`)**: Read/write `## Incoming Tasks` checkbox section in folder notes.
- **Styles (`styles.js` + components)**: Injects consolidated CSS into `#obsidian-projectgrid-styles`.
- **External Integration**: `aip://` custom URI scheme handlers for Directory Opus, Cursor, Obsidian vault, and AIMD framework init.

---

## 💾 Data Architecture & Schema Rules
[[#^toc-data|TOC]]
- **Storage Type:** Obsidian vault files — YAML frontmatter on folder notes plus markdown body sections.
- **Folder Note Convention:** For folder `{path}/{name}/`, the folder note is `{path}/{name}/+{name}.md`.
- **Frontmatter Keys** (from `grid-config.js`): `tasks`, `tags`, `stars`, `value`, `size`, `depth`, `priority`, `status`, `lang`, `target`. Empty values use sentinel `⬛` or are deleted from frontmatter.
- **Tasks Section:** Markdown heading `## Incoming Tasks` followed by `- [ ]` / `- [x]` checkbox lines. Checked items sync to frontmatter `tasks` as comma-separated string.
- **Scanner Checks:** Filesystem presence of `.git` and `AGENTS.md` per project folder (✅/❌ indicators).
- **Timestamps:** Folder `birthtime` (created) and `mtime` (updated) from `fs.statSync`, formatted `YYYY.MM.DD HH`.
- **State Constraints:** Row state tracked in `rowsArray` with `yamlMetadataValues`, `launcherValues`, `folderDatesValues`, `dropdownFilters`. Global window registries bridge IIFE modules after bundling.

## 📂 Core File Structure Layout
[[#^toc-layout|TOC]]
```text
📂 op-project-grid/
├── _main.js                  # Plugin entry (edit this)
├── build.js                  # IIFE bundler + Obsidian deploy
├── main.js                   # Generated bundle (do not edit)
├── manifest.json             # Obsidian plugin manifest
├── grid-config.js            # Column definitions (single source of truth)
├── main-renderer.js          # Dashboard render orchestrator
├── main-scanner.js           # Vault folder scan + row assembly
├── main-toolbar.js           # Hamburger + tutor toolbar
├── main-shortcuts.js         # Shortcut helpers
├── filter.js                 # Search filter + header counts
├── menu-core.js              # ScrollLock command picker keyboard
├── menu-state.js             # Menu schema (Filters/Columns/Launcher/Sort)
├── menu-state-sort.js        # Multi-column sort chain engine
├── menu-state-utils.js       # Menu action helpers
├── menu-dom.js               # Picker overlay DOM
├── ui.js                     # Header cell + row builder facade
├── ui-dropdown.js            # Header column dropup triggers
├── ui-dropdown-dom.js        # Dropup panel DOM
├── ui-row.js                 # Row cell factory loop
├── ui-row-*.js               # Per-column type handlers (dates, actions, tags, select)
├── ui-row-select*.js         # YAML-select dropdown micro-modules
├── tasks-*.js                # Task parse, sync, write, git extract, DOM
├── styles*.js                # CSS injection modules
├── tutor.js                  # Context help overlay content
├── AIMD/                     # AI Markdown Documentation set
├── AGENTS.md                 # Agent operational rules
└── README.md                 # Project entry point
```

---

## 🚦 Design Principles & Guardrails
[[#^toc-guardrails|TOC]]
- **Dependency Minimization:** Zero npm packages. Only Obsidian/Electron built-ins plus Node core modules inlined by bundler.
- **Separation of Concerns:** `grid-config.js` defines columns; row builders render by `col.type`; filter/sort operate on row tracking objects, not DOM queries where possible.
- **Config Over Code:** Adding a yaml-select column is a `grid-config.js` entry — no row factory fork required.
- **Security Constraints:** Paths come from Obsidian vault adapter and folder objects. Launcher URLs use `aip://` scheme (handled by external host, not raw shell execution). Git URLs opened via `window.open` after SSH-to-HTTPS normalization.

---
## 🚀 Go to...
[[#^toc-goto|TOC]]
- 🔹 [AGENTS.md](../AGENTS.md)
- 🔹 [ARCHIVE.md](ARCHIVE.md)
- 🔹 [BUILD.md](BUILD.md)
- 🔹 [CODE.md](CODE.md)
- 🔸 [DESIGN.md](DESIGN.md)
- 🔹 [FEATURES.md](FEATURES.md)
- 🔹 [LOG.md](LOG.md)
- 🔹 [MANUAL.md](MANUAL.md)
- 🔹 [README.md](../README.md)
- 🔹 [SPEC.md](SPEC.md)
- 🔹 [TASKS.md](TASKS.md)
- 🔹 [TERMS.md](TERMS.md)
- 🔹 [TESTING.md](TESTING.md)
- 🔹 [VERSIONS.md](VERSIONS.md)
