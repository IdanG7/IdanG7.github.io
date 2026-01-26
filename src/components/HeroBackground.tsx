"use client";

import { useEffect, useRef, useState } from "react";

type GradientBlob = {
  x: number;
  y: number;
  size: number;
  hue: number;
};

const blobs: GradientBlob[] = [
  { x: 0.3, y: 0.25, size: 0.35, hue: 240 },
  { x: 0.7, y: 0.4, size: 0.3, hue: 260 },
  { x: 0.5, y: 0.15, size: 0.25, hue: 220 },
];

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const patternRef = useRef<CanvasPattern | null>(null);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);
  const isDarkRef = useRef(true);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const updateTheme = () => {
      const dark = document.documentElement.classList.contains("dark");
      setIsDark(dark);
      isDarkRef.current = dark;
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;

    const ensurePattern = () => {
      if (patternRef.current) return;
      const noise = document.createElement("canvas");
      noise.width = 128;
      noise.height = 128;
      const noiseCtx = noise.getContext("2d");
      if (!noiseCtx) return;

      const imageData = noiseCtx.createImageData(128, 128);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const value = 255 * Math.random();
        imageData.data[i] = value;
        imageData.data[i + 1] = value;
        imageData.data[i + 2] = value;
        imageData.data[i + 3] = 20;
      }
      noiseCtx.putImageData(imageData, 0, 0);
      patternRef.current = ctx.createPattern(noise, "repeat");
    };

    const render = () => {
      const darkMode = isDarkRef.current;
      if (!prefersReducedMotion) {
        timeRef.current += 0.003;
      }

      ctx.fillStyle = darkMode ? "#000000" : "#ffffff";
      ctx.fillRect(0, 0, width, height);

      blobs.forEach((blob, index) => {
        const offsetX = 20 * Math.sin(timeRef.current + index);
        const offsetY = 15 * Math.cos(0.7 * timeRef.current + index);
        const x = blob.x * width + offsetX;
        const y = blob.y * height + offsetY;
        const size = blob.size * Math.min(width, height);
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);

        if (darkMode) {
          gradient.addColorStop(0, `hsla(${blob.hue}, 15%, 25%, 0.15)`);
          gradient.addColorStop(0.5, `hsla(${blob.hue}, 10%, 15%, 0.08)`);
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        } else {
          gradient.addColorStop(0, `hsla(${blob.hue}, 80%, 90%, 0.4)`);
          gradient.addColorStop(0.5, `hsla(${blob.hue}, 60%, 95%, 0.2)`);
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      const centerX = 0.5 * width;
      const centerY = 0.38 * height;
      const radius = 0.5 * Math.min(width, height);
      const glow = ctx.createRadialGradient(
        centerX,
        centerY,
        0.6 * radius,
        centerX,
        centerY,
        1.2 * radius
      );

      if (darkMode) {
        glow.addColorStop(0, "rgba(35, 35, 45, 0)");
        glow.addColorStop(0.4, "rgba(55, 55, 70, 0.25)");
        glow.addColorStop(0.7, "rgba(40, 40, 55, 0.15)");
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        glow.addColorStop(0, "rgba(200, 200, 210, 0)");
        glow.addColorStop(0.4, "rgba(200, 200, 220, 0.15)");
        glow.addColorStop(0.7, "rgba(210, 210, 230, 0.05)");
        glow.addColorStop(1, "rgba(255, 255, 255, 0)");
      }

      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      const vignette = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        0.5 * radius
      );

      if (darkMode) {
        vignette.addColorStop(0, "rgba(0, 0, 0, 0.4)");
        vignette.addColorStop(0.6, "rgba(0, 0, 0, 0.2)");
        vignette.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        vignette.addColorStop(0, "rgba(255, 255, 255, 0.8)");
        vignette.addColorStop(0.6, "rgba(255, 255, 255, 0.4)");
        vignette.addColorStop(1, "rgba(255, 255, 255, 0)");
      }

      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      if (patternRef.current) {
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = patternRef.current;
        ctx.fillRect(0, 0, width, height);
        ctx.globalAlpha = 1;
      }

      if (document.visibilityState === "visible") {
        rafRef.current = window.requestAnimationFrame(render);
      }
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      render();
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        window.cancelAnimationFrame(rafRef.current);
        render();
      } else {
        window.cancelAnimationFrame(rafRef.current);
      }
    };

    ensurePattern();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ width: "100%", height: "100%" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, transparent 50%, rgba(0,0,0,0.4) 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[45%]"
        style={{
          background: isDark
            ? "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 35%, rgba(0,0,0,0.8) 70%, #000000 100%)"
            : "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.4) 35%, rgba(255,255,255,0.8) 70%, #ffffff 100%)",
        }}
      />
    </div>
  );
}
