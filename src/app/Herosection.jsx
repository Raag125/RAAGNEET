'use client';

/**
 * ===========================================================================
 *  IMMERSIVE SCROLL-DRIVEN HERO SECTION
 *  Tech: Next.js + Tailwind CSS + Framer Motion
 *  Features: Pinned Scroll Parallax, 3-Scene Sequence, Auto-Play on Mobile
 * ===========================================================================
 */

import { useRef, useInsertionEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

// --- STYLE INJECTION --------------------------------------------------------
function useInjectHeroStyles() {
  useInsertionEffect(() => {
    const STYLE_ID = 'hero-section-styles-v1';
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      @keyframes ctaPulse {
        0%, 100% {
          box-shadow: 0 0 40px rgba(248, 250, 252, 0.45), 0 0 0 0 rgba(248, 250, 252, 0.4);
        }
        50% {
          box-shadow: 0 0 60px rgba(248, 250, 252, 0.65), 0 0 0 14px rgba(248, 250, 252, 0);
        }
      }
      .hero-cta-pulse {
        animation: ctaPulse 2.8s ease-in-out infinite;
      }
      @keyframes blobDrift1 { 0%,100%{transform:translate3d(0,0,0)scale(1)} 25%{transform:translate3d(8vw,-6vh,0)scale(1.15)} 50%{transform:translate3d(-5vw,10vh,0)scale(0.92)} 75%{transform:translate3d(-10vw,-4vh,0)scale(1.08)} }
      @keyframes blobDrift2 { 0%,100%{transform:translate3d(0,0,0)scale(1)} 33%{transform:translate3d(-8vw,8vh,0)scale(1.2)} 66%{transform:translate3d(12vw,-6vh,0)scale(0.88)} }
      @keyframes blobDrift3 { 0%,100%{transform:translate3d(0,0,0)scale(.95)} 50%{transform:translate3d(6vw,8vh,0)scale(1.25)} }
      @keyframes blobDrift4 { 0%,100%{transform:translate3d(0,0,0)scale(1.08)} 50%{transform:translate3d(-10vw,-12vh,0)scale(0.9)} }
      @keyframes auroraRotate { 0%{transform:rotate(0deg)scale(1.5)} 100%{transform:rotate(360deg)scale(1.5)} }
      .hero-blob { will-change:transform;transform:translateZ(0) }
      .hero-blob-1 { animation:blobDrift1 26s ease-in-out infinite }
      .hero-blob-2 { animation:blobDrift2 20s ease-in-out infinite }
      .hero-blob-3 { animation:blobDrift3 16s ease-in-out infinite }
      .hero-blob-4 { animation:blobDrift4 30s ease-in-out infinite }
      .hero-aurora { animation:auroraRotate 50s linear infinite }
      @media (prefers-reduced-motion:reduce) { .hero-blob,.hero-aurora{animation:none!important} }
    `;
    document.head.appendChild(style);
    return () => { const el = document.getElementById(STYLE_ID); if (el) el.remove(); };
  }, []);
}

// --- COMPONENTS -------------------------------------------------------------

function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <div className="absolute inset-0 blur-[50px] md:blur-[100px] will-change-transform translate-z-0">
        <div className="hero-blob hero-blob-1 absolute rounded-full top-[5%] left-[10%] w-[50vw] max-w-[700px] aspect-square" style={{ background: "radial-gradient(circle, rgba(0,255,224,0.15), transparent 70%)" }} />
        <div className="hero-blob hero-blob-2 absolute rounded-full bottom-[8%] right-[5%] w-[45vw] max-w-[650px] aspect-square" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)" }} />
        <div className="hero-blob hero-blob-3 absolute rounded-full top-[35%] right-[15%] w-[30vw] max-w-[450px] aspect-square" style={{ background: "radial-gradient(circle, rgba(168,85,247,0.1), transparent 70%)" }} />
        <div className="hero-blob hero-blob-4 absolute rounded-full bottom-[20%] left-[5%] w-[35vw] max-w-[500px] aspect-square" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.1), transparent 70%)" }} />
      </div>

      {/* Aurora mesh */}
      <div
        className="hero-aurora absolute inset-0 opacity-[0.15] blur-[40px] md:blur-[80px] will-change-transform translate-z-0"
        style={{
          background: "conic-gradient(from 0deg at 50% 50%, rgba(0,255,224,0.08) 0deg, transparent 80deg, rgba(59,130,246,0.06) 160deg, transparent 240deg, rgba(168,85,247,0.06) 320deg, rgba(0,255,224,0.08) 360deg)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(rgba(0,255,224,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,224,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 75%)",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 30%, rgba(1,1,3,0.6) 100%)" }} />
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

      {/* Glassmorphic floating diamond right */}
      <motion.div
        animate={{ y: [0, -100, 0], rotateZ: [0, 90, 0], rotateX: [0, 45, 0], rotateY: [0, 45, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -right-12 w-52 h-52 bg-gradient-to-br from-white/[0.06] to-transparent border border-white/10 rounded-[2rem] backdrop-blur-3xl hidden md:block"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-4 rounded-xl border border-white/5 bg-white/[0.02]" />
      </motion.div>

      {/* Glowing orb bottom center */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/3 w-[35rem] h-[18rem] bg-gradient-to-t from-[#00FFE0]/10 to-transparent rounded-[100%] blur-[80px]"
      />

      {/* Floating mini cube */}
      <motion.div
        animate={{ y: [0, -40, 0], x: [0, 30, 0], rotate: [0, 180, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-8 sm:left-16 w-10 h-10 bg-white/[0.04] border border-white/20 rounded-xl backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.03)]"
      />
    </div>
  );
}


function HeroOverlay({ scrollProgress }) {
  const [ripples, setRipples] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const handleCtaClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
  };

  const scene1Opacity = useTransform(scrollProgress, [0, 0.35], [1, 0]);
  const scene1Y = useTransform(scrollProgress, [0, 0.35], [0, -100]);
  const scene1Scale = useTransform(scrollProgress, [0, 0.35], [1, 0.9]);
  const scene1Pointer = useTransform(scrollProgress, (p) => (p < 0.32 ? 'auto' : 'none'));

  const scene3Opacity = useTransform(scrollProgress, [0.5, 0.7], [0, 1]);
  const scene3Y = useTransform(scrollProgress, [0.5, 0.7], [100, 0]);
  const scene3Pointer = useTransform(scrollProgress, (p) => (p > 0.6 ? 'auto' : 'none'));

  return (
    <div className="relative w-full h-screen flex flex-col pointer-events-none z-20">
      <div className="flex-1 flex items-center justify-center relative px-6 sm:px-12 max-w-7xl w-full mx-auto">
        
        {/* SCENE 1: Headline */}
        <motion.div 
          style={{ opacity: scene1Opacity, y: scene1Y, scale: scene1Scale, pointerEvents: scene1Pointer }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 24, delay: 0.1 }}
            className="mb-4 sm:mb-6 inline-flex items-center gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/[0.04] backdrop-blur-md border border-[#F8FAFC]/20 shadow-[0_0_20px_rgba(255,255,255,0.03)] cursor-default hover:bg-white/[0.1] transition-colors duration-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#F8FAFC] opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F8FAFC]" />
            </span>
            <span className="text-[#F8FAFC] text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-widest uppercase">
              Transform Your Business
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="font-black text-white leading-[1.0] sm:leading-[0.95] tracking-tight text-[clamp(2.5rem,10vw,6rem)] max-w-[15ch]"
          >
            WEBSITES THAT <span className="relative inline-block">
              <motion.span 
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }} 
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-[#00FFE0] blur-2xl"
              />
              <motion.span 
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="relative bg-[length:200%_auto] bg-gradient-to-r from-[#00FFE0] via-blue-500 to-[#00FFE0] bg-clip-text text-transparent"
              >
                CAPTIVATE
              </motion.span>
            </span> & GROW.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="mt-6 sm:mt-8 text-white/50 text-sm sm:text-lg lg:text-xl font-light max-w-lg px-4"
          >
            Scroll down to explore our premium digital solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="text-white/40 text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase">
              Scroll to feel the website
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-6 h-10 rounded-full border border-white/20 flex justify-center pt-2 bg-white/[0.02] backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.05)]"
            >
              <motion.div 
                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-2 rounded-full bg-[#00FFE0]" 
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* SCENE 3: CTA */}
        <motion.div 
          style={{ opacity: scene3Opacity, y: scene3Y, pointerEvents: scene3Pointer }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <h2 className="font-black text-white text-3xl sm:text-4xl md:text-6xl mb-6 sm:mb-10 tracking-tight">Ready to Scale?</h2>
          <motion.button
            onClick={handleCtaClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="hero-cta-pulse relative overflow-hidden px-6 py-4 sm:px-8 sm:py-5 rounded-full bg-gradient-to-r from-[#F8FAFC] to-[#CBD5E1] text-slate-950 font-bold text-sm sm:text-base md:text-lg tracking-wide shadow-[0_0_40px_rgba(248, 250, 252,0.4)] focus:outline-none"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
              initial={{ x: '-200%' }}
              animate={isHovered ? { x: '200%' } : { x: '-200%' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
            <span className="relative z-10 flex items-center gap-2">
              Claim Your Free Custom Demo
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
            <AnimatePresence>
              {ripples.map((r) => (
                <motion.span
                  key={r.id}
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ scale: 5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    position: 'absolute', left: r.x, top: r.y,
                    width: 40, height: 40, marginLeft: -20, marginTop: -20,
                    borderRadius: '50%', background: 'rgba(10, 10, 26, 0.3)', pointerEvents: 'none'
                  }}
                />
              ))}
            </AnimatePresence>
          </motion.button>
          
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-6 text-white/60 text-xs sm:text-sm font-medium">
            <span className="flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F8FAFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> No setup fees</span>
            <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/20" />
            <span className="flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F8FAFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Rapid Delivery</span>
            <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/20" />
            <span className="flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F8FAFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Custom Engineered</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// --- MAIN HERO SECTION EXPORT -----------------------------------------------

export default function HeroSection() {
  useInjectHeroStyles();
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    mass: 0.1,
    restDelta: 0.001
  });

  return (
    <section 
      ref={containerRef} 
      id="hero" 
      className="relative w-full h-[160vh] bg-[#010103]" 
      aria-label="Hero section — Websites that captivate and grow your business"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden isolate flex flex-col">
        
        {/* Hero background with animated blobs */}
        <HeroBackground />

        {/* Ambient floating geometry for premium depth */}
        <AutomovingObjects />

        {/* UI Overlay */}
        <HeroOverlay scrollProgress={smoothProgress} />
        
      </div>
    </section>
  );
}
