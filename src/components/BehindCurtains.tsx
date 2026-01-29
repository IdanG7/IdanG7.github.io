"use client";

import { useEffect, useState } from "react";

type GithubActivity = {
  time?: string;
  message?: string;
  repo?: string;
  isPrivate?: boolean;
};

type NowPlaying = {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  url: string;
};

const fallbackGithub: GithubActivity = {
  time: "Active",
  message: "Optimizing firmware and CI/CD pipelines...",
  repo: "AeroForge",
  isPrivate: false,
};

const fallbackNowPlaying: NowPlaying = {
  isPlaying: false,
  title: "In My Years",
  artist: "Men I Trust",
  album: "Equus Caballus",
  albumArt: "https://i.scdn.co/image/ab67616d00001e02dcfa162250c7d0feed61d638",
  url: "https://open.spotify.com/track/01V9eIxh3ctGIuRxcS7Ppg",
};

const useApiData = <T,>(url: string, refreshInterval: number) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        const payload = (await response.json()) as T;
        if (isMounted) {
          setData(payload);
        }
      } catch {
        if (isMounted) {
          setData(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    const interval = setInterval(fetchData, refreshInterval);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [url, refreshInterval]);

  return { data, isLoading };
};

const GithubCard = () => {
  const { data, isLoading } = useApiData<GithubActivity>(
    "/api/github",
    30 * 60 * 1000
  );
  const payload = data ?? fallbackGithub;
  const repoLabel = payload.repo ?? "Private work";
  const privateRepoLabel = repoLabel === "Private work" ? repoLabel : `Private · ${repoLabel}`;

  return (
    <a
      href="https://github.com/IdanG7"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-neutral-100 dark:bg-black/40 backdrop-blur-sm border border-black/10 dark:border-white/[0.08] h-full transition-all duration-500 hover:border-black/20 dark:hover:border-white/20"
    >
      <div className="p-6 flex flex-col h-full justify-between relative z-10">
        <div className="flex items-center gap-3">
          <svg
            className="w-7 h-7 text-neutral-900 dark:text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-semibold text-neutral-900 dark:text-white tracking-tight font-helvetica">
              Idan&apos;s
            </span>
            <span className="text-xl text-neutral-500 dark:text-white/80 font-bold italic font-nyght">
              Github
            </span>
          </div>
        </div>
        <div className="my-auto py-4">
          {isLoading ? (
            <div className="space-y-3">
              <div className="h-3 w-24 bg-neutral-200 dark:bg-white/10 rounded animate-pulse" />
              <div className="h-6 w-3/4 bg-neutral-200 dark:bg-white/10 rounded animate-pulse" />
              <div className="h-6 w-1/2 bg-neutral-200 dark:bg-white/10 rounded animate-pulse" />
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-neutral-500 dark:text-white/40 font-outfit">
                  Latest Push
                </span>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                  <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-500/80 font-outfit">
                    {payload.time ?? "Active"}
                  </span>
                </div>
              </div>
              <p className="text-lg md:text-xl text-neutral-900 dark:text-white font-medium leading-[1.4] tracking-tight line-clamp-3 font-outfit">
                &quot;{payload.message ?? "Building silently..."}&quot;
              </p>
              <p className="text-xs font-mono truncate">
                <span className="text-neutral-500 dark:text-white/30">Repo: </span>
                {payload.isPrivate ? (
                  <span className="text-red-500 dark:text-red-600">
                    {privateRepoLabel}
                  </span>
                ) : (
                  <span className="text-blue-600 dark:text-blue-600">
                    {repoLabel}
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
        <div className="mt-auto">
          <svg
            className="w-full h-[2px] mb-4"
            viewBox="0 0 200 2"
            fill="none"
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="1"
              x2="200"
              y2="1"
              stroke="url(#githubLineGradient)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="githubLineGradient"
                x1="0"
                y1="0"
                x2="200"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0%"
                  stopColor="currentColor"
                  className="text-neutral-300 dark:text-white"
                  stopOpacity="0"
                />
                <stop
                  offset="50%"
                  stopColor="currentColor"
                  className="text-neutral-300 dark:text-white"
                  stopOpacity="0.3"
                />
                <stop
                  offset="100%"
                  stopColor="currentColor"
                  className="text-neutral-300 dark:text-white"
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
          </svg>
          <div className="flex items-center justify-center gap-6">
            <div className="group/icon relative">
              <svg
                className="w-5 h-5 text-neutral-400 dark:text-white/40 transition-all duration-300 group-hover/icon:text-[#22c55e] group-hover/icon:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
            <div className="group/icon relative">
              <svg
                className="w-5 h-5 text-neutral-400 dark:text-white/40 transition-all duration-300 group-hover/icon:text-[#0A66C2] group-hover/icon:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <div className="group/icon relative">
              <svg
                className="w-5 h-5 text-neutral-400 dark:text-white/40 transition-all duration-300 group-hover/icon:text-black dark:group-hover/icon:text-white group-hover/icon:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

const LastPlayedCard = () => {
  const { data, isLoading } = useApiData<NowPlaying>("/api/spotify", 10 * 1000);
  const payload = data ?? fallbackNowPlaying;

  return (
    <a
      href={payload.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-neutral-100 dark:bg-black/40 backdrop-blur-sm border border-black/10 dark:border-white/[0.08] h-full transition-all duration-300 hover:border-black/20 dark:hover:border-white/20"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 transition-opacity duration-700 ease-in-out group-hover:opacity-20"
        style={{ backgroundImage: `url('${payload.albumArt}')` }}
      />
      <div className="relative h-full p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 168 168" className="size-6">
            <path
              fill="#1ED760"
              d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
            />
          </svg>
          <h2 className="text-lg font-medium text-neutral-900 dark:text-white font-outfit">
            {payload.isPlaying ? "Listening Now" : "Last Played"}
          </h2>
        </div>
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-3 w-32 bg-neutral-200 dark:bg-white/10 rounded animate-pulse" />
            <div className="h-5 w-3/4 bg-neutral-200 dark:bg-white/10 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-neutral-200 dark:bg-white/10 rounded animate-pulse" />
          </div>
        ) : (
          <>
            <div>
              <p className="text-lg font-medium text-neutral-900 dark:text-white font-outfit line-clamp-1">
                {payload.title}
              </p>
              <p className="text-sm text-neutral-600 dark:text-white/70 line-clamp-1">
                {payload.artist}
              </p>
              <p className="text-xs text-neutral-500 dark:text-white/50 line-clamp-1">
                {payload.album}
              </p>
            </div>
            <div className="mt-auto flex items-center gap-3">
              <img
                src={payload.albumArt}
                alt={payload.album}
                className="h-14 w-14 rounded-md object-cover shadow"
                loading="lazy"
              />
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Open in Spotify
              </span>
            </div>
          </>
        )}
      </div>
    </a>
  );
};

export default function BehindCurtains() {
  return (
    <section className="relative w-full z-30 my-20 py-10">
      <div className="relative mx-auto w-full px-4 sm:px-6 lg:px-8">
        <h2 className="relative z-2 text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl text-balance text-center mb-4 md:mb-4 max-w-xl mx-auto">
          <p className="mb-3 text-xs font-outfit tracking-widest text-neutral-500 dark:text-white/70 uppercase md:text-sm">
            Behind the Curtains
          </p>
          <span>
            <span className="font-semibold text-neutral-900 dark:text-white font-outfit">
              Decoding logic
            </span>{" "}
            <span className="text-colorfull animate-gradient-x font-nyght tracking-wide">
              && the lyrics
            </span>
          </span>
        </h2>
        <div className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="h-[350px]">
            <GithubCard />
          </div>
          <div className="h-[350px]">
            <LastPlayedCard />
          </div>
        </div>
      </div>
    </section>
  );
}
