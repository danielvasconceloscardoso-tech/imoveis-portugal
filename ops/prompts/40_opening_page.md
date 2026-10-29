# Prompt 40: the opening page (imoveisportugal.pt), Claridge's and Apple

CEO, 29 Oct 2026, 10:20. **Change only the opening page** (the root, `/`, on imoveisportugal.pt and the workers.dev root). Everything else stays exactly as it is. **Live as soon as possible**, following D67 (below).

**Today:** three boxed columns (PT, EN, FR), each with six underlined country links. It looks like a directory and has no prestige.

## The page

1. **Full screen, one moment.**
   - The home hero film (`/video/hero-portugal.mp4?v=6e9a1bc`, the same file and poster as the home page) fills the screen, with a soft dark gradient at the bottom for legibility.
   - On a slow connection or with reduced motion, show the poster still only.
2. **Centred, with a lot of space around it:**
   - "Imóveis Portugal" in Playfair Display, large;
   - under it, the slogan in English only (operator, 28 Oct): **"How to buy or sell a home in Portugal, from anywhere."**, in Manrope, light, small.
3. **One question:** "Where do you live?"
   - Ask it in the visitor's browser language (PT "Onde vive?", FR "Où vivez-vous ?", EN otherwise).
   - A quiet switch, PT · EN · FR, sits in the top right.
4. **Six countries as one calm row** (two rows of three on a phone): Luxembourg · France · Switzerland · Brazil · United States · Israel, in the chosen language.
   - Plain text in white: no boxes, no underlines, no flags.
   - A thin line appears under a country on hover or focus; on a phone, a hairline separates the rows.
   - One tap goes to that edition's home in the chosen language, at the same URLs as today.
5. **A returning visitor** sees one more line above the row: "Continue to Luxembourg" (their saved edition and language), plus the six as before. Never redirect automatically.
6. **Motion, Apple-grade and subtle:**
   - the name, slogan, question and row fade in one after another, in about 1.2 seconds;
   - nothing bounces;
   - the motion respects `prefers-reduced-motion`.
7. **Bottom edge, small and grey:** "Luxembourg · France · Suisse · Brasil · USA · Israel", the brand contact, and the privacy and legal notice links, as today.

## Rules

1. **Copy:** only the words above. No other text, no banned words, no team or personal names.
2. **Performance:**
   - Lighthouse mobile 95 or more;
   - the poster loads first, the film after;
   - no layout shift;
   - keyboard and screen-reader friendly (real links, visible focus, sufficient contrast over the film).
3. **SEO:**
   - title "Imóveis Portugal: how to buy or sell a home in Portugal, from anywhere";
   - a meta description in English;
   - hreflang alternates to every edition and language, with x-default on this page;
   - keep the current indexing setting (noindex until D4).
4. **Leave alone:** the edition pages, the map, Marble Terrace (visible, D68), the country-domain routing, `wrangler.jsonc` routes, DNS and the worker.

## Ship it (D67, carefully)

1. Commit as "Imoveis Portugal" <ops@imoveisportugal.lu> on `design-v2`, after `git fetch && git merge origin/main`.
2. Run `node scripts/check-content.mjs`, `node scripts/check-parity.mjs` and `npm run build`. Check the page in Playwright: Chromium at 1440×900 and WebKit at 390×844, with zero console errors.
3. Merge into `main` and push both branches. Watch the Cloudflare build until it is green. Then open https://imoveisportugal.pt and confirm the new page is live and that a country link opens its edition.
4. If the build fails, fix it at once or revert your commit on `main`. Never leave the live site broken.

## Report

Reply with:
1. the commit hash;
2. "live at https://imoveisportugal.pt";
3. one line on anything not done.

No screenshots.
