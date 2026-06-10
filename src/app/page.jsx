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
import SectionScroller from "@/components/SectionScroller";
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

function Spotlight() {
  const pointer = usePointer();
  return (
    <>
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
    </>
  );
}

export default function Home() {
  return (
    <main className="relative bg-[#010103] w-full text-white font-sans selection:bg-cyan-400/30 flex flex-col">
      {/* ── Content ── */}
      <HeroSection />
      
      <div className="flex flex-col relative z-10 w-full">
        <div id="trust"><TrustSection /></div>
        <div id="what-we-build"><WhatWeBuild /></div>
        <div id="marquee" className="py-24"><MarqueeSection /></div>
        <div id="value-proposition"><ValueProposition /></div>
        <div id="portfolio"><Portfolio /></div>
        <div id="contact" className="mt-16 sm:mt-24"><ContactUs /></div>
      </div>

      <ScrollProgressBar />
      <SectionScroller />

      {/* Sleek Minimal Footer */}
      <footer className="relative w-full border-t border-white/[0.05] bg-[#010103] py-6 px-6 z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs sm:text-sm font-syne">
            &copy; {new Date().getFullYear()} NeetWeb. All rights reserved.
          </p>
          
          <div className="group relative inline-block cursor-pointer">
            <span className="block text-white/40 text-sm sm:text-base font-syne font-medium transition-colors duration-300 group-hover:text-cyan-400 pb-1.5">
              Designer @NEET
            </span>
            <div className="absolute bottom-0 left-0 w-full h-[2px] overflow-hidden">
              <span className="absolute inset-0 bg-cyan-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
