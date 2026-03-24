import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookMarked } from 'lucide-react';

export default function Introduction({ text, darkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const paragraphs = text ? text.split('\n\n').filter(Boolean) : [];

  return (
    <div
      className={`rounded-2xl shadow-sm mb-6 overflow-hidden border ${
        darkMode
          ? 'bg-gray-800 border-emerald-800'
          : 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200'
      }`}
    >
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between gap-3"
        dir="rtl"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center shadow-sm">
            <BookMarked size={18} className="text-white" />
          </div>
          <div className="text-right">
            <h2
              className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-emerald-800'}`}
              style={{ fontFamily: 'Noto Naskh Arabic, serif' }}
            >
              مقدمة سورة البقرة
            </h2>
            <p
              className={`text-xs ${darkMode ? 'text-gray-400' : 'text-emerald-600'}`}
              style={{ fontFamily: 'Noto Naskh Arabic, serif' }}
            >
              من مصحف فيوض التأويل المعاصر
            </p>
          </div>
        </div>
        <div
          className={`p-2 rounded-full transition-all ${
            isOpen
              ? 'bg-emerald-600 text-white'
              : darkMode
              ? 'bg-gray-700 text-gray-300'
              : 'bg-white text-emerald-600'
          }`}
        >
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {/* Content */}
      {isOpen && (
        <div
          className={`px-6 pb-6 border-t ${
            darkMode ? 'border-gray-700' : 'border-emerald-100'
          }`}
          dir="rtl"
        >
          <div className="pt-4 space-y-4">
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className={`leading-[2.2rem] text-base ${
                  darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
                style={{ fontFamily: 'Noto Naskh Arabic, serif', textAlign: 'right' }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
