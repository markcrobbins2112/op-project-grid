<!-- markdownlint-disable MD013 -->
# README

## 📑 AI Primary Files
- 🔹 [AGENTS.md](AGENTS.md)
- 🔹 [ARCHIVE.md](AIMD/ARCHIVE.md)
- 🔹 [BUILD.md](AIMD/BUILD.md)
- 🔹 [CODE.md](AIMD/CODE.md)
- 🔹 [DESIGN.md](AIMD/DESIGN.md)
- 🔹 [FEATURES.md](AIMD/FEATURES.md)
- 🔹 [LOG.md](AIMD/LOG.md)
- 🔹 [MANUAL.md](AIMD/MANUAL.md)
- 🔸 [README.md](README.md)
- 🔹 [SPEC.md](AIMD/SPEC.md)
- 🔹 [TASKS.md](AIMD/TASKS.md)
- 🔹 [TERMS.md](AIMD/TERMS.md)
- 🔹 [TESTING.md](AIMD/TESTING.md)
- 🔹 [VERSIONS.md](AIMD/VERSIONS.md)

## 🔍 Table of Contents
- [[#🎯 Project Abstract & Core Value]] ^toc-abstract
- [[#🛠️ Technology Stack at a Glance]] ^toc-stack
- [[#🗺️ Project Layout Blueprint]] ^toc-blueprint
- [[#⚡ Quick Start for AI Developers]] ^toc-quickstart
- [[#Go to...]] ^toc-goto

## 🎯 Project Abstract & Core Value
[[#^toc-abstract|TOC]]
- **ProjectGrid** is an Obsidian community plugin that renders an interactive project matrix dashboard from folder notes. Embed a `projectgrid` code block in any note to scan vault directories, edit project metadata in-place, sync task checkboxes, and launch external tools (Directory Opus, Cursor, nested Obsidian vaults) — all from a single grid view.

---

## 🛠️ Technology Stack at a Glance
[[#^toc-stack|TOC]]
- **Target Operating System:** Windows 10 (primary; Obsidian cross-platform but `aip://` launchers and deploy path are Windows-oriented)
- **Core Languages & Runtimes:** JavaScript (CommonJS), Node.js (build only), Obsidian Plugin API, Electron
- **Integrations:** Custom `aip://` URI protocol handlers, Obsidian vault filesystem, git remote URLs, AIMD documentation framework

---

## 🗺️ Project Layout Blueprint
[[#^toc-blueprint|TOC]]
- **`_main.js`** ➔ Plugin entry — registers `projectgrid` code-block processor.
- **`build.js`** ➔ IIFE bundler; produces `main.js` and deploys to Obsidian plugins folder.
- **`main.js`** ➔ Generated production bundle (do not edit).
- **`manifest.json`** ➔ Obsidian plugin metadata.
- **`grid-config.js`** ➔ Column definitions — single source of truth for grid schema.
- **`main-renderer.js`** ➔ Dashboard render orchestrator.
- **`main-scanner.js`** ➔ Vault folder scan and row assembly.
- **`filter.js`** ➔ Search filter, header counts, row focus.
- **`menu-*.js`** ➔ ScrollLock command menu and sort engine.
- **`ui-*.js`** ➔ Row/cell DOM factories and dropdown editors.
- **`tasks-*.js`** ➔ Task markdown sync, git URL extraction.
- **`styles*.js`** ➔ Injected CSS modules.
- **`AGENTS.md`** ➔ System prompts and operational boundaries for AI teammates.
- **`AIMD/`** ➔ Full AI Markdown Documentation set (BUILD, CODE, DESIGN, FEATURES, etc.).

---

## ⚡ Quick Start for AI Developers
[[#^toc-quickstart|TOC]]

### 1. Verify Environment
```cmd
node --version
dir c:\_o\.obsidian\plugins
```

### 2. Build & Deploy
```cmd
cd c:\_o\__\op-project-grid
node build.js
```

### 3. Enable & Test in Obsidian
- Enable **!!ProjectGrid Folder Note Visualizer** in Community plugins.
- Add to any note:
````markdown
```projectgrid
__
```
````
- Confirm project folders with `+{name}.md` folder notes appear in the grid.

---
## 🚀 Go to...
[[#^toc-goto|TOC]]
- 🔹 [AGENTS.md](AGENTS.md)
- 🔹 [ARCHIVE.md](AIMD/ARCHIVE.md)
- 🔹 [BUILD.md](AIMD/BUILD.md)
- 🔹 [CODE.md](AIMD/CODE.md)
- 🔹 [DESIGN.md](AIMD/DESIGN.md)
- 🔹 [FEATURES.md](AIMD/FEATURES.md)
- 🔹 [LOG.md](AIMD/LOG.md)
- 🔹 [MANUAL.md](AIMD/MANUAL.md)
- 🔸 [README.md](README.md)
- 🔹 [SPEC.md](AIMD/SPEC.md)
- 🔹 [TASKS.md](AIMD/TASKS.md)
- 🔹 [TERMS.md](AIMD/TERMS.md)
- 🔹 [TESTING.md](AIMD/TESTING.md)
- 🔹 [VERSIONS.md](AIMD/VERSIONS.md)
