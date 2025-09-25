import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

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
    <div className="min-h-screen bg-background">
      <div id="hero">
        <Hero onTerminalStateChange={setTerminalMaximized} />
      </div>
      <AnimatePresence>
        {!terminalMaximized && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{
              duration: 0.6,
              ease: [0.34, 1.26, 0.64, 1],
              staggerChildren: 0.1,
            }}
          >
            <About />
            <Skills />
            <Projects />
            <Contact />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
