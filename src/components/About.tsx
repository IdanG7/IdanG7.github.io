"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/idangurevich/",
    icon: (
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        height="20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-1"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/IdanG7",
    icon: (
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        height="20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-1"
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:Idan.gurevich@gmail.com",
    icon: (
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        height="20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-1"
      >
        <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2" />
        <path d="m22 6-10 7L2 6" />
      </svg>
    ),
  },
];

type AboutVariant = "home" | "about";

const aboutCopy: Record<
  AboutVariant,
  {
    kicker: string;
    headline: {
      leading: string;
      highlight: string;
    };
    paragraphs: string[];
  }
> = {
  home: {
    kicker: "A QUICK GLANCE",
    headline: {
      leading: "Engineering reliable ",
      highlight: "systems",
    },
    paragraphs: [
      "Backend engineer specializing in C++ development with deep expertise in firmware engineering, host systems, and infrastructure automation. I build robust, high-performance solutions that power critical infrastructure.",
      "My work focuses on automated testing frameworks, firmware validation, and continuous integration pipelines. I transform complex system requirements into reliable, maintainable code that scales.",
      "Passionate about system-level programming, test automation, and building tools that make engineering teams more efficient.",
    ],
  },
  about: {
    kicker: "A LITTLE ABOUT ME",
    headline: {
      leading: "Nice to meet you. I'm ",
      highlight: "Idan",
    },
    paragraphs: [
      "Backend engineer specializing in C++ development with deep expertise in firmware engineering, host systems, and infrastructure automation. I build robust, high-performance solutions that power critical infrastructure.",
      "My work focuses on automated testing frameworks, firmware validation, and continuous integration pipelines. I transform complex system requirements into reliable, maintainable code that scales.",
      "Passionate about system-level programming, test automation, and building tools that make engineering teams more efficient.",
    ],
  },
};

type AutomationPipelineCardProps = {
  compact?: boolean;
};

