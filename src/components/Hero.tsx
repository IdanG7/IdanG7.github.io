"use client";

import { motion } from "framer-motion";
import HeroVideoBackground from "./HeroVideoBackground";
import GlitchText from "./GlitchText";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

export default function Hero() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative h-[100dvh] w-full bg-neutral-50 dark:bg-black overflow-hidden flex flex-col justify-between"
      style={{ padding: "6rem 3rem 3rem 3rem" }}
    >
      {/* Video Background */}
      <HeroVideoBackground />

      <div className="w-full" />

      <div className="flex flex-col items-center justify-center w-full z-10">
        <motion.div
          variants={itemVariants}
          className="name-container gsap-hero-title select-none will-change-transform"
        >
          <h1 className="text-[16vw] font-black leading-none text-neutral-900 dark:text-white tracking-[-0.05em] uppercase dark:drop-shadow-2xl">
            <GlitchText text="Idan" />
          </h1>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8 text-center space-y-4">
          <p className="tagline-part gsap-hero-tagline text-sm md:text-xl tracking-[0.4em] uppercase text-neutral-500 dark:text-white/50">
            Backend engineer &amp;
          </p>
          <p className="tagline-part gsap-hero-tagline font-serif text-4xl md:text-7xl italic text-neutral-900 dark:text-white lowercase leading-tight dark:drop-shadow-lg">
            firmware whisperer.
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={itemVariants}
        className="w-full flex justify-between items-end z-30 pointer-events-none"
        style={{ marginBottom: "1rem" }}
      >
        <div className="flex flex-col items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-map-pin w-5 h-5 text-green-500 dark:text-green-400"
            aria-hidden="true"
          >
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <div
            className="text-xs md:text-sm tracking-wider uppercase text-center"
            style={{ fontFamily: "var(--font-clash), sans-serif" }}
          >
            <span className="text-neutral-900 dark:text-white font-medium">BASED IN Toronto,</span>
            <br />
            <span className="text-neutral-500 dark:text-white/50">CANADA</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-layers w-5 h-5 text-blue-500 dark:text-blue-400"
            aria-hidden="true"
          >
            <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
            <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
            <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
          </svg>
          <div
            className="text-xs md:text-sm tracking-wider uppercase text-center"
            style={{ fontFamily: "var(--font-clash), sans-serif" }}
          >
            <span className="text-neutral-900 dark:text-white font-medium">BACKEND ENGINEER,</span>
            <br />
            <span className="text-neutral-500 dark:text-white/50">FIRMWARE &amp; DEVOPS</span>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
