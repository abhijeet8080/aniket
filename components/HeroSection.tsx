"use client";

import { Bebas_Neue } from "next/font/google";
import { motion } from "framer-motion";

const displayFont = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const transparentName =
  "text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.9)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.9)]";

const ease = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { value: "200+", label: "Projects" },
  { value: "50+",  label: "Clients" },
  { value: "4+",   label: "Years" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-black">

      {/* ── Background video ──────────────────────────────────────── */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/assets/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Left-side gradient — darkens only where text sits */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.58) 38%, rgba(0,0,0,0.08) 100%)",
        }}
      />

      {/* Bottom vignette — grounds the content */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "55%",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Cinematic letterbox lines */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-amber-400/30 via-amber-400/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-amber-400/25 via-amber-400/8 to-transparent" />

      {/* ── Vertical "SHOWREEL 2026" label — far right ────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.9 }}
        className="absolute right-5 top-1/2 hidden lg:block"
        style={{
          writingMode: "vertical-rl",
          transform: "translateY(-50%) rotate(180deg)",
        }}
      >
        <span
          className="font-mono text-[10px] tracking-[0.38em] uppercase"
          style={{ color: "#FACC15" }}
        >
          Showreel 2026
        </span>
      </motion.div>

      {/* ── Main content — bottom-left, flush to edge ─────────────── */}
      <div className="absolute inset-0 flex items-end justify-start pb-10 pl-4 sm:pb-12 sm:pl-5 lg:pb-14 lg:pl-6">
        <div className="max-w-[640px]">

            {/* REC indicator */}
            {/* <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease, delay: 0.05 }}
              className="mb-7 inline-flex items-center gap-3"
            >
              <span className="relative flex h-[7px] w-[7px] shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60" />
                <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-red-500" />
              </span>
              <span className="font-mono text-[10px] font-medium tracking-[0.22em] uppercase text-white/40">
                Now Booking — 2025
              </span>
            </motion.div> */}

            {/* Role + headline — shared left edge */}
            <div className="flex flex-col items-start">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease, delay: 0.14 }}
                className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-amber-400"
              >
                Video Editor &amp; GenAI Creator
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, ease, delay: 0.22 }}
                className={`mb-7 leading-[0.86] tracking-[0.02em] uppercase ${displayFont.className}`}
                style={{ fontSize: "clamp(5rem, 16vw, 11rem)" }}
              >
                <span className={`block ${transparentName}`}>Aniket</span>
                <span className="block">
                  <span className={transparentName}>Patil</span>
                  <span className="text-amber-400">.</span>
                </span>
              </motion.h1>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.36 }}
              className="mb-10 max-w-[360px] text-[15px] leading-relaxed text-white/50"
            >
              Every frame tells a story.
              <br />
              Every cut keeps them watching.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.46 }}
              className="flex flex-wrap items-center gap-3"
            >
              {/* Primary — yellow fill */}
              <button
                className="flex items-center gap-2.5 px-8 py-3.5 text-[13px] font-semibold tracking-[0.08em] uppercase text-black transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                style={{ background: "#FACC15" }}
              >
                <svg className="h-3 w-3 shrink-0 fill-black" viewBox="0 0 24 24">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
                Watch Showreel
              </button>

              {/* Secondary — yellow outline */}
              <button
                className="px-8 py-3.5 text-[13px] font-semibold tracking-[0.08em] uppercase transition-all duration-200 hover:bg-amber-400 hover:text-black active:scale-[0.98]"
                style={{
                  border: "1px solid #FACC15",
                  color: "#FACC15",
                  background: "transparent",
                }}
              >
                Hire Me
              </button>
            </motion.div>
        </div>
      </div>

      {/* ── Floating stats — bottom-right ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.68 }}
        className="absolute bottom-14 right-14 hidden flex-col items-end gap-7 lg:flex lg:bottom-18"
      >
        {STATS.map((stat) => (
          <div key={stat.label} className="text-right">
            <div className="font-sans text-[2rem] font-light tabular-nums leading-none tracking-tight text-white/90">
              {stat.value}
            </div>
            <div className="mt-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-white/35">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
