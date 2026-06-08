"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const sectionLabels = {
  hero: "Hero",
  trust: "Trust",
  "what-we-build": "What We Build",
  marquee: "Marquee",
  "value-proposition": "Value",
  portfolio: "Work",
  contact: "Contact",
};

const sectionIds = Object.keys(sectionLabels);

export default function ScrollProgressBar() {
  const [active, setActive] = useState("hero");
  const [hovered, setHovered] = useState(null);
  useEffect(() => {
    const handleScroll = () => {
      // Use a trigger point slightly above the center of the screen
      const triggerY = window.innerHeight * 0.4;
      
      let currentActive = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the trigger point falls inside the section's rect
          if (rect.top <= triggerY && rect.bottom >= triggerY) {
            currentActive = id;
            // Break early since we found the active one
            break;
          }
        }
      }

      // Fallback: if we are at the absolute bottom of the page, activate the last section
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        currentActive = sectionIds[sectionIds.length - 1];
      }

      if (currentActive) {
        setActive((prev) => (prev !== currentActive ? currentActive : prev));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const idx = sectionIds.indexOf(active);
  const progress = idx >= 0 ? (idx / (sectionIds.length - 1)) * 100 : 0;

  return (
    <div className="fixed right-3 sm:right-4 top-1/2 -translate-y-1/2 z-[90] flex flex-col items-center gap-0 pointer-events-none">
      {/* Vertical track */}
      <div className="relative w-px h-[30vh] min-h-[200px] max-h-[300px] bg-white/[0.04] rounded-full overflow-hidden pointer-events-auto">
        {/* Fill bar */}
        <motion.div
          animate={{ height: `${progress}%` }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#00FFE0]/60 to-[#00FFE0]/20 rounded-full"
        />
      </div>

      {/* Dots + labels */}
      <div className="absolute inset-0 flex flex-col justify-between py-[10px] pointer-events-auto">
        {sectionIds.map((id, i) => {
          const isActive = id === active;
          const isHovered = id === hovered;
          const label = sectionLabels[id];

          return (
            <div
              key={id}
              className="relative flex items-center justify-center"
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
            >
              <a
                href={`#${id}`}
                className="group flex items-center"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {/* Label tooltip (left side) */}
                <span
                  className={`
                    absolute right-4 whitespace-nowrap text-xs font-medium tracking-wider uppercase
                    transition-all duration-300 pointer-events-none
                    ${isActive || isHovered
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-2"
                    }
                    ${isActive ? "text-[#00FFE0]" : "text-white/50"}
                  `}
                >
                  {label}
                </span>

                {/* Dot */}
                <span
                  className={`
                    relative w-[6px] h-[6px] rounded-full transition-all duration-300
                    ${isActive
                      ? "bg-[#00FFE0] shadow-[0_0_8px_#00FFE0] scale-125"
                      : "bg-white/20 hover:bg-white/40 scale-100"
                    }
                  `}
                />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
