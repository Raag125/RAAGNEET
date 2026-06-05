"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

export default function ThemePanel() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: "default", icon: "⊘", name: "Default", color: "text-gray-400 bg-gray-500/10", border: "border-gray-500/30", glow: "shadow-[0_0_15px_rgba(156,163,175,0.4)]" },
    { id: "cryo", icon: "❄", name: "Cryo", color: "text-cyan-400 bg-cyan-400/10", border: "border-cyan-400/30", glow: "shadow-[0_0_15px_rgba(34,211,238,0.4)]" },
    { id: "monsoon", icon: "💧", name: "Monsoon", color: "text-emerald-400 bg-emerald-400/10", border: "border-emerald-400/30", glow: "shadow-[0_0_15px_rgba(52,211,153,0.4)]" },
    { id: "aurora", icon: "༄", name: "Wind", color: "text-fuchsia-400 bg-fuchsia-400/10", border: "border-fuchsia-400/30", glow: "shadow-[0_0_15px_rgba(232,121,249,0.4)]" },
  ];

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10 z-[101] ml-2 shadow-2xl">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          title={t.name}
          className={`relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-all duration-300 border ${
            theme === t.id 
              ? `${t.color} ${t.border} ${t.glow} scale-110 ring-1 ring-white/30` 
              : "border-transparent text-white/40 hover:bg-white/5 hover:text-white hover:scale-105"
          }`}
          aria-label={`Switch to ${t.id} theme`}
        >
          <span className="text-sm sm:text-base leading-none relative top-[1px]">{t.icon}</span>
        </button>
      ))}
    </div>
  );
}
