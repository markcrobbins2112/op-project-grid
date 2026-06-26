<!-- markdownlint-disable MD013 -->
# BUILD

## 📑 AI Primary Files
- 🔹 [AGENTS.md](../AGENTS.md)
- 🔹 [ARCHIVE.md](ARCHIVE.md)
- 🔸 [BUILD.md](BUILD.md)
- 🔹 [CODE.md](CODE.md)
- 🔹 [DESIGN.md](DESIGN.md)
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
- [[#📋 Prerequisites & Toolchain Setup]] ^toc-prereq
- [[#🛠️ Build & Packaging Pipeline]] ^toc-pipeline
- [[#🚀 Execution & Packing Commands]] ^toc-commands
- [[#🧪 Post-Build Verification Rules]] ^toc-verify
- [[#🚀 Go to...]] ^toc-goto

## 📋 Prerequisites & Toolchain Setup
[[#^toc-prereq|TOC]]
- **Compiler/Runtime:** Node.js (any recent LTS; uses only built-in `fs` and `path` modules — no `npm install` required).
- **Host Application:** Obsidian desktop app with a vault at `c:\_o` (or adjust deploy path in `build.js`).
- **Global System Variables Required:** None. Deploy destination is hardcoded in `build.js`.

---

## 🛠️ Build & Packaging Pipeline
[[#^toc-pipeline|TOC]]
The build is a custom **IIFE Encapsulation Bundler** (`build.js`) that produces a single Obsidian-compatible plugin file.

1. **Entry resolution**: Read `_main.js` from the project root.
2. **Dependency inlining**: Regex-scan for `require('./module')` statements. For each local module (excluding `obsidian` and `electron`):
   - Read module source.
   - Recursively resolve nested requires.
   - Strip START/END OF FILE region comments.
   - Replace `module.exports =` with `return` inside an IIFE wrapper.
   - Assign result to `globalThis.ModuleName`.
3. **Output write**: Write bundled content to `main.js`.
4. **Deploy sync**: Copy `main.js` and `manifest.json` to `c:\_o\.obsidian\plugins\projectgrid\` (folder name derived by stripping prefix before first `-` in repo folder name `op-project-grid` → `projectgrid`).

### 📦 Key Components
- **`_main.js`**: Plugin entry — `ProjectGridPlugin` class, code-block processor registration.
- **`build.js`**: Bundler and deploy script (not bundled into plugin).
- **`main.js`**: Generated production bundle — do not edit directly.
- **`manifest.json`**: Obsidian plugin metadata (id, name, version, description).
- **37 source modules**: UI, menu, scanner, tasks sync, styles — all inlined at build time.

---

## 🚀 Execution & Packing Commands
[[#^toc-commands|TOC]]
- **Production Package Compilation**:
  ```cmd
  node build.js
  ```
- **Install Dependencies**: Not applicable — zero npm dependencies.
- **Local Dev Server / Watch Mode**: Not implemented. Re-run `node build.js` after source edits, then reload Obsidian plugin (disable/enable or restart Obsidian).
- **Verification / Linting**: No automated linter configured. Manual smoke test in Obsidian after deploy.

---

## 🧪 Post-Build Verification Rules
[[#^toc-verify|TOC]]
- 1. **Size Checking:** Verify `main.js` exists and is greater than `0 KB` (typically ~100+ KB when all modules are inlined).
- 2. **Path Verification:** Confirm files exist at `c:\_o\.obsidian\plugins\projectgrid\main.js` and `manifest.json`.
- 3. **Smoke Test:** Enable the plugin in Obsidian Settings → Community plugins. Open a note containing a `projectgrid` code block. Confirm the matrix table renders without console errors.

---
## 🚀 Go to...
[[#^toc-goto|TOC]]
- 🔹 [AGENTS.md](../AGENTS.md)
- 🔹 [ARCHIVE.md](ARCHIVE.md)
- 🔸 [BUILD.md](BUILD.md)
- 🔹 [CODE.md](CODE.md)
- 🔹 [DESIGN.md](DESIGN.md)
- 🔹 [FEATURES.md](FEATURES.md)
- 🔹 [LOG.md](LOG.md)
- 🔹 [MANUAL.md](MANUAL.md)
- 🔹 [README.md](../README.md)
- 🔹 [SPEC.md](SPEC.md)
- 🔹 [TASKS.md](TASKS.md)
- 🔹 [TERMS.md](TERMS.md)
- 🔹 [TESTING.md](TESTING.md)
- 🔹 [VERSIONS.md](VERSIONS.md)
