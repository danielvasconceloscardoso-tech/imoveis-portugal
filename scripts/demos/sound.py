# Prompt 29 §2c: the soundtrack of a demo film from the timeline the film renderer writes (timeline.json): her lines
# placed on the cut, cleaned (light high-pass, gentle compression) and brought to -16 LUFS integrated; quiet synthesised
# sound effects (clock ticking and city hum in the first act, keystrokes, one click). No music: none could be fetched
# with a licence that allows commercial use without attribution, so the film is voice only, as the prompt allows.
# Usage: python3 scripts/demos/sound.py <timeline.json> <voice dir with line-<shot>.wav> <out dir>
# Writes voice.wav (voice only, -16 LUFS), voice.mp3, mix.wav and captions.vtt.
import json, os, subprocess, sys
import numpy as np, soundfile as sf

TL, VD, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
T = json.load(open(TL)); SR = 48000; N = int(T["duration"] * SR) + SR
rng = np.random.default_rng(29)

def load(p):
    a, sr = sf.read(p, dtype="float32")
    if a.ndim > 1: a = a.mean(1)
    if sr != SR: a = np.interp(np.linspace(0, len(a) - 1, int(len(a) * SR / sr)), np.arange(len(a)), a).astype("float32")
    return a

voice = np.zeros(N, "float32"); cues = []
for c in T["lines"]:
    a = load(os.path.join(VD, f"line-{c['shot']}.wav")); i = int(c["at"] * SR)
    voice[i:i + len(a)] += a[: N - i]; cues.append((c["at"], c["at"] + len(a) / SR, c["text"]))
raw = os.path.join(OUT, "voice-raw.wav"); sf.write(raw, voice, SR)
vw = os.path.join(OUT, "voice.wav")
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", raw, "-af", "highpass=f=90,acompressor=threshold=-22dB:ratio=2.5:attack=5:release=90:makeup=2,loudnorm=I=-16:TP=-1.5:LRA=7", "-ar", str(SR), vw], check=True)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", vw, "-b:a", "128k", os.path.join(OUT, "voice.mp3")], check=True)
os.remove(raw)

# ---------------------------------------------------------------- effects, kept well under the voice
fx = np.zeros(N, "float32")
def burst(ms, lo, hi, decay_ms):
    n = int(SR * ms / 1000); x = rng.standard_normal(n).astype("float32")
    f = np.fft.rfft(x); fr = np.fft.rfftfreq(n, 1 / SR); f[(fr < lo) | (fr > hi)] = 0; x = np.fft.irfft(f, n).astype("float32")
    return x * np.exp(-np.arange(n) / (SR * decay_ms / 1000)).astype("float32") / (np.abs(x).max() + 1e-9)
def put(x, at, gain_db):
    i = int(at * SR); j = min(N, i + len(x)); fx[i:j] += x[: j - i] * (10 ** (gain_db / 20))
a0, a1 = T["act1"]  # ticking and hum from the first frame to the end of the first act
for k in range(int((a1 - a0) / 1.0) + 1):
    t = a0 + k * 1.0
    if t < a1 - 0.05: put(burst(40, 1800 if k % 2 else 2400, 5200, 6), t, -33)
hum = rng.standard_normal(int((a1 - a0) * SR)).astype("float32"); hum = np.cumsum(hum); hum -= np.convolve(hum, np.ones(4800) / 4800, "same"); hum /= np.abs(hum).max() + 1e-9
env = np.minimum(1, np.minimum(np.arange(len(hum)) / SR / 1.2, (len(hum) - np.arange(len(hum))) / SR / 0.6)).astype("float32")
put(hum * env, a0, -42)
for t in T["keys"]: put(burst(28, 900, 4200, 9), t + rng.uniform(-0.01, 0.01), -30 + rng.uniform(-2, 2))
for t in T["clicks"]: put(burst(18, 400, 2600, 6), t, -27)
mix = voice_l = load(vw)[:N]; mix = np.pad(mix, (0, max(0, N - len(mix))))[:N] + fx
mix = mix[: int(T["duration"] * SR)]
mix /= max(1.0, float(np.abs(mix).max()) / 0.97)
sf.write(os.path.join(OUT, "mix.wav"), mix, SR)

# ---------------------------------------------------------------- captions
def ts(s): h, m = int(s // 3600), int(s // 60) % 60; return f"{h:02d}:{m:02d}:{s % 60:06.3f}"
with open(os.path.join(OUT, "captions.vtt"), "w") as f:
    f.write("WEBVTT\n\n")
    for i, (a, b, t) in enumerate(cues, 1): f.write(f"{i}\n{ts(a)} --> {ts(b + 0.3)}\n{t}\n\n")
print("sound ok", T["duration"], len(cues), "lines")
