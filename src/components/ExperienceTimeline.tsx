"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";

type Experience = {
  dateRange: string;
  company: string;
  location: string;
  type: string;
  role: string;
  achievements: string[];
  technologies: string[];
};

const experiences: Experience[] = [
  {
    dateRange: "MAY 2026 - SEP 2027",
    company: "AMD (Advanced Micro Devices)",
    location: "Markham, ON",
    type: "Internship",
    role: "Embedded Firmware Engineer Intern",
    achievements: [
      "Incoming internship focused on <strong>embedded firmware</strong>, real-time systems, and hardware validation.",
    ],
    technologies: ["Embedded Systems", "Firmware", "C", "C++"],
  },
  {
    dateRange: "JAN 2025 - PRESENT",
    company: "WDI (Wise Device Inc.)",
    location: "Vaughan, ON",
    type: "Full-time",
    role: "Junior Software Developer",
    achievements: [
      "Delivered backend and embedded-facing features in <strong>C++</strong> for hardware-adjacent systems, improving reliability and test coverage.",
      "Automated validation workflows to replace manual QA, accelerating releases and tightening quality gates.",
      "Built reusable integration layers and APIs with strong error handling to stabilize device communication.",
      "Owned CI/CD health across <strong>70+ Jenkins projects</strong>, streamlining integrations and reducing avoidable build issues by <strong>30%</strong>.",
    ],
    technologies: ["C++", "Jenkins", "CI/CD", "Automation", "APIs"],
  },
  {
    dateRange: "MAY 2024 - JAN 2025",
    company: "WDI (Wise Device Inc.)",
    location: "Vaughan, ON",
    type: "Co-op",
    role: "Software Co-op Student",
    achievements: [
      "Supported multi-team CI/CD infrastructure, resolving pipeline failures to keep delivery reliable.",
      "Collaborated with QA to triage and resolve <strong>100+ defects</strong>, improving release stability.",
      "Automated regression testing to cut manual effort by <strong>20%</strong> and improve repeatability.",
    ],
    technologies: ["Jenkins", "Automation", "QA", "CI/CD"],
  },
];

const MapPinIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const BriefcaseIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
);

export default function ExperienceTimeline() {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 50%"],
  });
  const progress = useMotionValue(0);
  const progressSpring = useSpring(progress, { damping: 30, stiffness: 100, mass: 0.5 });
  const progressScale = useTransform(progressSpring, [0, 100], [0, 1]);
  const progressTop = useTransform(progressSpring, (value) => `${value}%`);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      progress.set(value * 100);
    });
    return () => unsubscribe();
  }, [scrollYProgress, progress]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-10 mt-16 sm:mt-20 pb-16 sm:pb-20">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-2 text-3xl sm:text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl text-center mb-4 md:mb-0 max-w-lg mx-auto text-balance shadow-glow dark:text-shadow-glow"
      >
        <p className="mb-3 text-xs tracking-widest text-neutral-500 dark:text-white/70 uppercase md:text-sm font-outfit font-semibold">
          The Experience
        </p>
        <span className="text-neutral-900 dark:text-white">
          <span className="font-outfit font-bold">Experience That Brings </span>
          <span className="text-colorfull animate-gradient-x font-nyght italic font-bold tracking-wide">
            Ideas to Life
          </span>
        </span>
      </motion.h2>

      <div
        ref={timelineRef}
        className="relative mx-auto mt-12 sm:mt-20 mb-12 sm:mb-20 max-w-7xl"
      >
        <div className="flex w-full flex-col max-md:ps-12 sm:max-md:ps-16 md:gap-10">
          {experiences.map((experience, index) => (
            <motion.article
              key={`${experience.company}-${index}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 * index, ease: "easeOut" }}
              className="grid grid-cols-1 gap-6 py-12 first:pt-0 last:pb-0 md:grid-cols-[2fr_1fr_4fr]"
            >
              <div className="w-full lg:max-w-sm">
                <div className="flex flex-col items-start gap-y-3 text-sm font-light">
                  <time
                    className="text-neutral-500 dark:text-neutral-400 text-xs font-semibold tracking-wide uppercase font-outfit"
                    dateTime={experience.dateRange}
                  >
                    {experience.dateRange}
                  </time>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white md:text-2xl">
                      <span className="text-colorfull animate-gradient-x font-nyght italic font-bold tracking-wide">
                        {experience.company}
                      </span>
                    </h2>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                      <MapPinIcon className="h-3.5 w-3.5 flex-shrink-0" />
                      <span className="text-sm font-outfit font-semibold">
                        {experience.location}
                      </span>
                    </div>
                    <div className="text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                      <BriefcaseIcon className="h-3.5 w-3.5 flex-shrink-0" />
                      <span className="text-sm font-medium font-outfit font-semibold">
                        {experience.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden md:block" />

              <div className="relative w-full">
                <div className="flex flex-col gap-y-6 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-sm font-outfit">
                  <header>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 md:text-2xl font-outfit font-semibold">
                      {experience.role}
                    </h3>
                  </header>
                  <section aria-label="Key achievements">
                    <ul className="flex list-none flex-col gap-y-4 text-neutral-700 dark:text-neutral-300/90 font-outfit">
                      {experience.achievements.map((item, itemIndex) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.1 * itemIndex }}
                          className="leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: item }}
                        />
                      ))}
                    </ul>
                  </section>
                  <section aria-label="Technologies used">
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.05 * techIndex }}
                          className="rounded-xl border border-zinc-200 dark:border-white/[0.14] bg-zinc-100 dark:bg-zinc-900 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-400"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="absolute top-0 h-full w-8 max-md:start-2 sm:max-md:start-4 md:left-[calc(32%_-_1rem)] z-10">
          <div className="relative h-full w-full">
            <div className="absolute top-0 bottom-0 left-1/2 w-1.5 -translate-x-1/2 rounded-full bg-neutral-200 dark:bg-neutral-800 shadow-[inset_0_2px_1.5px_rgba(165,174,184,0.62)] dark:shadow-[inset_0_2px_1.5px_rgba(165,174,184,0.62)]">
              <motion.div
                className="absolute inset-0 w-full origin-top rounded-full bg-gradient-to-t from-red-600 from-[0%] via-red-500 via-[10%] to-transparent"
                style={{ scaleY: progressScale }}
              />
            </div>
            <motion.div
              className="absolute -right-0.5 z-10 flex"
              style={{ top: progressTop, height: "36px", y: "-50%" }}
            >
              <motion.div
                className="relative h-8 w-8 sm:h-9 sm:w-9 overflow-hidden rounded-full border-2 border-white dark:border-neutral-900 bg-white dark:bg-neutral-900 shadow-md"
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
