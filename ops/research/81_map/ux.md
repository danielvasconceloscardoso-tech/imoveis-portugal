# Prompt 81, agent 1: the map as a first-time reader sees it

Audit of the live site, https://imoveisportugal.pt, on 10 November 2026. Nothing was changed.

## How I tested

- Headless Chromium through Playwright. Phone: iPhone 13 profile, 390 wide. Desktop: 1440 x 900. No throttling.
- Pages: `/pt/lu/mapa/`, `/en/us/map/`, `/fr/fr/carte/`, the cards `?place=gondomar`, `tavira`, `viseu`, `cascais`, `funchal`, `corvo`, `sao-joao-da-madeira`, the home pages `/pt/lu/` and `/en/us/`, and `/pt/lu/regressar/`.
- Our analytics were blocked and the request endpoint was mocked. No form was sent.
- Each fresh visit started with empty storage, so every run is a first visit.
- Graphics here are drawn in software, which is slower than a real phone. Every problem below is about what appears, where it sits and what a tap does. None is about smoothness. I report no speed fault.
- Real Safari was not available. Where that matters, the problem says so.
- Event data: none exists. `ops/METRICS.md` reads "No week collected yet" and there is no `ops/metrics` folder. Where readers stop is unknown until Cloudflare Web Analytics is connected.

Full-size PNGs are in `the session scratch folder: p81/ux/`. The pictures below are reduced copies.

## The 10 problems that cost readers the most

### 1. Most cards are a stub next to Gondomar

- **Where:** any ordinary place, phone and desktop. Checked: Tavira, Viseu, Cascais, Funchal, Corvo, São João da Madeira, Vila de Rei.
- **What the reader sees:** Gondomar lists seven schools and seven health units, each in minutes by car. Tavira shows one school and one hospital, in straight-line kilometres, inside a section that is closed. Tavira and Viseu have no photograph at all.
- **Details that hurt:**
  - Cascais and Corvo say "Em breve. Estamos a reunir estes números" where the beach and airport should be.
  - Viseu's international school line reads "Deutsche Schule zu Porto, a 80,3 km". That is a line that says nothing useful.
  - The card never says whether the hospital has an emergency department.
  - By the site's own photo list, 224 of the 308 places have no picture. Faro, Sintra, Évora, Óbidos and Coimbra are among them.
- **Why it costs us:** the reader compares two places and one looks unfinished. He trusts the finished one less too. The paid analysis promises "the full lists of schools and health", which exist for 29 places.
- **Fix:** one fixed block of service lines on every card, open, in minutes by car: emergency hospital, health centre, international school, schools within 20 minutes, beach, airport. When the nearest one is far, say "none within 45 minutes". When a number is missing, leave that one line out. Never show "coming soon".
- **Screenshots:** [phone, three cards side by side](shots/ux-01-phone-services-gap.jpg) · [desktop, Tavira from a shared link](shots/ux-13-desktop-ordinary-tavira.jpg)

### 2. On a phone the card is a keyhole

- **Where:** `/pt/lu/mapa/?place=gondomar`, phone. The same on every card.
- **What the reader sees:** the card opens 320 pixels tall on a 664-pixel screen. Swiping up scrolls the text inside that small window. The card does not grow. In Gondomar the schools sit two full swipes down, and each line is still closed and needs a tap.
- **More:**
  - The card grows only if the reader drags or taps the small grey bar at the top. Nothing says so.
  - "Falar com o Concierge" is below the fold when the card opens.
  - The full Gondomar card is 1,157 pixels long, read through a 299-pixel window.
- **Why it costs us:** most readers are on a phone. They see a name and a price per square metre and leave. The services, the developments and the request button are never reached.
- **Fix:** the first upward swipe anywhere on the card opens it to full height, as Apple Maps does. Only then does the text scroll. Open at about 60% of the screen. Keep the request button fixed at the bottom of the card.
- **Not tested:** real Safari. The behaviour is the page's own code, so I expect the same there.
- **Screenshot:** [phone, three steps](shots/ux-02-phone-card-keyhole.jpg)

### 3. On /regressar, tastes remove places and never reorder them, out of sight

