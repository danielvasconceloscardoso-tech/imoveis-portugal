# Prompt 77 (urgent, before anything else): restore the home page, and stop going backwards

Operator, 4 Nov 2026, desktop, US edition home: "The hero video of the entrance does not show. Why are we going backwards?"

On his screenshot:
- the hero film is gone (a still frame);
- an empty white box hangs over the hero, under "I live in USA";
- the headline is cut off on the left ("ortugal," / "ing the US.").

## Likely causes (check, don't assume)
1. **548440e1 (19:40):** "Home film after load on fast connections". The film now waits for a speed test, so on the operator's desktop it never starts.
2. **Prompt 70 fixes d2d6fb07, 3e52d5bb and d8ed5d5a:** "calm photo placeholders", "calm home placeholder", menu and header changes. One of them likely left the white box (an empty dropdown or placeholder).
3. **Six prompts merged in a few hours,** mostly tested on a phone on a slow network, with nothing comparing the result to the look the operator had approved.

## 1. Restore, now
1. **The film plays on the home page** of every edition, on desktop and on phones with a normal connection.
   - The poster frame shows at once; the film follows.
   - Only "Save-Data" or reduced motion keep the still.
2. **Remove the empty white box.** Find what it is, and fix its cause.
3. **The headline never leaves the screen** at any width from 320 to 2560 px.
4. **Compare with the last approved state.** Screenshot main against the tag `backup/pre-68-2026-11-04`:
   - home on all six editions;
   - the map, the Gondomar card and /arrow;
   - the simulator and the Concierge;
   - at desktop 1440 px and phone 390 px.
5. **List every visual difference.** Anything no prompt asked for goes back to how it was.

## 2. Never again: a visual check before every push to main
1. **A baseline:** ops/snapshots/baseline/, desktop 1440 and phone 390, covering:
   - home ×6;
   - the map, the Gondomar card and /arrow;
   - Closer than you think;
   - the simulator, the Concierge and Maré.
2. **`node scripts/visual-check.mjs`** builds, screenshots the same pages and compares them with the baseline. Any difference the current prompt did not ask for stops the push.
3. **When a prompt changes the look on purpose:** send the operator before-and-after screenshots. The baseline is updated only after his yes.
4. **Add it to CLAUDE.md rule 14:** the checks, the build, then the visual check, then push.
5. **Every agent pass from now on includes one desktop on a fast connection,** not only phones on slow networks.

## Acceptance
1. The operator's view: US home, desktop, Chrome. The film plays, there is no white box and the headline is whole.
2. Home on all six editions is checked the same way.
3. visual-check runs clean on main.

## Report
1. The cause of each of the three faults, with the commit.
2. The list of unasked-for differences you reverted.
3. Desktop and phone screenshots of the US home.
4. The live link.
