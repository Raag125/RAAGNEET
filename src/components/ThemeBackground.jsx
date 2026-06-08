"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeBackground() {
  const { theme } = useTheme();

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden transition-all duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
      <AnimatePresence mode="popLayout">
        {theme === "cryo" && <CryoTheme key="cryo" />}
        {theme === "monsoon" && <MonsoonTheme key="monsoon" />}
        {theme === "aurora" && <AuroraTheme key="aurora" />}
      </AnimatePresence>
    </div>
  );
}

function CryoTheme() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Track snow accumulation at the bottom
    const resolution = 10; // Increased width for drastically fewer vertices to render
    let snowLevels = new Array(Math.ceil(canvas.width / resolution)).fill(0).map((_, i) => {
      // Subtle, low-profile snow drift
      const baseHeight = 15;
      const wave1 = Math.sin(i * 0.02) * 15;
      const wave2 = Math.cos(i * 0.05) * 8;
      const wave3 = Math.sin(i * 0.1) * 4;
      return Math.max(5, baseHeight + wave1 + wave2 + wave3);
    });

    const snowflakes = Array.from({ length: 150 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.5 + 0.5,
      speedY: Math.random() * 2 + 1,
      speedX: Math.random() * 1 - 0.5,
      opacity: Math.random() * 0.35 + 0.1, // Reduced opacity so it sits behind text
    }));

    // Pre-calculate gradient to avoid re-instantiation in the render loop
    let snowGrad = ctx.createLinearGradient(0, canvas.height - 150, 0, canvas.height);
    snowGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
    snowGrad.addColorStop(0.3, "rgba(240, 248, 255, 0.98)");
    snowGrad.addColorStop(1, "rgba(220, 240, 255, 1)");

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw falling snow
      snowflakes.forEach((flake) => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx.fill();

        flake.y += flake.speedY;
        flake.x += flake.speedX + Math.sin(flake.y / 50) * 0.5;

        if (flake.x < 0) flake.x = canvas.width;
        if (flake.x > canvas.width) flake.x = 0;

        const colIndex = Math.floor(flake.x / resolution);
        const accumulatedHeight = snowLevels[colIndex] || 0;

        if (flake.y >= canvas.height - accumulatedHeight) {
          if (colIndex >= 0 && colIndex < snowLevels.length) {
            snowLevels[colIndex] += flake.radius * 0.5;
            if (colIndex > 0) snowLevels[colIndex - 1] += flake.radius * 0.25;
            if (colIndex < snowLevels.length - 1) snowLevels[colIndex + 1] += flake.radius * 0.25;
          }
          flake.y = -flake.radius;
          flake.x = Math.random() * canvas.width;
        }
      });

      // 1. Draw Deep Ice Shelf (sharp, translucent cyan)
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let i = 0; i < snowLevels.length; i++) {
        const x = i * resolution;
        const y = canvas.height - (snowLevels[i] * 1.5) - Math.cos(i * 0.15) * 20;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.fillStyle = "rgba(10, 120, 180, 0.15)";
      ctx.fill();

      // 2. Draw Dense Blueish Snow Drift
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let i = 0; i < snowLevels.length; i++) {
        const x = i * resolution;
        const y = canvas.height - (snowLevels[i] * 1.15) - Math.sin(i * 0.08) * 12;
        if (i === 0) ctx.lineTo(x, y);
        else {
          const prevX = (i - 1) * resolution;
          const prevY = canvas.height - (snowLevels[i - 1] * 1.15) - Math.sin((i - 1) * 0.08) * 12;
          ctx.quadraticCurveTo(prevX, prevY, (prevX + x) / 2, (prevY + y) / 2);
        }
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.fillStyle = "rgba(160, 220, 255, 0.6)";
      ctx.fill();

      // 3. Draw Foreground Bright White Fluffy Snow
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let i = 0; i < snowLevels.length; i++) {
        const x = i * resolution;
        const y = canvas.height - snowLevels[i];

        if (i === 0) ctx.lineTo(x, y);
        else {
          const prevX = (i - 1) * resolution;
          const prevY = canvas.height - snowLevels[i - 1];
          ctx.quadraticCurveTo(prevX, prevY, (prevX + x) / 2, (prevY + y) / 2);
        }
      }
      ctx.lineTo(canvas.width, canvas.height - snowLevels[snowLevels.length - 1]);
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.fillStyle = snowGrad;
      ctx.fill();

      // 4. Draw Icy Crust Glow (Rim Lighting on top of the snow)
      ctx.beginPath();
      for (let i = 0; i < snowLevels.length; i++) {
        const x = i * resolution;
        const y = canvas.height - snowLevels[i];
        if (i === 0) ctx.moveTo(x, y);
        else {
          const prevX = (i - 1) * resolution;
          const prevY = canvas.height - snowLevels[i - 1];
          ctx.quadraticCurveTo(prevX, prevY, (prevX + x) / 2, (prevY + y) / 2);
        }
      }
      // Inner cyan frost line
      ctx.strokeStyle = "rgba(100, 240, 255, 0.4)";
      ctx.lineWidth = 5;
      ctx.stroke();
      // Sharp white surface edge
      ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Smooth the snow settling
      for (let i = 0; i < snowLevels.length; i++) {
        if (snowLevels[i] > 0) {
          const left = i > 0 ? snowLevels[i - 1] : snowLevels[i];
          const right = i < snowLevels.length - 1 ? snowLevels[i + 1] : snowLevels[i];
          snowLevels[i] = (snowLevels[i] * 2 + left + right) / 4;
          // Max cap for snow height
          if (snowLevels[i] > 150) snowLevels[i] = 150;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      snowLevels = new Array(Math.ceil(canvas.width / resolution)).fill(0);

      // Re-create gradient on resize
      snowGrad = ctx.createLinearGradient(0, canvas.height - 150, 0, canvas.height);
      snowGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      snowGrad.addColorStop(0.3, "rgba(240, 248, 255, 0.98)");
      snowGrad.addColorStop(1, "rgba(220, 240, 255, 1)");
    };
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 z-0 bg-[#02050A]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-65" />
      {/* Fractal ice patterns on edges (Optimized: Replaced blur-xl with native inset shadow) */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(200,230,255,0.15)] rounded-3xl" />
    </motion.div>
  );
}

