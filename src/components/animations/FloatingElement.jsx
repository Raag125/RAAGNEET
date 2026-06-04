"use client";

import { motion } from "framer-motion";

export default function FloatingElement({ children, amplitude = 6, duration = 4, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-amplitude, amplitude, -amplitude],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
