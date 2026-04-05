# AGENTS.md — VAR Marketing Skills Library

## What this repository is

A library of marketing skill definitions for AI agents focused on VAR (Value Added Reseller) channel development. Skills are structured markdown files that give agents clear procedures, evaluation criteria, data sources, and output formats.

## How to use these skills

1. Load the relevant skill file(s) into your context
2. Collect the inputs listed in the skill's `## Inputs` section
3. Follow the `## Procedure` step by step
4. Produce output in the format specified by `## Output`
5. Use the `## Handoff` block to pass results to the next agent or skill

## Skill load order for full pipeline

For a complete VAR pipeline, load and execute skills in this order:

```
0. skills/var-channel-context.md    — create your channel context document (run once, all other skills read it)
1. skills/var-identification.md     — find candidates
2. skills/var-research.md           — profile each candidate
3. skills/var-qualification.md      — score and rank
4. skills/var-outreach.md           — write recruitment messages
5. skills/var-partnership.md        — structure the deal
6. skills/var-lead-generation.md    — activate the channel for leads
```

You do not need to run all skills. Start at the step that matches your current state.

## Rules for all skills

- Ground every output in observable facts (website content, directory listings, press releases, LinkedIn data). Do not invent company details.
- When a data point cannot be confirmed, mark it `[unverified]` rather than omitting or guessing.
- Confidence levels: use `high` (directly observed), `medium` (inferred from strong signals), `low` (assumed, needs validation).
- Produce structured output (tables, JSON objects, or labeled fields) so downstream agents can parse results without re-reading prose.
- If a required input is missing, state what is missing and what assumption you are making before proceeding.

## Handoff format

When passing work between agents or skills, include this block at the end of your output:

```
## Agent Handoff
status: ready | blocked | in_progress
completed:
  - [list what was done]
next_skill: [skill name]
inputs_for_next:
  - [key: value]
blocked_on: [leave blank if not blocked]
```

## What these skills do not cover

- Legal review of partner agreements (refer to counsel)
- CRM configuration or data entry automation
- Pricing decisions or margin approvals
- Competitor intelligence beyond publicly available sources
