"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const VIDEOS = [
  {
    id: 0,
    platform: "Instagram",
    platformColor: "#e1306c",
    duration: "0:28",
    username: "@aniketedits",
    caption: "Created this brand reel for @luxebrand ✨ #reels #videoeditor",
    likes: "4.2K",
    comments: "186",
    shares: "94",
    gradient: "from-violet-900 via-indigo-950 to-slate-950",
    glowColor: "rgba(139,92,246,0.25)",
  },
  {
    id: 1,
    platform: "TikTok",
    platformColor: "#69c9d0",
    duration: "0:45",
    username: "@aniketedits",
    caption: "Product launch video — 24hr edit challenge 🔥 #editing #viral",
    likes: "12.8K",
    comments: "342",
    shares: "217",
    gradient: "from-rose-900 via-pink-950 to-slate-950",
    glowColor: "rgba(244,63,94,0.25)",
  },
  {
    id: 2,
    platform: "YouTube Shorts",
    platformColor: "#ff0000",
    duration: "0:58",
    username: "@aniketedits",
    caption: "Full event coverage compressed to 60s 🎯 #shorts #highlight",
    likes: "8.1K",
    comments: "213",
    shares: "156",
    gradient: "from-amber-900 via-orange-950 to-slate-950",
    glowColor: "rgba(251,146,60,0.25)",
  },
  {
    id: 3,
    platform: "Instagram",
    platformColor: "#e1306c",
    duration: "0:33",
    username: "@aniketedits",
    caption: "Promo reel for Pune-based musician 🎵 #music #cinematicvideo",
    likes: "6.7K",
    comments: "294",
    shares: "188",
    gradient: "from-emerald-900 via-teal-950 to-slate-950",
    glowColor: "rgba(52,211,153,0.25)",
  },
];

