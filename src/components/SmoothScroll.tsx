"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Dynamically import Lenis for smooth scrolling
    const initLenis = async () => {
      try {
        const Lenis = (await import("lenis")).default;

        gsap.registerPlugin(ScrollTrigger);

        lenisRef.current = new Lenis({
          duration: 1.0,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 0.8,
          touchMultiplier: 1.5,
        });

        lenisRef.current.on("scroll", ScrollTrigger.update);

        const tick = (time: number) => {
          lenisRef.current?.raf(time * 1000);
        };

        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(500, 33);

        // Add class to html element
        document.documentElement.classList.add("lenis", "lenis-smooth");

        return () => {
          gsap.ticker.remove(tick);
        };
      } catch (error) {
        // Lenis not available, fall back to native scroll
        console.log("Smooth scroll not available, using native scroll");
      }
    };

    const cleanupPromise = initLenis();

    return () => {
      if (cleanupPromise) {
        Promise.resolve(cleanupPromise).then((cleanup) => cleanup?.());
      }
      lenisRef.current?.destroy();
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, []);

  return <>{children}</>;
}
