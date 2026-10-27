# Prompt 33: "The House", the hospitality pass (JNcQUOI, Claridge's, the Ritz)

CEO, 27 Oct 2026. Decision D60. The operator still doesn't feel the JNcQUOI / Claridge's / Ritz / concierge atmosphere on design-v2.

**The diagnosis:** the layout is right, but the photographs are tourist postcards: a yellow tram, colourful Porto houses, a crowded beach with umbrellas, boats at Benagil, a hillside of houses in Funchal. Hotels like JNcQUOI House sell atmosphere, materials, light and being received, never sights.

Build everything below on branch `design-v2`. The frozen v1 stays untouched. Nothing is published or merged without the operator's "go".

## References (principles only; never their text, logos, photographs or code)

1. **JNcQUOI House**, Lisbon:
   - interiors by Vincent Van Duysen: polished stone, deep green accents, classic Portuguese design;
   - guests treated as members, preferences remembered, a 24-hour butler;
   - its own line: "Your home in Lisbon".
2. **JNcQUOI Club Comporta** (Amorim Luxury, opening 2028): villas and pavilions in the native pine forest, terracotta, cork, green roofs, a golf course by David McLay Kidd, the beach club.
3. **Six Senses Comporta at Pinheirinho** (VIC Properties): 58 residences by Michaelis Boyd, a 70-key hotel, an 18-hole course. Cover of the FT Weekend HTSI property special; the course hosts the DP World Tour Portugal Legends Championship this week.
4. **Claridge's** (prompt 32) and the Ritz: calm, few words, being received.

## 1. Photographs: atmosphere, not postcards (the biggest change)

1. **Replace every photograph on the home page,** then the place cards and the mosaic.
   - **Never:** trams, colourful façades, crowded beaches, umbrellas, tourist boats, skylines in hard midday light, saturated blue skies, people facing the camera.
   - **Yes:** golden or low light, texture and detail, stillness:
     - morning light on limestone;
     - a linen curtain at an open window;
     - the shadow of a pine on a white wall in Comporta;
     - rice fields at dusk;
     - dunes and a boardwalk;
     - a golf fairway in early mist;
     - the Atlantic at dusk;
     - a table set on a terrace;
     - azulejo or cork in close-up;
     - a quiet interior with a view;
     - the Douro terraces at first light.
2. **Every place is still recognisable.** Its card shows that place in its best light: Comporta pines or rice fields, not a generic beach; the Algarve's cliffs at dawn or a fairway above the sea, not boats.
3. **One grade for every photograph:** slightly desaturated, warm highlights, deep shadows, the same feeling as the film.
4. **Licences:**
   - prefer Pixabay or Mixkit, where no credit is needed;
   - a CC BY or CC BY-SA photo is used only if nothing else fits, credited on /credits, never in a caption next to the photo (the Comporta credit line now on the home page goes);
   - every photo checked to show the place named, and listed in content/media/SOURCES.md.

## 2. Colour and type (D60, evolving D50)

1. **Two grounds,** like day and evening in a hotel:
   - **Day:** white, a touch warmer than now. Never cream or beige: the operator rejected those AI palettes.
   - **Evening:** our deep green, dark, used as the full background of two or three sections (the newsletter, the concierge, the closing band), with warm photographs on it.
2. **Accents:** green stays the only accent colour. No brass, no gold, no terracotta in the interface. Warmth comes from the photographs.
3. **Type:**
   - Playfair Display in lighter, larger headings;
   - Manrope for text;
   - small wide-tracked capitals for navigation and labels inside controls only (never above headings);
   - generous line height.

## 3. Being received (the concierge layer)

1. **"Concierge" in the header,** as the main button. It opens a calm panel from the side (not a chat bubble, no bot). The panel reads "How can we help?" with three choices:
   - "I'm buying" opens the buying path at the right station;
   - "I'm selling" opens the selling path;
   - "I have a question" opens a short form: name, email, the question, an unticked consent box naming who receives it.

   Under the choices sits one line on who answers. **Its wording waits for the operator's approval:** "A person reads every request" can only go live if it is true.
