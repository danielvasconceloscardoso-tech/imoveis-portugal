# Rebuild sponsors/pipeline.csv and sponsors/access_partners.csv from the CEO list.
# Usage: python3 sponsors/import_xlsx.py sponsors/Imoveis_Portugal_100_Sponsors.xlsx sponsors/pipeline.csv sponsors/access_partners.csv
# Warning: overwrites the CSVs, so only run it before the pipeline has been edited by hand.
import csv, sys, openpyxl
src, out, out2 = sys.argv[1:4]
wb = openpyxl.load_workbook(src, data_only=True)
ORDER = ["LU", "FR", "CH", "BR"]
def editions(v):
    parts = {p.strip() for p in str(v).split(",")}
    s = set(ORDER) if "Todas" in parts else parts
    bad = s - set(ORDER)
    assert not bad, bad
    return ";".join(e for e in ORDER if e in s)
cols = ["id","company","sector","edition","priority","package","status","next_step","date",
        "website","why_they_pay","contact_role","channel","verification","owner","notes"]
rows = list(wb["Lista 100"].iter_rows(values_only=True))
hdr = rows[0]
with open(out, "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f); w.writerow(cols); n = 0
    for r in rows[1:]:
        if not isinstance(r[0], int): continue
        d = dict(zip(hdr, r))
        w.writerow([d["#"], d["Empresa"], d["Setor"], editions(d["Edições"]), d["Prioridade"],
                    d["Pacote sugerido"], d["Estado"], f"Day 0 first contact ({d['Melhor canal']})", "",
                    d["Site"], d["Porque nos paga"], d["Quem procurar"], d["Melhor canal"],
                    d["Verificação"], d["Quem contacta"] or "", d["Notas"] or ""]); n += 1
rows = list(wb["Parceiros de acesso"].iter_rows(values_only=True))
with open(out2, "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f); w.writerow(["organisation","edition","purpose","website","verification","status"])
    for r in rows[1:]:
        if r[0] and r[1]: w.writerow(list(r[:5]) + ["Por contactar"])
print(n)
