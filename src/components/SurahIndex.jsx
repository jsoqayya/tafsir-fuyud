import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Globe, Home } from 'lucide-react';

/* ══════════════════════════════════════════════════════
   PALETTE — نفس لوحة الألوان الذهبية من HomePage
══════════════════════════════════════════════════════ */
const C = {
  BG:   '#f5ead4',
  BG1:  '#f0e2c4',
  BG2:  '#ebe0c0',
  BG3:  '#e8dabb',
  CARD: '#f8f0dc',

  G1: '#6b4e00', G2: '#8a6500', G3: '#b08500',
  G4: '#c9a000', G5: '#d4ae20', G6: '#e8c840', G7: '#f5e080',

  TEAL: '#0a6b52', TEAL2: '#0e8a6a', TEAL3: '#14aa82', TEAL4: '#1fcc9a',
  BLUE: '#0d3580', BLUE2: '#1a52b0', BLUE3: '#2870d8', BLUE4: '#4090f8',
  PURP: '#3a1070', PURP2: '#5828a8', PURP3: '#7848d8', PURP4: '#a070f8',
  COPP: '#7a3000', COPP2: '#a84800', COPP3: '#d06a10', COPP4: '#f08830',
  OLIV: '#224a10', OLIV2: '#306820', OLIV3: '#489030', OLIV4: '#68b848',
  ROSE: '#6a0a30', ROSE2: '#981840', ROSE3: '#c83060', ROSE4: '#f05088',

  TXT:  '#2a1800', TXT2: 'rgba(42,24,0,0.80)', TXT3: 'rgba(42,24,0,0.58)',
  TW:  '#fff8e8', TW2: 'rgba(255,248,232,0.92)', TW3: 'rgba(255,248,232,0.70)',
  BD1: 'rgba(180,130,0,0.18)', BD2: 'rgba(180,130,0,0.40)', BD3: 'rgba(180,130,0,0.65)',
  GLOW: 'rgba(180,130,0,0.10)', GLOW2: 'rgba(180,130,0,0.26)',
};

/* ══════════════════════════════════════════════════════
   ترجمات واجهة الصفحة لكل لغة
══════════════════════════════════════════════════════ */
const UI = {
  ar: {
    dir: 'rtl', isRtl: true,
    font: 'Noto Naskh Arabic,serif',
    heroTitle: 'فهرس سور القرآن الكريم',
    heroSub: '١١٤ سورة · ٦٢٣٦ آية · ثلاثون جزءاً',
    heroAyah: '﴿ إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ ﴾',
    searchPlaceholder: 'ابحث بالاسم أو الرقم...',
    filterAll: 'الكل', filterMakki: 'مكية', filterMadani: 'مدنية',
    allJuz: 'جميع الأجزاء', juzLabel: (j) => `الجزء ${j}`,
    resultCount: (n) => `${toArabicNum(n)} سورة`,
    noResults: 'لا نتائج مطابقة — جرّب بحثاً مختلفاً',
    availBadge: 'متاح',
    availNote: 'متاح حالياً', availVal: 'سورة البقرة كاملة (٢٨٦ آية)',
    soonNote: 'قريباً', soonVal: 'باقي سور القرآن الكريم',
    subtitleSite: 'فهرس السور القرآنية',
    homeBtn: 'الرئيسية',
    footerCopy: '© ١٤٤٦ هـ · فيوض التأويل المعاصر · جميع الحقوق محفوظة',
    ayahLabel: 'آية', juzShort: 'ج',
    typeMakki: 'مكية', typeMadani: 'مدنية',
    pageTitle: 'فهرس السور — فيوض التأويل المعاصر',
  },
  en: {
    dir: 'ltr', isRtl: false,
    font: 'Inter,"Segoe UI",sans-serif',
    heroTitle: 'Index of Quranic Surahs',
    heroSub: '114 Surahs · 6,236 Verses · 30 Parts (Juz)',
    heroAyah: '﴿ إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ ﴾',
    searchPlaceholder: 'Search by name or number...',
    filterAll: 'All', filterMakki: 'Meccan', filterMadani: 'Medinan',
    allJuz: 'All Juz', juzLabel: (j) => `Juz ${j}`,
    resultCount: (n) => `${n} Surahs`,
    noResults: 'No results found — try a different search',
    availBadge: 'Available',
    availNote: 'Currently available', availVal: 'Full Surah Al-Baqarah (286 verses)',
    soonNote: 'Coming soon', soonVal: 'Remaining Surahs of the Holy Quran',
    subtitleSite: 'Quranic Surah Index',
    homeBtn: 'Home',
    footerCopy: '© 1446 AH · Fuyud Al-Tawil Al-Muasir · All Rights Reserved',
    ayahLabel: 'verses', juzShort: 'Juz',
    typeMakki: 'Meccan', typeMadani: 'Medinan',
    pageTitle: "Surah Index — Fuyud Al-Ta'wil Al-Mu'asir",
  },
  ur: {
    dir: 'rtl', isRtl: true,
    font: '"Noto Nastaliq Urdu","Noto Naskh Arabic",serif',
    heroTitle: 'قرآنی سورتوں کی فہرست',
    heroSub: '١١٤ سورتیں · ٦٢٣٦ آیات · تیس پارے',
    heroAyah: '﴿ إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ ﴾',
    searchPlaceholder: 'نام یا نمبر سے تلاش کریں...',
    filterAll: 'سب', filterMakki: 'مکی', filterMadani: 'مدنی',
    allJuz: 'تمام پارے', juzLabel: (j) => `پارہ ${j}`,
    resultCount: (n) => `${toArabicNum(n)} سورتیں`,
    noResults: 'کوئی نتیجہ نہیں — مختلف تلاش کریں',
    availBadge: 'دستیاب',
    availNote: 'ابھی دستیاب', availVal: 'سورۃ البقرہ مکمل (٢٨٦ آیات)',
    soonNote: 'جلد آئے گا', soonVal: 'قرآن کریم کی باقی سورتیں',
    subtitleSite: 'قرآنی سورتوں کی فہرست',
    homeBtn: 'گھر',
    footerCopy: '© ١٤٤٦ ھ · فیوض التاویل المعاصر · جملہ حقوق محفوظ',
    ayahLabel: 'آیات', juzShort: 'پ',
    typeMakki: 'مکی', typeMadani: 'مدنی',
    pageTitle: 'سورتوں کی فہرست — فیوض التاویل المعاصر',
  },
  id: {
    dir: 'ltr', isRtl: false,
    font: 'Inter,"Segoe UI",sans-serif',
    heroTitle: 'Indeks Surah Al-Quran',
    heroSub: '114 Surah · 6.236 Ayat · 30 Juz',
    heroAyah: '﴿ إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ ﴾',
    searchPlaceholder: 'Cari berdasarkan nama atau nomor...',
    filterAll: 'Semua', filterMakki: 'Makkiyah', filterMadani: 'Madaniyah',
    allJuz: 'Semua Juz', juzLabel: (j) => `Juz ${j}`,
    resultCount: (n) => `${n} Surah`,
    noResults: 'Tidak ada hasil — coba pencarian lain',
    availBadge: 'Tersedia',
    availNote: 'Tersedia sekarang', availVal: 'Surah Al-Baqarah lengkap (286 ayat)',
    soonNote: 'Segera hadir', soonVal: 'Surah-surah Al-Quran lainnya',
    subtitleSite: 'Indeks Surah Al-Quran',
    homeBtn: 'Beranda',
    footerCopy: '© 1446 H · Fuyud Al-Tawil Al-Muasir · Semua Hak Dilindungi',
    ayahLabel: 'ayat', juzShort: 'Juz',
    typeMakki: 'Makkiyah', typeMadani: 'Madaniyah',
    pageTitle: "Indeks Surah — Fuyud Al-Ta'wil Al-Mu'asir",
  },
  tr: {
    dir: 'ltr', isRtl: false,
    font: 'Inter,"Segoe UI",sans-serif',
    heroTitle: 'Kuran Sureler Dizini',
    heroSub: '114 Sure · 6.236 Ayet · 30 Cüz',
    heroAyah: '﴿ إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ ﴾',
    searchPlaceholder: 'Ad veya numaraya göre ara...',
    filterAll: 'Tümü', filterMakki: 'Mekki', filterMadani: 'Medeni',
    allJuz: 'Tüm Cüzler', juzLabel: (j) => `Cüz ${j}`,
    resultCount: (n) => `${n} Sure`,
    noResults: 'Sonuç bulunamadı — farklı bir arama deneyin',
    availBadge: 'Mevcut',
    availNote: 'Şu an mevcut', availVal: 'Bakara Suresi tamamı (286 ayet)',
    soonNote: 'Yakında', soonVal: 'Kuranın geri kalan sureleri',
    subtitleSite: 'Kuran Sure Dizini',
    homeBtn: 'Ana Sayfa',
    footerCopy: '© 1446 H · Fuyud El-Tevil El-Muasır · Tüm Hakları Saklıdır',
    ayahLabel: 'ayet', juzShort: 'Cüz',
    typeMakki: 'Mekki', typeMadani: 'Medeni',
    pageTitle: "Sure Dizini — Fuyud El-Te'vil El-Muasır",
  },
};

