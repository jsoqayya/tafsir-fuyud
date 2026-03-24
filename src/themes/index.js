/* ══════════════════════════════════════════════════════════
   THEMES — لوحة ألوان مخصصة لكل لغة
   كل ثيم يرث اللون الذهبي المشترك ويضيف لون تمييزي خاص
══════════════════════════════════════════════════════════ */

/* ── ألوان مشتركة في كل الثيمات ── */
const GOLD = {
  G1:'#6b4e00', G2:'#8a6500', G3:'#b08500',
  G4:'#c9a000', G5:'#d4ae20', G6:'#e8c840', G7:'#f5e080',
  BD1:'rgba(180,130,0,0.18)', BD2:'rgba(180,130,0,0.40)',
  BD3:'rgba(180,130,0,0.65)', BD4:'rgba(180,130,0,0.88)',
  GLOW:'rgba(180,130,0,0.10)', GLOW2:'rgba(180,130,0,0.26)',
  TXT:'#2a1800', TXT2:'rgba(42,24,0,0.80)', TXT3:'rgba(42,24,0,0.58)', TXT4:'rgba(42,24,0,0.38)',
  TW:'#fff8e8', TW2:'rgba(255,248,232,0.92)', TW3:'rgba(255,248,232,0.70)',
};

/* ── ألوان الصناديق (مشتركة) ── */
const BOXES = {
  TEAL:'#0a6b52',  TEAL2:'#0e8a6a', TEAL3:'#14aa82', TEAL4:'#1fcc9a',
  BLUE:'#0d3580',  BLUE2:'#1a52b0', BLUE3:'#2870d8', BLUE4:'#4090f8',
  PURP:'#3a1070',  PURP2:'#5828a8', PURP3:'#7848d8', PURP4:'#a070f8',
  COPP:'#7a3000',  COPP2:'#a84800', COPP3:'#d06a10', COPP4:'#f08830',
  OLIV:'#224a10',  OLIV2:'#306820', OLIV3:'#489030', OLIV4:'#68b848',
  ROSE:'#6a0a30',  ROSE2:'#981840', ROSE3:'#c83060', ROSE4:'#f05088',
};

/* ══════════════
   🇸🇦 العربية
   بيجية ذهبية دافئة — الثيم الأصيل
══════════════ */
export const themeAr = {
  ...GOLD, ...BOXES,
  BG:'#f5ead4', BG1:'#f0e2c4', BG2:'#ebe0c0', BG3:'#e8dabb', BG4:'#e4d5b0',
  CARD:'#f8f0dc',
  /* لون تمييزي: ذهبي كلاسيكي */
  ACCENT:'#c9a000', ACCENT2:'#e8c840',
  ACCENT_BG:'rgba(180,130,0,0.12)',
  /* خطوط */
  fontTitle:'Amiri, serif',
  fontBody:'Noto Naskh Arabic, serif',
  fontLatin:'Inter, sans-serif',
  /* Hero overlay */
  heroOverlay:'linear-gradient(180deg, transparent 0%, transparent 40%, rgba(0,0,0,.30) 75%, rgba(0,0,0,.65) 100%)',
};

/* ══════════════
   🇬🇧 الإنجليزية
   رمادي أردوازي أنيق + ذهبي
══════════════ */
export const themeEn = {
  ...GOLD, ...BOXES,
  BG:'#f4f0ea', BG1:'#ede8df', BG2:'#e6e0d5', BG3:'#dfd8cc', BG4:'#d8d0c2',
  CARD:'#f9f6f0',
  /* لون تمييزي: رمادي فضي أردوازي */
  ACCENT:'#4a5568', ACCENT2:'#718096',
  ACCENT_BG:'rgba(74,85,104,0.10)',
  /* خطوط */
  fontTitle:'"Playfair Display", Georgia, serif',
  fontBody:'"Inter", "Segoe UI", sans-serif',
  fontLatin:'"Inter", sans-serif',
  /* Hero overlay */
  heroOverlay:'linear-gradient(180deg, transparent 0%, transparent 35%, rgba(10,15,25,.35) 72%, rgba(10,15,25,.70) 100%)',
  /* تجاوز بعض الألوان الذهبية للخلفيات الفاتحة */
  TXT:'#1a1a2e', TXT2:'rgba(26,26,46,0.80)', TXT3:'rgba(26,26,46,0.58)', TXT4:'rgba(26,26,46,0.38)',
};