function AutomationPipelineCard({ compact = false }: AutomationPipelineCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-neutral-200/80 dark:border-white/10 bg-white/85 dark:bg-black/70 backdrop-blur-xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)]",
        compact && "p-5"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.4em] text-neutral-400">Automation</span>
        <span className="text-[11px] font-semibold text-sky-500">PIPELINE</span>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-neutral-900 dark:text-white">From code to motion</h3>
      <p className="mt-2 text-sm text-neutral-500 dark:text-white/60">
        Writing software, shipping firmware, and watching hardware wake up.
      </p>
      <div
        className={cn(
          "relative mt-5 h-[180px] rounded-2xl border border-neutral-200/70 dark:border-white/10 bg-white/70 dark:bg-black/60 overflow-hidden",
          compact && "mt-4 h-[160px]"
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_55%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.15),transparent_60%)]" />
        <svg
          className="absolute inset-0 about-story-svg"
          viewBox="0 0 520 240"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="about-stage-glow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient id="about-screen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#111827" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          <g className="about-stage about-stage-code" transform="translate(0 -10)">
            <rect x="110" y="60" width="300" height="130" rx="18" fill="url(#about-screen)" stroke="#1f2937" strokeWidth="1.5" />
            <rect x="132" y="82" width="256" height="86" rx="12" fill="#0b1120" stroke="#1e293b" strokeWidth="1" />
            <rect className="about-code-line about-code-line-1" x="150" y="98" width="160" height="6" rx="3" fill="#38bdf8" opacity="0.8" />
            <rect className="about-code-line about-code-line-2" x="150" y="114" width="210" height="6" rx="3" fill="#a855f7" opacity="0.7" />
            <rect className="about-code-line about-code-line-3" x="150" y="130" width="140" height="6" rx="3" fill="#22d3ee" opacity="0.7" />
            <rect className="about-code-line about-code-line-4" x="150" y="146" width="190" height="6" rx="3" fill="#60a5fa" opacity="0.7" />
            <rect className="about-code-caret" x="150" y="162" width="8" height="12" rx="2" fill="#f8fafc" />
            <circle cx="136" cy="72" r="5" fill="#22d3ee" opacity="0.6" />
            <circle cx="154" cy="72" r="5" fill="#a855f7" opacity="0.6" />
            <circle cx="172" cy="72" r="5" fill="#38bdf8" opacity="0.6" />
          </g>

          <g className="about-stage about-stage-upload">
            <rect x="60" y="78" width="170" height="90" rx="14" fill="#0b1220" stroke="#1e293b" strokeWidth="1.5" />
            <rect x="85" y="96" width="120" height="14" rx="7" fill="#38bdf8" opacity="0.25" />
            <rect x="85" y="120" width="90" height="10" rx="5" fill="#22d3ee" opacity="0.3" />
            <rect x="85" y="138" width="102" height="10" rx="5" fill="#a855f7" opacity="0.3" />
            <circle className="about-packet about-packet-1" cx="222" cy="116" r="4.5" fill="#22d3ee" />
            <circle className="about-packet about-packet-2" cx="222" cy="123" r="4.5" fill="#7dd3fc" />
            <circle className="about-packet about-packet-3" cx="222" cy="130" r="4.5" fill="#a855f7" />
            <g className="about-chip">
              <rect x="340" y="78" width="130" height="90" rx="14" fill="#0b1120" stroke="#1e293b" strokeWidth="1.5" />
              <rect x="374" y="104" width="62" height="38" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
              <rect x="386" y="118" width="38" height="10" rx="5" fill="#38bdf8" opacity="0.35" />
              {Array.from({ length: 6 }).map((_, i) => (
                <rect key={`pin-top-${i}`} x={354 + i * 16} y="66" width="6" height="12" rx="3" fill="#1e293b" />
              ))}
              {Array.from({ length: 6 }).map((_, i) => (
                <rect key={`pin-bottom-${i}`} x={354 + i * 16} y="168" width="6" height="12" rx="3" fill="#1e293b" />
              ))}
              {Array.from({ length: 3 }).map((_, i) => (
                <rect key={`pin-left-${i}`} x="326" y={98 + i * 22} width="12" height="6" rx="3" fill="#1e293b" />
              ))}
              {Array.from({ length: 3 }).map((_, i) => (
                <rect key={`pin-right-${i}`} x="470" y={98 + i * 22} width="12" height="6" rx="3" fill="#1e293b" />
              ))}
            </g>
          </g>

          <g className="about-stage about-stage-arm">
            <g transform="translate(160 20)">
              {/* Static base + shoulder + upper arm - no rotation */}
              <g fill="#0b1120" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {/* Base platform */}
                <rect x="30" y="170" width="80" height="14" rx="7" />
                <rect x="50" y="158" width="40" height="16" rx="4" />
                <line x1="40" y1="177" x2="100" y2="177" strokeWidth="1" opacity="0.4" />
                {/* Shoulder joint */}
                <circle cx="70" cy="152" r="12" />
                <circle cx="70" cy="152" r="5" fill="#38bdf8" opacity="0.5" stroke="none" />
                {/* Upper arm */}
                <line x1="70" y1="140" x2="120" y2="90" stroke="#1e293b" strokeWidth="12" />
                <line x1="70" y1="140" x2="120" y2="90" stroke="#0b1120" strokeWidth="9" />
                {/* Elbow joint (static pivot point) */}
                <circle cx="120" cy="90" r="10" />
                <circle cx="120" cy="90" r="4" fill="#22d3ee" opacity="0.5" stroke="none" />
              </g>

              {/* Forearm assembly - pivots from elbow */}
              <g className="about-arm-fore" fill="#0b1120" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {/* Forearm */}
                <line x1="120" y1="90" x2="190" y2="75" stroke="#1e293b" strokeWidth="10" />
                <line x1="120" y1="90" x2="190" y2="75" stroke="#0b1120" strokeWidth="7" />
                {/* Wrist joint */}
                <circle cx="190" cy="75" r="7" />
                <circle cx="190" cy="75" r="3" fill="#a855f7" opacity="0.5" stroke="none" />
                {/* Gripper mount */}
                <line x1="190" y1="75" x2="200" y2="75" strokeWidth="4" />
                {/* Gripper fingers */}
                <line x1="200" y1="75" x2="218" y2="62" strokeWidth="3" />
                <line x1="200" y1="75" x2="218" y2="88" strokeWidth="3" />
                <rect x="214" y="58" width="10" height="6" rx="3" />
                <rect x="214" y="84" width="10" height="6" rx="3" />
                {/* Circuit board held by gripper */}
                <g opacity="0.85">
                  <rect x="208" y="63" width="38" height="24" rx="3" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
                  <rect x="214" y="69" width="10" height="5" rx="1.5" fill="#38bdf8" opacity="0.35" />
                  <rect x="228" y="69" width="12" height="3" rx="1" fill="#22d3ee" opacity="0.3" />
                  <circle cx="236" cy="80" r="2" fill="#a855f7" opacity="0.5" />
                  <circle cx="218" cy="80" r="1.5" fill="#38bdf8" opacity="0.4" />
                  <rect x="225" y="76" width="6" height="4" rx="1" fill="#1e293b" />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

