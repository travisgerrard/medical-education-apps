#!/bin/bash
echo "Verifying all lesson pages exist..."
sections=(
  "what-are-anxiety-depression/introduction"
  "what-are-anxiety-depression/what-is-anxiety"
  "what-are-anxiety-depression/what-is-depression"
  "what-are-anxiety-depression/anxiety-depression-together"
  "what-are-anxiety-depression/what-causes-them"
  "what-are-anxiety-depression/goals-of-care"
  "symptoms-self-checks/introduction"
  "symptoms-self-checks/common-symptoms-anxiety"
  "symptoms-self-checks/common-symptoms-depression"
  "symptoms-self-checks/panic-attacks"
  "symptoms-self-checks/sleep-energy-concentration"
  "symptoms-self-checks/self-check-questionnaires"
  "when-to-get-help/introduction"
  "when-to-get-help/when-to-talk-clinician"
  "when-to-get-help/warning-signs"
  "when-to-get-help/thinking-about-self-harm"
  "when-to-get-help/supporting-loved-one"
  "when-to-get-help/urgent-evaluation"
  "therapy-options/introduction"
  "therapy-options/what-is-therapy"
  "therapy-options/cbt-act-types"
  "therapy-options/therapy-duration"
  "therapy-options/finding-affording-care"
  "therapy-options/therapy-not-working"
  "medicines/introduction"
  "medicines/how-antidepressants-work"
  "medicines/ssris-snris"
  "medicines/other-options"
  "medicines/side-effects"
  "medicines/starting-switching-stopping"
  "shared-decision-making/introduction"
  "shared-decision-making/who-benefits-most"
  "shared-decision-making/choosing-treatment"
  "shared-decision-making/week-by-week"
  "shared-decision-making/adjusting-treatment"
  "shared-decision-making/duration-tapering"
  "exercise-movement/introduction"
  "exercise-movement/exercise-types"
  "exercise-movement/how-much-exercise"
  "exercise-movement/starting-unmotivated"
  "exercise-movement/safety-tips"
  "exercise-movement/tracking-progress"
  "daily-skills/introduction"
  "daily-skills/breathing-grounding"
  "daily-skills/worry-management"
  "daily-skills/behavioral-activation"
  "daily-skills/sleep-routines"
  "daily-skills/substances-mood"
  "working-with-care-team/introduction"
  "working-with-care-team/diagnosis"
  "working-with-care-team/follow-up-care"
  "working-with-care-team/tracking-symptoms"
  "working-with-care-team/talking-about-medicines"
  "working-with-care-team/staying-well"
)

missing=0
for section in "${sections[@]}"; do
  file="apps/anxiety-depression/pages/$section/index.mdx"
  if [ ! -f "$file" ]; then
    echo "❌ MISSING: $file"
    missing=$((missing + 1))
  fi
done

if [ $missing -eq 0 ]; then
  echo "✅ All 54 lesson pages verified!"
else
  echo "⚠️  Found $missing missing pages"
fi
