# Entry templates

Canonical structure for every llm-wiki entry type and the shared changelog/wiki-document
templates. Load **only** the block matching the entry prefix the current task targets
(`ROLES.md` tells you which prefix a domain owns). Do not inline these into a skill - read
them on demand.

Each block below declares the `type:` its prefix carries, and where a family has a lifecycle, the
`status:` values it uses. Those are stated here and nowhere else: there is no separate prefix
table to keep in sync. `${CLAUDE_PLUGIN_ROOT}/reference/documentation-architecture.md` holds the closed `status:` vocabulary these subsets
are drawn from.

## Two kinds of identifier

Do not confuse them:

| Kind | Lives as | Examples |
|---|---|---|
| **Entry prefix** | Its own file in `<area>/llm-wiki/entries/`, listed in the MANIFEST | `ENT-`, `BR-`, `MOD-`, `REF-`, `FEAT-`, `PERSONA-`, `ADR-`, `SCH-`, `API-`, `INT-`, `NFR-`, `SEC-`, `INF-`, `PAGE-` |
| **In-document identifier** | A row or heading **inside** a wiki document, never a file of its own | `FR-` (features table of a business module), `US-` (heading in a product feature) |

Only entry prefixes appear in a domain's `entry-prefix` in `ROLES.md`, and only they have a
template block below.

---

## ENT - domain entity (`ENT-*`)

```markdown
---
id: ENT-<entity-name>
type: entity
depends_on: [ENT-<entity this one presupposes>]
---

# <Entity name>

**What it is:** <one sentence, business language, no technical terms>
**Identified by:** <the business identifier, not a database key>

| Attribute | Meaning to the business | Required |
|---|---|---|
| <name> | <what it represents> | yes / no |

States: <state> → <state> → <state>   # omit if the entity has no lifecycle

Rules that govern it: → see BR-<rule>
```

---

## BR - business rule (`BR-*`)

```markdown
---
id: BR-<rule-name>
type: rule
depends_on: [ENT-<entities the rule acts on>]
---

# <Rule name>

**Rule:** <the rule in one sentence, as the business states it>
**Applies when:** <the condition that triggers it>
**Exceptions:** <cases where it does not hold, or "none">

When violated: <what the system must do>

→ see ENT-<entity> for the definitions this rule assumes
```

One rule per entry. A second rule is a second entry, even when the two always apply together.

---

## MOD - complete module (`MOD-*`)

```markdown
---
id: MOD-<module-name>
type: module
depends_on: [ENT-<entities>, BR-<rules>]
---

# Module: <name>

**Purpose:** <which part of the business it covers>
**Actors:** <who operates it>

Main flows:
1. <flow name>: <trigger> → <steps> → <outcome>

Entities involved: → see ENT-<a>, ENT-<b>
Rules that govern it: → see BR-<a>, BR-<b>

Boundary: <what this module explicitly does not cover>
```

A `MOD-` synthesizes entities and rules; it never restates them. If a flow needs a rule spelled
out to be understood, the rule belongs in a `BR-` and the module links it.

---

## REF - quick reference (`REF-*`)

```markdown
---
id: REF-<topic>
type: reference
---

# <Topic> reference

| <Key> | <Value> | <Note> |
|---|---|---|
| ... | ... | ... |
```

A `REF-` exists to answer one recurring lookup fast. If it needs prose to be understood, it is
not a `REF-` - it is an `ENT-`, a `BR-`, or a wiki document.

---

## FEAT - product feature (`FEAT-*`)

```markdown
---
id: FEAT-<feature-name>
type: feature
status: draft | defined | in-development | delivered | deprecated
depends_on: [PERSONA-<persona served>, BR-<rules it must respect>]
---

# <Feature name>

**Value delivered:** <what someone can do that they could not before>
**Personas served:** → see PERSONA-<name>

Acceptance criteria:
- [ ] <observable, testable condition>

Satisfies: FR-<id>, from the business module document
Business rules it must respect: → see BR-<id>
```

A `FEAT-` references the `FR-` it satisfies; an `FR-` never references a `FEAT-`. Business does
not depend on product.

---

## PERSONA - product persona (`PERSONA-*`)

```markdown
---
id: PERSONA-<name>
type: persona
---

# <Persona name>

**Role:** <what they do, in the product's context>
**Goal:** <what they are trying to achieve>
**Constraint:** <what limits them: time, permission, device, expertise>

Behaviors that matter to the product:
- ...

Features that serve this persona: → see FEAT-<id>
```

---

## ADR - architecture / product decision (`ADR-*`)

Used for technical architecture decisions (architecture domain) and product decisions
(product domain). Same shape: a decision is never only the "what".

```markdown
---
id: ADR-<name>
type: technical-decision | product-decision
category: architecture | stack | pattern | integration
status: defined | under-review | superseded | deprecated
supersedes: [ADR-<old>]             # on the replacement; omit if none
superseded_by: [ADR-<new>]          # on the tombstone; omit if still current
supersedes_parts_of: [ADR-<old>]    # partial supersede; omit if none
---

# Decision: <title>

**Context:** <why this decision needed to be made>
**Decision:** <what was decided>
**Consequences:** <positive impacts and trade-offs>

Discarded alternatives:
- <alternative 1>: discarded because <reason>
- <alternative 2>: discarded because <reason>

→ see <NFR or BR that motivated this decision>
```

