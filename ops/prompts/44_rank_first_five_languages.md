# Prompt 44: rank first for "how to buy or sell a home in Portugal from abroad", in five languages

**PARKED by the operator on 30 Oct 2026, 11:40. Do not run until the operator says "run prompt 44".** The competitor briefs (`content/seo/SERP_2026-10-30_*.md`) were cancelled before they were written.

CEO, 30 Oct 2026, 11:30. Operator's goal: when someone types "how can I buy a house in Portugal" or "how do I sell my house in Portugal while living abroad", in Brazilian Portuguese, French, German, Hebrew or American English, we are the first result on Google (Safari searches with Google by default, so Google is the target; Bing feeds DuckDuckGo and ChatGPT, so it comes second). This prompt builds everything that is in our hands. What is not (indexing, accounts, links from others) is listed for the operator at the end.

**Two facts to work from:**

1. **Nothing ranks while the site is `noindex`.** It stays `noindex` until the legal notice can name the publishing entity (D4). Build everything now so that the day the switch flips, Google finds a finished site. Make the switch a single config value that controls the meta tag, the robots.txt and the sitemaps together.
2. **Nobody can promise first place.** The head queries ("how to buy a house in Portugal") are held by idealista, The Portugal News and large law and relocation firms; on a new domain they take a year and many links. The "from abroad / living in {country}" queries are the ones we can win in months, and they are exactly our readers. Win those first; they carry the head terms later.

## 1. The keyword map, per language and country

