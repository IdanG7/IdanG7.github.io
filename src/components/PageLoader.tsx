"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

export default function PageLoader() {
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing");
  const loaderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const holeRef = useRef<HTMLDivElement>(null);
  const hasAnimatedOut = useRef(false);

  const runExitAnimation = useCallback(() => {
    if (hasAnimatedOut.current) return;
    hasAnimatedOut.current = true;

    const loader = loaderRef.current;
    const content = contentRef.current;
    const hole = holeRef.current;

    if (!loader || !content || !hole) {
      setIsComplete(true);
      document.body.style.overflow = "";
      return;
    }

    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        setIsComplete(true);
        document.body.style.overflow = "";
      },
    });

    timeline
      .to(content, {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in"
      })
      .to(
        hole,
        {
          width: "200vmax",
          height: "200vmax",
          duration: 0.8,
          ease: "power3.inOut",
        },
        "-=0.1"
      )
      .to(loader, { autoAlpha: 0, duration: 0.1 }, "-=0.2");
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsComplete(true);
      return;
    }

    document.body.style.overflow = "hidden";

    const startTime = Date.now();
    const minDisplayTime = 800; // Minimum time to show loader
    const maxDisplayTime = 3000; // Maximum time before forcing completion

    let currentProgress = 0;
    let targetProgress = 0;
    let fontsLoaded = false;
    let documentReady = false;

    // Loading text stages
    const updateLoadingText = (prog: number) => {
      if (prog < 30) setLoadingText("Initializing");
      else if (prog < 60) setLoadingText("Loading assets");
      else if (prog < 90) setLoadingText("Preparing experience");
      else setLoadingText("Almost ready");
    };

    // Smooth progress animation
    const animateProgress = () => {
      if (currentProgress < targetProgress) {
        currentProgress += (targetProgress - currentProgress) * 0.15;
        if (targetProgress - currentProgress < 1) {
          currentProgress = targetProgress;
        }
        setProgress(Math.round(currentProgress));
        updateLoadingText(currentProgress);
      }
    };

    // Progress animation loop
    const progressInterval = setInterval(animateProgress, 30);

    // Track document ready state
    if (document.readyState === "complete" || document.readyState === "interactive") {
      documentReady = true;
      targetProgress = Math.max(targetProgress, 40);
    } else {
      document.addEventListener("DOMContentLoaded", () => {
        documentReady = true;
        targetProgress = Math.max(targetProgress, 40);
      });
    }

    // Track fonts
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        fontsLoaded = true;
        targetProgress = Math.max(targetProgress, 70);
      }).catch(() => {
        fontsLoaded = true;
        targetProgress = Math.max(targetProgress, 70);
      });
    } else {
      fontsLoaded = true;
      targetProgress = Math.max(targetProgress, 70);
    }

    // Simulate initial progress
    setTimeout(() => {
      targetProgress = Math.max(targetProgress, 20);
    }, 100);

    setTimeout(() => {
      targetProgress = Math.max(targetProgress, 50);
    }, 300);

    setTimeout(() => {
      targetProgress = Math.max(targetProgress, 80);
    }, 600);

    // Check completion
    const checkCompletion = setInterval(() => {
      const elapsed = Date.now() - startTime;

      // Force completion after max time
      if (elapsed >= maxDisplayTime) {
        targetProgress = 100;
      }

      // Complete when ready
      const isReady = (fontsLoaded && documentReady) || elapsed >= maxDisplayTime;
      const minTimeElapsed = elapsed >= minDisplayTime;

      if (isReady && minTimeElapsed && currentProgress >= 95) {
        clearInterval(checkCompletion);
        clearInterval(progressInterval);
        setProgress(100);

        setTimeout(() => {
          runExitAnimation();
        }, 200);
      }

      // Gradually increase progress towards 100 after min time
      if (minTimeElapsed && isReady) {
        targetProgress = 100;
      }
    }, 50);

    return () => {
      clearInterval(checkCompletion);
      clearInterval(progressInterval);
      document.body.style.overflow = "";
    };
  }, [runExitAnimation]);

  if (isComplete) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-neutral-50 dark:bg-black"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading page"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,197,94,0.03),_transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,_rgba(34,197,94,0.05),_transparent_70%)]" />

      {/* Circle reveal hole */}
      <div
        ref={holeRef}
        className="page-loader-hole text-neutral-50 dark:text-black"
        aria-hidden="true"
      />

      {/* Main content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center gap-8"
      >
        {/* Circular progress */}
        <div className="relative">
          <svg
            className="w-16 h-16 -rotate-90"
            viewBox="0 0 100 100"
          >
            {/* Background ring */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-neutral-200 dark:text-white/10"
            />
            {/* Progress ring */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-neutral-800 dark:text-white/80"
              style={{
                strokeDasharray: `${2 * Math.PI * 45}`,
                strokeDashoffset: `${2 * Math.PI * 45 * (1 - progress / 100)}`,
                transition: 'stroke-dashoffset 0.1s ease-out',
              }}
            />
          </svg>
          {/* Center percentage */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-outfit font-medium text-neutral-800 dark:text-white/90 tabular-nums">
              {progress}
            </span>
          </div>
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] tracking-[0.35em] uppercase text-neutral-500 dark:text-white/50 font-outfit transition-opacity duration-200">
            {loadingText}
          </span>

          {/* Progress bar */}
          <div className="relative w-48 h-[2px] bg-neutral-200 dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-neutral-800 dark:bg-white/80 rounded-full"
              style={{
                width: `${progress}%`,
                transition: 'width 0.1s ease-out'
              }}
            />
          </div>
        </div>

        {/* Dots animation */}
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-white/40 animate-pulse"
              style={{
                animationDelay: `${i * 150}ms`,
                animationDuration: '1s',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
