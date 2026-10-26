# Prompt 31 (D58): one grade for every clip of the v4 films. 1920×1080 with a 2.39:1 letterbox; night in cool teal
# with deep blacks, Portugal warm and golden, screens kept readable; soft halation on lights and fine 35 mm grain.
# Used by storyboard.py (stills) and film.py (every frame).
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1920, 1080
ACT = round(W / 2.39)            # 803 px of picture
TOP = (H - ACT) // 2             # 138 px bars
FONTS = os.path.expanduser("~/.fonts")


def fit(img, w=W, h=H, y=0.5):
    """Cover-crop to w×h; y picks the vertical focus (0 top, 1 bottom)."""
    img = img.convert("RGB"); s = max(w / img.width, h / img.height)
    img = img.resize((round(img.width * s), round(img.height * s)), Image.LANCZOS)
    x0 = (img.width - w) // 2; y0 = round((img.height - h) * y)
    return img.crop((x0, y0, x0 + w, y0 + h))


def _luma(a):
    return a[..., 0] * .2126 + a[..., 1] * .7152 + a[..., 2] * .0722


def grade(img, look, seed=0, grain=1.0):
    a = np.asarray(img.convert("RGB"), np.float32) / 255
    l = _luma(a)[..., None]
    if look == "night":
        a = np.clip((a - .025) / .975, 0, 1) ** 1.12                                   # deep blacks
        l = _luma(a)[..., None]
        a = a + (1 - l) ** 2 * np.array([-.025, .035, .05]) + l ** 2 * np.array([.05, .02, -.03])  # teal shadows, warm lights
        a = l + (a - l) * .8                                                              # a little less colour
    elif look == "warm":
        a = np.clip(a * 1.02, 0, 1) ** .96
        l = _luma(a)[..., None]
        a = a + (1 - l) ** 2 * np.array([.03, .012, -.02]) + l ** 2 * np.array([.05, .025, -.05])
        a = l + (a - l) * 1.04
    elif look == "screen":                                                                # the laptop at night: readable, a touch cool
        a = a * .93 + .015
        a = a + np.array([-.012, 0, .015])
    a = np.clip(a, 0, 1)
    # Halation: the brightest lights bleed a red-orange glow.
    hi = np.clip((_luma(a) - .72) / .28, 0, 1)
    if hi.max() > 0 and look != "screen":
        g = np.asarray(Image.fromarray((hi * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(22)), np.float32)[..., None] / 255
        a = 1 - (1 - a) * (1 - g * np.array([.55, .2, .08]) * .6)
    # Vignette.
    yy, xx = np.mgrid[0:a.shape[0], 0:a.shape[1]]
    r = np.sqrt(((xx - a.shape[1] / 2) / (a.shape[1] / 2)) ** 2 + ((yy - a.shape[0] / 2) / (a.shape[0] / 2)) ** 2)
    a = a * (1 - np.clip(r - .55, 0, 1) ** 2 * (.45 if look == "night" else .25))[..., None]
    # Grain: fine, a little soft, strongest in the mid-tones.
    if grain:
        rng = np.random.default_rng(seed)
        n = rng.standard_normal(a.shape[:2]).astype(np.float32)
        n = np.asarray(Image.fromarray(np.clip(n * 40 + 128, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(.7)), np.float32) / 255 - .5
        m = 4 * _luma(a) * (1 - _luma(a))
        a = a + (n * .09 * grain * (.35 + m))[..., None]
    return Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8))


def letterbox(img):
    img = img.copy(); d = ImageDraw.Draw(img)
    d.rectangle((0, 0, W, TOP - 1), fill=0); d.rectangle((0, TOP + ACT, W, H), fill=0)
    return img


def font(name, size):
    return ImageFont.truetype(os.path.join(FONTS, name), size)


def text(img, s, xy, size=26, name="Jost-300.ttf", fill=(242, 240, 236), track=.04, anchor="ls", alpha=1.0):
    """Small type with a little tracking; xy in pixels of the full 1920×1080 frame."""
    img = img.convert("RGBA"); layer = Image.new("RGBA", img.size, (0, 0, 0, 0)); d = ImageDraw.Draw(layer); f = font(name, size)
    widths = [d.textlength(ch, font=f) + size * track for ch in s]; total = sum(widths) - size * track
    x, y = xy
    if anchor[0] == "m": x -= total / 2
    elif anchor[0] == "r": x -= total
    for ch, w in zip(s, widths):
        d.text((x, y), ch, font=f, fill=fill + (round(255 * alpha),), anchor="l" + anchor[1]); x += w
    # A soft dark halo under light type keeps it legible over a busy picture.
    if sum(fill) > 450:
        halo = Image.new("RGBA", img.size, (0, 0, 0, 0)); halo.putalpha(layer.getchannel("A").filter(ImageFilter.GaussianBlur(size * .5)).point(lambda v: int(v * .55)))
        img = Image.alpha_composite(img, halo)
    return Image.alpha_composite(img, layer).convert("RGB")
