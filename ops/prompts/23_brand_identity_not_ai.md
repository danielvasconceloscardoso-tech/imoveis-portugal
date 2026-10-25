# Prompt 23 — Brand identity v3: Claridge's, never "AI-made" (D44)

To run: "Read ops/prompts/23_brand_identity_not_ai.md and execute it." Work on a branch and open a PR. Nothing is published or merged without the operator's "go". This prompt overrides every earlier colour, type and visual instruction (prompts 07, 10, 11, 19, 22) for the site, social templates, brochure, reports, e-books and media kits.

Daniel's rule: **absolutely no AI slop**, the concierge and Claridge's feeling, and **nothing that looks like Claude or any AI product**: no Claude-like colours, type or phrasing.

## 1. What to avoid (the "AI look")

1. **Colours:** cream, beige, ivory or parchment backgrounds; terracotta, clay, coral, peach or orange accents; the warm off-white + rust palette of AI assistants; purple-to-blue gradients; neon; glassmorphism.
2. **Type:** Inter, DM Sans, Poppins, Space Grotesk, Newsreader and similar defaults; any serif that reads like an AI chat interface.
3. **Shapes and decoration:** rounded cards with soft shadows, pill badges, sparkle or magic-wand icons, emoji rows, blob shapes, abstract 3D renders, stock "happy couple with keys" photos, AI-generated people or interiors.
4. **Words** (PT, EN, FR): "descubra / discover / découvrez", "explore", "jornada / journey" as a buzzword, "elevar / elevate", "experiência única", "sem complicações / seamless", "desbloquear / unlock", "o seu parceiro de confiança", "no mundo de hoje", "não é só X, é Y", headings that are rhetorical questions, three-adjective lists, colon taglines, em-dashes, exclamation marks, hashtag walls.

## 2. The identity (inspired by the hotel's codes, not copying its marks)

1. **Palette:**
   - Ink black `#111111` and pure white `#FFFFFF` as the base, with large white margins
   - One signature green, pale and cool (eau-de-nil, around `#CFE0D6`) for backgrounds of key sections, and a deep bottle green (around `#1E3A2F`) for the cover, footer and buttons
   - Polished brass (around `#A8874A`) only for hairlines, numerals and small details, never for large areas
   - Data colours: a quiet sequential green scale for the map and charts; no rainbow
2. **Type:** a high-contrast serif with an Art Deco character for headings and numerals (for example Bodoni Moda or a comparable free-licence display face, self-hosted), and a precise, slightly narrow sans for text (not Inter or DM Sans). Generous letter-spacing on small capitals, tabular numerals for prices.
3. **Graphic language:** fine black and brass rules, a restrained geometric Art Deco motif used sparingly (corner rules, a monogram, a subtle checkerboard detail at most), square corners, no shadows.
4. **Logo:** a wordmark "Imóveis Portugal" in the display serif plus a monogram for avatars; black, white and bottle-green versions. Do not use or imitate any hotel's logo, name or trademarks.
5. **Photography:** real Portugal, warm natural light, architecture and places across the price range (Porto façades, Lisbon light, Comporta dunes, Douro terraces, Algarve coast), no people posing, no AI images. Consistent grade (slightly cool shadows, true whites).
6. **Voice:** a five-star concierge: calm, precise, courteous, few words, never salesy (D35 rules apply).

## 3. Apply everywhere

1. Update the site's design tokens and fonts, all pages, the map and simulators, the social templates (prompt 22), the brochure (prompt 21), the dossiers, e-books, media kits and sponsors/prospects/build/style.css.
2. Add an automated check to the scorecard (prompt 15 §5): fail on banned colours (cream, beige, terracotta, orange hues), banned fonts, rounded-shadow cards and the banned words in all three languages.
3. Write design/BRAND.md (one page: palette with hex values, type, logo use, photo rules, do and don't examples) so every future piece follows it.

## Review

Push after each step. Reply with the preview link, the brand page (design/BRAND.md as PDF), the logo set, and mobile screenshots of the home page, the map, one social carousel and the brochure cover. Keep it short. Don't merge.