/* ══════════════════════════════════════════════════════
   بيانات السور الـ 114 — عربي + إنجليزي + أردو + إندونيسي + تركي
   المصادر: Quran.com · IslamicFinder · Tanzil.net · Kemenag RI · Diyanet İşleri
══════════════════════════════════════════════════════ */
const SURAHS = [
  { n:1,   ar:'الفاتحة',     en:'Al-Fatihah',       ur:'الفاتحہ',          id:'Al-Fatihah',       tr:'Fatiha',          ayahs:7,   type:'مكية',  juz:1  },
  { n:2,   ar:'البقرة',      en:'Al-Baqarah',        ur:'البقرہ',           id:'Al-Baqarah',       tr:'Bakara',          ayahs:286, type:'مدنية', juz:1  },
  { n:3,   ar:'آل عمران',    en:"Ali 'Imran",        ur:'آل عمران',         id:"Ali 'Imran",       tr:'Âl-i İmrân',      ayahs:200, type:'مدنية', juz:3  },
  { n:4,   ar:'النساء',      en:"An-Nisa'",          ur:'النساء',           id:"An-Nisa'",         tr:'Nisâ',            ayahs:176, type:'مدنية', juz:4  },
  { n:5,   ar:'المائدة',     en:"Al-Ma'idah",        ur:'المائدہ',          id:"Al-Ma'idah",       tr:'Mâide',           ayahs:120, type:'مدنية', juz:6  },
  { n:6,   ar:'الأنعام',     en:"Al-An'am",          ur:'الانعام',          id:"Al-An'am",         tr:"En'âm",           ayahs:165, type:'مكية',  juz:7  },
  { n:7,   ar:'الأعراف',     en:"Al-A'raf",          ur:'الاعراف',          id:"Al-A'raf",         tr:"A'râf",           ayahs:206, type:'مكية',  juz:8  },
  { n:8,   ar:'الأنفال',     en:'Al-Anfal',          ur:'الانفال',          id:'Al-Anfal',         tr:'Enfâl',           ayahs:75,  type:'مدنية', juz:9  },
  { n:9,   ar:'التوبة',      en:'At-Tawbah',         ur:'التوبہ',           id:'At-Taubah',        tr:'Tevbe',           ayahs:129, type:'مدنية', juz:10 },
  { n:10,  ar:'يونس',        en:'Yunus',             ur:'یونس',             id:'Yunus',            tr:'Yûnus',           ayahs:109, type:'مكية',  juz:11 },
  { n:11,  ar:'هود',         en:'Hud',               ur:'ہود',              id:'Hud',              tr:'Hûd',             ayahs:123, type:'مكية',  juz:11 },
  { n:12,  ar:'يوسف',        en:'Yusuf',             ur:'یوسف',             id:'Yusuf',            tr:'Yûsuf',           ayahs:111, type:'مكية',  juz:12 },
  { n:13,  ar:'الرعد',       en:"Ar-Ra'd",           ur:'الرعد',            id:"Ar-Ra'd",          tr:'Rad',             ayahs:43,  type:'مدنية', juz:13 },
  { n:14,  ar:'إبراهيم',     en:'Ibrahim',           ur:'ابراہیم',          id:'Ibrahim',          tr:'İbrâhîm',         ayahs:52,  type:'مكية',  juz:13 },
  { n:15,  ar:'الحجر',       en:'Al-Hijr',           ur:'الحجر',            id:'Al-Hijr',          tr:'Hicr',            ayahs:99,  type:'مكية',  juz:14 },
  { n:16,  ar:'النحل',       en:'An-Nahl',           ur:'النحل',            id:'An-Nahl',          tr:'Nahl',            ayahs:128, type:'مكية',  juz:14 },
  { n:17,  ar:'الإسراء',     en:"Al-Isra'",          ur:'الاسراء',          id:"Al-Isra'",         tr:"İsrâ",            ayahs:111, type:'مكية',  juz:15 },
  { n:18,  ar:'الكهف',       en:'Al-Kahf',           ur:'الکہف',            id:'Al-Kahf',          tr:'Kehf',            ayahs:110, type:'مكية',  juz:15 },
  { n:19,  ar:'مريم',        en:'Maryam',            ur:'مریم',             id:'Maryam',           tr:'Meryem',          ayahs:98,  type:'مكية',  juz:16 },
  { n:20,  ar:'طه',          en:'Taha',              ur:'طٰہٰ',             id:'Taha',             tr:'Tâhâ',            ayahs:135, type:'مكية',  juz:16 },
  { n:21,  ar:'الأنبياء',    en:"Al-Anbiya'",        ur:'الانبیاء',         id:"Al-Anbiya'",       tr:'Enbiyâ',          ayahs:112, type:'مكية',  juz:17 },
  { n:22,  ar:'الحج',        en:'Al-Hajj',           ur:'الحج',             id:'Al-Hajj',          tr:'Hac',             ayahs:78,  type:'مدنية', juz:17 },
  { n:23,  ar:'المؤمنون',    en:"Al-Mu'minun",       ur:'المومنون',         id:"Al-Mu'minun",      tr:'Mü\'minûn',       ayahs:118, type:'مكية',  juz:18 },
  { n:24,  ar:'النور',       en:'An-Nur',            ur:'النور',            id:'An-Nur',           tr:'Nûr',             ayahs:64,  type:'مدنية', juz:18 },
  { n:25,  ar:'الفرقان',     en:'Al-Furqan',         ur:'الفرقان',          id:'Al-Furqan',        tr:'Furkân',          ayahs:77,  type:'مكية',  juz:18 },
  { n:26,  ar:'الشعراء',     en:"Ash-Shu'ara'",      ur:'الشعراء',          id:"Asy-Syu'ara'",     tr:"Şu'arâ",          ayahs:227, type:'مكية',  juz:19 },
  { n:27,  ar:'النمل',       en:'An-Naml',           ur:'النمل',            id:'An-Naml',          tr:'Neml',            ayahs:93,  type:'مكية',  juz:19 },
  { n:28,  ar:'القصص',       en:'Al-Qasas',          ur:'القصص',            id:'Al-Qasas',         tr:'Kasas',           ayahs:88,  type:'مكية',  juz:20 },
  { n:29,  ar:'العنكبوت',    en:"Al-'Ankabut",       ur:'العنکبوت',         id:"Al-'Ankabut",      tr:'Ankebût',         ayahs:69,  type:'مكية',  juz:20 },
  { n:30,  ar:'الروم',       en:'Ar-Rum',            ur:'الروم',            id:'Ar-Rum',           tr:'Rûm',             ayahs:60,  type:'مكية',  juz:21 },
  { n:31,  ar:'لقمان',       en:'Luqman',            ur:'لقمان',            id:'Luqman',           tr:'Lokmân',          ayahs:34,  type:'مكية',  juz:21 },
  { n:32,  ar:'السجدة',      en:'As-Sajdah',         ur:'السجدہ',           id:'As-Sajdah',        tr:'Secde',           ayahs:30,  type:'مكية',  juz:21 },
  { n:33,  ar:'الأحزاب',     en:'Al-Ahzab',          ur:'الاحزاب',          id:'Al-Ahzab',         tr:'Ahzâb',           ayahs:73,  type:'مدنية', juz:21 },
  { n:34,  ar:'سبأ',         en:"Saba'",             ur:'سبا',              id:"Saba'",            tr:'Sebe',            ayahs:54,  type:'مكية',  juz:22 },
  { n:35,  ar:'فاطر',        en:'Fatir',             ur:'فاطر',             id:'Fatir',            tr:'Fâtır',           ayahs:45,  type:'مكية',  juz:22 },
  { n:36,  ar:'يس',          en:'Ya-Sin',            ur:'یٰسٓ',             id:'Yasin',            tr:'Yâsîn',           ayahs:83,  type:'مكية',  juz:22 },
  { n:37,  ar:'الصافات',     en:'As-Saffat',         ur:'الصافات',          id:'As-Saffat',        tr:'Saffât',          ayahs:182, type:'مكية',  juz:23 },
  { n:38,  ar:'ص',           en:'Sad',               ur:'صٓ',               id:'Sad',              tr:'Sâd',             ayahs:88,  type:'مكية',  juz:23 },
  { n:39,  ar:'الزمر',       en:'Az-Zumar',          ur:'الزمر',            id:'Az-Zumar',         tr:'Zümer',           ayahs:75,  type:'مكية',  juz:23 },
  { n:40,  ar:'غافر',        en:'Ghafir',            ur:'غافر',             id:'Ghafir',           tr:'Mü\'min',         ayahs:85,  type:'مكية',  juz:24 },
  { n:41,  ar:'فصلت',        en:'Fussilat',          ur:'فصلت',             id:'Fussilat',         tr:'Fussilet',        ayahs:54,  type:'مكية',  juz:24 },
  { n:42,  ar:'الشورى',      en:'Ash-Shura',         ur:'الشوری',           id:'Asy-Syura',        tr:'Şûrâ',            ayahs:53,  type:'مكية',  juz:25 },
  { n:43,  ar:'الزخرف',      en:'Az-Zukhruf',        ur:'الزخرف',           id:'Az-Zukhruf',       tr:'Zuhruf',          ayahs:89,  type:'مكية',  juz:25 },
  { n:44,  ar:'الدخان',      en:'Ad-Dukhan',         ur:'الدخان',           id:'Ad-Dukhan',        tr:'Duhân',           ayahs:59,  type:'مكية',  juz:25 },
  { n:45,  ar:'الجاثية',     en:'Al-Jathiyah',       ur:'الجاثیہ',          id:'Al-Jasiyah',       tr:'Câsiye',          ayahs:37,  type:'مكية',  juz:25 },
  { n:46,  ar:'الأحقاف',     en:'Al-Ahqaf',          ur:'الاحقاف',          id:'Al-Ahqaf',         tr:'Ahkâf',           ayahs:35,  type:'مكية',  juz:26 },
  { n:47,  ar:'محمد',        en:'Muhammad',          ur:'محمد',             id:'Muhammad',         tr:'Muhammed',        ayahs:38,  type:'مدنية', juz:26 },
  { n:48,  ar:'الفتح',       en:'Al-Fath',           ur:'الفتح',            id:'Al-Fath',          tr:'Fetih',           ayahs:29,  type:'مدنية', juz:26 },
  { n:49,  ar:'الحجرات',     en:'Al-Hujurat',        ur:'الحجرات',          id:'Al-Hujurat',       tr:'Hucurât',         ayahs:18,  type:'مدنية', juz:26 },
  { n:50,  ar:'ق',           en:'Qaf',               ur:'قٓ',               id:'Qaf',              tr:'Kâf',             ayahs:45,  type:'مكية',  juz:26 },
  { n:51,  ar:'الذاريات',    en:'Adh-Dhariyat',      ur:'الذاریات',         id:'Az-Zariyat',       tr:'Zâriyât',         ayahs:60,  type:'مكية',  juz:26 },
  { n:52,  ar:'الطور',       en:'At-Tur',            ur:'الطور',            id:'At-Tur',           tr:'Tûr',             ayahs:49,  type:'مكية',  juz:27 },
  { n:53,  ar:'النجم',       en:'An-Najm',           ur:'النجم',            id:'An-Najm',          tr:'Necm',            ayahs:62,  type:'مكية',  juz:27 },
  { n:54,  ar:'القمر',       en:'Al-Qamar',          ur:'القمر',            id:'Al-Qamar',         tr:'Kamer',           ayahs:55,  type:'مكية',  juz:27 },
  { n:55,  ar:'الرحمن',      en:'Ar-Rahman',         ur:'الرحمن',           id:'Ar-Rahman',        tr:'Rahmân',          ayahs:78,  type:'مدنية', juz:27 },
  { n:56,  ar:'الواقعة',     en:"Al-Waqi'ah",        ur:'الواقعہ',          id:"Al-Waqi'ah",       tr:'Vâkıa',           ayahs:96,  type:'مكية',  juz:27 },
  { n:57,  ar:'الحديد',      en:'Al-Hadid',          ur:'الحدید',           id:'Al-Hadid',         tr:'Hadîd',           ayahs:29,  type:'مدنية', juz:27 },
  { n:58,  ar:'المجادلة',    en:'Al-Mujadila',       ur:'المجادلہ',         id:'Al-Mujadilah',     tr:'Mücâdile',        ayahs:22,  type:'مدنية', juz:28 },
  { n:59,  ar:'الحشر',       en:'Al-Hashr',          ur:'الحشر',            id:'Al-Hasyr',         tr:'Haşr',            ayahs:24,  type:'مدنية', juz:28 },
  { n:60,  ar:'الممتحنة',    en:'Al-Mumtahanah',     ur:'الممتحنہ',         id:'Al-Mumtahanah',    tr:'Mümtehine',       ayahs:13,  type:'مدنية', juz:28 },
  { n:61,  ar:'الصف',        en:'As-Saf',            ur:'الصف',             id:'As-Saf',           tr:'Saf',             ayahs:14,  type:'مدنية', juz:28 },
  { n:62,  ar:'الجمعة',      en:"Al-Jumu'ah",        ur:'الجمعہ',           id:"Al-Jumu'ah",       tr:'Cum\'a',          ayahs:11,  type:'مدنية', juz:28 },
  { n:63,  ar:'المنافقون',   en:'Al-Munafiqun',      ur:'المنافقون',        id:'Al-Munafiqun',     tr:'Münâfikûn',       ayahs:11,  type:'مدنية', juz:28 },
  { n:64,  ar:'التغابن',     en:'At-Taghabun',       ur:'التغابن',          id:'At-Taghabun',      tr:'Teğâbun',         ayahs:18,  type:'مدنية', juz:28 },
  { n:65,  ar:'الطلاق',      en:'At-Talaq',          ur:'الطلاق',           id:'At-Talaq',         tr:'Talâk',           ayahs:12,  type:'مدنية', juz:28 },
  { n:66,  ar:'التحريم',     en:'At-Tahrim',         ur:'التحریم',          id:'At-Tahrim',        tr:'Tahrîm',          ayahs:12,  type:'مدنية', juz:28 },
  { n:67,  ar:'الملك',       en:'Al-Mulk',           ur:'الملک',            id:'Al-Mulk',          tr:'Mülk',            ayahs:30,  type:'مكية',  juz:29 },
  { n:68,  ar:'القلم',       en:'Al-Qalam',          ur:'القلم',            id:'Al-Qalam',         tr:'Kalem',           ayahs:52,  type:'مكية',  juz:29 },
  { n:69,  ar:'الحاقة',      en:"Al-Haqqah",         ur:'الحاقہ',           id:'Al-Haqqah',        tr:'Hâkka',           ayahs:52,  type:'مكية',  juz:29 },
  { n:70,  ar:'المعارج',     en:"Al-Ma'arij",        ur:'المعارج',          id:"Al-Ma'arij",       tr:"Me'âric",         ayahs:44,  type:'مكية',  juz:29 },
  { n:71,  ar:'نوح',         en:'Nuh',               ur:'نوح',              id:'Nuh',              tr:'Nûh',             ayahs:28,  type:'مكية',  juz:29 },
  { n:72,  ar:'الجن',        en:'Al-Jinn',           ur:'الجن',             id:'Al-Jinn',          tr:'Cin',             ayahs:28,  type:'مكية',  juz:29 },
  { n:73,  ar:'المزمل',      en:'Al-Muzzammil',      ur:'المزمل',           id:'Al-Muzzammil',     tr:'Müzzemmil',       ayahs:20,  type:'مكية',  juz:29 },
  { n:74,  ar:'المدثر',      en:'Al-Muddaththir',    ur:'المدثر',           id:'Al-Muddassir',     tr:'Müddessir',       ayahs:56,  type:'مكية',  juz:29 },
  { n:75,  ar:'القيامة',     en:'Al-Qiyamah',        ur:'القیامہ',          id:'Al-Qiyamah',       tr:'Kıyâme',          ayahs:40,  type:'مكية',  juz:29 },
  { n:76,  ar:'الإنسان',     en:'Al-Insan',          ur:'الانسان',          id:'Al-Insan',         tr:'İnsân',           ayahs:31,  type:'مدنية', juz:29 },
  { n:77,  ar:'المرسلات',    en:'Al-Mursalat',       ur:'المرسلات',         id:'Al-Mursalat',      tr:'Murselât',        ayahs:50,  type:'مكية',  juz:29 },
  { n:78,  ar:'النبأ',       en:"An-Naba'",          ur:'النبا',            id:"An-Naba'",         tr:'Nebe',            ayahs:40,  type:'مكية',  juz:30 },
  { n:79,  ar:'النازعات',    en:"An-Nazi'at",        ur:'النازعات',         id:"An-Nazi'at",       tr:'Nâziât',          ayahs:46,  type:'مكية',  juz:30 },
  { n:80,  ar:'عبس',         en:'Abasa',             ur:'عبس',              id:'Abasa',            tr:'Abese',           ayahs:42,  type:'مكية',  juz:30 },
  { n:81,  ar:'التكوير',     en:'At-Takwir',         ur:'التکویر',          id:'At-Takwir',        tr:'Tekvîr',          ayahs:29,  type:'مكية',  juz:30 },
  { n:82,  ar:'الإنفطار',    en:'Al-Infitar',        ur:'الانفطار',         id:'Al-Infitar',       tr:'İnfitâr',         ayahs:19,  type:'مكية',  juz:30 },
  { n:83,  ar:'المطففين',    en:'Al-Mutaffifin',     ur:'المطففین',         id:'Al-Muthaffifin',   tr:'Mutaffifîn',      ayahs:36,  type:'مكية',  juz:30 },
  { n:84,  ar:'الإنشقاق',    en:'Al-Inshiqaq',       ur:'الانشقاق',         id:'Al-Insyiqaq',      tr:'İnşikâk',         ayahs:25,  type:'مكية',  juz:30 },
  { n:85,  ar:'البروج',      en:'Al-Buruj',          ur:'البروج',           id:'Al-Buruj',         tr:'Bürûc',           ayahs:22,  type:'مكية',  juz:30 },
  { n:86,  ar:'الطارق',      en:'At-Tariq',          ur:'الطارق',           id:'At-Tariq',         tr:'Târık',           ayahs:17,  type:'مكية',  juz:30 },
  { n:87,  ar:"الأعلى",      en:"Al-A'la",           ur:'الاعلی',           id:"Al-A'la",          tr:"A'lâ",            ayahs:19,  type:'مكية',  juz:30 },
  { n:88,  ar:'الغاشية',     en:'Al-Ghashiyah',      ur:'الغاشیہ',          id:'Al-Ghasyiyah',     tr:'Ğâşiye',          ayahs:26,  type:'مكية',  juz:30 },
  { n:89,  ar:'الفجر',       en:'Al-Fajr',           ur:'الفجر',            id:'Al-Fajr',          tr:'Fecr',            ayahs:30,  type:'مكية',  juz:30 },
  { n:90,  ar:'البلد',       en:'Al-Balad',          ur:'البلد',            id:'Al-Balad',         tr:'Beled',           ayahs:20,  type:'مكية',  juz:30 },
  { n:91,  ar:'الشمس',       en:'Ash-Shams',         ur:'الشمس',            id:'Asy-Syams',        tr:'Şems',            ayahs:15,  type:'مكية',  juz:30 },
  { n:92,  ar:'الليل',       en:'Al-Layl',           ur:'اللیل',            id:'Al-Lail',          tr:'Leyl',            ayahs:21,  type:'مكية',  juz:30 },
  { n:93,  ar:'الضحى',       en:'Ad-Duha',           ur:'الضحی',            id:'Ad-Duha',          tr:'Duhâ',            ayahs:11,  type:'مكية',  juz:30 },
  { n:94,  ar:'الشرح',       en:'Ash-Sharh',         ur:'الانشراح',         id:'Asy-Syarh',        tr:'İnşirah',         ayahs:8,   type:'مكية',  juz:30 },
  { n:95,  ar:'التين',       en:'At-Tin',            ur:'التین',            id:'At-Tin',           tr:'Tîn',             ayahs:8,   type:'مكية',  juz:30 },
  { n:96,  ar:'العلق',       en:"Al-'Alaq",          ur:'العلق',            id:"Al-'Alaq",         tr:'Alak',            ayahs:19,  type:'مكية',  juz:30 },
  { n:97,  ar:'القدر',       en:'Al-Qadr',           ur:'القدر',            id:'Al-Qadr',          tr:'Kadr',            ayahs:5,   type:'مكية',  juz:30 },
  { n:98,  ar:'البينة',      en:'Al-Bayyinah',       ur:'البینہ',           id:'Al-Bayyinah',      tr:'Beyyine',         ayahs:8,   type:'مدنية', juz:30 },
  { n:99,  ar:'الزلزلة',     en:'Az-Zalzalah',       ur:'الزلزلہ',          id:'Az-Zalzalah',      tr:'Zilzâl',          ayahs:8,   type:'مدنية', juz:30 },
  { n:100, ar:'العاديات',    en:"Al-'Adiyat",        ur:'العادیات',         id:"Al-'Adiyat",       tr:'Âdiyât',          ayahs:11,  type:'مكية',  juz:30 },
  { n:101, ar:'القارعة',     en:"Al-Qari'ah",        ur:'القارعہ',          id:"Al-Qari'ah",       tr:'Kâria',           ayahs:11,  type:'مكية',  juz:30 },
  { n:102, ar:'التكاثر',     en:'At-Takathur',       ur:'التکاثر',          id:'At-Takasur',       tr:'Tekâsür',         ayahs:8,   type:'مكية',  juz:30 },
  { n:103, ar:'العصر',       en:'Al-Asr',            ur:'العصر',            id:'Al-Asr',           tr:'Asr',             ayahs:3,   type:'مكية',  juz:30 },
  { n:104, ar:'الهمزة',      en:'Al-Humazah',        ur:'الہمزہ',           id:'Al-Humazah',       tr:'Hümeze',          ayahs:9,   type:'مكية',  juz:30 },
  { n:105, ar:'الفيل',       en:'Al-Fil',            ur:'الفیل',            id:'Al-Fil',           tr:'Fîl',             ayahs:5,   type:'مكية',  juz:30 },
  { n:106, ar:'قريش',        en:'Quraysh',           ur:'قریش',             id:'Quraisy',          tr:'Kureyş',          ayahs:4,   type:'مكية',  juz:30 },
  { n:107, ar:'الماعون',     en:"Al-Ma'un",          ur:'الماعون',          id:"Al-Ma'un",         tr:"Mâûn",            ayahs:7,   type:'مكية',  juz:30 },
  { n:108, ar:'الكوثر',      en:'Al-Kawthar',        ur:'الکوثر',           id:'Al-Kausar',        tr:'Kevser',          ayahs:3,   type:'مكية',  juz:30 },
  { n:109, ar:'الكافرون',    en:'Al-Kafirun',        ur:'الکافرون',         id:'Al-Kafirun',       tr:'Kâfirûn',         ayahs:6,   type:'مكية',  juz:30 },
  { n:110, ar:'النصر',       en:'An-Nasr',           ur:'النصر',            id:'An-Nasr',          tr:'Nasr',            ayahs:3,   type:'مدنية', juz:30 },
  { n:111, ar:'المسد',       en:'Al-Masad',          ur:'المسد',            id:'Al-Lahab',         tr:'Tebbet',          ayahs:5,   type:'مكية',  juz:30 },
  { n:112, ar:'الإخلاص',     en:'Al-Ikhlas',         ur:'الاخلاص',          id:'Al-Ikhlas',        tr:'İhlâs',           ayahs:4,   type:'مكية',  juz:30 },
  { n:113, ar:'الفلق',       en:'Al-Falaq',          ur:'الفلق',            id:'Al-Falaq',         tr:'Felak',           ayahs:5,   type:'مكية',  juz:30 },
  { n:114, ar:'الناس',       en:'An-Nas',            ur:'الناس',            id:'An-Nas',           tr:'Nâs',             ayahs:6,   type:'مكية',  juz:30 },
];

