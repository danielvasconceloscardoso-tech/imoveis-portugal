"""Prompt 49 §2: generate brand candidates and drop the ones that break the spoken-name rules (§1.2).

Seeds: content/brand/seeds.txt (roots by theme). Three families:
  1. real short words (the seeds themselves and light variants);
  2. coined blends: two roots joined at a vowel boundary, or a root plus a light suffix;
  3. vowel-consonant alternations built from the roots' syllables.
Rules applied here: 4-9 letters, at most 3 syllables (vowel groups), only letters a-z, none of j, x, w, k, y, q
(sound changes across PT, BR, FR, EN, DE, HE), no ç/ã (ASCII only), no "nh"/"lh"/"ch"/"sh"/"ph"/"th"/"gu"/"qu",
no double letters, no "c" before e/i (soft vs hard c), no "g" before e/i, no "s" between vowels (z-sound in PT/FR/DE),
no final "e" (silent in FR/EN, spoken in PT), no "ou"/"au"/"eu"/"ei"/"ai"/"oi" digraphs (read differently), no "r" doubled
by spelling, no "h". Never: estate, realty, homes, property, house.
Usage: python3 scripts/brand/generate.py [out.txt]   (prints the count)
"""
import itertools, re, sys, os

ROOT = os.path.dirname(os.path.abspath(__file__))
SEEDS = os.path.join(ROOT, "..", "..", "content", "brand", "seeds.txt")
BANNED = ["estate", "realty", "homes", "property", "house", "imovel"]

def ok(w: str) -> bool:
    if not re.fullmatch(r"[a-z]{4,9}", w): return False
    if re.search(r"[jxwkyqh]", w): return False
    if re.search(r"(.)\1", w): return False
    if re.search(r"nh|lh|ch|sh|ph|th|gu|qu", w): return False
    if re.search(r"c[ei]|g[ei]", w): return False
    if re.search(r"[aeiou]s[aeiou]", w): return False
    if w.endswith("e"): return False
    if re.search(r"ou|au|eu|ei|ai|oi|ae|ui|ia[aeiou]", w): return False
    if re.search(r"[^aeiou]{3}", w): return False           # three consonants in a row are hard in PT and HE
    if re.search(r"^[^aeiou]{2}", w) and not re.match(r"^(br|cr|dr|fr|gr|pr|tr|bl|cl|fl|gl|pl|vl)", w): return False
    if re.search(r"[^aeiou]$", w) and not re.search(r"[lmnrs]$", w): return False   # endings everyone says the same
    if any(b in w for b in BANNED): return False
    syl = len(re.findall(r"[aeiou]+", w))
    return 1 <= syl <= 3

def seeds():
    out = {}
    cur = None
    for line in open(SEEDS, encoding="utf-8"):
        line = line.strip()
        if not line or line.startswith("#"): continue
        if line.endswith(":"): cur = line[:-1]; out[cur] = []; continue
        out[cur] += [x.strip().lower() for x in line.split(",") if x.strip()]
    return out

CLUSTERS = {"nt", "nd", "ns", "nc", "ng", "rt", "rd", "rn", "rl", "rm", "rv", "rb", "rc", "rg", "rs", "lt", "ld", "lm", "lv", "lb", "lc", "lg", "lp", "mb", "mp",
            "st", "sc", "sp", "br", "tr", "pr", "cr", "gr", "dr", "fr", "bl", "pl", "cl", "fl", "gl", "vr"}

def phonotactic(w: str) -> bool:
    # Only consonant pairs every one of PT, BR, FR, EN, DE and HE says without help.
    for m in re.finditer(r"[^aeiou]{2}", w):
        if m.group(0) not in CLUSTERS: return False
    return True

def heads(root: str):
    # Syllable-like starts of a root: C?V, C?VC (lu, lus, ma, mar, al, alt, ca, cab).
    m = re.match(r"([^aeiou]{0,2})([aeiou])([^aeiou]?)", root)
    if not m: return []
    out = [m.group(1) + m.group(2)]
    if m.group(3): out.append(m.group(1) + m.group(2) + m.group(3))
    return out

ENDINGS = ["a", "o", "ia", "io", "ora", "ana", "ena", "ina", "ela", "era", "ira", "ova", "ida", "ado", "alo", "ano", "ino",
           "ari", "elo", "ira", "aro", "ero", "ola", "ura", "ova", "eo", "on", "al", "el", "ar", "or", "as", "is", "ent", "and"]

# The heads that carry the concept (Portugal, the Atlantic, light, home, arrival, view, measure): only these are paired.
CORE = {"lu", "lus", "mar", "ma", "al", "alt", "lum", "sol", "so", "cab", "ca", "cos", "co", "ri", "vis", "vi", "mir", "mi", "por", "po",
        "nor", "no", "cas", "lar", "la", "ter", "te", "nov", "ver", "ve", "cla", "ser", "or", "pra", "ar", "aur", "au", "ib", "i", "ol",
        "est", "es", "rum", "ru", "vel", "cais", "fo", "do", "dor", "tej", "sa", "sal", "ond", "on", "alb", "alv", "ilh", "ba", "bar"}

def quality(w: str) -> float:
    # Higher is easier: 5-7 letters, open syllables, ends in a vowel, at most one consonant pair.
    q = 3.0 - abs(len(w) - 6) * 0.6
    q += 1.0 if w[-1] in "ao" else 0.4 if w[-1] in "aeiou" else 0.0
    q -= 0.8 * len(re.findall(r"[^aeiou]{2}", w))
    q -= 0.5 * (len(re.findall(r"[aeiou]+", w)) == 1)
    return round(q, 2)

def main(out_path=None):
    S = seeds()
    roots = sorted({w for k, v in S.items() if k != "suffixes" for w in v})
    suffixes = S.get("suffixes", [])
    cand = set()
    for r in roots:                                   # 1. real words and light variants
        cand.add(r)
        for s in suffixes:
            base = r[:-1] if r[-1] in "aeiou" and s[0] in "aeiou" else r
            cand.add(base + s)
    hs = sorted({h for r in roots for h in heads(r)})
    for h in hs:                                      # 2. a root's head plus a light ending
        for e in ENDINGS:
            if h[-1] in "aeiou" and e[0] in "aeiou": cand.add(h[:-1] + e)
            else: cand.add(h + e)
    core = [h for h in hs if h in CORE]
    for h1, h2 in itertools.permutations(core, 2):   # 3. two meaningful heads and a light ending (Lu-ma-ra, Al-ve-a)
        if h1[-1] not in "aeiou" and h2[0] not in "aeiou" and h1[-1] + h2[0] not in CLUSTERS: continue
        for e in ["a", "o", "ia", "io", "ra", "na", "la", "ro", "no", "lo"]:
            w = h1 + h2 + (e if h2[-1] not in "aeiou" or e[0] not in "aeiou" else e[1:])
            cand.add(w)
    good = sorted((w for w in cand if ok(w) and phonotactic(w)), key=lambda w: (-quality(w), w))
    if out_path:
        open(out_path, "w").write("\n".join(f"{w}\t{quality(w)}" for w in good) + "\n")
    print(len(cand), "generated,", len(good), "pass the spoken-name rules")
    return good

if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else None)
