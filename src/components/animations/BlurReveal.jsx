"use client";

import { motion } from "framer-motion";

export default function BlurReveal({ children, className = "", delay = 0, duration = 0.8, as: Tag = "div" }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(20px)", y: 30 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
