"use client";

import React from "react";


/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  GLASSMORPHIC BLUE BACKGROUND
 *  Animated aurora-style blobs + mouse/touch interactive spotlight + floating
 *  glassmorphic cards with 3D parallax tilt.
 *
 *  Features:
 *  • Auto-moving looping gradient blobs (CSS @keyframes, zero JS cost)
 *  • Smooth pointer-following radial spotlight (mouse on desktop, touch on mobile)
 *  • Glassmorphic cards that tilt toward the cursor in 3D space
 *  • Fully self-contained — all keyframes injected at runtime
 *  • Respects prefers-reduced-motion
 *  • Works as full-page background OR as a contained section
 * ═══════════════════════════════════════════════════════════════════════════
 */

import {
  useRef,
  useState,
  useEffect,
  useInsertionEffect,
  useCallback,
  memo,
} from 'react';

// ─── STYLE INJECTION ────────────────────────────────────────────────────────
// Injects all animation keyframes once per app lifecycle.
function useInjectGlassStyles() {
  useInsertionEffect(() => {
    const STYLE_ID = 'glassmorphic-blue-styles-v1';
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      /* Blob drift animations — different durations create organic parallax */
      @keyframes blobDrift1 {
        0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
        25% { transform: translate3d(12vw, -8vh, 0) scale(1.15); }
        50% { transform: translate3d(-6vw, 14vh, 0) scale(0.92); }
        75% { transform: translate3d(-14vw, -6vh, 0) scale(1.08); }
      }
      @keyframes blobDrift2 {
        0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
        33% { transform: translate3d(-10vw, 12vh, 0) scale(1.2); }
        66% { transform: translate3d(15vw, -10vh, 0) scale(0.88); }
      }
      @keyframes blobDrift3 {
        0%, 100% { transform: translate3d(0, 0, 0) scale(0.95); }
        50% { transform: translate3d(8vw, 10vh, 0) scale(1.25); }
      }
      @keyframes blobDrift4 {
        0%, 100% { transform: translate3d(0, 0, 0) scale(1.1); }
        25% { transform: translate3d(-18vw, 4vh, 0) scale(0.9); }
        50% { transform: translate3d(-4vw, -12vh, 0) scale(1.2); }
        75% { transform: translate3d(12vw, 8vh, 0) scale(1); }
      }
      @keyframes blobDrift5 {
        0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
        50% { transform: translate3d(-10vw, -15vh, 0) scale(1.3); }
      }

      /* Aurora mesh — slow continuous rotation for the "alive" feeling */
      @keyframes auroraRotate {
        0% { transform: rotate(0deg) scale(1.4); }
        100% { transform: rotate(360deg) scale(1.4); }
      }

      /* Grain drift */
      @keyframes glassGrain {
        0% { transform: translate(0, 0); }
        100% { transform: translate(-16px, -16px); }
      }

      /* Spotlight breathing (subtle when idle) */
      @keyframes spotlightBreathe {
        0%, 100% { opacity: 0.85; }
        50% { opacity: 1; }
      }

      /* Floating card idle drift — adds life without being distracting */
      @keyframes cardFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }

      .glass-blob { will-change: transform; transform: translateZ(0); }
      .glass-blob-1 { animation: blobDrift1 28s ease-in-out infinite; }
      .glass-blob-2 { animation: blobDrift2 22s ease-in-out infinite; }
      .glass-blob-3 { animation: blobDrift3 18s ease-in-out infinite; }
      .glass-blob-4 { animation: blobDrift4 34s ease-in-out infinite; }
      .glass-blob-5 { animation: blobDrift5 26s ease-in-out infinite; }
      .glass-aurora { animation: auroraRotate 60s linear infinite; }
      .glass-grain { animation: glassGrain 6s steps(12) infinite alternate; }
      .glass-spotlight { animation: spotlightBreathe 4s ease-in-out infinite; }
      .glass-card-float { animation: cardFloat 6s ease-in-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .glass-blob, .glass-aurora, .glass-grain,
        .glass-spotlight, .glass-card-float {
          animation: none !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById(STYLE_ID);
      if (el) el.remove();
    };
  }, []);
}

// ─── POINTER HOOK ───────────────────────────────────────────────────────────
/**
 * Tracks mouse / touch position with smooth frame-rate-independent interpolation.
 * Returns normalised coordinates [0..1] plus a "isActive" flag.
 */
