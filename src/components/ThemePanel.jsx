"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

function BeautifulClock() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  };

  if (!time) return null;

  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 right-6 sm:top-6 sm:right-10 z-[100] flex items-center justify-center pointer-events-none"
    >
      <span className="font-bricolage font-black text-lg sm:text-2xl tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-100 to-cyan-500 drop-shadow-[0_0_15px_rgba(0,255,224,0.6)]">
        {formatTime(time)}
      </span>
    </motion.div>
  );
}

export default function ThemePanel() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  const themes = [
    { id: "default", icon: "⊘", name: "Default", color: "text-gray-400 bg-gray-500/10", border: "border-gray-500/30", glow: "shadow-[0_0_15px_rgba(156,163,175,0.4)]" },
    { id: "cryo", icon: "❄", name: "Cryo", color: "text-cyan-400 bg-cyan-400/10", border: "border-cyan-400/30", glow: "shadow-[0_0_15px_rgba(34,211,238,0.4)]" },
    { id: "monsoon", icon: "💧", name: "Monsoon", color: "text-emerald-400 bg-emerald-400/10", border: "border-emerald-400/30", glow: "shadow-[0_0_15px_rgba(52,211,153,0.4)]" },
    { id: "aurora", icon: "༄", name: "Wind", color: "text-slate-300 bg-slate-300/10", border: "border-slate-300/30", glow: "shadow-[0_0_15px_rgba(203,213,225,0.4)]" },
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
    <>
      <BeautifulClock />
      <div className="absolute top-[70px] right-6 sm:top-[85px] sm:right-10 z-[100] pointer-events-auto">
        <div className="flex flex-row items-center gap-1.5 p-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
          {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            title={t.name}
            className={`relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full transition-all duration-300 border ${
              theme === t.id
                ? `${t.color} ${t.border} ${t.glow} scale-110 ring-1 ring-white/30`
                : "border-transparent text-white/40 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span className="text-xs sm:text-sm leading-none relative top-[1px]">{t.icon}</span>
          </button>
        ))}
        </div>
      </div>
    </>
  );
}
