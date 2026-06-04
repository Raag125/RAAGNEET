"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  TECH-STACK BLUEPRINT & CAPABILITIES MATRIX
 *  Elite Physics-Driven Interactive Node Canvas
 * ═══════════════════════════════════════════════════════════════════════════
 */

const TECH_NODES = [
  {
    id: "react",
    label: "React",
    color: "#00FFE0",
    radius: 45,
    mass: 1,
    data: {
      title: "React Architecture",
      subtitle: "Component-Driven Scalability",
      description: "We architect resilient React ecosystems using strict composition patterns. Our codebases are infinitely scalable, completely decoupled, and heavily optimized for zero-waste re-renders.",
      metrics: [
        { label: "Re-render Waste", value: "0%" },
        { label: "Component Reusability", value: "98%" }
      ]
    }
  },
  {
    id: "gsap",
    label: "GSAP",
    color: "#8b5cf6",
    radius: 40,
    mass: 0.9,
    data: {
      title: "GreenSock Animation",
      subtitle: "Cinematic Motion Control",
      description: "We leverage GSAP's sub-millisecond precision to orchestrate complex timeline sequences. Motion isn't an afterthought—it's the core narrative driver of the user experience.",
      metrics: [
        { label: "Frame Rate", value: "120Hz" },
        { label: "Scroll Interpolation", value: "Native" }
      ]
    }
  },
  {
    id: "next",
    label: "Next.js",
    color: "#ffffff",
    radius: 48,
    mass: 1.1,
    data: {
      title: "Next.js Edge Runtime",
      subtitle: "Sub-Second Global Delivery",
      description: "By exploiting React Server Components and Edge routing, we deliver heavy interactive applications with near-zero initial JavaScript payload and perfect SEO scores.",
      metrics: [
        { label: "LCP Score", value: "<0.8s" },
        { label: "Lighthouse Performance", value: "100" }
      ]
    }
  },
  {
    id: "webgl",
    label: "WebGL",
    color: "#ec4899",
    radius: 45,
    mass: 1,
    data: {
      title: "WebGL / Three.js",
      subtitle: "Immersive 3D Experiences",
      description: "We break the boundaries of the 2D DOM by integrating hardware-accelerated WebGL environments, creating spatial computing experiences right in the browser.",
      metrics: [
        { label: "Draw Calls", value: "Optimized" },
        { label: "GPU Acceleration", value: "Active" }
      ]
    }
  },
  {
    id: "tailwind",
    label: "Tailwind",
    color: "#3b82f6",
    radius: 42,
    mass: 0.95,
    data: {
      title: "Tailwind CSS",
      subtitle: "Atomic Utility Styling",
      description: "Our styling architecture relies on atomic, zero-runtime CSS. We maintain pixel-perfect design systems without the bloat of traditional stylesheets.",
      metrics: [
        { label: "CSS Bundle Size", value: "<10kb" },
        { label: "Design System", value: "Strict" }
      ]
    }
  }
];

