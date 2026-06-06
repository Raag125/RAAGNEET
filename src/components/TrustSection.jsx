"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function MobileTrustSection() {
  return (
    <section className="relative w-full py-24 px-6 bg-transparent flex flex-col items-center justify-center gap-16 md:hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="w-full text-center"
      >
        <h2 className="text-4xl font-bold text-white tracking-tight">
          Why a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Free Demo?</span>
        </h2>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="w-full text-center"
      >
        <p className="text-3xl font-light text-white/80 leading-tight">
          In an industry full of <span className="text-white font-medium">empty promises</span> and digital fraud...
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="w-full text-center flex flex-col gap-4"
      >
        <h3 className="text-4xl font-black text-white">
          Trust must be <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE0] to-[#008AEE]">earned.</span>
        </h3>
        <p className="text-base text-white/60 font-light leading-relaxed">
          We prove our expertise before you sign a contract. We build a high-fidelity, custom demo of your project to showcase our world-class architecture. No risk. Pure proof.
        </p>
      </motion.div>
    </section>
  );
}

export default function TrustSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const text1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [0, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.15, 0.25], [50, 0, -50]);

  const text2Opacity = useTransform(scrollYProgress, [0.35, 0.5, 0.6], [0, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.35, 0.5, 0.6], [50, 0, -50]);

  const text3Opacity = useTransform(scrollYProgress, [0.7, 0.85, 1], [0, 1, 1]);
  const text3Y = useTransform(scrollYProgress, [0.7, 0.85, 1], [50, 0, 0]);

  return (
    <>
      <MobileTrustSection />

      <motion.section 
        ref={containerRef}
        className="relative w-full h-[200vh] bg-transparent hidden md:block"
      >
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6">
          
          <div className="relative max-w-4xl w-full text-center h-48 flex items-center justify-center">
            <motion.div style={{ opacity: text1Opacity, y: text1Y }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <h2 className="text-[clamp(1.875rem,5vw,4.5rem)] font-bold text-white tracking-tight">
                Why a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Free Demo?</span>
              </h2>
            </motion.div>

            <motion.div style={{ opacity: text2Opacity, y: text2Y }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-[clamp(1.5rem,4vw,3rem)] font-light text-white/80 leading-tight">
                In an industry full of <span className="text-white font-medium">empty promises</span> and digital fraud...
              </p>
            </motion.div>

            <motion.div style={{ opacity: text3Opacity, y: text3Y }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <h3 className="text-[clamp(1.875rem,5vw,3.75rem)] font-black text-white mb-6">
                Trust must be <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE0] to-[#008AEE]">earned.</span>
              </h3>
              <p className="text-[clamp(1.125rem,2vw,1.25rem)] text-white/60 max-w-2xl font-light mx-auto">
                We prove our expertise before you sign a contract. We build a high-fidelity, custom demo of your project to showcase our world-class architecture. No risk. Pure proof.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
