# Week 1 outreach: drafts, not sent

40 first emails for the "This week's 40" tab of sponsors/Sponsors_v2.xlsx, one file per company (`NN-company.md`, subject on the first line). The operator approves them before anything is sent. Claude never sends email.

## Before sending

1. Daniel confirms the legal bases in sponsors/METHOD.md (Outreach rules, point 2).
2. Choose the signature and replace `[Assinatura]`; replace `[Nome]` / `[Prénom]` with the person's first name, or drop it and keep "Olá," / "Bonjour,".
3. Read the `check_before_sending` column in `week-1.csv`: 19 rows need a check first (old evidence, evidence page not read in full, partner-agency overlap, D6).
4. Send one to one from the brand mailbox, 8 per day on the `send_on` dates, and log each send in the Status column of the xlsx and pipeline.csv.

## Files

1. `NN-company.md`: the draft. Edit here, then rebuild the CSV.
2. `week-1.csv`: company, edition, language, recipient, subject, body, plus send date, evidence link and checks. Paste into a Google Sheet for a one-to-one mail-merge tool and add the email address column there, never in the repo.
3. Rebuild and check: `python3 sponsors/outreach/build_csv.py week-1` (fails on more than 119 words, bullets, a missing opt-out line or signature placeholder, more than one question, an email address or a banned word).

## Rules applied

1. Language: PT-PT for LU and CH and for companies based in Portugal (including the Lisbon agencies and Portuguese banks listed under FR); FR for companies based in France; PT-BR for the BR edition.
2. Plain prose, under 120 words, one ask (a 15-minute call), opt-out line last, no promise of returns, and no claim of readers we do not have yet.
3. Offer per row: sponsors get the one-partner-per-category line and the founding offer; developers get campaigns from 1,500 €; agencies get featured listings from 49 € per month (prices from site/src/config.ts).
4. Evidence from before 2022 is described without its year.
