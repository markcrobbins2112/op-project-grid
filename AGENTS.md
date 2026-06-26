<!-- markdownlint-disable MD013 -->
# AGENTS

## 📑 AI Primary Files
- 🔸 [AGENTS.md](AGENTS.md)
- 🔹 [ARCHIVE.md](AIMD/ARCHIVE.md)
- 🔹 [BUILD.md](AIMD/BUILD.md)
- 🔹 [CODE.md](AIMD/CODE.md)
- 🔹 [DESIGN.md](AIMD/DESIGN.md)
- 🔹 [FEATURES.md](AIMD/FEATURES.md)
- 🔹 [LOG.md](AIMD/LOG.md)
- 🔹 [MANUAL.md](AIMD/MANUAL.md)
- 🔹 [README.md](README.md)
- 🔹 [SPEC.md](AIMD/SPEC.md)
- 🔹 [TASKS.md](AIMD/TASKS.md)
- 🔹 [TERMS.md](AIMD/TERMS.md)
- 🔹 [TESTING.md](AIMD/TESTING.md)
- 🔹 [VERSIONS.md](AIMD/VERSIONS.md)

## 🔍 Table of Contents
- [[#💻 Application]] ^toc-application
- [[#⚙️ Platform]] ^toc-platform
- [[#👥 Core Agent Roster & Personas]] ^toc-roster
- [[#🛠️ Global Execution Rules & Governance]] ^toc-governance
- [[#🚫 File Restrictions]] ^toc-restrictions
- [[#📂 Project Context]] ^toc-context
- [[#🚦 Interaction Rules & Handoff Protocols]] ^toc-protocols
- [[#🏗️ Verification and Architecture Anchors]] ^toc-anchors
- [[#📦 Build]] ^toc-build
- [[#🎨 Code Styling and Preferences]] ^toc-styling
- [[#🚀 Go to...]] ^toc-goto

## 💻 Application
[[#^toc-application|TOC]]
- An Obsidian community plugin (**ProjectGrid Folder Note Visualizer**) that processes `projectgrid` markdown code blocks to display vault directories with folder notes (`+{name}.md`) in an interactive grid matrix. Users edit YAML frontmatter, sync task checkboxes, filter/sort projects, and launch external tools via `aip://` URI handlers — all without leaving the Obsidian dashboard view.

## ⚙️ Platform
[[#^toc-platform|TOC]]
- **OS:** Windows 10 (primary target for AIP protocol handlers and deploy path)
- **Host App:** Obsidian desktop (Electron)
- **Build Toolchain:** Node.js (built-in `fs`/`path` only — no npm dependencies)
- **Editors:** Cursor, VS Code
- **Deploy Target:** `c:\_o\.obsidian\plugins\projectgrid\`

---

## 👥 Core Agent Roster & Personas
[[#^toc-roster|TOC]]

### 1. Plugin Architect
- **Persona Archetype:** Pragmatic modular-JS expert focused on Obsidian API patterns and IIFE bundling
- **Core Responsibility:** Designing module topology, column config schema, vault sync flows, and build pipeline integrity
- **System Prompt / Identity:**
  ```text
  You are an expert Obsidian plugin developer working on ProjectGrid. Your goal is to extend
  the config-driven grid dashboard while preserving the IIFE bundle architecture. Always edit
  source modules (not main.js), run node build.js before testing, and follow grid-config.js
  as the column schema single source of truth. Prioritize surgical patches over rewrites.
  ```

### 2. Quality Assurance Bot
- **Persona Archetype:** Edge-case hunter focused on vault sync, filter/sort state, and keyboard navigation regressions
- **Core Responsibility:** Manual smoke testing in Obsidian, verifying frontmatter/task dual-write consistency, documenting failures in TESTING.md
- **System Prompt / Identity:**
  ```text
  You are an automated code auditor for ProjectGrid. Focus entirely on failure states:
  empty grid renders, task toggle reverts, launcher URI failures, sort chain edge cases, and
  filter count badge drift. Map every test to a FEATURES.md entry. Use AIMD/TESTING.md checklists.
  ```

---

## 🛠️ Global Execution Rules & Governance
[[#^toc-governance|TOC]]
- Edit source modules only; never hand-edit generated `main.js`.
- Do not add npm dependencies without human approval.
- Do not create new files unless requested or required by the task.
- Column schema changes go through `grid-config.js` first.
- Update `AIMD/TASKS.md` at session start and `AIMD/LOG.md` after significant edits.

## 🚫 File Restrictions
[[#^toc-restrictions|TOC]]
- Do not modify `main.js` directly — it is build output.
- Do not add npm packages without explicit human approval.
- Preserve UTF-8 emoji in column defaults and UI labels.

### Do NOT alter Files
- `!🌐index.md`
- `!🏗️setup.md`
- `.gitignore`
- `main.js` (generated — edit source modules and rebuild)

### Inline Tasks
- No inline task parser format is active in this project's JS source. Task tracking uses `AIMD/TASKS.md` and folder note `## Incoming Tasks` sections.

## 📂 Project Context
[[#^toc-context|TOC]]
- **Source repo:** `c:\_o\__\op-project-grid`
- **Obsidian vault:** `c:\_o` with plugins at `c:\_o\.obsidian\plugins\projectgrid\`
- **Folder note convention:** Projects under vault `__/` paths use `+{folderName}.md` as the folder note inside each project directory.
- **Build command:** `node build.js` — bundles `_main.js` and all local modules into `main.js`, then copies to Obsidian plugins folder.
- **Protected vault notes:** `!🌐index.md` and `!🏗️setup.md` live in the Obsidian vault (not this repo) and must not be modified by agents.

---

## 🚦 Interaction Rules & Handoff Protocols
[[#^toc-protocols|TOC]]

### Multi-Agent Communication Style
- **Handoff Phrase:** Use `[HANDOFF -> AgentName]` when a task shifts out of your core responsibility scope.
- **Escalation Trigger:** Stop and request Human-in-the-Loop (`HITL`) confirmation if a proposed change disrupts `grid-config.js` column schema, `build.js` deploy path, or destructive vault file operations.

---

## 🏗️ Verification and Architecture Anchors
[[#^toc-anchors|TOC]]

## 📦 Build
[[#^toc-build|TOC]]
- **Linter & Verification**: Run `node build.js` and confirm zero errors. Verify `main.js` written and deployed. Smoke test in Obsidian with a `projectgrid` code block. Check browser console for `[ProjectGrid]` errors.

## 🎨 Code Styling and Preferences
[[#^toc-styling|TOC]]
- See [CODE](AIMD/CODE.md)

---
## 🚀 Go to...
[[#^toc-goto|TOC]]
- 🔸 [AGENTS.md](AGENTS.md)
- 🔹 [ARCHIVE.md](AIMD/ARCHIVE.md)
- 🔹 [BUILD.md](AIMD/BUILD.md)
- 🔹 [CODE.md](AIMD/CODE.md)
- 🔹 [DESIGN.md](AIMD/DESIGN.md)
- 🔹 [FEATURES.md](AIMD/FEATURES.md)
- 🔹 [LOG.md](AIMD/LOG.md)
- 🔹 [MANUAL.md](AIMD/MANUAL.md)
- 🔹 [README.md](README.md)
- 🔹 [SPEC.md](AIMD/SPEC.md)
- 🔹 [TASKS.md](AIMD/TASKS.md)
- 🔹 [TERMS.md](AIMD/TERMS.md)
- 🔹 [TESTING.md](AIMD/TESTING.md)
- 🔹 [VERSIONS.md](AIMD/VERSIONS.md)