export default function TechStack() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Physics state mutable references for requestAnimationFrame
  const physicsNodes = useRef([]);
  const dragState = useRef({ active: false, nodeId: null, startX: 0, startY: 0 });

  // Initialize Physics Nodes
  useEffect(() => {
    const width = containerRef.current?.clientWidth || 800;
    const height = containerRef.current?.clientHeight || 600;

    physicsNodes.current = TECH_NODES.map((node, i) => ({
      ...node,
      x: width / 2 + (Math.random() - 0.5) * 200,
      y: height / 2 + (Math.random() - 0.5) * 200,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      ref: React.createRef() // To manipulate DOM element
    }));

    setIsInitialized(true);
  }, []);

  // Physics Engine Loop
  useEffect(() => {
    if (!isInitialized) return;
    let animationFrameId;
    let canvasCtx = canvasRef.current?.getContext('2d');

    const updatePhysics = () => {
      if (!containerRef.current || !canvasRef.current || !canvasCtx) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      // Ensure canvas size matches container
      if (canvasRef.current.width !== width || canvasRef.current.height !== height) {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }

      const nodes = physicsNodes.current;

      // 1. Calculate positions and boundaries
      nodes.forEach(node => {
        if (dragState.current.nodeId !== node.id) {
          node.x += node.vx;
          node.y += node.vy;

          // Gentle friction
          node.vx *= 0.99;
          node.vy *= 0.99;

          // Gentle pull to center to keep them clustered loosely
          const cx = width / 2;
          const cy = height / 2;
          node.vx += (cx - node.x) * 0.0001;
          node.vy += (cy - node.y) * 0.0001;
        }

        // Wall collisions
        const bounce = 0.8;
        if (node.x - node.radius < 0) { node.x = node.radius; node.vx *= -bounce; }
        if (node.x + node.radius > width) { node.x = width - node.radius; node.vx *= -bounce; }
        if (node.y - node.radius < 0) { node.y = node.radius; node.vy *= -bounce; }
        if (node.y + node.radius > height) { node.y = height - node.radius; node.vy *= -bounce; }
      });

      // 2. Resolve Circle-to-Circle Collisions
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.hypot(dx, dy);
          const minDist = n1.radius + n2.radius + 10; // 10px padding between nodes

          if (dist < minDist && dist > 0) {
            // Overlap resolution
            const overlap = minDist - dist;
            const nx = dx / dist;
            const ny = dy / dist;

            const moveX = (overlap * nx) / 2;
            const moveY = (overlap * ny) / 2;

            if (dragState.current.nodeId !== n1.id) { n1.x -= moveX; n1.y -= moveY; }
            if (dragState.current.nodeId !== n2.id) { n2.x += moveX; n2.y += moveY; }

            // Elastic momentum transfer
            const dvx = n2.vx - n1.vx;
            const dvy = n2.vy - n1.vy;
            const dot = dvx * nx + dvy * ny;

            if (dot < 0) {
              const k = 1.5; // Restitution (bounciness)
              const impulse = -(1 + k) * dot / (1 / n1.mass + 1 / n2.mass);
              n1.vx -= impulse * nx / n1.mass;
              n1.vy -= impulse * ny / n1.mass;
              n2.vx += impulse * nx / n2.mass;
              n2.vy += impulse * ny / n2.mass;
            }
          }
        }
      }

      // 3. Render Canvas Background (Blueprint Grid)
      canvasCtx.clearRect(0, 0, width, height);
      canvasCtx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      canvasCtx.lineWidth = 1;

      // Draw Grid
      const gridSize = 40;
      canvasCtx.beginPath();
      for (let x = 0; x <= width; x += gridSize) { canvasCtx.moveTo(x, 0); canvasCtx.lineTo(x, height); }
      for (let y = 0; y <= height; y += gridSize) { canvasCtx.moveTo(0, y); canvasCtx.lineTo(width, y); }
      canvasCtx.stroke();

      // 4. Render Dynamic Neon Connecting Line if a node is selected
      if (selectedNodeId) {
        const activeNode = nodes.find(n => n.id === selectedNodeId);
        if (activeNode) {
          // Anchor point on the right panel
          const anchorX = width;
          const anchorY = height / 2;

          canvasCtx.beginPath();
          canvasCtx.moveTo(activeNode.x, activeNode.y);
          // Draw a cool high-tech circuit line instead of a straight line
          canvasCtx.lineTo(activeNode.x + (anchorX - activeNode.x) / 2, activeNode.y);
          canvasCtx.lineTo(activeNode.x + (anchorX - activeNode.x) / 2, anchorY);
          canvasCtx.lineTo(anchorX, anchorY);

          canvasCtx.strokeStyle = activeNode.color;
          canvasCtx.lineWidth = 2;
          canvasCtx.setLineDash([5, 5]);
          // Animate the dash
          canvasCtx.lineDashOffset = -(Date.now() / 20) % 10;

          canvasCtx.shadowColor = activeNode.color;
          canvasCtx.shadowBlur = 10;
          canvasCtx.stroke();

          // Reset shadow
          canvasCtx.shadowBlur = 0;
          canvasCtx.setLineDash([]);
        }
      }

      // 5. Update DOM elements directly for hyper-optimized 120Hz performance
      nodes.forEach(node => {
        if (node.ref.current) {
          // Hardware-accelerated 3D transform to prevent paint invalidation
          node.ref.current.style.transform = `translate3d(${node.x - node.radius}px, ${node.y - node.radius}px, 0)`;
        }
      });

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    updatePhysics();
    return () => cancelAnimationFrame(animationFrameId);
  }, [selectedNodeId, isInitialized]);

  // Pointer Event Handlers for Dragging
  const handlePointerDown = (e, node) => {
    e.target.setPointerCapture(e.pointerId);
    dragState.current = {
      active: true,
      nodeId: node.id,
      startX: e.clientX,
      startY: e.clientY,
      nodeStartX: node.x,
      nodeStartY: node.y
    };
    node.vx = 0;
    node.vy = 0;
    setSelectedNodeId(node.id);
  };

  const handlePointerMove = (e) => {
    if (!dragState.current.active) return;
    const node = physicsNodes.current.find(n => n.id === dragState.current.nodeId);
    if (!node) return;

    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;

    // Track velocity based on drag movement for flicking
    node.vx = (node.x - (dragState.current.nodeStartX + dx)) * -0.3;
    node.vy = (node.y - (dragState.current.nodeStartY + dy)) * -0.3;

    node.x = dragState.current.nodeStartX + dx;
    node.y = dragState.current.nodeStartY + dy;
  };

  const handlePointerUp = (e) => {
    if (dragState.current.active) {
      e.target.releasePointerCapture(e.pointerId);
      dragState.current.active = false;
      dragState.current.nodeId = null;
    }
  };

  const activeNodeData = TECH_NODES.find(n => n.id === selectedNodeId)?.data || null;

  return (
    <section className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex flex-col font-sans text-white">

      {/* Header Info */}
      <div className="absolute top-12 left-12 z-20 pointer-events-none">
        <div className="text-[#00FFE0] text-xs font-bold tracking-[0.3em] uppercase mb-2 drop-shadow-[0_0_8px_rgba(0,255,224,0.4)]">
          // Architecture Matrix
        </div>
        <h2 className="text-[clamp(2rem,5vw,2.5rem)] font-black tracking-tight leading-tight">Zero Templates. Pure Engineering.</h2>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row w-full pt-32">

        {/* Left Panel: The Physics Field */}
        <div
          ref={containerRef}
          className="relative flex-1 h-[60vh] lg:h-auto border-r border-white/[0.05]"
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Blueprint Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

          {/* Floating Physics Nodes (DOM Layer) */}
          {physicsNodes.current.map((node) => (
            <div
              key={node.id}
              ref={node.ref}
              onPointerDown={(e) => handlePointerDown(e, node)}
              onMouseEnter={() => setSelectedNodeId(node.id)}
              className="absolute top-0 left-0 flex items-center justify-center cursor-grab active:cursor-grabbing will-change-transform touch-none select-none"
              style={{
                width: node.radius * 2,
                height: node.radius * 2,
                borderRadius: '50%',
                background: 'rgba(10, 10, 10, 0.6)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: `1px solid ${selectedNodeId === node.id ? node.color : 'rgba(255,255,255,0.1)'}`,
                boxShadow: selectedNodeId === node.id ? `0 0 20px ${node.color}40, inset 0 0 10px ${node.color}20` : '0 8px 32px rgba(0,0,0,0.5)',
                transition: 'border-color 0.3s, box-shadow 0.3s'
              }}
            >
              <span
                className="font-bold text-sm tracking-wide"
                style={{ color: selectedNodeId === node.id ? node.color : '#ffffff' }}
              >
                {node.label}
              </span>
            </div>
          ))}
        </div>

        {/* Right Panel: The Data Feed */}
        <div className="w-full lg:max-w-md xl:max-w-lg bg-[#0a0a0a] p-8 lg:p-12 flex flex-col justify-center relative z-10 border-t lg:border-t-0 border-white/[0.05]">
          <AnimatePresence mode="wait">
            {!activeNodeData ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                className="text-white/40 text-lg font-light leading-relaxed"
              >
                Click or drag any architectural component on the left blueprint to see how we build digital experiences that run at 120Hz and scale infinitely.
              </motion.div>
            ) : (
              <motion.div
                key={selectedNodeId}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col gap-6"
              >
                {/* Dynamic Content Morph Container */}
                <motion.div layoutId="data-card" className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
                  <motion.h3 layoutId="data-title" className="text-[clamp(1.25rem,3vw,1.5rem)] font-black mb-1 text-white">
                    {activeNodeData.title}
                  </motion.h3>
                  <motion.div layoutId="data-subtitle" className="text-sm font-bold tracking-[0.2em] uppercase mb-4" style={{ color: TECH_NODES.find(n => n.id === selectedNodeId)?.color }}>
                    {activeNodeData.subtitle}
                  </motion.div>
                  <motion.p layoutId="data-desc" className="text-white/60 text-sm leading-relaxed mb-8">
                    {activeNodeData.description}
                  </motion.p>

                  <div className="grid grid-cols-2 gap-4">
                    {activeNodeData.metrics.map((metric, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + (idx * 0.1) }}
                        className="bg-black/50 rounded-xl p-4 border border-white/5"
                      >
                        <div className="text-xl font-bold text-white mb-1">{metric.value}</div>
                        <div className="text-[clamp(0.65rem,1.5vw,0.75rem)] uppercase tracking-wider text-white/40">{metric.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
