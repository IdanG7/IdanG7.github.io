import { Code2, Cpu, GitBranch, TestTube, Terminal, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const skills = [
  {
    icon: Code2,
    title: "C++ Development",
    description: "Modern C++ (11/14/17/20) for high-performance backend systems",
    metric: "Expert"
  },
  {
    icon: Cpu,
    title: "Firmware Engineering",
    description: "Low-level system programming and embedded systems development",
    metric: "Advanced"
  },
  {
    icon: TestTube,
    title: "Test Automation",
    description: "Comprehensive testing frameworks and automated validation suites",
    metric: "Expert"
  },
  {
    icon: GitBranch,
    title: "DevOps",
    description: "CI/CD pipelines, build systems, and deployment automation",
    metric: "Advanced"
  },
  {
    icon: Terminal,
    title: "Host Systems",
    description: "System-level programming and host-device communication",
    metric: "Expert"
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimization, profiling, and system-level performance tuning",
    metric: "Advanced"
  }
];

const Skills = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-background relative scroll-mt-24" ref={ref}>
      {/* Hex address decoration */}
      <div className="absolute top-8 right-4 text-xs font-mono text-muted-foreground/30">
        [0x0002]
      </div>
      
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-16">
          <Terminal className="w-6 h-6 text-primary" />
          <h2
            className={`text-4xl sm:text-5xl font-light tracking-tight text-center font-mono transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-primary">./</span>skills <span className="text-muted-foreground">--list</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.title}
              className={`group p-6 rounded-xl bg-card hover:bg-card/80 border border-primary/20 hover:border-primary/50 shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <skill.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-all duration-300" />
                <span className="text-xs font-mono text-muted-foreground bg-primary/10 px-2 py-1 rounded">
                  {skill.metric}
                </span>
              </div>
              
              <h3 className="text-lg font-medium mb-2 font-mono">{skill.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {skill.description}
              </p>
              
              {/* Progress bar decoration */}
              <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 group-hover:w-full"
                  style={{ 
                    width: skill.metric === "Expert" ? "95%" : "85%",
                    transitionDelay: isVisible ? `${(index * 100) + 300}ms` : '0ms'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Tech stack list */}
        <div 
          className={`mt-12 p-6 rounded-xl bg-card border border-primary/20 font-mono text-sm transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center gap-2 text-primary mb-3">
            <Terminal className="w-4 h-4" />
            <span>$ cat tech_stack.txt</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-2 text-muted-foreground">
            <div><span className="text-primary">→</span> C++, C#, Python, Java, Bash</div>
            <div><span className="text-primary">→</span> CMake, Make, GCC/Clang</div>
            <div><span className="text-primary">→</span> GTest, Catch2, pytest</div>
            <div><span className="text-primary">→</span> Jenkins, GitLab CI, GitHub Actions</div>
            <div><span className="text-primary">→</span> Docker, Kubernetes, AWS</div>
            <div><span className="text-primary">→</span> Git, SVN, JIRA, Monday</div>
            <div><span className="text-primary">→</span> OpenCV, Eigen, ImGui</div>
            <div><span className="text-primary">→</span> PostgreSQL, Redis, NATS</div>
            <div><span className="text-primary">→</span> FastAPI, Groovy Scripts</div>
            <div><span className="text-primary">→</span> Linux, Embedded Linux, Windows</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
