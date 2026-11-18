# ROLES - routing registry

AI-optimized. One block per domain, identical field order. No prose. The `manager` skill reads
this to map a task to a domain, then loads only that domain's template (`entry-templates.md`)
and `must-read`.

Field order (every block): `domain` | `owns` | `entry-prefix` | `must-read` | `in-scope` |
`out-of-scope` (request -> domain) | `invariants`.

## Path resolution

Three forms appear in this file, and they resolve differently:

| Form | Resolves to |
|---|---|
| `${CLAUDE_PLUGIN_ROOT}/...` | Inside the installed plugin. Never affected by the project |
| `@<domain>:<role>` | Whatever that role resolves to, per **Ownership resolution** below |
| Any other path | `<docs-root>/<path>` |

`docs-root` is declared in the project overlay and **defaults to the project root**, which is why
a project with its areas at the root needs no overlay at all. It is the one place the
documentation directory's name is recorded: the method requires that directory to be dedicated
and semantically named, but deliberately does not fix the name.

Inside an area, the shape is fixed by the method and is never rebound: `<area>/wiki/`,
`<area>/wiki/INDEX.md`, `<area>/wiki/_changes.md`, `<area>/llm-wiki/MANIFEST.md`,
`<area>/llm-wiki/USAGE.md`, `<area>/llm-wiki/entries/`. The area names (`business/`, `product/`,
`technical/`, `glossary/`) are fixed too. What a project varies is `docs-root` and the individual
files bound per role.

Use `@<domain>:<role>` for any file another domain owns. Writing that file's default path instead
would silently ignore a binding, and the two would disagree in exactly the projects the overlay
exists to serve.

## Ownership resolution

`owns` declares **roles**, not paths. A role is a stable semantic name for a responsibility; the
path is only the method's default. Resolve in this order:

1. The project overlay binds that role -> use the bound path
2. No binding -> use `default`
3. The overlay marks the role `absent` -> the domain has no file for it in this project.
   **Do not invent one.** Report it instead

Roles never get renamed - they are the stable identifier a project binds against.

## Project overlay (`.living-brain.yml`)

Optional, at the adopting project's repository root. Without it, every default applies.

```yaml
docs-root: docs/            # every non-plugin path resolves under this; default: the project root

bindings:                   # role -> real path, per domain; paths are docs-root-relative
  infra:
    observability: technical/wiki/07-infrastructure.md   # merged into infrastructure here
  technical-overview:
    technical-overview: absent

domains:                    # project-local additions; never edits the plugin
  - domain: <name>
    ...
```

Merge semantics: `bindings` **override** per role; `domains` **append**. A project may not
silently delete a plugin domain - removing one means binding all its roles to `absent`, which is
explicit and greppable.

Conflict rules: two roles bound to the same file is **legal**; a role bound to a nonexistent file
is **flagged**, not guessed; a project domain colliding with a plugin domain name is an **error**,
not a silent override.

Global must-read for every domain: `${CLAUDE_PLUGIN_ROOT}/reference/documentation-architecture.md`,
`${CLAUDE_PLUGIN_ROOT}/reference/writing-principles.md`. Sync rule for every domain: after
editing the wiki, update `<area>/wiki/_changes.md` and sync `<area>/llm-wiki/` (Prompt A in
`${CLAUDE_PLUGIN_ROOT}/reference/llm-wiki-prompt.md`).

---

