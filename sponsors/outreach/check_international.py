"""Check the international outreach drafts and build international.csv (prompt 03).

Usage (from the repo root):  python3 sponsors/outreach/check_international.py

Reads sponsors/outreach/international/*.md (first line "Subject: ...", then the body) and joins each draft to its
row in sponsors/pipeline.csv (developers) or to the "Chambers & embassies" list in sponsors/build/sponsors_v2_data.py.
Same rules as the week-1 drafts, with the 140-word limit of prompt 03: plain prose, one question, the opt-out line,
the [Assinatura] placeholder, no email address, no banned wording. Nothing here is sent: the operator approves first.
"""
import csv, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "sponsors" / "build"))
from sponsors_v2_data import CHAMBERS  # noqa: E402

MAX_WORDS = 139
OPT_OUT = "If you'd rather not hear from us again, just reply and say so."
BANNED = ("paradise", "unique opportunity", "once-in-a-lifetime", "guarantee", "guaranteed", "yield", "return on", "returns")
# File -> (kind, organisation as in the list, hold before sending). A hold is a check Daniel makes first.
FILES = {
    "dev-shalu-investments.md": ("developer", "Shalu Investments", ""),
    "dev-taga-urbanic.md": ("developer", "Taga Urbanic", ""),
    "dev-youropa.md": ("developer", "Youropa", "Youropa also resells and rents units: confirm it does not operate as a real-estate agency (D9) before sending."),
    "chamber-amcham-portugal.md": ("chamber", "AmCham Portugal (Câmara de Comércio Americana em Portugal)", "Check the list of members is as described: the draft says members include companies that serve US citizens."),
    "chamber-portuguese-israeli.md": ("chamber", "Portuguese-Israeli Chamber of Commerce (CCLI)", "Confirm the chamber exists and who runs it before sending (evidence is an undated article)."),
    "embassy-us-commercial-service.md": ("embassy", "U.S. Commercial Service, Embassy of the United States in Lisbon", "Introduction request only; use the office contact on trade.gov, not a named person."),
    "embassy-israel.md": ("embassy", "Embassy of Israel in Lisbon", "Find the economic section first (CHAMBERS list); until then use the enquiry route on the embassy site."),
}


def main() -> int:
    folder = ROOT / "sponsors" / "outreach" / "international"
    pipe = {r["company"]: r for r in csv.DictReader(open(ROOT / "sponsors" / "pipeline.csv", encoding="utf-8"))}
    ch = {c[0]: c for c in CHAMBERS}
    out, errors = [], []
    files = sorted(p.name for p in folder.glob("*.md"))
    for name in files:
        if name not in FILES:
            errors.append(f"{name}: not in FILES (add it with its organisation)")
    for name, (kind, org, hold) in FILES.items():
        f = folder / name
        if not f.exists():
            errors.append(f"{name}: missing")
            continue
        text = f.read_text(encoding="utf-8").strip()
        head, body = text.split("\n", 1)
        if not head.startswith("Subject:"):
            errors.append(f"{name}: first line must start with 'Subject:'")
        subject, body = head.split(":", 1)[1].strip(), body.strip()
        words = len(body.split())
        if words > MAX_WORDS:
            errors.append(f"{name}: {words} words (max {MAX_WORDS})")
        if re.search(r"^\s*([-*•]|\d+[.)])\s", body, re.M):
            errors.append(f"{name}: bullet or numbered list")
        if OPT_OUT not in body:
            errors.append(f"{name}: opt-out line missing")
        if not body.endswith("[Assinatura]"):
            errors.append(f"{name}: must end with [Assinatura]")
        if body.count("?") != 1:
            errors.append(f"{name}: expected exactly one question")
        if "@" in text:
            errors.append(f"{name}: contains an email address")
        for b in BANNED:
            if re.search(rf"\b{re.escape(b)}", text.lower()):
                errors.append(f"{name}: banned word '{b}'")
        if kind == "developer":
            row = pipe.get(org)
            if not row:
                errors.append(f"{name}: {org} is not in pipeline.csv")
                continue
            ev, edition, tier = row["evidence_url"], row["edition"], row["tier"]
            if tier == "C":
                errors.append(f"{name}: {org} is tier C (parked): no outreach before it moves up")
        else:
            row = ch.get(org)
            if not row:
                errors.append(f"{name}: {org} is not in the CHAMBERS list")
                continue
            ev, edition = row[5], row[2]
        out.append({"file": name, "kind": kind, "organisation": org, "edition_or_country": edition, "subject": subject,
                    "body": body, "words": words, "evidence_url": ev, "hold_before_sending": hold})
    with open(folder / "international.csv", "w", newline="", encoding="utf-8") as fh:
        w = csv.DictWriter(fh, fieldnames=list(out[0].keys()))
        w.writeheader()
        w.writerows(out)
    print(f"{len(out)} drafts, {max(r['words'] for r in out)} words max -> {folder / 'international.csv'}")
    for e in errors:
        print("ERROR", e)
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
