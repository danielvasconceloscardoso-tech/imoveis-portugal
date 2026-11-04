# Prompt 78: Golf mode, the whole map in green with holes where Details has its courses

Operator, 4 Nov 2026:
- "It would be cool to see the whole map with a green golf look, and holes where Details has their courses, and we could click on them. With an Apple / Claridge's feel, keeping the other characteristics."
- "The golf layers we had on the map make a lot of sense now."

Arrow Global's team is about to look at the site (John Calvão: "my team will reach out"). Run right after prompt 77. Follow content/METHOD.md (rule 16). The look changes on purpose, so send the operator before-and-after screenshots for his yes (prompt 77 §2), then push live under D67. PT, EN and FR. Record it as the next free D number.

## The five questions
1. **Feel:** "I can already picture my Saturday morning."
2. **Arrival:**
   - one tap on "Golf" in the map controls;
   - the map cross-fades in about 0.4 s into a golf palette: fairway greens on land, a soft sand tone on the coast, deep calm blue water, labels reduced to what matters;
   - reduced motion switches without the fade.
3. **Hero:** the holes, where Details (Arrow Global) has its courses.
   - Each is a small, precise marker: a white cup with a slim flag, drawn as SVG, the same size at every zoom, clustered with a count when zoomed out.
   - All other courses stay on the golf layer as the smaller existing pins, so the map is complete.
4. **The next question:** one tap on a hole opens one card:
   - **the arrival:** a 10-second flyover or one photograph of the signature hole, from the course owner's published material, credited;
   - **one line:** the course name, holes, architect;
   - **one number:** the minutes from the nearest development ("Springs at the Els Club, 3 min");
   - **two quiet links:** the course's own site, and the developments around it;
   - **tag:** "Our pick" / "Seleção" / "Sélection", never "Sponsored" until they sign.
5. **One more thing:** at the bottom of the golf view, one line with the year in the Algarve, each item sourced:
   - the PGA Tour Champions' Portugal Invitational at the Els Club (2027 edition);
   - F1 at Portimão, 2027.

## "From your door" on every development card
1. **The line:** "First tee 6 min · Falésia 8 min · Marina 4 min", the nearest course, beach and marina by car (OSRM).
2. **Golf mode on:** the first tee comes first.

## Keep everything else
Developments, places, search, the Concierge, the simulator link, the cards and the other layers all work as before, in golf mode too.

## Data
1. **Research and verify the list of Details' courses:** name, holes, architect, coordinates of the clubhouse or first tee, and the source. Sources:
   - arrowglobal.net and the Details materials;
   - the course sites;
   - press: The First Call, Golf Business News, Essential Algarve.
2. **Check "12".** If the count differs, report it.
3. **Add every course to facts.csv.**

## Links
1. `?mode=golf` and /golf open the map in golf mode.
2. /arrow now opens in golf mode on Vilamoura, with the developments and the holes in view.

## Acceptance (phone and desktop, PT, EN and FR)
1. Golf mode switches smoothly and looks like a fairway, not a filter.
2. Every Details course shows as a hole. A tap opens its card, and the card has the "minutes from the nearest development" number.
3. Every development card shows "From your door".
4. Nothing else on the map is lost or broken; visual-check is clean outside the golf view.
5. /arrow opens golf mode on Vilamoura.
6. The checks and the build pass.

## Report
1. Screenshots for the operator's yes: the map before and in golf mode, a hole card, a development card with "From your door".
2. The verified list of Details courses with sources.
3. After his yes, the live links.
