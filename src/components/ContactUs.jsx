"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone, Sparkles, ArrowUpRight } from "lucide-react";
import TiltCard from "@/components/animations/TiltCard";
import MagneticButton from "@/components/animations/MagneticButton";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@neets.studio", href: "mailto:hello@neets.studio" },
  { icon: MapPin, label: "Location", value: "Remote — Global", href: "#" },
  { icon: Phone, label: "Phone", value: "+1 (555) 000-0000", href: "tel:+15550000000" },
];

const orbs = [
  {
    size: 520,
    color: "from-[#00FFE0]/25 via-cyan-500/10 to-transparent",
    initial: { x: "-20%", y: "-25%" },
    animate: { x: ["-20%", "15%", "-10%", "-20%"], y: ["-25%", "10%", "-15%", "-25%"] },
    duration: 22,
  },
  {
    size: 480,
    color: "from-indigo-500/25 via-violet-500/10 to-transparent",
    initial: { x: "60%", y: "50%" },
    animate: { x: ["60%", "40%", "75%", "60%"], y: ["50%", "20%", "40%", "50%"] },
    duration: 26,
  },
  {
    size: 380,
    color: "from-fuchsia-500/20 via-pink-500/5 to-transparent",
    initial: { x: "30%", y: "70%" },
    animate: { x: ["30%", "55%", "20%", "30%"], y: ["70%", "40%", "60%", "70%"] },
    duration: 30,
  },
];

