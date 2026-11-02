# Prompt 57: instant rewards and the referral plan (D78)

CEO, 2 Nov 2026, 22:50. Operator: instant rewards and a cool referral plan. Built on our own stack (free tier first, hard rule 5): beehiiv's referral program is a paid feature, so we build our own on Cloudflare. Rewards are digital or paid for by partners ("oferecido por {parceiro}", labelled), never bought by us.

## 1. Instant rewards (the second the reader confirms)

1. **On signup (double opt-in confirmed):** "A lista": 25 places locals love in the reader's region (from the quiz result, or the region they choose), as a beautiful page with the map, unlocked immediately on the thank-you screen and in the welcome email.
2. **On the quiz result:** the region card to share, and the region's full guide one tap away (signup unlocks it).
3. **In the letter's challenge:** the answer and its story appear the moment the reader votes; a streak counter ("3 semanas seguidas") on the vote page.
4. **Partner perks, codes only** (when a partner offers one): a discount code shown on the thank-you page, fulfilled by the partner online or in store. No shipping, no events (operator, 2 Nov).

## 2. The referral plan ("Traga um amigo")

Each subscriber gets a personal link and a counter in every letter footer ("Já trouxe 2 amigos. Faltam 1 para…"). A referral counts when the friend confirms the double opt-in and opens at least one letter (stops fake signups).

| Friends | Reward | Cost to us |
| --- | --- | --- |
| 1 | "Portugal escondido": the guide to 50 places that are not in any tourist list | none (our content) |
| 3 | "A carta de domingo": a monthly members-only letter with the openings, tables and events of the month | none (our content) |
| 5 | "O guia do comprador": the full paid guide (normally 29–49 €), free | none (our content) |
| 10 | A 30-minute call with the qualified advisor about buying in their region (normally 150 €) | the partner agency's time |
| 25 | "Embaixador": first name in the letter's thanks (opt-in) and first look at new developments before they are public | none |

Rules: no prize draws or lotteries (a chance-based promotional draw needs prior authorisation under the gaming law, DL 422/89, "modalidades afins"; the operator checks before any draw is ever used); every reward guaranteed, not by chance.

## 3. Build

1. A referral service on the existing worker: one random code per subscriber, stored in Cloudflare KV with a hash of the email (never the email in clear in our storage), the count of confirmed referrals and the rewards unlocked. The beehiiv side gets the code and the count as custom fields if the plan's API allows it; otherwise the counter in the footer links to a personal page that shows it.
2. The signup form accepts `?ref=CODE`; the thank-you page shows the instant reward and the reader's own link with share buttons (WhatsApp, Instagram story card, email).
3. Unlock emails sent as drafts the operator approves once (templates), then automatic.
4. Privacy notice updated: what we store for referrals, why (legitimate interest of running the programme, GDPR art. 6(1)(f), plus consent for the leaderboard), how long, and how to opt out.
5. Metrics in `ops/METRICS.md`: referral share of signups, rewards unlocked per tier, cost per subscriber (should stay near zero).

## 4. Order and report

Portuguese first; live per D67: §1.1 and §1.2 (instant rewards at signup and quiz), then §2 tiers 1 and 3 (our own content), then tiers 5, 10 and 25. Report: commit hash and one line per step.
