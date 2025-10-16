import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Terminal, FileText, Briefcase, Award, Clock } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  const highlights = [
    { icon: Clock, label: "Experience", value: "2+ Years" },
    { icon: Briefcase, label: "Focus", value: "Backend & Firmware" },
    { icon: Award, label: "Expertise", value: "C++ & DevOps" },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative scroll-mt-24" ref={ref}>
      {/* Hex address decoration */}
      <div className="absolute top-8 left-4 text-xs font-mono text-muted-foreground/30">
        [0x0001]
      </div>

      <div className="max-w-4xl mx-auto">
        <div
          className={`space-y-8 transition-all duration-1000 ${isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
            }`}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Terminal className="w-6 h-6 text-primary" />
            <h2 className="text-4xl sm:text-5xl font-light tracking-tight font-mono">
              <span className="text-primary">./</span>about
            </h2>
          </div>

          {/* About Text */}
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

          {/* Highlights */}
          <div className="grid grid-cols-3 gap-4 mt-12">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="bg-card border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-all duration-300 text-center group"
                >
                  <Icon className="w-6 h-6 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-2xl font-bold font-mono text-primary mb-1">{item.value}</div>
                  <div className="text-xs font-mono text-muted-foreground">{item.label}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Resume Button */}
          <div className="mt-12 flex justify-center">
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-br from-primary to-accent rounded-lg font-mono font-bold text-background shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <FileText className="w-5 h-5 relative z-10" />
              <span className="relative z-10">View Resume</span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
