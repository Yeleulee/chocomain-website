// Image optimization utilities

export interface ImageSizes {
  mobile: number;
  tablet: number;
  desktop: number;
  large: number;
}

export const defaultImageSizes: ImageSizes = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  large: 1920
};

/**
 * Generate responsive image srcSet
 */
export const generateSrcSet = (
  baseSrc: string, 
  sizes: ImageSizes = defaultImageSizes,
  format: 'webp' | 'jpg' = 'webp'
): string => {
  const extension = format === 'webp' ? '.webp' : '.jpg';
  const baseWithoutExt = baseSrc.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  
  return Object.entries(sizes)
    .map(([key, width]) => `${baseWithoutExt}-${width}w${extension} ${width}w`)
    .join(', ');
};

/**
 * Generate sizes attribute for responsive images
 */
export const generateSizesAttribute = (
  breakpoints: { [key: string]: string } = {
    mobile: '(max-width: 768px) 100vw',
    tablet: '(max-width: 1024px) 50vw',
    desktop: '33vw'
  }
): string => {
  return Object.values(breakpoints).join(', ');
};

/**
 * Create optimized image URL with quality and format parameters
 */
export const createOptimizedImageUrl = (
  src: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
  } = {}
): string => {
  const { width, height, quality = 85, format = 'webp' } = options;
  
  // For external URLs (like Unsplash), add optimization parameters
  if (src.includes('unsplash.com')) {
    const url = new URL(src);
    if (width) url.searchParams.set('w', width.toString());
    if (height) url.searchParams.set('h', height.toString());
    url.searchParams.set('q', quality.toString());
    url.searchParams.set('fm', format);
    url.searchParams.set('fit', 'crop');
    return url.toString();
  }
  
  // For local images, return optimized version
  const extension = format === 'webp' ? '.webp' : `.${format}`;
  const baseWithoutExt = src.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  
  let optimizedSrc = baseWithoutExt + extension;
  
  if (width) {
    optimizedSrc = baseWithoutExt + `-${width}w` + extension;
  }
  
  return optimizedSrc;
};

/**
 * Generate blur placeholder for images
 */
export const generateBlurPlaceholder = (src: string): string => {
  // For external URLs, use a low-quality version
  if (src.includes('unsplash.com')) {
    const url = new URL(src);
    url.searchParams.set('w', '20');
    url.searchParams.set('q', '10');
    url.searchParams.set('blur', '10');
    return url.toString();
  }
  
  // For local images, return a placeholder version
  const baseWithoutExt = src.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  return `${baseWithoutExt}-placeholder.jpg`;
};

/**
 * Preload critical images
 */
export const preloadImage = (src: string, priority: 'high' | 'low' = 'low'): void => {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = src;
  link.as = 'image';
  link.fetchPriority = priority;
  
  document.head.appendChild(link);
};

/**
 * Check if WebP is supported
 */
export const isWebPSupported = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * Get optimal image format based on browser support
 */
export const getOptimalImageFormat = async (): Promise<'webp' | 'jpg'> => {
  const supportsWebP = await isWebPSupported();
  return supportsWebP ? 'webp' : 'jpg';
};