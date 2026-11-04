# Maré: can we send it? (prompt 67, step 8.1)

CTO helper, 4 Nov 2026. Read-only check: nothing was created, changed or sent in beehiiv. Sources: the beehiiv MCP (get_workspace, get_publication, get_publication_stats, list_posts, learn_post_authoring, the help-centre articles it returns) and the public pricing pages, opened on 4 Nov 2026. Prices are the ones the pages showed us, in US dollars (our requests leave from a US network); the EUR page may differ.

## 1. Where we are

- **Workspace "Imoveis' Hiiv": plan Free**, limit 2,500 subscribers (get_workspace).
- **Publication "Imóveis Portugal"**, language pt, no custom web or email domain yet, beehiiv branding on (get_publication).
- **2 active subscribers, 0 posts** (get_publication_stats, list_posts).
- **Volume at the limit:** 2,500 readers × 2 issues a week = about 21,700 emails a month (22,500 in a month with nine issues).

## 2. What beehiiv Free can send

| Need | Free plan | Source |
| --- | --- | --- |
| Our own HTML (site/src/lib/mare.ts builds the email as inline-styled tables) | **Unclear, test it.** The help article "Using HTML in beehiiv posts" (updated 1 Oct 2026) says HTML Snippets are on "All Paid Plans" (and the free trial). The MCP's authoring contract for *our* publication marks `htmlSnippet` as `available: true` (gating "custom_html_blocks"). One look in the editor settles it (§5). | beehiiv help; MCP learn_post_authoring |
| A 100% custom email | **No, on any plan.** "The beehiiv email structure is fixed… you cannot replace the <head> or standard footer… we do not currently offer the ability to send 100% custom HTML email." Our HTML goes *inside* beehiiv's frame, between its header and its footer. | beehiiv help, "Using the Send API and Create post endpoint" (6 Aug 2026) |
| CSS | `<script>` and `<style>` are not saved in snippets: inline styles only. Extra CSS classes can go in Style › Advanced › Email Header › Code. Gmail strips `<style>` blocks anyway. | beehiiv help, "Using HTML…", "Reasons why emails may look different" (9 Jul 2026) |
| Web fonts | Only fonts from beehiiv's own list; "Fonts you've uploaded yourself aren't available in email newsletters at all." Non-web-safe fonts from the list render in Apple Mail and iOS Mail; Gmail and Outlook show the fallback. | "Reasons why emails may look different" |
| Dark mode | beehiiv makes a darkened theme only for clients that detect dark mode (Apple Mail); Gmail inverts colours itself and ignores beehiiv's values; Outlook varies (inverts on mobile). The usual "force light" CSS only works in Apple Mail and iOS Mail. | same |
| Images | Image blocks take a width in %; the header image is recommended at 1200 × 630. Our rule (every image at least twice its display width, under 200 KB) is ours to keep; beehiiv does not state a maximum width for body images. Gmail clips any email whose HTML passes 102 KB (images do not count, their code does). | "Post customization options in the Style panel"; "Ways to manage email weight" (23 Jun 2026) |
| Merge tags | Available to our publication: `{{subscriber_id}}`, `{{api_subscription_id}}`, `{{subscription_uuid}}`, `{{subscriber_email_hash_sha256}}` (also MD5 and SHA-1), `{{subscriber_email_base64}}`, `{{unsubscribe_url}}`, custom fields `{{first_name}}`, `{{language}}`, `{{edition}}`, with fallback `{{first_name|there}}`. Merge tags work in body text, headings, buttons, subject lines; in HTML snippets `{{subscriber_id}}` and `{{subscriber_email_hash}}` work in the email version only. Whether a tag renders inside a link address on Free is not documented: test it (§5). | MCP learn_post_authoring; "How to personalize a post using merge tags" (28 Aug 2026) |
| Custom link parameters (beehiiv appends e.g. `sid={{api_subscription_id}}` to every link) | **Pro and Enterprise only.** | "Using Custom link parameters" (9 Jul 2026) |
| Creating the draft from our pipeline | Free: API without the Send API, MCP read-only, so the draft is pasted by hand. Lite: MCP write access. Pro: Send API (Create post with `blocks` including `html`, `status: draft`). | pricing page; "Using the Send API…" |
| Polls (beehiiv's own one-tap poll) | Lite and up ("Surveys & Polls"); our game does not need them. | pricing page |
| Referral programme | Lite (3 milestones) and Pro (unlimited); we build our own (D78). | "Referral Program: Getting set up…" |
| Remove "beehiiv" branding | Pro and up. | pricing page |
| Click data | "Verified Clicks" filters scanner clicks, all plans. | "Understanding Verified Clicks" (30 Apr 2026) |

**Conclusion for beehiiv.** The Maré design can go out through beehiiv only as an HTML snippet inside beehiiv's fixed frame, with inline styles, beehiiv's fonts, beehiiv's footer and branding. Whether Free allows the snippet must be checked in the editor; if it does not, **Lite** is the cheapest beehiiv plan that does. Pro adds what the game wants most (link parameters with the subscriber id, the Send API for drafts, no branding). Web fonts beyond beehiiv's list are not possible on any beehiiv plan.

## 3. beehiiv prices (pricing page, 4 Nov 2026)

| Plan | At 1,000 subscribers | At 2,500 subscribers | What it adds for Maré |
| --- | --- | --- | --- |
| Free | $0 | $0 (limit 2,500) | Baseline; HTML snippet to be confirmed |
| Lite | $59/month, or $49/month billed yearly | $79/month, or $69/month billed yearly ($828/year) | HTML snippets (per the help centre), MCP write access (drafts from our pipeline), polls |
| Pro | $109/month, or $95/month billed yearly | $149/month, or $129/month billed yearly ($1,548/year) | Plus custom link parameters (subscriber id on every link), Send API, no beehiiv branding, dynamic content |

## 4. Two senders that send our full HTML

Full HTML here means our own `<head>`, our own `<style>` with media queries (dark mode, mobile), web fonts by `@font-face` where the client allows it (Apple Mail; Gmail and Outlook fall back, whatever the sender), and our own footer with the unsubscribe link.

| Sender | Full custom HTML | Price at 0–2,500 readers, two issues a week | Branding | GDPR and hosting |
| --- | --- | --- | --- | --- |
| **MailerLite** (UAB MailerLite, Lithuania) | "Custom HTML editor" on every plan, Free included | Free: up to 250 subscribers and 2,500 emails a month. Comfort at 2,500 subscribers: $33/month, or $29.70/month billed yearly ($356.40/year), 25,000 emails a month (enough for 22,500). | Free carries the MailerLite logo; Comfort removes it | "MailerLite uses Google data storage center with its location in the European Union" (DPA §4.3); SCCs for any transfer; governing law Lithuania (mailerlite.com/legal/data-processing-agreement, mailerlite.com/gdpr-compliance) |
| **Brevo** (France) | "HTML custom code" editor: paste or upload our own HTML (help.brevo.com article 4672127581074, search summary; the help centre returned 403 to our request) | Free: 300 emails a day, so a list of up to 300 readers. Starter, priced by emails: 20,000/month $28.75/month billed yearly ($32 monthly); 30,000/month $35.08/month billed yearly ($39 monthly). We need the 30,000 tier. "No Brevo logo" add-on $10.80/month on Starter. | Starter shows "Sent with Brevo" unless the add-on is bought; Standard includes no logo | Data hosted in the EU: OVH in France and Germany, Google Cloud in Belgium (Brevo help "Data storage location", search summary only: the page returned 403) |
| Resend (for reference) | Full HTML (we build it; broadcasts by API or dashboard) | Free marketing: 1,000 contacts, unlimited broadcasts. Pro marketing $40/month for 5,000 contacts. Monthly plans only. | None stated | Sends from Ireland (eu-west-1) if chosen, but "region selection… does not control where customer data is stored" (resend.com/docs, regions): data storage not in the EU by default. Not recommended. |
| Loops (for reference) | Yes | Free: 1,000 contacts, 4,000 sends per 30 days (too few for two issues a week past ~460 readers); Growth $49/month to 5,000 contacts | Free has a Loops footer | US company (Astrodon Corporation); DPF listed. Not recommended. |

## 5. What the operator checks (2 minutes, nothing is sent to readers)

1. In beehiiv: Start writing → in the empty post type `/` → look under "Premium" for **HTML Snippet**. Tell the CTO: present and usable, or shown with an upgrade prompt.
2. In the same draft, add a button to `https://imoveisportugal.pt/?s={{api_subscription_id}}` and send a **test email** to yourself (the "Send test" in the editor, never Publish). Tap the button and tell the CTO whether the address shows a number or the braces. Then delete the draft.

## 6. Decision for the operator (hard rule 5: no paid tool until a sponsor has paid)

1. If the snippet works on Free: send Maré from beehiiv Free, accepting beehiiv's frame, fonts and branding. Nothing to pay.
2. If it does not: **beehiiv Lite** ($69–79/month at 2,500, less below) keeps the list where it is; **MailerLite Comfort** ($29.70–33/month at 2,500, EU-hosted) sends the full design including our fonts in Apple Mail and our footer, but means moving the list and the signup form (D86, D87) and losing beehiiv's network.
3. The game does not depend on the choice: any sender that renders a link with a per-reader id works (MailerLite and Brevo both have subscriber merge tags; not yet checked in detail).

Recommended: try Free first (§5); if the snippet is gated, MailerLite Comfort is the cheapest way to send the design uncut, from the first paying sponsor.
