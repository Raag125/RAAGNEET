'use client';

/**
 * ===========================================================================
 *  IMMERSIVE SCROLL-DRIVEN HERO SECTION
 *  Tech: Next.js + Tailwind CSS + Framer Motion
 *  Features: Pinned Scroll Parallax, 3-Scene Sequence, Auto-Play on Mobile
 * ===========================================================================
 */

import { useRef, useInsertionEffect, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import ParticleField from '@/components/animations/ParticleField';
import ThemeBackground from '@/components/ThemeBackground';
import { useTheme } from '@/context/ThemeContext';

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
      .theme-cryo-char {
        display: inline-block;
        background: linear-gradient(180deg, #ffffff 0%, #bfefff 40%, #7dd3fc 70%, #e0f7ff 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        filter: drop-shadow(0 0 8px rgba(147,210,255,0.9)) drop-shadow(0 0 20px rgba(100,200,255,0.6));
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
    const chars = text.split('');
    return (
      <span className="relative inline-block">
        {chars.map((ch, i) => (
          <motion.span
            key={i}
            className="theme-cryo-char"
            animate={{
              y: [0, i % 2 === 0 ? -1 : 0.5, 0],
              filter: [
                'drop-shadow(0 0 6px rgba(147,210,255,0.7)) drop-shadow(0 0 18px rgba(100,200,255,0.5))',
                'drop-shadow(0 0 14px rgba(147,210,255,1)) drop-shadow(0 0 30px rgba(100,200,255,0.8))',
                'drop-shadow(0 0 6px rgba(147,210,255,0.7)) drop-shadow(0 0 18px rgba(100,200,255,0.5))',
              ],
            }}
            transition={{ duration: 3 + i * 0.15, repeat: Infinity, ease: 'easeInOut', delay: i * 0.08 }}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </motion.span>
        ))}
      </span>
    );
  }

  return <>{children}</>;
}

function HeroOverlay({ scrollProgress }) {
  const { theme } = useTheme();
  const [ripples, setRipples] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

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
  // 0.00 -> 0.15: Hold Scene 1 (Text stays pinned on screen)
  // 0.15 -> 0.45: Scene 1 Disappears line-by-line
  // 0.45 -> 0.55: The Void (Screen remains empty)
  // 0.55 -> 0.85: Scene 2 Drops in piece-by-piece
  // 0.85 -> 1.00: Hold Scene 2 (Fully visible before unpinning)
  // ----------------------------------------------------

  // Scene 1 Sequential Line-by-Line Exit
  const scene1Visibility = useTransform(scrollProgress, p => p > 0.45 ? 'hidden' : 'visible');
  
  // Line 1: Transform Your Business (Fades with Line 2)
  const s1L1Opacity = useTransform(scrollProgress, [0.15, 0.25], [1, 0]);
  const s1L1Y = useTransform(scrollProgress, [0.15, 0.25], [0, -30]);

  // Line 2: THE FUTURE OF YOUR
  const s1L2Opacity = useTransform(scrollProgress, [0.15, 0.25], [1, 0]);
  const s1L2Y = useTransform(scrollProgress, [0.15, 0.25], [0, -30]);

  // Line 3: DIGITAL
  const s1L3Opacity = useTransform(scrollProgress, [0.25, 0.35], [1, 0]);
  const s1L3Y = useTransform(scrollProgress, [0.25, 0.35], [0, -30]);

  // Line 4: PRESENCE
  const s1L4Opacity = useTransform(scrollProgress, [0.30, 0.40], [1, 0]);
  const s1L4Y = useTransform(scrollProgress, [0.30, 0.40], [0, -30]);

  // Line 5: Paragraph & Scroll Indicator
  const s1L5Opacity = useTransform(scrollProgress, [0.35, 0.45], [1, 0]);
  const s1L5Y = useTransform(scrollProgress, [0.35, 0.45], [0, -30]);

  // Scene 2 Base Wrapper
  const scene2Visibility = useTransform(scrollProgress, p => p < 0.45 ? 'hidden' : 'visible');
  const scene2Opacity = useTransform(scrollProgress, [0.45, 0.60], [0, 1]);
  
  // Scene 2 Drop Entrance
  const scene2Text1Opacity = useTransform(scrollProgress, [0.45, 0.55], [0, 1]);
  const scene2Text1Y = useTransform(scrollProgress, [0.45, 0.55], [-80, 0]);
  const scene2Text1Scale = useTransform(scrollProgress, [0.45, 0.55], [1.5, 1]);

  const scene2Text2Opacity = useTransform(scrollProgress, [0.55, 0.65], [0, 1]);
  const scene2Text2Y = useTransform(scrollProgress, [0.55, 0.65], [-80, 0]);
  const scene2Text2Scale = useTransform(scrollProgress, [0.55, 0.65], [1.5, 1]);

  const scene2BtnOpacity = useTransform(scrollProgress, [0.65, 0.75], [0, 1]);
  const scene2BtnY = useTransform(scrollProgress, [0.65, 0.75], [60, 0]);

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
          <motion.div style={{ opacity: s1L1Opacity, y: s1L1Y }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 mb-1 flex items-center gap-4"
              /* 
                👇 ADJUST THE VALUE BELOW TO LOWER JUST "Transform Your Business" 👇 
                   Change "0px" to "20px", "40px", etc. (This won't push the title below it)
              */
              style={{ position: "relative", top: "55px" }}
            >
              <div className="h-[1px] w-12 bg-cyan-400/50" />
              <span className="text-cyan-400 text-xs font-bold tracking-[0.5em] uppercase font-syne pr-2">
                Transform Your Business
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative pointer-events-auto perspective-[1000px]"
            /* 
              👇 ADJUST THE VALUE BELOW TO LOWER THE TITLE TEXT 👇 
                 Change "0px" to "40px", "80px", etc., to push the title down!
            */
            style={{ marginTop: "70px" }}
          >
            <motion.h1
              className="flex flex-col gap-2 font-bricolage tracking-tighter cursor-default"
            >
              <motion.div
                className="overflow-hidden pr-12 -mr-12 py-2 -my-2"
                /* 
                  👇 ADJUST THE VALUE BELOW TO SHIFT "THE FUTURE OF YOUR" RIGHT/LEFT 👇 

                     Change "0px" to "50px" to shift right, or "-50px" to shift left!
                */
                style={{ opacity: s1L2Opacity, y: s1L2Y, marginLeft: "0px" }}
              >
                <motion.span
                  initial={{ y: 50, rotateX: -30, opacity: 0, filter: "blur(15px)" }}
                  animate={{ y: 0, rotateX: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 } }}
                  whileHover={!theme || theme === 'default' ? { color: "rgba(0, 255, 224, 0)", WebkitTextStroke: "2px rgba(0, 255, 224, 0.9)", textShadow: "0 0 30px rgba(0, 255, 224, 0.4)", transition: { duration: 0.5, ease: "easeInOut" } } : {}}
                  style={(!theme || theme === 'default') ? { color: "#ffffff" } : {}}
                  className="block text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.95] font-black italic pr-4"
                >
                  <ThemeTextWrapper theme={theme}>THE FUTURE OF YOUR</ThemeTextWrapper>
                </motion.span>
              </motion.div>
              <motion.div style={{ opacity: s1L3Opacity, y: s1L3Y }} className="overflow-hidden flex items-baseline gap-4 pr-12 -mr-12 py-2 -my-2">
                <motion.span
                  initial={{ y: 50, rotateX: -30, opacity: 0, filter: "blur(15px)" }}
                  animate={{ y: 0, rotateX: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.55 } }}
                  className="block text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.95] font-black italic pr-4"
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
                    <span className="relative inline-block">
                      {'DIGITAL'.split('').map((ch, i) => (
                        <motion.span key={i} className="theme-cryo-char"
                          animate={{ y: [0, i%2===0?-1:0.5, 0], filter: ['drop-shadow(0 0 6px rgba(147,210,255,0.7))','drop-shadow(0 0 18px rgba(147,210,255,1))','drop-shadow(0 0 6px rgba(147,210,255,0.7))'] }}
                          transition={{ duration: 3+i*0.15, repeat: Infinity, ease:'easeInOut', delay: i*0.08 }}
                        >{ch}</motion.span>
                      ))}
                    </span>
                  )}
                </motion.span>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, delay: 1.2 } }}
                  whileHover={{ scale: 1.5, backgroundColor: "#fff", transition: { duration: 0.4 } }}
                  className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(0,255,224,0.8)] hidden sm:block"
                />
              </motion.div>
              <motion.div style={{ opacity: s1L4Opacity, y: s1L4Y }} className="overflow-hidden pr-12 -mr-12 py-2 -my-2">
                <motion.span
                  initial={{ y: 50, rotateX: -30, opacity: 0, filter: "blur(15px)" }}
                  animate={{ y: 0, rotateX: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.7 } }}
                  whileHover={!theme || theme === 'default' ? { color: "rgba(59, 130, 246, 0)", WebkitTextStroke: "2px rgba(59, 130, 246, 0.9)", textShadow: "0 0 30px rgba(59, 130, 246, 0.4)", transition: { duration: 0.5, ease: "easeInOut" } } : {}}
                  style={(!theme || theme === 'default') ? { color: "#ffffff" } : {}}
                  className="block text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.95] font-black italic pr-4"
                >
                  <ThemeTextWrapper theme={theme}>PRESENCE</ThemeTextWrapper>
                </motion.span>
              </motion.div>
            </motion.h1>
          </motion.div>

          <motion.div style={{ opacity: s1L5Opacity, y: s1L5Y }}>
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
              <p className="text-white/50 text-lg sm:text-xl font-light font-sans leading-loose py-2 pr-6 overflow-visible">
                We bridge the gap between imagination and execution, building 
                high-performance digital assets that define the new standard.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* SCENE 2: Call to Action */}
        <motion.div
          style={{
            opacity: scene2Opacity,
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
            <motion.span style={{ opacity: scene2Text1Opacity, y: scene2Text1Y, scale: scene2Text1Scale }}>
              READY TO
            </motion.span>
            <motion.span style={{ opacity: scene2Text2Opacity, y: scene2Text2Y, scale: scene2Text2Scale }} className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 pr-4 inline-block mt-2">
              EVOLVE?
            </motion.span>
          </h2>

          <motion.button
            style={{ opacity: scene2BtnOpacity, y: scene2BtnY }}
            onClick={handleCtaClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-5 sm:px-12 sm:py-6 rounded-full bg-white overflow-hidden transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_80px_rgba(0,255,224,0.5)]"
          >
            {/* Cyan Gradient Hover Fill */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-[length:200%_auto] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <span className="relative z-10 flex items-center gap-4 text-black group-hover:text-white font-syne font-bold tracking-[0.1em] text-sm sm:text-lg uppercase transition-colors duration-500">
              {isHovered ? "yeah man click waiting for what" : "Claim Your Free Custom Demo"}
              <div className="w-8 h-8 rounded-full bg-black group-hover:bg-white text-white group-hover:text-blue-600 flex items-center justify-center transition-colors duration-500 shadow-lg">
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    background: 'rgba(255, 255, 255, 0.4)', pointerEvents: 'none'
                  }}
                />
              ))}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity: s1L5Opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-[22px] h-[36px] rounded-full border-2 border-white/20 flex justify-center pt-2 bg-white/5 backdrop-blur-sm">
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
        <span className="text-white/30 text-[9px] font-bold tracking-[0.4em] uppercase font-syne whitespace-nowrap">
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
