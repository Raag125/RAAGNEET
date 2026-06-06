"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useVelocity } from "framer-motion";

const capabilities = [
  "IMMERSIVE EXPERIENCES", "HIGH-PERFORMANCE SAAS", "ENTERPRISE ARCHITECTURE", 
  "CONVERSION OPTIMIZED", "WEBGL & 3D INTERFACES", "FLUID MICRO-INTERACTIONS", 
  "AWARD WINNING DESIGN", "AI-POWERED PLATFORMS", "CUSTOM CRM SYSTEMS"
];

function MobileMarqueeSection() {
  const topRow = [...capabilities, ...capabilities];
  const bottomRow = [...capabilities].reverse();
  const bottomRowDuplicated = [...bottomRow, ...bottomRow];

  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="relative w-full h-[30vh] flex flex-col justify-center overflow-hidden bg-transparent perspective-1000 md:hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#010103] via-transparent to-[#010103] z-10 pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#010103] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#010103] to-transparent z-10 pointer-events-none" />
      
      <div className="flex flex-col gap-6 relative z-0 origin-center">
        <div className="flex w-max relative">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            className="flex gap-8 px-4"
          >
            {topRow.map((text, i) => (
              <div key={i} className="flex items-center gap-8">
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/30 to-white/5 uppercase tracking-tighter whitespace-nowrap">
                  {text}
                </span>
                <span className="text-white/20 text-3xl">❖</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex w-max relative">
          <motion.div 
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            className="flex gap-8 px-4"
          >
            {bottomRowDuplicated.map((text, i) => (
              <div key={i} className="flex items-center gap-8">
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#00FFE0]/30 to-blue-500/10 uppercase tracking-tighter whitespace-nowrap">
                  {text}
                </span>
                <span className="text-[#00FFE0]/20 text-3xl">❖</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default function MarqueeSection() {
  const containerRef = useRef(null);
  
  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityScale = useTransform(smoothVelocity, [-1000, 0, 1000], [1.2, 1, 1.2]);
  const velocitySkew = useTransform(smoothVelocity, [-1000, 0, 1000], [-10, 0, 10]);

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);
  const rotateVortex = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const topRow = [...capabilities, ...capabilities];
  const bottomRow = [...capabilities].reverse();
  const bottomRowDuplicated = [...bottomRow, ...bottomRow];

  return (
    <>
      <MobileMarqueeSection />

      <motion.section 
        ref={containerRef}
        style={{ scale, opacity, rotate: rotateVortex }}
        className="relative w-full h-[50vh] sm:h-[80vh] flex-col justify-center overflow-hidden bg-transparent perspective-1000 hidden md:flex"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#010103] via-transparent to-[#010103] z-10 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#010103] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#010103] to-transparent z-10 pointer-events-none" />
        
        <motion.div 
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 top-0 h-1 bg-[#00FFE0]/50 blur-sm z-20 pointer-events-none"
        />
        
        <motion.div 
          style={{ scale: velocityScale, skew: velocitySkew }} 
          className="flex flex-col gap-6 sm:gap-12 relative z-0 origin-center"
        >
          <div className="flex w-max relative">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 40, ease: "linear", repeat: Infinity }}
              className="flex gap-8 sm:gap-16 px-4"
            >
              {topRow.map((text, i) => (
                <div key={i} className="flex items-center gap-8 sm:gap-16">
                  <span className="text-[clamp(2.5rem,8vw,8rem)] font-black text-transparent bg-clip-text bg-gradient-to-b from-white/30 to-white/5 uppercase tracking-tighter whitespace-nowrap drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    {text}
                  </span>
                  <span className="text-white/20 text-[clamp(1.875rem,5vw,3rem)]">❖</span>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex w-max relative">
            <motion.div 
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 40, ease: "linear", repeat: Infinity }}
              className="flex gap-8 sm:gap-16 px-4"
            >
              {bottomRowDuplicated.map((text, i) => (
                <div key={i} className="flex items-center gap-8 sm:gap-16">
                  <span className="text-[clamp(2.5rem,8vw,8rem)] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#00FFE0]/30 to-blue-500/10 uppercase tracking-tighter whitespace-nowrap drop-shadow-[0_0_20px_rgba(0,255,224,0.15)]">
                    {text}
                  </span>
                  <span className="text-[#00FFE0]/20 text-[clamp(1.875rem,5vw,3rem)]">❖</span>
                </div>
              ))}
            </motion.div>
          </div>

        </motion.div>
      </motion.section>
    </>
  );
}
