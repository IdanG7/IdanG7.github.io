import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isClicking, setIsClicking] = useState(false);
  const [isOverText, setIsOverText] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const trailIdRef = useRef(0);

  // Smooth spring physics for cursor
  const springConfig = { damping: 20, stiffness: 300, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (!hasMoved) {
        setHasMoved(true);
      }
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Add trail
      const newTrail = { x: e.clientX, y: e.clientY, id: trailIdRef.current++ };
      setTrails((prev) => [...prev.slice(-8), newTrail]);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isText =
        target.tagName === 'P' ||
        target.tagName === 'SPAN' ||
        target.tagName === 'H1' ||
        target.tagName === 'H2' ||
        target.tagName === 'H3' ||
        target.tagName === 'H4' ||
        target.tagName === 'H5' ||
        target.tagName === 'H6' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'LABEL';

      setIsOverText(isText);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, hasMoved]);

  if (!hasMoved) {
    return null;
  }

  return (
    <>
      {/* Trail effect */}
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="cursor-trail"
          initial={{
            x: trail.x,
            y: trail.y,
            opacity: 0.6,
            scale: 1,
          }}
          animate={{
            opacity: 0,
            scale: 0.5,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
          style={{
            position: 'fixed',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9998,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, hsl(var(--primary) / ${0.4 - index * 0.05}) 0%, transparent 70%)`,
            boxShadow: `0 0 10px hsl(var(--primary) / ${0.3 - index * 0.03})`,
          }}
        />
      ))}

      {/* Main cursor dot */}
      <motion.div
        className={`custom-cursor-dot ${isOverText ? 'invert-cursor' : ''}`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isClicking ? 0.5 : 1,
        }}
        transition={{
          scale: { duration: 0.2, ease: 'easeOut' },
        }}
      />
    </>
  );
};

export default CustomCursor;
