# Change History - Document Architecture

> Changelog for this area. Linked to [[INDEX|wiki of this area]]; each entry references the affected documents as `[[wikilinks]]` to appear in the Obsidian graph.

---

## [2026-08-24] File naming convention written down

**Context:** Simplification round 2, decision DEC-19. A reference to `DOC-ARQUITETURA.md` was
read as pointing at a file that no longer existed, and checking it surfaced two defects: the
filename was in Portuguese, and references to it existed in three different shapes, three of
them a bare name with no path. The naming pattern the repository already followed was never
written anywhere, so there was nothing to check a new filename against - which is how a
Portuguese name survived the round that removed Portuguese vocabulary from the reference layer.
**What changed:**
- [[01-conventions]]: new "File naming convention" section. Three shapes carry meaning
  (`UPPERCASE.md` for entry points and registries, `kebab-lowercase.md` for content,
  `_lowercase.md` for changelogs), plus two cross-cutting rules: filenames are American English,
  and a reference names a resolvable path rather than a bare filename
**Affected documents:** [[01-conventions]]

## [2026-08-24] Architecture scoped to product documentation

**Context:** Simplification round 1, decisions DEC-02, DEC-03, DEC-04 and DEC-07. The area
claimed a measured token reduction, hook-plus-periodic-agent synchronization, and that the
two-layer rule applied identically to the method's own repository. None of the three held.
**What changed:**
- [[00-overview]]: the cost section describes selective loading without quantifying it - the
  70-80% figure is removed, and the page states that no figure is claimed until there is a corpus
  to measure. Synchronization is described as what it is: a synchronous step of the routing
  protocol, in the same task as the write, with the out-of-band edit named as its open failure
  mode
- [[01-conventions]]: the rule that "there are no special rules for one over the other" is
  **revoked**, with the reason written out - the `llm-wiki/` layer serves atomic product
  documentation, and the method's own prose is narrative. The prefix table drops `PRI-`, `AGT-`
  and `FLW-`, which only served the framework's own llm-wiki, and defers to `ROLES.md` as the
  canonical list. The glossary is declared a flat file, a named exception to the two-layer rule
- [[02-maintenance]]: the "Proactive maintenance (periodic agents)" section is removed; invariant
  2 is preserved and labeled as team discipline rather than an automated gate
- [[INDEX]] rows updated; the llm-wiki link is gone with the layer
**Affected documents:** [[00-overview]], [[01-conventions]], [[02-maintenance]], [[INDEX]]

## [2026-06-16] Dedicated documentation directory in [[01-conventions]]

**Context:** In a consuming project, documentation must not be interleaved with source code; it belongs in a single dedicated, semantically named directory.
**What changed:**
- Added "Documentation directory in a consuming project" section: one dedicated top-level directory, semantic name, separated from code; recommended names `docs/`, `.docs/`, `living-brain/`, `.living-brain/`, `documentation/`
- Mirrored the rule in `DOC-ARQUITETURA.md` (framework and plugin reference layer)
**Affected documents:** [[01-conventions]]

## [2026-06-08] Human review of [[02-maintenance]]

**Context:** Human review session (ARCH-03). No open questions were embedded in the page (D-14 and D-15 had already been resolved in [[00-overview]] and [[01-conventions]]).
**What changed:**
- Bumped version 0.2 → 1.0; page is now reviewed
- Defined the wiki ↔ llm-wiki sync model as **hybrid**: on-change hook (primary) + periodic agent (safety net)
- Cadence of the periodic agent is configurable per team, not fixed by the method (resolves automation D-16)
- Removed em dashes per style policy
**Affected documents:** [[02-maintenance]]

## [2026-06-08] Alignment of [[00-overview]] to the hybrid sync model

**Context:** Follow-up from the ARCH-03 review. The "Synchronization and observability" section contradicted the hybrid sync model decided for [[02-maintenance]].
**What changed:**
- Rewrote the sync description from "periodic reviews, not a fully automated push" to the hybrid model (on-change hook + periodic safety net, team-configured cadence)
- Removed em dashes per style policy
**Affected documents:** [[00-overview]]

## [2026-05-30] - Human review of [[01-conventions]]

**Context:** Human review session. Open question D-15 resolved.
**What changed:**
- Removed DRAFT banner
- Prefixes renamed to English: RN→BR, DEC→ADR, AGB→AGT, FLX→FLW
- Added rule: prefixes are not mandatory; new ones require validated need
- D-15 replaced with "Convention scope" section: same conventions apply to all repositories
**Affected documents:** [[01-conventions]]

## [2026-05-30] - Human review of [[00-overview]]

**Context:** Human review session. Open question D-14 resolved.
**What changed:**
- Removed DRAFT banner
- Added "Synchronization and observability" section: periodic reviews guide wiki ↔ llm-wiki sync; observability scoped to the two documentation layers only (not doc vs code)
- Doc/code consistency is the responsibility of human review, mandatory tests, and pipelines
- Renamed `_mudancas.md` to `_changes.md` across the entire project
**Affected documents:** [[00-overview]]
