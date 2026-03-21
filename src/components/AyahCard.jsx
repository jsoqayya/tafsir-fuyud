import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

// Theme configuration
const THEME_CONFIG = {
  mercy: {
    border: 'border-l-4 border-green-500',
    bg: 'bg-green-50',
    badge: 'bg-green-100 text-green-800',
    label: 'رحمة وهداية',
    dot: 'bg-green-500',
    headerBg: 'bg-green-500',
    darkBg: 'bg-green-950/30',
    darkBorder: 'border-green-700',
  },
  punishment: {
    border: 'border-l-4 border-orange-500',
    bg: 'bg-orange-50',
    badge: 'bg-orange-100 text-orange-800',
    label: 'عذاب وإنذار',
    dot: 'bg-orange-500',
    headerBg: 'bg-orange-500',
    darkBg: 'bg-orange-950/30',
    darkBorder: 'border-orange-700',
  },
  rulings: {
    border: 'border-l-4 border-blue-500',
    bg: 'bg-blue-50',
    badge: 'bg-blue-100 text-blue-800',
    label: 'أحكام وتشريع',
    dot: 'bg-blue-500',
    headerBg: 'bg-blue-500',
    darkBg: 'bg-blue-950/30',
    darkBorder: 'border-blue-700',
  },
  general: {
    border: 'border-l-4 border-teal-500',
    bg: 'bg-teal-50',
    badge: 'bg-teal-100 text-teal-800',
    label: 'سياق عام',
    dot: 'bg-teal-500',
    headerBg: 'bg-teal-500',
    darkBg: 'bg-teal-950/30',
    darkBorder: 'border-teal-700',
  },
};

// Fuyud sections config — ألوان مستطيلات واضحة وعريضة
const FUYUD_CONFIG = [
  {
    key: 'context',
    label: 'السياق العام',
    labelEn: 'General Context',
    color: 'bg-sky-200 border-2 border-sky-500',
    darkColor: 'bg-sky-900/60 border-2 border-sky-400',
    titleColor: 'text-sky-900',
    titleDarkColor: 'text-sky-200',
    icon: '🌐',
  },
  {
    key: 'bayani',
    label: 'الفيوض البيانية',
    labelEn: 'Linguistic Analysis',
    color: 'bg-violet-200 border-2 border-violet-500',
    darkColor: 'bg-violet-900/60 border-2 border-violet-400',
    titleColor: 'text-violet-900',
    titleDarkColor: 'text-violet-200',
    icon: '✒️',
  },
  {
    key: 'taweeli',
    label: 'الفيوض التأويلية والتدبرية',
    labelEn: 'Interpretive & Contemplative',
    color: 'bg-amber-200 border-2 border-amber-500',
    darkColor: 'bg-amber-900/60 border-2 border-amber-400',
    titleColor: 'text-amber-900',
    titleDarkColor: 'text-amber-200',
    icon: '📖',
  },
  {
    key: 'ruhani',
    label: 'الفيوض الروحانية',
    labelEn: 'Spiritual Insights',
    color: 'bg-emerald-200 border-2 border-emerald-500',
    darkColor: 'bg-emerald-900/60 border-2 border-emerald-400',
    titleColor: 'text-emerald-900',
    titleDarkColor: 'text-emerald-200',
    icon: '💫',
  },
  {
    key: 'nafsi',
    label: 'الفيوض النفسية',
    labelEn: 'Psychological Dimensions',
    color: 'bg-rose-200 border-2 border-rose-500',
    darkColor: 'bg-rose-900/60 border-2 border-rose-400',
    titleColor: 'text-rose-900',
    titleDarkColor: 'text-rose-200',
    icon: '🧠',
  },
  {
    key: 'tarbawi',
    label: 'الفيوض التربوية',
    labelEn: 'Educational Values',
    color: 'bg-orange-200 border-2 border-orange-500',
    darkColor: 'bg-orange-900/60 border-2 border-orange-400',
    titleColor: 'text-orange-900',
    titleDarkColor: 'text-orange-200',
    icon: '🌱',
  },
  {
    key: 'muasir',
    label: 'الفيوض المعاصرة',
    labelEn: 'Contemporary Relevance',
    color: 'bg-cyan-200 border-2 border-cyan-500',
    darkColor: 'bg-cyan-900/60 border-2 border-cyan-400',
    titleColor: 'text-cyan-900',
    titleDarkColor: 'text-cyan-200',
    icon: '🌍',
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
  return (
    <div
      className={`rounded-xl p-5 mb-4 transition-all ${
        darkMode ? config.darkColor : config.color
      }`}
    >
      {/* رأس المستطيل: أيقونة + عنوان كبير + زر نسخ */}
      <div className="flex items-center justify-between mb-3">
        <CopyButton text={text} />
        <div className="flex items-center gap-2">
          <h4
            className={`font-extrabold text-xl ${
              darkMode ? config.titleDarkColor : config.titleColor
            }`}
            style={{ fontFamily: 'Noto Naskh Arabic, serif' }}
          >
            {config.label}
          </h4>
          <span className="text-2xl">{config.icon}</span>
        </div>
      </div>
      {/* نص التفسير — bold كامل */}
      <p
        className={`leading-[2.3rem] text-base font-bold whitespace-pre-line ${
          darkMode ? 'text-gray-100' : 'text-gray-800'
        }`}
        style={{ fontFamily: 'Noto Naskh Arabic, serif', direction: 'rtl', textAlign: 'right' }}
      >
        {text}
      </p>
    </div>
  );
}

export default function AyahCard({ ayah, apiText, language, darkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = THEME_CONFIG[ayah.theme] || THEME_CONFIG.general;

  // Use API text if available, fallback to local ayah_text
  const displayText = apiText || ayah.ayah_text;

  return (
    <div
      className={`rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden mb-4 
        ${darkMode ? `bg-gray-800 ${theme.darkBorder}` : `bg-white ${theme.border}`}
        border border-transparent hover:-translate-y-0.5`}
    >
      {/* Ayah Header — clickable */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-right p-5 flex items-start justify-between gap-4 group"
      >
        {/* Ayah number badge + theme */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm ${theme.headerBg}`}
          >
            {ayah.id}
          </div>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${theme.badge}`}
            style={{ fontFamily: 'Noto Naskh Arabic, serif' }}
          >
            {theme.label}
          </span>
        </div>

        {/* Ayah text */}
        <div className="flex-1 text-right" dir="rtl">
          <p
            className={`leading-[2.8rem] text-xl font-bold ${
              darkMode ? 'text-gray-100' : 'text-gray-800'
            }`}
            style={{ fontFamily: 'Amiri, serif' }}
          >
            {displayText}
          </p>
          {apiText && (
            <span className="text-[10px] text-emerald-500 font-medium">
              ✓ نص موثّق من API
            </span>
          )}
        </div>

        {/* Toggle icon */}
        <div
          className={`shrink-0 mt-1 p-1.5 rounded-full transition-all ${
            isOpen ? 'bg-emerald-100 text-emerald-600 rotate-0' : 'bg-gray-100 text-gray-400'
          }`}
        >
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {/* Dropdown — Tafsir Content */}
      {isOpen && (
        <div
          className={`border-t px-5 pb-5 pt-4 ${
            darkMode ? 'border-gray-700 bg-gray-800/80' : 'border-gray-100 bg-gray-50/60'
          }`}
          dir="rtl"
        >
          <h3
            className={`text-sm font-bold mb-4 text-center ${
              darkMode ? 'text-gray-300' : 'text-gray-500'
            }`}
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