export default function ContactUs() {
  const [formState, setFormState] = useState("idle");
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => setFormState("success"), 1500);
  };

  return (
    <section className="relative w-full h-auto py-16 sm:py-24 flex items-center justify-center overflow-hidden bg-[#030305]">
      {/* ===== ANIMATED BACKGROUND LAYER ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Drifting gradient orbs */}
        {orbs.map((orb, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-3xl bg-gradient-to-br ${orb.color}`}
            style={{ width: orb.size, height: orb.size }}
            initial={orb.initial}
            animate={orb.animate}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Auto-scrolling dot grid */}
        <motion.div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
          animate={{ backgroundPosition: ["0px 0px", "28px 28px"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {/* Slow sweeping line */}
        <motion.div
          className="absolute -inset-px opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(115deg, transparent 40%, rgba(0,255,224,0.6) 50%, transparent 60%)",
            backgroundSize: "200% 200%",
          }}
          animate={{ backgroundPosition: ["0% 0%", "200% 200%"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />

        {/* Soft radial vignette pulse */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, transparent 0%, rgba(3,3,5,0.55) 70%, #030305 100%)",
          }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Top + bottom fade so content reads clearly */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#030305] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#030305] to-transparent" />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT — Header + Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-8 justify-center"
          >
            <div>
              <span className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] backdrop-blur-md px-4 py-1.5 rounded-full text-white/70 text-xs font-bold tracking-[0.2em] uppercase mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#00FFE0]/70" />
                Get In Touch
              </span>
              <h2 className="text-[clamp(2.5rem,5vw,3.25rem)] font-black text-white leading-[1.02] tracking-tight">
                Let&apos;s build the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">
                  future together.
                </span>
              </h2>
              <p className="text-white/50 text-base font-light leading-relaxed mt-4 max-w-md">
                Have a project in mind? Reach out and let&apos;s create something extraordinary.
              </p>
            </div>

            <div className="space-y-3">
              {contactInfo.map((info, i) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ x: 4 }}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00FFE0]/10 to-cyan-500/5 border border-[#00FFE0]/15 flex items-center justify-center group-hover:border-[#00FFE0]/30 transition-all duration-300 shrink-0">
                      <Icon className="w-4 h-4 text-[#00FFE0]/70 group-hover:text-[#00FFE0] transition-colors duration-300" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-white/40 text-[clamp(0.65rem,1vw,0.75rem)] font-medium uppercase tracking-wider leading-none mb-1">
                        {info.label}
                      </div>
                      <div className="text-white text-sm sm:text-base font-semibold truncate leading-none">
                        {info.value}
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <TiltCard maxTilt={1.5} glare={true}>
              <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.015] backdrop-blur-2xl p-7 sm:p-9 lg:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {formState === "success" ? (
                  <div className="flex flex-col items-center justify-center text-center min-h-[300px] sm:min-h-[400px]">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-5"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl font-bold text-white mb-1"
                    >
                      Message Sent
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-white/60 text-base"
                    >
                      We&apos;ll get back to you within 24 hours.
                    </motion.p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { label: "Full Name", type: "text", placeholder: "John Doe", key: "name" },
                        { label: "Email Address", type: "email", placeholder: "john@company.com", key: "email" },
                      ].map((field) => (
                        <div key={field.key} className="space-y-2">
                          <label className="text-xs text-white/60 font-medium tracking-wide">
                            {field.label}
                          </label>
                          <motion.div
                            animate={
                              focusedField === field.key
                                ? { borderColor: "rgba(0,255,224,0.25)" }
                                : { borderColor: "rgba(255,255,255,0.06)" }
                            }
                            className="relative rounded-xl border bg-white/[0.02] overflow-hidden transition-colors"
                          >
                            <motion.div
                              animate={focusedField === field.key ? { opacity: 1 } : { opacity: 0 }}
                              className="absolute inset-0 bg-gradient-to-r from-[#00FFE0]/5 to-transparent pointer-events-none"
                            />
                            <input
                              required
                              type={field.type}
                              onFocus={() => setFocusedField(field.key)}
                              onBlur={() => setFocusedField(null)}
                              className="relative w-full bg-transparent px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none text-sm"
                              placeholder={field.placeholder}
                            />
                          </motion.div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-white/60 font-medium tracking-wide">
                        What are you looking for?
                      </label>
                      <motion.select
                        animate={
                          focusedField === "service"
                            ? { borderColor: "rgba(0,255,224,0.25)" }
                            : { borderColor: "rgba(255,255,255,0.06)" }
                        }
                        onFocus={() => setFocusedField("service")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full rounded-xl border bg-white/[0.02] px-4 py-3.5 text-white/90 text-sm focus:outline-none appearance-none cursor-pointer transition-colors"
                      >
                        <option value="website" className="bg-[#0a0a0a]">Premium Website</option>
                        <option value="crm" className="bg-[#0a0a0a]">CRM System</option>
                        <option value="erp" className="bg-[#0a0a0a]">ERP System</option>
                        <option value="custom" className="bg-[#0a0a0a]">Custom Tool</option>
                      </motion.select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-white/60 font-medium tracking-wide">
                        Message
                      </label>
                      <motion.div
                        animate={
                          focusedField === "message"
                            ? { borderColor: "rgba(0,255,224,0.25)" }
                            : { borderColor: "rgba(255,255,255,0.06)" }
                        }
                        className="relative rounded-xl border bg-white/[0.02] overflow-hidden transition-colors"
                      >
                        <motion.div
                          animate={focusedField === "message" ? { opacity: 1 } : { opacity: 0 }}
                          className="absolute inset-0 bg-gradient-to-r from-[#00FFE0]/5 to-transparent pointer-events-none"
                        />
                        <textarea
                          required
                          rows={5}
                          onFocus={() => setFocusedField("message")}
                          onBlur={() => setFocusedField(null)}
                          className="relative w-full bg-transparent px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none text-sm resize-none"
                          placeholder="Tell us about your project..."
                        />
                      </motion.div>
                    </div>

                    <MagneticButton strength={0.25} className="block pt-1">
                      <motion.button
                        type="submit"
                        disabled={formState === "submitting"}
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00FFE0] to-cyan-400 text-slate-950 font-bold text-sm hover:shadow-[0_0_30px_rgba(0,255,224,0.25)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {formState === "submitting" ? (
                          <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-950" />
                        ) : (
                          <>
                            Send Message <Send className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>
                    </MagneticButton>
                  </form>
                )}
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