```yaml
- domain: architecture
  owns:
    - role: tech-stack
      default: technical/wiki/02-tech-stack.md
    - role: system-architecture
      default: technical/wiki/03-system-architecture.md
  entry-prefix: [ADR-]
  must-read:
    - @nfr:non-functional-requirements
    - business/llm-wiki/MANIFEST.md   # consult for cross-cutting patterns (isolation, soft-delete, versioning, access control)
    - product/llm-wiki/MANIFEST.md    # delivery phases and horizon
  in-scope: architectural pattern; tech stack per layer (including front-end stack, UI library, theming, app shell); components and communication; ADRs; cross-cutting patterns (error handling front-end and back-end, logging, code conventions)
  out-of-scope:
    database modeling: data-modeling
    api endpoint design: api
    page / screen specification: frontend
    security implementation: security
    cicd / cloud / deploy: infra
    nfr value definition: nfr
  invariants: decision with context + discarded alternatives; no over-engineering; flag impacts for dba/devops

- domain: data-modeling
  owns:
    - role: data-model
      default: technical/wiki/04-data-modeling.md
  entry-prefix: [SCH-]
  must-read:
    - business/llm-wiki/entries/ENT-*.md   # read ALL entity entries
    - business/llm-wiki/MANIFEST.md        # consult for cross-cutting patterns (isolation, soft-delete, versioning, audit history)
    - @architecture:tech-stack
    - @architecture:system-architecture
  in-scope: schema (tables, columns, types, constraints); data isolation strategy when applicable; soft-delete/versioning/history when required by business rules; indexes, PK/FK, performance; migration strategy
  out-of-scope:
    business rules (meaning of entities): business
    database choice: architecture
    api queries: api
    backup / replication / infra: infra
    encryption at rest: security
  invariants: every table maps to an ENT-*; if soft-delete applies: deleted_at IS NULL, never physical DELETE; if multi-tenancy applies: isolation column on every data table; if versioning required: versions table, never overwrite; snake_case English naming

- domain: api
  owns:
    - role: api-contract
      default: technical/wiki/05-api-rest.md
    - role: external-integrations
      default: technical/wiki/08-external-integrations.md
    - role: testing-strategy
      default: technical/wiki/10-testing-strategy.md
  entry-prefix: [API-, INT-, REF-]
  must-read:
    - @architecture:system-architecture
    - @architecture:tech-stack
    - business/llm-wiki/MANIFEST.md   # consult for auth, access control, and isolation rules
    - @nfr:non-functional-requirements
  in-scope: REST design conventions; endpoint groups by domain; request/response patterns; external integrations (service, purpose, auth, fallback); testing strategy (unit, integration, e2e, load) and coverage
  out-of-scope:
    auth/authz implementation: security
    database choice / schema: data-modeling
    infrastructure / deploy / cicd: infra
    architectural pattern / stack: architecture
    business rules (what endpoint does): business
    nfr value definition: nfr
  invariants: explicit contracts (method, path, profiles, request, response); if multi-tenancy applies: isolation key from auth context, never a request param; every integration has a documented fallback; testability before implementation; breaking changes -> new version (/v2/), never overwrite

- domain: frontend
  owns:
    - role: page-specs
      default: technical/wiki/pages/
  entry-prefix: [PAGE-]
  must-read:
    - @architecture:system-architecture
    - technical/llm-wiki/MANIFEST.md   # locate the UI ADR-* decisions and the API-* this page consumes
    - product/llm-wiki/MANIFEST.md     # the feature and persona the page serves
  in-scope: page contract (route, title, tabs, selectors); layout and widget composition; page states (empty, loading, error, permission); which endpoints the page consumes; i18n and copy scope; per-page display behavior (masking, formatting)
  out-of-scope:
    ui stack / theme / app shell / error-handling strategy: architecture
    endpoint contract: api
    business rule behind a displayed value: business
    user value / acceptance criteria: product
    auth and permission enforcement: security
  invariants: a page spec references API contracts, never restates them; no business rule inline (link it); every page traces to a FEAT- or US-; states enumerated explicitly (empty, loading, error); visual style references the theme decision, never re-specifies it

- domain: security
  owns:
    - role: auth-security
      default: technical/wiki/06-authentication-security.md
  entry-prefix: [SEC-]
  must-read:
    - business/wiki/INDEX.md            # identify security and privacy rules for this project
    - business/llm-wiki/MANIFEST.md     # locate auth, access control, and isolation rules
    - @nfr:non-functional-requirements
  in-scope: authentication (JWT, OAuth2, session tokens, etc.); 2FA/TOTP when required; technical RBAC (middleware, guards, decorators); data isolation at app layer when applicable; cryptography (TLS, at rest, hashing); compliance controls (anonymization, data export, deletion per applicable regulations); audit policy; lockout handling
  out-of-scope:
    business rbac rules (who accesses what): business
    security infra (waf, vpn, firewall): infra
    user data schema: data-modeling
    authentication endpoints (api design): api
  invariants: defense in depth; least privilege; sensitive data requires explicit justification (applicable regulations e.g. LGPD/GDPR apply strictly); no secrets in code (env/vault); auditability of every sensitive action

- domain: infra
  owns:
    - role: infrastructure
      default: technical/wiki/07-infrastructure.md
    - role: observability
      default: technical/wiki/09-monitoring-observability.md
  entry-prefix: [INF-]
  must-read:
    - @nfr:non-functional-requirements
    - @architecture:tech-stack
    - @architecture:system-architecture
    - product/llm-wiki/MANIFEST.md   # delivery phases, Go-Live criteria, scale targets
  in-scope: cloud provider and services; environments (dev/staging/prod); CI/CD pipeline (stages, gates, rollback); containerization/orchestration; managed DB, backups, replication; storage (bucket, CDN); disaster recovery; secrets management; logs/metrics/alerting
  out-of-scope:
    application code / apis: api
    application-level crypto / auth: security
    database choice / schema: data-modeling   # choice also architecture
    sla / nfr definition: nfr
  invariants: explicit environments per config; no hardcoded secrets (env/vault); documented recoverability (RTO/RPO per critical component); pipeline as code

- domain: nfr
  owns:
    - role: non-functional-requirements
      default: technical/wiki/01-non-functional-requirements.md
  entry-prefix: [NFR-]
  must-read:
    - business/wiki/INDEX.md            # identify security, privacy, compliance constraints and risks
    - product/llm-wiki/MANIFEST.md      # delivery phases, Go-Live criteria, scale targets
  in-scope: measurable requirements for performance, availability, scalability, capacity, security, compliance; map each NFR to originating BR or FEAT
  out-of-scope:
    how to implement (db, infra, code): architecture / data-modeling / infra / api
    functional requirements (what system does): product
    security at implementation level: security
    load testing strategy: api
  invariants: measurable target value (no "fast"); defined verification method; traceable to BR/FEAT; undefined value -> mark > OPEN

- domain: technical-overview
  owns:
    - role: technical-overview
      default: technical/wiki/00-technical-overview.md
    - role: technical-index
      default: technical/wiki/INDEX.md
  entry-prefix: []   # coordination; no own prefix. Maintains cross-document consistency.
  must-read:
    - @technical-overview:technical-index
    - business/llm-wiki/MANIFEST.md
    - product/llm-wiki/MANIFEST.md
  in-scope: technical overview document; consistency across all technical documents; flag inconsistencies between technical and business/product
  out-of-scope:
    any specific technical topic: architecture / data-modeling / api / security / infra / nfr
    business rules: business
    product decisions: product
  invariants: consistency (one term one definition); traceability to BR/FEAT; document what+why before how; uncertainties stay as > OPEN (D-<AREA>-NN) in entry and MANIFEST

- domain: business
  owns:
    - role: business-tree
      default: business/wiki/   # all: modules, actors, rules, flows, glossary; + INDEX.md, _changes.md
  entry-prefix: [ENT-, BR-, MOD-, REF-]
  must-read:
    - ${CLAUDE_PLUGIN_ROOT}/reference/llm-wiki-prompt.md   # Prompt A (sync), Prompt B (initial gen)
    - business/wiki/INDEX.md
    - business/llm-wiki/MANIFEST.md
  in-scope: business rules, actors, modules, flows, glossary; open questions in wiki docs; shared terms -> glossary/INDEX.md
  out-of-scope:
    technical decisions (db, api, infra, arch): architecture / data-modeling / api / security / infra
    product decisions / roadmap: product
    making product decisions: user (document, do not decide)
    new documentation areas: consult ${CLAUDE_PLUGIN_ROOT}/reference/documentation-architecture.md, await new domain
  invariants: exclusive business focus (no tech terms); clarity over completeness; modularity via [[wikilinks]]; questions are assets (⚠️ Open question, never delete)

- domain: product
  owns:
    - role: product-tree
      default: product/wiki/   # features, personas, roadmap, decisions; + INDEX.md, _changes.md
  entry-prefix: [FEAT-, PERSONA-, ADR-, REF-]
  must-read:
    - ${CLAUDE_PLUGIN_ROOT}/reference/llm-wiki-prompt.md
    - business/wiki/INDEX.md   # read business as reference; do NOT edit it
    - product/wiki/INDEX.md
    - product/llm-wiki/MANIFEST.md
  in-scope: features with user stories and acceptance criteria; product decisions (what/why/discarded); roadmap with rationale; personas
  out-of-scope:
    define or change business rules: business   # trigger before proceeding, never edit business wiki
    technical architecture / db / apis: architecture / data-modeling / api
    technical implementation specs: architecture / api / infra
    making open product decisions (prioritization, go/no-go): user
    new documentation area: consult ${CLAUDE_PLUGIN_ROOT}/reference/documentation-architecture.md, await new domain
  invariants: user-value framing (not internal mechanics); decisions with rationale; objective verifiable acceptance criteria; references not copies (never copy business rules); traceability in _changes.md
```