type FocusCardProps = {
  compact?: boolean;
};

function FocusCard({ compact = false }: FocusCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-neutral-200/80 dark:border-white/10 bg-white/85 dark:bg-black/70 backdrop-blur-xl p-6",
        compact && "p-5"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.4em] text-neutral-400">Focus</span>
        <span className="text-[11px] text-neutral-500 dark:text-white/50">2026</span>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-neutral-900 dark:text-white">What I build for</h3>
      <p className="mt-2 text-sm text-neutral-500 dark:text-white/60">
        Reliability first, automation everywhere, and developer velocity that scales.
      </p>
      <div className={cn("mt-4 grid grid-cols-2 gap-3", compact && "gap-2")}>
        {["Resilient APIs", "Firmware validation", "CI/CD automation", "Observability"].map((item) => (
          <div
            key={item}
            className={cn(
              "rounded-2xl border border-neutral-200/70 dark:border-white/10 bg-white/70 dark:bg-black/60 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600 dark:text-white/70",
              compact && "px-2 py-1.5 text-[11px]"
            )}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-2 text-xs text-neutral-500 dark:text-white/50">
        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        Shipping dependable systems, one release at a time.
      </div>
    </div>
  );
}

export default function About({ variant = "home" }: { variant?: AboutVariant }) {
  const content = aboutCopy[variant];
  const isAbout = variant === "about";
  const isHome = variant === "home";

  return (
    <section className="relative w-full z-30 mt-12 md:mt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className={cn(
            "flex flex-col gap-8 lg:gap-12 xl:gap-16",
            (isAbout || isHome) && "lg:flex-row lg:items-start"
          )}
        >
          <div className={cn("w-full", (isAbout || isHome) && "lg:w-[58%] xl:w-[60%]")}>
            <motion.div
              variants={itemVariants}
              className="relative z-2 mb-6 md:mb-8 lg:mb-12 text-center lg:text-left"
            >
              <span className="block mb-2 md:mb-3 text-xs font-outfit tracking-widest text-neutral-500 dark:text-white/70 uppercase md:text-sm font-semibold">
                {content.kicker}
              </span>
              <h2
                className="font-medium tracking-tight text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-balance"
                style={{
                  textShadow:
                    "rgba(255, 255, 255, 0.05) 0px 4px 8px, rgba(255, 255, 255, 0.25) 0px 8px 30px",
                }}
              >
                <span className="text-neutral-900 dark:text-white font-outfit font-semibold">
                  {content.headline.leading}
                </span>
                <span className="text-colorfull animate-gradient-x font-nyght tracking-wide">
                  {content.headline.highlight}
                </span>
              </h2>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative z-5 flex flex-col gap-y-4 md:gap-y-6 lg:gap-y-6 xl:gap-y-8 text-center text-sm sm:text-base md:text-lg lg:text-base xl:text-lg font-light tracking-wider text-neutral-600 dark:text-white/70 lg:text-left max-w-none lg:max-w-full xl:max-w-[550px] font-outfit leading-relaxed"
            >
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              <div
                className={cn(
                  "flex gap-3 justify-center lg:justify-start",
                  isAbout ? "-mt-2 md:-mt-4" : "mt-4"
                )}
              >
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 dark:text-neutral-300 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
                  >
                    <span className="sr-only">{social.name}</span>
                    {social.icon}
                  </a>
                ))}
              </div>

              <Link
                href="/about"
                className="group flex w-fit mx-auto lg:mx-0 font-outfit items-center justify-center gap-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 mt-6 md:mt-8 lg:mt-10 lg:justify-start"
              >
                Dive in deeper
                <div className="size-6 overflow-hidden rounded-full border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/5 duration-500 group-hover:bg-neutral-200 dark:group-hover:bg-white/10">
                  <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                    <span className="flex size-6">
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
                        className="lucide lucide-arrow-right m-auto size-[14px]"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                    <span className="flex size-6">
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
                        className="lucide lucide-arrow-right m-auto size-[14px]"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {isAbout && (
            <motion.div
              variants={itemVariants}
              className="w-full lg:w-[42%] xl:w-[40%] flex flex-col gap-6"
            >
              <AutomationPipelineCard />

              <FocusCard />
            </motion.div>
          )}

          {isHome && (
            <motion.div
              variants={itemVariants}
              className="w-full lg:w-[42%] xl:w-[40%] flex flex-col gap-6"
            >
              <AutomationPipelineCard compact />
              <FocusCard compact />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
