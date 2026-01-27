"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroBackground from "@/components/HeroBackground";
import BehindCurtains from "@/components/BehindCurtains";
import TransitionLink from "@/components/TransitionLink";
import { cn } from "@/lib/utils";

const filterOptions = [
  "All",
  "UI",
  "Motion",
  "Performance",
  "Systems",
  "WIP",
] as const;

type FilterOption = (typeof filterOptions)[number];

type LabEntry = {
  title: string;
  href?: string;
  description: string;
  image?: string;
  video?: string;
  videoType?: string;
  cta: string;
  filters: FilterOption[];
  isComingSoon?: boolean;
};

const labEntries: LabEntry[] = [
  {
    title: "Magnetic Blobs",
    href: "/labs/magnetic-blobs",
    description:
      "Interactive magnetic blobs simulation with WebGL. Smooth, heavy motion with subtle cursor interaction.",
    image: "/labs/Image/Magnetic%20Blobs.png",
    video: "/labs/video/Magnetic%20Blobs.webm",
    videoType: "video/webm",
    cta: "Explore",
    filters: ["Motion"],
  },
  {
    title: "Animated List",
    href: "/labs/animated-list",
    description:
      "Beautifully animated list component with smooth enter/exit transitions, staggered animations, and gesture-based interactions.",
    image: "/labs/Image/Animated-List.png",
    video: "/labs/video/AnimatedList.mp4",
    videoType: "video/mp4",
    cta: "Explore",
    filters: ["UI"],
  },
  {
    title: "Galaxy",
    description:
      "Immersive 3D galaxy visualization with interactive star systems, nebulae, and cosmic particles. Navigate through space.",
    cta: "Coming Soon",
    filters: ["Motion", "WIP"],
    isComingSoon: true,
  },
];

const filterCounts = filterOptions.reduce(
  (acc, filter) => {
    acc[filter] =
      filter === "All"
        ? labEntries.length
        : labEntries.filter((lab) => lab.filters.includes(filter)).length;
    return acc;
  },
  {} as Record<FilterOption, number>
);

