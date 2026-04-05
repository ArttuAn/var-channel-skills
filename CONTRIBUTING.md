# Contributing to VAR Channel Skills

Thanks for contributing! This repo is a community resource — every improvement makes AI agents better at building channel programs.

## Ways to contribute

- **Fix a skill** — improve step clarity, add a missing data source, correct a scoring weight
- **Add a skill** — new VAR channel workflow not yet covered
- **Add a tool** — helper scripts, validators, or CLI utilities
- **Report a problem** — open an issue if something is wrong or confusing

## Adding or improving a skill

### Skill file format

Every skill file in `skills/` must have these sections in order:

```markdown
# skill-name

## Trigger
One or two sentences: when should an agent use this skill?

## Inputs
- `input_name` (required|optional) — description

## Procedure
Step-by-step instructions. Each step should:
- Name the specific data source or tool to use
- Describe what to do with the result
- State what to do when the source is unavailable

## Output
Describe the exact output format. Use tables, JSON, or labeled fields.
Agents downstream must be able to parse this without reading prose.

## Handoff
```
## Agent Handoff
status: ready | blocked | in_progress
completed:
  - [what was done]
next_skill: [skill name or "none"]
inputs_for_next:
  - key: value
blocked_on:
```

## Limitations
Honest list of what this skill cannot do or verify. Do not skip this section.
```

### Skill quality checklist

Before opening a PR, confirm:

- [ ] Trigger is specific — "when the user wants X" not "for general use"
- [ ] Every procedure step names a concrete data source or action
- [ ] Output section shows the exact format (table, JSON, labeled fields)
- [ ] Limitations section exists and is honest
- [ ] Handoff block specifies `next_skill`
- [ ] No invented company names, people, or statistics in examples
- [ ] Confidence levels (`high` / `medium` / `low`) used where data quality varies
- [ ] Run `./validate-skills.sh` and all checks pass

### Confidence levels

Use these consistently across all skills:

| Level | Meaning |
|---|---|
| `high` | Directly observed on the source (website, directory, press release) |
| `medium` | Inferred from strong signals (headcount growth, job postings, partner badges) |
| `low` | Assumed or derived from weak signals — needs validation before acting |

## Branch naming

```
feat/skill-name        — new skill
fix/skill-name         — fix to existing skill
docs/topic             — documentation changes
tools/tool-name        — new or updated tool
```

## Pull request process

1. Fork the repo and create your branch from `master`
2. Add or update the skill file in `skills/`
3. Update the skills table in `README.md`
4. Run `./validate-skills.sh` — all checks must pass
5. Open a PR with a clear title and description of what changed and why
6. PRs require one review before merge

## What we won't merge

- Skills that invent or guess data (hallucinated company details, fictional sources)
- Skills without a Limitations section
- Skills that duplicate existing ones without clear differentiation
- Outreach templates that could be used for spam at scale without human review gates
- Any skill that bypasses the operator-review model (agents draft, humans send)

## Code of conduct

Be constructive. Critique skills, not people. If you're unsure whether something is appropriate, open an issue before spending time on a PR.
