# How we rank places

You tell us your budget and what you want nearby. We put Portugal's 308 municipalities in order and show, for each one, the numbers behind its position. This page is the whole method. The code is `site/src/lib/match.ts`; the tests recompute every score from the table below, so the two cannot drift.

## What goes in

1. **Your budget.** Your net income per month and whether you rent or buy. The housing scenario is 80 m², at most 35% of net income; to buy: 20% deposit, 3% a year, 30 years.
2. **Your tastes.** Any of the ten below, each marked **essential** or **nice to have**.
3. **The place table.** For each municipality: the INE median price and rent per m², and the services table (drive times by car without traffic from the town hall, and counts within a drive time). Sources, licences and the date checked: `content/facts/map/services/`.

Nothing else goes in. Not who advertises with us, not which developments we list, not what other readers clicked.

## Budget is a hard limit

A place whose monthly cost is above your budget is never shown. The comparison uses the exact figure, not the rounded one. Rent mode needs INE's median rent for new leases: 57 municipalities have none, so they are left out of rent mode and the page says how many. Four have no sale median and are left out of buy mode (Barrancos, Corvo, Lajes das Flores, Santa Cruz das Flores). We never estimate a missing median.

## How each taste is scored

Each taste gets a score from 0 to 1 for each place, rounded to two decimals. Drive times fall in a straight line from 1 to 0 between the two limits. Counts rise in a straight line from 0 to 1.

| Taste | Measured by | Score 1 | Score 0 |
| --- | --- | --- | --- |
| Beach | drive to the nearest official sea bathing water | 10 min or less | 45 min or more |
| International school | 70%: drive to the nearest | 10 min or less | 45 min or more |
| | 30%: how many within 30 min | 4 or more | none |
| Schools | public secondary schools within 20 min | 5 or more | none |
| Hospital | drive to the nearest public hospital with an emergency department | 10 min or less | 45 min or more |
| Airport | drive to the nearest airport with scheduled flights | 20 min or less | 90 min or more |
| Train | drive to the nearest long-distance station | 10 min or less | 45 min or more |
| Food | 70%: Michelin-listed restaurants within 30 min | 10 or more | none |
| | 30%: markets within 20 min | 5 or more | none |
| Golf | 60%: drive to the nearest course | 10 min or less | 45 min or more |
| | 40%: courses within 30 min | 10 or more | none |
| Culture | museums and theatres within 20 min | 20 or more | none |
| Quiet | residents per km² (2021 census ÷ official area) | 30 or fewer | 3,000 or more |

Quiet uses a log scale between its limits: 300 residents per km² scores 0.5.

Example, Gondomar in the test table: the international school is 12 minutes away and four are within 30 minutes. Drive: (45 − 12) ÷ 35 = 0.94. Count: 4 ÷ 4 = 1. Score: 0.7 × 0.94 + 0.3 × 1 = 0.96.

The hospital list holds the 56 general public hospitals with an emergency department. Basic emergency services inside health centres are not in it yet, so in the interior the nearest emergency care can be closer than the figure shown, and the hospital score lower than it should be.

Three counts exist in the data and are **not** scored, because OpenStreetMap maps them unevenly from one municipality to the next: restaurants per 1,000 residents, private schools, pharmacies. Food describes what is listed and mapped nearby, never quality.

## The weights

- **Essential** counts 3. **Nice to have** counts 1. The page shows both numbers next to every choice.
- A place's points are the sum of weight × score over your tastes. The page shows the sum ("3.68 of 4 points") and each line of it.
- A place that scores 0 on an essential taste is left out, and so is a place with no data for it. The page says how many were left out and why.
- There are no other weights.

## Order, ties and the regional spread

1. Most points first.
2. On equal points, the lower monthly cost first.
3. Still equal: alphabetical by the municipality's web name.
4. Then the spread: at most two places from one region (NUTS III, 26 in the country) in the first five. A place held back by this rule comes straight after the first five, and its card says so. If your budget and tastes leave fewer regions than that, the rule gives way and the points order stands.

The same input always gives the same order. Nothing is random.

## When data is missing

A place with no data for a taste gets no points for it and the card reads "no data". It is never counted as a zero in silence, and it is never filled in with a guess. On the islands, a service with no road route (no ferry is counted) is "no data".

## What every result shows

- Its two or three reasons, in numbers: the two tastes that bring it most points, then how far under your budget it is.
- One line against the next place: where the next one does better and where it does worse.
- Its points, and each taste's score × weight.

## Nobody can pay to move up

Sponsors, partners and developers are not an input. The ranking code cannot read them, and a test fails if that changes. Developments shown elsewhere on the site are labelled and never enter this list.

## What this is not

A score describes distance and counts. It is not advice, not a judgement of quality, and not a promise that a school has a place or a hospital a short wait. Medians are statistics for a municipality, not an offer for a home.