2. **The newsletter stays prominent,** inside the concierge panel ("The Thursday letter") and on the evening ground on the home page. It is our core asset.
3. **Welcome back.** When a returning reader has a saved path (already stored on the device), the hero shows one quiet line: "Welcome back. Lisbon, where you left off." Never their budget. Never cookies; device storage only, as today.
4. **The menu as a hotel menu.** On mobile, and behind a "Menu" link on desktop: a full-screen overlay on the evening ground, large serif links, one photograph.
5. **Pace and detail:**
   - slow image reveals;
   - tactile hover states;
   - the monogram as a quiet watermark in the closing band;
   - nothing bouncy, nothing that moves while someone reads.

## 4. Golf (operator, 27 Oct: the Algarve and Comporta are known for their golf)

1. **Map layer "Golf courses".** Data from OpenStreetMap (`leisure=golf_course`, ODbL, credited). Each course's name appears on hover or tap. It is a layer on the full map page, off by default; on the home map it shows only when the reader taps "Golf".
2. **Place cards** for Comporta and the Algarve name their best-known courses, with a source for each statement. No rankings unless a source states them.
3. **A home-page section,** two cards on the evening ground: "Golf on the Algarve" and "Golf in Comporta". Each has a photograph of a fairway, one line and a link to the map with the golf layer on.
4. **Content:** add a golf pillar to the content calendar (weeks 5–12): "Buying a home on a golf course in Portugal", with search phrases in PT, EN and FR. Add a LinkedIn data post on golf resorts with residences.

## 5. Sponsors: golf and branded residences

Add these to sponsors/pipeline.csv (then `python3 sponsors/build/build_v2.py` and recalc), tier A, category "Developer (golf / branded residences)". These are developers, not agencies (D9). For each one, find the official website and a dated source:
- Amorim Luxury, for JNcQUOI Club Comporta (linked to S156 Herdade da Comporta if it is the same group: check);
- VIC Properties: add Six Senses Comporta (Pinheirinho) to its existing entry;
- Quinta do Lago;
- Monte Rei Golf & Country Club and Vilamoura World (both Arrow Global group, per public competition-authority notices; check);
- Onyria Palmares (Lagos);
- Ombria Algarve;
- Dunas / JNcQUOI Club (if separate from Amorim Luxury).

## 6. VIC demo: add Comporta

1. **VIC's demo page and showcase** get Six Senses Comporta beside Prata Riverside Village:
   - VIC's published facts (58 residences, 2 to 5 bedrooms, 210 to 1,400 m², Michaelis Boyd, 70-key hotel, 18-hole course, opening 2028);
   - VIC's own published images;
   - "Price on request" where no price is published. Never estimate one.
2. **The VIC film v4** (Geneva family) settles on Comporta instead of the Lisbon riverside:
   - shot 4 line: "Somewhere with light." stays;
   - shot 8: the Six Senses Comporta residences;
   - shot 10: "Comporta. 9:00 am."

   Render it after the operator's go on the Vanguard film.

## Order of work

1. §1 and §2 on the home page first. Send desktop and mobile screenshots, before and after, and a 20-second scroll recording. Wait for the go.
2. Then §3 (concierge panel, welcome back, menu overlay) and §4.3. Send screenshots.
3. §5 (pipeline) and §6.1 (VIC demo page) in parallel; they don't need the go.
4. §4.1, §4.2 and §4.4 after the go.

## Checks

- Lighthouse mobile at least 95, no layout shift;
- map click test 308/308;
- the path works without JavaScript;
- `check-content.mjs` and `check-parity.mjs` pass;
- the copy rules from prompt 32 (one to three sentences, one action, a lot of space, no AI slop).

Report v1, design-v2 and this pass in one table. Don't send, publish or merge anything.
