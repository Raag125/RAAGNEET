"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function MobilePreviewPage() {
  const [url, setUrl] = useState("/");
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      // 812 is the fixed height of the phone.
      // 140 is roughly the height of the header + padding we want to preserve.
      const availableHeight = window.innerHeight - 140;
      // Calculate how much we need to scale down to fit available height
      const targetScale = Math.min(1, availableHeight / 812);
      setScale(targetScale);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#010103] flex flex-col items-center justify-center pt-16">
      {/* Header / Controls */}
      <div className="fixed top-0 left-0 w-full p-4 flex justify-between items-center z-[100] bg-black/50 backdrop-blur-md border-b border-white/10">
        {/* Left spacing to push the input to the right if needed, or we can just justify-end */}
        <div className="flex-1"></div>
        <div className="flex gap-2">
          <input 
            type="text" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="bg-black/50 border border-white/20 text-white px-3 py-1.5 rounded-md text-sm w-40 focus:outline-none focus:border-cyan-400/50"
            placeholder="Path to preview..."
          />
        </div>
      </div>

      {/* Mobile Device Canvas */}
      <motion.div 
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: scale }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {/* iPhone Bezel */}
        <div className="relative w-[375px] h-[812px] bg-black rounded-[50px] border-[12px] border-[#1a1a1a] shadow-[0_0_0_1px_#333,0_0_50px_rgba(0,255,224,0.1)] overflow-hidden flex flex-col isolate">
          {/* Dynamic Island Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-full z-20" />
          
          {/* Status bar placeholder */}
          <div className="h-10 w-full bg-black shrink-0 flex items-center justify-between px-6 pt-2 z-10">
            <span className="text-white text-xs font-medium pl-2">9:41</span>
            <div className="flex items-center gap-1.5 opacity-80 pr-2">
              <svg width="14" height="10" viewBox="0 0 14 10" fill="white"><path d="M0 10H2V6H0V10ZM4 10H6V4H4V10ZM8 10H10V2H8V10ZM12 0V10H14V0H12Z"/></svg>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="white"><path d="M7 0C4.3 0 1.9 1 0 2.6L7 10L14 2.6C12.1 1 9.7 0 7 0Z"/></svg>
              <svg width="20" height="10" viewBox="0 0 20 10" fill="white"><path d="M1 2C0.45 2 0 2.45 0 3V7C0 7.55 0.45 8 1 8H16C16.55 8 17 7.55 17 7V3C17 2.45 16.55 2 16 2H1ZM18 3.5V6.5C18.8 6.15 19.4 5.4 19.4 4.5V5.5C19.4 4.6 18.8 3.85 18 3.5Z"/></svg>
            </div>
          </div>

          {/* Iframe for the preview */}
          <iframe 
            src={url}
            className="w-full flex-1 bg-[#010103] border-none"
            style={{ width: '100%', height: 'calc(100% - 40px)' }}
          />

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[4px] bg-white rounded-full z-20 pointer-events-none" />
        </div>
        
        {/* Glow behind phone */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#00FFE0] rounded-full blur-[120px] opacity-20 -z-10 pointer-events-none" />
      </motion.div>
    </div>
  );
}
