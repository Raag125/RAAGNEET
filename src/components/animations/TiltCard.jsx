"use client";

import { useRef, useCallback } from "react";

export default function TiltCard({ children, className = "", maxTilt = 8, glare = true }) {
  const ref = useRef(null);
  const frameRef = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      if (!ref.current) return;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        ref.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;

        if (glare) {
          const glareX = (x / rect.width) * 100;
          const glareY = (y / rect.height) * 100;
          ref.current.style.setProperty("--glare-x", `${glareX}%`);
          ref.current.style.setProperty("--glare-y", `${glareY}%`);
        }
      });
    },
    [maxTilt, glare]
  );

  const handleMouseLeave = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (!ref.current) return;
    ref.current.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-[transform,background] duration-300 ease-out will-change-transform ${className}`}
      style={{
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        ...(glare ? {
          background: `radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,255,255,0.04) 0%, transparent 60%)`,
        } : {}),
      }}
    >
      {children}
    </div>
  );
}
