"use client";

import { motion } from "framer-motion";

interface SpotifyWidgetProps {
  track?: {
    name: string;
    artist: string;
    album: string;
    albumArt?: string;
    url?: string;
  };
}

// Default track when no live data
const defaultTrack = {
  name: "Another Story",
  artist: "Nicholas Hooper",
  album: "Harry Potter And The Order Of The Phoenix",
  albumArt: "https://i.scdn.co/image/ab67616d0000b273131830d267848232447ba5d5",
  url: "https://open.spotify.com/track/7k5TW0wfpXnb39IhRwoSq7",
};

export default function SpotifyWidget({ track = defaultTrack }: SpotifyWidgetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-6 h-full"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span className="text-xs text-white/50 uppercase tracking-wider">
            Last Played
          </span>
        </div>

        {/* Track Info */}
        <div className="space-y-1 mb-6">
          <a
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block font-medium text-white/80 hover:text-white transition-colors line-clamp-1"
          >
            {track.name}
          </a>
          <a
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-white/60 hover:text-white/80 transition-colors line-clamp-1"
          >
            {track.artist}
          </a>
          <a
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xs text-white/40 hover:text-white/60 transition-colors line-clamp-1"
          >
            {track.album}
          </a>
        </div>

        {/* Album Art with CD Effect */}
        <div className="relative flex justify-center">
          <div className="relative">
            {/* CD/Record visual */}
            <div className="relative w-[100px] h-[100px]">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 shadow-xl" />

              {/* Album art in center */}
              <a
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-2 rounded-full overflow-hidden"
              >
                {track.albumArt ? (
                  <img
                    src={track.albumArt}
                    alt={track.album}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-500/20 to-green-700/20 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-green-500/50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                      />
                    </svg>
                  </div>
                )}
              </a>

              {/* Center hole */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-zinc-800 border border-zinc-700" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
