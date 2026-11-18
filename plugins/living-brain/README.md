# Living Brain plugin

The Living Brain method, packaged as a Claude Code plugin so any project can install it
without copying the method into its repository. The plugin ships a single thin routing skill
plus a reference layer.

It runs in Claude Code only (CLI, desktop app, IDE extensions, or claude.ai/code). The regular
Claude chat cannot load plugins.

## What ships here

### Skill

| Skill | Role |
|-------|------|
| `manager` | Single routing entry point. Matches any documentation task, resolves the target domain from `reference/ROLES.md`, loads only that domain's template + prerequisites, then writes the entry itself or hands a self-contained sub-task to a subagent. Holds no domain knowledge of its own. |

When installed, the skill is namespaced as `living-brain:manager`.

### Reference layer (`reference/`)

The durable substance of the method, read on demand (never inlined into the skill):

- `ROLES.md` - AI-optimized routing registry: one block per domain with `owns`,
  `entry-prefix`, `must-read`, `in-scope`, `out-of-scope`, `invariants`. It is the single
  source for which domains exist and which entry prefixes each one owns.
- `entry-templates.md` - canonical structure for each entry prefix, plus the changelog and
  wiki-document templates.
- `area-templates.md` - the structure of an area: `wiki/` and `llm-wiki/` skeletons, including
  `INDEX.md`, `_changes.md`, `MANIFEST.md` and `USAGE.md`.
- `writing-principles.md` - deduplicated cross-cutting writing rules.
- `documentation-architecture.md` - the full documentation architecture and conventions.
- `llm-wiki-prompt.md` - Prompt A (maintenance/sync) and Prompt B (initial generation).

The registry and the templates are data. Adding a domain, a prefix, or a rule means editing
the reference layer, never writing a new skill.

## Installing

Inside Claude Code:

```
/plugin install living-brain --marketplace davidcromianski-dev/living-brain
```

The full adopter guide, including the team-wide settings snippet and version pinning, lives in
[`INSTALL.md`](../../INSTALL.md) at the repository root. This file does not restate the settings
snippet, so there is only one copy to keep correct.

## Optional - subagent isolation

The `manager` can hand a resolved task to a subagent instead of writing the entry itself. The
domain, the owned files, the template, the prerequisites and the invariants already make the
sub-task self-contained, so a fresh subagent keeps a long documentation task from crowding the
main context.

This is optional and nothing in the method depends on it: no skill of the superpowers fork is
invoked by name, and `plugin.json` declares no dependency on it. The public
[superpowers](https://github.com/obra/superpowers) plugin is one way to get that isolation;
`INSTALL.md` describes how to add it.

## Path conventions

The `manager` skill writes and reads the Living Brain documentation areas **relative to the
consuming project's root**, or relative to the `docs-root` the project declares in
`.living-brain.yml` (see `reference/ROLES.md`):

- `business/`, `product/`, `technical/` - the area trees (`wiki/` + `llm-wiki/`)
- `glossary/` - the named exception: a single flat `INDEX.md`, with no `llm-wiki/` layer
- `${CLAUDE_PLUGIN_ROOT}/reference/...` - the bundled reference layer, resolves in any project

## Not shipped here

Project-specific session skills (for example, a technical-analysis-session bound to a
particular company's guidelines) stay in the consuming project's own `.claude/skills/`. This
plugin carries only the reusable method routing + reference layer.

## Local development

Load the plugin from the working tree so your edits apply live:

```
claude --plugin-dir ./plugins/living-brain
```

Changing a domain, template, or rule means editing the reference layer (`ROLES.md`,
`entry-templates.md`, `writing-principles.md`) - never the `manager` skill. Keep the skill thin.

## Versioning

`version` in `plugin.json` follows semver, and each release is published as a git tag with the
same number (`v0.1.0`, ...). Claude Code uses `version` to decide whether an installed copy is
out of date, so bump it in the same commit that is tagged.