1. Run `scripts/seo/autocomplete.py` for pt-BR, fr-FR, fr-LU, fr-CH, de-CH, de-DE, de-AT, he-IL and en-US (keep pt-PT and en-IL). Seeds: buy, sell, inherit + Portugal + "from abroad" / "living in {country}", plus the recurring questions (NIF, IMT, mortgage as a non-resident, power of attorney, taxes when selling, inheritance). Save the raw lists in `content/seo/`.
2. If `content/seo/SERP_2026-10-30_A.md` and `_B.md` exist (the CEO's competitor analysis per language), use them: who ranks, what they answer, what they miss, the questions people ask, the proposed titles and outlines.
3. For each language: one **primary query for buying**, one **for selling**, and 6–10 **cluster queries**. Each query maps to exactly one page per language, so no two of our pages compete. Write the map into `content/SEO_ENGINE.md` under a new section "Rank first".

## 2. Two money pages per language

For each of pt-PT, pt-BR, en, fr, de, he:

1. **"How to buy a home in Portugal from abroad"**: the complete guide, 1,800–2,500 words, the one page that answers everything and links to the cluster. Shape: the answer in the first two sentences; a short "what you need" list; the steps in order (NIF → bank account and moving money → mortgage, if any → search and visits by video → offer and promissory contract → IMT, stamp duty and fees → power of attorney and the deed → afterwards: IMI, utilities); the costs with a worked example at one price, using the simulator's own numbers; the common questions; sources; disclaimer.
2. **"How to sell your home in Portugal while living abroad"**: the same quality. Documents (caderneta predial, certidão permanente, licença de utilização, certificado energético), the agency and the mediation contract, power of attorney, capital gains for non-residents and the reinvestment rules as they stand today (anything that depends on a pending legal check stays as it is now), moving the money, the timeline.
3. Written natively per prompt 43 §3: positive, plain (B1), no AI tells. Brazilian readers get Brazilian terms (imóvel, financiamento, "morando no exterior"); American readers get US framing (a pointer to their own adviser on US reporting, never advice); German is written for Swiss readers first; Hebrew is right-to-left, with Portuguese terms kept in Latin script in brackets.
4. The cluster pages already exist in PT, EN and FR (prompt 43). Add DE and HE versions of the six most-searched ones: NIF, IMT and total cost, mortgage as a non-resident, power of attorney and signing from abroad, taxes when selling, inheritance.

## 3. German and Hebrew on the site (phase 1)

1. Add `de` and `he` to i18n. Phase 1 scope: the opening page's language switch; the CH edition home in DE and the IL edition home in HE; the two money pages; the six cluster pages; the Concierge's first screens and the request flow; the privacy and legal pages. Everything else falls back to EN (FR for CH) with the language switch visible. Extend the parity check to this phase-1 set only.
2. Hebrew: `dir="rtl"`, numbers and Latin terms left-to-right inside the text, and a font pairing that matches the identity (Playfair Display has no Hebrew; pick an open-licence serif with Hebrew such as Frank Ruhl Libre, and Heebo or Assistant for text). Test in WebKit at 390×844.
3. Both languages are reviewed by a native speaker before they are indexed (operator task below). Until then they stay `noindex` on their own, independent of the global switch.

## 4. On-page, every page

1. Title of at most 60 characters with the target phrase first; H1 = the question; slug = the phrase; meta of at most 155 characters that answers, never teases.
2. The first two sentences answer the query. A table of contents on the money pages. H2s phrased as the questions people search.
3. Structured data: Article with `dateModified`, BreadcrumbList, Organization (brand only), WebSite with SearchAction, and FAQPage where there are FAQs. Google no longer shows FAQ or HowTo rich results for sites like ours; the markup still helps it understand the page, so keep it light and valid. Validate in CI.
4. Images: our own licensed photos, descriptive alt text in the page's language, WebP, lazy below the fold.
5. Internal linking, hub and spoke: every cluster page links up to its money page and sideways to two siblings; each money page links to every cluster page, the matching simulator, the map and the Concierge. The anchor text is the target phrase of the page linked.
6. Trust without names: a "Sources" box on every page with official links; a "Last checked" date; a brand author page describing the method. Once a partner lawyer's written consent is in (task 37a), "Reviewed by {name}, Ordem dos Advogados n.º …" on the legal pages, linking to their card. Not before.
7. Freshness: a monthly check of the money pages; `dateModified` changes only when the content does.

## 5. Technical

1. **hreflang:** the full matrix (pt-PT, pt-BR, en, fr, de, he) plus `x-default` pointing to the opening page; every alternate reciprocal; emitted in the HTML head and in the sitemaps. One `en` for the US and Israel editions, not two.
2. **Sitemaps:** an index with one sitemap per language, `lastmod` from git; `robots.txt` pointing to it. The `noindex` switch also withholds the sitemaps.
3. **Canonicals** on every page. Parameter variants (`?place=`, `?concierge=`) canonicalise to the clean URL.
4. **Core Web Vitals** within the prompt 43 budgets on every money page. The articles render fully static: no content behind JavaScript.
5. **IndexNow** key file at the root, and a ping on each deploy, for Bing.
6. **RSS feed** per language for the articles.
7. **404 page** and a 301 redirect table for every renamed slug, with no chains.
8. **Open Graph and Twitter cards** with the right language and image.
9. **`scripts/seo/check.mjs`**, run in CI: titles and metas within limits, hreflang reciprocity, canonicals, schema validity, broken internal links, orphan pages. Red fails the build.

## 6. Authority: what we prepare (nothing is sent)

1. **A link-target list** per language in `sponsors/links/targets.csv`: diaspora media (Contacto, Lusojornal, Bom Dia, Lusopresse, Radio Latina for LU, FR and CH; the "morar em Portugal" blogs and channels for BR; Portuguese-American press for the US; relocation and Portugal-move communities for IL); Portuguese associations and Casas de Portugal; chambers of commerce; universities' Portuguese departments; consulate community pages; expat forums. Columns: site, country, language, type, page to pitch, angle, contact page URL, status. No personal names or email addresses.
2. **Three link assets** others will want to cite: the price map (308 municipalities, 10 years), the IMT and total-cost simulator, and a yearly data note per country, "What your budget buys in Portugal". Make each embeddable (an iframe snippet with a credit link back to us).
3. **Partner links:** when Marble Terrace, the lawyers' firms and the partner agency have signed, each gets a "Partner" badge linking to us. The operator asks them.
4. The Reddit and Quora answers in `social/` stay drafts until 30b. Outreach waits for 8q. The CEO writes the notes.

## 7. Measurement

1. Commit the Search Console and Bing Webmaster verifications once the operator creates the properties (DNS TXT preferred, so no file is needed).
2. **`scripts/seo/gsc-weekly.mjs`:** every Monday, pull queries, pages, clicks, impressions and average position per language from the Search Console API into `ops/METRICS.md`. Credentials only via environment variables (the operator creates a service account). Until then the script prints "waiting for Search Console".
3. No scraping of Google results (terms of service). Rankings come from Search Console only.

## 8. Ship (D67) and report

1. Each stage goes live as soon as it is green, in this order: §5 technical first (it protects everything else), then §1 and §2 in PT, EN and FR, then §3 DE and HE, then §4 across the site, then §6 and §7.
2. Keep: `noindex` until the operator's go; Marble Terrace visible (D68); the hero film; the 308/308 map test; prompts 40–43.
3. Report after each stage: the commit hash, "live", the URLs of the pages created, and one line on anything not done. After §1, the keyword map. After §5, the output of `scripts/seo/check.mjs`. No screenshots.

## For the operator (the CEO sends these as one message)

1. D4: the publishing entity, so the legal notice can be written and `noindex` removed. This is the gate for everything above.
2. Google Search Console (domain property, DNS TXT in Cloudflare) and Bing Webmaster Tools (import from Search Console); Cloudflare Crawler Hints on.
3. A Google Ads account on the brand mailbox, with no campaign and no spend, for Keyword Planner's real monthly volumes per country.
4. A native reviewer for German and for Hebrew before those pages are indexed.
5. Country domains later; not a blocker (hreflang does the geo-targeting). `.com.br` needs a Brazilian taxpayer number or a local representative.
