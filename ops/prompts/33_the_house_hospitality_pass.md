# Prompt 33: "The Resort", the hospitality pass (JNcQUOI Comporta, Conrad Algarve, golf, Madeira)

CEO, 27 Oct 2026, revised the same afternoon after the operator's corrections. Decision D60.

**The operator's direction, in his words:**
- not the JNcQUOI House (city townhouse) vibe, but **the resort: JNcQUOI Comporta, the Conrad Algarve**;
- golf: "super smart";
- Madeira is "the Hawaii of Portugal", a lot of people are buying there, and the site doesn't use its most beautiful pictures;
- Madeira's New Year's Eve went viral and is almost as big as golf, and we have nothing on it.

**Diagnosis of design-v2 today:** the layout is right, but the photographs are tourist postcards (a yellow tram, colourful Porto houses, a crowded beach with umbrellas, boats at Benagil, a hillside of houses in Funchal). A resort sells sunlight, water, texture and ease.

Build on branch `design-v2`. The frozen v1 stays untouched. Nothing is published or merged without the operator's "go".

## References (principles only; never their text, logos, photographs or code)

1. **JNcQUOI Club Comporta and the JNcQUOI Beach Club** (Amorim Luxury, Van Duysen): villas and pavilions in the pine forest, terracotta, cork, pigmented concrete, green roofs, the dunes, the beach club, golf by David McLay Kidd.
2. **Conrad Algarve,** Quinta do Lago: sunlit resort calm, pools, golf, the Ria Formosa.
3. **Six Senses Comporta at Pinheirinho** (VIC Properties): residences in the pines, an 18-hole course, FT HTSI cover this month.
4. **Laranjeiras,** the Algarve project of London lawyer Neel Sachdev (FT, 16 Sep 2026, "the California of Europe"): white minimalist villas of 5,000 to 6,000 sq ft, 25-metre pools, raffia lamps, oak, white bouclé, bright natural light.
5. **Claridge's** (prompt 32): calm, few words, a lot of space.

## 1. Photographs: the resort, in daylight (the biggest change)

1. **Replace every photograph on the home page,** then the place cards and the mosaic.
   - **Never:** trams, colourful façades, crowded beaches, umbrellas, tour boats, sprawling hillsides of houses, hard midday glare, oversaturated skies, people facing the camera.
   - **Yes:** soft sunlight, water, texture, ease:
     - a pool edge with loungers and linen;
     - a white villa wall with a pine's shadow;
     - the dunes and a boardwalk in Comporta, rice fields at golden hour;
     - a fairway above the sea at dawn;
     - the Ria Formosa from a terrace;
     - raffia and oak in a bright interior;
     - a table set outside;
     - the Atlantic in late-afternoon light.
2. **Every place card shows the place at its most beautiful,** and still recognisable:
   - Comporta: dunes, pines or rice fields;
   - Algarve: golden cliffs at dawn or a fairway above the sea;
   - Cascais: the coast road or the Boca do Inferno at golden hour;
   - Lisbon: river light from a terrace;
   - Porto: the Douro at first light;
   - Madeira: see §4.
3. **One grade for every photograph:** bright, warm, soft contrast, slightly muted blues and greens. Sunlit, never neon.
4. **Licences:**
   - prefer Pixabay or Mixkit, where no credit is needed;
   - a CC BY or CC BY-SA photo only if nothing else fits, credited on /credits, never in a caption by the photo (the Comporta credit line now on the home page goes);
   - every photo checked to show the place named, and listed in content/media/SOURCES.md.

## 2. Colour and type (D60, evolving D50)

1. **Ground:** the resort in daylight. White, a touch warmer, plus sand-toned bands (one tone, very light) between sections. Never cream or beige blocks; the operator rejected those AI palettes.
2. **Accent:** green stays the only interface accent. The deep green is used for the footer only. No brass, gold or terracotta in the interface: warmth and colour come from the photographs.
3. **Type:**
   - Playfair Display in lighter, larger headings;
   - Manrope for text;
   - small wide-tracked capitals only for navigation and labels inside controls;
   - generous line height and a lot of space (prompt 32 copy rules).

## 3. Being received (the concierge layer)

1. **"Concierge" in the header,** as the main button. It opens a calm side panel (not a chat bubble, no bot) reading "How can we help?" with three choices:
   - "I'm buying" opens the buying path at the right station;
   - "I'm selling" opens the selling path;
   - "I have a question" opens name, email, the question, and an unticked consent box naming who receives it.

   Under the choices sits one line on who answers. **Its wording waits for the operator's approval:** "A person reads every request" only goes live if it is true.
2. **The newsletter stays prominent,** inside the panel ("The Thursday letter") and as its own home section.
3. **Welcome back.** A returning reader with a saved path sees one quiet line in the hero: "Welcome back. Comporta, where you left off." Never their budget. Device storage only, no cookies.
4. **Menu:** a full-screen overlay with large serif links and one sunlit photograph.
5. **Motion:** slow reveals, tactile hovers, nothing bouncy, nothing that moves while someone reads.

## 4. Golf: make it the smartest thing on the site

1. **Golf layer on the map.**
   - Data from OpenStreetMap (`leisure=golf_course`, ODbL, credited), every course named.
   - Off by default on the full map page. On the home map it appears when the reader taps "Golf".
