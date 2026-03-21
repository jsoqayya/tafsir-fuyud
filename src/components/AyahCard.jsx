import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

// Theme configuration للبطاقة الرئيسية
const THEME_CONFIG = {
  mercy: {
    border: 'border-l-4 border-green-400',
    badge: 'bg-green-100 text-green-700',
    label: 'رحمة وهداية',
    headerBg: 'bg-green-400',
    darkBorder: 'border-green-600',
  },
  punishment: {
    border: 'border-l-4 border-orange-400',
    badge: 'bg-orange-100 text-orange-700',
    label: 'عذاب وإنذار',
    headerBg: 'bg-orange-400',
    darkBorder: 'border-orange-600',
  },
  rulings: {
    border: 'border-l-4 border-blue-400',
    badge: 'bg-blue-100 text-blue-700',
    label: 'أحكام وتشريع',
    headerBg: 'bg-blue-400',
    darkBorder: 'border-blue-600',
  },
  general: {
    border: 'border-l-4 border-teal-400',
    badge: 'bg-teal-100 text-teal-700',
    label: 'سياق عام',
    headerBg: 'bg-teal-400',
    darkBorder: 'border-teal-600',
  },
};

// ألوان الفيوض — خفيفة رسمية بـ inline styles مضمونة
const FUYUD_CONFIG = [
  {
    key: 'context',
    label: 'السياق العام',
    icon: '🌐',
    bgLight: '#e0f2fe',       // أزرق سماوي فاتح جداً
    borderLight: '#7dd3fc',   // sky-300
    titleLight: '#0369a1',    // sky-700
    bgDark: '#0c2a3f',
    borderDark: '#38bdf8',
    titleDark: '#bae6fd',
  },
  {
    key: 'bayani',
    label: 'الفيوض البيانية',
    icon: '✒️',
    bgLight: '#ede9fe',       // بنفسجي فاتح جداً
    borderLight: '#c4b5fd',   // violet-300
    titleLight: '#6d28d9',    // violet-700
    bgDark: '#1e1040',
    borderDark: '#a78bfa',
    titleDark: '#ddd6fe',
  },
  {
    key: 'taweeli',
    label: 'الفيوض التأويلية والتدبرية',
    icon: '📖',
    bgLight: '#fef9c3',       // أصفر ذهبي فاتح جداً
    borderLight: '#fde047',   // yellow-300
    titleLight: '#b45309',    // amber-700
    bgDark: '#2d1f00',
    borderDark: '#fbbf24',
    titleDark: '#fef3c7',
  },
  {
    key: 'ruhani',
    label: 'الفيوض الروحانية',
    icon: '💫',
    bgLight: '#d1fae5',       // أخضر زمردي فاتح جداً
    borderLight: '#6ee7b7',   // emerald-300
    titleLight: '#047857',    // emerald-700
    bgDark: '#012a1a',
    borderDark: '#34d399',
    titleDark: '#a7f3d0',
  },
  {
    key: 'nafsi',
    label: 'الفيوض النفسية',
    icon: '🧠',
    bgLight: '#ffe4e6',       // وردي فاتح جداً
    borderLight: '#fda4af',   // rose-300
    titleLight: '#be123c',    // rose-700
    bgDark: '#2d0a12',
    borderDark: '#fb7185',
    titleDark: '#fecdd3',
  },
  {
    key: 'tarbawi',
    label: 'الفيوض التربوية',
    icon: '🌱',
    bgLight: '#ffedd5',       // برتقالي فاتح جداً
    borderLight: '#fdba74',   // orange-300
    titleLight: '#c2410c',    // orange-700
    bgDark: '#2d1000',
    borderDark: '#fb923c',
    titleDark: '#fed7aa',
  },
  {
    key: 'muasir',
    label: 'الفيوض المعاصرة',
    icon: '🌍',
    bgLight: '#cffafe',       // فيروزي فاتح جداً
    borderLight: '#67e8f9',   // cyan-300
    titleLight: '#0e7490',    // cyan-700
    bgDark: '#012030',
    borderDark: '#22d3ee',
    titleDark: '#a5f3fc',
  },
];

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
      title="نسخ"
    >
      {copied ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
    </button>
  );
}

function FaydBox({ config, text, darkMode }) {
  if (!text) return null;

  const bg     = darkMode ? config.bgDark     : config.bgLight;
  const border = darkMode ? config.borderDark : config.borderLight;
  const title  = darkMode ? config.titleDark  : config.titleLight;

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
      {/* رأس المستطيل — العنوان من اليمين */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '0.75rem',
        direction: 'rtl',
      }}>
        {/* يمين: أيقونة + عنوان */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.4rem' }}>{config.icon}</span>
          <h4
            style={{
              fontFamily: 'Noto Naskh Arabic, serif',
              fontSize: '1.2rem',
              fontWeight: '800',
              color: title,
              margin: 0,
            }}
          >
            {config.label}
          </h4>
        </div>
        {/* يسار: زر نسخ */}
        <CopyButton text={text} />
      </div>

      {/* خط فاصل */}
      <div style={{ borderTop: `1px solid ${border}`, marginBottom: '0.75rem', opacity: 0.5 }} />

      {/* نص التفسير */}
      <p
        style={{
          fontFamily: 'Noto Naskh Arabic, serif',
          fontSize: '1rem',
          fontWeight: '700',
          lineHeight: '2.3rem',
          direction: 'rtl',
          textAlign: 'right',
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

export default function AyahCard({ ayah, apiText, language, darkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = THEME_CONFIG[ayah.theme] || THEME_CONFIG.general;
  const displayText = apiText || ayah.ayah_text;

  return (
    <div
      className={`rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden mb-4 
        ${darkMode ? `bg-gray-800 ${theme.darkBorder}` : `bg-white ${theme.border}`}
        border border-transparent hover:-translate-y-0.5`}
    >
      {/* رأس البطاقة */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-right p-5 flex items-start justify-between gap-4 group"
      >
        <div className="flex flex-col items-center gap-2 shrink-0">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm ${theme.headerBg}`}>
            {ayah.id}
          </div>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${theme.badge}`}
            style={{ fontFamily: 'Noto Naskh Arabic, serif' }}
          >
            {theme.label}
          </span>
        </div>

        <div className="flex-1 text-right" dir="rtl">
          <p
            className={`leading-[2.8rem] text-xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}
            style={{ fontFamily: 'Amiri, serif' }}
          >
            {displayText}
          </p>
          {apiText && (
            <span className="text-[10px] text-emerald-500 font-medium">✓ نص موثّق من API</span>
          )}
        </div>

        <div className={`shrink-0 mt-1 p-1.5 rounded-full transition-all ${isOpen ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {/* محتوى الفيوض */}
      {isOpen && (
        <div
          className={`border-t px-5 pb-5 pt-4 ${darkMode ? 'border-gray-700 bg-gray-800/80' : 'border-gray-100 bg-gray-50/60'}`}
          dir="rtl"
        >
          <h3
            className={`text-sm font-bold mb-4 text-center ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}
            style={{ fontFamily: 'Noto Naskh Arabic, serif' }}
          >
            ✦ فيوض التفسير ✦
          </h3>

          {FUYUD_CONFIG.map((config) => (
            <FaydBox
              key={config.key}
              config={config}
              text={ayah.fuyud?.[config.key]}
              darkMode={darkMode}
            />
          ))}
        </div>
      )}
    </div>
  );
}
