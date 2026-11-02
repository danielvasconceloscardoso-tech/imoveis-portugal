# Prompt 64: three data moves: the family-house value, the Concierge as a product, the demand forecast (D82)

CEO, 3 Nov 2026, 00:30. Operator approved four moves that make the data worth more than reports. Build the smallest version of each, in this order. Mockups first where marked; Portuguese only; per D67 once approved. No personal data in the repo, no per-lead fees (D6).

## 1. "Quanto vale a casa da família?" (first)
1. Who: emigrants and their families who own a house in Portugal (inherited, empty, in the village or the city). Nobody serves them.
2. What: pick the parish on the map, type (moradia/apartamento), area and condition (four photo tiles) → an estimated range from INE median prices per m² for that parish and type (official data, CC BY 4.0, source shown), the 10-year trend, and what similar homes rent for (INE new-lease rents).
3. Label it clearly: "Estimativa estatística com dados do INE. Não é uma avaliação." (A valuation for a bank or fund needs a registered valuer, Lei 153/2015; we never call it one.)
4. Then three quiet options, each one tap: "Guardar em O meu Portugal", "Quero arrendar", "Quero vender". Only a tap on "Quero vender" or "Quero arrendar" sends the request to the licensed partner agency, named on that card (GDPR art. 6(1)(b); Lei 15/2013: the agency mediates, we don't).
5. Shareable result card ("A casa da avó em Gondomar vale entre X e Y"), the letter signup, and the field added to the anonymised statistics (supply: parish, type, intent, timing).
6. Mockup first (mobile, PT) in design/house-value/.

## 2. Owner mode: DROPPED (operator, 3 Nov: it would overcomplicate the site). Do not build.

## 3. The Concierge as a product (third)
1. Log every Concierge conversation in the anonymised store: question, topic, place, budget band, step of the path, answer given, what the reader did next. No names, e-mails or free text that identifies a person (strip it before storing). Purpose and retention in the privacy policy; tell readers they are talking to an automated assistant (AI Act art. 50).
2. Monthly: the 50 most asked questions, the gaps in our answers, and fixes to the Concierge and the site.
3. Prepare (do not sell yet) a white-label version: the Concierge with a partner's branding on its own page, for a bank's non-resident desk or a developer's sales team, licensed per year. A one-page description of the product and its price logic for the operator.

## 4. The demand forecast (fourth)
1. From the timing answers ("verão de 2027"), budgets and regions in the anonymised store, build a simple forecast: declared foreign demand by region and budget band for the next 6, 12 and 18 months, compared each quarter with INE's foreign-buyer transactions to measure how well it predicts.
2. Groups of at least 10 people; method written in plain words in content/data/FORECAST_METHOD.md.
3. Internal first. It becomes the core of the annual "Procura estrangeira" subscription and the presented annual report once it has six months of history and the operator approves.

## 5. Not now
The "standard file" idea (one-tap profile to any partner) is parked: it needs scale (operator, 3 Nov).

## 6. Report
Plain text in the chat, one line per step, with links. The mockup for §1 to the operator before building.
