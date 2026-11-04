# Prompt 69: The Concierge in three steps, and IMT explained where the number is

Operator, 4 Nov 2026, after a friend tested the site on desktop in English:
- "Não gostei muito do concierge."
- "Devia explicar o cálculo do IMT."
- On step 4, "When do you plan to buy?" above a call calendar: "Não percebo esta parte."
- On step 9, "When suits you best? (Lisbon time)": "Este when está estranho."
- Going back from step 7: "dá-me este bug" (steps 6 and 7 drawn on top of each other).

The operator: the translation is half broken, and the IMT explanation exists but is not easy to reach.

Goes live under D67. Follow content/METHOD.md (rule 16). Record it as the next free D number.

## What is wrong (found in the repo)
1. **`c.when` means two different things.**
   - PT: "Quando prefere a videochamada?"
   - EN and FR: "When do you plan to buy?" / "Quand pensez-vous acheter ?"
   
   It sits above the day-and-time picker. check-parity only checks that keys exist, not what they mean.
2. **`c.window` ("When suits you best? (Lisbon time)") asks for the time a second time,** after the picker has already asked.
3. **Eleven steps.** Several ask what we already know (the place or project they came from, the budget set on the map) or what can wait until after the call is booked (NIF, timeline).
4. **The Back button leaves the previous step on screen.**
5. **IMT:**
   - the simulator applies 7.5% for non-residents correctly (sims.ts, `pt-imt-nonresident-flat`, CIMT art. 17.º n.º 10, DL 97/2026);
   - but the explanation and the refund routes (`pt-imt-nonresident-exceptions`) live only in the FAQ and the journeys, not next to the number.

## The five questions (METHOD.md)
1. **Feel:** "I asked once, and someone has it in hand."
2. **Arrival:** the sheet opens on what they came for, already filled in (the place, the project, the budget), with one line: "Um consultor qualificado liga-lhe à hora que escolher."
3. **Hero: three steps.**
   1. **What can we help with?** Pre-filled from context, so one tap changes it.
   2. **When can we call you?**
      - One picker: a day, then up to three times.
      - Shown in the reader's own time zone (browser `Intl`, or the edition's city as fallback), with Lisbon in small type underneath.
      - It replaces both `c.when` and `c.window`.
   3. **How do we reach you?** Email or phone, plus the language of the call.
   
   Then the confirmation. The other questions (purpose, when they plan to buy, NIF, financing, where) move to an optional "Ajude o consultor a preparar a chamada (30 s)" after the confirmation. Their answers keep feeding the profile; nothing we already know is asked again.
4. **The next question, answered where it arises.**
   - Wherever IMT appears (simulator, concierge result, map card, project card), one tap opens one screen with the reader's own numbers.
   - The screen covers:
     - the non-resident rate: 7.5% of the price;
     - the two refund routes: becoming a Portuguese tax resident within 2 years, or letting the home for housing within 6 months for 36 months in the first 5 years, at capped rents;
     - the resident rate for a primary home, by bracket.
   - Each line carries its source: CIMT art. 17.º n.º 1 a) and n.º 10–12, DL 97/2026, Lei 73-A/2025.
   - Use the facts in facts.csv; describe, never advise.
5. **One more thing,** on that IMT screen, with the reader's price. Worked example to check against: at 300 000 €, a non-resident pays 22 500 €. As a primary home after becoming resident, the IMT is 10 542 €. So 11 958 € comes back on request.

## Also
1. **Fix the Back bug:** one step on screen at a time, in every step, both directions.
2. **Meaning check.** Read every Concierge key in PT, EN and FR side by side, and fix any whose meaning differs (not just missing keys). Then add the side-by-side check to check-parity as a report the CEO reads before each release.
3. **Delete nothing.** Old keys and steps stay in the repo, unused.

## Acceptance (on main, phone and desktop, PT, EN and FR)
1. The Concierge books a call in three steps from the Gondomar card, from a project card and from the simulator, already filled in with what the reader came from.
2. The times show in the reader's own time zone, with Lisbon underneath.
3. Back and forward through every step, in each language: no overlap.
4. Every question means the same thing in PT, EN and FR.
5. Tapping IMT in the simulator at 300 000 € shows 22 500 €, the two refund routes and 11 958 € back, with sources.
6. The checks and the build pass.

## Report
1. The live links.
2. Phone and desktop screenshots of the three steps and the IMT screen in EN.
3. The list of keys whose meaning you fixed.
