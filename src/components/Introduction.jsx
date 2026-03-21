import React from 'react';
import { X } from 'lucide-react';

const Introduction = ({ intro, darkMode, onClose }) => {
  return (
    <div className={`rounded-2xl p-6 mb-6 shadow-sm border transition-colors duration-300 ${
      darkMode
        ? 'bg-gray-900 border-gray-700'
        : 'bg-emerald-50 border-emerald-100'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onClose}
          className={`p-1.5 rounded-full transition-colors ${
            darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-400 hover:bg-emerald-100'
          }`}
        >
          <X size={18} />
        </button>
        <h2 className={`text-lg font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-800'}`}
          style={{ fontFamily: "'Noto Naskh Arabic', serif" }}>
          مقدمة سورة البقرة
        </h2>
      </div>
      <div
        className={`tafsir-text text-base leading-loose text-right ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}
        style={{ fontFamily: "'Noto Naskh Arabic', serif" }}
      >
        {intro}
      </div>
    </div>
  );
};

export default Introduction;
