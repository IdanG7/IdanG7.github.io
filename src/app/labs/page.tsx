"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const experiments = [
  {
    name: "Magnetic Blobs",
    description:
      "An interactive WebGL simulation featuring magnetic blobs with smooth, heavy motion and subtle cursor interaction.",
    category: "Motion",
    status: "active",
    gradient: "from-purple-500/20 to-pink-500/20",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      </svg>
    ),
  },
  {
    name: "Animated List",
    description:
      "A beautifully animated list component with smooth enter/exit transitions, staggered animations, and gesture-based interactions.",
    category: "UI",
    status: "active",
    gradient: "from-blue-500/20 to-cyan-500/20",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 6h16M4 10h16M4 14h16M4 18h16"
        />
      </svg>
    ),
  },
  {
    name: "Galaxy",
    description:
      "An immersive 3D visualization featuring interactive star systems, nebulae, and cosmic particles. Navigate through space.",
    category: "3D",
    status: "coming-soon",
    gradient: "from-indigo-500/20 to-violet-500/20",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ),
  },
];

const categories = ["All", "UI", "Motion", "3D", "Performance", "WIP"];

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

export default function LabsPage() {
  return (
    <>
      <Navigation />
      <main className="pt-32 pb-24">
        <div className="container max-w-5xl">
          {/* Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mb-16 text-center"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6"
            >
              <svg
                className="w-5 h-5 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
              <span className="text-sm text-purple-300">Experimental</span>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Labs
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg text-white/60 max-w-2xl mx-auto"
            >
              An experimental playground where ideas come alive. These are
              experiments, prototypes, and fun projects I&apos;m working on.
            </motion.p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  category === "All"
                    ? "bg-white text-black"
                    : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center gap-8 mb-12 text-center"
          >
            <div>
              <div className="text-3xl font-bold text-white">
                {experiments.filter((e) => e.status === "active").length}
              </div>
              <div className="text-sm text-white/50">Active Experiments</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                {experiments.filter((e) => e.status === "coming-soon").length}
              </div>
              <div className="text-sm text-white/50">Coming Soon</div>
            </div>
          </motion.div>

          {/* Experiments Grid */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {experiments.map((experiment) => (
              <motion.div
                key={experiment.name}
                variants={itemVariants}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${experiment.gradient} p-6 hover:border-white/20 transition-all duration-300`}
              >
                {/* Status Badge */}
                {experiment.status === "coming-soon" && (
                  <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-white/10 text-xs text-white/60">
                    Coming Soon
                  </div>
                )}

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white/80 mb-4">
                  {experiment.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {experiment.name}
                </h3>
                <p className="text-white/60 text-sm mb-4 leading-relaxed">
                  {experiment.description}
                </p>

                {/* Category Tag */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/50">
                    {experiment.category}
                  </span>
                  {experiment.status === "active" && (
                    <button className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors duration-300 group/btn">
                      Explore
                      <svg
                        className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 text-center"
          >
            <p className="text-white/60 mb-6">
              Ideas that graduate from Labs become full projects.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
            >
              View Projects
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
