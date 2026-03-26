import React, { useState, useMemo, useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { BookOpen, Globe, Moon, Sun } from 'lucide-react';
import Introduction from './components/Introduction';
import AyahCard from './components/AyahCard';
import SearchBar from './components/SearchBar';
import HomePage from './components/HomePage';
import SurahIndex from './components/SurahIndex';
import tafsirData from './data/tafsirData.json';
import tafsirData2 from './data/tafsirData2.json';
import tafsirData3 from './data/tafsirData3.json';

/* ────────────────────────────────────────────
   Part navigation bar (language-aware)
──────────────────────────────────────────── */
const PART_LABELS = {
  ar: { p1: 'الجزء الأول', p2: 'الجزء الثاني', p3: 'الجزء الثالث' },
  en: { p1: 'Part One',   p2: 'Part Two',   p3: 'Part Three'  },
  ur: { p1: 'پہلا حصہ',   p2: 'دوسرا حصہ',  p3: 'تیسرا حصہ'  },
  id: { p1: 'Bagian Satu', p2: 'Bagian Dua', p3: 'Bagian Tiga' },
  tr: { p1: 'Birinci Bölüm', p2: 'İkinci Bölüm', p3: 'Üçüncü Bölüm' },
};

function PartNav({ darkMode, language }) {
  const lang = language || 'ar';
  const labels = PART_LABELS[lang] || PART_LABELS.ar;
  const prefix = lang === 'ar' ? '' : `/${lang}`;
  const isRTL  = lang === 'ar' || lang === 'ur';

  const parts = [
    { to: `${prefix}/part1`, label: labels.p1, range: lang === 'ar' ? '١ – ١٠١' : '1 – 101' },
    { to: `${prefix}/part2`, label: labels.p2, range: lang === 'ar' ? '١٠٢ – ٢٠٠' : '102 – 200' },
    { to: `${prefix}/part3`, label: labels.p3, range: lang === 'ar' ? '٢٠١ – ٢٨٦' : '201 – 286' },
  ];

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`flex justify-center gap-2 py-3 px-4 border-b ${
        darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'
      }`}
    >
      {parts.map((p) => (
        <NavLink
          key={p.to}
          to={p.to}
          className={({ isActive }) =>
            `flex flex-col items-center px-5 py-2 rounded-xl text-xs font-bold transition-all duration-200
            ${isActive
              ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md'
              : darkMode
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`
          }
          style={{ fontFamily: isRTL ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif' }}
        >
          <span className="text-sm">{p.label}</span>
          <span className="opacity-80 text-[10px] mt-0.5">{p.range}</span>
        </NavLink>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────
   Tafsir page header (language-aware)
──────────────────────────────────────────── */
const TAFSIR_HOME_ROUTES = { ar: '/', en: '/en', ur: '/ur', id: '/id', tr: '/tr' };
const TAFSIR_SITE_TITLE = {
  ar: 'فيوض التأويل المعاصر',
  en: "Fuyud Al-Ta'wil Al-Mu'asir",
  ur: 'فیوض التاویل المعاصر',
  id: "Fuyud Al-Ta'wil Al-Mu'asir",
  tr: "Fuyud Et-Te'vil El-Muasır",
};
const TAFSIR_SURAH_LABEL = {
  ar: 'سورة البقرة', en: 'Surah Al-Baqarah', ur: 'سورۃ البقرہ', id: 'Surah Al-Baqarah', tr: 'Bakara Suresi',
};

function TafsirHeader({ language, onLanguageChange, darkMode, onToggleDark }) {
  const LANGUAGES = [
    { code: 'ar', label: 'العربية' },
    { code: 'en', label: 'English' },
    { code: 'ur', label: 'اردو' },
    { code: 'id', label: 'Bahasa' },
    { code: 'tr', label: 'Türkçe' },
  ];
  const navigate = useNavigate();
  const lang = language || 'ar';
  const isRTL = lang === 'ar' || lang === 'ur';

  const handleLangChange = (code) => {
    onLanguageChange(code);
    // Navigate to same part in new language
    const currentPath = window.location.pathname;
    const isPart3 = currentPath.includes('part3');
    const isPart2 = currentPath.includes('part2');
    const prefix = code === 'ar' ? '' : `/${code}`;
    const part = isPart3 ? 'part3' : isPart2 ? 'part2' : 'part1';
    navigate(`${prefix}/${part}`);
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-sm shadow-sm border-b ${
      darkMode ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-gray-100'
    }`}>
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3" dir={isRTL ? 'rtl' : 'ltr'}>
          <button
            onClick={() => navigate(TAFSIR_HOME_ROUTES[lang] || '/')}
            className={`w-10 h-10 rounded-xl overflow-hidden border-2 flex items-center justify-center shadow-md ${
              darkMode ? 'border-emerald-700 bg-gray-800' : 'border-emerald-200 bg-white'
            }`}
          >
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </button>
          <div>
            <h1
              className={`text-sm font-bold leading-tight ${darkMode ? 'text-white' : 'text-gray-800'}`}
              style={{ fontFamily: isRTL ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif' }}
            >
              {TAFSIR_SITE_TITLE[lang] || TAFSIR_SITE_TITLE.ar}
            </h1>
            <p
              className="text-xs text-emerald-600 font-medium"
              style={{ fontFamily: isRTL ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif' }}
            >
              {TAFSIR_SURAH_LABEL[lang] || TAFSIR_SURAH_LABEL.ar}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleDark}
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-500'
            }`}
            title="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className={`flex items-center gap-1 rounded-xl p-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <Globe size={14} className="text-gray-400 ml-1" />
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => handleLangChange(l.code)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  lang === l.code
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

/* ────────────────────────────────────────────
   Tafsir page content (language-aware)
──────────────────────────────────────────── */
const PAGE_UI = {
  ar: { surahWord: 'سورة', ayahWord: 'آية', noResult: 'لا نتائج مطابقة', footer: 'فيوض التأويل المعاصر • جميع الحقوق محفوظة' },
  en: { surahWord: 'Surah', ayahWord: 'verses', noResult: 'No matching results', footer: "Fuyud Al-Ta'wil Al-Mu'asir • All rights reserved" },
  ur: { surahWord: 'سورۃ', ayahWord: 'آیات', noResult: 'کوئی نتیجہ نہیں', footer: 'فیوض التاویل المعاصر • جملہ حقوق محفوظ' },
  id: { surahWord: 'Surah', ayahWord: 'ayat', noResult: 'Tidak ada hasil', footer: "Fuyud Al-Ta'wil Al-Mu'asir • Hak cipta dilindungi" },
  tr: { surahWord: 'Sure', ayahWord: 'ayet', noResult: 'Sonuç bulunamadı', footer: "Fuyud Et-Te'vil El-Muasır • Tüm hakları saklıdır" },
};

function TafsirPage({ data, language, darkMode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { ayahs, introduction, surah } = data;
  const lang = language || 'ar';
  const isRTL = lang === 'ar' || lang === 'ur';
  const ui = PAGE_UI[lang] || PAGE_UI.ar;

  const filteredAyahs = useMemo(() => {
    if (!searchQuery.trim()) return ayahs;
    const q = searchQuery.toLowerCase();
    return ayahs.filter((ayah) => {
      const text = (ayah.ayah_text || '').toLowerCase();
      // Search in selected language fuyud text
      const fuyudText = Object.values(ayah.fuyud || {}).map(v =>
        typeof v === 'object' ? (v[lang] || v.ar || '') : (v || '')
      ).join(' ').toLowerCase();
      return text.includes(q) || fuyudText.includes(q);
    });
  }, [ayahs, searchQuery, lang]);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8 py-6" dir="rtl">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md mb-3">
          <span style={{ fontFamily: isRTL ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif' }}>
            {TAFSIR_SURAH_LABEL[lang]}
          </span>
          <span className="opacity-70">•</span>
          <span style={{ fontFamily: isRTL ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif' }}>
            {surah.total_ayahs} {ui.ayahWord}
          </span>
          <span className="opacity-70">•</span>
          <span style={{ fontFamily: isRTL ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif' }}>
            {surah.ayah_range || `${ayahs[0]?.id}–${ayahs[ayahs.length-1]?.id}`}
          </span>
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

      <Introduction text={introduction} darkMode={darkMode} />
      <SearchBar value={searchQuery} onChange={setSearchQuery} darkMode={darkMode} />

      {searchQuery && (
        <p
          className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
          style={{ fontFamily: isRTL ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif', direction: isRTL ? 'rtl' : 'ltr' }}
        >
          {filteredAyahs.length === 0 ? ui.noResult : `${filteredAyahs.length} ${ui.ayahWord}`}
        </p>
      )}

      <div>
        {filteredAyahs.map((ayah) => (
          <AyahCard key={ayah.id} ayah={ayah} language={lang} darkMode={darkMode} />
        ))}
      </div>

      <footer
        className={`text-center py-8 mt-8 border-t ${
          darkMode ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-400'
        }`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <p
          className="text-sm"
          style={{ fontFamily: isRTL ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif' }}
        >
          {ui.footer}
        </p>
      </footer>
    </main>
  );
}

/* ────────────────────────────────────────────
   TafsirLayout wrapper
──────────────────────────────────────────── */
function TafsirLayout({ data, language, onLanguageChange, darkMode, onToggleDark }) {
  const isRTL = language === 'ar' || language === 'ur';
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-[#f8f9fa]'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
      lang={language}
    >
      <TafsirHeader
        language={language}
        onLanguageChange={onLanguageChange}
        darkMode={darkMode}
        onToggleDark={onToggleDark}
      />
      <PartNav darkMode={darkMode} language={language} />
      <TafsirPage data={data} language={language} darkMode={darkMode} />
    </div>
  );
}

/* ────────────────────────────────────────────
   التطبيق الرئيسي
──────────────────────────────────────────── */
export default function App() {
  const [language, setLanguage] = useState('ar');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // HomePage manages its own <html lang> and dir
    // Only update for tafsir pages (non-home routes)
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
    <Routes>
      {/* ─── صفحات اللغات الخمس ─── */}
      <Route path="/"   element={<HomePage lang="ar" />} />
      <Route path="/en" element={<HomePage lang="en" />} />
      <Route path="/ur" element={<HomePage lang="ur" />} />
      <Route path="/id" element={<HomePage lang="id" />} />
      <Route path="/tr" element={<HomePage lang="tr" />} />

      {/* ─── فهرس السور — مسار لكل لغة ─── */}
      <Route path="/surahs"    element={<SurahIndex lang="ar" />} />
      <Route path="/en/surahs" element={<SurahIndex lang="en" />} />
      <Route path="/ur/surahs" element={<SurahIndex lang="ur" />} />
      <Route path="/id/surahs" element={<SurahIndex lang="id" />} />
      <Route path="/tr/surahs" element={<SurahIndex lang="tr" />} />

      {/* ─── صفحات التفسير — Arabic (default) ─── */}
      <Route path="/part1" element={
        <TafsirLayout data={tafsirData} language={language} onLanguageChange={setLanguage}
          darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />
      } />
      <Route path="/part2" element={
        <TafsirLayout data={tafsirData2} language={language} onLanguageChange={setLanguage}
          darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />
      } />
      <Route path="/part3" element={
        <TafsirLayout data={tafsirData3} language={language} onLanguageChange={setLanguage}
          darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />
      } />

      {/* ─── صفحات التفسير — English ─── */}
      <Route path="/en/part1" element={
        <TafsirLayout data={tafsirData} language="en" onLanguageChange={setLanguage}
          darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />
      } />
      <Route path="/en/part2" element={
        <TafsirLayout data={tafsirData2} language="en" onLanguageChange={setLanguage}
          darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />
      } />
      <Route path="/en/part3" element={
        <TafsirLayout data={tafsirData3} language="en" onLanguageChange={setLanguage}
          darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />
      } />

      {/* ─── صفحات التفسير — Urdu ─── */}
      <Route path="/ur/part1" element={
        <TafsirLayout data={tafsirData} language="ur" onLanguageChange={setLanguage}
          darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />
      } />
      <Route path="/ur/part2" element={
        <TafsirLayout data={tafsirData2} language="ur" onLanguageChange={setLanguage}
          darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />
      } />
      <Route path="/ur/part3" element={
        <TafsirLayout data={tafsirData3} language="ur" onLanguageChange={setLanguage}
          darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />
      } />

      {/* ─── صفحات التفسير — Indonesian ─── */}
      <Route path="/id/part1" element={
        <TafsirLayout data={tafsirData} language="id" onLanguageChange={setLanguage}
          darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />
      } />
      <Route path="/id/part2" element={
        <TafsirLayout data={tafsirData2} language="id" onLanguageChange={setLanguage}
          darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />
      } />
      <Route path="/id/part3" element={
        <TafsirLayout data={tafsirData3} language="id" onLanguageChange={setLanguage}
          darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />
      } />

      {/* ─── صفحات التفسير — Turkish ─── */}
      <Route path="/tr/part1" element={
        <TafsirLayout data={tafsirData} language="tr" onLanguageChange={setLanguage}
          darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />
      } />
      <Route path="/tr/part2" element={
        <TafsirLayout data={tafsirData2} language="tr" onLanguageChange={setLanguage}
          darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />
      } />
      <Route path="/tr/part3" element={
        <TafsirLayout data={tafsirData3} language="tr" onLanguageChange={setLanguage}
          darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />
      } />

      {/* ─── Legacy routes ─── */}
      <Route path="/ar/baqarah/1" element={
        <TafsirLayout data={tafsirData} language={language} onLanguageChange={setLanguage}
          darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />
      } />
      <Route path="/ar/baqarah/2" element={
        <TafsirLayout data={tafsirData2} language={language} onLanguageChange={setLanguage}
          darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />
      } />
      <Route path="/ar/baqarah/3" element={
        <TafsirLayout data={tafsirData3} language={language} onLanguageChange={setLanguage}
          darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />
      } />
    </Routes>
  );
}
