import { useState, useEffect } from 'react';

const imageCache = new Map<string, string>();

export function useImageCache(src: string) {
  const [cachedSrc, setCachedSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!src) {
      setError(new Error('No source provided'));
      setIsLoading(false);
      return;
    }

    if (imageCache.has(src)) {
      setCachedSrc(imageCache.get(src) || null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const img = new Image();
    img.src = src;

    img.onload = () => {
      imageCache.set(src, src);
      setCachedSrc(src);
      setIsLoading(false);
    };

    img.onerror = () => {
      setError(new Error('Failed to load image'));
      setIsLoading(false);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { cachedSrc, isLoading, error };
}
