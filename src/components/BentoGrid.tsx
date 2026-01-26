"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react";

const philosophyTabs = [
  {
    id: "systems",
    label: "Systems",
    accent: "bg-purple-600",
    activeText: "text-purple-600 dark:text-purple-400",
  },
  {
    id: "firmware",
    label: "Firmware",
    accent: "bg-blue-600",
    activeText: "text-neutral-500 dark:text-white/60",
  },
  {
    id: "devops",
    label: "DevOps",
    accent: "bg-green-600",
    activeText: "text-neutral-500 dark:text-white/60",
  },
  {
    id: "performance",
    label: "Performance",
    accent: "bg-orange-600",
    activeText: "text-neutral-500 dark:text-white/60",
  },
];

const philosophyContent = {
  systems: {
    label: "Systems-first engineering",
    title: "Systems",
    subtitle: "you can trust.",
    summary: "I sweat latency, reliability, and observability — the critical stuff.",
    metricTitle: "Reliability",
    metricDescription: "Predictable behavior under load and in edge conditions.",
  },
  firmware: {
    label: "Firmware foundations",
    title: "Firmware",
    subtitle: "that endures.",
    summary: "Stable embedded systems with careful timing, safety, and power design.",
    metricTitle: "Resilience",
    metricDescription: "Stable behavior across hardware constraints and edge cases.",
  },
  devops: {
    label: "DevOps workflows",
    title: "DevOps",
    subtitle: "that scales.",
    summary: "CI/CD, infrastructure, and tooling that keep delivery fast and safe.",
    metricTitle: "Observability",
    metricDescription: "Metrics, logs, and traces that answer questions quickly.",
  },
  performance: {
    label: "Performance tuning",
    title: "Performance",
    subtitle: "that matters.",
    summary: "Profiling, optimization, and low-latency engineering where it counts.",
    metricTitle: "Efficiency",
    metricDescription: "Lean resource usage without sacrificing correctness.",
  },
} as const;

const CLOCK_NUMBERS = Array.from({ length: 12 }).map((_, index) => {
  const value = index === 0 ? 12 : index;
  const angle = (index * 30 - 60) * (Math.PI / 180);
  const x = 50 + Math.cos(angle) * 28;
  const y = 50 + Math.sin(angle) * 28;
  return {
    value,
    x: x.toFixed(3),
    y: y.toFixed(3),
  };
});

const regionCoords = {
  ca: { lat: 43.6532, lon: -79.3832 },
  us: { lat: 40.7128, lon: -74.006 },
  eu: { lat: 51.5074, lon: -0.1278 },
} as const;

const WORLD_VIEWBOX = { width: 800, height: 400 };

