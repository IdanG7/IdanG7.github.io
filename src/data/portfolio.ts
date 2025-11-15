/**
 * Centralized Portfolio Data
 * Single source of truth for all portfolio information
 * Used by both UI components and the chatbot
 */

import { Code, Rocket, Code2, Cpu, GitBranch, Terminal, Database, Package, Cloud, Layers } from "lucide-react";

// ============================================================================
// IDENTITY & PERSONAL INFORMATION
// ============================================================================

export const identity = {
  name: "Idan Gurevich",
  firstName: "Idan",
  role: "Backend Engineer & Firmware Whisperer",
  tagline: "i like hardware :)",
  location: "Toronto, Ontario, Canada",
  locationShort: "Toronto, Canada",
  status: "Available for opportunities",
  yearsExperience: 2,
  avatar: "https://github.com/idang7.png",
  primaryFocus: ["C++", "Firmware Engineering", "DevOps Automation"],
  highlights: [
    { label: "Experience", value: "2+ Years" },
    { label: "Focus", value: "Backend & Firmware" },
    { label: "Expertise", value: "C++ & DevOps" },
  ],
};

export const personality = {
  traits: ["technical", "precise", "passionate about performance", "systems thinker"],
  interests: ["real-time systems", "computer vision", "distributed systems", "automation"],
};

// ============================================================================
// CONTACT INFORMATION
// ============================================================================

export const contact = {
  email: "Idan.gurevich@gmail.com",
  linkedin: "linkedin.com/in/idangurevich",
  linkedinUrl: "https://www.linkedin.com/in/idangurevich/",
  github: "github.com/IdanG7",
  githubUrl: "https://github.com/IdanG7",
  resume: "/resume.pdf",
};

// ============================================================================
// EXPERIENCE
// ============================================================================

export interface Experience {
  company: string;
  location: string;
  title: string;
  period: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  upcoming?: boolean;
  icon: any;
  description: string;
  achievements?: Array<{ fact: string; impact: string }>;
  technologies?: string[];
}

export const experiences: Experience[] = [
  {
    company: "AMD",
    location: "Markham, ON",
    title: "Embedded Firmware Engineer Intern",
    period: "May 2026 – Sep 2027",
    startDate: "2026-05",
    endDate: "2027-09",
    upcoming: true,
    icon: Code,
    description: "Upcoming internship focused on embedded firmware development.",
    achievements: [
      { fact: "upcoming internship focused on embedded firmware development", impact: "firmware engineering" },
    ],
    technologies: ["Embedded Systems", "Firmware", "C", "C++"],
  },
  {
    company: "WDI Wise Device Inc.",
    location: "Vaughan, ON",
    title: "Junior Software Developer",
    period: "Jan 2025 – Present",
    startDate: "2025-01",
    current: true,
    icon: Rocket,
    description: "Administering 70+ Jenkins projects and engineering automated CI/CD integrations that reduced errors by 30%. Developing C++ components for NIR imaging systems with real-time processing algorithms. Building API-driven testing tools and mentoring junior developers.",
    achievements: [
      { fact: "managing 70+ Jenkins projects", impact: "infrastructure management" },
      { fact: "reduced CI/CD errors by 30%", impact: "reliability improvement" },
      { fact: "developing C++ for NIR imaging systems", impact: "real-time processing" },
      { fact: "building API-driven testing tools", impact: "automation" },
      { fact: "mentoring junior developers", impact: "team growth" },
    ],
    technologies: ["Jenkins", "C++", "Groovy", "CI/CD", "NIR imaging"],
  },
  {
    company: "WDI Wise Device Inc.",
    location: "Vaughan, ON",
    title: "Software Co-op Student",
    period: "May 2024 – Jan 2025",
    startDate: "2024-05",
    endDate: "2025-01",
    icon: Code,
    description: "Supporting large-scale Jenkins infrastructure and developing Groovy automation scripts. Collaborated with QA to resolve 100+ issues and strengthen release delivery timelines.",
    achievements: [
      { fact: "supported large-scale Jenkins infrastructure", impact: "DevOps" },
      { fact: "developed Groovy automation scripts", impact: "automation" },
      { fact: "resolved 100+ QA issues", impact: "quality improvement" },
    ],
    technologies: ["Jenkins", "Groovy", "QA Tools"],
  },
];

