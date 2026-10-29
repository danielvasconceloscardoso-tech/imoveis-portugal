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

## 3b. Passo a passo, Perguntas and the other guidance pages

Operator, 29 Oct: keep them simple and professional, in the tone of §3, with a clear call to action to clarify things with a partner.

1. **Shape:**
   - each station or answer: a plain question as the heading, then two or three short sentences that answer it, in a positive tone;
   - then "Saiba mais" to the article that goes deeper, and nothing else on that screen;
   - Perguntas: one line per question, and the answer opens in place.
2. **One call to action per station or answer**, matched to the partner who solves that step:

   | Topic | Call to action (PT · EN · FR) |
   | --- | --- |
   | NIF, the deed, power of attorney, inheritance | "Esclarecer com um advogado parceiro" · "Clarify with a partner lawyer" · "En parler avec un avocat partenaire" |
   | Finding the home, visits, the offer, reservation | "Falar com o consultor" · "Talk to the advisor" · "Parler au conseiller" |
   | Mortgage, the bank, moving the money | "Pedir uma simulação a um banco parceiro" · "Ask a partner bank for a simulation" · "Demander une simulation à une banque partenaire" |
   | Taxes, IMT, IMI, tax residence, selling | "Esclarecer com um consultor fiscal parceiro" · "Clarify with a partner tax adviser" · "En parler avec un conseiller fiscal partenaire" |

3. **Every call to action opens the Concierge** at the right step, with the topic pre-filled. No new forms.
   - Requests follow the existing routing: the qualified advisor (D66) or the lawyer card (D64, after its consent box).
   - Where a partner category has no signed partner yet (bank, tax adviser), the Concierge says "Apresentamos-lhe a pessoa certa" and the request goes to the qualified advisor.
   - Never name a partner who hasn't given written consent (task 37a).
4. **Style:**
   - a quiet text link with an arrow, not a big button;
   - at most one per screen;
   - labelled "Parceiro" where a partner appears.
5. Never promise an outcome, a price or a response time (the reply-time promise still waits for the operator).

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
