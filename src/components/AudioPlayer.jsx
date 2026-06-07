"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Disc3 } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const THEME_TRACKS = {
  // Reliable MP3 tracks mapped to themes (OGG format fails in Safari)
  default: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  cryo: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  aurora: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  monsoon: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
};

export default function AudioPlayer() {
  const { theme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const userInteractedRef = useRef(false);
  const userManuallyToggledRef = useRef(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.4;

    let hasInteracted = false;
    let allowAutoPlay = false;

    // Delay theme music by exactly 6 seconds (4s loading video + 2s silence)
    // This prevents the website music from mixing with the cinematic loader audio
    const unlockTimer = setTimeout(() => {
      allowAutoPlay = true;
      if (hasInteracted && !userManuallyToggledRef.current && audio.paused) {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }, 6000);

    const tryAutoPlay = () => {
      hasInteracted = true;
      userInteractedRef.current = true;
      if (allowAutoPlay && !userManuallyToggledRef.current && audio.paused) {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };

    // Listen to virtually any interaction
    const events = ["click", "scroll", "mousemove", "touchstart", "keydown"];
    const handleInitialInteraction = () => {
      tryAutoPlay();
      events.forEach(e => document.removeEventListener(e, handleInitialInteraction));
    };

    events.forEach(e => document.addEventListener(e, handleInitialInteraction, { once: true }));

    return () => {
      clearTimeout(unlockTimer);
      events.forEach(e => document.removeEventListener(e, handleInitialInteraction));
    };
  }, []);

  // Listen for Theme Changes and switch track seamlessly
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const wasPlaying = !audio.paused;
    
    // Fade out slightly before switching (optional, but setting src immediately works fine)
    audio.src = THEME_TRACKS[theme] || THEME_TRACKS.default;
    audio.volume = theme === 'default' ? 0.3 : 0.4; // Slightly lower volume for piano

    if (wasPlaying) {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [theme]);

  const togglePlay = (e) => {
    e.stopPropagation();
    userInteractedRef.current = true; 
    userManuallyToggledRef.current = true; // Mark that user explicitly pressed play/pause
    
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
      {/* Theme-Dynamic Audio Track */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src={THEME_TRACKS.default} 
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
