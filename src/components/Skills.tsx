import { Code2, Cpu, GitBranch, Terminal, Database, Package, Cloud, Layers } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";

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

        {/* Skills Grid */}
        <div className="grid gap-6">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: categoryIndex * 0.05, duration: 0.4 }}
                className="group"
              >
                <div
                  className="relative bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-all duration-300"
                  style={{
                    borderLeftColor: category.color,
                    borderLeftWidth: '4px'
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="p-2 rounded-lg"
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

                  {/* Skills list */}
                  <ul className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.li
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: categoryIndex * 0.05 + skillIndex * 0.02,
                          duration: 0.3
                        }}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: `${category.color}20`,
                          transition: { duration: 0.2 }
                        }}
                        className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg text-sm font-mono hover:shadow-md transition-all duration-200 cursor-default"
                      >
                        {skill.icon && (
                          <img
                            src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.icon}/${skill.icon}-original.svg`}
                            alt={skill.name}
                            className="w-4 h-4"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        )}
                        <span className="text-foreground">{skill.name}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
