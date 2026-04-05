# Skill: VAR Lead Generation

**Version:** 1.0.0
**Domain:** Channel Sales — Pipeline Generation
**Previous skill:** `var-partnership.md`

---

## Purpose

Generate qualified leads through the VAR channel. This skill covers both pulling leads from VAR relationships (VAR-referred and co-sell) and pushing demand through VARs to their customer base (co-marketing). It produces actionable campaign plans and lead tracking frameworks.

---

## Activation

Use this skill when:
- You have one or more active VAR partners and want to build joint pipeline
- A VAR partner has MDF budget to activate
- You are planning a channel marketing campaign and need a structured execution plan
- A VAR has identified a specific customer opportunity and you are preparing to co-sell

---

## Inputs

| Input | Required | Description |
|---|---|---|
| `var_partner_list` | Yes | List of active VARs with tier, geography, and verticals |
| `early_win_opportunities` | No | Specific co-sell targets from `var-partnership.md` |
| `mdf_budget` | No | Available MDF budget per VAR or total, if applicable |
| `product_name` | Yes | Product being sold through the channel |
| `target_deal_size` | No | Typical deal size (informs which activities are cost-justified) |
| `campaign_type` | No | `co-marketing`, `co-sell`, `both`, or `var-referral`. Default: `both` |

---

## Procedure

### Step 1 — Classify the lead generation approach per VAR

For each active VAR, choose the primary approach based on the partnership tier and VAR profile:

**VAR Referral** — VAR passes warm leads from their existing customer base. Lowest effort, fastest to activate. Best for transactional-tier VARs with strong existing customer relationships.

**Co-sell** — Your sales team and the VAR jointly work a specific opportunity. Highest effort, highest close rate. Best for strategic-tier VARs and large deals.

**Co-marketing** — Joint demand generation using MDF: events, email campaigns, webinars, paid ads. Medium effort, scales reach. Best for solution-tier VARs with MDF budget and an established audience.

Assign a primary approach to each VAR and note the rationale.

### Step 2 — VAR Referral activation

For VARs assigned the referral approach:

1. **Equip the VAR to identify leads:** Provide a one-paragraph description of the ideal customer (job title, company size, pain signal). Format it for the VAR's sales team to scan their existing accounts.
2. **Set up a referral intake:** Define how the VAR submits a referral — email template, form, or deal registration portal entry. Specify what information you need: company name, contact name, pain signal, urgency.
3. **Define the handoff SLA:** How quickly will you follow up on a referred lead? State a specific number (e.g., "within 1 business day"). VARs will test this before trusting the referral program.
4. **Define the referral incentive:** Accelerated margin on a closed deal, co-marketing credit, or spiff. Specify the amount or formula.

Produce a one-page VAR referral guide for each applicable partner.

### Step 3 — Co-sell opportunity activation

For each early win opportunity (from `var-partnership.md`) or VAR-identified deal:

1. **Qualify the opportunity:** Get from the VAR — company name, contact name, current state (evaluating / budgeted / active project), decision timeline, known competitors in the deal.
2. **Build a joint account plan:**
   - Your role: product demo, technical deep-dive, commercial negotiation
   - VAR's role: relationship, local presence, implementation proposal
   - Next action: what happens next and who owns it
3. **Prepare co-sell materials:**
   - Joint presentation template (your slide deck + VAR logo + local context)
   - Pricing quote template with VAR margin structure shown
   - Technical overview tailored to the prospect's vertical

4. **Set a pipeline review cadence:** Propose a weekly or bi-weekly 30-minute call to progress active co-sell opportunities. Produce a standing agenda: deals in flight, blockers, new opportunities.

### Step 4 — Co-marketing campaign planning

For VARs with MDF budget and a marketing audience:

**Select campaign type based on VAR strengths:**

| Campaign Type | Best For | Typical MDF Cost | Lead Volume |
|---|---|---|---|
| Webinar (joint) | VARs with email list in target vertical | Low | Medium |
| Local event / roundtable | VARs with strong regional presence | Medium | Low but high quality |
| Email campaign to VAR's list | VARs with opt-in customer/prospect list | Low | Medium |
| Paid social (LinkedIn) | VARs with clear ICP and budget | Medium–High | High but less qualified |
| Trade show co-sponsorship | VARs active in specific industry events | High | Variable |

