"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import TransitionLink from "@/components/TransitionLink";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/projects" },
];

const moreLinks = [
  {
    label: "Labs",
    href: "/labs",
    description: "Experimental playground & fun micro-tools",
    featured: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
        <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" />
        <path d="M6.453 15h11.094" />
        <path d="M8.5 2h7" />
      </svg>
    ),
  },
  {
    label: "Links",
    href: "/links",
    description: "Socials & Profiles",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
        <path d="M9 17H7A5 5 0 0 1 7 7h2" />
        <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
        <line x1="8" x2="16" y1="12" y2="12" />
      </svg>
    ),
  },
  {
    label: "Uses",
    href: "/uses",
    description: "My gear & software",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
      </svg>
    ),
  },
];

// NavPill component with hover circle effect
function NavPill({
  href,
  label,
  isActive,
  onClick,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TransitionLink
      href={href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "nav-pill relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border cursor-pointer px-4 py-1.5 transition-colors duration-150",
        isActive
          ? "active-pill bg-neutral-900 text-white dark:bg-white dark:text-black"
          : "bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white/80"
      )}
    >
      {/* Hover circle that expands from bottom */}
      <span
        style={{ willChange: "transform" }}
        className={cn(
          "hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none bg-neutral-900 dark:bg-white transition-all duration-500 ease-out",
          isHovered && !isActive
            ? "w-full h-full -translate-x-1/2"
            : "w-0 h-0 -translate-x-1/2"
        )}
      />

      {/* Active pill background with glow */}
      {isActive && (
        <div className="absolute inset-0 -z-10 w-full rounded-full bg-black/5 dark:bg-white/5">
          {/* Top glow line */}
          <div className="absolute -top-[9px] left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-neutral-900 dark:bg-white">
            <div className="absolute -top-2 -left-2 h-6 w-12 rounded-full bg-neutral-900/20 dark:bg-white/20 blur-md" />
            <div className="absolute -top-1 h-6 w-8 rounded-full bg-neutral-900/20 dark:bg-white/20 blur-md" />
            <div className="absolute top-0 left-2 h-4 w-4 rounded-full bg-neutral-900/20 dark:bg-white/20 blur-sm" />
          </div>
        </div>
      )}

      {/* Label stack for hover effect */}
      <span className="label-stack relative inline-block leading-[1] z-[2]">
        <span
          style={{ willChange: "transform" }}
          className={cn(
            "pill-label relative z-[2] inline-block leading-[1] font-outfit text-sm font-light transition-[text-shadow,color] duration-500 hover:text-white dark:hover:text-black",
            isHovered && !isActive ? "opacity-0 -translate-y-2" : "opacity-100",
            isActive && "text-white dark:text-black"
          )}
        >
          {label}
        </span>
        <span
          style={{ willChange: "transform, opacity" }}
          className={cn(
            "pill-label-hover absolute left-0 top-0 z-[3] inline-block font-outfit text-sm font-light text-white dark:text-black transition-all duration-500",
            isHovered && !isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
            isActive && "text-white dark:text-black"
          )}
        >
          {label}
        </span>
      </span>
    </TransitionLink>
  );
}

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMoreHovered, setIsMoreHovered] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const navPillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 100);
    });
    return () => unsubscribe();
  }, [scrollY]);

  useLayoutEffect(() => {
    const navPill = navPillRef.current;
    if (!navPill) return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(navPill, { autoAlpha: 1, x: 0 });
        return;
      }

      gsap.set(navPill, { autoAlpha: 0, x: 460 });
      gsap.to(navPill, {
        autoAlpha: 1,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.1,
      });

      gsap.to(navPill, {
        x: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "+=350",
          scrub: 1.2,
        },
      });

      ScrollTrigger.refresh();
    }, navPillRef);

    return () => ctx.revert();
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[100] hidden md:flex justify-center pointer-events-none px-6">
        <div className="w-full h-16 md:h-20 flex items-center justify-between transition-all pointer-events-auto">
          {/* Left: Logo + Tagline */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{
              opacity: isScrolled ? 0 : 1,
              x: isScrolled ? -50 : 0,
            }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            style={{ transform: "translateZ(0)" }}
            className={cn(
              "flex items-center gap-4 will-change-transform w-[200px]",
              isScrolled && "pointer-events-none"
            )}
          >
            {/* Tagline - Desktop */}
            <div className="hidden lg:flex items-center gap-3 overflow-hidden">
              <div className="relative group/emerald">
                <div className="absolute inset-0 bg-green-600/20 blur-lg rounded-full opacity-50 group-hover/emerald:opacity-100 transition-opacity duration-500" />
                <Image
                  alt="Emerald"
                  width={18}
                  height={18}
                  className="relative z-10 w-4.5 h-4.5 drop-shadow-[0_0_8px_rgba(22,163,74,0.5)]"
                  src="/icons/emerald.svg"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-outfit text-[8px] tracking-[0.3em] uppercase text-neutral-500 dark:text-white/50 leading-none whitespace-nowrap">
                  Backend Engineer
                </span>
                <span className="font-outfit text-[9px] tracking-[0.15em] text-green-600 uppercase mt-1 whitespace-nowrap font-medium">
                  Firmware &amp; DevOps
                </span>
              </div>
            </div>
          </motion.div>

          {/* Center: Nav Pills */}
          <div
            className="flex-1 flex justify-center will-change-transform relative z-50"
            style={{ transform: "none" }}
          >
            <div className="flex items-center gap-6 transition-none">
              {/* Main Nav Pill Container */}
              <div
                style={{ height: "42px" }}
                ref={navPillRef}
                className="relative hidden md:flex items-center rounded-full overflow-visible bg-white dark:bg-black/90 backdrop-blur-xl border border-neutral-200 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/20 transition-colors duration-150 z-[101]"
              >
                <ul className="relative flex items-center m-0 px-1.5 py-1 h-full list-none z-[3] gap-0">
                  {navLinks.map((link) => (
                    <li key={link.label} className="relative flex h-full">
                      <NavPill
                        href={link.href}
                        label={link.label}
                        isActive={isActive(link.href)}
                      />
                    </li>
                  ))}

                  {/* More Dropdown */}
                  <li
                    className="relative flex h-full group"
                    onMouseEnter={() => {
                      setIsMoreOpen(true);
                      setIsMoreHovered(true);
                    }}
                    onMouseLeave={() => {
                      setIsMoreOpen(false);
                      setIsMoreHovered(false);
                    }}
                  >
                    <button
                      type="button"
                      className="nav-pill relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border cursor-pointer px-4 py-1.5 transition-colors duration-150 bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white/80"
                    >
                      <span
                        style={{ willChange: "transform" }}
                        className={cn(
                          "hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none bg-neutral-900 dark:bg-white transition-all duration-500 ease-out",
                          isMoreHovered ? "w-full h-full -translate-x-1/2" : "w-0 h-0 -translate-x-1/2"
                        )}
                      />
                      <span className="label-stack relative inline-block leading-[1] z-[2]">
                        <span
                          style={{ willChange: "transform" }}
                          className={cn(
                            "pill-label relative z-[2] inline-flex items-center gap-1 leading-[1] font-outfit text-sm font-light transition-[text-shadow,color] duration-500 hover:text-white dark:hover:text-black",
                            isMoreHovered ? "opacity-0 -translate-y-2" : "opacity-100"
                          )}
                        >
                          More
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
                            className="w-3 h-3 opacity-70"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </span>
                        <span
                          style={{ willChange: "transform, opacity" }}
                          className={cn(
                            "pill-label-hover absolute left-0 top-0 z-[3] inline-flex items-center gap-1 font-outfit text-sm font-light text-white dark:text-black transition-all duration-500",
                            isMoreHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                          )}
                        >
                          More
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
                            className="w-3 h-3"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </span>
                      </span>
                    </button>

                    {/* Dropdown Menu */}
                    <div
                      className={cn(
                        "absolute top-[calc(100%+12px)] right-[-58px] w-[530px] bg-white/95 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border border-neutral-200 dark:border-white/10 rounded-3xl p-2 transition-all duration-300 transform shadow-2xl overflow-hidden flex flex-row gap-2 z-[50]",
                        isMoreOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible translate-y-2"
                      )}
                    >
                      {/* Featured: Labs */}
                      <TransitionLink
                        href="/labs"
                        onClick={() => setIsMoreOpen(false)}
                        className="w-[260px] shrink-0 relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600/90 to-indigo-600/90 hover:brightness-110 transition-all duration-300 group/labs flex flex-col justify-end p-5 shadow-inner"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="absolute -right-4 -top-4 w-32 h-32 text-white/10 -rotate-12 group-hover/labs:rotate-6 group-hover/labs:scale-110 transition-all duration-500 ease-out"
                        >
                          <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" />
                          <path d="M6.453 15h11.094" />
                          <path d="M8.5 2h7" />
                        </svg>
                        <div className="relative z-10">
                          <h3 className="font-outfit text-xl font-bold text-white mb-1 shadow-black/20 drop-shadow-sm">Labs</h3>
                          <p className="font-outfit text-xs text-white/80 leading-snug font-medium">
                            Experimental playground & fun micro-tools
                          </p>
                        </div>
                      </TransitionLink>

                      {/* Other Links */}
                      <div className="flex-1 flex flex-col gap-2 min-w-0">
                        {moreLinks
                          .filter((l) => !l.featured)
                          .map((link) => (
                            <TransitionLink
                              key={link.label}
                              href={link.href}
                              onClick={() => setIsMoreOpen(false)}
                              className="group flex items-center gap-4 p-3 rounded-2xl bg-neutral-100/80 dark:bg-white/5 hover:bg-neutral-200/80 dark:hover:bg-white/10 border border-transparent dark:border-white/5 transition-all duration-200"
                            >
                              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-neutral-400/15 dark:border-white/15 bg-zinc-100 dark:bg-zinc-900 ring-1 ring-zinc-300 dark:ring-zinc-700 ring-offset-1 ring-offset-white dark:ring-offset-black transition-all duration-300 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-800">
                                {link.icon}
                              </div>
                              <div className="flex flex-col gap-0.5 truncate">
                                <span className="text-[15px] font-outfit font-semibold text-neutral-900 dark:text-white leading-none truncate">
                                  {link.label}
                                </span>
                                <span className="text-[13px] font-outfit text-neutral-500 dark:text-neutral-400 font-normal truncate">
                                  {link.description}
                                </span>
                              </div>
                            </TransitionLink>
                          ))}
                      </div>
                    </div>
                  </li>

                  {/* Divider */}
                  <li className="relative flex h-full items-center">
                    <div className="w-[1px] h-4 bg-neutral-200 dark:bg-white/10 mx-2" />
                  </li>

                  {/* Theme Toggle */}
                  <li className="relative flex h-full">
                    <ThemeToggle />
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right: Command Menu Button */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{
              opacity: isScrolled ? 0 : 1,
              x: isScrolled ? 50 : 0,
            }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            style={{ transform: "translateZ(0)" }}
            className={cn(
              "hidden md:flex items-center justify-end w-[200px] will-change-transform",
              isScrolled && "pointer-events-none"
            )}
          >
            <button
              onClick={() => setIsMenuOpen(true)}
              className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-white dark:bg-black/90 backdrop-blur-xl border border-neutral-200 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/20 hover:bg-white dark:hover:bg-black transition-colors duration-150 cursor-pointer"
              aria-label="Open Command Menu"
            >
              <span className="text-neutral-700 dark:text-white group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                </svg>
              </span>
            </button>
          </motion.div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-4 left-4 right-4 z-[100]">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-black/90 backdrop-blur-xl border border-neutral-200 dark:border-white/10 shadow-lg transition-colors duration-150"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-5 h-5 text-neutral-700 dark:text-white/70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 left-0 right-0 rounded-3xl bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border border-neutral-200 dark:border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col w-full relative z-30">
                {/* Header */}
                <div className="h-[48px] w-full flex items-center px-5 shrink-0 gap-3 border-b border-neutral-200 dark:border-white/10">
                  <Link
                    href="/"
                    className="relative z-30 font-outfit text-neutral-800 dark:text-white/90 text-xs font-medium tracking-wide flex-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Idan Gurevich
                  </Link>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-0.5 px-3 py-4">
                  {navLinks.map((link) => (
                    <TransitionLink
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl font-outfit transition-all",
                        isActive(link.href)
                          ? "bg-neutral-200/80 dark:bg-white/10 text-neutral-900 dark:text-white font-medium"
                          : "text-neutral-600 dark:text-white/70 hover:bg-neutral-100 dark:hover:bg-white/5"
                      )}
                    >
                      <span className="text-sm">{link.label}</span>
                    </TransitionLink>
                  ))}

                  <div className="h-px bg-neutral-200 dark:bg-white/10 my-2" />

                  {moreLinks.map((link) => (
                    <TransitionLink
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl font-outfit transition-all",
                        link.featured
                          ? "bg-gradient-to-r from-violet-600/10 to-indigo-600/10 text-violet-600 dark:text-violet-400"
                          : isActive(link.href)
                            ? "bg-neutral-200/80 dark:bg-white/10 text-neutral-900 dark:text-white font-medium"
                            : "text-neutral-600 dark:text-white/70 hover:bg-neutral-100 dark:hover:bg-white/5"
                      )}
                    >
                      <span className="text-sm">{link.label}</span>
                    </TransitionLink>
                  ))}

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
