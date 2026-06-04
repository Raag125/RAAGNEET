"use client";

import { motion } from "framer-motion";

export default function MarqueeStrip({ items, className = "", speed = 30 }) {
  const duration = items.length * speed;

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex gap-8 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-sm font-medium text-white/20 whitespace-nowrap tracking-wider uppercase"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
