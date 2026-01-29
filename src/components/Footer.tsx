"use client";

import Link from "next/link";
import FidgetOrbs from "./FidgetOrbs";

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-100 dark:bg-black pt-10 md:pt-20 pb-6 md:pb-10 px-4 md:px-10 border-t border-black/5 dark:border-neutral-900 transition-colors duration-500">
      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-end gap-2 md:gap-4 mb-12 md:mb-32 min-h-[300px] md:min-h-[300px]">
        {/* Orbs layer - covers section */}
        <div className="hidden md:block absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          <div className="w-full h-full pointer-events-auto">
            <FidgetOrbs />
          </div>
        </div>

        <div className="flex flex-row items-end justify-between w-full md:w-auto gap-2" style={{ zIndex: 2 }}>
          <div className="flex flex-col gap-4 md:gap-8 flex-1">
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium text-neutral-900 dark:text-white tracking-tight leading-[0.9] font-clash pointer-events-none">
              <span className="inline-flex items-center gap-2 md:gap-4">
                Let&apos;s create
              </span>
              <br />
              <span className="text-neutral-500">something real.</span>
            </h2>
          </div>
          <div className="flex-shrink-0 md:hidden">
            <div className="relative w-[150px] h-[150px]">
              <FidgetOrbs />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0A0A0A] rounded-3xl py-6 px-4 md:py-10 md:px-10 mb-10 md:mb-20 shadow-sm dark:shadow-none transition-colors duration-500">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16">
          <div className="flex flex-col gap-6 max-w-lg">
            <Link href="/" className="group block w-fit">
              <h3 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight transition-all duration-300 group-hover:tracking-wider font-agile">
                IDAN
              </h3>
            </Link>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base leading-relaxed font-fjalla max-w-md">
              Backend engineer specializing in C++ development, firmware engineering, and Infrastructure
              automation. Focused on building reliable systems, scalable infrastructure, and
              real-time tooling that ships with confidence.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 lg:gap-x-12 w-full lg:w-auto">
            <div className="flex flex-col gap-4">
              <h4 className="text-neutral-400 font-medium mb-2 font-outfit">General</h4>
              <div className="flex flex-col gap-3">
                <Link className="group flex items-center gap-2 w-fit" href="/">
                  <span className="relative inline-block text-sm md:text-base text-neutral-600 dark:text-white tracking-wide font-fjalla">
                    Home
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black dark:bg-white origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                  <svg
                    className="w-3 h-3 text-neutral-900 dark:text-white opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link className="group flex items-center gap-2 w-fit" href="/about">
                  <span className="relative inline-block text-sm md:text-base text-neutral-600 dark:text-white tracking-wide font-fjalla">
                    About
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black dark:bg-white origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                  <svg
                    className="w-3 h-3 text-neutral-900 dark:text-white opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link className="group flex items-center gap-2 w-fit" href="/projects">
                  <span className="relative inline-block text-sm md:text-base text-neutral-600 dark:text-white tracking-wide font-fjalla">
                    Projects
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black dark:bg-white origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                  <svg
                    className="w-3 h-3 text-neutral-900 dark:text-white opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link className="group flex items-center gap-2 w-fit" href="/links">
                  <span className="relative inline-block text-sm md:text-base text-neutral-600 dark:text-white tracking-wide font-fjalla">
                    Links
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black dark:bg-white origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                  <svg
                    className="w-3 h-3 text-neutral-900 dark:text-white opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link className="group flex items-center gap-2 w-fit" href="/uses">
                  <span className="relative inline-block text-sm md:text-base text-neutral-600 dark:text-white tracking-wide font-fjalla">
                    Uses
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black dark:bg-white origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                  <svg
                    className="w-3 h-3 text-neutral-900 dark:text-white opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-neutral-400 font-medium mb-2 font-outfit">Contact</h4>
              <div className="flex flex-col gap-3">
                <a className="group flex items-center gap-2 w-fit" href="mailto:Idan.gurevich@gmail.com">
                  <span className="relative inline-block text-sm md:text-base text-neutral-600 dark:text-white tracking-wide font-fjalla">
                    Email
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black dark:bg-white origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                  <svg
                    className="w-3 h-3 text-neutral-900 dark:text-white opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                <a
                  className="group flex items-center gap-2 w-fit"
                  href="https://www.linkedin.com/in/idangurevich/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="relative inline-block text-sm md:text-base text-neutral-600 dark:text-white tracking-wide font-fjalla">
                    LinkedIn
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black dark:bg-white origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                  <svg
                    className="w-3 h-3 text-neutral-900 dark:text-white opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                <a
                  className="group flex items-center gap-2 w-fit"
                  href="https://github.com/IdanG7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="relative inline-block text-sm md:text-base text-neutral-600 dark:text-white tracking-wide font-fjalla">
                    GitHub
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black dark:bg-white origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                  <svg
                    className="w-3 h-3 text-neutral-900 dark:text-white opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                <a
                  className="group flex items-center gap-2 w-fit"
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="relative inline-block text-sm md:text-base text-neutral-600 dark:text-white tracking-wide font-fjalla">
                    Resume
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black dark:bg-white origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                  <svg
                    className="w-3 h-3 text-neutral-900 dark:text-white opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-neutral-400 font-medium mb-2 font-outfit">Projects</h4>
              <div className="flex flex-col gap-3">
                <a
                  className="group flex items-center gap-2 w-fit"
                  href="https://github.com/IdanG7/AeroForge"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="relative inline-block text-sm md:text-base text-neutral-600 dark:text-white tracking-wide font-fjalla">
                    AeroForge
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black dark:bg-white origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                  <svg
                    className="w-3 h-3 text-neutral-900 dark:text-white opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                <a
                  className="group flex items-center gap-2 w-fit"
                  href="https://github.com/IdanG7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="relative inline-block text-sm md:text-base text-neutral-600 dark:text-white tracking-wide font-fjalla">
                    Multiplayer SDK
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black dark:bg-white origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                  <svg
                    className="w-3 h-3 text-neutral-900 dark:text-white opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                <a
                  className="group flex items-center gap-2 w-fit"
                  href="https://github.com/IdanG7/InfraMind"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="relative inline-block text-sm md:text-base text-neutral-600 dark:text-white tracking-wide font-fjalla">
                    InfraMind
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black dark:bg-white origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                  <svg
                    className="w-3 h-3 text-neutral-900 dark:text-white opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                <a
                  className="group flex items-center gap-2 w-fit"
                  href="https://github.com/IdanG7/Sentinel"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="relative inline-block text-sm md:text-base text-neutral-600 dark:text-white tracking-wide font-fjalla">
                    Sentinel
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black dark:bg-white origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                  <svg
                    className="w-3 h-3 text-neutral-900 dark:text-white opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-neutral-400 font-medium mb-2 font-outfit">Resources</h4>
              <div className="flex flex-col gap-3">
                <a
                  className="group flex items-center gap-2 w-fit"
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="relative inline-block text-sm md:text-base text-neutral-600 dark:text-white tracking-wide font-fjalla">
                    Resume
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black dark:bg-white origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                  <svg
                    className="w-3 h-3 text-neutral-900 dark:text-white opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                <a
                  className="group flex items-center gap-2 w-fit"
                  href="https://github.com/IdanG7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="relative inline-block text-sm md:text-base text-neutral-600 dark:text-white tracking-wide font-fjalla">
                    GitHub
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black dark:bg-white origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                  <svg
                    className="w-3 h-3 text-neutral-900 dark:text-white opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                <a
                  className="group flex items-center gap-2 w-fit"
                  href="https://www.linkedin.com/in/idangurevich/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="relative inline-block text-sm md:text-base text-neutral-600 dark:text-white tracking-wide font-fjalla">
                    LinkedIn
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black dark:bg-white origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                  <svg
                    className="w-3 h-3 text-neutral-900 dark:text-white opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-black/5 dark:border-neutral-900 transition-colors duration-500">
        <p className="text-neutral-500 text-sm font-fjalla">© 2026 IDAN GUREVICH. ALL RIGHTS RESERVED.</p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/IdanG7"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-neutral-500 hover:text-green-600 dark:hover:text-green-500 transition-colors duration-300"
            tabIndex={0}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/idangurevich/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-neutral-500 hover:text-[#0A66C2] transition-colors duration-300"
            tabIndex={0}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="mailto:Idan.gurevich@gmail.com"
            aria-label="Email"
            className="text-neutral-500 hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-300"
            tabIndex={0}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="m22 6-10 7L2 6" />
            </svg>
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Resume"
            className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors duration-300"
            tabIndex={0}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 2h8l4 4v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 13h8" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 17h8" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
