import { useState, useEffect, useCallback } from 'react';

// Cache to avoid re-fetching
const apiCache = new Map();

/**
 * Fetches Quranic ayah text from alquran.cloud API
 * Merges API text with local tafsir data
 */
export function useQuranAPI(ayahs) {
  const [apiTexts, setApiTexts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAyahText = useCallback(async (ayahNumber) => {
    // Surah Al-Baqarah starts at global ayah 7 (after Al-Fatiha's 7 ayahs)
    const globalId = 7 + ayahNumber;

    if (apiCache.has(globalId)) {
      return apiCache.get(globalId);
    }

    try {
      const res = await fetch(
        `https://api.alquran.cloud/v1/ayah/${globalId}/ar.uthmani`,
        { signal: AbortSignal.timeout(8000) }
      );
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const json = await res.json();
      const text = json?.data?.text || null;
      if (text) {
        apiCache.set(globalId, text);
      }
      return text;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (!ayahs || ayahs.length === 0) return;

    const fetchAll = async () => {
      setLoading(true);
      setError(null);

      const results = {};

      // Fetch in batches of 5 to avoid rate limiting
      const batchSize = 5;
      for (let i = 0; i < ayahs.length; i += batchSize) {
        const batch = ayahs.slice(i, i + batchSize);
        const promises = batch.map(async (ayah) => {
          const text = await fetchAyahText(ayah.id);
          return { id: ayah.id, text };
        });
        const batchResults = await Promise.allSettled(promises);
        batchResults.forEach((result) => {
          if (result.status === 'fulfilled' && result.value.text) {
            results[result.value.id] = result.value.text;
          }
        });
        // Small delay between batches
        if (i + batchSize < ayahs.length) {
          await new Promise((r) => setTimeout(r, 300));
        }
      }

      setApiTexts(results);
      setLoading(false);
    };

    fetchAll().catch(() => {
      setError('تعذّر الاتصال بالخادم. يتم عرض النصوص المحلية.');
      setLoading(false);
    });
  }, [ayahs, fetchAyahText]);

  return { apiTexts, loading, error };
}
