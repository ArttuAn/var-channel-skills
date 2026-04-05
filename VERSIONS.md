# Versions

## v1.0.0 — 2026-04-05

Initial release. Six-skill end-to-end VAR channel pipeline.

### Skills included

- `var-channel-context` — shared foundation skill; create and maintain the context document all other skills read first
- `var-identification` — surface candidate VARs from directories, partner networks, and LinkedIn
- `var-research` — build factual profiles with confidence levels on every data point
- `var-qualification` — 6-dimension weighted scoring framework (0–48 point scale)
- `var-outreach` — personalized email and LinkedIn sequences with day-0/5/10 follow-ups
- `var-partnership` — model selection, terms outline, onboarding checklist, partner brief
- `var-lead-generation` — referral, co-sell, and co-marketing programs with attribution tracking and QBR templates

### Design decisions

- Skills chain via standardized `## Handoff` blocks — output of each skill is structured for direct consumption by the next
- Confidence levels (`high` / `medium` / `low`) required on all data points throughout the pipeline
- Operator review gates built into outreach and partnership terms — agents draft, humans send
- No CRM, legal, pricing, or non-public competitive intelligence in scope
