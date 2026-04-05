#!/usr/bin/env node
/**
 * pipeline-status.js
 * Print a terminal summary of where VAR candidates sit in your channel pipeline.
 *
 * Usage:
 *   node tools/pipeline-status.js
 *   node tools/pipeline-status.js --dir ./pipeline
 *   node tools/pipeline-status.js --json pipeline.json
 *   node tools/pipeline-status.js --help
 *
 * Reads candidate status from:
 *   1. A JSON file (--json flag), OR
 *   2. Markdown files in a directory (--dir flag, default: .agents/pipeline/)
 *      Each file should contain a YAML-like front-matter block:
 *        ---
 *        company: Acme Solutions
 *        stage: qualification
 *        score: 31
 *        recommendation: Pursue (high)
 *        last_contact: 2026-03-15
 *        next_action: Send day-5 follow-up
 *        owner: Sarah Chen
 *        ---
 *
 * Pipeline stages (in order):
 *   identified → researched → qualified → outreach → negotiating → active → hold → pass
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ─── Config ───────────────────────────────────────────────────────────────────

const STAGES = [
  'identified',
  'researched',
  'qualified',
  'outreach',
  'negotiating',
  'active',
  'hold',
  'pass',
];

const STAGE_SKILL = {
  identified:  'var-identification',
  researched:  'var-research',
  qualified:   'var-qualification',
  outreach:    'var-outreach',
  negotiating: 'var-partnership',
  active:      'var-lead-generation',
  hold:        '—',
  pass:        '—',
};

// ─── Colours ──────────────────────────────────────────────────────────────────

const RESET  = '\x1b[0m';
const BOLD   = '\x1b[1m';
const DIM    = '\x1b[2m';
const CYAN   = '\x1b[36m';
const GREEN  = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED    = '\x1b[31m';
const BLUE   = '\x1b[34m';

function stageColour(stage) {
  if (stage === 'active')                     return GREEN;
  if (['outreach','negotiating'].includes(stage)) return CYAN;
  if (['identified','researched','qualified'].includes(stage)) return YELLOW;
  if (stage === 'hold')                       return DIM;
  if (stage === 'pass')                       return RED;
  return RESET;
}

// ─── Parsers ──────────────────────────────────────────────────────────────────

function parseFrontMatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const obj = {};
  for (const line of match[1].split('\n')) {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) obj[key.trim()] = rest.join(':').trim();
  }
  return obj;
}

function loadFromDirectory(dir) {
  const resolved = path.resolve(dir);
  if (!fs.existsSync(resolved)) return [];

  return fs.readdirSync(resolved)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const text = fs.readFileSync(path.join(resolved, f), 'utf8');
      const fm = parseFrontMatter(text);
      return fm ? { file: f, ...fm } : null;
    })
    .filter(Boolean);
}

function loadFromJSON(filePath) {
  const raw = fs.readFileSync(path.resolve(filePath), 'utf8');
  return JSON.parse(raw);
}

// ─── Display ──────────────────────────────────────────────────────────────────

function daysSince(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (isNaN(d)) return null;
  return Math.floor((Date.now() - d.getTime()) / 86400000);
}

function staleFlag(candidate) {
  const days = daysSince(candidate.last_contact);
  if (days === null) return `${DIM}no contact logged${RESET}`;
  if (days > 14) return `${RED}${days}d ago — follow up!${RESET}`;
  if (days > 7)  return `${YELLOW}${days}d ago${RESET}`;
  return `${GREEN}${days}d ago${RESET}`;
}

function printDashboard(candidates) {
  const byStage = {};
  for (const s of STAGES) byStage[s] = [];

  for (const c of candidates) {
    const stage = (c.stage || 'identified').toLowerCase();
    if (!byStage[stage]) byStage[stage] = [];
    byStage[stage].push(c);
  }

  console.log('\n' + BOLD + '━'.repeat(70) + RESET);
  console.log(BOLD + BLUE + '  VAR Channel Pipeline Status' + RESET);
  console.log(BOLD + '━'.repeat(70) + RESET);
  console.log();

  // ── Summary bar ──
  const active = (byStage['active'] || []).length;
  const inFlight = ['outreach','negotiating'].reduce((n, s) => n + (byStage[s] || []).length, 0);
  const building = ['identified','researched','qualified'].reduce((n, s) => n + (byStage[s] || []).length, 0);
  const bench    = (byStage['hold'] || []).length;
  const passed   = (byStage['pass'] || []).length;

  console.log(
    `  ${GREEN}${BOLD}Active:${RESET}  ${active}   ` +
    `${CYAN}${BOLD}In flight:${RESET}  ${inFlight}   ` +
    `${YELLOW}${BOLD}Building:${RESET}  ${building}   ` +
    `${DIM}Hold: ${bench}   Pass: ${passed}${RESET}`
  );
  console.log();

  // ── Per-stage detail ──
  for (const stage of STAGES) {
    const list = byStage[stage] || [];
    if (!list.length && ['hold','pass'].includes(stage)) continue;

    const col = stageColour(stage);
    const skill = STAGE_SKILL[stage];
    const header = `${col}${BOLD}${stage.toUpperCase()}${RESET}` +
                   `  ${DIM}(${list.length} candidate${list.length !== 1 ? 's' : ''} · next skill: ${skill})${RESET}`;
    console.log('  ' + header);

    if (!list.length) {
      console.log(`  ${DIM}  — none${RESET}`);
    } else {
      for (const c of list) {
        const score  = c.score ? `  score: ${c.score}/39` : '';
        const rec    = c.recommendation ? `  ${DIM}[${c.recommendation}]${RESET}` : '';
        const owner  = c.owner ? `  ${DIM}owner: ${c.owner}${RESET}` : '';
        const stale  = staleFlag(c);
        const action = c.next_action ? `\n      ${CYAN}→ ${c.next_action}${RESET}` : '';

        console.log(`    ${BOLD}${c.company || c.name}${RESET}${score}${rec}${owner}`);
        console.log(`      Last contact: ${stale}${action}`);
      }
    }
    console.log();
  }

  // ── Overdue follow-ups ──
  const overdue = candidates.filter(c => {
    const days = daysSince(c.last_contact);
    return days !== null && days > 14 && !['hold','pass'].includes((c.stage||'').toLowerCase());
  });

  if (overdue.length) {
    console.log('  ' + RED + BOLD + `⚠  ${overdue.length} overdue follow-up${overdue.length > 1 ? 's' : ''} (>14 days):` + RESET);
    overdue.forEach(c => console.log(`    ${RED}· ${c.company || c.name}${RESET}  ${DIM}${c.stage}${RESET}`));
    console.log();
  }

  console.log(BOLD + '━'.repeat(70) + RESET);
  console.log(DIM + `  Generated: ${new Date().toISOString().replace('T',' ').slice(0,19)}` + RESET + '\n');
}

// ─── Sample data writer ───────────────────────────────────────────────────────

function writeSample(outPath) {
  const sample = [
    {
      company: 'Evolution Systems',
      stage: 'outreach',
      score: 34,
      recommendation: 'Pursue (high)',
      last_contact: new Date(Date.now() - 6 * 86400000).toISOString().split('T')[0],
      next_action: 'Send day-5 follow-up email',
      owner: 'Sarah Chen',
    },
    {
      company: 'DMS Flow Measurement',
      stage: 'researched',
      score: null,
      recommendation: null,
      last_contact: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
      next_action: 'Run var-qualification',
      owner: 'James Park',
    },
    {
      company: 'Actemium (VINCI Energies)',
      stage: 'negotiating',
      score: 37,
      recommendation: 'Pursue (high)',
      last_contact: new Date(Date.now() - 20 * 86400000).toISOString().split('T')[0],
      next_action: 'Send revised partnership terms',
      owner: 'Sarah Chen',
    },
    {
      company: 'Industrial IT Systems',
      stage: 'qualified',
      score: 22,
      recommendation: 'Hold',
      last_contact: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
      next_action: 'Monitor — revisit in Q3',
      owner: 'James Park',
    },
    {
      company: 'Metra SAS',
      stage: 'identified',
      score: null,
      recommendation: null,
      last_contact: null,
      next_action: 'Run var-research',
      owner: null,
    },
    {
      company: 'PEAKE',
      stage: 'pass',
      score: 8,
      recommendation: 'Pass',
      last_contact: new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0],
      next_action: null,
      owner: null,
    },
  ];

  fs.writeFileSync(path.resolve(outPath), JSON.stringify(sample, null, 2), 'utf8');
  console.log(`${GREEN}Sample pipeline written to ${outPath}${RESET}`);
  console.log(`${DIM}Edit it, then run: node tools/pipeline-status.js --json ${outPath}${RESET}\n`);
}

// ─── Entry point ──────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
  Usage:
    node tools/pipeline-status.js                        Read from .agents/pipeline/*.md
    node tools/pipeline-status.js --dir <path>           Read from custom directory
    node tools/pipeline-status.js --json <file.json>     Read from JSON file
    node tools/pipeline-status.js --sample <file.json>   Write a sample JSON file to get started

  JSON schema (array of candidates):
    [
      {
        "company": "Acme Solutions",
        "stage": "outreach",          // identified | researched | qualified | outreach | negotiating | active | hold | pass
        "score": 34,                  // weighted score from var-scorer.js (0–39)
        "recommendation": "Pursue (high)",
        "last_contact": "2026-03-20", // ISO date
        "next_action": "Send day-5 follow-up",
        "owner": "Sarah Chen"
      }
    ]
  `);
  process.exit(0);
}

if (args.includes('--sample')) {
  writeSample(args[args.indexOf('--sample') + 1] || 'pipeline.json');
  process.exit(0);
}

let candidates = [];

if (args.includes('--json')) {
  candidates = loadFromJSON(args[args.indexOf('--json') + 1]);
} else {
  const dir = args.includes('--dir')
    ? args[args.indexOf('--dir') + 1]
    : path.join(process.cwd(), '.agents', 'pipeline');
  candidates = loadFromDirectory(dir);
}

if (!candidates.length) {
  console.log(`\n${YELLOW}No pipeline data found.${RESET}`);
  console.log(`${DIM}Generate sample data:  node tools/pipeline-status.js --sample pipeline.json${RESET}`);
  console.log(`${DIM}Then view it:          node tools/pipeline-status.js --json pipeline.json${RESET}\n`);
  process.exit(0);
}

printDashboard(candidates);
