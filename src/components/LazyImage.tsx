import React, { useEffect, useRef, useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  lowQualitySrc?: string;
  blurAmount?: number;
}

export const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  lowQualitySrc,
  blurAmount = 20
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [showHighRes, setShowHighRes] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate dominant color placeholder if no lowQualitySrc provided
  const placeholderColor = '#1a1a1a'; // Default dark background

  useEffect(() => {
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
  }, []);

  // Preload high-res image
  useEffect(() => {
    if (isInView && src) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setShowHighRes(true);
        setTimeout(() => setIsLoaded(true), 50); // Slight delay for smooth transition
      };
    }
  }, [isInView, src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background color placeholder */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: placeholderColor }}
      />

      {/* Low quality placeholder */}
      {lowQualitySrc && (
        <img
          src={lowQualitySrc}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            showHighRes ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            filter: `blur(${blurAmount}px)`,
            transform: 'scale(1.1)' // Prevent blur from showing edges
          }}
        />
      )}

      {/* High quality image */}
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};
