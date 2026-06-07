"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
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

      <div className="flex flex-col px-6 pb-24 gap-12" style={{ perspective: 1000 }}>
        {projects.map((project, idx) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 80, scale: 0.9, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: -80, scale: 0.9, rotateX: -15 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full glass-card rounded-3xl overflow-hidden relative min-h-[450px] flex flex-col justify-end p-6 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            style={{ background: project.image }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#010103] via-[#010103]/80 to-transparent z-0" />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10"
            >
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-block px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-400/30 text-cyan-400 font-bold text-[10px] uppercase tracking-wider mb-4 backdrop-blur-md"
              >
                Result: {project.stats}
              </motion.div>
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-2xl font-bold text-white mb-1 leading-tight"
              >
                {project.title}
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-xs text-white/50 uppercase tracking-wider mb-4"
              >
                {project.client}
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-gray-300 text-sm leading-relaxed mb-6"
              >
                {project.description}
              </motion.p>
              <motion.button 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex items-center gap-2 text-cyan-400 font-medium text-sm transition-colors"
              >
                View Case Study <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
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

  return (
    <>
      <MobilePortfolio />

      <section id="work" ref={containerRef} style={{ height: `${projects.length * 150}vh` }} className="relative w-full bg-[#010103] hidden md:block">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          
          {/* Title pinned at the top */}
          <div className="absolute top-20 md:top-24 left-0 w-full text-center z-50 pointer-events-none">
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black text-white leading-tight tracking-tight drop-shadow-2xl">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Portfolio</span> Matrix
            </h2>
            <p className="text-white/40 mt-2 font-syne uppercase tracking-[0.2em] text-sm">
              Zero Templates. Pure Engineering.
            </p>
          </div>

          {projects.map((project, i) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              i={i} 
              total={projects.length} 
              scrollYProgress={scrollYProgress} 
            />
          ))}

          {/* Mini navigation window */}
          <div className="absolute right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-50 rounded-3xl p-6 hidden md:flex flex-col gap-4 w-64 border border-white/[0.05] bg-[#0a0a0a]/60 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:pointer-events-none">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white/50 text-[10px] uppercase tracking-[0.2em] font-bold font-syne flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(0,255,224,0.8)]" />
                Index
              </h4>
              <span className="text-white/30 text-[10px] font-mono tracking-widest">SYS.0{activeIndex + 1}</span>
            </div>
            
            <div className="relative flex flex-col gap-5 pl-2">
              {/* Vertical connecting line */}
              <div className="absolute left-[3px] top-2 bottom-2 w-px bg-white/10" />
              
              {projects.map((project, i) => (
                <NavTracker key={project.id} i={i} title={project.title} total={projects.length} scrollYProgress={scrollYProgress} />
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

function NavTracker({ i, title, total, scrollYProgress }) {
  const step = 1 / total;
  const start = i * step;
  const end = (i + 1) * step;

  // Highlight if scroll progress is currently within this project's bounds
  const isActive = useTransform(scrollYProgress, (v) => {
    // For the first item, it's active from 0. For the last, it stays active.
    const effectiveStart = i === 0 ? 0 : start;
    const effectiveEnd = i === total - 1 ? 1 : end;
    return v >= effectiveStart && v < effectiveEnd;
  });

  const opacity = useTransform(isActive, (active) => active ? 1 : 0.3);
  const x = useTransform(isActive, (active) => active ? 8 : 0);
  const color = useTransform(isActive, (active) => active ? "#00FFE0" : "#ffffff");
  const scale = useTransform(isActive, (active) => active ? 1.5 : 1);
  const glow = useTransform(isActive, (active) => active ? "0 0 10px rgba(0,255,224,0.6)" : "none");

  return (
    <motion.div style={{ opacity, x }} className="flex items-center gap-4 relative group">
      <motion.div 
        style={{ backgroundColor: color, scale, boxShadow: glow }} 
        className="w-1.5 h-1.5 rounded-full relative z-10 transition-colors duration-300" 
      />
      <motion.span 
        style={{ color }} 
        className="text-xs font-semibold font-syne tracking-wide transition-colors duration-300"
      >
        {title}
      </motion.span>
    </motion.div>
  );
}

function ProjectCard({ project, i, total, scrollYProgress }) {
  const step = 1 / total;
  const start = i * step;
  const end = (i + 1) * step;
  
  const fadeInStart = start;
  const fadeInEnd = start + (step * 0.25);
  const fadeOutStart = end - (step * 0.25);
  const fadeOutEnd = end;

  // Different animations based on index
  const animType = i % 4;
  let enterX = 0, exitX = 0;
  let enterY = 0, exitY = 0;
  let enterScale = 1, exitScale = 1;
  let enterRotate = 0, exitRotate = 0;

  if (animType === 0) {
    // Zoom in and out
    enterScale = 0.8; exitScale = 1.1;
  } else if (animType === 1) {
    // Slide horizontally
    enterX = 300; exitX = -300;
  } else if (animType === 2) {
    // Slide vertically
    enterY = 200; exitY = -200;
  } else {
    // Rotate and scale
    enterRotate = 15; exitRotate = -15;
    enterScale = 0.85; exitScale = 1.15;
  }

  const opacity = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [enterScale, 1, 1, exitScale]
  );

  const x = useTransform(scrollYProgress, [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd], [enterX, 0, 0, exitX]);
  const y = useTransform(scrollYProgress, [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd], [enterY, 0, 0, exitY]);
  const rotate = useTransform(scrollYProgress, [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd], [enterRotate, 0, 0, exitRotate]);

  // Fix ghosting by strictly hiding the element when its opacity is effectively 0
  const finalVisibility = useTransform(scrollYProgress, (v) => {
    if (i === 0) {
      return v <= fadeOutEnd ? "visible" : "hidden";
    }
    return v >= fadeInStart && v <= fadeOutEnd ? "visible" : "hidden";
  });

  // For the first item, stay visible at 0
  const finalOpacity = i === 0 
    ? useTransform(scrollYProgress, [0, fadeOutStart, fadeOutEnd], [1, 1, 0])
    : opacity;
    
  const finalScale = i === 0
    ? useTransform(scrollYProgress, [0, fadeOutStart, fadeOutEnd], [1, 1, exitScale])
    : scale;

  const finalX = i === 0 ? useTransform(scrollYProgress, [0, fadeOutStart, fadeOutEnd], [0, 0, exitX]) : x;
  const finalY = i === 0 ? useTransform(scrollYProgress, [0, fadeOutStart, fadeOutEnd], [0, 0, exitY]) : y;
  const finalRotate = i === 0 ? useTransform(scrollYProgress, [0, fadeOutStart, fadeOutEnd], [0, 0, exitRotate]) : rotate;

  return (
    <motion.div
      style={{ opacity: finalOpacity, scale: finalScale, x: finalX, y: finalY, rotate: finalRotate, visibility: finalVisibility }}
      className="absolute top-[200px] bottom-[40px] left-0 md:left-[5vw] right-0 md:right-[20vw] flex items-center justify-center px-6"
    >
      <div className="w-full h-full max-w-6xl relative rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] bg-[#050505]">
        <div className="absolute inset-0" style={{ background: project.image }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010103] via-[#010103]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#010103]/90 via-[#010103]/30 to-transparent" />
        
        <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 font-bold text-xs uppercase tracking-[0.2em] mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Result: {project.stats}
            </div>
            
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tighter italic font-bricolage">
              {project.title}
            </h3>
            
            <p className="text-white/40 text-sm md:text-base uppercase tracking-[0.3em] mb-6 font-syne">
              Client: <span className="text-white font-medium">{project.client}</span>
            </p>
            
            <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-10 font-light max-w-2xl font-syne">
              {project.description}
            </p>
            
            <button className="group flex items-center gap-4 text-white font-bold text-sm md:text-lg hover:text-cyan-400 transition-colors uppercase tracking-wider font-syne">
              View Case Study 
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-cyan-400 group-hover:bg-cyan-400/10 transition-all shadow-lg">
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
        
        {/* Decorative corner borders */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-400/30 rounded-tl-[2rem] m-6 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-400/30 rounded-br-[2rem] m-6 pointer-events-none" />
      </div>
    </motion.div>
  );
}
