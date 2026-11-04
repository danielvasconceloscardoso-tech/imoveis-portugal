"""p70 round 3 (J72-13, J2-06): the map's photo pins, one small square per partner development (112 px, about 4 KB),
so a pin never waits for the 800 px render. Writes site/public/img/map/pin-<id>.webp from the project's render
(content/developers/projects.json, "render" + "-800.webp"), centre-cropped. A pin already on disk is kept (O'rizon's and
Marble Terrace's were cropped by hand); --force writes them all again.

Usage (repo root): python3 scripts/map-data/pins.py [--force]
"""
import json, os, sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PUB = os.path.join(ROOT, "site", "public")
projects = json.load(open(os.path.join(ROOT, "content", "developers", "projects.json"), encoding="utf8"))["projects"]
for p in projects:
    if not p.get("partner") or not p.get("render"): continue
    out = os.path.join(PUB, "img", "map", f"pin-{p['id']}.webp")
    src = os.path.join(PUB, p["render"].lstrip("/") + "-800.webp")
    if (os.path.exists(out) and "--force" not in sys.argv) or not os.path.exists(src): continue
    im = Image.open(src).convert("RGB"); w, h = im.size; s = min(w, h)
    im = im.crop(((w - s) // 2, (h - s) // 2, (w - s) // 2 + s, (h - s) // 2 + s)).resize((112, 112), Image.LANCZOS)
    im.save(out, "WEBP", quality=72, method=6)
    print(f"{out}: {os.path.getsize(out) // 1024 + 1} KB")
