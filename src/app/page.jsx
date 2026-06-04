"use client";

import React, { useRef, useState, useEffect, useCallback, useInsertionEffect } from "react";
import HeroSection from "./Herosection";
import WhatWeBuild from "@/components/WhatWeBuild";
import TrustSection from "@/components/TrustSection";
import MarqueeSection from "@/components/MarqueeSection";
import ValueProposition from "@/components/ValueProposition";
import Portfolio from "@/components/Portfolio";
import ContactUs from "@/components/ContactUs";
import ScrollProgressBar from "@/components/ScrollProgressBar";

/* ── Inject glass keyframes once ── */
function useGlassStyles() {
  useInsertionEffect(() => {
    const id = "home-glass-bg-styles";
    if (document.getElementById(id)) return;
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      @keyframes hgbDrift1 { 0%,100%{transform:translate3d(0,0,0)scale(1)} 25%{transform:translate3d(10vw,-6vh,0)scale(1.12)} 50%{transform:translate3d(-5vw,12vh,0)scale(0.94)} 75%{transform:translate3d(-12vw,-5vh,0)scale(1.06)} }
      @keyframes hgbDrift2 { 0%,100%{transform:translate3d(0,0,0)scale(1)} 33%{transform:translate3d(-8vw,10vh,0)scale(1.18)} 66%{transform:translate3d(12vw,-8vh,0)scale(0.9)} }
      @keyframes hgbDrift3 { 0%,100%{transform:translate3d(0,0,0)scale(.95)} 50%{transform:translate3d(6vw,8vh,0)scale(1.22)} }
      @keyframes hgbDrift4 { 0%,100%{transform:translate3d(0,0,0)scale(1.08)} 50%{transform:translate3d(-8vw,-12vh,0)scale(0.92)} }
      .hgb-blob { will-change:transform;transform:translateZ(0) }
      .hgb-1 { animation:hgbDrift1 28s ease-in-out infinite }
      .hgb-2 { animation:hgbDrift2 22s ease-in-out infinite }
      .hgb-3 { animation:hgbDrift3 18s ease-in-out infinite }
      .hgb-4 { animation:hgbDrift4 34s ease-in-out infinite }
      @media (prefers-reduced-motion:reduce) { .hgb-blob{animation:none!important} }
    `;
    document.head.appendChild(s);
  }, []);
}

/* ── Smooth pointer tracking ── */
function usePointer() {
  const target = useRef({ x: 0.5, y: 0.5 });
  const current = useRef({ x: 0.5, y: 0.5 });
  const [pos, setPos] = useState({ x: 0.5, y: 0.5, active: false });
  const raf = useRef(null);

  const onMove = useCallback((e) => {
    target.current.x = e.clientX / window.innerWidth;
    target.current.y = e.clientY / window.innerHeight;
    if (!current.current._active) {
      current.current._active = true;
      setPos(p => ({ ...p, active: true }));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", onMove, { passive: true });
    const loop = (time) => {
      const damping = 6;
      const dt = 0.016;
      const lerp = 1 - Math.exp(-damping * dt);
      current.current.x += (target.current.x - current.current.x) * lerp;
      current.current.y += (target.current.y - current.current.y) * lerp;
      setPos({ x: current.current.x, y: current.current.y, active: current.current._active || false });
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [onMove]);
  return pos;
}

export default function Home() {
  useGlassStyles();
  const pointer = usePointer();

  return (
    <main className="relative bg-[#010103] w-full text-white font-sans selection:bg-primary/30 flex flex-col">
      {/* ── Fixed glass background ── */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Blob layer */}
        <div className="absolute inset-0" style={{ filter: "blur(90px)" }}>
          <div className="hgb-blob hgb-1 absolute rounded-full top-[8%] left-[12%] w-[50vw] max-w-[700px] aspect-square" style={{ background: "rgba(255,255,255,0.04)" }} />
          <div className="hgb-blob hgb-2 absolute rounded-full bottom-[5%] right-[8%] w-[42vw] max-w-[600px] aspect-square" style={{ background: "rgba(148,163,184,0.035)" }} />
          <div className="hgb-blob hgb-3 absolute rounded-full top-[35%] right-[20%] w-[35vw] max-w-[500px] aspect-square" style={{ background: "rgba(255,255,255,0.03)" }} />
          <div className="hgb-blob hgb-4 absolute rounded-full bottom-[25%] left-[5%] w-[38vw] max-w-[540px] aspect-square" style={{ background: "rgba(148,163,184,0.03)" }} />
        </div>

        {/* Subtle conic aurora */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            background: "conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.04) 0deg, transparent 90deg, rgba(255,255,255,0.025) 180deg, transparent 270deg, rgba(255,255,255,0.04) 360deg)",
            filter: "blur(60px)",
          }}
        />

        {/* Mouse-following spotlight */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle 500px at ${pointer.x * 100}% ${pointer.y * 100}%, rgba(255,255,255,0.06), transparent 70%)`,
            opacity: pointer.active ? 1 : 0,
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle 180px at ${pointer.x * 100}% ${pointer.y * 100}%, rgba(165,243,252,0.04), transparent 70%)`,
            opacity: pointer.active ? 1 : 0,
          }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 75%)",
          }}
        />

        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, rgba(1,1,3,0.7) 100%)" }}
        />
      </div>

      {/* ── Content ── */}
      <HeroSection />
      <div className="flex flex-col gap-24 sm:gap-32 relative z-10 w-full pt-16">
        <div id="what-we-build"><WhatWeBuild /></div>
        <div id="trust"><TrustSection /></div>
        <div id="marquee"><MarqueeSection /></div>
        <div id="value-proposition"><ValueProposition /></div>
        <div id="portfolio"><Portfolio /></div>
        <div id="contact"><ContactUs /></div>
      </div>

      <ScrollProgressBar />

      {/* Footer */}
      <footer className="relative w-full flex flex-col items-center justify-center py-12 text-center text-gray-500 text-sm z-10">
        <p>&copy; {new Date().getFullYear()} NeetWeb Premium Digital Agency. All rights reserved.</p>
        <p className="mt-2">Engineered for conversion.</p>
      </footer>
    </main>
  );
}
