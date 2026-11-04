# Prompt 68: Tapping Gondomar, done the Jobs / Belmond / Claridge's way

Operator, 4 Nov 2026:
- "The map no longer shows the developments as before. It was easier to see the development on the map and when I clicked Gondomar. Now I have a bunch of text."
- On the card photos: "I hate the Gondomar pictures on that card. See the view Shalu has. That's Gondomar. What we have looks like a poor block."

Goes live under D67. Follow content/METHOD.md (CLAUDE.md rule 16) and rule 17: Gondomar is the sample. Record it as the next free D number.

## What went wrong (3 Nov commits)
1. **01c7d48b** made a tap on Gondomar open a long report: a gallery, the price in words, drive times, seven schools and seven health centres by name, sources and two buttons. The development is one line at the bottom (map-v3.ts `showPlace`, the `nearBy` loop). Before, the partner project's card opened first (prompt 39 §2.6).
2. **d7ee789a ("clean first view")** moved most of the map behind "Camadas".
3. **The three card photos** (gondomar-douro-gramido, gondomar-melres-douro, gondomar-marina-melres) are small, flat midday shots of Gondomar's rural east. Shalu's aerials show Gondomar at its best: the wide Douro at Valbom and the Freixo, the bridges, Porto behind, at golden hour.
4. **/orizon** opens that long card, not O'rizon.

## The five questions (METHOD.md), answered for this moment
1. **Feel:** "I have arrived somewhere I could live, and someone has already thought of everything."
2. **Arrival:**
   - the camera comes down the Douro to Gondomar (3D, about 2 s; any touch takes over; reduced motion jumps);
   - the name in large type, and one line: "Gondomar. O Douro, a 12 minutos dos Aliados" (OSRM, already in place.json).
3. **Hero:**
   - O'rizon's photo pin stands at its real spot, visible from the opening view of Portugal, labelled "Seleção" / "Our pick" / "Sélection".
   - The card opens on O'rizon: the full-bleed render, one line ("200 casas sobre o Douro, junto à Marina do Freixo"), and one action, "Marcar uma visita privada".
   - "Ver o empreendimento" sits below as a quiet link.
4. **The next questions,** one line each, opening on tap: "Porto? 12 min." "Escolas? 7 a menos de 15 min." "300 000 €? Cerca de 128 m²."
   - The lists, the sources and the paid tiles live behind these taps.
   - Nothing on the first screen that has to be read line by line. Every free/paid boundary stays as it is.
5. **One more thing:** the last line of the card is "Daqui sai 42% da ourivesaria portuguesa." (Câmara de Gondomar, 2023; add it to facts.csv.)

The pattern comes from projects.json, so the next partner place works with no code change.

## Photographs
Shalu has authorised it (operator, 4 Nov).
1. **The Gondomar card photographs are Shalu's river aerials,** credited "Shalu Investments": aerial-douro, aerial-dusk and aerial-river in site/public/img/developers/orizon/.
2. **The three old photos come off the card.** Keep the files.

## /orizon
Opens O'rizon's card on the map, in English, with Gondomar in view. Add `?project=` if it does not exist. The private preview /d/f658bd1eef/ stays as it is.

## Before you push
1. Tag `backup/pre-68-2026-11-04` on main and design-v2.
2. Run the checks and the build.
3. Make before and after phone screenshots of:
   - the opening view;
   - a tap on Gondomar;
   - imoveisportugal.lu/orizon.

## Acceptance (on main, phone and desktop)
1. The O'rizon pin, with its photo, shows on the opening view, labelled "Seleção" / "Our pick", never "Patrocinado".
2. Tapping Gondomar gives the arrival, then O'rizon first, then the one-line answers. Nothing on the first screen reads like a report.
3. The Gondomar card shows Shalu's aerials, credited.
4. /orizon opens O'rizon's card in English.
5. The checks and the build pass, and the live link works.

## Report
1. The live links and the before and after screenshots.
2. What you could not do.
3. Wait for the operator's go before applying the pattern to other places (rule 17).
