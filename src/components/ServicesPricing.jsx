"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

const services = [
  {
    title: "The Launchpad",
    price: "$2,500",
    description: "Perfect for startups needing a high-impact, single-page immersive presence.",
    features: ["Custom 3D Hero Section", "Framer Motion Transitions", "Responsive Design", "Basic SEO"],
    accent: "from-cyan-500 to-blue-500",
  },
  {
    title: "The Studio",
    price: "$7,500",
    description: "A complete multi-page immersive experience designed for established agencies and studios.",
    features: ["Advanced WebGL Elements", "GSAP Scroll Animations", "CMS Integration", "Premium Glassmorphism UI"],
    accent: "from-indigo-500 to-purple-500",
  },
  {
    title: "The Enterprise",
    price: "Custom",
    description: "End-to-end bespoke digital experiences with custom physics and backend architecture.",
    features: ["Custom Three.js Shaders", "Full E-Commerce", "Custom Dashboard", "Dedicated Support"],
    accent: "from-fuchsia-500 to-pink-500",
  },
];

function ServiceCard({ service, index }) {
  const cardRef = useRef(null);
  
  // Tilt physics
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  // Mouse tracking for the luminescent border
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setMousePosition({ x: mouseX, y: mouseY });

    // Calculate rotation (-15 to 15 degrees)
    const rX = -((mouseY / height) - 0.5) * 30;
    const rY = ((mouseX / width) - 0.5) * 30;
    
    rotateX.set(rX);
    rotateY.set(rY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full rounded-3xl p-[1px] cursor-pointer group isolate"
    >
      {/* Luminescent tracking border */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.4), transparent 40%)`,
        }}
      />
      
      {/* Default subtle border */}
      <div className="absolute inset-0 rounded-3xl bg-white/10 group-hover:bg-transparent transition-colors duration-300" />

      {/* Card Content (Glassmorphism) */}
      <div 
        className="relative h-full w-full bg-[#070b14]/80 backdrop-blur-xl rounded-3xl p-8 sm:p-10 flex flex-col items-start overflow-hidden isolate"
        style={{ transform: "translateZ(30px)" }}
      >
        {/* Decorative corner glow */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${service.accent} blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />

        <h3 className="text-[clamp(1.25rem,3vw,1.5rem)] font-bold text-white mb-2">{service.title}</h3>
        <div className="text-[clamp(1.875rem,4vw,2.5rem)] font-black text-white mb-4">
          {service.price}
          {service.price !== "Custom" && <span className="text-lg text-white/40 font-normal">/project</span>}
        </div>
        <p className="text-white/60 text-sm mb-8">{service.description}</p>

        <div className="flex-1 w-full space-y-4 mb-8">
          {service.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.2"/>
                <path d="M5 8L7.5 10.5L11.5 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm text-white/80">{feature}</span>
            </div>
          ))}
        </div>

        <button 
          className="w-full py-4 rounded-xl font-semibold text-sm bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300"
          style={{ transform: "translateZ(20px)" }}
        >
          Select {service.title}
        </button>
      </div>
    </motion.div>
  );
}

export default function ServicesPricing() {
  return (
    <section id="services" className="relative w-full py-24 sm:py-32 bg-transparent overflow-hidden perspective-1000">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="text-center mb-16 sm:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block border border-[#00FFE0]/20 bg-[#00FFE0]/5 px-4 py-1.5 rounded-full text-[#00FFE0] text-xs font-bold tracking-widest uppercase mb-6"
          >
            Elite Services
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(2rem,5vw,3rem)] font-black text-white"
          >
            Transparent pricing for <br className="hidden sm:block" />
            world-class architecture.
          </motion.h2>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
