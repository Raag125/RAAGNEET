"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeBackground } from "@/components/ThemeBackground";
import CountryPhoneInput from "@/components/CountryPhoneInput";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Globe,
  MonitorSmartphone,
  Database,
  ShoppingCart,
  Box,
  Rocket,
  Paintbrush,
  RefreshCcw,
  Zap,
  CheckCircle2,
  Clock,
  Calendar,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Server,
  X
} from "lucide-react";

const steps = [
  { id: 1, name: "Identity" },
  { id: 2, name: "Scope" },
  { id: 3, name: "Current State" },
  { id: 4, name: "Features" },
  { id: 5, name: "Timeline" },
  { id: 6, name: "Infrastructure" },
  { id: 7, name: "Review" }
];

const AVAILABLE_FEATURES = [
  { id: "auth", name: "User Authentication", price: 30000, desc: "Secure Login/Signup portals" },
  { id: "rbac", name: "Role-Based Access", price: 45000, desc: "Admin, Employee, Client views" },
  { id: "ai_bot", name: "AI Chatbots & Assistants", price: 60000, desc: "Smart AI-powered virtual assistants" },
  { id: "pdf_gen", name: "Automated PDFs", price: 25000, desc: "Invoices, certificates, summaries" },
  { id: "referral", name: "Referrals & Coupons", price: 35000, desc: "Referral and coupon generation" },
  { id: "charts", name: "Interactive Analytics", price: 50000, desc: "Interactive data charts & visuals" },
  { id: "subscription", name: "Subscription Billing", price: 65000, desc: "Subscription management portals" },
  { id: "reviews", name: "Automated Reviews", price: 20000, desc: "Review collection emails post-purchase" }
];

const ADVANCED_FEATURES = [
  {
    category: "Immersive & High-End UI",
    features: [
      { id: "adv_gsap", name: "Physics-Based Animations", price: 60000, desc: "Scroll-reveals, parallax & fluid transitions" },
      { id: "adv_3d", name: "3D & Interactive UI", price: 85000, desc: "Interactive models & glassmorphism effects" },
      { id: "adv_video", name: "Cinematic Backgrounds", price: 35000, desc: "Optimized video loops or WebGL" },
      { id: "adv_dark", name: "System Dark Mode", price: 20000, desc: "Seamless system-aware theme toggle" }
    ]
  },
  {
    category: "Conversion & Lead Generation",
    features: [
      { id: "adv_forms", name: "Smart Contact Forms", price: 25000, desc: "Multi-step logic-based forms" },
      { id: "adv_sched", name: "Automated Scheduling", price: 15000, desc: "Calendly/Cal.com direct integration" },
      { id: "adv_leads", name: "Lead Magnets", price: 20000, desc: "Pop-ups offering guides for emails" },
      { id: "adv_chat", name: "Omnichannel Chat", price: 18000, desc: "Floating WhatsApp/Messenger widgets" }
    ]
  },
  {
    category: "Advanced Integrations & Backend Power",
    features: [
      { id: "adv_email", name: "Transactional Emails", price: 40000, desc: "Automated branded email sequences" },
      { id: "adv_pay", name: "Advanced Payments", price: 55000, desc: "Recurring subscriptions & invoices" },
      { id: "adv_crm", name: "CRM & Sheets Sync", price: 45000, desc: "Auto-pipe leads to HubSpot/Sheets" },
      { id: "adv_dash", name: "Custom Client Dashboards", price: 120000, desc: "Secure portal for client management" }
    ]
  },
  {
    category: "Performance & Technical SEO",
    features: [
      { id: "adv_ssr", name: "Lightning-Fast Architecture", price: 50000, desc: "Next.js SSR/SSG for instant loads" },
      { id: "adv_meta", name: "Dynamic SEO Metadata", price: 25000, desc: "Auto-generating titles & OpenGraph" },
      { id: "adv_ga4", name: "Analytics Dashboards", price: 30000, desc: "GA4 dashboards with custom events" }
    ]
  }
];

const ALL_FEATURES = [
  ...AVAILABLE_FEATURES,
  ...ADVANCED_FEATURES.flatMap(c => c.features)
];

