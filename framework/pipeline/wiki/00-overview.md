---
tags: [living-brain, pipeline, validation]
version: 1.0
date: 2026-08
---

# Validation

> Documentation precedes code, and every write is checked against what is already documented.

---

## The discipline

In Living Brain, documentation is written before the code it describes. This is a **discipline
the team adopts**, not something the method enforces. Nothing in the tooling prevents a commit
whose documentation was never written: the rule holds because the team holds it.

Stating this plainly matters. A rule presented as automatic, but enforced by nobody, teaches the
team that the method's claims can be ignored.

---

## The mechanism

What the method does implement is a check that runs **on every documentation task**, carried out
by the `manager` routing skill:

1. It resolves which domain the task belongs to, from the registry.
2. It reads that domain's `must-read` files **before writing anything**.
3. It respects the domain's `invariants`.
4. It refuses to produce content that contradicts a rule already documented.

Step 2 is the whole point. The writer arrives at the blank page already holding what the product
has decided, so a new page cannot silently contradict an old one. Step 4 is what happens when it
tries: the contradiction surfaces at write time, while it is still cheap, instead of at review
time or in production.

---

## Per task, not per stage

This check happens **once per task**, at the moment of writing. It is not a conveyor of stages
that a demand travels through, and there is no ordering between tasks.

The consequence is practical: there is nothing to queue, nothing to wait on, and no ceremony to
run before a small documentation change. A one-line business rule and a full technical
specification go through the same check, and it costs what reading the relevant prior
documentation costs.

---

## Where the artifacts live

Documentation artifacts live **exclusively in the product's own repository**, in its
`wiki/` + `llm-wiki/` structure.

The Living Brain repository never stores or mirrors them. It documents the method itself
(`framework/`) and distributes the plugin (`plugins/living-brain/`); a real product's business
rules, decisions, schemas, and specifications belong only to that product's repository, wherever
it lives.
