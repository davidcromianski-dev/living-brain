---
tags: [living-brain, foundations, vision]
version: 0.2
date: 2026-05
---

# Living Brain - Overview

> A software development method centered on living documentation as the absolute truth of the system.

---

## What it is

Living Brain is a software development method that inverts traditional logic: before any line of code, the idea must be born, grow - and eventually die - within the documentation. Only what is solid and validated in the documentation becomes reality in code.

The name reflects the central proposal: documentation is not a static artifact produced after the code. It is the **living brain** of the product - consulted to make decisions, fix bugs, validate rules, and guide evolutions.

---

## Who it is for

For any person or team that wants to:
- Build solid products with confidence in deliveries
- Have agents that always know the complete state of the system
- Grow sustainably, without accumulating knowledge debt
- Reduce rework caused by ideas that were poorly validated before being coded

The method works regardless of team size. Its primary focus is on **Product**, **Engineers**, and **Software Architects** - these are the people who will use documentation as the foundation for every decision, specification, and delegation.

---

## The problem it solves

Traditional methodologies encourage fast delivery: prototypes, short sprints, code before validation. The cost appears later - rework, inconsistencies, code no one understands, AI agents that consume excessive tokens without clear context.

Living Brain proposes the opposite: **kill bad ideas in the planning phase**. The cost is the initial documentation time. The return is exponential growth on a solid foundation.

> Analogy: you don't raise walls before having the building plan.

---

## What makes it unique

Three differentiating pillars:

| Pillar | Description |
|---|---|
| **Document Driven Design** | Documentation as absolute truth - nothing advances without being documented |
| **Validation at write time** | Every documentation task is routed to its domain and checked against what the product has already documented, before the new content is written |
| **Optimized token consumption** | Two-layer documentation architecture (wiki + llm-wiki) for maximum AI efficiency |

The method does not reinvent what already exists - each domain applies the market's best practices within its scope. The innovation lies in **centralizing documentation as the final arbiter** and in making prior documentation a prerequisite for writing new documentation.

→ see [pipeline](../../pipeline/wiki/00-overview.md) for the mechanism

---

## When coding can start

Documentation is considered ready when the areas the change touches are documented and consistent with the rules already recorded. Judging that is the team's call.

The method does not gate the transition automatically: there is no hook and no CI check that refuses code whose documentation is missing. What it gives the team is the means to notice - the record is in one place, and every write is checked against it.
