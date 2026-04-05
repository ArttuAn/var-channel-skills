# Skill: VAR Partnership

**Version:** 1.0.0
**Domain:** Channel Sales — Partnership Development
**Previous skill:** `var-outreach.md`
**Next skill:** `var-lead-generation.md`

---

## Purpose

Structure and develop a VAR partnership from initial interest to an active, operational relationship. This skill produces a partnership framework, onboarding checklist, and program terms outline for operator review and legal sign-off.

---

## Activation

Use this skill when:
- A VAR candidate has responded positively to outreach and expressed interest in partnering
- You are formalizing an existing informal relationship with a reseller
- You need to design or document the structure of a partner program tier

---

## Inputs

| Input | Required | Description |
|---|---|---|
| `var_profile` | Yes | Full research profile from `var-research.md` |
| `qualification_score` | Yes | Score and rationale from `var-qualification.md` |
| `program_tier` | No | If you have tiered program (e.g., Silver/Gold/Platinum), specify which tier this VAR maps to |
| `product_name` | Yes | Product(s) being offered for resale |
| `your_company_name` | Yes | Your company name |
| `standard_margin_range` | No | Typical reseller margin range (e.g., "15–25%") |
| `mdf_available` | No | Whether Market Development Funds are available and typical amount or percentage |
| `deal_registration` | No | Whether you offer deal registration protection (`yes` / `no` / `discuss`) |
| `existing_program_doc` | No | Reference to existing partner program documentation if one exists |

---

## Procedure

### Step 1 — Map the partnership structure

Based on the VAR profile and qualification score, determine the appropriate partnership model:

**Reseller (transactional):** VAR buys product at a discount and resells. Minimal joint activity. Suitable for VARs with low technical depth or uncertain commitment.

**Solution Partner:** VAR adds implementation, configuration, or managed services on top of the product. Requires technical enablement investment. Higher margin and MDF eligibility.

**Strategic Partner:** Deep joint go-to-market — co-selling, co-marketing, joint pipeline. Reserved for top-tier VARs with strong strategic fit scores (35+ from qualification).

Select the model that matches the VAR's capability profile and your program capacity. Note the recommended model and rationale.

### Step 2 — Draft partnership terms outline

Produce a terms outline (not a legal contract — this goes to counsel for formalization):

**Commercial terms:**
- Reseller discount / margin percentage or range
- Price protection policy (how long a quoted price is valid)
- Minimum purchase commitment (if any)
- Payment terms

**Deal registration:**
- Whether the VAR can register deals for protection
- Duration of registration lock
- Conditions for registration approval

**Market Development Funds (MDF):**
- MDF availability and calculation basis (e.g., percentage of quarterly revenue, fixed budget)
- Eligible MDF activities (events, paid ads, content, demos)
- Approval and reimbursement process summary

**Support:**
- Technical support tier the VAR receives
- Dedicated channel manager or shared support queue
- Escalation path for customer issues

**Exclusivity:**
- Whether this is exclusive (rare) or non-exclusive
- Any geographic or vertical exclusivity being considered

Flag all terms as `draft — requires legal and operator approval before presentation to VAR`.

### Step 3 — Build the onboarding checklist

List everything needed to activate the VAR as operational:

**Administrative:**
- [ ] Partner agreement executed (legal)
- [ ] VAR added to partner portal / PRM system
- [ ] Credit application or payment terms established
- [ ] Named channel manager assigned

**Enablement:**
- [ ] Product training scheduled (specify: in-person / online / self-serve)
- [ ] Sales playbook and pitch deck shared
- [ ] Competitive positioning guide shared
- [ ] Demo environment or sandbox access provisioned
- [ ] Co-branded collateral templates provided

**Go-to-market activation:**
- [ ] Partner listed on your partner page / locator
- [ ] First joint pipeline review call scheduled
- [ ] MDF budget activated (if applicable)
- [ ] Deal registration credentials issued

### Step 4 — Identify early win opportunities

From the VAR profile, identify 1–3 concrete opportunities to generate early momentum:

- Named customer segments the VAR already serves where your product solves a known problem
- Upcoming events the VAR attends where a joint presence could generate leads
- A specific existing VAR customer who matches your ICP and could be a co-sell target

These become the first agenda items in the initial business review call.

### Step 5 — Draft the partner onboarding brief

Produce a 1-page brief the VAR will receive at kickoff:

```
# Partnership Brief: [Your Company] x [VAR Name]

## What we're building together
[2–3 sentences on the joint opportunity and why this partnership makes sense]

## Program tier: [tier name]
- Margin: [X%]
- Deal registration: [yes/no/terms]
- MDF: [available/not available/amount]
- Support: [tier description]

## Your first 30 days
1. Complete product training ([link or schedule])
2. Access partner portal ([link])
3. Joint pipeline review: [proposed date]

## Your primary contact
[Channel manager name, email, phone]
```

---

## Output

Produce three documents:

1. **Partnership Model Recommendation** — recommended tier and rationale (1 paragraph)
2. **Terms Outline** — structured list of all commercial and program terms (flagged as draft)
3. **Onboarding Checklist** — all activation steps with owner fields (agent / operator / VAR)
4. **Partner Onboarding Brief** — 1-page brief for the VAR (ready for operator to review and send)
5. **Early Win Opportunities** — 1–3 specific co-sell or activation targets

---

## Limitations

- Terms outline is not a legal document — all commercial terms require operator approval and legal review before being presented to the VAR
- MDF policies, payment terms, and exclusivity provisions vary significantly by company; this skill applies general best practices, not company-specific rules
- Onboarding checklist assumes standard program infrastructure exists (partner portal, training materials); if these don't exist, flag as a prerequisite gap
- This skill does not manage the partner relationship after activation — pipeline tracking and QBRs are outside scope

---

## Handoff

```
## Agent Handoff
status: ready
completed:
  - Partnership framework drafted for [VAR name]
  - Terms outline produced (awaiting operator + legal review)
  - Onboarding checklist created
  - [N] early win opportunities identified
next_skill: var-lead-generation.md
inputs_for_next:
  - active_var_partners: [VAR name, tier, channel manager, activation date]
  - early_win_opportunities: [pass through list]
  - var_profile: [pass through]
blocked_on: operator and legal must approve terms before presenting to VAR
```
