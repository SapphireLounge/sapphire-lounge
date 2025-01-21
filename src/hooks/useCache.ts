import { useState, useEffect } from 'react';

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

interface CacheOptions {
  expirationTime?: number; // in milliseconds
  persistToStorage?: boolean;
}

const DEFAULT_EXPIRATION = 5 * 60 * 1000; // 5 minutes

export function useCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  options: CacheOptions = {}
) {
  const {
    expirationTime = DEFAULT_EXPIRATION,
    persistToStorage = false
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const getCacheKey = (key: string) => `sapphire_cache_${key}`;

  const getFromStorage = () => {
    if (!persistToStorage) return null;
    const stored = localStorage.getItem(getCacheKey(key));
    if (!stored) return null;

    try {
      const item: CacheItem<T> = JSON.parse(stored);
      if (Date.now() - item.timestamp > expirationTime) {
        localStorage.removeItem(getCacheKey(key));
        return null;
      }
      return item.data;
    } catch {
      return null;
    }
  };

  const setToStorage = (data: T) => {
    if (!persistToStorage) return;
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(getCacheKey(key), JSON.stringify(item));
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const cached = getFromStorage();
      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }

      const fresh = await fetchFn();
      setData(fresh);
      setToStorage(fresh);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [key]); // Re-fetch when key changes

  const refresh = () => {
    if (persistToStorage) {
      localStorage.removeItem(getCacheKey(key));
    }
    fetchData();
  };

  return { data, loading, error, refresh };
}