function CardFrame() {
  const rawId = useId();
  const safeId = rawId.replace(/:/g, "");
  const steelGradientId = `${safeId}-steelGradient`;
  const innerSteelShineId = `${safeId}-innerSteelShine`;
  const chromeHighlightId = `${safeId}-chromeHighlight`;
  const cornerShineId = `${safeId}-cornerShine`;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      style={{ padding: "1px" }}
    >
      <defs>
        <linearGradient id={steelGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6b7280" />
          <stop offset="12%" stopColor="#9ca3af" />
          <stop offset="25%" stopColor="#4b5563" />
          <stop offset="40%" stopColor="#d1d5db" />
          <stop offset="50%" stopColor="#6b7280" />
          <stop offset="60%" stopColor="#d1d5db" />
          <stop offset="75%" stopColor="#4b5563" />
          <stop offset="88%" stopColor="#9ca3af" />
          <stop offset="100%" stopColor="#6b7280" />
        </linearGradient>
        <linearGradient id={innerSteelShineId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
          <stop offset="30%" stopColor="rgba(255,255,255,0.03)" />
          <stop offset="70%" stopColor="rgba(0,0,0,0.05)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
        </linearGradient>
        <linearGradient id={chromeHighlightId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="20%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="35%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.7)" />
          <stop offset="65%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="80%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <radialGradient id={cornerShineId} cx="15%" cy="15%" r="30%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <rect
        x="1.5"
        y="1.5"
        width="97"
        height="97"
        rx="15"
        ry="15"
        fill="none"
        stroke={`url(#${steelGradientId})`}
        strokeWidth="1.2"
      />
      <rect
        x="2.5"
        y="2.5"
        width="95"
        height="95"
        rx="14"
        ry="14"
        fill="none"
        stroke="rgba(0,0,0,0.15)"
        strokeWidth="0.3"
      />
      <rect
        x="2.5"
        y="2.5"
        width="95"
        height="95"
        rx="14"
        ry="14"
        fill={`url(#${innerSteelShineId})`}
        opacity="0.5"
      />
      <line
        x1="20"
        y1="1.8"
        x2="80"
        y2="1.8"
        stroke={`url(#${chromeHighlightId})`}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <rect
        x="2.5"
        y="2.5"
        width="95"
        height="95"
        rx="14"
        ry="14"
        fill={`url(#${cornerShineId})`}
        opacity="0.4"
      />
    </svg>
  );
}

function LabCard({ lab }: { lab: LabEntry }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startPreview = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    void videoRef.current.play().catch(() => undefined);
  };

  const stopPreview = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  const previewHandlers = lab.video
    ? {
      onMouseEnter: startPreview,
      onMouseLeave: stopPreview,
      onFocus: startPreview,
      onBlur: stopPreview,
    }
    : undefined;

  const cardContent = (
    <div
      className={cn(
        "card-top-down rounded-[44px] flex flex-col h-full border border-neutral-900/10 shadow-[0_4px_20px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06)]",
        lab.isComingSoon && "opacity-60 grayscale pointer-events-none"
      )}
      style={{ backgroundColor: "#FAFAF9" }}
    >
      <div className="card-top-down__wrapper flex flex-col h-full p-6">
        <div className="card-top-down__image flex justify-center">
          <div className="relative aspect-square w-[70%]">
            <CardFrame />
            <div
              className="absolute overflow-hidden bg-neutral-900"
              style={{
                borderRadius: "15%",
                top: "2.5%",
                left: "2.5%",
                right: "2.5%",
                bottom: "2.5%",
              }}
            >
              {lab.image ? (
                <>
                  <Image
                    alt={lab.title}
                    src={lab.image}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover transition-opacity duration-500 ease-out opacity-100 group-hover:opacity-0"
                  />
                  {lab.video ? (
                    <video
                      ref={videoRef}
                      muted
                      loop
                      playsInline
                      title={lab.title}
                      preload="auto"
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out opacity-0 group-hover:opacity-100"
                    >
                      <source src={lab.video} type={lab.videoType} />
                      Your browser does not support the video tag.
                    </video>
                  ) : null}
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-neutral-500"
                  >
                    <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
                    <path d="M8.5 2h7" />
                    <path d="M7 16h10" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="card-top-down__content flex flex-col flex-1 pt-6">
          <div className="flex-1">
            <div className="card-top-down__title text-[20px] font-bold leading-tight mb-3 font-outfit text-neutral-900">
              {lab.title}
            </div>
            <div className="card-top-down__subtitle text-[14px] leading-[1.5] font-outfit line-clamp-4 text-neutral-600">
              {lab.description}
            </div>
          </div>
          <div className="pt-5">
            <span
              className={cn(
                "card-top-down__cta inline-flex items-center justify-center px-6 py-3 rounded-full text-[14px] font-semibold font-outfit transition-all duration-200 border border-neutral-300",
                lab.isComingSoon
                  ? "text-neutral-500"
                  : "text-neutral-900 hover:bg-neutral-900 hover:text-white hover:border-neutral-900"
              )}
            >
              {lab.cta}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  if (!lab.href) {
    return (
      <div className="lab-card-wrapper">
        <div
          className="block h-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white rounded-[44px]"
          {...previewHandlers}
        >
          {cardContent}
        </div>
      </div>
    );
  }

  return (
    <div className="lab-card-wrapper">
      <TransitionLink
        href={lab.href}
        className="group block h-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white rounded-[44px]"
        {...previewHandlers}
      >
        {cardContent}
      </TransitionLink>
    </div>
  );
}

export default function LabsPage() {
  const mainRef = useRef<HTMLElement>(null);
  const filterNavRef = useRef<HTMLElement>(null);
  const filterSentinelRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");
  const [filterNavHeight, setFilterNavHeight] = useState(0);
  const [isFilterPinned, setIsFilterPinned] = useState(false);
  const activeExperiments = labEntries.filter((lab) => !lab.isComingSoon).length;
  const filteredLabs =
    activeFilter === "All"
      ? labEntries
      : labEntries.filter((lab) => lab.filters.includes(activeFilter));

  useLayoutEffect(() => {
    const updateHeight = () => {
      if (!filterNavRef.current) return;
      setFilterNavHeight(filterNavRef.current.getBoundingClientRect().height);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    const updatePinnedState = () => {
      if (!filterSentinelRef.current) return;
      const offset = window.innerWidth >= 768 ? 80 : 64;
      const { top } = filterSentinelRef.current.getBoundingClientRect();
      setIsFilterPinned(top <= offset);
    };

    updatePinnedState();
    window.addEventListener("scroll", updatePinnedState, { passive: true });
    window.addEventListener("resize", updatePinnedState);
    return () => {
      window.removeEventListener("scroll", updatePinnedState);
      window.removeEventListener("resize", updatePinnedState);
    };
  }, []);

  useLayoutEffect(() => {
    if (!mainRef.current) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const selector = gsap.utils.selector(mainRef);
      const heroTitle = selector(".gsap-hero-title");
      const heroTaglines = selector(".gsap-hero-tagline");
      const heroCounter = selector(".labs-counter");
      const cards = selector(".lab-card-wrapper");

      const setFinalState = () => {
        gsap.set([heroTitle, heroTaglines, heroCounter, cards], {
          opacity: 1,
          y: 0,
        });
      };

      if (prefersReducedMotion) {
        setFinalState();
        return;
      }

      gsap.set(heroTitle, { y: 80, opacity: 0 });
      gsap.set(heroTaglines, { y: 30, opacity: 0 });
      gsap.set(heroCounter, { y: 20, opacity: 0 });
      gsap.set(cards, { y: 30, opacity: 0 });

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(heroTitle, { y: 0, opacity: 1, duration: 1 }, 0.05)
        .to(heroTaglines, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 }, 0.15)
        .to(heroCounter, { y: 0, opacity: 1, duration: 0.6 }, 0.35)
        .to(cards, { y: 0, opacity: 1, duration: 0.7, stagger: 0.15 }, 0.5);
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navigation />
      <main ref={mainRef} className="bg-neutral-50 dark:bg-black">
        <section className="relative h-[55vh] md:h-[100dvh] w-full overflow-hidden flex flex-col justify-center items-center pt-24 pb-12 px-6 md:px-12">
          <HeroBackground />
          <div className="flex flex-col items-center justify-center w-full z-10">
            <div className="labs-name-container gsap-hero-title select-none will-change-transform">
              <h1 className="text-[16vw] font-black leading-none text-neutral-900 dark:text-white tracking-[-0.05em] uppercase">
                Labs
              </h1>
            </div>
            <div className="mt-8 text-center space-y-4">
              <p className="labs-tagline-part gsap-hero-tagline text-sm md:text-xl tracking-[0.4em] uppercase text-neutral-500 dark:text-white/40">
                Experimental playground
              </p>
              <p className="labs-tagline-part gsap-hero-tagline font-serif text-4xl md:text-7xl italic text-neutral-900 dark:text-white lowercase leading-tight">
                where ideas come alive.
              </p>
            </div>
            <div className="labs-counter absolute bottom-8 right-8 md:bottom-12 md:right-12 opacity-0">
              <div className="flex items-center gap-2 font-outfit text-[11px] font-medium text-neutral-500 dark:text-white/40 uppercase tracking-wider">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 dark:bg-white/50 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-neutral-500 dark:bg-white/70" />
                </span>
                <span>Active Experiments: {activeExperiments}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="relative w-full bg-neutral-50 dark:bg-black">
          <div ref={filterSentinelRef} className="absolute top-0 left-0 h-px w-full" />
          {isFilterPinned ? (
            <div aria-hidden="true" style={{ height: filterNavHeight }} />
          ) : null}
          <nav
            ref={filterNavRef}
            className={cn(
              "z-40 w-full bg-neutral-50 dark:bg-black py-4 md:py-6",
              isFilterPinned
                ? "fixed top-16 md:top-20 left-0 right-0"
                : "sticky top-16 md:top-20"
            )}
            role="navigation"
            aria-label="Filter experiments"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center gap-2 md:gap-3 overflow-x-auto scrollbar-hide py-1">
                {filterOptions.map((filter) => {
                  const isActive = filter === activeFilter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      className={cn(
                        "relative flex items-center justify-center gap-1.5 md:gap-2 rounded-xl border px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm font-outfit whitespace-nowrap transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 dark:focus-visible:ring-offset-black",
                        isActive
                          ? "border-neutral-300 dark:border-white/30 bg-neutral-100 dark:bg-white/10 text-neutral-900 dark:text-white"
                          : "border-zinc-200 dark:border-white/[0.14] bg-zinc-100 dark:bg-zinc-900 text-neutral-600 dark:text-white/60 hover:border-neutral-300 dark:hover:border-white/25 hover:bg-neutral-200/50 dark:hover:bg-white/[0.08]"
                      )}
                      aria-pressed={isActive}
                      aria-label={`Filter by ${filter}`}
                      tabIndex={0}
                      onClick={() => setActiveFilter(filter)}
                    >
                      <span>{filter}</span>
                      <span
                        className={cn(
                          "text-[10px] md:text-xs tabular-nums",
                          isActive
                            ? "text-neutral-500 dark:text-white/50"
                            : "text-neutral-400 dark:text-white/30"
                        )}
                      >
                        {filterCounts[filter]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-32">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredLabs.map((lab) => (
                <LabCard key={lab.title} lab={lab} />
              ))}
            </div>
          </div>
        </section>

        <section className="w-full bg-neutral-50 dark:bg-black border-t border-neutral-200 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="flex flex-col items-center text-center">
              <p className="text-neutral-600 dark:text-white/50 text-sm md:text-base font-outfit mb-4">
                Want to see how these ideas ship into real products?
              </p>
              <TransitionLink
                className="group inline-flex items-center gap-2 text-neutral-900 dark:text-white font-outfit text-sm font-medium uppercase tracking-wider hover:opacity-70 transition-opacity"
                href="/projects"
              >
                <span>View Projects</span>
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
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </TransitionLink>
            </div>
          </div>
        </section>

        <BehindCurtains />
        <Footer />
      </main>
    </>
  );
}
