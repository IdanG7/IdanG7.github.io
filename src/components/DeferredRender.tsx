import { ReactNode, useEffect, useState } from 'react';

interface DeferredRenderProps {
  children: ReactNode;
  delay?: number;
  fallback?: ReactNode;
}

/**
 * Defers rendering of children to improve initial page load performance
 * Useful for below-the-fold content or non-critical UI elements
 */
export const DeferredRender = ({
  children,
  delay = 100,
  fallback = null
}: DeferredRenderProps) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!shouldRender) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
