"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/idangurevich/",
    icon: (
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        height="20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-1"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/IdanG7",
    icon: (
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        height="20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-1"
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:Idan.gurevich@gmail.com",
    icon: (
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        height="20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-1"
      >
        <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2" />
        <path d="m22 6-10 7L2 6" />
      </svg>
    ),
  },
];

type AboutVariant = "home" | "about";

const aboutCopy: Record<
  AboutVariant,
  {
    kicker: string;
    headline: {
      leading: string;
      highlight: string;
    };
    paragraphs: string[];
  }
> = {
  home: {
    kicker: "A QUICK GLANCE",
    headline: {
      leading: "Engineering reliable ",
      highlight: "systems",
    },
    paragraphs: [
      "Backend engineer specializing in C++ development with deep expertise in firmware engineering, host systems, and DevOps automation. I build robust, high-performance solutions that power critical infrastructure.",
      "My work focuses on automated testing frameworks, firmware validation, and continuous integration pipelines. I transform complex system requirements into reliable, maintainable code that scales.",
      "Passionate about system-level programming, test automation, and building tools that make engineering teams more efficient.",
    ],
  },
  about: {
    kicker: "A LITTLE ABOUT ME",
    headline: {
      leading: "Nice to meet you. I'm ",
      highlight: "Idan",
    },
    paragraphs: [
      "Backend engineer specializing in C++ development with deep expertise in firmware engineering, host systems, and DevOps automation. I build robust, high-performance solutions that power critical infrastructure.",
      "My work focuses on automated testing frameworks, firmware validation, and continuous integration pipelines. I transform complex system requirements into reliable, maintainable code that scales.",
      "Passionate about system-level programming, test automation, and building tools that make engineering teams more efficient.",
    ],
  },
};

export default function About({ variant = "home" }: { variant?: AboutVariant }) {
  const content = aboutCopy[variant];

  return (
    <section className="relative w-full z-30 mt-12 md:mt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-col gap-8 lg:gap-12 xl:gap-16"
        >
          <div className="w-full">
            <motion.h2
              variants={itemVariants}
              className="relative z-2 mb-6 md:mb-8 lg:mb-12 font-medium tracking-tight text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-center lg:text-left text-balance"
              style={{
                textShadow:
                  "rgba(255, 255, 255, 0.05) 0px 4px 8px, rgba(255, 255, 255, 0.25) 0px 8px 30px",
              }}
            >
              <p className="mb-2 md:mb-3 text-xs font-outfit tracking-widest text-neutral-500 dark:text-white/70 uppercase md:text-sm font-semibold">
                {content.kicker}
              </p>
              <span>
                <span className="text-neutral-900 dark:text-white font-outfit font-semibold">
                  {content.headline.leading}
                </span>
                <span className="text-colorfull animate-gradient-x font-nyght tracking-wide">
                  {content.headline.highlight}
                </span>
              </span>
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="relative z-5 flex flex-col gap-y-4 md:gap-y-6 lg:gap-y-6 xl:gap-y-8 text-center text-sm sm:text-base md:text-lg lg:text-base xl:text-lg font-light tracking-wider text-neutral-600 dark:text-white/70 lg:text-left max-w-none lg:max-w-full xl:max-w-[550px] font-outfit leading-relaxed"
            >
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              <div className="flex gap-3 justify-center lg:justify-start -mt-2 md:-mt-4">
                {socialLinks.map((social) => (
                  <button key={social.name} data-state="closed" data-slot="tooltip-trigger">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 dark:text-neutral-300 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
                    >
                      <span className="sr-only">{social.name}</span>
                      {social.icon}
                    </a>
                  </button>
                ))}
              </div>

              <Link
                href="/about"
                className="group flex w-fit mx-auto lg:mx-0 font-outfit items-center justify-center gap-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 mt-6 md:mt-8 lg:mt-10 lg:justify-start"
              >
                Dive in deeper
                <div className="size-6 overflow-hidden rounded-full border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/5 duration-500 group-hover:bg-neutral-200 dark:group-hover:bg-white/10">
                  <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                    <span className="flex size-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-right m-auto size-[14px]"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                    <span className="flex size-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-right m-auto size-[14px]"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
