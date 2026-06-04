"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

const techNodes = [
  {
    id: "react", label: "React",
    color: "#61DAFB",
    description: "Component-based UI architecture with virtual DOM diffing. Renders at 60fps even under heavy state updates.",
    metrics: { renderSpeed: "97", seoScore: "82", bundleSize: "42kb", loadTime: "1.2s" },
  },
  {
    id: "nextjs", label: "Next.js",
    color: "#FFFFFF",
    description: "Hybrid SSR + ISR with automatic code splitting. Sub-second page loads via incremental static regeneration.",
    metrics: { renderSpeed: "99", seoScore: "98", bundleSize: "68kb", loadTime: "0.4s" },
  },
  {
    id: "nodejs", label: "Node.js",
    color: "#339933",
    description: "Event-driven, non-blocking I/O runtime. Handles 10K+ concurrent connections with sub-millisecond latency.",
    metrics: { renderSpeed: "—", seoScore: "—", bundleSize: "—", loadTime: "—" },
  },
  {
    id: "gsap", label: "GSAP",
    color: "#88CE02",
    description: "GPU-accelerated timeline engine. 120fps scroll-triggered narratives with zero layout thrashing.",
    metrics: { renderSpeed: "120", seoScore: "95", bundleSize: "28kb", loadTime: "0.6s" },
  },
  {
    id: "framer", label: "Framer Motion",
    color: "#0055FF",
    description: "Declarative gesture and layout animation. Shared layoutId morphs create liquid-like UI transitions.",
    metrics: { renderSpeed: "60", seoScore: "90", bundleSize: "35kb", loadTime: "0.8s" },
  },
  {
    id: "webgl", label: "WebGL",
    color: "#990000",
    description: "GPU-accelerated 3D/2D rendering via OpenGL ES. Millions of particles at 60fps on mobile hardware.",
    metrics: { renderSpeed: "60", seoScore: "—", bundleSize: "—", loadTime: "—" },
  },
  {
    id: "tailwind", label: "Tailwind",
    color: "#06B6D4",
    description: "Utility-first atomic CSS. Zero-runtime, purged builds under 10kb with consistent design tokens.",
    metrics: { renderSpeed: "—", seoScore: "99", bundleSize: "8kb", loadTime: "0.1s" },
  },
  {
    id: "threejs", label: "Three.js",
    color: "#000000",
    description: "High-level WebGL wrapper for 3D scenes. Post-processing pipelines with bloom, DOF, and SSR.",
    metrics: { renderSpeed: "60", seoScore: "—", bundleSize: "—", loadTime: "—" },
  },
  {
    id: "typescript", label: "TypeScript",
    color: "#3178C6",
    description: "Static type-checking layer on JavaScript. Catches 40% of runtime bugs at compile time.",
    metrics: { renderSpeed: "—", seoScore: "—", bundleSize: "—", loadTime: "—" },
  },
  {
    id: "canvas2d", label: "Canvas 2D",
    color: "#E34F26",
    description: "Immediate-mode rasterization for high-frequency visual updates. Ideal for physics and data viz.",
    metrics: { renderSpeed: "120", seoScore: "—", bundleSize: "—", loadTime: "—" },
  },
];

/* ── Physics Particles ── */
class PNode {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = (Math.random() - 0.5) * 1.5;
    this.r = 38;
  }
}

class Spark {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 0.5) * 4;
    this.life = 1;
    this.decay = 0.02 + Math.random() * 0.03;
    this.r = 1.5 + Math.random() * 1.5;
  }
}

function resolveCollision(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy);
  const minDist = a.r + b.r;
  if (dist >= minDist || dist === 0) return null;

  const nx = dx / dist;
  const ny = dy / dist;
  const overlap = minDist - dist;
  const t = a.r + b.r;

  a.x -= nx * overlap * (b.r / t);
  a.y -= ny * overlap * (b.r / t);
  b.x += nx * overlap * (a.r / t);
  b.y += ny * overlap * (a.r / t);

  const dvx = a.vx - b.vx;
  const dvy = a.vy - b.vy;
  const dot = dvx * nx + dvy * ny;
  if (dot > 0) return null;

  const imp = (2 * dot) / (t || 1);
  a.vx -= imp * b.r * nx;
  a.vy -= imp * b.r * ny;
  b.vx += imp * a.r * nx;
  b.vy += imp * a.r * ny;

  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

