---
tags: [living-brain, document-architecture, maintenance]
version: 1.0
date: 2026-06
---

# Living Documentation Maintenance

> How documentation stays updated and aligned throughout the product's life.

---

## What makes documentation "living"

Documentation is living because **no product advancement happens without modifying it**. It is not written once and forgotten: it is consulted and updated with every demand, bug, decision, and rule change.

---

## Maintenance is on demand

Documentation is updated by the task that changes something, in the same task. There is no
separate maintenance pass and nothing that watches the repository on a schedule.

| Change type | Action |
|---|---|
| New feature | Document all affected layers before code |
| Bug fix | Identify whether the bug reveals a documentation inconsistency; fix doc first |
| Rule change | Update wiki → sync llm-wiki → record in `_changes.md` |
| New technical decision | Create ADR (`ADR-*` entry) + update affected documents |
| Feature removal | Remove from wiki + remove llm-wiki entries + update MANIFEST |

Closing the loop is part of the task: write the wiki, sync the llm-wiki, record the entry in
`_changes.md`. A task that stops before the third step has not finished.

---

## Invariants that can never be violated

1. The wiki is always the source of truth
2. No code exists without corresponding documentation - held as team discipline, not by an
   automated gate (see [Principle 4](../../foundations/wiki/01-principles.md))
3. Every wiki change is recorded in `_changes.md`
4. The llm-wiki never has information that does not exist in the wiki
5. Canonical IDs are permanent: never rename

---

