# Prompt 68: On the map, the development comes first again

Operator, 4 Nov 2026: "The map no longer shows the developments as before. It was easier to see the development on the map and when I clicked Gondomar. Now I have a bunch of text."

Goes live under D67. Rules 16 and 17 apply: Gondomar is the sample. Record it as the next free D number.

## What changed (3 Nov, from the commits)
1. **d7ee789a (D83 part 2, "clean first view")** made the first view sparse and moved the layers behind "Camadas".
2. **01c7d48b (golden sample place card)** changed what a click on Gondomar opens.
   - Before, `?place=gondomar` and the click opened the partner project's card first (prompt 39 §2.6, prompt 38 §3).
   - Now they open the long place card: gallery, price in words, drive times, seven schools and seven health centres by name, sources, two buttons. The development is one small line at the very bottom (map-v3.ts `showPlace`, the `nearBy` loop).
3. **f35f3722 (prompt 66)** hid Marble Terrace on main, so only O'rizon is left in Gondomar.
4. **The short link /orizon** opens `/en/lu/map/?place=gondomar`, so Shalu lands on that wall of text, not on his project.

## Fix
1. **Pins.** Every shown development has its photo pin visible from the opening view of Portugal, clustered with a count when zoomed out (prompt 39 §2 rule 2). It is not hidden behind "Camadas", and it carries its tag (O'rizon: "Seleção" / "Our pick" / "Sélection").
2. **A place with a partner development opens the development first.** Gondomar opens O'rizon's card at the top: its best photograph, the name and tag, the homes, typologies and buildings, three features, what is for sale now, the published prices, and two actions ("Ver o empreendimento", "Pedir visita privada"). The place card sits right below it, or one tap away under the place's name. Generic, from projects.json: the next partner place works with no code change.
3. **The place card loses the wall of text.**
   - Each tile shows one number and one line, for example "Escolas · 7 a menos de 15 min" or "Porto · 15 min de carro".
   - The full lists and the sources open on tap.
   - Nothing on the first screen of the card that a reader has to read line by line.
   - Keep every free/paid boundary as it is.
4. **/orizon opens O'rizon's card on the map** (Gondomar in view, the card open), in English. Add a `?project=` parameter if none exists. Keep the private preview /d/f658bd1eef/ as it is.
5. **Nothing else changes.** Data, prices, events, Marble Terrace pending.

## Before you push
1. Tag `backup/pre-68-2026-11-04` on main and design-v2.
2. Run the checks and the build.
3. Make phone screenshots, before and after, of:
   - the opening view of Portugal;
   - a tap on Gondomar;
   - imoveisportugal.lu/orizon.

## Acceptance (check on main after the push, phone and desktop)
1. The O'rizon pin, with its photo, is visible on the opening view and labelled "Seleção" / "Our pick", never "Patrocinado".
2. Tapping Gondomar shows O'rizon first, with its photo, the homes and the two actions, before any place text.
3. The Gondomar place card fits its key facts on one phone screen; the lists open on tap.
4. /orizon opens O'rizon's card in English.
5. The checks and the build pass, and the live link works.

## Report
The live links, the before and after screenshots, and what you could not do. Wait for the operator's go before applying the shorter place card to places other than Gondomar (rule 17).
