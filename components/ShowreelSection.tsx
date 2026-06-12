"use client";

import { motion, useInView } from "framer-motion";
import { Bebas_Neue } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const displayFont = Bebas_Neue({ weight: "400", subsets: ["latin"] });

const ease = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { value: 100, suffix: "M+", label: "Combined Views" },
  { value: 45,  suffix: "%",  label: "Avg Retention Lift" },
  { value: 150, suffix: "+",  label: "Projects Delivered" },
  { value: 30,  suffix: "+",  label: "Creators & Brands" },
];

const TAGS = [
  "YouTube",
  "Instagram Reels",
  "Podcasts",
  "Commercials",
  "Motion Graphics",
  "Retention Editing",
];

/* ─── Animated counter ───────────────────────────────────────────── */
function Counter({ target, suffix, started }: { target: number; suffix: string; started: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const duration = 1800;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [started, target]);

  return (
    <>{count}{suffix}</>
  );
}

/* ─── Timeline bar ───────────────────────────────────────────────── */
function Timeline() {
  const ticks = ["00:00", "00:15", "00:30", "00:45", "01:00", "01:15", "01:30"];
  return (
    <div className="mt-3 select-none">
      <div className="relative h-px w-full bg-white/10">
        {/* playhead */}
        <motion.div
          className="absolute top-0 h-px bg-amber-400"
          initial={{ width: "0%" }}
          animate={{ width: "38%" }}
          transition={{ duration: 3, ease: "easeInOut", delay: 1.2 }}
        />
        {/* playhead marker */}
        <motion.div
          className="absolute -top-[3px] h-[7px] w-[1.5px] bg-amber-400"
          initial={{ left: "0%" }}
          animate={{ left: "38%" }}
          transition={{ duration: 3, ease: "easeInOut", delay: 1.2 }}
        />
      </div>
      <div className="mt-1.5 flex justify-between">
        {ticks.map((t) => (
          <span key={t} className="font-mono text-[8px] tracking-widest text-white/20">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Fullscreen modal ───────────────────────────────────────────── */
function VideoModal({ onClose }: { onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    videoRef.current?.play();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.3, ease }}
        className="relative w-full max-w-5xl px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src="/assets/videos/hero.mp4"
          controls
          playsInline
          className="aspect-video w-full"
          style={{ outline: "none" }}
        />
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-4 font-mono text-[10px] tracking-[0.22em] uppercase text-white/40 transition-colors hover:text-white"
        >
          ESC / Close
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main section ───────────────────────────────────────────────── */
export default function ShowreelSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const inView     = useInView(statsRef, { once: true, margin: "-80px" });

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  return (
    <>
      <section
        ref={sectionRef}
        id="work"
        className="relative bg-black py-24 lg:py-32"
      >
        {/* Subtle grain overlay */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.032]"
          aria-hidden="true"
        >
          <defs>
            <filter id="reel-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>
          <rect width="100%" height="100%" filter="url(#reel-grain)" />
        </svg>

        {/* Top border accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">

          {/* ── Header ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease }}
            className="mb-14 lg:mb-18"
          >
            <p
              className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em]"
              style={{ color: "#FACC15" }}
            >
              Featured Showreel
            </p>
            <h2
              className={`${displayFont.className} text-white leading-[0.88] tracking-[0.02em] uppercase`}
              style={{ fontSize: "clamp(3.5rem, 10vw, 7.5rem)" }}
            >
              Crafted For<br />
              <span className="text-white/15 [-webkit-text-stroke:1px_rgba(255,255,255,0.3)]">
                Attention
              </span>
            </h2>
            <p className="mt-6 max-w-[480px] text-[14px] leading-relaxed text-white/40">
              A selection of my best work across short-form content, YouTube
              videos, commercial edits and motion graphics.
            </p>
          </motion.div>

          {/* ── Video block ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.85, ease }}
            className="relative"
          >
            {/* Floating tags */}
            <div className="mb-4 flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] tracking-[0.18em] uppercase px-3 py-1.5"
                  style={{
                    border: "1px solid rgba(250,204,21,0.25)",
                    color: "rgba(250,204,21,0.55)",
                    background: "rgba(0,0,0,0.6)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Video thumbnail / preview */}
            <div
              className="group relative aspect-video w-full cursor-pointer overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
              onClick={() => setModalOpen(true)}
            >
              {/* Muted preview loop */}
              <video
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
                src="/assets/videos/hero.mp4"
                autoPlay
                muted
                loop
                playsInline
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/30" />

              {/* Amber corner accents */}
              <div className="pointer-events-none absolute left-0 top-0 h-8 w-8 border-l border-t border-amber-400/50" />
              <div className="pointer-events-none absolute right-0 top-0 h-8 w-8 border-r border-t border-amber-400/50" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-8 w-8 border-b border-l border-amber-400/50" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-8 w-8 border-b border-r border-amber-400/50" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-4"
                >
                  {/* Circle play */}
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full transition-colors duration-200 group-hover:bg-amber-400"
                    style={{ border: "1.5px solid rgba(250,204,21,0.7)", background: "rgba(0,0,0,0.55)" }}
                  >
                    <svg
                      className="h-5 w-5 translate-x-[1px] transition-colors duration-200 group-hover:fill-black"
                      viewBox="0 0 24 24"
                      fill="rgba(250,204,21,0.9)"
                    >
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                  <span
                    className="font-mono text-[11px] tracking-[0.22em] uppercase transition-colors duration-200 group-hover:text-white"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    Watch Showreel
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Timeline */}
            <Timeline />
          </motion.div>

          {/* ── Stats ───────────────────────────────────────────── */}
          <div ref={statsRef} className="mt-16 lg:mt-20">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                >
                  <div
                    className={`${displayFont.className} leading-none tracking-tight text-white`}
                    style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)" }}
                  >
                    <Counter target={stat.value} suffix={stat.suffix} started={inView} />
                  </div>
                  <div
                    className="mt-2 font-mono text-[9px] uppercase text-white/30"
                    style={{ letterSpacing: "0.22em" }}
                  >
                    {stat.label}
                  </div>
                  <div className="mt-3 h-px w-8 bg-amber-400/30" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Fullscreen modal ──────────────────────────────────────── */}
      {modalOpen && <VideoModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
