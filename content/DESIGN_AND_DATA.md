# Design and data: one rule for everything we build (operator, 3 Nov 2026)

Collect data like the best data companies. Look and behave like Apple, Claridge's and Belmond. The two never conflict: the more beautiful and useful a moment is, the more people give.

## Design: Steve Jobs, Claridge's, Belmond
1. **Remove until it hurts.** One idea per screen, one primary action, nothing decorative. If a feature needs explaining, redesign it.
2. **Photography does the selling:** real, full-bleed, warm light; never stock clichés, never collages.
3. **Craft in the details:** typography (Playfair Display headings, Manrope text), generous white space, ivory and the green used sparingly, motion 200–300 ms with soft springs, perfect on a phone first.
4. **Service, not software:** the voice of a great hotel concierge: brief, warm, discreet, anticipating. No exclamation marks, no emojis, no hype, no pop-ups, no countdowns.
5. **Quiet luxury:** no badges, no gamified noise, no red alerts. Delight comes from the place, the photo, the fact you didn't know.

## Data: instrument everything, ask for little
1. **Every feature is designed to produce a signal.** Before building anything, write the data point it creates (field, event, or both). No signal, no feature.
2. **Capture behaviour, not forms:** taps, swipes, sliders, saves, shares, time on a place, the path through the Concierge. A question is asked only when the answer can't be inferred.
3. **Progressive profile:** never ask what we already know; each answer rewarded at once (prompt 63).
4. **One event schema** for the whole site (event name, page, place, region, budget band, origin, step, timestamp), first-party, cookie-free, stored in the anonymised store; personal fields only in the consented profile. Never in the repo.
5. **Growth loops built in:** every result is shareable as a beautiful card (quiz, house value, O meu Portugal), every share brings a new visitor, every visitor adds data.
6. **Test and learn:** two versions of a key moment when traffic allows; keep the one that gets more completion; log it in ops/METRICS.md.
7. **Within the law, always:** consent design in prompt 63 §5; aggregates of 10 or more; no per-lead fees (D6). Valid data is the asset a buyer pays for.

## The test before shipping anything
1. Would it look at home in an Apple keynote or a Belmond brochure?
2. Does it give the reader something good in under five seconds?
3. What does it teach us about the buyer?
If any answer is no, it is not ready.
