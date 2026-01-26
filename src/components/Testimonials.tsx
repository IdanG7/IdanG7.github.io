"use client";

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

export default function Testimonials() {
  return (
    <section className="relative w-full z-30 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className="text-center mb-12 md:mb-16 px-4"
      >
        <p className="mb-3 text-xs font-outfit tracking-widest text-neutral-500 dark:text-white/70 uppercase md:text-sm">
          WHAT OTHERS SAY
        </p>
        <h2 className="font-medium tracking-tight text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
          <span className="text-neutral-900 dark:text-white font-semibold font-outfit">
            The Voices{" "}
          </span>
          <span className="text-colorfull animate-gradient-x font-nyght tracking-wide">
            Behind
          </span>
        </h2>
      </motion.div>
      <div className="h-[700px]" />
    </section>
  );
}
