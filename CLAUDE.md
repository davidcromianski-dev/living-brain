# CLAUDE.md - Living Brain

This repository documents the **Living Brain**, a software development method centered on living documentation routed through a single skill. Subagent isolation for execution is optional; the public superpowers plugin (`obra/superpowers`) is one way to get it. The plugin runs in Claude Code only.

---

## Language policy

**All content written to files in this repository must be in American English.** This applies to every document, comment, template, and file created or edited by the AI.

**Conversation responses must match the user's language.** If the user writes in Portuguese, respond in Portuguese. If they write in English, respond in English. This applies to all chat replies, summaries, questions, and explanations.

The rule is: **files → English only; responses → user's language.**

**One registered exception:** `docs/` holds the project's public website, served by GitHub Pages, and is written in Brazilian Portuguese because its audience is Portuguese-speaking evaluators. Code and comments inside it stay in English. The exception covers `docs/` and nothing else.

---

## Important - evolving structure

This repository is under active construction. The area structure and documents **will grow over time** as the method is discovered and validated in practice. Do not assume that the absence of an area means it doesn't exist - it may simply not have been documented yet.

Pages marked with `> ⚠️ DRAFT` are awaiting human review. Do not treat that content as definitive.

---

## What this repository contains

Three parts, and no application source code - everything here is documentation.

| Directory         | Contents                                                                                                       |
|-------------------| -------------------------------------------------------------------------------------------------------------- |
| `framework/`      | Definition of the Living Brain method: foundations, pipeline, agents, document architecture                     |
| `docs/`           | The public website (GitHub Pages), in Brazilian Portuguese - see the language exception above |
| `plugins/living-brain/` | The Living Brain plugin: one thin routing skill (`manager`) plus a reference layer (`reference/ROLES.md`, `entry-templates.md`, `area-templates.md`, `writing-principles.md`, `documentation-architecture.md`, `llm-wiki-prompt.md`). Distributed via the marketplace at `.claude-plugin/marketplace.json`; loads as `living-brain:manager`. For in-repo development load with `claude --plugin-dir ./plugins/living-brain` |

---

## How to consume context

**Never load all files at once.** Use selective lookup:

1. Identify the relevant area in `framework/`
2. Load `framework/<area>/INDEX.md`, then only the documents its `wiki/INDEX.md` lists as relevant
3. If the task is about the plugin, load only the reference file it concerns

The `framework/` areas are narrative prose meant to be read by a human, and they have no `llm-wiki/` layer. That layer is for **product** documentation in a consuming project, where content is atomic and looked up one entry at a time.

---

## Repository architecture

Each area in `framework/` has this shape:

```
<area>/
├── INDEX.md              ← area entry point
└── wiki/
    ├── INDEX.md
    ├── _changes.md
    └── *.md
```

A consuming project's areas add the `llm-wiki/` layer derived from `wiki/`. That structure is defined in `plugins/living-brain/reference/area-templates.md`.

---

## Documented areas

| Area                      | Contents                                                   |
| ------------------------- | ---------------------------------------------------------- |
| `foundations/`            | What it is, principles, differentiators vs other methods   |
| `pipeline/`               | How a documentation task is validated before code exists   |
| `agents/`                 | The routing model: manager skill and domain registry       |
| `document-architecture/`  | Wiki + llm-wiki, conventions, maintenance                  |

> New areas will be added as the method evolves. Update this table when creating a new area.

---

## Editing rules

1. **Wiki is the source of truth** - changes always start in `<area>/wiki/`
2. **Mark drafts** - content not reviewed by the author carries the `> ⚠️ DRAFT` banner
3. **Record changes** - every change in `wiki/` goes into `<area>/wiki/_changes.md`
4. **Incremental** - do not create structures for content that does not yet exist
5. **English only** - all written content must be in American English, with the exception registered above
