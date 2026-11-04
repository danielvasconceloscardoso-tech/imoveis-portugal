# Visual check (prompt 77 §2)

`scripts/visual-check.mjs` builds the site, screenshots a fixed list of pages and compares each shot, pixel by pixel, with the approved look in `baseline/`. Run it after the checks and the build, before every push to main.

## What it checks

- **Pages:** home on all six editions (`home-lu`, `home-fr`, `home-ch`, `home-br`, `home-us`, `home-il`), the map (`map`), the Gondomar card (`gondomar`), the /arrow pins (`arrow`), Closer than you think (`closer`), the simulator (`simulator`), the Concierge (`concierge`) and Maré (`mare`).
- **Sizes:** desktop 1440×900 and phone 390×844 (touch, 2x, saved at 1x). Each shot is the first screen plus one scroll: 1440×1800 and 390×1688 at most.
- **Stable shots:** reduced motion, no transitions or animations, the hero film hidden (its poster shows), live clocks masked in magenta, fonts loaded, external hosts blocked (beehiiv, Tally, analytics), a fixed wait after the map canvas appears.
- **Pass:** at most 0.5% of pixels differ, 3% on the three map pages (WebGL in software varies a little, mostly pin labels).

## How to run

From the repo root:

```
node scripts/visual-check.mjs                  # build (WORKERS_CI_BRANCH=main) into a temp folder, shoot, compare
node scripts/visual-check.mjs --dist <dir>     # use an existing build instead
node scripts/visual-check.mjs --only home-us,map
```

A full run takes about two minutes (build 45 s, shots 75 s). It prints a table (page, size, % pixels different, pass/fail) and exits 1 if any shot fails or has no baseline. Diff images of the pages that differ go to `ops/snapshots/diff/` (gitignored): the baseline in grey, the changes in red.

## When a prompt changes the look on purpose

1. Run the check; the changed pages fail.
2. Send the operator before-and-after screenshots (the baseline PNG and the new one, with the diff image).
3. Only after his yes: `node scripts/visual-check.mjs --update` (add `--only <names>` to update just those pages), then commit `ops/snapshots/baseline/` with the change.

`--baseline <dir>` points the check (or `--update`) at another folder, for testing the script itself.
