# VAR Channel Skills for AI Agents

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/skills-7-blue)](skills/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A collection of AI agent skills for building and activating VAR (Value Added Reseller) channel programs. Built for channel managers, sales leaders, and founders who want AI coding agents to handle partner identification, research, qualification, recruitment, onboarding, and pipeline generation. Works with Claude Code, OpenAI Codex, Cursor, Windsurf, and any agent that supports the Agent Skills spec.

Contributions welcome! Found a way to improve a skill or have a new one to add? Open a PR.

Run into a problem or have a question? Open an issue — we're happy to help.

## What are Skills?

Skills are markdown files that give AI agents specialized knowledge and workflows for specific tasks. When you add these to your project, your agent recognizes when you're working on a VAR channel task and applies the right frameworks, data sources, and output formats automatically.

## How Skills Work Together

Skills reference each other and build on shared context. The `var-channel-context` skill is the foundation — every other skill reads it first to understand your product, target market, and program structure before doing anything.

```
                    ┌────────────────────────────────────────────┐
                    │           var-channel-context              │
                    │     (read by all other skills first)       │
                    └──────────────────┬─────────────────────────┘
                                       │
  ┌─────────────┬──────────────────────┼──────────────┬─────────────┬─────────────┐
  ▼             ▼                      ▼              ▼             ▼             ▼
┌──────────┐ ┌────────────┐ ┌──────────────┐ ┌───────────┐ ┌───────────┐ ┌─────────────┐
│Discovery │ │Intelligence│ │Prioritization│ │Recruitment│ │Partnership│ │Pipeline Gen │
├──────────┤ ├────────────┤ ├──────────────┤ ├───────────┤ ├───────────┤ ├─────────────┤
│var-ident-│ │var-        │ │var-qualif-   │ │var-       │ │var-part-  │ │var-lead-    │
│ification │ │research    │ │ication       │ │outreach   │ │nership    │ │generation   │
└────┬─────┘ └────┬───────┘ └──────┬───────┘ └────┬──────┘ └────┬──────┘ └─────────────┘
     │             │              │              │            │
     └─────────────┴──────┬───────┴──────────────┴────────────┘
                          │
     Skills chain sequentially — each Handoff block feeds the next:
       var-identification  → var-research        (candidate list)
       var-research        → var-qualification   (structured profiles)
       var-qualification   → var-outreach        (ranked shortlist + rationale)
       var-outreach        → var-partnership     (accepted prospects)
       var-partnership     → var-lead-generation (active partner profile)
```

See each skill's `## Handoff` section for the full data spec passed between skills.

## How the VAR Pipeline Works

Skills are designed as a complete end-to-end channel pipeline. Each skill produces structured output that feeds directly into the next.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         VAR Channel Pipeline                             │
└──────────────────────────────────────────────────────────────────────────┘

 ┌──────────────────────┐
 │  var-identification  │  Surface 20–150 candidate VARs from directories,
 │                      │  partner networks, trade associations, LinkedIn
 └──────────┬───────────┘
            │  candidate list
            ▼
 ┌──────────────────────┐
 │  var-research        │  Build factual profiles: portfolio, certifications,
 │                      │  leadership, financial signals, relationship overlap
 └──────────┬───────────┘
            │  structured profiles
            ▼
 ┌──────────────────────┐
 │  var-qualification   │  Score on 6 weighted dimensions — strategic fit,
 │                      │  technical capability, geography, market reach,
 └──────────┬───────────┘  org health, competitive conflict (0–48 pts)
            │  ranked shortlist
            ▼
 ┌──────────────────────┐
 │  var-outreach        │  Draft personalized email + LinkedIn sequences
 │                      │  with day-0, day-5, day-10 follow-ups per contact
 └──────────┬───────────┘
            │  approved messages
            ▼
 ┌──────────────────────┐
 │  var-partnership     │  Structure the deal: model selection, terms outline,
 │                      │  onboarding checklist, partner brief, early wins
 └──────────┬───────────┘
            │  active partner
            ▼
 ┌──────────────────────┐
 │  var-lead-generation │  Activate referral, co-sell, and co-marketing
 │                      │  programs — track attribution, run QBRs
 └──────────────────────┘
```

You do not need to run the full pipeline. Start at the step that matches your current state.

Skills also cross-reference each other:
- `var-qualification` uses research output from `var-research`
- `var-outreach` uses qualification rationale from `var-qualification`
- `var-lead-generation` uses partner profile from `var-partnership`

## Available Skills

| Skill | Description |
|---|---|
| `var-channel-context` | The foundation skill — create or update your channel context document. Every other skill reads this first to understand your product, target market, deal size, program tiers, and partner requirements |
| `var-identification` | When you need to find VAR/reseller candidates in a market. Surfaces 20–150 candidates from directories, partner networks, trade associations, and competitor pages |
| `var-research` | When you have a candidate list and need detailed company profiles. Builds factual profiles covering portfolio, certifications, leadership, and financial signals |
| `var-qualification` | When you need to score and prioritize which VARs to pursue. Scores candidates on 6 weighted dimensions and produces a ranked shortlist with rationales |
| `var-outreach` | When you need to recruit VARs. Drafts personalized email and LinkedIn sequences with day-0, day-5, and day-10 follow-ups per contact |
| `var-partnership` | When a VAR is interested and you need to structure the relationship. Produces model recommendation, terms outline, onboarding checklist, and partner brief |
| `var-lead-generation` | When you have active partners and want to generate pipeline through them. Plans referral, co-sell, and co-marketing programs with attribution tracking and QBR templates |

## Installation

### Option 1: CLI Install (Recommended)

```bash
# Install all skills
npx skills add your-handle/var-channel-skills

# Install specific skills
npx skills add your-handle/var-channel-skills --skill var-identification var-qualification

# List available skills
npx skills add your-handle/var-channel-skills --list
```

This automatically installs to your `.agents/skills/` directory (and symlinks into `.claude/skills/` for Claude Code compatibility).

### Option 2: Clone and Copy

```bash
git clone https://github.com/your-handle/var-channel-skills.git
cp -r var-channel-skills/skills/* .agents/skills/
```

### Option 3: Git Submodule

Add as a submodule for easy updates:

```bash
git submodule add https://github.com/your-handle/var-channel-skills.git .agents/var-channel-skills
```

Then reference skills from `.agents/var-channel-skills/skills/`.

### Option 4: Fork and Customize

1. Fork this repository
2. Customize skills for your specific product, market, and program structure
3. Clone your fork into your projects

### Option 5: SkillKit (Multi-Agent)

Use SkillKit to install skills across multiple AI agents (Claude Code, Cursor, Copilot, etc.):

```bash
# Install all skills
npx skillkit install your-handle/var-channel-skills

# Install specific skills
npx skillkit install your-handle/var-channel-skills --skill var-identification var-outreach
```

## Usage

Once installed, ask your agent to help with VAR channel tasks:

```
"Find me VARs in the DACH region that sell infrastructure software"
→ Uses var-identification skill

"Research and profile these 30 VAR candidates"
→ Uses var-research skill

"Which of these should we prioritize for outreach?"
→ Uses var-qualification skill

"Write recruitment emails for our top 10 prospects"
→ Uses var-outreach skill

"Draft partnership terms for Acme Systems"
→ Uses var-partnership skill

"Build a co-sell motion with our new partners"
→ Uses var-lead-generation skill
```

You can also invoke skills directly:

```
/var-identification
/var-qualification
/var-outreach
```

## Skill Categories

### Foundation
- `var-channel-context` — create and maintain your channel context document; all other skills read this first

### Discovery
- `var-identification` — Surface candidate VARs from directories, partner networks, trade associations, and LinkedIn

### Intelligence
- `var-research` — Build factual company profiles with explicit confidence levels on every data point

### Prioritization
- `var-qualification` — Score and rank candidates on 6 weighted dimensions (0–48 point scale)

### Recruitment
- `var-outreach` — Draft personalized multi-touch email and LinkedIn sequences

### Partnership Development
- `var-partnership` — Structure model, terms, onboarding checklist, and early win opportunities

### Pipeline Generation
- `var-lead-generation` — Run referral, co-sell, and co-marketing programs with attribution tracking

## Design Principles

- **Procedure over prose** — skills give agents step-by-step instructions, not vague guidance
- **Explicit data sources** — each step names where to look, not just what to find
- **Honest limitations** — skills state what they cannot verify and where confidence is low
- **Framework-agnostic** — plain markdown, works with any agent runtime
- **Multi-agent ready** — standardized handoff blocks for pipeline composition

## Contributing

Found a way to improve a skill? Have a new VAR channel skill to suggest? PRs and issues welcome!

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding or improving skills.

## License

MIT — Use these however you want.
