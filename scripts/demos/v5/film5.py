# Prompt 35 §4 (D61): film v5, the Vanguard film. Her problems and how we solve each one, in ten beats and 105 seconds.
# December in New York (snow, the pour, the candle, her hands at the laptop: Mixkit, kept from v4), then the new interface
# rendered full-frame (ui.mjs: the search field, "Step by step", the map, the concierge, the video call in our design over
# Tomás Ribeiro 79 in 2.5D, the team), then summer in Portugal (Mixkit and Pixabay) and the end titles.
# One grade (v4 grade.py), 24 fps, 1920×1080 at 2.39:1. Writes frames/, mix.wav, captions.vtt and timeline.json.
# Usage: python3 scripts/demos/v5/film5.py <cut5.json> <out dir>
import json, os, subprocess, sys
import numpy as np
from PIL import Image
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "v4"))
from grade import W, H, ACT, TOP, fit, grade, letterbox, text
from plate import Plate

CUT, OUT = sys.argv[1:3]
C = json.load(open(CUT)); FPS = 24; SR = 48000
os.makedirs(os.path.join(OUT, "frames"), exist_ok=True)
V, U, A = C["clips"], C["ui"], C["audio"]


def clip(path, t0, dur, y=.5, speed=1.0):
    """Frames of a stock clip from t0, cover-cropped to the picture area at 24 fps; speed < 1 slows it."""
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


def ui(name, dur, start=0.0, rgba=False):
    """A rendered interface scene (24 fps PNGs), from `start` seconds, held on its last frame if shorter."""
    d = U[name]; fs = sorted(f for f in os.listdir(d) if f.endswith(".png")); s = round(start * FPS)
    out = []
    for i in range(round(dur * FPS)):
        im = Image.open(os.path.join(d, fs[min(s + i, len(fs) - 1)]))
        out.append(im.convert("RGBA") if rgba else im.convert("RGB").resize((W, ACT)))
    return out


def screen_blend(a, b, amt):
    x = np.asarray(a, np.float32) / 255; o = np.asarray(b, np.float32) / 255 * amt
    return Image.fromarray(((1 - (1 - x) * (1 - o)) * 255).astype(np.uint8))


def dissolve(a, b, n):
    return a[:-n] + [Image.blend(a[len(a) - n + i], b[i], (i + 1) / (n + 1)) for i in range(n)] + b[n:]


def black(dur): return [Image.new("RGB", (W, ACT)) for _ in range(round(dur * FPS))]


k = 0; t = 0.0; marks = {}
def emit(frames, look, label, texts=()):
    """Grade, letterbox and write one beat; texts: (string, x, y, size, t_in, t_out, kw)."""
    global k, t
    marks[label] = round(t, 3)
    for i, f in enumerate(frames):
        full = Image.new("RGB", (W, H)); full.paste(f, (0, TOP))
        g = grade(full, look, 1000 + k, grain=.6 if look == "screen" else 1.0) if look else full
        ft = i / FPS
        for s, x, y, size, a0, a1, kw in texts:
            a = min(1, max(0, (ft - a0) / .8)) * (min(1, max(0, (a1 - ft) / .6)) if a1 else 1)
            if a > 0: kw2 = dict(kw); g = text(g, s, (x, y), size, alpha=a * kw2.pop("alpha", 1), **kw2)
        letterbox(g).save(os.path.join(OUT, "frames", f"f{k:05d}.jpg"), quality=92); k += 1
    t += len(frames) / FPS


# 1 · December night in New York: snow, the pour, the candle.  "Every Christmas we say: next year."
snow = clip(V["snow"], 3, 6)
emit([screen_blend(a, b, .8) for a, b in zip(clip(V["city"], .5, 6), snow)], "night", "1",
     [("Illustrative buyer journey", W - 72, TOP + ACT - 36, 19, .3, 4.5, {"fill": (170, 170, 170), "anchor": "rs"})])
emit(clip(V["pour"], 2.0, 4), "night", "1b")
emit(clip(V["candle"], 4.0, 3), "night", "1c")
# 2 · the laptop: her hands, then a plain search field in our design.  "So this year, I actually asked."
emit(clip(V["hands"], 6.0, 3.5), "night", "2")
emit(ui("search", 7.0), "screen", "2b")
# 3 · our site opens, the screen fills with light: "Step by step".  "Most of what I found was noise…"
white = [Image.new("RGB", (W, ACT), (255, 255, 255))] * 12
emit(dissolve(white, ui("path", 5.5), 12), "screen", "3")
# 4 · where and how much: the map glides, Lisboa lights up, the budget opens as a range (no figure anywhere).
emit(ui("map", 11.0), "screen", "4")
# 5 · the concierge sheet: the first call is booked.  "I didn't want a sales pitch…"
emit(ui("concierge", 9.0), "screen", "5")
# 6 · the first visit by video, in our own design: Tomás Ribeiro 79 in 2.5D under the call.  "Two weeks later…"
P = C["plates"]; call = ui("call", 14.0, rgba=True); rooms = [("living", 5.0, .06, (.4, 0)), ("terrace", 4.5, .05, (-.3, 0)), ("kitchen", 4.5, .05, (0, .2))]
under = []
for key, dur, push, drift in rooms:
    pl = Plate(P[key]["photo"], P[key]["depth"], focus=tuple(P[key].get("focus", (.5, .5))), margin=1.08)
    n = round(dur * FPS); under += [pl.frame(i / (n - 1), push=push, drift=drift, parallax=.75) for i in range(n)]
