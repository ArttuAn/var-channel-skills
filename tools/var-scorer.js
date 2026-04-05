#!/usr/bin/env node
/**
 * var-scorer.js
 * Score a VAR candidate using the var-qualification skill framework.
 *
 * Usage:
 *   node tools/var-scorer.js                        # interactive mode
 *   node tools/var-scorer.js --json candidate.json  # score from JSON file
 *   node tools/var-scorer.js --batch candidates.json # score multiple candidates
 *
 * Scoring framework (from skills/var-qualification.md):
 *   Each dimension scores 0–3. Weights applied:
 *     Strategic Fit       × 3  → max  9
 *     Technical Capability × 3  → max  9
 *     Geographic Coverage  × 2  → max  6
 *     Market Reach         × 2  → max  6
 *     Organizational Health × 1 → max  3
 *     Competitive Conflict  × 2 → max  6  (higher = less conflict = better)
 *   Total: 0–39
 */

'use strict';

const readline = require('readline');
const fs = require('fs');
const path = require('path');

// ─── Scoring config ──────────────────────────────────────────────────────────

const DIMENSIONS = [
  {
    key: 'strategic_fit',
    label: 'Strategic Fit',
    weight: 3,
    description: 'Does this VAR already serve the buyers who would purchase your product?',
    rubric: [
      '0 — No meaningful overlap with your target buyer',
      '1 — Partial overlap; some relevant customers but primary focus is elsewhere',
      '2 — Serves the right segment but not the exact vertical, or vice versa',
      '3 — Serves the exact vertical and segment; carries adjacent products your buyers already use',
    ],
  },
  {
    key: 'technical_capability',
    label: 'Technical Capability',
    weight: 3,
    description: 'Can this VAR implement, support, and train customers on your product?',
    rubric: [
      '0 — No visible technical capability relevant to your product',
      '1 — Primarily a resale-only operation; limited services depth',
      '2 — Some relevant certifications; presales or solution architect capacity evident',
      '3 — Holds certifications in adjacent technologies; dedicated technical team; runs a service practice',
    ],
  },
  {
    key: 'geographic_coverage',
    label: 'Geographic Coverage',
    weight: 2,
    description: 'Does the VAR actually cover the geography you care about?',
    rubric: [
      '0 — No visible presence in target geography',
      '1 — Covers target geography as part of a broader territory; not a primary focus',
      '2 — HQ in target geography but limited office coverage',
      '3 — HQ and offices directly in target geography; local market references visible',
    ],
  },
  {
    key: 'market_reach',
    label: 'Market Reach',
    weight: 2,
    description: 'How well-connected is this VAR to potential end customers?',
    rubric: [
      '0 — Minimal or no detectable market presence',
      '1 — Limited visibility; small social footprint; few or no public references',
      '2 — Moderate online presence; some customer references; attends relevant trade events',
      '3 — Named on ranked lists (CRN 500 etc.); active social presence; multiple customer references',
    ],
  },
  {
    key: 'org_health',
    label: 'Organizational Health',
    weight: 1,
    description: 'Is this company stable and growing?',
    rubric: [
      '0 — Clear distress signals — mass layoffs, negative reviews, dormant web presence',
      '1 — Some caution signals — leadership churn, no recent activity, inconsistent hiring',
      '2 — Steady state — no strong growth or decline signals',
      '3 — Active hiring; recent positive press; stable or growing headcount',
    ],
  },
  {
    key: 'competitive_conflict',
    label: 'Competitive Conflict',
    weight: 2,
    description: 'Does carrying competing lines reduce partner value? (higher = less conflict = better)',
    rubric: [
      '0 — Primary competitor is a flagship line; conflict is direct and significant',
      '1 — Moderate competitive overlap — carries a competing product in the same tier',
      '2 — Minor competitor line carried (different segment or tier)',
      '3 — No competing lines; carries complementary products only',
    ],
  },
];

const MAX_SCORE = DIMENSIONS.reduce((sum, d) => sum + d.weight * 3, 0); // 39

