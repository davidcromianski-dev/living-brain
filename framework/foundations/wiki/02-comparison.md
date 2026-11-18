---
tags: [living-brain, foundations, comparison]
version: 0.2
date: 2026-05
---

# Living Brain vs Other Methodologies

> Living Brain does not reinvent what already works - it unifies and centralizes.

---

## Positioning

Living Brain is not a replacement for existing methodologies. Each documentation domain applies the best practices of its field (Scrum, TDD, DDD, Clean Architecture, etc.). The difference lies in **how these methods are orchestrated** and in **who (or what) decides what is truth**.

---

## Comparison

| Aspect | Agile / Scrum | Shape Up | TDD | Living Brain |
|---|---|---|---|---|
| **Initial speed** | High | High | Medium | Low (intentional) |
| **Source of truth** | Backlog / tickets | Pitches / bets | Tests | Living documentation |
| **Idea validation** | Sprint review | Betting table | After implementation | Against the existing documentation (before code) |
| **AI role** | Optional / ad hoc | Optional | Optional | Central and structured |
| **Documentation** | Secondary artifact | Minimalist | Nonexistent (implicit in tests) | Primary artifact |
| **Progress blocking** | None formal | None formal | Broken build | None automated; a write that contradicts a documented rule is refused |
| **Knowledge scalability** | Depends on the team | Depends on few people | Depends on tests | Depends on documentation (independent of people) |

---

## What Living Brain preserves

- **From Agile:** incremental delivery, feedback cycles, continuous adaptation
- **From DDD:** domain as the design center, ubiquitous language, context separation
- **From Clean Architecture:** separation of concerns, controlled dependencies
- **From Shape Up:** clarity of scope before starting, no infinite backlog
- **From DevOps:** feedback loops, and treating documentation as a versioned artifact in the repository rather than in a tool outside it

---

## What Living Brain discards

- Code as the first validation artifact
- Documentation as a byproduct written afterward
- Prototypes as a substitute for solid planning
- Sprints that deliver code without a verified conceptual foundation

---

## What Living Brain invents

- **Prior documentation as a prerequisite for writing** - what the product already decided is read before new content is produced, and a contradiction is refused rather than recorded
- **Two-layer documentation** - human wiki + AI-optimized llm-wiki
- **Token efficiency by design** - the document architecture is designed for AI cost

---

## Living Brain vs Pair Programming with AI

Pair programming with AI (e.g., GitHub Copilot, Cursor) operates at the code level - the AI assists a developer in writing, reviewing, or refactoring code within a single context window.

Living Brain operates at a different altitude:

| Aspect | Pair Programming with AI | Living Brain |
|---|---|---|
| **Scope** | Code only | All product areas: business, product, technical |
| **Knowledge format** | Ad hoc conversation, no persistence | Structured, versioned, LLM-optimized documentation |
| **Token efficiency** | Loads full files and context | Atomic entries - agents load only what they need |
| **Hallucination risk** | High when context is missing | Reduced - agents always have structured, precise context |
| **Knowledge continuity** | Lost when session ends | Persists in documentation, always available |

The two are complementary: Living Brain provides the structured context that makes AI assistance - including pair programming - more accurate and less wasteful.
