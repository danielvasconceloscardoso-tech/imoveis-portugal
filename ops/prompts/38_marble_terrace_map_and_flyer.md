# Prompt 38: Marble Terrace (Gondomar) on the map, and a flyer for tomorrow's meeting

CEO, 28 Oct 2026, evening. Decision D65. Branch `design-v2` (site) and `sponsors/flyers/` (flyer). For the operator's father's meeting with the developer on **29 Oct**: everything must be ready by **08:00**.

**Source:** https://marbleterrace.pt/ (and its brochure PDF), plus any files the operator sends. The footer links to idinvestimentosimobiliarios.com: confirm whether that is the developer and use the company name it publishes.

**Facts from their site (28 Oct; re-check each one):**
- 55 apartments in three blocks (A, B, C), T1 to T4, about 70 to 425 m² total area;
- Avenida Dr. Mário Soares, Gondomar; "a few minutes from the centre of Gondomar, 10 minutes from Porto" (their words, attributed to them);
- a private parking box per unit;
- solar panels and EV charging per unit;
- Haier air conditioning, Miele and Geberit, home automation;
- gym, sauna and Turkish bath, library and coworking, a garden with a water mirror;
- a live availability table (sold, reserved, for sale);
- **no prices published:** show "Preço sob consulta", never an estimate;
- Marble Terrace Vila do Conde announced as coming next.

## 1. On the site: a cool experience (preview only)

1. **Partner pin on the map** (2D and 3D), in the "Novos empreendimentos" layer, at the building's address (geocode the official address with Nominatim). Visible by default on the Gondomar card and in the search ("Marble").
2. **A tour, "Marble Terrace, Gondomar":** the camera flies from the Atlantic over Porto and the Douro to Gondomar, settles on the building, and its card opens. About 15 seconds; any touch takes over.
3. **The card:** their best photograph, the name, "55 apartamentos · T1 a T4 · 3 blocos", three features (solar per unit, gym and spa, private parking), what is available now (counts from their table), "Preço sob consulta", and two actions: "Ver o empreendimento" and "Pedir visita privada".
4. **Showcase page** (as for the other developers):
   - their photographs as a gallery;
   - the availability table by block and typology (sold, reserved, for sale), with the date checked;
   - the features;
   - its place on the map;
   - Gondomar in official figures (INE median, 10 years, rent);
   - the cost simulator from the price the reader enters;
   - "Pedir visita privada" via the Concierge.
5. **Status:** marked partner "pending". It shows on the design-v2 preview for the meeting, never on the live site until the agreement is signed. Routing of requests follows task 8z (switchable); on the preview no request is sent.
6. **Images:** their own published images, used only for this pitch and the preview. The listing source is recorded in `content/developers/projects.json` with URL and date.

## 1b. The buyer's request: visit or buy (operator, 28 Oct: "I want to see the experience")

This is the heart of the pitch: the developer must see exactly what a buyer goes through, and what their sales team receives. Build it as a sheet over the showcase page (bottom sheet on mobile, side sheet on desktop), one question per screen, Apple-grade (prompt 35 §3). No form look.

**Two entry points, the same flow:**
- "Pedir visita privada" on the card and the showcase page;
- "Tenho interesse nesta casa" on any available unit in the availability table, which pre-fills block and typology.

**The steps:**
1. **What you'd like:** a visit online (video call) or in person; or "I want to buy / reserve this home".
2. **Which home:** block and typology, showing only units marked for sale, plus "still deciding". Pre-filled when the reader came from a unit.
3. **When:** three preferred slots in the coming two weeks, shown in Portugal time and in the reader's own time zone. For an online visit, the reader chooses video or phone.
4. **About you:** name, email, phone with country code, country of residence.
5. **Optional, in two taps:** budget range, how they'll pay (own funds or mortgage), when they'd like to buy. This becomes the qualified summary.
6. **Consent** (operator, 28 Oct: the partner agency already sells Marble Terrace): the request goes to **both**, with separate roles.
   - The partner agency's qualified advisor (Habinedita Gondomar, AMI 13250) is the buyer's single contact, from the first call to the deed.
   - The developer's sales team (ID Imob) receives a copy for the unit, availability and reservation.
   - Two separate, unticked consent boxes, one naming each recipient, and a link to the privacy notice.
   - Keep it switchable in config, in case the agreement changes.
7. **Confirmation:**
   - a calm screen ("Pedido recebido");
   - the next steps on a short line: call with the dedicated advisor → online visit → reservation → promissory contract → deed, with the team (lawyer, bank, tax adviser) introduced along the way;
   - "Add to calendar" (.ics) for the first preferred slot.

   The reply-time promise waits for the operator's approval.

**For the pitch, a "what the sales team receives" view:** a demo-only link on the showcase page opens the request exactly as the developer's sales team would get it, in our own email design: the unit, the slots, the contact details, the qualified summary first, and the consent record.

**On the preview:**
- no request is sent; the confirmation says it is a demonstration;
- a marked sample buyer can fill the flow in one tap, for showing it quickly in the meeting.

## 2. The flyer (A4, Portuguese, one page, PDF and PNG)

`sponsors/flyers/Marble_Terrace_ImoveisPortugal.pdf`, in our identity: white, near-black, Playfair Display and Manrope, our green, a lot of space.

1. **Top:** their best photograph, full width. Headline: "Marble Terrace, no mapa de Portugal." One line under it: "Compradores de seis países, de Lisboa a Nova Iorque, a encontrar o seu próximo empreendimento."
2. **What the developer gets,** in five short lines:
   - pin and tour on the map;
   - a showcase page with live availability;
   - presence in the weekly letter of six editions (Luxemburgo, França, Suíça, Brasil, EUA, Israel);
   - requests that arrive qualified (budget, timing, financing);
   - the Concierge introducing lawyer, bank and tax adviser to the buyer.
3. **Price, large and clear:** "5 000 € por edifício, até estar vendido." No annual subscription. Under it, one line: "Lançamento a 1 de dezembro de 2026."
4. **A screenshot** of their card on our map (3D), and a **QR code** to their showcase page on the preview link.
5. **Footer:** Imóveis Portugal and the brand contact geralportugalimoveis@gmail.com. No personal names. No audience numbers (we have none yet). Nothing we can't prove.

## 3. Report

Before 08:00, send:
- the flyer (PDF and PNG);
- the showcase page link;
- a 15-second recording of the tour;
- screenshots of the card on mobile and desktop.

Don't send anything to the developer, publish or merge.

## Allowlist

`marbleterrace.pt`, `*.marbleterrace.pt`, `idinvestimentosimobiliarios.com`, `*.idinvestimentosimobiliarios.com`.
