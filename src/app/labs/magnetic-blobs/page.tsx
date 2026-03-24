"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CodePanel from "@/components/CodePanel";

const MAX_BLOBS = 50;

const vertexShaderSource = `#version 300 es
precision highp float;
layout(location = 0) in vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `#version 300 es
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iMouse;
uniform vec3 iColor;
uniform vec3 iCursorColor;
uniform float iAnimationSize;
uniform int iBlobCount;
uniform float iCursorBlobSize;
uniform vec3 iMagneticBlobs[50];
uniform float iClumpFactor;
uniform bool enableTransparency;
out vec4 outColor;
const float PI = 3.14159265359;

float getMagneticBlobValue(vec2 c, float r, vec2 p) {
    vec2 d = p - c;
    float dist2 = dot(d, d);
    return (r * r) / dist2;
}

void main() {
    vec2 fc = gl_FragCoord.xy;
    float scale = iAnimationSize / iResolution.y;
    vec2 coord = (fc - iResolution.xy * 0.5) * scale;
    vec2 mouseW = (iMouse.xy - iResolution.xy * 0.5) * scale;
    float m1 = 0.0;
    for (int i = 0; i < 50; i++) {
        if (i >= iBlobCount) break;
        m1 += getMagneticBlobValue(iMagneticBlobs[i].xy, iMagneticBlobs[i].z, coord);
    }
    float m2 = getMagneticBlobValue(mouseW, iCursorBlobSize, coord);
    float total = m1 + m2;
    float f = smoothstep(-1.0, 1.0, (total - 1.3) / min(1.0, fwidth(total)));
    vec3 cFinal = vec3(0.0);
    if (total > 0.0) {
        float alpha1 = m1 / total;
        float alpha2 = m2 / total;
        cFinal = iColor * alpha1 + iCursorColor * alpha2;
    }
    outColor = vec4(cFinal * f, enableTransparency ? f : 1.0);
}
`;

const vertexShaderSourceWebgl1 = `
precision highp float;
attribute vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderSourceWebgl1 = `
#extension GL_OES_standard_derivatives : enable
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iMouse;
uniform vec3 iColor;
uniform vec3 iCursorColor;
uniform float iAnimationSize;
uniform int iBlobCount;
uniform float iCursorBlobSize;
uniform vec3 iMagneticBlobs[50];
uniform float iClumpFactor;
uniform bool enableTransparency;
const float PI = 3.14159265359;

float getMagneticBlobValue(vec2 c, float r, vec2 p) {
    vec2 d = p - c;
    float dist2 = dot(d, d);
    return (r * r) / dist2;
}

void main() {
    vec2 fc = gl_FragCoord.xy;
    float scale = iAnimationSize / iResolution.y;
    vec2 coord = (fc - iResolution.xy * 0.5) * scale;
    vec2 mouseW = (iMouse.xy - iResolution.xy * 0.5) * scale;
    float m1 = 0.0;
    for (int i = 0; i < 50; i++) {
        if (i >= iBlobCount) break;
        m1 += getMagneticBlobValue(iMagneticBlobs[i].xy, iMagneticBlobs[i].z, coord);
    }
    float m2 = getMagneticBlobValue(mouseW, iCursorBlobSize, coord);
    float total = m1 + m2;
    float f = smoothstep(-1.0, 1.0, (total - 1.3) / min(1.0, fwidth(total)));
    vec3 cFinal = vec3(0.0);
    if (total > 0.0) {
        float alpha1 = m1 / total;
        float alpha2 = m2 / total;
        cFinal = iColor * alpha1 + iCursorColor * alpha2;
    }
    gl_FragColor = vec4(cFinal * f, enableTransparency ? f : 1.0);
}
`;

type BlobSettings = {
  startAngle: number;
  deltaFactor: number;
  baseScale: number;
  toggle: number;
  radius: number;
};

