# Skill: VAR Research

**Version:** 1.0.0
**Domain:** Channel Sales — Intelligence
**Previous skill:** `var-identification.md`
**Next skill:** `var-qualification.md`

---

## Purpose

Build a detailed, factual profile for each VAR candidate identified in the previous stage. This skill turns a name and website into a structured dossier that the qualification skill can score.

Run this skill once per candidate. In a multi-agent pipeline, parallelize across candidates.

---

## Activation

Use this skill when:
- You have a list of VAR candidates and need to evaluate them
- A specific company has been referred as a potential partner and you need background

---

## Inputs

| Input | Required | Description |
|---|---|---|
| `company_name` | Yes | Name of the VAR to research |
| `company_website` | Yes | Primary website URL |
| `linkedin_url` | No | LinkedIn company page if known |
| `product_category` | Yes | What you would ask them to resell (context for evaluating fit) |
| `target_vertical` | No | Vertical focus for assessing alignment |

---

## Procedure

### Step 1 — Company overview

From the company website, extract:
- Full legal name and any DBA names
- Founded year (if listed)
- Headquarters city and country
- Additional office locations
- Headcount (if stated; otherwise note [unverified])
- Mission or positioning statement

### Step 2 — Products and services portfolio

Review the "Solutions", "Services", or "Products" section of their site:
- List the vendor brands they currently resell or partner with
- List their service categories (implementation, managed services, training, support)
- Note any proprietary products or IP they have developed
- Identify the closest adjacent products to yours — these signal technical and sales fit

Flag any directly competing products as `competing_line: true`.

### Step 3 — Market and customer focus

Identify:
- Named verticals they serve (healthcare, finance, manufacturing, etc.)
- Named customer segments (SMB, mid-market, enterprise, government)
- Case studies or customer logos published on their site — note company names and industries
- Geographic markets explicitly mentioned

### Step 4 — Technical certifications and partnerships

From their site, partner logos, and LinkedIn:
- List vendor certifications held (e.g., Cisco Gold Partner, Microsoft Solutions Partner, AWS Advanced Tier)
- Note tier level for each where available
- List any industry certifications (ISO 27001, SOC 2, HIPAA, etc.)

These are high-confidence signals for technical capability and vendor relationship management experience.

### Step 5 — Team and leadership

From LinkedIn and the company About/Team page:
- CEO / founder name and background (prior roles, domain expertise)
- Sales leadership: VP Sales or Channel Director names if public
- Technical leadership: CTO or presales roles
- Approximate headcount from LinkedIn if not stated on website
- Recent headcount growth or contraction (LinkedIn "How you're connected" / employee count history if accessible)

### Step 6 — Online presence and activity signals

Assess whether this company is active and growing:
- Blog or news section: last published date
- LinkedIn company page: follower count, recent post frequency (last 90 days)
- Press releases or news mentions (search "[company name] press release" and "[company name] site:businesswire.com OR site:prnewswire.com")
- Awards or rankings (CRN lists, regional business journals, vendor partner awards)

### Step 7 — Financial signals

VARs rarely publish financials. Look for proxies:
- Inc. 5000 or Deloitte Fast 500 appearances (indicates revenue growth)
- Named on CRN Solution Provider 500 or similar ranked lists (indicates scale)
- Job postings on LinkedIn or Indeed (active hiring = growth signal; mass layoffs in recent postings = caution)
- Glassdoor rating and review volume (low rating + recent negative reviews = culture/stability risk)

Note all financial estimates as `confidence: low` unless from a ranked list.

### Step 8 — Relationship mapping

Check if any connection or overlap exists with your organization:
- Shared customers (if you have a public customer list)
- Mutual vendor partnerships
- Any past contact in your CRM or email history (agent should flag to operator to check)

---

## Output

Produce a structured profile per company:

```
## VAR Profile: [Company Name]

### Overview
- Website:
- HQ:
- Founded:
- Headcount: [number or unverified]
- Confidence: high | medium | low

### Portfolio
- Vendor lines:
- Service types:
- Competing lines: yes | no | [list if yes]

### Market Focus
- Verticals:
- Segments:
- Geographies:
- Sample customers:

### Certifications
- [Vendor]: [tier] — confidence: high | medium

### Leadership
- CEO:
- Sales lead:
- Technical lead:

### Activity Signals
- Blog last updated:
- LinkedIn posts (last 90d): active | inactive | no page
- Recent news:
- Growth indicators:

### Financial Signals
- Revenue proxies:
- Hiring signal:
- Confidence: low

### Relationship Overlap
- Shared customers:
- Mutual vendors:
- Prior contact: [flag to operator to verify]

### Research Notes
[Any anomalies, gaps, or items requiring operator follow-up]
```

---

## Limitations

- Website content may be outdated — companies do not always update partner and customer pages
- Headcount from LinkedIn is self-reported and can lag reality by 3–6 months
- Financial data is almost never available for private resellers — treat all revenue estimates as low confidence
- Leadership names change frequently — validate before using in outreach
- This skill does not make a fit decision — that is `var-qualification.md`

---

## Handoff

```
## Agent Handoff
status: ready
completed:
  - Profiled [N] VAR candidates
  - [N] profiles complete, [N] flagged for operator follow-up
next_skill: var-qualification.md
inputs_for_next:
  - var_profiles: [attach profiles or file reference]
  - product_category: [pass through]
  - target_vertical: [pass through]
blocked_on:
```
