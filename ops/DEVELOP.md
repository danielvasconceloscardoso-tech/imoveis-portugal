# Developing on Imóveis Portugal

How to run, change and preview the site yourself, with your own Claude Code or by hand. Read `ops/BRIEFING.md` first (the business, the rules, the operator's taste).

## 1. Get the code

**Best way:** access to the private GitHub repository (the operator adds you: Settings → Collaborators). Then:

```
git clone <repo URL>
cd imoveis-portugal
git config user.name "Imoveis Portugal"
git config user.email ops@imoveisportugal.lu
git config core.hooksPath .githooks   # blocks secrets and non-brand emails in commits
git checkout design-v2                # the current site
git checkout -b collab/<your-topic>   # your own branch
```

**Without GitHub access:** the zip from the operator is a snapshot of branch `design-v2` (28 Oct 2026). The large videos are removed except the home film; the demo films and screenshots are not included.

## 2. Run the site locally

Requires Node 20 or newer (built with Node 22).

```
cd site
npm ci
npm run dev      # http://localhost:4321/pt/lu/  (also /en/lu/, /fr/lu/, /pt/fr/, /en/us/ ...)
npm run build    # full static build into site/dist (about 1,300 pages, ~30 s)
```

**Checks before any pull request:**

```
node scripts/check-content.mjs   # sources, disclaimers, banned words, copy rules (repo root)
node scripts/check-parity.mjs    # PT / EN / FR parity
```

## 3. Where things are

| Path | What |
| --- | --- |
| site/src/pages/ | Routes: /{lang}/{edition}/… (lang pt, en, fr; edition lu, fr, ch, br, us, il) |
| site/src/components/HomeD2.astro | The home page (hero film, path bar, places, map, questions, mosaic, chart, newsletter) |
| site/src/components/MapV3.astro, site/src/scripts/map-v3.ts, site/src/styles/mapv3.css | The 20/20 map (MapLibre GL): relief, night, budget, card, search, tours |
| site/src/components/PathPage.astro | "Passo a passo", the buy and sell route |
| site/src/styles/d2.css | Design v2 styles (D50/D60 identity) |
| site/src/i18n.ts, site/src/lib/copy.ts, content/copy/COPY_DECK.md | Languages, editions and every text on the site |
| site/public/data/prices.json, content/facts/facts.csv | INE prices and rents, and every sourced fact |
| content/facts/golf/courses.csv | Our golf course list |
| site/public/img/v2/, content/media/SOURCES.md | Photographs and their licences |
| site/worker/index.js | The only server code: /api/* (request forms); everything else is static |
| site/wrangler.jsonc | Cloudflare Workers config (static assets plus the worker) |
| ops/prompts/ | The task prompts the CTO works from (35 and 36 are current) |
| social/, content/inbox/ | Social posts and newsletters (drafts) |
| sponsors/pipeline.csv | Sponsor pipeline (companies only, no personal data) |

## 4. Previews and deployment

- Every push to a branch builds on Cloudflare (Workers Builds) and gets its own preview:
  - `https://<branch>-imoveis-portugal.geralportugalimoveis.workers.dev`
  - the design-v2 preview is `https://design-v2-imoveis-portugal.geralportugalimoveis.workers.dev/pt/lu/`.
- Your branch `collab/<topic>` gets its own preview link automatically, about 2 minutes after the push. Slashes in branch names become dashes.
- Nothing reaches the live site without the operator merging into `main`. Never merge yourself.

## 5. Rules that bite (full list in ops/BRIEFING.md §3)

1. **Anonymity:** no personal names anywhere (code, commits, copy, metadata).
2. **No secrets or personal data in the repo.** Keys only in environment variables, never in files or chat.
3. **Every figure has a source** in content/facts/facts.csv. Describe, never advise. Sponsored content is labelled.
4. **No real-estate agency other than the partner agency** (D9). No paid tools without the operator's go.
5. **Photographs:** licensed only (Pixabay, Mixkit, Unsplash, Pexels; Wikimedia credited on /credits); never Google Images or stock sites; no credits on images.
6. **Design:** read BRIEFING §6. Calm, prestigious, Apple-like interactions, no form look, no AI-sounding copy (one to three sentences, one action, a lot of space).
7. **Performance:** Lighthouse mobile ≥ 95 on the home page, ≥ 90 on the map page; the map click test stays 308/308 (`node scripts/map-data/clicktest.mjs` after a build).

## 6. Working with your own Claude Code

1. Open the repo folder and tell it: "Read CLAUDE.md, ops/BRIEFING.md and ops/DEVELOP.md, then …".
2. Keep each task on its own `collab/` branch and send the operator the preview link.
3. The project's Claude Code works on `design-v2` and `claude/brave-gauss-cwafi6`. Don't push to those branches. Pull from them to stay current.