const TIERS = [
  { min: 30, max: MAX_SCORE, label: 'Pursue — High Priority', action: 'Contact within this week.' },
  { min: 20, max: 29,        label: 'Pursue — Standard',      action: 'Include in next outreach batch.' },
  { min: 10, max: 19,        label: 'Hold',                   action: 'Revisit if first-choice VARs do not convert.' },
  { min: 0,  max: 9,         label: 'Pass',                   action: 'Does not meet minimum threshold.' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const RESET  = '\x1b[0m';
const BOLD   = '\x1b[1m';
const CYAN   = '\x1b[36m';
const GREEN  = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED    = '\x1b[31m';
const DIM    = '\x1b[2m';

function colour(score) {
  const pct = score / MAX_SCORE;
  if (pct >= 0.77) return GREEN;
  if (pct >= 0.51) return YELLOW;
  return RED;
}

function tierFor(score, disqualified) {
  if (disqualified) return { label: `Disqualified — ${disqualified}`, action: 'Remove from pipeline.' };
  return TIERS.find(t => score >= t.min && score <= t.max) || TIERS[TIERS.length - 1];
}

function bar(score) {
  const filled = Math.round((score / MAX_SCORE) * 20);
  return '[' + '█'.repeat(filled) + '░'.repeat(20 - filled) + ']';
}

function scoreCandidate(candidate) {
  let total = 0;
  const breakdown = [];
  let disqualified = null;

  for (const dim of DIMENSIONS) {
    const raw = candidate.scores[dim.key] ?? 0;
    const weighted = raw * dim.weight;
    total += weighted;
    breakdown.push({ ...dim, raw, weighted });
  }

  // Auto-disqualifiers
  const geoScore = candidate.scores['geographic_coverage'] ?? 0;
  const techScore = candidate.scores['technical_capability'] ?? 0;
  const conflictScore = candidate.scores['competitive_conflict'] ?? 0;

  if (candidate.competing_lines_policy === 'block' && conflictScore === 0) {
    disqualified = 'competing_line';
  } else if (geoScore === 0) {
    disqualified = 'geography_miss';
  } else if (techScore === 0 && candidate.requires_technical_services) {
    disqualified = 'no_technical_fit';
  }

  return { total, breakdown, disqualified, tier: tierFor(total, disqualified) };
}

function printResult(name, result) {
  const { total, breakdown, disqualified, tier } = result;
  const c = colour(total);

  console.log('\n' + BOLD + '━'.repeat(60) + RESET);
  console.log(BOLD + CYAN + ` ${name}` + RESET);
  console.log(BOLD + `━`.repeat(60) + RESET);
  console.log();

  for (const d of breakdown) {
    const pips = '●'.repeat(d.raw) + '○'.repeat(3 - d.raw);
    console.log(
      ` ${d.label.padEnd(24)} ${DIM}${pips}${RESET}  ${String(d.raw).padStart(1)}/3  ` +
      `× ${d.weight}  = ${BOLD}${String(d.weighted).padStart(2)}${RESET}`
    );
  }

  console.log();
  console.log(` ${'TOTAL'.padEnd(24)}              ${c}${BOLD}${String(total).padStart(2)}/${MAX_SCORE}${RESET}  ${c}${bar(total)}${RESET}`);
  console.log();

  const tierColour = disqualified ? RED : total >= 30 ? GREEN : total >= 20 ? YELLOW : RED;
  console.log(` Recommendation:  ${tierColour}${BOLD}${tier.label}${RESET}`);
  console.log(` ${DIM}${tier.action}${RESET}`);
  console.log();
}

// ─── Interactive mode ─────────────────────────────────────────────────────────

async function promptScores() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q) => new Promise(res => rl.question(q, res));

  console.log('\n' + BOLD + CYAN + ' VAR Scorer — var-qualification skill' + RESET);
  console.log(DIM + ` Max score: ${MAX_SCORE}  |  Skills: skills/var-qualification.md` + RESET + '\n');

  const name = (await ask(' Company name: ')).trim() || 'Unknown VAR';
  const competingPolicy = (await ask(' Competing lines policy [flag/block] (default: flag): ')).trim() || 'flag';
  const requiresTech = (await ask(' Requires technical services? [y/n] (default: y): ')).trim().toLowerCase() !== 'n';

  console.log();
  const scores = {};

  for (const dim of DIMENSIONS) {
    console.log(BOLD + ` ${dim.label}` + RESET + `  ${DIM}(weight: ${dim.weight}x)${RESET}`);
    console.log(` ${DIM}${dim.description}${RESET}`);
    for (const r of dim.rubric) console.log(`   ${DIM}${r}${RESET}`);

    let score;
    do {
      const raw = await ask(` Score [0-3]: `);
      score = parseInt(raw, 10);
    } while (isNaN(score) || score < 0 || score > 3);
    scores[dim.key] = score;
    console.log();
  }

  rl.close();

  const candidate = { name, scores, competing_lines_policy: competingPolicy, requires_technical_services: requiresTech };
  const result = scoreCandidate(candidate);
  printResult(name, result);
}

