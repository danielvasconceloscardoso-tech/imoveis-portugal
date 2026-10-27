# Prompt 34: home page, imagery and navigation fixes (operator, 27 Oct, evening)

CEO, 27 Oct 2026. Work on branch `design-v2`. This is the only focus until the operator approves it. Nothing is published or merged without his "go".

## 1. Navigation: add the simulators

1. **Add "Simuladores"** to the main navigation (EN "Calculators", FR "Simulateurs"). It links to the simulators hub, listing every calculator. If no hub page exists yet, build one in the site's style: one card per simulator, each a short line and one action.
2. **Navigation, in this order** (five items, D37):
   - [path] · Mapa · Simuladores · Perguntas · Parceiros;
   - the Concierge button stays on the right.
3. **"O seu percurso" will be renamed;** the operator is choosing the name. Keep the current label until he does. Make the label a single i18n key so the rename is one line in PT, EN and FR.

## 2. The home map: stop moving

The slow rotation stays, and it is liked. It stops for good:
- after 15 seconds; or
- at the first interaction: click, tap, drag, wheel, keyboard focus, or typing in the control bar.

Whichever comes first. It never restarts by itself. Reduced motion: no rotation at all.

## 3. Photographs: replace these

1. **Section "Primeiro a informação, depois os parceiros"** (the olive tree over a pool): the operator finds it ugly and off-brand. Replace it with Comporta in the resort register: an aerial of the long white beach with turquoise water and dunes, or the rice fields at golden hour.
2. **Place cards.** The operator sent reference screenshots. Do not use them: they come from a Google image search and their rights are unknown. Find licensed equivalents:
   - **Cascais:** an aerial of Cascais bay and beach: turquoise water, the old town, small boats, warm light;
   - **Algarve:** the golden cliffs above a long beach and turquoise sea (Lagos coast, Porto de Mós or Ponta da Piedade style), late-afternoon light;
   - **Lisboa:** the São Jorge castle and the 25 de Abril bridge at sunset, pink-gold sky, over the rooftops;
   - **Madeira:** the New Year's Eve fireworks over Funchal bay.

## 4. Where photographs may come from

1. **Free, no credit needed:**
   - Unsplash (images.unsplash.com);
   - Pexels (images.pexels.com, direct downloads, no API key needed);
   - Pixabay (the key in the session, or cdn.pixabay.com).
2. **Only if nothing else fits:** Wikimedia Commons (CC BY or CC BY-SA), credited on /credits only.
3. **Never:**
   - Google Images results;
   - Shutterstock, iStock, Getty, Adobe Stock, Alamy, Dreamstime, 123RF (unless the operator buys a licence);
   - hotel, booking or travel-blog photographs;
   - anything with a watermark.
4. **Every photograph:**
   - checked to show the place named;
   - logged in content/media/SOURCES.md (page URL, licence, date);
   - no credit on the image or in a caption;
   - graded to match the D60 look;
   - WebP in three sizes with srcset, lazy below the fold;
   - descriptive alt text in PT, EN and FR.

## 5. Show options before placing

For each of the five images (Comporta section, Cascais, Algarve, Lisboa, Madeira fireworks):
- find **two or three options**;
- send one contact sheet: each option with its source page and licence;
- wait for the operator's pick, then place the chosen ones.

If a subject has no licensed option (the Madeira fireworks is the most likely), say so and list the best Wikimedia option and its credit line.

## Report

Send the options contact sheet first. After the picks: desktop and mobile screenshots of the home page and a 15-second recording of the map stopping. Don't send, publish or merge anything.
