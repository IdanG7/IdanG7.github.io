import { useEffect, useRef } from 'react';
import { Gradient } from 'mesh-gradient';

interface MeshGradientProps {
  isDark: boolean;
}

const MeshGradientBg = ({ isDark }: MeshGradientProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const gradient = new Gradient();

    gradient.initGradient('#gradient-canvas', {
      colors: isDark
        ? ['#1e293b', '#0f172a', '#1e1b4b', '#312e81', '#1e293b']
        : ['#e0f2fe', '#dbeafe', '#e0e7ff', '#f3e8ff', '#fce7f3'],
      seed: Math.random(),
      wireframe: false,
      density: [0.06, 0.16],
      points: 5,
    });

    return () => {
      // Cleanup if needed
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      id="gradient-canvas"
      data-transition-in
      className="absolute inset-0 w-full h-full"
      style={{
        width: '100%',
        height: '100%',
        '--gradient-color-1': isDark ? '#1e293b' : '#e0f2fe',
        '--gradient-color-2': isDark ? '#0f172a' : '#dbeafe',
        '--gradient-color-3': isDark ? '#1e1b4b' : '#e0e7ff',
        '--gradient-color-4': isDark ? '#312e81' : '#f3e8ff',
      } as React.CSSProperties}
    />
  );
};

export default MeshGradientBg;
