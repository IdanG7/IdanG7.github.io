"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import HeroBackground from "@/components/HeroBackground";

export default function ProjectsHero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const selector = gsap.utils.selector(sectionRef);
      const name = selector(".projects-name-container");
      const tagline = selector(".projects-tagline-part");

      if (prefersReducedMotion) {
        gsap.set(name, { opacity: 1, y: 0 });
        gsap.set(tagline, { opacity: 1, y: 0, filter: "blur(0px)" });
        return;
      }

      gsap.set(name, { y: 100, opacity: 0 });
      gsap.set(tagline, { y: 20, opacity: 0, filter: "blur(8px)" });

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
              .querySelectorAll(".projects-name-container")
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
                .querySelectorAll(".projects-tagline-part")
                .forEach((el) => el.classList.add("gsap-animated"));
            },
          },
          "-=1.2"
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
        ".projects-name-container"
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
      className="relative h-[55vh] md:h-[100dvh] w-full bg-neutral-50 dark:bg-[#050505] overflow-hidden flex flex-col justify-center items-center pt-24 pb-12 px-6 md:px-12"
    >
      <HeroBackground />
      <div className="flex flex-col items-center justify-center w-full z-10 pointer-events-none">
        <div className="projects-name-container gsap-hero-title select-none will-change-transform">
          <h1 className="text-[12vw] md:text-[16vw] font-black leading-none text-neutral-900 dark:text-white tracking-[-0.05em] uppercase text-center font-outfit">
            Projects
          </h1>
        </div>
        <div className="mt-8 text-center space-y-2 md:space-y-4">
          <p className="projects-tagline-part gsap-hero-tagline text-xs md:text-xl tracking-[0.4em] uppercase text-neutral-500 dark:text-white/40 font-outfit font-semibold">
            Systems, firmware, and infrastructure
          </p>
          <div className="projects-tagline-part gsap-hero-tagline relative inline-block">
            <p className="font-nyght text-4xl md:text-7xl italic text-neutral-900 dark:text-white lowercase leading-tight">
              built for real-world performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