// ============================================================================
// EDUCATION
// ============================================================================

export interface Education {
  degree: string;
  institution: string;
  school?: string; // alias for institution
  location: string;
  period: string;
  yearStart?: number;
  yearEnd?: number;
  status: string;
  inProgress?: boolean;
  completed?: boolean;
}

export const education: Education[] = [
  {
    degree: "Bachelor of Computer Science (Honors)",
    institution: "Toronto Metropolitan University",
    school: "Toronto Metropolitan University",
    location: "Toronto, Ontario",
    period: "2023 - 2027",
    yearStart: 2023,
    yearEnd: 2027,
    status: "In Progress",
    inProgress: true,
  },
  {
    degree: "High School Diploma",
    institution: "Stephen Lewis Secondary School",
    school: "Stephen Lewis Secondary School",
    location: "Vaughan, Ontario",
    period: "2019 - 2022",
    yearStart: 2019,
    yearEnd: 2022,
    status: "Completed",
    completed: true,
  },
];

// ============================================================================
// SKILLS
// ============================================================================

export interface SkillCategory {
  title: string;
  icon: any;
  color: string;
  skills: Array<{
    name: string;
    icon: string;
  }>;
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    icon: Code2,
    color: "#FF6F61",
    skills: [
      { name: "C++", icon: "cplusplus" },
      { name: "C", icon: "c" },
      { name: "Python", icon: "python" },
      { name: "C#", icon: "csharp" },
      { name: "Java", icon: "java" },
      { name: "Bash", icon: "bash" },
      { name: "Groovy", icon: "groovy" }
    ]
  },
  {
    title: "DevOps & Cloud",
    icon: GitBranch,
    color: "#FF8C42",
    skills: [
      { name: "Jenkins", icon: "jenkins" },
      { name: "Docker", icon: "docker" },
      { name: "Git", icon: "git" },
      { name: "GitHub Actions", icon: "github" },
      { name: "SVN", icon: "subversion" },
      { name: "AWS", icon: "amazonwebservices" },
      { name: "Kubernetes", icon: "kubernetes" }
    ]
  },
  {
    title: "Development Tools",
    icon: Package,
    color: "#9C27B0",
    skills: [
      { name: "Visual Studio", icon: "visualstudio" },
      { name: "VS Code", icon: "vscode" },
      { name: "IntelliJ", icon: "intellij" },
      { name: "PyCharm", icon: "pycharm" },
      { name: "AutoIt", icon: "" }
    ]
  },
  {
    title: "Databases & Backend",
    icon: Database,
    color: "#4CAF50",
    skills: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Redis", icon: "redis" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "NATS", icon: "" }
    ]
  },
  {
    title: "Libraries & Frameworks",
    icon: Cpu,
    color: "#6A5ACD",
    skills: [
      { name: "OpenCV", icon: "opencv" },
      { name: "PhysX", icon: "" },
      { name: "YAML", icon: "yaml" },
      { name: "OpenTelemetry", icon: "" }
    ]
  },
  {
    title: "Tools & Systems",
    icon: Cloud,
    color: "#00BCD4",
    skills: [
      { name: "Linux", icon: "linux" },
      { name: "Windows", icon: "windows11" },
      { name: "JIRA", icon: "jira" },
      { name: "Monday", icon: "" },
      { name: "Prometheus", icon: "prometheus" },
      { name: "Grafana", icon: "grafana" }
    ]
  }
];

// Organized by proficiency level for chatbot
export const skillsByProficiency = {
  expert: ["C++", "C++17", "C++20", "Jenkins", "DevOps", "Firmware"],
  proficient: ["Python", "Docker", "Git", "CI/CD", "Kubernetes", "C"],
  familiar: ["C#", "Java", "Bash", "Groovy", "AWS"],
  domains: {
    backend: ["C++", "Python", "FastAPI", "NATS"],
    devops: ["Jenkins", "Docker", "Kubernetes", "GitHub Actions", "SVN"],
    databases: ["PostgreSQL", "Redis"],
    monitoring: ["Prometheus", "Grafana", "OpenTelemetry", "JIRA"],
    vision: ["OpenCV", "Computer Vision", "Real-time Processing"],
    tools: ["Visual Studio", "VS Code", "IntelliJ", "PyCharm"],
    systems: ["Linux", "Windows", "Firmware", "Embedded Systems"],
  },
};

