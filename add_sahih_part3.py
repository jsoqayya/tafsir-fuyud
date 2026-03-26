#!/usr/bin/env python3
"""
add_sahih_part3.py
==================
يجلب ترجمات Sahih International لسورة البقرة من alquran.cloud API
ويُضيفها إلى حقل ayah_translations.en في tafsirData3.json (آيات 201-286)
"""

import json
import shutil
import urllib.request
from pathlib import Path

DATA_FILE = Path("src/data/tafsirData3.json")
BACKUP    = Path("src/data/tafsirData3_backup.json")
API_URL   = "https://api.alquran.cloud/v1/surah/2/en.sahih"

# ─── 1. جلب الترجمات من API ───────────────────────────────────────────────
print("⬇️  جلب ترجمات Sahih International من alquran.cloud ...")
req = urllib.request.Request(API_URL, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req, timeout=20) as r:
    api_data = json.loads(r.read())

# بناء dict: {numberInSurah → translation_text}
sahih = {}
for a in api_data["data"]["ayahs"]:
    sahih[a["numberInSurah"]] = a["text"]

print(f"✅ تم جلب {len(sahih)} آية من API")

# ─── 2. إنشاء نسخة احتياطية ──────────────────────────────────────────────
shutil.copy(DATA_FILE, BACKUP)
print(f"💾 نسخة احتياطية: {BACKUP}")

# ─── 3. قراءة tafsirData3.json ────────────────────────────────────────────
with open(DATA_FILE, encoding="utf-8") as f:
    data = json.load(f)

# ─── 4. تحديث كل آية ─────────────────────────────────────────────────────
updated   = 0
not_found = []

for ayah in data["ayahs"]:
    aid = ayah["id"]
    if aid in sahih and sahih[aid].strip():
        if "ayah_translations" not in ayah:
            ayah["ayah_translations"] = {}
        ayah["ayah_translations"]["en"] = sahih[aid].strip()
        updated += 1
        print(f"  [{aid:3}] ✅ {sahih[aid][:70]}...")
    else:
        not_found.append(aid)

# ─── 5. حفظ الملف ────────────────────────────────────────────────────────
with open(DATA_FILE, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print()
print(f"✅ تم تحديث {updated} آية")
if not_found:
    print(f"⚠️  آيات لم تُوجد في API: {not_found}")
print(f"💾 تم الحفظ في: {DATA_FILE}")
