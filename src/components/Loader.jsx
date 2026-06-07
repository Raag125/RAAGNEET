"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    // Force the loader to disappear exactly after 4 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    // SMART AUTOPLAY ENGINE: Try unmuted audio first. 
    // If the browser blocks it (causing the 'stuck' bug), fallback to muted video.
    if (videoRef.current) {
      videoRef.current.muted = false;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Browser blocked unmuted autoplay. Mute it and force play so it doesn't freeze.
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(e => console.log("Fallback also failed", e));
          }
        });
      }
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-[#010103] overflow-hidden"
        >
          {/* Ambient Glow behind the video */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
            <div className="w-[50vw] h-[50vw] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ scale: 1.8, opacity: 0, filter: "blur(30px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 z-10 w-full h-full flex items-center justify-center overflow-hidden pointer-events-none"
          >
            <video
              ref={videoRef}
              src="/loading-video.mp4"
              playsInline
              muted
              className="w-full h-full object-cover mix-blend-screen opacity-90"
            />

            {/* 
              🛸 QUANTUM CORE WATERMARK COVER 🛸
              👇 ADJUST THESE COORDINATES TO MANUALLY COVER THE STAR 👇
            */}
            <div
              className="absolute z-50 flex items-center justify-center pointer-events-none"
              style={{
                bottom: "8.8%",  // Y-Axis: Increase to move UP, decrease to move DOWN
                right: "7.8%"    // X-Axis: Increase to move LEFT, decrease to move RIGHT
              }}
            >
              {/* Outer Energy Field */}
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute w-24 h-24 rounded-full border border-cyan-500/30 border-dashed"
              />
              {/* Inner Rotating Polygon */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute w-16 h-16 bg-gradient-to-tr from-blue-600/40 to-cyan-400/40 blur-[2px]"
                style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
              />
              {/* Core Starburst (Covers the actual icon) */}
              <motion.div
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-12 h-12 bg-[#00FFE0] rounded-full shadow-[0_0_40px_#00FFE0,inset_0_0_15px_#ffffff] flex items-center justify-center"
              >
                <div className="w-6 h-6 bg-white rounded-full blur-[2px]" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
