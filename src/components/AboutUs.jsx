"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CheckCircle2, TrendingUp, Zap } from "lucide-react";

export default function AboutUs() {
  const sectionRef = useRef(null);

  // --- 3D Hover for Quote Block ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pctX = (e.clientX - rect.left) / rect.width - 0.5;
    const pctY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(pctX);
    y.set(pctY);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const fadeUp = (d) => ({
    initial: { opacity: 0, y: 20, filter: "blur(8px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true },
    transition: { delay: d, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  });

  const metrics = [
    { Icon: Zap, value: "60", suffix: "fps+", label: "Fluid Interaction", desc: "Hardware accelerated motion" },
    { Icon: CheckCircle2, value: "100", suffix: "%", label: "Custom Built", desc: "Zero bloated templates" },
    { Icon: TrendingUp, value: "3.4", suffix: "x", label: "Engagement", desc: "Average client increase" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100svh] bg-[#050505] overflow-hidden flex items-center"
    >
      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#00FFE0]/5 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-[#00FFE0]/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 relative z-10 flex flex-col gap-4 lg:gap-6 max-h-full py-6 lg:py-8">
        {/* Top Section: Header + Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Left Header */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.span {...fadeUp(0)} className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FFE0] shadow-[0_0_12px_#00FFE0]" />
              <span className="text-[#00FFE0] text-[clamp(0.65rem,1.5vw,0.75rem)] font-bold tracking-[0.3em] uppercase">Our Manifesto</span>
            </motion.span>
            <motion.h2 {...fadeUp(0.1)} className="text-[clamp(1.5rem,4vw,2.5rem)] font-black text-white leading-[1.1] tracking-tight">
              We don&apos;t build templates.{" "}
              <span className="text-white/40">We engineer digital assets that command authority.</span>
            </motion.h2>
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-3 lg:pl-6">
            <motion.p {...fadeUp(0.15)} className="text-sm sm:text-base text-white/60 font-light leading-relaxed">
              We are an elite collective of creative frontend engineers and UI/UX strategists. We bridge the gap between raw computational code and deep conversion psychology.
            </motion.p>
            <motion.p {...fadeUp(0.2)} className="text-sm sm:text-base text-white/50 font-light leading-relaxed">
              Standard web design is a liability for modern businesses. We leverage high-performance React architectures and cinematic motion design to transform passive visitors into hyper-engaged advocates.
            </motion.p>
          </div>
        </div>

        {/* Quote Block */}
        <motion.div
          {...fadeUp(0.25)}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full p-5 sm:p-7 md:p-8 rounded-2xl bg-[#0a0a0a]/40 backdrop-blur-2xl border border-white/10 flex items-center gap-4 sm:gap-6 cursor-crosshair group overflow-hidden shrink-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#00FFE0]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/4 bg-gradient-to-b from-transparent via-[#00FFE0] to-transparent shadow-[0_0_20px_#00FFE0] rounded-r-full opacity-70" style={{ transform: "translateZ(10px)" }} />

          <svg style={{ transform: "translateZ(30px)" }} className="w-6 h-6 sm:w-8 sm:h-8 shrink-0 text-[#00FFE0]/40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <h3 style={{ transform: "translateZ(50px)" }} className="text-sm sm:text-base md:text-lg font-semibold text-white leading-snug">
            &ldquo;In a market where users click away in 50 milliseconds, motion isn&apos;t a luxury&mdash;it&apos;s your ultimate competitive advantage.&rdquo;
          </h3>
        </motion.div>

        {/* Metric Counters */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 shrink-0">
          {metrics.map((m, i) => {
            const { Icon, value, suffix, label, desc } = m;
            return (
              <motion.div
                key={label}
                {...fadeUp(0.3 + i * 0.1)}
                className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl flex flex-col items-center text-center group hover:bg-white/[0.04] transition-colors duration-500"
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#00FFE0] mb-2 group-hover:scale-110 transition-transform duration-500" />
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tighter">
                  {value}<span className="text-[#00FFE0]">{suffix}</span>
                </div>
                <div className="text-[clamp(0.65rem,1.5vw,0.75rem)] sm:text-xs font-bold text-[#00FFE0] tracking-[0.2em] uppercase mt-1">{label}</div>
                <div className="text-white/40 text-[clamp(0.65rem,1.5vw,0.75rem)] sm:text-xs font-light hidden sm:block">{desc}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