type MagneticBlobCanvasProps = {
  color: string;
  cursorBallColor: string;
  cursorBallSize: number;
  ballCount: number;
  animationSize: number;
  enableMouseInteraction: boolean;
  hoverSmoothness: number;
  clumpFactor: number;
  speed: number;
};

const fract = (value: number) => value - Math.floor(value);

const hexToRgb = (hex: string) => {
  const sanitized = hex.replace("#", "");
  return [
    parseInt(sanitized.slice(0, 2), 16) / 255,
    parseInt(sanitized.slice(2, 4), 16) / 255,
    parseInt(sanitized.slice(4, 6), 16) / 255,
  ];
};

const seedVector = (seed: number) => {
  const values = [0.1031 * seed, 0.103 * seed, 0.0973 * seed].map(fract);
  const mix = [values[1], values[2], values[0]];
  const offset =
    values[0] * (mix[0] + 33.33) +
    values[1] * (mix[1] + 33.33) +
    values[2] * (mix[2] + 33.33);
  return values.map((value) => fract(value + offset));
};

const hashVector = (seed: number[]) => {
  const values = [0.1031 * seed[0], 0.103 * seed[1], 0.0973 * seed[2]].map(
    fract
  );
  const mix = [values[1], values[0], values[2]];
  const offset =
    values[0] * (mix[0] + 33.33) +
    values[1] * (mix[1] + 33.33) +
    values[2] * (mix[2] + 33.33);
  const stepped = values.map((value) => fract(value + offset));
  const first = [stepped[0], stepped[0], stepped[1]];
  const second = [stepped[1], stepped[0], stepped[0]];
  const third = [stepped[2], stepped[1], stepped[0]];
  return first.map((value, index) => fract((value + second[index]) * third[index]));
};

const createBlobSettings = (count: number): BlobSettings[] =>
  Array.from({ length: count }, (_, index) => {
    const seed = seedVector(index + 1);
    const startAngle = seed[0] * (Math.PI * 2);
    const deltaFactor = 0.1 * Math.PI + seed[1] * (0.4 * Math.PI - 0.1 * Math.PI);
    const baseScale = 5 + 5 * seed[1];
    const hashed = hashVector(seed);
    const toggle = Math.floor(2 * hashed[0]);
    const radius = 0.5 + 1.5 * hashed[2];
    return { startAngle, deltaFactor, baseScale, toggle, radius };
  });

type GLContext = WebGLRenderingContext | WebGL2RenderingContext;

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

