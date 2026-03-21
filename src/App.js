import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Introduction from './components/Introduction';
import AyahCard from './components/AyahCard';
import SearchBar from './components/SearchBar';
import tafsirData from './data/tafsirData.json';

export default function App() {
  const [language, setLanguage] = useState('ar');
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { ayahs, introduction, surah } = tafsirData;

  // Apply direction based on language
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Dark mode body class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#111827';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f8f9fa';
    }
  }, [darkMode]);

  // Filter ayahs by search query
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
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-[#f8f9fa]'
      }`}
    >
      {/* Sticky Header */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(!darkMode)}
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">

        {/* Surah Info Banner */}
        <div
          className="text-center mb-8 py-6"
          dir="rtl"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md mb-3">
            <span>سورة</span>
            <span className="text-lg font-bold" style={{ fontFamily: 'Amiri, serif' }}>البقرة</span>
            <span className="opacity-70">•</span>
            <span>{surah.total_ayahs} آية</span>
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
            {surah.mushaf_name} — تفسير الآيات {ayahs[0]?.id}–{ayahs[ayahs.length - 1]?.id}
          </p>
        </div>

        {/* Introduction Section */}
        <Introduction text={introduction} darkMode={darkMode} />

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          darkMode={darkMode}
        />

        {/* Results count if searching */}
        {searchQuery && (
          <p
            className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
            style={{ fontFamily: 'Noto Naskh Arabic, serif' }}
            dir="rtl"
          >
            {filteredAyahs.length === 0
              ? 'لا نتائج مطابقة'
              : `${filteredAyahs.length} آية مطابقة`}
          </p>
        )}

        {/* Ayah Cards */}
        <div>
          {filteredAyahs.map((ayah) => (
            <AyahCard
              key={ayah.id}
              ayah={ayah}
              language={language}
              darkMode={darkMode}
            />
          ))}
        </div>

        {/* Footer */}
        <footer
          className={`text-center py-8 mt-8 border-t ${
            darkMode ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-400'
          }`}
          dir="rtl"
        >
          <p
            className="text-sm"
            style={{ fontFamily: 'Noto Naskh Arabic, serif' }}
          >
            مصحف فيوض التأويل المعاصر • جميع الحقوق محفوظة
          </p>
        </footer>
      </main>
    </div>
  );
}
