# var-channel-context

## Trigger

When the user wants to create or update their VAR channel context document. Also use when another skill references missing context — product category, target geography, deal size, program tiers, or partner requirements — and no context document exists yet.

Every other skill in this library reads `var-channel-context.md` first. Create it before running any other skill.

## Inputs

- `product_name` (required) — the product or solution being sold through VARs
- `product_category` (required) — e.g. "network security appliance", "SaaS workforce management", "industrial IoT platform"
- `target_verticals` (optional) — e.g. healthcare, financial services, manufacturing
- `target_geographies` (required) — regions or countries to focus on
- `deal_size_range` (optional) — typical end-customer deal value (e.g. "$25k–$150k ARR")
- `program_tiers` (optional) — partner tier structure (e.g. Authorized / Gold / Platinum)
- `margin_range` (optional) — reseller margin range (e.g. "20–35%")
- `mdf_available` (optional) — yes/no and approximate annual budget
- `deal_registration` (optional) — policy summary
- `competing_lines_policy` (optional) — "exclusive", "preferred", or "open"
- `ideal_partner_profile` (optional) — describe the ideal VAR (size, specialties, buyer relationships)
- `existing_partners` (optional) — list of current VAR names to avoid duplicating or conflicting

## Procedure

1. **Collect inputs.** Ask the user for any required inputs not yet provided. Optional inputs improve skill quality — prompt for them but proceed without them if unavailable.

2. **Draft the context document.** Populate the template below with the provided inputs. For any optional field left blank, insert `[not specified]` as the placeholder.

3. **Review for consistency.** Check that program tiers, margin range, and deal registration policy are internally consistent. Flag any contradictions to the operator before saving.

4. **Save the file.** Write the completed document to `.agents/var-channel-context.md` (or `.claude/var-channel-context.md` for Claude Code users). If a file already exists, show a diff of what changed and ask the operator to confirm before overwriting.

5. **Confirm and summarize.** Report which fields were populated, which were left as `[not specified]`, and which optional fields would most improve downstream skill quality if provided later.

## Output

A completed `var-channel-context.md` file using this template:

```markdown
# VAR Channel Context

## Product
- **Name:** [product_name]
- **Category:** [product_category]
- **Description:** [one-sentence description of what the product does and who it is for]

## Target Market
- **Verticals:** [target_verticals or "not specified"]
- **Geographies:** [target_geographies]
- **Buyer persona:** [who signs the deal at the end customer — title, company size]
- **Typical deal size:** [deal_size_range or "not specified"]

## Program Structure
- **Tiers:** [program_tiers or "not specified"]
- **Reseller margin:** [margin_range or "not specified"]
- **MDF available:** [yes/no — budget or "not specified"]
- **Deal registration:** [policy summary or "not specified"]
- **Competing lines policy:** [exclusive / preferred / open / "not specified"]

## Ideal Partner Profile
[ideal_partner_profile — describe size, specialties, existing buyer relationships, certifications]

## Existing Partners
[list of current VARs, or "none" if starting from scratch]

## Notes
[any additional context, constraints, or program details not captured above]
```

## Handoff

```
## Agent Handoff
status: ready
completed:
  - created var-channel-context.md with [N] fields populated
next_skill: var-identification
inputs_for_next:
  - product_category: [value]
  - target_geographies: [value]
  - target_verticals: [value or "not specified"]
blocked_on:
```

## Limitations

- This skill produces a context template, not a validated program document. Margin ranges, tier structures, and MDF policies must be confirmed with the operator before sharing with partners.
- Does not verify that program terms are competitive against other vendor programs in the market.
- Does not cover legal review of program agreements — refer to counsel.
- If key fields (margin, deal size, ideal partner profile) are left as `[not specified]`, downstream skills will produce lower-confidence output and will state their assumptions explicitly.
