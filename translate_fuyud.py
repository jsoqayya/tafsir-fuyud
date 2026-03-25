#!/usr/bin/env python3
"""
translate_fuyud.py
ترجمة الفيوض التفسيرية من العربية إلى الإنجليزية باستخدام GPT
مع الحفاظ على الدقة الشرعية واللغوية
"""

import json, os, sys, time, re

# ─── OpenAI client ──────────────────────────────────────────
from openai import OpenAI

client = OpenAI(
    api_key  = os.environ.get("OPENAI_API_KEY"),
    base_url = os.environ.get("OPENAI_BASE_URL", "https://api.openai.com/v1"),
)

# ─── إعدادات ────────────────────────────────────────────────
DATA_FILE    = "src/data/tafsirData.json"
OUTPUT_FILE  = "src/data/tafsirData.json"   # نحدّث نفس الملف
BACKUP_FILE  = "src/data/tafsirData_backup.json"
MODEL        = "gpt-5-mini"
BATCH_SIZE   = 5          # عدد الأقسام في كل طلب API
DELAY        = 0.5        # ثوانٍ بين الطلبات
TEST_MODE    = False       # True = فقط أول 3 آيات للاختبار

# ─── أسماء الأقسام بالإنجليزية (للسياق) ────────────────────
SECTION_NAMES = {
    "context":  "Contextual Introduction",
    "bayani":   "Rhetorical & Linguistic Analysis (Bayani)",
    "taweeli":  "Interpretive & Conceptual Dimension (Ta'weeli)",
    "ruhani":   "Spiritual Dimension (Ruhani)",
    "nafsi":    "Psychological Dimension (Nafsi)",
    "tarbawi":  "Educational & Formative Dimension (Tarbawi)",
    "muasir":   "Contemporary Relevance (Mu'asir)",
}

# ─── System prompt ──────────────────────────────────────────
SYSTEM_PROMPT = """You are an expert Islamic scholar and Arabic-English translator specializing in Quranic tafsir (exegesis). You translate contemporary Arabic Quranic commentary into scholarly English.

STRICT RULES:
1. Preserve ALL Quranic verses exactly as Arabic text with ﴿ ﴾ brackets — never translate the Quranic text itself
2. Keep Islamic technical terms in transliteration with explanation: e.g., "taqwa (God-consciousness)", "tawbah (repentance)"
3. Maintain the scholarly, contemplative tone — this is serious religious literature
4. Keep scholar names in Arabic transliteration: Ibn Ashur, Al-Razi, Ibn Kathir, Al-Tabari, etc.
5. Preserve paragraph structure and line breaks exactly
6. Do NOT add your own commentary or explanations
7. Translate faithfully and completely — do not summarize or shorten
8. Use gender-neutral language where appropriate
9. "فيض" translates as "outpouring" or "dimension"

OUTPUT FORMAT: Return ONLY a JSON object like:
{"translated": "...the full English translation..."}
"""

def translate_section(arabic_text: str, section_type: str, ayah_id: int) -> str:
    """ترجمة قسم واحد"""
    section_name = SECTION_NAMES.get(section_type, section_type)
    
    user_msg = f"""Translate this Quranic tafsir section to English.

Section type: {section_name}
Ayah reference: Al-Baqarah (Surah 2), Ayah {ayah_id}

Arabic text to translate:
{arabic_text}

Remember: Keep Quranic verses in Arabic. Return JSON: {{"translated": "..."}}"""

    for attempt in range(3):
        try:
            resp = client.chat.completions.create(
                model=MODEL,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user",   "content": user_msg},
                ],
                temperature=0.2,
                max_tokens=2000,
            )
            raw = resp.choices[0].message.content.strip()
            
            # استخراج JSON
            # أحياناً يضيف النموذج ```json ... ```
            raw = re.sub(r'^```json\s*', '', raw)
            raw = re.sub(r'\s*```$', '', raw)
            
            data = json.loads(raw)
            return data.get("translated", "").strip()
            
        except json.JSONDecodeError:
            # إذا أعاد النص مباشرة بدون JSON
            if attempt == 2:
                # المحاولة الأخيرة — نعيد النص كما هو
                return raw.strip()
            time.sleep(1)
        except Exception as e:
            print(f"  ⚠️  Error on attempt {attempt+1}: {e}")
            if attempt == 2:
                raise
            time.sleep(2)
    
    return ""


def main():
    # ─── تحميل البيانات ────────────────────────────────────
    print(f"📂 Loading {DATA_FILE}...")
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    # نسخة احتياطية
    if not os.path.exists(BACKUP_FILE):
        with open(BACKUP_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"💾 Backup saved → {BACKUP_FILE}")
    
    ayahs = data["ayahs"]
    if TEST_MODE:
        ayahs = ayahs[:3]
        print(f"🧪 TEST MODE — translating first 3 ayahs only")
    
    # ─── حساب ما يحتاج ترجمة ──────────────────────────────
    sections_to_translate = []
    for ayah in ayahs:
        fuyud = ayah.get("fuyud", {})
        for sec_type, sec_data in fuyud.items():
            if isinstance(sec_data, dict):
                ar_text = sec_data.get("ar", "")
                en_text = sec_data.get("en", "")
                if ar_text and (not en_text or len(en_text) < 20):
                    sections_to_translate.append({
                        "ayah_id":  ayah["id"],
                        "sec_type": sec_type,
                        "ar_text":  ar_text,
                    })
    
    total = len(sections_to_translate)
    print(f"📊 Sections to translate: {total}")
    print(f"⏱️  Estimated time: ~{total * DELAY / 60:.1f} min (excluding API time)\n")
    
    if total == 0:
        print("✅ All sections already have English translations!")
        return
    
    # ─── ترجمة ─────────────────────────────────────────────
    done = 0
    errors = 0
    
    # إنشاء lookup سريع
    ayah_map = {a["id"]: a for a in data["ayahs"]}
    
    for i, item in enumerate(sections_to_translate):
        ayah_id  = item["ayah_id"]
        sec_type = item["sec_type"]
        ar_text  = item["ar_text"]
        
        pct = (i + 1) / total * 100
        print(f"[{i+1:3d}/{total}] {pct:5.1f}% | Ayah {ayah_id:3d} | {sec_type:<10}", end=" ", flush=True)
        
        try:
            en_text = translate_section(ar_text, sec_type, ayah_id)
            
            if en_text:
                ayah_map[ayah_id]["fuyud"][sec_type]["en"] = en_text
                done += 1
                print(f"✅ ({len(en_text)} chars)")
            else:
                errors += 1
                print(f"⚠️  Empty result")
                
        except Exception as e:
            errors += 1
            print(f"❌ {e}")
        
        # حفظ تدريجي كل 20 قسم
        if (i + 1) % 20 == 0:
            with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print(f"  💾 Progress saved ({i+1}/{total})")
        
        time.sleep(DELAY)
    
    # ─── حفظ نهائي ─────────────────────────────────────────
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"\n{'='*50}")
    print(f"✅ Done! Translated: {done}/{total}")
    print(f"❌ Errors: {errors}")
    print(f"💾 Saved → {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
