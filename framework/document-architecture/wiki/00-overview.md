---
tags: [living-brain, document-architecture, vision]
version: 0.2
date: 2026-05
---

# Document Architecture - Overview

> The structure that makes documentation living, efficient, and consumable by humans and AI.

---

## The problem the architecture solves

Living documentation must serve two audiences with opposing needs:
- **Humans** need narrative, context, explanation
- **LLMs** need density, atomicity, minimum tokens

A single layer does not serve both well. The solution is to separate the layers.

---

## Two Layers

Each documentation area has exactly two layers:

### Layer 1 - Wiki (Human)

```
<area>/wiki/
├── INDEX.md          ← document map for the area
├── _changes.md       ← change changelog
└── *.md               ← narrative documents by topic
```

- Format: Narrative Markdown, Obsidian-compatible
- Purpose: communicate context, motivation, nuances
- **Is the source of truth** - every change starts here
- Never overwrite without recording in `_changes.md`

### Layer 2 - LLM Wiki (AI)

```
<area>/llm-wiki/
├── MANIFEST.md        ← index; LLM loads this first
├── USAGE.md           ← how to consume this llm-wiki
└── entries/
    └── <PREFIX>-*.md  ← atomic entries
```

- Format: atomic entries with YAML frontmatter
- Purpose: efficient LLM consumption
- **Is derived from the wiki** - never has information that does not exist in the wiki
- Updated after each wiki change

---

## Why two layers reduce cost

Instead of loading whole documents to answer one question, the LLM:
1. Loads the MANIFEST
2. Identifies the relevant entries from their one-line descriptions
3. Loads only those entries

What it never loads is the rest of the area. The saving is therefore proportional to how much of
the documentation a given question does not touch, which grows as the product's documentation
grows.

This has not been measured. No reduction figure is claimed here until there is a corpus to
measure and a measurement to cite.

---

## Fundamental rule

> The wiki is always the source of truth. The llm-wiki never has information that does not exist in the wiki.

If there is a conflict between the layers, the wiki wins. The llm-wiki is adjusted.

---

## Synchronization

Synchronization between wiki and llm-wiki is a **synchronous step of the routing protocol**: the
same task that writes to the wiki also updates the llm-wiki, before it is done. There is no hook
and no periodic agent - the layers stay aligned because closing the loop is part of the task, not
because something watches the repository.

The failure mode this leaves open is an out-of-band edit: a wiki file changed by hand, outside the
routing skill, does not propagate. Recovering from that is a manual re-sync.

Consistency between documentation and code is a separate concern, and one this architecture does
not address. It rests on human review.
