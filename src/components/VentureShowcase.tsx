"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

type Project = {
  id: number;
  title: string;
  image: string;
  image2: string;
  mobile1: string;
  mobile2: string;
  url: string;
};

type ProjectStyle = {
  gradient: string;
  textColor: string;
  shadow: string;
  headerText: string;
};

type ProjectTech = {
  name: string;
  icon: string;
};

type ProjectDetail = {
  title: string;
  description: string;
  features: string[];
  tech: ProjectTech[];
  color: keyof typeof COLOR_STYLES;
};

type ProjectCardProps = {
  project: Project;
  style: ProjectStyle;
  details: ProjectDetail;
  isIPad: boolean;
};

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "AeroForge",
    image: "/images/projects/Project Images/1rune.codes.png",
    image2: "/images/projects/Project Images/2rune.codes.png",
    mobile1: "/images/projects/Project Images/Mobile/Mobile_Rune1.PNG",
    mobile2: "/images/projects/Project Images/Mobile/Mobile_Rune2.PNG",
    url: "https://github.com/IdanG7/AeroForge",
  },
  {
    id: 2,
    title: "Multiplayer SDK",
    image: "/images/projects/Project Images/1runeai.png",
    image2: "/images/projects/Project Images/2runeai.png",
    mobile1: "/images/projects/Project Images/Mobile/Mobile_RuneAI1.PNG",
    mobile2: "/images/projects/Project Images/Mobile/Mobile_RuneAI2.PNG",
    url: "https://github.com/IdanG7",
  },
  {
    id: 3,
    title: "InfraMind",
    image: "/images/projects/Project Images/1runehub.png",
    image2: "/images/projects/Project Images/2runehub.png",
    mobile1: "/images/projects/Project Images/Mobile/Mobile_RuneHub1.PNG",
    mobile2: "/images/projects/Project Images/Mobile/Mobile_RuneHub2.PNG",
    url: "https://github.com/IdanG7/InfraMind",
  },
  {
    id: 4,
    title: "Sentinel",
    image: "/images/projects/1Portfolio.png",
    image2: "/images/projects/1Portfolio.png",
    mobile1: "/images/projects/Project Images/Mobile/Mobile_Porto1.PNG",
    mobile2: "/images/projects/Project Images/Mobile/Mobile_Porto2.png",
    url: "https://github.com/IdanG7/Sentinel",
  },
];

const PROJECT_STYLES: ProjectStyle[] = [
  {
    gradient:
      "linear-gradient(10deg, rgb(153, 27, 27) 49.9%, rgb(153, 27, 27) 81.7%, rgb(239, 68, 68) 99.88%, rgb(249, 215, 147) 113.5%)",
    textColor: "text-red-300",
    shadow: "shadow-[0_0_30px_#DC2626]",
    headerText:
      "C++20 vision pipeline for drone control with real-time object tracking and safety layers.",
  },
  {
    gradient:
      "linear-gradient(10deg, rgb(194, 65, 12) 49.9%, rgb(194, 65, 12) 81.7%, rgb(253, 186, 116) 99.88%, rgb(249, 215, 147) 113.5%)",
    textColor: "text-orange-300",
    shadow: "shadow-[0_0_30px_#F97316]",
    headerText:
      "Distributed matchmaking and game services stack supporting sub-100ms sessions at scale.",
  },
  {
    gradient:
      "linear-gradient(10deg, rgb(41, 50, 203) 49.9%, rgb(41, 50, 203) 81.7%, rgb(121, 128, 255) 99.88%, rgb(249, 215, 147) 113.5%)",
    textColor: "text-blue-300",
    shadow: "shadow-[0_0_30px_#2932CB]",
    headerText:
      "ML platform optimizing CI/CD workflows with telemetry, caching, and automated tuning.",
  },
  {
    gradient:
      "linear-gradient(10deg, rgb(157, 23, 77) 49.9%, rgb(157, 23, 77) 81.7%, rgb(251, 182, 206) 99.88%, rgb(249, 215, 147) 113.5%)",
    textColor: "text-pink-300",
    shadow: "shadow-[0_0_30px_#DB2777]",
    headerText:
      "Autonomous infrastructure controller for AI workloads with AI-driven remediation.",
  },
];

