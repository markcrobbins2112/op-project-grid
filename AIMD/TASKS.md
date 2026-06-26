<!-- markdownlint-disable MD013 -->
# TASKS

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
- 🔸 [TASKS.md](TASKS.md)
- 🔹 [TERMS.md](TERMS.md)
- 🔹 [TESTING.md](TESTING.md)
- 🔹 [VERSIONS.md](VERSIONS.md)

## 🔍 Table of Contents
- [[#💬 Incoming tasks from chat]] ^toc-chat
- [[#🔄 New Changes]] ^toc-changes
- [[#⚙️ New Settings]] ^toc-new-settings
- [[#🕹️ New Commands]] ^toc-new-commands
- [[#⌨️ New Bindings]] ^toc-new-bindings
- [[#🚀 New Features]] ^toc-new-features
- [[#🛑 Blocked Items & Impediments]] ^toc-blocked
- [[#🗃️ Completed Backlog (Archive)]] ^toc-backlog
- [[#🛠️ Settings]] ^toc-arch-settings
- [[#💻 Commands]] ^toc-arch-commands
- [[#🔗 Bindings]] ^toc-arch-bindings
- [[#📦 Features]] ^toc-arch-features
- [[#🚀 Go to...]] ^toc-goto

## 💬 Incoming tasks from chat
[[#^toc-chat|TOC]]
- [x] Reverse engineer codebase and fill out AIMD markdown documentation
  - Replace all `{{placeholder}}` text with project-specific content derived from source code

## 🔄 New Changes
[[#^toc-changes|TOC]]
- [ ] Fix `menu-state.js` duplicate export bug
  - Line 117 references `menuStateModule` before assignment; should use inline object or assign to variable first
- [ ] Add build watch mode
  - Auto-rebuild on source file changes during development

## ⚙️ New Settings
[[#^toc-new-settings|TOC]]
- [ ] Configurable deploy path in `build.js`
  - Read from environment variable instead of hardcoded `c:\_o\.obsidian\plugins`

## 🕹️ New Commands
[[#^toc-new-commands|TOC]]
- [ ] No new Obsidian commands registered yet
  - All interaction via code-block processor and in-grid UI

## ⌨️ New Bindings
[[#^toc-new-bindings|TOC]]
- [ ] Document all bindings in plugin settings (future)
  - Currently hardcoded: ScrollLock, Ctrl+Alt+T, arrow keys, F/C/L/S menu accelerators

## 🚀 New Features
[[#^toc-new-features|TOC]]
- [ ] Automated test suite
  - No unit or integration tests exist; manual TESTING.md checklist only
- [ ] Cross-platform AIP handler support
  - Current launchers assume Windows `aip://` protocol registration

---

## 🛑 Blocked Items & Impediments
[[#^toc-blocked|TOC]]
- **Blocked Task:** Vault notes `!🌐index.md` / `!🏗️setup.md`
  - **Reason for Block:** Files live in Obsidian vault, not in this repo; agents must not modify
  - **Action Required From:** `[Human]`

---

## 🗃️ Completed Backlog (Archive)
[[#^toc-backlog|TOC]]
- [x] **TASK-001 - Reverse Engineer AIMD Documentation** (By Agent on 2026-06-25)
- [x] **TASK-000 - Baseline Environment Layout Initialization** (By Agent on 2026-06-23)

### 🛠️ Settings
[[#^toc-arch-settings|TOC]]
- [x] Column schema in `grid-config.js` — 18 columns with types, defaults, widths, tutorKeys
- [x] Deploy path hardcoded to `c:\_o\.obsidian\plugins\projectgrid\`

### 💻 Commands
[[#^toc-arch-commands|TOC]]
- [x] ScrollLock command menu — Filters, Columns, Launcher, Sort categories
- [x] Hamburger ☰ toolbar button — opens same picker as ScrollLock

### 🔗 Bindings
[[#^toc-arch-bindings|TOC]]
- [x] `ScrollLock` — open/close command picker
- [x] `Ctrl+Alt+T` — toggle Tutor HUD
- [x] `ArrowUp`/`ArrowDown` — cycle focused grid rows (filter input focused)
- [x] `F`/`C`/`L`/`S` — menu category accelerators when picker level 1 open
- [x] `Escape`/`Backspace` — retreat/close picker; Escape on select cell returns to filter

### 📦 Features
[[#^toc-arch-features|TOC]]
- [x] Project matrix table from `projectgrid` code block
- [x] YAML frontmatter editors (yaml-select columns)
- [x] Tags multi-select cell
- [x] Tasks todo column with markdown checkbox sync
- [x] External launchers (dopus, cursor, obsidian)
- [x] Git and AGENTS.md scanner columns
- [x] Header column filters with count badges
- [x] 3-column sort chain
- [x] Tutor HUD overlay
- [x] IIFE bundler with Obsidian auto-deploy

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
- 🔸 [TASKS.md](TASKS.md)
- 🔹 [TERMS.md](TERMS.md)
- 🔹 [TESTING.md](TESTING.md)
- 🔹 [VERSIONS.md](VERSIONS.md)
