"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    title: "Premium Websites",
    desc: "High-conversion web platforms tailored for Fashion, Restaurants, Agencies, and more. Blazingly fast & SEO optimized to perfection.",
    image: "/images/web_bento_bg_1780480176615.png",
    span: "col-span-1 lg:col-span-2",
  },
  {
    title: "CRM Systems",
    desc: "Advanced Customer Relationship Management systems to streamline sales, retention, and growth metrics.",
    image: "/images/crm_bento_bg_1780480189547.png",
    span: "col-span-1 lg:col-span-1",
  },
  {
    title: "ERP Systems",
    desc: "Scalable Enterprise Resource Planning to unify your entire operational workflow in one seamless dashboard.",
    image: "/images/erp_bento_bg_1780480202870.png",
    span: "col-span-1 lg:col-span-1",
  },
  {
    title: "Custom Tools",
    desc: "Tailor-made internal business management solutions built precisely for your unique operational needs.",
    image: "/images/tools_bento_bg_1780480216627.png",
    span: "col-span-1 lg:col-span-2",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

function BentoCard({ title, desc, image, span, index }) {
  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover="hover"
      className={`group relative flex flex-col justify-end p-8 sm:p-10 rounded-[2.5rem] overflow-hidden isolate shadow-2xl transition-all duration-500 cursor-pointer bg-[#0A0A0A] ${span}`}
    >
      {/* Background Image with Parallax on hover */}
      <motion.div 
        variants={{ hover: { scale: 1.08 } }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center z-0 opacity-60 group-hover:opacity-80 transition-opacity duration-500"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Heavy gradient overlay so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/60 to-transparent z-10 transition-all duration-500" />
      
      {/* Premium Glass border inside */}
      <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 group-hover:border-[#00FFE0]/50 z-20 pointer-events-none transition-colors duration-500" />

      {/* Floating Action Button */}
      <div className="absolute top-8 right-8 z-30 w-12 h-12 rounded-full glass flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 bg-white/10 backdrop-blur-md border border-white/20">
        <ArrowUpRight className="w-6 h-6 text-white" />
      </div>

      {/* Content */}
      <div className="relative z-30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="text-white font-bold text-[clamp(1.875rem,4vw,2.25rem)] mb-4 tracking-wide leading-tight">
          {title}
        </h3>
        <p className="text-gray-300 text-base sm:text-lg font-medium leading-relaxed max-w-lg opacity-80 group-hover:opacity-100 transition-opacity duration-500">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function WhatWeBuild() {
  return (
    <section id="what-we-build" className="relative w-full py-24 sm:py-32 overflow-hidden bg-[#030305]">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[1200px] aspect-square rounded-full bg-gradient-to-br from-[#00FFE0]/5 to-indigo-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 border border-[#00FFE0]/20 bg-[#00FFE0]/5 px-5 py-2 rounded-full text-[#00FFE0] text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-[#00FFE0] animate-pulse"></span>
              Our Capabilities
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[clamp(3rem,6vw,4.5rem)] font-black text-white leading-[1.1]"
            >
              What We <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE0] via-blue-400 to-indigo-500">Engineer</span>
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-md"
          >
            <p className="text-gray-400 text-lg leading-relaxed">
              We design and build immersive digital ecosystems that scale. From lightning-fast marketing sites to complex enterprise architecture, we deliver performant solutions.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6 w-full max-w-7xl mx-auto min-h-[400px] auto-rows-[minmax(350px,auto)] sm:auto-rows-[minmax(400px,auto)]">
          {services.map((service, index) => (
            <BentoCard 
              key={index} 
              title={service.title} 
              desc={service.desc} 
              image={service.image} 
              span={service.span} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
