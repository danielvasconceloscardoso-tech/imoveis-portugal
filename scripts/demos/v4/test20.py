# Prompt 31 (D58), step 1: 20 seconds of the grade and sound, shots 1–3 of a v4 film, 24 fps, 1920×1080 at 2.39:1.
#   1 (6 s)  the city at night, snow, 2.5D push-in; the place and date fade in.
#   2 (8 s)  inside: the pour, the slow pull back. A short dissolve from 1.
#   3 (6 s)  the laptop opens; its light on the glass and in the window.
# Usage: python3 scripts/demos/v4/test20.py <city crop> <city depth> <shot frames dir> <out dir> <city name> [date]
import os, sys
from PIL import Image
sys.path.insert(0, os.path.dirname(__file__))
from grade import W, H, ACT, TOP, grade, letterbox, text
from plate import Plate, Snow

CITY, DEPTH, FR, OUT, NAME = sys.argv[1:6]; DATE = sys.argv[6] if len(sys.argv) > 6 else "December 23"
os.makedirs(OUT, exist_ok=True)
FPS = 24; D1, D2, D3, X = 6, 8, 6, 12          # seconds per shot, dissolve frames between 1 and 2
P = Plate(CITY, DEPTH, focus=(.5, .52)); S = Snow()
full = lambda a: (lambda f: (f.paste(a, (0, TOP)), f)[1])(Image.new("RGB", (W, H)))


def shot1(i):
    t = i / FPS; im = S.draw(P.frame(t / D1, push=.07, parallax=.75), t + 2)
    g = grade(full(im), "night", 1000 + i)
    a = min(1, max(0, (t - 1.2) / 1.0)) * min(1, max(0, (D1 - .4 - t) / .8))
    return text(g, f"{NAME}. {DATE}", (96, TOP + ACT - 64), 30, alpha=a) if a > 0 else g


def built(name, i, seed):
    return grade(full(Image.open(os.path.join(FR, f"{name}-{i:04d}.png")).convert("RGB")), "night", seed)


n1, n2, n3 = D1 * FPS, D2 * FPS, D3 * FPS; k = 0
for i in range(n1 - X):
    letterbox(shot1(i)).save(os.path.join(OUT, f"f{k:05d}.jpg"), quality=93); k += 1
for j in range(X):                                    # dissolve: the street gives way to the room
    a = shot1(n1 - X + j); b = built("s02", j, 2000 + j)
    letterbox(Image.blend(a, b, (j + 1) / (X + 1))).save(os.path.join(OUT, f"f{k:05d}.jpg"), quality=93); k += 1
for j in range(X, n2):
    letterbox(built("s02", j, 2000 + j)).save(os.path.join(OUT, f"f{k:05d}.jpg"), quality=93); k += 1
for j in range(n3):
    letterbox(built("s03", j, 3000 + j)).save(os.path.join(OUT, f"f{k:05d}.jpg"), quality=93); k += 1
print("frames", k, "=", k / FPS, "s")