### Supersede lifecycle

A decision is **never deleted**. Its value is the "why", including why it stopped being right.
Removal and supersedence are different operations:

| Situation | Operation |
|---|---|
| A fact, rule, or entity ceased to exist | **Remove** - delete the entry (Prompt A, Type D) |
| A decision was replaced by a later decision | **Tombstone** - keep the file (Prompt A, Type G) |

Tombstone rules:
- The old entry keeps its file, sets `status: superseded` and `superseded_by: [ADR-<new>]`
- The new entry sets `supersedes: [ADR-<old>]` - the link is bidirectional, both sides required
- The MANIFEST keeps listing the tombstone, marked `(superseded)`, so `→ see` never dangles
- The `_changes.md` entry names **both** IDs

Partial supersede: when only part of an older decision is replaced, the new entry uses
`supersedes_parts_of:` instead. The older entry stays `status: defined` and gains a note naming
what was replaced and by which ID.

---

## SCH - database schema (`SCH-*`)

```markdown
---
id: SCH-<table-name>
type: schema
depends_on: [ENT-<business-entity>]
---

# Table: <table_name>

| Column | Type | Constraint | Description |
|---|---|---|---|
| id | UUID | PK | Unique identifier |
| <tenant_col> | UUID | FK, NOT NULL | Data isolation - see BR-<isolation-rule>  # if multi-tenancy applies |
| ... | ... | ... | ... |
| deleted_at | TIMESTAMP | NULL | Soft delete - see BR-<soft-delete-rule>  # if soft delete applies |

Indexes:
- `idx_<table>_<col>`: (<col>)   # e.g. isolation column
- ...

Relationships:
- `<tenant_col>` → `<tenants_table>.id`   # if multi-tenancy applies
- ...

→ see ENT-<entity> for domain definition
```

---

## API - endpoint group (`API-*`)

```markdown
---
id: API-<domain>
type: api
category: <define per project domain - e.g. authentication | user | <entity> | notification | report>
---

# Endpoint Group: <Domain>

**Base path:** `/api/v1/<resource>`
**Authentication:** <Bearer JWT | session | other - per project auth strategy>
**Isolation scope:** <if multi-tenancy applies: isolation key from auth context, never a request parameter>

## Endpoints

| Method | Path | Profiles | Description |
|---|---|---|---|
| GET | `/api/v1/<resource>` | <profile-a>, <profile-b> | List resources |
| POST | `/api/v1/<resource>` | <profile-a> | Create new resource |
| ... | ... | ... | ... |

## Response patterns

- Success: `200 OK` or `201 Created` with JSON body
- Not found: `404` with `{ "error": "not_found", "message": "..." }`
- Unauthorized: `401` with `{ "error": "unauthorized" }`
- Forbidden: `403` with `{ "error": "forbidden" }`
- Validation: `422` with `{ "error": "validation_error", "fields": {...} }`

→ see BR-<related-business-rule>
```

---

## INT - external integration (`INT-*`)

```markdown
---
id: INT-<service>
type: integration
category: authentication | notification | storage | payment | email | sms
---

# Integration: <Service Name>

**Service:** <name and provider>
**Purpose:** <what it solves in the system>
**Authentication:** <how the project authenticates with the service>

Flow:
1. ...
2. ...

Fallback: <what happens if the service is unavailable>

Environments: development | staging | production

→ see NFR-<requirement that motivated this integration>
```

---

## NFR - non-functional requirement (`NFR-*`)

```markdown
---
id: NFR-<name>
type: non-functional-requirement
category: performance | availability | scalability | security | compliance | capacity
---

# <Requirement name>

**Target value:** <measurable metric>
**Condition:** <when it applies>
**Verification method:** <how to measure>

Origin: → see <BR or FEAT that motivated this requirement>
```

---

## SEC - security control (`SEC-*`)

```markdown
---
id: SEC-<name>
type: security
category: authentication | authorization | cryptography | compliance | audit
---

# <Security control name>

**Control:** <what it protects>
**Implementation:** <how it is technically implemented>

Details:
- ...

Related business rule: → see BR-<id>
```

---

## INF - infrastructure component (`INF-*`)

```markdown
---
id: INF-<name>
type: infrastructure
category: cloud | cicd | environment | storage | backup | secrets | monitoring
---

# <Infrastructure component name>

**Provider/Tool:** <name>
**Responsibility:** <what it solves>

Configuration:
- ...

Affected environments: development | staging | production

→ see NFR-<requirement that motivated this decision>
```

---

## PAGE - page specification (`PAGE-*`)

Specifies a user-facing screen: what it contracts to show and how it behaves. It never restates an
API contract or a business rule - it links them.

