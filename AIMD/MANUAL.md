<!-- markdownlint-disable MD013 -->
# MANUAL

## 📑 AI Primary Files
- 🔹 [AGENTS.md](../AGENTS.md)
- 🔹 [ARCHIVE.md](ARCHIVE.md)
- 🔹 [BUILD.md](BUILD.md)
- 🔹 [CODE.md](CODE.md)
- 🔹 [DESIGN.md](DESIGN.md)
- 🔹 [FEATURES.md](FEATURES.md)
- 🔹 [LOG.md](LOG.md)
- 🔸 [MANUAL.md](MANUAL.md)
- 🔹 [README.md](../README.md)
- 🔹 [SPEC.md](SPEC.md)
- 🔹 [TASKS.md](TASKS.md)
- 🔹 [TERMS.md](TERMS.md)
- 🔹 [TESTING.md](TESTING.md)
- 🔹 [VERSIONS.md](VERSIONS.md)

## 🔍 Table of Contents
- [[#📥 Installation & Initial Deployment]] ^toc-install
- [[#🏗️ 1. Architecture Overview]] ^toc-architecture
- [[#🧠 2. Core Modules & Systems]] ^toc-modules
- [[#🔎 3. Core Algorithm & Mathematical Formulas]] ^toc-math
- [[#🛰️ 4. Commands, Keybindings & Context Flags]] ^toc-commands
- [[#🔧 5. Workspace Build & Configuration]] ^toc-config
- [[#🔍 Diagnostics & Common Troubleshooting]] ^toc-diagnostics
- [[#Go to...]] ^toc-goto

This guide describes the structural architecture, module layout, internal algorithms, optimization behaviors, and technical specifications of the **ProjectGrid Folder Note Visualizer** codebase.

---

## 📥 Installation & Initial Deployment
[[#^toc-install|TOC]]

### Setup Sequence
- 1. **Compile/Build Assets:** From `c:\_o\__\op-project-grid`, run `node build.js` (see `BUILD.md`).
- 2. **Verify Deploy:** Confirm `main.js` and `manifest.json` copied to `c:\_o\.obsidian\plugins\projectgrid\`.
- 3. **Enable Plugin:** In Obsidian → Settings → Community plugins → enable **!!ProjectGrid Folder Note Visualizer**.
- 4. **Embed Dashboard:** Add a `projectgrid` code block to any note (see [[#🔧 5. Workspace Build & Configuration]]).

---

## 🏗️ 1. Architecture Overview
[[#^toc-architecture|TOC]]
```text
 +-------------------------------------------------------------+
 |  Obsidian Note: ```projectgrid\n__\n```                     |
 +-----------------------------+-------------------------------+
                               |
                               v
 +-----------------------------+-------------------------------+
 |  ProjectGridPlugin (_main.js)                               |
 |  registerMarkdownCodeBlockProcessor('projectgrid')          |
 +-----------------------------+-------------------------------+
                               |
                               v
 +-----------------------------+-------------------------------+
 |  main-renderer.js                                           |
 |  Toolbar + Table Header + Filter Init                       |
 +-------+-------------+-------+-------------+---------------+
         |             |       |             |
         v             v       v             v
 +-------+---+  +------+-+  +--+--------+  +--+----------+
 |main-      |  |filter  |  |menu-core  |  |styles.js    |
 |scanner.js |  |.js     |  |+ menu-*   |  |+ components |
 +-----+-----+  +--------+  +-----------+  +-------------+
       |
       v
 +-----+-----------------------------------+
 | ui-row.js  →  grid-config columns loop  |
 |   ├─ ui-row-dates (timestamp)           |
 |   ├─ ui-row-actions (launcher)            |
 |   ├─ ui-row-tags (tags-cell)              |
 |   └─ ui-row-select (yaml-select/tasks)   |
 +-----------------------------------------+
```

Lifecycle: Obsidian loads bundled `main.js` → plugin `onload` injects CSS and registers processor → user opens note with code block → renderer scans vault → builds DOM table → filter/menu keyboard handlers bind → user interactions mutate vault files via Obsidian API.

---

## 🧠 2. Core Modules & Systems
[[#^toc-modules|TOC]]
- **Grid Config (`grid-config.js`)**: Single source of truth for 18 column definitions (key, icon, label, type, width, defaults, tutorKeys).
- **Vault Scanner (`main-scanner.js`)**: Two-pass folder iteration — first pass collects vault-wide task strings from `## Incoming Tasks`; second pass builds rows with frontmatter + filesystem data.
- **Row Factory (`ui-row.js`)**: Creates `<tr>` with `data-directory` attribute; dispatches cell creation by `col.type`.
- **Select Engine (`ui-row-select.js` + 6 sub-modules)**: Dropdown open/close, keyboard routing, frontmatter commit, task checkbox mutation.
- **Filter Manager (`filter.js`)**: Text filter, column filter conjunction, header badge counts, row focus overlay sync, `ProjectGridIndicatedDirectory` tracking.
- **Sort Engine (`menu-state-sort.js`)**: Maintains 3-key sort chain; reorders DOM tbody children; triggers filter refresh.
- **Command Menu (`menu-core.js`, `menu-state.js`, `menu-dom.js`)**: ScrollLock two-level picker with accelerator keys and live directory header.
- **Tasks Backend (`tasks-markdown-sync.js`, `tasks-markdown-writer.js`, `tasks-git-extractor.js`)**: Markdown body CRUD for tasks; git remote URL extraction.
- **Style Injector (`styles.js`)**: Aggregates CSS from `styles-core`, `styles-animation`, `styles-components-*` into `#obsidian-projectgrid-styles`.

---

## 🔎 3. Core Algorithm & Mathematical Formulas
[[#^toc-math|TOC]]

### Task Progress Display
Each tasks column cell shows checked count over total discovered options:

$$\text{Display} = \frac{|\text{activeValuesArray}|}{|\text{optionsList}|}$$

- **`activeValuesArray`**: Task strings currently checked for this row (parsed from `- [x]` lines).
- **`optionsList`**: All task strings discovered vault-wide under `## Incoming Tasks` headings.

### Header Column Fill Rate
On each filter pass, header badges show non-null visible count over non-null total:

$$\text{Badge} = \frac{\text{nonNullVisible}}{\text{nonNullTotal}}$$

- **Null sentinel values**: `⬛`, empty string, `0000.00.00 00`, `0/0`.
- **Tasks/Created/Updated columns**: Use visible row count over total row count instead.

### Sort Chain Priority
Up to 3 keys evaluated left-to-right. Numeric fields (stars, value, size, depth, priority, tasks) sort descending; text fields sort ascending with empty/`⬛` pushed to end (`zzzzz`). Tie-breaker: folder base name alphabetical.

---

## 🛰️ 4. Commands, Keybindings & Context Flags
[[#^toc-commands|TOC]]
- **ScrollLock Command Menu**:
  - **Key combinations**: `ScrollLock` (global) or ☰ click
  - **Contextual triggers**: Focus on filter input or any projectgrid block
  - **Logical callback**: Opens level-1 category picker; `F`/`C`/`L`/`S` accelerators drill into submenus
- **Row Navigation**:
  - **Key combinations**: `ArrowUp` / `ArrowDown` while filter input focused (no picker open)
  - **Logical callback**: Cycles focused row in visible set; updates `ProjectGridIndicatedDirectory`
- **Tutor Toggle**:
  - **Key combinations**: `Ctrl+Alt+T`
  - **Logical callback**: Toggles `ProjectGridTutorModeActive`; shows context help for focused cell
- **Filter Clear**:
  - **Key combinations**: Click ✕ clear button
  - **Logical callback**: Clears filter input, refocuses, shows all rows
- **Dropdown Escape**:
  - **Key combinations**: `Escape` in select cell
  - **Logical callback**: Closes dropdown, returns focus to filter input
- **Picker Navigation**:
  - **Key combinations**: `ArrowUp`/`ArrowDown`/`Enter` in picker; `Escape`/`Backspace` retreat/close
  - **Logical callback**: Two-level menu navigation via `menu-core.js`

---

## 🔧 5. Workspace Build & Configuration
[[#^toc-config|TOC]]

### Code Block Usage
````markdown
```projectgrid
__
```
````
- **Source text**: Vault path prefix. Only folders whose path starts with this prefix are scanned.
- **Default**: If blank, uses `__` (matches folders under vault `__/` paths).
- **Folder note requirement**: Each included folder must contain `+{folderName}.md`.

### Column Configuration (`grid-config.js`)
Edit the `columns` array to add/remove/reorder columns. Supported `type` values:
- `static` — title link column (key must be `title`)
- `timestamp` — filesystem dates (keys: `created`, `updated`)
- `launcher` — `aip://` button (requires `protocol` field)
- `yaml-select` — frontmatter dropdown (requires `defaults` array)
- `tags-cell` — multi-select tags editor
- `scanner-check` — filesystem file existence (requires `targetFile`)

### Deploy Path Override
In `build.js`, modify:
```javascript
const destDir = path.join('c:\\_o\\.obsidian\\plugins', outDir);
```
Change `c:\\_o` if your Obsidian vault lives elsewhere.

---

## 🔍 Diagnostics & Common Troubleshooting
[[#^toc-diagnostics|TOC]]

### Known Failure States & Remediations

#### 🚨 Symptom: Plugin does not appear in Obsidian after build.
- **Root Cause:** Deploy path mismatch or `manifest.json` missing from plugins folder.
- **Remediation:** Verify `c:\_o\.obsidian\plugins\projectgrid\manifest.json` exists. Re-run `node build.js`. Restart Obsidian.

#### 🚨 Symptom: Code block renders empty — no table shown.
- **Root Cause:** No folders under the path prefix contain folder notes (`+{name}.md`), or prefix is wrong.
- **Remediation:** Check code block path prefix. Confirm folder notes exist. Table only appends when `rowsArray.length > 0`.

#### 🚨 Symptom: Launcher icons do nothing when clicked.
- **Root Cause:** External `aip://` URI handler not registered on the system.
- **Remediation:** Ensure AIP protocol handler is installed and mapped for `dopus`, `cursor`, `obsidian`, `aimd` schemes.

#### 🚨 Symptom: Task toggles revert after reload.
- **Root Cause:** Folder note missing `## Incoming Tasks` section or task text mismatch.
- **Remediation:** Add `## Incoming Tasks` heading to folder note. Ensure checkbox text matches exactly (trimmed comparison).

#### 🚨 Symptom: Changes to source files have no effect in Obsidian.
- **Root Cause:** Editing `main.js` directly or forgetting to rebuild.
- **Remediation:** Edit source modules, run `node build.js`, reload plugin in Obsidian.

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
- 🔸 [MANUAL.md](MANUAL.md)
- 🔹 [README.md](../README.md)
- 🔹 [SPEC.md](SPEC.md)
- 🔹 [TASKS.md](TASKS.md)
- 🔹 [TERMS.md](TERMS.md)
- 🔹 [TESTING.md](TESTING.md)
- 🔹 [VERSIONS.md](VERSIONS.md)
