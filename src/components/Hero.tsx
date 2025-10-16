import { useState, useEffect } from "react";
import { Terminal } from "lucide-react";
import { motion } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import TypewriterText from "./TypewriterText";
import TerminalInterface from "./TerminalInterface";
import TerminalQuickActions from "./TerminalQuickActions";
import IconCloud from "./IconCloud";
import Sparkles from "./Sparkles";
import SpaceBg from "./SpaceBg";
import { particlesConfig } from "../utils/particlesConfig";

interface HeroProps {
  onTerminalStateChange: (isMaximized: boolean) => void;
}

const Hero = ({ onTerminalStateChange }: HeroProps) => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [init, setInit] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for dark mode
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const handleTerminalStateChange = (isOpen: boolean) => {
    setIsTerminalOpen(isOpen);
    onTerminalStateChange(isOpen);
  };

  return (
    <section id="hero-section" className="min-h-screen relative overflow-hidden transition-all duration-700">
      {/* Space Container with Particles and Clouds */}
      <div className="space-container" id="space-container">
        <SpaceBg />
        {init && (
          <Particles
            id="tsparticles"
            options={particlesConfig(isDark)}
          />
        )}
      </div>

      {/* Texture overlay shapes */}
      <motion.div
        className="absolute inset-0 -z-5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-primary/8 rounded-full animate-pulse" style={{ filter: 'blur(80px)' }} />
        <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-accent/8 rounded-full animate-pulse" style={{ animationDelay: "1s", filter: 'blur(100px)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.025),transparent_60%)]" />
      </motion.div>

      {/* Hero Container */}
      <div className="hero-container">
        {/* Left Side - IconCloud */}
        <div className="hero-1">
          <IconCloud />
        </div>

        {/* Right Side - Hero Text */}
        <div className="hero-2">
          <div>
            <div className="pf-info">
              <div className="malay-img-cont">
                <img
                  src="https://github.com/idang7.png"
                  alt="Idan Gurevich"
                  className="malay-img"
                />
              </div>
              <div>
                <span className="country-badge">📍 Toronto, Canada</span>
                <p className="name">
                  Hi, I'm Idan
                  <span
                    className="inline-block text-2xl ml-2"
                    style={{ animation: "wave 2.5s ease-in-out infinite" }}
                  >
                    👋
                  </span>
                </p>
              </div>
            </div>
            <div>
              <h1 className="hero-title">BACKEND</h1>
              <h1 className="hero-title">
                <span className="shine-txt">ENGINEER</span> &
              </h1>
              <h1 className="hero-title">
                <span className="highlight-txt">FIRMWARE</span> WHISPERER
              </h1>
              <p className="text-sm text-muted-foreground font-mono mt-2">i like hardware :)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Section */}
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center space-y-8 mb-12">
          <TerminalQuickActions onTerminalStateChange={handleTerminalStateChange} isTerminalOpen={isTerminalOpen} />
        </motion.div>

        {/* Terminal Interface */}
        <div className="w-full">
          <TerminalInterface onStateChange={handleTerminalStateChange} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
