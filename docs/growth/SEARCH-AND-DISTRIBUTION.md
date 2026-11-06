# Imóveis Portugal — Search, AI discovery & diaspora distribution plan
**Internal | 6 November 2026 | Strategy v1**

## The opportunity
Imóveis Portugal is not yet an established traffic destination. Its search opportunity is to **become the most useful answer to a high-intent Portugal question**, then let the answer lead to a simulator, verified government source, regional map, newsletter signup or appropriate commercial partner. Never pretend the publication has proven reach or that an institution endorses it.

## P0 — Indexability is currently blocked
`site/src/config.ts`: `launchReady: false`. That propagates `noindex` in page HTML and `Disallow: /` in robots.txt. The code comment says not to switch until the legal/business entity is filled and legal pages complete; currently `config.entity` fields are empty. Before flipping this flag:
1. Verify actual Portuguese invoicing/billing entity name, postal business address, registration number and VAT, and privacy/legal notices; do not invent them.
2. Distinguish launchable content from unfinished demo pages, public dashboards and unapproved government co-branded concept. Keep sensitive/unfinished paths excluded from navigation, sitemap and search.
3. Test absolute canonicals, domain mode `imoveisportugal.pt`, `www` redirect, edition-level sitemaps, realistic `hreflang`, robots, HTTP status and sitemap URLs.
4. Configure Google Search Console and Bing Webmaster Tools with owner approval; submit sitemaps after green production build. Monitor indexing and search performance. No indexing guarantees or premature launch claims.

## Research approach
These questions are **search-intent hypotheses**, not keyword-volume statistics. Prioritize using actual Search Console once indexable, first-party site search (if privacy-compliant), direct community questions, Google Trends and professional review. Distinguish legal facts and official eligibility from informal community opinions.

## 30 practical questions, in priority order
| # | User question / working headline | Destination / value | Source / validation | Organic + social idea |
|---|---|---|---|---|
| 1 | Quanto teria de ganhar em Portugal para manter o líquido do Luxemburgo? | `/pt/lu/regressar/` inverse net-to-gross tool | AT CIRS art 68, 12-A, Segurança Social, ECB | 30s narrated slider of net → PT gross; Escala Clube |
| 2 | Quanto ganharia em Portugal se regressasse da Suíça? | `/pt/ch/regressar/` | AT / ECB CHF dated quote | LinkedIn founder post + practical carousel |
| 3 | Como comparar o meu salário líquido em França e Portugal? | `/pt/fr/regressar/` | AT / official FX and disclosed assumptions | Portuguese-French association newsletter |
| 4 | Quem pode beneficiar do regime fiscal para ex-residentes? | independent tax explainer + official CTA | CIRS 12-A, AT Programa Regressar | "Não é metade de todos os impostos" explainer |
| 5 | O Programa Regressar continua a dar apoio financeiro em 2026? | official status guide, dates & direct IEFP link | Programa Regressar/IEFP, closed Mar 31 2026 | 3-line fact-check graphic, update dates |
| 6 | Como encontrar emprego em Portugal antes de regressar? | IEFP/PCRE curated resources | IEFP official jobs, PCRE | HR and business clubs shared link |
| 7 | Quanto custa comprar uma casa em Portugal estando fora? | existing buying guide + calculators | AT IMT, stamp, Casa Pronta | "Preço anunciado vs custo total" carousel |
| 8 | É possível comprar uma casa em Portugal sem viajar? | existing how-to + qualified lawyer handoff | MNE consular power of attorney, Civil Code | Three steps video |
| 9 | Quanto é IMT para não residentes em 2026? | existing fiscal article & calculator | CIMT art 17, AT | visual fee example with sources |
| 10 | Como pedir NIF português no estrangeiro? | NIF guide | AT NIF and representation rules | 40s "antes de assinar" checklist |
| 11 | É possível obter um Golden Visa comprando casa? | honest ARI eligibility explainer | AIMA/legislation; property ineligible to new ARI | “Comprar casa não é o mesmo que obter residência” |
| 12 | Onde viver em Portugal com filhos e escolas? | map + city chooser | official school data, INE, municipality | choice-based stories with real data |
| 13 | Que cidades têm aeroporto a menos de 1 hora? | map filtered drive routes | verified directions data; no invented ETA | measured airport routes reel |
| 14 | Onde posso viver junto à praia e trabalhar à distância? | map + verified internet/amenity information | official municipality/broadband | destination guide without cliché |
| 15 | Quanto custa viver em Cascais vs Porto? | comparison with separate housing and living-cost evidence | INE, official evidence where available | side-by-side honest comparison |
| 16 | Qual a diferença entre Vilamoura e Quinta do Lago? | editorial destination comparison + map | municipal/course/operator official sites | original photo essay |
| 17 | Lagos ou Vilamoura: onde passar uma temporada? | travel/family/golf narrative | local verified places and operators | 2-image contrast; no fabricated review |
| 18 | Comporta é os Hamptons de Portugal? | The Portugal Edit essay | Alcácer municipality, estuary/rice history | carousel "Comporta é Comporta" |
| 19 | Quais são os melhores campos de golfe do Algarve? | DETAILS-curated map, with transparent management scope | DETAILS/Arrow official portfolio | map transition screen recording |
| 20 | Onde há propriedades perto do golfe em Portugal? | map nearby verified partners only | verified Arrow/Shalu/Marble Terrace listings | developer-approved original photos |
| 21 | Qual o preço médio por m² em [município]? | map + date and INE series | INE latest quarter | discover-your-city share card |
| 22 | Quanto ganha uma família que regressa com filhos? | net-equivalence tool, explicit household assumptions | AT/SS/official rules | family scenario explainer, no tax promise |
| 23 | Como tratar dos impostos entre Portugal e a Suíça? | cross-border overview + adviser handoff | AT/treaties/Swiss authorities | source-first Q&A |
| 24 | Regressar a Portugal para trabalhar por conta própria | freelancer checklist | AT/SS | founders’ and professional clubs |
| 25 | Como funcionam escolas públicas e internacionais em Portugal? | place guides + institution references | school authorities and licensed provider info | parent-facing illustrated guide |
| 26 | Qual é a melhor época para surf em Nazaré? | Nazaré editorial + conditions info | operator and meteorological bodies | surf anatomy reel |
| 27 | Como chegar ao Algarve a partir de Nova Iorque? | verified flight seasonal routes | airline current schedule/airport | route comparison, dated |
| 28 | Formula 1 vai voltar a Portugal? | F1 2027 current official schedule | Formula 1 original schedule | 30-second motorsport explanation |
| 29 | O que fazer no Porto para além dos pontos turísticos? | original arts/restaurants cultural stories | official museums, verified restaurant data | restaurant/artist feature |
| 30 | Como começar a preparar o regresso a Portugal? | free step-by-step flow / PCRE direct | Programa Regressar official | association handout with QR |