/* ══════════════════════════════════════════════════════
   نظام ألوان السور — دورة 7 ألوان
══════════════════════════════════════════════════════ */
const SURAH_PALETTES = [
  { bg: C.TEAL,  bd: C.TEAL2,  ac: C.TEAL3,  lt: C.TW },
  { bg: C.G2,    bd: C.G3,     ac: C.G5,     lt: '#fff8e8' },
  { bg: C.BLUE,  bd: C.BLUE2,  ac: C.BLUE3,  lt: C.TW },
  { bg: C.PURP,  bd: C.PURP2,  ac: C.PURP3,  lt: C.TW },
  { bg: C.COPP,  bd: C.COPP2,  ac: C.COPP3,  lt: C.TW },
  { bg: C.OLIV,  bd: C.OLIV2,  ac: C.OLIV3,  lt: C.TW },
  { bg: C.ROSE,  bd: C.ROSE2,  ac: C.ROSE3,  lt: C.TW },
];

/* السور المتاحة */
const AVAILABLE = new Set([2]);

/* تحويل رقم إلى عربي */
function toArabicNum(n) {
  return String(n).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
}

/* ══════════════════════════════════════════════════════
   بطاقة السورة — ثنائية اللغة
══════════════════════════════════════════════════════ */
function SurahCard({ surah, index, visible, lang, ui }) {
  const nav = useNavigate();
  const p = SURAH_PALETTES[(surah.n - 1) % SURAH_PALETTES.length];
  const avail = AVAILABLE.has(surah.n);
  const isRtl = ui.isRtl;

  /* اسم السورة بالغة المختارة */
  const localName = surah[lang] || surah.en;
  /* نوع السورة بالغة المختارة */
  const typeLabel = surah.type === 'مكية' ? ui.typeMakki : ui.typeMadani;
  /* عدد الآيات */
  const ayahCount = isRtl ? toArabicNum(surah.ayahs) : String(surah.ayahs);
  /* رقم الجزء */
  const juzNum = isRtl ? toArabicNum(surah.juz) : String(surah.juz);

  const handleClick = () => {
    if (!avail) return;
    if (surah.n === 2) nav('/part1');
  };

  return (
    <div
      onClick={handleClick}
      style={{
        background: `linear-gradient(145deg, ${p.bg}, ${p.bg}dd)`,
        border: `1.5px solid ${p.bd}80`,
        borderRadius: 16,
        padding: 0,
        cursor: avail ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(22px) scale(0.96)',
        transition: `opacity 0.38s ease ${(index % 14) * 38}ms, transform 0.38s ease ${(index % 14) * 38}ms`,
        boxShadow: '0 3px 14px rgba(0,0,0,0.16)',
      }}
      onMouseEnter={e => {
        if (!avail) return;
        e.currentTarget.style.filter = 'brightness(1.13)';
        e.currentTarget.style.transform = 'translateY(-5px) scale(1.03)';
        e.currentTarget.style.boxShadow = '0 14px 34px rgba(0,0,0,0.26)';
        e.currentTarget.style.zIndex = '10';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.filter = 'none';
        e.currentTarget.style.transform = visible ? 'translateY(0) scale(1)' : 'translateY(22px) scale(0.96)';
        e.currentTarget.style.boxShadow = '0 3px 14px rgba(0,0,0,0.16)';
        e.currentTarget.style.zIndex = '1';
      }}
    >
      {/* شريط علوي */}
      <div style={{
        background: 'rgba(255,255,255,0.14)',
        borderBottom: '1px solid rgba(255,255,255,0.20)',
        padding: '9px 11px 7px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        direction: 'rtl',  /* الأرقام دائماً RTL لأن العربية هي الأصل */
      }}>
        {/* رقم السورة */}
        <div style={{
          width: 30, height: 30,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.22)',
          border: '1.5px solid rgba(255,255,255,0.40)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Amiri,serif',
          fontSize: '0.80rem', fontWeight: 700, color: p.lt, flexShrink: 0,
        }}>
          {toArabicNum(surah.n)}
        </div>

        {/* نوع السورة */}
        <span style={{
          fontSize: '0.66rem',
          fontFamily: ui.font,
          fontWeight: 700,
          color: surah.type === 'مكية' ? 'rgba(255,240,180,0.95)' : 'rgba(180,255,240,0.95)',
          background: surah.type === 'مكية' ? 'rgba(150,80,0,0.35)' : 'rgba(0,100,80,0.35)',
          border: `1px solid ${surah.type === 'مكية' ? 'rgba(255,200,50,0.40)' : 'rgba(100,255,200,0.40)'}`,
          borderRadius: 20, padding: '2px 7px',
        }}>
          {typeLabel}
        </span>
      </div>

      {/* جسم البطاقة */}
      <div style={{ padding: '11px 11px 13px', textAlign: 'right', direction: 'rtl' }}>

        {/* الاسم العربي — دائماً بالعربية */}
        <div style={{
          fontFamily: 'Amiri,serif',
          fontSize: 'clamp(1.02rem,1.35vw,1.22rem)',
          fontWeight: 700,
          color: p.lt,
          marginBottom: 2,
          lineHeight: 1.25,
          textShadow: '0 1px 4px rgba(0,0,0,0.25)',
          direction: 'rtl',
        }}>
          {surah.ar}
        </div>

        {/* الترجمة — باللغة المختارة تحت الاسم العربي */}
        {lang !== 'ar' && (
          <div style={{
            fontFamily: ui.font,
            fontSize: '0.70rem',
            color: 'rgba(255,255,255,0.72)',
            marginBottom: 8,
            direction: isRtl ? 'rtl' : 'ltr',
            textAlign: isRtl ? 'right' : 'left',
            fontStyle: lang === 'en' || lang === 'id' || lang === 'tr' ? 'italic' : 'normal',
          }}>
            {localName}
          </div>
        )}

        {/* عدد الآيات + الجزء */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: lang === 'ar' ? 10 : 2,
        }}>
          <span style={{
            fontSize: '0.70rem',
            fontFamily: ui.font,
            color: 'rgba(255,255,255,0.68)',
          }}>
            {ui.juzShort} {juzNum}
          </span>
          <span style={{
            fontSize: '0.73rem',
            fontFamily: ui.font,
            color: p.ac === C.G5 ? '#ffe88a' : 'rgba(255,255,255,0.85)',
            fontWeight: 700,
          }}>
            {ayahCount} {ui.ayahLabel}
          </span>
        </div>
      </div>

      {/* شارة "متاح" */}
      {avail && (
        <div style={{
          position: 'absolute', top: 0, right: 0,
          background: `linear-gradient(135deg,${C.G5},${C.G6})`,
          color: '#2a1000',
          fontSize: '0.60rem', fontWeight: 800,
          fontFamily: ui.font,
          padding: '3px 8px',
          borderRadius: '0 14px 0 10px',
        }}>
          {ui.availBadge}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SVG نقش هندسي
══════════════════════════════════════════════════════ */
function GeomBg() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <defs>
        <pattern id="gp-idx" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <polygon points="40,4 48,26 70,26 53,40 60,62 40,49 20,62 27,40 10,26 32,26"
            fill="none" stroke={C.G3} strokeWidth="1.2"/>
          <circle cx="40" cy="40" r="3" fill={C.G4} fillOpacity="0.55"/>
          <circle cx="40" cy="40" r="6" fill="none" stroke={C.G4} strokeWidth="0.6" opacity="0.45"/>
          <line x1="0" y1="40" x2="80" y2="40" stroke={C.G3} strokeWidth="0.45" opacity="0.50"/>
          <line x1="40" y1="0" x2="40" y2="80" stroke={C.G3} strokeWidth="0.45" opacity="0.50"/>
          <circle cx="0"  cy="0"  r="1.6" fill={C.G3} fillOpacity="0.42"/>
          <circle cx="80" cy="0"  r="1.6" fill={C.G3} fillOpacity="0.42"/>
          <circle cx="0"  cy="80" r="1.6" fill={C.G3} fillOpacity="0.42"/>
          <circle cx="80" cy="80" r="1.6" fill={C.G3} fillOpacity="0.42"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gp-idx)" opacity="0.17"/>
    </svg>
  );
}

