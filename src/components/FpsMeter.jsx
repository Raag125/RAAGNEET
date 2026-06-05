"use client";

import { useState, useEffect } from "react";

export default function FpsMeter() {
  const [fps, setFps] = useState(0);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrameId;

    const tick = () => {
      const now = performance.now();
      const delta = now - lastTime;
      frameCount++;

      if (delta >= 1000) {
        setFps(Math.round((frameCount * 1000) / delta));
        frameCount = 0;
        lastTime = now;
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const colorClass = fps >= 60 ? "text-[#00FFE0]" : fps >= 30 ? "text-yellow-400" : "text-red-500";
  const bgClass = fps >= 60 ? "bg-[#00FFE0]" : fps >= 30 ? "bg-yellow-400" : "bg-red-500";

  return (
    <div className="fixed top-4 right-4 z-[9999] bg-black/40 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 pointer-events-none shadow-lg">
      <div className={`w-2 h-2 rounded-full ${bgClass} animate-pulse`} />
      <span className={`text-xs font-mono font-bold ${colorClass}`}>
        {fps} FPS
      </span>
    </div>
  );
}
