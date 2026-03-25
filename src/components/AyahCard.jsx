import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

// ===== Theme for ayah card border/badge =====
const THEME_CONFIG = {
  mercy: {
    border: 'border-l-4 border-green-400',
    badge: 'bg-green-100 text-green-700',
    headerBg: 'bg-green-400',
    darkBorder: 'border-green-600',
    labels: { ar: 'رحمة وهداية', en: 'Mercy & Guidance', ur: 'رحمت اور ہدایت', id: 'Rahmat & Petunjuk', tr: 'Rahmet & Hidayet' },
  },
  punishment: {
    border: 'border-l-4 border-orange-400',
    badge: 'bg-orange-100 text-orange-700',
    headerBg: 'bg-orange-400',
    darkBorder: 'border-orange-600',
    labels: { ar: 'عذاب وإنذار', en: 'Warning & Punishment', ur: 'عذاب اور انتباہ', id: 'Azab & Peringatan', tr: 'Azap & Uyarı' },
  },
  rulings: {
    border: 'border-l-4 border-blue-400',
    badge: 'bg-blue-100 text-blue-700',
    headerBg: 'bg-blue-400',
    darkBorder: 'border-blue-600',
    labels: { ar: 'أحكام وتشريع', en: 'Laws & Legislation', ur: 'احکام و تشریع', id: 'Hukum & Legislasi', tr: 'Hükümler & Şeriat' },
  },
  general: {
    border: 'border-l-4 border-teal-400',
    badge: 'bg-teal-100 text-teal-700',
    headerBg: 'bg-teal-400',
    darkBorder: 'border-teal-600',
    labels: { ar: 'سياق عام', en: 'General Context', ur: 'عمومی سیاق', id: 'Konteks Umum', tr: 'Genel Bağlam' },
  },
};

// ===== Fuyud section labels (multilingual) =====
const FUYUD_LABELS = {
  context:  { ar: 'السياق العام',              en: 'General Context',              ur: 'عمومی سیاق',               id: 'Konteks Umum',               tr: 'Genel Bağlam' },
  bayani:   { ar: 'الفيوض البيانية',           en: 'Rhetorical Insights',          ur: 'بیانی فیوض',               id: 'Wawasan Retorika',           tr: 'Beyan Feyzleri' },
  taweeli:  { ar: 'الفيوض التأويلية والتدبرية', en: 'Interpretive & Reflective Insights', ur: 'تاویلی و تدبری فیوض',  id: 'Wawasan Tafsir & Tadabbur', tr: 'Te\'vil & Tedebbür Feyzleri' },
  ruhani:   { ar: 'الفيوض الروحانية',          en: 'Spiritual Insights',           ur: 'روحانی فیوض',              id: 'Wawasan Spiritual',          tr: 'Manevi Feyzler' },
  nafsi:    { ar: 'الفيوض النفسية',            en: 'Psychological Insights',       ur: 'نفسیاتی فیوض',             id: 'Wawasan Psikologis',         tr: 'Psikolojik Feyzler' },
  tarbawi:  { ar: 'الفيوض التربوية',           en: 'Educational Insights',         ur: 'تربوی فیوض',               id: 'Wawasan Pendidikan',         tr: 'Eğitsel Feyzler' },
  muasir:   { ar: 'الفيوض المعاصرة',           en: 'Contemporary Insights',        ur: 'معاصر فیوض',               id: 'Wawasan Kontemporer',        tr: 'Çağdaş Feyzler' },
};

// ===== Section header title =====
const FUYUD_TITLE = {
  ar: '✦ فيوض التفسير ✦',
  en: '✦ Interpretive Insights ✦',
  ur: '✦ تفسیری فیوض ✦',
  id: '✦ Wawasan Tafsir ✦',
  tr: '✦ Tefsir Feyzleri ✦',
};

// ===== Fuyud colour palette =====
const FUYUD_CONFIG = [
  {
    key: 'context',
    icon: '🌐',
    bgLight: '#e0f2fe', borderLight: '#7dd3fc', titleLight: '#0369a1',
    bgDark: '#0c2a3f',  borderDark: '#38bdf8',  titleDark: '#bae6fd',
  },
  {
    key: 'bayani',
    icon: '✒️',
    bgLight: '#ede9fe', borderLight: '#c4b5fd', titleLight: '#6d28d9',
    bgDark: '#1e1040',  borderDark: '#a78bfa',  titleDark: '#ddd6fe',
  },
  {
    key: 'taweeli',
    icon: '📖',
    bgLight: '#fef9c3', borderLight: '#fde047', titleLight: '#b45309',
    bgDark: '#2d1f00',  borderDark: '#fbbf24',  titleDark: '#fef3c7',
  },
  {
    key: 'ruhani',
    icon: '💫',
    bgLight: '#d1fae5', borderLight: '#6ee7b7', titleLight: '#047857',
    bgDark: '#012a1a',  borderDark: '#34d399',  titleDark: '#a7f3d0',
  },
  {
    key: 'nafsi',
    icon: '🧠',
    bgLight: '#ffe4e6', borderLight: '#fda4af', titleLight: '#be123c',
    bgDark: '#2d0a12',  borderDark: '#fb7185',  titleDark: '#fecdd3',
  },
  {
    key: 'tarbawi',
    icon: '🌱',
    bgLight: '#ffedd5', borderLight: '#fdba74', titleLight: '#c2410c',
    bgDark: '#2d1000',  borderDark: '#fb923c',  titleDark: '#fed7aa',
  },
  {
    key: 'muasir',
    icon: '🌍',
    bgLight: '#cffafe', borderLight: '#67e8f9', titleLight: '#0e7490',
    bgDark: '#012030',  borderDark: '#22d3ee',  titleDark: '#a5f3fc',
  },
];

