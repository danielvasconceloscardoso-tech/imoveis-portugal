# Sending outreach with free tools (prompt 15 §2, D30)

Gmail (brand mailbox) plus Google Sheets, no paid tool. Nothing is sent before Daniel confirms the legal grounds per country (task 8p) and the operator says "go".

## Once

1. Sign in to the brand mailbox in Chrome. Open Google Sheets, create a sheet named "Outreach v3".
2. Import `sponsors/pipeline.csv` (File > Import > Upload > Replace current sheet). Keep only the rows for this week's batch (max 30 a day).
3. Add three columns: `name` (the decision maker's first name, found on LinkedIn at the moment of sending; never saved back to the repo), `email` (a published company address or the named person's business address shown on the company site), `language` (pt, en or fr).
4. Extensions > Apps Script. Paste the script below, save, and run `createDrafts` once to grant Gmail access (the brand account only).

```javascript
// Creates Gmail drafts (never sends) from the "Outreach v3" sheet: one per row with an email and no touch1_date.
function createDrafts() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Outreach v3");
  const rows = sh.getDataRange().getValues(); const h = rows.shift();
  const col = (n) => h.indexOf(n);
  let made = 0;
  for (const r of rows) {
    if (made >= 30) break;                       // 30 a day at most
    if (!r[col("email")] || r[col("touch1_date")]) continue;
    const t = TEMPLATES[r[col("language")]]; if (!t) continue;
    const fill = (s) => s.replace("[Nome]", r[col("name")]).replace("[Name]", r[col("name")]).replace("[Nom]", r[col("name")])
      .replace(/\[Empresa\]|\[Company\]|\[Entreprise\]/g, r[col("company")]).replace(/\[evidência\]|\[evidence\]|\[preuve\]/g, r[col("evidence_note")]);
    GmailApp.createDraft(r[col("email")], fill(t.subject), fill(t.body));
    made++;
  }
}
// Paste touch 1 of sponsors/outreach/v3/SEQUENCES.md (segment b) into TEMPLATES.pt / .en / .fr.
const TEMPLATES = { pt: { subject: "", body: "" }, en: { subject: "", body: "" }, fr: { subject: "", body: "" } };
```

## Every day

1. Run `createDrafts`. Open Gmail > Drafts, read each draft, personalise the first line from the evidence if needed, and send by hand. Plain text, no tracking pixels, no attachments in touch 1.
2. In pipeline.csv (or the sheet, then copy back), fill `touch1_date`. On day 3, send the LinkedIn note by hand and fill `touch2_date`. On day 7, send touch 3 (the founding offer and the 1 December deadline) and fill `touch3_date`.
3. Replies: fill `reply` (yes, no, later, opt-out) and `call_date`. Anyone who opts out gets `outcome = opt-out` and is never contacted again.
4. `/status` shows touches due, replies and calls booked.
