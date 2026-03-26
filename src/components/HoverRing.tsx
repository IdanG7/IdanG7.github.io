"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, MotionValue } from "framer-motion";

export default function HoverRing({
  x,
  y,
  isVisible,
  label = "READ ARTICLE",
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  isVisible: boolean;
  label?: string;
}) {
  const curveId = `curve-${label.replace(/\s+/g, "").toLowerCase()}`;
  const displayText = `${label} · ${label} · `;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const ring = (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="pointer-events-none fixed z-50"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ opacity: { duration: 0.15 }, scale: { duration: 0.15 } }}
        >
          <div className="-translate-x-1/2 -translate-y-1/2">
            <div className="pointer-events-none rounded-full border border-neutral-900/25 dark:border-white/25 bg-neutral-900/5 dark:bg-white/5 backdrop-blur-sm">
              <motion.div
                className="rounded-full font-medium leading-none bg-transparent size-[96px] relative"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute top-1/2 left-1/2 size-20 -translate-x-1/2 -translate-y-1/2">
                  <svg
                    viewBox="0 0 100 100"
                    overflow="visible"
                    fill="transparent"
                    className="w-full h-full absolute inset-0"
                  >
                    <path
                      id={curveId}
                      d="M 0 50 L 0 50 A 1 1 0 0 1 100 50 L 100 50 L 100 50 A 1 1 0 0 1 0 50 L 0 50"
                      strokeWidth="none"
                      fill="transparent"
                    />
                    <text>
                      <textPath
                        href={`#${curveId}`}
                        startOffset="0"
                        dominantBaseline="hanging"
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          wordSpacing: "4px",
                          letterSpacing: "1.8px",
                        }}
                        className="fill-neutral-900 dark:fill-[rgba(255,255,255,0.95)]"
                      >
                        {displayText}
                      </textPath>
                    </text>
                  </svg>
                </div>
              </motion.div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-12 rounded-full bg-neutral-900/15 dark:bg-white/15 p-3 text-neutral-900 dark:text-white"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Portal to document.body to avoid GSAP transform parents breaking fixed positioning
  if (!mounted) return null;
  return createPortal(ring, document.body);
}
