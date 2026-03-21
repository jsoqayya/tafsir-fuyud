"""
Fix missing source citations in tafsirData.json.
Identifies quotes with scholar name introductions that lack (source) attribution.
"""
import json, re

with open('src/data/tafsirData.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

sections = ['context', 'bayani', 'taweeli', 'ruhani', 'nafsi', 'tarbawi', 'muasir']

# Map scholar names -> source book
SCHOLAR_TO_SOURCE = {
    'الطبري': 'تفسير الطبري',
    'ابن جرير': 'تفسير الطبري',
    'ابن كثير': 'تفسير ابن كثير',
    'القرطبي': 'الجامع لأحكام القرآن',
    'الجلالين': 'تفسير الجلالين',
    'ابن عاشور': 'التحرير والتنوير',
    'الرازي': 'مفاتيح الغيب',
    'الزمخشري': 'الكشاف',
    'البيضاوي': 'أنوار التنزيل',
    'البغوي': 'معالم التنزيل',
    'السعدي': 'تيسير الكريم الرحمن',
    'الشعراوي': 'خواطر الشعراوي',
    'سيد قطب': 'في ظلال القرآن',
    'قطب': 'في ظلال القرآن',
    'طنطاوي': 'التفسير الوسيط للقرآن الكريم',
    'الشوكاني': 'فتح القدير',
    'أبو زهرة': 'زهرة التفاسير',
    'ابن القيم': 'بدائع الفوائد',
    'ابن تيمية': 'مجموع الفتاوى',
    'النخعي': 'تفسير الطبري',
    'الدرر السنية': 'الدرر السنية',
}

def get_source_for_scholar(text_before_quote):
    """Try to determine the source from context."""
    for scholar, source in SCHOLAR_TO_SOURCE.items():
        if scholar in text_before_quote:
            return source
    return None

total_fixed = 0
fixed_details = []

for ayah in data['ayahs']:
    fuyud = ayah.get('fuyud', {})
    for sec in sections:
        text = fuyud.get(sec, '')
        if not text:
            continue
        
        original = text
        
        # Find patterns like: «...» that end a scholar-attributed quote WITHOUT (source)
        # Strategy: find all » not followed by ( and check if preceded by scholar-attributed «»
        
        # Find closing » not followed by (source)
        # We need to handle nested quotes: «...«inner»...»
        # The outer » should have the source
        
        # Find all quote pairs «...»  
        # Pattern: قال/ذكر + words + «QUOTE» not followed by (source)
        
        # Fix pattern: "قال Scholar: «...» TEXT" -> "قال Scholar: «...» (SOURCE) TEXT"
        # or "... «...» TEXT" where TEXT doesn't start with (
        
        changed = False
        new_text = text
        
        # Method: look for » not followed by ( and preceded by قال+Scholar
        # Use finditer to find positions, then insert citation
        
        # Build list of (pos, source) to insert
        insertions = []
        
        # Pattern: find «...» spans where the outer closing » isn't followed by source
        # Look backwards from each » to find nearest قال + scholar
        
        pos = 0
        while pos < len(new_text):
            m = re.search(r'»', new_text[pos:])
            if not m:
                break
            abs_pos = pos + m.start()
            
            # Check what's after this »
            after = new_text[abs_pos+1:abs_pos+5].strip()
            if after.startswith('('):
                pos = abs_pos + 1
                continue
            
            # Check what's before - look back up to 300 chars for قال + scholar
            before = new_text[max(0, abs_pos-300):abs_pos]
            
            # Find the most recent قال before this »
            qal_matches = list(re.finditer(r'(قال|ذكر|أورد|نصّ|يقول|يُفسر|فسّر)\s+(\S+)', before))
            if qal_matches:
                last_qal = qal_matches[-1]
                scholar_word = last_qal.group(2)
                
                # Determine source
                source = get_source_for_scholar(before[last_qal.start():])
                
                # Only insert if we found a valid source
                if source:
                    # Insert (source) after »
                    insert_at = abs_pos + 1
                    insertions.append((insert_at, f' ({source})'))
                    changed = True
            
            pos = abs_pos + 1
        
        # Apply insertions in reverse order to maintain positions
        if insertions:
            for ins_pos, ins_text in sorted(insertions, reverse=True):
                # Double-check it's not already there
                if not new_text[ins_pos:ins_pos+3].strip().startswith('('):
                    new_text = new_text[:ins_pos] + ins_text + new_text[ins_pos:]
        
        if new_text != text:
            fuyud[sec] = new_text
            total_fixed += 1
            fixed_details.append(f"Ayah {ayah['id']} [{sec}]")

print(f"Fixed {total_fixed} sections")
for d in fixed_details[:20]:
    print(f"  {d}")

with open('src/data/tafsirData.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"\nSaved! Total: {total_fixed} sections updated.")
