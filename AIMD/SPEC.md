<!-- markdownlint-disable MD013 -->
# SPEC

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
- 🔸 [SPEC.md](SPEC.md)
- 🔹 [TASKS.md](TASKS.md)
- 🔹 [TERMS.md](TERMS.md)
- 🔹 [TESTING.md](TESTING.md)
- 🔹 [VERSIONS.md](VERSIONS.md)

## 🔍 Table of Contents
- [[#🔗 External Application Protocols & URI Schemes]] ^toc-uri
- [[#💻 Native OS Integration Details]] ^toc-os
- [[#📋 Originally Requested Specifications]] ^toc-requested
- [[#🎯 Implemented Technical Concerns & Optimization Features]] ^toc-optimization
- [[#🚦 Internal Function Signatures & System Exit Codes]] ^toc-codes
- [[#Go to...]] ^toc-goto

This document compiles the user requirements and instructions from `AGENTS.md` and related files and provides detailed documentation of how the ProjectGrid Obsidian plugin was architected and built.

---

## 🔗 External Application Protocols & URI Schemes
[[#^toc-uri|TOC]]

### AIP Launcher Link Contract
- **Target Schema:** `aip://{protocol}/{absolutePath}`
- **Supported Protocols:**

  | Protocol | Column Key | Handler Purpose |
  | :--- | :--- | :--- |
  | `dopus` | `dopus` | Open folder in Directory Opus |
  | `cursor` | `cursor` | Open folder as Cursor workspace |
  | `obsidian` | `obsidian` | Open nested Obsidian vault (requires `.obsidian` subfolder) |
  | `aimd` | `agents` | Initialize AIMD framework when `AGENTS.md` is missing |

- **Path Format:** Absolute Windows path with backslashes (e.g., `C:\_o\__\my-project`). Normalized via `.replace(/[/\\]+/g, '\\')`.
- **AIMD Init URL:** `aip://aimd/_ {absoluteFolderDiskPath}` — underscore template selector for default AIMD scaffold.

### Git Remote Click Behavior
- When `.git` exists (✅), reads `[remote "origin"] url =` from `.git/config`.
- SSH URLs (`git@host:repo`) normalized to `https://host/repo` for browser open.
- Trailing `.git` stripped before `window.open(url, '_blank')`.

---

## 💻 Native OS Integration Details
[[#^toc-os|TOC]]

### Obsidian Plugin Registration
- **Plugin ID:** `file-tree-projectgrid`
- **Code Block Language:** `projectgrid`
- **Code Block Source:** Vault path prefix filter (default `__` when empty — scans folders under that path).

### Filesystem Access
- Uses Node `fs` bundled in plugin for: folder stat timestamps, `.git/config` read, `AGENTS.md`/`.git` existence checks, folder-note task section parsing.
- Vault mutations use Obsidian API: `app.vault.read`, `app.vault.modify`, `app.fileManager.processFrontMatter`.

### Obsidian Vault Missing Indicator
- Obsidian launcher cell gets CSS class `is-vault-missing` when `{folder}/.obsidian` does not exist.

---

## 📋 Originally Requested Specifications
[[#^toc-requested|TOC]]
- **Folder Note Grid Visualizer**: Display directories that carry folder notes (`+{name}.md`) in a grid/table layout inside Obsidian markdown code blocks.
- **Multi-Column Project Metadata**: Configurable columns for dates, launchers, YAML metadata selects, tags, git/agents presence, and task progress.
- **Interactive Editing**: In-grid dropdowns write back to folder note frontmatter and task checkboxes without leaving the dashboard view.
- **External Tool Launch**: One-click open project folders in Directory Opus, Cursor, and nested Obsidian vaults via custom URI scheme.
- **Keyboard-Driven Navigation**: ScrollLock command menu, arrow-key row cycling, filter input focus management.

---

## 🎯 Implemented Technical Concerns & Optimization Features
[[#^toc-optimization|TOC]]
- **IIFE Module Isolation**:
  - **The Problem**: Obsidian loads one `main.js`; multiple `require` modules would conflict in shared scope.
  - **The Solution**: `build.js` wraps each module in an IIFE and assigns exports to `globalThis` for cross-module access.
- **DOM Load Order for Menu**:
  - **The Problem**: Menu DOM renderer must register before core keyboard listeners bind.
  - **The Solution**: `_main.js` requires `menu-dom.js` before `menu-core.js` (explicit FIXED PASS comment).
- **Tasks Dual-Write Sync**:
  - **The Problem**: Task state lives in both markdown checkboxes and frontmatter for filtering/sorting.
  - **The Solution**: `tasks-markdown-sync.js` mutates checkbox lines; `ui-row-select.js` updates frontmatter `tasks` key on toggle; scanner pre-populates checked list on load.
- **Sort Chain Cap (3 columns)**:
  - **The Problem**: Unbounded multi-sort degrades UX and performance.
  - **The Solution**: `menu-state-sort.js` maintains `activeSortChain` array max 3; overflow shifts oldest key out. Visual badges 🟢🟡🔴 on headers and toolbar label.
- **Filter Count Badges**:
  - **The Problem**: Users need at-a-glance column fill rates while filtering.
  - **The Solution**: `filter.js` recomputes `visible/total` non-null counts per column on every filter pass.

---

## 🚦 Internal Function Signatures & System Exit Codes
[[#^toc-codes|TOC]]

### Build Script Exit Behavior

| Condition | Behavior |
| :--- | :--- |
| Missing `_main.js` | `console.error` + `process.exit(1)` |
| Missing referenced module | Warning logged; bundler continues |
| Successful bundle | Writes `main.js`, deploys to Obsidian plugins folder |

### Key Runtime Window Hooks

| Global | Set By | Purpose |
| :--- | :--- | :--- |
| `ProjectGridTriggerFilterUpdate` | `filter.js` | Re-run filter/count/sort display |
| `ProjectGridTriggerMenuCorePickerSpawn` | `menu-core.js` | Open hamburger command picker |
| `ProjectGridActiveSortChainList` | `menu-state-sort.js` | Current sort chain keys |
| `ProjectGridIndicatedDirectory` | `filter.js` | Absolute path of focused row folder |
| `ProjectGridDiscoveredActualTasksList` | `main-scanner.js` | Vault-wide task strings for dropdown options |
| `ProjectGridActiveRowsTrackingArrayRegistryPool` | `main-renderer.js` | Reference to live `rowsArray` |

### Folder Note Frontmatter Template
```yaml
---
tags: []
stars: ⬛
value: ⬛
size: ⬛
depth: ⬛
priority: ⬛
status: ⬛
lang: js
target: ce
tasks: ⬛
---
```

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
- 🔸 [SPEC.md](SPEC.md)
- 🔹 [TASKS.md](TASKS.md)
- 🔹 [TERMS.md](TERMS.md)
- 🔹 [TESTING.md](TESTING.md)
- 🔹 [VERSIONS.md](VERSIONS.md)