/* ══════════════
   🇵🇰 الأردية
   زمردي داكن + ذهبي — طابع جنوب آسيوي
══════════════ */
export const themeUr = {
  ...GOLD, ...BOXES,
  BG:'#f2ede4', BG1:'#ebe4d8', BG2:'#e4dccc', BG3:'#ddd4c0', BG4:'#d6ccb4',
  CARD:'#f8f3e8',
  /* لون تمييزي: أخضر زمردي إسلامي */
  ACCENT:'#1a5c3a', ACCENT2:'#2e8b57',
  ACCENT_BG:'rgba(26,92,58,0.10)',
  /* خطوط — Noto Nastaliq لو متوفر وإلا Noto Naskh */
  fontTitle:'"Noto Nastaliq Urdu", "Noto Naskh Arabic", serif',
  fontBody:'"Noto Nastaliq Urdu", "Noto Naskh Arabic", serif',
  fontLatin:'"Inter", sans-serif',
  heroOverlay:'linear-gradient(180deg, transparent 0%, transparent 38%, rgba(0,15,5,.32) 74%, rgba(0,15,5,.68) 100%)',
  /* تجاوز ألوان بعض الصناديق ليناسب الطابع الزمردي */
  TEAL:'#1a5c3a', TEAL2:'#1e7a4e', TEAL3:'#22986c', TEAL4:'#2ec17a',
};

/* ══════════════
   🇮🇩 الإندونيسية
   أزرق سماوي + ذهبي — حيوي وشبابي
══════════════ */
export const themeId = {
  ...GOLD, ...BOXES,
  BG:'#f0f4f8', BG1:'#e8eef5', BG2:'#dfe8f0', BG3:'#d6e0eb', BG4:'#cdd8e6',
  CARD:'#f6f9fc',
  /* لون تمييزي: أزرق سماوي */
  ACCENT:'#1a4a8a', ACCENT2:'#2563b8',
  ACCENT_BG:'rgba(26,74,138,0.10)',
  /* خطوط */
  fontTitle:'"Inter", "Segoe UI", sans-serif',
  fontBody:'"Inter", "Segoe UI", sans-serif',
  fontLatin:'"Inter", sans-serif',
  heroOverlay:'linear-gradient(180deg, transparent 0%, transparent 36%, rgba(5,10,30,.33) 73%, rgba(5,10,30,.68) 100%)',
  /* تعديل نصوص داكنة على خلفية مائلة للبياض */
  TXT:'#0f172a', TXT2:'rgba(15,23,42,0.80)', TXT3:'rgba(15,23,42,0.58)', TXT4:'rgba(15,23,42,0.38)',
  BD1:'rgba(26,74,138,0.12)', BD2:'rgba(26,74,138,0.30)', BD3:'rgba(26,74,138,0.55)',
};

/* ══════════════
   🇹🇷 التركية
   أحمر عثماني قرمزي + ذهبي
══════════════ */
export const themeTr = {
  ...GOLD, ...BOXES,
  BG:'#f5ede8', BG1:'#ede3dc', BG2:'#e6dad0', BG3:'#ddd1c5', BG4:'#d5c8ba',
  CARD:'#f9f4f0',
  /* لون تمييزي: أحمر عثماني */
  ACCENT:'#8b1a1a', ACCENT2:'#b52222',
  ACCENT_BG:'rgba(139,26,26,0.10)',
  /* خطوط */
  fontTitle:'"Playfair Display", Georgia, serif',
  fontBody:'"Inter", "Segoe UI", sans-serif',
  fontLatin:'"Inter", sans-serif',
  heroOverlay:'linear-gradient(180deg, transparent 0%, transparent 36%, rgba(25,5,5,.33) 73%, rgba(25,5,5,.68) 100%)',
  TXT:'#1a0505', TXT2:'rgba(26,5,5,0.80)', TXT3:'rgba(26,5,5,0.58)', TXT4:'rgba(26,5,5,0.38)',
  /* إعادة تلوين التيل بالأحمر لتناسب الهوية العثمانية */
  ROSE:'#8b1a1a', ROSE2:'#a82020', ROSE3:'#c82828', ROSE4:'#e83030',
};

/* ── Map سهل الاستخدام ── */
export const THEMES = {
  ar: themeAr,
  en: themeEn,
  ur: themeUr,
  id: themeId,
  tr: themeTr,
};

export default THEMES;
