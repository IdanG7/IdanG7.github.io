import { useState, useEffect, memo, useMemo } from "react";
import { CheckCircle2, ExternalLink, Terminal, X, Wrench, Eye, Crosshair, Radar, Users, Network, Server, Zap, TrendingUp, Cpu, Database, Cloud, Activity, AlertCircle, CheckCircle, Shield, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion, useAnimation } from "framer-motion";

interface Project {
  title: string;
  description: string;
  tags: string[];
  status: string;
  metrics: { [key: string]: string };
  fullDescription?: string;
  features?: string[];
  github?: string;
  isWIP?: boolean;
}

const projects: Project[] = [
  {
    title: "AeroForge",
    description: "Cross-platform C++20 framework for vision-based drone control with real-time object detection and autonomous navigation.",
    tags: ["C++20", "OpenCV", "Computer Vision", "Drones"],
    status: "WIP",
    metrics: { latency: "Sub-frame", safety: "5 layers", platform: "Cross" },
    isWIP: true,
    fullDescription: "AeroForge is a complete modular pipeline from visual detection through 3D pose estimation to velocity control commands. Built with modern C++20, it provides a cross-platform framework (Windows, macOS, Linux) for developing vision-based drone control applications.",
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
    github: "https://github.com/IdanG7/AeroForge"
  },
  {
    title: "Multiplayer SDK",
    description: "Production-grade distributed matchmaking and game services platform supporting real-time session allocation at scale.",
    tags: ["C++17", "Python", "Microservices", "Docker"],
    status: "Production",
    metrics: { latency: "<100ms", players: "10K+", services: "5+" },
    fullDescription: "A distributed matchmaking and backend services platform built with C++17 and Python microservices, designed for high-performance game session allocation and player management. Features a complete observability stack with Prometheus, Grafana, and Jaeger.",
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
    github: "https://github.com/IdanG7"
  },
  {
    title: "InfraMind",
    description: "ML-powered platform that automatically optimizes CI/CD workflows by learning from build history to suggest optimal configurations.",
    tags: ["FastAPI", "PostgreSQL", "Redis", "ML", "Docker"],
    status: "Production",
    metrics: { backend: "Python", agent: "C++", speedup: "20-40%" },
    fullDescription: "InfraMind is an ML-powered platform designed to optimize CI/CD workflows automatically. The system learns from build history to suggest optimal configurations, helping teams achieve faster and more reliable builds across any CI/CD platform.",
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
    github: "https://github.com/IdanG7/InfraMind"
  },
  {
    title: "Sentinel",
    description: "Autonomous infrastructure controller for AI/ML workloads with Claude AI-powered auto-remediation and intelligent Kubernetes management.",
    tags: ["Python", "Go", "Kubernetes", "Claude AI", "PostgreSQL"],
    status: "Production",
    metrics: { orchestrator: "Go", backend: "Python", uptime: "99.9%" },
    fullDescription: "Sentinel is a production-ready autonomous infrastructure controller designed specifically for AI/ML workloads. It intelligently manages Kubernetes clusters across cloud, on-premises, and edge environments with ML-driven predictions, AI-powered remediation using Claude Sonnet 4, and comprehensive policy enforcement.",
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
    github: "https://github.com/IdanG7/Sentinel"
  }
];

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [matchingCount, setMatchingCount] = useState(150);
  const [altitude, setAltitude] = useState(45.2);
  const [confidence, setConfidence] = useState(98);
  const [queues, setQueues] = useState(24);
  const [buildTime, setBuildTime] = useState(145);
  const [optimizationScore, setOptimizationScore] = useState(87);
  const [suggestion, setSuggestion] = useState("+2 cores suggested");

  // Pipeline state: 'idle' | 'running' | 'success' | 'failed'
  const [pipelineStages, setPipelineStages] = useState([
    { name: 'Build', status: 'idle', progress: 0 },
    { name: 'Test', status: 'idle', progress: 0 },
    { name: 'Deploy', status: 'idle', progress: 0 }
  ]);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [stageProgress, setStageProgress] = useState(0);

  // Multiplayer SDK - Enhanced matchmaking queue
  const [queuedPlayers, setQueuedPlayers] = useState([
    { id: 1, mmr: 1500, region: 'NA' },
    { id: 2, mmr: 1520, region: 'NA' },
    { id: 3, mmr: 1480, region: 'NA' },
    { id: 4, mmr: 1550, region: 'NA' }
  ]);
  const [matchFormed, setMatchFormed] = useState(false);

  // Sentinel - Kubernetes monitoring
  const [pods, setPods] = useState([
    { id: 1, status: 'healthy', cpu: 45, name: 'ml-trainer-1' },
    { id: 2, status: 'healthy', cpu: 78, name: 'api-gateway' },
    { id: 3, status: 'error', cpu: 92, name: 'worker-node-3' },
    { id: 4, status: 'healthy', cpu: 34, name: 'database-replica' }
  ]);
  const [aiFixing, setAiFixing] = useState(false);
  const [clusterHealth, setClusterHealth] = useState(92);

  // Pipeline simulation logic
  useEffect(() => {
    if (!isVisible) return;

    const suggestions = [
      "+2 cores suggested",
      "+4GB RAM optimal",
      "Cache size: 500MB",
      "Reduce parallelism",
      "+1 worker thread",
      "Network latency: 12ms"
    ];

    // Update metrics periodically
    const metricsInterval = setInterval(() => {
      setMatchingCount(Math.floor(Math.random() * 100) + 100);
      setAltitude(Number((Math.random() * 10 + 40).toFixed(1)));
      setConfidence(Math.floor(Math.random() * 5) + 95);
      setQueues(Math.floor(Math.random() * 10) + 20);
      setBuildTime(Math.floor(Math.random() * 50) + 120);
      setOptimizationScore(Math.floor(Math.random() * 10) + 85);
      setSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)]);
    }, 2000);

    return () => {
      clearInterval(metricsInterval);
    };
  }, [isVisible]);

  // Separate effect for pipeline progression
  useEffect(() => {
    if (!isVisible) return;

    const pipelineInterval = setInterval(() => {
      setPipelineStages(stages => {
        const currentStage = stages[currentStageIndex];

        // Only increment if current stage is running
        if (currentStage.status === 'running') {
          const newProgress = stageProgress + 5;

          if (newProgress >= 100) {
            // Stage complete - check for random failure (15% chance)
            const stageFailed = Math.random() < 0.15;

            if (stageFailed) {
              // Mark as failed and save current progress
              const failedStages = stages.map((stage, idx) =>
                idx === currentStageIndex
                  ? { ...stage, status: 'failed', progress: newProgress }
                  : stage
              );

              // Reset after 2 second delay
              setTimeout(() => {
                setPipelineStages([
                  { name: 'Build', status: 'running', progress: 0 },
                  { name: 'Test', status: 'idle', progress: 0 },
                  { name: 'Deploy', status: 'idle', progress: 0 }
                ]);
                setCurrentStageIndex(0);
                setStageProgress(0);
              }, 2000);

              setStageProgress(newProgress);
              return failedStages;
            } else {
              // Mark as success
              const successStages = stages.map((stage, idx) =>
                idx === currentStageIndex
                  ? { ...stage, status: 'success', progress: 100 }
                  : stage
              );

              // Move to next stage or complete
              if (currentStageIndex < 2) {
                // Start next stage
                const nextStages = successStages.map((stage, idx) =>
                  idx === currentStageIndex + 1
                    ? { ...stage, status: 'running', progress: 0 }
                    : stage
                );
                setCurrentStageIndex(currentStageIndex + 1);
                setStageProgress(0);
                return nextStages;
              } else {
                // All complete - reset after delay
                setTimeout(() => {
                  setPipelineStages([
                    { name: 'Build', status: 'running', progress: 0 },
                    { name: 'Test', status: 'idle', progress: 0 },
                    { name: 'Deploy', status: 'idle', progress: 0 }
                  ]);
                  setCurrentStageIndex(0);
                  setStageProgress(0);
                }, 2000);

                setStageProgress(100);
                return successStages;
              }
            }
          } else {
            setStageProgress(newProgress);
          }
        }

        return stages;
      });
    }, 60);

    return () => {
      clearInterval(pipelineInterval);
    };
  }, [isVisible, currentStageIndex, stageProgress]);

  // Initialize first stage as running
  useEffect(() => {
    if (!isVisible) return;

    setPipelineStages([
      { name: 'Build', status: 'running', progress: 0 },
      { name: 'Test', status: 'idle', progress: 0 },
      { name: 'Deploy', status: 'idle', progress: 0 }
    ]);
    setCurrentStageIndex(0);
    setStageProgress(0);
  }, [isVisible]);

  // Multiplayer SDK matchmaking animation
  useEffect(() => {
    if (!isVisible) return;

    const matchmakingInterval = setInterval(() => {
      // Add new players randomly
      setQueuedPlayers(prev => {
        if (prev.length >= 8) {
          // Form match and reset
          setMatchFormed(true);
          setTimeout(() => setMatchFormed(false), 2000);
          return [
            { id: Math.random(), mmr: Math.floor(Math.random() * 500) + 1300, region: 'NA' },
            { id: Math.random(), mmr: Math.floor(Math.random() * 500) + 1300, region: 'NA' }
          ];
        } else {
          // Add 1-2 players
          const newPlayers = Math.random() > 0.5 ? 1 : 2;
          const additions = Array.from({ length: newPlayers }, () => ({
            id: Math.random(),
            mmr: Math.floor(Math.random() * 500) + 1300,
            region: Math.random() > 0.7 ? 'EU' : 'NA'
          }));
          return [...prev, ...additions];
        }
      });
    }, 2500);

    return () => clearInterval(matchmakingInterval);
  }, [isVisible]);

  // Sentinel AI auto-fix animation
  useEffect(() => {
    if (!isVisible) return;

    const sentinelInterval = setInterval(() => {
      setPods(currentPods => {
        // Check if there's an error pod
        const errorPod = currentPods.find(p => p.status === 'error');

        if (errorPod && !aiFixing) {
          // Start AI fixing
          setAiFixing(true);
          setTimeout(() => {
            // Fix the pod after 3 seconds
            setPods(pods => pods.map(p =>
              p.status === 'error' ? { ...p, status: 'healing', cpu: Math.floor(Math.random() * 50) + 30 } : p
            ));
            setTimeout(() => {
              setPods(pods => pods.map(p =>
                p.status === 'healing' ? { ...p, status: 'healthy' } : p
              ));
              setAiFixing(false);
              setClusterHealth(100);
            }, 2000);
          }, 3000);
        } else if (!errorPod && !aiFixing) {
          // Randomly introduce an error (20% chance)
          if (Math.random() < 0.2) {
            const randomIndex = Math.floor(Math.random() * currentPods.length);
            const newPods = [...currentPods];
            newPods[randomIndex] = { ...newPods[randomIndex], status: 'error', cpu: 95 };
            setClusterHealth(75);
            return newPods;
          }
        }

        // Update CPU values randomly
        return currentPods.map(p => ({
          ...p,
          cpu: p.status === 'healthy' ? Math.floor(Math.random() * 40) + 30 : p.cpu
        }));
      });
    }, 4000);

    return () => clearInterval(sentinelInterval);
  }, [isVisible, aiFixing]);


  const getProjectGraphic = (title: string) => {
    if (title === "AeroForge") {
      return (
        <div className="aspect-video bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 relative overflow-hidden">
          {/* Sky/atmosphere gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-transparent" />

          {/* Grid overlay for targeting */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:40px_40px]" />

          {/* Moving target with tracking box and crosshair */}
          <motion.div
            className="absolute top-0 left-0"
            animate={{
              left: ["20%", "50%", "60%", "30%", "45%", "20%"],
              top: ["20%", "40%", "25%", "50%", "35%", "20%"]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Target box */}
            <motion.div
              className="relative w-10 h-10 sm:w-16 sm:h-16 border-2 border-cyan-400 rounded"
              animate={{
                borderColor: ["#22d3ee", "#06b6d4", "#22d3ee"],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {/* Corner brackets */}
              <div className="absolute -top-1 -left-1 w-2 h-2 sm:w-3 sm:h-3 border-t-2 border-l-2 border-cyan-300" />
              <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 border-t-2 border-r-2 border-cyan-300" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 sm:w-3 sm:h-3 border-b-2 border-l-2 border-cyan-300" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 border-b-2 border-r-2 border-cyan-300" />

              {/* Target label - centered above box */}
              <div className="absolute -top-4 sm:-top-6 left-1/2 -translate-x-1/2 text-[8px] sm:text-xs font-mono text-cyan-400 whitespace-nowrap">TARGET LOCKED</div>

              {/* Tracking crosshair with center dot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-20 flex items-center justify-center">
                <Crosshair className="w-12 h-12 sm:w-20 sm:h-20 text-blue-400" strokeWidth={1.5} />
                {/* Center dot - perfectly centered */}
                <motion.div
                  className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>

              {/* Tracking lines extending from target */}
              <div className="absolute top-1/2 -left-4 sm:-left-8 w-4 sm:w-8 h-0.5 bg-cyan-400/50 -translate-y-1/2" />
              <div className="absolute top-1/2 -right-4 sm:-right-8 w-4 sm:w-8 h-0.5 bg-cyan-400/50 -translate-y-1/2" />
              <div className="absolute left-1/2 -top-4 sm:-top-8 h-4 sm:h-8 w-0.5 bg-cyan-400/50 -translate-x-1/2" />
              <div className="absolute left-1/2 -bottom-4 sm:-bottom-8 h-4 sm:h-8 w-0.5 bg-cyan-400/50 -translate-x-1/2" />
            </motion.div>
          </motion.div>

          {/* Telemetry data */}
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

          {/* FPS and confidence */}
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
    } else if (title === "Multiplayer SDK") {
      return (
        <div className="aspect-video bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 relative overflow-hidden">
          {/* Network grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:30px_30px]" />

          {/* Match formed overlay */}
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

          {/* Matchmaking queue - horizontal */}
          <div className="absolute left-2 sm:left-4 bottom-8 sm:bottom-12 flex flex-wrap gap-1 sm:gap-1.5 max-w-[70%] sm:max-w-[60%]">
            <div className="w-full text-[8px] sm:text-[10px] font-mono text-purple-400 mb-0.5 sm:mb-1">QUEUE ({queuedPlayers.length}/8)</div>
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

          {/* Central server node */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: matchFormed ? [1, 1.3, 1] : [1, 1.1, 1],
                rotate: matchFormed ? [0, 360] : 0
              }}
              transition={{ duration: matchFormed ? 1 : 2, repeat: matchFormed ? 0 : Infinity }}
              className="relative"
            >
              <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full ${matchFormed ? 'bg-purple-500/50' : 'bg-purple-500/30'} border-2 border-purple-400 flex items-center justify-center`}>
                <Server className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
              </div>
              {/* Pulsing ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-purple-400"
                animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </div>

          {/* Stats */}
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

          {/* Matchmaking status */}
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 space-y-0.5 sm:space-y-1">
            <div className="text-[8px] sm:text-xs font-mono text-purple-400">MATCHMAKING</div>
            <motion.div
              className={`text-xs sm:text-sm font-mono font-bold ${queuedPlayers.length >= 8 ? 'text-green-400' : 'text-indigo-400'}`}
              animate={{ opacity: queuedPlayers.length >= 8 ? [1, 0.5, 1] : 1 }}
              transition={{ duration: 0.5, repeat: queuedPlayers.length >= 8 ? Infinity : 0 }}
            >
              {queuedPlayers.length >= 8 ? 'FORMING...' : 'SEARCHING'}
            </motion.div>
            <div className="text-[8px] sm:text-[10px] font-mono text-purple-300">
              AVG MMR: {Math.round(queuedPlayers.reduce((sum, p) => sum + p.mmr, 0) / queuedPlayers.length)}
            </div>
          </div>
        </div>
      );
    } else if (title === "InfraMind") {
      return (
        <div className="aspect-video bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 relative overflow-hidden">
          {/* Circuit pattern background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:15px_15px] sm:bg-[size:25px_25px]" />

          {/* Pipeline stages */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 sm:gap-12 px-2 sm:px-8">
            {pipelineStages.map((stage, idx) => {
              const isRunning = stage.status === 'running';
              const isSuccess = stage.status === 'success';
              const isFailed = stage.status === 'failed';
              const isIdle = stage.status === 'idle';

              // Color scheme based on status
              let bgColor = 'bg-slate-700/20'; // idle
              let borderColor = 'border-slate-500';
              let textColor = 'text-slate-400';
              let progressColor = 'bg-slate-400';

              if (isRunning) {
                bgColor = 'bg-blue-500/20';
                borderColor = 'border-blue-400';
                textColor = 'text-blue-400';
                progressColor = 'bg-blue-400';
              } else if (isSuccess) {
                bgColor = 'bg-emerald-500/20';
                borderColor = 'border-emerald-400';
                textColor = 'text-emerald-400';
                progressColor = 'bg-emerald-400';
              } else if (isFailed) {
                bgColor = 'bg-red-500/20';
                borderColor = 'border-red-400';
                textColor = 'text-red-400';
                progressColor = 'bg-red-400';
              }

              // Calculate progress width
              let progressWidth = '0%';
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
                  {/* Stage box */}
                  <div className={`${bgColor} border-2 ${borderColor} rounded-lg p-1.5 sm:p-3 backdrop-blur-sm transition-all duration-300`}>
                    <div className={`text-[8px] sm:text-xs font-mono ${textColor} text-center font-bold`}>
                      {isFailed ? 'FAILED' : stage.name}
                    </div>
                    {/* Progress bar */}
                    <div className="mt-1 sm:mt-2 h-0.5 sm:h-1 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${progressColor} transition-all duration-100 ease-linear`}
                        style={{ width: progressWidth }}
                      />
                    </div>
                  </div>

                  {/* Arrow to next stage - positioned in the gap */}
                  {idx < 2 && (
                    <div className="absolute top-1/2 left-full -translate-y-1/2 px-1 sm:px-3">
                      <div className="flex items-center gap-0.5">
                        <div className={`w-2 sm:w-5 h-0.5 ${isSuccess ? 'bg-emerald-400' : 'bg-slate-500'} transition-colors duration-300`} />
                        <div className={`w-0 h-0 border-l-[4px] sm:border-l-[6px] ${isSuccess ? 'border-l-emerald-400' : 'border-l-slate-500'} border-t-[2px] sm:border-t-[3px] border-t-transparent border-b-[2px] sm:border-b-[3px] border-b-transparent transition-colors duration-300`} />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Build metrics */}
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

          {/* ML Optimization indicator - moved to bottom right */}
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

          {/* Floating optimization suggestions - now randomized */}
          <motion.div
            className="absolute top-8 sm:top-12 left-2 sm:left-4 text-[8px] sm:text-[10px] font-mono text-emerald-300/70 bg-emerald-950/50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-emerald-500/20"
            animate={{ y: [0, -5, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
            key={suggestion}
          >
            {suggestion}
          </motion.div>

          {/* Performance improvement indicator */}
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex items-center gap-1 sm:gap-1.5">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
            <span className="text-[8px] sm:text-xs font-mono text-yellow-400 font-bold">40% faster</span>
          </div>
        </div>
      );
    } else if (title === "Sentinel") {
      return (
        <div className="aspect-video bg-gradient-to-br from-cyan-950 via-slate-900 to-blue-950 relative overflow-hidden">
          {/* Kubernetes cluster grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:35px_35px]" />

          {/* AI Agent indicator */}
          {aiFixing && (
            <motion.div
              className="absolute top-2 left-1/2 sm:left-1/4 -translate-x-1/2 flex items-center gap-1 sm:gap-2 bg-cyan-500/20 border border-cyan-400 rounded-lg px-2 sm:px-4 py-1 sm:py-2 z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <span className="text-cyan-300 text-[8px] sm:text-sm hidden sm:inline">Auto Fixes…</span>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
              </motion.div>
              <span className="text-[8px] sm:text-sm font-mono text-cyan-300 font-bold">AI FIXING</span>
            </motion.div>
          )}

          {/* Cluster health indicator */}
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 space-y-1 sm:space-y-2">
            <div className="text-[8px] sm:text-xs font-mono text-cyan-400">CLUSTER HEALTH</div>
            <div className="flex items-center gap-1 sm:gap-2">
              <motion.div
                className="text-lg sm:text-2xl font-mono font-bold"
                animate={{
                  color: clusterHealth === 100 ? '#22d3ee' : clusterHealth >= 75 ? '#fbbf24' : '#ef4444'
                }}
              >
                {clusterHealth}%
              </motion.div>
              <Shield className={`w-4 h-4 sm:w-5 sm:h-5 ${clusterHealth === 100 ? 'text-cyan-400' : clusterHealth >= 75 ? 'text-yellow-400' : 'text-red-400'}`} />
            </div>
          </div>

          {/* Kubernetes pods grid */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-2 sm:gap-4 p-2 sm:p-8">
              {pods.map((pod, idx) => {
                const isHealthy = pod.status === 'healthy';
                const isError = pod.status === 'error';
                const isHealing = pod.status === 'healing';

                // Use hex colors for framer-motion animation
                let bgColorHex = 'rgba(34, 211, 238, 0.2)'; // cyan
                let borderColorHex = '#22d3ee'; // cyan
                let iconColor = 'text-cyan-400';
                let Icon = CheckCircle;

                if (isError) {
                  bgColorHex = 'rgba(239, 68, 68, 0.2)'; // red
                  borderColorHex = '#f87171'; // red
                  iconColor = 'text-red-400';
                  Icon = AlertCircle;
                } else if (isHealing) {
                  bgColorHex = 'rgba(251, 191, 36, 0.2)'; // yellow
                  borderColorHex = '#fbbf24'; // yellow
                  iconColor = 'text-yellow-400';
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
                      borderColor: borderColorHex
                    }}
                    transition={{
                      delay: idx * 0.1,
                      backgroundColor: { duration: 0.5 },
                      borderColor: { duration: 0.5 }
                    }}
                    className="border-2 rounded-lg p-1.5 sm:p-3 min-w-[70px] sm:min-w-[120px]"
                  >
                    <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                      <Cloud className={`w-3 h-3 sm:w-4 sm:h-4 ${iconColor}`} />
                      <div className="text-[7px] sm:text-[9px] font-mono text-slate-300 truncate">{pod.name}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColor}`} />
                      <div className="text-right">
                        <div className={`text-[8px] sm:text-[10px] font-mono ${iconColor}`}>
                          {isError ? 'ERROR' : isHealing ? 'HEALING' : 'HEALTHY'}
                        </div>
                        <div className="text-[7px] sm:text-[9px] font-mono text-slate-400">
                          CPU: {pod.cpu}%
                        </div>
                      </div>
                    </div>
                    {/* CPU bar */}
                    <div className="mt-1 sm:mt-2 h-0.5 sm:h-1 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${isError ? 'bg-red-400' : isHealing ? 'bg-yellow-400' : 'bg-cyan-400'}`}
                        animate={{ width: `${pod.cpu}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Stats */}
          <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 space-y-0.5 sm:space-y-1 text-right">
            <div className="text-[8px] sm:text-xs font-mono text-cyan-400 flex items-center gap-1 sm:gap-2 justify-end">
              <Cloud className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>3 CLUSTERS</span>
            </div>
            <div className="text-[8px] sm:text-xs font-mono text-green-400">
              UPTIME: 99.9%
            </div>
            <div className="text-[8px] sm:text-xs font-mono text-blue-400">
              {pods.filter(p => p.status === 'healthy').length}/{pods.length} HEALTHY
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative scroll-mt-24" ref={ref}>
        {/* Hex address decoration */}
        <div className="absolute top-8 left-4 text-xs font-mono text-muted-foreground/30">
          [0x0003]
        </div>

        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Terminal className="w-6 h-6 text-primary" />
              <h2 className="text-4xl sm:text-5xl font-light tracking-tight font-mono">
                <span className="text-primary">./</span>projects <span className="text-muted-foreground">--show</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Selected engineering projects demonstrating expertise in firmware, testing, and DevOps
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => {
              return (
                <article
                  key={project.title}
                  className={`group relative overflow-visible rounded-xl backdrop-blur-xl bg-card/40 border-2 shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
                    }`}
                  style={{
                    transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
                  }}
                >
                  {/* Animated neon border glow - outline only */}
                  <div className="absolute inset-0 rounded-xl pointer-events-none">
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                      boxShadow: '0 0 25px hsl(var(--primary)), 0 0 50px hsl(var(--accent) / 0.5)'
                    }} />
                  </div>

                  {/* Subtle glassmorphism overlay */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/3 via-transparent to-accent/3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Status indicator */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-mono text-primary flex items-center gap-1">
                      {project.isWIP && <Wrench className="w-3 h-3" />}
                      {project.status}
                    </span>
                  </div>

                  {/* Custom project graphic */}
                  {getProjectGraphic(project.title)}

                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-medium group-hover:text-primary transition-colors font-mono flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-primary" />
                        {project.title}
                      </h3>
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {project.description}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="text-center p-2 rounded bg-muted/50">
                          <div className="text-xs text-muted-foreground font-mono mb-1">{key}</div>
                          <div className="text-sm font-mono text-primary font-medium">{value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs rounded-md bg-primary/10 text-primary font-mono hover:bg-primary/20 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="group/btn w-full justify-between font-mono text-primary hover:text-primary"
                      onClick={() => setSelectedProject(project)}
                    >
                      View Details
                      <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project Details Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-card border-primary/30">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between mb-2">
                  <DialogTitle className="text-2xl font-mono flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-primary" />
                    {selectedProject.title}
                  </DialogTitle>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-mono text-primary flex items-center gap-1">
                      {selectedProject.isWIP && <Wrench className="w-3 h-3" />}
                      {selectedProject.status}
                    </span>
                  </div>
                </div>
                <DialogDescription className="text-base">
                  {selectedProject.fullDescription || selectedProject.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Metrics */}
                <div>
                  <h3 className="text-sm font-mono text-primary mb-3">Metrics</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {Object.entries(selectedProject.metrics).map(([key, value]) => (
                      <div key={key} className="text-center p-3 rounded bg-muted/50 border border-primary/20">
                        <div className="text-xs text-muted-foreground font-mono mb-1">{key}</div>
                        <div className="text-lg font-mono text-primary font-medium">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                {selectedProject.features && (
                  <div>
                    <h3 className="text-sm font-mono text-primary mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack */}
                <div>
                  <h3 className="text-sm font-mono text-primary mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-sm rounded-md bg-primary/10 text-primary font-mono hover:bg-primary/20 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* GitHub Link */}
                {selectedProject.github && (
                  <div className="pt-4 border-t border-primary/20">
                    <Button
                      variant="default"
                      size="lg"
                      className="w-full font-mono"
                      asChild
                    >
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View on GitHub
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default memo(Projects);
