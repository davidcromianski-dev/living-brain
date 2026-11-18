# Installing Living Brain in a consuming project

This guide is for a project that wants to **adopt** the Living Brain method. You do not copy the
method into your repository - you install it as a Claude Code plugin and create your own
documentation areas.

> **Claude Code only.** Living Brain is a Claude Code plugin. It runs in Claude Code - the
> terminal CLI, the Claude Code desktop app, the IDE extensions, or Claude Code on the web
> (claude.ai/code). It does **not** run in the regular Claude chat: not in a conversation on
> claude.ai, not in the Claude desktop or mobile chat apps, and not in a Claude Project. If you
> do not see a `/plugin` command where you type, you are not in Claude Code.

---

## What you get

**`living-brain:manager`** - a single skill that routes any documentation task to the right
domain, applies the canonical template, and writes the entry into your `wiki/` + `llm-wiki/`. It
carries no domain knowledge itself; it reads the bundled reference layer (`ROLES.md`,
`entry-templates.md`, `area-templates.md`, `writing-principles.md`) on demand.

That is the whole product. One marketplace, one plugin, one skill.

---

## Prerequisites

1. **Claude Code** installed and working, opened in your project's directory. See the note at
   the top of this guide: the regular Claude chat cannot load plugins.
2. **Network access to github.com.** The plugin is distributed from the public repository
   `davidcromianski-dev/living-brain`. No GitHub account or credentials are needed to install it.

---

## Option A - Install for yourself (two commands)

Inside Claude Code, in your project, run:

```
/plugin marketplace add davidcromianski-dev/living-brain
```

```
/plugin install living-brain@living-brain
```

Then run `/reload-plugins` (or restart Claude Code). This tracks the latest commit of `master`.

---

## Option B - Install for the whole team (committed settings)

Create or edit `.claude/settings.json` **at your project root** and commit it, so every teammate
gets the plugin on clone:

```json
{
  "extraKnownMarketplaces": {
    "living-brain": {
      "source": {
        "source": "github",
        "repo": "davidcromianski-dev/living-brain",
        "ref": "v0.1.1"
      }
    }
  },
  "enabledPlugins": {
    "living-brain@living-brain": true
  }
}
```

Notes:
- `enabledPlugins` is an object whose keys use the format `<plugin-name>@<marketplace-name>`.
- `ref` is the **pin**: a branch or tag, never a commit `sha`. Pinning to a release tag such as
  `v0.1.1` keeps the whole team on the same version until you bump it. Use `master` instead to
  track the latest commit.
- If your project already has a `.claude/settings.json`, merge these keys into it rather than
  overwriting the file.

Restart Claude Code in the project. If it prompts you to trust the project's marketplace or to
install its plugin, accept.

---

## Verify the installation

Run `/plugin` and confirm `living-brain` is installed and enabled. Asking Claude "which skills do
you have?" should list `living-brain:manager`.

---

## Create your documentation areas

The `manager` writes into documentation areas **at your project root**:

```
business/     ← business rules, modules, actors, flows
product/      ← features, personas, user stories, product decisions, roadmap
technical/    ← non-functional requirements, architecture, data model, API, security, infra
glossary/     ← flat file (INDEX.md): canonical terms shared across areas
```

Each area follows the two-layer structure (`wiki/` = human source of truth, `llm-wiki/` =
AI-consumption layer). The glossary is the named exception: a single flat file
(`glossary/INDEX.md`), with no `llm-wiki/` layer of its own.

**If these do not belong at your project root,** create `.living-brain.yml` there and set
`docs-root` to the directory that holds them:

```yaml
docs-root: docs/
```

Everything the manager reads and writes then resolves under it. The same file can rebind an
individual document that your project keeps somewhere else, or mark one `absent` so the manager
reports it instead of creating a file you do not want. The full overlay is specified in
`${CLAUDE_PLUGIN_ROOT}/reference/ROLES.md`.

You do not have to scaffold these by hand - just ask:

> Document this business rule: ...

The manager resolves the domain, creates the area/structure if missing, writes the `wiki/` entry,
records the change in `_changes.md`, and syncs the `llm-wiki/`. The full architecture and
conventions are bundled in the plugin at `${CLAUDE_PLUGIN_ROOT}/reference/documentation-architecture.md`,
and the area-level templates at `${CLAUDE_PLUGIN_ROOT}/reference/area-templates.md`.

---

## Using it

Just describe what you want documented in natural language. Examples:

- "Record an architecture decision: we chose a modular monolith because ..."
- "Add a feature with user stories for the patient onboarding flow."
- "Define the non-functional requirement for API latency."

The manager routes each to the correct domain (architecture, product, nfr, ...), applies the
right entry prefix (`ADR-`, `FEAT-`, `NFR-`, ...), reads the prerequisites, and writes the entry.
You never pick a specialist by hand.

---

## Optional - subagent isolation with superpowers

The manager can hand a resolved task to a subagent instead of writing it itself: the domain, the
owned files, the template, the prerequisites and the invariants make the sub-task self-contained.
Running it in a fresh subagent keeps a long documentation task from crowding your main context.

This is optional. Living Brain works with the manager writing directly, and nothing in the method
depends on it. If you want the isolation, install the public
[superpowers](https://github.com/obra/superpowers) plugin by following the instructions in its
README. Living Brain declares no dependency on it and invokes none of its skills by name.

---

## Updating

- **Option A:** run `/plugin marketplace update living-brain`, then `/reload-plugins`.
- **Option B:** bump `ref` to the new release tag, commit, and run
  `/plugin marketplace update living-brain`.

---

## Local development of the method (maintainers only)

If you are working **on** the Living Brain plugin itself (not just consuming it), load it from
the working tree so your edits apply live:

```
claude --plugin-dir ./plugins/living-brain
```

Run `/reload-plugins` after editing a non-`SKILL.md` component (e.g. a `reference/` file).

---

## Troubleshooting

- **There is no `/plugin` command.** You are in the regular Claude chat, not in Claude Code. See
  the note at the top of this guide.
- **The `manager` skill does not appear.** Run `/plugin` and check that `living-brain` is
  enabled, confirm `.claude/settings.json` is valid JSON (Option B), and restart Claude Code.
- **The pinned `ref` is not found.** Check that the tag exists in the releases of
  `davidcromianski-dev/living-brain`.
