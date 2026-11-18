# Area templates

Canonical structure for a documentation **area** in a consumer project: the two entry points
every area has (`wiki/INDEX.md` and `llm-wiki/MANIFEST.md`), how areas relate to one another,
where a document lives inside `wiki/`, and how the glossary works.

This file is about the **area**. For the shape of an individual llm-wiki entry, read
`${CLAUDE_PLUGIN_ROOT}/reference/entry-templates.md`. For which prefixes and paths a domain
owns, read `${CLAUDE_PLUGIN_ROOT}/reference/ROLES.md` - that registry is the single source, and
these templates never restate it.

---

## The two layers

Every area is two layers over the same knowledge:

```
<area>/
├── INDEX.md              ← area entry point
├── wiki/                 ← Layer 1: human reading (source of truth)
│   ├── INDEX.md
│   ├── _changes.md
│   └── *.md
└── llm-wiki/             ← Layer 2: AI consumption (derived from wiki)
    ├── MANIFEST.md       ← index; the reader loads this first
    ├── USAGE.md          ← how to consume this llm-wiki
    └── entries/
        └── <PREFIX>-*.md
```

Layer 1 is the source of truth: every change starts there. Layer 2 holds nothing that does not
exist in Layer 1.

The **glossary is the named exception**: it is a single flat file (`glossary/INDEX.md`), not an
area, and it has no `llm-wiki/` layer.

---

## Where a document lives inside `wiki/`

Two shapes, and the choice is not free:

| The document is… | It lives… | Examples |
|---|---|---|
| A one-of-a-kind page for the area | Numbered, at the root of `wiki/` | `00-overview.md`, `01-actors.md`, `02-scope.md` |
| One member of a growing family of artifacts | Unnumbered, inside a subdirectory named for the family | `wiki/features/`, `wiki/personas/`, `wiki/decisions/`, `wiki/pages/` |

Numbering exists to give the root a reading order. A family has no reading order - it has
members - so numbering it is noise, and the subdirectory keeps the root legible as the family
grows.

---

## Template - `<area>/wiki/INDEX.md`

```markdown
# <Area> - Wiki (Human Reading)

> Narrative documentation layer for this area. **Source of truth**.
>
> For AI consumption, use `../llm-wiki/MANIFEST.md`.

---

## Role in the architecture

The wiki is **Layer 1** of the two-layer pattern. Every change starts here before being
propagated to the llm-wiki. Designed for human reading and editing (Obsidian-compatible).

<One paragraph: what this area answers that no other area answers, and which areas depend
on it. See "How areas relate" below.>

---

## Conventions

- Single-topic documents at the root are prefixed with numbering (`00-`, `01-`, …) for natural
  ordering; families of artifacts live in their own subdirectory, unnumbered.
- Each file covers a **single topic**: a module, a set of actors, a group of cross-cutting
  rules, etc.
- Relevant changes go into `_changes.md`.
- Documents not reviewed by a human carry the `> ⚠️ DRAFT` banner.
- Domain terms go into `glossary.md` for this area, or into the global glossary if shared.

---

## Suggested document structure

| Topic | Suggested file |
|---|---|
| <topic> | `00-overview.md` |
| <topic> | `NN-<topic>.md` |
| <artifact family> | `<family>/<name>.md` |

---

## Documents

_No documents created yet. Add files following the conventions above and list them here._

---

## Sync with the llm-wiki

After any change to this wiki, sync `../llm-wiki/` following **Prompt A** in
`${CLAUDE_PLUGIN_ROOT}/reference/llm-wiki-prompt.md`.
```

---

## Template - `<area>/llm-wiki/MANIFEST.md`

The MANIFEST is the entry point for an LLM working in this area. It lists every atomic entry in
`entries/` with a one-line description, so the reader can find what it needs **without loading
what it does not**.

Section headings are named after the prefix family they hold, and the prefix in the heading is
the literal prefix from `ROLES.md` - never a translated or alternate label.

```markdown
# <Area> LLM Wiki - Manifest

> Read this file first. Load only the entries relevant to the task.
> This is **Layer 2** of the two-layer pattern - derived from `../wiki/`. Holds nothing that
> does not exist in the wiki.

---

## Role in the architecture

The MANIFEST is the entry point for LLMs in this area. It lists all atomic entries in
`entries/` with a one-line description each, enabling **selective lookup**.

Expected consumption flow:
1. Load this MANIFEST.
2. Identify the relevant entries by description.
3. Load **only** those entries.
4. Follow `→ see <ID>` references when they appear.

---

## <Family name> (<PREFIX>-)

_No entries yet._

| ID | Summary | Entry |
|---|---|---|

## <Family name> (<PREFIX>-)

_No entries yet._

---

## Open Questions (index)

_No open questions._

| ID | Summary | Entry |
|---|---|---|

---

## Generation and maintenance

- **First generation** (wiki exists, llm-wiki empty): use **Prompt B** in
  `${CLAUDE_PLUGIN_ROOT}/reference/llm-wiki-prompt.md`.
- **Maintenance** (after wiki changes): use **Prompt A** in the same file.
```

Entries live in `entries/<PREFIX>-<name>.md`; create the `entries/` directory with the first
entry. One section per prefix family the area owns, in the order `ROLES.md` lists them.

The layer also carries a `USAGE.md`: a short file teaching how to consume this particular
llm-wiki - the required load order, which entries to reach for in the situations that come up
often in this area, and how a developer adds content to it. Both it and the MANIFEST are written
by **Prompt B** in `${CLAUDE_PLUGIN_ROOT}/reference/llm-wiki-prompt.md`, which specifies their
shape; this file does not restate it.

---

## How areas relate

The areas are not peers with overlapping content. They form a direction of derivation, and the
rule below is what keeps the same fact from being written twice with two different meanings.

| Area | Answers | Relationship |
|---|---|---|
| `business/` | How the business works: rules, actors, modules, flows | The foundation. Depends on no other area. |
| `product/` | What will be built and why: features, personas, decisions | **References** business rules. Never duplicates them, never edits them. |
| `technical/` | How it is built: stack, ADRs, schemas, NFRs, infrastructure | **Derives** from business and product. Every business rule has a technical impact; every feature needs a technical specification. |

Two consequences:

- When an area needs a fact that belongs to another area, it **links** to it. Restating the fact
  creates a second source of truth that will drift.
- When implementing something that spans areas, load the MANIFESTs of every area involved -
  business for the rules, product for the intent, technical for the constraints.

---

## Glossary

The global glossary (`glossary/INDEX.md`) is a single flat file holding domain terms **shared
across two or more areas**, with one canonical definition each. Terms specific to a single area
stay in that area's `wiki/glossary.md`.

When an area needs a term defined in the global glossary, it **references it - it does not
redefine it**. This is what prevents semantic divergence between the business, product, and
technical wikis.

### Inclusion criteria

A term enters the global glossary if it satisfies **at least one** of these:

1. It appears in two or more areas with the same meaning.
2. It represents a central domain entity.
3. It is a legal or compliance term (e.g., LGPD).
4. It is a shared technical or architectural standard (e.g., RBAC, JWT).

A term restricted to a single area stays in that area's glossary.

### Promoting a term

When a term in `<area>/wiki/glossary.md` starts being used in another area with the same
meaning:

1. Move the definition to the global glossary.
2. Remove it from the source area's glossary.
3. Update references: the other areas now point to the global glossary.
4. Record the change in `<area>/wiki/_changes.md`.
