import { CheckCircle2, ExternalLink, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const projects = [
  {
    title: "Firmware Test Framework",
    description: "Comprehensive automated testing suite for embedded firmware validation with 99%+ coverage and real-time reporting.",
    tags: ["C++", "Testing", "Firmware"],
    status: "Production",
    metrics: { tests: "2.5K+", coverage: "99.2%", uptime: "99.9%" }
  },
  {
    title: "Host-Device Communication Layer",
    description: "High-performance host system interface enabling seamless firmware-host communication with low latency.",
    tags: ["C++", "Systems", "Protocol"],
    status: "Production",
    metrics: { latency: "<1ms", throughput: "10GB/s", reliability: "99.8%" }
  },
  {
    title: "CI/CD Pipeline Automation",
    description: "End-to-end DevOps pipeline automating builds, tests, and deployments across multiple environments.",
    tags: ["DevOps", "Automation", "CI/CD"],
    status: "Active",
    metrics: { builds: "500+/day", success: "99.5%", time: "8min" }
  },
  {
    title: "Performance Profiling Tools",
    description: "Custom profiling and optimization toolkit for identifying bottlenecks and improving system performance.",
    tags: ["C++", "Optimization", "Tools"],
    status: "Active",
    metrics: { speedup: "40%", memory: "-25%", efficiency: "+35%" }
  }
];

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative scroll-mt-24" ref={ref}>
      {/* Hex address decoration */}
      <div className="absolute top-8 left-4 text-xs font-mono text-muted-foreground/30">
        [0x0003]
      </div>
      
      <div className="max-w-6xl mx-auto">
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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
          {projects.map((project, index) => (
            <article
              key={project.title}
              className={`group relative overflow-hidden rounded-xl bg-card border border-primary/20 hover:border-primary/50 shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] transition-all duration-700 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
              }}
            >
              {/* Status indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-mono text-primary">{project.status}</span>
              </div>
              
              {/* Grid background */}
              <div className="aspect-video bg-gradient-to-br from-primary/10 via-accent/5 to-muted/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.05)_1px,transparent_1px)] bg-[size:20px_20px] group-hover:bg-[size:24px_24px] transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/10 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              
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
                <div className="grid grid-cols-3 gap-3 pt-2">
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
                >
                  View Details
                  <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
