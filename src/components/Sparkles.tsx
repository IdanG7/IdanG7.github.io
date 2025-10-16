import { useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Sparkle {
  id: string;
  createdAt: number;
  color: string;
  size: number;
  style: {
    top: string;
    left: string;
    zIndex: number;
  };
}

interface SparklesProps {
  children: ReactNode;
  scale?: number;
}

const sparkleColors = [
  "#FFDD00", // Gold
  "#FF69B4", // Hot Pink
  "#00FFFF", // Cyan
  "#FFD700", // Yellow Gold
  "#FF1493", // Deep Pink
  "#8A2BE2", // Blue Violet
  "#ADFF2F", // Green Yellow
  "#FF4500", // Orange Red
  "#00FA9A", // Medium Spring Green
  "#800080"  // Purple
];

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

const generateSparkle = (color: string): Sparkle => {
  return {
    id: uuidv4(),
    createdAt: Date.now(),
    color,
    size: random(10, 20),
    style: {
      top: random(0, 100) + '%',
      left: random(0, 100) + '%',
      zIndex: 2,
    },
  };
};

const Sparkles = ({ children, scale = 1 }: SparklesProps) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const sparkleInterval = setInterval(() => {
      const sparkle = generateSparkle(sparkleColors[random(0, sparkleColors.length)]);
      const now = Date.now();
      setSparkles((prev) => [...prev.filter((sp) => now - sp.createdAt < 1000), sparkle]);
    }, 100);

    return () => clearInterval(sparkleInterval);
  }, []);

  return (
    <span style={{ display: 'inline-block', position: 'relative' }}>
      {sparkles.map((sparkle) => (
        <Sparkle key={sparkle.id} color={sparkle.color} size={sparkle.size} style={sparkle.style} scale={scale} />
      ))}
      <strong style={{ position: 'relative', zIndex: 1, fontWeight: 'bold' }}>{children}</strong>
    </span>
  );
};

interface SparkleProps {
  color: string;
  size: number;
  style: {
    top: string;
    left: string;
    zIndex: number;
  };
  scale: number;
}

const Sparkle = ({ color, size, style, scale }: SparkleProps) => {
  const path = 'M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z';

  return (
    <span
      style={{
        position: 'absolute',
        display: 'block',
        ...style,
        animation: 'comeInOut 1000ms forwards',
      }}
    >
      <svg
        width={size * scale}
        height={size * scale}
        viewBox="0 0 68 68"
        fill="none"
        style={{ display: 'block' }}
      >
        <path d={path} fill={color} />
      </svg>
    </span>
  );
};

export default Sparkles;