```markdown
---
id: PAGE-<name>
type: frontend-page-spec
status: draft | defined | in-development | implemented | superseded
depends_on: [<UI ADR-*>, <API-* consumed>, <FEAT- or US- served>]
---

# Page spec: <Title>

**Route:** `/<path>`
**Context:** <where it renders - app shell, modal, standalone>
**Serves:** → see FEAT-<feature> / US-<FEAT>-NN

## Page contract

<What the page guarantees: title, tabs, selectors, what persists in the URL, what resets.>

## Layout

1. **<Region name>** - <what it contains, which data drives it>
2. ...

## States

| State | Trigger | Behavior |
|---|---|---|
| Empty | <no data> | <what the user sees> |
| Loading | <fetch in flight> | ... |
| Error | <request failed> | ... |
| Permission | <profile lacks access> | ... |

## Data sources

| Region | Endpoint | Notes |
|---|---|---|
| <region> | → see API-<group> | <filters, pagination> |

→ see <ADR that fixes the visual language>, <BR behind any displayed rule>
```

Rules:
- Style is a **reference** to the theme decision, never re-specified per page
- Every displayed value whose meaning is a business rule links that rule; it is not restated here
- States are enumerated explicitly - an unlisted state is an undocumented one

---

## Changelog entry (`<area>/wiki/_changes.md`)

Every wiki change is recorded here. New entry at the top, below the `---` separator.
Always reference affected documents as `[[wikilinks]]`, never plain text.

First creation of the file only (group header, keeps the area cluster connected in Obsidian):

```markdown
# Change History - <Area>

> Changelog for this area. Linked to [[INDEX|wiki of this area]]; each entry references the affected documents as `[[wikilinks]]` to appear in the Obsidian graph.

---
```

Entry:

```markdown
## [YYYY-MM-DD] - <Short change title>

**Context:** why the rule/decision changed or was added
**What changed:** objective description (use "Before: X → Now: Y" if modifying)
**Affected documents:** [[file-a]], [[file-b]]
```

---

## Wiki document - business module (`business/wiki/XX-module-name.md`)

```markdown
---
tags: [<project>, module, <name>]
version: 1.0
date: YYYY-MM
---

# Module: <Name>

> <One sentence describing the purpose of this module in the business.>

---

## Module Purpose

<Short paragraph: what problem this module solves in the business context.>

---

## Main Flows

### <Flow name>

1. <Actor> <action>
2. <result or next action>
3. ...

---

## Business Rules

- Only <actor> can <action>
- <Condition> → <consequence>
- ...

---

## Features

| ID | Feature | Priority | Actor |
|---|---|---|---|
| FR-XXX | <description> | High / Medium / Low | <Actor> |

`FR-` is a functional requirement identified at the **business** layer: what the system must
allow. The deliverable capability that satisfies it lives at the product layer as a `FEAT-`
(see its template block for the dependency direction).

---

## Open Questions

| # | Question | Status |
|---|---|---|
| D-<AREA>-NN | <description> | Open |

---

## Related Links

- [[other-module]] - <reason for relationship>
```

---

## Wiki document - product feature (`product/wiki/features/<name>.md`)

```markdown
---
tags: [<project>, product, feature, <name>]
status: draft | defined | in-development | delivered | deprecated
version: 1.0
date: YYYY-MM
---

# Feature: <Name>

> <One sentence: what this feature delivers and for whom.>

---

## Problem it solves

<What user pain or need this feature addresses. Why it exists.>

---

## Impacted personas

- [[product/wiki/personas/<persona>]] - <how they are impacted>

---

## User Stories

### US-<FEAT>-NN: <Title>

<FEAT> is the owning feature's short code, so a story ID is unique without a global counter
(e.g. `US-FO-05` is the fifth story of the financial-overview feature). Stories are numbered
within their feature, never across the product.

**As a** <persona>, **I want to** <action>, **so that** <benefit>.

**Acceptance criteria:**
- [ ] <verifiable criterion 1>
- [ ] <verifiable criterion 2>

---

## Product decisions

| Decision | Rationale | Discarded alternatives |
|---|---|---|
| <what was decided> | <why> | <what was considered and rejected> |

---

## Related business rules

- [[business/wiki/<file>]] - <relevant rule>

---

## Open questions

| # | Question | Status |
|---|---|---|
| D-<AREA>-NN | <description> | Open |

---

## Related links

- [[product/wiki/features/<other-feature>]] - <relationship>
```

---

## Wiki document - product persona (`product/wiki/personas/<name>.md`)

```markdown
---
tags: [<project>, product, persona]
---

# Persona: <Name>

> <One sentence describing who this persona is.>

---

## Profile

| Attribute | Description |
|---|---|
| Business role | <equivalent to system role - e.g. admin / editor / viewer / <role>> |
| Main motivation | <what they want to achieve using the product> |
| Biggest current pain | <what prevents them from achieving it today> |

---

## Behaviors relevant to the product

- <observed or expected behavior 1>
- <observed or expected behavior 2>

---

## Priority features for this persona

- [[product/wiki/features/<feature>]] - <why it is a priority>

---

## Related business rules

- [[business/wiki/<actors-file>]] - definition of the corresponding actor
```
