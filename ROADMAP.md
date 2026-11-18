# ROADMAP - Living Brain

**Cadence:** One file per session, short and focused.

**Current horizon:** Horizon 3 - stage 2, which needs a real project before it can start.

The chained seven-phase plan is gone. It put everything demonstrable behind four phases of
documentation about documentation, and the simplification round killed enough of those phases
that the chain broke on its own. What replaces it is three short horizons and a list of ideas
that carry no dates.

---

## Horizons

| Horizon | Goal | Gate |
| --- | --- | --- |
| **H1 - Coherence** ✅ | The repository describes only what exists | Every step of section 7 of the simplification plan executed, its final checklist passing, and the diff reviewed by the author |
| **H2 - Round 2** ✅ | The plugin gets the same treatment the repository just got | Every open question of the plan resolved or explicitly deferred with a reason, and the reference layer read by a human |
| **H3 - Stage 2** | Something demonstrable, and evidence it is worth adopting | A real case documented with the method, and a measurement of what it costs and saves |

The gates are sequential for a reason: an evaluator who is technically competent will ask to see
it working. Selling a vision as if it were a product costs credibility exactly once.

---

## Horizon 1 - Coherence ✅ closed

The execution plan in section 7 of the simplification plan ran in full: five stages, seventeen
steps, one commit each, merged as PRs #7 and #8. The plan carried the decisions and the content
contracts; this file does not restate them. The plan was an internal working document and was
removed from the repository before publication; the `DEC-NN` and `Q-NN` identifiers cited in this
file and in the changelogs refer to it, and it remains readable in the git history.

---

## Horizon 2 - Round 2: simplify the plugin ✅ closed

`plugins/living-brain/` was protected during round 1 - it is the working core, and rewriting the
method's description and its implementation in the same pass would have left nothing stable to
check against. Round 2 opens it.

The entry points are the open questions in section 8 of the plan:

- ✅ **`Q-06`** - the plugin's `README.md` and `plugin.json` carried prose that was factually
  wrong, including a broken installation snippet. Taken first because it blocked adoption in
  practice, not in theory.
- ✅ **`Q-02`** - the `frontend` domain that field use demonstrated a need for.
- ✅ **`Q-04`** - Portuguese vocabulary in the reference layer.
- ✅ **`Q-03`** - drift on the manager's hot path: the scope line, the areas table, and the prefix
  table that listed four prefixes with no consumer left.
- ✅ **`Q-05`** - the four already-decided defects in the plugin's `llm-wiki-prompt.md`.
- ✅ **`Q-07`** - two files each declared themselves canonical for entry prefixes. Closed by
  `DEC-17` with neither: the fact already lived in each prefix's template, so the table was
  deleted rather than arbitrated, and the six prefixes that had no template got one.
- ✅ **`Q-01`** - the registry's fixed paths assumed a directory layout the adopting project may
  not have, which is what made a field adopter record "no action possible in-repo". `owns` is now
  role-based, `docs-root` actually resolves, and `must-read` references roles rather than paths,
  so rebinding a document no longer leaves a neighbouring domain reading the old default.

Every question in section 8 of the plan is closed, and the human review that Phase 1B opened is
done: the author read `ROLES.md`, `entry-templates.md` and `writing-principles.md` end to end.
That review is what surfaced `DEC-19`, and `framework/agents/` was brought back into agreement
with the registry it describes.

---

## Horizon 3 - Stage 2: demonstrability and measurement

Two agendas, both deliberately deferred out of round 1 because coherence had to land first.

- **Measurement capability.** The method produces no data about itself. What exists specifies
  documentation *health* (coverage, open questions, staleness); what an evaluator asks for is
  *return*: tokens saved, rework avoided, time to delivery. One path not yet decided: the router
  already decides what it loads on every task, so recording that decision would produce
  continuous cost data without inventing new instrumentation. Business metrics need a pilot with
  a real team.