/* فاصل ذهبي */
function GoldDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '0 0 28px' }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left,${C.G3}90,transparent)` }}/>
      <svg width="26" height="26" viewBox="0 0 30 30">
        <rect x="5" y="5" width="20" height="20" rx="1" fill="none"
          stroke={C.G3} strokeWidth="1.2" transform="rotate(45 15 15)" opacity="0.9"/>
        <circle cx="15" cy="15" r="2.5" fill={C.G4} fillOpacity="0.85"/>
      </svg>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right,${C.G3}90,transparent)` }}/>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   المسارات لكل لغة
══════════════════════════════════════════════════════ */
/* مسارات الصفحة الرئيسية لكل لغة */
const HOME_ROUTES   = { ar:'/', en:'/en', ur:'/ur', id:'/id', tr:'/tr' };
/* مسارات فهرس السور لكل لغة */
const SURAHS_ROUTES = { ar:'/surahs', en:'/en/surahs', ur:'/ur/surahs', id:'/id/surahs', tr:'/tr/surahs' };

const LANGS_LIST = [
  { code:'ar', label:'العربية', flag:'🇸🇦' },
  { code:'en', label:'English', flag:'🇬🇧' },
  { code:'ur', label:'اردو',    flag:'🇵🇰' },
  { code:'id', label:'Bahasa',  flag:'🇮🇩' },
  { code:'tr', label:'Türkçe',  flag:'🇹🇷' },
];

