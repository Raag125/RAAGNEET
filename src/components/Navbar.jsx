"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Hexagon } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-4 glass shadow-xl" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer group">
          <Hexagon className="w-8 h-8 text-primary transition-transform duration-500 group-hover:rotate-90 group-hover:text-accent" />
          <span className="text-xl font-bold tracking-widest uppercase text-white">
            Neet<span className="text-primary">Web</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["Expertise", "Work", "Approach", "ROI"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/amoled" className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-medium text-white transition-all glow-border backdrop-blur-md">
            Tech Stack
          </Link>
          <Link href="/momo" className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-medium text-white transition-all glow-border backdrop-blur-md">
            Momo
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
