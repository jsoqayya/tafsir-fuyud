import React, { useState, useEffect, useCallback, useMemo } from 'react';
import tafsirData from './data/tafsirData.json';
import AyahCard from './components/AyahCard';
import Header from './components/Header';
import Introduction from './components/Introduction';
import SearchBar from './components/SearchBar';
import './index.css';

// Theme color map by ayah ranges
const getAyahTheme = (id) => {
  if (id <= 5) return 'emerald';        // Opening / general guidance
  if (id <= 20) return 'orange';        // Disbelievers / Hypocrites
  if (id <= 29) return 'blue';          // Rulings / Worship
  if (id <= 39) return 'purple';        // Adam / Creation story
  if (id <= 60) return 'green';         // Bani Israel / Mercy
  if (id <= 74) return 'yellow';        // Cow story
  if (id <= 86) return 'orange';        // Jewish transgressions
  if (id <= 101) return 'blue';         // Jibril / Scriptures
  return 'emerald';
};

function App() {
  const [expandedId, setExpandedId] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [filterTheme, setFilterTheme] = useState('all');

  const ayahs = tafsirData.ayahs;
  const surahInfo = tafsirData.surah;

  // Filter ayahs based on search and theme
  const filteredAyahs = useMemo(() => {
    let result = ayahs;

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(a => {
        const headerMatch = a.header.toLowerCase().includes(q);
        const sectionMatch = Object.values(a.sections).some(v =>
          v.toLowerCase().includes(q)
        );
        return headerMatch || sectionMatch;
      });
    }

    if (filterTheme !== 'all') {
      result = result.filter(a => getAyahTheme(a.id) === filterTheme);
    }

    return result;
  }, [ayahs, searchQuery, filterTheme]);

  const handleCardClick = useCallback((id) => {
    setExpandedId(prev => {
      if (prev === id) {
        setActiveSection(null);
        return null;
      }
      setActiveSection('context');
      return id;
    });
  }, []);

  const handleSectionClick = useCallback((section) => {
    setActiveSection(section);
  }, []);

  // Auto-expand first result when searching
  useEffect(() => {
    if (searchQuery && filteredAyahs.length > 0) {
      setExpandedId(filteredAyahs[0].id);
      setActiveSection('context');
    }
  }, [searchQuery, filteredAyahs]);

  // Dark mode body class
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const themes = ['all', 'emerald', 'green', 'blue', 'orange', 'purple', 'yellow'];
  const themeLabels = {
    all: 'الكل',
    emerald: 'عام',
    green: 'رحمة',
    blue: 'أحكام',
    orange: 'تحذير',
    purple: 'قصص',
    yellow: 'تشريع',
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <Header
        surahInfo={surahInfo}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        showIntro={showIntro}
        setShowIntro={setShowIntro}
        totalAyahs={ayahs.length}
      />

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Introduction Panel */}
        {showIntro && (
          <Introduction
            intro={surahInfo.intro}
            darkMode={darkMode}
            onClose={() => setShowIntro(false)}
          />
        )}

        {/* Search + Filters */}
        <div className="mb-6 space-y-3">
          <SearchBar
            query={searchQuery}
            setQuery={setSearchQuery}
            darkMode={darkMode}
            resultCount={filteredAyahs.length}
          />

          {/* Theme filter chips */}
          <div className="flex flex-wrap gap-2 justify-end">
            {themes.map(t => (
              <button
                key={t}
                onClick={() => setFilterTheme(t)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  filterTheme === t
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : darkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {themeLabels[t]}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        {searchQuery && (
          <p className={`text-sm mb-4 text-right ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {filteredAyahs.length > 0
              ? `وُجد ${filteredAyahs.length} آية تطابق البحث`
              : 'لم يُعثر على نتائج'}
          </p>
        )}

        {/* Ayah Cards */}
        <div className="space-y-4">
          {filteredAyahs.map(ayah => (
            <AyahCard
              key={ayah.id}
              ayah={ayah}
              theme={getAyahTheme(ayah.id)}
              isExpanded={expandedId === ayah.id}
              activeSection={expandedId === ayah.id ? activeSection : null}
              onCardClick={handleCardClick}
              onSectionClick={handleSectionClick}
              darkMode={darkMode}
              searchQuery={searchQuery}
            />
          ))}
        </div>

        {filteredAyahs.length === 0 && (
          <div className={`text-center py-20 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg">لا توجد نتائج للبحث</p>
            <p className="text-sm mt-2">جرّب كلمات أخرى</p>
          </div>
        )}

        {/* Footer */}
        <footer className={`mt-12 py-6 text-center text-sm border-t ${
          darkMode ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-400'
        }`}>
          <p className="font-amiri text-base mb-1">مصحف فيوض التأويل المعاصر</p>
          <p>تفسير حديث ومعاصر لسورة البقرة الكريمة</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
