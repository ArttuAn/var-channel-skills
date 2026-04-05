# Skill: VAR Qualification

**Version:** 1.0.0
**Domain:** Channel Sales — Scoring
**Previous skill:** `var-research.md`
**Next skill:** `var-outreach.md`

---

## Purpose

Score and rank VAR candidates using a structured framework. This skill converts research profiles into a prioritized shortlist and a clear recommendation (pursue / hold / pass) for each candidate.

---

## Activation

Use this skill when:
- You have completed VAR research profiles and need to decide who to contact first
- You are triage-prioritizing a large candidate list with limited outreach capacity
- A specific VAR candidate has been proposed and you need a fit assessment

---

## Inputs

| Input | Required | Description |
|---|---|---|
| `var_profiles` | Yes | Output from `var-research.md` — one profile per candidate |
| `product_category` | Yes | What you are asking them to resell |
| `target_vertical` | No | Preferred vertical focus |
| `target_geography` | Yes | Required geographic coverage |
| `deal_size` | No | Typical end-customer deal size (informs preferred VAR scale) |
| `competing_lines_policy` | No | `block` (disqualify VARs carrying direct competitors) or `flag` (note but don't disqualify). Default: `flag` |

---

## Scoring Framework

Score each candidate across six dimensions. Each dimension scores 0–3. Total possible: 18 points.

### Dimension 1 — Strategic Fit (weight: 3x)

Does this VAR already serve the buyers who would purchase your product?

| Score | Criteria |
|---|---|
| 3 | Serves the exact vertical and segment; carries adjacent products your buyers already use |
| 2 | Serves the right segment but not the exact vertical, or vice versa |
| 1 | Partial overlap — some relevant customers but primary focus is elsewhere |
| 0 | No meaningful overlap with your target buyer |

### Dimension 2 — Technical Capability (weight: 3x)

Can this VAR implement, support, and train customers on your product?

| Score | Criteria |
|---|---|
| 3 | Holds certifications in adjacent technologies; has a dedicated technical team; runs a service practice |
| 2 | Some relevant certifications; presales or solution architect capacity evident |
| 1 | Primarily a resale-only operation; limited services depth |
| 0 | No visible technical capability relevant to your product |

### Dimension 3 — Geographic Coverage (weight: 2x)

Does the VAR actually cover the geography you care about?

| Score | Criteria |
|---|---|
| 3 | HQ and offices directly in target geography; local market references visible |
| 2 | HQ in target geography but limited office coverage |
| 1 | Covers target geography as part of a broader territory; not a primary focus |
| 0 | No visible presence in target geography |

### Dimension 4 — Market Reach (weight: 2x)

How well-connected is this VAR to potential end customers?

| Score | Criteria |
|---|---|
| 3 | Named on ranked lists (CRN 500, Inc. 5000, etc.); active social presence; multiple customer references visible |
| 2 | Moderate online presence; some customer references; attends relevant trade events |
| 1 | Limited visibility; small social footprint; few or no public references |
| 0 | Minimal or no detectable market presence |

### Dimension 5 — Organizational Health (weight: 1x)

Is this company stable and growing?

| Score | Criteria |
|---|---|
| 3 | Active hiring; recent positive press; stable or growing headcount; positive Glassdoor signal |
| 2 | Steady state — no strong growth or decline signals |
| 1 | Some caution signals — leadership churn, no recent activity, inconsistent hiring |
| 0 | Clear distress signals — mass layoffs, negative reviews, dormant web presence |

### Dimension 6 — Competitive Conflict (weight: 2x, inverse)

Does carrying competing lines reduce the candidate's value as a partner?

| Score | Criteria |
|---|---|
| 3 | No competing lines; carries complementary products only |
| 2 | Minor competitor line carried (different segment or tier) |
| 1 | Moderate competitive overlap — carries a competing product in the same tier |
| 0 | Primary competitor is a flagship line; conflict is direct and significant |

If `competing_lines_policy: block` is set, score 0 candidates are automatically disqualified regardless of total score.

---

## Procedure

### Step 1 — Score each candidate

For each VAR profile:
1. Read through the full research profile
2. Score each of the six dimensions
3. Apply weights: multiply score × weight value
4. Sum weighted scores for a total out of 48

### Step 2 — Apply disqualifiers

Before ranking, check for automatic disqualifiers:
- **Competing line block:** if policy is `block` and competitor conflict score = 0, mark `disqualified: competing_line`
- **Geography miss:** if geographic coverage score = 0, mark `disqualified: geography`
- **No technical capability:** if technical score = 0 and your product requires technical services, mark `disqualified: no_technical_fit`

### Step 3 — Assign recommendations

| Weighted Total | Recommendation |
|---|---|
| 36–48 | **Pursue** — high priority, contact within this week |
| 24–35 | **Pursue** — standard priority, include in next outreach batch |
| 12–23 | **Hold** — revisit if first-choice VARs don't convert |
| 0–11 | **Pass** — does not meet minimum threshold |

### Step 4 — Rank and sort

Sort the full list: Pursue (high) → Pursue (standard) → Hold → Pass → Disqualified.

Within Pursue tiers, sort by total weighted score descending.

### Step 5 — Write a rationale for each Pursue candidate

For each candidate recommended Pursue, write 2–3 sentences explaining:
- The primary reason for high fit
- The most significant risk or gap
- The recommended outreach angle (what to lead with)

---

## Output

```
## VAR Qualification Results

### Summary
- Total candidates scored: [N]
- Pursue (high priority): [N]
- Pursue (standard): [N]
- Hold: [N]
- Pass: [N]
- Disqualified: [N]

### Ranked List

| Rank | Company | Score | Recommendation | Top Strength | Top Risk |
|---|---|---|---|---|---|
| 1 | Acme Solutions | 41/48 | Pursue (high) | Healthcare vertical depth | No listed certifications |

### Pursuit Rationales

#### 1. Acme Solutions — Score: 41/48
[2–3 sentence rationale and recommended outreach angle]
```

---

## Limitations

- Scores are only as good as the research profiles — gaps in research reduce scoring accuracy
- Organizational health scores are low-confidence by nature; treat as a tiebreaker, not a primary signal
- This framework does not account for the VAR's willingness to partner — a high-scoring VAR may already have an exclusive with a competitor
- Scores should be reviewed by the operator before outreach begins on high-priority candidates

---

## Handoff

```
## Agent Handoff
status: ready
completed:
  - Scored [N] candidates
  - [N] Pursue, [N] Hold, [N] Pass, [N] Disqualified
next_skill: var-outreach.md
inputs_for_next:
  - pursue_list: [attach ranked Pursue candidates with rationales]
  - var_profiles: [pass through full profiles for personalization]
  - product_category: [pass through]
blocked_on:
```
