# MARÉ · Volume I production bible
Date: 10 November 2026 · Status: working editorial guidelines / pre-launch

## North star
Each Tuesday/Friday issue should be a miniature magazine story that is enjoyable today, memorable tomorrow and worth rereading in a physical anthology one year later. Never make celebrity houses the only point; tell the place, architecture, public history or local culture through verified reporting. One original, true fact readers want to repeat at dinner.

## Publication
- THE BRIEF / terça, 08:00: sharp, informative, three-minute lead and brief useful discoveries
- THE ESCAPE / sexta, 08:00: place-led, atmospheric, evidence-led and practically useful
- Audience: people who love Portugal; diaspora; international travelers/buyers. No forced segmentation, avoid synthetic repetition
- Languages: native pt-PT, American en-US and fr-FR. Shared verified facts and story structure, distinct voice
- Current site pipeline: `content/mare/issues/YYYY-MM-DD.md` feeds `site/src/lib/mare.ts` (pt-PT newsletter, existing renderer). Our first three-language commissions live in `content/mare/commissions/`; they DO NOT enter production emails or site automatically.
- First issues: Tuesday 2026-12-01 and Friday 2026-12-04 (correct cadence). A previous Thursday draft under `content/inbox/` is obsolete: never send it; contains unapproved partner material and staging URLs.

## Newsletter template — unforgettable but readable
1. Distinct subject and preheader containing a real twist, not vague clickbait
2. One large licensed image with precise caption. A useful image can hold a simple illustrated fact or map, not a stock photo
3. Story in 4–8 compact paragraphs, with one meaningful underlined source link; optional pull quote or narrow figure
4. One instant 10-second challenge (A/B/C). Email buttons are links to a mobile page and cannot run JS in the inbox. Site reveals the answer on first interaction without gate, displays one surprising additional fact and source
5. One contextual map/restaurant/museum link worth opening, preferably on-site
6. Friendly closing that looks toward next Friday/Tuesday
7. Subtle credited sources (and transparent paid sponsorship ONLY if agreed)
Aim under ~4 minutes; do not pad the story to hit an arbitrary count.

## Art direction
Belmond-level visual storytelling + Apple-level clarity, without imitating their trade dress. Original Maré palette: forest #2F5D50, parchment #F7F3EB, ink #242C2A, restrained terracotta #C66C44. A literary serif in headings and confident sans in navigational text; comfortable 600 px body; mobile/Outlook-safe HTML table layout and meaningful alt text. Printed issue re-typeset completely rather than reproducing email screenshots. Maps, quizzes, illustrated timelines and margin notes become the recurring visual signature.
- Print: distinguish press-ready images (ideally 300 ppi at finished size) from low-res web/email assets; obtain written licensing covering scope, territory, quantities, edition format and years. No hotlink-based print reproduction.
- Photographers, artists, chefs and public figures: source interviews direct when possible; quote with permission and context. A public image or social post does not convey commercial reprint rights. Celebrity private home addresses and detailed residential location are off-limits.
- Numbered autographs only with direct permission, a genuine autograph/bookplate or bound insert, and transparently stated edition numbers. Never imply endorsement in the absence of written authorization.

## Rights ledger v0
| Issue | Proposed visual | Current source | Digital rights | Printed edition rights | Status / action |
| --- | --- | --- | --- | --- | --- |
| 2026-12-01 · Brief | Lisbon contemporary waterfront | `site/public/img/v2/lisboa-tejo-cais-1600.webp` | Existing website use only; provenance/licence still check | **NOT confirmed** | Confirm asset owner, attribution, mail reuse; seek historic image/engraving of Ribeira Palace with verified public-domain status and rights |
| 2026-12-01 · Brief | Acácio Lino, "Conspiração de 1640" | Parliamentary museum page | **NOT confirmed** | **NOT confirmed** | No reproduction until museum/rights-holder clearance; alternatively original diagram showing location and timeline (facts, not copied artwork) |
| 2026-12-04 · Escape | Comporta dunes, contextual | `site/public/img/v2/comporta-praia-dunas-1600.webp` | Existing website use only; provenance/licence still check | **NOT confirmed** | Context caption must not misidentify as pier; get actual Carrasqueira pier photographer permission |
| 2026-12-04 · Escape | Pier photography | Municipality photo credit (António Santos; other photographers) | **NOT confirmed** | **NOT confirmed** | Request license/commission original pier image (commercial, email, site, print, high-resolution) |
| 2027 anthology | Artist photographs, architectural interiors, chefs | TBD by original reporting | TBD | TBD | Sign one agreement per image, interview and commissioned illustration |

## Source ledger v0
- 1 December 1640: Portuguese Parliament historical/educational record of conspirators, Vice-Queen, Miguel de Vasconcelos concealed behind a curtain in a cupboard. https://app.parlamento.pt/comunicar/Artigo.aspx?ID=1312 ; https://www.parlamento.pt/VisitaParlamento/Paginas/BiogMiguelVasconcelos.aspx . Last editorial review 2026-11-10.
- Carrasqueira: dates 1950s/1960s, wooden stakes, use at low tide and small wooden storage sheds. https://cm-alcacerdosal.pt/locais/cais-palafitico-da-carrasqueira-2/ . Last editorial review 2026-11-10.
- Carrasqueira: new safety/road restrictions as of 2026-11-10 may affect visits in November: https://cm-alcacerdosal.pt/encerramento-temporario-da-estrada-de-acesso-ao-cais-palafitico-da-carrasqueira/ . Re-check current accessibility before **December 4** issue; no promise open now.
- Comporta population, rice/wine, fishing and tourism: https://cm-alcacerdosal.pt/municipio/concelho/freguesias/freguesia-da-comporta/?lang=en . Verify counting year and parish unit.

## Game contracts
- Mobile-first story-end challenge, one tap question answer, immediate visual feedback, one beautiful extra fact and a direct source/map link
- No account requirement, no autoplay audio, no fake points/streaks, no randomized unfair answer, reduced-motion fallback and keyboard support
- Email uses three URL buttons; use lang parameter or user locale without PII; website shows answer after click (never reveal via client-only script when JavaScript disabled—fallback visible)
- Aggregate vote counts only when real and privacy-compliant; never invent percentages
- URL keys and copy per issue in a separate source manifest; the quiz should be reusable on-site and in the print anthology as a revealable answer or fold-out

## Delivery gates
- Editorial/story/source review by responsible human; external primary-source checks and date-stamped ledger
- Copyright and photography sign-off (email + site + print distinct)
- Native language review: no mechanical translation; check humor and place names
- HTML preview in Gmail, Outlook and on 390px mobile; email images blocked still sensible
- Tested source/outbound links with UTM tags; unsubscribe and privacy compliance handled by mailing platform
- Draft in mailing tool ONLY; require explicit human approval before sending; record revision history, art/print rights ledger and issue-to-volume index.