**For each selected campaign, produce:**

1. **Campaign brief:**
   - Objective (leads, awareness, pipeline)
   - Target audience (job title, company size, vertical)
   - Message (lead with the joint value: VAR's local expertise + your product capability)
   - Call to action (demo request, event registration, content download)
   - Channel and format
   - Timeline and milestones

2. **Asset list:** what your company provides (product content, design templates, landing page) vs. what the VAR provides (distribution list, local venue, logo)

3. **MDF request draft:** if MDF reimbursement is involved, produce a draft MDF request with activity description, budget breakdown, and expected outcome metrics

4. **Lead capture and handoff:** define how leads collected by the VAR are passed to you — format, timing, required fields

### Step 5 — Lead tracking framework

Produce a tracking structure for channel leads. This is a schema — implementation in CRM is the operator's responsibility:

```
Lead record fields:
- lead_id
- company_name
- contact_name
- contact_title
- source_var: [VAR company name]
- source_campaign: [campaign name or "referral" or "co-sell"]
- date_received
- deal_value_estimate
- stage: new | contacted | qualified | proposal | closed_won | closed_lost
- owner: [your company AE name]
- var_contact: [VAR rep who referred or is co-selling]
- notes
```

Define attribution rules:
- **VAR-sourced:** VAR identified the lead with no prior contact from your company
- **VAR-influenced:** your company had prior contact but VAR accelerated or rescued the deal
- **Co-sell:** active joint selling from both sides

Attribution affects VAR compensation and MDF credit calculations.

### Step 6 — Quarterly Business Review (QBR) agenda

Produce a standing QBR template to review channel pipeline with each VAR quarterly:

```
## QBR Agenda: [Your Company] x [VAR Name] — [Quarter]

1. Pipeline review (15 min)
   - Deals in flight: stage, value, next action
   - Deals closed this quarter: won / lost and why

2. Lead generation review (10 min)
   - Leads sourced by VAR this quarter
   - Conversion rate from VAR leads vs. other sources

3. Enablement and blockers (10 min)
   - What is preventing the VAR from selling more?
   - Product gaps, competitive losses, training needs

4. Next quarter plan (15 min)
   - Target pipeline value
   - Planned campaigns and MDF activities
   - Joint events or co-sell targets

5. Program review (5 min)
   - Any changes to terms, margin, or support?
```

---

## Output

For each active VAR, produce:

1. **Approach assignment** — referral, co-sell, co-marketing, or combination with rationale
2. **Referral guide** (if referral approach) — one-page ICP description, intake process, SLA, incentive
3. **Co-sell account plans** (if co-sell) — one per opportunity
4. **Campaign briefs** (if co-marketing) — one per planned campaign with asset list and MDF draft
5. **Lead tracking schema** — field definitions and attribution rules
6. **QBR template** — ready to use at first quarterly review

---

## Limitations

- MDF amounts and eligible activities vary by your company's program rules — this skill applies general best practices; operator must align with actual program policy
- Co-marketing campaigns require your company to have designed assets (templates, decks, landing pages); if these don't exist, flag as a prerequisite gap
- Lead volume projections are not produced — they depend on VAR list size and market conditions that this skill cannot observe
- CRM configuration, lead routing, and pipeline reporting are outside scope
- This skill does not manage ongoing VAR relationships — QBR preparation uses the template but relationship management requires human judgment

---

## Handoff

```
## Agent Handoff
status: ready
completed:
  - Lead generation plan produced for [N] VAR partners
  - [N] referral guides, [N] co-sell account plans, [N] campaign briefs
  - Lead tracking schema and QBR template created
next_skill: none — return to var-identification.md to expand partner pipeline
inputs_for_next:
  - pipeline_data: [operator to update after leads are generated and tracked]
  - new_geography_or_vertical: [if expanding, restart from identification]
blocked_on:
```
