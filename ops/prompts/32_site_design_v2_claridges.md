# Prompt 32: site design v2, "the Claridge's pass"

CEO, 26 Oct 2026. Decision D59. The operator wants the site to look much more beautiful, at the level of Claridge's own website: https://www.maybourne.com/en/hotels/claridges.

**This is a visual and copy pass, not a rebuild.**
- Every feature stays and works the same: the map (all 308 municipalities, search, parishes, budget field, place card), the buy and sell paths, the FAQ, the simulators, the partner and showcase pages.
- Build it on a new branch, `design-v2`, with its own preview (expected: `design-v2-imoveis-portugal.geralportugalimoveis.workers.dev`).
- The frozen v1 (D55) stays untouched. The operator compares and decides.

Nothing is published or merged without his "go".

## The three rules that decide everything

1. **One to three sentences per block.** At most 45 words, often fewer.
2. **One action per block.** One button or one link, never two.
3. **A lot of space.** When in doubt, remove something and add air.

## 1. Study the reference first (one page: design/REFERENCE_CLARIDGES.md)

1. **Capture the reference.** Open the Claridge's page with Playwright, desktop 1440 and mobile 390. Screenshot the full page and each section; record the scroll on video.
2. **Write down, with measurements, what makes it feel like Claridge's:**
   - section spacing and heights;
   - type scale and line length;
   - image ratios and how photographs alternate with text;
   - words per block;
   - button and link styles, hover and scroll motion;
   - the header, the booking bar, the footer.
3. **Do the same quickly for onemark.pt** (D50, our identity).
4. **Rules for using them:**
   - principles only: never their text, logos, crest, fonts, photographs or code;
   - our identity stays D50 (white, near-black, Playfair Display and Manrope, deep green #2F5D50 as the only accent);
   - no Bodoni, no brass, no Art Deco ornament: the operator rejected them.

## 2. The home page

**Hero.** A slow, silent, looping film of Portugal (the coast, the light) behind our wordmark, a short H1 and one line.
- Licensed clips only (Pexels or Pixabay), graded warm.
- Under 3 MB, with a poster image so the page paints fast.
- A still image when the device asks for reduced motion.

**The path bar** (our version of Claridge's Stay · Dining · Spa booking bar), on one line under the film:
- "I live in [country]";
- "I want to [buy / sell]";
- "[budget or value, in the reader's currency]";
- "Start", which opens the path at the right station.

It uses the path's existing logic; nothing new behind it.

**Sections, in this order.** Each is a headline, one to three sentences and one action.

| # | Section | Notes |
| --- | --- | --- |
| 1 | Hero film and path bar | |
| 2 | What we are | One large photograph beside it |
| 3 | The map | Framed like a feature: the frozen v1 component, restyled around it, not inside it |
| 4 | Three places: Lisbon, Porto, the coast | Equal cards: a photograph, one line, a link to the map area |
| 5 | Buy and Sell | Two large cards |
| 6 | The questions people ask most | Five at most, each opening its answer |
| 7 | Portugal in six photographs | A mosaic of mixed sizes, no text on the photos |
| 8 | Ten years of official prices | One line and one chart |
| 9 | The newsletter | The email field and one button |
| 10 | Footer | Columns (Buy, Sell, Map, Questions, Partners), the six editions, the three languages, social links, legal pages |

**No team or partner panel on the home page.** "Your team for this purchase" stays inside the path stations only (D54).

**Rhythm:**
- Large full-bleed photographs alternate with calm text blocks.
- Light grey bands (one tone, close to white) separate some sections.
- Section spacing is taken from the Claridge's measurements, never tighter.
- Text columns no wider than about 60 characters.

**Photographs:**
- real places, full-bleed, served responsive (AVIF and WebP, three sizes, lazy below the fold);
- Unsplash or Pexels, checked to show the place named, no credit on the image, listed on /credits;
- historic photographs only if public domain (Wikimedia), credited on /credits;
- never: keys in a hand, handshakes, smiling couples, AI people, a generic beach named after a place it isn't.

**Motion:** slow and quiet.
- Fade-up as a section enters; a very slow zoom on large images.
- No bounce, and nothing moves while someone is reading.
- Everything respects reduced motion.

## 3. Copy: no AI slop at all

The copy is where the site is judged first. Start from the existing copy deck and rewrite each block to the three rules above.

**The test for every sentence.** Would a well-mannered person say it out loud to a client across a table? If not, rewrite it or cut it.

**Each sentence:**
- states one thing, in under 20 words where possible;
- is concrete: a place, a number, a fact, or what the reader can do next;
- if it uses a figure, carries that figure's source, as everywhere on the site.

**Headlines:**
- statements of at most 8 words;
- never questions (FAQ questions are the exception);
- never two phrases joined by a colon.

**Banned, in all three languages,** on top of VOICE.md and the scorecard:
- words: discover, explore, unlock, embark, journey, elevate, curated, tailored, bespoke, seamless, effortless, unparalleled, world-class, nestled, boasts, dream home, hidden gem, luxury, premium, exclusive, private, paradise, passionate, and their PT and FR equivalents;
- shapes: "Whether you're…", "From X to Y", "Imagine…", "Not just X, but Y", "More than a…", "In today's…", three adjectives in a row, exclamation marks, em-dashes, rhetorical questions, emojis, labels above headings (VOICE.md rule 5, even though Claridge's uses them).

**Links say exactly what they open:** "See the map", "Start", "Read the answer", "Sign up".

**Register.** A good concierge speaks little and precisely. Examples:
- Weak: "Discover your dream home in Portugal with our seamless, tailored guidance." Better: "Ten years of official prices, for every municipality."
- Weak: "Whether you're buying or selling, we're with you every step of the journey." Better: "Buying or selling from abroad, one step at a time."

**Every copy change is a proposal.** Put each block, before and after, in PT, EN and FR, in `design/COPY_V2.md`, and send it with the screenshots. The operator approves the words before they reach any other page.

**Gate.** Extend `scripts/check-content.mjs` to fail on any banned word or shape above, any sentence over 25 words, any home block over 45 words, and any block with more than one action.

## 4. Order of work

1. **The home page first,** in PT, desktop and mobile. Send:
   - v1 and v2 side by side;
   - the preview link;
   - a 20-second scroll recording of each;
   - `design/COPY_V2.md` for the home.

   Wait for the go.
2. **After the go,** the same pass on:
   - the path pages, the area pages, the FAQ;
   - the partner and showcase pages, the demo pages;
   - the legal pages.

   Then EN and FR.
3. **Checks on every page:**
   - Lighthouse mobile at least 95, no layout shift;
   - map click test 308/308;
   - the path works without JavaScript;
   - `check-content.mjs` and `check-parity.mjs` pass.

   Report v1 and v2 in one table.
4. **Do not merge.** If the operator prefers v1 for any page, that page stays v1.

## Allowlist

`maybourne.com`, `*.maybourne.com`, `claridges.co.uk`, `*.claridges.co.uk`. If their images come from another CDN, report the domain.
