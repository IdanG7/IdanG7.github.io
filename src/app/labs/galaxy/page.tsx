"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import TransitionLink from "@/components/TransitionLink";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CodePanel from "@/components/CodePanel";

const vertexShaderSource = `
precision highp float;
attribute vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform vec2 uMouse;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform bool uMouseRepulsion;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uRepulsionStrength;
uniform float uMouseActiveFactor;
uniform float uAutoCenterRepulsion;

#define NUM_LAYER 4.0
#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
#define PERIOD 3.0

float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float tri(float x) {
  return abs(fract(x) * 2.0 - 1.0);
}

float tris(float x) {
  float t = fract(x);
  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));
}

float trisn(float x) {
  float t = fract(x);
  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float Star(vec2 uv, float flare) {
  float d = length(uv);
  float m = (0.05 * uGlowIntensity) / d;
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * flare * uGlowIntensity;
  uv *= MAT45;
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * 0.3 * flare * uGlowIntensity;
  m *= smoothstep(1.0, 0.2, d);
  return m;
}

vec3 StarLayer(vec2 uv) {
  vec3 col = vec3(0.0);
  vec2 gv = fract(uv) - 0.5;
  vec2 id = floor(uv);
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 si = id + vec2(float(x), float(y));
      float seed = Hash21(si);
      float size = fract(seed * 345.32);
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;
      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;
      float grn = min(red, blu) * seed;
      vec3 base = vec3(red, grn, blu);
      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
      hue = fract(hue + uHueShift / 360.0);
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
      float val = max(max(base.r, base.g), base.b);
      base = hsv2rgb(vec3(hue, sat, val));
      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;
      float star = Star(gv - offset - pad, flareSize);
      vec3 color = base;
      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);
      star *= twinkle;
      col += star * size * color;
    }
  }
  return col;
}

void main() {
  vec2 focalPx = uFocal * uResolution.xy;
  vec2 uv = (gl_FragCoord.xy - focalPx) / uResolution.y;
  vec2 mouseNorm = uMouse - vec2(0.5);

  if (uAutoCenterRepulsion > 0.0) {
    vec2 centerUV = vec2(0.0, 0.0);
    float centerDist = length(uv - centerUV);
    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));
    uv += repulsion * 0.05;
  } else if (uMouseRepulsion) {
    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
    float mouseDist = length(uv - mousePosUV);
    vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));
    uv += repulsion * 0.05 * uMouseActiveFactor;
  } else {
    vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;
    uv += mouseOffset;
  }

  float autoRotAngle = uTime * uRotationSpeed;
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
  uv = autoRot * uv;
  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;

  vec3 col = vec3(0.0);
  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
    float depth = fract(i + uStarSpeed * uSpeed);
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
    float fade = depth * smoothstep(1.0, 0.9, depth);
    col += StarLayer(uv * scale + i * 453.32) * fade;
  }

  gl_FragColor = vec4(col, 1.0);
}
`;

type GalaxySettings = {
  density: number;
  glowIntensity: number;
  speed: number;
  twinkleIntensity: number;
  rotationSpeed: number;
  repulsionStrength: number;
  mouseRepulsion: boolean;
};

type GalaxyCanvasProps = GalaxySettings;

type GLContext = WebGLRenderingContext;

const compileShader = (
  gl: GLContext,
  type: number,
  source: string
) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

const createProgram = (
  gl: GLContext,
  vertexSource: string,
  fragmentSource: string
) => {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertexShader || !fragmentShader) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  return program;
};

const RangeControl = ({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) => {
  const displayValue = Number(value).toFixed(step < 1 ? 2 : 0);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between font-outfit">
        <label className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-medium">
          {label}
        </label>
        <span className="text-xs text-neutral-900 dark:text-neutral-200 font-outfit tabular-nums bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 rounded">
          {displayValue}
        </span>
      </div>
      <div className="px-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(parseFloat(event.target.value))}
          className="w-full accent-neutral-900 dark:accent-white"
        />
      </div>
    </div>
  );
};

