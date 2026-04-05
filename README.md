# var-channel-skills

A library of structured skill definitions for AI agents doing **Value Added Reseller (VAR) channel development** — from identifying opportunities to generating leads and forming partnerships.

## Who this is for

Developers building AI agents that handle:
- Discovering new VAR opportunities in a market
- Researching and profiling VAR candidates
- Qualifying fit and prioritizing outreach
- Drafting partner recruitment messaging
- Structuring partnership terms
- Generating leads through the VAR channel

## How it works

Each file in `skills/` is a self-contained skill definition. Load one or more into your agent's context and the agent follows the skill's procedure, uses the specified data sources, and produces structured output.

Skills are designed to chain — the output of one feeds the input of the next.

## Skills

| Skill | File | Purpose |
|---|---|---|
| VAR Identification | `skills/var-identification.md` | Surface candidate VARs in a target market |
| VAR Research | `skills/var-research.md` | Build a detailed profile of a specific VAR |
| VAR Qualification | `skills/var-qualification.md` | Score and rank candidates for fit |
| VAR Outreach | `skills/var-outreach.md` | Craft personalized recruitment messaging |
| VAR Partnership | `skills/var-partnership.md` | Structure and develop the partnership |
| Lead Generation | `skills/var-lead-generation.md` | Generate leads through the VAR channel |

## Typical agent workflow

```
var-identification → var-research → var-qualification → var-outreach → var-partnership → var-lead-generation
```

Each skill's `## Handoff` section specifies exactly what to pass to the next skill.

## Design principles

- **Procedure over prose** — skills give agents step-by-step instructions, not vague guidance
- **Explicit data sources** — each step names where to look, not just what to find
- **Honest limitations** — skills state what they cannot verify and where confidence is low
- **Framework-agnostic** — plain markdown, works with any agent runtime
- **Multi-agent ready** — standardized handoff blocks for pipeline composition

## License

MIT