export default function RequestDeploymentPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [showAdvancedModal, setShowAdvancedModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    clientType: "",
    scope: [],
    currentState: "",
    currentWebsite: "",
    selectedFeatures: [],
    timeline: "",
    budget: "",
    hosting: "",
    domain: "",
    pageCount: 3,
    pageCountNotSure: false
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (formData.selectedFeatures.length > 0) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  }, [formData.selectedFeatures.length]);

  const handleNext = () => {
    if (currentStep < 7) setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleScopeToggle = (item) => {
    setFormData(prev => {
      const scope = prev.scope.includes(item)
        ? prev.scope.filter(i => i !== item)
        : [...prev.scope, item];
      return { ...prev, scope };
    });
  };

  const handleFeatureToggle = (item) => {
    setFormData(prev => {
      const selectedFeatures = prev.selectedFeatures.includes(item)
        ? prev.selectedFeatures.filter(i => i !== item)
        : [...prev.selectedFeatures, item];
      return { ...prev, selectedFeatures };
    });
  };

  const showCompany = ["Business / Corporate", "Startup / Entrepreneur", "Agency / B2B"].includes(formData.clientType);

  if (!mounted) return null;

  return (
    <div className="h-[100dvh] bg-[#030305] text-white font-sans selection:bg-cyan-400/30 overflow-y-auto lg:overflow-hidden relative flex flex-col custom-scrollbar">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[50vw] aspect-square rounded-full bg-cyan-500/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[40vw] aspect-square rounded-full bg-blue-600/10 blur-[120px]"></div>
      </div>

      {/* Mini Navbar (Back Button Only) */}
      <nav className="relative z-50 w-full py-4 px-6 sm:px-12 flex justify-end items-center flex-shrink-0">
        <Link href="/" className="text-white/40 hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
      </nav>

      {/* Main Content Split */}
      <main className={`relative z-10 flex-1 flex flex-col lg:flex-row items-center w-full max-w-[1440px] mx-auto px-4 sm:px-12 gap-4 lg:gap-16 pb-12 lg:pb-6 overflow-visible lg:overflow-hidden transition-all duration-500 ease-out ${isSidebarOpen ? 'lg:pr-[300px]' : ''}`}>

        {/* Left Side: Header & Progress */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center items-center h-auto lg:h-full mt-2 lg:mt-0">
          {/* Header Text */}
          <div className="text-center flex flex-col items-center mb-6 lg:mb-10 mt-6 lg:mt-32">
            <span className="text-cyan-400 font-syne font-bold tracking-[0.2em] lg:tracking-[0.3em] text-[9px] lg:text-[10px] sm:text-xs uppercase mb-2 lg:mb-4 block">Secure Enterprise Portal</span>
            <h1 className="text-3xl sm:text-5xl lg:text-[4rem] font-black font-bricolage tracking-tighter mb-2 lg:mb-4 italic leading-[1.05] py-1 lg:py-2">
              Let's Build Your <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient py-1 lg:py-2 block mt-1 lg:mt-2 lg:inline-block">
                Architecture.
              </span>
            </h1>
            <p className="hidden lg:block text-white/50 font-light text-sm leading-relaxed max-w-sm mt-4">
              Stop paying for generic templates. Tell us about your vision, and we will build a high-fidelity, custom demonstration.
            </p>
          </div>

          {/* Progress Tracker (Horizontal, compact) */}
          <div className="w-full max-w-[550px] hidden lg:block relative mt-12 mb-auto px-4">
            <div className="relative flex justify-between items-center">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-white/10 rounded-full z-0"></div>
              <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full z-0"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />

              {steps.map((step) => {
                const isActive = step.id === currentStep;
                const isPast = step.id < currentStep;
                return (
                  <div key={step.id} className="relative z-10 flex flex-col items-center group">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 bg-[#0a0a0a] ${isActive ? 'border-cyan-400 shadow-[0_0_10px_rgba(0,255,224,0.5)]' : isPast ? 'bg-cyan-500 border-cyan-500' : 'border-white/20'}`}>
                      {isPast ? (
                        <CheckCircle2 className="w-4 h-4 text-[#010103]" />
                      ) : (
                        <span className={`text-xs font-bold ${isActive ? 'text-cyan-400' : 'text-white/30'}`}>{step.id}</span>
                      )}
                    </div>
                    <span className={`absolute top-10 left-1/2 -translate-x-1/2 w-20 text-center text-[8px] leading-[1.2] uppercase font-sans font-bold transition-colors duration-300 ${isActive ? 'text-cyan-400' : isPast ? 'text-white/70' : 'text-white/30'}`}>
                      {step.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Form Container */}
        <div className="w-full lg:w-7/12 relative flex items-center justify-center h-auto lg:h-full">
          <div className="w-full max-w-xl relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-[24px] lg:rounded-3xl p-5 lg:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col max-h-[75vh] lg:max-h-[85vh]"
              >
                {/* Scrollable Form Area */}
                <div className="flex-1 overflow-y-auto sidebar-scrollbar pr-1 sm:pr-2 min-h-0" data-lenis-prevent="true">
                  {/* === STEP 1: IDENTITY === */}
                {currentStep === 1 && (
                  <div className="flex flex-col gap-5">
                    <div className="mb-2">
                      <h2 className="text-2xl font-sans font-bold text-white mb-1">Who are we building for?</h2>
                      <p className="text-white/40 text-xs">Tell us about yourself and provide basic contact details.</p>
                    </div>

                    <div className="flex flex-col gap-2 mb-2">
                      <label className="text-xs font-medium text-white/70 ml-1">I am representing...</label>
                      <div className="flex flex-wrap gap-2">
                        {["Individual / Portfolio", "Business / Corporate", "Startup / Entrepreneur", "Agency / B2B", "Creator / Professional"].map((type) => (
                          <button
                            key={type}
                            onClick={() => setFormData({ ...formData, clientType: type })}
                            className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all duration-300 ${formData.clientType === type
                              ? 'bg-cyan-400/10 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(0,255,224,0.15)]'
                              : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white hover:border-white/30'
                              }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-white/70 ml-1">Full Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-cyan-400 focus:bg-cyan-400/5 transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      {showCompany && (
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-medium text-white/70 ml-1">Company</label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-cyan-400 focus:bg-cyan-400/5 transition-all"
                            placeholder="Acme Corp"
                          />
                        </div>
                      )}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-white/70 ml-1">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-cyan-400 focus:bg-cyan-400/5 transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-white/70 ml-1">Phone Number</label>
                        <CountryPhoneInput
                          value={formData.phone}
                          onChange={(val) => setFormData({ ...formData, phone: val })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* === STEP 2: SCOPE === */}
                {currentStep === 2 && (
                  <div className="flex flex-col gap-4">
                    <div className="mb-1">
                      <h2 className="text-2xl font-bricolage font-bold text-white mb-1">What do you need built?</h2>
                      <p className="text-white/40 text-xs">Select all services that apply to your project scope.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: "Marketing Website", icon: Globe, desc: "Landing pages" },
                        { id: "Web Application", icon: MonitorSmartphone, desc: "SaaS or Portal" },
                        { id: "E-Commerce", icon: ShoppingCart, desc: "Digital storefront" },
                        { id: "CRM / ERP", icon: Database, desc: "Internal tools" },
                        { id: "3D / WebGL", icon: Box, desc: "3D experiences" },
                        { id: "Not Sure Yet", icon: Paintbrush, desc: "Need guidance" }
                      ].map((item) => {
                        const isSelected = formData.scope.includes(item.id);
                        const Icon = item.icon;
                        return (
                          <label key={item.id} className="relative cursor-pointer group">
                            <input
                              type="checkbox"
                              className="peer sr-only"
                              checked={isSelected}
                              onChange={() => handleScopeToggle(item.id)}
                            />
                            <div className={`p-3 rounded-xl border transition-all duration-300 flex items-center gap-3 h-full
                              ${isSelected
                                ? 'bg-cyan-400/10 border-cyan-400 shadow-[0_0_15px_rgba(0,255,224,0.1)]'
                                : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'}`}
                            >
                              <div className={`p-1.5 rounded-md flex-shrink-0 ${isSelected ? 'bg-cyan-400 text-[#010103]' : 'bg-white/10 text-white/50 group-hover:text-white'}`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className={`text-sm font-bold font-bricolage ${isSelected ? 'text-cyan-400' : 'text-white'}`}>{item.id}</h4>
                                <p className="text-[10px] text-white/40 mt-0.5 leading-tight">{item.desc}</p>
                              </div>
                            </div>
                          </label>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* === STEP 3: CURRENT STATE === */}
                {currentStep === 3 && (
                  <div className="flex flex-col gap-5">
                    <div className="mb-1">
                      <h2 className="text-2xl font-bricolage font-bold text-white mb-1">What is your current digital state?</h2>
                      <p className="text-white/40 text-xs">Help us understand where you are starting from.</p>
                    </div>

                    <div className="flex flex-col gap-3">
                      {[
                        { id: "Want a fresh new website", icon: Rocket, desc: "Building from ground zero." },
                        { id: "Already have a website, want to upgrade", icon: RefreshCcw, desc: "Platform needs an overhaul or scaling." }
                      ].map((item) => {
                        const isSelected = formData.currentState === item.id;
                        const Icon = item.icon;
                        return (
                          <label key={item.id} className="relative cursor-pointer group">
                            <input
                              type="radio"
                              name="currentState"
                              className="peer sr-only"
                              checked={isSelected}
                              onChange={() => setFormData({ ...formData, currentState: item.id })}
                            />
                            <div className={`p-3.5 rounded-xl border transition-all duration-300 flex items-center gap-4
                              ${isSelected
                                ? 'bg-blue-500/10 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                                : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'}`}
                            >
                              <div className={`p-2 rounded-lg flex-shrink-0 transition-colors ${isSelected ? 'bg-blue-500 text-[#010103]' : 'bg-white/10 text-white/50 group-hover:text-white'}`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className={`text-sm font-bold font-bricolage ${isSelected ? 'text-blue-400' : 'text-white'}`}>{item.id}</h4>
                                <p className="text-[11px] text-white/40 mt-1 leading-tight">{item.desc}</p>
                              </div>
                              <div className={`ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-blue-500' : 'border-white/20'}`}>
                                {isSelected && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                              </div>
                            </div>
                          </label>
                        )
                      })}
                    </div>

                    {/* Conditionally Show Current Website Link Input */}
                    {formData.currentState === "Already have a website, want to upgrade" && (
                      <div className="flex flex-col gap-1.5 mt-2">
                        <label className="text-[10px] uppercase font-syne font-bold tracking-widest text-blue-400 ml-1">Current Website Link</label>
                        <input
                          type="url"
                          value={formData.currentWebsite}
                          onChange={(e) => setFormData({ ...formData, currentWebsite: e.target.value })}
                          className="w-full bg-blue-500/5 border border-blue-500/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-400 focus:bg-blue-400/10 transition-all shadow-[0_0_15px_rgba(59,130,246,0.05)] focus:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                          placeholder="https://www.yourdomain.com"
                        />
                      </div>
                    )}

                    {/* Page Count Counter */}
                    <div className="flex flex-col gap-3 mt-5 border-t border-white/10 pt-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <label className="text-sm sm:text-base font-bricolage font-bold text-white block">Estimated Page Count</label>
                          <p className="text-[10px] sm:text-xs text-white/50 mt-1">How many distinct pages will your website require?</p>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer group mt-1">
                          <input
                            type="checkbox"
                            checked={formData.pageCountNotSure}
                            onChange={(e) => setFormData({ ...formData, pageCountNotSure: e.target.checked })}
                            className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-400 focus:ring-cyan-400/50 cursor-pointer"
                          />
                          <span className="text-xs text-white/50 group-hover:text-white transition-colors">Not Sure</span>
                        </label>
                      </div>

                      <div className={`flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-xl p-1 w-full max-w-[140px] shadow-inner group transition-all duration-300 ${formData.pageCountNotSure ? 'opacity-40 pointer-events-none grayscale' : 'hover:border-white/20'}`}>
                        <button
                          onClick={() => setFormData({ ...formData, pageCount: Math.max(1, formData.pageCount - 1) })}
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all active:scale-95"
                        >
                          <span className="text-lg font-light leading-none relative -top-[1px]">-</span>
                        </button>

                        <div className="flex flex-col items-center justify-center px-1 relative">
                          <input
                            type="number"
                            min="1"
                            value={formData.pageCount}
                            onChange={(e) => setFormData({ ...formData, pageCount: parseInt(e.target.value) || 1 })}
                            className="w-10 bg-transparent text-center text-xl font-black font-bricolage text-white focus:outline-none group-hover:text-cyan-400 transition-colors"
                          />
                          <span className="text-[7px] font-bold tracking-widest text-white/30 uppercase leading-none">Pages</span>
                        </div>

                        <button
                          onClick={() => setFormData({ ...formData, pageCount: formData.pageCount + 1 })}
                          className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 flex items-center justify-center text-cyan-400 transition-all active:scale-95 shadow-[0_0_10px_rgba(0,255,224,0.1)]"
                        >
                          <span className="text-lg font-light leading-none relative -top-[1px]">+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* === STEP 4: FEATURES === */}
                {currentStep === 4 && (
                  <div className="flex flex-col gap-3">
                    <div>
                      <h2 className="text-xl font-sans font-bold text-white mb-0.5">Select Features</h2>
                      <p className="text-white/40 text-[10px]">Choose specific features to see estimated pricing.</p>
                    </div>

                    <div className="max-h-[45vh] overflow-y-auto custom-scrollbar pr-2 flex flex-col gap-4">
                      {/* Base Features Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {AVAILABLE_FEATURES.map((feature) => {
                          const isSelected = formData.selectedFeatures.includes(feature.id);
                          return (
                            <label key={feature.id} className="relative cursor-pointer group">
                              <input
                                type="checkbox"
                                className="peer sr-only"
                                checked={isSelected}
                                onChange={() => handleFeatureToggle(feature.id)}
                              />
                              <div className={`p-2.5 px-3 rounded-xl border transition-all duration-300 flex items-center justify-between h-full
                                ${isSelected
                                  ? 'bg-cyan-400/10 border-cyan-400 shadow-[0_0_10px_rgba(0,255,224,0.1)]'
                                  : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'}`}
                              >
                                <div className="flex flex-col pr-2">
                                  <h4 className={`text-xs font-bold font-sans leading-tight ${isSelected ? 'text-cyan-400' : 'text-white'}`}>{feature.name}</h4>
                                  <p className="text-[9px] text-white/40 mt-0.5 leading-tight">{feature.desc}</p>
                                </div>
                                <div className={`text-[10px] font-bold whitespace-nowrap bg-[#0a0a0a]/50 px-2 py-1 rounded-md border ${isSelected ? 'text-cyan-400 border-cyan-400/30' : 'text-white/60 border-white/10'}`}>
                                  +₹{(feature.price / 1000).toFixed(0)}k
                                </div>
                              </div>
                            </label>
                          )
                        })}
                      </div>

                      {/* Advanced Features Button */}
                      <button
                        onClick={() => setShowAdvancedModal(true)}
                        className="p-3 w-full border border-blue-500/30 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 transition-all flex justify-between items-center group mb-2 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                          </div>
                          <div className="text-left">
                            <span className="block text-xs font-bold text-white tracking-wide">Explore Advanced Capabilities</span>
                            <span className="block text-[9px] text-white/50 mt-0.5">Premium UI, Integrations, and more</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </button>
                    </div>

                    <div className="mt-1 pt-3 border-t border-white/10 flex justify-between items-center">
                      <span className="text-white/60 text-[11px] font-medium uppercase tracking-wider">Estimated Features Cost</span>
                      <span className="text-lg font-bold text-cyan-400">
                        ₹{formData.selectedFeatures.reduce((total, id) => {
                          const f = ALL_FEATURES.find(f => f.id === id);
                          return total + (f ? f.price : 0);
                        }, 0).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                )}

                {/* === STEP 5: TIMELINE === */}
                {currentStep === 5 && (
                  <div className="flex flex-col gap-6">
                    <div>
                      <h2 className="text-2xl font-bricolage font-bold text-white mb-1">Timeline & Investment</h2>
                      <p className="text-white/40 text-xs">When do you need this launched?</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: "ASAP", icon: Zap, time: "< 15 Days", extra: "+₹4,999" },
                        { id: "Standard", icon: Clock, time: "1 - 1.5 Months" }
                      ].map((item) => {
                        const isSelected = formData.timeline === item.id;
                        const Icon = item.icon;
                        return (
                          <label key={item.id} className="relative cursor-pointer group">
                            <input
                              type="radio"
                              name="timeline"
                              className="peer sr-only"
                              checked={isSelected}
                              onChange={() => setFormData({ ...formData, timeline: item.id })}
                            />
                            <div className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center text-center gap-2 h-full justify-center
                              ${isSelected
                                ? 'bg-purple-500/10 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                                : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'}`}
                            >
                              <Icon className={`w-5 h-5 ${isSelected ? 'text-purple-400' : 'text-white/50 group-hover:text-white'}`} />
                              <div>
                                <h4 className={`text-sm font-bold font-bricolage ${isSelected ? 'text-purple-400' : 'text-white'}`}>
                                  {item.id}
                                </h4>
                                <p className="text-[10px] text-white/40 mt-1">{item.time}</p>
                                {item.extra && (
                                  <div className="mt-3">
                                    <span className={`text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-md border font-bold ${isSelected ? 'bg-purple-500/20 border-purple-400/50 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 'bg-white/5 border-white/20 text-white/60'}`}>
                                      {item.extra}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </label>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* === STEP 6: INFRASTRUCTURE === */}
                {currentStep === 6 && (
                  <div className="flex flex-col gap-5">
                    <div className="mb-4">
                      <h2 className="text-2xl font-sans font-bold text-white mb-1">Infrastructure & Deployment</h2>
                      <p className="text-white/40 text-xs">Do you need us to handle hosting and domain registration?</p>
                    </div>

                    <div className="flex flex-col gap-3 mb-2">
                      <label className="text-xs font-medium text-white/70 ml-1">Hosting Preference</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { id: "Managed Hosting", icon: Server, title: "Managed Hosting", desc: "We host, maintain & scale it", price: "+₹2,500/mo" },
                          { id: "Self Hosted", icon: Database, title: "Self Hosted", desc: "You manage your own servers", price: "Free" }
                        ].map((item) => {
                          const isSelected = formData.hosting === item.id;
                          const Icon = item.icon;
                          return (
                            <label key={item.id} className="relative cursor-pointer group h-full">
                              <input 
                                type="radio" 
                                name="hosting"
                                className="peer sr-only" 
                                checked={isSelected}
                                onChange={() => setFormData({...formData, hosting: item.id})}
                              />
                              <div className={`p-4 rounded-xl border transition-all duration-300 flex flex-col gap-2 h-full
                                ${isSelected 
                                  ? 'bg-cyan-500/10 border-cyan-500 shadow-[0_0_15px_rgba(0,255,224,0.15)]' 
                                  : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'}`}
                              >
                                <div className="flex justify-between items-start">
                                  <Icon className={`w-5 h-5 ${isSelected ? 'text-cyan-400' : 'text-white/50 group-hover:text-white'}`} />
                                  <span className={`text-[10px] px-2 py-0.5 rounded border ${isSelected ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30 font-bold' : 'bg-white/5 text-white/40 border-white/10'}`}>
                                    {item.price}
                                  </span>
                                </div>
                                <h4 className={`text-sm font-bold mt-1 ${isSelected ? 'text-cyan-400' : 'text-white'}`}>{item.title}</h4>
                                <p className="text-[10px] text-white/40">{item.desc}</p>
                              </div>
                            </label>
                          )
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-2">
                      <label className="text-xs font-medium text-white/70 ml-1">Domain Name</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { id: "New Domain", icon: Globe, title: "Register New Domain", desc: "We'll buy & setup a .com/.in", price: "+₹1,500" },
                          { id: "Own Domain", icon: Box, title: "I Have My Own", desc: "We'll connect to your existing domain", price: "Free" }
                        ].map((item) => {
                          const isSelected = formData.domain === item.id;
                          const Icon = item.icon;
                          return (
                            <label key={item.id} className="relative cursor-pointer group h-full">
                              <input 
                                type="radio" 
                                name="domain"
                                className="peer sr-only" 
                                checked={isSelected}
                                onChange={() => setFormData({...formData, domain: item.id})}
                              />
                              <div className={`p-4 rounded-xl border transition-all duration-300 flex flex-col gap-2 h-full
                                ${isSelected 
                                  ? 'bg-blue-500/10 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                                  : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'}`}
                              >
                                <div className="flex justify-between items-start">
                                  <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-400' : 'text-white/50 group-hover:text-white'}`} />
                                  <span className={`text-[10px] px-2 py-0.5 rounded border ${isSelected ? 'bg-blue-500/20 text-blue-300 border-blue-500/30 font-bold' : 'bg-white/5 text-white/40 border-white/10'}`}>
                                    {item.price}
                                  </span>
                                </div>
                                <h4 className={`text-sm font-bold mt-1 ${isSelected ? 'text-blue-400' : 'text-white'}`}>{item.title}</h4>
                                <p className="text-[10px] text-white/40">{item.desc}</p>
                              </div>
                            </label>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* === STEP 7: REVIEW === */}
                {currentStep === 7 && (
                  <div className="flex flex-col gap-3 w-full max-w-2xl mx-auto">
                    <div className="text-center mb-1">
                      <h2 className="text-2xl font-bricolage font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mb-1">Ready to Initialize</h2>
                      <p className="text-white/50 text-[11px]">Review your architecture parameters below.</p>
                    </div>
                    
                    <div className="bg-white/[0.02] backdrop-blur-2xl rounded-3xl border border-white/10 p-4 flex flex-col gap-3 shadow-[0_10px_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
                      {/* Decorative Elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-[40px] pointer-events-none"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[40px] pointer-events-none"></div>

                      <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-3 relative z-10">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[9px] uppercase font-syne text-white/40 tracking-[0.2em]">Entity Details</span>
                          <span className="text-sm font-bold text-white leading-tight">{formData.name || "N/A"}</span>
                          {formData.company && <span className="text-xs font-medium text-cyan-400">{formData.company}</span>}
                        </div>
                        <div className="flex flex-col gap-0.5 text-right">
                          <span className="text-[9px] uppercase font-syne text-white/40 tracking-[0.2em]">Contact Info</span>
                          <span className="text-sm font-medium text-white/90">{formData.email || "N/A"}</span>
                          <span className="text-xs font-medium text-white/70">{formData.phone || "N/A"}</span>
                        </div>
                      </div>
                      
                      <div className="relative z-10 border-b border-white/10 pb-3">
                        <span className="block text-[9px] uppercase font-syne text-white/40 tracking-[0.2em] mb-1.5">Project Scope</span>
                        <div className="flex flex-wrap gap-1.5">
                          {formData.scope.length > 0 ? formData.scope.map(s => (
                            <span key={s} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-medium text-white">{s}</span>
                          )) : <span className="text-xs text-white/40 italic">Not specified</span>}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-y-3 gap-x-4 relative z-10 border-b border-white/10 pb-3">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[9px] uppercase font-syne text-white/40 tracking-[0.2em]">Current State</span>
                          <span className="text-xs font-medium text-white/90">{formData.currentState || "N/A"}</span>
                        </div>
                        <div className="flex flex-col gap-0.5 text-right">
                          <span className="text-[9px] uppercase font-syne text-white/40 tracking-[0.2em]">Timeline</span>
                          <span className="text-xs font-bold text-purple-400">{formData.timeline || "Not selected"}</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[9px] uppercase font-syne text-white/40 tracking-[0.2em]">Hosting</span>
                          <span className="text-xs font-medium text-cyan-400">{formData.hosting || "Not selected"}</span>
                        </div>
                        <div className="flex flex-col gap-0.5 text-right">
                          <span className="text-[9px] uppercase font-syne text-white/40 tracking-[0.2em]">Domain</span>
                          <span className="text-xs font-bold text-blue-400">{formData.domain || "Not selected"}</span>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 relative z-10 flex flex-col gap-1.5">
                        <div className="flex justify-between items-center gap-2">
                          <div className="flex flex-col">
                             <span className="text-[9px] uppercase font-syne text-white/40 tracking-[0.2em]">Add-ons & Infra</span>
                             <span className="text-xs font-medium text-white/80">{formData.selectedFeatures.length} premium feature(s)</span>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-[9px] uppercase font-syne text-white/40 tracking-[0.2em]">Upfront Cost</span>
                            <span className="text-2xl font-black text-cyan-400 font-mono tracking-tight leading-none">₹{(formData.selectedFeatures.reduce((total, id) => total + (ALL_FEATURES.find(f => f.id === id)?.price || 0), 0) + (formData.timeline === "ASAP" ? 4999 : 0) + (formData.domain === "New Domain" ? 1500 : 0) + (formData.hosting === "Managed Hosting" ? 2500 : 0)).toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                        {formData.hosting === "Managed Hosting" && (
                          <div className="pt-1.5 border-t border-white/5 flex justify-between items-center">
                            <span className="text-[9px] text-white/50">Recurring Hosting</span>
                            <span className="text-xs font-bold text-cyan-400 font-mono">+₹2,500 <span className="text-[8px] text-white/30 font-sans">/ mo</span></span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                </div>

                {/* Navigation Buttons */}
                <div className={`mt-6 pt-6 border-t border-white/10 flex ${currentStep === 1 ? 'justify-end' : 'justify-between'} items-center flex-shrink-0`}>
                  {currentStep > 1 && (
                    <button
                      onClick={handlePrev}
                      className="px-5 py-2.5 rounded-xl border border-white/10 text-white/70 text-sm font-medium hover:bg-white/5 hover:text-white transition-all flex items-center gap-2"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                  )}

                  {currentStep < 7 ? (
                    <button
                      onClick={handleNext}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-[#010103] text-sm font-bold hover:shadow-[0_0_15px_rgba(0,255,224,0.4)] transition-all flex items-center gap-2 ml-auto hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {currentStep === 6 ? "Review Request" : "Continue"} <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      className="px-6 py-2.5 rounded-xl bg-white text-[#010103] text-sm font-bold hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Request Deploy <Rocket className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </main>

      {/* Advanced Features Modal Popup */}
      <AnimatePresence>
        {showAdvancedModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 pt-16 sm:pt-20 bg-[#010103]/80 backdrop-blur-sm"
            onClick={() => setShowAdvancedModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-[#0c121e] via-[#050812] to-[#010103] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[calc(100vh-120px)] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Subtle ambient glows */}
              <div className="absolute top-[-20%] right-[-10%] w-[60%] aspect-square bg-blue-500/15 rounded-full blur-[100px] pointer-events-none z-0"></div>
              <div className="absolute bottom-[-20%] left-[-10%] w-[60%] aspect-square bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b border-white/10 flex justify-between items-center bg-white/5 backdrop-blur-md rounded-t-[24px] lg:rounded-t-3xl flex-shrink-0 relative z-10">
                <div>
                  <h2 className="text-2xl font-bold font-sans text-white">Advanced Capabilities</h2>
                  <p className="text-white/50 text-xs mt-1">Select premium enhancements for your architecture.</p>
                </div>
                <button
                  onClick={() => setShowAdvancedModal(false)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white/70" />
                </button>
              </div>

              {/* Modal Body */}
              <div data-lenis-prevent="true" className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-1 flex flex-col gap-6 sm:gap-8 min-h-0 relative z-10">
                {ADVANCED_FEATURES.map((category, idx) => (
                  <div key={idx} className="flex flex-col gap-4">
                    <h3 className="text-xs uppercase font-syne font-bold tracking-[0.2em] text-cyan-400 border-b border-white/5 pb-2">{category.category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {category.features.map(feature => {
                        const isSelected = formData.selectedFeatures.includes(feature.id);
                        return (
                          <label key={feature.id} className="relative cursor-pointer group h-full">
                            <input
                              type="checkbox"
                              className="peer sr-only"
                              checked={isSelected}
                              onChange={() => handleFeatureToggle(feature.id)}
                            />
                            <div className={`p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between h-full
                              ${isSelected
                                ? 'bg-blue-500/10 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                                : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'}`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className={`text-sm font-bold font-sans ${isSelected ? 'text-blue-400' : 'text-white'}`}>{feature.name}</h4>
                                <div className={`text-xs font-bold px-2.5 py-1 rounded-md border ${isSelected ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-white/5 text-white/60 border-white/10'}`}>
                                  +₹{(feature.price / 1000).toFixed(0)}k
                                </div>
                              </div>
                              <p className="text-xs text-white/50 leading-relaxed">{feature.desc}</p>
                            </div>
                          </label>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="p-5 border-t border-white/10 bg-white/5 backdrop-blur-xl rounded-b-3xl flex justify-between items-center flex-shrink-0 relative z-10">
                <div>
                  <span className="block text-[10px] text-white/40 uppercase tracking-widest font-syne mb-0.5">Total Add-on Value</span>
                  <span className="text-xl font-bold text-cyan-400">
                    ₹{formData.selectedFeatures.reduce((total, id) => {
                      const f = ADVANCED_FEATURES.flatMap(c => c.features).find(f => f.id === id);
                      return total + (f ? f.price : 0);
                    }, 0).toLocaleString('en-IN')}
                  </span>
                </div>
                <button
                  onClick={() => setShowAdvancedModal(false)}
                  className="px-6 py-2.5 rounded-xl bg-white text-[#010103] text-sm font-bold hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all active:scale-[0.98]"
                >
                  Save & Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Floating Estimate Sidebar */}
      <AnimatePresence>
        {formData.selectedFeatures.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: isSidebarOpen ? 0 : "calc(100% - 40px)" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex items-center"
          >
            {/* Toggle Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/10 border-r-0 rounded-l-2xl p-2 w-10 flex items-center justify-center h-20 shadow-[-5px_0_20px_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors group z-10"
            >
              {isSidebarOpen ? (
                <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-white" />
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <ShoppingCart className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[8px] font-bold text-white/50">{formData.selectedFeatures.length}</span>
                </div>
              )}
            </button>

            {/* Panel Content */}
            <div className="w-[85vw] sm:w-72 bg-white/[0.03] backdrop-blur-3xl border border-white/10 border-r-0 rounded-l-3xl shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden max-h-[70vh] lg:max-h-[80vh] relative">
              
              {/* Animated Greyish Background Elements */}
              <div className="absolute top-[-20%] right-[-20%] w-[60%] aspect-square bg-white/10 rounded-full blur-[60px] animate-[pulse_6s_ease-in-out_infinite] pointer-events-none z-0"></div>
              <div className="absolute bottom-[-20%] left-[-20%] w-[60%] aspect-square bg-white/5 rounded-full blur-[60px] animate-[pulse_8s_ease-in-out_infinite_reverse] pointer-events-none z-0"></div>
              <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.03)_50%,transparent)]"></div>
              <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px] opacity-40"></div>

              <div className="p-4 border-b border-white/10 bg-cyan-500/10 flex-shrink-0 relative z-10">
                <h3 className="text-sm font-bricolage font-bold text-white flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-cyan-400" /> Investment Summary
                </h3>
              </div>

              <div data-lenis-prevent="true" className="flex flex-col p-2 overflow-y-auto sidebar-scrollbar flex-1 min-h-0 relative z-10">
                {formData.selectedFeatures.map(id => {
                  const feature = ALL_FEATURES.find(f => f.id === id);
                  if (!feature) return null;
                  return (
                    <div key={id} className="flex flex-col p-3 border-b border-white/5 hover:bg-white/5 transition-colors rounded-xl group/item relative">
                      <div className="flex justify-between items-start gap-2 pr-6">
                        <span className="text-[11px] font-bold text-white/90 leading-tight">{feature.name}</span>
                        <span className="text-[11px] font-mono font-bold text-cyan-400 whitespace-nowrap">₹{(feature.price).toLocaleString('en-IN')}</span>
                      </div>
                      <span className="text-[9px] text-white/40 mt-1 line-clamp-1 pr-6">{feature.desc}</span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFeatureToggle(id);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md flex items-center justify-center opacity-0 group-hover/item:opacity-100 bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all focus:opacity-100"
                        title="Remove feature"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )
                })}
              </div>

              <div className="p-4 border-t border-white/10 bg-white/[0.02] backdrop-blur-md mt-auto flex-shrink-0 relative z-10">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-[10px] uppercase font-syne text-white/50 tracking-widest">Total Estimate</span>
                  <span className="text-xl font-black text-cyan-400 font-mono leading-none">
                    ₹{(formData.selectedFeatures.reduce((acc, id) => {
                      const f = ALL_FEATURES.find(f => f.id === id);
                      return acc + (f ? f.price : 0);
                    }, 0) + (formData.timeline === "ASAP" ? 4999 : 0) + (formData.domain === "New Domain" ? 1500 : 0) + (formData.hosting === "Managed Hosting" ? 2500 : 0)).toLocaleString('en-IN')}
                  </span>
                </div>
                {formData.timeline === "ASAP" && (
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
                    <span className="text-[9px] uppercase font-syne text-purple-400/70 tracking-widest flex items-center gap-1">
                      <Zap className="w-3 h-3" /> ASAP Delivery
                    </span>
                    <span className="text-[10px] font-bold text-purple-400 font-mono">+₹4,999</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
