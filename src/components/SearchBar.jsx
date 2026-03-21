import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, darkMode }) {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
        <Search size={16} className={darkMode ? 'text-gray-400' : 'text-gray-400'} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ابحث في الآيات والتفسير..."
        dir="rtl"
        className={`w-full pr-10 pl-10 py-3 rounded-xl border text-sm transition-all
          focus:outline-none focus:ring-2 focus:ring-emerald-400
          ${
            darkMode
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
              : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'
          }`}
        style={{ fontFamily: 'Noto Naskh Arabic, serif' }}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 left-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