function MonsoonTheme() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const rainDrops = Array.from({ length: 150 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 25 + 15,
      speedY: Math.random() * 15 + 20,
      speedX: Math.random() * 3 + 1,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      rainDrops.forEach((drop) => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + drop.speedX, drop.y + drop.length);
        ctx.strokeStyle = `rgba(180, 220, 255, ${drop.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        drop.y += drop.speedY;
        drop.x += drop.speedX;

        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 z-0 bg-[#010102]"
    >
      {/* Deep blue/grey tint for storm */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-[#010102]/80 to-[#010102] pointer-events-none" />

      {/* Dark Storm Clouds at top */}
      <div className="absolute top-0 left-0 w-full h-[60%] overflow-hidden pointer-events-none opacity-90">
        {/* Layer 1: Distant soft clouds */}
        <motion.div
          animate={{ x: ["-10%", "5%"] }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          className="absolute -top-[50%] -left-[20%] w-[150%] h-[150%] bg-[radial-gradient(ellipse,_rgba(30,40,60,0.8)_0%,_transparent_60%)]"
        />
        {/* Layer 2: Midground dark clouds */}
        <motion.div
          animate={{ x: ["5%", "-5%"] }}
          transition={{ duration: 22, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          className="absolute -top-[30%] left-[10%] w-[120%] h-[120%] bg-[radial-gradient(ellipse,_rgba(15,20,35,0.95)_0%,_transparent_70%)]"
        />
        {/* Layer 3: Foreground dense storm clouds */}
        <motion.div
          animate={{ x: ["-2%", "3%"] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[130%] h-[100%] bg-[radial-gradient(ellipse,_rgba(5,10,20,1)_0%,_transparent_80%)]"
        />
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />

      {/* Mist effect */}
      <motion.div
        animate={{ x: [-100, 100], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
        className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-30"
      />

      {/* Intense Lightning Flashes */}
      <motion.div
        animate={{ opacity: [0, 0, 0, 0.8, 0, 0.4, 0, 0] }}
        transition={{
          duration: Math.random() * 5 + 7, // Randomize duration slightly
          times: [0, 0.90, 0.91, 0.92, 0.94, 0.95, 0.97, 1],
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 bg-blue-100 mix-blend-overlay pointer-events-none"
      />
    </motion.div>
  );
}

function AuroraTheme() {
  const canvasRef = useRef(null);
  const speedMultiplierRef = useRef(0.2);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Generate flowing wind streams (whooshing air)
    const windStreams = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 1200 + 600, // Longer streams
      speedX: Math.random() * 30 + 20, // Fast wind speed
      amplitude: Math.random() * 40 + 10,
      frequency: Math.random() * 0.0015 + 0.0005,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: Math.random() * 0.08 + 0.03,
      opacity: Math.random() * 0.15 + 0.02, // very subtle, like air
      thickness: Math.random() * 6 + 1, // Thinner lines
    }));

    // Wind particles/dust for realism
    const particles = Array.from({ length: 250 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: Math.random() * 40 + 15,
      speedY: (Math.random() - 0.5) * 6,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const speedMult = speedMultiplierRef.current;

      // Draw wind particles (dust)
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`; // White/gray dust
        ctx.fill();

        p.x += p.speedX * speedMult;
        p.y += (p.speedY + Math.sin(p.x * 0.02) * 3) * speedMult; // wavy motion

        if (p.x > canvas.width) {
          p.x = -10;
          p.y = Math.random() * canvas.height;
        }
      });

      windStreams.forEach((stream) => {
        ctx.beginPath();

        for (let i = 0; i <= stream.length; i += 25) {
          const currentX = stream.x + i;
          const primaryWave = Math.sin(currentX * stream.frequency + stream.phase) * stream.amplitude;
          const secondaryWave = Math.sin(currentX * (stream.frequency * 3.0) + stream.phase * 1.8) * (stream.amplitude * 0.3);
          const currentY = stream.y + primaryWave + secondaryWave;

          if (i === 0) {
            ctx.moveTo(currentX, currentY);
          } else {
            ctx.lineTo(currentX, currentY);
          }
        }

        // Use transparent white/grey shades for wind
        ctx.strokeStyle = `rgba(255, 255, 255, ${stream.opacity})`;
        ctx.lineWidth = stream.thickness;
        ctx.lineCap = "round";
        ctx.stroke();

        stream.x += stream.speedX * speedMult;
        stream.phase -= stream.phaseSpeed * speedMult;

        if (stream.x > canvas.width) {
          stream.x = -stream.length;
          stream.y = Math.random() * canvas.height;
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 z-0 bg-[#000000]"
    >
      {/* Front Canvas for crisp wavy streaks */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80 mix-blend-screen" />

      {/* Fast moving atmospheric mist to complement the wind */}
      <motion.div
        animate={{ x: [0, window.innerWidth] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-[200%] h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"
      />

      {/* Wind Speed Controls */}
      {mounted && createPortal(
        <div className="fixed top-24 right-4 sm:right-8 z-[9999] flex items-center gap-3 bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-2 rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.5)] pointer-events-auto">
          <button
            onClick={() => { speedMultiplierRef.current = Math.max(0.1, speedMultiplierRef.current - 0.4); }}
            className="px-4 py-1.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            Slower
          </button>
          <div className="w-px h-4 bg-white/20"></div>
          <button
            onClick={() => { speedMultiplierRef.current = Math.min(5.0, speedMultiplierRef.current + 0.4); }}
            className="px-4 py-1.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            Faster
          </button>
        </div>,
        document.body
      )}
    </motion.div>
  );
}

