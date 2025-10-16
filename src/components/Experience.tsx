import { Briefcase, Calendar, MapPin, Code, Rocket, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Experience = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  const experiences = [
    {
      company: "WDI Wise Device Inc.",
      location: "Vaughan, ON",
      title: "Junior Software Developer",
      period: "Jan 2025 – Present",
      icon: Rocket,
      description: "Administering 70+ Jenkins projects and engineering automated CI/CD integrations that reduced errors by 30%. Developing C++ components for NIR imaging systems with real-time processing algorithms. Building API-driven testing tools and mentoring junior developers."
    },
    {
      company: "WDI Wise Device Inc.",
      location: "Vaughan, ON",
      title: "Software Co-op Student",
      period: "May 2024 – Jan 2025",
      icon: Code,
      description: "Supporting large-scale Jenkins infrastructure and developing Groovy automation scripts. Collaborated with QA to resolve 100+ issues and strengthen release delivery timelines."
    }
  ];

  return (
    <section
      id="experience"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 relative scroll-mt-24"
    >
      {/* Hex address decoration */}
      <div className="absolute top-8 left-4 text-xs font-mono text-muted-foreground/30">
        [0x0002]
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`flex items-center gap-3 mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <Briefcase className="w-6 h-6 text-primary" />
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight font-mono">
            <span className="text-primary">./</span>experience
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

          {/* Experience items */}
          <div className="space-y-16">
            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col gap-0`}
                >
                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${isLeft ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 30 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: false, margin: "-50px", amount: 0.3 }}
                      transition={{
                        delay: index * 0.1,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }}
                      whileHover={{ y: -8, scale: 1.03 }}
                      className="group"
                    >
                      <div className="relative bg-card border-2 border-primary/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:border-primary/40 transition-all duration-300 overflow-hidden">
                        {/* Decorative gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Floating shapes */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />

                        <div className="relative z-10">
                          {/* Period badge */}
                          <div className={`inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 rounded-full mb-3 ${isLeft ? 'md:ml-auto' : ''}`}>
                            <Calendar className="w-3 h-3 text-primary" />
                            <span className="text-xs font-mono text-primary font-bold">{exp.period}</span>
                          </div>

                          {/* Title */}
                          <h3 className="text-2xl font-bold font-mono mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                            {exp.title}
                          </h3>

                          {/* Company & Location */}
                          <div className={`flex flex-wrap items-center gap-3 mb-4 text-sm font-mono ${isLeft ? 'md:justify-end' : 'md:justify-start'} justify-start`}>
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <Briefcase className="w-3.5 h-3.5 text-primary" />
                              <span>{exp.company}</span>
                            </div>
                            <span className="text-muted-foreground/50">•</span>
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <MapPin className="w-3.5 h-3.5 text-primary" />
                              <span>{exp.location}</span>
                            </div>
                          </div>

                          {/* Description paragraph */}
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Center icon - positioned absolutely over the timeline */}
                  <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-20 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -180, opacity: 0 }}
                      whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                      viewport={{ once: false, margin: "-50px", amount: 0.5 }}
                      transition={{
                        type: "spring",
                        duration: 0.8,
                        delay: index * 0.1 + 0.2,
                        stiffness: 200,
                        damping: 15
                      }}
                      className="relative"
                    >
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-pulse" />

                      {/* Icon container */}
                      <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl border-4 border-background">
                        <Icon className="w-8 h-8 text-background" />
                      </div>

                      {/* Orbiting particles */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0"
                      >
                        <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary/60 rounded-full -translate-x-1/2 shadow-lg" />
                      </motion.div>
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0"
                      >
                        <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-accent/60 rounded-full -translate-x-1/2 shadow-lg" />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block w-5/12" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
