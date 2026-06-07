"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Disc3 } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.4;

    // Extremely aggressive autoplay strategy for 'start up' feel
    // Browsers block pure autoplay, so we instantly trigger it on the very first pixel of mouse movement or scroll
    const tryAutoPlay = () => {
      if (audio.paused) {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };

    // Listen to virtually any interaction
    const events = ["click", "scroll", "mousemove", "touchstart", "keydown"];
    const handleInitialInteraction = () => {
      tryAutoPlay();
      // Remove listeners once initiated so we don't spam the play command
      events.forEach(e => document.removeEventListener(e, handleInitialInteraction));
    };

    events.forEach(e => document.addEventListener(e, handleInitialInteraction, { once: true }));

    return () => {
      events.forEach(e => document.removeEventListener(e, handleInitialInteraction));
    };
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      {/* Reliable SoundHelix test audio file */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-6 left-6 z-[999] flex items-center justify-center w-12 h-12 rounded-full border border-white/[0.1] bg-[#050505]/80 backdrop-blur-3xl shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden group cursor-pointer hover:border-[#00FFE0]/50 transition-all duration-300"
        onClick={togglePlay}
        title={isPlaying ? "Mute Audio" : "Play Audio"}
      >
        {isPlaying ? (
          <div className="flex items-end gap-[2px] h-[14px]">
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: ["2px", `${Math.random() * 12 + 4}px`, "2px"] }}
                transition={{ duration: Math.random() * 0.4 + 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                className="w-[3px] bg-[#00FFE0] shadow-[0_0_8px_rgba(0,255,224,0.6)] rounded-sm"
              />
            ))}
          </div>
        ) : (
          <Play className="w-4 h-4 text-white/50 group-hover:text-white translate-x-[1px] transition-colors" />
        )}
        
        {isPlaying && (
          <div className="absolute inset-0 rounded-full border border-[#00FFE0]/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none" />
        )}
      </motion.div>
    </>
  );
}
