"use client";

import { useRef, useCallback } from "react";

export default function DynamicBorderGlow({ children, className = "", color = "rgba(255,255,255,0.3)" }) {
  const containerRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      if (!containerRef.current || !glowRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glowRef.current.style.opacity = "1";
      glowRef.current.style.clipPath = `circle(120px at ${x}px ${y}px)`;
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    if (glowRef.current) {
      glowRef.current.style.opacity = "0";
    }
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
    >
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(circle at 0 0, ${color}, transparent 60%)`,
          opacity: 0,
        }}
      />
      <div className="relative z-20">{children}</div>
    </div>
  );
}