const MagneticBlobsCanvas = ({
  color,
  cursorBallColor,
  cursorBallSize,
  ballCount,
  animationSize,
  enableMouseInteraction,
  hoverSmoothness,
  clumpFactor,
  speed,
}: MagneticBlobCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const pointerTargetRef = useRef({ x: 0, y: 0 });
  const pointerCurrentRef = useRef({ x: 0, y: 0 });
  const pointerActiveRef = useRef(false);
  const blobSettingsRef = useRef<BlobSettings[]>([]);
  const settingsRef = useRef({
    color,
    cursorBallColor,
    cursorBallSize,
    ballCount,
    animationSize,
    enableMouseInteraction,
    hoverSmoothness,
    clumpFactor,
    speed,
  });
  const colorRgb = useMemo(() => hexToRgb(color), [color]);
  const cursorRgb = useMemo(() => hexToRgb(cursorBallColor), [cursorBallColor]);
  const colorRef = useRef(colorRgb);
  const cursorColorRef = useRef(cursorRgb);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    settingsRef.current = {
      color,
      cursorBallColor,
      cursorBallSize,
      ballCount,
      animationSize,
      enableMouseInteraction,
      hoverSmoothness,
      clumpFactor,
      speed,
    };
  }, [
    color,
    cursorBallColor,
    cursorBallSize,
    ballCount,
    animationSize,
    enableMouseInteraction,
    hoverSmoothness,
    clumpFactor,
    speed,
  ]);

  useEffect(() => {
    colorRef.current = colorRgb;
  }, [colorRgb]);

  useEffect(() => {
    cursorColorRef.current = cursorRgb;
  }, [cursorRgb]);

  useEffect(() => {
    blobSettingsRef.current = createBlobSettings(
      Math.min(ballCount, MAX_BLOBS)
    );
  }, [ballCount]);

  const updatePointer = useCallback((event: React.PointerEvent) => {
    if (!canvasRef.current || !containerRef.current) return;
    const bounds = containerRef.current.getBoundingClientRect();
    const pointerX = event.clientX - bounds.left;
    const pointerY = event.clientY - bounds.top;
    pointerTargetRef.current = {
      x: (pointerX / bounds.width) * canvasRef.current.width,
      y: (1 - pointerY / bounds.height) * canvasRef.current.height,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const webgl2Context = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: false,
    });
    const gl =
      webgl2Context ??
      canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
    if (!gl) {
      setIsSupported(false);
      return;
    }

    const isWebgl2 = Boolean(webgl2Context);
    if (!isWebgl2) {
      const derivatives = gl.getExtension("OES_standard_derivatives");
      if (!derivatives) {
        setIsSupported(false);
        return;
      }
    }

    const program = createProgram(
      gl,
      isWebgl2 ? vertexShaderSource : vertexShaderSourceWebgl1,
      isWebgl2 ? fragmentShaderSource : fragmentShaderSourceWebgl1
    );
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
      iResolution: gl.getUniformLocation(program, "iResolution"),
      iTime: gl.getUniformLocation(program, "iTime"),
      iMouse: gl.getUniformLocation(program, "iMouse"),
      iColor: gl.getUniformLocation(program, "iColor"),
      iCursorColor: gl.getUniformLocation(program, "iCursorColor"),
      iAnimationSize: gl.getUniformLocation(program, "iAnimationSize"),
      iBlobCount: gl.getUniformLocation(program, "iBlobCount"),
      iCursorBlobSize: gl.getUniformLocation(program, "iCursorBlobSize"),
      iMagneticBlobs: gl.getUniformLocation(program, "iMagneticBlobs[0]"),
      iClumpFactor: gl.getUniformLocation(program, "iClumpFactor"),
      enableTransparency: gl.getUniformLocation(program, "enableTransparency"),
    };

    if (
      !uniformLocations.iResolution ||
      !uniformLocations.iMouse ||
      !uniformLocations.iColor ||
      !uniformLocations.iCursorColor ||
      !uniformLocations.iAnimationSize ||
      !uniformLocations.iBlobCount ||
      !uniformLocations.iCursorBlobSize ||
      !uniformLocations.iMagneticBlobs ||
      !uniformLocations.enableTransparency
    ) {
      setIsSupported(false);
      return;
    }

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const magneticBlobBuffer = new Float32Array(MAX_BLOBS * 3);
    const startTime = performance.now();

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width));
      canvas.height = Math.max(1, Math.floor(height));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform3f(uniformLocations.iResolution, canvas.width, canvas.height, 0);
      pointerTargetRef.current = {
        x: canvas.width * 0.5,
        y: canvas.height * 0.5,
      };
      pointerCurrentRef.current = {
        x: canvas.width * 0.5,
        y: canvas.height * 0.5,
      };
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const renderFrame = (now: number) => {
      const settings = settingsRef.current;
      const count = Math.min(settings.ballCount, MAX_BLOBS);
      if (blobSettingsRef.current.length !== count) {
        blobSettingsRef.current = createBlobSettings(count);
      }

      const elapsed = (now - startTime) * 0.001;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      if (uniformLocations.iTime) {
        gl.uniform1f(uniformLocations.iTime, elapsed);
      }
      gl.uniform1f(uniformLocations.iAnimationSize, settings.animationSize);
      gl.uniform1f(uniformLocations.iCursorBlobSize, settings.cursorBallSize);
      if (uniformLocations.iClumpFactor) {
        gl.uniform1f(uniformLocations.iClumpFactor, settings.clumpFactor);
      }
      gl.uniform1i(uniformLocations.iBlobCount, count);
      gl.uniform1i(uniformLocations.enableTransparency, 1);
      gl.uniform3fv(uniformLocations.iColor, colorRef.current);
      gl.uniform3fv(uniformLocations.iCursorColor, cursorColorRef.current);

      const blobSettings = blobSettingsRef.current;
      for (let index = 0; index < count; index += 1) {
        const settingsEntry = blobSettings[index];
        const phase = elapsed * settings.speed * settingsEntry.deltaFactor;
        const angle = settingsEntry.startAngle + phase;
        const cosValue = Math.cos(angle);
        const sinValue = Math.sin(angle + phase * settingsEntry.toggle);
        const offsetX = cosValue * settingsEntry.baseScale * settings.clumpFactor;
        const offsetY = sinValue * settingsEntry.baseScale * settings.clumpFactor;
        const bufferIndex = index * 3;
        magneticBlobBuffer[bufferIndex] = offsetX;
        magneticBlobBuffer[bufferIndex + 1] = offsetY;
        magneticBlobBuffer[bufferIndex + 2] = settingsEntry.radius;
      }
      for (let index = count; index < MAX_BLOBS; index += 1) {
        const bufferIndex = index * 3;
        magneticBlobBuffer[bufferIndex] = 0;
        magneticBlobBuffer[bufferIndex + 1] = 0;
        magneticBlobBuffer[bufferIndex + 2] = 0;
      }
      gl.uniform3fv(uniformLocations.iMagneticBlobs, magneticBlobBuffer);

      let targetX = pointerTargetRef.current.x;
      let targetY = pointerTargetRef.current.y;
      if (!settings.enableMouseInteraction || !pointerActiveRef.current) {
        const centerX = canvas.width * 0.5;
        const centerY = canvas.height * 0.5;
        const radiusX = canvas.width * 0.15;
        const radiusY = canvas.height * 0.15;
        targetX = centerX + Math.cos(elapsed * settings.speed) * radiusX;
        targetY = centerY + Math.sin(elapsed * settings.speed) * radiusY;
      }

      pointerCurrentRef.current.x +=
        (targetX - pointerCurrentRef.current.x) * settings.hoverSmoothness;
      pointerCurrentRef.current.y +=
        (targetY - pointerCurrentRef.current.y) * settings.hoverSmoothness;

      gl.uniform3f(
        uniformLocations.iMouse,
        pointerCurrentRef.current.x,
        pointerCurrentRef.current.y,
        0
      );

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
        pointerActiveRef.current = true;
      }}
      onPointerLeave={() => {
        pointerActiveRef.current = false;
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

export default function MagneticBlobsPage() {
  const [color, setColor] = useState("#390fd2");
  const [ballCount, setBallCount] = useState(15);
  const [speed, setSpeed] = useState(0.3);
  const [animationSize, setAnimationSize] = useState(30);
  const [clumpFactor, setClumpFactor] = useState(1);
  const [enableInteraction, setEnableInteraction] = useState(true);
  const [hoverSmoothness, setHoverSmoothness] = useState(0.15);
  const [cursorBallSize, setCursorBallSize] = useState(2);

  const codeTabs = useMemo(() => {
    const htmlCode = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Magnetic Blobs</title>
<style>
  * { margin: 0; padding: 0; }
  body { background: #000; overflow: hidden; }
  canvas { display: block; width: 100vw; height: 100vh; }
</style>
</head>
<body>
<canvas id="c"></canvas>
<script>
// --- Configuration ---
const COLOR = '${color}';
const BALL_COUNT = ${ballCount};
const SPEED = ${speed};
const ANIMATION_SIZE = ${animationSize};
const CLUMP_FACTOR = ${clumpFactor};
const ENABLE_INTERACTION = ${enableInteraction};
const HOVER_SMOOTHNESS = ${hoverSmoothness};
const CURSOR_BALL_SIZE = ${cursorBallSize};
const MAX_BLOBS = 50;

// --- WebGL2 Shaders ---
const vertexShaderSource2 = \`#version 300 es
precision highp float;
layout(location = 0) in vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
\`;

const fragmentShaderSource2 = \`#version 300 es
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iMouse;
uniform vec3 iColor;
uniform vec3 iCursorColor;
uniform float iAnimationSize;
uniform int iBlobCount;
uniform float iCursorBlobSize;
uniform vec3 iMagneticBlobs[50];
uniform float iClumpFactor;
uniform bool enableTransparency;
out vec4 outColor;

float getMagneticBlobValue(vec2 c, float r, vec2 p) {
    vec2 d = p - c;
    float dist2 = dot(d, d);
    return (r * r) / dist2;
}

void main() {
    vec2 fc = gl_FragCoord.xy;
    float scale = iAnimationSize / iResolution.y;
    vec2 coord = (fc - iResolution.xy * 0.5) * scale;
    vec2 mouseW = (iMouse.xy - iResolution.xy * 0.5) * scale;
    float m1 = 0.0;
    for (int i = 0; i < 50; i++) {
        if (i >= iBlobCount) break;
        m1 += getMagneticBlobValue(iMagneticBlobs[i].xy, iMagneticBlobs[i].z, coord);
    }
    float m2 = getMagneticBlobValue(mouseW, iCursorBlobSize, coord);
    float total = m1 + m2;
    float f = smoothstep(-1.0, 1.0, (total - 1.3) / min(1.0, fwidth(total)));
    vec3 cFinal = vec3(0.0);
    if (total > 0.0) {
        float alpha1 = m1 / total;
        float alpha2 = m2 / total;
        cFinal = iColor * alpha1 + iCursorColor * alpha2;
    }
    outColor = vec4(cFinal * f, enableTransparency ? f : 1.0);
}
\`;

// --- WebGL1 Fallback Shaders ---
const vertexShaderSource1 = \`
precision highp float;
attribute vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
\`;

const fragmentShaderSource1 = \`
#extension GL_OES_standard_derivatives : enable
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iMouse;
uniform vec3 iColor;
uniform vec3 iCursorColor;
uniform float iAnimationSize;
uniform int iBlobCount;
uniform float iCursorBlobSize;
uniform vec3 iMagneticBlobs[50];
uniform float iClumpFactor;
uniform bool enableTransparency;

float getMagneticBlobValue(vec2 c, float r, vec2 p) {
    vec2 d = p - c;
    float dist2 = dot(d, d);
    return (r * r) / dist2;
}

void main() {
    vec2 fc = gl_FragCoord.xy;
    float scale = iAnimationSize / iResolution.y;
    vec2 coord = (fc - iResolution.xy * 0.5) * scale;
    vec2 mouseW = (iMouse.xy - iResolution.xy * 0.5) * scale;
    float m1 = 0.0;
    for (int i = 0; i < 50; i++) {
        if (i >= iBlobCount) break;
        m1 += getMagneticBlobValue(iMagneticBlobs[i].xy, iMagneticBlobs[i].z, coord);
    }
    float m2 = getMagneticBlobValue(mouseW, iCursorBlobSize, coord);
    float total = m1 + m2;
    float f = smoothstep(-1.0, 1.0, (total - 1.3) / min(1.0, fwidth(total)));
    vec3 cFinal = vec3(0.0);
    if (total > 0.0) {
        float alpha1 = m1 / total;
        float alpha2 = m2 / total;
        cFinal = iColor * alpha1 + iCursorColor * alpha2;
    }
    gl_FragColor = vec4(cFinal * f, enableTransparency ? f : 1.0);
}
\`;

// --- Utility Functions ---
function hexToRgb(hex) {
  const s = hex.replace('#', '');
  return [
    parseInt(s.slice(0, 2), 16) / 255,
    parseInt(s.slice(2, 4), 16) / 255,
    parseInt(s.slice(4, 6), 16) / 255,
  ];
}

function fract(v) {
  return v - Math.floor(v);
}

function seedVector(seed) {
  const values = [0.1031 * seed, 0.103 * seed, 0.0973 * seed].map(fract);
  const mix = [values[1], values[2], values[0]];
  const offset =
    values[0] * (mix[0] + 33.33) +
    values[1] * (mix[1] + 33.33) +
    values[2] * (mix[2] + 33.33);
  return values.map(v => fract(v + offset));
}

function hashVector(seed) {
  const values = [0.1031 * seed[0], 0.103 * seed[1], 0.0973 * seed[2]].map(fract);
  const mix = [values[1], values[0], values[2]];
  const offset =
    values[0] * (mix[0] + 33.33) +
    values[1] * (mix[1] + 33.33) +
    values[2] * (mix[2] + 33.33);
  const stepped = values.map(v => fract(v + offset));
  const first = [stepped[0], stepped[0], stepped[1]];
  const second = [stepped[1], stepped[0], stepped[0]];
  const third = [stepped[2], stepped[1], stepped[0]];
  return first.map((v, i) => fract((v + second[i]) * third[i]));
}

function createBlobSettings(count) {
  const settings = [];
  for (let i = 0; i < count; i++) {
    const seed = seedVector(i + 1);
    const startAngle = seed[0] * (Math.PI * 2);
    const deltaFactor = 0.1 * Math.PI + seed[1] * (0.4 * Math.PI - 0.1 * Math.PI);
    const baseScale = 5 + 5 * seed[1];
    const hashed = hashVector(seed);
    const toggle = Math.floor(2 * hashed[0]);
    const radius = 0.5 + 1.5 * hashed[2];
    settings.push({ startAngle, deltaFactor, baseScale, toggle, radius });
  }
  return settings;
}

// --- WebGL Setup ---
const canvas = document.getElementById('c');
const webgl2 = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: false });
const gl = webgl2 || canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });

if (!gl) {
  document.body.innerHTML = '<p style="color:#fff;text-align:center;margin-top:40vh">WebGL is not supported.</p>';
  throw new Error('WebGL not supported');
}

const isWebgl2 = Boolean(webgl2);
if (!isWebgl2) {
  const ext = gl.getExtension('OES_standard_derivatives');
  if (!ext) {
    document.body.innerHTML = '<p style="color:#fff;text-align:center;margin-top:40vh">Required WebGL extensions not available.</p>';
    throw new Error('OES_standard_derivatives not supported');
  }
}

// --- Shader Compilation ---
function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl, vSrc, fSrc) {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vSrc);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fSrc);
  if (!vs || !fs) return null;
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  return program;
}

const program = createProgram(
  gl,
  isWebgl2 ? vertexShaderSource2 : vertexShaderSource1,
  isWebgl2 ? fragmentShaderSource2 : fragmentShaderSource1
);
gl.useProgram(program);

// --- Geometry ---
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
  -1, -1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1
]), gl.STATIC_DRAW);
const posLoc = gl.getAttribLocation(program, 'position');
gl.enableVertexAttribArray(posLoc);
gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

// --- Uniforms ---
const u = {
  iResolution: gl.getUniformLocation(program, 'iResolution'),
  iTime: gl.getUniformLocation(program, 'iTime'),
  iMouse: gl.getUniformLocation(program, 'iMouse'),
  iColor: gl.getUniformLocation(program, 'iColor'),
  iCursorColor: gl.getUniformLocation(program, 'iCursorColor'),
  iAnimationSize: gl.getUniformLocation(program, 'iAnimationSize'),
  iBlobCount: gl.getUniformLocation(program, 'iBlobCount'),
  iCursorBlobSize: gl.getUniformLocation(program, 'iCursorBlobSize'),
  iMagneticBlobs: gl.getUniformLocation(program, 'iMagneticBlobs[0]'),
  iClumpFactor: gl.getUniformLocation(program, 'iClumpFactor'),
  enableTransparency: gl.getUniformLocation(program, 'enableTransparency'),
};

gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

// --- State ---
const colorRgb = hexToRgb(COLOR);
const blobSettings = createBlobSettings(Math.min(BALL_COUNT, MAX_BLOBS));
const blobBuffer = new Float32Array(MAX_BLOBS * 3);
const pointerTarget = { x: 0, y: 0 };
const pointerCurrent = { x: 0, y: 0 };
let pointerActive = false;
const startTime = performance.now();

// --- Mouse Tracking ---
canvas.addEventListener('pointermove', (e) => {
  const rect = canvas.getBoundingClientRect();
  pointerTarget.x = ((e.clientX - rect.left) / rect.width) * canvas.width;
  pointerTarget.y = (1 - (e.clientY - rect.top) / rect.height) * canvas.height;
});
canvas.addEventListener('pointerenter', () => { pointerActive = true; });
canvas.addEventListener('pointerleave', () => { pointerActive = false; });

// --- Resize ---
function resize() {
  canvas.width = Math.max(1, Math.floor(window.innerWidth));
  canvas.height = Math.max(1, Math.floor(window.innerHeight));
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.uniform3f(u.iResolution, canvas.width, canvas.height, 0);
  pointerTarget.x = canvas.width * 0.5;
  pointerTarget.y = canvas.height * 0.5;
  pointerCurrent.x = canvas.width * 0.5;
  pointerCurrent.y = canvas.height * 0.5;
}

const resizeObserver = new ResizeObserver(resize);
resizeObserver.observe(canvas);
resize();

// --- Animation Loop ---
function frame(now) {
  const count = Math.min(BALL_COUNT, MAX_BLOBS);
  const elapsed = (now - startTime) * 0.001;

  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  if (u.iTime) gl.uniform1f(u.iTime, elapsed);
  gl.uniform1f(u.iAnimationSize, ANIMATION_SIZE);
  gl.uniform1f(u.iCursorBlobSize, CURSOR_BALL_SIZE);
  if (u.iClumpFactor) gl.uniform1f(u.iClumpFactor, CLUMP_FACTOR);
  gl.uniform1i(u.iBlobCount, count);
  gl.uniform1i(u.enableTransparency, 1);
  gl.uniform3fv(u.iColor, colorRgb);
  gl.uniform3fv(u.iCursorColor, colorRgb);

  for (let i = 0; i < count; i++) {
    const s = blobSettings[i];
    const phase = elapsed * SPEED * s.deltaFactor;
    const angle = s.startAngle + phase;
    const cosVal = Math.cos(angle);
    const sinVal = Math.sin(angle + phase * s.toggle);
    const bi = i * 3;
    blobBuffer[bi] = cosVal * s.baseScale * CLUMP_FACTOR;
    blobBuffer[bi + 1] = sinVal * s.baseScale * CLUMP_FACTOR;
    blobBuffer[bi + 2] = s.radius;
  }
  for (let i = count; i < MAX_BLOBS; i++) {
    const bi = i * 3;
    blobBuffer[bi] = 0;
    blobBuffer[bi + 1] = 0;
    blobBuffer[bi + 2] = 0;
  }
  gl.uniform3fv(u.iMagneticBlobs, blobBuffer);

  let targetX = pointerTarget.x;
  let targetY = pointerTarget.y;
  if (!ENABLE_INTERACTION || !pointerActive) {
    const cx = canvas.width * 0.5;
    const cy = canvas.height * 0.5;
    const rx = canvas.width * 0.15;
    const ry = canvas.height * 0.15;
    targetX = cx + Math.cos(elapsed * SPEED) * rx;
    targetY = cy + Math.sin(elapsed * SPEED) * ry;
  }

  pointerCurrent.x += (targetX - pointerCurrent.x) * HOVER_SMOOTHNESS;
  pointerCurrent.y += (targetY - pointerCurrent.y) * HOVER_SMOOTHNESS;

  gl.uniform3f(u.iMouse, pointerCurrent.x, pointerCurrent.y, 0);
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
<\/script>
</body>
</html>`;

    return [{ label: "HTML", language: "html", code: htmlCode }];
  }, [color, ballCount, speed, animationSize, clumpFactor, enableInteraction, hoverSmoothness, cursorBallSize]);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-neutral-50 dark:bg-black pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-32">
          <Link
            href="/labs"
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Back to Labs
          </Link>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-12 mb-12 md:mb-20">
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-outfit font-bold text-neutral-900 dark:text-white tracking-tight leading-[1.1]">
                Magnetic Blobs
              </h1>
              <p className="mt-4 text-lg md:text-xl text-neutral-600 dark:text-white/60 max-w-2xl leading-relaxed">
                Interactive magnetic blobs simulation with WebGL. Smooth,
                weighty motion with subtle cursor interaction.
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
                  Motion
                </span>
              </div>
              <div>
                <span className="font-outfit text-[10px] font-medium text-neutral-400 dark:text-white/30 uppercase tracking-wider block mb-1">
                  Last Updated
                </span>
                <span className="font-outfit text-sm text-neutral-700 dark:text-white/70">
                  Jan 2026
                </span>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-6 font-outfit">
            <MagneticBlobsCanvas
              color={color}
              cursorBallColor={color}
              cursorBallSize={cursorBallSize}
              ballCount={ballCount}
              animationSize={animationSize}
              enableMouseInteraction={enableInteraction}
              hoverSmoothness={hoverSmoothness}
              clumpFactor={clumpFactor}
              speed={speed}
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
                <div className="flex flex-col gap-3">
                  <label className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-medium">
                    Color
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="relative group shrink-0">
                      <div
                        className="w-10 h-10 rounded-full border border-neutral-200 dark:border-white/20 shadow-sm overflow-hidden"
                        style={{ backgroundColor: color }}
                      >
                        <input
                          type="color"
                          value={color}
                          onChange={(event) => setColor(event.target.value)}
                          className="w-[150%] h-[150%] -ml-[25%] -mt-[25%] absolute cursor-pointer opacity-0"
                        />
                      </div>
                    </div>
                    <span className="text-xs text-neutral-900 dark:text-neutral-200 font-outfit uppercase tracking-wide">
                      {color}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <label className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-medium">
                      Interaction
                    </label>
                    <span className="text-xs text-neutral-900 dark:text-neutral-200 font-outfit bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 rounded uppercase">
                      {enableInteraction ? "On" : "Off"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEnableInteraction((current) => !current)}
                    className={`w-14 h-8 rounded-full relative transition-colors duration-300 ease-in-out border shrink-0 ${
                      enableInteraction
                        ? "bg-neutral-900 dark:bg-white border-transparent"
                        : "bg-neutral-200 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full absolute top-1 shadow-sm transition-transform duration-300 ease-in-out ${
                        enableInteraction
                          ? "translate-x-7 bg-white dark:bg-black"
                          : "translate-x-1 bg-white dark:bg-neutral-400"
                      }`}
                    />
                  </button>
                </div>
                <RangeControl
                  label="Blob Count"
                  min={2}
                  max={30}
                  value={ballCount}
                  onChange={setBallCount}
                />
                <RangeControl
                  label="Simulation Speed"
                  min={0.1}
                  max={1}
                  step={0.1}
                  value={speed}
                  onChange={setSpeed}
                />
                <RangeControl
                  label="Base Scale"
                  min={10}
                  max={50}
                  value={animationSize}
                  onChange={setAnimationSize}
                />
                <RangeControl
                  label="Clump Factor"
                  min={0.1}
                  max={2}
                  step={0.1}
                  value={clumpFactor}
                  onChange={setClumpFactor}
                />
                <RangeControl
                  label="Cursor Smoothing"
                  min={0.001}
                  max={0.25}
                  step={0.001}
                  value={hoverSmoothness}
                  onChange={setHoverSmoothness}
                />
                <RangeControl
                  label="Cursor Size"
                  min={1}
                  max={5}
                  step={0.1}
                  value={cursorBallSize}
                  onChange={setCursorBallSize}
                />
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
