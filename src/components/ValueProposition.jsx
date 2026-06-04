"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ValueProposition() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Fade and zoom in lines staggered
  const line1Opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const line1Y = useTransform(scrollYProgress, [0.1, 0.3], [50, 0]);
  const line1Scale = useTransform(scrollYProgress, [0.1, 0.3], [0.8, 1]);
  const line1Blur = useTransform(scrollYProgress, [0.1, 0.3], ["blur(20px)", "blur(0px)"]);

  const line2Opacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const line2Y = useTransform(scrollYProgress, [0.25, 0.45], [50, 0]);
  const line2Scale = useTransform(scrollYProgress, [0.25, 0.45], [0.8, 1]);
  const line2Blur = useTransform(scrollYProgress, [0.25, 0.45], ["blur(20px)", "blur(0px)"]);

  const line3Opacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const line3Y = useTransform(scrollYProgress, [0.4, 0.6], [50, 0]);
  const line3Scale = useTransform(scrollYProgress, [0.4, 0.6], [0.8, 1]);
  const line3Blur = useTransform(scrollYProgress, [0.4, 0.6], ["blur(20px)", "blur(0px)"]);

  const pOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);
  const pY = useTransform(scrollYProgress, [0.55, 0.75], [50, 0]);

  // Keep container visible at the end so it overlaps with the next section smoothly
  const containerScale = useTransform(scrollYProgress, [0.85, 1], [1, 1.05]);

  return (
    <section ref={containerRef} className="relative w-full h-[180vh] bg-transparent">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden perspective-1000">
        
        
        <motion.div 
          style={{ scale: containerScale }}
          className="relative z-10 text-center max-w-5xl px-6"
        >
          <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-black text-white leading-tight tracking-tight flex flex-col items-center">
            
            <motion.div 
              style={{ opacity: line1Opacity, y: line1Y, scale: line1Scale, filter: line1Blur }}
              className="inline-block w-full"
            >
              We don't just build websites.
            </motion.div>
            
            <motion.div
              style={{ opacity: line2Opacity, y: line2Y, scale: line2Scale, filter: line2Blur }}
              className="inline-block w-full mt-4 text-transparent bg-clip-text"
              style={{
                opacity: line2Opacity, y: line2Y, scale: line2Scale, filter: line2Blur,
                backgroundImage: "linear-gradient(135deg, #00FFE0 0%, #818cf8 50%, #00FFE0 100%)",
              }}
            >
              We engineer immersive
            </motion.div>
            
            <motion.div 
              style={{ opacity: line3Opacity, y: line3Y, scale: line3Scale, filter: line3Blur }}
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
  );
}
