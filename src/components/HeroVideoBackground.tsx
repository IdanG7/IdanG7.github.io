"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { cn } from "@/lib/utils";

interface HeroVideoBackgroundProps {
  hlsUrl?: string;
  fallbackUrl?: string;
  className?: string;
}

const DEFAULT_HLS_URL =
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/697945ca6b876878dba3b23fbd2f1561/manifest/video.m3u8";
const DEFAULT_FALLBACK_URL = "/_videos/v1/f0c78f536d5f21a047fb7792723a36f9d647daa1";

export default function HeroVideoBackground({
  hlsUrl = DEFAULT_HLS_URL,
  fallbackUrl = DEFAULT_FALLBACK_URL,
  className,
}: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Don't play video if user prefers reduced motion
      return;
    }

    let destroyed = false;

    const initHls = () => {
      // Check if HLS is supported via hls.js
      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: false,
          backBufferLength: 30,
          maxBufferLength: 30,
          maxMaxBufferLength: 60,
          startLevel: -1, // Auto quality
        });

        hlsRef.current = hls;

        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
          hls.loadSource(hlsUrl);
        });

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (!destroyed) {
            video.play().catch(() => {
              // Autoplay might be blocked, that's okay for a background video
            });
          }
        });

        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) {
            hls.destroy();
            if (!destroyed) {
              useFallback();
            }
          }
        });

        hls.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Native HLS support (Safari)
        video.src = hlsUrl;
        video.addEventListener("loadedmetadata", () => {
          if (!destroyed) {
            video.play().catch(() => {});
          }
        });
        video.addEventListener("error", () => {
          if (!destroyed) {
            useFallback();
          }
        });
      } else {
        // No HLS support, use fallback
        useFallback();
      }
    };

    const useFallback = () => {
      if (destroyed || !video) return;
      video.src = fallbackUrl;
      video.load();
      video.play().catch(() => {});
    };

    const handleCanPlay = () => {
      if (!destroyed) {
        setIsLoaded(true);
      }
    };

    video.addEventListener("canplay", handleCanPlay);
    initHls();

    return () => {
      destroyed = true;
      video.removeEventListener("canplay", handleCanPlay);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [hlsUrl, fallbackUrl]);

  return (
    <div
      className={cn(
        "absolute inset-0 z-0 overflow-hidden pointer-events-none select-none",
        className
      )}
    >
      {/* Video element - visible in both modes */}
      <video
        ref={videoRef}
        className={cn(
          "absolute inset-0 w-full h-full object-cover",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        style={{
          transitionProperty: "opacity",
          transitionDuration: "450ms",
          transitionTimingFunction: "cubic-bezier(0.25, 0.4, 0.25, 1)",
        }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Dark mode overlays */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 dark:opacity-100",
          !isLoaded && "!opacity-0"
        )}
        style={{
          transitionProperty: "opacity",
          transitionDuration: "450ms",
          transitionTimingFunction: "cubic-bezier(0.25, 0.4, 0.25, 1)",
        }}
      >
        {/* Center vignette for text */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Bottom gradient for smooth transition */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[45%]"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 35%, rgba(0,0,0,0.8) 70%, #000000 100%)",
          }}
        />

        {/* Top gradient */}
        <div
          className="absolute top-0 left-0 right-0 h-[30%]"
          style={{
            background:
              "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.3) 100%)",
          }}
        />
      </div>

      {/* Light mode overlay - semi-transparent so video colors show through */}
      <div
        className={cn(
          "absolute inset-0 opacity-100 dark:opacity-0",
          !isLoaded && "!opacity-0"
        )}
        style={{
          transitionProperty: "opacity",
          transitionDuration: "450ms",
          transitionTimingFunction: "cubic-bezier(0.25, 0.4, 0.25, 1)",
        }}
      >
        {/* Light wash overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "rgba(255, 255, 255, 0.75)",
          }}
        />

        {/* Bottom gradient for smooth transition */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[45%]"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(250,250,250,0.6) 35%, rgba(250,250,250,0.9) 70%, #fafafa 100%)",
          }}
        />

        {/* Top gradient */}
        <div
          className="absolute top-0 left-0 right-0 h-[30%]"
          style={{
            background:
              "linear-gradient(to top, transparent 0%, rgba(255,255,255,0.5) 100%)",
          }}
        />
      </div>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          transitionProperty: "opacity",
          transitionDuration: "450ms",
          transitionTimingFunction: "cubic-bezier(0.25, 0.4, 0.25, 1)",
        }}
      />
    </div>
  );
}
