"use client";

import { useState, useMemo } from "react";
import TransitionLink from "@/components/TransitionLink";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CodePanel from "@/components/CodePanel";
import { Cloud, renderSimpleIcon } from "react-icon-cloud";
import {
  siReact,
  siTypescript,
  siNextdotjs,
  siNodedotjs,
  siDocker,
  siPostgresql,
  siGit,
  siTailwindcss,
  siMongodb,
  siTerraform,
  siExpress,
  siGithub,
  siVercel,
  siPrisma,
  siLinux,
  siGsap,
  siBun,
  siEslint,
  siSwagger,
  siPython,
  siCplusplus,
  siGnubash,
  siKubernetes,
  siRedis,
  siNginx,
  siGrafana,
  siPrometheus,
  siElasticsearch,
  siJenkins,
  siGitlab,
  siGithubactions,
  siFastapi,
  siAnthropic,
  siRabbitmq,
  siApache,
} from "simple-icons";

const cloudIcons = [
  siReact,
  siTypescript,
  siNextdotjs,
  siNodedotjs,
  siDocker,
  siPostgresql,
  siGit,
  siTailwindcss,
  siMongodb,
  siTerraform,
  siExpress,
  siGithub,
  siVercel,
  siPrisma,
  siLinux,
  siGsap,
  siBun,
  siEslint,
  siSwagger,
  siPython,
  siCplusplus,
  siGnubash,
  siKubernetes,
  siRedis,
  siNginx,
  siGrafana,
  siPrometheus,
  siElasticsearch,
  siJenkins,
  siGitlab,
  siGithubactions,
  siFastapi,
  siAnthropic,
  siRabbitmq,
  siApache,
];

const RangeControl = ({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) => {
  const displayValue = Number(value).toFixed(step < 1 ? 3 : 0);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between font-outfit">
        <label className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-medium">
          {label}
        </label>
        <span className="text-xs text-neutral-900 dark:text-neutral-200 font-outfit tabular-nums bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 rounded">
          {displayValue}
        </span>
      </div>
      <div className="px-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(parseFloat(event.target.value))}
          className="w-full accent-neutral-900 dark:accent-white"
        />
      </div>
    </div>
  );
};

function IconCloudViz({
  iconSize,
  minSpeed,
  maxSpeed,
  depth,
}: {
  iconSize: number;
  minSpeed: number;
  maxSpeed: number;
  depth: number;
}) {
  const icons = cloudIcons.map((icon) =>
    renderSimpleIcon({
      icon,
      size: iconSize,
      aProps: {
        onClick: (e: React.MouseEvent) => e.preventDefault(),
      },
    })
  );

  return (
    <Cloud
      options={{
        clickToFront: 500,
        depth,
        imageScale: 1,
        initial: [0.1, -0.1],
        minSpeed,
        maxSpeed,
        outlineMethod: "none",
        reverse: true,
        wheelZoom: false,
        tooltip: "native",
      }}
      containerProps={{
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        },
      }}
    >
      {icons}
    </Cloud>
  );
}

