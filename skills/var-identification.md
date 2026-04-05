# Skill: VAR Identification

**Version:** 1.0.0
**Domain:** Channel Sales — Discovery
**Next skill:** `var-research.md`

---

## Purpose

Surface a list of candidate Value Added Resellers (VARs) in a target market. This skill produces raw candidates — it does not qualify or rank them. Quantity and coverage matter at this stage.

---

## Activation

Use this skill when:
- Starting a new VAR channel program with no existing partner list
- Expanding into a new geography or vertical
- Refreshing a stale partner pipeline

---

## Inputs

| Input | Required | Description |
|---|---|---|
| `product_category` | Yes | What product/solution the VAR would resell (e.g., "network security software", "industrial IoT sensors") |
| `target_geography` | Yes | Region, country, or metro where VARs should operate |
| `target_vertical` | No | Industry focus if narrowing by vertical (e.g., healthcare, manufacturing, retail) |
| `company_size_range` | No | Preferred reseller headcount or revenue band |
| `exclude_list` | No | Vendors or resellers already known or disqualified |

---

## Procedure

### Step 1 — Define the VAR profile

Before searching, write a one-paragraph description of the ideal VAR:
- What technical expertise they need to resell and support your product
- What customer segment they should already serve
- Whether they need to carry complementary products (and which ones signal fit)

This profile guides every search in subsequent steps.

### Step 2 — Search industry partner directories

Query the following sources for companies matching the VAR profile:

- **CompTIA Channel Finder** — filter by geography, specialty, and certification
- **CRN Partner Program Directory** — search by vendor category and region
- **Solution Provider 500 / VAR 500 lists** — annual ranked lists of top resellers
- **AWS Partner Network, Microsoft Partner Center, Google Cloud Partner Directory** — if your product integrates with these platforms, their partner directories surface VARs already serving your buyer segment
- **Ingram Micro / TD SYNNEX / Arrow reseller locators** — distributors whose reseller networks often include qualified VARs

For each source: record company name, website, geography, and listed specialties.

### Step 3 — Search for VARs via trade associations

Many VARs list themselves in vertical-specific associations. Search:

- Healthcare: HIMSS, HLTH directory
- Manufacturing / industrial: ISA (International Society of Automation), MESA International
- Financial services: FIS, FINTECH partner ecosystems
- Government / public sector: GSA Schedule holder lists, NASPO ValuePoint
- General B2B tech: ASCII Group, HTG Peer Groups, CompTIA membership directory

### Step 4 — Mine competitor partner pages

Find who already resells products adjacent to yours:

1. Identify 3–5 competitors or complementary vendors
2. Navigate to their "Partners", "Resellers", or "Channel" page
3. Extract the listed partner companies
4. Filter to those in your target geography and vertical

These companies are pre-validated as willing to operate as VARs. Flag them as `source: competitor_partner_page`.

### Step 5 — LinkedIn search

Use LinkedIn company search with filters:
- Industry: "Information Technology and Services" or vertical-specific
- Keywords: "value added reseller", "solution provider", "systems integrator", "authorized reseller", "managed service provider" + your product category
- Location: target geography
- Company size: apply `company_size_range` if provided

Record LinkedIn company URL alongside name and website.

### Step 6 — Industry event exhibitor lists

Trade shows surface VARs actively seeking vendor relationships:
- Search for the top 2–3 trade events in your vertical
- Scrape or review exhibitor/sponsor lists
- Filter for companies that list reseller, integration, or solution provider services

### Step 7 — Deduplicate and format

Merge results from all sources into a candidate list. Remove duplicates (match on company name + website). Flag the source(s) for each entry.

---

## Output

Produce a table with one row per candidate:

```
| Company Name | Website | Geography | Specialties | Source(s) | Notes |
|---|---|---|---|---|---|
| Acme Solutions | acme.com | US - Midwest | Network security, Cisco partner | CRN directory, LinkedIn | Also on competitor X partner page |
```

Target: 20–50 raw candidates for a focused geography; 50–150 for a broad search.

---

## Limitations

- Directory listings may be outdated — company status requires validation in `var-research.md`
- Competitor partner pages may be incomplete or deliberately obscured
- LinkedIn search results depend on how well companies self-describe; some active VARs have poor LinkedIn profiles
- This skill does not assess fit, financial health, or willingness to partner — that is `var-qualification.md`

---

## Handoff

```
## Agent Handoff
status: ready
completed:
  - Generated candidate VAR list with [N] entries
  - Sources searched: [list sources used]
next_skill: var-research.md
inputs_for_next:
  - candidate_list: [attach table or file reference]
  - product_category: [pass through from inputs]
  - target_vertical: [pass through from inputs]
blocked_on:
```