- **Where:** `/pt/lu/regressar/`, "O que quer por perto?", phone and desktop. This is the only taste picker I found on the site.
- **What the reader sees:** he taps "Gastronomia". Nothing on the screen moves. The results are about three screens further down on a phone and below the fold on a desktop.
- **What the results did, at 5,000 CHF net, renting:**

  | Tastes chosen | Places shown |
  | --- | --- |
  | none | Lisboa, Cascais, Porto |
  | Escola internacional | Lisboa, Cascais, Porto (the same) |
  | Praia | Porto, Lagos, Matosinhos |
  | Praia + Escola internacional | Porto, Lagos, Matosinhos (the same as Praia alone) |
  | Golfe | Lisboa, Cascais, Lagos |
  | Gastronomia | Porto, Matosinhos (two only) |
  | all six | Matosinhos (one only) |
  | buying, none | Lisboa, Cascais, Lagos |
  | buying, Golfe | Lisboa, Cascais, Lagos (the same) |

- **More:**
  - The operator is right. A taste is a yes or no. It can only take a place away. The more he asks for, the less he is shown.
  - Never more than three places. They come dearest first.
  - The tags look wrong to anyone who knows Portugal. Cascais has no "Praia". Lisboa has no "Arte" and no "Gastronomia". So choosing food removes Lisbon.
  - No result says why it is there. There are no minutes and no distances.
  - A result is not a link. The page has no link to the map at all. It has its own header without the site menu.
  - With a low salary the list goes blank. No sentence explains it.
- **Why it costs us:** the reader tells us what he wants and gets nothing back. That is the moment he would have opened a place and asked for a call.
- **Fix:** put the results directly under the chips. Rank all 308 places by the chosen tastes within the budget. Show five. Give each its reasons in numbers. Make each result open its card on the map. When nothing fits, say which taste to relax.
- **Screenshot:** [phone, three states](shots/ux-03-regressar-tastes.jpg)

### 4. A tap on the map opens a place the reader did not choose

- **Where:** the national view, phone and desktop.
- **What the reader sees:** on a phone a municipality is a few pixels wide. I tapped just under the word "CENTRO" and Vila de Rei opened. On a desktop I clicked the word "Porto" and Santa Maria da Feira opened.
- **More:** the place names on the map are not buttons. The tap goes to whatever land lies under the letters. On a desktop a small name appears under the pointer. A finger gets no such warning.
- **Why it costs us:** the first tap is the first impression. A wrong place looks like a broken map.
- **Fix:** make every name on the map a button for that place. At the national view, a tap on bare land zooms in to that region first. A place opens only once it is large enough to hit.
- **Screenshots:** [phone, before and after](shots/ux-04-phone-wrong-place.jpg) · [desktop, the word "Porto"](shots/ux-04b-desktop-porto-label.jpg)

### 5. Search fails on the names foreign readers type

- **Where:** "Procurar um lugar" / "Find a place", all three editions.
- **What the reader sees:**
  - On the US map, "Lisbon" finds one golf club and not the city. "Oporto" finds a golf club.
  - "Algarve", "Azores" and "Silver Coast" find nothing. "Madeira" finds São João da Madeira, near Porto.
  - One wrong letter finds nothing: "Gondomr", "Cascias". No suggestion is offered.
  - "Porto" lists Porto de Mós first, and Enter picks the first line.
  - The empty box offers nothing, and its hint is cut off on a phone.
  - The message says "Nenhum concelho com esse nome" although the box also searches beaches and golf courses.
- **Why it costs us:** the US and Israel editions are in English. Their readers type English names and are told the capital does not exist.
- **Fix:** add the English and French names and the seven regions to the search list. Accept one or two wrong letters and offer "Did you mean". Put an exact match first. Show six well-known places before the reader types.
- **Screenshots:** [desktop, "Lisbon"](shots/ux-05-search-lisbon.jpg) · [phone, three states](shots/ux-05b-phone-search.jpg)

### 6. On a phone the region tiles do not take the reader to the region

- **Where:** `/pt/lu/mapa/`, the photo tiles at the bottom, phone.
- **What the reader sees:** he taps "Algarve". The card opens and the map still shows Lisbon and Alentejo, with the Algarve at the very edge under the card. He taps "Açores" and the map shows the north of the mainland. The card then says "Toque num concelho para o ver de perto", and the municipalities are too small to tap.
- **More:** on a desktop the Norte tile frames the north well. The Madeira tile leaves Madeira as a speck in the ocean.
- **Why it costs us:** the tiles are the clearest first action on the page. On a phone they lead to a dead end.
- **Fix:** frame the region in the part of the map that stays visible above the card. For the islands, zoom to the island group. Add the region's main towns to the region card as buttons.
- **Note:** the camera's position is calculated, not drawn, so the slow graphics here should not change it. Confirm on a real phone.
- **Screenshot:** [phone, three tiles](shots/ux-06-phone-region-tiles.jpg)

