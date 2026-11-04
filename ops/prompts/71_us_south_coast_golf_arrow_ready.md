# Prompt 71: US edition: "Closer than you think", the south coast, and Arrow ready to switch on

Operator, 4 Nov 2026. The US edition's story is golf and homes on Portugal's south coast, told in American terms:
- Sines is Europe's AI coast;
- Comporta is the Hamptons of Portugal;
- the Algarve is "the Florida of Southern Europe" (John Calvão, Arrow).

Goes live under D67, except section 3, which waits for the operator's go. Follow content/METHOD.md (rule 16) and rule 17. One language: EN. Record it as the next free D number.

## 1. "Closer than you think" (US edition)
1. **Feel:** "Portugal is closer than California."
2. **Hero:** one number. From New York, Lisbon is about half an hour further than Los Angeles.
3. **Starting points** (verify each against the airline's own schedule and put it in facts.csv):
   - New York → Los Angeles: 6h08–6h19;
   - New York → Lisbon: 6h45–6h55 (Delta, JetBlue, TAP);
   - Newark → Faro: about 7h20 (United, overnight: leaves 9:30 pm, lands 9:50 am);
   - Newark → Honolulu: 11h28.
4. **Find every nonstop route from the US to Lisbon, Porto, Faro, Madeira and the Azores,** with airline, season and time:
   - TAP: New York, Newark, Boston, Washington, Miami, Chicago, San Francisco, Los Angeles, Boston–Porto;
   - United: Newark to Lisbon, Porto, Faro, Ponta Delgada and Funchal;
   - Delta, JetBlue, American, Azores Airlines.
5. **Build:**
   - a page and a shareable card;
   - pick your city (10 US gateways), and see the flight to Portugal next to the domestic trip Americans already make;
   - the time difference;
   - "leave after dinner, land for breakfast".
6. **The answer is visual, not more text.** The card works on Instagram and in Maré.

## 2. The south coast, for Americans (US edition map)
1. **One arrival, three stops:**
   - Sines: Microsoft's AI hub, about €8.6B / $10B (ECO and Dinheiro Vivo, Nov 2025);
   - Comporta;
   - the Algarve golf coast.
2. **Each stop:** one photograph, one line, one number, and its distance from Lisbon.
3. **Golf layer:** every course on the Algarve and Comporta coast with its name, its holes and its architect where published. Check that Arrow's courses (Details) are named correctly.

## 3. Arrow Global / Details: research now, switch on when the operator says so
The operator has no material from Arrow yet.
1. **Research online:**
   - arrowglobal.net and Details;
   - Vilamoura (the Old Course, the €500M plan);
   - the Els Club Vilamoura: estate plots $1.3–4M, membership $60k, the Portugal Invitational (31 Jul–2 Aug 2026, five-year PGA Tour Champions deal);
   - Palmares Ocean Living & Golf (Lagos, 27 holes, Robert Trent Jones Jr., bought for €400M);
   - their hotels;
   - Restart SCR ("Pathway to Portugal", a Golden Visa fund for Americans and Canadians).
2. **Prepare in projects.json,** with published facts and prices only:
   - the Els Club Vilamoura;
   - Palmares Ocean Living & Golf;
   - Vilamoura's residential offer.
   
   Images only from their own published material, credited to them. Tag "Our pick" / "Seleção" / "Sélection".
3. **Keep them pending:**
   - `pending: true`, so they are hidden on main and visible on design-v2;
   - a private preview at /d/{token}/;
   - a short link /arrow that is ready but switched off.
4. **When the operator says go,** one flag (`pending: false`) puts them live and /arrow points to the US map on the Algarve with their pins.

## Acceptance
1. Sections 1 and 2 are live on the US edition, phone and desktop.
2. Every flight time and fact in facts.csv has its source.
3. The Arrow entries build on design-v2 and in the private preview, and appear nowhere on main.
4. The checks and the build pass.

## Report
1. The live links, the private preview link, and phone screenshots.
2. The list of routes found, with sources.
3. What you could not verify.
