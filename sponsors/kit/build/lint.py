"""Checks the sales kit texts (sponsors/kit/*.md and the PDF HTML) for the voice rules of
content/VOICE_AND_WORLD.md and prompt 62 §3b: no marketing words, no contrast flips, no exclamation
marks, no e-mail addresses outside the brand domains, no phone numbers.
Usage: python3 sponsors/kit/build/lint.py [files...]  (default: sponsors/kit/*.md and build/*.html)"""
import glob, os, re, sys
D = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
files = sys.argv[1:] or sorted(glob.glob(os.path.join(D, "*.md")) + glob.glob(os.path.join(D, "build", "*.html")))
BAN = (r"deslumbrante|de cortar a respira|joia escondida|para[ií]so|aninhad|\bexclusiv[oa]s?\b|\bluxo\b|luxuos|curadoria|"
       r"\bcurad[oa]s?\b|\balma\b|charme|vibrante|ic[óo]nic|solu[çc][ãa]o|solu[çc][õo]es|ecossistema|sinergia|inovador|"
       r"oportunidade [úu]nica|garantid|imperd[íi]vel|n[ãa]o perca|[úu]ltimas|s[óo] hoje|incr[íi]vel|fant[áa]stic|revolucion|"
       r"potenci(e|ar)|alavanc|experi[êe]ncia|sem igual|de sonho|premium|\b[úu]nic[oa]\b|antes que seja tarde")
FLIP = r"\bn[ãa]o (é|s[ãa]o)\b[^.?]{0,60}\.\s+(É|São)\b"
MAIL = r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
OKMAIL = r"@imoveisportugal\.(lu|fr|ch|com\.br)$"
PHONE = r"(\+\d{2,3}[\s\d]{8,})|\b\d{3}\s\d{3}\s\d{3}\b"
err = 0
for f in files:
    for i, line in enumerate(open(f, encoding="utf-8"), 1):
        t = re.sub(r"https?://\S+", "", line)
        if f.endswith(".html"):
            t = re.sub(r"<[^>]+>", " ", t)
            if "{" in line and ":" in line and ";" in line: continue  # CSS
        def say(m): 
            global err; err += 1; print(f"{os.path.relpath(f, D)}:{i}: {m}")
        if "!" in t: say("exclamation mark")
        for m in re.finditer(BAN, t, re.I): say(f"word '{m.group(0)}'")
        if re.search(FLIP, t): say("contrast flip")
        for m in re.finditer(MAIL, t):
            if not re.search(OKMAIL, m.group(0)): say(f"e-mail outside the brand domains: {m.group(0)}")
        if re.search(PHONE, t): say("phone number")
print(f"{len(files)} files, {err} findings"); sys.exit(1 if err else 0)
