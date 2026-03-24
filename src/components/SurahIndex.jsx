import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, Globe, Home } from 'lucide-react';

/* ══════════════════════════════════════════════════════
   PALETTE — نفس لوحة الألوان الذهبية من HomePage
══════════════════════════════════════════════════════ */
const C = {
  BG:   '#f5ead4',
  BG1:  '#f0e2c4',
  BG2:  '#ebe0c0',
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
   بيانات السور الـ 114 كاملة
══════════════════════════════════════════════════════ */
const SURAHS = [
  { n:1,  ar:'الفاتحة',     en:'Al-Fatihah',     ayahs:7,   type:'مكية',  juz:1  },
  { n:2,  ar:'البقرة',      en:'Al-Baqarah',      ayahs:286, type:'مدنية', juz:1  },
  { n:3,  ar:'آل عمران',    en:'Ali Imran',        ayahs:200, type:'مدنية', juz:3  },
  { n:4,  ar:'النساء',      en:'An-Nisa',          ayahs:176, type:'مدنية', juz:4  },
  { n:5,  ar:'المائدة',     en:'Al-Maidah',        ayahs:120, type:'مدنية', juz:6  },
  { n:6,  ar:'الأنعام',     en:'Al-Anam',          ayahs:165, type:'مكية',  juz:7  },
  { n:7,  ar:'الأعراف',     en:'Al-Araf',          ayahs:206, type:'مكية',  juz:8  },
  { n:8,  ar:'الأنفال',     en:'Al-Anfal',         ayahs:75,  type:'مدنية', juz:9  },
  { n:9,  ar:'التوبة',      en:'At-Tawbah',        ayahs:129, type:'مدنية', juz:10 },
  { n:10, ar:'يونس',        en:'Yunus',            ayahs:109, type:'مكية',  juz:11 },
  { n:11, ar:'هود',         en:'Hud',              ayahs:123, type:'مكية',  juz:11 },
  { n:12, ar:'يوسف',        en:'Yusuf',            ayahs:111, type:'مكية',  juz:12 },
  { n:13, ar:'الرعد',       en:'Ar-Rad',           ayahs:43,  type:'مدنية', juz:13 },
  { n:14, ar:'إبراهيم',     en:'Ibrahim',          ayahs:52,  type:'مكية',  juz:13 },
  { n:15, ar:'الحجر',       en:'Al-Hijr',          ayahs:99,  type:'مكية',  juz:14 },
  { n:16, ar:'النحل',       en:'An-Nahl',          ayahs:128, type:'مكية',  juz:14 },
  { n:17, ar:'الإسراء',     en:'Al-Isra',          ayahs:111, type:'مكية',  juz:15 },
  { n:18, ar:'الكهف',       en:'Al-Kahf',          ayahs:110, type:'مكية',  juz:15 },
  { n:19, ar:'مريم',        en:'Maryam',           ayahs:98,  type:'مكية',  juz:16 },
  { n:20, ar:'طه',          en:'Taha',             ayahs:135, type:'مكية',  juz:16 },
  { n:21, ar:'الأنبياء',    en:'Al-Anbiya',        ayahs:112, type:'مكية',  juz:17 },
  { n:22, ar:'الحج',        en:'Al-Hajj',          ayahs:78,  type:'مدنية', juz:17 },
  { n:23, ar:'المؤمنون',    en:'Al-Muminun',       ayahs:118, type:'مكية',  juz:18 },
  { n:24, ar:'النور',       en:'An-Nur',           ayahs:64,  type:'مدنية', juz:18 },
  { n:25, ar:'الفرقان',     en:'Al-Furqan',        ayahs:77,  type:'مكية',  juz:18 },
  { n:26, ar:'الشعراء',     en:'Ash-Shuara',       ayahs:227, type:'مكية',  juz:19 },
  { n:27, ar:'النمل',       en:'An-Naml',          ayahs:93,  type:'مكية',  juz:19 },
  { n:28, ar:'القصص',       en:'Al-Qasas',         ayahs:88,  type:'مكية',  juz:20 },
  { n:29, ar:'العنكبوت',    en:'Al-Ankabut',       ayahs:69,  type:'مكية',  juz:20 },
  { n:30, ar:'الروم',       en:'Ar-Rum',           ayahs:60,  type:'مكية',  juz:21 },
  { n:31, ar:'لقمان',       en:'Luqman',           ayahs:34,  type:'مكية',  juz:21 },
  { n:32, ar:'السجدة',      en:'As-Sajdah',        ayahs:30,  type:'مكية',  juz:21 },
  { n:33, ar:'الأحزاب',     en:'Al-Ahzab',         ayahs:73,  type:'مدنية', juz:21 },
  { n:34, ar:'سبأ',         en:'Saba',             ayahs:54,  type:'مكية',  juz:22 },
  { n:35, ar:'فاطر',        en:'Fatir',            ayahs:45,  type:'مكية',  juz:22 },
  { n:36, ar:'يس',          en:'Ya-Sin',           ayahs:83,  type:'مكية',  juz:22 },
  { n:37, ar:'الصافات',     en:'As-Saffat',        ayahs:182, type:'مكية',  juz:23 },
  { n:38, ar:'ص',           en:'Sad',              ayahs:88,  type:'مكية',  juz:23 },
  { n:39, ar:'الزمر',       en:'Az-Zumar',         ayahs:75,  type:'مكية',  juz:23 },
  { n:40, ar:'غافر',        en:'Ghafir',           ayahs:85,  type:'مكية',  juz:24 },
  { n:41, ar:'فصلت',        en:'Fussilat',         ayahs:54,  type:'مكية',  juz:24 },
  { n:42, ar:'الشورى',      en:'Ash-Shura',        ayahs:53,  type:'مكية',  juz:25 },
  { n:43, ar:'الزخرف',      en:'Az-Zukhruf',       ayahs:89,  type:'مكية',  juz:25 },
  { n:44, ar:'الدخان',      en:'Ad-Dukhan',        ayahs:59,  type:'مكية',  juz:25 },
  { n:45, ar:'الجاثية',     en:'Al-Jathiyah',      ayahs:37,  type:'مكية',  juz:25 },
  { n:46, ar:'الأحقاف',     en:'Al-Ahqaf',         ayahs:35,  type:'مكية',  juz:26 },
  { n:47, ar:'محمد',        en:'Muhammad',         ayahs:38,  type:'مدنية', juz:26 },
  { n:48, ar:'الفتح',       en:'Al-Fath',          ayahs:29,  type:'مدنية', juz:26 },
  { n:49, ar:'الحجرات',     en:'Al-Hujurat',       ayahs:18,  type:'مدنية', juz:26 },
  { n:50, ar:'ق',           en:'Qaf',              ayahs:45,  type:'مكية',  juz:26 },
  { n:51, ar:'الذاريات',    en:'Adh-Dhariyat',     ayahs:60,  type:'مكية',  juz:26 },
  { n:52, ar:'الطور',       en:'At-Tur',           ayahs:49,  type:'مكية',  juz:27 },
  { n:53, ar:'النجم',       en:'An-Najm',          ayahs:62,  type:'مكية',  juz:27 },
  { n:54, ar:'القمر',       en:'Al-Qamar',         ayahs:55,  type:'مكية',  juz:27 },
  { n:55, ar:'الرحمن',      en:'Ar-Rahman',        ayahs:78,  type:'مدنية', juz:27 },
  { n:56, ar:'الواقعة',     en:'Al-Waqiah',        ayahs:96,  type:'مكية',  juz:27 },
  { n:57, ar:'الحديد',      en:'Al-Hadid',         ayahs:29,  type:'مدنية', juz:27 },
  { n:58, ar:'المجادلة',    en:'Al-Mujadila',      ayahs:22,  type:'مدنية', juz:28 },
  { n:59, ar:'الحشر',       en:'Al-Hashr',         ayahs:24,  type:'مدنية', juz:28 },
  { n:60, ar:'الممتحنة',    en:'Al-Mumtahanah',    ayahs:13,  type:'مدنية', juz:28 },
  { n:61, ar:'الصف',        en:'As-Saf',           ayahs:14,  type:'مدنية', juz:28 },
  { n:62, ar:'الجمعة',      en:'Al-Jumuah',        ayahs:11,  type:'مدنية', juz:28 },
  { n:63, ar:'المنافقون',   en:'Al-Munafiqun',     ayahs:11,  type:'مدنية', juz:28 },
  { n:64, ar:'التغابن',     en:'At-Taghabun',      ayahs:18,  type:'مدنية', juz:28 },
  { n:65, ar:'الطلاق',      en:'At-Talaq',         ayahs:12,  type:'مدنية', juz:28 },
  { n:66, ar:'التحريم',     en:'At-Tahrim',        ayahs:12,  type:'مدنية', juz:28 },
  { n:67, ar:'الملك',       en:'Al-Mulk',          ayahs:30,  type:'مكية',  juz:29 },
  { n:68, ar:'القلم',       en:'Al-Qalam',         ayahs:52,  type:'مكية',  juz:29 },
  { n:69, ar:'الحاقة',      en:'Al-Haqqah',        ayahs:52,  type:'مكية',  juz:29 },
  { n:70, ar:'المعارج',     en:'Al-Maarij',        ayahs:44,  type:'مكية',  juz:29 },
  { n:71, ar:'نوح',         en:'Nuh',              ayahs:28,  type:'مكية',  juz:29 },
  { n:72, ar:'الجن',        en:'Al-Jinn',          ayahs:28,  type:'مكية',  juz:29 },
  { n:73, ar:'المزمل',      en:'Al-Muzzammil',     ayahs:20,  type:'مكية',  juz:29 },
  { n:74, ar:'المدثر',      en:'Al-Muddaththir',   ayahs:56,  type:'مكية',  juz:29 },
  { n:75, ar:'القيامة',     en:'Al-Qiyamah',       ayahs:40,  type:'مكية',  juz:29 },
  { n:76, ar:'الإنسان',     en:'Al-Insan',         ayahs:31,  type:'مدنية', juz:29 },
  { n:77, ar:'المرسلات',    en:'Al-Mursalat',      ayahs:50,  type:'مكية',  juz:29 },
  { n:78, ar:'النبأ',       en:'An-Naba',          ayahs:40,  type:'مكية',  juz:30 },
  { n:79, ar:'النازعات',    en:'An-Naziat',        ayahs:46,  type:'مكية',  juz:30 },
  { n:80, ar:'عبس',         en:'Abasa',            ayahs:42,  type:'مكية',  juz:30 },
  { n:81, ar:'التكوير',     en:'At-Takwir',        ayahs:29,  type:'مكية',  juz:30 },
  { n:82, ar:'الإنفطار',    en:'Al-Infitar',       ayahs:19,  type:'مكية',  juz:30 },
  { n:83, ar:'المطففين',    en:'Al-Mutaffifin',    ayahs:36,  type:'مكية',  juz:30 },
  { n:84, ar:'الإنشقاق',    en:'Al-Inshiqaq',      ayahs:25,  type:'مكية',  juz:30 },
  { n:85, ar:'البروج',      en:'Al-Buruj',         ayahs:22,  type:'مكية',  juz:30 },
  { n:86, ar:'الطارق',      en:'At-Tariq',         ayahs:17,  type:'مكية',  juz:30 },
  { n:87, ar:'الأعلى',      en:'Al-Ala',           ayahs:19,  type:'مكية',  juz:30 },
  { n:88, ar:'الغاشية',     en:'Al-Ghashiyah',     ayahs:26,  type:'مكية',  juz:30 },
  { n:89, ar:'الفجر',       en:'Al-Fajr',          ayahs:30,  type:'مكية',  juz:30 },
  { n:90, ar:'البلد',       en:'Al-Balad',         ayahs:20,  type:'مكية',  juz:30 },
  { n:91, ar:'الشمس',       en:'Ash-Shams',        ayahs:15,  type:'مكية',  juz:30 },
  { n:92, ar:'الليل',       en:'Al-Layl',          ayahs:21,  type:'مكية',  juz:30 },
  { n:93, ar:'الضحى',       en:'Ad-Duha',          ayahs:11,  type:'مكية',  juz:30 },
  { n:94, ar:'الشرح',       en:'Ash-Sharh',        ayahs:8,   type:'مكية',  juz:30 },
  { n:95, ar:'التين',       en:'At-Tin',           ayahs:8,   type:'مكية',  juz:30 },
  { n:96, ar:'العلق',       en:'Al-Alaq',          ayahs:19,  type:'مكية',  juz:30 },
  { n:97, ar:'القدر',       en:'Al-Qadr',          ayahs:5,   type:'مكية',  juz:30 },
  { n:98, ar:'البينة',      en:'Al-Bayyinah',      ayahs:8,   type:'مدنية', juz:30 },
  { n:99, ar:'الزلزلة',     en:'Az-Zalzalah',      ayahs:8,   type:'مدنية', juz:30 },
  { n:100,ar:'العاديات',    en:'Al-Adiyat',        ayahs:11,  type:'مكية',  juz:30 },
  { n:101,ar:'القارعة',     en:'Al-Qariah',        ayahs:11,  type:'مكية',  juz:30 },
  { n:102,ar:'التكاثر',     en:'At-Takathur',      ayahs:8,   type:'مكية',  juz:30 },
  { n:103,ar:'العصر',       en:'Al-Asr',           ayahs:3,   type:'مكية',  juz:30 },
  { n:104,ar:'الهمزة',      en:'Al-Humazah',       ayahs:9,   type:'مكية',  juz:30 },
  { n:105,ar:'الفيل',       en:'Al-Fil',           ayahs:5,   type:'مكية',  juz:30 },
  { n:106,ar:'قريش',        en:'Quraysh',          ayahs:4,   type:'مكية',  juz:30 },
  { n:107,ar:'الماعون',     en:'Al-Maun',          ayahs:7,   type:'مكية',  juz:30 },
  { n:108,ar:'الكوثر',      en:'Al-Kawthar',       ayahs:3,   type:'مكية',  juz:30 },
  { n:109,ar:'الكافرون',    en:'Al-Kafirun',       ayahs:6,   type:'مكية',  juz:30 },
  { n:110,ar:'النصر',       en:'An-Nasr',          ayahs:3,   type:'مدنية', juz:30 },
  { n:111,ar:'المسد',       en:'Al-Masad',         ayahs:5,   type:'مكية',  juz:30 },
  { n:112,ar:'الإخلاص',     en:'Al-Ikhlas',        ayahs:4,   type:'مكية',  juz:30 },
  { n:113,ar:'الفلق',       en:'Al-Falaq',         ayahs:5,   type:'مكية',  juz:30 },
  { n:114,ar:'الناس',       en:'An-Nas',           ayahs:6,   type:'مكية',  juz:30 },
];

/* نظام ألوان السور — دورة 6 ألوان */
const SURAH_PALETTES = [
  { bg: C.TEAL,  bd: C.TEAL2,  ac: C.TEAL3,  lt: C.TW },
  { bg: C.G2,    bd: C.G3,     ac: C.G5,     lt: '#fff8e8' },
  { bg: C.BLUE,  bd: C.BLUE2,  ac: C.BLUE3,  lt: C.TW },
  { bg: C.PURP,  bd: C.PURP2,  ac: C.PURP3,  lt: C.TW },
  { bg: C.COPP,  bd: C.COPP2,  ac: C.COPP3,  lt: C.TW },
  { bg: C.OLIV,  bd: C.OLIV2,  ac: C.OLIV3,  lt: C.TW },
  { bg: C.ROSE,  bd: C.ROSE2,  ac: C.ROSE3,  lt: C.TW },
];

/* السور المتاحة حالياً */
const AVAILABLE = new Set([2]);

/* الأجزاء */
const JUZ_STARTS = [1,21,40,58,77,97,113,128,148,168,188,202,212,222,228,235,248,256,264,272,280,287,292,298,304,314,322,330,337,343,348,354,359,363,367,371,375,379,382,384,387,390,392,395,397,399,402,404,406,408,410,413,415,418,420,422,424,426,428,430,432,434,436,438,440,442,444,446,448,450,452,454,456,458,460,462,464,466,468,470,472,474,476,478,480,482,484,486,488,490,492,494,496,498,500,502,503,504,505,506,507,508,509,510,511,512,513,514];

/* تحويل رقم إلى عربي */
function toArabicNum(n) {
  return String(n).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
}

/* مكوّن بطاقة السورة مع animation ظهور */
function SurahCard({ surah, index, visible }) {
  const nav = useNavigate();
  const p = SURAH_PALETTES[(surah.n - 1) % SURAH_PALETTES.length];
  const avail = AVAILABLE.has(surah.n);

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
        padding: '0',
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
        borderBottom: `1px solid rgba(255,255,255,0.20)`,
        padding: '10px 12px 8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        direction: 'rtl',
      }}>
        {/* رقم السورة */}
        <div style={{
          width: 32, height: 32,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.22)',
          border: `1.5px solid rgba(255,255,255,0.40)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Amiri, serif',
          fontSize: '0.82rem',
          fontWeight: 700,
          color: p.lt,
          flexShrink: 0,
        }}>
          {toArabicNum(surah.n)}
        </div>

        {/* نوع السورة */}
        <span style={{
          fontSize: '0.68rem',
          fontFamily: 'Noto Naskh Arabic, serif',
          fontWeight: 700,
          color: surah.type === 'مكية' ? 'rgba(255,240,180,0.95)' : 'rgba(180,255,240,0.95)',
          background: surah.type === 'مكية' ? 'rgba(150,80,0,0.35)' : 'rgba(0,100,80,0.35)',
          border: `1px solid ${surah.type === 'مكية' ? 'rgba(255,200,50,0.40)' : 'rgba(100,255,200,0.40)'}`,
          borderRadius: 20, padding: '2px 8px',
        }}>
          {surah.type}
        </span>
      </div>

      {/* جسم البطاقة */}
      <div style={{ padding: '12px 12px 14px', direction: 'rtl', textAlign: 'right' }}>
        {/* اسم السورة */}
        <div style={{
          fontFamily: 'Amiri, serif',
          fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
          fontWeight: 700,
          color: p.lt,
          marginBottom: 4,
          lineHeight: 1.3,
          textShadow: '0 1px 4px rgba(0,0,0,0.25)',
        }}>
          {surah.ar}
        </div>

        {/* اسم بالإنجليزية */}
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.72rem',
          color: 'rgba(255,255,255,0.70)',
          marginBottom: 10,
          direction: 'ltr',
          textAlign: 'left',
        }}>
          {surah.en}
        </div>

        {/* عدد الآيات والجزء */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            fontSize: '0.72rem',
            fontFamily: 'Noto Naskh Arabic, serif',
            color: 'rgba(255,255,255,0.70)',
          }}>
            ج {toArabicNum(surah.juz)}
          </span>
          <span style={{
            fontSize: '0.75rem',
            fontFamily: 'Noto Naskh Arabic, serif',
            color: p.ac === C.G5 ? '#ffe88a' : 'rgba(255,255,255,0.85)',
            fontWeight: 700,
          }}>
            {toArabicNum(surah.ayahs)} آية
          </span>
        </div>
      </div>

      {/* شارة "متاح" */}
      {avail && (
        <div style={{
          position: 'absolute',
          top: 0, right: 0,
          background: `linear-gradient(135deg, ${C.G5}, ${C.G6})`,
          color: '#2a1000',
          fontSize: '0.62rem',
          fontWeight: 800,
          fontFamily: 'Noto Naskh Arabic, serif',
          padding: '3px 9px',
          borderRadius: '0 14px 0 10px',
        }}>
          متاح
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SVG نقش هندسي بسيط
══════════════════════════════════════════════════════ */
function GeomBg() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      xmlns="http://www.w3.org/2000/svg">
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
   المكوّن الرئيسي — صفحة فهرس السور
══════════════════════════════════════════════════════ */
export default function SurahIndex({ lang, onLangChange }) {
  const nav = useNavigate();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');   // all | makki | madani
  const [juzFilter, setJuzFilter] = useState(0); // 0 = الكل
  const [visible, setVisible] = useState(false);
  const [rowsVisible, setRowsVisible] = useState(new Set());
  const gridRef = useRef(null);

  /* إظهار تدريجي للشبكة */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* IntersectionObserver لظهور الصفوف عند التمرير */
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('[data-idx]');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setRowsVisible(prev => new Set([...prev, +e.target.dataset.idx]));
        }
      });
    }, { threshold: 0.05 });
    cards.forEach(c => obs.observe(c));
    return () => obs.disconnect();
  }, [query, filter, juzFilter]);

  /* تصفية السور */
  const filtered = SURAHS.filter(s => {
    const matchQ = !query.trim() ||
      s.ar.includes(query) ||
      s.en.toLowerCase().includes(query.toLowerCase()) ||
      String(s.n).includes(query);
    const matchF = filter === 'all' ||
      (filter === 'makki'  && s.type === 'مكية') ||
      (filter === 'madani' && s.type === 'مدنية');
    const matchJ = juzFilter === 0 || s.juz === juzFilter;
    return matchQ && matchF && matchJ;
  });

  const LANGS = [
    { code:'ar', label:'العربية', flag:'🇸🇦' },
    { code:'en', label:'English', flag:'🇬🇧' },
    { code:'ur', label:'اردو',    flag:'🇵🇰' },
    { code:'id', label:'Bahasa',  flag:'🇮🇩' },
    { code:'tr', label:'Türkçe',  flag:'🇹🇷' },
  ];

  return (
    <div style={{ background: C.BG, minHeight: '100vh', direction: 'rtl', position: 'relative' }}>

      {/* ══ CSS animations ══ */}
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
          {LANGS.map(l => (
            <button key={l.code} onClick={() => onLangChange && onLangChange(l.code)} style={{
              background: lang === l.code ? `linear-gradient(135deg,${C.G3},${C.G5},${C.G6})` : 'transparent',
              color: lang === l.code ? '#2a1000' : C.TXT2,
              border: `1.5px solid ${lang === l.code ? C.G4 : C.BD2}`,
              borderRadius: 20, padding: '3px 14px',
              fontSize: '0.83rem', fontWeight: 700, cursor: 'pointer',
              fontFamily: ['ar','ur'].includes(l.code) ? 'Noto Naskh Arabic,serif' : 'Inter,sans-serif',
              display: 'flex', alignItems: 'center', gap: 5,
              transition: 'all .2s',
            }}>
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
              onClick={() => nav('/')}>
              <div style={{
                width: 52, height: 52, borderRadius: '50% 50% 10px 10px',
                border: `2px solid ${C.G4}80`, overflow: 'hidden', background: C.CARD,
                boxShadow: `0 0 16px ${C.G4}30`,
              }}>
                <img src="/logo.png" alt="Logo"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
              </div>
              <div dir="rtl">
                <div style={{
                  fontFamily: 'Amiri,serif', fontSize: '1.15rem', fontWeight: 700,
                  background: `linear-gradient(135deg,${C.G2},${C.G4},${C.G3})`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>فيوض التأويل المعاصر</div>
                <div style={{ fontSize: '0.74rem', color: C.TXT3, fontFamily: 'Noto Naskh Arabic,serif' }}>
                  فهرس السور القرآنية
                </div>
              </div>
            </div>

            {/* ناف */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button onClick={() => nav('/')} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: C.GLOW2, border: `1.5px solid ${C.BD2}`,
                borderRadius: 10, padding: '8px 18px',
                color: C.TXT2, fontSize: '0.88rem', fontWeight: 700,
                fontFamily: 'Noto Naskh Arabic,serif', cursor: 'pointer',
                transition: 'all .2s',
              }}
              onMouseEnter={e=>{e.currentTarget.style.background=`linear-gradient(135deg,${C.G3},${C.G5})`;e.currentTarget.style.color='#2a1000';}}
              onMouseLeave={e=>{e.currentTarget.style.background=C.GLOW2;e.currentTarget.style.color=C.TXT2;}}>
                <Home size={15}/> الرئيسية
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* ══ HERO BANNER ══ */}
      <div style={{
        position: 'relative',
        background: `linear-gradient(160deg, #1a0d00 0%, #2a1800 40%, #1a0d00 100%)`,
        overflow: 'hidden',
        padding: '52px 26px 46px',
        textAlign: 'center',
        animation: 'fadeSlideDown 0.6s ease',
      }}>
        {/* صورة إسلامية */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/bg_islamic.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.22,
        }}/>
        {/* تدرج */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse 70% 70% at 50% 50%, transparent 0%, rgba(15,8,0,0.55) 100%)`,
        }}/>
        {/* نقوش */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <GeomBg/>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(20,10,0,0.55)',
            border: `1.5px solid ${C.G6}b0`,
            borderRadius: 14, padding: '10px 40px',
            marginBottom: 20,
            backdropFilter: 'blur(10px)',
          }}>
            <p style={{
              fontFamily: 'Amiri,serif', fontSize: 'clamp(1.1rem,2.2vw,1.6rem)',
              color: C.G7, margin: 0, letterSpacing: '.06em',
            }}>
              ﴿ إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ ﴾
            </p>
          </div>
          <h1 style={{
            fontFamily: 'Amiri,serif',
            fontSize: 'clamp(2rem,4.5vw,3.4rem)',
            fontWeight: 700, margin: '0 0 10px',
            background: `linear-gradient(135deg,${C.G5} 0%,${C.G7} 35%,#ffffff 52%,${C.G7} 70%,${C.G5} 100%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: `drop-shadow(0 0 30px ${C.G5}70)`,
          }}>
            فهرس سور القرآن الكريم
          </h1>
          <p style={{
            fontFamily: 'Noto Naskh Arabic,serif',
            fontSize: 'clamp(0.88rem,1.5vw,1.05rem)',
            color: 'rgba(255,248,220,0.88)', margin: '0 auto',
            maxWidth: 520, lineHeight: 1.9,
          }}>
            ١١٤ سورة · ٦٢٣٦ آية · ثلاثون جزءاً
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

          {/* صف واحد: بحث + فلاتر */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', direction: 'rtl' }}>

            {/* حقل البحث */}
            <div style={{
              flex: '1 1 240px',
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.65)',
              border: `1.5px solid ${C.BD3}`,
              borderRadius: 12, padding: '9px 14px',
            }}>
              <Search size={18} color={C.G3}/>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="ابحث بالاسم أو الرقم..."
                dir="rtl"
                style={{
                  flex: 1, background: 'transparent', border: 'none', outline: 'none',
                  color: C.TXT, fontSize: '0.94rem', fontFamily: 'Noto Naskh Arabic,serif',
                }}
              />
            </div>

            {/* نوع السورة */}
            {[['all','الكل'],['makki','مكية'],['madani','مدنية']].map(([v,l]) => (
              <button key={v} onClick={() => setFilter(v)} style={{
                background: filter === v ? `linear-gradient(135deg,${C.G3},${C.G5})` : 'rgba(255,255,255,0.55)',
                color: filter === v ? '#2a1000' : C.TXT2,
                border: `1.5px solid ${filter === v ? C.G4 : C.BD2}`,
                borderRadius: 10, padding: '8px 18px',
                fontSize: '0.88rem', fontWeight: 700,
                fontFamily: 'Noto Naskh Arabic,serif', cursor: 'pointer',
                transition: 'all .18s',
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
                fontFamily: 'Noto Naskh Arabic,serif', cursor: 'pointer',
                outline: 'none',
              }}
            >
              <option value={0}>جميع الأجزاء</option>
              {Array.from({length:30},(_,i)=>i+1).map(j=>(
                <option key={j} value={j}>الجزء {j}</option>
              ))}
            </select>

            {/* عداد النتائج */}
            <span style={{
              fontSize: '0.82rem', color: C.TXT3,
              fontFamily: 'Noto Naskh Arabic,serif',
              marginRight: 'auto',
            }}>
              {toArabicNum(filtered.length)} سورة
            </span>
          </div>
        </div>
      </div>

      {/* ══ شبكة السور ══ */}
      <div style={{
        maxWidth: 1260, margin: '0 auto',
        padding: '36px 22px 60px',
        position: 'relative',
      }}>
        <GeomBg/>

        <GoldDivider/>

        {filtered.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px 20px',
            color: C.TXT3, fontFamily: 'Noto Naskh Arabic,serif',
            fontSize: '1.1rem',
          }}>
            لا نتائج مطابقة — جرّب بحثاً مختلفاً
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
                />
              </div>
            ))}
          </div>
        )}

        {/* ملاحظة السور غير المتاحة */}
        <div style={{
          marginTop: 48, textAlign: 'center',
          padding: '20px 28px',
          background: 'rgba(255,255,255,0.45)',
          border: `1.5px solid ${C.BD2}`,
          borderRadius: 16,
          backdropFilter: 'blur(8px)',
        }}>
          <p style={{
            fontFamily: 'Noto Naskh Arabic,serif',
            fontSize: '0.92rem', color: C.TXT3, lineHeight: 2.0, margin: 0,
          }}>
            <span style={{ color: C.G2, fontWeight: 700 }}>متاح حالياً:</span> سورة البقرة كاملة (٢٨٦ آية) ·
            <span style={{ color: C.G2, fontWeight: 700 }}> قريباً:</span> باقي سور القرآن الكريم
          </p>
        </div>
      </div>

      {/* footer */}
      <div style={{
        background: `linear-gradient(180deg,${C.BG2},${C.BG3 || C.BG2})`,
        borderTop: `1px solid ${C.BD2}`,
        padding: '24px 26px', textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'Noto Naskh Arabic,serif',
          fontSize: '0.80rem', color: C.TXT3, margin: 0,
        }}>
          © ١٤٤٦ هـ · فيوض التأويل المعاصر · جميع الحقوق محفوظة
        </p>
      </div>
    </div>
  );
}
