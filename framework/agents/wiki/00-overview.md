---
tags: [living-brain, agents, vision]
version: 1.1
date: 2026-11
---

# Agents - Overview

> How Living Brain produces and maintains its documentation: one routing skill reading a registry
> of domains.

---

## The model

Living Brain does not maintain its own roster of specialist personas. Producing documentation
rests on two parts:

1. **The routing skill (`living-brain:manager`)** - the single entry point. It matches a
   documentation task, resolves which domain it belongs to, loads that domain's template and
   prerequisites, and writes the entry.
2. **The registry (`reference/ROLES.md`)** - the source of truth for routing. One block per
   domain describes the roles it owns, the entry prefix it produces, what to read first, its
   in/out scope, and its invariants.

A role is a responsibility with a default file, not the file itself. An adopting project can bind
a role to the path it actually uses, or declare it absent, without editing the registry. That is
what lets one registry serve projects whose directory layouts do not match.

The durable knowledge of a domain (ownership, prefix, prerequisites, writing invariants) lives
in the registry, not in a persona. Any generic agent becomes a competent specialist by reading
the relevant registry block. That is the whole point: the specialist is a block of data, not a
resident personality.

### Subagents are an option, not a component

The manager can hand a resolved task to a subagent instead of writing it itself - the domain, the
owned files, the template, the must-read list and the invariants are enough to make the sub-task
self-contained. The public superpowers plugin (`obra/superpowers`) is one way to get that
isolation.

This is a choice about where the work runs, not a part of the model. Living Brain works with the
manager writing directly, and nothing in the method depends on subagents being available.

---

## Domains

The registry defines the domains, what each one owns, and the prefixes it produces.

**`plugins/living-brain/reference/ROLES.md` is the single source for that data.** It is not
restated here, and it is not restated anywhere else: a second copy is a copy that will disagree
with the first one, and the manager reads the registry, not this page.

This page describes the *model*; the registry holds the *contents*.

---

## Principles

1. **One routing surface** - tasks enter through `manager`; there is no per-domain skill to
   pick by hand.
2. **Knowledge in the registry** - domains are data (`ROLES.md`), not personas. Adding or
   changing a domain means editing the registry.
3. **Selective loading** - the manager reads only the slice a task needs (the domain block,
   its template, its prerequisites), never the whole method.
4. **Explicit scope and redirection** - each domain declares its in-scope and the domain that
   owns each out-of-scope request.
5. **The method documents, it does not decide** - open product and scope decisions belong to
   the human; the model records the what and the why.
6. **The registry is not a self-service guide** - `ROLES.md` is routing data for `manager`, not
   a manual a human follows to write an entry by hand. All documentation writes go through
   `manager`, including when a human is operating Claude Code directly, so template and
   invariant compliance is never left to memory.
7. **Routing is single-project** - a task resolves and writes within one product repository at a
   time. A demand that genuinely affects more than one product is split into one routed task per
   project; `manager` never writes across repository boundaries in a single task.

---