function useSmoothPointer() {
  const target = useRef({ x: 0.5, y: 0.5 });
  const current = useRef({ x: 0.5, y: 0.5 });
  const [pos, setPos] = useState({ x: 0.5, y: 0.5, active: false });
  const raf = useRef(null);
  const lastTime = useRef(0);

  const onPointerMove = useCallback((e) => {
    target.current.x = e.clientX / window.innerWidth;
    target.current.y = e.clientY / window.innerHeight;
    if (!pos.active) setPos((p) => ({ ...p, active: true }));
  }, [pos.active]);

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerMove, { passive: true });

    const loop = (time) => {
      const delta = lastTime.current ? (time - lastTime.current) / 1000 : 0.016;
      lastTime.current = time;

      // Smooth interpolation — ~8 on desktop, ~4 on mobile for snappier feel
      const isCoarse =
        typeof window !== 'undefined' &&
        window.matchMedia('(pointer: coarse)').matches;
      const damping = isCoarse ? 4.5 : 8;
      const lerp = 1 - Math.exp(-damping * delta);

      current.current.x += (target.current.x - current.current.x) * lerp;
      current.current.y += (target.current.y - current.current.y) * lerp;

      setPos((p) => ({
        ...p,
        x: current.current.x,
        y: current.current.y,
      }));

      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [onPointerMove]);

  return pos;
}

// ─── GLASS CARD ─────────────────────────────────────────────────────────────
/**
 * Glassmorphic card with 3D tilt toward the pointer.
 * Uses CSS transform (GPU) — zero layout cost.
 */
const GlassCard = memo(function GlassCard({
  pointer,
  icon,
  label,
  value,
  accent = 'cyan',
  delay = 0,
}) {
  // Tilt calculation — max ±12deg based on pointer distance from card center
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = (rect.left + rect.width / 2) / window.innerWidth;
    const cy = (rect.top + rect.height / 2) / window.innerHeight;
    const dx = pointer.x - cx;
    const dy = pointer.y - cy;
    setTilt({
      ry: dx * 14,   // horizontal tilt
      rx: -dy * 14,  // vertical tilt
    });
  }, [pointer.x, pointer.y]);

  const accentStyles = {
    cyan: {
      border: 'rgba(56, 189, 248, 0.25)',
      glow: 'rgba(56, 189, 248, 0.35)',
      text: '#38bdf8',
      dot: '#22d3ee',
    },
    indigo: {
      border: 'rgba(129, 140, 248, 0.25)',
      glow: 'rgba(129, 140, 248, 0.35)',
      text: '#818cf8',
      dot: '#a78bfa',
    },
    violet: {
      border: 'rgba(167, 139, 250, 0.25)',
      glow: 'rgba(167, 139, 250, 0.35)',
      text: '#a78bfa',
      dot: '#c4b5fd',
    },
  };
  const a = accentStyles[accent] || accentStyles.cyan;

  return (
    <div
      ref={ref}
      className="glass-card-float relative rounded-3xl p-6 sm:p-7 overflow-hidden"
      style={{
        background: 'rgba(15, 23, 42, 0.35)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border: `1px solid ${a.border}`,
        boxShadow: `
          0 8px 32px rgba(2, 6, 23, 0.5),
          0 0 0 1px rgba(255, 255, 255, 0.03) inset,
          0 1px 0 rgba(255, 255, 255, 0.06) inset,
          0 0 40px ${a.glow}
        `,
        transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        animationDelay: `${delay}s`,
      }}
    >
      {/* Top shine sweep */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)`,
        }}
      />

      {/* Inner glow */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${a.glow}, transparent 60%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${a.glow}, transparent)`,
              border: `1px solid ${a.border}`,
            }}
          >
            {icon}
          </div>
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: a.dot,
              boxShadow: `0 0 10px ${a.dot}`,
            }}
          />
        </div>
        <div
          className="text-xs sm:text-xs font-semibold tracking-[0.15em] uppercase mb-2"
          style={{ color: a.text }}
        >
          {label}
        </div>
        <div className="text-white text-3xl sm:text-4xl font-bold tabular-nums tracking-tight">
          {value}
        </div>
      </div>
    </div>
  );
});

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
/**
 * GlassmorphicBlueBackground
 *
 * @param {object} props
 * @param {React.ReactNode} [props.children] - Content rendered above the animated background
 * @param {string} [props.height='100dvh'] - CSS height (e.g. '100dvh', '600px', 'auto')
 * @param {boolean} [props.showCards=true] - Toggle demo glassmorphic cards
 * @param {boolean} [props.showSpotlight=true] - Toggle the pointer-following spotlight
 * @param {'dark'|'deep'} [props.variant='deep'] - 'deep' = navy, 'dark' = near-black
 *
 * @example
 *   <GlassmorphicBlueBackground>
 *     <MyHeroContent />
 *   </GlassmorphicBlueBackground>
 */
