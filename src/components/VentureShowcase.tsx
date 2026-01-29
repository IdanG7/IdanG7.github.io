"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Activity,
  AlertCircle,
  Bot,
  CheckCircle,
  Cloud,
  Cpu,
  Crosshair,
  Database,
  Eye,
  Network,
  Server,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

type Project = {
  id: number;
  title: string;
  url: string;
};

type ProjectStyle = {
  gradient: string;
  textColor: string;
  shadow: string;
  headerText: string;
  themeColors: {
    primary: string;
    secondary: string;
    background: string;
  };
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
  graphic: ReactNode;
};

type PipelineStageStatus = "idle" | "running" | "success" | "failed";

type PipelineStage = {
  name: string;
  status: PipelineStageStatus;
  progress: number;
};

type QueuedPlayer = {
  id: number;
  mmr: number;
  region: string;
};

type PodStatus = "healthy" | "error" | "healing";

type Pod = {
  id: number;
  status: PodStatus;
  cpu: number;
  name: string;
};

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "AeroForge",
    url: "https://github.com/IdanG7/AeroForge",
  },
  {
    id: 2,
    title: "Multiplayer SDK",
    url: "https://github.com/IdanG7/matchmaker-platform",
  },
  {
    id: 3,
    title: "InfraMind",
    url: "https://github.com/IdanG7/InfraMind",
  },
  {
    id: 4,
    title: "Sentinel",
    url: "https://github.com/IdanG7/Sentinel",
  },
  {
    id: 5,
    title: "HIL Robotics Simulator",
    url: "https://github.com/IdanG7/hil-robotics-simulator",
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
    themeColors: {
      primary: "#0891b2",
      secondary: "#06b6d4",
      background: "#0c4a6e",
    },
  },
  {
    gradient:
      "linear-gradient(10deg, rgb(194, 65, 12) 49.9%, rgb(194, 65, 12) 81.7%, rgb(253, 186, 116) 99.88%, rgb(249, 215, 147) 113.5%)",
    textColor: "text-orange-300",
    shadow: "shadow-[0_0_30px_#F97316]",
    headerText:
      "Distributed matchmaking and game services stack supporting sub-100ms sessions at scale.",
    themeColors: {
      primary: "#7c3aed",
      secondary: "#a855f7",
      background: "#4c1d95",
    },
  },
  {
    gradient:
      "linear-gradient(10deg, rgb(41, 50, 203) 49.9%, rgb(41, 50, 203) 81.7%, rgb(121, 128, 255) 99.88%, rgb(249, 215, 147) 113.5%)",
    textColor: "text-blue-300",
    shadow: "shadow-[0_0_30px_#2932CB]",
    headerText:
      "ML platform optimizing CI/CD workflows with telemetry, caching, and automated tuning.",
    themeColors: {
      primary: "#10b981",
      secondary: "#059669",
      background: "#064e3b",
    },
  },
  {
    gradient:
      "linear-gradient(10deg, rgb(157, 23, 77) 49.9%, rgb(157, 23, 77) 81.7%, rgb(251, 182, 206) 99.88%, rgb(249, 215, 147) 113.5%)",
    textColor: "text-pink-300",
    shadow: "shadow-[0_0_30px_#DB2777]",
    headerText:
      "Autonomous infrastructure controller for AI workloads with AI-driven remediation.",
    themeColors: {
      primary: "#22d3ee",
      secondary: "#0891b2",
      background: "#164e63",
    },
  },
  {
    gradient:
      "linear-gradient(10deg, rgb(4, 120, 87) 49.9%, rgb(4, 120, 87) 81.7%, rgb(110, 231, 183) 99.88%, rgb(249, 215, 147) 113.5%)",
    textColor: "text-emerald-300",
    shadow: "shadow-[0_0_30px_#059669]",
    headerText:
      "Hardware-in-the-loop robotics simulator syncing MuJoCo physics with STM32 firmware for sim-to-real validation.",
    themeColors: {
      primary: "#10b981",
      secondary: "#059669",
      background: "#064e3b",
    },
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
  {
    title: "HIL Robotics Simulator",
    description:
      "Hardware-in-the-loop robotics simulator that syncs a MuJoCo 2-DOF arm with STM32 firmware for real-time sim-to-real validation. In development.",
    features: [
      "Bidirectional loop: simulation commands hardware, hardware corrects simulation state",
      "Deterministic 50Hz control loop with CRC-8 protocol and latency monitoring",
      "Telemetry dashboard for joint angles, IMU orientation, and link health (target <50ms)",
    ],
    tech: [
      { name: "C/C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
      { name: "STM32 HAL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
      { name: "MuJoCo", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "pySerial", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "Controls/PID", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
    ],
    color: "emerald",
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
  x: MotionValue<number>;
  y: MotionValue<number>;
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

const DesktopDeviceCard = ({
  graphic,
  gradient,
}: {
  graphic: ReactNode;
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
            <div className="relative w-full h-full bg-black">
              {graphic}
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
  ({ project, style, details, isIPad, graphic }, ref) => {
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
                <div className="hidden sm:block h-full">
                  <DesktopDeviceCard
                    graphic={graphic}
                    gradient={gradient}
                  />
                </div>
                <div className="sm:hidden aspect-[16/10]">
                  <DesktopDeviceCard
                    graphic={graphic}
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
          {details.tech.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-1.5 lg:gap-2 rounded-xl border border-black/10 dark:border-white/[0.14] bg-neutral-100 dark:bg-neutral-900 px-2.5 py-1 lg:px-3 lg:py-1 font-outfit text-neutral-700 dark:text-gray-300"
            >
              {tech.name}
            </div>
          ))}
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
  const [altitude, setAltitude] = useState(45.2);
  const [confidence, setConfidence] = useState(98);
  const [queues, setQueues] = useState(24);
  const [buildTime, setBuildTime] = useState(145);
  const [optimizationScore, setOptimizationScore] = useState(87);
  const [suggestion, setSuggestion] = useState("+2 cores suggested");
  const [pipelineStages, setPipelineStages] = useState<PipelineStage[]>([
    { name: "Build", status: "idle", progress: 0 },
    { name: "Test", status: "idle", progress: 0 },
    { name: "Deploy", status: "idle", progress: 0 },
  ]);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [stageProgress, setStageProgress] = useState(0);
  const [queuedPlayers, setQueuedPlayers] = useState<QueuedPlayer[]>([
    { id: 1, mmr: 1500, region: "NA" },
    { id: 2, mmr: 1520, region: "NA" },
    { id: 3, mmr: 1480, region: "NA" },
    { id: 4, mmr: 1550, region: "NA" },
  ]);
  const [matchFormed, setMatchFormed] = useState(false);
  const [pods, setPods] = useState<Pod[]>([
    { id: 1, status: "healthy", cpu: 45, name: "ml-trainer-1" },
    { id: 2, status: "healthy", cpu: 78, name: "api-gateway" },
    { id: 3, status: "error", cpu: 92, name: "worker-node-3" },
    { id: 4, status: "healthy", cpu: 34, name: "database-replica" },
  ]);
  const [aiFixing, setAiFixing] = useState(false);
  const [clusterHealth, setClusterHealth] = useState(92);

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

  useEffect(() => {
    const suggestions = [
      "+2 cores suggested",
      "+4GB RAM optimal",
      "Cache size: 500MB",
      "Reduce parallelism",
      "+1 worker thread",
      "Network latency: 12ms",
    ];

    const metricsInterval = window.setInterval(() => {
      setAltitude(Number((Math.random() * 10 + 40).toFixed(1)));
      setConfidence(Math.floor(Math.random() * 5) + 95);
      setQueues(Math.floor(Math.random() * 10) + 20);
      setBuildTime(Math.floor(Math.random() * 50) + 120);
      setOptimizationScore(Math.floor(Math.random() * 10) + 85);
      setSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)]);
    }, 2000);

    return () => {
      window.clearInterval(metricsInterval);
    };
  }, []);

  useEffect(() => {
    const pipelineInterval = window.setInterval(() => {
      setPipelineStages((stages) => {
        const currentStage = stages[currentStageIndex];

        if (currentStage.status === "running") {
          const nextProgress = stageProgress + 5;

          if (nextProgress >= 100) {
            const stageFailed = Math.random() < 0.15;

            if (stageFailed) {
              const failedStages = stages.map((stage, idx) =>
                idx === currentStageIndex
                  ? { ...stage, status: "failed", progress: nextProgress }
                  : stage
              );

              window.setTimeout(() => {
                setPipelineStages([
                  { name: "Build", status: "running", progress: 0 },
                  { name: "Test", status: "idle", progress: 0 },
                  { name: "Deploy", status: "idle", progress: 0 },
                ]);
                setCurrentStageIndex(0);
                setStageProgress(0);
              }, 2000);

              setStageProgress(nextProgress);
              return failedStages;
            }

            const successStages = stages.map((stage, idx) =>
              idx === currentStageIndex
                ? { ...stage, status: "success", progress: 100 }
                : stage
            );

            if (currentStageIndex < 2) {
              const nextStages = successStages.map((stage, idx) =>
                idx === currentStageIndex + 1
                  ? { ...stage, status: "running", progress: 0 }
                  : stage
              );
              setCurrentStageIndex(currentStageIndex + 1);
              setStageProgress(0);
              return nextStages;
            }

            window.setTimeout(() => {
              setPipelineStages([
                { name: "Build", status: "running", progress: 0 },
                { name: "Test", status: "idle", progress: 0 },
                { name: "Deploy", status: "idle", progress: 0 },
              ]);
              setCurrentStageIndex(0);
              setStageProgress(0);
            }, 2000);

            setStageProgress(100);
            return successStages;
          }

          setStageProgress(nextProgress);
        }

        return stages;
      });
    }, 60);

    return () => {
      window.clearInterval(pipelineInterval);
    };
  }, [currentStageIndex, stageProgress]);

  useEffect(() => {
    setPipelineStages([
      { name: "Build", status: "running", progress: 0 },
      { name: "Test", status: "idle", progress: 0 },
      { name: "Deploy", status: "idle", progress: 0 },
    ]);
    setCurrentStageIndex(0);
    setStageProgress(0);
  }, []);

  useEffect(() => {
    const matchmakingInterval = window.setInterval(() => {
      setQueuedPlayers((prev) => {
        if (prev.length >= 8) {
          setMatchFormed(true);
          window.setTimeout(() => setMatchFormed(false), 2000);
          return [
            {
              id: Math.random(),
              mmr: Math.floor(Math.random() * 500) + 1300,
              region: "NA",
            },
            {
              id: Math.random(),
              mmr: Math.floor(Math.random() * 500) + 1300,
              region: "NA",
            },
          ];
        }

        const newPlayers = Math.random() > 0.5 ? 1 : 2;
        const additions = Array.from({ length: newPlayers }, () => ({
          id: Math.random(),
          mmr: Math.floor(Math.random() * 500) + 1300,
          region: Math.random() > 0.7 ? "EU" : "NA",
        }));
        return [...prev, ...additions];
      });
    }, 2500);

    return () => window.clearInterval(matchmakingInterval);
  }, []);

  useEffect(() => {
    const sentinelInterval = window.setInterval(() => {
      setPods((currentPods) => {
        const errorPod = currentPods.find((pod) => pod.status === "error");

        if (errorPod && !aiFixing) {
          setAiFixing(true);
          window.setTimeout(() => {
            setPods((podsState) =>
              podsState.map((pod) =>
                pod.status === "error"
                  ? {
                    ...pod,
                    status: "healing",
                    cpu: Math.floor(Math.random() * 50) + 30,
                  }
                  : pod
              )
            );
            window.setTimeout(() => {
              setPods((podsState) =>
                podsState.map((pod) =>
                  pod.status === "healing" ? { ...pod, status: "healthy" } : pod
                )
              );
              setAiFixing(false);
              setClusterHealth(100);
            }, 2000);
          }, 3000);
        } else if (!errorPod && !aiFixing) {
          if (Math.random() < 0.2) {
            const randomIndex = Math.floor(Math.random() * currentPods.length);
            const newPods = [...currentPods];
            newPods[randomIndex] = {
              ...newPods[randomIndex],
              status: "error",
              cpu: 95,
            };
            setClusterHealth(75);
            return newPods;
          }
        }

        return currentPods.map((pod) => ({
          ...pod,
          cpu:
            pod.status === "healthy"
              ? Math.floor(Math.random() * 40) + 30
              : pod.cpu,
        }));
      });
    }, 4000);

    return () => window.clearInterval(sentinelInterval);
  }, [aiFixing]);

  const getProjectGraphic = (title: string) => {
    if (title === "AeroForge") {
      return (
        <div className="relative h-full w-full bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:40px_40px]" />
          <motion.div
            className="absolute top-0 left-0"
            animate={{
              left: ["20%", "50%", "60%", "30%", "45%", "20%"],
              top: ["20%", "40%", "25%", "50%", "35%", "20%"],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="relative w-10 h-10 sm:w-16 sm:h-16 border-2 border-cyan-400 rounded"
              animate={{
                borderColor: ["#22d3ee", "#06b6d4", "#22d3ee"],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="absolute -top-1 -left-1 w-2 h-2 sm:w-3 sm:h-3 border-t-2 border-l-2 border-cyan-300" />
              <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 border-t-2 border-r-2 border-cyan-300" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 sm:w-3 sm:h-3 border-b-2 border-l-2 border-cyan-300" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 border-b-2 border-r-2 border-cyan-300" />
              <div className="absolute -top-4 sm:-top-6 left-1/2 -translate-x-1/2 text-[8px] sm:text-xs font-mono text-cyan-400 whitespace-nowrap">
                TARGET LOCKED
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-20 flex items-center justify-center">
                <Crosshair className="w-12 h-12 sm:w-20 sm:h-20 text-blue-400" strokeWidth={1.5} />
                <motion.div
                  className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
              <div className="absolute top-1/2 -left-4 sm:-left-8 w-4 sm:w-8 h-0.5 bg-cyan-400/50 -translate-y-1/2" />
              <div className="absolute top-1/2 -right-4 sm:-right-8 w-4 sm:w-8 h-0.5 bg-cyan-400/50 -translate-y-1/2" />
              <div className="absolute left-1/2 -top-4 sm:-top-8 h-4 sm:h-8 w-0.5 bg-cyan-400/50 -translate-x-1/2" />
              <div className="absolute left-1/2 -bottom-4 sm:-bottom-8 h-4 sm:h-8 w-0.5 bg-cyan-400/50 -translate-x-1/2" />
            </motion.div>
          </motion.div>
          <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 space-y-0.5 sm:space-y-1">
            <div className="text-[8px] sm:text-xs font-mono text-cyan-400 flex items-center gap-1 sm:gap-2">
              <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>VIS: ACTIVE</span>
            </div>
            <motion.div
              className="text-[8px] sm:text-xs font-mono text-green-400"
              key={altitude}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              ALT: {altitude}m
            </motion.div>
            <div className="text-[8px] sm:text-xs font-mono text-orange-400">
              TRACK: STABLE
            </div>
          </div>
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 space-y-0.5 sm:space-y-1">
            <div className="text-[8px] sm:text-xs font-mono text-blue-400">FPS: 60</div>
            <motion.div
              className="text-[8px] sm:text-xs font-mono text-green-400"
              key={confidence}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              CONF: {confidence}%
            </motion.div>
          </div>
        </div>
      );
    }

    if (title === "Multiplayer SDK") {
      return (
        <div className="relative h-full w-full bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:30px_30px]" />
          {matchFormed && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-purple-500/20 backdrop-blur-sm z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-sm sm:text-2xl font-mono font-bold text-purple-300 flex items-center gap-2 sm:gap-3">
                <CheckCircle className="w-5 h-5 sm:w-8 sm:h-8" />
                MATCH FORMED
              </div>
            </motion.div>
          )}
          <div className="absolute left-2 sm:left-4 bottom-8 sm:bottom-12 flex flex-wrap gap-1 sm:gap-1.5 max-w-[70%] sm:max-w-[60%]">
            <div className="w-full text-[8px] sm:text-[10px] font-mono text-purple-400 mb-0.5 sm:mb-1">
              QUEUE ({queuedPlayers.length}/8)
            </div>
            {queuedPlayers.slice(0, 8).map((player, idx) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-0.5 sm:gap-1 bg-purple-900/50 border border-purple-500/30 rounded px-1 sm:px-1.5 py-0.5"
              >
                <Users className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-purple-400" />
                <div className="text-[7px] sm:text-[8px] font-mono text-purple-300">
                  {player.region} <span className="text-indigo-400">{player.mmr}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: matchFormed ? [1, 1.3, 1] : [1, 1.1, 1],
                rotate: matchFormed ? [0, 360] : 0,
              }}
              transition={{
                duration: matchFormed ? 1 : 2,
                repeat: matchFormed ? 0 : Infinity,
              }}
              className="relative"
            >
              <div
                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full ${matchFormed ? "bg-purple-500/50" : "bg-purple-500/30"
                  } border-2 border-purple-400 flex items-center justify-center`}
              >
                <Server className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
              </div>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-purple-400"
                animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </div>
          <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 space-y-0.5 sm:space-y-1 text-right">
            <div className="text-[8px] sm:text-xs font-mono text-purple-400 flex items-center gap-1 sm:gap-2 justify-end">
              <Network className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span className="hidden sm:inline">10K+ PLAYERS</span>
              <span className="sm:hidden">10K+</span>
            </div>
            <div className="text-[8px] sm:text-xs font-mono text-green-400">
              <span className="hidden sm:inline">LATENCY: &lt;100ms</span>
              <span className="sm:hidden">&lt;100ms</span>
            </div>
            <motion.div
              className="text-[8px] sm:text-xs font-mono text-indigo-400"
              key={queues}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="hidden sm:inline">ACTIVE QUEUES: {queues}</span>
              <span className="sm:hidden">Q: {queues}</span>
            </motion.div>
          </div>
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 space-y-0.5 sm:space-y-1">
            <div className="text-[8px] sm:text-xs font-mono text-purple-400">MATCHMAKING</div>
            <motion.div
              className={`text-xs sm:text-sm font-mono font-bold ${queuedPlayers.length >= 8 ? "text-green-400" : "text-indigo-400"
                }`}
              animate={{ opacity: queuedPlayers.length >= 8 ? [1, 0.5, 1] : 1 }}
              transition={{ duration: 0.5, repeat: queuedPlayers.length >= 8 ? Infinity : 0 }}
            >
              {queuedPlayers.length >= 8 ? "FORMING..." : "SEARCHING"}
            </motion.div>
            <div className="text-[8px] sm:text-[10px] font-mono text-purple-300">
              AVG MMR:{" "}
              {Math.round(
                queuedPlayers.reduce((sum, player) => sum + player.mmr, 0) /
                queuedPlayers.length
              )}
            </div>
          </div>
        </div>
      );
    }

    if (title === "HIL Robotics Simulator") {
      return (
        <div className="relative h-full w-full bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(16,185,129,0.18),transparent_45%),radial-gradient(circle_at_80%_90%,rgba(34,197,94,0.16),transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.07)_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:26px_26px]" />
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 text-[8px] sm:text-[10px] font-mono text-emerald-300/90">
            SIM-TO-REAL
          </div>
          <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 flex flex-col gap-1 text-[8px] sm:text-[10px] font-mono text-emerald-300/80">
            <div className="flex items-center gap-1">
              <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              50Hz LOOP
            </div>
            <div className="flex items-center gap-1">
              <Network className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              CRC-8 OK
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              LAT &lt;50ms
            </div>
          </div>
          <svg viewBox="0 0 320 180" className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id="hil-link" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="hil-panel" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0b1f1c" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#081312" stopOpacity="0.9" />
              </linearGradient>
              <filter id="hil-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="0 0 0 0 0.1  0 0 0 0 0.8  0 0 0 0 0.5  0 0 0 0.6 0"
                />
              </filter>
            </defs>
            <motion.path
              d="M110 62 C150 34 170 34 210 62"
              stroke="url(#hil-link)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="6 10"
              animate={{ strokeDashoffset: [0, -80] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
              d="M110 118 C150 146 170 146 210 118"
              stroke="url(#hil-link)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="10 14"
              animate={{ strokeDashoffset: [0, 100] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
            />
            <rect x="24" y="46" width="112" height="88" rx="16" fill="url(#hil-panel)" stroke="#10b981" strokeOpacity="0.35" strokeWidth="1.4" />
            <rect x="184" y="46" width="112" height="88" rx="16" fill="url(#hil-panel)" stroke="#10b981" strokeOpacity="0.35" strokeWidth="1.4" />
            <rect x="38" y="64" width="84" height="8" rx="4" fill="#10b981" opacity="0.25" />
            <rect x="38" y="80" width="68" height="6" rx="3" fill="#34d399" opacity="0.3" />
            <rect x="38" y="94" width="76" height="6" rx="3" fill="#22c55e" opacity="0.25" />
            <rect x="198" y="66" width="86" height="10" rx="5" fill="#0f172a" opacity="0.7" />
            <rect x="198" y="82" width="72" height="6" rx="3" fill="#22c55e" opacity="0.25" />
            <rect x="198" y="96" width="64" height="6" rx="3" fill="#34d399" opacity="0.3" />
            <text x="80" y="60" textAnchor="middle" className="fill-emerald-200 text-[8px] font-mono" opacity="0.8">
              MuJoCo
            </text>
            <text x="240" y="60" textAnchor="middle" className="fill-emerald-200 text-[8px] font-mono" opacity="0.8">
              STM32
            </text>
            <circle cx="160" cy="90" r="18" stroke="#22c55e" strokeOpacity="0.35" strokeWidth="2" fill="none" />
            <motion.circle
              cx="160"
              cy="90"
              r="6"
              fill="#22c55e"
              animate={{ r: [5, 8, 5], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              filter="url(#hil-glow)"
            />
          </svg>
        </div>
      );
    }

    if (title === "InfraMind") {
      return (
        <div className="relative h-full w-full bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:15px_15px] sm:bg-[size:25px_25px]" />
          <div className="absolute inset-0 flex items-center justify-center gap-4 sm:gap-12 px-2 sm:px-8">
            {pipelineStages.map((stage, idx) => {
              const isRunning = stage.status === "running";
              const isSuccess = stage.status === "success";
              const isFailed = stage.status === "failed";

              let bgColor = "bg-slate-700/20";
              let borderColor = "border-slate-500";
              let textColor = "text-slate-400";
              let progressColor = "bg-slate-400";

              if (isRunning) {
                bgColor = "bg-blue-500/20";
                borderColor = "border-blue-400";
                textColor = "text-blue-400";
                progressColor = "bg-blue-400";
              } else if (isSuccess) {
                bgColor = "bg-emerald-500/20";
                borderColor = "border-emerald-400";
                textColor = "text-emerald-400";
                progressColor = "bg-emerald-400";
              } else if (isFailed) {
                bgColor = "bg-red-500/20";
                borderColor = "border-red-400";
                textColor = "text-red-400";
                progressColor = "bg-red-400";
              }

              let progressWidth = "0%";
              if (isRunning) {
                progressWidth = `${stageProgress}%`;
              } else if (isSuccess || isFailed) {
                progressWidth = `${stage.progress}%`;
              }

              return (
                <motion.div
                  key={stage.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="flex-1 max-w-[60px] sm:max-w-[100px] relative"
                >
                  <div
                    className={`${bgColor} border-2 ${borderColor} rounded-lg p-1.5 sm:p-3 backdrop-blur-sm transition-all duration-300`}
                  >
                    <div
                      className={`text-[8px] sm:text-xs font-mono ${textColor} text-center font-bold`}
                    >
                      {isFailed ? "FAILED" : stage.name}
                    </div>
                    <div className="mt-1 sm:mt-2 h-0.5 sm:h-1 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${progressColor} transition-all duration-100 ease-linear`}
                        style={{ width: progressWidth }}
                      />
                    </div>
                  </div>
                  {idx < 2 && (
                    <div className="absolute top-1/2 left-full -translate-y-1/2 px-1 sm:px-3">
                      <div className="flex items-center gap-0.5">
                        <div
                          className={`w-2 sm:w-5 h-0.5 ${isSuccess ? "bg-emerald-400" : "bg-slate-500"
                            } transition-colors duration-300`}
                        />
                        <div
                          className={`w-0 h-0 border-l-[4px] sm:border-l-[6px] ${isSuccess ? "border-l-emerald-400" : "border-l-slate-500"
                            } border-t-[2px] sm:border-t-[3px] border-t-transparent border-b-[2px] sm:border-b-[3px] border-b-transparent transition-colors duration-300`}
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
          <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 space-y-0.5 sm:space-y-1">
            <div className="flex items-center gap-1 sm:gap-2 text-[8px] sm:text-xs font-mono text-teal-400">
              <Cpu className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>CPU: Optimized</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 text-[8px] sm:text-xs font-mono text-emerald-400">
              <Database className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>Cache: Active</span>
            </div>
            <motion.div
              className="text-[8px] sm:text-xs font-mono text-green-400"
              key={buildTime}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Time: {buildTime}s
            </motion.div>
          </div>
          <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 space-y-0.5 sm:space-y-1">
            <div className="flex items-center gap-1 sm:gap-2 text-[8px] sm:text-xs font-mono text-emerald-400 bg-emerald-950/50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-emerald-500/30">
              <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>ML ACTIVE</span>
            </div>
            <motion.div
              className="text-[8px] sm:text-xs font-mono text-green-400 text-right"
              key={optimizationScore}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Score: {optimizationScore}%
            </motion.div>
          </div>
          <motion.div
            className="absolute top-8 sm:top-12 left-2 sm:left-4 text-[8px] sm:text-[10px] font-mono text-emerald-300/70 bg-emerald-950/50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-emerald-500/20"
            animate={{ y: [0, -5, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
            key={suggestion}
          >
            {suggestion}
          </motion.div>
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex items-center gap-1 sm:gap-1.5">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
            <span className="text-[8px] sm:text-xs font-mono text-yellow-400 font-bold">
              40% faster
            </span>
          </div>
        </div>
      );
    }

    if (title === "Sentinel") {
      return (
        <div className="relative h-full w-full bg-gradient-to-br from-cyan-950 via-slate-900 to-blue-950 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:35px_35px]" />
          {aiFixing && (
            <motion.div
              className="absolute top-2 left-1/2 sm:left-1/4 -translate-x-1/2 flex items-center gap-1 sm:gap-2 bg-cyan-500/20 border border-cyan-400 rounded-lg px-2 sm:px-4 py-1 sm:py-2 z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <span className="text-cyan-300 text-[8px] sm:text-sm hidden sm:inline">
                Auto Fixes…
              </span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
              </motion.div>
              <span className="text-[8px] sm:text-sm font-mono text-cyan-300 font-bold">
                AI FIXING
              </span>
            </motion.div>
          )}
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 space-y-1 sm:space-y-2">
            <div className="text-[8px] sm:text-xs font-mono text-cyan-400">
              CLUSTER HEALTH
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <motion.div
                className="text-lg sm:text-2xl font-mono font-bold"
                animate={{
                  color:
                    clusterHealth === 100
                      ? "#22d3ee"
                      : clusterHealth >= 75
                        ? "#fbbf24"
                        : "#ef4444",
                }}
              >
                {clusterHealth}%
              </motion.div>
              <Shield
                className={`w-4 h-4 sm:w-5 sm:h-5 ${clusterHealth === 100
                  ? "text-cyan-400"
                  : clusterHealth >= 75
                    ? "text-yellow-400"
                    : "text-red-400"
                  }`}
              />
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-2 sm:gap-4 p-2 sm:p-8">
              {pods.map((pod, idx) => {
                const isError = pod.status === "error";
                const isHealing = pod.status === "healing";

                let bgColorHex = "rgba(34, 211, 238, 0.2)";
                let borderColorHex = "#22d3ee";
                let iconColor = "text-cyan-400";
                let Icon = CheckCircle;

                if (isError) {
                  bgColorHex = "rgba(239, 68, 68, 0.2)";
                  borderColorHex = "#f87171";
                  iconColor = "text-red-400";
                  Icon = AlertCircle;
                } else if (isHealing) {
                  bgColorHex = "rgba(251, 191, 36, 0.2)";
                  borderColorHex = "#fbbf24";
                  iconColor = "text-yellow-400";
                  Icon = Activity;
                }

                return (
                  <motion.div
                    key={pod.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      backgroundColor: bgColorHex,
                      borderColor: borderColorHex,
                    }}
                    transition={{
                      delay: idx * 0.1,
                      backgroundColor: { duration: 0.5 },
                      borderColor: { duration: 0.5 },
                    }}
                    className="border-2 rounded-lg p-1.5 sm:p-3 min-w-[70px] sm:min-w-[120px]"
                  >
                    <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                      <Cloud className={`w-3 h-3 sm:w-4 sm:h-4 ${iconColor}`} />
                      <div className="text-[7px] sm:text-[9px] font-mono text-slate-300 truncate">
                        {pod.name}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColor}`} />
                      <div className="text-right">
                        <div className={`text-[8px] sm:text-[10px] font-mono ${iconColor}`}>
                          {isError ? "ERROR" : isHealing ? "HEALING" : "HEALTHY"}
                        </div>
                        <div className="text-[7px] sm:text-[9px] font-mono text-slate-400">
                          CPU: {pod.cpu}%
                        </div>
                      </div>
                    </div>
                    <div className="mt-1 sm:mt-2 h-0.5 sm:h-1 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${isError
                          ? "bg-red-400"
                          : isHealing
                            ? "bg-yellow-400"
                            : "bg-cyan-400"
                          }`}
                        animate={{ width: `${pod.cpu}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 space-y-0.5 sm:space-y-1 text-right">
            <div className="text-[8px] sm:text-xs font-mono text-cyan-400 flex items-center gap-1 sm:gap-2 justify-end">
              <Cloud className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>3 CLUSTERS</span>
            </div>
            <div className="text-[8px] sm:text-xs font-mono text-green-400">UPTIME: 99.9%</div>
            <div className="text-[8px] sm:text-xs font-mono text-blue-400">
              {pods.filter((pod) => pod.status === "healthy").length}/{pods.length} HEALTHY
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="relative h-full w-full bg-neutral-900/90">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:26px_26px]" />
      </div>
    );
  };

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
              const graphic = getProjectGraphic(project.title);

              return (
                <ProjectCard
                  key={project.id}
                  ref={(node) => setProjectRef(node, index)}
                  project={project}
                  style={style}
                  details={details}
                  isIPad={isTablet}
                  graphic={graphic}
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
