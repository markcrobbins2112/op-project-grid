<!-- markdownlint-disable MD013 -->
# LOG

## 📑 AI Primary Files
- 🔹 [AGENTS.md](../AGENTS.md)
- 🔹 [ARCHIVE.md](ARCHIVE.md)
- 🔹 [BUILD.md](BUILD.md)
- 🔹 [CODE.md](CODE.md)
- 🔹 [DESIGN.md](DESIGN.md)
- 🔹 [FEATURES.md](FEATURES.md)
- 🔸 [LOG.md](LOG.md)
- 🔹 [MANUAL.md](MANUAL.md)
- 🔹 [README.md](../README.md)
- 🔹 [SPEC.md](SPEC.md)
- 🔹 [TASKS.md](TASKS.md)
- 🔹 [TERMS.md](TERMS.md)
- 🔹 [TESTING.md](TESTING.md)
- 🔹 [VERSIONS.md](VERSIONS.md)

## 🔍 Table of Contents
- [[#💾 Commit Message]] ^toc-commit
- [[#📝 Log Entries]] ^toc-entries
- [[#🏛️ Permanent Decision Record Archive]] ^toc-adr
- [[#🚀 Go to...]] ^toc-goto

## 💾 Commit Message
[[#^toc-commit|TOC]]
```text
docs: reverse-engineer codebase into AIMD documentation set

- Fill all 14 markdown files from source code analysis
- Document plugin architecture, build pipeline, features, and protocols
- Replace template placeholders with ProjectGrid-specific content
```

## 📝 Log Entries
[[#^toc-entries|TOC]]

### 📅 [2026-06-25T12:00:00Z]
#### 🎯 Primary Goals & Requirements
- Reverse engineer the ProjectGrid Obsidian plugin codebase and fill out all AIMD markdown templates with accurate project-specific documentation.
- Preserve existing nav/TOC structure; remove template placeholders.

#### 🛠️ Completed Changes in this Session
- **AIMD Core Docs**: Wrote BUILD, CODE, DESIGN, SPEC from `build.js`, `_main.js`, `grid-config.js`, and module topology analysis.
- **AIMD User Docs**: Wrote FEATURES, MANUAL, TERMS covering all 18 columns, keyboard bindings, and glossary terms.
- **AIMD Meta Docs**: Wrote VERSIONS (v1.0.0), TESTING (manual checklist), TASKS (backlog + completed archive), LOG, ARCHIVE.
- **Root Docs**: Wrote README and AGENTS with platform context, quick start, agent personas, and file restrictions.

#### 🔸 Affected Files
- `README.md`
- `AGENTS.md`
- `AIMD/BUILD.md`
- `AIMD/CODE.md`
- `AIMD/DESIGN.md`
- `AIMD/SPEC.md`
- `AIMD/FEATURES.md`
- `AIMD/MANUAL.md`
- `AIMD/TERMS.md`
- `AIMD/VERSIONS.md`
- `AIMD/TESTING.md`
- `AIMD/TASKS.md`
- `AIMD/LOG.md`
- `AIMD/ARCHIVE.md`

### 📅 [2026-06-23T21:06:00Z]
#### 🎯 Primary Goals & Requirements
- Baseline initialization of the standard development environment layout framework.

#### 🛠️ Completed Changes in this Session
- Implemented core feature structures and verified multi-environment cross-linking pathways.

#### 🔸 Affected Files
- `/README.md`

---

## 🏛️ Permanent Decision Record Archive
[[#^toc-adr|TOC]]

### 🏷️ [ADR-001] - IIFE Bundle Architecture (No npm Dependencies)
- **Date Approved:** 2026-06-25
- **Context:** Obsidian plugins ship as a single `main.js`. Multiple CommonJS modules need isolation without a bundler toolchain dependency.
- **Decision:** Custom `build.js` wraps each source module in an IIFE, assigns exports to `globalThis`, and skips `obsidian`/`electron` requires. Zero npm packages.
- **Consequences:** Cross-module access requires `globalThis` assignments. Rebuild required after every source edit. No tree-shaking or source maps.

### 🏷️ [ADR-002] - Config-Driven Column Schema in grid-config.js
- **Date Approved:** 2026-06-25
- **Context:** Grid has 18 heterogeneous column types (static, timestamp, launcher, yaml-select, tags-cell, scanner-check).
- **Decision:** Single `columns` array in `grid-config.js` drives header rendering, row cell factory dispatch, menu schema, and sort/filter key maps.
- **Consequences:** Adding columns is a config edit plus potential new `col.type` handler. All column keys must stay consistent across filter, sort, and menu modules.

### 🏷️ [ADR-003] - Folder Note Convention (+{name}.md)
- **Date Approved:** 2026-06-25
- **Context:** ProjectGrid must identify which vault folders are "projects" vs ordinary directories.
- **Decision:** A folder appears in the grid only when `{folder.path}/+{folder.name}.md` exists in the vault.
- **Consequences:** Folder naming is coupled to note naming. Renaming folders requires renaming folder notes.

---
## 🚀 Go to...
[[#^toc-goto|TOC]]
- 🔹 [AGENTS.md](../AGENTS.md)
- 🔹 [ARCHIVE.md](ARCHIVE.md)
- 🔹 [BUILD.md](BUILD.md)
- 🔹 [CODE.md](CODE.md)
- 🔹 [DESIGN.md](DESIGN.md)
- 🔹 [FEATURES.md](FEATURES.md)
- 🔸 [LOG.md](LOG.md)
- 🔹 [MANUAL.md](MANUAL.md)
- 🔹 [README.md](../README.md)
- 🔹 [SPEC.md](SPEC.md)
- 🔹 [TASKS.md](TASKS.md)
- 🔹 [TERMS.md](TERMS.md)
- 🔹 [TESTING.md](TESTING.md)
- 🔹 [VERSIONS.md](VERSIONS.md)
