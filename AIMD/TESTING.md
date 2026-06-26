<!-- markdownlint-disable MD013 -->
# TESTING

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
- 🔹 [TERMS.md](TERMS.md)
- 🔸 [TESTING.md](TESTING.md)
- 🔹 [VERSIONS.md](VERSIONS.md)

## 🔍 Table of Contents
- [[#🔵 1. Setup & Environment Initializations]] ^toc-setup
- [[#🟢 2. Primary Functionality & Core Operations]] ^toc-core
- [[#⚡ 3. Granular Property Checks & Edge Boundaries]] ^toc-edge
- [[#🕹️ 4. Layout, Rendering & States Loops]] ^toc-rendering
- [[#🚀 5. Advanced Integrations, Backends & Performance Checks]] ^toc-advanced
- [[#🗃️ QA Validation History (Sign-Off Log)]] ^toc-history
- [[#🚀 Go to...]] ^toc-goto

You can use this interactive test sheet directly with VS Code / Cursor to verify that all systems in **ProjectGrid** are fully functional. Put your cursor on these checkbox lines, and mark them done!

---

## 🔵 1. Setup & Environment Initializations
[[#^toc-setup|TOC]]
- [ ] Build and deploy plugin
  - **Instructions**: Run `node build.js` from repo root. Verify console shows successful bundle and deploy to `c:\_o\.obsidian\plugins\projectgrid\`.
  - **Expected Results**: `main.js` and `manifest.json` exist in deploy folder with non-zero file size.
- [ ] Enable plugin in Obsidian
  - **Instructions**: Settings → Community plugins → enable **!!ProjectGrid Folder Note Visualizer**. Reload if prompted.
  - **Expected Results**: No error toast. Console shows `🚀 Loading Project Matrix Grid Dashboard Engine...`.

## 🟢 2. Primary Functionality & Core Operations
[[#^toc-core|TOC]]
- [ ] Project matrix renders from code block
  - **Instructions**: Add ` ```projectgrid\n__\n``` ` to a note. Open in reading or live preview mode.
  - **Expected Results**: Toolbar (☰ ❔) and table appear with rows for folders containing `+{name}.md` folder notes.
- [ ] Folder note title link opens note
  - **Instructions**: Click a `+{name}.md` link in the title column.
  - **Expected Results**: Obsidian navigates to the folder note file.
- [ ] Search filter hides non-matching rows
  - **Instructions**: Type a partial folder name in the filter input.
  - **Expected Results**: Non-matching rows hidden; clear button (✕) appears; header count badges update.

## ⚡ 3. Granular Property Checks & Edge Boundaries
[[#^toc-edge|TOC]]
- [ ] YAML select writes frontmatter
  - **Instructions**: Open a stars dropdown, select `3⭐`, close dropdown.
  - **Expected Results**: Folder note frontmatter `stars: 3⭐` persisted. Reopen grid shows same value.
- [ ] Tasks checkbox toggle syncs markdown body
  - **Instructions**: Open tasks dropdown, toggle a task checkbox.
  - **Expected Results**: Corresponding `- [ ]`/`- [x]` line under `## Incoming Tasks` updated in folder note.
- [ ] Empty grid when no folder notes match
  - **Instructions**: Use code block prefix with no matching folder notes (e.g., `nonexistent/`).
  - **Expected Results**: No table rendered (empty container).

## 🕹️ 4. Layout, Rendering & States Loops
[[#^toc-rendering|TOC]]
- [ ] ScrollLock command menu navigation
  - **Instructions**: Focus filter input, press ScrollLock. Use F/C/L/S accelerators and arrow keys.
  - **Expected Results**: Two-level picker opens; categories drill down; Escape closes and refocuses filter.
- [ ] Sort chain reorders rows
  - **Instructions**: ScrollLock → Sort → select 1-2 columns. Observe toolbar label and 🟢🟡🔴 badges.
  - **Expected Results**: Rows reorder; toolbar shows `📶 Sort Chain: 🟢KEY ➔ 🟡KEY`; clear sort restores default directory order.
- [ ] Tutor HUD displays column hints
  - **Instructions**: Press Ctrl+Alt+T. Focus a tasks or tags select cell.
  - **Expected Results**: Tutor overlay shows column-specific keyboard hints from `grid-config.js`.

## 🚀 5. Advanced Integrations, Backends & Performance Checks
[[#^toc-advanced|TOC]]
- [ ] Git scanner shows remote link
  - **Instructions**: Find a row with `.git` folder. Click ✅ git cell.
  - **Expected Results**: Browser opens normalized HTTPS URL from git origin config.
- [ ] Launcher icons fire aip:// URIs
  - **Instructions**: Click 📁 💻 💜 launcher icons on a project row.
  - **Expected Results**: External AIP handler opens Directory Opus, Cursor, or Obsidian vault respectively.
- [ ] AGENTS.md missing shows AIMD init link
  - **Instructions**: View row for project without `AGENTS.md`.
  - **Expected Results**: 🤖 column shows ❌ linking to `aip://aimd/_ {path}`.

---

## 🗃️ QA Validation History (Sign-Off Log)
[[#^toc-history|TOC]]

### 📅 [2026-06-25] - Build v1.0.0
- **Testing Agent:** Pending manual validation
- **Passed Cases:** None recorded yet
- **Failed Cases / Notes:** Automated test suite not implemented — manual checklist only
- **Status:** `[PENDING VALIDATION]`

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
- 🔹 [TERMS.md](TERMS.md)
- 🔸 [TESTING.md](TESTING.md)
- 🔹 [VERSIONS.md](VERSIONS.md)
