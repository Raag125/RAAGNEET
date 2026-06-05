"use client";

import React, { useEffect, useRef } from "react";
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

    const snowflakes = Array.from({ length: 200 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 0.5,
      speedY: Math.random() * 1 + 0.5,
      speedX: Math.random() * 0.5 - 0.25,
      opacity: Math.random() * 0.8 + 0.2,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      
      snowflakes.forEach((flake) => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx.fill();

        flake.y += flake.speedY;
        flake.x += flake.speedX + Math.sin(flake.y / 50) * 0.5;

        if (flake.y > canvas.height) {
          flake.y = -flake.radius;
          flake.x = Math.random() * canvas.width;
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
      className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a1128]/80 via-[#1c3f60]/80 to-[#0a1128]/90 mix-blend-screen"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/40 via-transparent to-transparent pointer-events-none" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
      {/* Fractal ice patterns on edges */}
      <div className="absolute inset-0 border-[20px] border-white/5 rounded-3xl blur-xl pointer-events-none mix-blend-overlay" />
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

    const rainDrops = Array.from({ length: 300 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 20 + 10,
      speedY: Math.random() * 10 + 15,
      speedX: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      rainDrops.forEach((drop) => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + drop.speedX, drop.y + drop.length);
        ctx.strokeStyle = `rgba(200, 255, 220, ${drop.opacity})`;
        ctx.lineWidth = 1;
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
      className="absolute inset-0 z-0 bg-[#010103]/95 mix-blend-screen"
    >
      {/* Subtle deep blue/grey tint for storm */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none blur-3xl" />
      
      {/* Dark Storm Clouds at top */}
      <div className="absolute top-0 left-0 w-full h-[40%] overflow-hidden pointer-events-none opacity-60">
        <motion.div 
          animate={{ x: ["-5%", "5%"] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          className="absolute -top-[50%] -left-[20%] w-[150%] h-[150%] bg-[radial-gradient(circle,_rgba(25,30,40,0.8)_0%,_transparent_60%)] blur-[50px]"
        />
        <motion.div 
          animate={{ x: ["5%", "-5%"] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          className="absolute -top-[30%] left-[20%] w-[120%] h-[120%] bg-[radial-gradient(circle,_rgba(15,20,25,0.9)_0%,_transparent_60%)] blur-[60px]"
        />
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />
      
      {/* Mist effect */}
      <motion.div 
        animate={{ x: [-100, 100], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-20 mix-blend-overlay blur-sm" 
      />

      {/* Periodic Lightning Flashes */}
      <motion.div
        animate={{ opacity: [0, 0, 0, 0.4, 0, 0.8, 0, 0] }}
        transition={{ 
          duration: 12, 
          times: [0, 0.85, 0.87, 0.88, 0.90, 0.92, 0.95, 1], 
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 bg-white mix-blend-overlay pointer-events-none"
      />
    </motion.div>
  );
}

function AuroraTheme() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Generate flowing wind streams
    const windStreams = Array.from({ length: 70 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 600 + 300,
      speedX: Math.random() * 12 + 8,
      amplitude: Math.random() * 80 + 20, // How high/low the wave goes
      frequency: Math.random() * 0.003 + 0.001, // How stretched the wave is
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: Math.random() * 0.04 + 0.01, // Speed of the ripple effect
      opacity: Math.random() * 0.3 + 0.05,
      thickness: Math.random() * 10 + 1, // Varying from thin threads to thick bands
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      windStreams.forEach((stream) => {
        ctx.beginPath();
        
        // Draw fluid curved path with natural turbulence
        for (let i = 0; i <= stream.length; i += 15) {
          const currentX = stream.x + i;
          
          // Complex harmonic sine waves for organic air flow
          const primaryWave = Math.sin(currentX * stream.frequency + stream.phase) * stream.amplitude;
          const secondaryWave = Math.sin(currentX * (stream.frequency * 2.3) + stream.phase * 1.5) * (stream.amplitude * 0.4);
          const tertiaryWave = Math.sin(currentX * (stream.frequency * 0.5) - stream.phase) * (stream.amplitude * 0.2);
          
          const currentY = stream.y + primaryWave + secondaryWave + tertiaryWave;
          
          // Taper the thickness at the ends of the wind stream
          const progress = i / stream.length;
          const taper = Math.sin(progress * Math.PI); // 0 at ends, 1 in middle
          
          if (i === 0) {
            ctx.moveTo(currentX, currentY);
          } else {
            ctx.lineTo(currentX, currentY);
          }
        }
        
        // Gradient to make the stream fade out at the edges smoothly
        const grad = ctx.createLinearGradient(stream.x, stream.y, stream.x + stream.length, stream.y);
        grad.addColorStop(0, `rgba(232, 121, 249, 0)`); 
        grad.addColorStop(0.3, `rgba(232, 121, 249, ${stream.opacity * 0.8})`);
        grad.addColorStop(0.5, `rgba(232, 121, 249, ${stream.opacity})`);
        grad.addColorStop(0.7, `rgba(232, 121, 249, ${stream.opacity * 0.8})`);
        grad.addColorStop(1, `rgba(232, 121, 249, 0)`);
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = stream.thickness;
        ctx.lineCap = "round";
        ctx.stroke();

        // Move stream forward
        stream.x += stream.speedX;
        // Evolve phase to make the wave actively ripple
        stream.phase -= stream.phaseSpeed;

        // Reset if it goes off screen
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
      className="absolute inset-0 z-0 bg-[#0a0216]/90 mix-blend-screen"
    >
      {/* Volumetric glow for the wind base */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-900/30 via-purple-900/10 to-transparent pointer-events-none blur-3xl" />
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent pointer-events-none blur-3xl" />
      
      {/* Front Canvas for crisp wavy streaks */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90" />
      
      {/* Fast moving atmospheric mist to complement the wind */}
      <motion.div 
        animate={{ x: [0, window.innerWidth] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-[200%] h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay blur-[2px]" 
      />
    </motion.div>
  );
}
