# Maré — Image rights, visual & delivery QA (two approved subjects, 11 Nov 2026)

## Assets in current REVIEW previews
| Issue | Current email image | Where used | License / proof | Production decision |
| --- | --- | --- | --- | --- |
| 2026-12-01 The Brief | /img/v2/leca-piscina-das-mares-1024.webp | Real image of Siza's tidal pools | Vitor Oliveira (Portuguese_eyes), CC BY-SA 2.0, https://www.flickr.com/photos/21446942@N00/27747007423 ; existing repository photo registry content/media/SOURCES.md | Display with attribution and license; verify commercial email usage under terms, print reuse/derivatives separately |
| 2026-12-04 The Escape | /img/v2/lisboa-alfama-telhados-1600.webp | **Contextual Lisbon photograph; NOT chef, caldo verde, Belcanto or even Chiado** | Original photo direction lists Unsplash asset photo-1536663815808-535e2280d2c2 (https://unsplash.com/license), author unconfirmed | **Visual approval blocker:** replace with a real, rights-cleared hero of José Avillez/Belcanto OR a professionally commissioned original photograph of caldo verde, explicitly identifying subject and creator. No scraped Michelin photographs |

## Reviewed free-license leads for a real Friday photograph
- [Caldo Verde, photographed by Michael](https://commons.wikimedia.org/wiki/File:Caldo_Verde.jpg), CC BY 2.0, attribution/URL and any crop indication required.
- [Caldo verde at O Zapata, by Pasquale Paolo Cardo](https://commons.wikimedia.org/wiki/File:Caldo_verde_(33228722492).jpg), CC BY 2.0. **This is a picture of a soup in Lisbon, NOT Avillez's original bowl.**
- Do not hotlink Wikimedia assets inside mass email. Download a verified original, resize and host in our first-party public assets, maintain artist credit and license. Confirm actual photo quality. License validity and photo authenticity must be reviewed.
- Production image must NOT imply that a licensed illustrative picture is a photograph of the chef, his restaurant or the exact meal described.

## Preflight: mandatory independent QA
1. Confirm owner accepted copy AND images AND final visual layout in one native language. Then the other two native adaptations.
2. For every email image, issue an HTTP request to its absolute `https://www.imoveisportugal.pt/...` URL: HTTP 200, `Content-Type image/*`, reasonable bytes, width/height declared, no cookies/referrer/sign-in needed.
3. Actual test send (without subscribers) to Gmail, iOS Mail, Outlook: desktop/mobile, dark-mode/light-mode, with images enabled and blocked. Screenshot and verify both, not just iframe on site. The HTML must still make sense without images. Do not send test mail until it is requested/approved and recipients specified.
4. Test all A/B/C links to `/mare/jogar/{date}/?resposta=X` on a deployed noindex preview. Answer appears instantly, explanation/source and replay work. Browser JS disabled provides useful fallback (not an inert blank page).
5. Verify the source links in each issue, subject lines, history/award chronology, copy editing, named image attribution and any time-sensitive restaurant listing.
6. Ensure opt-in footer is supplied by ESP and no personal data leaks in query strings or tracking.
7. Keep drafts on draft PR until final publish/send authorization. DO NOT auto-populate `content/mare/issues` or Beehiiv.