/* ══════════════════════════════════════════════════════
   المكوّن الرئيسي
══════════════════════════════════════════════════════ */
export default function SurahIndex({ lang = 'ar', onLangChange }) {
  const nav = useNavigate();
  const ui = UI[lang] || UI.ar;
  const [query, setQuery]           = useState('');
  const [filter, setFilter]         = useState('all');
  const [juzFilter, setJuzFilter]   = useState(0);
  const [visible, setVisible]       = useState(false);
  const [rowsVisible, setRowsVisible] = useState(new Set());
  const gridRef = useRef(null);

  /* SEO */
  useEffect(() => {
    document.title = ui.pageTitle;
    document.documentElement.lang = lang === 'ur' ? 'ur' : lang === 'id' ? 'id' : lang === 'tr' ? 'tr' : lang === 'en' ? 'en' : 'ar';
    document.documentElement.dir  = ui.dir;
  }, [lang, ui]);

  /* إظهار تدريجي */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* IntersectionObserver */
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('[data-idx]');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setRowsVisible(prev => new Set([...prev, +e.target.dataset.idx]));
      });
    }, { threshold: 0.05 });
    cards.forEach(c => obs.observe(c));
    return () => obs.disconnect();
  }, [query, filter, juzFilter]);

  /* تصفية */
  const filtered = SURAHS.filter(s => {
    const q = query.trim().toLowerCase();
    const matchQ = !q ||
      s.ar.includes(query.trim()) ||
      s.en.toLowerCase().includes(q) ||
      (s[lang] || '').toLowerCase().includes(q) ||
      String(s.n).includes(q);
    const matchF = filter === 'all' ||
      (filter === 'makki'  && s.type === 'مكية') ||
      (filter === 'madani' && s.type === 'مدنية');
    const matchJ = juzFilter === 0 || s.juz === juzFilter;
    return matchQ && matchF && matchJ;
  });

  const handleLangChange = (code) => {
    nav(SURAHS_ROUTES[code] || '/surahs');
  };

  return (
    <div style={{ background: C.BG, minHeight: '100vh', direction: ui.dir, position: 'relative' }}>

      <style>{`
        @keyframes fadeSlideDown {
          from { opacity:0; transform:translateY(-16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes headerGlow {
          0%,100%{box-shadow:0 4px 40px rgba(180,130,0,0.18);}
          50%{box-shadow:0 4px 60px rgba(180,130,0,0.34);}
        }
        .idx-card-wrap { position:relative; }
        *{box-sizing:border-box;}
        ::-webkit-scrollbar{width:8px;background:${C.BG2}}
        ::-webkit-scrollbar-thumb{background:${C.G3};border-radius:8px}
        html{scroll-behavior:smooth}
      `}</style>

      {/* ══ HEADER ══ */}
      <div style={{ position: 'sticky', top: 0, zIndex: 200 }}>

        {/* شريط اللغات */}
        <div style={{
          background: `linear-gradient(180deg,${C.BG},${C.BG1})`,
          borderBottom: `1px solid ${C.BD3}`,
          padding: '6px 20px',
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, flexWrap: 'wrap',
        }}>
          <Globe size={13} color={C.G2} style={{ opacity: 0.8 }}/>
          {LANGS_LIST.map(l => (
            <button key={l.code} onClick={() => handleLangChange(l.code)} style={{
              background: lang === l.code ? `linear-gradient(135deg,${C.G3},${C.G5},${C.G6})` : 'transparent',
              color: lang === l.code ? '#2a1000' : C.TXT2,
              border: `1.5px solid ${lang === l.code ? C.G4 : C.BD2}`,
              borderRadius: 20, padding: '3px 14px',
              fontSize: '0.83rem', fontWeight: 700, cursor: 'pointer',
              fontFamily: ['ar','ur'].includes(l.code) ? 'Noto Naskh Arabic,serif' : 'Inter,sans-serif',
              display: 'flex', alignItems: 'center', gap: 5, transition: 'all .2s',
              boxShadow: lang === l.code ? `0 2px 10px ${C.G4}50` : 'none',
            }}
            onMouseEnter={e=>{if(lang!==l.code){e.currentTarget.style.borderColor=C.G3;e.currentTarget.style.color=C.G1;e.currentTarget.style.background=C.GLOW2;}}}
            onMouseLeave={e=>{if(lang!==l.code){e.currentTarget.style.borderColor=C.BD2;e.currentTarget.style.color=C.TXT2;e.currentTarget.style.background='transparent';}}}>
              <span>{l.flag}</span><span>{l.label}</span>
            </button>
          ))}
        </div>

        {/* الهيدر الرئيسي */}
        <header style={{
          background: `${C.BG}f5`,
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${C.BD3}`,
          animation: 'headerGlow 4s ease-in-out infinite',
        }}>
          <div style={{ height: 3, background: `linear-gradient(90deg,transparent,${C.G3},${C.G6},${C.G4},transparent)` }}/>
          <div style={{
            maxWidth: 1300, margin: '0 auto', padding: '10px 22px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14,
          }}>
            {/* شعار + اسم */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
              onClick={() => nav(HOME_ROUTES[lang] || '/')}>
              <div style={{
                width: 52, height: 52, borderRadius: '50% 50% 10px 10px',
                border: `2px solid ${C.G4}80`, overflow: 'hidden', background: C.CARD,
                boxShadow: `0 0 16px ${C.G4}30`,
              }}>
                <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
              </div>
              <div dir="rtl">
                <div style={{
                  fontFamily: 'Amiri,serif', fontSize: '1.15rem', fontWeight: 700,
                  background: `linear-gradient(135deg,${C.G2},${C.G4},${C.G3})`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>فيوض التأويل المعاصر</div>
                <div style={{ fontSize: '0.74rem', color: C.TXT3, fontFamily: ui.font, direction: ui.dir }}>
                  {ui.subtitleSite}
                </div>
              </div>
            </div>

            {/* زر الرئيسية */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button onClick={() => nav(HOME_ROUTES[lang] || '/')} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: C.GLOW2, border: `1.5px solid ${C.BD2}`,
                borderRadius: 10, padding: '8px 18px',
                color: C.TXT2, fontSize: '0.88rem', fontWeight: 700,
                fontFamily: ui.font, cursor: 'pointer', transition: 'all .2s',
              }}
              onMouseEnter={e=>{e.currentTarget.style.background=`linear-gradient(135deg,${C.G3},${C.G5})`;e.currentTarget.style.color='#2a1000';}}
              onMouseLeave={e=>{e.currentTarget.style.background=C.GLOW2;e.currentTarget.style.color=C.TXT2;}} >
                <Home size={15}/> {ui.homeBtn}
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* ══ HERO BANNER ══ */}
      <div style={{
        position: 'relative',
        background: 'linear-gradient(160deg, #1a0d00 0%, #2a1800 40%, #1a0d00 100%)',
        overflow: 'hidden', padding: '52px 26px 46px', textAlign: 'center',
        animation: 'fadeSlideDown 0.6s ease',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/bg_islamic.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.22 }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 0%, rgba(15,8,0,0.55) 100%)' }}/>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}><GeomBg/></div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* آية قرآنية */}
          <div style={{
            display: 'inline-block',
            background: 'rgba(20,10,0,0.55)', border: `1.5px solid ${C.G6}b0`,
            borderRadius: 14, padding: '10px 40px', marginBottom: 20,
            backdropFilter: 'blur(10px)',
          }}>
            <p style={{ fontFamily: 'Amiri,serif', fontSize: 'clamp(1.1rem,2.2vw,1.6rem)', color: C.G7, margin: 0, letterSpacing: '.06em', direction: 'rtl' }}>
              {ui.heroAyah}
            </p>
          </div>

          {/* عنوان الصفحة */}
          <h1 style={{
            fontFamily: ui.isRtl ? 'Amiri,serif' : '"Playfair Display",Georgia,serif',
            fontSize: 'clamp(1.8rem,4vw,3.2rem)',
            fontWeight: 700, margin: '0 0 10px',
            background: `linear-gradient(135deg,${C.G5} 0%,${C.G7} 35%,#ffffff 52%,${C.G7} 70%,${C.G5} 100%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: `drop-shadow(0 0 30px ${C.G5}70)`,
            direction: ui.dir,
          }}>
            {ui.heroTitle}
          </h1>
          <p style={{
            fontFamily: ui.font,
            fontSize: 'clamp(0.85rem,1.4vw,1rem)',
            color: 'rgba(255,248,220,0.88)', margin: '0 auto',
            maxWidth: 520, lineHeight: 1.9, direction: ui.dir,
          }}>
            {ui.heroSub}
          </p>
        </div>
      </div>

      {/* ══ شريط الفلاتر والبحث ══ */}
      <div style={{
        background: `linear-gradient(180deg,${C.BG1},${C.BG2})`,
        borderBottom: `1px solid ${C.BD2}`,
        padding: '18px 22px',
        position: 'sticky', top: 110, zIndex: 100,
      }}>
        <div style={{ maxWidth: 1260, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', direction: ui.dir }}>

            {/* حقل البحث */}
            <div style={{
              flex: '1 1 240px', display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.65)', border: `1.5px solid ${C.BD3}`,
              borderRadius: 12, padding: '9px 14px',
            }}>
              <Search size={18} color={C.G3}/>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={ui.searchPlaceholder}
                dir={ui.dir}
                style={{
                  flex: 1, background: 'transparent', border: 'none', outline: 'none',
                  color: C.TXT, fontSize: '0.92rem', fontFamily: ui.font,
                }}
              />
            </div>

            {/* نوع السورة */}
            {[['all', ui.filterAll], ['makki', ui.filterMakki], ['madani', ui.filterMadani]].map(([v, l]) => (
              <button key={v} onClick={() => setFilter(v)} style={{
                background: filter === v ? `linear-gradient(135deg,${C.G3},${C.G5})` : 'rgba(255,255,255,0.55)',
                color: filter === v ? '#2a1000' : C.TXT2,
                border: `1.5px solid ${filter === v ? C.G4 : C.BD2}`,
                borderRadius: 10, padding: '8px 18px',
                fontSize: '0.88rem', fontWeight: 700,
                fontFamily: ui.font, cursor: 'pointer', transition: 'all .18s',
                boxShadow: filter === v ? `0 2px 12px ${C.G4}40` : 'none',
              }}>{l}</button>
            ))}

            {/* فلتر الجزء */}
            <select
              value={juzFilter}
              onChange={e => setJuzFilter(+e.target.value)}
              style={{
                background: juzFilter > 0 ? `linear-gradient(135deg,${C.G3},${C.G5})` : 'rgba(255,255,255,0.55)',
                color: juzFilter > 0 ? '#2a1000' : C.TXT2,
                border: `1.5px solid ${juzFilter > 0 ? C.G4 : C.BD2}`,
                borderRadius: 10, padding: '8px 14px',
                fontSize: '0.88rem', fontWeight: 700,
                fontFamily: ui.font, cursor: 'pointer', outline: 'none',
              }}
            >
              <option value={0}>{ui.allJuz}</option>
              {Array.from({length:30},(_,i)=>i+1).map(j=>(
                <option key={j} value={j}>{ui.juzLabel(j)}</option>
              ))}
            </select>

            {/* عداد النتائج */}
            <span style={{ fontSize: '0.82rem', color: C.TXT3, fontFamily: ui.font, marginInlineStart: 'auto' }}>
              {ui.resultCount(filtered.length)}
            </span>
          </div>
        </div>
      </div>

      {/* ══ شبكة السور ══ */}
      <div style={{ maxWidth: 1260, margin: '0 auto', padding: '36px 22px 60px', position: 'relative' }}>
        <GeomBg/>
        <GoldDivider/>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: C.TXT3, fontFamily: ui.font, fontSize: '1.1rem' }}>
            {ui.noResults}
          </div>
        ) : (
          <div
            ref={gridRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))',
              gap: 14,
              position: 'relative', zIndex: 1,
            }}
          >
            {filtered.map((s, idx) => (
              <div key={s.n} data-idx={idx} className="idx-card-wrap">
                <SurahCard
                  surah={s}
                  index={idx}
                  visible={visible || rowsVisible.has(idx)}
                  lang={lang}
                  ui={ui}
                />
              </div>
            ))}
          </div>
        )}

        {/* ملاحظة */}
        <div style={{
          marginTop: 48, textAlign: 'center', padding: '20px 28px',
          background: 'rgba(255,255,255,0.45)', border: `1.5px solid ${C.BD2}`,
          borderRadius: 16, backdropFilter: 'blur(8px)',
          direction: ui.dir,
        }}>
          <p style={{ fontFamily: ui.font, fontSize: '0.92rem', color: C.TXT3, lineHeight: 2.0, margin: 0 }}>
            <span style={{ color: C.G2, fontWeight: 700 }}>{ui.availNote}:</span>{' '}
            {ui.availVal} ·{' '}
            <span style={{ color: C.G2, fontWeight: 700 }}>{ui.soonNote}:</span>{' '}
            {ui.soonVal}
          </p>
        </div>
      </div>

      {/* footer */}
      <div style={{
        background: `linear-gradient(180deg,${C.BG2},${C.BG3})`,
        borderTop: `1px solid ${C.BD2}`,
        padding: '24px 26px', textAlign: 'center',
      }}>
        <p style={{ fontFamily: ui.font, fontSize: '0.80rem', color: C.TXT3, margin: 0, direction: ui.dir }}>
          {ui.footerCopy}
        </p>
      </div>
    </div>
  );
}
