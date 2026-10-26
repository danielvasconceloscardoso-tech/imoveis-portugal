# Reference study: Claridge's and OneMark (prompt 32 §1, D59)

Captured 26 Oct 2026 with Playwright at desktop 1440 × 900 and mobile 390 × 844, full page, every section and a scroll recording (scripts/design/reference.mjs). The captures stay out of the repo: they are someone else's photographs and text, and we use principles only. Our identity stays D50 (white, near-black, Playfair Display and Manrope, deep green #2F5D50 as the only accent). No Bodoni, brass or Art Deco ornament.

## Claridge's (maybourne.com/en/hotels/claridges)

### Measurements

| What | Desktop 1440 | Mobile 390 |
| --- | --- | --- |
| Page length | 11,149 px, 13 sections | 13,076 px |
| Header | 147 px, fixed, transparent over the hero: brand line, then one row of 9 links and a filled "Book" button | 72 px, fixed |
| Hero | 720 px, full-bleed 16:9 photograph; a small caps label, a 42 px serif line of 4 words, three outlined buttons (Stay · Dining · Spa) | 735 px, 9:16 portrait crop |
| Section height | 560 to 940 px; median about 720 px | 600 to 1,370 px |
| Space between sections | none added: each section is its own tall block with the space inside it | same |
| Display type | serif 58 px (one section 80 px), weight 400, 1 to 6 words per heading | 34 px |
| Labels above headings | 22 px small caps sans, letter-spacing about 0.1 em | 16 px |
| Body | 16 px, line height 24 px (1.5), paragraphs 500 to 670 px wide = 53 to 71 characters a line | 16 px |
| Words per block | 23 to 45 words, one block per section (one exception at 55) | same |
| Actions per section | 1 (three sections with a row of 2 to 3 cards, one link each) | same |
| Images | square or 4:5 portrait pairs, one large (about 708 px) beside or behind one small (about 280 to 400 px), overlapping; one 1.96:1 wide image | full width or 4:5 |
| Buttons | 44 to 47 px high, 1 px outline, 4 px radius, 15 px uppercase sans, letter-spacing 1.4 px, padding 11 × 28 px | same |
| Motion | colour and opacity transitions 0.15 to 0.3 s; image transforms 0.5 to 1 s, ease cubic-bezier(0.4, 0, 0.2, 1); nothing bounces | same |
| Footer | a pale band, five link columns, newsletter field with one button, social icons, legal row | stacked |

### What makes it feel like Claridge's

1. **Room.** Each section is a tall block (about 720 px on desktop) holding one idea. Nothing is squeezed: the space is inside the section, not between cards.
2. **Two voices of type.** A large, light serif (58 px, weight 400) for the few words that matter; a small sans for everything else. Nothing in between.
3. **Short blocks.** One paragraph of 23 to 45 words, never two, set at 53 to 71 characters a line.
4. **One action.** One outlined button or one underlined link per section.
5. **Photographs in pairs.** A large photograph with a smaller one overlapping it, alternating left and right down the page, so the eye zig-zags between picture and text.
6. **The booking bar.** Three choices on the hero (Stay · Dining · Spa) say what the visitor can do before any scrolling.
7. **Quiet motion.** Short fades for colour, slower ones (0.5 to 1 s) for pictures, one easing curve everywhere.

### What we do not take

Their small caps labels above headings (our VOICE.md rule 5 forbids labels), the crest, the gold, the ornament on the newsletter band, their fonts, words, photographs and code.

## OneMark (onemark.pt), our identity reference (D50)

| What | Desktop 1440 | Mobile 390 |
| --- | --- | --- |
| Hero | 900 px, full-height photograph with a centred wordmark and one line; a ticker of their activities at the foot | 675 px |
| Display type | Playfair Display 92 px, weight 400, headings of 6 to 8 words that read as one sentence ending in a full stop | 36 px |
| Body | 16 px, line height 28 px (1.75), 426 to 432 px wide = 47 to 48 characters a line | same |
| Section padding | 48 px top and bottom inside sections of 580 to 1,500 px | same |
| Numbered points | "01 · 02 · 03", large serif numerals, a short label and 18 to 23 words each | same |
| Buttons | small filled near-black pills, 12 to 14 px uppercase sans with a small arrow | same |
| Closing band | near-black section with a large white serif statement | same |
| Motion | opacity and transform 0.55 s, cubic-bezier(0.16, 1, 0.3, 1) | same |

What we keep from OneMark (already in D50): the white page, the near-black text, the very large Playfair statements ending in a full stop, numbered points, narrow text columns, one dark closing band.

## Our rules for design v2 (from both)

| Rule | Value |
| --- | --- |
| Section height (desktop) | at least 640 px, padding 128 px top and bottom (from 720 px Claridge's sections); mobile at least 88 px |
| Display type | Playfair Display 400: H1 64 to 72 px, H2 52 px desktop; 36 and 32 px mobile |
| Body | Manrope 17 px, line height 1.65, column max 60 characters (about 34 rem) |
| Words | 1 to 3 sentences, at most 45 words per block; headlines at most 8 words, a statement with a full stop |
| Actions | one per block: an outlined button 48 px high, 1 px near-black, 2 px radius, Manrope 14 px uppercase, letter-spacing 0.12 em; or an underlined link |
| Photographs | full-bleed or large-plus-small pairs, ratios 16:9, 4:5 and 1:1, alternating sides |
| Bands | one light grey #F4F4F2 band for alternate sections, one near-black band for the newsletter |
| Motion | fade-up 0.8 s on entering, image zoom 1.00 → 1.04 over 12 s, easing cubic-bezier(0.16, 1, 0.3, 1); off with reduced motion |
| Hero | full-height film or photograph, wordmark, H1 of at most 8 words, one line, then the path bar in place of the booking bar |
