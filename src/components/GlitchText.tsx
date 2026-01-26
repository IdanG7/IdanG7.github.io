"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export default function GlitchText({ text, className }: GlitchTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Calculate spread offset based on distance from hovered letter
  const getSpreadOffset = (index: number) => {
    if (hoveredIndex === null) return 0;

    const distance = index - hoveredIndex;
    if (distance === 0) return 0;

    // Cartoonish spread - big push on neighbors
    const spreadAmount = 20;
    const direction = distance > 0 ? 1 : -1;
    const absDistance = Math.abs(distance);

    // Spread force decreases with distance
    if (absDistance > 3) return 0;
    const force = spreadAmount / absDistance;

    return direction * force;
  };

  // Slight rotation for playfulness
  const getRotation = (index: number) => {
    if (hoveredIndex === null) return 0;
    const distance = index - hoveredIndex;
    if (distance === 0) return 0;
    if (Math.abs(distance) > 2) return 0;
    return distance > 0 ? 4 : -4;
  };

  return (
    <span className={cn("relative inline-flex cursor-pointer", className)}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="relative inline-block origin-bottom"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          animate={{
            x: getSpreadOffset(index),
            y: hoveredIndex === index ? -16 : 0,
            scale: hoveredIndex === index ? 1.2 : 1,
            rotate: getRotation(index),
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 8,
            mass: 0.5,
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