// ===== Helpers =====
const RTL_LANGS = ['ar', 'ur'];

function isRTL(lang) {
  return RTL_LANGS.includes(lang);
}

function bodyFont(lang) {
  if (lang === 'ar' || lang === 'ur') return 'Noto Naskh Arabic, serif';
  if (lang === 'tr' || lang === 'id') return 'Inter, sans-serif';
  return 'Georgia, serif';
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-lg hover:bg-white/60 transition-colors text-gray-400 hover:text-gray-600"
      title="Copy"
    >
      {copied ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
    </button>
  );
}

// Extract text for the current language, fall back to Arabic
function extractText(value, language) {
  if (!value) return null;
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    return value[language] || value['ar'] || Object.values(value)[0] || null;
  }
  return null;
}

// ===== FaydBox — single fuyud section =====
function FaydBox({ config, text, darkMode, lang }) {
  if (!text) return null;

  const bg     = darkMode ? config.bgDark     : config.bgLight;
  const border = darkMode ? config.borderDark : config.borderLight;
  const title  = darkMode ? config.titleDark  : config.titleLight;
  const dir    = isRTL(lang) ? 'rtl' : 'ltr';
  const align  = isRTL(lang) ? 'right' : 'left';
  const font   = bodyFont(lang);
  const label  = FUYUD_LABELS[config.key]?.[lang] || FUYUD_LABELS[config.key]?.['ar'] || config.key;

  return (
    <div
      style={{
        backgroundColor: bg,
        border: `2px solid ${border}`,
        borderRadius: '0.75rem',
        padding: '1.25rem',
        marginBottom: '1rem',
      }}
    >
      {/* Header row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '0.75rem',
        direction: dir,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.4rem' }}>{config.icon}</span>
          <h4
            style={{
              fontFamily: isRTL(lang) ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif',
              fontSize: '1.05rem',
              fontWeight: '800',
              color: title,
              margin: 0,
            }}
          >
            {label}
          </h4>
        </div>
        <CopyButton text={text} />
      </div>

      {/* Divider */}
      <div style={{ borderTop: `1px solid ${border}`, marginBottom: '0.75rem', opacity: 0.5 }} />

      {/* Body text */}
      <p
        style={{
          fontFamily: font,
          fontSize: isRTL(lang) ? '1rem' : '0.95rem',
          fontWeight: isRTL(lang) ? '700' : '400',
          lineHeight: isRTL(lang) ? '2.3rem' : '1.9rem',
          direction: dir,
          textAlign: align,
          color: darkMode ? '#f1f5f9' : '#1e293b',
          whiteSpace: 'pre-line',
          margin: 0,
        }}
      >
        {text}
      </p>
    </div>
  );
}

// ===== Main AyahCard =====
export default function AyahCard({ ayah, language, darkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = THEME_CONFIG[ayah.theme] || THEME_CONFIG.general;
  const displayText = ayah.ayah_text;
  const lang = language || 'ar';
  const dir  = isRTL(lang) ? 'rtl' : 'ltr';
  const themeLabel = theme.labels?.[lang] || theme.labels?.ar || '';

  // Show verse translation for non-Arabic languages
  const verseTranslation = lang !== 'ar'
    ? extractText(ayah.ayah_translations, lang)
    : null;

  return (
    <div
      className={`rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden mb-4 
        ${darkMode ? `bg-gray-800 ${theme.darkBorder}` : `bg-white ${theme.border}`}
        border border-transparent hover:-translate-y-0.5`}
    >
      {/* Card header — click to toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-start justify-between gap-4 group"
        style={{ textAlign: isRTL(lang) ? 'right' : 'left' }}
      >
        <div className="flex flex-col items-center gap-2 shrink-0">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm ${theme.headerBg}`}>
            {ayah.id}
          </div>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${theme.badge}`}
            style={{ fontFamily: isRTL(lang) ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif' }}
          >
            {themeLabel}
          </span>
        </div>

        <div className="flex-1" dir="rtl">
          {/* Arabic verse text always RTL */}
          <p
            className={`leading-[2.8rem] text-xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}
            style={{ fontFamily: 'Amiri, serif', textAlign: 'right', direction: 'rtl' }}
          >
            {displayText}
          </p>

          {/* Verse translation (non-Arabic languages) */}
          {verseTranslation && (
            <p
              className={`text-sm mt-2 italic ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}
              style={{
                fontFamily: lang === 'ur' ? 'Noto Naskh Arabic, serif' : 'Georgia, serif',
                direction: isRTL(lang) ? 'rtl' : 'ltr',
                textAlign: isRTL(lang) ? 'right' : 'left',
                lineHeight: '1.7',
              }}
            >
              {verseTranslation}
            </p>
          )}
        </div>

        <div className={`shrink-0 mt-1 p-1.5 rounded-full transition-all ${isOpen ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {/* Fuyud sections */}
      {isOpen && (
        <div
          className={`border-t px-5 pb-5 pt-4 ${darkMode ? 'border-gray-700 bg-gray-800/80' : 'border-gray-100 bg-gray-50/60'}`}
          dir={dir}
        >
          <h3
            className={`text-sm font-bold mb-4 text-center ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}
            style={{ fontFamily: isRTL(lang) ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif' }}
          >
            {FUYUD_TITLE[lang] || FUYUD_TITLE['ar']}
          </h3>

          {FUYUD_CONFIG.map((config) => (
            <FaydBox
              key={config.key}
              config={config}
              text={extractText(ayah.fuyud?.[config.key], lang)}
              darkMode={darkMode}
              lang={lang}
            />
          ))}
        </div>
      )}
    </div>
  );
}
