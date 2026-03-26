#!/usr/bin/env python3
"""
clean_fuyud3.py
===============
ينظّف نصوص الفيوض العربية في tafsirData3.json من:
  - روابط مواقع الإنترنت بين قوسين مثل (dorar.net) و(quran.ksu.edu.sa)
  - إشارات مصادر رقمية دخيلة مثل (المصحف الإلكتروني) و(سورة قرآن)
  - تسميات موقعية مثل (PMC) و(PID) و(كتاب أونلاين)
  - أنماط مكررة مثل (تفسير) المنفردة و(التفسير القرآني) كمرجع موقع

يحافظ على:
  - أسماء كتب التفسير الحقيقية: (تفسير الطبري)، (التحرير والتنوير)، إلخ
  - أسماء العلماء ونسب الأقوال
  - كتب الحديث: (صحيح البخاري)، (صحيح مسلم)، إلخ
  - (الدرر السنية) و(موسوعة الدرر السنية) عندما تكون مصدراً حقيقياً
  - (مفاتيح الغيب) = كتاب الرازي ✅ يُحفظ
"""

import json, re, shutil
from pathlib import Path

DATA_FILE = Path("src/data/tafsirData3.json")
BACKUP    = Path("src/data/tafsirData3_before_clean.json")

# ══════════════════════════════════════════════════════════════════
# القائمة الكاملة للأنماط المراد حذفها (بين قوسين)
# ══════════════════════════════════════════════════════════════════

# أ) روابط إنترنت واضحة — تُحذف دائماً
URL_PATTERNS = [
    r'\(quran-tafsir\.net\)',
    r'\(quran\.ksu\.edu\.sa\)',
    r'\(dorar\.net\)',
    r'\(tafsir\.app\)',
    r'\(surahquran\.com\)',
    r'\(GreatTafsirs\.com\)',
    r'\(islamweb\.net\)',
    r'\(Quran\.com\)',
    r'\(Quran KSU\)',
    r'\(PMC\)',
    r'\(PID\)',
    r'\(كتاب أونلاين\)',
    r'\(إسلام ويب\)',
    r'\(قرآن تفسير\)',
    r'\(سورة قرآن\)',
]

# ب) مصادر رقمية دخيلة (ليست كتباً) — تُحذف دائماً
DIGITAL_SOURCE_PATTERNS = [
    r'\(المصحف الإلكتروني بجامعة الملك سعود\)',
    r'\(المصحف الإلكتروني\)',
    r'\(موسوعة التفسير\)',
    r'\(التفسير القرآني\)',          # مجرد تسمية موقع
    r'\(تفسير القرآن\)',             # مجرد تسمية موقع
    r'\(الموسوعة القرآنية\)',
    r'\(الموسوعة الحديثية\)',        # تسمية موقع منفردة
    r'\(الموسوعة الحديثية - الدرر السنية\)',  # تسمية مركبة منفردة
]

# ج) أنماط (تفسير) منفردة فقط — لا تسبقها كلمة اسم
# تُحذف فقط إذا كانت (تفسير) وحدها بين قوسين
STANDALONE_TAFSIR = [
    r'\(\s*تفسير\s*\)',
    r'\(\s*تفسير القرآن الكريم\s*\)',   # العام — ليس اسم كتاب محدد
]

# د) (الدرر السنية) و(موسوعة الدرر السنية) — تُحذف فقط كإشارة مرجعية منفردة
# أي عندما تأتي وحدها بين قوسين في نهاية جملة أو مقطع
DORAR_PATTERNS = [
    r'\(\s*الدرر السنية\s*\)',
    r'\(\s*موسوعة الدرر السنية\s*\)',   # النسخة المنفردة فقط
]

# ه) (في ظلل) وحدها — خطأ إملائي/اقتباس مبتور
MISC_BROKEN = [
    r'\(في ظلل\)',
]

ALL_PATTERNS = (
    URL_PATTERNS +
    DIGITAL_SOURCE_PATTERNS +
    STANDALONE_TAFSIR +
    DORAR_PATTERNS +
    MISC_BROKEN
)

# دمج كل الأنماط في تعبير واحد
COMBINED_RE = re.compile('|'.join(ALL_PATTERNS))

# ══════════════════════════════════════════════════════════════════
# دالة التنظيف لنص واحد
# ══════════════════════════════════════════════════════════════════

def clean_text(text: str) -> str:
    if not text:
        return text

    # 1) حذف الأنماط المجمّعة
    cleaned = COMBINED_RE.sub('', text)

    # 2) تنظيف مسافات متعددة بعد الحذف
    cleaned = re.sub(r'  +', ' ', cleaned)

    # 3) تنظيف مسافة قبل علامات الترقيم
    cleaned = re.sub(r' +([.،؛:؟!])', r'\1', cleaned)

    # 4) تنظيف أسطر فارغة متعددة
    cleaned = re.sub(r'\n{3,}', '\n\n', cleaned)

    # 5) تنظيف مسافة في بداية/نهاية كل سطر
    lines = [l.rstrip() for l in cleaned.split('\n')]
    cleaned = '\n'.join(lines)

    # 6) إزالة المسافات في نهاية النص
    cleaned = cleaned.strip()

    return cleaned

# ══════════════════════════════════════════════════════════════════
# تطبيق على الملف
# ══════════════════════════════════════════════════════════════════

print(f"📂 تحميل {DATA_FILE}")
shutil.copy(DATA_FILE, BACKUP)
print(f"💾 نسخة احتياطية: {BACKUP}")

with open(DATA_FILE, encoding='utf-8') as f:
    data = json.load(f)

total_cleaned = 0
total_sections = 0
changes_log = []

for ayah in data['ayahs']:
    aid = ayah['id']
    for sec, val in ayah.get('fuyud', {}).items():
        if isinstance(val, dict):
            ar_original = val.get('ar', '')
            if not ar_original.strip():
                continue

            total_sections += 1
            ar_cleaned = clean_text(ar_original)

            if ar_cleaned != ar_original:
                total_cleaned += 1
                # سجّل ما تغيّر للمراجعة
                orig_matches = COMBINED_RE.findall(ar_original)
                changes_log.append({
                    'ayah': aid,
                    'section': sec,
                    'removed': list(set(orig_matches)),
                    'chars_before': len(ar_original),
                    'chars_after': len(ar_cleaned),
                })
                val['ar'] = ar_cleaned

# حفظ الملف
with open(DATA_FILE, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# ══════════════════════════════════════════════════════════════════
# تقرير
# ══════════════════════════════════════════════════════════════════
print()
print("=" * 65)
print(f"✅ الأقسام التي نُظِّفت : {total_cleaned} / {total_sections}")
print(f"💾 تم الحفظ في         : {DATA_FILE}")
print("=" * 65)
print()
print("📋 تفاصيل التغييرات (عينة من أول 30):")
for item in changes_log[:30]:
    print(f"  آية {item['ayah']:3} / {item['section']:<10} | حُذف: {item['removed']} | "
          f"({item['chars_before']} → {item['chars_after']} حرف)")

if len(changes_log) > 30:
    print(f"  ... و{len(changes_log)-30} قسم آخر")

# عدّ بالنوع
from collections import Counter
all_removed = []
for item in changes_log:
    all_removed.extend(item['removed'])
counter = Counter(all_removed)
print()
print("📊 إحصائية ما حُذف:")
for pattern, count in counter.most_common():
    print(f"  {count:4}x  {pattern}")
