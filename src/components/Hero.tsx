"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import HeroBackground from "./HeroBackground";
import HeroVideoBackground from "./HeroVideoBackground";
import GlitchText from "./GlitchText";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const selector = gsap.utils.selector(sectionRef);
      const name = selector(".hero-name-container");
      const tagline = selector(".hero-tagline-part");
      const bottomInfo = selector(".hero-bottom-info");

      if (prefersReducedMotion) {
        gsap.set(name, { opacity: 1, y: 0 });
        gsap.set(tagline, { opacity: 1, y: 0, filter: "blur(0px)" });
        gsap.set(bottomInfo, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(name, { y: 100, opacity: 0 });
      gsap.set(tagline, { y: 20, opacity: 0, filter: "blur(8px)" });
      gsap.set(bottomInfo, { y: 30, opacity: 0 });

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(name, {
          y: 0,
          opacity: 1,
          visibility: "visible",
          duration: 2,
          delay: 0.3,
          onComplete: () => {
            document
              .querySelectorAll(".hero-name-container")
              .forEach((el) => el.classList.add("gsap-animated"));
          },
        })
        .to(
          tagline,
          {
            filter: "blur(0px)",
            opacity: 1,
            visibility: "visible",
            y: 0,
            stagger: 0.2,
            duration: 1.5,
            onComplete: () => {
              document
                .querySelectorAll(".hero-tagline-part")
                .forEach((el) => el.classList.add("gsap-animated"));
            },
          },
          "-=1.2"
        )
        .to(
          bottomInfo,
          {
            y: 0,
            opacity: 1,
            visibility: "visible",
            duration: 1,
            onComplete: () => {
              document
                .querySelectorAll(".hero-bottom-info")
                .forEach((el) => el.classList.add("gsap-animated"));
            },
          },
          "-=1"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!sectionRef.current) return;
      const nameContainer = sectionRef.current.querySelector(
        ".hero-name-container"
      ) as HTMLElement | null;
      if (!nameContainer) return;
      const spacing =
        -0.05 +
        0.02 * Math.abs((event.clientX / window.innerWidth - 0.5) * 2);
      nameContainer.style.letterSpacing = `${spacing}em`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100dvh] w-full bg-neutral-50 dark:bg-black overflow-hidden flex flex-col justify-between"
      style={{ padding: "6rem 3rem 3rem 3rem" }}
    >
      <HeroBackground />
      <HeroVideoBackground />

      <div className="w-full" />

      <div className="flex flex-col items-center justify-center w-full z-10">
        <div className="hero-name-container gsap-hero-title select-none will-change-transform">
          <h1 className="text-[16vw] font-black leading-none text-neutral-900 dark:text-white tracking-[-0.05em] uppercase dark:drop-shadow-2xl">
            <GlitchText text="Idan" />
          </h1>
        </div>

        <div className="mt-8 text-center space-y-4">
          <p className="hero-tagline-part gsap-hero-tagline text-sm md:text-xl tracking-[0.4em] uppercase text-neutral-500 dark:text-white/50">
            Backend engineer &amp;
          </p>
          <p className="hero-tagline-part gsap-hero-tagline font-serif text-4xl md:text-7xl italic text-neutral-900 dark:text-white lowercase leading-tight dark:drop-shadow-lg">
            firmware whisperer.
          </p>
        </div>
      </div>

      <div
        className="hero-bottom-info w-full flex justify-between items-end z-30 pointer-events-none"
        style={{ marginBottom: "1rem" }}
      >
        <div className="flex flex-col items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-map-pin w-5 h-5 text-green-500 dark:text-green-400"
            aria-hidden="true"
          >
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <div
            className="text-xs md:text-sm tracking-wider uppercase text-center"
            style={{ fontFamily: "var(--font-clash), sans-serif" }}
          >
            <span className="text-neutral-900 dark:text-white font-medium">BASED IN Toronto,</span>
            <br />
            <span className="text-neutral-500 dark:text-white/50">CANADA</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-layers w-5 h-5 text-blue-500 dark:text-blue-400"
            aria-hidden="true"
          >
            <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
            <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
            <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
          </svg>
          <div
            className="text-xs md:text-sm tracking-wider uppercase text-center"
            style={{ fontFamily: "var(--font-clash), sans-serif" }}
          >
            <span className="text-neutral-900 dark:text-white font-medium">BACKEND ENGINEER,</span>
            <br />
            <span className="text-neutral-500 dark:text-white/50">FIRMWARE - EMBEDDED - DEVOPS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