- ✅ **Repository visibility.** Decided: the repository is public under the MIT license, so
  installing needs no access grant. The first pilot runs with two evaluators, which is also the
  first real case this horizon needs.

The token-reduction claim removed in round 1 returns only if it is measured. That needs a corpus
to measure, which needs a real case first.

---

## Ideas

No dates, no dependencies, no phase numbers. They are here so they are not forgotten, not because
they are planned.

- **MCP server.** Expose the method's documentation and routing model as a Model Context Protocol
  server, so it is not bound to Claude Code. This is the only thing that addresses the
  single-platform constraint. **Entry condition:** it enters planning when a demonstrable case and
  a measurement exist - not before. Building distribution for a product whose value has not been
  shown is the same inversion the simplification round refused elsewhere.
- **Public website.** A public-facing site presenting the documentation visually, the canonical
  place to learn and navigate the method - including whatever interactive navigation over the
  framework proves worth building. Not started, not scoped.

---

## History

> Preserved as written. Phase 1 and the dated log below are historical record and are not
> rewritten; new entries are appended.

### Progress log

- **[2026-06-08]** Phase 1 at 6/12. Done: document-architecture (00, 01, _changes) and all of foundations (00, 01, 02). Remaining: ARCH-03 (maintenance), all of pipeline (PIP-01-03), AGT-01, AUT-01. Next task in dependency order: **ARCH-03**.
- **[2026-06-08]** Reconciled open-question mapping against the wiki pages: ARCH-03 has no open questions left (D-14/D-15 already resolved); PIP-01 also owns D-07; AUT-01 also owns D-16. D-07 is duplicated across pipeline 00-overview and 01-blocking-rules and must be reconciled during PIP-01/PIP-02.
- **[2026-06-08]** ARCH-03 done (7/12). Defined the wiki ↔ llm-wiki sync model as hybrid (on-change hook + periodic safety net, team-configured cadence); aligned the reviewed 00-overview to it; resolved automation D-16. Next task in dependency order: **PIP-01**.
- **[2026-06-08]** PIP-01 done (8/12). Introduced the two-tier model (analysts = documentation; actors = specialists). Resolved D-05 (seven demand types and their pipeline scope) and D-06 (guided product-from-scratch flow). Moved D-07 entirely to 01-blocking-rules, removing the cross-page duplication. Next task in dependency order: **PIP-02**.
- **[2026-06-10]** Architecture change: retired the nine specialist personas. Documentation is now produced by one routing skill (`living-brain:manager`) backed by a domain registry (`plugins/living-brain/reference/ROLES.md`), with execution delegated to the superpowers fork. Rewrote `framework/agents/` to describe this model. Added **Phase 1B** to review the plugin + agents, and reframed **Phase 5** away from creating per-agent personas. Next task in dependency order remains **PIP-02**.
- **[2026-08-24]** PIP-02 done (9/12). Resolved D-07 (approval can carry a non-blocking reservation, distinct from a block), D-08 (restart defaults to the blocking stage, but goes back to the earliest invalidated stage when the fix changes an earlier decision), and D-09 (no formal cap on blocks - repeated blocking signals the requester to discard/replan/split). Next task in dependency order: **PIP-03**.
- **[2026-08-24]** PIP-03 done (10/12). Confirmed the artifacts-per-agent table as final (D-10). Resolved D-11: pipeline artifacts live only in the product's own repository; the Living Brain repository never stores or mirrors them. Next task in dependency order: **AGT-01**.
- **[2026-08-24]** AGT-01 done (11/12). Resolved D-12: the registry is routing data for `manager`, not a self-service guide - all documentation writes go through `manager`, even for a human operating Claude Code directly. Resolved D-13: routing is always single-project; a cross-product demand is split into one routed task per project. Next task in dependency order: **AUT-01**.
- **[2026-08-24]** AUT-01 done (12/12) - **CP-1 closed**. Found and fixed a scope inconsistency: automation/00-overview still described doc-vs-code comparison, but document-architecture/02-maintenance had already scoped periodic agents to wiki ↔ llm-wiki only. Corrected the page to match. Resolved D-17 (metrics: coverage, open-question volume, entry staleness, wiki ↔ llm-wiki sync), D-18 (superseded by the scope fix - detection is structural wiki/llm-wiki comparison, not code analysis), and D-19 (signals go to the domain-responsible team, per `ROLES.md` ownership, not necessarily the original author). No `⚠️ DRAFT` banners remain in `framework/*/wiki/`. Next task: **Phase 1B** (PLG-01, plugin review), which runs independently of Phase 1.
- **[2026-08-24]** PLG-01 done (1/4). Reviewed `plugins/living-brain/skills/manager/SKILL.md`: routing protocol and the thin-skill guardrail both hold (no domain knowledge inlined). Found the `description` was missing trigger keywords for 4 in-scope items already owned by covered domains - glossary term, roadmap item, testing strategy, and technical overview/cross-document consistency (the `technical-overview` domain had no trigger at all). Added all 4. No version field on the plugin manifest to bump; changes tracked via git. Next task: **PLG-02** (`ROLES.md` review).
- **[2026-08-24]** Simplification round 1. `PLANO-SIMPLIFICACAO.md` scanned the repository in full, recorded 45 findings and 16 decisions, and produced an execution plan. The roadmap moves from seven chained phases to three horizons: nine of the seventeen pending tasks lost their object (Phase 2 fell with the automation area, Phase 3 with the framework's llm-wiki layer, most of Phase 4 with the example application), and Phase 1B was absorbed into Horizon 2 as the plugin round. The MCP server and the public site became undated ideas, the MCP with an explicit entry condition. Next: finish executing the F3.
- **[2026-08-24]** Simplification round 1 executed and merged (PRs #7 and #8) - **Horizon 1 closed**. Round 2 opened on the plugin and closed `Q-06` (the broken install snippet and the prose that contradicted the shipped behavior), `Q-02` (the `frontend` domain) and `Q-04` (Portuguese vocabulary), and partly closed `Q-01` (role-based ownership plus a project overlay), `Q-03` (the hot-path scope and areas table) and `Q-05` (the 70-80% figure, the `RN` label, and the supersede lifecycle). Recurring correction applied throughout: a duplicated list was deleted and pointed at its single source rather than being re-synchronized - the install snippet, the domain list and two prefix lists all went that way. Opened **`Q-07`**, which is the gate for the rest of the horizon: two files each declare themselves canonical for entry prefixes, and until that is settled the prefix tables cannot be corrected or extended. Next: decide `Q-07`.
- **[2026-08-24]** `Q-07` closed by `DEC-17`, and with it `Q-03` and `Q-05`. Neither candidate table won: the fact prefix → `type:` already lived inside each prefix's template, so the proposed registry would have been a third copy rather than a second. The table was deleted, `DOC-ARQUITETURA.md` kept only the closed `status:` vocabulary, and the four prefixes whose only consumer was the framework's own llm-wiki (`PRI-`, `AGT-`, `FLW-`, `PAD-`) are gone. The dispute had been hiding the real gap, which `entry-templates.md` already admitted in writing: six prefixes the registry owns had no template at all. They were written, and registry-to-template coverage is now exact. `FR-` and `US-` were verified to be identifiers used inside wiki documents rather than entries, and are named as such instead of being forced into a domain's `entry-prefix`. What remains of the horizon: the two gaps in `Q-01`.
- **[2026-08-24]** `Q-01` closed by `DEC-18`, and with it every question in section 8 of the plan. `docs-root` was declared in the overlay and never consumed while the registry header still said paths were project-root-relative; there is now one resolution rule for the three path forms, with `docs-root` defaulting to the project root so a root-level layout still needs no overlay. `must-read` had stayed literal, so the role indirection covered writing but not reading and a rebound document would leave a neighbouring domain silently reading the old default. Mapping the eleven distinct `must-read` targets against the declared roles is what made the fix cheap: only four were role defaults, six are the method's fixed area shape, one was already plugin-relative. Rebinding area roots was rejected - the field failure is about where documentation lives, not what the areas are called. `INSTALL.md` and `DOC-ARQUITETURA.md` gained the adopter-facing half, without which the fix would have lived only in a file adopters never open. Next: human review of the plugin, the last item of this horizon.
- **[2026-08-24]** Round 2 merged (PR #10, 20 commits) and **Horizon 2 closed**. The author read the reference layer end to end, which is the review Phase 1B opened in June and nothing had ever executed. It paid for itself immediately: the filename `DOC-ARQUITETURA.md` was Portuguese, which the round's own `Q-04` had missed because that sweep searched content and a filename is not content, and references to it existed in three shapes, three of them a bare name a reader could not resolve. Both fixed by `DEC-19`, and the naming pattern the repository had always followed is now written down in `01-conventions.md` so a future filename has something to be checked against. `framework/agents/` was brought back into agreement with the registry, which had stopped describing ownership in terms of files. Next: Horizon 3, which cannot start from this repository - it needs a real project using the method.
- **[2026-11-18]** Prepared for public release as `v0.1.0`. Repository visibility decided (public, MIT), which closes that Horizon 3 agenda item. `PLANO-SIMPLIFICACAO.md` removed from the tree - it was an internal working document and the only file exempt from the English-only rule, so the exception was removed from `CLAUDE.md` with it. Install path rewritten for a public repository: no access prerequisite, a two-command install, and the team snippet fixed to the object form of `enabledPlugins` that Claude Code itself writes. The optional subagent isolation now points at the public upstream `obra/superpowers` instead of a private, unmodified fork. Every adopter-facing surface (README, INSTALL, plugin README, manifests) states that the plugin runs in Claude Code only, not in the regular Claude chat. Personal e-mail removed from both manifests; `version` added to `plugin.json`. Next: tag `v0.1.0`, make the repository public, and run the pilot.

---

## Phase 1 - Revisit and consolidate existing content `(12/12)` ✅ closed

Goal: review all 11 existing DRAFT pages, adjust content, and resolve embedded open questions.

Order: most foundational first - document architecture governs everything else.

### document-architecture/

- [x] **ARCH-01** - Review `framework/document-architecture/wiki/00-overview.md`
- [x] **ARCH-02** - Review `framework/document-architecture/wiki/01-conventions.md`
- [x] **ARCH-03** - Review `framework/document-architecture/wiki/02-maintenance.md` · defined hybrid sync model; aligned 00-overview; resolved automation D-16
- [x] **ARCH-04** - Create missing `framework/document-architecture/wiki/_changes.md`

### foundations/

- [x] **FND-01** - Review `framework/foundations/wiki/00-overview.md` · resolve D-01, D-02
- [x] **FND-02** - Review `framework/foundations/wiki/01-principles.md` · resolve D-03
- [x] **FND-03** - Review `framework/foundations/wiki/02-comparison.md` · resolve D-04

### pipeline/

- [x] **PIP-01** - Review `framework/pipeline/wiki/00-overview.md` · resolved D-05 (demand types) and D-06 (product-from-scratch flow); moved D-07 to PIP-02
- [x] **PIP-02** - Review `framework/pipeline/wiki/01-blocking-rules.md` · resolved D-07, D-08, D-09
- [x] **PIP-03** - Review `framework/pipeline/wiki/02-artifacts.md` · resolved D-10, D-11

### agents/

- [x] **AGT-01** - Review the rewritten `framework/agents/wiki/00-overview.md` (routing model: manager skill, domain registry, subagents) · resolved D-12, D-13

### automation/

- [x] **AUT-01** - Review `framework/automation/wiki/00-overview.md` · resolved D-17, D-18, D-19 *(D-16 resolved in ARCH-03)*
