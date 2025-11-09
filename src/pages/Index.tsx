import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import SocialTaskbar from "@/components/SocialTaskbar";
import StickyNav from "@/components/StickyNav";
import ScrollReveal from "@/components/ScrollReveal";
import {
  ProjectsSectionSkeleton,
  ExperienceSectionSkeleton,
  SkillsSectionSkeleton
} from "@/components/Skeletons";

// Lazy load heavy components for better initial load performance
const About = lazy(() => import("@/components/About"));
const Experience = lazy(() => import("@/components/Experience"));
const Skills = lazy(() => import("@/components/Skills"));
const Projects = lazy(() => import("@/components/Projects"));
const Contact = lazy(() => import("@/components/Contact"));

const Index = () => {
  const [terminalMaximized, setTerminalMaximized] = useState(true);

  useEffect(() => {
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      if (terminalMaximized) {
        heroSection.style.minHeight = '100vh';
      } else {
        heroSection.style.minHeight = 'auto';
        heroSection.style.paddingBottom = '2rem';
      }
    }
  }, [terminalMaximized]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Global animated background effects */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {/* Animated gradient blobs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full animate-pulse" style={{ filter: 'blur(100px)', animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full animate-pulse" style={{ filter: 'blur(90px)', animationDelay: '2s', animationDuration: '10s' }} />
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-primary/8 rounded-full animate-pulse" style={{ filter: 'blur(80px)', animationDelay: '4s', animationDuration: '12s' }} />

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'linear-gradient(hsl(var(--primary) / 0.05) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }} />

        {/* Radial gradient fade from center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background)/0.3)_100%)]" />
      </div>

      <StickyNav />
      <div id="hero">
        <Hero onTerminalStateChange={setTerminalMaximized} />
      </div>
      <SocialTaskbar />
      <AnimatePresence mode="wait">
        {!terminalMaximized && (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{
              duration: 0.6,
              delay: 0,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <ScrollReveal delay={0.1}>
              <div id="about" className="relative">
                <div className="absolute -top-32 -left-20 w-80 h-80 bg-primary/5 rounded-full" style={{ filter: 'blur(60px)' }} />
                <Suspense fallback={<div className="py-24 px-4" />}>
                  <About />
                </Suspense>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div id="experience" className="relative">
                <div className="absolute top-0 -right-20 w-96 h-96 bg-accent/5 rounded-full" style={{ filter: 'blur(70px)' }} />
                <Suspense fallback={<ExperienceSectionSkeleton />}>
                  <Experience />
                </Suspense>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div id="skills" className="relative">
                <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-primary/6 rounded-full" style={{ filter: 'blur(80px)' }} />
                <Suspense fallback={<SkillsSectionSkeleton />}>
                  <Skills />
                </Suspense>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div id="projects" className="relative">
                <div className="absolute top-1/2 -right-32 w-80 h-80 bg-accent/6 rounded-full" style={{ filter: 'blur(75px)' }} />
                <Suspense fallback={<ProjectsSectionSkeleton />}>
                  <Projects />
                </Suspense>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div id="contact" className="relative">
                <div className="absolute -top-20 left-1/2 w-64 h-64 bg-primary/5 rounded-full" style={{ filter: 'blur(65px)' }} />
                <Suspense fallback={<div className="py-24 px-4" />}>
                  <Contact />
                </Suspense>
              </div>
            </ScrollReveal>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