### 7. On the home page the map traps the scroll

- **Where:** `/pt/lu/` and `/en/us/`, the map section, phone and desktop.
- **What the reader sees:** on a phone the map fills almost the whole screen. He swipes up on it to read on. The page does not move. Portugal slides away and he is left looking at the sea. On a desktop the mouse wheel zooms the map and the page stays where it is.
- **Why it costs us:** the home page is the main way into the map. Everything below the map is cut off, such as the development cards on the US home page.
- **Fix:** on the home page, one finger scrolls the page and two fingers move the map. On a desktop the wheel scrolls the page unless Ctrl is held. The full map page keeps today's behaviour.
- **Not tested:** real Safari. The map library handles touch the same way there, so I expect the same.
- **Screenshots:** [phone, before and after one swipe](shots/ux-07-home-scroll-trap.jpg) · [desktop, after the wheel](shots/ux-07b-desktop-home-wheel.jpg)

### 8. The first five seconds do not say what to do

- **Where:** `/pt/lu/mapa/` and `/en/us/map/`, first visit, phone and desktop.
- **What the reader sees:** a welcome card, "Portugal. Encontre o lugar onde quer viver." It leaves by itself after about two seconds. In my runs its photograph arrived less than a second before the card left. Then: a map with seven region names, photo pins, three buttons and a row of photo tiles. No words say what a tap does.
- **More:**
  - The page's own promise is the budget: "Escreva um orçamento e veja os m²". The budget box is inside "Camadas", below the fold of that panel. The sentence itself is under the map.
  - The welcome says "find the place". The map then offers no way to find one except by its name.
  - The pins that catch the eye are six developments, piled on top of each other in two heaps.
  - On a desktop, mainland Portugal takes about a fifth of the width. The rest is sea.
  - `/fr/fr/carte/` has no welcome and an older look. See "Smaller things".
- **Why it costs us:** a newcomer understands "a map of Portugal" and nothing about what we offer. The one idea of the page is hidden.
- **Fix:** keep the welcome until the reader acts. Give it one question and one field: the budget, or "what matters to you". After that the map opens already answering it.
- **Screenshots:** [phone, three moments](shots/ux-08-phone-first-seconds.jpg) · [desktop, second five](shots/ux-08b-desktop-first-screen.jpg)

### 9. The paid analysis is a dead end

- **Where:** any card, "Ver a análise completa", phone and desktop.
- **What the reader sees:** a small text link under the main button. It says "see the full analysis" and opens a price list: 29 € a region, 99 € all of Portugal, 12 months. At the bottom is a grey button, "Disponível em breve". There is nothing else to do.
- **More:**
  - The list repeats itself. "Rendas e rendimento bruto" and "Dez anos de preços" each appear twice.
  - It promises "the full lists of schools and health" for every place. Today 29 places have them.
  - The reader cannot leave an email to be told when it opens.
- **Why it costs us:** every reader who wanted to pay is turned away, and we learn nothing about who he was. This is our first measure of demand for a paid product.
- **Fix:** replace the grey button with "Avise-me quando abrir": one email field, double opt-in, tagged with the place. Name the link for what it opens, "Análise completa: 29 €". List each item once.
- **Screenshot:** [phone, three steps](shots/ux-09-paid-dead-end.jpg)

### 10. No way back to Portugal

- **Where:** after closing any card, phone and desktop.
- **What the reader sees:** he closes the card. The map stays zoomed in on a few inland municipalities. There is no "Portugal" button and no plus and minus. The browser's back button closes the card and leaves the same close view.
- **More:** on a phone the only way out is to pinch. On a desktop it is the wheel. I did not test the keyboard.
- **Why it costs us:** the reader who wanted a second place is lost in a spot he did not choose. See problem 4.
- **Fix:** a small "Portugal" button whenever the map is zoomed in, and plus and minus on the desktop. Closing a region card returns to the national view.
- **Screenshots:** [phone, after close and after back](shots/ux-10-no-way-back.jpg) · [desktop, after close](shots/ux-10b-desktop-no-way-back.jpg)

