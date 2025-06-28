import React, { useState, useRef, useEffect } from 'react';

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
}

const OptimizedVideo: React.FC<OptimizedVideoProps> = ({
  src,
  poster,
  className = '',
  autoplay = false,
  muted = true,
  loop = true,
  controls = false,
  width,
  height,
  priority = false
}) => {
  const [shouldLoad, setShouldLoad] = useState(autoplay || priority);
  const [quality, setQuality] = useState<'high' | 'low'>('high');
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Detect connection speed and set quality
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (
        connection.effectiveType === '2g' || 
        connection.effectiveType === 'slow-2g' || 
        connection.saveData === true ||
        connection.downlink < 1.5
      ) {
        setQuality('low');
      }
    }

    // Intersection observer for lazy loading
    if (!shouldLoad && videoRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        },
        { 
          threshold: 0.25,
          rootMargin: '100px'
        }
      );
      
      observer.observe(videoRef.current);
      return () => observer.disconnect();
    }
  }, [shouldLoad]);

  // Generate video sources based on quality
  const getVideoSrc = (baseSrc: string, quality: 'high' | 'low', format: 'mp4' | 'webm') => {
    const extension = format === 'webm' ? 'webm' : 'mp4';
    const qualitySuffix = quality === 'high' ? '' : '-low';
    return baseSrc.replace(/\.mp4$/i, `${qualitySuffix}.${extension}`);
  };

  const handlePlayClick = async () => {
    if (videoElementRef.current) {
      try {
        if (videoElementRef.current.paused) {
          await videoElementRef.current.play();
          setIsPlaying(true);
        } else {
          videoElementRef.current.pause();
          setIsPlaying(false);
        }
      } catch (error) {
        console.error('Video play error:', error);
        setHasError(true);
      }
    }
  };

  const handleVideoLoad = () => {
    if (autoplay && videoElementRef.current) {
      videoElementRef.current.play().catch(error => {
        console.error('Autoplay failed:', error);
      });
    }
  };

  const handleVideoError = () => {
    setHasError(true);
  };

  return (
    <div 
      ref={videoRef} 
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {shouldLoad ? (
        <>
          <video
            ref={videoElementRef}
            poster={poster}
            muted={muted}
            loop={loop}
            playsInline
            controls={controls}
            preload={priority ? 'auto' : 'metadata'}
            width={width}
            height={height}
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            className="w-full h-full object-cover"
            aria-label="Video content"
          >
            {/* WebM source for better compression */}
            <source 
              src={getVideoSrc(src, quality, 'webm')} 
              type="video/webm" 
            />
            {/* MP4 fallback */}
            <source 
              src={getVideoSrc(src, quality, 'mp4')} 
              type="video/mp4" 
            />
            Your browser does not support the video tag.
          </video>

          {/* Play/Pause overlay for non-autoplay videos */}
          {!autoplay && !controls && (
            <div 
              className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-opacity duration-300 ${
                isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-90'
              }`}
              onClick={handlePlayClick}
              role="button"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePlayClick();
                }
              }}
            >
              <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                {isPlaying ? (
                  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg className="h-8 w-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </div>
            </div>
          )}

          {/* Quality indicator */}
          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {quality.toUpperCase()}
          </div>

          {/* Error fallback */}
          {hasError && poster && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <img 
                src={poster} 
                alt="Video thumbnail" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <p className="text-white text-sm">Video unavailable</p>
              </div>
            </div>
          )}
        </>
      ) : (
        // Poster image placeholder
        poster && (
          <img 
            src={poster} 
            alt="Video thumbnail" 
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setShouldLoad(true)}
            role="button"
            aria-label="Load video"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setShouldLoad(true);
              }
            }}
          />
        )
      )}
    </div>
  );
};

export default OptimizedVideo;