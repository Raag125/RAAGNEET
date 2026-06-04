"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Code2, Palette, Database, Layout, Blocks, Braces, Globe,
  Sparkles, ArrowRight, CheckCircle2, GanttChartSquare, Zap
} from "lucide-react";
import MorphingBlob from "@/components/animations/MorphingBlob";
import FloatingElement from "@/components/animations/FloatingElement";
import TiltCard from "@/components/animations/TiltCard";
import TextScramble from "@/components/animations/TextScramble";
import MagneticButton from "@/components/animations/MagneticButton";

const skillCategories = [
  {
    title: "Frontend Engineering",
    icon: Code2,
    color: "from-blue-400 to-cyan-300",
    shadow: "shadow-blue-500/20",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "Framer Motion / GSAP", level: 92 },
      { name: "Three.js / R3F", level: 85 },
      { name: "Tailwind CSS", level: 96 },
    ],
  },
  {
    title: "UI / UX Design",
    icon: Palette,
    color: "from-purple-400 to-pink-300",
    shadow: "shadow-purple-500/20",
    skills: [
      { name: "Interaction Design", level: 90 },
      { name: "Prototyping & Wireframing", level: 88 },
      { name: "Design Systems", level: 85 },
      { name: "Accessibility", level: 82 },
    ],
  },
  {
    title: "Backend & Infrastructure",
    icon: Database,
    color: "from-emerald-400 to-teal-300",
    shadow: "shadow-emerald-500/20",
    skills: [
      { name: "Node.js / Express", level: 88 },
      { name: "PostgreSQL / Prisma", level: 84 },
      { name: "REST / GraphQL APIs", level: 86 },
      { name: "Cloud (Vercel / AWS)", level: 78 },
    ],
  },
  {
    title: "Creative Dev",
    icon: Blocks,
    color: "from-amber-400 to-orange-300",
    shadow: "shadow-amber-500/20",
    skills: [
      { name: "WebGL / Shaders", level: 80 },
      { name: "Canvas / SVG Animation", level: 88 },
      { name: "Scroll-Triggered FX", level: 94 },
      { name: "Performance Optimization", level: 86 },
    ],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "Deep-dive into your vision, audience, and goals. I map every requirement before a single line of code.",
    icon: GanttChartSquare,
  },
  {
    step: "02",
    title: "Architecture",
    description: "I design a scalable component system — clean, reusable, and built for performance from day one.",
    icon: Layout,
  },
  {
    step: "03",
    title: "Engineering",
    description: "Pixel-perfect development with fluid animations, micro-interactions, and obsessive attention to detail.",
    icon: Braces,
  },
  {
    step: "04",
    title: "Launch",
    description: "Rigorous testing, optimization, and deployment. I don't ship code — I ship experiences.",
    icon: Globe,
  },
];

const sampleWorks = [
  {
    title: "3D Product Configurator",
    tag: "Three.js / R3F",
    gradient: "from-indigo-900 via-purple-900 to-slate-900",
    image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=600&h=400&fit=crop&auto=format",
    description: "Real-time WebGL configurator with physics-based materials, dynamic lighting, and smooth camera orbits.",
  },
  {
    title: "Scroll Narrative Experience",
    tag: "GSAP / ScrollTrigger",
    gradient: "from-slate-900 via-blue-900 to-cyan-900",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop&auto=format",
    description: "Cinematic scroll-driven storytelling with parallax layers, SVG path morphing, and timed reveals.",
  },
  {
    title: "Glassmorphism Dashboard",
    tag: "React / Framer Motion",
    gradient: "from-zinc-900 via-rose-900 to-amber-900",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format",
    description: "Premium admin dashboard with animated charts, drag-and-drop widgets, and buttery transitions.",
  },
];

function SkillBar({ name, level, index, color }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/70 font-medium">{name}</span>
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 150, damping: 12 }}
          className="text-sm font-bold text-white"
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-[5px] rounded-full bg-white/5 overflow-hidden border border-white/[0.04] relative">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ delay: index * 0.1 + 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className={`h-full rounded-full bg-gradient-to-r ${color} relative will-change-transform`}
        />
      </div>
    </motion.div>
  );
}

function ProcessTimeline({ step, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-6 group"
    >
      <div className="flex flex-col items-center">
        <FloatingElement amplitude={3} duration={3} delay={index * 0.5}>
          <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:border-white/20 group-hover:bg-white/[0.08] transition-all duration-500">
            <step.icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors duration-300" />
          </div>
        </FloatingElement>
        {index < processSteps.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-[2px] h-full min-h-[4rem] bg-gradient-to-b from-white/20 to-transparent mt-2 origin-top"
          />
        )}
      </div>
      <div className="pb-12 flex-1">
        <span className="text-xs font-bold tracking-[0.2em] text-white/30 uppercase">{step.step}</span>
        <h3 className="text-xl font-bold text-white mt-1 mb-2">{step.title}</h3>
        <p className="text-white/50 text-sm leading-relaxed max-w-md">{step.description}</p>
      </div>
    </motion.div>
  );
}

