# Prompt 43: audit the site, cut the weight, rewrite the articles

CEO, 29 Oct 2026, 23:45. The operator finds the site too heavy and hard to navigate and read. The articles read like AI and are too complicated for a foreign buyer. Phone and desktop feel like two different sites. **Goal:** a top-tier, Apple-clean experience on both, and articles that rank and read as if a calm, expert person wrote them.

Work now, in the order below. Ship each stage live per D67 as soon as it is green.

## 1. The audit (first, about 1 hour)

1. **Benchmark.** Study these sites on a phone (390×844) and on a desktop (1440×900): home, navigation, one article or guide page, one tool or listing page, and the contact or enquiry flow.
   - Vanguard Properties: vanguardproperties.pt.
   - Doutor Finanças: doutorfinancas.pt, the reference for clear money explainers in Portuguese and for SEO.
   - Shalu Properties.
   - Top-tier hotels:
     - Claridge's (maybourne.com);
     - Six Senses (sixsenses.com);
     - Aman (aman.com);
     - Conrad Algarve;
     - JNcQUOI.

   If a site is blocked by the network allowlist, list it in one line and use the others.
2. **For each benchmark, note what makes it feel effortless:**
   - the number of sections on the home page;
   - the words per screen;
   - the type sizes;
   - the white space;
   - the navigation pattern on phone and desktop;
   - how an article opens (the answer first?);
   - one action per screen.
3. **Score our site against them**, page by page: home, map, Passo a passo, Simuladores, Artigos, one article, Perguntas, Parceiros, the Concierge and the Marble Terrace showcase. For each page, list:
   - what to **cut**;
   - what to **merge**;
   - what to **move** into an article;
   - what to **keep**.
4. **Write it as `ops/AUDIT_2026-10-29.md`**, and also as a PDF of at most 3 pages (`ops/AUDIT_2026-10-29.pdf`).
   - Start with the ten changes that matter most.
   - Then add a table per page.
   - No screenshots in the PDF; one line per finding.

## 2. Make it light (apply the audit)

1. **Home:** at most five sections, one idea each, and one action per section. Everything else becomes an article or goes. Keep the hero film exactly as it is.
2. **Every page:** at most three short sentences per block, and no block of more than about 60 words above the fold. Use one type scale and one spacing scale everywhere.
3. **Phone and desktop:** the same structure, the same order, the same components and the same words. Only the layout adapts.
   - Design at 390 px first, then let it breathe on desktop.
   - The navigation items are the same on both (Passo a passo · Mapa · Simuladores · Artigos · Perguntas · Parceiros, plus Concierge).
   - Use one pattern per device, and use it everywhere.
4. **Performance budgets:**
   - **Home:** under 1.2 MB before the film starts; JavaScript under 150 KB per page, except the map page.
   - **Speed:** LCP under 2.5 s on a mid-range phone over 4G; CLS 0.
   - **Lighthouse mobile:** 95 or more on the home page and articles, 90 or more on the map.
5. **Remove** dead components, unused CSS and JavaScript, duplicate sections, and any text no reader needs to act.

## 3. Rewrite every article (and the long copy on the site)

**Tone (new rule, add it to `content/EDITORIAL_POLICY.md` and `content/copy/COPY_DECK.md`):**
1. **Positive, never deficit.** Never write "if you can't go to Portugal" or "you can't be there". Write what is possible: "You don't need to be in Portugal to buy a home. Here's how it works." Then explain. The same applies everywhere: say what the reader *can* do.
2. **Written for a foreigner,** at about B1 level:
   - short sentences;
   - one idea per paragraph;
   - every Portuguese term explained once, in plain words, the first time it appears (for example: the NIF, your Portuguese tax number);
   - no legal jargon unless it is the term the reader will meet at the notary, and then explained.
3. **No AI tells:**
   - no "In today's market", "navigate", "landscape", "seamless", "dive in", "it's worth noting", "whether you're… or…";
   - no rhetorical questions in a row;
   - no lists of three adjectives;
   - no closing summary that repeats the article;
   - no hedging piles.

   Read each paragraph aloud: if a person wouldn't say it, rewrite it.
4. **Describe, never advise (D12):**
   - every figure has its source;
   - the disclaimer stays;
   - anything that depends on the pending IMT check (30d) stays as it is now.

**SEO (each article):**
1. **One target phrase** from the keyword map (`content/SEO_ENGINE.md` on branch `brave`, and `content/seo/`):
   - in the title, the H1, the slug, the meta description and the first sentence;
   - the title is 60 characters or fewer, the meta description 155 or fewer.
2. **The answer first:**
   - the first two sentences answer the search directly, so they can appear as the featured snippet;
   - then the steps, with one short table at most if it helps;
   - then sources.
3. **About 600 to 1,200 words**, H2s phrased as the questions people search, and FAQ structured data for the three most-asked follow-ups.
4. **Internal links:** three or four per article, to the matching simulator, the map, a Passo a passo station and one related article. External links only to official sources (Portal das Finanças, INE, Diário da República, the Ordem, Banco de Portugal).
5. **Learn from the best.** Read the matching articles on Doutor Finanças, idealista/news, and any site you can reach that ranks for the phrase. Match what they answer, then do it shorter and clearer. Never copy text.
6. **Keep PT, EN and FR in parity:** each language is written natively, not translated word for word.

## 4. Ship and report

1. **Ship each stage live per D67:**
   - on `design-v2`, run `git fetch && git merge origin/main`;
   - commit as "Imoveis Portugal" <ops@imoveisportugal.lu>;
   - run `node scripts/check-content.mjs`, `node scripts/check-parity.mjs` and the build;
   - run the Playwright check: WebKit at 390×844 and Chromium at 1440×900, zero console errors;
   - merge into `main` and push both branches, and watch the Cloudflare build until it is green;
   - if anything breaks, revert on `main` at once.
2. **Never touch** DNS, the `wrangler.jsonc` routes or the worker. Keep:
   - Marble Terrace visible (D68);
   - prompts 40 to 42 intact;
   - the 308/308 map click test.
3. **Report after each stage:**
   - the commit hash and "live";
   - after stage 1, the audit PDF;
   - after stage 3, the number of articles rewritten and the before and after average reading level and word count;
   - one line on anything not done;
   - no screenshots.
