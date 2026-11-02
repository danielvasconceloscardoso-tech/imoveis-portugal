"""Prompt 54 §4 and §6: merge the researched sponsor lists into sponsors/letter_sponsors.csv and a summary.

Reads sponsors/research/sponsors_S{1,2,3}.csv (prompt 54 §4) and sponsors_B{1,2,3}.csv (prompt 54 §6, Partnerships v6), drops duplicates (same company or same contact domain), refuses rows
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
V6 = ["v6_category", "level", "scope", "decision_maker_role", "ad_rules", "news_source"]
GROUPS = ("S1", "S2", "S3", "B2", "B1", "B3")  # B2 before B1: its rows carry the dated entrant sources
# Partnerships v6 tags for the prompt 54 §4 rows (the §6 rows carry their own): category, level, scope, role, rules.
V6_MAP = [  # (pattern on the old category, v6 category, national?, role, rules)
    (r"portuguese bank", "Banking", True, "Head of non-resident banking or marketing director", "fin"),
    (r"private bank", "Private banking", False, "Head of Portugal desk or marketing director", "fin"),
    (r"mortgage|credit intermediary", "Mortgage", True, "Marketing director", "fin"),
    (r"currency|payments", "Digital banking and investing", True, "Marketing director", "fin"),
    (r"insurer", "Insurance", True, "Marketing and brand director", "ins"),
    (r"relocation services", "Relocation services (outside v6)", True, "Marketing director", ""),
    (r"international school", "Education (schools)", False, "Admissions and marketing director", "school"),
    (r"private healthcare|^health", "Health", True, "Marketing and communication director", "health"),
    (r"law and tax", "Law and tax (outside v6)", True, "Marketing or business development director", ""),
    (r"developer", "Developers (per-unit, rate card v5)", False, "Sales and marketing director", ""),
    (r"hotel", "Hotels", False, "Marketing and sales director", ""),
    (r"restaurant", "Hotels", False, "Marketing director", ""),
    (r"wine", "Wine", True, "Brand and marketing director", "alc"),
    (r"spirit", "Spirits and coffee", True, "Brand and marketing director", "alc"),
    (r"golf", "Golf", False, "Marketing and sales director", ""),
    (r"yacht|marina", "Luxury", False, "Marketing director", ""),
    (r"art|auction", "Luxury", False, "Director or head of communication", ""),
    (r"event|festival", "Events (Portugal 100 and our events)", True, "Partnerships or sponsorship director", ""),
    (r"airline|airport", "Airline", True, "Marketing director for Portugal or the market", ""),
    (r"car brand|dealer", "Mobility", True, "Marketing director", "car"),
    (r"luxury", "Luxury", True, "Marketing and brand director", ""),
    (r"architect", "Home setup", False, "Studio director", ""),
    (r"furniture|kitchen|interior", "Home setup", True, "Marketing director", ""),
    (r"property services", "Energy", True, "Marketing director", ""),
    (r"tourism|municipal", "Tourism boards (procurement, later)", False, "Promotion director (public procurement)", ""),
]
RULES = {"fin": "Banco de Portugal / CMVM rules on financial advertising; APR in credit examples; risk warnings for investing",
         "ins": "We advertise; the quote happens on the insurer's side (Lei 7/2019)",
         "health": "DL 238/2015 (ERS): no claims of results, no comparisons, provider registered with the ERS",
         "school": "standard; fees only as the school states them",
         "alc": "Código da Publicidade art. 17: no minors, no link to driving or performance, legal warning; Loi Évin in France",
         "car": "fuel consumption and CO2 information in car advertising"}
ENTRANTS = {  # existing rows that are entering or growing in Portugal, with the dated source (sponsors_B2_notes.md)
    "Revolut": "https://www.essential-business.pt/2025/07/25/revolut-launches-branch-in-portugal-with-portuguese-iban/ (2025-07-25)",
    "United Airlines": "https://postal.pt/algarve/faro-e-funchal-reforcam-ligacoes-aereas-diretas-aos-estados-unidos/ (May 2026, day not confirmed)",
    "Delta Air Lines": "https://www.explore.com/1983922/porto-portugal-delta-air-lines-non-stop-flight-european-gem-soon-easily-accessible-americans (2026, date not read)",
    "TAP Air Portugal": "https://www.ynetnews.com/travel/article/bkhb0koq11e (2026, date to confirm)",
    "Sublime Comporta": "https://www.hospitalitynet.org/announcement/41014618/sublime-hospitality-group-opened-new-hotel-in-comporta (May 2026)",
    "Torel": "https://www.hospitalitynet.org/announcement/41014208/coterie-the-new-portuguese-brand-of-contemporary-boutique-hotels-combining-aesthetics-detail-and-exclusivity (2026)",
    "Grupo Salvador Caetano": "https://echoboomer.pt/?p=216013 (2024-09-26)",
    "JNcQUOI": "https://www.travelextra.ie/?p=101713 (2026)",
}
def tag_v6(r):
    if r.get("level"):  # §6 rows: their own tags; the v6 category is the category they were researched under
        r["v6_category"] = r["category"]; return r
    c = r["category"].lower()
    for pat, cat, natl, role, rules in V6_MAP:
        if re.search(pat, c):
            big = r["priority"] == "A"
            r["v6_category"] = cat
            r["level"] = ("Partner" if big else "Featured") if "outside v6" in cat else "Procurement (later)" if cat.startswith("Tourism") else "Per unit (developers)" if cat.startswith("Developers") else ("Official" if natl and big else "Partner" if natl or big else "Featured")
            r["scope"] = "national" if natl else "international" if "private bank" in c else "regional"
            r["decision_maker_role"] = role; r["ad_rules"] = RULES.get(rules, "standard")
            r["news_source"] = next((v for k, v in ENTRANTS.items() if r["company"].lower().startswith(k.lower())), "")
            return r
    r.update(v6_category=r["category"], level="Partner", scope="national", decision_maker_role="Marketing director", ad_rules="standard", news_source="")
    return r
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
    for g in GROUPS:
        f = R("sponsors", "research", f"sponsors_{g}.csv")
        if not os.path.exists(f):
            print(f"missing {f}", file=sys.stderr); continue
        for r in csv.DictReader(open(f, encoding="utf-8")):
            r = {k: (r.get(k) or "").strip() for k in COLS + V6}
            r["group"] = g
            blob = " ".join(r.values())
            why = []
            if EMAIL.search(blob): why.append("email address")
            text = re.sub(r"\d{4}-\d{2}-\d{2}", " ", " ".join(v for k, v in r.items() if k not in ("contact_url", "size_source_url", "size_signal")))
            if PHONE.search(text): why.append("phone number")
            if re.search(r"\b(casino|apostas|betting|bet\b|tabaco|tobacco|cigar(ette)?s?\b)", f"{r['company']} {r['category']}", re.I): why.append("gambling or tobacco")
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
    old = {}
    if os.path.exists(R("sponsors", "letter_sponsors.csv")):
        for x in csv.DictReader(open(R("sponsors", "letter_sponsors.csv"), encoding="utf-8")): old[norm(x["company"])] = x["id"]
    nxt = max([int(v[1:]) for v in old.values()] + [0]) + 1
    for r in out: tag_v6(r)
    order = {"A": 0, "B": 1, "C": 2}
    out.sort(key=lambda r: (r["category"], order.get(r["priority"], 3), r["company"].lower()))
    hdr = ["id"] + COLS + V6 + ["also", "in_pipeline", "source_list", "checked_on"]
    with open(R("sponsors", "letter_sponsors.csv"), "w", newline="", encoding="utf-8") as fh:
        w = csv.writer(fh)
        w.writerow(hdr)
        for r in out:
            k = norm(r["company"])
            if k in old: r["id"] = old[k]
            else: r["id"] = f"L{nxt:03d}"; nxt += 1
            r["source_list"] = r["group"]; r["in_pipeline"] = "yes" if norm(r["company"]) in pipe else ""; r["checked_on"] = "2026-11-02"
            w.writerow([r.get(k, "") for k in hdr])
    by_cat = Counter(r["category"] for r in out)
    by_pri = Counter(r["priority"] for r in out)
    by_status = Counter(r["contact_status"].split()[0] if r["contact_status"] else "?" for r in out)
    print(f"{len(out)} companies ({len(refused)} refused, {sum(len(list(csv.DictReader(open(R('sponsors','research',f'sponsors_{g}.csv'))))) for g in GROUPS if os.path.exists(R('sponsors','research',f'sponsors_{g}.csv')))} researched)")
    print("by list", dict(Counter(r["group"] for r in out))); print("level", dict(Counter(r["level"] for r in out)))
    print("priority", dict(by_pri)); print("contact", dict(by_status))
    for c, n in sorted(by_cat.items()): print(f"  {n:3d}  {c}")
    for r, why in refused: print(f"refused: {r['company']} ({', '.join(why)})")
    return out, refused

if __name__ == "__main__":
    main()