const GalaxyCanvas = ({
  density,
  glowIntensity,
  speed,
  twinkleIntensity,
  rotationSpeed,
  repulsionStrength,
  mouseRepulsion,
}: GalaxyCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mouseTargetRef = useRef({ x: 0.5, y: 0.5 });
  const mouseCurrentRef = useRef({ x: 0.5, y: 0.5 });
  const mouseActiveRef = useRef(false);
  const mouseActiveFactorRef = useRef(0);
  const settingsRef = useRef<GalaxySettings>({
    density,
    glowIntensity,
    speed,
    twinkleIntensity,
    rotationSpeed,
    repulsionStrength,
    mouseRepulsion,
  });
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    settingsRef.current = {
      density,
      glowIntensity,
      speed,
      twinkleIntensity,
      rotationSpeed,
      repulsionStrength,
      mouseRepulsion,
    };
  }, [density, glowIntensity, speed, twinkleIntensity, rotationSpeed, repulsionStrength, mouseRepulsion]);

  const updatePointer = useCallback((event: React.PointerEvent) => {
    if (!canvasRef.current || !containerRef.current) return;
    const bounds = containerRef.current.getBoundingClientRect();
    const pointerX = event.clientX - bounds.left;
    const pointerY = event.clientY - bounds.top;
    mouseTargetRef.current = {
      x: pointerX / bounds.width,
      y: 1 - pointerY / bounds.height,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      premultipliedAlpha: false,
      antialias: false,
    });
    if (!gl) {
      setIsSupported(false);
      return;
    }

    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    if (!program) {
      setIsSupported(false);
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    if (!positionBuffer) {
      setIsSupported(false);
      return;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const vertices = new Float32Array([
      -1, -1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const positionLocation = gl.getAttribLocation(program, "position");
    if (positionLocation < 0) {
      setIsSupported(false);
      return;
    }
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uniformLocations = {
      uTime: gl.getUniformLocation(program, "uTime"),
      uResolution: gl.getUniformLocation(program, "uResolution"),
      uFocal: gl.getUniformLocation(program, "uFocal"),
      uRotation: gl.getUniformLocation(program, "uRotation"),
      uStarSpeed: gl.getUniformLocation(program, "uStarSpeed"),
      uDensity: gl.getUniformLocation(program, "uDensity"),
      uHueShift: gl.getUniformLocation(program, "uHueShift"),
      uSpeed: gl.getUniformLocation(program, "uSpeed"),
      uMouse: gl.getUniformLocation(program, "uMouse"),
      uGlowIntensity: gl.getUniformLocation(program, "uGlowIntensity"),
      uSaturation: gl.getUniformLocation(program, "uSaturation"),
      uMouseRepulsion: gl.getUniformLocation(program, "uMouseRepulsion"),
      uTwinkleIntensity: gl.getUniformLocation(program, "uTwinkleIntensity"),
      uRotationSpeed: gl.getUniformLocation(program, "uRotationSpeed"),
      uRepulsionStrength: gl.getUniformLocation(program, "uRepulsionStrength"),
      uMouseActiveFactor: gl.getUniformLocation(program, "uMouseActiveFactor"),
      uAutoCenterRepulsion: gl.getUniformLocation(program, "uAutoCenterRepulsion"),
    };

    const startTime = performance.now();

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uniformLocations.uResolution) {
        gl.uniform3f(uniformLocations.uResolution, canvas.width, canvas.height, 0);
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const renderFrame = (now: number) => {
      const settings = settingsRef.current;
      const elapsed = (now - startTime) * 0.001;

      // Smooth mouse active factor
      const targetActiveFactor = mouseActiveRef.current ? 1 : 0;
      mouseActiveFactorRef.current += (targetActiveFactor - mouseActiveFactorRef.current) * 0.05;

      // Smooth lerp mouse position
      const lerpFactor = 0.08;
      mouseCurrentRef.current.x += (mouseTargetRef.current.x - mouseCurrentRef.current.x) * lerpFactor;
      mouseCurrentRef.current.y += (mouseTargetRef.current.y - mouseCurrentRef.current.y) * lerpFactor;

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      if (uniformLocations.uTime) {
        gl.uniform1f(uniformLocations.uTime, elapsed);
      }
      if (uniformLocations.uFocal) {
        gl.uniform2f(uniformLocations.uFocal, 0.5, 0.5);
      }
      if (uniformLocations.uRotation) {
        gl.uniform2f(uniformLocations.uRotation, 1.0, 0.0);
      }
      if (uniformLocations.uStarSpeed) {
        gl.uniform1f(uniformLocations.uStarSpeed, elapsed * settings.speed * 0.5);
      }
      if (uniformLocations.uDensity) {
        gl.uniform1f(uniformLocations.uDensity, settings.density);
      }
      if (uniformLocations.uHueShift) {
        gl.uniform1f(uniformLocations.uHueShift, 0.0);
      }
      if (uniformLocations.uSpeed) {
        gl.uniform1f(uniformLocations.uSpeed, settings.speed);
      }
      if (uniformLocations.uMouse) {
        gl.uniform2f(
          uniformLocations.uMouse,
          mouseCurrentRef.current.x,
          mouseCurrentRef.current.y
        );
      }
      if (uniformLocations.uGlowIntensity) {
        gl.uniform1f(uniformLocations.uGlowIntensity, settings.glowIntensity);
      }
      if (uniformLocations.uSaturation) {
        gl.uniform1f(uniformLocations.uSaturation, 1.0);
      }
      if (uniformLocations.uMouseRepulsion) {
        gl.uniform1i(uniformLocations.uMouseRepulsion, settings.mouseRepulsion ? 1 : 0);
      }
      if (uniformLocations.uTwinkleIntensity) {
        gl.uniform1f(uniformLocations.uTwinkleIntensity, settings.twinkleIntensity);
      }
      if (uniformLocations.uRotationSpeed) {
        gl.uniform1f(uniformLocations.uRotationSpeed, settings.rotationSpeed);
      }
      if (uniformLocations.uRepulsionStrength) {
        gl.uniform1f(uniformLocations.uRepulsionStrength, settings.repulsionStrength);
      }
      if (uniformLocations.uMouseActiveFactor) {
        gl.uniform1f(uniformLocations.uMouseActiveFactor, mouseActiveFactorRef.current);
      }
      if (uniformLocations.uAutoCenterRepulsion) {
        gl.uniform1f(uniformLocations.uAutoCenterRepulsion, 0.0);
      }

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!prefersReducedMotion) {
        animationFrameRef.current = requestAnimationFrame(renderFrame);
      }
    };

    renderFrame(performance.now());

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerMove={updatePointer}
      onPointerEnter={() => {
        mouseActiveRef.current = true;
      }}
      onPointerLeave={() => {
        mouseActiveRef.current = false;
      }}
      className="w-full h-[500px] relative rounded-3xl border border-neutral-200 dark:border-white/10 bg-black overflow-hidden shadow-sm"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {!isSupported && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-white/70">
          WebGL is required to view this demo.
        </div>
      )}
    </div>
  );
};

function generateGalaxyHTML(settings: {
  density: number;
  glowIntensity: number;
  speed: number;
  twinkleIntensity: number;
  rotationSpeed: number;
  repulsionStrength: number;
  mouseRepulsion: boolean;
}) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Galaxy</title>
<style>
  * { margin: 0; padding: 0; }
  body { background: #000; overflow: hidden; }
  canvas { display: block; width: 100vw; height: 100vh; }
</style>
</head>
<body>
<canvas id="c"></canvas>
<script>
const canvas = document.getElementById('c');
const gl = canvas.getContext('webgl', {
  alpha: false,
  premultipliedAlpha: false,
  antialias: false
});

if (!gl) {
  document.body.innerHTML = '<p style="color:#fff;text-align:center;margin-top:40vh">WebGL is required to view this demo.</p>';
  throw new Error('WebGL not supported');
}

// --- Shader sources ---

const vertexSource = \`
precision highp float;
attribute vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
\`;

const fragmentSource = \`
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform vec2 uMouse;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform bool uMouseRepulsion;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uRepulsionStrength;
uniform float uMouseActiveFactor;
uniform float uAutoCenterRepulsion;

#define NUM_LAYER 4.0
#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
#define PERIOD 3.0

float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float tri(float x) {
  return abs(fract(x) * 2.0 - 1.0);
}

float tris(float x) {
  float t = fract(x);
  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));
}

float trisn(float x) {
  float t = fract(x);
  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float Star(vec2 uv, float flare) {
  float d = length(uv);
  float m = (0.05 * uGlowIntensity) / d;
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * flare * uGlowIntensity;
  uv *= MAT45;
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * 0.3 * flare * uGlowIntensity;
  m *= smoothstep(1.0, 0.2, d);
  return m;
}

vec3 StarLayer(vec2 uv) {
  vec3 col = vec3(0.0);
  vec2 gv = fract(uv) - 0.5;
  vec2 id = floor(uv);
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 si = id + vec2(float(x), float(y));
      float seed = Hash21(si);
      float size = fract(seed * 345.32);
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;
      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;
      float grn = min(red, blu) * seed;
      vec3 base = vec3(red, grn, blu);
      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
      hue = fract(hue + uHueShift / 360.0);
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
      float val = max(max(base.r, base.g), base.b);
      base = hsv2rgb(vec3(hue, sat, val));
      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;
      float star = Star(gv - offset - pad, flareSize);
      vec3 color = base;
      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);
      star *= twinkle;
      col += star * size * color;
    }
  }
  return col;
}

void main() {
  vec2 focalPx = uFocal * uResolution.xy;
  vec2 uv = (gl_FragCoord.xy - focalPx) / uResolution.y;
  vec2 mouseNorm = uMouse - vec2(0.5);

  if (uAutoCenterRepulsion > 0.0) {
    vec2 centerUV = vec2(0.0, 0.0);
    float centerDist = length(uv - centerUV);
    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));
    uv += repulsion * 0.05;
  } else if (uMouseRepulsion) {
    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
    float mouseDist = length(uv - mousePosUV);
    vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));
    uv += repulsion * 0.05 * uMouseActiveFactor;
  } else {
    vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;
    uv += mouseOffset;
  }

  float autoRotAngle = uTime * uRotationSpeed;
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
  uv = autoRot * uv;
  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;

  vec3 col = vec3(0.0);
  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
    float depth = fract(i + uStarSpeed * uSpeed);
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
    float fade = depth * smoothstep(1.0, 0.9, depth);
    col += StarLayer(uv * scale + i * 453.32) * fade;
  }

  gl_FragColor = vec4(col, 1.0);
}
\`;

// --- Compile shaders ---

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  console.error('Program link error:', gl.getProgramInfoLog(program));
}

gl.useProgram(program);
gl.deleteShader(vertexShader);
gl.deleteShader(fragmentShader);

// --- Fullscreen quad geometry ---

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
  -1, -1,  1, -1,  1, 1,
  -1, -1,  1,  1, -1, 1
]), gl.STATIC_DRAW);

const positionLoc = gl.getAttribLocation(program, 'position');
gl.enableVertexAttribArray(positionLoc);
gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

// --- Uniform locations ---

const loc = {
  uTime: gl.getUniformLocation(program, 'uTime'),
  uResolution: gl.getUniformLocation(program, 'uResolution'),
  uFocal: gl.getUniformLocation(program, 'uFocal'),
  uRotation: gl.getUniformLocation(program, 'uRotation'),
  uStarSpeed: gl.getUniformLocation(program, 'uStarSpeed'),
  uDensity: gl.getUniformLocation(program, 'uDensity'),
  uHueShift: gl.getUniformLocation(program, 'uHueShift'),
  uSpeed: gl.getUniformLocation(program, 'uSpeed'),
  uMouse: gl.getUniformLocation(program, 'uMouse'),
  uGlowIntensity: gl.getUniformLocation(program, 'uGlowIntensity'),
  uSaturation: gl.getUniformLocation(program, 'uSaturation'),
  uMouseRepulsion: gl.getUniformLocation(program, 'uMouseRepulsion'),
  uTwinkleIntensity: gl.getUniformLocation(program, 'uTwinkleIntensity'),
  uRotationSpeed: gl.getUniformLocation(program, 'uRotationSpeed'),
  uRepulsionStrength: gl.getUniformLocation(program, 'uRepulsionStrength'),
  uMouseActiveFactor: gl.getUniformLocation(program, 'uMouseActiveFactor'),
  uAutoCenterRepulsion: gl.getUniformLocation(program, 'uAutoCenterRepulsion')
};

// --- Configuration (from slider values) ---

const config = {
  density: ${settings.density},
  glowIntensity: ${settings.glowIntensity},
  speed: ${settings.speed},
  twinkleIntensity: ${settings.twinkleIntensity},
  rotationSpeed: ${settings.rotationSpeed},
  repulsionStrength: ${settings.repulsionStrength},
  mouseRepulsion: ${settings.mouseRepulsion}
};

// --- Mouse tracking ---

let mouseTarget = { x: 0.5, y: 0.5 };
let mouseCurrent = { x: 0.5, y: 0.5 };
let mouseActive = false;
let mouseActiveFactor = 0;

canvas.addEventListener('mousemove', function(e) {
  const rect = canvas.getBoundingClientRect();
  mouseTarget.x = (e.clientX - rect.left) / rect.width;
  mouseTarget.y = 1 - (e.clientY - rect.top) / rect.height;
});

canvas.addEventListener('mouseenter', function() {
  mouseActive = true;
});

canvas.addEventListener('mouseleave', function() {
  mouseActive = false;
});

// --- Resize handler ---

function resize() {
  const dpr = Math.min(window.devicePixelRatio, 2);
  canvas.width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
  canvas.height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
  gl.viewport(0, 0, canvas.width, canvas.height);
}

window.addEventListener('resize', resize);
resize();

// --- Render loop ---

const startTime = performance.now();

function render(now) {
  const elapsed = (now - startTime) * 0.001;

  // Smooth mouse active factor
  const targetFactor = mouseActive ? 1 : 0;
  mouseActiveFactor += (targetFactor - mouseActiveFactor) * 0.05;

  // Smooth lerp mouse position
  mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.08;
  mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.08;

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.uniform1f(loc.uTime, elapsed);
  gl.uniform3f(loc.uResolution, canvas.width, canvas.height, 0);
  gl.uniform2f(loc.uFocal, 0.5, 0.5);
  gl.uniform2f(loc.uRotation, 1.0, 0.0);
  gl.uniform1f(loc.uStarSpeed, elapsed * config.speed * 0.5);
  gl.uniform1f(loc.uDensity, config.density);
  gl.uniform1f(loc.uHueShift, 0.0);
  gl.uniform1f(loc.uSpeed, config.speed);
  gl.uniform2f(loc.uMouse, mouseCurrent.x, mouseCurrent.y);
  gl.uniform1f(loc.uGlowIntensity, config.glowIntensity);
  gl.uniform1f(loc.uSaturation, 1.0);
  gl.uniform1i(loc.uMouseRepulsion, config.mouseRepulsion ? 1 : 0);
  gl.uniform1f(loc.uTwinkleIntensity, config.twinkleIntensity);
  gl.uniform1f(loc.uRotationSpeed, config.rotationSpeed);
  gl.uniform1f(loc.uRepulsionStrength, config.repulsionStrength);
  gl.uniform1f(loc.uMouseActiveFactor, mouseActiveFactor);
  gl.uniform1f(loc.uAutoCenterRepulsion, 0.0);

  gl.drawArrays(gl.TRIANGLES, 0, 6);
  requestAnimationFrame(render);
}

requestAnimationFrame(render);
</script>
</body>
</html>`;
}

export default function GalaxyPage() {
  const [density, setDensity] = useState(1.0);
  const [glowIntensity, setGlowIntensity] = useState(0.3);
  const [speed, setSpeed] = useState(1.0);
  const [twinkleIntensity, setTwinkleIntensity] = useState(0.3);
  const [rotationSpeed, setRotationSpeed] = useState(0.1);
  const [repulsionStrength, setRepulsionStrength] = useState(2.0);
  const [mouseRepulsion, setMouseRepulsion] = useState(true);

  const codeTabs = useMemo(() => {
    const htmlCode = generateGalaxyHTML({
      density,
      glowIntensity,
      speed,
      twinkleIntensity,
      rotationSpeed,
      repulsionStrength,
      mouseRepulsion,
    });

    return [{ label: "HTML", language: "html", code: htmlCode }];
  }, [density, glowIntensity, speed, twinkleIntensity, rotationSpeed, repulsionStrength, mouseRepulsion]);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-neutral-50 dark:bg-black pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-32">
          <TransitionLink
            href="/labs"
            back
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Back to Labs
          </TransitionLink>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-12 mb-12 md:mb-20">
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-outfit font-bold text-neutral-900 dark:text-white tracking-tight leading-[1.1]">
                Galaxy
              </h1>
              <p className="mt-4 text-lg md:text-xl text-neutral-600 dark:text-white/60 max-w-2xl leading-relaxed">
                Immersive 3D galaxy visualization with interactive star systems,
                nebulae, and cosmic particles. Navigate through space.
              </p>
            </div>
            <div className="hidden md:flex flex-col gap-4 text-right">
              <div>
                <span className="font-outfit text-[10px] font-medium text-neutral-400 dark:text-white/30 uppercase tracking-wider block mb-1">
                  Status
                </span>
                <span className="font-outfit text-sm text-neutral-700 dark:text-white/70">
                  Live
                </span>
              </div>
              <div>
                <span className="font-outfit text-[10px] font-medium text-neutral-400 dark:text-white/30 uppercase tracking-wider block mb-1">
                  Category
                </span>
                <span className="font-outfit text-sm text-neutral-700 dark:text-white/70">
                  Motion / Performance
                </span>
              </div>
              <div>
                <span className="font-outfit text-[10px] font-medium text-neutral-400 dark:text-white/30 uppercase tracking-wider block mb-1">
                  Last Updated
                </span>
                <span className="font-outfit text-sm text-neutral-700 dark:text-white/70">
                  Mar 2026
                </span>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-6 font-outfit">
            <GalaxyCanvas
              density={density}
              glowIntensity={glowIntensity}
              speed={speed}
              twinkleIntensity={twinkleIntensity}
              rotationSpeed={rotationSpeed}
              repulsionStrength={repulsionStrength}
              mouseRepulsion={mouseRepulsion}
            />
            <div className="w-full rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/50 p-8 md:p-10 shadow-sm">
              <div className="flex items-center justify-between mb-8 border-b border-neutral-200 dark:border-white/5 pb-6">
                <h2 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-widest">
                  Configuration
                </h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Active
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <RangeControl
                  label="Star Density"
                  min={0.5}
                  max={3.0}
                  step={0.1}
                  value={density}
                  onChange={setDensity}
                />
                <RangeControl
                  label="Glow Intensity"
                  min={0.0}
                  max={1.0}
                  step={0.05}
                  value={glowIntensity}
                  onChange={setGlowIntensity}
                />
                <RangeControl
                  label="Speed"
                  min={0.1}
                  max={3.0}
                  step={0.1}
                  value={speed}
                  onChange={setSpeed}
                />
                <RangeControl
                  label="Twinkle Intensity"
                  min={0.0}
                  max={1.0}
                  step={0.05}
                  value={twinkleIntensity}
                  onChange={setTwinkleIntensity}
                />
                <RangeControl
                  label="Rotation Speed"
                  min={0.0}
                  max={0.5}
                  step={0.01}
                  value={rotationSpeed}
                  onChange={setRotationSpeed}
                />
                <RangeControl
                  label="Repulsion Strength"
                  min={0.0}
                  max={5.0}
                  step={0.1}
                  value={repulsionStrength}
                  onChange={setRepulsionStrength}
                />
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <label className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-medium">
                      Mouse Repulsion
                    </label>
                    <span className="text-xs text-neutral-900 dark:text-neutral-200 font-outfit bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 rounded uppercase">
                      {mouseRepulsion ? "On" : "Off"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMouseRepulsion((current) => !current)}
                    className={`w-14 h-8 rounded-full relative transition-colors duration-300 ease-in-out border shrink-0 ${
                      mouseRepulsion
                        ? "bg-neutral-900 dark:bg-white border-transparent"
                        : "bg-neutral-200 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full absolute top-1 shadow-sm transition-transform duration-300 ease-in-out ${
                        mouseRepulsion
                          ? "translate-x-7 bg-white dark:bg-black"
                          : "translate-x-1 bg-white dark:bg-neutral-400"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
            <CodePanel tabs={codeTabs} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
