import { useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import {
  Terminal,
  Wrench,
  Zap,
  TrendingUp,
  CheckCircle2,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Server,
  Clock,
  Target,
  Shield,
  GitBranch,
  Code2,
  Settings,
  Activity,
  ChevronRight,
  Briefcase,
  ArrowRight,
  Sparkles,
  Rocket,
  Home,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AnimatedCounter = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, scale: 1 });
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={controls}
      transition={{ duration: 0.5, type: "spring" }}
      className="text-4xl md:text-5xl font-bold font-mono bg-gradient-to-br from-primary via-accent to-primary bg-clip-text text-transparent"
    >
      {value}
      {suffix}
    </motion.div>
  );
};

const DevOps = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [hoveredCase, setHoveredCase] = useState<number | null>(null);

  const services = [
    {
      title: "CI/CD Setup & Modernization",
      icon: GitBranch,
      description: "Build production-grade pipelines from scratch or modernize legacy workflows",
      deliverables: [
        "GitHub Actions or Jenkins pipeline setup",
        "Build, test, lint, and security scanning workflows",
        "Automated deployment pipelines with rollback strategies",
        "Intelligent caching and matrix builds for multi-platform support",
        "Comprehensive documentation and runbooks",
      ],
      highlight: "Zero to Production",
      color: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400",
    },
    {
      title: "Pipeline Debugging & Reliability",
      icon: Shield,
      description: "Fix failing builds, eliminate flaky tests, and optimize performance",
      deliverables: [
        "Root-cause analysis of pipeline failures",
        "Flaky test isolation and stabilization",
        "Build speed optimization (typical 30-50% reduction)",
        "Environment consistency and reproducibility fixes",
        "Cross-platform build support (Linux, Windows, macOS)",
      ],
      highlight: "30-50% Faster",
      color: "from-emerald-500/20 to-green-500/20",
      iconColor: "text-emerald-400",
    },
    {
      title: "DevOps Automation & AI-Assisted Tooling",
      icon: Zap,
      description: "Next-generation CI/CD with intelligent automation and self-healing capabilities",
      deliverables: [
        "Automated log analysis and error classification",
        "Self-healing CI stages with automatic retry logic",
        "Intelligent build scheduling and resource optimization",
        "Custom ONNX-based diagnostics and prediction models",
        "Seamless integration with Jenkins and GitHub Actions",
      ],
      highlight: "AI-Powered",
      color: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400",
    },
  ];

  const experience = [
    {
      company: "WDI Wise Device Inc",
      role: "Junior Software Developer (DevOps - CI/CD)",
      period: "Jan 2025 – Present",
      location: "Markham, ON",
      achievements: [
        "Maintained and optimized a large Jenkins ecosystem of 70+ production pipelines, improving long-term build reliability, artifact delivery consistency, and deployment traceability across multiple internal and customer environments",
        "Implemented automation integrating SVN, JIRA, and Jenkins using webhook-driven event flows, eliminating manual coordination steps and reducing cross-repository integration-related build failures by 30%",
        "Built API-driven automated testing utilities to accelerate QA validation, expand CI test coverage, and shorten the release cycle for imaging/auto focus software",
        "Supported multi-team Jenkins job migrations using custom Groovy automation (Co-op: May 2024 – Jan 2025)",
        "Collaborated with QA and release engineering to triage and resolve 100+ CI pipeline issues",
      ],
    },
    {
      company: "Advanced Micro Devices (AMD)",
      role: "Incoming Embedded Firmware Engineer Intern",
      period: "May 2026 – Sept 2027",
      location: "Markham, ON",
      achievements: [
        "Joining AMD's Embedded Systems and Firmware Engineering division to design, implement, and validate low-level C/C++ firmware for next-generation computing platforms",
        "Focus on AI accelerators, gaming, and embedded systems while collaborating with hardware, silicon, and software teams",
      ],
    },
  ];

  const projects = [
    {
      name: "Sentinel",
      tagline: "Autonomous CI/CD Remediation and Pipeline Intelligence",
      description:
        "AI-assisted DevOps automation framework that detects failing CI stages, generates actionable fixes, and applies automated remediation across Jenkins and GitHub Actions to improve reliability. Built with modular agents for log parsing, error classification, validation, and patch generation, enabling continuous self-healing CI pipelines that automatically respond to evolving build environments and failure patterns.",
      tech: ["Python", "Docker", "GitHub Actions", "Jenkins API", "ONNX", "NATS"],
      highlights: [
        "ONNX-based inference for build diagnostics and real-time detection",
        "Modular agents for log parsing, error classification, validation, and patch generation",
        "Continuous self-healing CI pipelines with automated remediation",
        "Predictive failure analysis across distributed CI workflows",
      ],
      github: "https://github.com/IdanG7/Sentinel",
      gradient: "from-orange-500 to-red-500",
    },
    {
      name: "InfraMind",
      tagline: "Intelligent DevOps Orchestration Engine",
      description:
        "Intelligent build-orchestration engine capable of predicting pipeline runtimes and managing cross-platform execution across Jenkins and GitHub Actions to streamline CI throughput and resource utilization. Implements a unified control plane for artifact delivery, caching, rollout safety checks, and observability, enabling consistent deployments across heterogeneous infrastructure with enhanced monitoring and fault isolation.",
      tech: ["Python", "Docker", "Jenkins", "GitHub Actions", "Prometheus", "Grafana"],
      highlights: [
        "Predictive pipeline runtime modeling and resource optimization",
        "Unified control plane for artifact delivery and caching",
        "Rollout safety checks with comprehensive observability",
        "Published on PyPI and deployed in staging environments",
      ],
      github: "https://github.com/IdanG7/inframind",
      pypi: "https://pypi.org/project/InfraMind/",
      gradient: "from-blue-500 to-purple-500",
    },
  ];

  const caseStudies = [
    {
      title: "40% Build Time Reduction",
      subtitle: "Imaging Software Startup",
      challenge:
        "Medical imaging startup with 45-minute build times blocking rapid iteration. Pipeline lacked caching, ran unnecessary steps, and had poor parallelization.",
      solution:
        "Implemented intelligent caching strategy, reorganized pipeline stages for parallel execution, and optimized Docker layer builds. Introduced conditional job execution based on changed files.",
      results: ["Build time: 45min → 27min (40% reduction)", "Deployment frequency increased 3x", "CI cost reduced by 35%"],
      impact: "Engineering team could deploy multiple times per day instead of waiting hours for builds.",
      icon: Rocket,
      color: "from-blue-500/10 to-cyan-500/10",
    },
    {
      title: "68% Failure Reduction",
      subtitle: "Multi-Team Environment",
      challenge:
        "70+ Jenkins pipelines across multiple teams experiencing 20-30% failure rate due to flaky tests, environment inconsistencies, and resource contention.",
      solution:
        "Conducted systematic analysis of failure patterns, isolated and fixed flaky tests, standardized build environments with Docker, and implemented intelligent retry logic with exponential backoff.",
      results: [
        "Failure rate: 25% → 8% (68% reduction)",
        "Mean time to recovery decreased by 45%",
        "Developer satisfaction scores improved significantly",
      ],
      impact: "Eliminated daily firefighting and restored developer confidence in CI/CD.",
      icon: Shield,
      color: "from-emerald-500/10 to-green-500/10",
    },
    {
      title: "Zero-Downtime Migration",
      subtitle: "GitHub Actions Migration",
      challenge:
        "SaaS startup needed to migrate from legacy CircleCI setup to GitHub Actions. Required zero downtime, maintaining existing deployment cadence, and improving observability.",
      solution:
        "Designed parallel GitHub Actions workflows, implemented gradual cutover strategy, added comprehensive status monitoring, and built custom action for deployment orchestration.",
      results: [
        "Zero-downtime migration completed in 2 weeks",
        "Pipeline execution time improved by 25%",
        "Enhanced observability with workflow insights",
      ],
      impact: "Unified version control and CI/CD in one platform, reducing tooling costs and complexity.",
      icon: GitBranch,
      color: "from-purple-500/10 to-pink-500/10",
    },
  ];

  const technologies = [
    { category: "CI/CD", items: ["Jenkins", "GitHub Actions", "Docker", "Git", "SVN"], icon: GitBranch },
    { category: "Programming", items: ["C/C++", "Python", "Java", "Groovy", "Shell"], icon: Code2 },
    { category: "Infrastructure", items: ["Linux", "Embedded Linux", "Windows", "NATS", "Kubernetes", "AWS"], icon: Server },
    { category: "Monitoring & Tooling", items: ["Grafana", "Prometheus", "Logging", "Artifact Management"], icon: TrendingUp },
    { category: "Development Tools", items: ["JIRA", "Monday", "Visual Studio", "VS Code", "PyCharm", "IntelliJ"], icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Continuous animated background - moved outside sections */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 -left-32 w-[500px] h-[500px] bg-primary rounded-full"
          style={{ filter: "blur(120px)" }}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
          className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-accent rounded-full"
          style={{ filter: "blur(140px)" }}
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.45, 0.25],
            x: [0, 50, 0],
            y: [0, -80, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10,
          }}
          className="absolute bottom-1/4 left-1/4 w-[700px] h-[700px] bg-primary/60 rounded-full"
          style={{ filter: "blur(150px)" }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--primary) / 0.1) 1.5px, transparent 1.5px), linear-gradient(90deg, hsl(var(--primary) / 0.1) 1.5px, transparent 1.5px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,hsl(var(--background))_70%)]" />
      </div>

      {/* Navigation bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild className="font-mono">
                <a href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </a>
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-6 text-sm font-mono">
                <a href="#services" className="hover:text-primary transition-colors">
                  Services
                </a>
                <a href="#case-studies" className="hover:text-primary transition-colors">
                  Results
                </a>
                <a href="#projects" className="hover:text-primary transition-colors">
                  Projects
                </a>
                <a href="#experience" className="hover:text-primary transition-colors">
                  Experience
                </a>
              </nav>
              <Button size="sm" variant="ghost" className="font-mono hidden sm:inline-flex" asChild>
                <a href="/resume-devops.pdf" target="_blank" rel="noopener noreferrer">
                  Resume
                </a>
              </Button>
              <Button size="sm" className="font-mono" asChild>
                <a href="#contact">Contact</a>
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="absolute top-24 left-4 text-xs font-mono text-primary/50">[0xDEVOPS]</div>

        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-10"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border border-primary/30 rounded-full text-sm font-mono text-primary backdrop-blur-sm"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-primary rounded-full"
              />
              <Terminal className="w-4 h-4" />
              <span className="font-semibold">Available for Contract Work</span>
            </motion.div>

            {/* Main heading with more padding */}
            <div className="space-y-8 py-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1]"
              >
                <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent pb-2">
                  DevOps Engineer
                </span>
                <span className="block text-foreground mt-4">CI/CD Specialist</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-wrap items-center justify-center gap-4 text-base sm:text-lg font-mono text-muted-foreground pt-4"
              >
                {["Jenkins", "GitHub Actions", "Pipeline Reliability", "AI Automation"].map((item, i) => (
                  <span key={item} className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    {item}
                    {i < 3 && <span className="text-primary/30">•</span>}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Value proposition */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <Card className="bg-background/60 backdrop-blur-xl border-primary/20 shadow-2xl">
                <CardContent className="pt-8 pb-8 px-8">
                  <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
                    <p className="text-2xl font-bold text-foreground">
                      Fix failing pipelines. Accelerate builds. Ship with confidence.
                    </p>
                    <p className="text-base">
                      I help engineering teams resolve CI/CD issues, optimize build performance, and implement intelligent
                      automation that scales. From debugging flaky tests to building AI-powered DevOps tools.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold font-mono text-primary">70+</div>
                        <div className="text-xs text-muted-foreground">Pipelines Managed</div>
                      </div>
                      <div className="w-px h-12 bg-border" />
                      <div className="text-center">
                        <div className="text-3xl font-bold font-mono text-primary">30-50%</div>
                        <div className="text-xs text-muted-foreground">Build Time Reduction</div>
                      </div>
                      <div className="w-px h-12 bg-border" />
                      <div className="text-center">
                        <div className="text-3xl font-bold font-mono text-primary">100+</div>
                        <div className="text-xs text-muted-foreground">Issues Resolved</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-6"
            >
              <Button
                size="lg"
                className="font-mono font-bold text-base px-8 py-6 bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Mail className="w-5 h-5 mr-2" />
                Start a Conversation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-mono text-base px-8 py-6 border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Services
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
          className="absolute bottom-8"
        >
          <ChevronDown className="w-6 h-6 text-primary/50" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-4 sm:px-6 lg:px-8 relative scroll-mt-24">
        <div className="absolute top-8 left-4 text-xs font-mono text-primary/50">[0x0001]</div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-16"
          >
            {/* Section header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-mono text-primary mb-4">
                <Wrench className="w-4 h-4" />
                <span>What I Offer</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-bold tracking-tight">
                <span className="text-primary">./</span>services
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive DevOps solutions tailored to your pipeline challenges
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onHoverStart={() => setHoveredService(index)}
                    onHoverEnd={() => setHoveredService(null)}
                    className="h-full"
                  >
                    <Card
                      className={`h-full transition-all duration-500 hover:scale-[1.02] bg-gradient-to-br ${service.color} backdrop-blur-sm border-2 ${
                        hoveredService === index ? "border-primary/50 shadow-2xl shadow-primary/20" : "border-border"
                      }`}
                    >
                      <CardHeader className="space-y-4">
                        <div className="flex items-start justify-between">
                          <motion.div
                            animate={hoveredService === index ? { rotate: 360 } : {}}
                            transition={{ duration: 0.6 }}
                            className={`p-3 rounded-xl bg-background/50 ${service.iconColor}`}
                          >
                            <Icon className="w-8 h-8" />
                          </motion.div>
                          <Badge
                            variant="secondary"
                            className="font-mono text-xs font-bold bg-background/80 backdrop-blur-sm"
                          >
                            {service.highlight}
                          </Badge>
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-bold font-mono mb-2">{service.title}</CardTitle>
                          <CardDescription className="text-base">{service.description}</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {service.deliverables.map((deliverable, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.1 * i }}
                              className="flex items-start gap-3 text-sm text-muted-foreground"
                            >
                              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                              <span>{deliverable}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-32 px-4 sm:px-6 lg:px-8 relative scroll-mt-24">
        <div className="absolute top-8 left-4 text-xs font-mono text-primary/50">[0x0002]</div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-16"
          >
            {/* Section header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-mono text-primary mb-4">
                <Target className="w-4 h-4" />
                <span>Proven Results</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-bold tracking-tight">
                <span className="text-primary">./</span>results
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Real impact on production pipelines and engineering velocity
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => {
                const Icon = study.icon;
                return (
                  <motion.div
                    key={study.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onHoverStart={() => setHoveredCase(index)}
                    onHoverEnd={() => setHoveredCase(null)}
                  >
                    <Card
                      className={`h-full transition-all duration-500 bg-gradient-to-br ${study.color} backdrop-blur-sm border-2 ${
                        hoveredCase === index ? "scale-[1.02] shadow-2xl border-primary/50" : "border-border"
                      }`}
                    >
                      <CardHeader className="space-y-4">
                        <motion.div
                          animate={hoveredCase === index ? { scale: 1.1 } : { scale: 1 }}
                          className="inline-flex p-3 rounded-xl bg-background/50 w-fit"
                        >
                          <Icon className="w-8 h-8 text-primary" />
                        </motion.div>
                        <div>
                          <CardTitle className="text-2xl font-bold font-mono leading-tight">{study.title}</CardTitle>
                          <CardDescription className="text-base font-semibold mt-2">{study.subtitle}</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h4 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                            <div className="w-1 h-4 bg-primary rounded" />
                            Challenge
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{study.challenge}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                            <div className="w-1 h-4 bg-accent rounded" />
                            Solution
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{study.solution}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            Results
                          </h4>
                          <ul className="space-y-2">
                            {study.results.map((result, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground font-mono font-semibold">{result}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-4 border-t border-border">
                          <p className="text-sm font-semibold text-primary leading-relaxed">{study.impact}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-4 sm:px-6 lg:px-8 relative scroll-mt-24">
        <div className="absolute top-8 left-4 text-xs font-mono text-primary/50">[0x0003]</div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-16"
          >
            {/* Section header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-mono text-primary mb-4">
                <Code2 className="w-4 h-4" />
                <span>Open Source Projects</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-bold tracking-tight">
                <span className="text-primary">./</span>portfolio
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Production-grade DevOps automation tools built from the ground up
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full overflow-hidden group hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/50 bg-card/50 backdrop-blur-sm hover:scale-[1.02]">
                    <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
                    <CardHeader className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-3xl font-bold font-mono flex items-center gap-3 group-hover:text-primary transition-colors">
                            <Server className="w-7 h-7" />
                            {project.name}
                          </CardTitle>
                          <CardDescription className="text-lg font-semibold mt-2">{project.tagline}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-muted-foreground leading-relaxed text-base">{project.description}</p>

                      <div>
                        <h4 className="text-sm font-mono font-bold text-foreground mb-3 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          Key Features
                        </h4>
                        <ul className="grid grid-cols-1 gap-2">
                          {project.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-mono font-bold text-foreground mb-3">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <Badge key={tech} variant="secondary" className="font-mono text-xs font-semibold">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button size="sm" className="flex-1 font-mono font-bold" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            View on GitHub
                          </a>
                        </Button>
                        {project.pypi && (
                          <Button size="sm" variant="outline" className="flex-1 font-mono" asChild>
                            <a href={project.pypi} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              PyPI Package
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-4 sm:px-6 lg:px-8 relative scroll-mt-24">
        <div className="absolute top-8 left-4 text-xs font-mono text-primary/50">[0x0004]</div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-16"
          >
            {/* Section header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-mono text-primary mb-4">
                <Briefcase className="w-4 h-4" />
                <span>Professional Background</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-bold tracking-tight">
                <span className="text-primary">./</span>experience
              </h2>
              <div className="pt-4">
                <Button size="lg" variant="outline" className="font-mono border-primary/30 hover:border-primary hover:bg-primary/10" asChild>
                  <a href="/resume-devops.pdf" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Full DevOps Resume
                  </a>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-500 bg-card/50 backdrop-blur-sm border-2 hover:border-primary/30">
                    <CardHeader>
                      <div className="space-y-4">
                        <div>
                          <CardTitle className="text-2xl font-bold font-mono">{exp.company}</CardTitle>
                          <CardDescription className="text-lg mt-2">{exp.role}</CardDescription>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
                          <Badge variant="outline" className="font-mono">
                            <Clock className="w-3 h-3 mr-1" />
                            {exp.period}
                          </Badge>
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-32 px-4 sm:px-6 lg:px-8 relative scroll-mt-24">
        <div className="absolute top-8 left-4 text-xs font-mono text-primary/50">[0x0005]</div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-16"
          >
            {/* Section header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-mono text-primary mb-4">
                <Settings className="w-4 h-4" />
                <span>Tech Stack</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-bold tracking-tight">
                <span className="text-primary">./</span>technologies
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technologies.map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={tech.category}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30 bg-card/50 backdrop-blur-sm group">
                      <CardHeader>
                        <CardTitle className="text-lg font-mono text-primary flex items-center gap-2">
                          <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          {tech.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {tech.items.map((item) => (
                            <Badge key={item} variant="secondary" className="font-mono text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 relative scroll-mt-24">
        <div className="absolute top-8 left-4 text-xs font-mono text-primary/50">[0x0006]</div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <Card className="overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border-2 border-primary/30 backdrop-blur-sm shadow-2xl">
              <CardContent className="relative pt-16 pb-16 text-center space-y-8">
                <div className="space-y-6">
                  <motion.div
                    animate={{
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                      Ready to{" "}
                      <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                        Ship Faster
                      </span>
                      ?
                    </h2>
                  </motion.div>
                  <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Let's fix your pipelines, optimize your builds, and automate your DevOps workflows.
                  </p>
                  <p className="text-lg text-muted-foreground font-mono font-semibold">
                    I take on a small number of contracts. Get in touch today.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto py-8">
                  <div className="space-y-2">
                    <AnimatedCounter value="70" suffix="+" />
                    <p className="text-sm text-muted-foreground font-mono">Production Pipelines</p>
                  </div>
                  <div className="space-y-2">
                    <AnimatedCounter value="30-50" suffix="%" />
                    <p className="text-sm text-muted-foreground font-mono">Build Time Reduction</p>
                  </div>
                  <div className="space-y-2">
                    <AnimatedCounter value="100" suffix="+" />
                    <p className="text-sm text-muted-foreground font-mono">Issues Resolved</p>
                  </div>
                </div>

                {/* Contact buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Button
                    size="lg"
                    className="font-mono font-bold text-base px-10 py-6 bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 w-full sm:w-auto hover:scale-105"
                    asChild
                  >
                    <a href="mailto:idan.gurevich@gmail.com">
                      <Mail className="w-5 h-5 mr-2" />
                      idan.gurevich@gmail.com
                    </a>
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-4 pt-4">
                  <Button variant="outline" size="lg" className="font-mono border-primary/30 hover:scale-105 transition-transform" asChild>
                    <a href="https://github.com/IdanG7" target="_blank" rel="noopener noreferrer">
                      <Github className="w-5 h-5 mr-2" />
                      GitHub
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" className="font-mono border-primary/30 hover:scale-105 transition-transform" asChild>
                    <a href="https://www.linkedin.com/in/idangurevich/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-5 h-5 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground font-mono">
            <p>© {new Date().getFullYear()} Idan Gurevich • DevOps Engineer & CI/CD Specialist</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-primary font-semibold">Available for Contract Work</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DevOps;
