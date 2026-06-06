"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function MobileValueProposition() {
  return (
    <section className="relative w-full py-32 bg-[#010103] flex flex-col items-center justify-center overflow-hidden md:hidden">
      <div className="relative z-10 text-center max-w-5xl px-6 flex flex-col gap-6">
        <h2 className="text-4xl font-black text-white leading-tight tracking-tight flex flex-col items-center gap-2">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="inline-block w-full"
          >
            We don't just build websites.
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block w-full text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(135deg, #00FFE0 0%, #818cf8 50%, #00FFE0 100%)" }}
          >
            We engineer immersive
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block w-full"
          >
            conversion machines.
          </motion.div>
        </h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg text-white/50 font-light max-w-3xl mx-auto"
        >
          By blending fluid 3D physics with behavioral psychology, we capture attention in the first critical 50 milliseconds and never let it go.
        </motion.p>
      </div>
    </section>
  );
}

export default function ValueProposition() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Entrance
  const line1EnterOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const line1EnterY = useTransform(scrollYProgress, [0.1, 0.25], [50, 0]);
  const line1EnterScale = useTransform(scrollYProgress, [0.1, 0.25], [0.8, 1]);
  const line1EnterBlur = useTransform(scrollYProgress, [0.1, 0.25], [20, 0]);

  const line2EnterOpacity = useTransform(scrollYProgress, [0.20, 0.35], [0, 1]);
  const line2EnterY = useTransform(scrollYProgress, [0.20, 0.35], [50, 0]);
  const line2EnterScale = useTransform(scrollYProgress, [0.20, 0.35], [0.8, 1]);
  const line2EnterBlur = useTransform(scrollYProgress, [0.20, 0.35], [20, 0]);

  const line3EnterOpacity = useTransform(scrollYProgress, [0.30, 0.45], [0, 1]);
  const line3EnterY = useTransform(scrollYProgress, [0.30, 0.45], [50, 0]);
  const line3EnterScale = useTransform(scrollYProgress, [0.30, 0.45], [0.8, 1]);
  const line3EnterBlur = useTransform(scrollYProgress, [0.30, 0.45], [20, 0]);

  const pEnterOpacity = useTransform(scrollYProgress, [0.45, 0.60], [0, 1]);
  const pEnterY = useTransform(scrollYProgress, [0.45, 0.60], [50, 0]);

  // Exit
  const line1ExitOpacity = useTransform(scrollYProgress, [0.70, 0.80], [1, 0]);
  const line1ExitY = useTransform(scrollYProgress, [0.70, 0.80], [0, -50]);
  const line1ExitScale = useTransform(scrollYProgress, [0.70, 0.80], [1, 1.2]);
  const line1ExitBlur = useTransform(scrollYProgress, [0.70, 0.80], [0, 20]);

  const line2ExitOpacity = useTransform(scrollYProgress, [0.75, 0.85], [1, 0]);
  const line2ExitY = useTransform(scrollYProgress, [0.75, 0.85], [0, -50]);
  const line2ExitScale = useTransform(scrollYProgress, [0.75, 0.85], [1, 1.2]);
  const line2ExitBlur = useTransform(scrollYProgress, [0.75, 0.85], [0, 20]);

  const line3ExitOpacity = useTransform(scrollYProgress, [0.80, 0.90], [1, 0]);
  const line3ExitY = useTransform(scrollYProgress, [0.80, 0.90], [0, -50]);
  const line3ExitScale = useTransform(scrollYProgress, [0.80, 0.90], [1, 1.2]);
  const line3ExitBlur = useTransform(scrollYProgress, [0.80, 0.90], [0, 20]);

  const pExitOpacity = useTransform(scrollYProgress, [0.85, 0.95], [1, 0]);
  const pExitY = useTransform(scrollYProgress, [0.85, 0.95], [0, -50]);

  // Combine
  const line1Opacity = useTransform(scrollYProgress, p => p < 0.65 ? line1EnterOpacity.get() : line1ExitOpacity.get());
  const line1Y = useTransform(scrollYProgress, p => p < 0.65 ? line1EnterY.get() : line1ExitY.get());
  const line1Scale = useTransform(scrollYProgress, p => p < 0.65 ? line1EnterScale.get() : line1ExitScale.get());
  const line1Blur = useTransform(scrollYProgress, p => p < 0.65 ? line1EnterBlur.get() : line1ExitBlur.get());
  const line1Filter = useTransform(line1Blur, v => `blur(${v}px)`);

  const line2Opacity = useTransform(scrollYProgress, p => p < 0.65 ? line2EnterOpacity.get() : line2ExitOpacity.get());
  const line2Y = useTransform(scrollYProgress, p => p < 0.65 ? line2EnterY.get() : line2ExitY.get());
  const line2Scale = useTransform(scrollYProgress, p => p < 0.65 ? line2EnterScale.get() : line2ExitScale.get());
  const line2Blur = useTransform(scrollYProgress, p => p < 0.65 ? line2EnterBlur.get() : line2ExitBlur.get());
  const line2Filter = useTransform(line2Blur, v => `blur(${v}px)`);

  const line3Opacity = useTransform(scrollYProgress, p => p < 0.65 ? line3EnterOpacity.get() : line3ExitOpacity.get());
  const line3Y = useTransform(scrollYProgress, p => p < 0.65 ? line3EnterY.get() : line3ExitY.get());
  const line3Scale = useTransform(scrollYProgress, p => p < 0.65 ? line3EnterScale.get() : line3ExitScale.get());
  const line3Blur = useTransform(scrollYProgress, p => p < 0.65 ? line3EnterBlur.get() : line3ExitBlur.get());
  const line3Filter = useTransform(line3Blur, v => `blur(${v}px)`);

  const pOpacity = useTransform(scrollYProgress, p => p < 0.65 ? pEnterOpacity.get() : pExitOpacity.get());
  const pY = useTransform(scrollYProgress, p => p < 0.65 ? pEnterY.get() : pExitY.get());

  return (
    <>
      <MobileValueProposition />

      <section ref={containerRef} className="relative w-full h-[300vh] bg-[#010103] hidden md:block">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden perspective-1000">
          
          <motion.div 
            className="relative z-10 text-center max-w-5xl px-6"
          >
            <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-black text-white leading-tight tracking-tight flex flex-col items-center">
              
              <motion.div 
                style={{ opacity: line1Opacity, y: line1Y, scale: line1Scale, filter: line1Filter }}
                className="inline-block w-full"
              >
                We don't just build websites.
              </motion.div>
              
              <motion.div
                className="inline-block w-full mt-4 text-transparent bg-clip-text"
                style={{
                  opacity: line2Opacity, y: line2Y, scale: line2Scale, filter: line2Filter,
                  backgroundImage: "linear-gradient(135deg, #00FFE0 0%, #818cf8 50%, #00FFE0 100%)",
                }}
              >
                We engineer immersive
              </motion.div>
              
              <motion.div 
                style={{ opacity: line3Opacity, y: line3Y, scale: line3Scale, filter: line3Filter }}
                className="inline-block w-full mt-4"
              >
                conversion machines.
              </motion.div>

            </h2>
            
            <motion.p 
              style={{ opacity: pOpacity, y: pY }}
              className="text-[clamp(1.125rem,2vw,1.5rem)] text-white/50 mt-10 font-light max-w-3xl mx-auto"
            >
              By blending fluid 3D physics with behavioral psychology, we capture attention in the first critical 50 milliseconds and never let it go.
            </motion.p>
          </motion.div>

        </div>
      </section>
    </>
  );
}
