"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Fintech Dashboard UI",
    client: "Nexus Capital",
    description: "A complete overhaul of a high-frequency trading dashboard. Reduced render times by 40% while introducing fluid micro-interactions that guided traders to critical alerts faster.",
    stats: "+24% User Retention",
    image: "url('/images/fintech_dashboard_1780477402274.png') center/cover",
  },
  {
    id: 2,
    title: "E-Commerce 3D Configurator",
    client: "Aura Automotive",
    description: "Developed an interactive WebGL car configurator that allowed users to customize materials and paint in real-time, holding user attention for an average of 4.5 minutes per session.",
    stats: "+310% Time on Site",
    image: "url('/images/ecommerce_3d_1780477414147.png') center/cover",
  },
  {
    id: 3,
    title: "SaaS Marketing Site",
    client: "Orbit.AI",
    description: "A dark-mode, glassmorphism-heavy landing page focused entirely on conversion optimization. We replaced static graphics with physics-based interactions that drove users straight to the pricing page.",
    stats: "+42% Conversion Rate",
    image: "url('/images/saas_marketing_1780477428906.png') center/cover",
  },
  {
    id: 4,
    title: "AI Medical Platform",
    client: "Aether Health",
    description: "A modern AI healthcare platform interface featuring clean medical data visualization, designed to enhance diagnostic accuracy and streamline patient data workflows.",
    stats: "+15% Diagnostic Speed",
    image: "url('/images/ai_medical_1780477443164.png') center/cover",
  },
  {
    id: 5,
    title: "Crypto Mobile Wallet",
    client: "Neon Finance",
    description: "A sleek cryptocurrency mobile wallet app interface with neon accents and a dark mode aesthetic. Features secure biometric authentication and instant cross-chain swapping.",
    stats: "+85% Active Users",
    image: "url('/images/crypto_wallet_1780477456903.png') center/cover",
  }
];

function MobilePortfolio() {
  return (
    <section className="relative w-full py-24 bg-[#010103] md:hidden overflow-hidden">
      <div className="px-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            The <span className="text-gradient">Portfolio</span> Matrix
          </h2>
          <p className="text-gray-400 text-base">
            We don't build pretty templates. We engineer digital assets that perform.
          </p>
        </motion.div>
      </div>

      <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar px-6 pb-8 gap-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
        {projects.map((project, idx) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="shrink-0 w-[85vw] snap-center glass-card rounded-3xl overflow-hidden relative min-h-[400px] flex flex-col justify-end p-6 border border-white/10 shadow-2xl"
            style={{ background: project.image }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#010103] via-[#010103]/80 to-transparent z-0" />
            
            <div className="relative z-10">
              <div className="inline-block px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-400/30 text-cyan-400 font-bold text-[10px] uppercase tracking-wider mb-4 backdrop-blur-md">
                Result: {project.stats}
              </div>
              <h3 className="text-2xl font-bold text-white mb-1 leading-tight">{project.title}</h3>
              <p className="text-xs text-white/50 uppercase tracking-wider mb-4">{project.client}</p>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">
                {project.description}
              </p>
              <button className="flex items-center gap-2 text-cyan-400 font-medium text-sm transition-colors">
                View Case Study <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function Portfolio() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let index = Math.floor(latest * projects.length);
    if (index >= projects.length) index = projects.length - 1;
    if (index < 0) index = 0;
    
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  const activeProject = projects[activeIndex];

  const handleNavClick = (idx) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const windowHeight = window.innerHeight;
    const scrollableDistance = (projects.length * windowHeight) - windowHeight;
    const targetScroll = containerTop + ((idx / projects.length) * scrollableDistance) + 10;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <>
      <MobilePortfolio />

      <section id="work" ref={containerRef} style={{ height: `${projects.length * 100}vh` }} className="relative w-full hidden md:block">
        <div className="sticky top-0 h-[100svh] w-full flex flex-col overflow-hidden py-4 sm:py-8 lg:py-12 bg-[#010103]">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 h-full flex flex-col">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-4 sm:mb-8 shrink-0 text-center lg:text-left pt-16 lg:pt-0"
            >
              <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-white mb-2 md:mb-4 leading-tight">
                The <span className="text-gradient">Portfolio</span> Matrix
              </h2>
              <p className="text-gray-400 max-w-2xl text-sm md:text-lg mx-auto lg:mx-0">
                We don't build pretty templates. We engineer digital assets that perform. 
                Scroll down to explore our interactive showcase.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
              className="glass-card rounded-3xl p-3 sm:p-4 md:p-8 flex flex-col lg:flex-row gap-4 md:gap-8 relative overflow-hidden flex-1 w-full min-h-0"
            >
              
              {/* Navigation Sidebar */}
              <div 
                className="w-full lg:w-1/3 flex lg:flex-col gap-3 relative z-10 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0" 
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <style>{`
                  .w-full.lg\\:w-1\\/3::-webkit-scrollbar { display: none; }
                `}</style>
                {projects.map((project, idx) => (
                  <button
                    key={project.id}
                    onClick={() => handleNavClick(idx)}
                    className={`text-left p-4 lg:p-6 rounded-2xl transition-all duration-300 flex-shrink-0 min-w-[200px] lg:min-w-0 ${
                      activeIndex === idx 
                        ? "bg-white/10 border-primary shadow-[0_0_15px_rgba(99,102,241,0.2)]" 
                        : "hover:bg-white/5 border-transparent opacity-60 hover:opacity-100"
                    } border`}
                  >
                  <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">{project.client}</p>
                </button>
              ))}
            </div>

            {/* Project Display Box */}
            <div className="w-full lg:w-2/3 min-h-[400px] lg:min-h-0 lg:h-full flex-1 relative rounded-2xl overflow-hidden group">
              <AnimatePresence mode="wait">
                {activeProject && (
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 flex flex-col justify-end p-8"
                    style={{ background: activeProject.image }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/60 to-transparent"></div>
                    
                    <div className="relative z-10">
                      <div className="inline-block px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent font-bold text-sm mb-6 backdrop-blur-md">
                        Result: {activeProject.stats}
                      </div>
                      <h3 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-white mb-4 leading-tight">{activeProject.title}</h3>
                      <p className="text-gray-300 text-lg max-w-2xl leading-relaxed mb-8">
                        {activeProject.description}
                      </p>
                      <button className="flex items-center gap-2 text-white font-medium hover:text-primary transition-colors">
                        View Full Case Study <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Interactive overlay element */}
              <div className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer hover:bg-white/20">
                <ExternalLink className="w-5 h-5 text-white" />
              </div>
            </div>
            
          </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
