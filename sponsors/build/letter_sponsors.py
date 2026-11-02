"""Prompt 54 §4: merge the three researched sponsor lists into sponsors/letter_sponsors.csv and a summary.

Reads sponsors/research/sponsors_S{1,2,3}.csv, drops duplicates (same company or same contact domain), refuses rows
that break the rules (an email address or a phone number anywhere, a real-estate agency other than the partner, D9;
a contact URL that is not https), adds an id, the check date and whether the company is already in
sponsors/pipeline.csv, and writes sponsors/letter_sponsors.csv plus sponsors/LETTER_SPONSORS_SUMMARY.md (rendered to PDF
separately). Companies only: no personal names or personal contacts are collected or kept.

Usage: python3 sponsors/build/letter_sponsors.py
"""
import csv, os, re, sys, unicodedata
from collections import Counter, defaultdict
from urllib.parse import urlparse

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..")
R = lambda *p: os.path.join(ROOT, *p)
COLS = ["company", "category", "country", "why_fits", "calendar_slot", "product", "contact_url", "contact_status", "size_signal", "size_source_url", "priority"]
EMAIL = re.compile(r"[^\s@]+@[^\s@]+\.[^\s@]+")
PHONE = re.compile(r"\+?\d[\d\s().-]{8,}\d")
# D9: no real-estate agency other than the partner. Developers, resorts and property-service firms stay.
AGENCY = re.compile(r"\b(mediação imobiliária|mediacao imobiliaria|real estate agency|imobiliária(?! de desenvolvimento)|realty|remax|re/max|century 21|era imobili|keller williams|sotheby's international realty|engel ?& ?völkers|coldwell|kw portugal|zome|decis[õo]es e solu[çc][õo]es)\b", re.I)
PARTNER = re.compile(r"habinedita", re.I)

def norm(s):
    s = unicodedata.normalize("NFD", s).encode("ascii", "ignore").decode().lower()
    s = re.sub(r"\b(s\.?a\.?|lda|ltd|plc|sgps|group|grupo|portugal|the)\b", " ", s)
    return re.sub(r"[^a-z0-9]+", "", s)

def main():
    rows, refused = [], []
    for g in ("S1", "S2", "S3"):
        f = R("sponsors", "research", f"sponsors_{g}.csv")
        if not os.path.exists(f):
            print(f"missing {f}", file=sys.stderr); continue
        for r in csv.DictReader(open(f, encoding="utf-8")):
            r = {k: (r.get(k) or "").strip() for k in COLS}
            r["group"] = g
            blob = " ".join(r.values())
            why = []
            if EMAIL.search(blob): why.append("email address")
            text = re.sub(r"\d{4}-\d{2}-\d{2}", " ", " ".join(v for k, v in r.items() if k not in ("contact_url", "size_source_url", "size_signal")))
            if PHONE.search(text): why.append("phone number")
            st = r["contact_status"].lower()
            r["contact_status"] = "blocked" if ("blocked" in st or "403" in st or "492" in st) else "homepage" if "homepage" in st else "check" if st.startswith("check") else "200" if "200" in st else r["contact_status"]
            if AGENCY.search(f"{r['company']} {r['category']} {r['why_fits']}") and not PARTNER.search(r["company"]): why.append("real-estate agency (D9)")
            if not r["contact_url"].startswith("https://"): why.append("contact URL not https")
            if not r["company"]: why.append("no company")
            (refused if why else rows).append((r, why) if why else r)
    seen, seen_dom, out = set(), {}, []
    for r in rows:
        k, dom = norm(r["company"]), urlparse(r["contact_url"]).netloc.replace("www.", "")
        if k in seen: continue
        if dom in seen_dom and not re.search(r"(sapo|google|linkedin|facebook|instagram)\.", dom):
            # Same site, two names (a brand and its group): keep the first, note the other.
            seen_dom[dom]["also"] = (seen_dom[dom].get("also", "") + "; " + r["company"]).strip("; ")
            continue
        seen.add(k); seen_dom[dom] = r; out.append(r)
    pipe = {norm(x["company"]) for x in csv.DictReader(open(R("sponsors", "pipeline.csv"), encoding="utf-8"))}
    order = {"A": 0, "B": 1, "C": 2}
    out.sort(key=lambda r: (r["category"], order.get(r["priority"], 3), r["company"].lower()))
    hdr = ["id"] + COLS + ["also", "in_pipeline", "checked_on"]
    with open(R("sponsors", "letter_sponsors.csv"), "w", newline="", encoding="utf-8") as fh:
        w = csv.writer(fh)
        w.writerow(hdr)
        for i, r in enumerate(out, 1):
            r["id"] = f"L{i:03d}"; r["in_pipeline"] = "yes" if norm(r["company"]) in pipe else ""; r["checked_on"] = "2026-11-02"
            w.writerow([r.get(k, "") for k in hdr])
    by_cat = Counter(r["category"] for r in out)
    by_pri = Counter(r["priority"] for r in out)
    by_status = Counter(r["contact_status"].split()[0] if r["contact_status"] else "?" for r in out)
    print(f"{len(out)} companies ({len(refused)} refused, {sum(len(list(csv.DictReader(open(R('sponsors','research',f'sponsors_{g}.csv'))))) for g in ('S1','S2','S3') if os.path.exists(R('sponsors','research',f'sponsors_{g}.csv')))} researched)")
    print("priority", dict(by_pri)); print("contact", dict(by_status))
    for c, n in sorted(by_cat.items()): print(f"  {n:3d}  {c}")
    for r, why in refused: print(f"refused: {r['company']} ({', '.join(why)})")
    return out, refused

if __name__ == "__main__":
    main()