// ============================================================================
// PROJECTS
// ============================================================================

export interface Project {
  title: string;
  name?: string; // alias for title
  description: string;
  tags: string[];
  tech?: string[]; // alias for tags
  status: string;
  stage?: string; // alias for status
  metrics: { [key: string]: string };
  fullDescription?: string;
  focus?: string; // alias for fullDescription
  features?: string[];
  highlights?: string[]; // alias for features
  github?: string;
  isWIP?: boolean;
  complexity?: string;
}

export const projects: Project[] = [
  {
    title: "AeroForge",
    name: "AeroForge",
    description: "Cross-platform C++20 framework for vision-based drone control with real-time object detection and autonomous navigation.",
    tags: ["C++20", "OpenCV", "Computer Vision", "Drones"],
    tech: ["C++20", "OpenCV", "Computer Vision", "ImGui", "Kalman Filtering"],
    status: "WIP",
    stage: "Work in Progress",
    metrics: { latency: "Sub-frame", safety: "5 layers", platform: "Cross" },
    isWIP: true,
    complexity: "high",
    fullDescription: "AeroForge is a complete modular pipeline from visual detection through 3D pose estimation to velocity control commands. Built with modern C++20, it provides a cross-platform framework (Windows, macOS, Linux) for developing vision-based drone control applications.",
    focus: "real-time object tracking and autonomous flight control",
    features: [
      "Interactive object selection via click-and-drag tracking",
      "High-performance template matching with Kalman filtering",
      "Complete processing chain: detection → tracking → 3D estimation → PID control",
      "Professional ImGui-based HUD with real-time telemetry visualization",
      "Comprehensive safety mechanisms (geofence, hold-to-enable, e-stop, speed limits)",
      "YAML-based runtime configuration for easy parameter tuning",
      "Full testing suite using Catch2 framework",
      "Optional DJI SDK integration for real drone hardware"
    ],
    highlights: [
      "sub-frame latency processing",
      "5-layer safety system",
      "cross-platform (Windows, macOS, Linux)",
      "interactive object tracking via UI",
      "full PID control pipeline",
      "Catch2 test coverage",
    ],
    github: "https://github.com/IdanG7/AeroForge"
  },
  {
    title: "Multiplayer SDK",
    name: "Multiplayer SDK",
    description: "Production-grade distributed matchmaking and game services platform supporting real-time session allocation at scale.",
    tags: ["C++17", "Python", "Microservices", "Docker"],
    tech: ["C++17", "Python", "Microservices", "Docker", "NATS", "Redis", "PostgreSQL"],
    status: "Production",
    stage: "Production",
    metrics: { latency: "<100ms", players: "10K+", services: "5+" },
    complexity: "high",
    fullDescription: "A distributed matchmaking and backend services platform built with C++17 and Python microservices, designed for high-performance game session allocation and player management. Features a complete observability stack with Prometheus, Grafana, and Jaeger.",
    focus: "scalable game session management and MMR-based matchmaking",
    features: [
      "MMR-based dynamic matchmaking queues with region and latency constraints",
      "Sub-100ms matching latency supporting 10,000+ concurrent players",
      "Modular backend services: Auth, Lobby, Session, Leaderboard",
      "Asynchronous communication via NATS message broker",
      "PostgreSQL for persistent storage, Redis for caching",
      "Full OpenTelemetry observability (Prometheus, Grafana, Jaeger)",
      "Kubernetes-ready deployment with Docker containerization",
      "FastAPI-based REST endpoints for client integration"
    ],
    highlights: [
      "sub-100ms matchmaking latency",
      "10,000+ concurrent players support",
      "modular microservices architecture",
      "full observability stack (Prometheus, Grafana, Jaeger)",
      "Kubernetes-ready deployment",
    ],
    github: "https://github.com/IdanG7"
  },
  {
    title: "InfraMind",
    name: "InfraMind",
    description: "ML-powered platform that automatically optimizes CI/CD workflows by learning from build history to suggest optimal configurations.",
    tags: ["FastAPI", "PostgreSQL", "Redis", "ML", "Docker"],
    tech: ["FastAPI", "PostgreSQL", "Redis", "ML", "Docker", "Python", "C++"],
    status: "Production",
    stage: "Production",
    metrics: { backend: "Python", agent: "C++", speedup: "20-40%" },
    complexity: "high",
    fullDescription: "InfraMind is an ML-powered platform designed to optimize CI/CD workflows automatically. The system learns from build history to suggest optimal configurations, helping teams achieve faster and more reliable builds across any CI/CD platform.",
    focus: "learning from build history to suggest optimal configurations and achieve 20-40% speedup",
    features: [
      "Universal REST API compatibility with Jenkins, GitHub Actions, GitLab CI, CircleCI",
      "ML-driven automatic suggestions for CPU, memory, and concurrency settings",
      "Low-overhead performance telemetry during builds",
      "Automatic cache tuning based on historical data",
      "Grafana-based real-time dashboards for build metrics visualization",
      "Cost monitoring and resource spending optimization",
      "5-minute setup with Docker containerization",
      "C++ telemetry agent for optional low-overhead profiling"
    ],
    highlights: [
      "universal REST API compatible with Jenkins, GitHub Actions, GitLab CI, CircleCI",
      "ML-driven automatic suggestions for CPU, memory, and concurrency settings",
      "low-overhead performance telemetry during builds",
      "automatic cache tuning based on historical data",
      "Grafana-based real-time dashboards",
      "cost monitoring and resource spending optimization",
      "5-minute setup with Docker",
      "C++ telemetry agent for optional low-overhead profiling",
    ],
    github: "https://github.com/IdanG7/InfraMind"
  },
  {
    title: "Sentinel",
    name: "Sentinel",
    description: "Autonomous infrastructure controller for AI/ML workloads with Claude AI-powered auto-remediation and intelligent Kubernetes management.",
    tags: ["Python", "Go", "Kubernetes", "Claude AI", "PostgreSQL"],
    tech: ["Python", "Go", "Kubernetes", "Claude AI", "PostgreSQL", "Prometheus", "Grafana"],
    status: "Production",
    stage: "Production",
    metrics: { orchestrator: "Go", backend: "Python", uptime: "99.9%" },
    complexity: "high",
    fullDescription: "Sentinel is a production-ready autonomous infrastructure controller designed specifically for AI/ML workloads. It intelligently manages Kubernetes clusters across cloud, on-premises, and edge environments with ML-driven predictions, AI-powered remediation using Claude Sonnet 4, and comprehensive policy enforcement.",
    focus: "intelligent Kubernetes management with AI-driven predictions and automated fixes",
    features: [
      "PatchBot: Claude AI agent that automatically fixes CI/CD failures (lint, format, type errors, test failures)",
      "Multi-cluster orchestration with intelligent GPU scheduling for ML workloads",
      "Canary deployments with automatic rollbacks and health gates",
      "Five policy types: resource quotas, security, compliance, cost optimization, ML-specific",
      "mTLS encryption and HashiCorp Vault integration for secrets management",
      "Real-time observability with Prometheus, Grafana, and Jaeger tracing",
      "Chaos engineering testing framework for resilience validation",
      "Complete audit logging and RBAC for enterprise security"
    ],
    highlights: [
      "PatchBot: Claude AI agent that automatically fixes CI/CD failures (lint, format, type errors, test failures)",
      "multi-cluster orchestration with intelligent GPU scheduling for ML workloads",
      "canary deployments with automatic rollbacks and health gates",
      "five policy types: resource quotas, security, compliance, cost optimization, ML-specific",
      "mTLS encryption and HashiCorp Vault integration",
      "real-time observability with Prometheus, Grafana, and Jaeger",
      "chaos engineering testing framework",
      "complete audit logging and RBAC for enterprise security",
      "99.9% uptime",
    ],
    github: "https://github.com/IdanG7/Sentinel"
  }
];
