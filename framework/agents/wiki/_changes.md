# Change History - Agents

> Changelog for this area. Linked to [[INDEX|wiki of this area]]; each entry references the affected documents as `[[wikilinks]]` to appear in the Obsidian graph.

---

## [2026-11-18] Subagent isolation points at the public superpowers plugin

**Context:** Public release. The page named a private fork of superpowers as the source of
subagent isolation. The fork carried no changes of its own, and a public reader cannot install a
private repository.
**What changed:**
- [[00-overview]]: the subsection names the public `obra/superpowers` plugin as one way to get
  subagent isolation. Isolation stays optional; nothing else in the model changed
**Affected documents:** [[00-overview]]

## [2026-08-24] Ownership described as roles, not files

**Context:** Simplification round 2, decision DEC-18. The registry stopped binding a domain to
literal paths: `owns` now declares roles with default files, which an adopting project can rebind
or mark absent through its own overlay. This page still described a domain as owning files, which
was the description of the registry as it was before round 2.
**What changed:**
- [[00-overview]]: the registry is described as declaring the **roles** a domain owns, with a
  short statement of what a role is and why the indirection exists - one registry serving projects
  whose directory layouts do not match. The registry's contents are still not restated here
**Affected documents:** [[00-overview]]

## [2026-08-24] Registry is the single source; subagents become optional

**Context:** Simplification round 1, decisions DEC-11 and DEC-14. The page restated the registry's
domain data in a table, creating a second source that could drift from it, and presented
superpowers subagents as the third mandatory component of the model.
**What changed:**
- [[00-overview]]: the nine-domain table is removed. The page describes the model and names
  `plugins/living-brain/reference/ROLES.md` as the single source for domains, ownership and
  prefixes - no `owns` and no prefix is restated outside the registry
- [[00-overview]]: the model has two parts, not three. Subagents move to their own subsection as
  an option for where the work runs, with the method explicitly not depending on them
- [[INDEX]] and the area `INDEX.md` updated accordingly; the llm-wiki link is gone with the layer
**Affected documents:** [[00-overview]], [[INDEX]]

## [2026-08-24] Human review of [[00-overview]] (AGT-01)

**Context:** Human review session. Open questions D-12 and D-13 resolved.
**What changed:**
- Removed DRAFT banner; bumped version 0.2 -> 1.0
- Resolved D-12: the registry (`ROLES.md`) is routing data for `manager`, not a self-service
  guide. All documentation writes go through `manager`, even when a human is operating Claude
  Code directly, so template and invariant compliance is never left to memory
- Resolved D-13: routing is always single-project. A demand affecting more than one product is
  split into one routed task per project; `manager` never writes across repository boundaries
  in a single task
- Added both resolutions as Principles 6 and 7
**Affected documents:** [[00-overview]]

## [2026-06-10] - Rewrite to the routing model

**Context:** the method no longer ships specialist personas; documentation is produced by a
single routing skill backed by a domain registry, with execution delegated to subagents.
**What changed:** Before: [[00-overview]] described nine pipeline agents -> Now: it describes
the `manager` routing skill, the nine documentation domains in `ROLES.md`, and the principles
of the model. Updated [[INDEX]] and the llm-wiki manifest accordingly.
**Affected documents:** [[00-overview]], [[INDEX]]

## [2026-04-21] - Initial creation by AI

**Context:** First documentation of the agents, extracted from an interview with the author.
**What was created:** [[00-overview]]
**Status:** Draft - awaiting human review. Individual documents per agent not yet created.
