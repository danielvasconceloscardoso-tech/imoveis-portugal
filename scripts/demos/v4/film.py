# Prompt 31 (D58): assemble a v4 "December" film, picture only. Licensed stock clips (Mixkit) for the city, the
# window, the pour, the candle, the hands and the morning; the real site in demo mode (screens.mjs, mapframes.mjs);
# the developer's photograph in 2.5D (plate.py); one grade for everything (grade.py). 24 fps, 1920×1080 at 2.39:1.
# Writes frames/f00000.jpg… and timeline.json (shot starts, voice cues) for sound4.py.
# Usage: python3 scripts/demos/v4/film.py <cut.json> <out dir>
import json, os, subprocess, sys
import numpy as np
from PIL import Image, ImageFilter
sys.path.insert(0, os.path.dirname(__file__))
from grade import W, H, ACT, TOP, fit, grade, letterbox, text
from plate import Plate

CUT, OUT = sys.argv[1:3]
C = json.load(open(CUT)); FPS = 24
os.makedirs(os.path.join(OUT, "frames"), exist_ok=True)


def clip(path, t0, dur, y=.5, speed=1.0):
    """Frames of a stock clip from t0, cover-cropped to the picture area, at 24 fps (optionally slowed)."""
    n = round(dur * FPS)
    vf = f"setpts=PTS/{speed},fps={FPS},scale={W}:{ACT}:force_original_aspect_ratio=increase,crop={W}:{ACT}:(iw-{W})/2:(ih-{ACT})*{y}"
    p = subprocess.Popen(["ffmpeg", "-v", "error", "-ss", str(t0), "-i", path, "-vf", vf, "-frames:v", str(n), "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], stdout=subprocess.PIPE)
    out = []
    for _ in range(n):
        b = p.stdout.read(W * ACT * 3)
        if len(b) < W * ACT * 3: break
        out.append(Image.frombytes("RGB", (W, ACT), b))
    p.wait()
    while len(out) < n: out.append(out[-1])
    return out


def still(path, dur, push=.05, y=.5, x=.5):
    """A screen or photograph held with a very slow push-in."""
    im = Image.open(path).convert("RGB"); base = fit(im, int(W * (1 + push)), int(ACT * (1 + push)), y)
    n = round(dur * FPS); out = []
    for i in range(n):
        k = i / max(1, n - 1); s = 1 + push * (1 - k); w, h = int(W * s), int(ACT * s)
        x0 = int((base.width - w) * x); y0 = int((base.height - h) * y)
        out.append(base.crop((x0, y0, x0 + w, y0 + h)).resize((W, ACT), Image.BICUBIC))
    return out


def seq(d, dur, start=0):
    fs = sorted(f for f in os.listdir(d) if f.endswith(".png"))[start:]
    n = round(dur * FPS); idx = np.linspace(0, len(fs) - 1, n).round().astype(int)
    return [fit(Image.open(os.path.join(d, fs[i])).convert("RGB"), W, ACT) for i in idx]


def screen_blend(a, b, amt):
    x = np.asarray(a, np.float32) / 255; o = np.asarray(b, np.float32) / 255 * amt
    return Image.fromarray(((1 - (1 - x) * (1 - o)) * 255).astype(np.uint8))


def dissolve(a, b, n):
    return a[:-n] + [Image.blend(a[len(a) - n + i], b[i], (i + 1) / (n + 1)) for i in range(n)] + b[n:]


def black(dur): return [Image.new("RGB", (W, ACT)) for _ in range(round(dur * FPS))]


k = 0; t = 0.0; marks = {}
def emit(frames, look, label, texts=()):
    """Grade, letterbox and write the frames of one shot; texts: (string, x, y, size, t_in, t_out, kw)."""
    global k, t
    marks[label] = round(t, 3)
    for i, f in enumerate(frames):
        full = Image.new("RGB", (W, H)); full.paste(f, (0, TOP))
        g = grade(full, look, 1000 + k) if look else full
        ft = i / FPS
        for s, x, y, size, a0, a1, kw in texts:
            a = min(1, max(0, (ft - a0) / .8)) * (min(1, max(0, (a1 - ft) / .6)) if a1 else 1)
            if a > 0: kw2 = dict(kw); g = text(g, s, (x, y), size, alpha=a * kw2.pop("alpha", 1), **kw2)
        letterbox(g).save(os.path.join(OUT, "frames", f"f{k:05d}.jpg"), quality=92); k += 1
    t += len(frames) / FPS


V = C["clips"]; S = C["screens"]
city = C["city"]; morning = C["morning"]
snow1, snow2 = clip(V["snow"], 2, 7), clip(V["snowstorm"], 4, 7)
# 0 · the cold open: the glass in warm light; hard cut to black, the small grey line.
emit(still(V["glass_still"], 4, .04) if V.get("glass_still") else clip(V["glass"], 1.0, 4), "warm", "0")
emit(black(1.5), None, "0b", [("Illustrative buyer journey", W - 72, TOP + ACT - 36, 19, .2, 0, {"fill": (150, 150, 150), "anchor": "rs"})])
# 1 · the city at night, snow falling.
ny = clip(V["city"], .5, 7)
ny = [screen_blend(screen_blend(f, snow1[i], .9), snow2[i], .45) for i, f in enumerate(ny)]
emit(ny, "night", "1", [(f"{city}. {C['date']}", 96, TOP + ACT - 64, 30, 1.2, 6.2, {})])
# 2 · inside: rain on the window, then the pour.
emit(dissolve(clip(V["window"], 2, 3.4), clip(V["pour"], 2, 5.1), 12), "night", "2")
# 3 · the candle, then her hands at the laptop.
emit(dissolve(clip(V["candle"], 2, 2.8), clip(V["hands"], 3, 4.7), 12), "night", "3")
# 4 · through the screen into the site; the map glides along the coast and settles.
thr = seq(C["through"], 1.6) if C.get("through") else []
glide = seq(C["map"] + "/glide", 8 - len(thr) / FPS)
ref = clip(V["snow"], 10, 8)
emit([screen_blend(f, ref[i].filter(ImageFilter.GaussianBlur(2)), .10) for i, f in enumerate(thr + glide)], "screen", "4")
# 5 · the budget, never readable; the places that fit rise out of the map.
emit(dissolve(still(S["budget"], 3.2, .04, .35), seq(C["map"] + "/rise", 4), 10), "screen", "5")
# 6 · the real cost: labels sharp, figures soft.
emit(still(S["cost"], 7, .05, .3), "screen", "6")
# 7 · from here: the answer for buyers who live abroad.
emit(still(S["faq"], 7, .05, .3), "screen", "7")
# 8 · their homes: one photograph fills the frame and comes alive.
P = Plate(C["photo"], C["photo_depth"], focus=(.5, .55))
emit([P.frame(i / (9 * FPS - 1), push=.06, parallax=.8) for i in range(9 * FPS)], "warm", "8")
# 9 · the viewing request, the summary, Send.
emit(still(S["viewing"], 4.6, .04, .5) + still(S["sent"], 2.4, .02, .5), "screen", "9")
# 10 · the cross-cut: the morning in Portugal, then the request in the developer's inbox.
emit(dissolve(clip(V["morning"], 3, 4.4), still(S["inbox"], 2.9, .03, .2), 10), "warm", "10", [(f"{morning}. 9:00 am", 96, TOP + ACT - 64, 30, .8, 3.8, {})])
# 11 · back in the city: the hands at rest, the candle.
emit(dissolve(clip(V["hands"], 28, 4.2), clip(V["candle2"], 9, 2.3), 12), "night", "11")
# 12 · the window, the snow keeps falling. Hold. Hard cut to black, two seconds of silence.
win = clip(V["window"], 6, 7); st = clip(V["snowstorm"], 12, 7)
emit([screen_blend(Image.blend(st[i], f.filter(ImageFilter.GaussianBlur(1)), .18), snow1[i % len(snow1)], .4) for i, f in enumerate(win)], "night", "12")
emit(black(2), None, "12b")
# 13 · out of black: the glass again, in the light; the brand, the line, the launch.
end = still(V["glass_still"], 7, .03) if V.get("glass_still") else clip(V["glass"], 5, 7)
end = [f if i < 3 * FPS else Image.blend(f, Image.new("RGB", f.size), min(.45, (i - 3 * FPS) / FPS * .45)) for i, f in enumerate(end)]
emit(end, "warm", "13", [("Imóveis Portugal", W // 2, H // 2 - 4, 64, 3.2, 0, {"name": "Playfair-400.ttf", "anchor": "ms", "track": 0}),
                         ("Your buyers, wherever they live.", W // 2, H // 2 + 52, 30, 3.8, 0, {"anchor": "ms", "track": .01}),
                         ("LAUNCHING 1 DECEMBER 2026", W // 2, H // 2 + 108, 16, 4.4, 0, {"name": "Jost-400.ttf", "anchor": "ms", "track": .18, "alpha": .8})])
json.dump({"fps": FPS, "frames": k, "duration": round(k / FPS, 3), "shots": marks}, open(os.path.join(OUT, "timeline.json"), "w"), indent=1)
print("frames", k, "duration", round(k / FPS, 2), marks)
