import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Terminal, FileText, Briefcase, Award, Clock, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { memo } from "react";

const About = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  const highlights = [
    { icon: Clock, label: "Experience", value: "2+ Years" },
    { icon: Briefcase, label: "Focus", value: "Backend & Firmware" },
    { icon: Award, label: "Expertise", value: "C++ & DevOps" },
  ];

  const education = [
    {
      degree: "Bachelor of Computer Science (Honors)",
      institution: "Toronto Metropolitan University",
      location: "Toronto, Ontario",
      period: "2023 - 2027",
      status: "In Progress",
    },
    {
      degree: "High School Diploma",
      institution: "Stephen Lewis Secondary School",
      location: "Vaughan, Ontario",
      period: "2019 - 2022",
      status: "Completed",
    },
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

          {/* About Text and Education Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* About Text - Takes 2 columns on large screens */}
            <div className="lg:col-span-2 space-y-4 text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-6">
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

            {/* Education Timeline - Takes 1 column on large screens */}
            <div className="relative">
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-mono font-light text-foreground">Education</h3>
              </div>

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                    className="relative pl-6 border-l-2 border-primary/30 hover:border-primary/60 transition-colors duration-300 pb-6 last:pb-0 group"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary/20 border-2 border-primary group-hover:scale-125 group-hover:bg-primary/40 transition-all duration-300" />

                    <div className="space-y-2">
                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <div className="font-mono text-sm text-primary font-semibold">
                          {edu.degree}
                        </div>
                        {edu.status && (
                          <span className={`text-xs font-mono px-2 py-1 rounded-md border ${edu.status === "In Progress"
                            ? "bg-primary/10 text-primary border-primary/20"
                            : "bg-green-500/10 text-green-500 border-green-500/20"
                            }`}>
                            {edu.status}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground font-mono">
                        {edu.institution}
                      </div>
                      {edu.location && (
                        <div className="text-xs text-muted-foreground/60 font-mono">
                          📍 {edu.location}
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground/60 font-mono flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {edu.period}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Inline Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm font-mono"
          >
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-2 group">
                  <Icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-primary font-bold">{item.value}</span>
                  <span className="text-muted-foreground">{item.label}</span>
                  {index < highlights.length - 1 && <span className="text-primary/30 ml-2">|</span>}
                </div>
              );
            })}
          </motion.div>

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

export default memo(About);
