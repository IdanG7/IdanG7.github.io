import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import SocialTaskbar from "@/components/SocialTaskbar";
import StickyNav from "@/components/StickyNav";
import ScrollReveal from "@/components/ScrollReveal";

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
    <div className="min-h-screen bg-background relative">
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
              <div id="about">
                <About />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div id="experience">
                <Experience />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div id="skills">
                <Skills />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div id="projects">
                <Projects />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div id="contact">
                <Contact />
              </div>
            </ScrollReveal>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
