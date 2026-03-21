import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ query, setQuery, darkMode, resultCount }) => {
  return (
    <div className="relative">
      <div className={`flex items-center gap-3 rounded-2xl px-4 py-3 shadow-sm border transition-all duration-200 ${
        darkMode
          ? 'bg-gray-800 border-gray-700 focus-within:border-emerald-500'
          : 'bg-white border-gray-200 focus-within:border-emerald-400 focus-within:shadow-md'
      }`}>
        <Search
          size={18}
          className={`flex-shrink-0 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}
        />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="ابحث في الآيات والتفسير..."
          className={`flex-1 bg-transparent outline-none text-right text-sm ${
            darkMode ? 'text-gray-100 placeholder-gray-500' : 'text-gray-700 placeholder-gray-400'
          }`}
          dir="rtl"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className={`flex-shrink-0 p-1 rounded-full transition-colors ${
              darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
