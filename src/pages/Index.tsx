import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import SocialTaskbar from "@/components/SocialTaskbar";

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
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
            >
              <About />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              <Experience />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            >
              <Skills />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
              <Projects />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
            >
              <Contact />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