2. **"The golf premium":** our own data story, built only from official data.
   - For the municipalities and parishes with golf resorts (for example Loulé and the parish of Almancil, Lagoa, Lagos, Albufeira, Grândola, Alcácer do Sal), compare the INE median price per m² of the parish with its municipality, and their 10-year change.
   - Publish it only where INE publishes parish data, label it "parish median vs municipality median", and never claim causation.
   - It becomes a chart on the golf section, a LinkedIn data post and a pillar page.
3. **A golf section on the home page:**
   - two sunlit cards, "Golf on the Algarve" and "Golf in Comporta", each with a fairway photograph, one line, and a link to the map with the golf layer on;
   - under them, "The golf premium" chart.
4. **A golf calendar line** (sourced): the tournaments in Portugal this season, for example the DP World Tour Portugal Legends Championship at Pinheirinho. Used in posts and the newsletter.
5. **Content:**
   - a golf pillar in weeks 5–12: "Buying a home on a golf course in Portugal", with search phrases in PT, EN and FR;
   - a golf carousel;
   - the golf-premium LinkedIn post.

## 5. Madeira: "the Hawaii of Portugal"

1. **Use Madeira's most beautiful places:**
   - Pico do Arieiro above the clouds;
   - Ponta de São Lourenço;
   - the levadas and the laurel forest (Laurissilva, UNESCO World Heritage);
   - the natural pools of Porto Moniz;
   - the black sand at Seixal;
   - Funchal bay from the sea at dusk.

   They go on the place card, in the mosaic and on Madeira's map card. No hillside sprawl.
2. **Madeira in the content calendar:**
   - a pillar: "Buying a home in Madeira from abroad", with INE prices for Funchal, Calheta, Santa Cruz, Machico and Ponta do Sol, their 10-year change and rents;
   - a carousel in the place-postcard format.
3. **New Year's Eve in Madeira:**
   - a seasonal pillar page and a run of posts, published in the weeks before 31 December (weeks 6 and 7, 7 to 20 Dec): what the Funchal fireworks are, how to get there, where people stay, and Madeira's homes and prices;
   - facts only from official or primary sources: the regional government, Visit Madeira, Guinness World Records if a record is cited;
   - the hook may say "the Hawaii of Portugal" in social posts only, never as a page heading.

## 6. Sponsors: golf, branded residences, Madeira

Add to sponsors/pipeline.csv (then `python3 sponsors/build/build_v2.py` and recalc), tier A, with official website and a dated source each. All are developers, not agencies (D9).

1. **Golf and branded residences:**
   - Amorim Luxury / JNcQUOI Club Comporta (check the link to S156 Herdade da Comporta);
   - VIC Properties: add Six Senses Comporta (Pinheirinho) to its entry;
   - Quinta do Lago;
   - the Conrad Algarve's owner or residences, if any are for sale (check);
   - Monte Rei Golf & Country Club and Vilamoura World (public competition-authority notices name Arrow Global group companies; check);
   - Onyria Palmares (Lagos);
   - Ombria Algarve.
2. **Laranjeiras, Algarve** (Neel Sachdev's project, FT 16 Sep 2026): ten houses to rent or sell, finished by 2028. Find the developing company and its official site. Contact only through the company, never a personal address.
3. **Madeira developers with current projects:** find three to five, each with an official site.

## 7. VIC demo: add Comporta

1. **VIC's demo page and showcase** get Six Senses Comporta beside Prata Riverside Village:
   - VIC's published facts (58 residences, 2 to 5 bedrooms, 210 to 1,400 m², Michaelis Boyd, 70-key hotel, 18-hole course, opening 2028);
   - VIC's own published images;
   - "Price on request" where no price is published.
2. **The VIC film v4** (Geneva family) settles on Comporta:
   - shot 4 line: "Somewhere with light." stays;
   - shot 8: Six Senses Comporta;
   - shot 10: "Comporta. 9:00 am."

   Render after the operator's go on the Vanguard film.

## 8. "The California of Europe" for the US edition

The FT's phrase for the Algarve is a natural hook for American readers. Add to the US content: a pillar comparing what a budget buys on the Algarve with California. California figures only from official or recognised sources (for example the California Association of Realtors median, labelled), our INE figures for the Algarve, never like-for-like claims. The phrase is quoted and credited to the FT, never used as our own heading.

## Order of work

1. §1 and §2 on the home page first. Send desktop and mobile screenshots, before and after, and a 20-second scroll recording. Wait for the go.
2. Then:
   - §3 (concierge panel, welcome back, menu);
   - the golf section (§4.3);
   - Madeira's photographs (§5.1).

   Send screenshots.
3. In parallel, without waiting:
   - §6 (pipeline);
   - §7.1 (VIC demo page);
   - the golf data (§4.1, §4.2);
   - the Madeira and golf pillars, and New Year's Eve (§4.5, §5.2, §5.3), as drafts in content/inbox.

## Checks

- Lighthouse mobile at least 95, no layout shift;
- map click test 308/308;
- the path works without JavaScript;
- `check-content.mjs` and `check-parity.mjs` pass;
- prompt 32 copy rules.

Report v1, design-v2 and this pass in one table. Don't send, publish or merge anything.