// ─── JSON / batch mode ────────────────────────────────────────────────────────

function runFromFile(filePath, batch = false) {
  const raw = fs.readFileSync(path.resolve(filePath), 'utf8');
  const data = JSON.parse(raw);
  const candidates = batch ? data : [data];

  const results = candidates.map(c => ({ ...c, result: scoreCandidate(c) }));

  // Sort: Disqualified last, then by score desc
  results.sort((a, b) => {
    if (a.result.disqualified && !b.result.disqualified) return 1;
    if (!a.result.disqualified && b.result.disqualified) return -1;
    return b.result.total - a.result.total;
  });

  results.forEach(c => printResult(c.name, c.result));

  if (batch) {
    console.log(BOLD + '━'.repeat(60) + RESET);
    console.log(BOLD + ' BATCH SUMMARY' + RESET);
    const pursue_high = results.filter(c => !c.result.disqualified && c.result.total >= 30).length;
    const pursue_std  = results.filter(c => !c.result.disqualified && c.result.total >= 20 && c.result.total < 30).length;
    const hold        = results.filter(c => !c.result.disqualified && c.result.total >= 10 && c.result.total < 20).length;
    const pass        = results.filter(c => !c.result.disqualified && c.result.total < 10).length;
    const disq        = results.filter(c =>  c.result.disqualified).length;
    console.log(` ${GREEN}Pursue (high):${RESET}    ${pursue_high}`);
    console.log(` ${YELLOW}Pursue (standard):${RESET} ${pursue_std}`);
    console.log(` ${YELLOW}Hold:${RESET}             ${hold}`);
    console.log(` ${RED}Pass:${RESET}             ${pass}`);
    console.log(` ${RED}Disqualified:${RESET}     ${disq}`);
    console.log(BOLD + '━'.repeat(60) + RESET + '\n');
  }
}

// ─── Entry point ──────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
  Usage:
    node tools/var-scorer.js                         Interactive scoring
    node tools/var-scorer.js --json <file.json>      Score from JSON file
    node tools/var-scorer.js --batch <file.json>     Score multiple candidates

  JSON schema (single candidate):
    {
      "name": "Acme Solutions",
      "competing_lines_policy": "flag",
      "requires_technical_services": true,
      "scores": {
        "strategic_fit": 3,
        "technical_capability": 2,
        "geographic_coverage": 3,
        "market_reach": 2,
        "org_health": 2,
        "competitive_conflict": 3
      }
    }

  For --batch, wrap in an array: [{ ... }, { ... }]
  `);
  process.exit(0);
}

if (args.includes('--json')) {
  runFromFile(args[args.indexOf('--json') + 1], false);
} else if (args.includes('--batch')) {
  runFromFile(args[args.indexOf('--batch') + 1], true);
} else {
  promptScores().catch(err => { console.error(err); process.exit(1); });
}