export default function MomoBlueprint() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [hovered, setHovered] = useState(null);
  const nodesRef = useRef([]);
  const sparksRef = useRef([]);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const activeRef = useRef(null);
  const frameCount = useRef(0);

  useEffect(() => { activeRef.current = hovered; }, [hovered]);

  /* ── Measure ── */
  useEffect(() => {
    const measure = () => {
      if (sectionRef.current) {
        const r = sectionRef.current.getBoundingClientRect();
        setSize({ w: r.width, h: r.height });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* ── Init + persistent physics + render loop ── */
  useEffect(() => {
    if (!size.w || !size.h) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Spawn nodes in a rectangular centered area
    const cx = size.w / 2;
    const cy = size.h / 2;
    const halfW = 360;
    const halfH = 260;
    const cols = 5;
    const rows = Math.ceil(techNodes.length / cols);
    const gapX = (halfW * 2 - 80) / (cols - 1 || 1);
    const gapY = (halfH * 2 - 80) / (rows - 1 || 1);
    const spawnLeft = cx - halfW + 40;
    const spawnTop = cy - halfH + 40;

    nodesRef.current = techNodes.map((t, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      return new PNode(
        t.id,
        spawnLeft + col * gapX + (Math.random() - 0.5) * 10,
        spawnTop + row * gapY + (Math.random() - 0.5) * 10,
      );
    });

    const physicsLeft = cx - halfW;
    const physicsRight = cx + halfW;
    const physicsTop = cy - halfH;
    const physicsBottom = cy + halfH;

    const nodes = nodesRef.current;
    const sparks = sparksRef.current;
    const damping = 0.992;
    const maxSpd = 2.5;
    let running = true;

    const loop = () => {
      if (!running) return;
      rafRef.current = requestAnimationFrame(loop);
      frameCount.current++;

      // Random nudges every ~40 frames
      if (frameCount.current % 40 === 0) {
        for (const n of nodes) {
          n.vx += (Math.random() - 0.5) * 0.3;
          n.vy += (Math.random() - 0.5) * 0.3;
        }
      }

      // Physics
      for (const n of nodes) {
        if (n === dragRef.current) continue;
        n.vx *= damping;
        n.vy *= damping;
        const spd = Math.hypot(n.vx, n.vy);
        if (spd > maxSpd) { n.vx = (n.vx / spd) * maxSpd; n.vy = (n.vy / spd) * maxSpd; }
        if (spd < 0.3 && spd > 0.01 && frameCount.current % 40 === 0) {
          n.vx += (Math.random() - 0.5) * 0.2;
          n.vy += (Math.random() - 0.5) * 0.2;
        }
        n.x += n.vx;
        n.y += n.vy;
        if (n.x - n.r < physicsLeft) { n.x = physicsLeft + n.r; n.vx *= -0.85; }
        if (n.x + n.r > physicsRight) { n.x = physicsRight - n.r; n.vx *= -0.85; }
        if (n.y - n.r < physicsTop) { n.y = physicsTop + n.r; n.vy *= -0.85; }
        if (n.y + n.r > physicsBottom) { n.y = physicsBottom - n.r; n.vy *= -0.85; }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const hit = resolveCollision(nodes[i], nodes[j]);
          if (hit) {
            for (let s = 0; s < 8; s++) sparks.push(new Spark(hit.x, hit.y));
          }
        }
      }

      // Update sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.decay;
        if (s.life <= 0) sparks.splice(i, 1);
      }

      // ── Draw ──
      ctx.clearRect(0, 0, size.w, size.h);

      // Grid
      ctx.strokeStyle = "rgba(255,255,255,0.015)";
      ctx.lineWidth = 1;
      const gs = 40;
      for (let x = 0; x <= size.w; x += gs) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, size.h); ctx.stroke(); }
      for (let y = 0; y <= size.h; y += gs) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(size.w, y); ctx.stroke(); }

      // Rectangular boundary ring
      ctx.strokeStyle = "rgba(0,255,224,0.06)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 6]);
      ctx.strokeRect(physicsLeft, physicsTop, physicsRight - physicsLeft, physicsBottom - physicsTop);
      ctx.setLineDash([]);

      const activeId = activeRef.current;

      // Connection line to right panel
      if (activeId) {
        const an = nodes.find(n => n.id === activeId);
        if (an) {
          const tech = techNodes.find(t => t.id === activeId);
          const color = tech?.color || "#00FFE0";
          const tx = size.w - 210;
          const ty = size.h / 2;

          ctx.beginPath();
          ctx.arc(an.x, an.y, an.r + 12, 0, Math.PI * 2);
          ctx.fillStyle = `${color}08`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(an.x, an.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.shadowColor = color;
          ctx.shadowBlur = 24;
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.beginPath();
          ctx.moveTo(an.x, an.y);
          ctx.lineTo(tx, ty);
          ctx.strokeStyle = `${color}25`;
          ctx.lineWidth = 1.5;
          ctx.setLineDash([5, 7]);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.beginPath();
          ctx.moveTo(an.x, an.y);
          ctx.lineTo(tx, ty);
          ctx.strokeStyle = `${color}08`;
          ctx.lineWidth = 10;
          ctx.stroke();
        }
      }

      // Sparks
      for (const s of sparks) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,224,${s.life * 0.8})`;
        ctx.fill();
      }

      // Badges
      for (const n of nodes) {
        const tech = techNodes.find(t => t.id === n.id);
        const isActive = n.id === activeId;
        const color = tech?.color || "#888";

        if (isActive) {
          ctx.save();
          ctx.translate(n.x, n.y);
          ctx.scale(1.12, 1.12);
          ctx.translate(-n.x, -n.y);
        }

        // Glow ring
        if (isActive) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 8, 0, Math.PI * 2);
          ctx.fillStyle = `${color}12`;
          ctx.fill();
        }

      // Circle badge
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? `${color}15` : "rgba(255,255,255,0.025)";
      ctx.fill();
      ctx.strokeStyle = isActive ? `${color}60` : "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Label
      ctx.fillStyle = isActive ? "#FFFFFF" : "rgba(255,255,255,0.5)";
      ctx.font = "600 12px 'Inter', system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(tech?.label || "", n.x, n.y);

        if (isActive) ctx.restore();
      }
    };

    loop();
    return () => { running = false; cancelAnimationFrame(rafRef.current); };
  }, [size]);

  /* ── Hover detection ── */
  const dragRef = useRef(null);
  const lastMouseRef = useRef({ x: 0, y: 0, time: 0 });

  /* ── Hover + Drag detection ── */
  const getPos = useCallback((e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    const t = e.touches ? e.touches[0] : e;
    return { x: t.clientX - rect.left, y: t.clientY - rect.top };
  }, []);

  const findNodeAt = useCallback((x, y) => {
    const nodes = nodesRef.current;
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i];
      const dx = x - n.x;
      const dy = y - n.y;
      if (dx * dx + dy * dy <= (n.r + 8) * (n.r + 8)) return n;
    }
    return null;
  }, []);

  const onPointerDown = useCallback((e) => {
    const pos = getPos(e);
    const node = findNodeAt(pos.x, pos.y);
    if (node) {
      dragRef.current = node;
      node.vx = 0;
      node.vy = 0;
      lastMouseRef.current = { x: pos.x, y: pos.y, time: performance.now() };
      setHovered(node.id);
    }
  }, [getPos, findNodeAt]);

  const onPointerMove = useCallback((e) => {
    const pos = getPos(e);
    const dragNode = dragRef.current;

    if (dragNode) {
      // Track velocity for flick on release
      const now = performance.now();
      const dt = now - lastMouseRef.current.time;
      if (dt > 0) {
        dragNode.vx = (pos.x - lastMouseRef.current.x) * 0.6;
        dragNode.vy = (pos.y - lastMouseRef.current.y) * 0.6;
      }
      lastMouseRef.current = { x: pos.x, y: pos.y, time: now };

      // Clamp within rectangular boundary
      const hw = 360;
      const hh = 260;
      const l = size.w / 2 - hw;
      const r = size.w / 2 + hw;
      const t = size.h / 2 - hh;
      const b = size.h / 2 + hh;
      dragNode.x = Math.min(Math.max(pos.x, l + dragNode.r), r - dragNode.r);
      dragNode.y = Math.min(Math.max(pos.y, t + dragNode.r), b - dragNode.r);
    } else {
      // Hover detection
      mouseRef.current = pos;
      const nodes = nodesRef.current;
      let found = null;
      for (const n of nodes) {
        const dx = pos.x - n.x;
        const dy = pos.y - n.y;
        if (dx * dx + dy * dy <= (n.r + 6) * (n.r + 6)) {
          found = n.id;
          break;
        }
      }
      setHovered(found);
    }
  }, [getPos, size]);

  const onPointerUp = useCallback(() => {
    const node = dragRef.current;
    if (node) {
      // Flick: cap velocity so it doesn't fly off wildly
      const spd = Math.hypot(node.vx, node.vy);
      if (spd > 6) { node.vx = (node.vx / spd) * 6; node.vy = (node.vy / spd) * 6; }
      dragRef.current = null;
    }
  }, []);

  const activeData = useMemo(() => {
    if (!hovered) return null;
    return techNodes.find(t => t.id === hovered) || null;
  }, [hovered]);

  return (
    <section ref={sectionRef} className="relative w-full h-[100svh] bg-[#030305] overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 w-[60vw] max-w-[500px] aspect-square bg-gradient-to-br from-[#00FFE0]/5 via-blue-500/5 to-transparent rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1.12, 1, 1.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/4 -right-1/4 w-[50vw] max-w-[400px] aspect-square bg-gradient-to-tl from-purple-500/5 via-pink-500/5 to-transparent rounded-full blur-[100px]"
        />
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={size.w}
        height={size.h}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={onPointerUp}
        onMouseLeave={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerUp}
      />

      {/* Right info panel */}
      <div className="absolute top-0 right-0 w-full sm:max-w-sm lg:max-w-md h-full z-20 p-4 sm:p-6 lg:p-8 flex items-center pointer-events-none">
        <div className="pointer-events-auto w-full">
          <div className="backdrop-blur-2xl bg-[#0a0a0a]/60 border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-[0_16px_48px_rgba(0,0,0,0.5)] h-auto min-h-[300px] flex flex-col overflow-hidden">
            {activeData ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: activeData.color, boxShadow: `0 0 10px ${activeData.color}` }}
                  />
                  <span
                    className="text-xs font-bold tracking-[0.2em] uppercase"
                    style={{ color: activeData.color }}
                  >
                    {activeData.label}
                  </span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  {activeData.description}
                </p>
                {activeData.metrics.renderSpeed !== "—" ? (
                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    {Object.entries(activeData.metrics).filter(([, v]) => v !== "—").map(([key, val]) => (
                      <div key={key} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                        <div className="text-white/30 text-[clamp(0.6rem,1vw,0.7rem)] font-medium uppercase tracking-wider mb-1">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </div>
                        <div className="text-white text-sm font-bold tracking-tight">{val}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-auto border-t border-white/[0.04] pt-4">
                    <span className="text-white/20 text-xs font-medium tracking-wider">
                      HOVER ANOTHER NODE
                    </span>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2 h-2 rounded-full bg-white/20 shrink-0" />
                  <span className="text-white/30 text-xs font-bold tracking-[0.2em] uppercase">
                    ARCHITECTURE MATRIX
                  </span>
                </div>
                <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-black text-white mb-3 leading-tight tracking-tight">
                  Zero Templates. <br />Pure Engineering.
                </h2>
                <p className="text-white/40 text-sm leading-relaxed mt-auto">
                  Hover over any architectural component to see how we build digital experiences
                  that run at 120Hz and scale infinitely.
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.04]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FFE0]/40 animate-pulse" />
          <span className="text-white/20 text-xs font-medium tracking-wider">PHYSICS CANVAS</span>
        </div>
      </div>
    </section>
  );
}
