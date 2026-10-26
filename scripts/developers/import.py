# Prompt 28 §2 (D53): turns the research files on each developer (one data.json and an img/ folder per developer,
# gathered from the developer's own pages and public listings) into content/developers/projects.json and the demo images.
# Usage: python3 scripts/developers/import.py <research dir>
# Only published facts: names, typologies, areas, prices as published, delivery, the developer's images with credit,
# the URL and date of every item. partner=false keeps a project off the public site (D38): its images and homes appear
# only in its own private demo (/d/{token}/), until the developer signs; then set partner=true.
# Estate agencies that list a developer's homes are recorded as sources only, never shown (D9).
import json, os, re, sys, unicodedata
from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), "..", "..")
SRC = sys.argv[1]
# developer folder → demo token, and which of its projects to keep (the developer's own homes only).
PLAN = {
    "vanguard": ("34c86306cf", ["tomas-ribeiro-79", "muda"]),
    "valedolobo": ("65bf930b11", ["the-residences-vale-do-lobo"]),  # resale homes of third-party owners left out
    "orizon": ("f658bd1eef", ["orizon"]),
    "vic": ("7c1e5a90d4", None),
}
MUNI = {"Lisboa": "lisboa", "Loulé": "loule", "Gondomar": "gondomar", "Grândola": "grandola", "Alcácer do Sal": "alcacer-do-sal", "Cascais": "cascais", "Oeiras": "oeiras", "Loures": "loures"}
slug = lambda s: re.sub(r"[^a-z0-9]+", "-", unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()).strip("-")

def image(src, token, name):
    """Two web sizes of a developer image, kept under the demo's unlisted folder."""
    out_dir = os.path.join(ROOT, "site", "public", "d", token, "img"); os.makedirs(out_dir, exist_ok=True)
    im = Image.open(src).convert("RGB"); base = os.path.splitext(os.path.basename(name))[0]
    for w in (1600, 800):
        x = im.copy(); x.thumbnail((w, w * 2)); x.save(os.path.join(out_dir, f"{base}-{w}.webp"), "WEBP", quality=80)
    return f"/d/{token}/img/{base}"

projects = []
for key, (token, keep) in PLAN.items():
    f = os.path.join(SRC, key, "data.json")
    if not os.path.exists(f): print("skip", key); continue
    d = json.load(open(f)); imgs = {i["file"]: i for i in d.get("images", [])}
    for p in d["projects"]:
        if keep and p["id"] not in keep: continue
        pic = lambda rel: image(os.path.join(SRC, key, rel), token, rel) if rel and os.path.exists(os.path.join(SRC, key, rel)) else None
        units = []
        for u in p["units"]:
            units.append({"id": slug(str(u["ref"]).split("–")[0].strip()) or slug(u["typology"]), "ref": str(u["ref"]).split("–")[0].strip(), "name": (str(u["ref"]).split("–", 1)[1].strip() if "–" in str(u["ref"]) else None),
                          "typology": u["typology"], "area": u["area"], "areaNote": u.get("areaNote"), "price": u["price"], "priceNote": u.get("priceNote"),
                          "img": pic(u.get("img")), "url": u["url"]})
        prices = [u["price"] for u in units if u["price"]]
        mine = {"vanguard": lambda i: (p["id"] == "muda") == i.startswith("img/muda"), "valedolobo": lambda i: i.startswith("img/residences")}.get(key, lambda i: True)
        gallery = [pic(i) for i in imgs if i != p["hero"] and mine(i)]
        sources = sorted({u["url"] for u in units} | {p["url"]} | {i["page"] for i in imgs.values() if i.get("page")} - {None})
        projects.append({
            "id": p["id"], "name": p["name"], "developer": d["developer"], "devSlug": slug(d["developer"]), "muni": MUNI[p["muni"]],
            "lon": p["lon"], "lat": p["lat"], "line": p["line"], "delivery": p.get("delivery"), "url": p["url"],
            "partner": False, "demo": token, "checked": d.get("checked"),
            "render": pic(p["hero"]), "credit": imgs.get(p["hero"], {}).get("credit") or p.get("credit"),
            "gallery": [g for g in gallery if g][:8], "credits": sorted({(i.get("credit") or "").split(" (")[0] for i in imgs.values()} - {""}),
            "from": min(prices) if prices else None, "typologies": sorted({u["typology"] for u in units}),
            "units": units, "sources": sources,
            # References that are an estate agency's listing codes stay in the data but are not shown (D9).
            "hideRefs": key == "orizon",
        })
out = os.path.join(ROOT, "content", "developers", "projects.json")
how = json.load(open(out))["_how"]
how = ("Developer projects (prompts 26 §1 and 28 §2). partner=true: shown on the public map, the place card ('Partner developers here') and a showcase page, labelled 'Sponsored' "
       "(only once the developer has signed and paid, D6, D38). partner=false: shown only in that developer's private demo (/d/{demo}/). Facts only as published by the developer "
       "or its public listings, with the URL of every item in 'sources' and the date in 'checked'; prices exactly as published (null = on request). "
       "On the site, a partner's line must also be written natively in PT and FR ('lines': {pt, fr}); the English 'line' is used for demos. Built by scripts/developers/import.py.")
json.dump({"_how": how, "projects": projects}, open(out, "w"), indent=1, ensure_ascii=False)
for p in projects: print(p["demo"], p["id"], p["muni"], len(p["units"]), p["from"], len(p["gallery"]))
