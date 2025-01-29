import React, { useEffect, useRef, useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  lowQualitySrc?: string;
  blurAmount?: number;
  priority?: boolean;
  sizes?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  lowQualitySrc,
  blurAmount = 20,
  priority = false,
  sizes = '100vw'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [showHighRes, setShowHighRes] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate dominant color placeholder if no lowQualitySrc provided
  const placeholderColor = '#1a1a1a'; // Default dark background

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Preload high-res image
  useEffect(() => {
    if (isInView && src) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setShowHighRes(true);
        setIsLoaded(true);
      };
    }
  }, [isInView, src]);

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: placeholderColor }}
    >
      {/* Low quality placeholder */}
      {lowQualitySrc && !showHighRes && (
        <img
          src={lowQualitySrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ filter: `blur(${blurAmount}px)` }}
          loading="lazy"
        />
      )}

      {/* High quality image */}
      {(isInView || priority) && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            showHighRes ? 'opacity-100' : 'opacity-0'
          }`}
          loading={priority ? 'eager' : 'lazy'}
          sizes={sizes}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
};
