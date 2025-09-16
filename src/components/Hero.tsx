import { useState } from "react";
import { ArrowDown, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import TypewriterText from "./TypewriterText";
import TerminalInterface from "./TerminalInterface";
import TerminalQuickActions from "./TerminalQuickActions";

interface HeroProps {
  onTerminalStateChange: (isMaximized: boolean) => void;
}

const Hero = ({ onTerminalStateChange }: HeroProps) => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);

  const handleTerminalStateChange = (isOpen: boolean) => {
    setIsTerminalOpen(isOpen);
    onTerminalStateChange(isOpen);
  };
  return (
    <section id="hero-section" className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden py-12 transition-all duration-700">
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 -z-10"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.03),transparent_70%)]" />
      </motion.div>
      
      <div className="max-w-5xl w-full">
        <motion.div 
          className="text-center space-y-8"
        >
          <div className="space-y-6">
            {/* Online Status Indicator */}
            <div className="flex items-center justify-center gap-2 opacity-0 animate-fade-in">
              <div className="relative">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
              </div>
              <span className="text-xs text-muted-foreground font-mono tracking-wider">ONLINE</span>
            </div>
            
            {/* Terminal prompt style */}
            <div className="inline-flex items-center gap-2 text-muted-foreground text-sm sm:text-base mb-4 font-mono opacity-0 animate-fade-in animate-delay-100">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-primary">~</span>
              <span className="text-muted-foreground">$</span>
              <TypewriterText text="whoami" speed={150} delay={300} showCursor={false} />
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight font-mono opacity-0 animate-fade-in animate-delay-200">
              <TypewriterText 
                text="Idan Gurevich" 
                speed={120} 
                delay={1200}
                showCursor={true}
              />
            </h1>
            
            <div className="text-xl sm:text-2xl md:text-3xl font-light max-w-3xl mx-auto opacity-0 animate-fade-in animate-delay-300">
              <span className="text-primary font-mono">→ </span>
              <TypewriterText 
                text="Backend Engineer (Firmware / Host / Dev-ops)" 
                speed={50} 
                delay={3000}
                showCursor={false}
              />
            </div>
            
            {/* Memory address style decoration */}
            <div className="flex justify-center gap-4 text-xs font-mono text-muted-foreground/50 opacity-0 animate-fade-in animate-delay-400">
              <span>0x2A4B</span>
              <span className="text-primary">•</span>
              <span>0x7F3E</span>
              <span className="text-primary">•</span>
              <span>0x9C1D</span>
            </div>
          </div>
          
          <TerminalQuickActions onTerminalStateChange={handleTerminalStateChange} isTerminalOpen={isTerminalOpen} />
          
          <div className="pt-16 opacity-0 animate-fade-in animate-delay-500">
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-muted-foreground hover:text-primary transition-colors group"
              aria-label="Scroll to about section"
            >
              <ArrowDown className="w-6 h-6 animate-bounce group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Terminal Interface */}
      <div className="w-full max-w-5xl mt-12">
        <TerminalInterface onStateChange={handleTerminalStateChange} />
      </div>
    </section>
  );
};

export default Hero;
