# Prompt 10 — Copy, FAQ, translations and mobile: trust and belonging

To run: "Read ops/prompts/10_copy_mobile_belonging.md and execute it." Work on your branch. Nothing is merged, published or sent without Daniel's approval.

Daniel's verdict on v2: better. He likes the sources and the calls to action, so keep them. Still not good enough: the copy and text, the FAQ wording, the translations, and the mobile experience. Target feeling: **reliable, trustworthy, and "I want to belong to this"**.

## 1. Learn the voice from five references (short)

Read each one and write one line in design/v2/VOICE.md on what we take. Don't copy their text.

| Reference | What to take |
| --- | --- |
| Ryan Serhant (serhant.com) | Sell the life, then prove it with numbers. Confident, warm, a call to action on every screen |
| Gary Vaynerchuk (garyvee.com) | Document, don't invent. Talk like a person, native to each format, empathy first |
| Lucas Valente da Silva (Forbes PT: forbespt.com/forca-determinacao-e-resiliencia-a-historia-inspiradora-de-lucas-valente-da-silva ; idealista.pt/news/node/76778) | Portuguese real estate built on a personal, consistent, humble-expert brand and video. Style reference only: agencies are never sponsors or outreach targets (D9) |
| Amorim family in Comporta (idealista.pt/news/node/38048) | Quiet luxury: few words, place and lifestyle, nature, calm confidence, premium photography |
| José Cardoso Botelho / Vanguard Properties (essential-business.pt/?p=8092 ; idealista.pt/news/node/68654) | International buyers, design-led projects, an assured voice about Portugal |

## 2. Voice rules (put them in content/VOICE.md and apply them everywhere)

1. **Belonging first.** Talk to people who live abroad with Portugal at heart: "a sua casa em Portugal, mesmo a viver lá fora". Use "we" and "you", never "users" or "clients".
2. **Trust through proof.** Every figure has its source (keep the current source style). The licensed partner agency is named with its AMI licence (13250). Sponsored content is labelled. Never call the platform independent.
3. **Short and specific.** Headlines under 8 words, with a number or a place where possible. One idea per paragraph, one action per screen.
4. **Describe, never advise** (content/EDITORIAL_POLICY.md). No promises of returns. Banned words: "paraíso", "oportunidade única", "investimento garantido" and their FR/EN equivalents.
5. **No invented proof:** no fake numbers, testimonials, logos or "as seen in" (Código da Publicidade, DL 330/90).

## 3. Rewrite the copy

1. Rewrite every page (home, partners, buy, talk to a partner, free guide, FAQ, legal intros) for all editions in PT (European Portuguese), EN and FR. Write each language natively instead of translating word for word; follow content/GLOSSARY.md.
2. **FAQ:** keep the questions, sources and calls to action. Rewrite the answers so a 60-year-old emigrant and a 35-year-old American both get it on first read: 40–70 words, the answer in the first sentence, then the detail, then the call to action.
3. Put every text in one copy deck, **content/copy/COPY_DECK.md** (page → block → PT / EN / FR), and make the site read from it or keep it in sync. Daniel and the CEO will edit the deck directly; you apply it.

## 4. Mobile (most visitors arrive from social media on a phone)

1. Design at 375 px first: body text 17–18 px, generous spacing, thumb-reachable buttons, a compact header with the language switch, and a sticky bottom call to action ("Falar com um parceiro" / "Receber o guia").
2. No wide tables on mobile: use cards or accordions. The FAQ is an accordion with search.
3. Trust is visible on the first screen: what we are, the partner agency with AMI 13250, and "fontes oficiais" under the figures.
4. Use real, warm photography of Portuguese places and homes; never imply a photo is a specific property for sale.
5. Run Lighthouse mobile at 95 or above, and screenshot each page type on iPhone and Android sizes.

## 5. Photo credits

Remove every visible "Unsplash" credit from the site and the e-books (the Unsplash licence does not require attribution). Keep the full list of photo sources in site/public/photos/CREDITS.md in the repo, not linked from the site. Keep all other source citations.

## Review

Push to the same branch after each section so the preview link stays current. When done, reply with: the preview link, mobile screenshots per page type, the path to COPY_DECK.md, and the list of anything you couldn't verify. Keep it short. Don't merge.
