# Living Brain

A software development method in which documentation is written before the code it describes,
and every new piece of documentation is checked against what the product has already decided.

> **Runs in Claude Code only.** Living Brain is a Claude Code plugin: the terminal CLI, the Claude
> Code desktop app, the IDE extensions, or Claude Code on the web (claude.ai/code). It does not
> run in the regular Claude chat on claude.ai, in the Claude desktop or mobile chat apps, or in a
> Claude Project.

---

## The problem it addresses

A product's knowledge ends up scattered across tickets, chat threads, and the heads of the people
who happened to be there. Documentation written after the fact describes what got built, not why,
and drifts the moment it is finished. An AI agent asked to work on that product either gets fed
the whole repository or gets fed nothing, and both are expensive.

Living Brain treats documentation as the product's source of truth rather than a byproduct of it:
a `wiki/` a human reads, and an `llm-wiki/` derived from it that an agent looks up selectively,
one atomic entry at a time.

---

## What exists today

Three things, and all three can be verified by opening this repository:

| | |
|---|---|
| **The `manager` routing skill** | One entry point. It resolves which domain a documentation task belongs to, reads that domain's prerequisites before writing, applies the canonical template, and refuses to produce content that contradicts a rule already documented. It carries no domain knowledge of its own. |
| **The reference layer** | The data the skill routes on: the domain registry (`ROLES.md`), the entry and area templates, and the writing principles. Adding a domain means editing data, not writing a new persona. |
| **The document architecture** | The two-layer `wiki/` + `llm-wiki/` pattern for product documentation, with its conventions: prefixes, canonical IDs, changelog, the flat glossary. |

The method itself is documented in `framework/`; the plugin lives in `plugins/living-brain/`.

---

## What does not exist

Stated as plainly as the above, because the difference is the point:

- **No automated publication gate.** Documentation before code is a discipline the team holds.
  There is no hook and no CI check that blocks a commit whose documentation is missing.
- **No periodic agents, no metrics.** Nothing runs on a schedule to verify that documentation and
  code still agree, and no measurement of the method's cost or benefit has been made.
- **No token-reduction figure.** Selective lookup loads less than loading whole documents. By how
  much has not been measured, so no number is claimed.
- **One platform.** Living Brain is distributed as a Claude Code plugin and runs only in Claude
  Code. The regular Claude chat cannot load plugins, so it cannot run there. This is a constraint
  of the current implementation, not a claim about where the ideas apply.

---

## Adopting it

You do not copy the method into your repository - you install it as a plugin and create your own
documentation areas.

See **[INSTALL.md](INSTALL.md)**. Inside Claude Code, installing takes two commands:

```
/plugin marketplace add davidcromianski-dev/living-brain
```

```
/plugin install living-brain@living-brain
```

---

## License

[MIT](LICENSE).
