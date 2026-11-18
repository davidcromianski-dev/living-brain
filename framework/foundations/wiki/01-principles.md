---
tags: [living-brain, foundations, principles]
version: 0.2
date: 2026-05
---

# Living Brain Principles

> The fundamental values that guide all method decisions.

---

## Principle 1 - Documentation as absolute truth

No feature, fix, or change exists in the system without first existing in the documentation. Documentation does not describe code - code is the implementation of documentation.

If there is a conflict between documentation and code, documentation wins. Code is adjusted.

---

## Principle 2 - No progress without a record

Every product advancement passes through documentation. This includes:
- New features
- Bug fixes
- Business rule changes
- Technical decisions
- Architecture adjustments

The record is not bureaucracy - it is what keeps the brain alive.

---

## Principle 3 - Prior documentation is a prerequisite for new documentation

No documentation is written from a blank slate. Every task is routed to the domain it belongs to, and the rules already recorded for that domain are read **before** the new content is written. Content that contradicts an existing rule is not produced; the contradiction is raised instead.

This check runs once per task, at the moment of writing. It scales with the task: a one-line business rule costs one short read, a full technical specification costs more.

→ see [pipeline](../../pipeline/wiki/00-overview.md) for the mechanism

---

## Principle 4 - No publishing without documentation

Code is not published without its documentation being current. This holds as **team discipline**, not as an automated gate: the method implements no hook and no CI/CD check that blocks a publish, and it does not claim to.

The principle is worth stating precisely because it is unenforced. A team that adopts it decides to hold it; a team that presents it as automatic teaches everyone that the method's rules can be ignored.

---

## Principle 5 - Sustainable growth over initial speed

Living Brain is intentionally slower at the start. The return comes in the medium and long term: solid foundation, less rework, always-contextualized agents, reliable deliveries.

> "We don't start at a sprint - we ensure a solid structure for exponential growth."

---

## Principle 6 - Tokens are resources, not infinite

The documentation architecture is designed for efficient LLM consumption. Dense, atomic, addressable documentation avoids loading unnecessary context. Each agent loads only what it needs for its task.

---

## Principle 7 - Fidelity to the method

The agent reads the existing documentation and follows Living Brain exactly as defined. It does not take alternative paths, invent parallel workflows, or improvise shortcuts because they seem faster. When the method does not cover a case, the agent surfaces it instead of working around it.

This fidelity has a structural consequence: all documentation produced by the method lives in a single dedicated, semantically named directory (for example `docs/`, `living-brain/`, `.living-brain/`), separated from the source code - never interleaved with it.

---

