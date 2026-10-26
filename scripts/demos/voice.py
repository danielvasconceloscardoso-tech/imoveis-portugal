# Prompt 29 §2c: renders each demo's lines with Kokoro-82M (kokoro-onnx, Apache 2.0), checks every line by reading it
# back with a local speech-to-text model (whisper base.en via sherpa-onnx) and re-renders a line that does not read back.
# Usage: python3 scripts/demos/voice.py <model dir with kokoro-v1.0.onnx, voices-v1.0.bin and stt/> <out dir>
# Writes <out>/<token>/line-<shot>.wav and lines.json (duration and read-back of each line).
import json, os, re, sys, importlib.util
import soundfile as sf
from kokoro_onnx import Kokoro
ROOT = os.path.join(os.path.dirname(__file__), "..", "..")
MD, OUT = sys.argv[1], sys.argv[2]
S = json.load(open(os.path.join(ROOT, "content", "demos", "screenplay.json")))
k = Kokoro(os.path.join(MD, S["engine"]["model"]), os.path.join(MD, S["engine"]["voices"]))
spec = importlib.util.spec_from_file_location("stt", os.path.join(MD, "stt.py")); stt = importlib.util.module_from_spec(spec); spec.loader.exec_module(stt)
# The read-back writes numbers as digits ("20 tabs", "3.5 million") and "every one" as "everyone": compare in words.
NUM = {"3.5": "three and a half", "20": "twenty", "4": "four", "3": "three", "2": "two", "everyone": "every one"}
def norm(s):
    s = s.lower().replace("'", "")
    for a, b in NUM.items(): s = re.sub(rf"(?<![\w.]){re.escape(a)}(?![\w.])", b, s)
    return re.sub(r"[^a-z ]", " ", s).split()
def ok(want, got):
    w, g = norm(want), norm(got)
    return sum(1 for x in w if x in g) >= 0.85 * len(w)
for token, d in S["demos"].items():
    os.makedirs(os.path.join(OUT, token), exist_ok=True); rep = {}
    for shot, line in d["lines"].items():
        text = line
        for a, b in S["say"].items(): text = text.replace(a, b)
        for attempt, speed in enumerate([S["engine"]["speed"], S["engine"]["speed"] - 0.03, S["engine"]["speed"] + 0.03]):
            a, sr = k.create(text, voice=d["voice"], speed=speed, lang=S["engine"]["lang"])
            p = os.path.join(OUT, token, f"line-{shot}.wav"); sf.write(p, a, sr)
            back = stt.tr(p)
            if ok(line, back): break
        rep[shot] = {"line": line, "dur": round(len(a) / sr, 3), "back": back, "ok": ok(line, back), "speed": speed}
        print(token, shot, rep[shot]["ok"], round(len(a) / sr, 2), "|", back)
    json.dump(rep, open(os.path.join(OUT, token, "lines.json"), "w"), indent=1, ensure_ascii=False)
