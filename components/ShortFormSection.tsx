"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

import { Iphone } from "@/components/ui/iphone";

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

  const handleDragEnd = (
    _: unknown,
    info: { offset: { y: number }; velocity: { y: number } }
  ) => {
    if (info.offset.y < -40 || info.velocity.y < -300) goTo(current + 1);
    else if (info.offset.y > 40 || info.velocity.y > 300) goTo(current - 1);
  };

  const video = VIDEOS[current];

  return (
    <section className="overflow-hidden px-4 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
          className="mb-4 flex items-center gap-4"
        >
          <span className="h-px w-12 bg-blue-500/50" />
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-400">
            Short Form
          </span>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="mb-16 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
        >
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
            className="text-4xl font-black text-foreground md:text-5xl"
          >
            Reels &amp; Stories
          </motion.h2>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
            className="max-w-xs text-sm leading-relaxed text-foreground/50"
          >
            Swipe up &amp; down to explore scroll-stopping content.
          </motion.p>
        </motion.div>

        {/* Phone + controls */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="flex flex-col items-center gap-8"
        >
          <div className="relative flex items-center justify-center">
            {/* Ambient glow */}
            <motion.div
              key={current}
              animate={{
                background: `radial-gradient(ellipse 60% 55% at 50% 50%, ${video.glowColor}, transparent 70%)`,
              }}
              transition={{ duration: 0.6 }}
              className="pointer-events-none absolute inset-0 scale-150"
            />

            {/* iPhone frame */}
            <div className="w-[270px]">
            <Iphone className="drop-shadow-2xl">
              <div className="relative h-full w-full overflow-hidden bg-black">
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
                    {/* Gradient bg */}
                    <div className={`absolute inset-0 bg-gradient-to-b ${video.gradient}`} />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(ellipse 90% 55% at 50% 20%, rgba(255,255,255,0.07) 0%, transparent 65%)",
                      }}
                    />

                    {/* Right action buttons */}
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
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pb-8 pt-16 px-4">
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
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-3 w-3 animate-spin"
                          style={{ animationDuration: "3s" }}
                        >
                          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                        </svg>
                        <span className="text-[10px]">Original Sound · {video.username}</span>
                      </div>
                    </div>

                    {/* Duration + progress dots */}
                    <div className="absolute left-4 top-14 rounded-md bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur-sm">
                      {video.duration}
                    </div>
                    <div className="absolute right-2.5 top-1/2 z-10 -translate-y-1/2 flex flex-col gap-1.5">
                      {VIDEOS.map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ height: i === current ? 20 : 4, opacity: i === current ? 1 : 0.3 }}
                          transition={{ duration: 0.3 }}
                          className="w-1 rounded-full bg-white"
                        />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Iphone>
            </div>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => goTo(current - 1)}
              disabled={current === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 text-foreground/40 transition-all hover:border-foreground/20 hover:bg-foreground/10 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-20"
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
                    i === current ? "w-6 bg-blue-500" : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => goTo(current + 1)}
              disabled={current === VIDEOS.length - 1}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 text-foreground/40 transition-all hover:border-foreground/20 hover:bg-foreground/10 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-20"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
