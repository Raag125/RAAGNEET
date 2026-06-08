'use client';

/**
 * ===========================================================================
 *  IMMERSIVE SCROLL-DRIVEN HERO SECTION
 *  Tech: Next.js + Tailwind CSS + Framer Motion
 *  Features: Pinned Scroll Parallax, 3-Scene Sequence, Auto-Play on Mobile
 * ===========================================================================
 */

import { useRef, useInsertionEffect, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useMotionValueEvent } from 'framer-motion';
import ParticleField from '@/components/animations/ParticleField';
import ThemeBackground from '@/components/ThemeBackground';
import { useTheme } from '@/context/ThemeContext';

// --- SILENCE THREE.JS CLOCK WARNING ------------------------------------------
if (typeof console !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (args[0] && typeof args[0] === 'string' && args[0].includes('THREE.Clock: This module has been deprecated')) {
      return;
    }
    originalWarn(...args);
  };
}
// ----------------------------------------------------------------------------

// --- STYLE INJECTION --------------------------------------------------------
function useInjectHeroStyles() {
  useInsertionEffect(() => {
    const STYLE_ID = 'hero-section-styles-v2';
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(2deg); }
      }
      .animate-float { animation: float 6s ease-in-out infinite; }
      
      .text-glow {
        text-shadow: 0 0 40px rgba(0, 255, 224, 0.3);
      }
      
      .glass-morphism {
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      @keyframes gradient-shift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .animate-gradient {
        background-size: 200% auto;
        animation: gradient-shift 8s linear infinite;
      }
      
      /* Periodic Auto Hover Effects */
      @keyframes auto-glow-text-1 {
        0%, 80%, 100% {
          color: #ffffff;
          -webkit-text-stroke: 0px rgba(0,255,224,0);
          text-shadow: none;
        }
        88%, 92% {
          color: rgba(0, 255, 224, 0);
          -webkit-text-stroke: 2px rgba(0, 255, 224, 0.9);
          text-shadow: 0 0 30px rgba(0, 255, 224, 0.4);
        }
      }
      @keyframes auto-glow-text-2 {
        0%, 80%, 100% {
          color: #ffffff;
          -webkit-text-stroke: 0px rgba(59,130,246,0);
          text-shadow: none;
        }
        88%, 92% {
          color: rgba(59, 130, 246, 0);
          -webkit-text-stroke: 2px rgba(59, 130, 246, 0.9);
      .theme-default-glow {
        transition: all 0.5s ease-in-out;
      }
      .theme-default-glow:hover {
        animation: none !important;
        color: rgba(0, 255, 224, 0) !important;
        -webkit-text-stroke: 2px rgba(0, 255, 224, 0.9) !important;
        text-shadow: 0 0 30px rgba(0, 255, 224, 0.4) !important;
      }
      .theme-default-glow-2 {
        transition: all 0.5s ease-in-out;
      }
      .theme-default-glow-2:hover {
        animation: none !important;
        color: rgba(59, 130, 246, 0) !important;
        -webkit-text-stroke: 2px rgba(59, 130, 246, 0.9) !important;
        text-shadow: 0 0 30px rgba(59, 130, 246, 0.4) !important;
      }
      .auto-glow-1 { 
        animation: auto-glow-text-1 6s ease-in-out infinite; 
      }
      .auto-glow-2 { 
        animation: auto-glow-text-2 6s ease-in-out infinite 0.5s; 
      }

      /* === CRYO: Frozen Ice Text === */
      .theme-cryo-char {
        display: inline-block;
        position: relative;
        padding: 0 0.15em;
        margin: 0 -0.15em;
        /* Deep ice gradient: bright surface cracks -> deep blue ice -> milky frost tip */
        background: linear-gradient(
          180deg,
          #ffffff 0%,
          #e0f7ff 20%,
          #a6e3ff 45%,
          #40bcf0 55%,
          #0b80be 80%,
          #a1e2ff 100%
        ) !important;
        -webkit-background-clip: text !important;
        background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        z-index: 1;
      }
      
      /* FLAWLESS WEBKIT-SAFE 3D EXTRUSION
         Using a pseudo-element with native text-shadow completely eliminates
         the shattered compositor bug caused by filter: drop-shadow. */
      .theme-cryo-char::before {
        content: attr(data-text);
        position: absolute;
        left: 0;
        top: 0;
        padding: 0 0.15em;
        z-index: -1;
        -webkit-text-fill-color: transparent !important;
        text-shadow: 
          0px -1px 0px rgba(255,255,255,0.8),
          0px 2px 0px #0b80be,
          0px 4px 1px rgba(0,80,140,0.8),
          0px 10px 20px rgba(0,0,0,0.95);
        pointer-events: none;
      }
      @keyframes shimmer {
        0% { transform: translateX(-150%) skewX(-15deg); }
        100% { transform: translateX(150%) skewX(-15deg); }
      }
      .animate-shimmer {
        animation: shimmer 2s infinite linear;
      }
      .theme-monsoon-char {
        display: inline-block;
        color: #ffffff;
        filter: drop-shadow(0 3px 6px rgba(100,170,255,0.5));
      }
    `;
    document.head.appendChild(style);
    return () => { const el = document.getElementById(STYLE_ID); if (el) el.remove(); };
  }, []);
}

function ShootingStars() {
  const stars = [
    { id: 1, top: '-10%', left: '20%', delay: 0, duration: 2.5, size: 120 },
    { id: 2, top: '-20%', left: '50%', delay: 1.2, duration: 2.2, size: 150 },
    { id: 3, top: '-5%', left: '80%', delay: 2.5, duration: 2.8, size: 80 },
    { id: 4, top: '10%', left: '110%', delay: 3.5, duration: 2.0, size: 180 },
    { id: 5, top: '30%', left: '120%', delay: 4.8, duration: 2.6, size: 100 },
    { id: 6, top: '50%', left: '130%', delay: 6.0, duration: 3.0, size: 90 },
  ];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute"
          style={{
            top: star.top,
            left: star.left,
            transform: "rotate(135deg)",
          }}
        >
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "200vw", opacity: [0, 1, 1, 0] }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "linear",
            }}
            style={{ width: `${star.size}px` }}
            className="relative h-[1px] bg-gradient-to-r from-transparent to-cyan-200"
          >
            {/* Star Head */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[3px] h-[3px] rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,1)]" />
          </motion.div>
        </div>
      ))}
    </div>
  );
}

function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Deep Base Gradient (Removed to allow global theme to show) */}
      
      {/* Ambient Particle Field */}
      <ParticleField count={120} className="opacity-40" />

      {/* Large Soft Blobs */}
      <div className="absolute inset-0 opacity-40 translate-z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] aspect-square rounded-full" style={{ background: "radial-gradient(circle, rgba(22,78,99,0.5), transparent 70%)" }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] aspect-square rounded-full" style={{ background: "radial-gradient(circle, rgba(30,58,138,0.4), transparent 70%)" }} />
        <div className="absolute top-[20%] right-[10%] w-[40vw] aspect-square rounded-full" style={{ background: "radial-gradient(circle, rgba(88,28,135,0.3), transparent 70%)" }} />
      </div>

      {/* Subtle Aurora Mesh */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          background: "conic-gradient(from 0deg at 50% 50%, rgba(0,255,224,0.1) 0deg, transparent 90deg, rgba(59,130,246,0.1) 180deg, transparent 270deg, rgba(168,85,247,0.1) 360deg)",
          maskImage: "radial-gradient(circle at center, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at center, black, transparent 80%)"
        }}
      />

      {/* Shooting Stars */}
      <ShootingStars />

      {/* Vignette for Focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(1,1,3,0.8)_100%)]" />
    </div>
  );
}

// Rain drip canvas overlay over a text block
function RainDripOverlay() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const drips = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: Math.random() * 3 + 2,
      length: Math.random() * 18 + 8,
      opacity: Math.random() * 0.6 + 0.2,
      width: Math.random() * 1.5 + 0.5,
    }));
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drips.forEach(d => {
        const grad = ctx.createLinearGradient(d.x, d.y, d.x, d.y + d.length);
        grad.addColorStop(0, `rgba(180,220,255,0)`);
        grad.addColorStop(0.5, `rgba(180,220,255,${d.opacity})`);
        grad.addColorStop(1, `rgba(180,220,255,0)`);
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 1, d.y + d.length);
        ctx.strokeStyle = grad;
        ctx.lineWidth = d.width;
        ctx.lineCap = 'round';
        ctx.stroke();
        d.y += d.speed;
        if (d.y > canvas.height) { d.y = -d.length; d.x = Math.random() * canvas.width; }
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ mixBlendMode: 'screen' }} />;
}

// Per-character wind animation
function WindChars({ text }) {
  const chars = text.split('');
  return (
    <span className="inline">
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={{
            y: [0, Math.sin(i * 1.2) * -10, Math.cos(i * 0.8) * 7, Math.sin(i * 0.5) * -5, 0],
            x: [0, (i % 2 === 0 ? 8 : -5), (i % 3 === 0 ? -7 : 4), (i % 2 === 0 ? 5 : -3), 0],
            rotate: [0, i % 2 === 0 ? 3 : -2, i % 3 === 0 ? -2 : 1, 0],
            skewX: [0, i % 2 === 0 ? -8 : 5, 0],
          }}
          transition={{
            duration: 2.5 + (i % 4) * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.04,
          }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </span>
  );
}

function ThemeTextWrapper({ children, theme }) {
  if (!theme || theme === 'default') return <>{children}</>;

  const text = typeof children === 'string' ? children : '';

  if (theme === 'aurora') {
    return <WindChars text={text} />;
  }

  if (theme === 'monsoon') {
    return (
      <span className="relative inline-block">
        <span className="theme-monsoon-char">{children}</span>
        <RainDripOverlay />
      </span>
    );
  }

  if (theme === 'cryo') {
    return (
      <span className="theme-cryo-char" data-text={text}>
        {children}
      </span>
    );
  }

  return <>{children}</>;
}

function HeroOverlay({ scrollProgress }) {
  const { theme } = useTheme();
  const [ripples, setRipples] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollProgress, "change", (latest) => {
    setIsScrolled(latest > 0.05);
  });

  const handleCtaClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 800);
  };

  // ----------------------------------------------------
  // CINEMATIC TIMELINE (Total height: 500vh)
  // 0.00 -> 0.10: Hold Scene 1 (Text stays pinned on screen)
  // 0.10 -> 0.50: Scene 1 Disappears line-by-line
  // 0.50 -> 0.55: The Void (Screen remains empty)
  // 0.55 -> 0.85: Scene 2 Drops in piece-by-piece
  // 0.85 -> 1.00: Hold Scene 2 (Fully visible before unpinning)
  // ----------------------------------------------------

  // Scene 1 Sequential Line-by-Line Exit
  const scene1Visibility = useTransform(scrollProgress, p => p > 0.50 ? 'hidden' : 'visible');
  
  // Line 1: Transform Your Business
  const s1L1Opacity = useTransform(scrollProgress, [0.10, 0.18], [1, 0]);
  const s1L1Y = useTransform(scrollProgress, [0.10, 0.18], [0, -30]);
  const s1L1Visibility = useTransform(scrollProgress, p => p > 0.185 ? 'hidden' : 'visible');

  // Line 2: THE FUTURE OF YOUR
  const s1L2Opacity = useTransform(scrollProgress, [0.18, 0.26], [1, 0]);
  const s1L2Y = useTransform(scrollProgress, [0.18, 0.26], [0, -30]);
  const s1L2Visibility = useTransform(scrollProgress, p => p > 0.265 ? 'hidden' : 'visible');

  // Line 3: DIGITAL
  const s1L3Opacity = useTransform(scrollProgress, [0.26, 0.34], [1, 0]);
  const s1L3Y = useTransform(scrollProgress, [0.26, 0.34], [0, -30]);
  const s1L3Visibility = useTransform(scrollProgress, p => p > 0.345 ? 'hidden' : 'visible');

  // Line 4: PRESENCE
  const s1L4Opacity = useTransform(scrollProgress, [0.34, 0.42], [1, 0]);
  const s1L4Y = useTransform(scrollProgress, [0.34, 0.42], [0, -30]);
  const s1L4Visibility = useTransform(scrollProgress, p => p > 0.425 ? 'hidden' : 'visible');

  // Line 5: Paragraph & Scroll Indicator
  const s1L5Opacity = useTransform(scrollProgress, [0.42, 0.50], [1, 0]);
  const s1L5Y = useTransform(scrollProgress, [0.42, 0.50], [0, -30]);
  const s1L5Visibility = useTransform(scrollProgress, p => p > 0.505 ? 'hidden' : 'visible');

  // Scene 2 Base Wrapper
  const scene2Visibility = useTransform(scrollProgress, p => p < 0.50 || p > 0.95 ? 'hidden' : 'visible');
  
  // Scene 2 Drop Entrance & Exit
  // "READY TO"
  const scene2Text1Opacity = useTransform(scrollProgress, [0.50, 0.58, 0.80, 0.88], [0, 1, 1, 0]);
  const scene2Text1Y = useTransform(scrollProgress, [0.50, 0.58, 0.80, 0.88], [-80, 0, 0, -120]);
  const scene2Text1Scale = useTransform(scrollProgress, [0.50, 0.58, 0.80, 0.88], [1.5, 1, 1, 0.5]);
  const scene2Text1Filter = useTransform(scrollProgress, [0.50, 0.58, 0.80, 0.88], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(20px)"]);

  // "EVOLVE?"
  const scene2Text2Opacity = useTransform(scrollProgress, [0.58, 0.66, 0.82, 0.90], [0, 1, 1, 0]);
  const scene2Text2Y = useTransform(scrollProgress, [0.58, 0.66, 0.82, 0.90], [-80, 0, 0, -120]);
  const scene2Text2Scale = useTransform(scrollProgress, [0.58, 0.66, 0.82, 0.90], [1.5, 1, 1, 0.5]);
  const scene2Text2Filter = useTransform(scrollProgress, [0.58, 0.66, 0.82, 0.90], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(20px)"]);

  // Button
  const scene2BtnOpacity = useTransform(scrollProgress, [0.66, 0.74, 0.84, 0.92], [0, 1, 1, 0]);
  const scene2BtnY = useTransform(scrollProgress, [0.66, 0.74, 0.84, 0.92], [60, 0, 0, 120]);
  const scene2BtnScale = useTransform(scrollProgress, [0.66, 0.74, 0.84, 0.92], [0.95, 1, 1, 0.8]);

  return (
    <div className="relative w-full h-screen flex flex-col z-20">
      <div className="flex-1 flex flex-col items-start justify-center px-6 sm:px-12 lg:px-24 max-w-[1440px] w-full mx-auto relative">

        {/* SCENE 1: Immersive Title */}
        <motion.div
          style={{ visibility: scene1Visibility }}
          /* 
            🛠️ TO MOVE THE ENTIRE HERO BLOCK UP OR DOWN:
            Add 'mt-[-50px]' or 'pt-20' to this className below.
          */
          className="w-full flex flex-col items-start text-left pointer-events-none"
        >
          <motion.div style={{ opacity: s1L1Opacity, y: s1L1Y, visibility: s1L1Visibility }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 mb-1 flex items-center gap-4 relative top-0 sm:top-[55px]"
            >
              <div className="h-[1px] w-12 bg-cyan-400/50" />
              <span className="text-cyan-400 text-xs font-bold tracking-[0.5em] uppercase font-syne pr-2">
                Transform Your Business
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative pointer-events-auto perspective-[1000px] mt-4 sm:mt-[70px]"
          >
            <motion.h1
              className="flex flex-col gap-2 font-bricolage tracking-tighter cursor-default"
            >
              <motion.div
                /* 👇 ADJUST THE VALUE BELOW TO SHIFT "THE FUTURE OF YOUR" RIGHT/LEFT 👇 */
                style={{ opacity: s1L2Opacity, y: s1L2Y, marginLeft: "0px", visibility: s1L2Visibility }}
                className="py-1 overflow-visible"
              >
                <motion.span
                  initial={{ y: 50, rotateX: -30, opacity: 0, filter: "blur(15px)" }}
                  animate={{ y: 0, rotateX: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 } }}
                  style={(!theme || theme === 'default') ? { color: "#ffffff" } : {}}
                  className={`block text-[clamp(2rem,8vw,6.5rem)] leading-[1.05] font-black italic pr-6 ${(!theme || theme === 'default') ? `theme-default-glow ${!isScrolled ? 'auto-glow-1' : ''}` : ''}`}
                >
                  <ThemeTextWrapper theme={theme}>THE FUTURE OF YOUR</ThemeTextWrapper>
                </motion.span>
              </motion.div>
              <motion.div style={{ opacity: s1L3Opacity, y: s1L3Y, visibility: s1L3Visibility }} className="flex items-center gap-4 py-1 overflow-visible">
                <motion.span
                  initial={{ y: 50, rotateX: -30, opacity: 0, filter: "blur(15px)" }}
                  animate={{ y: 0, rotateX: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.55 } }}
                  className="block text-[clamp(2.75rem,12vw,8.5rem)] leading-[1.05] font-black italic pr-8"
                >
                  {(!theme || theme === 'default') && (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient">DIGITAL</span>
                  )}
                  {theme === 'aurora' && <WindChars text="DIGITAL" />}
                  {theme === 'monsoon' && (
                    <span className="relative inline-block">
                      <span className="theme-monsoon-char">DIGITAL</span>
                      <RainDripOverlay />
                    </span>
                  )}
                  {theme === 'cryo' && (
                    <span className="theme-cryo-char" data-text="DIGITAL">DIGITAL</span>
                  )}
                </motion.span>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, delay: 1.2 } }}
                  whileHover={{ scale: 1.5, backgroundColor: "#fff", transition: { duration: 0.4 } }}
                  className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(0,255,224,0.8)] hidden sm:block flex-shrink-0"
                />
              </motion.div>
              <motion.div style={{ opacity: s1L4Opacity, y: s1L4Y, visibility: s1L4Visibility }} className="py-1 overflow-visible">
                <motion.span
                  initial={{ y: 50, rotateX: -30, opacity: 0, filter: "blur(15px)" }}
                  animate={{ y: 0, rotateX: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.7 } }}
                  style={(!theme || theme === 'default') ? { color: "#ffffff" } : {}}
                  className={`block text-[clamp(2.75rem,12vw,8.5rem)] leading-[1.05] font-black italic pr-8 ${(!theme || theme === 'default') ? `theme-default-glow-2 ${!isScrolled ? 'auto-glow-2' : ''}` : ''}`}
                >
                  <ThemeTextWrapper theme={theme}>PRESENCE</ThemeTextWrapper>
                </motion.span>
              </motion.div>
            </motion.h1>
          </motion.div>

          <motion.div style={{ opacity: s1L5Opacity, y: s1L5Y, visibility: s1L5Visibility }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-4 max-w-lg pr-4 overflow-visible"
              /* 
                👇 ADJUST THE VALUE BELOW TO SHIFT THE PARAGRAPH UP/DOWN 👇 
                   Change "0px" to "-20px" to move it UP, or "20px" to move it DOWN!
              */
              style={{ position: "relative", top: "0px" }}
            >
              <p className={`text-lg sm:text-xl font-light font-sans leading-loose py-2 pr-6 overflow-visible ${theme === 'cryo' ? 'text-white font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]' : 'text-white/50'}`}>
                We bridge the gap between imagination and execution, building 
                high-performance digital assets that define the new standard.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* SCENE 2: Call to Action */}
        <motion.div
          style={{
            visibility: scene2Visibility
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[50vw] aspect-square rounded-full -z-10"
            style={{ background: "radial-gradient(circle, rgba(6,182,212,0.15), transparent 70%)", translate: "translateZ(0)" }}
          />

          <h2 className="font-bricolage font-black text-white text-4xl sm:text-6xl md:text-8xl mb-12 tracking-tighter leading-tight italic flex flex-col items-center">
            <motion.span style={{ opacity: scene2Text1Opacity, y: scene2Text1Y, scale: scene2Text1Scale, filter: scene2Text1Filter }}>
              READY TO
            </motion.span>
            <motion.span style={{ opacity: scene2Text2Opacity, y: scene2Text2Y, scale: scene2Text2Scale, filter: scene2Text2Filter }} className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 pr-4 inline-block mt-2">
              EVOLVE?
            </motion.span>
          </h2>

          <motion.div style={{ opacity: scene2BtnOpacity, y: scene2BtnY, scale: scene2BtnScale }}>
            <motion.button
              onClick={handleCtaClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-5 sm:px-14 sm:py-7 rounded-full bg-[#0a0a0a]/80 backdrop-blur-xl overflow-hidden transition-all duration-500 border border-white/10 hover:border-cyan-400/50 shadow-[0_0_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_60px_rgba(0,255,224,0.25)]"
            >
              {/* Ambient Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Shimmer Sweep Effect */}
              <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer transition-opacity duration-300" />

              <span className="relative z-10 flex items-center gap-4 text-white font-syne font-bold tracking-[0.15em] text-sm sm:text-lg uppercase transition-colors duration-500">
                Claim Your Free Custom Demo
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 group-hover:bg-cyan-400 text-white group-hover:text-black flex items-center justify-center transition-all duration-500 shadow-lg group-hover:shadow-[0_0_20px_rgba(0,255,224,0.6)] group-hover:scale-110">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </span>

              <AnimatePresence>
                {ripples.map((r) => (
                  <motion.span
                    key={r.id}
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ scale: 8, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                      position: 'absolute', left: r.x, top: r.y,
                      width: 20, height: 20, borderRadius: '50%',
                      background: 'rgba(0, 255, 224, 0.4)', pointerEvents: 'none'
                    }}
                  />
                ))}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity: s1L5Opacity, visibility: s1L5Visibility }}
        className="absolute bottom-24 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <div className={`w-[22px] h-[36px] rounded-full border-2 flex justify-center pt-2 backdrop-blur-sm ${theme === 'cryo' ? 'border-white/40 bg-black/20 shadow-[0_0_15px_rgba(0,0,0,0.5)]' : 'border-white/20 bg-white/5'}`}>
            <motion.div
              animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 rounded-full bg-cyan-400"
            />
          </div>
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-[1px] h-8 bg-gradient-to-b from-cyan-400 to-transparent"
            />
          </div>
        </motion.div>
        <span className={`text-[9px] font-bold tracking-[0.4em] uppercase font-syne whitespace-nowrap ${theme === 'cryo' ? 'text-white drop-shadow-[0_2px_10px_rgba(0,0,0,1)]' : 'text-white/30'}`}>
          Scroll to explore
        </span>
      </motion.div>
    </div>
  );
}

function AutomovingObjects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {/* Giant slow-rotating glowing ring */}
      <motion.div
        animate={{ rotateZ: 360, rotateX: [0, 20, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] -left-[5%] w-[55vw] max-w-[700px] aspect-square border border-white/[0.04] rounded-full opacity-60 hidden md:block"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 rounded-full border border-t-[#00FFE0]/20 border-r-blue-500/20 blur-[1px]" />
      </motion.div>

      {/* Glowing orb bottom center */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/3 w-[35rem] h-[18rem] bg-gradient-to-t from-[#00FFE0]/10 to-transparent rounded-[100%] blur-[80px]"
      />
    </div>
  );
}


export default function HeroSection() {
  useInjectHeroStyles();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
      <section
        ref={containerRef}
        id="hero"
        className="relative w-full h-[500vh] bg-[#010103]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden isolate">
          <ThemeBackground />
          <HeroBackground />
          <AutomovingObjects />
          <HeroOverlay scrollProgress={scrollYProgress} />
        </div>
      </section>
    );
}
