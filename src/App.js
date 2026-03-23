import React, { useState, useMemo, useEffect } from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { BookOpen, Globe, Moon, Sun } from 'lucide-react';
import Introduction from './components/Introduction';
import AyahCard from './components/AyahCard';
import SearchBar from './components/SearchBar';
import tafsirData from './data/tafsirData.json';
import tafsirData2 from './data/tafsirData2.json';

/* ────────────────────────────────────────────
   قائمة التنقل العلوية بين الأجزاء
──────────────────────────────────────────── */
function PartNav({ darkMode }) {
  const parts = [
    { to: '/',     label: 'الجزء الأول',  range: '١ – ١٠١'  },
    { to: '/part2', label: 'الجزء الثاني', range: '١٠٢ – ٢٠٠' },
  ];
  return (
    <div
      dir="rtl"
      className={`flex justify-center gap-2 py-3 px-4 border-b ${
        darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'
      }`}
    >
      {parts.map((p) => (
        <NavLink
          key={p.to}
          to={p.to}
          end={p.to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center px-5 py-2 rounded-xl text-xs font-bold transition-all duration-200
            ${isActive
              ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md'
              : darkMode
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`
          }
          style={{ fontFamily: 'Noto Naskh Arabic, serif' }}
        >
          <span className="text-sm">{p.label}</span>
          <span className="opacity-80 text-[10px] mt-0.5">{p.range}</span>
        </NavLink>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────
   الهيدر العلوي
──────────────────────────────────────────── */
function Header({ language, onLanguageChange, darkMode, onToggleDark }) {
  const LANGUAGES = [
    { code: 'ar', label: 'العربية' },
    { code: 'en', label: 'English' },
  ];
  return (
    <header className={`sticky top-0 z-50 backdrop-blur-sm shadow-sm border-b ${
      darkMode ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-gray-100'
    }`}>
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3" dir="rtl">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center shadow-md">
            <BookOpen size={20} className="text-white" />
          </div>
          <div>
            <h1
              className={`text-sm font-bold leading-tight ${darkMode ? 'text-white' : 'text-gray-800'}`}
              style={{ fontFamily: 'Noto Naskh Arabic, serif' }}
            >
              مصحف فيوض التأويل المعاصر
            </h1>
            <p className="text-xs text-emerald-600 font-medium" style={{ fontFamily: 'Noto Naskh Arabic, serif' }}>
              سورة البقرة
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleDark}
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-500'
            }`}
            title="تبديل المظهر"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className={`flex items-center gap-1 rounded-xl p-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <Globe size={14} className="text-gray-400 ml-1" />
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  language === lang.code
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

/* ────────────────────────────────────────────
   صفحة عرض الآيات (مشتركة بين الجزأين)
──────────────────────────────────────────── */
function TafsirPage({ data, language, darkMode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { ayahs, introduction, surah } = data;

  const filteredAyahs = useMemo(() => {
    if (!searchQuery.trim()) return ayahs;
    const q = searchQuery.toLowerCase();
    return ayahs.filter((ayah) => {
      const text = (ayah.ayah_text || '').toLowerCase();
      const fuyudText = Object.values(ayah.fuyud || {}).join(' ').toLowerCase();
      return text.includes(q) || fuyudText.includes(q);
    });
  }, [ayahs, searchQuery]);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* بانر السورة */}
      <div className="text-center mb-8 py-6" dir="rtl">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md mb-3">
          <span>سورة</span>
          <span className="text-lg font-bold" style={{ fontFamily: 'Amiri, serif' }}>البقرة</span>
          <span className="opacity-70">•</span>
          <span>{surah.total_ayahs} آية</span>
          <span className="opacity-70">•</span>
          <span>{surah.ayah_range || `${ayahs[0]?.id}–${ayahs[ayahs.length-1]?.id}`}</span>
        </div>
        <h2
          className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}
          style={{ fontFamily: 'Amiri, serif' }}
        >
          ﴿ بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴾
        </h2>
        <p
          className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
          style={{ fontFamily: 'Noto Naskh Arabic, serif' }}
        >
          {surah.mushaf_name}
        </p>
      </div>

      {/* المقدمة */}
      <Introduction text={introduction} darkMode={darkMode} />

      {/* البحث */}
      <SearchBar value={searchQuery} onChange={setSearchQuery} darkMode={darkMode} />

      {searchQuery && (
        <p
          className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
          style={{ fontFamily: 'Noto Naskh Arabic, serif' }}
          dir="rtl"
        >
          {filteredAyahs.length === 0 ? 'لا نتائج مطابقة' : `${filteredAyahs.length} آية مطابقة`}
        </p>
      )}

      {/* بطاقات الآيات */}
      <div>
        {filteredAyahs.map((ayah) => (
          <AyahCard key={ayah.id} ayah={ayah} language={language} darkMode={darkMode} />
        ))}
      </div>

      {/* الفوتر */}
      <footer
        className={`text-center py-8 mt-8 border-t ${
          darkMode ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-400'
        }`}
        dir="rtl"
      >
        <p className="text-sm" style={{ fontFamily: 'Noto Naskh Arabic, serif' }}>
          مصحف فيوض التأويل المعاصر • جميع الحقوق محفوظة
        </p>
      </footer>
    </main>
  );
}

/* ────────────────────────────────────────────
   التطبيق الرئيسي
──────────────────────────────────────────── */
export default function App() {
  const [language, setLanguage] = useState('ar');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#111827';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f8f9fa';
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-[#f8f9fa]'}`}>
      {/* الهيدر */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(!darkMode)}
      />

      {/* قائمة التنقل بين الأجزاء */}
      <PartNav darkMode={darkMode} />

      {/* الصفحات */}
      <Routes>
        <Route
          path="/"
          element={<TafsirPage data={tafsirData} language={language} darkMode={darkMode} />}
        />
        <Route
          path="/part2"
          element={<TafsirPage data={tafsirData2} language={language} darkMode={darkMode} />}
        />
      </Routes>
    </div>
  );
}
