#!/usr/bin/env python3
"""
translate_fuyud3.py
===================
يترجم حقول الفيوض (en فارغة) في tafsirData3.json باستخدام OpenAI API
يشمل: آيات 201-286 من سورة البقرة — 630 قسم تقريباً
"""

import json, os, time, shutil
from pathlib import Path
from openai import OpenAI

# ─── إعداد ─────────────────────────────────────────────────────────────────
DATA_FILE  = Path("src/data/tafsirData3.json")
BACKUP     = Path("src/data/tafsirData3_fuyud_backup.json")
SAVE_EVERY = 20          # احفظ كل N قسم مترجم
SLEEP_SEC  = 0.5         # تأخير بين الطلبات
MAX_RETRY  = 3
MODEL      = "gpt-5-mini"

# ─── OpenAI Client ─────────────────────────────────────────────────────────
client = OpenAI(
    api_key  = os.environ.get("OPENAI_API_KEY"),
    base_url = os.environ.get("OPENAI_BASE_URL", "https://api.openai.com/v1"),
)

# ─── أسماء الأقسام ─────────────────────────────────────────────────────────
SECTION_NAMES = {
    "context":  "Contextual Introduction",
    "bayani":   "Rhetorical & Linguistic Analysis (Bayāni)",
    "taweeli":  "Interpretive & Contemplative Dimension (Ta'weeli)",
    "ruhani":   "Spiritual Dimension (Rūḥāni)",
    "nafsi":    "Psychological Dimension (Nafsi)",
    "tarbawi":  "Educational & Formative Dimension (Tarbawi)",
    "muasir":   "Contemporary Relevance (Mu'āṣir)",
    "maqasidi": "Objectives & Historical Dimension (Maqāṣidi)",
    "ijazi":    "Miraculous Dimension (I'jāzi)",
    "imani":    "Faith Dimension (Imāni)",
}

SYSTEM_PROMPT = """You are an expert Islamic scholar and Arabic-English translator 
specializing in Quranic tafsir (exegesis).

STRICT RULES:
1. Keep ALL Quranic verses in Arabic with ﴿ ﴾ brackets — NEVER translate Quranic text
2. Keep scholar names in transliteration: Ibn Kathir, Al-Tabari, Al-Razi, 
   Al-Qurtubi, Sayyid Qutb, Ibn Ashur, Al-Saadi, Abu Hayyan
3. Keep Islamic terms with brief English explanation in parentheses:
   taqwa (God-consciousness), tawbah (repentance), fuyud (spiritual outpourings)
4. Maintain scholarly, contemplative, literary tone — this is serious religious literature
5. Preserve ALL paragraph breaks exactly as in Arabic
6. Do NOT add your own commentary or explanations
7. Translate COMPLETELY — never summarize or shorten
8. Use "God" or "Allāh" consistently
9. Return ONLY a JSON object: {"translated": "...full English translation..."}"""

# ─── دالة الترجمة ──────────────────────────────────────────────────────────
def translate_section(arabic_text: str, sec_type: str, ayah_id: int) -> str | None:
    section_name = SECTION_NAMES.get(sec_type, sec_type)
    user_msg = f"""Translate this Quranic tafsir section to English.

Section type: {section_name}
Ayah reference: Al-Baqarah (Surah 2), Ayah {ayah_id}

Arabic text:
{arabic_text}

Return JSON: {{"translated": "...full English translation..."}}"""

    for attempt in range(1, MAX_RETRY + 1):
        try:
            resp = client.chat.completions.create(
                model=MODEL,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user",   "content": user_msg},
                ],
                temperature=0.3,
                max_tokens=2000,
            )
            raw = resp.choices[0].message.content.strip()

            # محاولة استخراج JSON
            try:
                # إزالة markdown code blocks إن وُجدت
                if raw.startswith("```"):
                    raw = raw.split("```")[1]
                    if raw.startswith("json"):
                        raw = raw[4:]
                obj = json.loads(raw)
                return obj.get("translated", raw)
            except json.JSONDecodeError:
                # إذا لم يكن JSON نظيفاً، أعد النص مباشرة
                return raw

        except Exception as e:
            print(f"    ⚠️  محاولة {attempt}/{MAX_RETRY} فشلت: {e}")
            if attempt < MAX_RETRY:
                time.sleep(2 ** attempt)  # exponential backoff
    return None

# ─── تحميل البيانات ─────────────────────────────────────────────────────────
print(f"📂 تحميل {DATA_FILE} ...")
shutil.copy(DATA_FILE, BACKUP)
print(f"💾 نسخة احتياطية: {BACKUP}")

with open(DATA_FILE, encoding="utf-8") as f:
    data = json.load(f)

# ─── جمع القائمة الكاملة للعمل ─────────────────────────────────────────────
work_queue = []
for ayah in data["ayahs"]:
    aid = ayah["id"]
    for sec, val in ayah.get("fuyud", {}).items():
        if isinstance(val, dict):
            ar = val.get("ar", "")
            en = val.get("en", "")
            if len(ar) > 20 and not en.strip():
                work_queue.append((aid, sec))

total = len(work_queue)
print(f"🔢 إجمالي الأقسام المطلوب ترجمتها: {total}")
print("=" * 60)

# ─── بناء index سريع للوصول ─────────────────────────────────────────────────
ayah_index = {}
for ayah in data["ayahs"]:
    # قد يكون هناك id مكرر — نأخذ كل المواضع
    ayah_index.setdefault(ayah["id"], []).append(ayah)

# ─── حلقة الترجمة ──────────────────────────────────────────────────────────
translated = 0
failed     = 0

for i, (aid, sec) in enumerate(work_queue, 1):
    ar_text = ""
    # ابحث عن النص العربي
    for ayah in ayah_index.get(aid, []):
        fuyud_sec = ayah.get("fuyud", {}).get(sec, {})
        if isinstance(fuyud_sec, dict):
            ar_text = fuyud_sec.get("ar", "")
            if ar_text:
                break

    if not ar_text:
        print(f"[{i:4}/{total}] ⚠️  آية {aid} | {sec} — النص العربي فارغ، تخطي")
        continue

    pct = (i / total) * 100
    print(f"[{i:4}/{total}] {pct:5.1f}% | آية {aid:3} | {sec:<10}", end=" ", flush=True)

    result = translate_section(ar_text, sec, aid)

    if result:
        # حدّث جميع نسخ هذه الآية (في حال التكرار)
        for ayah in ayah_index.get(aid, []):
            fuyud_sec = ayah.get("fuyud", {}).get(sec)
            if isinstance(fuyud_sec, dict) and fuyud_sec.get("ar", "") == ar_text:
                fuyud_sec["en"] = result
        translated += 1
        print(f"✅ ({len(result)} chars)")
    else:
        failed += 1
        print(f"❌ فشل بعد {MAX_RETRY} محاولات")

    # حفظ تدريجي
    if translated % SAVE_EVERY == 0 and translated > 0:
        with open(DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"  💾 حفظ تدريجي — {translated} قسم حتى الآن")

    time.sleep(SLEEP_SEC)

# ─── حفظ نهائي ──────────────────────────────────────────────────────────────
with open(DATA_FILE, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print()
print("=" * 60)
print(f"✅ مكتمل! مُترجم: {translated}/{total}")
print(f"❌ فاشل:  {failed}/{total}")
print(f"💾 محفوظ في: {DATA_FILE}")
