"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemePanel() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  const themes = [
    { id: "default", icon: "⊘", name: "Default", color: "text-gray-400 bg-gray-500/10", border: "border-gray-500/30", glow: "shadow-[0_0_15px_rgba(156,163,175,0.4)]" },
    { id: "cryo", icon: "❄", name: "Cryo", color: "text-cyan-400 bg-cyan-400/10", border: "border-cyan-400/30", glow: "shadow-[0_0_15px_rgba(34,211,238,0.4)]" },
    { id: "monsoon", icon: "💧", name: "Monsoon", color: "text-emerald-400 bg-emerald-400/10", border: "border-emerald-400/30", glow: "shadow-[0_0_15px_rgba(52,211,153,0.4)]" },
    { id: "aurora", icon: "༄", name: "Wind", color: "text-fuchsia-400 bg-fuchsia-400/10", border: "border-fuchsia-400/30", glow: "shadow-[0_0_15px_rgba(232,121,249,0.4)]" },
  ];

  // Close dropdown if user clicks outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentTheme = themes.find((t) => t.id === theme) || themes[0];

  return (
    <div className="relative z-[101] ml-1 sm:ml-2" ref={panelRef}>
      {/* Current Theme Button (Trigger) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Change Theme"
        className={`relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-all duration-300 border bg-[#0a0a0a]/80 backdrop-blur-xl ${currentTheme.color} ${currentTheme.border} ${currentTheme.glow} shadow-2xl ring-1 ring-white/10 hover:ring-white/30`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-[18px] sm:h-[18px]">
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
        </svg>
      </button>

      {/* Vertical Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full right-0 mt-3 flex flex-col items-center gap-2 p-2 rounded-[20px] bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
          >
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                title={t.name}
                className={`relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-all duration-300 border ${
                  theme === t.id
                    ? `${t.color} ${t.border} ${t.glow} scale-110 ring-1 ring-white/30`
                    : "border-transparent text-white/40 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="text-sm sm:text-base leading-none relative top-[1px]">{t.icon}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
