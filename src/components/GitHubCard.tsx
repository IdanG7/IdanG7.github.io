"use client";

import { motion } from "framer-motion";

interface GitHubCardProps {
  username?: string;
  stats?: {
    repos?: number;
    followers?: number;
    contributions?: number;
  };
}

export default function GitHubCard({
  username = "IdanG7",
  stats = {},
}: GitHubCardProps) {
  return (
    <motion.a
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-black/40 backdrop-blur-sm border border-white/[0.08] h-full p-6 transition-all duration-500 hover:border-white/20"
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
            <div>
              <span className="text-white font-medium">@{username}</span>
              <p className="text-xs text-white/50">GitHub Profile</p>
            </div>
          </div>
          <svg
            className="w-5 h-5 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{stats.repos ?? "—"}</div>
            <div className="text-xs text-white/50">Repos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{stats.followers ?? "—"}</div>
            <div className="text-xs text-white/50">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {stats.contributions?.toLocaleString() ?? "—"}
            </div>
            <div className="text-xs text-white/50">Contributions</div>
          </div>
        </div>

        {/* Contribution Graph Placeholder */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/40">Contribution activity</span>
            <span className="text-xs text-white/40">Last year</span>
          </div>
          <div className="h-20 rounded-lg bg-white/5 border border-white/5 p-2 overflow-hidden">
            {/* Mini contribution graph */}
            <div className="flex gap-0.5 h-full">
              {Array.from({ length: 52 }).map((_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-0.5 flex-1">
                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                    const intensity = Math.random();
                    let bgColor = "bg-white/5";
                    if (intensity > 0.8) bgColor = "bg-green-500";
                    else if (intensity > 0.6) bgColor = "bg-green-500/70";
                    else if (intensity > 0.4) bgColor = "bg-green-500/40";
                    else if (intensity > 0.2) bgColor = "bg-green-500/20";

                    return (
                      <div
                        key={dayIndex}
                        className={`flex-1 rounded-[2px] ${bgColor}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* View Profile CTA */}
      <div className="relative z-10 mt-4 pt-4 border-t border-white/5">
        <span className="flex items-center gap-2 text-sm text-white/60 group-hover:text-white transition-colors">
          View Profile
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
        </span>
      </div>
    </motion.a>
  );
}
