import { Code2, Cpu, GitBranch, Terminal, Database, Package, Cloud, Layers } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";
import { memo } from "react";

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    color: "#FF6F61",
    skills: [
      { name: "C++", icon: "cplusplus" },
      { name: "C", icon: "c" },
      { name: "Python", icon: "python" },
      { name: "C#", icon: "csharp" },
      { name: "Java", icon: "java" },
      { name: "Bash", icon: "bash" },
      { name: "Groovy", icon: "groovy" }
    ]
  },
  {
    title: "DevOps & Cloud",
    icon: GitBranch,
    color: "#FF8C42",
    skills: [
      { name: "Jenkins", icon: "jenkins" },
      { name: "Docker", icon: "docker" },
      { name: "Git", icon: "git" },
      { name: "GitHub Actions", icon: "github" },
      { name: "SVN", icon: "subversion" },
      { name: "AWS", icon: "amazonwebservices" },
      { name: "Kubernetes", icon: "kubernetes" }
    ]
  },
  {
    title: "Development Tools",
    icon: Package,
    color: "#9C27B0",
    skills: [
      { name: "Visual Studio", icon: "visualstudio" },
      { name: "VS Code", icon: "vscode" },
      { name: "IntelliJ", icon: "intellij" },
      { name: "PyCharm", icon: "pycharm" },
      { name: "AutoIt", icon: "" }
    ]
  },
  {
    title: "Databases & Backend",
    icon: Database,
    color: "#4CAF50",
    skills: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Redis", icon: "redis" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "NATS", icon: "" }
    ]
  },
  {
    title: "Libraries & Frameworks",
    icon: Cpu,
    color: "#6A5ACD",
    skills: [
      { name: "OpenCV", icon: "opencv" },
      { name: "PhysX", icon: "" },
      { name: "YAML", icon: "yaml" },
      { name: "OpenTelemetry", icon: "" }
    ]
  },
  {
    title: "Tools & Systems",
    icon: Cloud,
    color: "#00BCD4",
    skills: [
      { name: "Linux", icon: "linux" },
      { name: "Windows", icon: "windows11" },
      { name: "JIRA", icon: "jira" },
      { name: "Monday", icon: "" },
      { name: "Prometheus", icon: "prometheus" },
      { name: "Grafana", icon: "grafana" }
    ]
  }
];

const Skills = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative scroll-mt-24" ref={ref}>
      {/* Hex address decoration */}
      <div className="absolute top-8 right-4 text-xs font-mono text-muted-foreground/30">
        [0x0003]
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-16">
          <Layers className="w-6 h-6 text-primary" />
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight font-mono">
            <span className="text-primary">./</span>skills
          </h2>
        </div>

        {/* Clean Modern Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
                className="group"
              >
                <div
                  className="relative h-full bg-card/80 border-2 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                  style={{
                    borderColor: `${category.color}40`,
                    borderLeftWidth: '4px',
                    borderLeftColor: category.color,
                    willChange: 'transform'
                  }}
                >
                  {/* Subtle accent glow in corner */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500" style={{
                    backgroundColor: category.color,
                    willChange: 'opacity'
                  }} />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="p-2.5 rounded-xl"
                        style={{
                          backgroundColor: `${category.color}20`,
                          color: category.color
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3
                        className="text-xl font-bold font-mono"
                        style={{ color: category.color }}
                      >
                        {category.title}
                      </h3>
                    </div>

                    {/* Skills badges */}
                    <div className="flex flex-wrap gap-2.5">
                      {category.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="group/badge skill-badge"
                        >
                          <div
                            className="flex items-center gap-2 px-3.5 py-2 bg-card/60 border border-primary/20 rounded-lg text-sm font-mono transition-all duration-200 cursor-default hover:border-primary/40 hover:scale-105 hover:-translate-y-0.5"
                            style={{
                              background: `linear-gradient(135deg, ${category.color}10, transparent)`,
                              willChange: 'transform'
                            }}
                          >
                            {skill.icon && (
                              <img
                                src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.icon}/${skill.icon}-original.svg`}
                                alt={skill.name}
                                className="w-4 h-4 transition-transform duration-200 group-hover/badge:scale-110"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            )}
                            <span className="text-foreground font-medium">{skill.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default memo(Skills);
