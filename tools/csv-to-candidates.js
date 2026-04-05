#!/usr/bin/env node
/**
 * csv-to-candidates.js
 * Convert a CSV of company names/websites into the standard var-identification
 * candidate table format (Markdown), ready to pass into var-research.
 *
 * Usage:
 *   node tools/csv-to-candidates.js candidates.csv
 *   node tools/csv-to-candidates.js candidates.csv --output candidates.md
 *   node tools/csv-to-candidates.js --help
 *
 * Expected CSV columns (order flexible, matched by header name):
 *   Required: name (or company, company_name)
 *   Optional: website (or url, site), geography (or region, country, location),
 *             specialties (or services, focus), source (or sources),
 *             notes
 *
 * Any unrecognised column is appended to Notes.
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ─── Helpers ──────────────────────────────────────────────────────────────────

const RESET  = '\x1b[0m';
const BOLD   = '\x1b[1m';
const GREEN  = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED    = '\x1b[31m';
const DIM    = '\x1b[2m';

/** Minimal CSV parser — handles quoted fields with commas and newlines */
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') { field += '"'; i++; }
      else if (ch === '"') { inQuotes = false; }
      else { field += ch; }
    } else {
      if (ch === '"') { inQuotes = true; }
      else if (ch === ',') { row.push(field.trim()); field = ''; }
      else if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && next === '\n') i++;
        row.push(field.trim());
        if (row.some(f => f !== '')) rows.push(row);
        row = []; field = '';
      } else { field += ch; }
    }
  }
  if (field || row.length) { row.push(field.trim()); if (row.some(f => f !== '')) rows.push(row); }

  return rows;
}

/** Normalise header names to canonical keys */
const HEADER_MAP = {
  name:         ['name', 'company', 'company_name', 'company name', 'organisation', 'organization'],
  website:      ['website', 'url', 'site', 'web', 'domain'],
  geography:    ['geography', 'region', 'country', 'location', 'geo', 'territory'],
  specialties:  ['specialties', 'specialty', 'services', 'focus', 'expertise', 'categories'],
  source:       ['source', 'sources', 'origin', 'found_via', 'found via'],
  notes:        ['notes', 'note', 'comments', 'comment', 'remarks'],
};

function canonicalise(headers) {
  return headers.map(h => {
    const lower = h.toLowerCase().trim();
    for (const [canon, variants] of Object.entries(HEADER_MAP)) {
      if (variants.includes(lower)) return canon;
    }
    return `_extra_${h}`; // unknown columns
  });
}

/** Pad a string to width for Markdown table alignment */
function pad(str, width) {
  return String(str || '').padEnd(width);
}