## Language and geography
- PT-PT: diaspora (LU, CH, FR), returning families, institutional information.
- EN-US: US visitors and international buyers; acknowledge US tax complexity and do not generalize visas.
- FR: France, Luxembourg and francophone Switzerland. Compose natively and preserve same sourced core.
- Six website markets (LU, FR, CH, BR, US, IL). Do not treat 18 identical content variants as 18 original pieces; use canonicals and hreflang correctly. A story only written in English must be labeled `EN`, not presented as Portuguese/French.

## Dedicated specialist agents / quality gates
1. **Question Radar (daily)**: identify genuine public question with URL/date, compare existing page, propose an informative response and channel. Never post autonomously or conceal affiliation.
2. **Official Sources (before publish / weekly checks)**: independent review of source validity, last checked, current vs expired measures and tax facts, flagged changes. Finance/tax content needs qualified final review.
3. **Editorial & AI Answers (per article)**: a direct 1–2 sentence answer above fold, useful unique analysis, not generic AI filler; honest authorship, citations, helpful headings and FAQs only if present.
4. **Technical SEO (every PR)**: robots/indexing, canonical, hreflang, sitemap, structured data correctness, responsive assets/Core Web Vitals, links. Preserve original site design.
5. **Diaspora Partnerships (weekly)**: verify Escala Clube Luxemburgo, local business clubs, associations, consulates and appropriate admin/contact; pitch **opt-in** information tools. Never scrape member lists or spam.
6. **Social Studio (per story/tool)**: 20–45s short-form explanation (not autoplay-heavy webpage), carousel, credible source card, LinkedIn business angle, Facebook community value; original licensed imagery.
7. **Conversion Analyst (weekly)**: source/medium, engaged article users, calculator completions, qualified requests, click-outs to official services, consented Maré subscribers, actual attribution. Separate commercial and institutional events.

## Sample syndication (no fake engagement)
One answer about 2026 Portuguese former-resident taxes becomes:
- Search landing page with official link, updated date and examples.
- Mobile interactive salary simulator scenario.
- 35-second reel explaining what the 50% exemption means and does not mean.
- Native PT-PT, EN-US and French Maré briefs (from Dec 1; no existing readers yet).
- 1-page PDF for an association with credited source; permission-first distribution.
- LinkedIn note to community professionals, identified as Imóveis Portugal.

## Early metrics
Baseline first. Track indexed URLs; impressions; organic clicks and query mix; CTR; article-to-tool click-through; tool successful completion; official outbound clicks; opt-in subscribers; qualified buyer/partner inquiries; authorized distribution placements and referrals. Evaluate at 4/8 weeks, using actual measurements—not generic SEO rank promises.

## Compliance / platform guidance
Google Search Central recommends useful, original people-first content and cautions against mass AI-generated pages to manipulate search. Real editorial usefulness, professional sources and interactive tools are the differentiators.
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/essentials/spam-policies
- https://developers.google.com/search/docs/specialty/international/localized-versions

Research leads (community questions, not factual authorities):
- https://www.reddit.com/r/PortugalExpats/comments/1nhlqoi/
- https://www.reddit.com/r/PortugalExpats/comments/1inrsrs/
- https://www.reddit.com/r/PortugalExpats/comments/1vkl79z/
- https://www.reddit.com/r/PortugalExpats/comments/1laitb9/
