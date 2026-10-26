# Prompt 32: site design v2, "the Claridge's pass"

CEO, 26 Oct 2026. Decision D59. The operator wants the site to look much more beautiful, at the level of Claridge's own website: https://www.maybourne.com/en/hotels/claridges.

**This is a visual pass, not a rebuild.**
- Every feature stays and works the same: the map (all 308 municipalities, search, parishes, budget field, place card), the buy and sell paths, the FAQ, the simulators, the team panel, the partner and showcase pages.
- Build it on a new branch, `design-v2`, with its own preview (expected: `design-v2-imoveis-portugal.geralportugalimoveis.workers.dev`).
- The frozen v1 (D55) stays untouched. The operator compares and decides.

Nothing is published or merged without his "go".

## 1. Study the reference first (one page: design/REFERENCE_CLARIDGES.md)

1. **Capture the reference.** Open the Claridge's page with Playwright, desktop 1440 and mobile 390. Screenshot the full page and each section; record the scroll behaviour on video.
2. **Write down what makes it feel like Claridge's,** with measurements:
   - spacing scale and section heights;
   - type scale and line lengths;
   - image ratios and how photographs alternate with text;
   - how much text each block carries;
   - button and link styles, hover and scroll motion;
   - the header and the booking bar;
   - the footer.
3. **Do the same quickly for onemark.pt** (D50, our identity).
4. **Rules for using them:**
   - take principles only: never their text, logos, crest, fonts, photographs or layout files;
   - our identity stays D50 (white, near-black, Playfair Display and Manrope, deep green #2F5D50 as the only accent);
   - no Bodoni, no brass and no Art Deco ornaments: the operator rejected them.

## 2. What we take from Claridge's (CEO reading of the page)

1. **A hero that moves.** A slow, silent, looping film of Portugal: coast and light, with our wordmark, a short H1 and one line under it.
   - Licensed clips only (Pexels or Pixabay), graded warm.
   - Under 3 MB, with a poster image so the page paints fast.
   - A still image when the visitor's device asks for reduced motion.
2. **A "booking bar" for our path.** Claridge's puts Stay · Dining · Spa booking under its film. We put the start of the path there, on one line:
   - "I live in [country]";
   - "I want to [buy / sell]";
   - "[budget or value, in the reader's currency]";
   - a "Start" button that opens the path at the right station.

   It uses the path's existing logic; nothing new behind it.
3. **Rhythm.** Large full-bleed photographs alternate with calm text blocks. Each block has:
   - a short headline;
   - one to three sentences (20–45 words);
   - one action.

   Lots of air between sections. Light grey bands (one tone, close to white) to separate some sections.
4. **Sections on the home page, in this order:**
   1. hero film and path bar;
   2. one paragraph on what we are, beside one large photograph;
   3. the map, framed like a feature (the frozen v1 component, restyled around it, not inside it);
   4. three places as equal cards: Lisbon, Porto, the coast. Each has a photograph, one line and a link to its map area;
   5. the two paths (Buy, Sell) as two large cards;
   6. the questions people ask most;
   7. "Your team for this purchase", quietly;
   8. a mosaic of six photographs of Portugal, mixed sizes;
   9. the data: ten years of official prices, one line and one chart;
   10. the newsletter sign-up with its email field;
   11. a full footer: columns (Buy, Sell, Map, Questions, Partners), the six editions, the three languages, social links, legal pages.
5. **Photographs:**
   - real places, full-bleed, served responsive (AVIF and WebP, three sizes, lazy below the fold);
   - Unsplash or Pexels, checked to show the place named, no credit on the image, listed on /credits;
   - historic photographs only if public domain (Wikimedia), with the credit on /credits.
6. **Motion:** slow and quiet. Fade-up as sections enter, a very slow zoom on large images, no bounce, nothing that moves while the reader is reading. Everything respects reduced motion.
7. **Copy:** the existing copy deck. Shorten blocks to fit the 20–45-word rhythm and send the cuts for approval. No labels above headings (VOICE.md rule 5, even though Claridge's uses them). No banned words; "Explore" and "Discover" are banned, so links say what they open ("See the map", "Read the answer", "Start").

## 3. Order of work

1. **The home page first,** in PT, desktop and mobile. Send screenshots of v1 and v2 side by side, the preview link and a 20-second scroll recording of each. Wait for the go.
2. **After the go,** the same pass on:
   - the path pages, the area pages and the FAQ;
   - the partner and showcase pages, the demo pages;
   - the legal pages.

   Then EN and FR.
3. **Checks on every page:**
   - Lighthouse mobile at least 95, no layout shift;
   - the map click test 308/308;
   - the path works without JavaScript;
   - `node scripts/check-content.mjs` and `scripts/check-parity.mjs` pass.

   Report v1 and v2 numbers in one table.
4. **Do not merge.** If the operator prefers v1 for any page, that page stays v1.

## Allowlist

`maybourne.com`, `*.maybourne.com`, `claridges.co.uk`, `*.claridges.co.uk`. If their images come from another CDN, report the domain.