export default function GlassmorphicBlueBackground({
  children,
  height = '100dvh',
  showCards = true,
  showSpotlight = true,
  variant = 'deep',
  className = "relative w-full overflow-hidden isolate",
}) {
  useInjectGlassStyles();
  const pointer = useSmoothPointer();

  // Base palette — switches between variants
  const palette =
    variant === 'premium'
      ? {
        base: '#010103',
        blob1: 'rgba(255, 255, 255, 0.05)',  // subtle white glow
        blob2: 'rgba(148, 163, 184, 0.04)', // slate
        blob3: 'rgba(255, 255, 255, 0.03)',
        blob4: 'rgba(148, 163, 184, 0.04)',
        blob5: 'rgba(255, 255, 255, 0.02)',
        spotlight: 'rgba(255, 255, 255, 0.08)',
        bgGradient: 'radial-gradient(ellipse 80% 60% at 20% 20%, #050505 0%, transparent 55%), radial-gradient(ellipse 70% 70% at 85% 85%, #080808 0%, transparent 50%), linear-gradient(180deg, #010103 0%, #030305 50%, #010103 100%)',
      }
      : variant === 'dark'
      ? {
        base: '#020617',
        blob1: 'rgba(37, 99, 235, 0.55)',    // electric blue
        blob2: 'rgba(14, 165, 233, 0.45)',   // sky
        blob3: 'rgba(99, 102, 241, 0.5)',    // indigo
        blob4: 'rgba(2, 132, 199, 0.5)',     // cyan
        blob5: 'rgba(139, 92, 246, 0.35)',   // violet accent
        spotlight: 'rgba(56, 189, 248, 0.25)',
        bgGradient: 'radial-gradient(ellipse 80% 60% at 20% 20%, #0c1e3f 0%, transparent 55%), radial-gradient(ellipse 70% 70% at 85% 85%, #0a1a35 0%, transparent 50%), linear-gradient(180deg, #020617 0%, #030712 50%, #020617 100%)',
      }
      : {
        base: '#020617',
        blob1: 'rgba(37, 99, 235, 0.65)',
        blob2: 'rgba(14, 165, 233, 0.55)',
        blob3: 'rgba(99, 102, 241, 0.6)',
        blob4: 'rgba(6, 182, 212, 0.6)',
        blob5: 'rgba(168, 85, 247, 0.4)',
        spotlight: 'rgba(56, 189, 248, 0.35)',
        bgGradient: 'radial-gradient(ellipse 80% 60% at 20% 20%, #0c1e3f 0%, transparent 55%), radial-gradient(ellipse 70% 70% at 85% 85%, #0a1a35 0%, transparent 50%), linear-gradient(180deg, #020617 0%, #030712 50%, #020617 100%)',
      };

  // Spotlight follows pointer — large soft radial gradient
  const spotlightStyle = showSpotlight
    ? {
      background: `radial-gradient(circle 600px at ${pointer.x * 100}% ${pointer.y * 100
        }%, ${palette.spotlight}, transparent 70%)`,
      opacity: pointer.active ? 0.4 : 0,
      transition: 'opacity 0.6s ease',
    }
    : { opacity: 0 };

  return (
    <section
      className={className}
      style={{
        height,
        background: palette.bgGradient,
      }}
      aria-label="Animated glassmorphic background"
    >
      {/* ── LAYER 1: Animated gradient blobs ─────────────────────────── */}
      <div
        className="absolute inset-0 -z-20 overflow-hidden"
        style={{ filter: 'blur(80px)' }}
      >
        {/* Blob 1 — large electric blue */}
        <div
          className="glass-blob glass-blob-1 absolute rounded-full"
          style={{
            top: '10%',
            left: '15%',
            width: '55vw',
            height: '55vw',
            maxWidth: '800px',
            maxHeight: '800px',
            background: palette.blob1,
          }}
        />
        {/* Blob 2 — sky blue */}
        <div
          className="glass-blob glass-blob-2 absolute rounded-full"
          style={{
            bottom: '5%',
            right: '10%',
            width: '45vw',
            height: '45vw',
            maxWidth: '680px',
            maxHeight: '680px',
            background: palette.blob2,
          }}
        />
        {/* Blob 3 — indigo */}
        <div
          className="glass-blob glass-blob-3 absolute rounded-full"
          style={{
            top: '40%',
            right: '25%',
            width: '38vw',
            height: '38vw',
            maxWidth: '560px',
            maxHeight: '560px',
            background: palette.blob3,
          }}
        />
        {/* Blob 4 — cyan */}
        <div
          className="glass-blob glass-blob-4 absolute rounded-full"
          style={{
            bottom: '30%',
            left: '5%',
            width: '40vw',
            height: '40vw',
            maxWidth: '600px',
            maxHeight: '600px',
            background: palette.blob4,
          }}
        />
        {/* Blob 5 — violet accent (smaller, brighter) */}
        <div
          className="glass-blob glass-blob-5 absolute rounded-full"
          style={{
            top: '60%',
            left: '40%',
            width: '28vw',
            height: '28vw',
            maxWidth: '420px',
            maxHeight: '420px',
            background: palette.blob5,
          }}
        />
      </div>

      {/* ── LAYER 2: Slowly rotating aurora mesh (conic gradient) ───── */}
      <div
        className="glass-aurora absolute inset-0 -z-10 opacity-[0.18] pointer-events-none"
        style={{
          background: `conic-gradient(
            from 0deg at 50% 50%,
            ${palette.blob1} 0deg,
            transparent 80deg,
            ${palette.blob3} 160deg,
            transparent 240deg,
            ${palette.blob2} 320deg,
            ${palette.blob1} 360deg
          )`,
          filter: 'blur(60px)',
        }}
      />

      {/* ── LAYER 3: Pointer spotlight (mouse / touch interactive) ──── */}
      <div
        className="glass-spotlight absolute inset-0 -z-10 pointer-events-none"
        style={spotlightStyle}
      />

      {/* ── LAYER 4: Secondary pointer glow (smaller, tighter) ──────── */}
      {showSpotlight && (
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background: `radial-gradient(circle 220px at ${pointer.x * 100}% ${pointer.y * 100
              }%, rgba(165, 243, 252, 0.05), transparent 70%)`,
            opacity: pointer.active ? 0.4 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />
      )}

      {/* ── LAYER 5: Subtle grid overlay for depth ──────────────────── */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(56, 189, 248, 0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.6) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 75%)',
        }}
      />

      {/* ── LAYER 6: Grain texture ──────────────────────────────────── */}
      <div
        className="glass-grain absolute inset-0 -z-10 opacity-[0.045] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* ── LAYER 7: Vignette (edge darkening) ──────────────────────── */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, rgba(2, 6, 23, 0.7) 100%)',
        }}
      />

      {/* ── CHILDREN SLOT ───────────────────────────────────────────── */}
      {children && <div className="relative z-10 h-full">{children}</div>}

      {/* ── DEMO GLASSMORPHIC CARDS (optional, remove if using children) ─ */}
      {showCards && !children && (
        <div className="relative z-10 h-full flex flex-col">
          {/* Top floating pill */}
          <div className="flex justify-center pt-8 sm:pt-12 px-6">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: 'rgba(15, 23, 42, 0.45)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                boxShadow:
                  '0 4px 20px rgba(2, 6, 23, 0.4), 0 1px 0 rgba(255,255,255,0.08) inset',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <span className="text-cyan-300 text-xs sm:text-xs font-semibold tracking-[0.15em] uppercase">
                Live · Interactive Background
              </span>
            </div>
          </div>

          {/* Centered heading */}
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 -mt-8 sm:-mt-12">
            <h1
              className="text-white text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] max-w-4xl mb-6"
              style={{
                textShadow: '0 4px 40px rgba(56, 189, 248, 0.35)',
              }}
            >
              <span className="block">Glass meets</span>
              <span
                className="block"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #22d3ee 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                liquid light.
              </span>
            </h1>
            <p className="text-white/60 text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
              Move your cursor — or drag on mobile — to feel the aurora respond.
              Every blob loops endlessly. Every card tilts.
            </p>
          </div>

          {/* Bottom glass cards grid */}
          <div className="px-6 sm:px-12 pb-8 sm:pb-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto w-full">
            <GlassCard
              pointer={pointer}
              delay={0}
              accent="cyan"
              label="Render Cost"
              value="0.8ms"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13 2L7 12H3l8 4-2-8h4l2-6z" />
                </svg>
              }
            />
            <GlassCard
              pointer={pointer}
              delay={1.5}
              accent="indigo"
              label="Blobs Active"
              value="5"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="#818cf8"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="9" r="3" />
                  <circle cx="9" cy="9" r="7" />
                </svg>
              }
            />
            <GlassCard
              pointer={pointer}
              delay={3}
              accent="violet"
              label="Frame Rate"
              value="120Hz"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 14l4-5 3 3 7-9" />
                </svg>
              }
            />
          </div>
        </div>
      )}
    </section>
  );
}