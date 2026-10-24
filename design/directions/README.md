# Three visual directions (prompt 02, Part A.1)

Static mocks of the home and partner pages of the Luxembourg edition. All copy and prices come from `site/src/i18n.ts` and `site/src/config.ts`, so they show real text. They're not the site: once the operator picks one, it gets built into `site/`.

Boards to compare: `screens/board-a.jpg`, `screens/board-b.jpg`, `screens/board-c.jpg` (desktop home, desktop partners, mobile home). Every page at 1440 px and 390 px is in `screens/`.

## A · Folha: financial broadsheet

The financial press, without the salmon paper: a white page, black ink and one Atlantic blue (`#0a3a66`) for buttons and the current page. A centred masthead sits between a single rule and a double rule. Headlines and figures use Schibsted Grotesk (designed for a Scandinavian news group) and the reading text uses Source Serif 4. Facts sit in a ruled strip of four columns, and the packages are a ruled price table with right-aligned figures. Photos are documentary, cropped portrait, always captioned. The wordmark is "Imóveis" bold plus "Portugal" regular, set as one word-pair, and the favicon is "IP" on black.

It signals a serious, data-first publication that banks and law firms read. The risk is that it's the most restrained of the three and the least emotional for buyers.

## B · Atlântico: photo-led property magazine

A premium property magazine: deep navy (`#0c1a23`) with warm white text and a sand accent (`#dcc39b`) used only for figures and prices. Each page opens with a full-bleed photo, and the headline sits in a solid navy panel cut into the photo (no gradient overlay). The type is Jost: light for headlines, regular for text. A large photo pair breaks up the page. The wordmark is lowercase "imóveis portugal" (medium plus light), and the favicon is "ip" on navy.

It's the most aspirational of the three and closest to how buyers dream about a house in Portugal. The risk is that dark pages are heavier to read for long articles, and everything depends on having strong photos.

## C · Betão: Portuguese modernism

Inspired by the Porto school of architecture (Siza, Souto de Moura): white space, concrete grey panels (`#e6e6e3`), black, and black-and-white photography. Each edition gets one colour block: LU blue, FR navy, CH red and BR green, each with white text at AA contrast. A strict 12-column grid puts each section heading in the left margin and its content on the right. The type is Archivo at several widths, expanded for headings and figures. The wordmark is "Imóveis / Portugal" stacked next to the edition's colour square, and the favicon is the colour square plus "IP" on black.

It's the most distinctive and ownable of the three, it reads as Portuguese without clichés, and the edition colour helps sponsors see that the four editions are separate. The risk is that black-and-white photos feel cooler and less warm for buyers.

## What all three keep

The same content model, settings, four editions and URLs, noindex until launch, self-hosted fonts (no Google Fonts CDN), no trackers and no cookies. They have visible keyboard focus, a skip link, reduced motion respected, no horizontal scroll at 390 px, and text contrast of at least AA (lowest pair 5.7:1). None of them uses cream with serif and terracotta, rounded shadow cards, gradients, caps labels over headings, 01/02/03 numbering, arrows on links or emoji. The forms show the real placeholder message until the Tally and beehiiv IDs are set.

## Rebuild

```
cd site && npx tsx ../design/directions/build.ts lu   # or fr, ch, br
cd .. && node design/directions/shoot.mjs && python3 design/directions/boards.py
```
