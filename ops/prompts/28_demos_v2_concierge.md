# Prompt 28 — Developer demos v2: the Claridge's standard (D53)

To run: "Read ops/prompts/28_demos_v2_concierge.md and execute it." **Priority: do this before anything else in the queue.** Work on the same branch. Private demos only (noindex, unlisted); nothing is sent, published or merged without the operator's "go". English only (D51). Identity D50.

Daniel's verdict on v1: not what Claridge's would present. The demo must feel **elegant, tech-savvy and concierge-like**: calm, precise, beautiful, and about the developer's own homes.

## 1. Who

1. **Vanguard Properties**: use their current projects with published prices and images from vangproperties.com (forget Muda unless it has published prices). Buyer: a family in New York, budget in $.
2. **Vale do Lobo, The Residences** (Loulé): valedolobo.com, plus public listings (Savills, JamesEdition) for prices. Buyer: California and Zurich.
3. **Shalu Investments, O'rizon Living** (Gondomar): public listings with prices and photos (Imovirtual, JamesEdition). Buyer: Tel Aviv and New York.
4. **Replace OneMark** (no public projects yet) with the developer from our list that publishes the most homes with prices and images: first choice **VIC Properties** (vic-properties.com, Lisbon), otherwise Krest (Formoso Marvila) or Ando Living (Comporta). Buyer: Geneva or Luxembourg.
Keep OneMark in the pipeline for when their first project is public.

## 2. Their homes, on our map (also a real site feature)

1. From each developer's own website and public listings, take **only published facts**: project and unit names, typologies, areas, **prices as published** ("from" or per unit), delivery date, the developer's own photos and renders, and the link back. Record the source URL and date of every item in content/developers/projects.json. Their images appear only in their own private demo (and later on the site only once they are a partner), always credited.
2. **Partner showcase page** for each developer, per municipality: reached by clicking the developer on the map's place card ("Partner developers here") and from the Partners page. Layout like an editorial property book: a large hero image, the developer's name in the display serif, a short line about the project, then the homes as an elegant grid (image, typology, area, price, delivery), each opening a detail view with a gallery, the municipality's INE context next to it, the cost simulator prefilled with that home's price, and **"Arrange a private viewing"** (request routed per config, task 8z).
3. Build this for real on the site (partner projects only, labelled "Sponsored"), not only in the demos.

## 2b. The concierge layer: one team around each buyer, and enquiries that arrive qualified (D54)

1. **"Your team for this purchase"** (site feature and demo scene): when a reader requests a viewing or advances on the path, a calm card assembles the partners their case needs, step by step, each with one line on what they do for this buyer: the developer or the agency for the home; a lawyer for NIF, power of attorney and the deed; the credit partner for financing (DL 81-C/2017, registered); a money-transfer partner for the currency; a tax adviser for their country of residence; insurance; later an architect or interior designer, and rental management. The reader chooses who may contact them; each recipient is named at consent (GDPR arts. 6(1)(a), 7). Partners appear only once they are partners (labelled); empty steps show the step without a name.
2. **Simulators vet the enquiry:** the request carries what the reader already entered: country, budget, total purchase cost, own funds versus financing need, an indicative debt-to-income estimate, timing, NIF yes or no, and whether they used the 10-year data for that municipality. The developer receives a short, readable summary ("Cash buyer · ready within 6 months · NIF in place · total budget €2.1 M incl. taxes"), not a score that decides anything about the buyer. Explained in the privacy notice (GDPR art. 13); estimates labelled indicative (not a credit assessment); for high budgets the agency's identification and proof of funds still apply (Lei 83/2017).
3. **In the film:** after "Arrange a private viewing" (storyboard step 6), add a 6–8 second scene: the "Your team" card assembling itself (lawyer, financing, currency, tax at home), then the developer's view of the same enquiry as a qualified summary. Keep total length under 60 s by shortening the embed scene.
4. **In the PDF and monthly report:** a "How enquiries reach you" panel: the qualified summary format and enquiries by readiness (illustrative, labelled).
5. **On the site:** add the "Your team" panel to the path (prompt 27) at every checkpoint, and the qualified summary to every enquiry routed to a partner.

## 3. The film (45–60 s, 1080p, 30 fps), one per developer

Storyboard:
1. **0–4 s:** black, then the wordmark fades in. A quiet line: "Prepared for [Developer] · private preview".
2. **4–10 s:** Portugal in 3D, slow orbit, no interface.
3. **10–16 s:** a concierge line in the display serif, centred, then gone: "A family in New York. Five million dollars." The budget field writes itself.
4. **16–24 s:** the camera glides to the municipality; the extrusion rises; three numbers appear one by one, large: m² for that budget, ten-year growth, gross yield (INE, period in small type).
5. **24–38 s:** "Partner developers here" → their showcase page: hero image, then the grid of their homes with prices, scrolling slowly.
6. **38–46 s:** one home opens: gallery, price, the simulator's total cost, "Arrange a private viewing" with the buyer's details already filled in.
7. **46–54 s:** "On your own website": the same map in their colours on a neutral mock-up.
8. **54–60 s:** a final card: "Your buyers, wherever they live." Then "Imóveis Portugal".

Art direction:
1. No subtitles box. Words appear as typographic cards (display serif, generous size), or small, white, lower third with a soft shadow, never over the map or the homes.
2. No visible mouse pointer (or a discreet dot); no menus, scrollbars or browser chrome; smooth eased camera and scroll; crossfades only.
3. Colours, type and spacing from D50; real photography; nothing that looks generated.
4. Optional music: a quiet, licence-free track (CC0 or royalty-free with a commercial licence recorded in sponsors/demos/README.md); otherwise silence.
5. Export MP4 (H.264) plus a 6-second silent loop for email previews.

## 4. The one-page PDF and the demo page

Same storyboard on paper: cover with their best image, the three numbers, their homes with prices, the "private viewing" flow, the embed, and the illustrative monthly report ("Illustrative example · not real data"). Demo page /d/{token}/ updated to match, in the same order.

## Review

Push, then reply with the four new MP4s, the four PDFs, the four demo links and the showcase page links, plus the source list of every price and image used. Keep it short. Don't merge.
