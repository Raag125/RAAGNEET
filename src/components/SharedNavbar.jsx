"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SharedNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about-us' },
    { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact-us' },
  ];

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
      className="fixed top-0 left-0 right-0 z-[100] pointer-events-auto px-3 sm:px-5"
    >
      <div className={`mx-auto max-w-6xl transition-all duration-500 ${scrolled ? 'mt-2' : 'mt-3'}`}>
        <div className={`relative flex items-center justify-between transition-all duration-500 rounded-full border ${
          scrolled
            ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-white/[0.07] shadow-[0_8px_32px_rgba(0,0,0,0.6)] py-1.5 px-4 sm:px-5'
            : 'bg-[#0a0a0a]/30 backdrop-blur-md border-white/[0.05] shadow-[0_4px_24px_rgba(0,0,0,0.3)] py-2 px-4 sm:px-6'
        }`}>
          {/* Logo */}
          <Link href="/#hero" className="relative flex items-center gap-2.5 group z-10 shrink-0">
            <div className="relative w-7 h-7 flex items-center justify-center">
              <div className="absolute inset-0 rounded-md bg-gradient-to-br from-[#00FFE0]/20 to-transparent group-hover:from-[#00FFE0]/30 transition-all duration-500" />
              <svg width="15" height="15" viewBox="0 0 18 18" fill="none" className="relative z-10">
                <path d="M9 1L16.5 5.5V12.5L9 17L1.5 12.5V5.5L9 1Z" stroke="#00FFE0" strokeWidth="1.5" />
                <circle cx="9" cy="9" r="2" fill="#00FFE0" />
              </svg>
            </div>
            <span className="text-white/90 font-bold tracking-tight text-xs sm:text-sm">
              NEET<span className="text-[#00FFE0] mx-[0.5px]">/</span>STUDIO
            </span>
          </Link>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center gap-0.5 z-10 mx-2">
            {links.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`relative px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="navActiveDot"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00FFE0] shadow-[0_0_6px_#00FFE0]"
                      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right */}
          <div className="flex items-center gap-1.5 z-10 shrink-0">
            <Link href="/amoled">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/15 text-white/70 text-xs font-medium transition-all duration-200 hover:border-[#00FFE0]/40 hover:text-[#00FFE0] hover:shadow-[0_0_16px_rgba(0,255,224,0.08)]"
              >
                Tech Stack
              </motion.button>
            </Link>
            <Link href="/momo">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/15 text-white/70 text-xs font-medium transition-all duration-200 hover:border-[#00FFE0]/40 hover:text-[#00FFE0] hover:shadow-[0_0_16px_rgba(0,255,224,0.08)]"
              >
                <span className="w-1 h-1 rounded-full bg-[#00FFE0] shadow-[0_0_4px_#00FFE0]" />
                Momo
              </motion.button>
            </Link>
            <MobileMenuButton pathname={pathname} links={links} />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function MobileMenuButton({ pathname, links }) {
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden relative w-7 h-7 flex items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] transition-all duration-200"
        aria-label="Toggle menu"
      >
        <div className="flex flex-col gap-[3px] items-center">
          <motion.span animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }} className="h-[1.5px] w-3.5 bg-white/50 block origin-center rounded-full" />
          <motion.span animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} className="h-[1.5px] w-3.5 bg-white/50 block rounded-full" />
          <motion.span animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }} className="h-[1.5px] w-3.5 bg-white/50 block origin-center rounded-full" />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 mt-2 p-1.5 rounded-2xl bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/[0.07] shadow-[0_16px_48px_rgba(0,0,0,0.7)] md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-0.5">
              {links.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`relative px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-white bg-white/[0.05]'
                        : 'text-white/40 hover:text-white hover:bg-white/[0.03]'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="mobileActiveDot"
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#00FFE0] shadow-[0_0_6px_#00FFE0]"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