function mdTable(rows) {
  if (!rows.length) return '';

  const cols = ['#', 'Company Name', 'Website', 'Geography', 'Specialties', 'Source(s)', 'Notes'];
  const widths = cols.map(c => c.length);

  rows.forEach((r, i) => {
    const cells = [String(i + 1), r.name, r.website, r.geography, r.specialties, r.source, r.notes];
    cells.forEach((c, j) => { widths[j] = Math.max(widths[j], (c || '').length); });
  });

  const header = '| ' + cols.map((c, i) => pad(c, widths[i])).join(' | ') + ' |';
  const divider = '| ' + widths.map(w => '-'.repeat(w)).join(' | ') + ' |';
  const dataRows = rows.map((r, i) => {
    const cells = [String(i + 1), r.name, r.website, r.geography, r.specialties, r.source, r.notes];
    return '| ' + cells.map((c, j) => pad(c || '', widths[j])).join(' | ') + ' |';
  });

  return [header, divider, ...dataRows].join('\n');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);

  if (!args.length || args.includes('--help') || args.includes('-h')) {
    console.log(`
  Usage:
    node tools/csv-to-candidates.js <input.csv>
    node tools/csv-to-candidates.js <input.csv> --output <output.md>

  Expected CSV headers (case-insensitive):
    Required: name
    Optional: website, geography, specialties, source, notes

  Any unknown column is appended to the Notes field.
  Missing fields are filled with [unverified].

  Output: Markdown candidate table in var-identification format.
    `);
    process.exit(0);
  }

  const inputPath = args.find(a => !a.startsWith('--'));
  const outIdx = args.indexOf('--output');
  const outputPath = outIdx !== -1 ? args[outIdx + 1] : null;

  if (!inputPath || !fs.existsSync(path.resolve(inputPath))) {
    console.error(`${RED}Error: File not found — ${inputPath}${RESET}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(path.resolve(inputPath), 'utf8');
  const parsed = parseCSV(raw);

  if (parsed.length < 2) {
    console.error(`${RED}Error: CSV appears empty or has no data rows.${RESET}`);
    process.exit(1);
  }

  const rawHeaders = parsed[0];
  const canonHeaders = canonicalise(rawHeaders);
  const dataRows = parsed.slice(1);

  const extraCols = canonHeaders.filter(h => h.startsWith('_extra_'));
  if (extraCols.length) {
    console.warn(`${YELLOW}Warning: Unknown columns will be appended to Notes: ${extraCols.map(h => h.replace('_extra_', '')).join(', ')}${RESET}`);
  }

  let missing = 0;
  const candidates = dataRows.map((row, i) => {
    const get = (key) => {
      const idx = canonHeaders.indexOf(key);
      return idx !== -1 ? row[idx] || '' : '';
    };

    const name = get('name').trim();
    if (!name) { missing++; return null; }

    // Collect extra column values into notes
    const extraNotes = extraCols
      .map(col => {
        const idx = canonHeaders.indexOf(col);
        const label = rawHeaders[canonHeaders.indexOf(col)];
        return idx !== -1 && row[idx] ? `${label}: ${row[idx]}` : '';
      })
      .filter(Boolean)
      .join('; ');

    const baseNotes = get('notes').trim();
    const notes = [baseNotes, extraNotes].filter(Boolean).join(' | ') || '';

    return {
      name,
      website:     get('website').trim()     || '[unverified]',
      geography:   get('geography').trim()   || '[unverified]',
      specialties: get('specialties').trim() || '[unverified]',
      source:      get('source').trim()      || '[unverified]',
      notes,
    };
  }).filter(Boolean);

  if (!candidates.length) {
    console.error(`${RED}Error: No valid candidates found (all rows missing a name).${RESET}`);
    process.exit(1);
  }

  const runDate = new Date().toISOString().split('T')[0];
  const output = [
    `## VAR Candidate List`,
    ``,
    `**Generated:** ${runDate}  `,
    `**Source file:** ${path.basename(inputPath)}  `,
    `**Total candidates:** ${candidates.length}`,
    ``,
    `> Import into \`var-research.md\` to begin profiling. Verify all \`[unverified]\` fields before outreach.`,
    ``,
    mdTable(candidates),
    ``,
    `---`,
    ``,
    `## Agent Handoff`,
    `\`\`\``,
    `status: ready`,
    `completed:`,
    `  - Imported ${candidates.length} candidates from ${path.basename(inputPath)}`,
    `next_skill: var-research.md`,
    `inputs_for_next:`,
    `  - candidate_list: (table above)`,
    `  - product_category: [fill from var-channel-context.md]`,
    `  - target_vertical: [fill from var-channel-context.md]`,
    `blocked_on:`,
    `\`\`\``,
  ].join('\n');

  if (outputPath) {
    fs.writeFileSync(path.resolve(outputPath), output, 'utf8');
    console.log(`${GREEN}${BOLD}✓ Written to ${outputPath}${RESET}  (${candidates.length} candidates)`);
  } else {
    console.log(output);
  }

  if (missing) {
    console.warn(`\n${YELLOW}Warning: ${missing} row(s) skipped — missing company name.${RESET}`);
  }

  console.log(`\n${DIM}Next step: run var-research on each candidate to build profiles.${RESET}`);
}

main();
