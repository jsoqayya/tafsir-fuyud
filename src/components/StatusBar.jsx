import React from 'react';
import { Loader2, Wifi, WifiOff } from 'lucide-react';

export default function StatusBar({ loading, error, apiCount, totalCount, darkMode }) {
  if (!loading && !error && apiCount === 0) return null;

  return (
    <div
      className={`rounded-xl px-4 py-2.5 mb-4 flex items-center gap-2 text-sm ${
        error
          ? darkMode
            ? 'bg-orange-950/30 border border-orange-800 text-orange-300'
            : 'bg-orange-50 border border-orange-200 text-orange-700'
          : loading
          ? darkMode
            ? 'bg-blue-950/30 border border-blue-800 text-blue-300'
            : 'bg-blue-50 border border-blue-200 text-blue-700'
          : darkMode
          ? 'bg-emerald-950/30 border border-emerald-800 text-emerald-300'
          : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
      }`}
      dir="rtl"
    >
      {loading ? (
        <>
          <Loader2 size={14} className="animate-spin shrink-0" />
          <span style={{ fontFamily: 'Noto Naskh Arabic, serif' }}>
            جارٍ جلب النصوص القرآنية من API...
          </span>
        </>
      ) : error ? (
        <>
          <WifiOff size={14} className="shrink-0" />
          <span style={{ fontFamily: 'Noto Naskh Arabic, serif' }}>{error}</span>
        </>
      ) : (
        <>
          <Wifi size={14} className="shrink-0" />
          <span style={{ fontFamily: 'Noto Naskh Arabic, serif' }}>
            تم تحميل {apiCount} نصًا قرآنيًا من {totalCount} آية
          </span>
        </>
      )}
    </div>
  );
}
