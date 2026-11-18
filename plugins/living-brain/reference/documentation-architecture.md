# Documentation Architecture - Living Brain

> Governs how documentation is organized. Applies to every Living Brain area in the consuming
> project. Read before creating or editing any file.

---

## Overview

Two-layer architecture, applied to each area.

```
<area>/
├── INDEX.md          ← area entry point
├── wiki/              ← Layer 1: human reading (source of truth)
│   ├── INDEX.md
│   ├── _changes.md
│   └── *.md
└── llm-wiki/          ← Layer 2: AI consumption (derived)
    ├── MANIFEST.md
    ├── USAGE.md
    └── entries/
```

**Fundamental rule:** `wiki/` is always the source of truth. The `llm-wiki/` never has information that does not exist in the wiki.

---

## Where the documentation lives (consuming projects)

When Living Brain is applied to a real project, its documentation never sits next to the
source code, scattered across feature folders. All Living Brain artifacts (every area's
`wiki/` and `llm-wiki/`) are grouped under a single, dedicated, top-level directory whose
name is semantic and obvious.

The name is not fixed - pick the one that fits the project and stay consistent. Recommended
options:

- `docs/`
- `.docs/`
- `living-brain/`
- `.living-brain/`
- `documentation/`

Rule: one dedicated, semantically named directory, separated from code. Documentation and
code never interleave.

Whichever name the project picks goes in `docs-root` in its `.living-brain.yml`, which is what
makes every path in `ROLES.md` resolve against it. Omit the overlay and `docs-root` is the
project root, which is the layout `INSTALL.md` describes.

---

## Entry prefixes in the llm-wiki

There is no prefix table here, on purpose. Each fact about a prefix lives in one place:

| To know | Read |
|---|---|
| Which prefixes exist and which domain owns each | `ROLES.md`, the `entry-prefix` field of each domain block |
| The structure, the `type:` and the `status:` subset of a prefix | `entry-templates.md`, the block for that prefix |

Prefixes are not mandatory and are not created upfront: a prefix is adopted when a real entry
needs it, and adopting a new one means adding its template block, which is what makes it real.

### Entry status vocabulary (closed)

`draft` | `under-review` | `defined` | `in-development` | `implemented` | `delivered` |
`superseded` | `deprecated`

No family uses every value. Each template states the subset valid for its prefix, and a `status:`
outside this list is never invented.

---

## Draft status

Every AI-created wiki document must contain this banner at the top until human review:

```
> ⚠️ DRAFT - Documented by AI based on initial interview. Awaiting human review.
```

Upon review, remove the banner and record in `_changes.md`.

---

## Areas

| Area         | Purpose                                                                        | Structure |
| ------------ | ------------------------------------------------------------------------------ | --------- |
| `business/`  | Domain entities, business rules, modules, actors, flows                        | Two-layer |
| `product/`   | Features, personas, user stories, product decisions, roadmap                    | Two-layer |
| `technical/` | Non-functional requirements, architecture, data model, API, security, infra    | Two-layer |
| `glossary/`  | Canonical terms shared across areas                                             | Flat `INDEX.md`, no `llm-wiki/` |

`glossary/` is the single named exception to the two-layer rule: one flat file, because a term
list is already atomic and has nothing to derive.

Which domain owns which file inside these areas is declared in `ROLES.md`, not here. A project
may bind those files to different paths through its `.living-brain.yml` overlay.