const slideVariants = {
  enter: (dir: number) => ({ y: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (dir: number) => ({ y: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

export default function ShortFormSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (next: number) => {
    if (next < 0 || next >= VIDEOS.length) return;
    setDirection(next > current ? 1 : -1);
    setCurrent(next);
  };

  const handleDragEnd = (_: unknown, info: { offset: { y: number }; velocity: { y: number } }) => {
    const swipe = info.offset.y;
    const velocity = info.velocity.y;
    if (swipe < -40 || velocity < -300) goTo(current + 1);
    else if (swipe > 40 || velocity > 300) goTo(current - 1);
  };

  const video = VIDEOS[current];

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-4 flex items-center gap-4">
          <span className="h-px w-12 bg-blue-500/50" />
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-400">
            Short Form
          </span>
        </div>
        <div className="mb-16 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-4xl font-black text-white md:text-5xl">
            Reels &amp; Stories
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-white/35">
            Swipe up &amp; down to explore. Scroll-stopping content for social.
          </p>
        </div>

        {/* Phone + nav */}
        <div className="flex flex-col items-center gap-8">
          {/* Glow behind phone */}
          <div className="relative flex items-center justify-center">
            <motion.div
              key={current}
              animate={{ background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${video.glowColor}, transparent 70%)` }}
              transition={{ duration: 0.6 }}
              className="pointer-events-none absolute inset-0 scale-150"
            />

            {/* Phone shell */}
            <div
              className="relative overflow-hidden"
              style={{
                width: 270,
                height: 584,
                borderRadius: 52,
                background: "#1a1a1c",
                boxShadow:
                  "0 0 0 1.5px rgba(255,255,255,0.12), 0 60px 120px rgba(0,0,0,0.7)",
              }}
            >
              {/* Physical buttons */}
              <div className="absolute -left-[3.5px] top-28 h-8 w-[3.5px] rounded-l-full bg-zinc-600" />
              <div className="absolute -left-[3.5px] top-40 h-12 w-[3.5px] rounded-l-full bg-zinc-600" />
              <div className="absolute -left-[3.5px] top-56 h-12 w-[3.5px] rounded-l-full bg-zinc-600" />
              <div className="absolute -right-[3.5px] top-36 h-16 w-[3.5px] rounded-r-full bg-zinc-600" />

              {/* Dynamic island */}
              <div
                className="absolute z-30 left-1/2 -translate-x-1/2"
                style={{ top: 14, width: 96, height: 30, borderRadius: 22, background: "#000" }}
              />

              {/* Status bar */}
              <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-8 pt-4 text-white">
                <span className="text-[11px] font-bold">9:41</span>
                <div className="flex items-center gap-1.5 text-white">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[11px] w-[11px]">
                    <path d="M1.5 8.5C5 5 8.5 3 12 3s7 2 10.5 5.5L21 11c-2.5-2.5-5.5-4-9-4s-6.5 1.5-9 4L1.5 8.5zm4 4C7.5 10.5 9.5 9 12 9s4.5 1.5 6.5 3.5L17 14c-1.5-1.5-3-2-5-2s-3.5.5-5 2L5.5 12.5zm4.5 4c.5-.5 1.5-1 2-1s1.5.5 2 1L12 18l-2-1.5z" />
                  </svg>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[11px] w-[14px]">
                    <rect x="1" y="6" width="16" height="12" rx="2" opacity="0.35" />
                    <rect x="2" y="7" width="11" height="10" rx="1.5" />
                    <path d="M23 10v4a2 2 0 000-4z" />
                  </svg>
                </div>
              </div>

              {/* Swipeable content — clipped to screen */}
              <div className="absolute inset-0 overflow-hidden rounded-[52px]">
                <AnimatePresence custom={direction} mode="popLayout">
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 300, damping: 34, mass: 0.8 }}
                    drag="y"
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={0.12}
                    onDragEnd={handleDragEnd}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                  >
                    {/* Video bg */}
                    <div className={`absolute inset-0 bg-gradient-to-b ${video.gradient}`} />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(ellipse 90% 55% at 50% 20%, rgba(255,255,255,0.07) 0%, transparent 65%)",
                      }}
                    />

                    {/* Right actions */}
                    <div className="absolute bottom-28 right-3 z-10 flex flex-col items-center gap-5">
                      {[
                        {
                          label: video.likes,
                          icon: (
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-[22px] w-[22px]">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                          ),
                        },
                        {
                          label: video.comments,
                          icon: (
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-[20px] w-[20px]">
                              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                            </svg>
                          ),
                        },
                        {
                          label: video.shares,
                          icon: (
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-[20px] w-[20px]">
                              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
                            </svg>
                          ),
                        },
                      ].map(({ label, icon }) => (
                        <div key={label} className="flex flex-col items-center gap-[3px]">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm">
                            {icon}
                          </div>
                          <span className="text-[10px] font-semibold text-white/80">{label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pb-10 pt-20 px-4">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full border border-white/30 bg-white/20 backdrop-blur-sm" />
                        <span className="text-[13px] font-bold text-white">{video.username}</span>
                        <span
                          className="ml-auto rounded-full px-2 py-0.5 text-[9px] font-bold"
                          style={{
                            background: video.platformColor + "28",
                            color: video.platformColor,
                            border: `1px solid ${video.platformColor}40`,
                          }}
                        >
                          {video.platform}
                        </span>
                      </div>
                      <p className="mb-2 pr-14 text-[11px] leading-relaxed text-white/80">
                        {video.caption}
                      </p>
                      <div className="flex items-center gap-1.5 text-white/45">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 animate-spin" style={{ animationDuration: "3s" }}>
                          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                        </svg>
                        <span className="text-[10px]">Original Sound · {video.username}</span>
                      </div>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute left-4 top-16 rounded-md bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur-sm">
                      {video.duration}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Home indicator (always on top) */}
              <div className="absolute bottom-[10px] left-1/2 z-30 -translate-x-1/2 h-[4px] w-28 rounded-full bg-white/25" />

              {/* Progress dots — right edge */}
              <div className="absolute right-2.5 top-1/2 z-30 -translate-y-1/2 flex flex-col gap-1.5">
                {VIDEOS.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: i === current ? 20 : 4, opacity: i === current ? 1 : 0.3 }}
                    transition={{ duration: 0.3 }}
                    className="w-1 rounded-full bg-white"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Up / Down controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => goTo(current - 1)}
              disabled={current === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              {VIDEOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-blue-500" : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => goTo(current + 1)}
              disabled={current === VIDEOS.length - 1}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
