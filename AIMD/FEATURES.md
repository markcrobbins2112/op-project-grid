<!-- markdownlint-disable MD013 -->
# FEATURES

## 📑 AI Primary Files
- 🔹 [AGENTS.md](../AGENTS.md)
- 🔹 [ARCHIVE.md](ARCHIVE.md)
- 🔹 [BUILD.md](BUILD.md)
- 🔹 [CODE.md](CODE.md)
- 🔹 [DESIGN.md](DESIGN.md)
- 🔸 [FEATURES.md](FEATURES.md)
- 🔹 [LOG.md](LOG.md)
- 🔹 [MANUAL.md](MANUAL.md)
- 🔹 [README.md](../README.md)
- 🔹 [SPEC.md](SPEC.md)
- 🔹 [TASKS.md](TASKS.md)
- 🔹 [TERMS.md](TERMS.md)
- 🔹 [TESTING.md](TESTING.md)
- 🔹 [VERSIONS.md](VERSIONS.md)

## 🔍 Table of Contents
- [[#📦 Feature Groups]] ^toc-groups
- [[#🗄️ All Features]] ^toc-all-features
- [[#📉 Deprecated / Removed Features]] ^toc-deprecated
- [[#🚀 Go to...]] ^toc-goto

Welcome to **ProjectGrid**! An Obsidian plugin that renders an interactive project matrix dashboard from folder notes. Scan vault directories, edit metadata in-place, launch external tools, and track tasks — all from a single `projectgrid` code block.

## 📦 Feature Groups
[[#^toc-groups|TOC]]

### 📊 1. Grid Dashboard ^z1
Renders a sortable, filterable HTML table of project folders that have folder notes (`+{name}.md`).
- **[Project Matrix Table](#Project-Matrix-Table)** - Scans vault folders and displays one row per folder note with configurable columns.
- **[Folder Note Scanner](#Folder-Note-Scanner)** - Discovers folders under a code-block path prefix and validates note existence.
- **[Search Filter](#Search-Filter)** - Live text filter on folder note filenames with clear button.

### 🎛️ 2. Column Editors ^z2
In-grid editors for YAML frontmatter and markdown task checkboxes.
- **[YAML Select Columns](#YAML-Select-Columns)** - Dropdown pickers for stars, value, size, depth, priority, status, lang, target.
- **[Tags Cell](#Tags-Cell)** - Multi-select tag editor synced to frontmatter `tags`.
- **[Tasks Todo Column](#Tasks-Todo-Column)** - Checkbox task picker synced to `## Incoming Tasks` section.

### 🔀 3. Filtering & Sort ^z3
Header dropups and command-menu sort chain for multi-column ordering.
- **[Header Column Filters](#Header-Column-Filters)** - Per-column dropup filters with visible/total count badges.
- **[Sort Chain](#Sort-Chain)** - Up to 3-column priority sort with 🟢🟡🔴 indicators.
- **[Default Directory Sort](#Default-Directory-Sort)** - Alphabetical fallback by folder base name.

### 🚀 4. External Launchers ^z4
One-click project folder handoff to external applications via `aip://` URI scheme.
- **[Directory Opus Launcher](#Directory-Opus-Launcher)** - Open project folder in Directory Opus.
- **[Cursor Workspace Launcher](#Cursor-Workspace-Launcher)** - Open project folder in Cursor IDE.
- **[Obsidian Vault Launcher](#Obsidian-Vault-Launcher)** - Open nested vault (dimmed when `.obsidian` missing).

### 🔧 5. Tasks & Git Integration ^z5
Filesystem-aware indicators and bidirectional task sync.
- **[Git Repository Scanner](#Git-Repository-Scanner)** - ✅/❌ for `.git` presence; click opens remote origin URL.
- **[Agent Matrix Scanner](#Agent-Matrix-Scanner)** - ✅/❌ for `AGENTS.md`; ❌ links to AIMD init via `aip://aimd/`.
- **[Task Markdown Sync](#Task-Markdown-Sync)** - Toggle/add/delete tasks in folder note body from grid UI.

### 🎓 6. Navigation & Help ^z6
Keyboard-driven command menu and contextual tutor overlay.
- **[ScrollLock Command Menu](#ScrollLock-Command-Menu)** - Two-level picker: Filters, Columns, Launcher, Sort.
- **[Tutor HUD](#Tutor-HUD)** - Context-sensitive help overlay (❔ button or Ctrl+Alt+T).

---

## 🗄️ All Features
[[#^toc-all-features|TOC]]

### Agent Matrix Scanner
- **Group:** [[#^z5|Tasks & Git Integration]]
Scans each project folder for `AGENTS.md`. Shows ✅ when present. When missing, renders ❌ as a clickable `aip://aimd/_` link to scaffold the AIMD documentation framework in that folder.

### Cursor Workspace Launcher
- **Group:** [[#^z4|External Launchers]]
Column icon 💻 generates `aip://cursor/{absolutePath}` anchor. Opens the project directory as a Cursor workspace via external AIP handler.

### Default Directory Sort
- **Group:** [[#^z3|Filtering & Sort]]
When no sort chain is active, rows sort alphabetically by isolated folder base name (numeric-aware `localeCompare`).

### Directory Opus Launcher
- **Group:** [[#^z4|External Launchers]]
Column icon 📁 generates `aip://dopus/{absolutePath}` anchor for Directory Opus folder navigation.

### Folder Note Scanner
- **Group:** [[#^z1|Grid Dashboard]]
Iterates `app.vault.getAllLoadedFiles()` for folders matching code-block path prefix. Includes row only when `+{folder.name}.md` exists in vault.

### Git Repository Scanner
- **Group:** [[#^z5|Tasks & Git Integration]]
Checks `{folder}/.git` existence. On ✅, extracts origin URL from git config; click opens normalized HTTPS URL in default browser.

### Header Column Filters
- **Group:** [[#^z3|Filtering & Sort]]
Header dropup triggers (`.projectgrid-header-dropup-trigger`) open filter panels per yaml-select/tags column. Filter state stored in `row.dropdownFilters`; combined with text filter in `filter.js`.

### Obsidian Vault Launcher
- **Group:** [[#^z4|External Launchers]]
Column icon 💜 generates `aip://obsidian/{absolutePath}`. Adds `is-vault-missing` styling when nested `.obsidian` folder not found.

### Project Matrix Table
- **Group:** [[#^z1|Grid Dashboard]]
Activated by ` ```projectgrid ` code block. Renders toolbar + `<table class="projectgrid-matrix-table">` with columns from `grid-config.js`. Rows stamped with `data-directory` absolute path attribute.

### ScrollLock Command Menu
- **Group:** [[#^z6|Navigation & Help]]
Press ScrollLock (or click ☰ hamburger) to open category picker. Accelerator keys F/C/L/S jump to Filters/Columns/Launcher/Sort submenus. Arrow keys + Enter navigate; Escape/Backspace retreat.

### Search Filter
- **Group:** [[#^z1|Grid Dashboard]]
Header input (`.projectgrid-filter-input`) filters rows by folder note name substring. Clear button appears when text entered. Arrow Up/Down cycle focused visible rows.

### Sort Chain
- **Group:** [[#^z3|Filtering & Sort]]
Sort menu builds chain of up to 3 column keys. Primary 🟢, secondary 🟡, tertiary 🔴. Re-clicking active key removes it. Toolbar label shows chain or "Default Directory Sort Order".

### Tags Cell
- **Group:** [[#^z2|Column Editors]]
Multi-select dropdown for frontmatter `tags`. Aggregates vault-wide tag universe during scan. Extendable with custom tag values.

### Task Markdown Sync
- **Group:** [[#^z5|Tasks & Git Integration]]
Tasks column reads all `- [ ]`/`- [x]` lines under `## Incoming Tasks`. Toggling checkboxes writes back to markdown body via `tasks-markdown-sync.js`; adding new tasks via `tasks-markdown-writer.js`.

### Tasks Todo Column
- **Group:** [[#^z2|Column Editors]]
Displays `{checked}/{total}` ratio. Options populated from vault-wide discovered task strings. Supports keyboard navigation between rows while dropdown focused.

### Tutor HUD
- **Group:** [[#^z6|Navigation & Help]]
Toggle via ❔ toolbar button or Ctrl+Alt+T. Shows column-specific keyboard hints from `grid-config.js` `tutorKeys` when focus is on a select cell.

### YAML Select Columns
- **Group:** [[#^z2|Column Editors]]
Configurable dropdown columns (stars, value, size, depth, priority, status, lang, target) with preset defaults from `grid-config.js`. Writes via `app.fileManager.processFrontMatter`. Extendable columns allow custom input entry.

---

## 📉 Deprecated / Removed Features
[[#^toc-deprecated|TOC]]
- **[!] Gear Icon Toolbar Button:** Replaced with hamburger ☰ symbol for ScrollLock System Commands Picker Menu (`main-toolbar.js` FIXED comment).
  - **Replacement Pattern:** ☰ button triggers same `onHamburgerClick` → `ProjectGridTriggerMenuCorePickerSpawn`.

---
## 🚀 Go to...
[[#^toc-goto|TOC]]
- 🔹 [AGENTS.md](../AGENTS.md)
- 🔹 [ARCHIVE.md](ARCHIVE.md)
- 🔹 [BUILD.md](BUILD.md)
- 🔹 [CODE.md](CODE.md)
- 🔹 [DESIGN.md](DESIGN.md)
- 🔸 [FEATURES.md](FEATURES.md)
- 🔹 [LOG.md](LOG.md)
- 🔹 [MANUAL.md](MANUAL.md)
- 🔹 [README.md](../README.md)
- 🔹 [SPEC.md](SPEC.md)
- 🔹 [TASKS.md](TASKS.md)
- 🔹 [TERMS.md](TERMS.md)
- 🔹 [TESTING.md](TESTING.md)
- 🔹 [VERSIONS.md](VERSIONS.md)
