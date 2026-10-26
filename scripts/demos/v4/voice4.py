# Prompt 31 (D58): her lines and the partner's for one v4 film, with Kokoro-82M (kokoro-onnx, Apache 2.0), each read
# back by Whisper (sherpa-onnx) and checked word for word. The partner is muffled later, in the mix.
# Usage: python3 scripts/demos/v4/voice4.py <model dir> <token> <out dir> [shot ...]
import importlib.util, json, os, re, sys
import soundfile as sf
from kokoro_onnx import Kokoro

MD, TOK, OUT, *ONLY = sys.argv[1:]
S = json.load(open(os.path.join(os.path.dirname(__file__), "..", "..", "..", "content", "demos", "screenplay_v4.json")))
D = S["demos"][TOK]; lines = {**S["base"], **D["lines"]}
k = Kokoro(os.path.join(MD, S["engine"]["model"]), os.path.join(MD, S["engine"]["voices"]))
spec = importlib.util.spec_from_file_location("stt", os.path.join(MD, "stt.py")); stt = importlib.util.module_from_spec(spec); spec.loader.exec_module(stt)
os.makedirs(OUT, exist_ok=True)
norm = lambda s: re.sub(r"[^a-z' ]", "", s.lower().replace("'", "'")).split()
bad = 0
for shot, text in lines.items():
    if ONLY and shot not in ONLY: continue
    voice = D["partner"] if shot == "11a" else D["her"]
    a, sr = k.create(S.get("say", {}).get(text, text), voice=voice, speed=S["engine"]["speed"], lang="en-gb" if voice.startswith("b") else "en-us")
    p = os.path.join(OUT, f"line-{shot}.wav"); sf.write(p, a, sr)
    got = stt.tr(p); good = norm(got) == norm(text); bad += not good
    print(("OK  " if good else "BAD ") + shot, voice, "|", text, "|", got)
sys.exit(1 if bad else 0)
