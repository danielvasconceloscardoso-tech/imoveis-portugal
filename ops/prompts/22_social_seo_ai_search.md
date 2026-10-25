# Prompt 22 — Social media, SEO and AI-search visibility (D42)

To run: "Read ops/prompts/22_social_seo_ai_search.md and execute it." Work on a branch and open a PR. Nothing is posted, published, sent or merged without the operator's "go" (hard rule 2). Claridge's standard (prompt 19), voice v3 (D35), editorial policy (D12): every figure sourced, describe never advise, sponsored content labelled.

Decision D42 (Daniel, 26 Oct): **one account per platform, multilingual (PT, EN, FR)** on **Instagram, Facebook and LinkedIn**; the brand must also **appear in AI assistants and Q&A sites** (ChatGPT, Claude, Gemini, Copilot, Perplexity, Reddit, Quora) when people ask how to buy a home in Portugal. **Team time: about 1 hour a week** (approve and schedule). D42 replaces D26's "English first, Instagram and Facebook only".

## 1. Brand kit for social (design/social/)

1. Handles: check availability of `imoveisportugal` (and fallbacks `imoveis.portugal`, `imoveisportugal.pt`) on Instagram, Facebook, LinkedIn, Reddit, Quora, YouTube and TikTok (reserve only). List results for the operator.
2. Profile image (wordmark monogram), cover images (Facebook, LinkedIn), bios in PT · EN · FR (under 150 characters each, no banned words), link-in-bio page on the site (country selector first).
3. Templates in the site's design system: carousel (cover, 3–7 slides, sources slide, call-to-action slide), single-image data card, reel cover, LinkedIn document post (PDF carousel), LinkedIn data post image. Visuals are language-neutral where possible (numbers, maps, places); text slides exist in PT, EN and FR.
4. Faceless video (D28): map fly-throughs, price-trend animations, place photography with captions; subtitles burned in; no AI people, testimonials or invented homes; AI content labelled where Meta requires it.

## 2. Content system (content/social/)

1. **Pillars**, all tied to the site: the map ("what 300 k€, 1 M€, 5 M€, 10 M€ buy"), price trends by area, one question from a country journey (obstacle → answer → partner), places (Comporta to Porto), Private (structuring questions for 1 M€+), partners (labelled sponsored spotlights).
2. **Weekly batch:**
   - Instagram: 3 carousels + 2 reels; captions PT first, then EN and FR, each with its sources and one call to action (map, journey, Consulta privada).
   - Facebook: the same 5 posts, plus 1 community question post for diaspora audiences.
   - LinkedIn: 3 posts aimed at partners and decision-makers in EN or FR (market data, a journey insight, a partner or area spotlight); one document post a month (the area report).
3. **Calendar:** teasers from Tue 10 Nov, launch Tue 1 Dec with the four-scenario data story, then the weekly rhythm. Write weeks 1–4 in full.
4. **The 1-hour week:** `/publish-week` produces one contact-sheet PDF of the week's posts (image + caption per post) and the export files: a Meta Business Suite bulk-upload CSV (verify the current import format before building it) and a LinkedIn schedule sheet (LinkedIn has no bulk import: the operator schedules natively from the sheet). Status `draft` until approved.
5. Replies: a reply bank (common questions → short answer + link) so replies take minutes.

## 3. SEO (site + content/SEO_PLAN.md)

Re-prioritised from prompt 15 §3:
1. One page per real question per country journey step, answer-first, with FAQPage/HowTo schema; one page per municipality with official data (top 30 first); hreflang PT/EN/FR (D24); sitemaps; internal links from every page to its map area, simulator, journey and partner.
2. Titles and descriptions per language from the keyword map (free sources: autocomplete, People also ask, Trends, AlsoAsked, Reddit and Facebook questions).
3. Launch checklist: `launchReady` switched on (needs D4 and the legal pages), Google Search Console and **Bing Webmaster Tools** for every domain, sitemaps submitted, **IndexNow** enabled (Bing, Copilot and ChatGPT search rely on Bing's index).

## 4. AI-search visibility (content/AI_VISIBILITY.md + site)

How assistants find sources: ChatGPT and Copilot lean on Bing, Gemini on Google, Claude and Perplexity on their own web search; all favour clear, sourced, recent, answer-first pages and well-known third-party discussions.
1. **Be crawlable:** at launch, allow search and AI crawlers in robots.txt (Googlebot, Bingbot, OAI-SearchBot, GPTBot, ClaudeBot, PerplexityBot, Google-Extended); publish `/llms.txt` with the key pages per language.
2. **Be quotable:** every question page opens with a 2–3 sentence answer containing the number and its official source, a "last checked" date, and the brand name in the text; consistent facts across pages (facts.csv).
3. **Be the original source:** the map data, the price trends and the four-scenario story are our own compilations of official data; publish a citable "Dados" page per release so others link to us.
4. **Third-party presence:** press kit and data story (prompt 15 §4); a Wikidata entry is out of scope until there is press coverage.
5. **Reddit and Quora (manual, human-posted):** the operator creates the accounts (brand name, affiliation disclosed in the profile). Draft 10 genuinely useful answers per platform for recurring questions (r/PortugalExpats, r/portugal, r/expats, r/brasil-related communities, Quora topics on buying property in Portugal), each answering fully in the post and linking only where it helps, following each community's rules on self-promotion. Never automate posting; never astroturf.
6. **Measure monthly (15 minutes, manual, no paid tools):** a list of 30 prompts (10 per language, e.g. "How do I buy a house in Portugal from Luxembourg?") asked in ChatGPT, Claude, Gemini, Copilot and Perplexity; record whether Imóveis Portugal is mentioned or linked, in ops/METRICS.md.

## 5. Operator checklist (ops/SOCIAL_SETUP.md, one batch)

Exact steps to: create the Meta Business portfolio on the brand mailbox (D29), the Facebook Page and the Instagram professional account linked to it, the LinkedIn company page (it needs a personal profile as admin: use one kept private, D29), Reddit and Quora accounts, and to reserve the handles from §1. Include the anonymity checks (no personal names on pages, admins hidden).

## Review

Push after each section. Reply with the preview link, the handle availability list, the brand kit images, the week 1 contact sheet (PDF), the Meta CSV format you verified, and ops/SOCIAL_SETUP.md. Keep it short. Don't merge.
