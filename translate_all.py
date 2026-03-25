#!/usr/bin/env python3
"""
translate_all.py — ترجمة جميع فيوض tafsirData.json + tafsirData2.json
"""
import json, os, time, sys, shutil
from deep_translator import GoogleTranslator

FILES = [
    "src/data/tafsirData.json",
    "src/data/tafsirData2.json",
]

DELAY = 0.4   # بين كل طلب

def translate_chunk(text, translator, max_chars=4500):
    """ترجمة نص طويل بتقسيمه إلى فقرات"""
    if len(text) <= max_chars:
        return translator.translate(text)
    
    # تقسيم على الفقرات
    paras = text.split('\n\n')
    result_parts = []
    current_chunk = ""
    
    for para in paras:
        if len(current_chunk) + len(para) + 2 <= max_chars:
            current_chunk += ('\n\n' if current_chunk else '') + para
        else:
            if current_chunk:
                result_parts.append(translator.translate(current_chunk))
                time.sleep(0.3)
            current_chunk = para
    
    if current_chunk:
        result_parts.append(translator.translate(current_chunk))
    
    return '\n\n'.join(result_parts)


def process_file(filepath):
    print(f"\n{'='*55}")
    print(f"📂 Processing: {filepath}")
    
    if not os.path.exists(filepath):
        print(f"  ⚠️  File not found — skipping")
        return

    # backup
    bak = filepath.replace('.json', '_backup.json')
    if not os.path.exists(bak):
        shutil.copy(filepath, bak)
        print(f"  💾 Backup → {bak}")

    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)

    ayahs = data['ayahs']
    translator = GoogleTranslator(source='ar', target='en')

    # جمع الأقسام المطلوبة
    todo = []
    for ayah in ayahs:
        fuyud = ayah.get('fuyud', {})
        for sec, val in fuyud.items():
            if isinstance(val, dict):
                ar = val.get('ar', '')
                en = val.get('en', '')
                if ar and (not en or len(en.strip()) < 30):
                    todo.append((ayah['id'], sec))

    total = len(todo)
    print(f"  📊 Sections to translate: {total}")
    if total == 0:
        print("  ✅ Already complete!")
        return

    # lookup سريع
    ayah_map = {a['id']: a for a in ayahs}
    done = 0

    for i, (ayah_id, sec) in enumerate(todo):
        ar_text = ayah_map[ayah_id]['fuyud'][sec]['ar']
        pct = (i + 1) / total * 100
        print(f"  [{i+1:3d}/{total}] {pct:5.1f}% | Ayah {ayah_id:3d} | {sec:<10}", end=' ', flush=True)

        for attempt in range(3):
            try:
                en_text = translate_chunk(ar_text, translator)
                if en_text and len(en_text) > 20:
                    ayah_map[ayah_id]['fuyud'][sec]['en'] = en_text
                    done += 1
                    print(f"✅ ({len(en_text)}ch)")
                    break
                else:
                    print(f"⚠️  short ({len(en_text or '')}ch), retry...")
                    time.sleep(1)
            except Exception as e:
                if attempt < 2:
                    print(f"⚠️  retry ({e})...", end=' ')
                    time.sleep(2)
                else:
                    print(f"❌ {e}")

        # حفظ تدريجي كل 25
        if (i + 1) % 25 == 0:
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print(f"  💾 Saved progress ({i+1}/{total})")

        time.sleep(DELAY)

    # حفظ نهائي
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"\n  ✅ Done: {done}/{total} translated")
    print(f"  💾 Saved → {filepath}")


if __name__ == '__main__':
    for fp in FILES:
        process_file(fp)
    print("\n🎉 All files processed!")
