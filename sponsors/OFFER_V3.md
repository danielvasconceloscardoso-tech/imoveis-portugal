# Sponsor offer v3 (prompt 15, D32, D33, D36)

Status: **proposal**. Prices and the Private tier are for Daniel to confirm (tasks 8s, 8t). Everything below is built on the partner page, the media kits and the outreach drafts, and switches to final as soon as Daniel confirms. All fees are flat and annual (D6): no fee per lead, per click or per sale. Prices exclude VAT.

## 1. The network (D32)

1. **Partner group, closed:** real estate (Habinedita Gondomar, AMI 13250), credit (the agency's credit intermediary, D21) and insurance stay with the partner group (D14, D20, D21). No other agency, broker or insurer is sold these roles.
2. **Every other category is open and non-exclusive:** lawyers, tax advisers, banks, money transfer, developers, private banks and wealth managers, insurers outside the group's role. Several partners per category and edition, shown in order of response time and reader ratings once we have them (until then, in order of signing).
3. **No category exclusivity before launch.** A 12-month exclusivity can be quoted once audience numbers exist (METRICS.md).

## 2. Price list v3 (proposal)

| Package | What it includes | List price per year | Founding price, year 1 (−40%) |
| --- | --- | --- | --- |
| **Verified Partner** | Partner profile with licence; labelled answers on the FAQ questions in its category; place in the calculator call-to-action rotation for its category | 1,800 € per edition · 4,800 € all editions | 1,080 € · 2,880 € |
| **Featured Partner** | Verified, plus 6 newsletter slots a year, one e-book chapter, first position in its category | 4,800 € per edition · 12,000 € all editions | 2,880 € · 7,200 € |
| **Bank Partner** | "Oferecido por" on the calculators in its editions, newsletter slots, featured on the map for the budgets it finances | 9,000 to 15,000 € | from 5,400 € |
| **Developer campaign** | One development: newsletter feature, map position in its municipality, a labelled page | from 2,500 € per campaign | not discounted |
| **Wealth Partner** (D33) | Private section placements for budgets of 1 M€ and more: profile, labelled answers on structuring questions, map position for 1 M€+ budgets, newsletter slots. Maximum 5 per edition, non-exclusive | 25,000 to 50,000 € | from 15,000 € |

**Founding Partner:** the first 10 signed partners pay the founding price in year 1 and keep it locked for year 2. Deadline: Tuesday 1 December 2026. The counter on the partner page shows the slots left (config.ts `foundingSlotsLeft`).

**Mapping from the old offer (for rows already in the pipeline):** Gold → Featured or Bank Partner; Silver → Verified Partner (all editions); Bronze → Verified Partner (one edition); Campaign → Developer campaign. Existing rows keep their old offer type until Daniel confirms v3.

## 3. Why one client pays for it (shown to sponsors)

1. **Lawyer:** one purchase file from abroad (procuração, CPCV, deed).
2. **Money transfer:** one large transfer of a deposit and a price.
3. **Bank:** one mortgage.
4. **Developer:** one sale.
5. **Private bank or wealth manager:** one client relationship.

## 4. Inventory a sponsor can see (on the partner page)

| Placement | Verified | Featured | Bank | Developer | Private |
| --- | --- | --- | --- | --- | --- |
| Profile with licence | ✓ | ✓ | ✓ | ✓ | ✓ |
| Labelled answer on FAQ questions in its category | ✓ | ✓ | ✓ | | ✓ (structuring questions) |
| Calculator "oferecido por" | rotation | rotation | ✓ | | |
| Newsletter slots | | 6 a year | ✓ | 1 per campaign | ✓ |
| E-book chapter | | 1 | | | |
| Position on the map and in "talk to a partner" | listed | first in category | budgets it finances | its municipality | 1 M€+ budgets |

No events, webinars, roundtables, reports or services delivered by the team are sold (D36). The paid calls with the agency stay (D19).

## 5. Pre-launch proof, without invented numbers

1. **Community size, official statistics:** 93,659 Portuguese nationals live in Luxembourg, 14.5% of the population (STATEC, census 2021, fact `lu-portuguese-2021`). Figures for France, Switzerland, Brazil, the US and Israel are added once opened at the official source (task 15a).
2. **Search interest:** Google Trends for "comprar casa em Portugal" and its FR and EN equivalents, per country, as a screenshot in the media kit (task 15a; Trends cannot be read from the build environment).
3. **Partner group:** licensed agency (AMI 13250), credit intermediary and insurance, all named with their licences.
4. **Launch plan:** six editions, three languages, newsletter every Thursday, launch 1 December 2026.
5. **Audience figures** appear only once real, from METRICS.md (subscribers, visits, calculator uses).

## 6. Files

- Partner page: `/pt/lu/parceiros/` (and every edition and language), built from `site/src/config.ts` (`prices`) and COPY_DECK.md (`partners.*`).
- Media kits: `sponsors/mediakit/` (one PDF per edition and language, and one per partner type, prompt 18), built by `npm run mediakit` in site/.
- Outreach drafts: `sponsors/outreach/v3/`.
