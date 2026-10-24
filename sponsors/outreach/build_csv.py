"""Check the outreach drafts of one week and build the mail-merge CSV.

Usage (from the repo root):  python3 sponsors/outreach/build_csv.py week-1

Reads sponsors/outreach/<week>/NN-company.md (first line "Assunto:" or "Objet :"
style subject, then the body) and joins each draft to its row in the
"This week's 40" tab and sponsors/pipeline.csv. Writes <week>/<week>.csv.
Exits 1 if any draft breaks the outreach rules (prompt 02, Part C).
"""
import csv, pathlib, re, sys

import openpyxl

ROOT = pathlib.Path(__file__).resolve().parents[2]
MAX_WORDS = 119  # "under 120 words"
OPT_OUTS = (
    "Se preferir não receber mais emails nossos, basta responder a dizer.",
    "Si vous préférez ne plus recevoir nos messages, il suffit de répondre.",
    "Se preferir não receber mais nossos emails, é só responder.",
)
BANNED = ("paraíso", "paradis", "oportunidade única", "opportunité unique", "garantid", "garanti", "rentabilidade", "rendement")
# Notes for specific rows, on top of the automatic evidence checks.
EXTRA = {
    "S014": "Check the company is still active.",
    "S028": "Hold until the partner agency is confirmed (task 7): check the two agencies do not overlap.",
    "S029": "Pipeline says 'Affiliate + sponsor': pitch as a flat sponsorship only (D6); affiliate commission needs a CEO decision.",
}


def main(week: str) -> int:
    folder = ROOT / "sponsors" / "outreach" / week
    ws = openpyxl.load_workbook(ROOT / "sponsors" / "Sponsors_v2.xlsx", data_only=True)["This week's 40"]
    rows = {r[0]: r for r in ws.iter_rows(min_row=2, values_only=True) if r[1]}
    pipe = {r["id"]: r for r in csv.DictReader(open(ROOT / "sponsors" / "pipeline.csv", encoding="utf-8"))}

    out, errors = [], []
    for f in sorted(folder.glob("[0-9][0-9]-*.md")):
        nn = int(f.name[:2])
        sid = rows[nn][1]
        p = pipe[sid]
        text = f.read_text(encoding="utf-8").strip()
        head, body = text.split("\n", 1)
        prefix, subject = (s.strip() for s in head.split(":", 1))
        body = body.strip()
        lang = "fr-FR" if prefix == "Objet" else "pt-BR" if p["edition"] == "BR" else "pt-PT"

        words = len(body.split())
        if words > MAX_WORDS:
            errors.append(f"{f.name}: {words} words (max {MAX_WORDS})")
        if re.search(r"^\s*([-*•]|\d+[.)])\s", body, re.M):
            errors.append(f"{f.name}: bullet or numbered list")
        if not any(o in body for o in OPT_OUTS):
            errors.append(f"{f.name}: opt-out line missing")
        if not body.endswith("[Assinatura]"):
            errors.append(f"{f.name}: must end with [Assinatura]")
        if body.count("?") != 1:
            errors.append(f"{f.name}: expected exactly one question (the call ask)")
        if "@" in text:
            errors.append(f"{f.name}: contains an email address")
        for b in BANNED:
            if b in text.lower():
                errors.append(f"{f.name}: banned word '{b}'")

        checks = []
        if p["evidence_year"] and int(p["evidence_year"]) < 2022:
            checks.append(f"Evidence is from {p['evidence_year']}: re-check it before sending (METHOD.md).")
        if p["evidence_status"] == "Search result":
            checks.append("Evidence page not read in full: open it before sending.")
        if sid in EXTRA:
            checks.append(EXTRA[sid])

        out.append({
            "nn": f"{nn:02d}",
            "id": sid,
            "company": p["company"],
            "edition": p["edition"],
            "language": lang,
            "recipient": f"{p['decision_maker_role']}. Find via: {p['contact_channel']}",
            "subject": subject,
            "body": body,
            "words": words,
            "send_on": rows[nn][10],
            "evidence_url": p["evidence_url"],
            "check_before_sending": " ".join(checks),
        })

    if len(out) != len(rows):
        errors.append(f"{len(out)} drafts for {len(rows)} companies in the tab")
    with open(folder / f"{week}.csv", "w", newline="", encoding="utf-8") as fh:
        w = csv.DictWriter(fh, fieldnames=list(out[0].keys()))
        w.writeheader()
        w.writerows(out)
    print(f"{len(out)} drafts, {max(r['words'] for r in out)} words max -> {folder / (week + '.csv')}")
    for e in errors:
        print("ERROR", e)
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1] if len(sys.argv) > 1 else "week-1"))
