"use client";

import { useEffect, useRef, useCallback } from "react";

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  lightness: number;
  orbitAngle: number;
  baseAngle: number;
  orbitRadius: number;
  orbitSpeed: number;
  grabbed: boolean;
  scaleX: number;
  scaleY: number;
  rotation: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  lightness: number;
  size: number;
}

interface Trail {
  x: number;
  y: number;
  radius: number;
  lightness: number;
  alpha: number;
}

const ORB_COUNT = 10;
const RETURN_SPEED = 0.08;
const ORBIT_SPEED = 0.004;
const BOUNCE_FACTOR = 1.3;
const SQUASH_AMOUNT = 0.4;

export default function FidgetOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<Orb[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const trailsRef = useRef<Trail[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false, clicking: false });
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);
  const grabbedOrbRef = useRef<number | null>(null);
  const orbitCenterRef = useRef({ x: 0, y: 0 });
  const orbitRadiiRef = useRef({ x: 0, y: 0 });
  const lastInteractionRef = useRef(0);
  const globalRotationRef = useRef(0);

  const initOrbs = useCallback((width: number, height: number) => {
    const orbs: Orb[] = [];
    // Position orbit center on the right side, aligned with text at bottom
    const centerX = width * 0.7;
    const centerY = height * 0.5;
    orbitCenterRef.current = { x: centerX, y: centerY };

    const orbitRadiusX = width * 0.22;
    const orbitRadiusY = height * 0.25;
    orbitRadiiRef.current = { x: orbitRadiusX, y: orbitRadiusY };

    for (let i = 0; i < ORB_COUNT; i++) {
      const orbitAngle = (i / ORB_COUNT) * Math.PI * 2;
      const x = centerX + Math.cos(orbitAngle) * orbitRadiusX;
      const y = centerY + Math.sin(orbitAngle) * orbitRadiusY;
      const baseRadius = 12 + Math.random() * 10;

      orbs.push({
        x,
        y,
        vx: 0,
        vy: 0,
        radius: baseRadius,
        baseRadius,
        lightness: 40 + Math.random() * 30,
        orbitAngle,
        baseAngle: orbitAngle,
        orbitRadius: 1,
        orbitSpeed: ORBIT_SPEED,
        grabbed: false,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
      });
    }
    return orbs;
  }, []);

  const createBurst = (x: number, y: number, lightness: number, count: number = 12) => {
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
      const speed = 3 + Math.random() * 5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 1,
        lightness: lightness + Math.random() * 20 - 10,
        size: 2 + Math.random() * 4,
      });
    }
  };

  const createSparkle = (x: number, y: number, lightness: number) => {
    if (Math.random() > 0.3) return;
    particlesRef.current.push({
      x: x + (Math.random() - 0.5) * 10,
      y: y + (Math.random() - 0.5) * 10,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2 - 1,
      life: 1,
      maxLife: 1,
      lightness,
      size: 1 + Math.random() * 2,
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);

      orbsRef.current = initOrbs(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      timeRef.current += 1;

      const mouse = mouseRef.current;

      // Update and draw trails (fading)
      trailsRef.current = trailsRef.current.filter((trail) => {
        trail.alpha -= 0.08;
        if (trail.alpha <= 0) return false;

        ctx.beginPath();
        ctx.arc(trail.x, trail.y, trail.radius * trail.alpha, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${trail.lightness * 2.55}, ${trail.lightness * 2.55}, ${trail.lightness * 2.55}, ${trail.alpha * 0.3})`;
        ctx.fill();
        return true;
      });

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1; // gravity
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life -= 0.025;

        if (p.life <= 0) return false;

        const alpha = p.life / p.maxLife;
        const gray = p.lightness * 2.55;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${gray}, ${gray}, ${gray}, ${alpha})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${gray}, ${gray}, ${gray}, ${alpha * 0.3})`;
        ctx.fill();

        return true;
      });

      // Draw connection lines
      for (let i = 0; i < orbsRef.current.length; i++) {
        for (let j = i + 1; j < orbsRef.current.length; j++) {
          const orbA = orbsRef.current[i];
          const orbB = orbsRef.current[j];
          const dx = orbB.x - orbA.x;
          const dy = orbB.y - orbA.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const alpha = (1 - distance / 100) * 0.15;
            ctx.strokeStyle = `rgba(120, 120, 120, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(orbA.x, orbA.y);
            ctx.lineTo(orbB.x, orbB.y);
            ctx.stroke();
          }
        }
      }

      // Calculate idle time for self-correction ramp
      const idleFrames = timeRef.current - lastInteractionRef.current;
      // After ~120 frames (~2s), start ramping correction; fully settled by ~300 frames (~5s)
      const idleFactor = Math.min(Math.max((idleFrames - 120) / 180, 0), 1);
      const currentReturnSpeed = RETURN_SPEED + idleFactor * 0.12;
      const currentFriction = 0.94 - idleFactor * 0.06;

      // Advance global rotation counter for ideal spacing
      globalRotationRef.current += ORBIT_SPEED;

      // Update and draw orbs
      orbsRef.current.forEach((orb, index) => {
        const isGrabbed = grabbedOrbRef.current === index;

        if (isGrabbed && mouse.clicking) {
          // Follow mouse when grabbed
          const dx = mouse.x - orb.x;
          const dy = mouse.y - orb.y;
          orb.vx = dx * 0.3;
          orb.vy = dy * 0.3;
          orb.radius = orb.baseRadius * 1.4;

          // Create trail
          trailsRef.current.push({
            x: orb.x,
            y: orb.y,
            radius: orb.radius,
            lightness: orb.lightness,
            alpha: 1,
          });

          // Sparkles while dragging
          createSparkle(orb.x, orb.y, orb.lightness);
        } else {
          // Update orbit angle (continuous spinning)
          orb.orbitAngle += orb.orbitSpeed;

          // When idle, lerp orbit angle toward ideal evenly-spaced position
          if (idleFactor > 0) {
            const idealAngle = orb.baseAngle + globalRotationRef.current;
            let angleDiff = idealAngle - orb.orbitAngle;
            // Normalize to [-PI, PI] for shortest rotation path
            while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
            while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
            orb.orbitAngle += angleDiff * idleFactor * 0.05;
          }

          // Calculate target position on the flat ellipse orbit
          const center = orbitCenterRef.current;
          const radii = orbitRadiiRef.current;
          const targetX = center.x + Math.cos(orb.orbitAngle) * radii.x;
          const targetY = center.y + Math.sin(orb.orbitAngle) * radii.y;

          // Smoothly move towards orbit position (ramps up when idle)
          orb.vx += (targetX - orb.x) * currentReturnSpeed;
          orb.vy += (targetY - orb.y) * currentReturnSpeed;
        }

        // Apply velocity with friction (tightens when idle to settle faster)
        orb.vx *= currentFriction;
        orb.vy *= currentFriction;
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Calculate speed for effects
        const speed = Math.sqrt(orb.vx * orb.vx + orb.vy * orb.vy);

        // Cartoonish squash and stretch based on velocity
        const stretchFactor = Math.min(speed * SQUASH_AMOUNT * 0.1, 0.5);
        const targetScaleX = 1 + stretchFactor;
        const targetScaleY = 1 - stretchFactor * 0.5;

        // Smooth transition to target scale (springy)
        orb.scaleX += (targetScaleX - orb.scaleX) * 0.2;
        orb.scaleY += (targetScaleY - orb.scaleY) * 0.2;

        // Rotation based on movement direction
        if (speed > 0.5) {
          orb.rotation = Math.atan2(orb.vy, orb.vx);
        }

        // Smoothly return radius with bounce overshoot
        if (!isGrabbed) {
          const radiusDiff = orb.baseRadius - orb.radius;
          orb.radius += radiusDiff * 0.15;
          // Add slight overshoot for bouncy feel
          if (Math.abs(radiusDiff) > 0.5) {
            orb.radius += radiusDiff * 0.05;
          }
        }

        // Speed-based sparkles
        if (speed > 4) {
          createSparkle(orb.x, orb.y, orb.lightness);
        }

        // Calculate gray values
        const baseGray = orb.lightness * 2.55;
        const lightGray = Math.min(255, baseGray + 60);
        const darkGray = Math.max(0, baseGray - 30);

        // Save context for transform
        ctx.save();
        ctx.translate(orb.x, orb.y);
        ctx.rotate(orb.rotation);
        ctx.scale(orb.scaleX, orb.scaleY);

        // Draw outer glow
        const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, orb.radius * 2.5);
        glowGradient.addColorStop(0, `rgba(${baseGray}, ${baseGray}, ${baseGray}, 0.4)`);
        glowGradient.addColorStop(0.5, `rgba(${baseGray}, ${baseGray}, ${baseGray}, 0.15)`);
        glowGradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(0, 0, orb.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Draw main orb with gradient
        const orbGradient = ctx.createRadialGradient(
          -orb.radius * 0.3, -orb.radius * 0.3, 0,
          0, 0, orb.radius
        );
        orbGradient.addColorStop(0, `rgba(${lightGray}, ${lightGray}, ${lightGray}, 0.95)`);
        orbGradient.addColorStop(0.5, `rgba(${baseGray}, ${baseGray}, ${baseGray}, 0.9)`);
        orbGradient.addColorStop(1, `rgba(${darkGray}, ${darkGray}, ${darkGray}, 0.85)`);

        ctx.beginPath();
        ctx.arc(0, 0, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = orbGradient;
        ctx.fill();

        // Inner highlight (cartoon shine)
        const highlightGradient = ctx.createRadialGradient(
          -orb.radius * 0.35, -orb.radius * 0.35, 0,
          0, 0, orb.radius * 0.6
        );
        highlightGradient.addColorStop(0, "rgba(255, 255, 255, 0.7)");
        highlightGradient.addColorStop(0.4, "rgba(255, 255, 255, 0.2)");
        highlightGradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(0, 0, orb.radius * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = highlightGradient;
        ctx.fill();

        // Restore context
        ctx.restore();
      });

      // Orb collisions
      for (let i = 0; i < orbsRef.current.length; i++) {
        for (let j = i + 1; j < orbsRef.current.length; j++) {
          const a = orbsRef.current[i];
          const b = orbsRef.current[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDist = a.radius + b.radius;

          if (distance < minDist && distance > 0) {
            // Collision response
            const nx = dx / distance;
            const ny = dy / distance;
            const overlap = minDist - distance;

            a.x -= nx * overlap * 0.5;
            a.y -= ny * overlap * 0.5;
            b.x += nx * overlap * 0.5;
            b.y += ny * overlap * 0.5;

            // Bounce velocities
            const relVx = a.vx - b.vx;
            const relVy = a.vy - b.vy;
            const relVn = relVx * nx + relVy * ny;

            if (relVn > 0) {
              a.vx -= nx * relVn * 0.8;
              a.vy -= ny * relVn * 0.8;
              b.vx += nx * relVn * 0.8;
              b.vy += ny * relVn * 0.8;
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initOrbs]);

  const findOrbUnderMouse = (x: number, y: number): number | null => {
    for (let i = orbsRef.current.length - 1; i >= 0; i--) {
      const orb = orbsRef.current[i];
      const dx = x - orb.x;
      const dy = y - orb.y;
      if (Math.sqrt(dx * dx + dy * dy) < orb.radius * 1.5) {
        return i;
      }
    }
    return null;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current.clicking = true;
      lastInteractionRef.current = timeRef.current;

      const orbIndex = findOrbUnderMouse(x, y);
      if (orbIndex !== null) {
        grabbedOrbRef.current = orbIndex;
        orbsRef.current[orbIndex].grabbed = true;
      } else {
        // Click on empty space - create burst
        createBurst(x, y, 40 + Math.random() * 30, 15);
      }
    }
  };

  const handleMouseUp = () => {
    lastInteractionRef.current = timeRef.current;
    if (grabbedOrbRef.current !== null) {
      const orb = orbsRef.current[grabbedOrbRef.current];
      const throwMultiplier = 1.5;
      orb.vx *= throwMultiplier;
      orb.vy *= throwMultiplier;
      orb.grabbed = false;
      createBurst(orb.x, orb.y, orb.lightness, 8);
    }
    mouseRef.current.clicking = false;
    grabbedOrbRef.current = null;
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000, active: false, clicking: false };
    grabbedOrbRef.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect && e.touches[0]) {
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      mouseRef.current = { x, y, active: true, clicking: true };
      lastInteractionRef.current = timeRef.current;

      const orbIndex = findOrbUnderMouse(x, y);
      if (orbIndex !== null) {
        grabbedOrbRef.current = orbIndex;
        orbsRef.current[orbIndex].grabbed = true;
      } else {
        createBurst(x, y, 40 + Math.random() * 30, 15);
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect && e.touches[0]) {
      mouseRef.current.x = e.touches[0].clientX - rect.left;
      mouseRef.current.y = e.touches[0].clientY - rect.top;
      mouseRef.current.active = true;
    }
  };

  const handleTouchEnd = () => {
    lastInteractionRef.current = timeRef.current;
    if (grabbedOrbRef.current !== null) {
      const orb = orbsRef.current[grabbedOrbRef.current];
      orb.vx *= 1.5;
      orb.vy *= 1.5;
      orb.grabbed = false;
      createBurst(orb.x, orb.y, orb.lightness, 8);
    }
    mouseRef.current = { x: -1000, y: -1000, active: false, clicking: false };
    grabbedOrbRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: "grab", touchAction: "none" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
