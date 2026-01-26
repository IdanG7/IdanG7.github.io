"use client";

import { memo, useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import HeroBackground from "@/components/HeroBackground";

const AboutHeroContent = memo(() => (
  <div className="flex flex-col items-center justify-center w-full z-10">
    <div className="about-name-container gsap-hero-title select-none will-change-transform">
      <h1 className="text-[16vw] font-black leading-none text-neutral-900 dark:text-white tracking-[-0.05em] uppercase">
        About Me
      </h1>
    </div>
    <div className="mt-8 text-center space-y-4">
      <p className="about-tagline-part gsap-hero-tagline text-sm md:text-xl tracking-[0.4em] uppercase text-neutral-500 dark:text-white/40">
        Get to know more about
      </p>
      <p className="about-tagline-part gsap-hero-tagline font-serif text-4xl md:text-7xl italic text-neutral-900 dark:text-white lowercase leading-tight">
        who I am.
      </p>
    </div>
  </div>
));

AboutHeroContent.displayName = "AboutHeroContent";

export default function AboutHero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const selector = gsap.utils.selector(sectionRef);
      const name = selector(".about-name-container");
      const tagline = selector(".about-tagline-part");

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
              .querySelectorAll(".about-name-container")
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
                .querySelectorAll(".about-tagline-part")
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

    const ctx = gsap.context(() => {
      const selector = gsap.utils.selector(sectionRef);
      const setSpacing = gsap.quickSetter(
        selector(".about-name-container"),
        "letterSpacing",
        "em"
      );
      let raf = 0;

      const handleMouseMove = (event: MouseEvent) => {
        if (raf) return;
        raf = window.requestAnimationFrame(() => {
          const spacing =
            -0.05 + Math.abs((event.clientX / window.innerWidth - 0.5) * 0.1);
          setSpacing(spacing);
          raf = 0;
        });
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        if (raf) window.cancelAnimationFrame(raf);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[55vh] md:h-[100dvh] w-full overflow-hidden flex flex-col justify-center items-center pt-24 pb-12 px-6 md:px-12"
    >
      <HeroBackground />
      <AboutHeroContent />
    </section>
  );
}
