# Writing principles

Cross-cutting rules every documentation entry must obey, regardless of domain. They live here
once, so no domain restates them. Domain-specific invariants (e.g. "soft delete is the rule",
"tenant-first endpoints") live in `ROLES.md` under each domain's `invariants` field, not here.

---

## Method fidelity

- **Follow the method, no alternative paths.** Before acting, read the project's existing
  documentation and the registry, then operate Living Brain exactly as defined. Do not invent
  shortcuts, parallel workflows, or ad-hoc structures because they look faster. If the method
  does not cover a case, surface it - never improvise around it.
- **Routing survives a missing skill.** If the `manager` skill is unavailable in the current
  session, do not fall back to improvising: read `ROLES.md` directly and run the routing protocol
  by hand - resolve the domain, load its template and `must-read`, respect its invariants, close
  the loop. The registry is the method; the skill is only the entry point to it.
- **No step is skipped on the agent's initiative.** Execute every step of the routing and sync
  protocol: resolve the domain, read the must-reads, respect the invariants, and close the loop
  (`<area>/wiki/_changes.md` + `llm-wiki/` sync). A step may be skipped only by explicit user
  decision, and only after you have stated the risks of skipping it. Silent shortcuts are a
  method violation.
- **Documentation stays in its own home.** All Living Brain artifacts live under one dedicated,
  semantically named directory, separated from source code - see `${CLAUDE_PLUGIN_ROOT}/reference/documentation-architecture.md`.

---

## Universal

- **Decision with context.** Never document only the "what". Always the "why" and "what was
  discarded". A decision without rationale is a rework risk.
- **Explicit trade-offs.** Every decision has costs; documenting them prevents future surprises.
  State the revision horizon when relevant ("revisit when reaching N users").
- **No premature implementation / no over-engineering.** Document the what and why before the
  how. The architecture serves the current product, not the hypothetical one.
- **Traceability.** Every entry points back to its origin: `→ see <ID>` in llm-wiki entries,
  `[[wikilinks]]` in the wiki. Each technical decision references the business rule or product
  feature that motivated it.
- **Consistency.** One term, one definition. Never use synonyms for the same concept.
- **Modularity / references, not copies.** Each document covers a single responsibility.
  Connect documents with `[[wikilinks]]`; never duplicate content that can diverge.
- **Questions are assets.** Record open questions, never delete them - only answer and archive.
  Use `> OPEN (D-<AREA>-NN):` in llm-wiki entries (and the `MANIFEST.md` index) and
  `⚠️ Open question:` in the wiki.
- **Measurable and verifiable.** When a statement can carry a number, it must. "Fast" is not a
  requirement; "P95 < 500ms" is. Every measurable claim has a verification method.

---

## Governance

- **Wiki is the source of truth.** Changes start in `<area>/wiki/`, then sync to `llm-wiki/`.
- **Changelog discipline.** Record every change in `<area>/wiki/_changes.md` with its date.
  Never overwrite without recording.
- **Draft banner.** Content not yet reviewed by a human carries the `> ⚠️ DRAFT` banner.
- **English only (files).** All written content in files is American English. (Conversation
  replies follow the user's language - that is a chat rule, not a file rule.)
- **No secrets in docs or code.** Credentials, keys, and tokens are referenced via environment
  variable or vault, never written inline.

---

## Layer purity

- **Business layer.** Describe behaviors, rules, and flows from the business perspective only.
  Never mention database, languages, frameworks, APIs, or infrastructure.
  - wrong: "The system saves the order in the PostgreSQL database"
  - right: "The order is recorded and immediately available for lookup by the operator"
- **Product layer.** Describe features by the value they deliver to the user, not by what the
  system does internally. Reference business rules with `[[business/wiki/file]]`; never copy
  them. Do not enter technical implementation decisions.
  - wrong: "The system processes the payload and updates the <entity> record"
  - right: "The <actor> updates the <item> and the <user> sees the new version immediately"
- **Decisions belong to the user.** Analysts document; they do not make open product decisions
  (prioritization, go/no-go). Surface the decision; let the user decide.
