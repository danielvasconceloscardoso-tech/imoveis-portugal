# Prompt 07 — Build direction C (with colour photos) and publish a free beta preview

To run: in Claude Code, plan mode, type "Read ops/prompts/07_build_direction_c_beta.md and execute it."

---

Read CLAUDE.md, ops/DECISIONS.md, design/directions/README.md (on your branch) and prompts 05 and 06 first.

## Decisions (24 Oct 2026)

1. **D15 — Design:** direction **C (Betão)**, with one change: **colour photography** instead of black and white. Keep everything else from C: white space, concrete grey panels, black, the strict grid with headings in the left margin, Archivo, the stacked wordmark with the edition colour square, and one colour block per edition.
2. **D16 — Beta first:** no domains yet. The beta runs on the free Cloudflare Pages address (`….pages.dev`), with "noindex" on, robots blocked, and a small "Beta" mark next to the wordmark. Domains come later.

## Part A — Build C into the real site

1. Replace the current look of `site/` with direction C. Keep the content model, config, URLs, middleware, self-hosted fonts, no trackers, no cookies.
2. Six editions with their colour: LU blue, FR navy, CH red, BR green, plus a colour for **USA** and one for **Israel** (pick two that pass AA with white text and do not clash with the other four; show them to the operator).
3. **Switzerland bilingual:** PT and FR with a language switch on every Swiss page.
4. **USA and Israel** in English (prompt 05), under the Imóveis Portugal brand.
5. Photos: colour, real Portuguese places, licensed for commercial use, credited in a CREDITS file. Each edition's home uses a different photo; prefer the North (Porto, Douro, Minho) for LU, FR and CH, where most readers come from.
6. Pages per edition: home, partners (media kit page), buyer request, FAQ (prompt 06), e-book download page (prompt 04, placeholder until the e-books are approved), privacy, legal notice.
7. Quality floor from prompt 02: responsive from 360 px, AA contrast, visible focus, reduced motion, Lighthouse 95+. Screenshot every edition at 1440 px and 390 px and review them yourself before showing them.

## Part B — Media kits in direction C

Rebuild the media kits (prompt 02 Part B) in direction C with colour photos: LU (PT), FR (FR), CH (PT and FR), BR (PT-BR), USA and Israel (EN).

## Part C — Beta preview on Cloudflare Pages (free)

1. Make the site build cleanly on Cloudflare Pages: root `site`, build `npm run build`, output `dist`.
2. Give the operator the exact steps, in one message, to: create the free Cloudflare account with geralportugalimoveis@gmail.com, connect the GitHub repo, and turn on preview deployments for branches. No domain is needed.
3. Once connected, every push to your branch gets its own preview link. Send the link for each edition's home and partner page.

## Rules

1. Work on your branch. Open a PR with screenshots of all six editions and the media kit PDFs.
2. Nothing is merged, published on a domain, sent or posted without Daniel's explicit approval. The beta link is shared only by Daniel.
3. End with the summary in ops/TASKS.md under "Last session".
