"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const skills = [
  {
    label: "C++",
    icons: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg", className: "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain" }],
  },
  {
    label: "C",
    icons: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg", className: "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain" }],
  },
  {
    label: "Python",
    icons: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", className: "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain" }],
  },
  {
    label: "C#",
    icons: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg", className: "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain" }],
  },
  {
    label: "Java",
    icons: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", className: "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain" }],
  },
  {
    label: "Bash",
    icons: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg", className: "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain" }],
  },
  {
    label: "Groovy",
    icons: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/groovy/groovy-original.svg", className: "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain" }],
  },
  {
    label: "Jenkins",
    icons: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg", className: "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain" }],
  },
  {
    label: "Docker",
    icons: [{ src: "/icons/docker.svg", className: "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain" }],
  },
  {
    label: "Git",
    icons: [{ src: "/icons/git.svg", className: "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain" }],
  },
  {
    label: "GitHub Actions",
    icons: [{ src: "/icons/GitHub_dark.svg", className: "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain" }],
  },
  {
    label: "SVN",
    icons: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/subversion/subversion-original.svg", className: "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain" }],
  },
  {
    label: "AWS",
    icons: [{ src: "/icons/Amazon Web Services_dark.svg", className: "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain" }],
  },
  {
    label: "Kubernetes",
    icons: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg", className: "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain" }],
  },
  {
    label: "Visual Studio",
    icons: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualstudio/visualstudio-plain.svg", className: "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain" }],
  },
  {
    label: "VS Code",
    icons: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", className: "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain" }],
  },
  {
    label: "IntelliJ",
    icons: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg", className: "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain" }],
  },
  {
    label: "PyCharm",
    icons: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pycharm/pycharm-original.svg", className: "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain" }],
  },
  {
    label: "AutoIt",
    icons: [],
  },
  {
    label: "PostgreSQL",
    icons: [{ src: "/icons/postgresql.svg", className: "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain" }],
  },
  {
    label: "Redis",
    icons: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg", className: "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain" }],
  },
  {
    label: "FastAPI",
    icons: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg", className: "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain" }],
  },
  {
    label: "NATS",
    icons: [],
  },
  {
    label: "OpenCV",
    icons: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg", className: "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain" }],
  },
  {
    label: "PhysX",
    icons: [],
  },
  {
    label: "YAML",
    icons: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/yaml/yaml-original.svg", className: "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain" }],
  },
  {
    label: "OpenTelemetry",
    icons: [],
  },
  {
    label: "Linux",
    icons: [{ src: "/icons/linux.svg", className: "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain" }],
  },
  {
    label: "Windows",
    icons: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows8/windows8-original.svg", className: "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain" }],
  },
  {
    label: "JIRA",
    icons: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg", className: "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain" }],
  },
  {
    label: "Monday",
    icons: [],
  },
  {
    label: "Prometheus",
    icons: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg", className: "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain" }],
  },
  {
    label: "Grafana",
    icons: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg", className: "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain" }],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const flowerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !flowerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(flowerRef.current, { rotate: 28 });
      gsap.to(flowerRef.current, {
        rotate: 388,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative mx-auto -mt-[50px] md:-mt-[150px] lg:-mt-[200px] flex h-full flex-col rounded-3xl py-0 px-4 md:px-10 max-w-[1400px]"
    >
      <div className="relative w-full">
        <div className="flower-container absolute left-1/2 -translate-x-1/2 top-0 z-0 pointer-events-none">
          <div
            className="w-[250px] h-[250px] md:w-[320px] md:h-[320px] lg:w-[420px] lg:h-[420px]"
            ref={flowerRef}
            style={{ willChange: "transform" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              draggable="false"
              alt="skills cover rotating image"
              loading="lazy"
              width="420"
              height="420"
              className="w-full h-full opacity-65 select-none object-contain invert dark:invert-0 transition-[filter] duration-500"
              src="/images/skills/steel-flower.webp"
            />
          </div>
        </div>

        <div className="relative z-10 pt-[150px] md:pt-[210px] lg:pt-[280px]">
          <div
            className="absolute inset-x-0 pointer-events-none transition-colors duration-500"
            style={{ top: "100px", height: "calc(100% - 100px)", background: "var(--skill-flower-overlay)" }}
          />

          <h2
            style={{ textShadow: "var(--skill-text-shadow)" }}
            className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-balance text-center mb-6 md:mb-8"
          >
            <p className="mb-2 md:mb-3 text-[10px] md:text-sm font-normal tracking-widest text-neutral-500 dark:text-white/70 uppercase font-outfit">
              MY SKILLSET
            </p>
            <span>
              <span className="font-outfit font-semibold text-neutral-900 dark:text-white">The Magic </span>
              <span className="text-colorfull animate-gradient-x font-nyght tracking-wide">Behind</span>
            </span>
          </h2>

          <ul className="relative z-10 mx-auto flex max-w-[400px] sm:max-w-[480px] md:max-w-2xl lg:max-w-4xl flex-wrap justify-center gap-2 sm:gap-2 md:gap-2 lg:gap-4">
            {skills.map((skill) => (
              <li
                key={skill.label}
                aria-label={skill.label}
                className="relative flex items-center justify-center gap-1.5 md:gap-2 rounded-xl border border-zinc-200 dark:border-white/[0.14] bg-zinc-100 dark:bg-zinc-900 px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm text-neutral-800 dark:text-white/80 lg:text-base font-outfit"
              >
                {skill.icons.map((icon) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={icon.src}
                    alt={skill.label}
                    loading="lazy"
                    width="18"
                    height="18"
                    className={icon.className}
                    src={icon.src}
                  />
                ))}
                <span>{skill.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
