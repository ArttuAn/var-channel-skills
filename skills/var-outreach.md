# Skill: VAR Outreach

**Version:** 1.0.0
**Domain:** Channel Sales — Recruitment
**Previous skill:** `var-qualification.md`
**Next skill:** `var-partnership.md`

---

## Purpose

Craft personalized outreach messages to recruit qualified VAR candidates into a partner program. This skill produces ready-to-send (or operator-reviewed) first-touch messages and a follow-up sequence.

---

## Activation

Use this skill when:
- You have a qualified shortlist of VAR candidates and are ready to initiate contact
- A specific VAR has expressed interest and you need a tailored response
- You are preparing outreach templates for a channel sales team to personalize

---

## Inputs

| Input | Required | Description |
|---|---|---|
| `var_profile` | Yes | Full research profile from `var-research.md` |
| `qualification_rationale` | Yes | Rationale and recommended outreach angle from `var-qualification.md` |
| `sender_name` | Yes | Name of the person the message will come from |
| `sender_title` | Yes | Title of the sender (e.g., "VP Channel Sales", "Founder") |
| `company_name` | Yes | Your company name |
| `product_name` | Yes | Name of the product being offered for resale |
| `program_highlights` | Yes | 3–5 bullet points describing the partner program (margin, support, MDF, deal registration, co-marketing) |
| `preferred_channel` | No | `email`, `linkedin`, or `both`. Default: `email` |
| `tone` | No | `formal`, `direct`, `conversational`. Default: `direct` |

---

## Procedure

### Step 1 — Identify the right contact

From the VAR profile, identify the best target contact:
- **Primary:** VP of Sales, Channel Director, or Business Development lead
- **Secondary:** CEO/founder (for smaller firms where the owner drives vendor decisions)
- **Avoid:** Technical leads, marketing, or account managers as first touch

If no specific contact is named in the profile, note `contact: [identify before sending]` and flag for operator to find via LinkedIn or company directory.

### Step 2 — Extract personalization signals

From the VAR profile and qualification rationale, identify 1–2 specific facts to reference:
- A named customer vertical they serve that aligns with your product
- A specific vendor line they carry that is complementary (not competing)
- A recent award, ranking, or press mention
- A geographic expansion or growth signal

Do not use generic facts ("I see you're in IT solutions") — use specific, observable details.

### Step 3 — Draft the first-touch message

Structure:

**Subject line** (email): specific to them, not generic. Examples:
- "Partner program for [VAR name]'s [vertical] practice"
- "[Your product] + [their complementary vendor] — partnership opportunity"
- "Channel opportunity for [their geography] market"

**Opening (1 sentence):** reference the specific personalization signal.

**Value proposition for the VAR (2–3 sentences):** lead with what the VAR earns or gains, not what your product does. Address:
- Margin or revenue opportunity
- How it complements their existing portfolio
- Why their specific customer base is a fit

**Program highlights (3–5 bullets):** pull directly from `program_highlights` input. Keep bullets scannable.

**CTA (1 sentence):** specific ask — a 20-minute call, a forwarded deck, or a link to the partner portal application. Do not ask for "thoughts" or "feedback."

**Signature:** sender name, title, company, direct contact.

Keep total length under 200 words for email, under 150 words for LinkedIn.

### Step 4 — Draft follow-up sequence

Produce two follow-up messages for non-responders:

**Follow-up 1 (send: 5 business days after first touch)**
- Reference the first message briefly ("Following up on my note from [day]")
- Add one new angle: a customer success stat, a new program benefit, or a timely hook (e.g., upcoming trade event)
- Same CTA as first touch
- Under 100 words

**Follow-up 2 (send: 10 business days after first touch)**
- Acknowledge you've reached out twice
- Offer a lighter ask: "If timing isn't right, I'd appreciate knowing" or "Happy to share a one-pager first"
- Under 75 words

After follow-up 2, move candidate to `status: hold` and re-engage in 90 days.

### Step 5 — LinkedIn version (if applicable)

If `preferred_channel: linkedin` or `both`:
- Shorten email to connection request note (under 300 characters): lead with the personalization signal + one-line value prop
- Follow-up as a direct message after connection is accepted (under 150 words, same structure as email)

### Step 6 — Quality check

Before finalizing, verify:
- [ ] No invented facts — every claim traceable to the VAR profile
- [ ] Personalization signal is specific, not generic
- [ ] Value prop addresses what the VAR gets, not just what your product does
- [ ] CTA is a single, specific action
- [ ] Sender name and company are filled (not placeholder)
- [ ] Message length is within limits

---

## Output

For each VAR candidate, produce:

```
## Outreach: [VAR Company Name]

**Target contact:** [Name, Title] — confidence: high | medium | [flag to operator]
**Personalization signal used:** [quote the specific fact]

---

### Email — First Touch
Subject: [subject line]

[Full message body]

[Signature block]

---

### Email — Follow-up 1 (Day 5)
Subject: Re: [original subject]

[Full message body]

---

### Email — Follow-up 2 (Day 10)
Subject: Re: [original subject]

[Full message body]

---

### LinkedIn — Connection Request Note (if applicable)
[Note text, under 300 characters]

### LinkedIn — Follow-up DM (if applicable)
[Message body]
```

---

## Limitations

- This skill does not verify contact email addresses or LinkedIn profiles — operator must confirm before sending
- Personalization is limited to publicly observable facts; internal relationship context (past deals, mutual contacts) must be added by the operator
- Tone calibration is approximate — operator should review before high-stakes outreach
- This skill does not send messages; it produces drafts for operator review and dispatch
- Response handling and objection management are not covered here

---

## Handoff

```
## Agent Handoff
status: ready
completed:
  - Drafted outreach sequences for [N] VAR candidates
  - [N] contacts identified, [N] flagged for operator to confirm
next_skill: var-partnership.md
inputs_for_next:
  - interested_vars: [update after operator sends outreach and tracks responses]
  - var_profiles: [pass through]
  - qualification_scores: [pass through]
blocked_on: operator must review and send outreach before partnership skill can proceed
```
