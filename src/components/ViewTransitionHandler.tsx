"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Instantly scrolls to top using Lenis (if available) + native scroll.
 */
export function scrollToTopInstant() {
  const lenis = (window as any).__lenis;
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
  }
  window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
}

/**
 * Apply the circle-reveal animation via Web Animations API.
 *
 * "forward": new page circle expands over old (new on top)
 * "back": old page circle shrinks away revealing new underneath (old on top)
 */
export function applyTransitionAnimation(
  transition: ViewTransition,
  direction: "forward" | "back"
) {
  transition.ready.then(() => {
    if (direction === "forward") {
      // New page expands in — sits on top
      document.documentElement.animate(
        [
          { clipPath: "circle(0% at 50% 50%)", zIndex: 2 },
          { clipPath: "circle(150% at 50% 50%)", zIndex: 2 },
        ],
        {
          duration: 1200,
          easing: "cubic-bezier(0.22, 0.1, 0.25, 1)",
          pseudoElement: "::view-transition-new(root)",
          fill: "forwards",
        }
      );
      // Old page underneath — static
      document.documentElement.animate(
        [{ zIndex: 1, opacity: 1 }, { zIndex: 1, opacity: 1 }],
        {
          duration: 1200,
          pseudoElement: "::view-transition-old(root)",
          fill: "forwards",
        }
      );
    } else {
      // Back: old page shrinks away — sits on top
      document.documentElement.animate(
        [
          { clipPath: "circle(150% at 50% 50%)", zIndex: 2 },
          { clipPath: "circle(0% at 50% 50%)", zIndex: 2 },
        ],
        {
          duration: 1000,
          easing: "cubic-bezier(0.22, 0.1, 0.25, 1)",
          pseudoElement: "::view-transition-old(root)",
          fill: "forwards",
        }
      );
      // New page underneath — static
      document.documentElement.animate(
        [{ zIndex: 1, opacity: 1 }, { zIndex: 1, opacity: 1 }],
        {
          duration: 1000,
          pseudoElement: "::view-transition-new(root)",
          fill: "forwards",
        }
      );
    }

    scrollToTopInstant();
  });

  transition.finished.then(() => {
    scrollToTopInstant();
  });
}

/**
 * Global handler that:
 * 1. Wraps browser back/forward in a view transition with reverse animation
 * 2. Scrolls to top on every route change
 */
export default function ViewTransitionHandler() {
  const pathname = usePathname();

  // Scroll to top on every route change
  useEffect(() => {
    scrollToTopInstant();
    requestAnimationFrame(() => {
      scrollToTopInstant();
    });
  }, [pathname]);

  // Intercept browser back/forward for smooth view transitions
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!document.startViewTransition) return;

    let lastPathname = window.location.pathname;

    const handlePopState = () => {
      const newPathname = window.location.pathname;

      // Skip hash-only changes (e.g. #discussion anchor links)
      if (newPathname === lastPathname) return;
      lastPathname = newPathname;

      const transition = document.startViewTransition(async () => {
        await new Promise<void>((resolve) => setTimeout(resolve, 200));
        scrollToTopInstant();
      });

      // Browser back/forward always uses "back" animation
      applyTransitionAnimation(transition, "back");
    };

    window.addEventListener("popstate", handlePopState, true);
    return () => window.removeEventListener("popstate", handlePopState, true);
  }, []);

  return null;
}
