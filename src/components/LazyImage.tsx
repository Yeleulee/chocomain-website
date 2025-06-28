import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  placeholder?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  priority = false,
  width,
  height,
  placeholder
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!priority && imgRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { 
          threshold: 0.1, 
          rootMargin: '50px' 
        }
      );
      
      observer.observe(imgRef.current);
      return () => observer.disconnect();
    }
  }, [priority]);

  // Generate WebP and fallback sources
  const getOptimizedSrc = (originalSrc: string, format: 'webp' | 'original') => {
    if (format === 'webp') {
      return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    return originalSrc;
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Blur placeholder */}
      {!isLoaded && placeholder && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{
            backgroundImage: `url(${placeholder})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(10px)',
            transform: 'scale(1.1)'
          }}
        />
      )}
      
      {/* Main image */}
      {isInView && (
        <picture>
          <source 
            srcSet={getOptimizedSrc(src, 'webp')} 
            type="image/webp" 
          />
          <img
            src={hasError ? src : getOptimizedSrc(src, 'original')}
            alt={alt}
            width={width}
            height={height}
            onLoad={handleLoad}
            onError={handleError}
            className={`transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } w-full h-full object-cover`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
          />
        </picture>
      )}
    </div>
  );
};

export default LazyImage;