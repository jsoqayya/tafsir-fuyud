import React from 'react';
import { BookOpen, Globe, Moon, Sun } from 'lucide-react';

const LANGUAGES = [
  { code: 'ar', label: 'العربية', dir: 'rtl' },
  { code: 'en', label: 'English', dir: 'ltr' },
];

export default function Header({ language, onLanguageChange, darkMode, onToggleDark }) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center gap-3" dir="rtl">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center shadow-md">
            <BookOpen size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-800 leading-tight" style={{ fontFamily: 'Noto Naskh Arabic, serif' }}>
              مصحف فيوض التأويل المعاصر
            </h1>
            <p className="text-xs text-emerald-600 font-medium" style={{ fontFamily: 'Noto Naskh Arabic, serif' }}>
              سورة البقرة
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <button
            onClick={onToggleDark}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
            title="تبديل المظهر"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            <Globe size={14} className="text-gray-400 ml-1" />
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  language === lang.code
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
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
