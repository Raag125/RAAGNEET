"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const sectionLabels = {
  hero: "Hero",
  "what-we-build": "What We Build",
  trust: "Trust",
  marquee: "Marquee",
  "value-proposition": "Value",
  portfolio: "Work",
  contact: "Contact",
};

const sectionIds = Object.keys(sectionLabels);

export default function ScrollProgressBar() {
  const [active, setActive] = useState("hero");
  const [hovered, setHovered] = useState(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const els = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section with the highest intersection ratio
        let best = null;
        let bestRatio = 0;
        for (const entry of entries) {
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            best = entry.target.id;
          }
        }
        if (best) setActive(best);
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    );

    observerRef.current = observer;
    els.forEach(el => observer.observe(el));

    return () => {
      els.forEach(el => observer.unobserve(el));
    };
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