function SectionHeader({ tag, title, gradient, subtitle, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <span className="inline-block border border-[#F8FAFC]/20 bg-white/5 px-4 py-1.5 rounded-full text-[#F8FAFC] text-xs font-bold tracking-widest uppercase mb-6">
        {tag}
      </span>
      <h2 className="text-[clamp(2rem,5vw,3rem)] font-black text-white leading-tight">
        {title}{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500">
          {gradient}
        </span>
      </h2>
      <p className="text-white/40 text-lg mt-4 max-w-2xl font-light">{subtitle}</p>
    </motion.div>
  );
}

export default function SkillsShowcase() {
  const heroRef = useRef(null);
  const skillsRef = useRef(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
  const heroY = useTransform(heroScroll, [0, 0.6], [0, 80]);
  const heroScale = useTransform(heroScroll, [0, 0.6], [1, 0.95]);
  const parallaxBgY = useTransform(heroScroll, [0, 1], [0, -200]);

  const { scrollYProgress: skillsScroll } = useScroll({
    target: skillsRef,
    offset: ["start end", "end start"],
  });
  const skillsDividerY = useTransform(skillsScroll, [0, 1], [60, -60]);
  const skillsContainerOpacity = useTransform(skillsScroll, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);



  return (
    <div className="w-full relative">
      {/* Animated Blur Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: ["-5%", "5%", "-5%"], y: ["-3%", "3%", "-3%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 -left-1/4 w-[80vw] max-w-[800px] aspect-square bg-gradient-to-br from-blue-500/25 via-purple-500/15 to-transparent rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ x: ["3%", "-4%", "3%"], y: ["2%", "-3%", "2%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/3 -right-1/4 w-[70vw] max-w-[700px] aspect-square bg-gradient-to-tl from-[#00FFE0]/20 via-blue-500/15 to-transparent rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: ["2%", "-3%", "2%"], y: ["-4%", "2%", "-4%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/2 w-[50vw] max-w-[500px] aspect-square bg-gradient-to-tr from-pink-500/15 via-purple-500/10 to-transparent rounded-full blur-[100px]"
        />
      </div>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: parallaxBgY }} className="absolute inset-0 pointer-events-none will-change-transform">
          <div className="absolute top-1/4 left-1/4 w-[60vw] max-w-[600px] aspect-square bg-blue-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[50vw] max-w-[500px] aspect-square bg-purple-500/10 rounded-full blur-[120px]" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
          className="relative z-10 text-center max-w-5xl px-6 pt-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 border border-white/[0.12] bg-white/[0.03] backdrop-blur-md px-4 py-1.5 rounded-full text-white/60 text-xs font-medium tracking-wider uppercase mb-8"
          >
            <FloatingElement amplitude={2} duration={2}>
              <Sparkles className="w-3.5 h-3.5 text-white/40" />
            </FloatingElement>
            Expertise & Craft
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,8vw,6rem)] font-black text-white leading-[1.05] tracking-tight"
          >
            What I{" "}
            <TextScramble className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-slate-400">
              Build
            </TextScramble>
            <br />
            <span className="text-white/50">
              How I{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
                Engineer
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-white/40 max-w-2xl mx-auto mt-8 font-light leading-relaxed"
          >
            Every project is an opportunity to push the boundary of what the web can do.
            Here is the full spectrum of my capabilities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-4 mt-10"
          >
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/20 text-xs font-medium tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-2"
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 rounded-full bg-white/40"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* SCROLL PROGRESS BAR */}
      <motion.div
        style={{ scaleX: heroScroll }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-[200] origin-left"
      />

      {/* SKILLS */}
      <section ref={skillsRef} className="relative py-32 overflow-hidden">
        <motion.div
          style={{ y: skillsDividerY }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
        />

        <motion.div
          style={{ opacity: skillsContainerOpacity }}
          className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10"
        >
          <SectionHeader
            tag="Proficiency"
            title="Technical"
            gradient="Arsenal"
            subtitle="Years of hands-on engineering distilled into measurable expertise across the full stack."
            className="mb-16"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          >
            {skillCategories.map((category, catIndex) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  variants={{
                    hidden: { opacity: 0, y: 35 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  <TiltCard maxTilt={6} glare={true}>
                    <div className={`group relative rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent p-6 sm:p-8 hover:border-white/[0.15] transition-all duration-500 shadow-xl ${category.shadow} hover:shadow-2xl`}>
                      <div className="relative z-10">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-3 mb-6"
                        >
                          <FloatingElement amplitude={3} duration={4} delay={catIndex * 0.3}>
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} p-2.5 flex items-center justify-center`}>
                              <Icon className="w-full h-full text-white" />
                            </div>
                          </FloatingElement>
                          <TextScramble className="text-lg font-bold text-white">
                            {category.title}
                          </TextScramble>
                        </motion.div>

                        <div className="space-y-4">
                          {category.skills.map((skill, skillIndex) => (
                            <SkillBar
                              key={skill.name}
                              name={skill.name}
                              level={skill.level}
                              index={skillIndex}
                              color={category.color}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* HOW I WORK */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            <div className="w-full lg:w-2/5 shrink-0">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="inline-block border border-[#F8FAFC]/20 bg-white/5 px-4 py-1.5 rounded-full text-[#F8FAFC] text-xs font-bold tracking-widest uppercase mb-6">
                  Process
                </span>
                <h2 className="text-[clamp(2rem,5vw,3rem)] font-black text-white leading-tight mb-6">
                  How I{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500">
                    Work
                  </span>
                </h2>
                <p className="text-white/40 text-lg font-light leading-relaxed">
                  Every project follows a battle-tested pipeline — from raw idea to polished,
                  production-ready experience. No fluff, no shortcuts.
                </p>

                <div className="mt-10 space-y-4">
                  {[
                    { label: "Projects Delivered", value: "50+" },
                    { label: "Avg. Client Score", value: "4.9/5" },
                    { label: "On-Time Delivery", value: "98%" },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-white/50 text-sm">
                        <span className="text-white font-bold">{stat.value}</span> {stat.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="flex-1">
              {processSteps.map((step, index) => (
                <ProcessTimeline key={step.step} step={step} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SAMPLES */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
          <SectionHeader
            tag="Showcase"
            title="Samples of My"
            gradient="Level"
            subtitle="Each project below is a testament to the craft — built from scratch with obsessive attention to detail."
            className="mb-16"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {sampleWorks.map((work) => (
              <motion.div
                key={work.title}
                variants={{
                  hidden: { opacity: 0, y: 35 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="h-full"
              >
                <TiltCard maxTilt={8} glare={false} className="h-full">
                  <div className="group relative rounded-3xl overflow-hidden border border-white/[0.06] hover:border-white/[0.18] transition-all duration-500 flex flex-col h-full">
                    <div className={`absolute inset-0 bg-gradient-to-br ${work.gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-700`} />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

                    <motion.div
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent z-20"
                    />

                    <div className="relative aspect-video overflow-hidden shrink-0">
                      <motion.img
                        src={work.image}
                        alt={work.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent" />
                    </div>

                    <div className="relative z-10 p-6 sm:p-8 flex flex-col flex-1">
                      <span className="text-xs font-bold tracking-[0.15em] uppercase text-white/30 mb-4">
                        {work.tag}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
                        <TextScramble>{work.title}</TextScramble>
                      </h3>
                      <p className="text-white/50 text-sm leading-relaxed flex-1">
                        {work.description}
                      </p>
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="mt-6 flex items-center gap-2 text-white/40 group-hover:text-white/80 transition-colors duration-300 text-sm font-medium"
                      >
                        Explore <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </motion.div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.02] to-transparent p-12 sm:p-16 relative overflow-hidden"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[400px] aspect-square bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"
            />

            <div className="relative z-10">
              <FloatingElement amplitude={4} duration={5}>
                <Zap className="w-8 h-8 text-white/20 mx-auto mb-6" />
              </FloatingElement>
              <h2 className="text-[clamp(1.875rem,5vw,3rem)] font-black text-white leading-tight mb-6">
                Ready to Build{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
                  Something Extraordinary?
                </span>
              </h2>
              <p className="text-white/40 text-lg max-w-2xl mx-auto font-light mb-10">
                Let's collaborate and push the boundaries of what your web presence can achieve.
              </p>
              <MagneticButton strength={0.4}>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(255,255,255,0)",
                      "0 0 30px 4px rgba(255,255,255,0.06)",
                      "0 0 0 0 rgba(255,255,255,0)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/[0.06] border border-white/20 text-white font-medium hover:bg-white/[0.12] transition-colors duration-300"
                >
                  Start a Project <ArrowRight className="w-5 h-5" />
                </motion.button>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