frames6 = []
for i, c in enumerate(call):
    base = under[min(i, len(under) - 1)].convert("RGBA"); base.alpha_composite(c.resize((W, ACT))); frames6.append(base.convert("RGB"))
emit(frames6, "screen", "6")
# 7 · the team, one at a time, roles only.  "A lawyer. A tax adviser who knew both countries…"
emit(ui("team", 9.5), "screen", "7")
# 8 · summer: the family on the beach from above, the course by the sea at golden hour, the father from behind, a cigar.
emit(clip(V["beach"], 3.0, 6.0), "warm", "8")
emit(clip(V["golfsea"], 0.0, 4.0), "warm", "8b")
emit(clip(V["golfer"], 0.0, 4.5, speed=.6), "warm", "8c")
emit(clip(V["cigar"], 1.5, 2.5), "warm", "8d")
# 9 · hold on the sea.  "…next year finally came."
emit(clip(V["sea"], 2.0, 7.5), "warm", "9")
# 10 · black; the name, the line, the date; one note.
PF, MF = "Playfair-400.ttf", "Manrope-500.ttf"; cy = TOP + ACT // 2
emit(black(8.0), None, "10", [("Imóveis Portugal", W // 2, cy - 10, 66, .6, 0, {"name": PF, "anchor": "ms", "track": .0}),
                              ("Your buyers, wherever they live.", W // 2, cy + 52, 26, 1.8, 0, {"name": MF, "anchor": "ms", "track": .01, "fill": (210, 206, 198)}),
                              ("Launching 1 December 2026", W // 2, TOP + ACT - 40, 17, 3.0, 0, {"name": MF, "anchor": "ms", "track": .12, "fill": (150, 150, 150)})])
DUR = t
json.dump({"duration": DUR, "shots": marks}, open(os.path.join(OUT, "timeline.json"), "w"), indent=1)
print("picture", round(DUR, 2), "s,", k, "frames")

# ------------------------------------------------------------ sound: room and city, a few real sounds, the nocturne, her voice
N = int(DUR * SR); mix = np.zeros((N, 2), np.float32)
def load(path, t0=0.0, dur=None, af=""):
    cmd = ["ffmpeg", "-v", "error", "-ss", str(t0), "-i", path] + (["-t", str(dur)] if dur else []) + (["-af", af] if af else []) + ["-ac", "2", "-ar", str(SR), "-f", "f32le", "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True).stdout, np.float32).reshape(-1, 2).copy()
def put(a, at, db=0.0, fin=0.0, fout=0.0):
    a = a * 10 ** (db / 20); n = len(a)
    if fin: a[:int(fin * SR)] *= np.linspace(0, 1, int(fin * SR))[:, None]
    if fout: a[n - int(fout * SR):] *= np.linspace(1, 0, int(fout * SR))[:, None]
    s = int(at * SR); e = min(N, s + n); mix[s:e] += a[:e - s]
M = marks
put(load(A["ny"], 30, M["2b"] + 1), 0, -26, 1.5, 2.5)              # the city through the window
put(load(A["wind"], 0, M["2b"]), 0, -32, 2, 3)
put(load(A["room"], 0, M["3"] - M["1b"]), M["1b"], -34, 1, 1)
put(load(A["pour"], 0, 3.5, "atempo=0.8"), M["1b"] + .4, -22, .05, .6)
put(load(A["keys"], 0, 4.5), M["2b"] + .8, -24, .1, .4)
put(load(A["key"], 0, 1), M["2b"] + 5.15, -18)
mus_end = M["8"]
put(load(A["piano"], 0, mus_end - M["3"] + 1.0, "highpass=f=60"), M["3"], -22, 2.5, 1.0)  # the nocturne enters with the light
put(load(A["sea"], 0, M["10"] - M["8"] + .5), M["8"], -24, 1.5, 1.2)    # summer: the sea and gulls
put(load(A["piano"], 120, M["10"] - M["8"], "highpass=f=60"), M["8"], -24, 1.5, .05)  # the music returns, and stops dead at black
put(load(A["piano"], 186, 7, "afade=t=out:st=4:d=3"), M["10"] + .4, -18, .05)          # one note
cues = C["voice"]["cues"]; vtt = ["WEBVTT", ""]
def ts(s): return f"{int(s // 3600):02d}:{int(s // 60) % 60:02d}:{s % 60:06.3f}"
for i, (shot, off, line) in enumerate(cues):
    a = load(os.path.join(C["voice"]["dir"], f"line{i + 1:02d}.wav")); at = M[shot] + off
    put(a, at, C["voice"].get("db", -2.0))
    vtt += [f"{ts(at)} --> {ts(at + len(a) / SR + .3)}", line, ""]
pk = np.abs(mix).max(); mix = mix / max(pk, 1e-6) * .89
tmp = os.path.join(OUT, "mix_raw.wav")
import wave
with wave.open(tmp, "wb") as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(mix, -1, 1) * 32767).astype(np.int16).tobytes())
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", tmp, "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-ar", str(SR), os.path.join(OUT, "mix.wav")], check=True)
open(os.path.join(OUT, "captions.vtt"), "w").write("\n".join(vtt))
print("sound", os.path.join(OUT, "mix.wav"))
