# Tools

Utility scripts that complement the VAR channel skills. Each tool is a standalone Node.js script — no install required beyond Node.js 18+.

## var-scorer.js

Score a VAR candidate using the exact `var-qualification` skill framework. Outputs a weighted score, tier recommendation, and per-dimension breakdown.

```bash
# Interactive (prompts you through each dimension)
node tools/var-scorer.js

# Score from a JSON file
node tools/var-scorer.js --json candidate.json

# Batch score multiple candidates and see a summary
node tools/var-scorer.js --batch candidates.json
```

**JSON schema:**
```json
{
  "name": "Evolution Systems",
  "competing_lines_policy": "flag",
  "requires_technical_services": true,
  "scores": {
    "strategic_fit": 3,
    "technical_capability": 3,
    "geographic_coverage": 2,
    "market_reach": 2,
    "org_health": 2,
    "competitive_conflict": 3
  }
}
```

Scoring: 0–39 total. Tiers: Pursue (high) ≥ 30 · Pursue (standard) 20–29 · Hold 10–19 · Pass < 10.

---

## csv-to-candidates.js

Convert a CSV export of company names into the standard `var-identification` candidate table format (Markdown), ready to pass into `var-research`.

```bash
# Print Markdown table to stdout
node tools/csv-to-candidates.js my-list.csv

# Write to a file
node tools/csv-to-candidates.js my-list.csv --output candidates.md
```

**Expected CSV headers** (case-insensitive, order flexible):

| Header | Required | Aliases |
|---|---|---|
| `name` | Yes | company, company_name |
| `website` | No | url, site, domain |
| `geography` | No | region, country, location |
| `specialties` | No | services, focus, expertise |
| `source` | No | sources, origin, found_via |
| `notes` | No | comment, remarks |

Unknown columns are appended to the Notes field. Missing fields are filled with `[unverified]`.

---

## pipeline-status.js

Print a terminal dashboard showing where every VAR candidate sits in your pipeline, flag overdue follow-ups, and track ownership.

```bash
# Generate sample data to get started
node tools/pipeline-status.js --sample pipeline.json

# View dashboard from JSON file
node tools/pipeline-status.js --json pipeline.json

# View from a directory of Markdown files with front-matter
node tools/pipeline-status.js --dir .agents/pipeline/
```

**Pipeline stages:**

```
identified → researched → qualified → outreach → negotiating → active
                                                                   ↕
                                                              hold / pass
```

**JSON schema (array):**
```json
[
  {
    "company": "Evolution Systems",
    "stage": "outreach",
    "score": 34,
    "recommendation": "Pursue (high)",
    "last_contact": "2026-04-01",
    "next_action": "Send day-5 follow-up email",
    "owner": "Sarah Chen"
  }
]
```

Candidates with `last_contact` older than 14 days are flagged as overdue in red.

---

## Requirements

Node.js 18 or later. No `npm install` needed — all tools use Node.js built-ins only.
