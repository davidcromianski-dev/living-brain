# Change History - Foundations

> Changelog for this area. Linked to [[INDEX|wiki of this area]]; each entry references the affected documents as `[[wikilinks]]` to appear in the Obsidian graph.

---

## [2026-08-24] Foundations aligned with the mechanism that exists

**Context:** Simplification round 1, decisions DEC-01, DEC-02 and DEC-12. The foundations sold a
nine-agent blocking pipeline and hook/CI enforcement, neither of which the method implements.
**What changed:**
- [[00-overview]]: pillar 2 is no longer "Specialist agent pipeline"; it names the per-task check
  the routing skill performs. "When coding can start" no longer conditions code on approval by
  all pipeline agents - readiness is the team's judgment, and the absence of an automated gate is
  stated outright
- [[01-principles]]: Principle 3 now states the real prerequisite (read the domain's prior
  documentation before writing, refuse content that contradicts it) instead of pipeline
  traversal; Principle 4 no longer claims enforcement by hooks and CI/CD, and says why an
  unenforced rule must be labeled as such; Principle 6 (periodic agents) removed with the
  automation area; the remaining principles renumbered, and the count in [[INDEX]] corrected
  from 8 to 7
- [[02-comparison]]: the blocking row, the idea-validation row and the positioning paragraph
  describe the real mechanism; "Agent pipeline with blocking power" and "Automated periodic
  verification" are out of the invention list; the DevOps line no longer claims continuous
  verification
**Affected documents:** [[00-overview]], [[01-principles]], [[02-comparison]], [[INDEX]]

## [2026-06-16] - Method fidelity and explicit skip rule in [[01-principles]]

**Context:** The method must be followed exactly, with no alternative paths; pipeline steps must not be skipped silently; and documentation must live separated from code.
**What changed:**
- Principle 3: a required stage is never skipped on the agent's initiative; it may be skipped only by explicit user decision, after the agent states the risks, and the decision is recorded
- Added Principle 8 (Fidelity to the method): read existing docs and follow Living Brain as defined, no alternative paths; documentation lives in a single dedicated, semantically named directory separated from code
- Updated [[INDEX]]: the principle count was still "7" after Principle 8 was added
**Affected documents:** [[01-principles]], [[INDEX]]

## [2026-05-30] - Human review of [[02-comparison]]

**Context:** Human review session. Open question D-04 resolved.
**What changed:**
- Removed DRAFT banner
- Added "Living Brain vs Pair Programming with AI" section: broader scope across all product areas, LLM-optimized knowledge, reduced hallucination risk, persistent context
- XP comparison explicitly out of scope

## [2026-05-30] - Human review of [[01-principles]]

**Context:** Human review session. Open question D-03 resolved.
**What changed:**
- Removed DRAFT banner
- Principle 3: pipelines adapted per scenario (hotfix/bugfix/improvement), each with its own validations
- Principle 4: renamed and strengthened - publishing without documentation is blocked by hooks and CI/CD

## [2026-05-30] - Human review of [[00-overview]]

**Context:** First human review session. Open questions D-01 and D-02 resolved.
**What changed:**
- Removed DRAFT banner
- Clarified target audience: all team sizes, primary focus on Product, Engineers, and Software Architects
- Replaced open questions with resolved content
- Added "When coding can start" section: all pipeline agents must approve

## [2026-04-21] - Initial creation by AI

**Context:** First documentation of the method, extracted from an interview with the author via Claude Code.
**What was created:** [[00-overview]], [[01-principles]], [[02-comparison]]
**Status:** Draft - awaiting human review
