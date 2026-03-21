import React from 'react';
import { Moon, Sun, BookOpen, Info } from 'lucide-react';

const Header = ({ surahInfo, darkMode, setDarkMode, showIntro, setShowIntro, totalAyahs }) => {
  return (
    <header className={`sticky top-0 z-50 shadow-sm transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 border-b border-gray-800' : 'bg-white border-b border-gray-100'
    }`}>
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(d => !d)}
              className={`p-2 rounded-full transition-colors ${
                darkMode
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={darkMode ? 'وضع النهار' : 'وضع الليل'}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setShowIntro(s => !s)}
              className={`p-2 rounded-full transition-colors ${
                showIntro
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
                  : darkMode
                  ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="مقدمة السورة"
            >
              <Info size={18} />
            </button>
          </div>

          {/* Center: title */}
          <div className="text-center flex-1 mx-4">
            <h1 className={`font-bold text-lg md:text-xl ${
              darkMode ? 'text-emerald-400' : 'text-emerald-700'
            }`}
            style={{ fontFamily: "'Noto Naskh Arabic', serif" }}>
              {surahInfo.title}
            </h1>
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              سورة البقرة — {totalAyahs} آية من أصل {surahInfo.totalAyahs}
            </p>
          </div>

          {/* Right: icon */}
          <div className={`p-2 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-emerald-50'}`}>
            <BookOpen size={20} className={darkMode ? 'text-emerald-400' : 'text-emerald-600'} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
