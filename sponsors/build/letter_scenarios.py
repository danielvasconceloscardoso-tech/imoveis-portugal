"""Prompt 54 §3.4: three 12-month revenue scenarios for the letter (Dec 2026 to Nov 2027), letter products only.
Every input is an assumption written below; prices are the proposal in sponsors/LETTER_MONETIZATION_v2.md (CEO decides).
Usage: python3 sponsors/build/letter_scenarios.py  (prints a Markdown table)"""
LETTERS = 104 / 12  # Tuesday and Friday

def block(s):          # partner block, price per letter, by subscribers s
    return 250 if s < 5000 else 50 * s / 1000 if s < 10000 else 60 * s / 1000
def block_month(s): return 6 * block(s)              # a month of blocks (about 8.7 letters) at about 30% off
def presented(s):   return max(4000, 2.5 * block_month(s))   # "Apresentado por", one a month
def series(s):      return max(2500, 10 * block(s))  # six themed letters
def weekend(s):     return 300 if s < 5000 else 1.2 * block(s)
def deep(s):        return max(1500, 6 * block(s))  # "A história, apresentada por", at most one a month

SCEN = {
  # subscribers at the end of each month; share of block-months sold; AP months; series; weekend items a month; deep dives; events (net)
  "Conservative": dict(subs=[800, 1500, 2000, 2400, 2700, 3000, 3400, 3800, 4200, 4700, 5300, 6000], block=[.25]*6 + [.4]*6, ap=[0,0,1,0,0,1,0,0,1,0,0,1], series=2, weekend=[0,0,1,1,1,1,2,2,2,2,2,2], deep=[0]*9+[1,0,1], events=[0]*12, founding=1.0),
  "Base":         dict(subs=[1000, 2500, 3500, 5000, 5800, 6500, 7200, 8000, 8600, 9200, 9600, 10000], block=[.4]*3 + [.6]*3 + [.75]*6, ap=[1,1,1,0,1,1,1,0,1,1,1,1], series=4, weekend=[1,2,2,3,3,3,4,4,4,4,4,4], deep=[0,0,0,1,0,1,0,1,0,1,0,1], events=[0,0,0,0,0,5000,0,0,0,6000,0,0], founding=0.7),
  "Ambitious":    dict(subs=[2000, 5000, 7000, 9000, 10000, 12000, 14000, 16000, 18000, 20000, 22500, 25000], block=[.6]*3 + [.9]*9, ap=[1,1,1,0,1,1,1,0,1,1,1,0], series=6, weekend=[2,3,4,4,4,4,5,5,5,5,5,5], deep=[0,0,1,1,1,1,1,1,1,1,1,1], events=[0,0,0,0,6000,0,7000,0,0,9000,0,6000], founding=0.4),
}
FOUNDING = 0.40  # Founding Partner discount, year 1, on the share of revenue booked by the first ten sponsors

def run(name, p):
    out = []
    for m in range(12):
        s = p["subs"][m]
        r = p["block"][m] * block_month(s) + p["ap"][m] * presented(s) + p["weekend"][m] * weekend(s) + p["deep"][m] * deep(s)
        out.append(r)
    ser = p["series"] * series(p["subs"][5])  # series priced at the mid-year audience
    gross = sum(out) + ser
    net = gross * (1 - FOUNDING * p["founding"]) + sum(p["events"])
    return gross, net, p["subs"][-1], sum(out[:6]) + ser / 2, sum(out[6:]) + ser / 2

if __name__ == "__main__":
    print("| Scenario | Subscribers in Nov 2027 | Letter revenue, list prices | After the Founding discount, plus event margin | Months 1–6 (list) | Months 7–12 (list) | Per subscriber (Nov 2027) |")
    print("| --- | --- | --- | --- | --- | --- | --- |")
    for n, p in SCEN.items():
        g, net, s, h1, h2 = run(n, p)
        print(f"| {n} | {s:,} | {g:,.0f} € | **{net:,.0f} €** | {h1:,.0f} € | {h2:,.0f} € | {net / s:.1f} € |")
    for s in (1000, 5000, 8000, 10000, 25000):
        print(f"subs {s}: block/letter {block(s):.0f}, month {block_month(s):.0f}, AP {presented(s):.0f}, series {series(s):.0f}, weekend {weekend(s):.0f}, deep {deep(s):.0f}")
