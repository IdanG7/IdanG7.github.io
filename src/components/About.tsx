import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Terminal } from "lucide-react";

const About = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative scroll-mt-24" ref={ref}>
      {/* Hex address decoration */}
      <div className="absolute top-8 left-4 text-xs font-mono text-muted-foreground/30">
        [0x0001]
      </div>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div 
            className={`space-y-6 transition-all duration-1000 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <Terminal className="w-6 h-6 text-primary" />
              <h2 className="text-4xl sm:text-5xl font-light tracking-tight font-mono">
                <span className="text-primary">./</span>about
              </h2>
            </div>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-6">
              <p>
                Backend engineer specializing in C++ development with deep expertise in 
                firmware engineering, host systems, and DevOps automation. I build robust, 
                high-performance solutions that power critical infrastructure.
              </p>
              <p>
                My work focuses on automated testing frameworks, firmware validation, and 
                continuous integration pipelines. I transform complex system requirements 
                into reliable, maintainable code that scales.
              </p>
              <p>
                Passionate about system-level programming, test automation, and building 
                tools that make engineering teams more efficient.
              </p>
            </div>
            
            {/* Terminal-style stats */}
            <div className="mt-8 p-4 rounded-lg bg-card border border-primary/20 font-mono text-sm">
              <div className="flex items-center gap-2 text-primary mb-2">
                <span>$</span>
                <span>cat stats.log</span>
              </div>
              <div className="space-y-1 text-muted-foreground">
                <div className="flex justify-between">
                  <span>→ Test Coverage:</span>
                  <span className="text-primary">98.5%</span>
                </div>
                <div className="flex justify-between">
                  <span>→ Build Success Rate:</span>
                  <span className="text-primary">99.2%</span>
                </div>
                <div className="flex justify-between">
                  <span>→ Lines of Code:</span>
                  <span className="text-primary">500K+</span>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className={`relative transition-all duration-1000 delay-200 ${
              isVisible 
                ? 'opacity-100 translate-x-0 scale-100' 
                : 'opacity-0 translate-x-12 scale-95'
            }`}
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-muted/50 shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-105 relative overflow-hidden">
              {/* Grid overlay for tech aesthetic */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
              
              {/* Animated pulse effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/20 to-accent/0 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
