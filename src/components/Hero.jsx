"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import CustomHeroContent from "./CustomHeroContent";

function AnimatedSphere() {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.5}>
        <MeshDistortMaterial
          color="#4f46e5"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
          envMapIntensity={1}
        />
      </Sphere>
    </Float>
  );
}

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-70">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} color="#8b5cf6" />
          <directionalLight position={[-10, -10, -5]} intensity={1} color="#6366f1" />
          <AnimatedSphere />
        </Canvas>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">Premium Digital Agency</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-white">
            We Build Digital <br />
            <span className="text-gradient">Environments</span> <br />
            That Convert.
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed">
            Standard websites blend in, causing high bounce rates. We engineer immersive, 
            animated web experiences that act as a strategic business advantage to physically 
            hold user attention longer.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(99,102,241,0.4)]">
              Free Hero Section Overhaul
            </button>
            <button className="px-8 py-4 rounded-full glass border border-white/10 hover:bg-white/5 text-white font-semibold transition-all">
              View Case Studies
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-8 text-sm text-gray-500 font-medium">
            <div className="flex items-center gap-2">
              <span className="text-white text-xl font-bold">60+</span> fps Physics
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white text-xl font-bold">&lt;50ms</span> Render
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white text-xl font-bold">100%</span> ROI Focus
            </div>
          </div>
        </motion.div>

        {/* Custom Code Integration Area (Visible on mobile & desktop) */}
        <div className="w-full h-full min-h-[300px] lg:min-h-[500px] z-20">
          <CustomHeroContent />
        </div>
      </div>
    </div>
  );
}
