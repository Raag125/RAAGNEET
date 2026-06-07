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

function MobileWhatWeBuild() {
  return (
    <section id="what-we-build-mobile" className="relative w-full py-24 px-6 bg-[#010103] md:hidden overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[60vw] max-w-[300px] aspect-square rounded-full bg-cyan-900/10 blur-[80px]" />
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-start gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start gap-6"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-400 text-[10px] font-bold tracking-[0.3em] uppercase font-syne">Our Arsenal</span>
          </div>
          
          <h2 className="font-bricolage font-black text-white text-5xl leading-[1.05] tracking-tighter italic">
            WHAT WE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 pr-4 block">ENGINEER</span>
          </h2>

          <p className="text-white/50 font-syne text-sm leading-relaxed max-w-sm">
            We design and build immersive digital ecosystems. From lightning-fast interfaces to complex enterprise architectures.
          </p>
        </motion.div>

        <div className="w-full flex flex-col gap-4">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function WhatWeBuild() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Entrance Transforms
  const titleY = useTransform(scrollYProgress, [0, 0.10], [100, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.10], [0, 1]);

  const card1Y = useTransform(scrollYProgress, [0.10, 0.20], [100, 0]);
  const card1Opacity = useTransform(scrollYProgress, [0.10, 0.20], [0, 1]);

  const card2Y = useTransform(scrollYProgress, [0.20, 0.30], [100, 0]);
  const card2Opacity = useTransform(scrollYProgress, [0.20, 0.30], [0, 1]);

  const card3Y = useTransform(scrollYProgress, [0.30, 0.40], [100, 0]);
  const card3Opacity = useTransform(scrollYProgress, [0.30, 0.40], [0, 1]);

  const card4Y = useTransform(scrollYProgress, [0.40, 0.50], [100, 0]);
  const card4Opacity = useTransform(scrollYProgress, [0.40, 0.50], [0, 1]);

  // Exit Transforms
  const titleExitY = useTransform(scrollYProgress, [0.55, 0.65], [0, -50]);
  const titleExitOpacity = useTransform(scrollYProgress, [0.55, 0.65], [1, 0]);

  const card1ExitY = useTransform(scrollYProgress, [0.60, 0.70], [0, -50]);
  const card1ExitOpacity = useTransform(scrollYProgress, [0.60, 0.70], [1, 0]);

  const card2ExitY = useTransform(scrollYProgress, [0.65, 0.75], [0, -50]);
  const card2ExitOpacity = useTransform(scrollYProgress, [0.65, 0.75], [1, 0]);

  const card3ExitY = useTransform(scrollYProgress, [0.70, 0.80], [0, -50]);
  const card3ExitOpacity = useTransform(scrollYProgress, [0.70, 0.80], [1, 0]);

  const card4ExitY = useTransform(scrollYProgress, [0.75, 0.85], [0, -50]);
  const card4ExitOpacity = useTransform(scrollYProgress, [0.75, 0.85], [1, 0]);

  // Combine Enter & Exit
  const finalTitleY = useTransform(scrollYProgress, p => p < 0.52 ? titleY.get() : titleExitY.get());
  const finalTitleOpacity = useTransform(scrollYProgress, p => p < 0.52 ? titleOpacity.get() : titleExitOpacity.get());

  const finalCard1Y = useTransform(scrollYProgress, p => p < 0.55 ? card1Y.get() : card1ExitY.get());
  const finalCard1Opacity = useTransform(scrollYProgress, p => p < 0.55 ? card1Opacity.get() : card1ExitOpacity.get());

  const finalCard2Y = useTransform(scrollYProgress, p => p < 0.60 ? card2Y.get() : card2ExitY.get());
  const finalCard2Opacity = useTransform(scrollYProgress, p => p < 0.60 ? card2Opacity.get() : card2ExitOpacity.get());

  const finalCard3Y = useTransform(scrollYProgress, p => p < 0.65 ? card3Y.get() : card3ExitY.get());
  const finalCard3Opacity = useTransform(scrollYProgress, p => p < 0.65 ? card3Opacity.get() : card3ExitOpacity.get());

  const finalCard4Y = useTransform(scrollYProgress, p => p < 0.70 ? card4Y.get() : card4ExitY.get());
  const finalCard4Opacity = useTransform(scrollYProgress, p => p < 0.70 ? card4Opacity.get() : card4ExitOpacity.get());

  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <>
      <MobileWhatWeBuild />

      <section 
        ref={containerRef}
        id="what-we-build" 
        className="relative w-full h-[400vh] bg-[#010103] hidden md:block"
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
                style={{ y: finalTitleY, opacity: finalTitleOpacity }}
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
                <div className="flex flex-col gap-4 h-full">
                  <motion.div style={{ y: finalCard1Y, opacity: finalCard1Opacity }} className="flex-1 flex flex-col">
                    <ServiceCard {...services[0]} />
                  </motion.div>
                  <motion.div style={{ y: finalCard2Y, opacity: finalCard2Opacity }} className="flex-1 flex flex-col">
                    <ServiceCard {...services[1]} />
                  </motion.div>
                </div>
                {/* Cards 3 & 4 */}
                <div className="flex flex-col gap-4 sm:mt-12 h-full">
                  <motion.div style={{ y: finalCard3Y, opacity: finalCard3Opacity }} className="flex-1 flex flex-col">
                    <ServiceCard {...services[2]} />
                  </motion.div>
                  <motion.div style={{ y: finalCard4Y, opacity: finalCard4Opacity }} className="flex-1 flex flex-col">
                    <ServiceCard {...services[3]} />
                  </motion.div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
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
