<!-- markdownlint-disable MD013 -->
# ARCHIVE

## 📑 AI Primary Files
- 🔹 [AGENTS.md](../AGENTS.md)
- 🔸 [ARCHIVE.md](ARCHIVE.md)
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
- 🔹 [TESTING.md](TESTING.md)
- 🔹 [VERSIONS.md](VERSIONS.md)

## 🔍 Table of Contents
- [[#🚪 Retired Features & Components]] ^toc-retired
- [[#💾 Legacy Code Snippets & Discarded Scripts]] ^toc-snippets
- [[#📑 Obsolete Specifications & Scrapped Ideas]] ^toc-scrapped
- [[#🚀 Go to...]] ^toc-goto

## 🚪 Retired Features & Components
[[#^toc-retired|TOC]]

### ❌ Gear Icon Toolbar Button
- **Active Lifespan:** Pre-v1.0.0 (Retired during initial development)
- **Reason for Retirement:** UX clarity — gear icon did not communicate the ScrollLock System Commands Picker Menu purpose.
- **Superseded By:** Hamburger ☰ symbol in `main-toolbar.js` with title "Open ScrollLock System Commands Picker Menu".

---

## 💾 Legacy Code Snippets & Discarded Scripts
[[#^toc-snippets|TOC]]

### 📜 Hand-Edited main.js Workflow
- **Context:** Before `build.js` IIFE bundler was implemented, developers may have edited `main.js` directly as the plugin entry point.
- **Why it was replaced:** Single-file edits could not scale across 37 modules; no scope isolation; changes lost on rebuild.
- **Legacy Implementation:**
  ```text
  ; --- OBSOLETE DO NOT USE ---
  Edit main.js directly and copy to Obsidian plugins folder manually.
  ```

### 📜 Template Placeholder AIMD Docs
- **Context:** AIMD markdown files shipped with `{{placeholder}}` text from template generators awaiting project-specific content.
- **Why it was replaced:** Reverse-engineered documentation from source code on 2026-06-25 filled all 14 files with accurate ProjectGrid content.
- **Legacy Implementation:**
  ```text
  ; --- OBSOLETE DO NOT USE ---
  {{Describe the core application/extension being built here}}
  {{Specify platforms, e.g., Windows 10, macOS, Cursor}}
  ```

---

## 📑 Obsolete Specifications & Scrapped Ideas
[[#^toc-scrapped|TOC]]

### 💡 npm/Webpack Build Pipeline
- **Proposed on:** Early development
- **The Concept:** Standard Obsidian plugin toolchain with `package.json`, esbuild/rollup, and hot reload dev server.
- **Why it failed/was dropped:** Project intentionally avoids npm dependencies. Custom `build.js` with Node built-ins provides sufficient IIFE bundling with auto-deploy to the local vault plugins folder.

### 💡 Static Task Defaults (0/5 through 5/5)
- **Proposed on:** Early grid-config design
- **The Concept:** Tasks column used fixed ratio presets (`0/5`, `1/5`, etc.) as yaml-select defaults.
- **Why it failed/was dropped:** Replaced by live vault-wide task discovery from `## Incoming Tasks` sections. Tasks column now uses `tasks-markdown-sync` with dynamic checkbox options and `{checked}/{total}` display.

---
## 🚀 Go to...
[[#^toc-goto|TOC]]
- 🔹 [AGENTS.md](../AGENTS.md)
- 🔸 [ARCHIVE.md](ARCHIVE.md)
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
- 🔹 [TESTING.md](TESTING.md)
- 🔹 [VERSIONS.md](VERSIONS.md)
