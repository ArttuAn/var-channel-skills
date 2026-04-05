#!/usr/bin/env bash
# validate-skills.sh — checks that all skill files meet the required structure

set -euo pipefail

SKILLS_DIR="skills"
ERRORS=0
CHECKED=0

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

REQUIRED_SECTIONS=(
  "## Trigger"
  "## Inputs"
  "## Procedure"
  "## Output"
  "## Handoff"
  "## Limitations"
)

echo "Validating skills in $SKILLS_DIR/"
echo "---"

for file in "$SKILLS_DIR"/*.md; do
  [ -f "$file" ] || continue
  skill_name=$(basename "$file")
  file_errors=0

  # Check required sections
  for section in "${REQUIRED_SECTIONS[@]}"; do
    if ! grep -q "^${section}" "$file"; then
      echo -e "${RED}FAIL${NC} $skill_name — missing section: $section"
      ((file_errors++)) || true
    fi
  done

  # Check handoff block
  if ! grep -q "next_skill:" "$file"; then
    echo -e "${RED}FAIL${NC} $skill_name — Handoff block missing 'next_skill:' field"
    ((file_errors++)) || true
  fi

  # Check for confidence level usage
  if ! grep -qiE "(high|medium|low)" "$file"; then
    echo -e "${YELLOW}WARN${NC} $skill_name — no confidence levels (high/medium/low) found"
  fi

  # Check file is not empty
  if [ ! -s "$file" ]; then
    echo -e "${RED}FAIL${NC} $skill_name — file is empty"
    ((file_errors++)) || true
  fi

  if [ "$file_errors" -eq 0 ]; then
    echo -e "${GREEN}PASS${NC} $skill_name"
  fi

  ((ERRORS += file_errors)) || true
  ((CHECKED++)) || true
done

echo "---"
echo "Checked: $CHECKED skill(s)"

if [ "$ERRORS" -gt 0 ]; then
  echo -e "${RED}$ERRORS error(s) found. Fix before opening a PR.${NC}"
  exit 1
else
  echo -e "${GREEN}All skills valid.${NC}"
  exit 0
fi
