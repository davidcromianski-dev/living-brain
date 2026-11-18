---
tags: [living-brain, document-architecture, conventions]
version: 0.2
date: 2026-05
---

# Document Architecture Conventions

> Standards that ensure consistency across all repositories using Living Brain.

---

## Directory structure

```
<docs-repo>/
├── CLAUDE.md                  ← instructions for LLMs working in the repo
├── .gitignore
│
├── glossary/
│   └── INDEX.md           ← flat file; shared terms, no llm-wiki layer
│
├── <area>/
│   ├── INDEX.md              ← area entry point
│   ├── wiki/
│   │   ├── INDEX.md
│   │   ├── _changes.md
│   │   └── NN-topic-name.md   ← prefixed numbering for natural ordering
│   └── llm-wiki/
│       ├── MANIFEST.md
│       ├── USAGE.md
│       └── entries/
│           └── <PREFIX>-name.md
```

---

## Documentation directory in a consuming project

When Living Brain is applied to a project that also holds source code, the documentation is
never interleaved with that code. Every area (`wiki/` + `llm-wiki/`) is grouped under a single,
dedicated, top-level directory with a semantic name. The name is not fixed; pick one and stay
consistent. Recommended options: `docs/`, `.docs/`, `living-brain/`, `.living-brain/`,
`documentation/`.

Rule: one dedicated, semantically named directory, separated from code.

---

## Entry prefixes in the llm-wiki

Prefixes are **not mandatory** - they should not be created upfront. During the analysis of each situation, it will be decided which entries to create based on actual use. New prefixes must be validated before adoption.

Reference list of known prefixes:

| Prefix | Type | Typical context |
|---|---|---|
| `ENT-` | Domain entity | Business repositories |
| `BR-` | Business rule | Business repositories |
| `MOD-` | Complete module | Business/technical repositories |
| `ADR-` | Architecture Decision Record | Technical repositories |
| `SCH-` | Database schema | Technical repositories |
| `REF-` | Quick reference | Any repository |

The canonical, complete list of prefixes - and which domain owns each one - is the registry in
`plugins/living-brain/reference/ROLES.md`. This table is a reading aid, not a second source: when
the two disagree, the registry wins.

---

## Draft marking

Every AI-created document without human review must have this banner at the top:

```
> ⚠️ DRAFT - Documented by AI based on initial interview. Awaiting human review.
```

Upon review, remove the banner and record in `_changes.md`.

---

## Canonical ID convention

- IDs are permanent - never rename after creation
- Format: `PREFIX-kebab-case-name` (e.g., `BR-authentication`, `ADR-backend-stack`)
- Cross-references always use the ID, never vague text

---

## File naming convention

A file's name says what kind of file it is. Three shapes, and nothing outside them:

| Shape | What it is | Examples |
|---|---|---|
| `UPPERCASE.md` | Entry point, index, or registry: a file opened to find other things | `INDEX.md`, `MANIFEST.md`, `USAGE.md`, `README.md` |
| `kebab-lowercase.md` | A content file: opened to read the thing itself | `01-conventions.md`, `entry-templates.md`, `writing-principles.md` |
| `_lowercase.md` | Changelog, underscored so it sorts before the content | `_changes.md` |

Numbered content files carry their reading order as an `NN-` prefix - see [[00-overview]] for the
directory structure that uses it.

Two rules cut across all three:

1. **Filenames are American English,** like every other written artifact. A name is read far more
   often than the file it labels, and a name in another language survives content sweeps because
   those search text, not filenames.
2. **A reference names a resolvable path, never a bare filename.** Every document in this
   architecture is written to be loaded on its own, so a bare name gives the reader nothing to
   verify against. Inside an area, reference the path from the area root; for a file bundled with
   the plugin, use `${CLAUDE_PLUGIN_ROOT}/reference/<file>`.

---

## Changelog convention (`_changes.md`)

Every `_changes.md` must:

1. **Link to the group** - a line just below the title referencing `[[INDEX]]` of the wiki itself, so the file appears connected to the area cluster in the Obsidian graph.
2. **Link affected documents** - each entry references the modified files as `[[wikilinks]]`, not as plain text.

Complete template:

```markdown
# Change History - <Area>

> Changelog for this area. Linked to [[INDEX|wiki of this area]]; each entry references the affected documents as `[[wikilinks]]` to appear in the Obsidian graph.

---

## [YYYY-MM-DD] - <Short title>

**Context:** why it changed
**What changed:** objective description
**Affected documents:** [[doc-a]], [[doc-b]]
```

---

## The glossary is a flat file

The glossary is the **named exception** to the two-layer rule: a single flat file
(`glossary/INDEX.md`) holding the terms shared across two or more areas, with no `llm-wiki/`
layer of its own. It occupies a directory for symmetry with the areas, but it is not an area and
is not structured as one.

The reason is that the glossary is already atomic. Its unit is the term, its definitions are one
or two lines, and it is read whole. There is nothing for a MANIFEST to index and nothing for
selective lookup to save.

---

## Convention scope

These conventions apply to **product documentation**: the areas a consuming project documents
with Living Brain.

They do not apply uniformly to the method's own repository. The earlier rule that "there are no
special rules for one over the other" is **revoked**, and the reason is worth stating: the
`llm-wiki/` layer exists to make product documentation cheap to look up selectively - it is
atomic, addressable, and queried one entry at a time. The method's own documentation is
narrative prose, read by a human from start to finish. Splitting it into atomic entries produced
five MANIFESTs indexing entries nobody ever wrote, and no reader would have benefited from them
if they had been.

The conventions that do apply everywhere are the ones about writing, not about structure: the
draft banner, the canonical ID format, and the changelog.
