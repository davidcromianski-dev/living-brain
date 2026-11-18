# Documentation Prompts

> This file contains the prompts for maintaining and generating the project's knowledge base.
> Full architecture: `${CLAUDE_PLUGIN_ROOT}/reference/documentation-architecture.md`.

---

## Prompt Index

| Prompt | When to use |
|---|---|
| [Prompt A - Maintenance and Sync](#prompt-a--maintenance-and-sync) | Whenever the human wiki is modified |
| [Prompt B - Initial LLM Wiki Generation](#prompt-b--initial-llm-wiki-generation) | First time an area receives an LLM Wiki |

---

# Prompt A - Maintenance and Sync

> **When to use:** After any edit, addition, or removal of content in the human wiki (`*/wiki/`).
> The llm-wiki is derived from the wiki - every wiki change must propagate to the llm-wiki before it is considered complete.

---

## Architecture context

This project follows a two-layer documentation architecture per thematic area:

```
<area>/
├── INDEX.md             ← area entry; points to both layers
├── wiki/                 ← Layer 1: human reading and editing (source of truth)
│   ├── INDEX.md
│   └── *.md
└── llm-wiki/             ← Layer 2: AI consumption (derived from wiki)
    ├── MANIFEST.md       ← index; the only file loaded by default by the LLM
    ├── USAGE.md
    └── entries/
        ├── ENT-*.md      ← domain entities
        ├── BR-*.md       ← business rules (one rule per entry)
        ├── MOD-*.md      ← complete module context (flows + FRs)
        └── REF-*.md      ← quick reference tables
```

**Fundamental principle:** The `wiki/` is the source of truth. The `llm-wiki/` never has information that does not exist in the wiki. Every wiki change must result in a corresponding update to the llm-wiki.

---

## Your task

You have received one or more changes to the human wiki. Execute the synchronization protocol below in order.

---

## Step 1 - Read and diagnose what changed

Before editing anything, read:
1. The `wiki/` files that were modified
2. The `MANIFEST.md` of the affected area's llm-wiki
3. The `llm-wiki/entries/` entries that appear related to the change

Classify the change into one of the types below - the type determines what to do in the next steps:

| Change type | Examples |
|---|---|
| **A - Changed fact** | A rule changed value, a deadline was updated, a behavior was redefined |
| **B - Added content** | New rule, new entity, new section within an existing module |
| **C - Resolved question** | An `OPEN` item was answered |
| **D - Removed or deprecated content** | Rule removed, entity discontinued, module out of scope |
| **E - New wiki file** | An entirely new document added to the wiki |
| **F - Structural reorganization** | File renamed, moved, split, or merged |
| **G - Superseded decision** | A decision was replaced by a later one (distinct from D: nothing is deleted) |

---

## Step 2 - Update the human wiki (if necessary)

If the received instruction is a content change (not just a sync):

- Edit the correct file in `wiki/`
- Maintain the existing narrative style and `[[wikilinks]]`
- If the change resolves an open question (`⚠️ Open question`): remove the marking from the wiki file and note it in `wiki/_changes.md`
- If it is a new highly relevant fact: add it to the appropriate section of the file, do not create a new file unless the topic is genuinely distinct
- Update `wiki/_changes.md` with a changelog line: `- [DATE] <change description>`
- If the wiki file is new: update `wiki/INDEX.md` by adding the link in the correct section

---

## Step 3 - Sync the llm-wiki

Apply the rules below according to the change type identified in Step 1.

### Type A - Changed fact

1. Identify which `llm-wiki/entries/` entry contains the outdated fact
2. Edit **only** the affected lines in that entry
3. Do not rewrite the entire entry - only what changed
4. If the fact appeared in more than one entry (unintended duplication), remove it from the secondary and keep it only in the canonical one
5. The MANIFEST does not need to be updated (no entry was created or removed)

### Type B - Added content

Decide whether the new content fits in an existing entry or needs a new entry:

**Fits in the existing entry when:** It is an additional detail of the same idea already documented (e.g., a new parameter of an already existing field, a new row in a permissions table).

**Needs a new entry when:** It is a distinct idea that can be loaded in isolation by the LLM without loading the previous one (e.g., new domain entity, new rule with its own ID, new module).

If creating a new entry:
1. Choose the correct prefix among those this area's domain owns in `ROLES.md`
2. Use the entry template (see Prompt B, "Entry template" section)
3. Add `depends_on` pointing to the entries this one presupposes
4. Add `→ see <ID>` references in related existing entries
5. **Add the new entry to `MANIFEST.md`** in the correct section, with a one-line description

### Type C - Resolved question

1. Find the llm-wiki entry(ies) that contain `> OPEN (D-<AREA>-NN):` referring to the question
2. Remove the `> OPEN:` marking and replace it with the now-defined fact, in the correct place in the entry
3. Remove the question from the MANIFEST's open questions index
4. If the answer reveals a new entry is needed, apply the Type B rules

### Type D - Removed or deprecated content

1. Remove or correct the content in the affected llm-wiki entry
2. If the entire entry has lost its purpose: delete the file and remove its line from `MANIFEST.md`
3. Remove `→ see <ID>` references to deleted entries in other entries
4. Never leave "zombie" entries - no MANIFEST reference and no valid content

### Type E - New wiki file

A new wiki document typically corresponds to one or more of the following in the llm-wiki:
- A new `MOD-*` entry (if it is a complete module)
- Multiple `ENT-*` and `BR-*` entries (if the document defines entities and rules)
- A new `REF-*` entry (if it is a reference table)

Follow the Type B process for each new identified entry.

### Type F - Structural reorganization

1. Update the `depends_on` of the affected entries
2. If canonical IDs changed (which should be avoided), update all `→ see <ID>` references throughout the entry set
3. Update the MANIFEST if entries were renamed

### Type G - Superseded decision

A decision replaced by a later decision is **never deleted** - that is what separates Type G from
Type D. Type D removes something that ceased to exist; Type G preserves why something used to be
right.

1. Keep the old entry's file. Set `status: superseded` and `superseded_by: [<new-ID>]`
2. On the new entry, set `supersedes: [<old-ID>]` - the link is bidirectional, both sides required
3. If only part of the old decision was replaced, use `supersedes_parts_of:` on the new entry
   instead; the old entry stays `status: defined` and gains a note naming what was replaced
4. Keep the tombstone listed in `MANIFEST.md`, marked `(superseded)`, so `→ see` never dangles
5. Record the change in `_changes.md` naming **both** IDs

---

## Step 4 - Post-sync validation

After all edits, validate:

| Check | How to verify |
|---|---|
| No wiki information was left out of the llm-wiki | Reread the modified wiki file line by line vs. affected entries |
| No llm-wiki entry has information that does not exist in the wiki | If found, remove or move to the wiki first |
| MANIFEST lists all existing entries | `ls entries/` and compare with MANIFEST lines |
| No entry has `depends_on` pointing to a non-existent ID | Verify each listed ID |
| Resolved questions were removed from the MANIFEST | Check the "Open Questions" section of the MANIFEST |
| `wiki/_changes.md` has the change record | Confirm the changelog line |
| `llm-wiki/USAGE.md` exists | `ls <area>/llm-wiki/USAGE.md` - it is required by Prompt B and is easy to lose when an area is created in a hurry |
| Superseded entries still resolve | Every `superseded_by:` / `supersedes:` points to an ID that exists |

---

## Invariants that can never be violated

1. **The wiki is the source of truth.** Never modify the llm-wiki without first modifying the wiki.
2. **An ID is permanent.** Do not rename canonical IDs (`ENT-<entity>`, `BR-<rule>`, etc.) - it breaks all references.
3. **One entry, one idea.** If an edit made an entry cover two ideas, split it.
4. **The MANIFEST is the contract.** Every existing entry must be in the MANIFEST. Every MANIFEST entry must exist in `entries/`.
5. **No duplication.** If the same fact appeared in two entries, choose the canonical one and remove it from the other, adding `→ see <ID>`.
6. **Questions marked.** Any introduced uncertainty must become `> OPEN (D-<AREA>-NN):` in the entry and in the MANIFEST index.

---

---

# Prompt B - Initial LLM Wiki Generation

> **When to use:** First time a documentation area receives an LLM Wiki - the `llm-wiki/` folder does not exist or is empty.
> For updates to an existing LLM Wiki, use Prompt A.

---

## Context

You will transform an existing human wiki into the **LLM Wiki** format (Karpathy). The goal is documentation optimized for LLM consumption: maximum information density, minimum tokens per query, atomic and addressable entries.

The LLM Wiki format is a structure where:

1. **Atomic entries** - one entry = one idea. Each fact, rule, or concept has its own identifiable file.
2. **Dense, no fluff** - no introductions, no repetition. Every token carries information.
3. **Lookup, not reading** - the LLM reads the MANIFEST first and loads only the entries relevant to the task.
4. **Canonical IDs** - each entry has a stable ID (`BR-<rule>`, `ENT-<entity>`, `MOD-<module>`).
5. **Cross-references by ID** - references between entries use IDs, not vague text.
6. **Manifest first** - an index file lists all entries with a one-line description.
7. **No duplication** - truth exists in one place only; other files reference it.

---

## Your task

Read all files in `<area>/wiki/` and produce three artifacts in `<area>/llm-wiki/`.

**When adapting for a specific area**, replace `<area>` with the correct directory (e.g., `business`, `technical`).

---

## Artifact 1 - `MANIFEST.md`

The only file the LLM loads by default. Must answer in ~200 tokens: "what exists here and what to load to answer X?"

Required structure:

```markdown
# <Area> LLM Wiki - Manifest

> Read this file first. Load only the entries relevant to the task.
> Domain: <one-line description of the domain>

## Core Entities (ENT)
- [ENT-<name>](entries/ENT-<name>.md) - <one line: what this entity is>

## Business Rules (BR)
- [BR-<name>](entries/BR-<name>.md) - <one line: what this rule governs>

## Complete Modules (MOD)
- [MOD-<name>](entries/MOD-<name>.md) - <one line: when to load this module>

## Quick Reference (REF)
- [REF-<name>](entries/REF-<name>.md) - <one line: what type of query this file resolves>

---

## Open Questions (index)

| ID | Summary | Entry |
|---|---|---|
| D-<AREA>-NN | <description> | <entry ID> |
```

---

## Artifact 2 - `entries/*.md`

One file per entry. The entry's prefix determines its structure and its `type:`, both declared in
that prefix's block in `${CLAUDE_PLUGIN_ROOT}/reference/entry-templates.md`. Load the block for
the prefix you are writing; never invent a `type:`. Shared shape:

```markdown
---
id: <canonical-ID>
type: <the value declared by this prefix's template block>
depends_on: [<IDs of entries required to understand this one>]
---

# <Short title>

<Content. No introduction. Tables and lists, not prose.>

→ see <ID> for <what>

> OPEN (D-<AREA>-NN): <question without a defined answer>
```

**Golden rules for content:**

1. **One entry, one idea.** Tempted to write "Additionally..."? That's another entry.
2. **Tables and lists before prose.** Prose uses 3× more tokens for the same information.
3. **IDs, not names.** `→ see BR-<rule>`, never "as described in the cross-cutting rules document".
4. **No narrative frontmatter.** Nothing like "This document describes X". The title and `type` already say that.
5. **Questions at the end** with `> OPEN (D-<AREA>-NN):` - does not contaminate the facts, signals uncertainty.

**Example of correct density:**

```markdown
---
id: BR-<rule-name>
type: rule
depends_on: [ENT-<entity>]
---

# <Rule name>

- <condition>: <value or constraint>
- <condition>: <value or constraint>
- <condition>: <consequence>

→ see ENT-<entity> for <what to find there>
```

**Quality criteria per entry:**

| Criterion | Validation question |
|---|---|
| Atomicity | Does it treat exactly one idea/entity/rule? |
| Density | Can I remove any sentence without losing information? |
| Addressability | Does it have a unique and stable ID in the frontmatter? |
| References | Does it use canonical IDs, not vague text? |
| No duplication | No information exists in more than one entry? |
| Lookup-first | Does the MANIFEST allow finding this entry without reading other files? |
| Questions marked | Are uncertainties recorded as `> OPEN:`? |

---

## Artifact 3 - `USAGE.md`

Short file (~50 lines) teaching how to consume the llm-wiki:

```markdown
# How to Use the LLM Wiki - <Area>

## For LLMs

Required flow:
1. Load MANIFEST.md
2. Identify the entries relevant to the task
3. Load ONLY those entries
4. If you find `→ see <ID>`, load that entry before concluding

Never load all files at once.

## When to load what

| Situation | Entries to load |
|---|---|
| <common situation 1> | <IDs> |
| <common situation 2> | <IDs> |

## For developers adding content

- New rule → new `BR-*.md` entry; update MANIFEST
- New entity → new `ENT-*.md` entry; update MANIFEST
- One entry = one idea; second idea = new entry
- Open questions: `> OPEN (D-<AREA>-NN):` in the entry and in the MANIFEST index
- Update `wiki/_changes.md` with each change
```

---

## Execution order

1. Read **all** files in `wiki/` before writing anything
2. Extract all atomic facts (in memory - do not write yet)
3. Group by prefix, using the prefixes this area's domain owns in `ROLES.md`
4. Write `ENT-*` first (most referenced)
5. Write `BR-*` (depend on entities)
6. Write `MOD-*` (synthesize entities + rules)
7. Write `REF-*` (cross the entire domain)
8. Write `MANIFEST.md` last (only then do you know what exists)
9. Write `USAGE.md`
10. Validate each entry against the quality criteria above

---

## Target result

When done, a query that previously required loading whole documents is answered by loading the
MANIFEST plus the two or three entries it points to.

That loads less than reading the documents in full. **How much less has not been measured, so no
figure is claimed here.** Do not put a percentage in generated documentation either.
