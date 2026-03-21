import json, re

with open('src/data/tafsirData.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

sections = ['context', 'bayani', 'taweeli', 'ruhani', 'nafsi', 'tarbawi', 'muasir']

total_fixed = 0

for ayah in data['ayahs']:
    fuyud = ayah.get('fuyud', {})
    for sec in sections:
        text = fuyud.get(sec, '')
        if not text:
            continue
        
        original = text
        
        # Remove duplicate consecutive citations with optional whitespace between them
        changed = True
        iterations = 0
        while changed and iterations < 10:
            changed = False
            # Use backreference to match exact duplicate
            pattern = r'(\([^()]{2,80}\))\s*(\1)'
            new_text = re.sub(pattern, r'\1', text)
            if new_text != text:
                changed = True
                text = new_text
            iterations += 1
        
        if text != original:
            fuyud[sec] = text
            total_fixed += 1

print(f"Fixed {total_fixed} sections with duplicate citations")

with open('src/data/tafsirData.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("File saved successfully")

# Verify
with open('src/data/tafsirData.json', 'r', encoding='utf-8') as f:
    data2 = json.load(f)

remaining = 0
for ayah in data2['ayahs']:
    fuyud = ayah.get('fuyud', {})
    for sec in sections:
        text = fuyud.get(sec, '')
        sources_found = re.findall(r'\([^()]+\)', text)
        for i in range(len(sources_found) - 1):
            if sources_found[i] == sources_found[i+1]:
                remaining += 1

print(f"Remaining duplicate consecutive sources: {remaining}")
