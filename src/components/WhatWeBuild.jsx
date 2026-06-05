"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Globe, Database, Shield, Zap } from "lucide-react";

const services = [
  {
    title: "Premium Websites",
    desc: "High-conversion platforms. Blazingly fast & SEO optimized.",
    icon: Globe,
    color: "from-cyan-400 to-blue-600",
  },
  {
    title: "CRM Systems",
    desc: "Advanced management to streamline sales and retention.",
    icon: Database,
    color: "from-purple-400 to-pink-600",
  },
  {
    title: "ERP Systems",
    desc: "Scalable planning to unify your operational workflow.",
    icon: Shield,
    color: "from-blue-400 to-indigo-600",
  },
  {
    title: "Custom Tools",
    desc: "Tailor-made solutions built for your unique needs.",
    icon: Zap,
    color: "from-amber-400 to-orange-600",
  },
];

export default function WhatWeBuild() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // --- TIMELINE ---
  // 0.0 - 0.15: Enter Title Block
  // 0.15 - 0.30: Enter Cards 1 & 2
  // 0.30 - 0.45: Enter Cards 3 & 4
  // 0.45 - 0.70: Hold
  // 0.70 - 0.80: Exit Title Block
  // 0.80 - 0.90: Exit Cards 1 & 2
  // 0.90 - 1.00: Exit Cards 3 & 4

  // Entrance Transforms
  const titleY = useTransform(scrollYProgress, [0, 0.15], [100, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const titleBlur = useTransform(scrollYProgress, [0, 0.15], [20, 0]);

  const cards12Y = useTransform(scrollYProgress, [0.15, 0.30], [100, 0]);
  const cards12Opacity = useTransform(scrollYProgress, [0.15, 0.30], [0, 1]);
  const cards12Blur = useTransform(scrollYProgress, [0.15, 0.30], [20, 0]);

  const cards34Y = useTransform(scrollYProgress, [0.30, 0.45], [100, 0]);
  const cards34Opacity = useTransform(scrollYProgress, [0.30, 0.45], [0, 1]);
  const cards34Blur = useTransform(scrollYProgress, [0.30, 0.45], [20, 0]);

  // Exit Transforms
  const titleExitY = useTransform(scrollYProgress, [0.70, 0.80], [0, -50]);
  const titleExitOpacity = useTransform(scrollYProgress, [0.70, 0.80], [1, 0]);
  const titleExitBlur = useTransform(scrollYProgress, [0.70, 0.80], [0, 15]);

  const cards12ExitY = useTransform(scrollYProgress, [0.80, 0.90], [0, -50]);
  const cards12ExitOpacity = useTransform(scrollYProgress, [0.80, 0.90], [1, 0]);
  const cards12ExitBlur = useTransform(scrollYProgress, [0.80, 0.90], [0, 15]);

  const cards34ExitY = useTransform(scrollYProgress, [0.90, 1.00], [0, -50]);
  const cards34ExitOpacity = useTransform(scrollYProgress, [0.90, 1.00], [1, 0]);
  const cards34ExitBlur = useTransform(scrollYProgress, [0.90, 1.00], [0, 15]);

  // Combine Enter & Exit
  const finalTitleY = useTransform(scrollYProgress, p => p < 0.5 ? titleY.get() : titleExitY.get());
  const finalTitleOpacity = useTransform(scrollYProgress, p => p < 0.5 ? titleOpacity.get() : titleExitOpacity.get());
  const finalTitleBlur = useTransform(scrollYProgress, p => p < 0.5 ? titleBlur.get() : titleExitBlur.get());
  const finalTitleFilter = useTransform(finalTitleBlur, v => `blur(${v}px)`);

  const finalCards12Y = useTransform(scrollYProgress, p => p < 0.6 ? cards12Y.get() : cards12ExitY.get());
  const finalCards12Opacity = useTransform(scrollYProgress, p => p < 0.6 ? cards12Opacity.get() : cards12ExitOpacity.get());
  const finalCards12Blur = useTransform(scrollYProgress, p => p < 0.6 ? cards12Blur.get() : cards12ExitBlur.get());
  const finalCards12Filter = useTransform(finalCards12Blur, v => `blur(${v}px)`);

  const finalCards34Y = useTransform(scrollYProgress, p => p < 0.7 ? cards34Y.get() : cards34ExitY.get());
  const finalCards34Opacity = useTransform(scrollYProgress, p => p < 0.7 ? cards34Opacity.get() : cards34ExitOpacity.get());
  const finalCards34Blur = useTransform(scrollYProgress, p => p < 0.7 ? cards34Blur.get() : cards34ExitBlur.get());
  const finalCards34Filter = useTransform(finalCards34Blur, v => `blur(${v}px)`);

  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section 
      ref={containerRef}
      id="what-we-build" 
      className="relative w-full h-[400vh] bg-[#010103]"
    >
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        
        {/* Background Ambience */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            style={{ y: bgY }}
            className="absolute top-1/4 right-1/4 w-[40vw] max-w-[500px] aspect-square rounded-full bg-cyan-900/20 blur-[120px]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_10%,transparent_100%)]" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24 w-full relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
            
            {/* Text Content */}
            <motion.div 
              style={{ y: finalTitleY, opacity: finalTitleOpacity, filter: finalTitleFilter }}
              className="lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-cyan-400 text-[10px] font-bold tracking-[0.3em] uppercase font-syne">Our Arsenal</span>
              </div>
              
              <h2 className="font-bricolage font-black text-white text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tighter italic mb-6">
                WHAT WE<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 pr-4 block">ENGINEER</span>
              </h2>

              <p className="text-white/40 font-syne text-sm sm:text-base leading-relaxed max-w-sm">
                We design and build immersive digital ecosystems. From lightning-fast interfaces to complex enterprise architectures.
              </p>
            </motion.div>

            {/* Cards Grid */}
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full items-stretch">
              {/* Cards 1 & 2 */}
              <motion.div style={{ y: finalCards12Y, opacity: finalCards12Opacity, filter: finalCards12Filter }} className="flex flex-col gap-4 h-full">
                <ServiceCard {...services[0]} />
                <ServiceCard {...services[1]} />
              </motion.div>
              {/* Cards 3 & 4 */}
              <motion.div style={{ y: finalCards34Y, opacity: finalCards34Opacity, filter: finalCards34Filter }} className="flex flex-col gap-4 sm:mt-12 h-full">
                <ServiceCard {...services[2]} />
                <ServiceCard {...services[3]} />
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ title, desc, icon: Icon, color }) {
  return (
    <div className="group relative flex-1 flex flex-col p-6 sm:p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300 h-full min-h-[260px]">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex justify-between items-start mb-auto relative z-10">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color} bg-opacity-10 backdrop-blur-sm border border-white/10`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/5 backdrop-blur-sm -translate-y-2 group-hover:translate-y-0">
          <ArrowUpRight className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="relative z-10 mt-8">
        <h3 className="text-white font-bricolage font-bold text-2xl mb-3 tracking-tight">
          {title}
        </h3>
        <p className="text-white/50 font-syne text-sm leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}
