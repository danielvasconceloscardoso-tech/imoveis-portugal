# Prompt 78: Golf mode in Algarve summer, in 3D, refined by a designer Belmond would hire

Operator, 4 Nov 2026:
- "It would be cool to see the whole map with a green golf look, and holes where Details has their courses, and we could click on them. With an Apple / Claridge's feel, keeping the other characteristics."
- On the first mock (v1, flat green): "That is not the look. That's not prestigious… Not just a PlayStation 2 design."
- On the second (v2, dark luxe): "That looks better." The part he loved: the Vilamoura cluster, courses lit, flags standing, photo pins floating.
- On the third (v3): "I like bright and shiny optimistic colors. Like Algarve summer. But keep the 3D views." Then: "Looks better. Improve it as a graphic designer Belmond would hire. Someone with refined taste that can keep the characteristics I like but leave me in awe."

Arrow Global's team is about to look at the site (John Calvão: "my team will reach out"). Run right after prompt 77. Follow content/METHOD.md and content/DESIGN_AND_DATA.md (rule 16). PT, EN and FR. Record it as the next free D number.

## 0. FIRST, before golf mode: the site is static, and the films do not move
Operator, 4 Nov, 23:09: "The site is static. The videos are not moving and that's crucial."

1. **The rule:** every film on the site moves on its own, with no tap, on phone and desktop. Muted, looping, inline, starting when it comes into view:
   1. the home hero;
   2. the place arrivals;
   3. the development films;
   4. the card flyovers.

   A film that only plays after a tap counts as broken.
2. **Find out why, on his phone first.** Check in this order:
   1. **Reduce Motion.** With "Reduce Motion" on in iOS, HomeD2.astro keeps the still and map-v3.ts forces the map flat (`flat = two || reduce()`). That one setting makes the whole site look static. New rule:
      1. the films play;
      2. the 3D map stays 3D;
      3. reduced motion only shortens camera glides into jumps and removes decorative fades;
      4. each film gets a small, quiet pause control (WCAG 2.2.2).
   2. **iPhone Low Power Mode** blocks autoplay. Start the film on the first touch or scroll anywhere on the page, which the home film already does. Do the same for every other film, and make sure the poster is the film's first frame so nothing jumps.
   3. **Films that load only on a tap** (`preload="none"`, `controls`, ShowcaseMedia.astro) become ambient loops, with the full film with sound one tap away.
   4. **File size and encoding:** H.264, faststart, a phone version under 3 MB, served from our own domain.
3. **Test** in Playwright WebKit as an iPhone and in Chromium desktop, each with reduced motion on and off. Save a 5-second screen recording of the home hero and of one place card on each, as files. Then run the visual check.
4. **Report** the cause in one line, the fix, and the recordings. This part goes live straight away under D67; it does not wait for the golf-mode yes.

## References (in ops/prompts/assets/78/)
1. **v3_vilamoura_from_the_sea.jpg** and **v3_coast_palmares_to_vilamoura.jpg**: the approved direction. This is the floor, not the ceiling.
2. **v2_superseded_dark.jpg**: keep its cluster of standing flags; drop its dark palette.
3. **v1_rejected_flat.jpg**: what never to come back to.
4. The mocks are static pictures (CSS 3D over real OpenStreetMap outlines). Their facts are illustrative: the Els Club's position and every drive time must be verified (§6).

## 1. What the operator likes (keep, all of it)
1. **The 3D arrival:** the camera pitched, the coast seen from the sea, a real horizon with a summer sky and a soft haze. Far things get smaller.
2. **Details' courses are the hero:** their real outlines, bright mown green with stripes, a slightly raised edge so they read as turf, a soft light around them.
3. **Flags standing upright** on every Details course: a white pin, a yellow flag and a dark cup at the base. The five Vilamoura flags clustered together are his favourite part.
4. **Photo pins** of the developments, floating above the map on a thin white stem with a white ring, the name and "Our pick".
5. **The palette, Algarve summer:**
   1. the sea: turquoise shallows along the shore, deepening to Atlantic blue offshore, with sun glints;
   2. the coast: a sand beach and a thin ochre line where the cliffs are;
   3. the land: warm cream under white light;
   4. other courses: a lighter green, so the golf map is complete.
6. **The interface:** a white glass header, white cards, Playfair italic for names, small terracotta caps for captions, a green button.
7. **On the cards:** "From your door" on the development card, and the "This year" line at the bottom.

## 2. The designer
Spawn one design agent and brief it as the art director Belmond would hire to draw its Algarve map: refined taste, restraint, mastery of light. The operator's words are the brief: keep everything in §1 and "leave me in awe".

1. **Study first (one page, saved to a file, not pasted).** Collect 6–10 reference screenshots to files and write what each teaches about light, colour, type and restraint. Sources:
   1. belmond.com, and Belmond's printed destination maps;
   2. Apple Maps 3D cities and Flyover;
   3. Slim Aarons' Algarve and Riviera pool pictures (the light and the palette);
   4. Aman's and Monocle's travel cartography.