export default function IconCloudPage() {
  const [iconSize, setIconSize] = useState(72);
  const [minSpeed, setMinSpeed] = useState(0.003);
  const [maxSpeed, setMaxSpeed] = useState(0.005);
  const [depth, setDepth] = useState(0.5);

  const codeTabs = useMemo(
    () => [
      {
        label: "React",
        language: "tsx",
        code: `import { Cloud, renderSimpleIcon } from "react-icon-cloud";
import {
  siReact, siTypescript, siNextdotjs, siNodedotjs, siDocker,
  siPostgresql, siGit, siTailwindcss, siMongodb, siTerraform,
  siExpress, siGithub, siVercel, siPrisma, siLinux, siGsap,
  siBun, siEslint, siSwagger, siPython, siCplusplus, siGnubash,
  siKubernetes, siRedis, siNginx, siGrafana, siPrometheus,
  siElasticsearch, siJenkins, siGitlab, siGithubactions,
  siFastapi, siAnthropic, siRabbitmq, siApache,
} from "simple-icons";

const icons = [
  siReact, siTypescript, siNextdotjs, siNodedotjs, siDocker,
  siPostgresql, siGit, siTailwindcss, siMongodb, siTerraform,
  siExpress, siGithub, siVercel, siPrisma, siLinux, siGsap,
  siBun, siEslint, siSwagger, siPython, siCplusplus, siGnubash,
  siKubernetes, siRedis, siNginx, siGrafana, siPrometheus,
  siElasticsearch, siJenkins, siGitlab, siGithubactions,
  siFastapi, siAnthropic, siRabbitmq, siApache,
];

export default function IconCloud() {
  const rendered = icons.map((icon) =>
    renderSimpleIcon({ icon, size: ${iconSize} })
  );

  return (
    <Cloud
      options={{
        clickToFront: 500,
        depth: ${depth},
        imageScale: 1,
        initial: [0.1, -0.1],
        minSpeed: ${minSpeed},
        maxSpeed: ${maxSpeed},
        outlineMethod: "none",
        reverse: true,
        wheelZoom: false,
      }}
    >
      {rendered}
    </Cloud>
  );
}`,
      },
      {
        label: "Install",
        language: "bash",
        code: `npm install react-icon-cloud simple-icons`,
      },
    ],
    [iconSize, minSpeed, maxSpeed, depth]
  );

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-neutral-50 dark:bg-black pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-32">
          <TransitionLink
            href="/labs"
            back
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Back to Labs
          </TransitionLink>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-12 mb-12 md:mb-20">
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-outfit font-bold text-neutral-900 dark:text-white tracking-tight leading-[1.1]">
                Icon Cloud
              </h1>
              <p className="mt-4 text-lg md:text-xl text-neutral-600 dark:text-white/60 max-w-2xl leading-relaxed">
                A 3D rotating sphere of technology icons powered by TagCanvas.
                Click an icon to bring it to front, or let it spin.
              </p>
            </div>
            <div className="hidden md:flex flex-col gap-4 text-right">
              <div>
                <span className="font-outfit text-[10px] font-medium text-neutral-400 dark:text-white/30 uppercase tracking-wider block mb-1">
                  Status
                </span>
                <span className="font-outfit text-sm text-neutral-700 dark:text-white/70">
                  Live
                </span>
              </div>
              <div>
                <span className="font-outfit text-[10px] font-medium text-neutral-400 dark:text-white/30 uppercase tracking-wider block mb-1">
                  Category
                </span>
                <span className="font-outfit text-sm text-neutral-700 dark:text-white/70">
                  UI / Motion
                </span>
              </div>
              <div>
                <span className="font-outfit text-[10px] font-medium text-neutral-400 dark:text-white/30 uppercase tracking-wider block mb-1">
                  Last Updated
                </span>
                <span className="font-outfit text-sm text-neutral-700 dark:text-white/70">
                  Mar 2026
                </span>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-6 font-outfit">
            <div className="w-full h-[500px] relative rounded-3xl border border-neutral-200 dark:border-white/10 bg-black overflow-hidden shadow-sm flex items-center justify-center">
              <IconCloudViz
                iconSize={iconSize}
                minSpeed={minSpeed}
                maxSpeed={maxSpeed}
                depth={depth}
              />
            </div>

            <div className="w-full rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/50 p-8 md:p-10 shadow-sm">
              <div className="flex items-center justify-between mb-8 border-b border-neutral-200 dark:border-white/5 pb-6">
                <h2 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-widest">
                  Configuration
                </h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Active
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <RangeControl
                  label="Icon Size"
                  min={32}
                  max={128}
                  step={4}
                  value={iconSize}
                  onChange={setIconSize}
                />
                <RangeControl
                  label="Min Speed"
                  min={0.001}
                  max={0.02}
                  step={0.001}
                  value={minSpeed}
                  onChange={setMinSpeed}
                />
                <RangeControl
                  label="Max Speed"
                  min={0.005}
                  max={0.05}
                  step={0.001}
                  value={maxSpeed}
                  onChange={setMaxSpeed}
                />
                <RangeControl
                  label="Depth"
                  min={0.5}
                  max={2}
                  step={0.1}
                  value={depth}
                  onChange={setDepth}
                />
              </div>
            </div>

            <CodePanel tabs={codeTabs} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
