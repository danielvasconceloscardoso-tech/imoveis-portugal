# Imóveis Portugal: the brand on one page (D50, prompt 23)

Editorial, calm and precise, in the register of OneMark Properties, with our own marks. Nothing that looks AI-made.
The check: `node scripts/design/identity-check.mjs` (also run by `scripts/scorecard.mjs`) fails on warm colours,
banned fonts and rounded cards with shadows. Words: content/VOICE.md, checked by `scripts/check-content.mjs`.

## Palette

| Token | Hex | Use |
| --- | --- | --- |
| Paper | #FFFFFF | Every page and card. Never cream, ivory or beige. |
| Ink | #0A0A0A | Headings, text, buttons, rare black bands. |
| Grey | #5F6368 | Body text where ink is too loud, captions, sources. |
| Hairline | #E3E3E3 | Rules and borders, 1 px. No boxes where a rule will do. |
| Green | #2F5D50 | Our one accent, small: the square in the wordmark, markers, focus rings, the selected chip, map scale. |
| Green on black | #9CC4B6 | The same accent on near-black backgrounds. |
| Map scale | #EEF3F1 · #C8D8D1 · #8FAEA2 · #55806F · #2F5D50 | Sequential data only. |

Never: cream, beige, terracotta, coral, peach, orange, brass, gold, purple-to-blue gradients, neon, glass effects.

## Type

- **Playfair Display** (OFL) for headings and numbers, set large: 64–90 px on desktop, weight 400.
- **Manrope** (OFL) for text, navigation and buttons, 16–18 px.
- Small labels in Manrope 600, uppercase, letter-spacing 0.16em.
- Never Inter, DM Sans, Poppins, Space Grotesk, Newsreader, Public Sans or Jost.

## Logo (design/brand/, drawn by `python3 scripts/design/logo.py`)

- **Wordmark:** "Imóveis Portugal" in Playfair Display, with the small green square before it. `wordmark.svg` on white, `wordmark-white.svg` on near-black, `wordmark-plain.svg` where the square would be too small (under 16 px cap height).
- **Monogram:** "IP." on near-black, the full stop in green. Social profile pictures (`avatar-1080.png`) and the favicon (`favicon-512.png`).
- Clear space: the height of the "I" on every side. Never stretch, outline, shadow, recolour or set the wordmark in another font. Never place it on a busy part of a photograph.

## Layout

Huge headings and a lot of white space; numbered sections (01, 02, 03); an editorial two-column directory for partners (label and name on the left, description and website on the right); large photographs with corners of 2 px at most; hairlines instead of boxes; a slow fade at most. Buttons are near-black rectangles with white text; the outline button is near-black on white.

## Photography

Real places in Portugal and real interiors, in natural light, at every budget, full-bleed, no credit on the image. Each photograph shows the place it is named after. Never AI-made people or rooms, keys in a hand, handshakes, smiling couples, or a generic beach named after a place it is not.

## Do and don't

| Do | Don't |
| --- | --- |
| White page, one large serif heading, one line of text, one action | Cards with rounded corners and soft shadows, pill badges, sparkles, emoji rows |
| A number with its source and date under it | A number without a source, or a "three numbers" block |
| Green as a 12 px square or a 2 px focus ring | Green backgrounds, green headings, green gradients |
| "Run your numbers" · "See your area on the map" | "Discover", "explore", "unlock", "elevate", "seamless", rhetorical-question headings, exclamation marks, em-dashes |
| The partner named once, with licence, labelled sponsored | Other companies' logos without a signed agreement |