2. **Refine, don't reinvent.** Three refinements of the v3 direction, never three new directions. Raise the craft on:
   1. **light:** one sun direction for the whole scene; soft shadows of flags and pins on the ground; a gentle shine on the water and on the turf;
   2. **colour:** a calibrated palette with real contrast, no neon green, no muddy sand;
   3. **type:** a clear label hierarchy and zero collisions at every zoom;
   4. **motion:** the camera glides into golf mode; the flags breathe in the wind; the glints move slowly on the water;
   5. **detail:** only what the data supports. Never invent geography, bunkers or buildings.
3. **Banned:** the dark luxe of v2, the flat cartoon of v1, emoji (the ⛳ in the mock's toggle becomes a drawn icon), heavy drop shadows, a generic map-tile look.
4. **The awe test.** Show the chosen refinement to a second, fresh agent that has not seen the work, playing Belmond's creative director. It names the three things that are not yet first class. Fix them before the operator sees anything.
5. **For the operator:** the three refinements, the pick first with two lines on why. Each as screenshots of the real map:
   1. the Vilamoura hero;
   2. the coast from Palmares to Vilamoura;
   3. a hole card;
   4. a development card;
   5. the phone.

## 3. Build it in the live map (MapLibre, site/src/scripts/map-v3.ts)
1. **The switch:** one tap on Golf, and the camera glides in about 1.2 s to a pitched view along the coast (pitch around 60–70°, inside maxPitch 72). Reduced motion jumps without the glide.
2. **Sky and haze:** a golf-mode sky through setSky (summer blue, pale horizon, haze in the distance). Keep the terrain relief, so the Serra de Monchique rises behind the coast.
3. **Recolour in golf mode only:** water, shallows, beach, cliff line and land, as in §1.5.
4. **Details' courses:**
   1. fill-extrusion of a few metres with a stripe pattern and a soft glow;
   2. the other courses as a lighter green fill;
   3. existing course pins stay for courses without an outline.
5. **Flags and photo pins:** HTML markers that stay upright. Smaller with distance if it is smooth; fixed size otherwise. Clustered with a count when zoomed far out.
6. **Performance:** 60 fps on desktop and at least 40 on a mid-range phone; the existing fps governor applies.
7. **Golf off** returns exactly to the normal map, with nothing left behind.

## 4. The hole card (one tap on a flag)
1. **The arrival:** a 10-second flyover or one photograph of the signature hole, from the course owner's published material, credited.
2. **One line:** the course name, holes, architect.
3. **One number:** the minutes from the nearest development ("Springs at the Els Club, 3 min").
4. **Two quiet links:** the course's own site, and the developments around it.
5. **Tag:** "Our pick" / "Seleção" / "Sélection". Never "Sponsored" until they sign.

## 5. "From your door" on every development card
1. **The line:** "First tee 6 min · Falésia 8 min · Marina 4 min": the nearest course, beach and marina by car (OSRM).
2. **Golf mode on:** the first tee comes first.

## 6. Data
1. **Research and verify the list of Details' courses:** name, holes, architect, coordinates of the clubhouse or first tee, and the source. Sources:
   - arrowglobal.net and the Details materials;
   - the course sites;
   - press: The First Call, Golf Business News, Essential Algarve.
2. **Check "12".** If the count differs, report it.
3. **Place the Els Club correctly.** The mock assumed it is the outline OpenStreetMap calls "Dom Pedro Victoria"; confirm or correct it.
4. **Source every caption** in facts.csv:
   - Falésia, Tripadvisor's best beach in the world 2024 (tripadvisor.mediaroom.com, Travellers' Choice Best of the Best Beaches 2024);
   - the marina, "Portugal's largest" (verify, or drop the caption);
   - the PGA Tour Champions event at the Els Club (2027 edition);
   - Formula 1 at Portimão, 2027.
5. **Add every course to facts.csv.**

## 7. Keep everything else
Developments, places, search, the Concierge, the simulator link, the cards and the other layers all work as before, in golf mode too.

## 8. Links
1. `?mode=golf` and /golf open the map in golf mode.
2. /arrow opens golf mode on Vilamoura, with the developments and the flags in view.

## 9. Acceptance (phone and desktop, PT, EN and FR)
1. Every item in §1 is there, and the result is visibly better than v3. The awe test (§2.4) passed.
2. Every Details course shows a flag. A tap opens its card, and the card has the "minutes from the nearest development" number.
3. Every development card shows "From your door".
4. Nothing else on the map is lost or broken; visual-check is clean outside golf mode.
5. /arrow opens golf mode on Vilamoura.
6. The checks and the build pass.

## 10. Report
1. The designer's three refinements for the operator's yes, as screenshots saved to files (§2.5). Nothing goes live before his yes (prompt 77 §2). After it, go live under D67.
2. The verified list of Details courses with sources.
3. After his yes, the live links.
