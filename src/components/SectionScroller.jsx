"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function SectionScroller() {
  const [scrollPos, setScrollPos] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
      setMaxScroll(document.documentElement.scrollHeight - window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const getOffset = (id) => {
    const el = document.getElementById(id);
    if (!el) return 0;
    return el.getBoundingClientRect().top + window.scrollY;
  };

  const getWaypoints = () => {
    if (typeof window === "undefined") return [];
    
    const vh = window.innerHeight;
    const isDesktop = window.innerWidth >= 768; // md breakpoint

    if (!isDesktop) {
      // Mobile doesn't have the 400vh/300vh scroll timelines except for Hero
      return [
        { label: "Dashboard", y: 0 },
        { label: "Ready to Evolve?", y: getOffset("hero") + vh * 5 * 0.75 },
        { label: "Trust", y: getOffset("trust") },
        { label: "What We Build", y: getOffset("what-we-build") },
        { label: "Value Proposition", y: getOffset("value-proposition") },
        { label: "Portfolio", y: getOffset("portfolio") },
        { label: "Contact", y: getOffset("contact") },
      ];
    }

    // Exact waypoint map mapping to Framer Motion useScroll ranges
    return [
      { label: "Dashboard Start", y: 0 },
      { label: "Ready to Evolve?", y: getOffset("hero") + vh * 5 * 0.75 },
      { label: "Trust: Free Demo", y: getOffset("trust") + vh * 4 * 0.15 },
      { label: "Trust: Empty Promises", y: getOffset("trust") + vh * 4 * 0.45 },
      { label: "Trust: Earned", y: getOffset("trust") + vh * 4 * 0.75 },
      { label: "What We Build", y: getOffset("what-we-build") },
      { label: "Value: We don't just build", y: getOffset("value-proposition") + vh * 3 * 0.15 },
      { label: "Value: We engineer", y: getOffset("value-proposition") + vh * 3 * 0.25 },
      { label: "Value: Conversion machines", y: getOffset("value-proposition") + vh * 3 * 0.35 },
      { label: "Value: Blending physics", y: getOffset("value-proposition") + vh * 3 * 0.50 },
      { label: "Portfolio Matrix", y: getOffset("portfolio") },
      { label: "Contact Us", y: getOffset("contact") },
    ];
  };

  const handleUp = () => {
    const waypoints = getWaypoints();
    const currentY = window.scrollY;
    // Find the closest waypoint ABOVE current scroll position
    const prevWaypoint = [...waypoints].reverse().find(w => w.y < currentY - 10);
    if (prevWaypoint) {
      window.scrollTo({ top: prevWaypoint.y, behavior: "smooth" });
    }
  };

  const handleDown = () => {
    const waypoints = getWaypoints();
    const currentY = window.scrollY;
    // Find the closest waypoint BELOW current scroll position
    const nextWaypoint = waypoints.find(w => w.y > currentY + 10);
    if (nextWaypoint) {
      window.scrollTo({ top: nextWaypoint.y, behavior: "smooth" });
    }
  };

  const canGoUp = scrollPos > 10;
  const canGoDown = scrollPos < maxScroll - 10;

  // Find current label for tooltips
  const waypoints = getWaypoints();
  const currentWaypointIdx = [...waypoints].reverse().findIndex(w => w.y <= scrollPos + 10);
  const realIdx = waypoints.length - 1 - currentWaypointIdx;
  const prevLabel = waypoints[realIdx - 1]?.label || "Previous";
  const nextLabel = waypoints[realIdx + 1]?.label || "Next";

  return (
    <div className="fixed right-4 sm:right-6 bottom-10 z-50 flex flex-col gap-3 pointer-events-auto">
      <AnimatePresence>
        {canGoUp && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10, pointerEvents: "none" }}
            onClick={handleUp}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#0a0a0a]/80 border border-white/10 backdrop-blur-xl shadow-lg hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300"
            aria-label="Scroll Up"
          >
            <span className="absolute right-14 px-3 py-1.5 rounded-lg text-xs font-syne whitespace-nowrap bg-[#0a0a0a]/90 text-white/80 backdrop-blur-xl border border-white/10 opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              {prevLabel}
            </span>
            <ChevronUp className="w-6 h-6 text-white/70 group-hover:text-cyan-400 transition-colors" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {canGoDown && (
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, pointerEvents: "none" }}
            onClick={handleDown}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#0a0a0a]/80 border border-white/10 backdrop-blur-xl shadow-lg hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300"
            aria-label="Scroll Down"
          >
            <span className="absolute right-14 px-3 py-1.5 rounded-lg text-xs font-syne whitespace-nowrap bg-[#0a0a0a]/90 text-white/80 backdrop-blur-xl border border-white/10 opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              {nextLabel}
            </span>
            <ChevronDown className="w-6 h-6 text-white/70 group-hover:text-cyan-400 transition-colors" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
