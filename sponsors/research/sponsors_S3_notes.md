# Sponsor list, group S3: notes

Prompt 54 §4, group S3. Checked 2026-11-02. File: `sponsors/research/sponsors_S3.csv` (109 rows, 11 columns, UTF-8).

## Counts per category

| Category | Rows | A | B | C |
|---|---|---|---|---|
| Airlines and airports | 19 | 3 | 7 | 9 |
| Car brands and dealers | 10 | 2 | 6 | 2 |
| Luxury goods (Portuguese stores) | 14 | 4 | 6 | 4 |
| Furniture, kitchens and interiors | 17 | 3 | 9 | 5 |
| Architects and interior studios | 17 | 3 | 6 | 8 |
| Property services (non-agency) | 13 | 2 | 7 | 4 |
| Regional tourism boards and municipalities | 19 | 0 | 0 | 19 |
| **Total** | **109** | **17** | **41** | **51** |

Products proposed: partner block 65, series 18, Friday weekend item 13, Apresentado por 9, event 4.
All tourism boards and municipalities are priority C, and their calendar_slot starts with "later, procurement" (public buyers pay through procurement).

## How it was checked

- **Contact URL:** each one was fetched with `curl -sSL -A "Mozilla/5.0"` and a 25 s timeout, through the proxy. `contact_url` holds the final URL after redirects. 102 rows return HTTP 200.
- **Blocked:** 6 rows return 403 to scripted requests, so their status is `blocked`: SWISS, Air France, Transavia France, Tesla Portugal, Grupo Salvador Caetano and El Corte Inglés Portugal.
- **El Al:** its homepage loads (200), but every press or contact subpage returns HTTP 492, a bot block. Its status is `ok-homepage`.
- **Blocked share:** 7 of 109 rows (6.4%) are blocked or homepage-only. The limit was 10%.
- **Size signal:** every source URL was fetched, and a pattern search confirmed that the stated figure (or phrase) is on the page. Sources are Wikipedia infoboxes, ArchDaily office pages (project counts) or the company's own page.
  - Some own-site pages sometimes return a bot challenge: casais.pt, ferreiradesa.com and goldenergy.pt. They passed on retry.
- **Goldenergy:** the "third-largest household supplier" claim comes from an Expresso article. Expresso returns 403, so the source given is Goldenergy's homepage, which links to that article.
- **No personal data:** no personal names, emails or phone numbers are in the CSV. Some linked contact pages show staff names or emails on the company's own site. Use only the generic channels on those pages.
- **No outreach:** no forms were submitted and nobody was contacted.

## Exclusions and judgement calls

- **GuestReady (property management) was excluded.** Its site has a "Real Estate" section, so it may act as an agent (D9 risk). No other property-management firms are listed: for none of them could I confirm that they do not hold an AMI licence and act as agents. The "property services" rows are energy, solar, security, pools, heating and cooling, construction and lifts only.
- **Not added:** cleaning and concierge firms. I found none with a verifiable public page and a citable size signal.
- **Home insurance was skipped**, as briefed (another group covers it).
- **Brands of one group:** Boca do Lobo, Essential Home and Brabbu all belong to Covet Group. They are separate rows because each brand markets on its own. Pitch them as a group once.
- **Group-level figures:** the size signals for car brands, airlines and appliance makers are group figures (revenue, fleet). They are not figures for the Portuguese subsidiary.
- **Old figures:** Salvador Caetano's turnover (EUR 1.6bn) is from 2012, and Galp's revenue is from 2017. These are the latest figures on the cited page.
- **Architects:** only studios with non-personal names are listed, plus Saraiva + Associados, which the brief named. Size is the number of projects on the studio's ArchDaily office page, a visibility signal and not revenue.
- **why_fits and calendar_slot are editorial judgement.** They are not verified facts. Route details for airlines are kept general; check each carrier's current schedule before pitching.

## Not verified or dropped

- **LATAM:** latamairlines.com timed out and ir.latam.com returned 403. Dropped to keep the blocked share low.
- **Volvo Car Portugal:** all volvocars.com pages return 403. Dropped.
- **Toyota Caetano Portugal and Caetano Retail** return 403. They are covered by the Grupo Salvador Caetano row, which is itself blocked.
- **Other blocked sites:** Mercedes-Benz Portugal (mercedes-benz.pt) returns 403, so the global media site media.mercedes-benz.com is used instead. Miele Portugal (miele.pt) returns 403, so miele.com's contact page is used.
  - BoConcept, DelightFULL, Leroy Merlin Portugal, Iberdrola Portugal, Somfy Portugal and Sixt Portugal return 403 and were dropped.
- **Lexus Portugal, MCoutinho, Grupo Entreposto, Nors, Zaask and Fixando:** each site loads, but I found no citable size signal. Not included. (Nors is mainly trucks and equipment.)
- **Castelbel and Burel Factory:** no size signal found. Not included.
- **Topázio:** its domain redirects to a 404. Dropped.
- **Câmara Municipal de Lisboa** (lisboa.pt) returns 403. Lisbon is covered by Turismo de Lisboa.
- **Câmara Municipal de Loulé** (cm-loule.pt) timed out. Dropped.
- **InvestPorto:** investporto.pt returns HTTP 500, so the page used is porto.pt/pt/investporto.
- **investlisboa.com** now redirects to an unrelated gaming site; the domain has lapsed. Not used.
- **CIN (paints), Atelier Data (406), contemporanea.pt, Studio AP and Bernardo Simões** could not be verified. Not included.
- **Weak size signals, priority C or B:**
  - Turismo Centro de Portugal and Visit Azores: the "size" is only the press centre and the published annual accounts.
  - Arquitectos Anónimos: 3 ArchDaily projects.