## Smaller things, not in the ten

1. **The French map is a different product.** `/fr/fr/carte/` has the older look: other colours, a round search box, town names on the map, no welcome. Its Gondomar card is in another order: the developments first, then the schools, and the price after them. [Screenshot](shots/ux-11-fr-older-map.jpg). Only `/pt/lu/` and `/en/us/` have the new look.
2. **The English site links to a Portuguese page.** In the US edition the "Programa Regressar" menu item goes to `/pt/us/regressar/`. An English page exists at `/en/us/regressar/`. `/pt/regressar/` is a 404; the page lives at `/pt/lu/regressar/`.
3. **A credit covers a caption.** On the Açores region card the photographer's credit sits on top of "Lagoa das Sete Cidades, São Miguel". It is visible in the third panel of the screenshot for problem 6.
4. **A photograph does not open.** Swiping the Gondomar gallery works. Tapping a photo does nothing. METHOD.md asks for one tap to the full-bleed picture.
5. **The page title is hidden.** "Quanto espaço compra o seu orçamento" is on the page and is not shown.

## What already works and must be kept

1. **The Gondomar card on a desktop.** The camera comes down over the Douro, the photograph, the name, one line, then the price. It is the best screen on the site. [Screenshot](shots/ux-12-desktop-gondomar-card.jpg).
2. **Questions answered in minutes.** "Escolas: 7 a menos de 20 min", "Um hospital a 2 min", "Porto a 12 min de carro". Keep this exact form for all 308.
3. **The budget made human.** "Com 300 000 €: cerca de 128 m²", and in the US edition "$336,000 (€300,000)".
4. **Links that hold.** `?place=` opens straight on the card. The address changes with each place. The browser's back button closes the card. Escape closes the price sheet and keeps the card.
5. **Search without accents.** "Evora", "obidos" and "sao bras" all find their place. Results are grouped: municipalities, parishes, beaches, golf. "Comporta" and "Foz" lead to their municipality.
6. **Sources.** "Fontes" gives one plain dated line per number. This is rare and it builds trust.
7. **The Concierge remembers.** From a card it opens with "Sobre: Gondomar" and the budget already set.
8. **The region photo tiles.** They are the right first action. They need the camera to follow (problem 6).
9. **The name under the pointer** on a desktop, before the click.
10. **Speed.** The page answered in about 1.5 seconds and the map was usable within five, even with slow graphics here.
11. **The look.** Ivory, green, Playfair and Manrope, and the photo pins.

## Does a taste finder exist on the map?

No.

The map lets a reader find a place by name, by tapping, or by one of seven region tiles. Nothing on it asks what matters to him and nothing narrows or orders places by it.

What the map does have:

1. **"Golfe"**: a separate golf view. I did not audit it.
2. **"Camadas"**: price as colour; golf courses, beaches and new developments drawn on the map; 2D and 3D; a budget slider; five guided tours. These show things. They do not shortlist places.
3. **Search**: typing "international school" or "escola internacional" finds nothing. "beach" finds only things with "beach" in their name.

The welcome card says "Encontre o lugar onde quer viver". The map then gives no tool to do it.

The only taste picker I found is the six chips on `/regressar` (problem 3). It is not linked to the map. The first step of the Concierge asks for the purpose and the budget, not for tastes. I saw only that first step and did not go further, so no request was started.

## What I could not test

1. **Real Safari on an iPhone.** The card's drag, the scroll trap, the bottom bar and the notch area need a real device. Problems 2 and 7 most of all.
2. **Motion.** The 3D arrivals, the camera moves and the films run in slow software graphics here. I cannot judge how they feel.
3. **Slow connections.** The brief asked for a fast connection only.
4. **Where readers stop.** No event counts exist yet (see "How I tested").
5. **Sending a request.** By rule no form was sent. The Concierge was opened at step 1 only.
6. **A second visit.** Every run was a first visit. I did not check what a returning reader sees.
7. **Golf mode.** Left alone, as the brief requires.
8. **The other editions.** `/ch`, `/br`, `/il` and `/uk` were not opened.
9. **Dark mode, reduced motion, landscape, tablets and screen readers.**
10. **The paid analysis itself.** It does not exist yet. Only its price sheet could be seen.
