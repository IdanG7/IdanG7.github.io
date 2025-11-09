/**
 * Performance monitoring utilities for tracking and optimizing app performance
 */

/**
 * Measures the time it takes to execute a function
 */
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`);
};

/**
 * Creates a performance mark for later measurement
 */
export const mark = (name: string) => {
  if (performance.mark) {
    performance.mark(name);
  }
};

/**
 * Measures the time between two marks
 */
export const measure = (name: string, startMark: string, endMark: string) => {
  if (performance.measure) {
    try {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name)[0];
      console.log(`[Performance] ${name}: ${measure.duration.toFixed(2)}ms`);
      return measure.duration;
    } catch (e) {
      console.warn(`Failed to measure ${name}:`, e);
      return 0;
    }
  }
  return 0;
};

/**
 * Reports web vitals and other performance metrics
 */
export const reportWebVitals = () => {
  if (typeof window === 'undefined') return;

  // First Contentful Paint (FCP)
  const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
  if (fcpEntry) {
    console.log(`[Web Vitals] FCP: ${fcpEntry.startTime.toFixed(2)}ms`);
  }

  // Largest Contentful Paint (LCP)
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log(`[Web Vitals] LCP: ${lastEntry.startTime.toFixed(2)}ms`);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // LCP observer may not be supported
    }
  }

  // Time to Interactive (TTI) approximation
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log(`[Web Vitals] Load Time: ${loadTime}ms`);
    }, 0);
  });
};

/**
 * Debounce helper for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle helper for performance optimization
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Lazy load images with native browser API
 */
export const enableNativeLazyLoading = () => {
  return 'loading' in HTMLImageElement.prototype;
};
