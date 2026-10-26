# Prompt 32: responsive photographs for design v2, AVIF and WebP at three widths (640, 1024, 1600), from the licensed
# originals in design/directions/photos/ (Unsplash License, see CREDITS.md there and /credits on the site).
# Usage (repo root): python3 scripts/design/images.py
import os
from PIL import Image
SRC, OUT = "design/directions/photos", "site/public/img/v2"
os.makedirs(OUT, exist_ok=True)
for f in sorted(os.listdir(SRC)):
    if not f.endswith(".jpg"): continue
    im = Image.open(os.path.join(SRC, f)).convert("RGB"); name = f[:-4]
    for w in (640, 1024, 1600):
        r = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS) if im.width > w else im
        r.save(os.path.join(OUT, f"{name}-{w}.webp"), quality=78, method=6)
        r.save(os.path.join(OUT, f"{name}-{w}.avif"), quality=55, speed=6)
    print(name, im.size)
