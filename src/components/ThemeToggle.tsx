"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { gsap } from "gsap";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      setIsDark(storedTheme === "dark");
      return;
    }
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    const existing = document.querySelector<HTMLDivElement>(
      ".theme-transition-overlay"
    );
    const overlay = existing ?? document.createElement("div");
    if (!existing) {
      overlay.className = "theme-transition-overlay";
      document.body.appendChild(overlay);
    }

    overlayRef.current = overlay;

    return () => {
      if (!existing) {
        overlay.remove();
      }
      overlayRef.current = null;
    };
  }, []);

  const ensureOverlay = useCallback(() => {
    if (overlayRef.current) return overlayRef.current;
    const overlay = document.createElement("div");
    overlay.className = "theme-transition-overlay";
    document.body.appendChild(overlay);
    overlayRef.current = overlay;
    return overlay;
  }, []);

  const toggleTheme = useCallback(() => {
    if (isAnimating) return;

    const overlay = ensureOverlay();
    if (!overlay) return;

    const nextIsDark = !isDark;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsDark(nextIsDark);
      document.documentElement.classList.toggle("dark", nextIsDark);
      document.documentElement.style.colorScheme = nextIsDark ? "dark" : "light";
      localStorage.setItem("theme", nextIsDark ? "dark" : "light");
      return;
    }

    setIsAnimating(true);
    document.documentElement.classList.add("theme-transitioning");

    // Start from center of the viewport
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;

    // Calculate circle size to cover entire viewport
    const maxDistance = Math.max(
      Math.hypot(x, y),
      Math.hypot(window.innerWidth - x, y),
      Math.hypot(x, window.innerHeight - y),
      Math.hypot(window.innerWidth - x, window.innerHeight - y)
    );
    const circleSize = maxDistance * 2.2;

    const circle = document.createElement("div");
    circle.className = "theme-transition-circle";
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.width = `${circleSize}px`;
    circle.style.height = `${circleSize}px`;
    circle.style.background = nextIsDark ? "#000000" : "#ffffff";

    overlay.appendChild(circle);

    const timeline = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        circle.remove();
        document.documentElement.classList.remove("theme-transitioning");
        setIsAnimating(false);
      },
    });

    timeline
      .set(circle, { scale: 0, opacity: 1 })
      .to(circle, { scale: 1, duration: 0.75 })
      .add(() => {
        setIsDark(nextIsDark);
        document.documentElement.classList.toggle("dark", nextIsDark);
        document.documentElement.style.colorScheme = nextIsDark ? "dark" : "light";
        localStorage.setItem("theme", nextIsDark ? "dark" : "light");
        document.documentElement.classList.remove("theme-transitioning");
      }, ">")
      .to(circle, { opacity: 0, duration: 0.25 }, ">-0.05");
  }, [ensureOverlay, isDark, isAnimating]);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={toggleTheme}
        disabled={isAnimating}
        className="group relative inline-flex items-center justify-center h-full overflow-hidden rounded-full bg-neutral-100 dark:bg-white/5 px-3 py-1.5 text-neutral-500 dark:text-white/50 transition-all duration-300 hover:bg-neutral-200 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-white cursor-pointer disabled:opacity-50"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <div className="flex items-center gap-1.5 min-w-[14px]">
          {isDark ? (
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          ) : (
            <svg
              className="w-3.5 h-3.5 text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          )}
        </div>
      </button>
    </>
  );
}