const mapLatLonToPoint = (lat: number, lon: number, width: number, height: number) => {
  const x = ((lon + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return { x: x.toFixed(2), y: y.toFixed(2) };
};

const worldMapPins = Object.fromEntries(
  Object.entries(regionCoords).map(([key, coords]) => [
    key,
    mapLatLonToPoint(coords.lat, coords.lon, WORLD_VIEWBOX.width, WORLD_VIEWBOX.height),
  ])
) as Record<keyof typeof regionCoords, { x: string; y: string }>;

const emailAddress = "Idan.gurevich@gmail.com";

export default function BentoGrid() {
  const [localTime, setLocalTime] = useState("");
  const [clockTime, setClockTime] = useState<Date | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTabId, setActiveTabId] = useState("systems");
  const [activeRegion, setActiveRegion] = useState("ca");
  const [isMounted, setIsMounted] = useState(false);
  const activePhilosophy =
    philosophyContent[activeTabId as keyof typeof philosophyContent] ??
    philosophyContent.systems;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setClockTime(now);
      const local = new Date(now.toLocaleString("en-US", { timeZone: "America/Toronto" }));
      setLocalTime(
        local.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);



  const clockAngles = useMemo(() => {
    if (!clockTime) {
      return { hour: 0, minute: 0, second: 0 };
    }
    const seconds = clockTime.getSeconds();
    const minutes = clockTime.getMinutes() + seconds / 60;
    const hours = (clockTime.getHours() % 12) + minutes / 60;

    return {
      hour: hours * 30,
      minute: minutes * 6,
      second: seconds * 6,
    };
  }, [clockTime]);

  const safeClockAngles = isMounted ? clockAngles : { hour: 0, minute: 0, second: 0 };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-transparent flex flex-col lg:justify-center lg:items-center overflow-visible lg:overflow-hidden">
      <div className="relative w-full h-auto lg:h-0 lg:pb-[75%]">
        <div className="relative lg:absolute inset-0 bg-transparent flex flex-col gap-6 p-4 pb-20 lg:p-0 lg:pb-0 lg:block">
          <div className="relative w-full min-h-[340px] h-auto lg:absolute lg:left-[2.67%] lg:top-[3.56%] lg:w-[21.83%] lg:h-[44%] flex flex-col p-6 sm:p-8 overflow-hidden group">
            <div className="absolute inset-0 border-2 border-black/50 dark:border-white/10 rounded-[24px] bg-white/5 dark:bg-transparent pointer-events-none transition-colors duration-500 group-hover:border-black/60 dark:group-hover:border-white/20 shadow-[inset_0_0_80px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_80px_rgba(255,255,255,0.08)]" />
            <div className="relative z-10 flex flex-col gap-1 mb-4 lg:mb-8">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <h1 className="font-outfit text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight leading-none">
                    Idan{" "}
                    <span className="text-neutral-400 dark:text-white/40 font-serif italic font-normal">
                      Gurevich
                    </span>
                  </h1>
                  <div className="flex items-center gap-2 mt-2 lg:mt-3 text-neutral-500 dark:text-white/40">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-map-pin"
                      aria-hidden="true"
                    >
                      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="font-outfit text-xs uppercase tracking-wider font-medium">
                      Toronto, ON • {isMounted ? localTime : "--:--"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative z-20 flex-1 min-h-[140px] lg:min-h-[180px] -mt-4 lg:-mt-12 -mb-4 lg:-mb-8 -mx-6 sm:-mx-8">
              <div className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/my-image/Main-Avatar.jpeg"
                  alt="Idan Gurevich"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="relative z-10 flex justify-center gap-3 px-6 sm:px-8 py-3 lg:py-4 border-t border-black/5 dark:border-white/5">
              <a
                href="https://www.linkedin.com/in/idangurevich/"
                rel="noopener noreferrer"
                target="_blank"
                className="text-black dark:text-neutral-300 transition-colors"
              >
                <svg
                  fill="none"
                  height="20"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect height="12" width="4" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://github.com/IdanG7"
                rel="noopener noreferrer"
                target="_blank"
                className="text-black dark:text-neutral-300 transition-colors"
              >
                <svg
                  fill="none"
                  height="20"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a
                href="mailto:Idan.gurevich@gmail.com"
                rel="noopener noreferrer"
                target="_blank"
                className="text-black dark:text-neutral-300 transition-colors"
              >
                <svg
                  fill="none"
                  height="20"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2" />
                  <path d="m22 6-10 7L2 6" />
                </svg>
              </a>
            </div>
          </div>

          <div className="relative w-full h-auto min-h-[340px] lg:absolute lg:left-[26.83%] lg:top-[3.56%] lg:w-[46.33%] lg:h-[44%] isolate rounded-[24px] overflow-hidden group flex flex-col justify-between">
            <div className="absolute inset-0 border-2 border-black/50 dark:border-white/10 rounded-[24px] bg-white/5 dark:bg-transparent transition-colors duration-500 group-hover:border-black/60 dark:group-hover:border-white/20 shadow-[inset_0_0_80px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_80px_rgba(255,255,255,0.08)] pointer-events-none" />
            <div className="hidden lg:block absolute left-[20.68%] top-[64.39%] w-[58.63%] h-[82.32%] rounded-full bg-neutral-50 dark:bg-black border border-black/80 dark:border-white/10" />
            <div className="relative z-20 w-full h-full p-6 lg:px-8 lg:pt-8 flex flex-col lg:flex-row">
              <div className="flex-1 flex flex-col justify-start pt-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center justify-center size-8 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-transparent">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-mouse-pointer2 lucide-mouse-pointer-2 text-neutral-600 dark:text-white/70"
                      aria-hidden="true"
                    >
                      <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="hidden lg:block text-[10px] tracking-[0.2em] uppercase text-neutral-500 dark:text-white/50 font-outfit">
                      {activePhilosophy.label}
                    </span>
                    <span className="lg:hidden text-[10px] tracking-[0.2em] uppercase text-neutral-500 dark:text-white/50 font-outfit">
                      Engineering Philosophy
                    </span>
                  </div>
                </div>
                <h2
                  className="text-neutral-900 dark:text-white font-outfit text-2xl lg:text-3xl xl:text-4xl font-bold leading-[1.1] tracking-tight mb-3"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {activePhilosophy.title}
                  <br />
                  <span className="font-serif italic font-light text-neutral-500 dark:text-white/40">
                    {activePhilosophy.subtitle}
                  </span>
                </h2>
                <p className="text-sm lg:text-xs text-neutral-500 dark:text-white/55 max-w-[32ch] lg:max-w-[28ch] leading-relaxed mb-6 lg:mb-0">
                  {activePhilosophy.summary}
                </p>
              </div>
              <div className="flex-none lg:flex-1 flex flex-col items-start lg:items-end pt-2 pr-0 lg:pr-4">
                <div className="hidden sm:flex flex-col items-end gap-2 mb-6 self-end" style={{ opacity: 0.6 }}>
                  <div className="flex items-center gap-2 text-neutral-500 dark:text-white/45">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-outfit">Philosophy</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-neutral-500 dark:text-white/35"
                    >
                      <path d="M12 0L14.595 9.405L24 12L14.595 14.595L12 24L9.405 14.595L0 12L9.405 9.405L12 0Z" />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col items-start lg:items-end gap-2 mb-4 w-full lg:w-auto">
                  <div className="relative flex flex-wrap lg:flex-nowrap justify-start lg:justify-end gap-2 lg:gap-1.5 w-full">
                    {philosophyTabs.map((tab) => {
                      const isActive = tab.id === activeTabId;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveTabId(tab.id)}
                          className={`group/btn relative rounded-full border px-3 lg:px-2.5 py-1.5 lg:py-1 text-xs lg:text-[10px] font-outfit tracking-wide overflow-hidden transition-all duration-300 whitespace-nowrap ${isActive
                            ? "border-neutral-200 dark:border-white/25"
                            : "border-black/10 dark:border-white/10"
                            } ${tab.activeText}`}
                        >
                          <div
                            className={`absolute inset-0 ${tab.accent} translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]`}
                          />
                          <span className="relative z-10 group-hover/btn:text-white transition-colors duration-300">
                            {tab.label}
                          </span>
                          {isActive && <span className="absolute inset-0 rounded-full bg-white/5" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="text-left lg:text-right w-full lg:max-w-[200px]">
                  <div className="text-neutral-900 dark:text-white font-outfit text-sm font-semibold tracking-tight mb-1">
                    {activePhilosophy.metricTitle}
                  </div>
                  <div className="text-xs lg:text-[11px] text-neutral-500 dark:text-white/50 leading-relaxed">
                    {activePhilosophy.metricDescription}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative w-[clamp(180px,45vw,200px)] h-[clamp(180px,45vw,200px)] -my-[95px] mx-auto lg:m-0 lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-[22.5%] lg:h-[30%] rounded-full border-2 border-black/60 dark:border-white/20 flex items-center justify-center z-[70] transition-transform duration-300 hover:scale-[1.02]">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  className="fill-white dark:fill-[#0b0b0b] stroke-neutral-300 dark:stroke-neutral-700"
                  strokeWidth="2"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="fill-none stroke-neutral-400/70 dark:stroke-neutral-600/60"
                  strokeWidth="1.5"
                />
                {Array.from({ length: 60 }).map((_, index) => {
                  const isHour = index % 5 === 0;
                  const rotation = index * 6;
                  return (
                    <line
                      key={`tick-${index}`}
                      x1="50"
                      y1={isHour ? "8" : "11"}
                      x2="50"
                      y2={isHour ? "16" : "14"}
                      className="stroke-neutral-800/80 dark:stroke-white/70"
                      strokeWidth={isHour ? "2" : "1"}
                      strokeLinecap="round"
                      transform={`rotate(${rotation} 50 50)`}
                    />
                  );
                })}
                {CLOCK_NUMBERS.map(({ value, x, y }) => (
                  <text
                    key={`num-${value}`}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-neutral-700 dark:fill-neutral-300 font-outfit text-[6px]"
                  >
                    {value}
                  </text>
                ))}
                <line
                  x1="50"
                  y1="50"
                  x2="50"
                  y2="28"
                  className="stroke-neutral-900 dark:stroke-white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{ transformOrigin: "50% 50%", transform: `rotate(${safeClockAngles.hour}deg)` }}
                />
                <line
                  x1="50"
                  y1="50"
                  x2="50"
                  y2="20"
                  className="stroke-neutral-900 dark:stroke-white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{ transformOrigin: "50% 50%", transform: `rotate(${safeClockAngles.minute}deg)` }}
                />
                <line
                  x1="50"
                  y1="54"
                  x2="50"
                  y2="16"
                  className="stroke-neutral-900 dark:stroke-neutral-600"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  style={{ transformOrigin: "50% 50%", transform: `rotate(${safeClockAngles.second}deg)` }}
                />
                <circle cx="50" cy="50" r="2.5" className="fill-neutral-900 dark:fill-white" />
              </svg>
            </div>
          </div>

          <div className="relative w-full min-h-[340px] h-auto lg:absolute lg:left-[2.67%] lg:top-[50.67%] lg:w-[46.17%] lg:h-[45.78%] isolate rounded-[24px] overflow-hidden bg-neutral-100 dark:bg-black">
            <div className="absolute inset-0 border-2 border-black/50 dark:border-white/20 rounded-[24px] z-30 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_80px_rgba(255,255,255,0.08)]" />
            <div className="hidden lg:block absolute right-[-31.95%] top-[-41.26%] w-[58.84%] h-[79.13%] rounded-full bg-neutral-50 dark:bg-black border border-black/80 dark:border-white/20 z-40" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] aspect-[2/1] z-10">
              <div className="relative h-full w-full">
                <img
                  alt="World map"
                  src="/world.svg"
                  className="absolute inset-0 h-full w-full object-contain opacity-90 dark:invert dark:brightness-110 dark:contrast-90"
                  loading="lazy"
                />
                <svg
                  viewBox={`0 0 ${WORLD_VIEWBOX.width} ${WORLD_VIEWBOX.height}`}
                  className="absolute inset-0 h-full w-full"
                >
                  <circle
                    cx={Number(worldMapPins[activeRegion as keyof typeof worldMapPins].x) - 20}
                    cy={Number(worldMapPins[activeRegion as keyof typeof worldMapPins].y) + 150}
                    r="3"
                    className="fill-emerald-500 stroke-emerald-600"
                  />
                  <circle
                    cx={Number(worldMapPins[activeRegion as keyof typeof worldMapPins].x) - 20}
                    cy={Number(worldMapPins[activeRegion as keyof typeof worldMapPins].y) + 150}
                    r="8"
                    className="fill-emerald-500/20"
                  />
                </svg>
              </div>
            </div>
            <div className="absolute top-6 left-6 z-50">
              <span className="hidden lg:flex items-center gap-2 text-xs text-neutral-600 dark:text-white/50 tracking-widest uppercase mb-2 font-medium">
                Based in Toronto
              </span>
              <h3 className="lg:hidden text-neutral-900 dark:text-white text-xl font-semibold leading-tight">
                Remote
                <br />
                Ready
              </h3>
              <h3 className="hidden lg:block text-neutral-900 dark:text-white text-xl font-semibold leading-tight max-w-[60%] lg:max-w-none">
                Available for
                <br />
                opportunities
              </h3>
            </div>
            <div className="absolute bottom-6 right-6 z-50 flex flex-col gap-1 items-end">
              <div className="flex items-center gap-2 text-white/40">
              </div>
            </div>
            <div className="absolute -left-1/4 -bottom-1/4 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none z-0 blur-3xl" />
          </div>

          <div className="order-last lg:order-none">
            <div className="relative w-full min-h-[340px] h-auto lg:absolute lg:left-[75.50%] lg:top-[3.56%] lg:w-[21.83%] lg:h-[44%] border-2 border-black/50 dark:border-white/20 rounded-[24px] bg-white/5 dark:bg-transparent backdrop-blur-3xl flex flex-col justify-between p-6 sm:p-8 overflow-hidden transition-all duration-500 hover:border-black/60 dark:hover:border-white/50 group shadow-[inset_0_0_80px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_80px_rgba(255,255,255,0.08)]">
              <div className="relative z-10 flex justify-between items-start">
                <div className="w-12 h-12">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle
                      cx="20"
                      cy="20"
                      r="19"
                      className="stroke-neutral-300 dark:stroke-white"
                      strokeOpacity="0.1"
                      strokeWidth="1"
                    />
                    <path
                      d="M10 20C10 14.4772 14.4772 10 20 10C25.5228 10 30 14.4772 30 20"
                      className="stroke-neutral-900 dark:stroke-white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M30 20C30 25.5228 25.5228 30 20 30C14.4772 30 10 25.5228 10 20"
                      className="stroke-neutral-900 dark:stroke-white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle cx="20" cy="20" r="3" className="fill-neutral-900 dark:fill-white" />
                  </svg>
                </div>
                <div />
              </div>
              <div className="relative z-10 -mt-4 flex flex-col gap-4">
                <h3 className="text-2xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter leading-[1.1]">
                  Let&apos;s build systems
                  <br />
                  <span className="font-serif italic font-light text-neutral-400 dark:text-white/40 lowercase tracking-normal leading-none">
                    that run reliably.
                  </span>
                </h3>
                <div
                  className="cursor-pointer group/email inline-block w-full border-t border-black/10 dark:border-white/10 pt-6"
                  role="button"
                  tabIndex={0}
                  onClick={handleCopyEmail}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      handleCopyEmail();
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="overflow-visible">
                        <path
                          d="M16 8 L23 12 L23 20 L16 24 L9 20 L9 12 Z"
                          className="stroke-neutral-900 dark:stroke-white"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity="0.4"
                        />
                        <circle
                          cx="16"
                          cy="16"
                          r="3"
                          className="fill-neutral-400 dark:fill-white/60"
                          fill="rgba(255,255,255,0.6)"
                        />
                        <defs>
                          <linearGradient id="ray-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="50%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#ec4899" />
                          </linearGradient>
                          <linearGradient id="glow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.5" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="relative py-2 flex-1">
                      <p
                        className="text-[25px] text-neutral-900 dark:text-white tracking-tight flex overflow-hidden"
                        style={{ fontFamily: "var(--font-snell-roundhand)" }}
                      >
                        {emailAddress.split("").map((char, index) => (
                          <span key={`${char}-${index}`} className="inline-block">
                            {char}
                          </span>
                        ))}
                      </p>
                      <div className="absolute bottom-0 left-0 right-5 h-[3px] rounded-full origin-left bg-gradient-animated scale-x-0 group-hover/email:scale-x-100 transition-transform duration-500" />
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl pointer-events-none opacity-0 group-hover/email:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3 ml-[44px]">
                    <p className="text-[9px] uppercase tracking-[0.5em] font-medium min-h-[1em] text-neutral-400 dark:text-white/30">
                      {copied ? "Copied!" : "Tap to copy email"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative z-10 flex justify-center lg:block">
                <button className="group/btn relative w-fit px-6 lg:px-0 lg:w-full h-10 lg:h-12 rounded-full bg-white overflow-hidden flex items-center justify-center gap-2 active:scale-95 transition-transform">
                  <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]" />
                  <span className="relative z-10 text-[9px] lg:text-[11px] font-black uppercase tracking-[0.15em] text-black group-hover/btn:text-white transition-colors duration-300">
                    Connect Now
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-up-right relative z-10 text-black group-hover/btn:text-white transition-colors duration-300 lg:w-3.5 lg:h-3.5"
                    aria-hidden="true"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="order-last lg:order-none">
            <div className="relative w-full min-h-[340px] h-auto lg:absolute lg:right-[2.67%] lg:top-[50.67%] lg:w-[46.17%] lg:h-[45.78%] isolate rounded-[24px] overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 border-2 border-black/50 dark:border-white/10 rounded-[24px] bg-neutral-100 dark:bg-black pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_80px_rgba(255,255,255,0.08)]" />
              <div className="hidden lg:block absolute left-[-31.95%] top-[-41.26%] w-[58.84%] h-[79.13%] rounded-full bg-neutral-50 dark:bg-black border border-black/80 dark:border-white/20 z-[60]" />
              <div className="relative z-20 w-full h-full">
                <div className="absolute top-6 right-6 text-right z-50">
                  <h3 className="text-neutral-900 dark:text-white text-3xl font-bold tracking-tighter relative">
                    Building{" "}
                    <span className="relative inline-block">
                      <span
                        className="font-serif italic"
                        style={{
                          background: "linear-gradient(288deg, #ff8000, #f0c 53.2394%, #04f)",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundSize: "200% 200%",
                          animation: "gradient-x 6s infinite",
                        }}
                      >
                        AeroForge
                      </span>
                      <div className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-neutral-300 via-neutral-200 to-transparent dark:from-white/60 dark:via-white/30 dark:to-transparent w-full" />
                    </span>
                  </h3>
                  <p className="text-neutral-500 dark:text-white/40 text-sm mt-2 font-serif tracking-wide italic">
                    <span>&lt;</span> Real-time vision &amp; control <span>/&gt;</span>
                  </p>
                </div>

                <div className="hidden lg:flex absolute right-0 bottom-[-10%] w-full h-full items-end justify-center pointer-events-none px-6">
                  <div
                    className="w-[26%] aspect-[9/19] -mr-12 mb-8 z-10 origin-bottom-right pointer-events-auto"
                    style={{ transform: "translateY(100px) rotate(-15deg)" }}
                  >
                    <div className="relative h-full w-full" style={{ padding: "3px" }}>
                      <div
                        className="absolute inset-0 rounded-[28px]"
                        style={{
                          background:
                            "linear-gradient(145deg, #5a5a5a 0%, #2a2a2a 20%, #1a1a1a 40%, #3a3a3a 60%, #4a4a4a 80%, #2a2a2a 100%)",
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.5), 0 20px 50px rgba(0,0,0,0.5)",
                        }}
                      />
                      <div
                        className="absolute left-0 top-[10%] bottom-[10%] w-[3px] rounded-l-full"
                        style={{
                          background:
                            "linear-gradient(180deg, #666 0%, #999 20%, #777 40%, #aaa 60%, #888 80%, #555 100%)",
                        }}
                      />
                      <div
                        className="absolute right-0 top-[10%] bottom-[10%] w-[3px] rounded-r-full"
                        style={{
                          background:
                            "linear-gradient(180deg, #555 0%, #888 20%, #666 40%, #999 60%, #777 80%, #666 100%)",
                        }}
                      />
                      <div
                        className="absolute top-0 left-[15%] right-[15%] h-[3px] rounded-t-full"
                        style={{
                          background:
                            "linear-gradient(90deg, #444 0%, #888 30%, #bbb 50%, #888 70%, #444 100%)",
                        }}
                      />
                      <div
                        className="absolute top-[18%] -left-[2px] w-[4px] h-[8%] rounded-l-sm"
                        style={{ background: "linear-gradient(90deg, #777, #333)" }}
                      />
                      <div
                        className="absolute top-[30%] -left-[2px] w-[4px] h-[12%] rounded-l-sm"
                        style={{ background: "linear-gradient(90deg, #777, #333)" }}
                      />
                      <div
                        className="absolute top-[45%] -left-[2px] w-[4px] h-[12%] rounded-l-sm"
                        style={{ background: "linear-gradient(90deg, #777, #333)" }}
                      />
                      <div
                        className="absolute top-[35%] -right-[2px] w-[4px] h-[15%] rounded-r-sm"
                        style={{ background: "linear-gradient(270deg, #777, #333)" }}
                      />
                      <div
                        className="relative w-full h-full overflow-hidden rounded-[24px] bg-black"
                        style={{ border: "1px solid rgba(0,0,0,0.8)" }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          alt="App Interface"
                          loading="lazy"
                          src="/images/projects/Project Images/Mobile/Mobile_RuneHub1.PNG"
                          className="object-cover absolute inset-0 h-full w-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent pointer-events-none" />
                      </div>
                      <div
                        className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[30%] h-[14px] bg-black rounded-full z-20"
                        style={{ boxShadow: "inset 0 1px 2px rgba(0,0,0,0.8)" }}
                      />
                    </div>
                  </div>
                  <div
                    className="w-[30%] aspect-[9/19] -mb-4 z-20 shadow-2xl pointer-events-auto"
                    style={{ transform: "translateY(50px)" }}
                  >
                    <div className="relative h-full w-full" style={{ padding: "3px" }}>
                      <div
                        className="absolute inset-0 rounded-[28px]"
                        style={{
                          background:
                            "linear-gradient(145deg, #5a5a5a 0%, #2a2a2a 20%, #1a1a1a 40%, #3a3a3a 60%, #4a4a4a 80%, #2a2a2a 100%)",
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.5), 0 20px 50px rgba(0,0,0,0.5)",
                        }}
                      />
                      <div
                        className="absolute left-0 top-[10%] bottom-[10%] w-[3px] rounded-l-full"
                        style={{
                          background:
                            "linear-gradient(180deg, #666 0%, #999 20%, #777 40%, #aaa 60%, #888 80%, #555 100%)",
                        }}
                      />
                      <div
                        className="absolute right-0 top-[10%] bottom-[10%] w-[3px] rounded-r-full"
                        style={{
                          background:
                            "linear-gradient(180deg, #555 0%, #888 20%, #666 40%, #999 60%, #777 80%, #666 100%)",
                        }}
                      />
                      <div
                        className="absolute top-0 left-[15%] right-[15%] h-[3px] rounded-t-full"
                        style={{
                          background:
                            "linear-gradient(90deg, #444 0%, #888 30%, #bbb 50%, #888 70%, #444 100%)",
                        }}
                      />
                      <div
                        className="absolute top-[18%] -left-[2px] w-[4px] h-[8%] rounded-l-sm"
                        style={{ background: "linear-gradient(90deg, #777, #333)" }}
                      />
                      <div
                        className="absolute top-[30%] -left-[2px] w-[4px] h-[12%] rounded-l-sm"
                        style={{ background: "linear-gradient(90deg, #777, #333)" }}
                      />
                      <div
                        className="absolute top-[45%] -left-[2px] w-[4px] h-[12%] rounded-l-sm"
                        style={{ background: "linear-gradient(90deg, #777, #333)" }}
                      />
                      <div
                        className="absolute top-[35%] -right-[2px] w-[4px] h-[15%] rounded-r-sm"
                        style={{ background: "linear-gradient(270deg, #777, #333)" }}
                      />
                      <div
                        className="relative w-full h-full overflow-hidden rounded-[24px] bg-black"
                        style={{ border: "1px solid rgba(0,0,0,0.8)" }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          alt="App Interface"
                          loading="lazy"
                          src="/images/projects/Project Images/Mobile/Mobile_RuneAI1.PNG"
                          className="object-cover absolute inset-0 h-full w-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent pointer-events-none" />
                      </div>
                      <div
                        className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[30%] h-[14px] bg-black rounded-full z-20"
                        style={{ boxShadow: "inset 0 1px 2px rgba(0,0,0,0.8)" }}
                      />
                    </div>
                  </div>
                  <div
                    className="w-[26%] aspect-[9/19] -ml-12 mb-8 z-10 origin-bottom-left pointer-events-auto"
                    style={{ transform: "translateY(100px) rotate(15deg)" }}
                  >
                    <div className="relative h-full w-full" style={{ padding: "3px" }}>
                      <div
                        className="absolute inset-0 rounded-[28px]"
                        style={{
                          background:
                            "linear-gradient(145deg, #5a5a5a 0%, #2a2a2a 20%, #1a1a1a 40%, #3a3a3a 60%, #4a4a4a 80%, #2a2a2a 100%)",
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.5), 0 20px 50px rgba(0,0,0,0.5)",
                        }}
                      />
                      <div
                        className="absolute left-0 top-[10%] bottom-[10%] w-[3px] rounded-l-full"
                        style={{
                          background:
                            "linear-gradient(180deg, #666 0%, #999 20%, #777 40%, #aaa 60%, #888 80%, #555 100%)",
                        }}
                      />
                      <div
                        className="absolute right-0 top-[10%] bottom-[10%] w-[3px] rounded-r-full"
                        style={{
                          background:
                            "linear-gradient(180deg, #555 0%, #888 20%, #666 40%, #999 60%, #777 80%, #666 100%)",
                        }}
                      />
                      <div
                        className="absolute top-0 left-[15%] right-[15%] h-[3px] rounded-t-full"
                        style={{
                          background:
                            "linear-gradient(90deg, #444 0%, #888 30%, #bbb 50%, #888 70%, #444 100%)",
                        }}
                      />
                      <div
                        className="absolute top-[18%] -left-[2px] w-[4px] h-[8%] rounded-l-sm"
                        style={{ background: "linear-gradient(90deg, #777, #333)" }}
                      />
                      <div
                        className="absolute top-[30%] -left-[2px] w-[4px] h-[12%] rounded-l-sm"
                        style={{ background: "linear-gradient(90deg, #777, #333)" }}
                      />
                      <div
                        className="absolute top-[45%] -left-[2px] w-[4px] h-[12%] rounded-l-sm"
                        style={{ background: "linear-gradient(90deg, #777, #333)" }}
                      />
                      <div
                        className="absolute top-[35%] -right-[2px] w-[4px] h-[15%] rounded-r-sm"
                        style={{ background: "linear-gradient(270deg, #777, #333)" }}
                      />
                      <div
                        className="relative w-full h-full overflow-hidden rounded-[24px] bg-black"
                        style={{ border: "1px solid rgba(0,0,0,0.8)" }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          alt="App Interface"
                          loading="lazy"
                          src="/images/projects/Project Images/Mobile/Mobile_Rune1.PNG"
                          className="object-cover absolute inset-0 h-full w-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent pointer-events-none" />
                      </div>
                      <div
                        className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[30%] h-[14px] bg-black rounded-full z-20"
                        style={{ boxShadow: "inset 0 1px 2px rgba(0,0,0,0.8)" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex lg:hidden absolute left-1/2 -translate-x-1/2 top-[38%] items-center justify-center pointer-events-none z-30">
                  <div
                    className="w-[80px] h-[160px] -mr-3 z-10 pointer-events-auto flex-shrink-0"
                    style={{ transform: "rotate(-8deg) translateY(8px)" }}
                  >
                    <div className="relative h-full w-full" style={{ padding: "2px" }}>
                      <div
                        className="absolute inset-0 rounded-[14px]"
                        style={{
                          background:
                            "linear-gradient(145deg, #5a5a5a 0%, #2a2a2a 20%, #1a1a1a 40%, #3a3a3a 60%, #4a4a4a 80%, #2a2a2a 100%)",
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.5), 0 8px 20px rgba(0,0,0,0.4)",
                        }}
                      />
                      <div
                        className="absolute left-0 top-[10%] bottom-[10%] w-[2px] rounded-l-full"
                        style={{
                          background:
                            "linear-gradient(180deg, #666 0%, #999 20%, #777 40%, #aaa 60%, #888 80%, #555 100%)",
                        }}
                      />
                      <div
                        className="absolute right-0 top-[10%] bottom-[10%] w-[2px] rounded-r-full"
                        style={{
                          background:
                            "linear-gradient(180deg, #555 0%, #888 20%, #666 40%, #999 60%, #777 80%, #666 100%)",
                        }}
                      />
                      <div
                        className="absolute top-0 left-[15%] right-[15%] h-[2px] rounded-t-full"
                        style={{
                          background:
                            "linear-gradient(90deg, #444 0%, #888 30%, #bbb 50%, #888 70%, #444 100%)",
                        }}
                      />
                      <div
                        className="absolute top-[18%] -left-[1px] w-[2px] h-[8%] rounded-l-sm"
                        style={{ background: "linear-gradient(90deg, #777, #333)" }}
                      />
                      <div
                        className="absolute top-[30%] -left-[1px] w-[2px] h-[12%] rounded-l-sm"
                        style={{ background: "linear-gradient(90deg, #777, #333)" }}
                      />
                      <div
                        className="absolute top-[35%] -right-[1px] w-[2px] h-[15%] rounded-r-sm"
                        style={{ background: "linear-gradient(270deg, #777, #333)" }}
                      />
                      <div
                        className="relative w-full h-full overflow-hidden rounded-[12px] bg-black"
                        style={{ border: "1px solid rgba(0,0,0,0.8)" }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          alt="App Interface"
                          loading="lazy"
                          src="/images/projects/Project Images/Mobile/Mobile_RuneHub1.PNG"
                          className="object-cover absolute inset-0 h-full w-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent pointer-events-none" />
                      </div>
                      <div
                        className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[25%] h-[8px] bg-black rounded-full z-20"
                        style={{ boxShadow: "inset 0 1px 2px rgba(0,0,0,0.8)" }}
                      />
                    </div>
                  </div>
                  <div className="w-[88px] h-[176px] z-20 shadow-2xl pointer-events-auto flex-shrink-0">
                    <div className="relative h-full w-full" style={{ padding: "2px" }}>
                      <div
                        className="absolute inset-0 rounded-[14px]"
                        style={{
                          background:
                            "linear-gradient(145deg, #5a5a5a 0%, #2a2a2a 20%, #1a1a1a 40%, #3a3a3a 60%, #4a4a4a 80%, #2a2a2a 100%)",
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.5), 0 8px 20px rgba(0,0,0,0.4)",
                        }}
                      />
                      <div
                        className="absolute left-0 top-[10%] bottom-[10%] w-[2px] rounded-l-full"
                        style={{
                          background:
                            "linear-gradient(180deg, #666 0%, #999 20%, #777 40%, #aaa 60%, #888 80%, #555 100%)",
                        }}
                      />
                      <div
                        className="absolute right-0 top-[10%] bottom-[10%] w-[2px] rounded-r-full"
                        style={{
                          background:
                            "linear-gradient(180deg, #555 0%, #888 20%, #666 40%, #999 60%, #777 80%, #666 100%)",
                        }}
                      />
                      <div
                        className="absolute top-0 left-[15%] right-[15%] h-[2px] rounded-t-full"
                        style={{
                          background:
                            "linear-gradient(90deg, #444 0%, #888 30%, #bbb 50%, #888 70%, #444 100%)",
                        }}
                      />
                      <div
                        className="absolute top-[18%] -left-[1px] w-[2px] h-[8%] rounded-l-sm"
                        style={{ background: "linear-gradient(90deg, #777, #333)" }}
                      />
                      <div
                        className="absolute top-[30%] -left-[1px] w-[2px] h-[12%] rounded-l-sm"
                        style={{ background: "linear-gradient(90deg, #777, #333)" }}
                      />
                      <div
                        className="absolute top-[35%] -right-[1px] w-[2px] h-[15%] rounded-r-sm"
                        style={{ background: "linear-gradient(270deg, #777, #333)" }}
                      />
                      <div
                        className="relative w-full h-full overflow-hidden rounded-[12px] bg-black"
                        style={{ border: "1px solid rgba(0,0,0,0.8)" }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          alt="App Interface"
                          loading="lazy"
                          src="/images/projects/Project Images/Mobile/Mobile_RuneAI1.PNG"
                          className="object-cover absolute inset-0 h-full w-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent pointer-events-none" />
                      </div>
                      <div
                        className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[25%] h-[8px] bg-black rounded-full z-20"
                        style={{ boxShadow: "inset 0 1px 2px rgba(0,0,0,0.8)" }}
                      />
                    </div>
                  </div>
                  <div
                    className="w-[80px] h-[160px] -ml-3 z-10 pointer-events-auto flex-shrink-0"
                    style={{ transform: "rotate(8deg) translateY(8px)" }}
                  >
                    <div className="relative h-full w-full" style={{ padding: "2px" }}>
                      <div
                        className="absolute inset-0 rounded-[14px]"
                        style={{
                          background:
                            "linear-gradient(145deg, #5a5a5a 0%, #2a2a2a 20%, #1a1a1a 40%, #3a3a3a 60%, #4a4a4a 80%, #2a2a2a 100%)",
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.5), 0 8px 20px rgba(0,0,0,0.4)",
                        }}
                      />
                      <div
                        className="absolute left-0 top-[10%] bottom-[10%] w-[2px] rounded-l-full"
                        style={{
                          background:
                            "linear-gradient(180deg, #666 0%, #999 20%, #777 40%, #aaa 60%, #888 80%, #555 100%)",
                        }}
                      />
                      <div
                        className="absolute right-0 top-[10%] bottom-[10%] w-[2px] rounded-r-full"
                        style={{
                          background:
                            "linear-gradient(180deg, #555 0%, #888 20%, #666 40%, #999 60%, #777 80%, #666 100%)",
                        }}
                      />
                      <div
                        className="absolute top-0 left-[15%] right-[15%] h-[2px] rounded-t-full"
                        style={{
                          background:
                            "linear-gradient(90deg, #444 0%, #888 30%, #bbb 50%, #888 70%, #444 100%)",
                        }}
                      />
                      <div
                        className="absolute top-[18%] -left-[1px] w-[2px] h-[8%] rounded-l-sm"
                        style={{ background: "linear-gradient(90deg, #777, #333)" }}
                      />
                      <div
                        className="absolute top-[30%] -left-[1px] w-[2px] h-[12%] rounded-l-sm"
                        style={{ background: "linear-gradient(90deg, #777, #333)" }}
                      />
                      <div
                        className="absolute top-[35%] -right-[1px] w-[2px] h-[15%] rounded-r-sm"
                        style={{ background: "linear-gradient(270deg, #777, #333)" }}
                      />
                      <div
                        className="relative w-full h-full overflow-hidden rounded-[12px] bg-black"
                        style={{ border: "1px solid rgba(0,0,0,0.8)" }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          alt="App Interface"
                          loading="lazy"
                          src="/images/projects/Project Images/Mobile/Mobile_Rune1.PNG"
                          className="object-cover absolute inset-0 h-full w-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent pointer-events-none" />
                      </div>
                      <div
                        className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[25%] h-[8px] bg-black rounded-full z-20"
                        style={{ boxShadow: "inset 0 1px 2px rgba(0,0,0,0.8)" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
