"use client";

import { useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";
import { gsap } from "gsap";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BehindCurtains from "@/components/BehindCurtains";
import HeroBackground from "@/components/HeroBackground";

type InventoryItem = {
  id: string;
  name: string;
  type: string;
  description: string;
  icon: ReactNode;
  details?: string[];
};

const baseIconProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const softwareInventory: InventoryItem[] = [
  {
    id: "01",
    name: "Raycast",
    type: "Productivity",
    description: "Launcher & Extensions",
    icon: (
      <svg {...baseIconProps} className="lucide lucide-command" aria-hidden="true">
        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
      </svg>
    ),
  },
  {
    id: "02",
    name: "Brave",
    type: "Browser",
    description: "Primary Browser",
    icon: (
      <svg {...baseIconProps} className="lucide lucide-globe" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    id: "03",
    name: "VS Code",
    type: "Editor",
    description: "Primary IDE",
    icon: (
      <svg {...baseIconProps} className="lucide lucide-code" aria-hidden="true">
        <path d="m16 18 6-6-6-6" />
        <path d="m8 6-6 6 6 6" />
      </svg>
    ),
  },
  {
    id: "04",
    name: "Visual Studio 2019-2026",
    type: "Editor",
    description: "Secondary IDE",
    icon: (
      <svg {...baseIconProps} className="lucide lucide-code" aria-hidden="true">
        <path d="m16 18 6-6-6-6" />
        <path d="m8 6-6 6 6 6" />
      </svg>
    ),
  },
  {
    id: "05",
    name: "Obsidian",
    type: "Notes",
    description: "Second Brain",
    icon: (
      <svg {...baseIconProps} className="lucide lucide-file-text" aria-hidden="true">
        <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
        <path d="M14 2v5a1 1 0 0 0 1 1h5" />
        <path d="M10 9H8" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
      </svg>
    ),
  },
  {
    id: "06",
    name: "Spotify",
    type: "Music",
    description: "Audio Streaming",
    icon: (
      <svg {...baseIconProps} className="lucide lucide-music" aria-hidden="true">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    id: "07",
    name: "Google Calendar",
    type: "Calendar",
    description: "Time Management",
    icon: (
      <svg {...baseIconProps} className="lucide lucide-calendar" aria-hidden="true">
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
      </svg>
    ),
  },
  {
    id: "08",
    name: "Bitwarden",
    type: "Security",
    description: "Password Manager",
    icon: (
      <svg {...baseIconProps} className="lucide lucide-lock" aria-hidden="true">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    id: "09",
    name: "NordVPN",
    type: "VPN",
    description: "Secure browsing",
    icon: (
      <svg {...baseIconProps} className="lucide lucide-shield" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      </svg>
    ),
  },
  {
    id: "10",
    name: "Steam",
    type: "Games",
    description: "Game Library",
    icon: (
      <svg {...baseIconProps} className="lucide lucide-gamepad-2" aria-hidden="true">
        <line x1="6" x2="10" y1="12" y2="12" />
        <line x1="8" x2="8" y1="10" y2="14" />
        <line x1="15" x2="15.01" y1="13" y2="13" />
        <line x1="18" x2="18.01" y1="11" y2="11" />
        <rect width="20" height="12" x="2" y="8" rx="6" />
      </svg>
    ),
  },
  {
    id: "11",
    name: "Snipping Tool",
    type: "Utility",
    description: "Screen Capture",
    icon: (
      <svg {...baseIconProps} className="lucide lucide-scissors" aria-hidden="true">
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="20" x2="8.12" y1="4" y2="15.88" />
        <line x1="14.47" x2="20" y1="14.48" y2="20" />
        <line x1="8.12" x2="12" y1="8.12" y2="12" />
      </svg>
    ),
  },
];

const hardwareInventory: InventoryItem[] = [
  {
    id: "H1",
    name: "Custom Built PC",
    type: "Workstation",
    description: "Desktop Build",
    details: [
      "CPU: Intel Core i5-11600K (6C/12T)",
      "GPU: Asus ROG STRIX GeForce GTX 1080 8 GB",
      "Motherboard: ASUS TUF Gaming Z590-Plus (LGA 1200)",
      "RAM: G.Skill Ripjaws V 32 GB DDR4-3600",
      "Storage: Samsung 970 Evo 500 GB NVMe",
      "Storage: 2x Seagate BarraCuda Pro 4 TB 3.5\"",
      "PSU: Corsair HX750 Platinum 750 W 80+ Platinum",
      "Case: Corsair 4000D Airflow ATX Mid Tower",
      "Cooling: Corsair iCUE H150i ELITE CAPELLIX",
    ],
    icon: (
      <svg {...baseIconProps} className="lucide lucide-cpu" aria-hidden="true">
        <path d="M12 20v2" />
        <path d="M12 2v2" />
        <path d="M17 20v2" />
        <path d="M17 2v2" />
        <path d="M2 12h2" />
        <path d="M2 17h2" />
        <path d="M2 7h2" />
        <path d="M20 12h2" />
        <path d="M20 17h2" />
        <path d="M20 7h2" />
        <path d="M7 20v2" />
        <path d="M7 2v2" />
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="8" y="8" width="8" height="8" rx="1" />
      </svg>
    ),
  },
  {
    id: "H2",
    name: "AOC 27G2SP 27\"",
    type: "Display",
    description: "Primary Monitor",
    icon: (
      <svg {...baseIconProps} className="lucide lucide-monitor" aria-hidden="true">
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
      </svg>
    ),
  },
  {
    id: "H3",
    name: "AOC AG271QX 27\"",
    type: "Display",
    description: "Secondary Monitor",
    icon: (
      <svg {...baseIconProps} className="lucide lucide-monitor" aria-hidden="true">
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
      </svg>
    ),
  },
  {
    id: "H4",
    name: "Custom Built Wooting 60HE+",
    type: "Input",
    description: "Analog Keyboard",
    details: [
      "Switches: Yellow (Analog)",
      "Case: Tofu60 Redux",
    ],
    icon: (
      <svg {...baseIconProps} className="lucide lucide-keyboard" aria-hidden="true">
        <path d="M10 8h.01" />
        <path d="M12 12h.01" />
        <path d="M14 8h.01" />
        <path d="M16 12h.01" />
        <path d="M18 8h.01" />
        <path d="M6 8h.01" />
        <path d="M7 16h10" />
        <path d="M8 12h.01" />
        <rect width="20" height="16" x="2" y="4" rx="2" />
      </svg>
    ),
  },
  {
    id: "H5",
    name: "Logitech G305",
    type: "Input",
    description: "Wireless Mouse",
    icon: (
      <svg {...baseIconProps} className="lucide lucide-mouse" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="7" />
        <path d="M12 6v4" />
      </svg>
    ),
  },
  {
    id: "H6",
    name: "iPhone 17 Pro",
    type: "Mobile",
    description: "Primary Device",
    icon: (
      <svg
        {...baseIconProps}
        className="lucide lucide-smartphone"
        aria-hidden="true"
      >
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
  {
    id: "H7",
    name: "MacBook Pro M2 14\"",
    type: "Laptop",
    description: "Portable Workstation",
    icon: (
      <svg {...baseIconProps} className="lucide lucide-laptop" aria-hidden="true">
        <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
        <line x1="12" x2="12.01" y1="18" y2="18" />
      </svg>
    ),
  },
  {
    id: "H8",
    name: "Bose QuietComfort Ultra",
    type: " On The Go Audio",
    description: "Noise Cancellation",
    icon: (
      <svg
        {...baseIconProps}
        className="lucide lucide-headphones"
        aria-hidden="true"
      >
        <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
      </svg>
    ),
  },
  {
    id: "H9",
    name: "Beyerdynamic DT 770 Pro",
    type: "Office Audio",
    description: "Studio Sound",
    icon: (
      <svg
        {...baseIconProps}
        className="lucide lucide-headphones"
        aria-hidden="true"
      >
        <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
      </svg>
    ),
  },
  {
    id: "H10",
    name: "Rode PodMic",
    type: "Microphone",
    description: "Microphone",
    icon: (
      <svg {...baseIconProps} className="lucide lucide-mic" aria-hidden="true">
        <path d="M12 1a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <path d="M12 19v4" />
        <path d="M8 23h8" />
      </svg>
    ),
  },
  {
    id: "H11",
    name: "Focusrite Scarlett 2i2",
    type: "Audio Interface",
    description: "Mic & Headphones Hub",
    icon: (
      <svg {...baseIconProps} className="lucide lucide-radio" aria-hidden="true">
        <path d="M4.9 19.1C1 15.1 1 8.9 4.9 4.9" />
        <path d="M7.7 16.3a6 6 0 0 1 0-8.6" />
        <circle cx="12" cy="12" r="2" />
        <path d="M16.3 7.7a6 6 0 0 1 0 8.6" />
        <path d="M19.1 4.9C23 8.9 23 15.1 19.1 19.1" />
      </svg>
    ),
  },
];

export default function UsesPage() {
  const mainRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!mainRef.current) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const selector = gsap.utils.selector(mainRef);
      const taglines = selector(".gsap-hero-tagline");
      const divider = selector(".gsap-hero-divider");
      const title = selector(".gsap-hero-title");
      const description = selector(".gsap-hero-description");

      if (prefersReducedMotion) {
        gsap.set(taglines, { opacity: 1, y: 0 });
        gsap.set(divider, { scaleX: 1 });
        gsap.set(title, { opacity: 1, y: 0 });
        gsap.set(description, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(taglines, { y: 24, opacity: 0 });
      gsap.set(divider, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(title, { y: 50, opacity: 0 });
      gsap.set(description, { y: 24, opacity: 0 });

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(taglines, { y: 0, opacity: 1, duration: 1, stagger: 0.12 }, 0.1)
        .to(divider, { scaleX: 1, duration: 0.8 }, 0.2)
        .to(title, { y: 0, opacity: 1, duration: 1.1 }, 0.25)
        .to(description, { y: 0, opacity: 1, duration: 0.9 }, 0.35);
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navigation />
      <main ref={mainRef}>
        <section className="relative w-full px-4 sm:px-6 lg:px-8 pt-32 pb-12 overflow-hidden">
          <HeroBackground />
          <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-end min-h-[40vh] border-l border-neutral-200 dark:border-white/10 pl-6 md:pl-12">
            <div className="flex flex-col gap-2 mb-8">
              <div className="overflow-hidden">
                <p className="hero-text gsap-hero-tagline font-mono text-xs md:text-sm text-green-600 dark:text-green-400/80 tracking-widest uppercase will-change-transform">
                  // SYSTEM_CONFIGURATION_V.25
                </p>
              </div>
              <div className="overflow-hidden">
                <p className="hero-text gsap-hero-tagline font-mono text-xs md:text-sm text-neutral-500 dark:text-white/40 tracking-widest uppercase will-change-transform">
                  USER: IDAN_GUREVICH
                </p>
              </div>
            </div>
            <div className="w-full h-[1px] bg-neutral-300 dark:bg-white/20 mb-8 manifest-line gsap-hero-divider origin-left will-change-transform" />
            <div className="overflow-hidden">
              <h1 className="hero-text gsap-hero-title text-6xl md:text-8xl lg:text-9xl font-black text-neutral-900 dark:text-white tracking-tighter uppercase font-outfit leading-[0.85] mb-4 will-change-transform">
                Uses
              </h1>
            </div>
            <div className="overflow-hidden">
              <p className="hero-text gsap-hero-description text-xl md:text-3xl font-light text-neutral-600 dark:text-white/60 max-w-2xl font-outfit will-change-transform">
                A curated manifest of hardware, software, and workflow essentials.
              </p>
            </div>
          </div>
        </section>

        <section className="relative w-full z-30 pb-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col gap-32">
            <div className="flex flex-col">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-300 dark:border-white/40 mb-2">
                <h3 className="font-mono text-sm tracking-widest text-green-600 dark:text-green-400 uppercase">
                  01 / Software_Inventory
                </h3>
                <span className="font-mono text-xs text-neutral-500 dark:text-white/40">
                  Status: Active
                </span>
              </div>
              <div className="hidden md:grid grid-cols-12 py-3 border-b border-neutral-200 dark:border-white/10 text-xs font-mono text-neutral-400 dark:text-white/30 uppercase tracking-wider">
                <div className="col-span-1">ID</div>
                <div className="col-span-4">Name</div>
                <div className="col-span-3">Type</div>
                <div className="col-span-4 text-right">Description</div>
              </div>
              <div>
                {softwareInventory.map((item) => (
                  <div
                    key={item.id}
                    className="inventory-row group relative grid grid-cols-1 md:grid-cols-12 py-5 md:py-4 border-b border-neutral-100 dark:border-white/5 items-center hover:bg-neutral-100 dark:hover:bg-white/[0.02] transition-colors duration-200 will-change-transform"
                  >
                    <div className="hidden md:block col-span-1 font-mono text-xs text-neutral-400 dark:text-white/30 group-hover:text-green-600 dark:text-green-400 transition-colors">
                      {item.id}
                    </div>
                    <div className="col-span-12 md:col-span-4 flex items-center gap-4">
                      <div className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-neutral-400/15 dark:border-white/15 bg-zinc-100 dark:bg-zinc-900 ring-1 ring-zinc-300 dark:ring-zinc-700 ring-offset-1 ring-offset-white dark:ring-offset-black [&_svg]:pointer-events-none [&_svg]:text-neutral-500 dark:[&_svg]:text-neutral-400 [&_svg]:size-4 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-800 group-hover:[&_svg]:text-neutral-900 dark:group-hover:[&_svg]:text-white transition-all duration-300">
                        {item.icon}
                      </div>
                      <span className="text-xl md:text-lg font-outfit font-medium text-neutral-800 dark:text-white/90 group-hover:text-neutral-900 dark:group-hover:text-white md:tracking-tight">
                        {item.name}
                      </span>
                    </div>
                    <div className="hidden md:block col-span-3 font-mono text-xs text-neutral-500 dark:text-white/50 uppercase tracking-wide">
                      {item.type}
                    </div>
                    <div className="hidden md:block col-span-4 text-right font-mono text-xs text-neutral-400 dark:text-white/40 group-hover:text-neutral-600 dark:group-hover:text-white/60">
                      {item.description}
                    </div>
                    {item.details && (
                      <div className="md:col-span-12 pt-3 md:pt-2 text-xs text-neutral-500 dark:text-white/40">
                        <details className="group/details">
                          <summary className="cursor-pointer font-mono uppercase tracking-widest text-[10px] text-neutral-500 dark:text-white/40">
                            View details
                          </summary>
                          <ul className="mt-2 space-y-1 font-mono">
                            {item.details.map((detail) => (
                              <li key={detail} className="text-neutral-600 dark:text-white/60">
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </details>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-300 dark:border-white/40 mb-2">
                <h3 className="font-mono text-sm tracking-widest text-orange-600 dark:text-orange-400 uppercase">
                  02 / Hardware_Inventory
                </h3>
                <span className="font-mono text-xs text-neutral-500 dark:text-white/40">
                  Status: Deployed
                </span>
              </div>
              <div>
                {hardwareInventory.map((item) => (
                  <div
                    key={item.id}
                    className="inventory-row group relative grid grid-cols-1 md:grid-cols-12 py-5 md:py-4 border-b border-neutral-100 dark:border-white/5 items-center hover:bg-neutral-100 dark:hover:bg-white/[0.02] transition-colors duration-200 will-change-transform"
                  >
                    <div className="hidden md:block col-span-1 font-mono text-xs text-neutral-400 dark:text-white/30 group-hover:text-orange-600 dark:text-orange-400 transition-colors">
                      {item.id}
                    </div>
                    <div className="col-span-12 md:col-span-4 flex items-center gap-4">
                      <div className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-neutral-400/15 dark:border-white/15 bg-zinc-100 dark:bg-zinc-900 ring-1 ring-zinc-300 dark:ring-zinc-700 ring-offset-1 ring-offset-white dark:ring-offset-black [&_svg]:pointer-events-none [&_svg]:text-neutral-500 dark:[&_svg]:text-neutral-400 [&_svg]:size-4 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-800 group-hover:[&_svg]:text-neutral-900 dark:group-hover:[&_svg]:text-white transition-all duration-300">
                        {item.icon}
                      </div>
                      <span className="text-xl md:text-lg font-outfit font-medium text-neutral-800 dark:text-white/90 group-hover:text-neutral-900 dark:group-hover:text-white md:tracking-tight">
                        {item.name}
                      </span>
                    </div>
                    <div className="hidden md:block col-span-3 font-mono text-xs text-neutral-500 dark:text-white/50 uppercase tracking-wide">
                      {item.type}
                    </div>
                    <div className="hidden md:block col-span-4 text-right font-mono text-xs text-neutral-400 dark:text-white/40 group-hover:text-neutral-600 dark:group-hover:text-white/60">
                      {item.description}
                    </div>
                    {item.details && (
                      <div className="md:col-span-12 pt-3 md:pt-2 text-xs text-neutral-500 dark:text-white/40">
                        <details className="group/details">
                          <summary className="cursor-pointer font-mono uppercase tracking-widest text-[10px] text-neutral-500 dark:text-white/40">
                            View parts
                          </summary>
                          <ul className="mt-2 space-y-1 font-mono">
                            {item.details.map((detail) => (
                              <li key={detail} className="text-neutral-600 dark:text-white/60">
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </details>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <BehindCurtains />
        <Footer />
      </main>
    </>
  );
}
