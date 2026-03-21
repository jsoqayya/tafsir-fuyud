import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

// Theme configuration للبطاقة الرئيسية
const THEME_CONFIG = {
  mercy: {
    border: 'border-l-4 border-green-500',
    badge: 'bg-green-100 text-green-800',
    label: 'رحمة وهداية',
    headerBg: 'bg-green-500',
    darkBorder: 'border-green-700',
  },
  punishment: {
    border: 'border-l-4 border-orange-500',
    badge: 'bg-orange-100 text-orange-800',
    label: 'عذاب وإنذار',
    headerBg: 'bg-orange-500',
    darkBorder: 'border-orange-700',
  },
  rulings: {
    border: 'border-l-4 border-blue-500',
    badge: 'bg-blue-100 text-blue-800',
    label: 'أحكام وتشريع',
    headerBg: 'bg-blue-500',
    darkBorder: 'border-blue-700',
  },
  general: {
    border: 'border-l-4 border-teal-500',
    badge: 'bg-teal-100 text-teal-800',
    label: 'سياق عام',
    headerBg: 'bg-teal-500',
    darkBorder: 'border-teal-700',
  },
};

// ألوان كل فيض — inline styles مباشرة مضمونة 100%
const FUYUD_CONFIG = [
  {
    key: 'context',
    label: 'السياق العام',
    icon: '🌐',
    bgLight: '#bae6fd',       // sky-200
    borderLight: '#0ea5e9',   // sky-500
    titleLight: '#0c4a6e',    // sky-900
    bgDark: '#0c4a6e',
    borderDark: '#38bdf8',
    titleDark: '#e0f2fe',
  },
  {
    key: 'bayani',
    label: 'الفيوض البيانية',
    icon: '✒️',
    bgLight: '#ddd6fe',       // violet-200
    borderLight: '#8b5cf6',   // violet-500
    titleLight: '#2e1065',    // violet-900
    bgDark: '#2e1065',
    borderDark: '#a78bfa',
    titleDark: '#ede9fe',
  },
  {
    key: 'taweeli',
    label: 'الفيوض التأويلية والتدبرية',
    icon: '📖',
    bgLight: '#fde68a',       // amber-200
    borderLight: '#f59e0b',   // amber-500
    titleLight: '#451a03',    // amber-900
    bgDark: '#451a03',
    borderDark: '#fbbf24',
    titleDark: '#fef3c7',
  },
  {
    key: 'ruhani',
    label: 'الفيوض الروحانية',
    icon: '💫',
    bgLight: '#a7f3d0',       // emerald-200
    borderLight: '#10b981',   // emerald-500
    titleLight: '#064e3b',    // emerald-900
    bgDark: '#064e3b',
    borderDark: '#34d399',
    titleDark: '#d1fae5',
  },
  {
    key: 'nafsi',
    label: 'الفيوض النفسية',
    icon: '🧠',
    bgLight: '#fecdd3',       // rose-200
    borderLight: '#f43f5e',   // rose-500
    titleLight: '#4c0519',    // rose-900
    bgDark: '#4c0519',
    borderDark: '#fb7185',
    titleDark: '#ffe4e6',
  },
  {
    key: 'tarbawi',
    label: 'الفيوض التربوية',
    icon: '🌱',
    bgLight: '#fed7aa',       // orange-200
    borderLight: '#f97316',   // orange-500
    titleLight: '#431407',    // orange-900
    bgDark: '#431407',
    borderDark: '#fb923c',
    titleDark: '#ffedd5',
  },
  {
    key: 'muasir',
    label: 'الفيوض المعاصرة',
    icon: '🌍',
    bgLight: '#a5f3fc',       // cyan-200
    borderLight: '#06b6d4',   // cyan-500
    titleLight: '#083344',    // cyan-900
    bgDark: '#083344',
    borderDark: '#22d3ee',
    titleDark: '#cffafe',
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
      {/* رأس: أيقونة + عنوان + نسخ */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <CopyButton text={text} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <h4
            style={{
              fontFamily: 'Noto Naskh Arabic, serif',
              fontSize: '1.25rem',
              fontWeight: '800',
              color: title,
              margin: 0,
            }}
          >
            {config.label}
          </h4>
          <span style={{ fontSize: '1.5rem' }}>{config.icon}</span>
        </div>
      </div>

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
