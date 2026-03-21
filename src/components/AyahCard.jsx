import React, { useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Theme configuration
const THEME_CONFIG = {
  emerald: {
    card: 'border-emerald-200',
    cardDark: 'border-emerald-800',
    badge: 'bg-emerald-100 text-emerald-800',
    badgeDark: 'bg-emerald-900 text-emerald-200',
    header: 'bg-emerald-50 hover:bg-emerald-100',
    headerDark: 'bg-emerald-950 hover:bg-emerald-900',
    dot: 'bg-emerald-500',
    activeTab: 'bg-emerald-600 text-white',
    tab: 'hover:bg-emerald-50 text-emerald-700',
    tabDark: 'hover:bg-emerald-900 text-emerald-400',
    label: 'عام',
  },
  green: {
    card: 'border-green-200',
    cardDark: 'border-green-800',
    badge: 'bg-green-100 text-green-800',
    badgeDark: 'bg-green-900 text-green-200',
    header: 'bg-green-50 hover:bg-green-100',
    headerDark: 'bg-green-950 hover:bg-green-900',
    dot: 'bg-green-500',
    activeTab: 'bg-green-600 text-white',
    tab: 'hover:bg-green-50 text-green-700',
    tabDark: 'hover:bg-green-900 text-green-400',
    label: 'رحمة',
  },
  blue: {
    card: 'border-blue-200',
    cardDark: 'border-blue-800',
    badge: 'bg-blue-100 text-blue-800',
    badgeDark: 'bg-blue-900 text-blue-200',
    header: 'bg-blue-50 hover:bg-blue-100',
    headerDark: 'bg-blue-950 hover:bg-blue-900',
    dot: 'bg-blue-500',
    activeTab: 'bg-blue-600 text-white',
    tab: 'hover:bg-blue-50 text-blue-700',
    tabDark: 'hover:bg-blue-900 text-blue-400',
    label: 'أحكام',
  },
  orange: {
    card: 'border-orange-200',
    cardDark: 'border-orange-800',
    badge: 'bg-orange-100 text-orange-800',
    badgeDark: 'bg-orange-900 text-orange-200',
    header: 'bg-orange-50 hover:bg-orange-100',
    headerDark: 'bg-orange-950 hover:bg-orange-900',
    dot: 'bg-orange-500',
    activeTab: 'bg-orange-600 text-white',
    tab: 'hover:bg-orange-50 text-orange-700',
    tabDark: 'hover:bg-orange-900 text-orange-400',
    label: 'تحذير',
  },
  purple: {
    card: 'border-purple-200',
    cardDark: 'border-purple-800',
    badge: 'bg-purple-100 text-purple-800',
    badgeDark: 'bg-purple-900 text-purple-200',
    header: 'bg-purple-50 hover:bg-purple-100',
    headerDark: 'bg-purple-950 hover:bg-purple-900',
    dot: 'bg-purple-500',
    activeTab: 'bg-purple-600 text-white',
    tab: 'hover:bg-purple-50 text-purple-700',
    tabDark: 'hover:bg-purple-900 text-purple-400',
    label: 'قصص',
  },
  yellow: {
    card: 'border-yellow-200',
    cardDark: 'border-yellow-800',
    badge: 'bg-yellow-100 text-yellow-800',
    badgeDark: 'bg-yellow-900 text-yellow-200',
    header: 'bg-yellow-50 hover:bg-yellow-100',
    headerDark: 'bg-yellow-950 hover:bg-yellow-900',
    dot: 'bg-yellow-500',
    activeTab: 'bg-yellow-600 text-white',
    tab: 'hover:bg-yellow-50 text-yellow-700',
    tabDark: 'hover:bg-yellow-900 text-yellow-400',
    label: 'تشريع',
  },
};

// Section labels
const SECTION_LABELS = {
  context: 'السياق العام',
  bayani: 'الفيوض البيانية',
  taweeli: 'الفيوض التأويلية',
  ruhani: 'الفيوض الروحانية',
  nafsi: 'الفيوض النفسية',
  tarbawi: 'الفيوض التربوية',
  muasir: 'الفيوض المعاصرة',
};

const SECTION_ICONS = {
  context: '📖',
  bayani: '🔤',
  taweeli: '💡',
  ruhani: '✨',
  nafsi: '🧠',
  tarbawi: '🌱',
  muasir: '🌍',
};

// Highlight search terms in text
const highlightText = (text, query) => {
  if (!query || !query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={i}>{part}</mark>
      : part
  );
};

// Parse header to extract ayah number(s) and Arabic text
const parseHeader = (header) => {
  const match = header.match(/^(\d+(?:[-–]\d+)?)\.\s*(﴿[\s\S]*﴾)/);
  if (match) {
    return { num: match[1], ayahText: match[2] };
  }
  return { num: '', ayahText: header };
};

const AyahCard = ({
  ayah,
  theme = 'emerald',
  isExpanded,
  activeSection,
  onCardClick,
  onSectionClick,
  darkMode,
  searchQuery,
}) => {
  const tc = THEME_CONFIG[theme] || THEME_CONFIG.emerald;
  const { num, ayahText } = parseHeader(ayah.header);
  const sections = ayah.sections;
  const sectionKeys = Object.keys(sections);
  const contentRef = useRef(null);

  // Scroll into view when expanded
  useEffect(() => {
    if (isExpanded && contentRef.current) {
      setTimeout(() => {
        contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }, [isExpanded]);

  const currentSectionKey = activeSection && sections[activeSection] ? activeSection : sectionKeys[0];
  const currentContent = sections[currentSectionKey] || '';

  return (
    <div
      ref={contentRef}
      className={`rounded-2xl border-2 overflow-hidden shadow-sm transition-all duration-300 ${
        isExpanded ? 'shadow-md' : ''
      } ${
        darkMode ? `${tc.cardDark} bg-gray-900` : `${tc.card} bg-white`
      }`}
    >
      {/* Card Header - Clickable */}
      <button
        onClick={() => onCardClick(ayah.id)}
        className={`w-full px-4 py-4 flex items-start gap-3 transition-colors duration-200 text-right ${
          darkMode ? tc.headerDark : tc.header
        }`}
      >
        {/* Toggle icon */}
        <div className={`mt-1 flex-shrink-0 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {/* Ayah text */}
        <div className="flex-1 min-w-0">
          <p
            className={`text-right leading-loose text-base md:text-lg ${
              darkMode ? 'text-gray-100' : 'text-gray-800'
            }`}
            style={{ fontFamily: "'Amiri', serif", fontSize: '1.15rem' }}
          >
            {searchQuery ? highlightText(ayahText, searchQuery) : ayahText}
          </p>
        </div>

        {/* Ayah number badge */}
        <div className={`flex-shrink-0 flex flex-col items-center gap-1`}>
          <span
            className={`ayah-badge text-sm font-bold ${
              darkMode ? tc.badgeDark : tc.badge
            }`}
            style={{ fontFamily: "'Amiri', serif", minWidth: '2.5rem', padding: '0.25rem 0.5rem', borderRadius: '9999px' }}
          >
            {num}
          </span>
          <span className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
            {tc.label}
          </span>
        </div>
      </button>

      {/* Expandable Content */}
      {isExpanded && (
        <div className={`border-t ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
          {/* Section Tabs */}
          {sectionKeys.length > 1 && (
            <div className={`px-4 py-2 flex flex-wrap gap-1.5 justify-end border-b ${
              darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-100 bg-gray-50'
            }`}>
              {sectionKeys.map(key => (
                <button
                  key={key}
                  onClick={() => onSectionClick(key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    currentSectionKey === key
                      ? tc.activeTab
                      : darkMode
                      ? `bg-gray-800 ${tc.tabDark}`
                      : `bg-white ${tc.tab} border border-gray-200`
                  }`}
                >
                  <span>{SECTION_ICONS[key]}</span>
                  <span>{SECTION_LABELS[key] || key}</span>
                </button>
              ))}
            </div>
          )}

          {/* Section Content */}
          <div className={`px-5 py-5 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            {/* Section Title */}
            <div className="flex items-center gap-2 mb-4 justify-end">
              <h3 className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: "'Noto Naskh Arabic', serif" }}>
                {SECTION_LABELS[currentSectionKey] || currentSectionKey}
              </h3>
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${tc.dot}`}></span>
            </div>

            {/* Content Text - FULL, no truncation */}
            <div
              className={`tafsir-text text-right text-base leading-loose ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}
              style={{ fontFamily: "'Noto Naskh Arabic', serif" }}
            >
              {searchQuery
                ? highlightText(currentContent, searchQuery)
                : currentContent
              }
            </div>

            {/* Section count indicator */}
            {sectionKeys.length > 1 && (
              <div className={`mt-4 pt-3 border-t text-xs text-right ${
                darkMode ? 'border-gray-800 text-gray-600' : 'border-gray-100 text-gray-400'
              }`}>
                {sectionKeys.indexOf(currentSectionKey) + 1} / {sectionKeys.length} أقسام
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AyahCard;
