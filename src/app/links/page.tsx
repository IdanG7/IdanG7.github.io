"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BehindCurtains from "@/components/BehindCurtains";
import HeroBackground from "@/components/HeroBackground";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/IdanG7",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/idangurevich/",
  },
  {
    label: "Email",
    href: "mailto:Idan.gurevich@gmail.com",
  },
  {
    label: "Resume",
    href: "/resume.pdf",
  },
];

export default function LinksPage() {
  const mainRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!mainRef.current) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const selector = gsap.utils.selector(mainRef);
      const heroWords = selector(".links-hero-word");
      const heroSub = selector(".links-hero-sub");
      const heroAvatar = selector(".links-hero-avatar");
      const listItems = selector(".links-item");
      const visitLabels = selector(".links-visit");

      const setFinalState = () => {
        gsap.set(heroWords, { opacity: 1, y: 0 });
        gsap.set(heroSub, { opacity: 1, y: 0 });
        gsap.set(heroAvatar, {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        });
        gsap.set(listItems, { opacity: 1, y: 0 });
        gsap.set(visitLabels, { opacity: 1, x: 0 });
      };

      if (prefersReducedMotion) {
        setFinalState();
        return;
      }

      gsap.set(heroWords, { y: 80, opacity: 0 });
      gsap.set(heroSub, { y: 30, opacity: 0 });
      gsap.set(heroAvatar, {
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      });
      gsap.set(listItems, { opacity: 0, y: 20 });
      gsap.set(visitLabels, { opacity: 0, x: -20 });

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(heroSub, { y: 0, opacity: 1, duration: 1 }, 0.05)
        .to(heroWords, { y: 0, opacity: 1, duration: 1.1, stagger: 0.1 }, 0.15)
        .to(
          heroAvatar,
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.2,
          },
          0.2
        )
        .to(listItems, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0.6)
        .to(visitLabels, { opacity: 1, x: 0, duration: 0.6, stagger: 0.08 }, 0.65);
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navigation />
      <main ref={mainRef}>
        <section className="relative w-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-32 pb-12">
          <HeroBackground />
          <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 flex flex-col gap-2 order-2 lg:order-1">
              <div className="overflow-hidden">
                <p className="links-hero-sub hero-sub gsap-hero-subtitle font-outfit text-sm tracking-[0.3em] uppercase text-neutral-500 dark:text-white/60 mb-4 ml-1 will-change-transform">
                  Connect / Follow / Chat
                </p>
              </div>
              <h1 className="flex flex-col text-[12vw] lg:text-[7vw] font-black leading-[0.9] text-neutral-900 dark:text-white tracking-tighter uppercase font-outfit">
                <span className="overflow-hidden block">
                  <span className="links-hero-word hero-word gsap-hero-title block will-change-transform">
                    My
                  </span>
                </span>
                <span className="overflow-hidden block">
                  <span className="links-hero-word hero-word gsap-hero-title block text-neutral-400 dark:text-white/50 will-change-transform">
                    Digital
                  </span>
                </span>
                <span className="overflow-hidden block">
                  <span className="links-hero-word hero-word gsap-hero-title block will-change-transform">
                    Presence
                  </span>
                </span>
              </h1>
            </div>
            <div className="lg:col-span-4 flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="links-hero-avatar relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-neutral-200 dark:border-white/10 shadow-2xl will-change-[clip-path]">
                <Image
                  alt="Idan Gurevich"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 320px"
                  src=""
                />
              </div>
            </div>
          </div>
        </section>

        <section className="relative w-full z-30 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col">
            <div className="w-full h-[1px] bg-neutral-200 dark:bg-white/20 mb-8" />
            {links.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="links-item group relative flex items-center justify-between w-full py-8 md:py-12 border-t border-neutral-100 dark:border-white/10 overflow-hidden cursor-none-target"
              >
                <div className="links-overlay absolute inset-0 bg-neutral-900 dark:bg-white z-0 origin-bottom scale-y-0 transition-transform duration-500 group-hover:scale-y-100" />
                <div className="relative z-10 flex items-baseline gap-8 md:gap-16 pl-4 md:pl-8">
                  <span className="font-mono text-sm md:text-base text-neutral-400 dark:text-white/40 transition-colors duration-300 group-hover:text-white/60 dark:group-hover:text-black/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-4xl md:text-6xl lg:text-7xl font-outfit font-bold uppercase tracking-tighter text-neutral-900 dark:text-white transition-colors duration-300 group-hover:text-white dark:group-hover:text-black">
                    {link.label}
                  </span>
                </div>
                <div className="relative z-10 pr-4 md:pr-8 flex items-center gap-4">
                  <div className="links-visit hidden md:block font-outfit text-sm font-medium uppercase tracking-widest text-neutral-900 dark:text-white group-hover:text-white dark:group-hover:text-black">
                    Visit
                  </div>
                  <div className="p-3 rounded-full border border-neutral-200 dark:border-white/20 text-neutral-900 dark:text-white transition-colors duration-300 group-hover:border-white dark:group-hover:border-black group-hover:text-white dark:group-hover:text-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-up-right w-5 h-5 md:w-6 md:h-6 transition-transform duration-500 group-hover:rotate-45"
                      aria-hidden="true"
                    >
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
            <div className="w-full h-[1px] bg-neutral-200 dark:bg-white/20 mt-0" />
          </div>
        </section>

        <BehindCurtains />
        <Footer />
      </main>
    </>
  );
}
