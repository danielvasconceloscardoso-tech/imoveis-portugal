# Prompt 31 (D58): the soundtrack of a v4 film, laid on the cut that film.py wrote (timeline.json): real places'
# ambience (Radio Aporee field recordings, public domain), Mixkit sound effects, the 1929 "Silent Night" on a TV in
# another room, the Chopin nocturne (Musopen, CC0) entering in act II and stopping dead at the cut to black, her
# lines close and quiet, the partner through a wall. Master at -16 LUFS. Also writes the .vtt captions.
# Usage: python3 scripts/demos/v4/sound4.py <out dir with timeline.json> <sound.json>
import json, os, subprocess, sys
import numpy as np

OUT, CFG = sys.argv[1:3]
T = json.load(open(os.path.join(OUT, "timeline.json"))); M = T["shots"]; C = json.load(open(CFG))
SR = 48000; N = int(T["duration"] * SR)
mix = np.zeros((N, 2), np.float32)


def load(path, t0=0.0, dur=None, af=""):
    cmd = ["ffmpeg", "-v", "error", "-ss", str(t0), "-i", path] + (["-t", str(dur)] if dur else []) + (["-af", af] if af else []) + ["-ac", "2", "-ar", str(SR), "-f", "f32le", "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True).stdout, np.float32).reshape(-1, 2).copy()


def put(a, at, db=0.0, fin=0.0, fout=0.0, until=None):
    """Place audio a at `at` seconds, with gain and fades; `until` cuts it hard at that time."""
    a = a * (10 ** (db / 20))
    n = len(a)
    if fin: a[: int(fin * SR)] *= np.linspace(0, 1, int(fin * SR))[:, None][: n]
    if fout: m = min(n, int(fout * SR)); a[n - m:] *= np.linspace(1, 0, m)[:, None]
    i = int(at * SR)
    if until is not None: a = a[: max(0, int(until * SR) - i)]
    j = min(N, i + len(a))
    if j > i: mix[i:j] += a[: j - i]


def loop(path, dur, af=""):
    a = load(path, af=af); r = int(dur * SR)
    return np.tile(a, (r // len(a) + 1, 1))[:r]


A = C["audio"]; V = C["voice"]
cut = M["12b"]                                     # everything stops at the hard cut to black
muffle = "lowpass=f=420,aecho=0.8:0.6:40:0.3"      # through the window or a wall
# 0 · the terrace: the sea and gulls far off, a tram; silence on the cut.
put(load(A["gulls"], 40, 4.2), M["0"], -16, .6, until=M["0b"])
put(load(A["tram"], 0, 3.4, "lowpass=f=3500"), M["0"] + .6, -22, .3, until=M["0b"])
# 1 · the city in winter, the wind, a siren far away.
put(load(A["ny"], 120, 7.2), M["1"], -14, .8)
put(loop(A["wind"], 7.2), M["1"], -20, .8, 1.0)
put(load(A["siren"], 0, 5, "lowpass=f=2200,aecho=0.8:0.7:120:0.4"), M["1"] + 2.6, -30, 1.0, 1.5)
# 2–3 · inside: room tone, rain on the glass, the city through the window, the carol on a TV in another room, the pour.
inside = M["4"] - M["2"]
put(loop(A["room"], inside + 2), M["2"], -26, .4, 2.0)
put(load(A["rain"], 0, inside, "lowpass=f=2600"), M["2"], -24, .6, 2.0)
put(load(A["ny"], 200, inside, muffle), M["2"], -26, .6, 2.0)
put(load(A["carol"], 12, inside + 4, "highpass=f=380,lowpass=f=1900,aecho=0.8:0.6:60|90:0.35|0.25"), M["2"], -26, 1.5, 3.0)
if A.get("family"): put(load(A["family"], 0, None, "lowpass=f=380,aecho=0.8:0.6:50:0.3"), M["2"] + .8, -30, .5, 1.0)
put(load(A["pour"], 0, 5, "asetrate=48000*0.86,aresample=48000,lowpass=f=6000"), M["2"] + 3.5, -12, .05, .8)
put(load(A["key"]), M["3"] + 2.9, -16)
# 4–9 · the screen: the room fades, a few keys for the budget, one click for Send.
put(load(A["keys"], 0, 2.4), M["5"] + .5, -24, .1, .3)
put(load(A["key"]), M["9"] + 4.55, -14)
# 10 · the morning in Portugal: a street by the tram, birds.
put(load(A["lisbon"], 30, 7.2), M["10"], -14, .4, .6)
put(load(A["tram"], 0, 7, "lowpass=f=5000"), M["10"] + .3, -20, .3, 1.0)
put(load(A["birds"], 10, 7.2), M["10"], -28, .5, .6)
# 11–12 · back in the city: room tone, the carol faint, then the window: wind and snow. Stop dead at the cut.
put(loop(A["room"], M["12"] - M["11"] + .5), M["11"], -28, .3)
put(load(A["carol"], 70, M["12"] - M["11"], "highpass=f=380,lowpass=f=1700,aecho=0.8:0.6:60|90:0.35|0.25"), M["11"], -30, .8, 1.0)
put(load(A["ny"], 400, cut - M["12"], muffle), M["12"], -20, .8, until=cut)
put(loop(A["wind"], cut - M["12"], "lowpass=f=900"), M["12"], -20, .8, until=cut)
# 13 · out of black: the sea again, and one last piano note.
put(load(A["gulls"], 120, T["duration"] - M["13"]), M["13"], -22, 1.2, 1.5)
# Music: the nocturne enters with the site (act II), breathes at the photograph, stops dead at the cut to black.
mus = load(A["piano"], 0, cut - M["4"] + .5, "highpass=f=60")
env = np.ones(len(mus), np.float32); tt = np.arange(len(mus)) / SR + M["4"]
env *= np.clip((tt - M["4"]) / 2.0, 0, 1)                                        # in over 2 s
env *= np.where(tt < M["8"], 1, np.where(tt < M["9"], 1.35, np.where(tt < M["10"], 1, .55)))  # breathes, then holds low
put(mus * env[:, None], M["4"], -20, until=cut)
put(load(A["piano"], 186, 7, "afade=t=out:st=4:d=3"), M["13"] + 2.6, -18, .05)
# Voices: hers close and quiet; the partner through a wall.
for shot, at in V["cues"]:
    a = load(os.path.join(V["dir"], f"line-{shot}.wav"), af="highpass=f=90,acompressor=threshold=-24dB:ratio=2.5:attack=5:release=80")
    if shot == "11a": a = load(os.path.join(V["dir"], f"line-{shot}.wav"), af="lowpass=f=900,aecho=0.8:0.6:30|55:0.4|0.3"); put(a, M[at[0]] + at[1], -8)
    else: put(a, M[at[0]] + at[1], 2)
mix[int(cut * SR): int(M["13"] * SR)] = 0                                          # two seconds of silence
raw = os.path.join(OUT, "mix-raw.wav")
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", raw], input=mix.tobytes(), check=True)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", raw, "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-ar", str(SR), os.path.join(OUT, "mix.wav")], check=True)
os.remove(raw)
# Captions from the cues and each line's length.
def ts(s): return f"{int(s // 3600):02d}:{int(s // 60) % 60:02d}:{s % 60:06.3f}"
with open(os.path.join(OUT, "captions.vtt"), "w") as f:
    f.write("WEBVTT\n\n")
    for i, (shot, at) in enumerate(V["cues"], 1):
        a0 = M[at[0]] + at[1]; d = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", os.path.join(V["dir"], f"line-{shot}.wav")], capture_output=True, text=True).stdout)
        f.write(f"{i}\n{ts(a0)} --> {ts(a0 + d + .4)}\n{('PARTNER: ' if shot == '11a' else '')}{V['text'][shot]}\n\n")
print("mix", T["duration"])
