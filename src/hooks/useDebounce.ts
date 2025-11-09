import { useEffect, useState } from 'react';

/**
 * Debounces a value, delaying updates until after the specified delay
 * Useful for expensive operations like API calls or complex calculations
 * @param value The value to debounce
 * @param delay Delay in milliseconds (default: 500ms)
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
