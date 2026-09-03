#!/usr/bin/env bash
#
# Owensboro Home Expo — show date updater
# ---------------------------------------
# Show dates appear in page copy, page titles, meta descriptions and structured
# data across every HTML file. Rather than hunting them down by hand, edit the
# NEW_* values below and run:
#
#     ./update-dates.sh
#
# It rewrites every occurrence in one pass and prints a summary. Run it from
# this directory. A backup of each changed file is left as <file>.bak until you
# are happy with the result (delete them with: rm -f *.bak assets/js/*.bak).

set -euo pipefail
cd "$(dirname "$0")"

# ---------------------------------------------------------------------------
# 1. CURRENT values — what is in the files right now. Only change these if you
#    have already run this script once and are updating again.
# ---------------------------------------------------------------------------
OLD_RANGE="March 13–14, 2027"      # en dash, as used in headings and titles
OLD_SAT_DATE="March 13"
OLD_SUN_DATE="March 14"
OLD_SAT_HOURS_LONG="10:00 AM – 5:00 PM"
OLD_SUN_HOURS_LONG="11:00 AM – 4:00 PM"
OLD_SAT_HOURS_SHORT="10 AM – 5 PM"
OLD_SUN_HOURS_SHORT="11 AM – 4 PM"
OLD_YEAR="2027"
OLD_DEADLINE="February 12, 2027"
OLD_ISO_START="2027-03-13T10:00"
OLD_ISO_END="2027-03-14T16:00"
OLD_ISO_COUNTDOWN="2027-03-13T10:00:00-06:00"

# ---------------------------------------------------------------------------
# 2. NEW values — edit these.
#    Keep the same punctuation style (en dash "–" in ranges and hours).
# ---------------------------------------------------------------------------
NEW_RANGE="March 13–14, 2027"
NEW_SAT_DATE="March 13"
NEW_SUN_DATE="March 14"
NEW_SAT_HOURS_LONG="10:00 AM – 5:00 PM"
NEW_SUN_HOURS_LONG="11:00 AM – 4:00 PM"
NEW_SAT_HOURS_SHORT="10 AM – 5 PM"
NEW_SUN_HOURS_SHORT="11 AM – 4 PM"
NEW_YEAR="2027"
NEW_DEADLINE="February 12, 2027"
# Structured data + countdown. Use -06:00 for US Central Daylight Time (March).
NEW_ISO_START="2027-03-13T10:00"
NEW_ISO_END="2027-03-14T16:00"
NEW_ISO_COUNTDOWN="2027-03-13T10:00:00-06:00"

# ---------------------------------------------------------------------------
FILES=(index.html why-attend.html vendors.html exhibit.html media.html contact.html assets/js/expo-data.js)

# Order matters: longest / most specific patterns first so they are not
# partially consumed by a shorter one.
PAIRS=(
  "$OLD_ISO_COUNTDOWN|$NEW_ISO_COUNTDOWN"
  "$OLD_ISO_START|$NEW_ISO_START"
  "$OLD_ISO_END|$NEW_ISO_END"
  "$OLD_DEADLINE|$NEW_DEADLINE"
  "$OLD_RANGE|$NEW_RANGE"
  "$OLD_SAT_HOURS_LONG|$NEW_SAT_HOURS_LONG"
  "$OLD_SUN_HOURS_LONG|$NEW_SUN_HOURS_LONG"
  "$OLD_SAT_HOURS_SHORT|$NEW_SAT_HOURS_SHORT"
  "$OLD_SUN_HOURS_SHORT|$NEW_SUN_HOURS_SHORT"
  "$OLD_SAT_DATE|$NEW_SAT_DATE"
  "$OLD_SUN_DATE|$NEW_SUN_DATE"
  "$OLD_YEAR|$NEW_YEAR"
)

changed=0
for file in "${FILES[@]}"; do
  [ -f "$file" ] || { echo "  skip (missing): $file"; continue; }
  cp "$file" "$file.bak"
  for pair in "${PAIRS[@]}"; do
    old="${pair%%|*}"; new="${pair#*|}"
    [ "$old" = "$new" ] && continue
    python3 - "$file" "$old" "$new" <<'PY'
import sys
path, old, new = sys.argv[1], sys.argv[2], sys.argv[3]
with open(path, encoding='utf-8') as fh:
    text = fh.read()
with open(path, 'w', encoding='utf-8') as fh:
    fh.write(text.replace(old, new))
PY
  done
  if cmp -s "$file" "$file.bak"; then
    rm -f "$file.bak"
    echo "  unchanged: $file"
  else
    changed=$((changed + 1))
    echo "  updated:   $file  (backup at $file.bak)"
  fi
done

echo
if [ "$changed" -eq 0 ]; then
  echo "Nothing changed — the NEW_* values still match the OLD_* values."
  echo "Edit section 2 of this script, then run it again."
else
  echo "Done: $changed file(s) updated."
  echo "Check the site, then remove the backups:  rm -f *.bak assets/js/*.bak"
  echo "Remember to copy the NEW_* values into the OLD_* block for next time."
fi
