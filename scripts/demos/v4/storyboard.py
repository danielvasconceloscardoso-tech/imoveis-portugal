# Prompt 31 (D58), step 1: the storyboard of a v4 film, one graded still per shot (0–13), 1920×1080 with the
# 2.39:1 letterbox, plus a contact sheet. Inputs: the built-shot stills from render.mjs, the site screens from
# screens.mjs, the city photograph and the developer's photographs (never altered beyond crop, grade and light).
# Usage: python3 scripts/demos/v4/storyboard.py <stills dir> <screens dir> <city photo> <developer img dir> <out dir> <city> <morning city>
import os, sys
import numpy as np
from PIL import Image, ImageFilter, ImageDraw
sys.path.insert(0, os.path.dirname(__file__))
from grade import W, H, ACT, TOP, fit, grade, letterbox, text

ST, SC, CITY, DEV, OUT, CITYNAME, MORNING = sys.argv[1:8]
os.makedirs(OUT, exist_ok=True)
pic = lambda n: Image.open(os.path.join(ST, n)).convert("RGB")
scr = lambda n: Image.open(os.path.join(SC, f"screen-{n}.png")).convert("RGB")
dev = lambda n: Image.open(os.path.join(DEV, f"{n}-1600.webp")).convert("RGB")


def act(img, y=.5):
    """The picture area: cover-crop to 1920×803, then place between the bars."""
    a = fit(img, W, ACT, y); f = Image.new("RGB", (W, H)); f.paste(a, (0, TOP)); return f


def snow_over(img, seed=3, n=900, a=.55):
    """Falling snow in front of the photograph (out-of-focus flakes near the lens, sharp ones further back)."""
    rng = np.random.default_rng(seed); layer = Image.new("RGBA", img.size, (0, 0, 0, 0)); d = ImageDraw.Draw(layer)
    for _ in range(n):
        x, y, r = rng.uniform(0, W), rng.uniform(TOP, TOP + ACT), rng.choice([1.2, 1.6, 2.2, 3.5, 6], p=[.35, .3, .2, .1, .05])
        d.ellipse((x - r, y - r * 1.15, x + r, y + r * 1.15), fill=(235, 240, 248, int(255 * a * (1 if r < 3 else .35))))
    layer = layer.filter(ImageFilter.GaussianBlur(1.1))
    return Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")


def reflection(img, city, a=.10):
    """The window and the snow reflected faintly on the laptop's screen."""
    r = fit(city, W, H).filter(ImageFilter.GaussianBlur(14)); r = snow_over(r, 9, 500, .9)
    return Image.blend(img, Image.fromarray(np.maximum(np.asarray(img), np.asarray(r))), a)


def sweep(img, k=.35):
    """A slow diagonal band of light across a photograph (never changes what the photo shows)."""
    a = np.asarray(img, np.float32) / 255; yy, xx = np.mgrid[0:a.shape[0], 0:a.shape[1]]
    band = np.exp(-(((xx - yy * .6) / a.shape[1] - k) / .12) ** 2)[..., None]
    return Image.fromarray((np.clip(a + band * .08 * (1 - a), 0, 1) * 255).astype(np.uint8))


city = Image.open(CITY).convert("RGB"); cw, ch = city.size
street = city.crop((0, int(ch * .22), int(cw * .78), int(ch * .22) + int(cw * .78 / 2.39)))  # no car badges in frame
F = {}
F[0] = text(grade(act(pic("s00.png"), .55), "warm", 0), "Illustrative buyer journey", (W - 64, TOP + ACT - 34), 19, fill=(200, 196, 188), anchor="rs", alpha=.85)
F[1] = text(grade(snow_over(act(street)), "night", 1), f"{CITYNAME}. December 23", (96, TOP + ACT - 64), 30)
F[2] = grade(act(pic("s02.png"), .5), "night", 2)
F[3] = grade(act(pic("s03.png"), .5), "night", 3)
F[4] = grade(reflection(act(scr("map"), .35), street), "screen", 4)
F[5] = grade(reflection(act(scr("budget"), .3), street, .07), "screen", 5)
F[6] = grade(reflection(act(scr("cost"), .45), street, .07), "screen", 6)
F[7] = grade(reflection(act(scr("faq"), .35), street, .07), "screen", 7)
F[8] = grade(sweep(act(dev("tr79-living"), .55)), "screen", 8)
F[9] = grade(reflection(act(scr("viewing"), .5), street, .07), "screen", 9)
F[10] = text(grade(sweep(act(dev("hero"), .45), .55), "warm", 10), f"{MORNING}. 9:00 am", (96, TOP + ACT - 64), 30)
F[11] = grade(act(pic("s11.png"), .5), "night", 11)
F[12] = grade(act(pic("s12.png"), .5), "night", 12)
end = grade(act(pic("s13.png"), .55), "warm", 13)
end = Image.blend(end, Image.new("RGB", end.size), .38)
end = text(end, "Imóveis Portugal", (W // 2, H // 2 - 6), 64, "Playfair-400.ttf", anchor="ms", track=0)
end = text(end, "Your buyers, wherever they live.", (W // 2, H // 2 + 52), 30, "Jost-300.ttf", anchor="ms", track=.01)
F[13] = text(end, "LAUNCHING 1 DECEMBER 2026", (W // 2, H // 2 + 112), 16, "Jost-400.ttf", anchor="ms", track=.18, alpha=.8)
for k, im in F.items(): letterbox(im).save(os.path.join(OUT, f"shot-{k:02d}.jpg"), quality=90)

# Contact sheet: four across, the shot number and its line under each.
LINES = {0: "Cold open · Lisbon terrace, morning · 4 s", 1: f"{CITYNAME}, snow · wind, a siren · strings enter", 2: "“Every Christmas we say: next year.”",
         3: "“This time I opened the laptop.”", 4: "“Somewhere with light.” · through the screen, the coast to Lisbon", 5: "“We'd already agreed on a number…” · figure never readable",
         6: "“It was everything else we didn't know.” · labels sharp, figures soft", 7: "“And whether we could do it from here.”", 8: "(silence) “That one.” · the photograph comes alive",
         9: "“Okay.” · the summary, Send", 10: f"Cross-cut · {MORNING}. 9:00 am · the request arrives", 11: "“You coming?” “In a minute.”", 12: "The window · hold · cut to black, 2 s silence", 13: "The terrace again · the brand, the line, the launch"}
tw, th = 640, 360; sheet = Image.new("RGB", (4 * tw + 5 * 16, 4 * (th + 56) + 16), (250, 249, 246)); d = ImageDraw.Draw(sheet)
from grade import font
for k in range(14):
    x, y = 16 + (k % 4) * (tw + 16), 16 + (k // 4) * (th + 56)
    sheet.paste(Image.open(os.path.join(OUT, f"shot-{k:02d}.jpg")).resize((tw, th)), (x, y))
    d.text((x, y + th + 8), f"{k:02d}", font=font("Jost-400.ttf", 17), fill=(17, 18, 20)); d.text((x + 34, y + th + 8), LINES[k], font=font("Jost-300.ttf", 17), fill=(60, 62, 66))
sheet.save(os.path.join(OUT, "storyboard.jpg"), quality=86)
print("storyboard", OUT)
