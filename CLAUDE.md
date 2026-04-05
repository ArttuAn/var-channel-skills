# CLAUDE.md — VAR Channel Skills

## What this repo is

A library of VAR (Value Added Reseller) channel development skills for AI agents. Skills are structured markdown files in `skills/`. Each skill defines a procedure, required inputs, data sources, output format, and handoff spec.

## Using these skills with Claude Code

Load a skill by referencing its file path in your prompt, or install to `.claude/skills/` for automatic discovery:

```bash
cp skills/var-identification.md .claude/skills/
```

Then invoke in Claude Code:

```
/var-identification
```

Or reference inline:

```
Using the var-qualification skill, score these 20 VAR candidates...
```

## Pipeline order

```
1. var-identification     — find candidates
2. var-research           — profile each candidate
3. var-qualification      — score and rank
4. var-outreach           — write recruitment messages
5. var-partnership        — structure the deal
6. var-lead-generation    — activate the channel for leads
```

You do not need to run all skills. Start at the step that matches your current state.

## Rules for all skills

- Ground every output in observable facts (website content, directory listings, press releases, LinkedIn). Do not invent company details.
- When a data point cannot be confirmed, mark it `[unverified]` rather than omitting or guessing.
- Confidence levels: `high` (directly observed), `medium` (inferred), `low` (assumed, needs validation).
- Produce structured output — tables, JSON, or labeled fields — so downstream agents can parse without re-reading prose.
- If a required input is missing, state the assumption before proceeding.

## What these skills do not cover

- Legal review of partner agreements
- CRM configuration or data entry
- Pricing decisions or margin approvals
- Non-public competitive intelligence

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
