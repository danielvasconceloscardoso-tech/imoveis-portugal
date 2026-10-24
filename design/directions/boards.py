"""Side-by-side boards of the direction mocks (desktop home, desktop partners, mobile home).
Run from the repo root after shoot.mjs:  python3 design/directions/boards.py"""
import pathlib
from PIL import Image, ImageDraw, ImageFont

HERE = pathlib.Path(__file__).parent / "screens"
NAMES = {"a": "A · Folha (financial broadsheet)", "b": "B · Atlântico (photo-led magazine)", "c": "C · Betão (Portuguese modernism)"}
try:
    FONT = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 34)
except OSError:
    FONT = ImageFont.load_default()

for d, title in NAMES.items():
    shots = [f"{d}-home-desktop", f"{d}-partners-desktop", f"{d}-home-mobile"]
    cols = []
    for i, name in enumerate(shots):
        im = Image.open(HERE / f"{name}.jpg")
        w = 1000 if i < 2 else 420
        cols.append(im.resize((w, int(im.height * w / im.width))))
    board = Image.new("RGB", (sum(c.width for c in cols) + 160, max(c.height for c in cols) + 120), "#d9d9d6")
    ImageDraw.Draw(board).text((40, 24), title, fill="#111", font=FONT)
    x = 40
    for c in cols:
        board.paste(c, (x, 80))
        x += c.width + 40
    board.save(HERE / f"board-{d}.jpg", quality=82)
    print(d, board.size)