const PROJECT_DETAILS: ProjectDetail[] = [
  {
    title: "AeroForge",
    description:
      "Cross-platform C++20 framework for vision-based drone control with real-time object detection and autonomous navigation.",
    features: [
      "Interactive object selection via click-and-drag tracking",
      "Complete processing chain: detection → tracking → 3D estimation → PID control",
      "Comprehensive safety mechanisms (geofence, hold-to-enable, e-stop, speed limits)",
    ],
    tech: [
      { name: "C++20", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
      { name: "OpenCV", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg" },
      { name: "YAML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/yaml/yaml-original.svg" },
      { name: "Linux", icon: "/icons/linux.svg" },
      { name: "Windows", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows8/windows8-original.svg" },
      { name: "Git", icon: "/icons/git.svg" },
    ],
    color: "red",
  },
  {
    title: "Multiplayer SDK",
    description:
      "Production-grade distributed matchmaking and game services platform supporting real-time session allocation at scale.",
    features: [
      "MMR-based dynamic matchmaking queues with region and latency constraints",
      "Sub-100ms matching latency supporting 10,000+ concurrent players",
      "Modular backend services: Auth, Lobby, Session, Leaderboard",
    ],
    tech: [
      { name: "C++17", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "Docker", icon: "/icons/docker.svg" },
      { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
      { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
      { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg" },
    ],
    color: "orange",
  },
  {
    title: "InfraMind",
    description:
      "ML-powered platform that automatically optimizes CI/CD workflows by learning from build history to suggest optimal configurations.",
    features: [
      "Universal REST API compatibility with Jenkins, GitHub Actions, GitLab CI, CircleCI",
      "ML-driven automatic suggestions for CPU, memory, and concurrency settings",
      "Low-overhead performance telemetry and automatic cache tuning",
    ],
    tech: [
      { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
      { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
      { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
      { name: "Docker", icon: "/icons/docker.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
    ],
    color: "blue",
  },
  {
    title: "Sentinel",
    description:
      "Autonomous infrastructure controller for AI/ML workloads with Claude AI-powered auto-remediation and intelligent Kubernetes management.",
    features: [
      "AI-driven auto-remediation for CI/CD failures and infrastructure alerts",
      "Multi-cluster orchestration with intelligent GPU scheduling",
      "Real-time observability with Prometheus, Grafana, and Jaeger",
    ],
    tech: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" },
      { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg" },
      { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
      { name: "Prometheus", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg" },
      { name: "Grafana", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg" },
    ],
    color: "pink",
  },
];

const ProjectHeading = () => (
  <div className="w-full text-center mb-6 sm:mb-8 md:mb-12 relative pt-8 sm:pt-16 md:pt-28 pb-10 sm:pb-16 md:pb-20">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] opacity-20 pointer-events-none">
      <div className="absolute inset-0 rounded-full bg-linear-to-r from-purple-500/30 to-blue-500/30 blur-[60px] animate-pulse" />
    </div>
    <div className="relative flex flex-col items-center px-4">
      <p className="text-xs sm:text-sm uppercase tracking-wider text-neutral-500 dark:text-gray-300 mb-1 sm:mb-2 font-outfit">
        Crafting modern experiences
      </p>
      <div className="flex items-center">
        <h2 className="font-outfit font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-neutral-900 dark:text-white">
          VENTURE
        </h2>
        <h2 className="work-text ml-1.5 sm:ml-2 md:ml-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          SHOWCASE
        </h2>
      </div>
    </div>
  </div>
);

const COLOR_STYLES = {
  pink: {
    bg: "bg-pink-600",
    star: "fill-pink-600 text-pink-400 bg-pink-600/20",
  },
  emerald: {
    bg: "bg-emerald-600",
    star: "fill-emerald-600 text-emerald-400 bg-emerald-600/20",
  },
  blue: {
    bg: "bg-blue-600",
    star: "fill-blue-600 text-blue-400 bg-blue-600/20",
  },
  purple: {
    bg: "bg-purple-600",
    star: "fill-purple-600 text-purple-400 bg-purple-600/20",
  },
  orange: {
    bg: "bg-orange-600",
    star: "fill-orange-600 text-orange-400 bg-orange-600/20",
  },
  neutral: {
    bg: "bg-neutral-500",
    star: "fill-neutral-400 text-neutral-300 bg-neutral-600/20",
  },
  red: {
    bg: "bg-red-600",
    star: "fill-red-600 text-red-400 bg-red-600/20",
  },
  white: {
    bg: "bg-white",
    star: "fill-white text-white bg-white/20",
  },
} as const;

const getColorStyle = (color: keyof typeof COLOR_STYLES) =>
  COLOR_STYLES[color] ?? COLOR_STYLES.pink;

const StarIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M12 1C12 1 12 8 10 10C8 12 1 12 1 12C1 12 8 12 10 14C12 16 12 23 12 23C12 23 12 16 14 14C16 12 23 12 23 12C23 12 16 12 14 10C12 8 12 1 12 1Z" />
  </svg>
);

const ArrowRightIcon = ({ className = "" }: { className?: string }) => (
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
    className={className}
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const MobileProjectInfo = ({ details }: { details: ProjectDetail }) => {
  const styles = getColorStyle(details.color);

  return (
    <div className="mobile-project-info mt-4 sm:mt-5 p-4 sm:p-5 bg-neutral-100 dark:bg-white/5 rounded-xl sm:rounded-2xl border border-black/10 dark:border-white/10 lg:hidden">
      <div className="flex items-center mb-2 sm:mb-3">
        <div
          aria-hidden="true"
          className={`mr-2 sm:mr-3 h-1 w-5 sm:w-6 rounded-full ${styles.bg}`}
        />
        <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white font-outfit">
          {details.title}
        </h3>
      </div>
      <p className="text-neutral-600 dark:text-gray-300 mb-3 sm:mb-4 leading-relaxed font-outfit text-sm sm:text-base">
        {details.description}
      </p>
      <ul className="list-none p-0 mb-4 sm:mb-5">
        {details.features.map((feature, index) => (
          <li
            key={feature}
            className="flex items-start mb-1.5 sm:mb-2 text-neutral-600 dark:text-gray-300 text-xs sm:text-sm font-outfit"
          >
            <StarIcon
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 mt-0.5 shrink-0 rounded-full p-0.5 ${styles.star}`}
            />
            {feature}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {details.tech.slice(0, 6).map((tech) => (
          <div
            key={tech.name}
            className="flex items-center gap-1 sm:gap-1.5 bg-white dark:bg-black/30 border border-black/10 dark:border-white/[0.14] rounded-lg sm:rounded-xl px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs text-neutral-600 dark:text-gray-300 font-outfit"
          >
            <Image
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 object-contain"
              height={12}
              width={12}
              alt={tech.name}
              src={tech.icon}
              unoptimized
            />
            {tech.name}
          </div>
        ))}
      </div>
    </div>
  );
};

const HoverRing = ({
  x,
  y,
  isVisible,
}: {
  x: ReturnType<typeof useMotionValue>;
  y: ReturnType<typeof useMotionValue>;
  isVisible: boolean;
}) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        className="pointer-events-none fixed z-50"
        style={{ left: x, top: y }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ opacity: { duration: 0.15 }, scale: { duration: 0.15 } }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2">
          <div className="pointer-events-none rounded-full border border-neutral-900/25 dark:border-white/25 bg-neutral-900/5 dark:bg-white/5 backdrop-blur-sm">
            <motion.div
              className="rounded-full font-medium leading-none bg-transparent size-[96px] relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-1/2 left-1/2 size-20 -translate-x-1/2 -translate-y-1/2">
                <svg
                  viewBox="0 0 100 100"
                  overflow="visible"
                  fill="transparent"
                  className="w-full h-full absolute inset-0"
                >
                  <path
                    id="curve-viewdetails"
                    d="M 0 50 L 0 50 A 1 1 0 0 1 100 50 L 100 50 L 100 50 A 1 1 0 0 1 0 50 L 0 50"
                    strokeWidth="none"
                    fill="transparent"
                  />
                  <text>
                    <textPath
                      href="#curve-viewdetails"
                      startOffset="0"
                      dominantBaseline="hanging"
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        wordSpacing: "4px",
                        letterSpacing: "1.8px",
                      }}
                      className="fill-neutral-900 dark:fill-[rgba(255,255,255,0.95)]"
                    >
                      VISIT PROJECT · VISIT PROJECT ·
                    </textPath>
                  </text>
                </svg>
              </div>
            </motion.div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-12 rounded-full bg-neutral-900/15 dark:bg-white/15 p-3 text-neutral-900 dark:text-white"
              aria-hidden="true"
            >
              <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const MobileDeviceCard = ({
  imageSrc,
  alt,
  gradient,
  delay = 0,
}: {
  imageSrc: string;
  alt: string;
  gradient: string;
  delay?: number;
}) => (
  <motion.div
    className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg"
    style={{ background: gradient, height: "190.41px" }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="absolute inset-x-0 top-4 sm:top-5 flex justify-center">
      <div className="relative w-[55%] max-w-[190px]" style={{ padding: "2px" }}>
        <div
          className="absolute inset-0 rounded-[18px] sm:rounded-[22px]"
          style={{
            background:
              "linear-gradient(145deg, #5a5a5a 0%, #2a2a2a 20%, #1a1a1a 40%, #3a3a3a 60%, #4a4a4a 80%, #2a2a2a 100%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.5), 0 8px 20px rgba(0,0,0,0.4)",
          }}
        />
        <div
          className="absolute left-0 top-[10%] bottom-0 w-[2px] rounded-l-full"
          style={{
            background:
              "linear-gradient(180deg, #666 0%, #999 20%, #777 40%, #aaa 60%, #888 80%, #555 100%)",
          }}
        />
        <div
          className="absolute right-0 top-[10%] bottom-0 w-[2px] rounded-r-full"
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
          className="absolute top-[18%] -left-[1.5px] w-[3px] h-[8%] rounded-l-sm"
          style={{ background: "linear-gradient(90deg, #777, #333)" }}
        />
        <div
          className="absolute top-[30%] -left-[1.5px] w-[3px] h-[12%] rounded-l-sm"
          style={{ background: "linear-gradient(90deg, #777, #333)" }}
        />
        <div
          className="absolute top-[25%] -right-[1.5px] w-[3px] h-[15%] rounded-r-sm"
          style={{ background: "linear-gradient(270deg, #777, #333)" }}
        />
        <div
          className="absolute top-1.5 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-2.5 sm:h-3 bg-black rounded-full z-20"
          style={{ boxShadow: "inset 0 1px 2px rgba(0,0,0,0.8)" }}
        />
        <div
          className="relative bg-white rounded-[14px] sm:rounded-[18px] overflow-hidden"
          style={{ border: "1px solid rgba(0,0,0,0.8)" }}
        >
          <Image
            src={imageSrc}
            alt={alt}
            width={280}
            height={580}
            className="w-full h-auto object-cover object-top"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/6 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  </motion.div>
);

const DesktopDeviceCard = ({
  imageSrc,
  alt,
  gradient,
}: {
  imageSrc: string;
  alt: string;
  gradient: string;
}) => (
  <motion.div
    className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg h-full"
    style={{ background: gradient }}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.1 }}
  >
    <div className="p-3 sm:p-4 lg:p-5 h-full flex items-center justify-center">
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <div className="relative w-full aspect-[16/10] bg-[#1a1a1a] rounded-lg sm:rounded-xl shadow-2xl p-[1.5%] sm:p-[1.2%] ring-1 ring-white/10 group transform-gpu">
          <div className="relative w-full h-full bg-black rounded-md sm:rounded-lg overflow-hidden ring-1 ring-white/5">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[14%] sm:w-[12%] h-[6%] sm:h-[7%] bg-black rounded-b-md sm:rounded-b-lg z-20 flex items-end justify-center pb-1 border-b border-x border-white/10 shadow-sm">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#111] ring-1 ring-white/20 opacity-80 shadow-inner" />
              <div className="absolute right-[25%] top-[50%] w-0.5 h-0.5 rounded-full bg-blue-900/40" />
            </div>
            <div className="relative w-full h-full bg-white">
              <Image
                src={imageSrc}
                alt={alt}
                width={1200}
                height={750}
                className="w-full h-full object-cover object-top"
                unoptimized
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none mix-blend-overlay z-10 opacity-50" />
            </div>
          </div>
          <div className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-[20%] h-[3px] bg-[#333] rounded-b-lg opacity-80" />
        </div>
      </div>
    </div>
  </motion.div>
);

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ project, style, details, isIPad }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const frameRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    useEffect(() => {
      const update = () => {
        setIsMobile(window.innerWidth < 1024);
      };
      update();
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }, []);

    const gradient = style.gradient;

    return (
      <>
        {!isMobile && (
          <HoverRing x={x} y={y} isVisible={isHovered} />
        )}
        <motion.div
          ref={ref}
          className={`project-card w-full ${isIPad ? "" : "lg:project-card-animate"}`}
          initial={isMobile || isIPad ? { opacity: 0, y: 50, scale: 0.95 } : false}
          whileInView={
            isMobile || isIPad ? { opacity: 1, y: 0, scale: 1 } : undefined
          }
          viewport={isMobile || isIPad ? { once: true, margin: "-50px" } : undefined}
          transition={
            isMobile || isIPad
              ? { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
              : undefined
          }
        >
          <div className="flex flex-col w-full lg:max-w-[865px]" style={{ margin: 0, border: 0 }}>
            <a
              href={project.url}
              draggable="false"
              className="project-frame group relative block w-full lg:max-w-[865px] lg:h-auto lg:min-h-[350px]"
              style={{ background: "transparent" }}
            >
              <div
                ref={frameRef}
                className="relative w-full h-full"
                onMouseMove={(event) => {
                  if (isMobile || !frameRef.current) return;
                  const bounds = frameRef.current.getBoundingClientRect();
                  const nextX = Math.max(
                    bounds.left + 48,
                    Math.min(event.clientX, bounds.right - 48)
                  );
                  const nextY = Math.max(
                    bounds.top + 48,
                    Math.min(event.clientY, bounds.bottom - 48)
                  );
                  x.set(nextX);
                  y.set(nextY);
                }}
                onMouseEnter={(event) => {
                  if (isMobile || !frameRef.current) return;
                  const bounds = frameRef.current.getBoundingClientRect();
                  const nextX = Math.max(
                    bounds.left + 48,
                    Math.min(event.clientX, bounds.right - 48)
                  );
                  const nextY = Math.max(
                    bounds.top + 48,
                    Math.min(event.clientY, bounds.bottom - 48)
                  );
                  x.set(nextX);
                  y.set(nextY);
                  setIsHovered(true);
                }}
                onMouseLeave={() => {
                  setIsHovered(false);
                }}
              >
                <div className="hidden sm:grid sm:grid-cols-[minmax(160px,28%)_minmax(0,1fr)] lg:grid-cols-[minmax(200px,262px)_minmax(400px,1fr)] gap-3 sm:gap-4 lg:gap-5 h-full justify-center w-full">
                  <div className="flex flex-col gap-4 lg:gap-[30px]">
                    <MobileDeviceCard
                      imageSrc={project.mobile1}
                      alt={`${project.title} Mobile View 1`}
                      gradient={gradient}
                      delay={0}
                    />
                    <MobileDeviceCard
                      imageSrc={project.mobile2}
                      alt={`${project.title} Mobile View 2`}
                      gradient={gradient}
                      delay={0.15}
                    />
                  </div>
                  <div className="h-full">
                    <DesktopDeviceCard
                      imageSrc={project.image}
                      alt={project.title}
                      gradient={gradient}
                    />
                  </div>
                </div>
                <div className="sm:hidden aspect-[16/10]">
                  <DesktopDeviceCard
                    imageSrc={project.image}
                    alt={project.title}
                    gradient={gradient}
                  />
                </div>
              </div>
            </a>
            <MobileProjectInfo details={details} />
          </div>
        </motion.div>
      </>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

const ProjectDetails = ({
  details,
  isActive,
  isIPad,
}: {
  details: ProjectDetail;
  isActive: boolean;
  isIPad: boolean;
}) => {
  const styles = getColorStyle(details.color);
  const [hasMounted, setHasMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setHasMounted(true);
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const showDarkAssets = !hasMounted || isDark;

  if (!isIPad && !isActive) {
    return null;
  }

  return (
    <div className="flex w-full h-auto lg:h-[400px] relative" style={{ paddingRight: "20px" }}>
      <div
        aria-hidden="true"
        className={`my-4 mr-4 rounded-full flex-shrink-0 ${styles.bg}`}
        style={{ width: "24px", height: "4px" }}
      />
      <div className="flex flex-col items-start w-full">
        <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-white font-outfit leading-tight">
          {details.title}
        </h3>
        <p className="my-3 text-sm lg:text-base font-light text-neutral-600 dark:text-gray-300 font-outfit leading-relaxed max-w-prose">
          {details.description}
        </p>
        <ul className="mt-2 lg:mt-4 flex flex-col gap-y-2 text-sm lg:text-base text-neutral-600 dark:text-gray-200/85">
          {details.features.map((feature) => (
            <li key={feature} className="flex items-start text-sm font-outfit">
              <StarIcon
                className={`mt-1 mr-2 size-4 lg:size-5 shrink-0 rounded-full lg:bg-white lg:dark:bg-black ${styles.star}`}
              />
              <span className="leading-tight">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 lg:mt-8 flex flex-wrap gap-2 lg:gap-3 text-xs lg:text-sm">
          {details.tech.map((tech) => {
            let icon = tech.icon;
            let iconStyle: CSSProperties = {};

            if (!showDarkAssets) {
              if (icon.includes("nextjs_icon_dark")) {
                iconStyle = { filter: "invert(1)" };
              } else if (icon.includes("_dark")) {
                icon = icon.replace("_dark", "_light");
              }
            }

            return (
              <div
                key={tech.name}
                className="flex items-center gap-1.5 lg:gap-2 rounded-xl border border-black/10 dark:border-white/[0.14] bg-neutral-100 dark:bg-neutral-900 px-2.5 py-1 lg:px-3 lg:py-1 font-outfit text-neutral-700 dark:text-gray-300"
              >
                <Image
                  height={16}
                  width={16}
                  alt={tech.name}
                  src={icon}
                  className="h-3.5 w-3.5 lg:h-4 lg:w-4 object-contain"
                  style={iconStyle}
                  unoptimized
                />
                {tech.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const SeeMoreProjects = ({ href = "https://github.com/IdanG7" }) => (
  <div className="w-full flex justify-center items-center py-6 pb-16 sm:py-8 sm:pb-20 lg:py-20 lg:pb-20">
    <a
      className="group flex w-fit items-center justify-center gap-2 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors duration-300 font-outfit"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      See more projects
      <div className="size-6 overflow-hidden rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 transition-colors duration-500 group-hover:bg-black/10 dark:group-hover:bg-white/10">
        <div className="flex w-12 -translate-x-1/2 transition-transform duration-500 ease-in-out group-hover:translate-x-0">
          <span className="flex size-6">
            <ArrowRightIcon className="m-auto size-3.5 text-neutral-600 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white transition-colors" />
          </span>
          <span className="flex size-6">
            <ArrowRightIcon className="m-auto size-3.5 text-neutral-600 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white transition-colors" />
          </span>
        </div>
      </div>
    </a>
  </div>
);

export default function VentureShowcase({
  showHeading = true,
}: {
  showHeading?: boolean;
}) {
  const [isIPad, setIsIPad] = useState(false);
  const [isIPad11, setIsIPad11] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      setIsIPad11(width >= 820 && width <= 844);
      setIsIPad(width >= 768 && width <= 1024);
      setIsMobile(width < 768);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isTablet = isIPad || isIPad11;
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stickyBoxRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
  const pinTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  const clearScrollTriggers = useCallback(() => {
    scrollTriggersRef.current.forEach((trigger) => trigger.kill());
    scrollTriggersRef.current = [];
    if (pinTriggerRef.current) {
      pinTriggerRef.current.kill();
      pinTriggerRef.current = null;
    }
  }, []);

  const setProjectRef = useCallback(
    (node: HTMLDivElement | null, index: number) => {
      projectRefs.current[index] = node;
      if (node) {
        node.setAttribute("data-index", index.toString());
        if (isTablet || window.innerWidth < 1024) {
          node.style.opacity = "1";
          node.style.transform = "none";
        }
      }
    },
    [isTablet]
  );

  useEffect(() => {
    if (isTablet || isMobile || window.innerWidth < 1024) {
      projectRefs.current.forEach((node) => {
        if (node) {
          node.style.opacity = "1";
          node.style.transform = "none";
        }
      });
      return;
    }

    const timeout = window.setTimeout(() => {
      const stickyBox = stickyBoxRef.current;
      const container = containerRef.current;
      if (!stickyBox || !container) return;

      clearScrollTriggers();

      const lastProject = projectRefs.current[projectRefs.current.length - 1];
      const stickyHeight = stickyBox.offsetHeight || 400;

      pinTriggerRef.current = ScrollTrigger.create({
        trigger: container,
        start: "top top+=160",
        end: () => {
          if (lastProject) {
            const endPoint = lastProject.offsetTop + lastProject.offsetHeight;
            return `+=${endPoint - stickyHeight + 2}`;
          }
          return "bottom bottom-=400";
        },
        pin: stickyBox,
        pinSpacing: false,
        anticipatePin: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });

      projectRefs.current.forEach((node, index) => {
        if (!node) return;

        const activeTrigger = ScrollTrigger.create({
          trigger: node,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveProjectIndex(index),
          onEnterBack: () => setActiveProjectIndex(index),
        });

        scrollTriggersRef.current.push(activeTrigger);

        gsap.fromTo(
          node,
          { opacity: 0, y: 50, scale: 0.95, rotation: 0.01 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0.01,
            ease: "power2.out",
            force3D: true,
            scrollTrigger: {
              trigger: node,
              start: "top bottom-=50",
              end: "top center+=100",
              scrub: 0.5,
              toggleActions: "play none none reverse",
            },
          }
        );

        const frame = node.querySelector(".project-frame");
        if (frame) {
          gsap.to(frame, {
            y: -20,
            ease: "none",
            rotation: 0.01,
            force3D: true,
            scrollTrigger: {
              trigger: node,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          });
        }
      });

      ScrollTrigger.refresh();
    }, 200);

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        ScrollTrigger.refresh();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
      clearScrollTriggers();
    };
  }, [clearScrollTriggers, isMobile, isTablet]);

  const progressValue = useMotionValue(0);

  useEffect(() => {
    progressValue.set(100 * scrollProgress);
  }, [scrollProgress, progressValue]);

  const progressSpring = useSpring(progressValue, {
    damping: 30,
    stiffness: 100,
    mass: 0.5,
  });

  const progressScale = useTransform(progressSpring, [0, 100], [0, 1]);
  const progressTop = useTransform(progressSpring, (value) => `${value}%`);
  const progressOpacity = useTransform(progressSpring, (value) => (value > 0 ? 1 : 0));

  return (
    <section
      id="projects-section"
      className="w-full min-h-screen flex flex-col justify-start items-center z-20 font-outfit px-4 sm:px-6 lg:px-4 py-12 sm:py-16 lg:pt-16 pb-24 sm:pb-32 lg:pb-[200px]"
      style={{ margin: 0, border: 0, position: "relative", overflow: "hidden" }}
    >
      {showHeading && <ProjectHeading />}
      <div
        className="flex flex-col w-full lg:max-w-[1488.8px]"
        style={{ margin: 0, border: 0, padding: 0, position: "relative" }}
      >
        <div
          ref={containerRef}
          className="flex flex-col lg:flex-row w-full relative"
          style={{
            gap: "clamp(2rem, 5vw, 4rem)",
            margin: 0,
            border: 0,
            padding: 0,
            position: "relative",
          }}
        >
          <div
            id="left-box-container"
            className="hidden lg:block lg:w-[40%] xl:w-[35%] lg:min-w-[340px] relative"
          >
            <div
              ref={stickyBoxRef}
              id="sticky-box"
              className="z-50 w-full relative flex"
              style={{ height: "auto", minHeight: "400px" }}
            >
              <div className="absolute -right-6 top-0 h-full w-8 z-10">
                <div className="relative h-full w-full">
                  <div className="absolute top-0 bottom-0 left-1/2 w-1.5 -translate-x-1/2 rounded-full bg-neutral-200 dark:bg-neutral-800 shadow-[inset_0_2px_1.5px_rgba(165,174,184,0.62)] dark:shadow-[inset_0_2px_1.5px_rgba(165,174,184,0.62)]">
                    <motion.div
                      className="absolute inset-0 w-full origin-top rounded-full bg-gradient-to-t from-orange-600 from-[0%] via-yellow-500 via-[10%] to-transparent"
                      style={{ scaleY: progressScale, opacity: progressOpacity }}
                    />
                  </div>
                  <motion.div
                    className="absolute -right-0.5 z-10 flex"
                    style={{ top: progressTop, height: "36px", y: "-50%" }}
                  >
                    <motion.div
                      className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white dark:border-neutral-900 bg-white dark:bg-neutral-900 shadow-md"
                      whileHover={{ scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Image
                        alt="Profile"
                        src="/images/my-image/Main-Avatar.jpeg"
                        fill
                        className="object-cover"
                        sizes="36px"
                        priority
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
              <div className="flex-1 w-full">
                {PROJECT_DETAILS.map((details, index) => (
                  <ProjectDetails
                    key={details.title}
                    details={details}
                    isActive={activeProjectIndex === index}
                    isIPad={isTablet}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="right-container flex flex-col gap-8 sm:gap-10 lg:gap-y-24 w-full lg:flex-1 lg:min-w-0">
            {PROJECTS.map((project, index) => {
              const style = PROJECT_STYLES[index];
              const details = PROJECT_DETAILS[index];
              if (!style || !details) return null;

              return (
                <ProjectCard
                  key={project.id}
                  ref={(node) => setProjectRef(node, index)}
                  project={project}
                  style={style}
                  details={details}
                  isIPad={isTablet}
                />
              );
            })}
          </div>
        </div>
        <SeeMoreProjects />
      </div>
    </section>
  );
}
