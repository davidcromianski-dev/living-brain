# Change History - Pipeline

> Changelog for this area. Linked to [[INDEX|wiki of this area]]; each entry references the affected documents as `[[wikilinks]]` to appear in the Obsidian graph.

---

## [2026-08-24] Area reduced to the real mechanism

**Context:** Simplification round 1, decision DEC-01. The area specified a nine-agent sequential
pipeline with approval, blocking, and restart semantics. None of it is implemented; the actual
validation is the per-task check the `manager` routing skill performs.
**What changed:**
- Removed `01-blocking-rules` and `02-artifacts`; the area is now a single page
- [[00-overview]] rewritten: documentation before code as team discipline, the per-task check
  (resolve domain, read `must-read` before writing, respect `invariants`, refuse to contradict a
  documented rule), and the statement that this is not a conveyor of stages
- The artifact destination rule is the only passage of `02-artifacts` that survives, minus the
  reference to the removed `application/` example
- Removed: the nine agent names, the two tiers, the seven demand types as a normative table, the
  guided product-from-scratch flow, and the CI/CD analogy as the method's mechanism
- [[INDEX]] and the area `INDEX.md` updated; the llm-wiki link is gone with the layer (DEC-04)
**Affected documents:** [[00-overview]], [[INDEX]]

## [2026-08-24] Human review of [[02-artifacts]] (PIP-03)

**Context:** Human review session. Open questions D-10 and D-11 resolved.
**What changed:**
- Removed DRAFT banner; bumped version 0.1 -> 1.0
- Confirmed the artifacts-per-agent table as final (D-10); removed the "initial estimate" marker
- Resolved D-11: artifacts live exclusively in the product's own repository (wiki + llm-wiki). The Living Brain repository never stores or mirrors them - it documents only the method (`framework/`) and a teaching example (`application/`)
**Affected documents:** [[02-artifacts]]

## [2026-08-24] Human review of [[01-blocking-rules]] (PIP-02)

**Context:** Human review session. Open questions D-07, D-08, D-09 resolved.
**What changed:**
- Removed DRAFT banner; bumped version 0.1 -> 1.0
- Added "Approval with reservations" section (D-07): approval is not strictly binary. An agent may approve, approve with a non-blocking reservation recorded in the demand's trail, or block. A reservation is not a downgraded block
- Resolved restart semantics (D-08): by default the demand restarts from the stage that blocked; if the fix invalidates a decision made by an earlier stage, the demand restarts from the earliest invalidated stage instead
- Resolved D-09: no formal maximum number of blocks. Repeated blocking is a signal for the requester to discard, replan, or split the demand - the method does not impose or automate that decision
**Affected documents:** [[01-blocking-rules]]

## [2026-06-16] Explicit skip rule in [[00-overview]]

**Context:** Steps must not be skipped silently. The default stays "no skipping"; the only exception is an explicit user decision taken after the risks are stated.
**What changed:**
- Reworded "No stage can be skipped" to "No stage is skipped on the agent's own initiative"
- Added the user-authorized exception: a required/affected stage may be skipped only by explicit user decision, after the agent has stated the risks
**Affected documents:** [[00-overview]]

## [2026-06-08] Human review of [[00-overview]] (PIP-01)

**Context:** Human review session. Open questions D-05 and D-06 resolved.
**What changed:**
- Removed DRAFT banner; bumped version 0.1 -> 1.0
- Introduced the two-tier model: documentation tier (analysts: Business, Product, Requirements, Technical) and specialist tier (actors: Architect, DBA, DevSec, Engineer, DevOps)
- Defined the seven demand types and their pipeline scope (D-05): Feature and Refactor traverse the full pipeline; Bugfix needs documentation validation plus the affected specialist actors; Documentation, Tests, Quality, and Chore go only through the affected specialist actors. Lighter types touch only affected agents; Chore covers structural and CI/CD changes
- Documented the guided product-from-scratch flow (D-06): an agent activates a skill to help shape and validate the idea, which is then broken into demands that each run through the pipeline
- Moved D-07 entirely to [[01-blocking-rules]] (blocking semantics) to remove the cross-page duplication
**Affected documents:** [[00-overview]]

## [2026-04-21] - Initial creation by AI

**Context:** First documentation of the pipeline, extracted from an interview with the author.
**What was created:** [[00-overview]], [[01-blocking-rules]], [[02-artifacts]]
**Status:** Draft - awaiting human review
