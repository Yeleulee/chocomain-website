import { useEffect } from 'react';

interface PerformanceConfig {
  enableResourceHints?: boolean;
  enableCriticalResourcePreload?: boolean;
  enableFontOptimization?: boolean;
}

export const usePerformanceOptimization = (config: PerformanceConfig = {}) => {
  const {
    enableResourceHints = true,
    enableCriticalResourcePreload = true,
    enableFontOptimization = true
  } = config;

  useEffect(() => {
    // Add critical resource hints
    if (enableResourceHints) {
      addResourceHints();
    }

    // Preload critical resources
    if (enableCriticalResourcePreload) {
      preloadCriticalResources();
    }

    // Optimize font loading
    if (enableFontOptimization) {
      optimizeFontLoading();
    }

    // Monitor performance
    monitorPerformance();
  }, [enableResourceHints, enableCriticalResourcePreload, enableFontOptimization]);
};

const addResourceHints = () => {
  const hints = [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
    { rel: 'preconnect', href: 'https://images.unsplash.com' },
    { rel: 'dns-prefetch', href: 'https://www.instagram.com' },
  ];

  hints.forEach(hint => {
    if (!document.querySelector(`link[href="${hint.href}"]`)) {
      const link = document.createElement('link');
      link.rel = hint.rel;
      link.href = hint.href;
      if ('crossorigin' in hint) {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    }
  });
};

const preloadCriticalResources = () => {
  const criticalResources = [
    { href: '/IMAGES/logo.png', as: 'image', type: 'image/png' },
    // Add more critical resources as needed
  ];

  criticalResources.forEach(resource => {
    if (!document.querySelector(`link[href="${resource.href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.type) {
        link.type = resource.type;
      }
      document.head.appendChild(link);
    }
  });
};

const optimizeFontLoading = () => {
  // Add font-display: swap to existing font links
  const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
  fontLinks.forEach(link => {
    if (link instanceof HTMLLinkElement) {
      link.href += '&display=swap';
    }
  });
};

const monitorPerformance = () => {
  // Monitor Core Web Vitals
  if ('web-vital' in window || typeof window !== 'undefined') {
    // Log performance metrics
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType('paint');
        
        console.group('🚀 Performance Metrics');
        console.log('📊 Navigation Timing:', {
          'DNS Lookup': navigation.domainLookupEnd - navigation.domainLookupStart,
          'TCP Connection': navigation.connectEnd - navigation.connectStart,
          'Request': navigation.responseStart - navigation.requestStart,
          'Response': navigation.responseEnd - navigation.responseStart,
          'DOM Processing': navigation.domContentLoadedEventEnd - navigation.responseEnd,
          'Total Load Time': navigation.loadEventEnd - navigation.navigationStart
        });
        
        paint.forEach(entry => {
          console.log(`🎨 ${entry.name}:`, `${entry.startTime.toFixed(2)}ms`);
        });
        console.groupEnd();
      }, 1000);
    });
  }
};

// Performance observer for Core Web Vitals
export const observeWebVitals = () => {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('📏 LCP:', `${lastEntry.startTime.toFixed(2)}ms`);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        console.log('⚡ FID:', `${entry.processingStart - entry.startTime}ms`);
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      });
      console.log('📐 CLS:', clsValue.toFixed(4));
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  }
};