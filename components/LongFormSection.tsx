"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

import { Safari } from "@/components/ui/safari";

const VIDEOS = [
  {
    id: 0,
    youtubeId: "_sXTdPVHN_8",
    glowColor: "rgba(59,130,246,0.18)",
  },
  {
    id: 1,
    youtubeId: "clZ-R9BRIK4",
    glowColor: "rgba(251,146,60,0.18)",
  },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

export default function LongFormSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (next: number) => {
    if (next < 0 || next >= VIDEOS.length) return;
    setDirection(next > current ? 1 : -1);
    setCurrent(next);
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
            Long Form
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
            Films &amp; Commercials
          </motion.h2>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
            className="max-w-xs text-sm leading-relaxed text-foreground/50"
          >
            Swipe left &amp; right to explore cinematic long-form work.
          </motion.p>
        </motion.div>

        {/* Safari browser + controls */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="flex flex-col items-center gap-8"
        >
          <div className="relative w-full max-w-4xl">
            {/* Ambient glow */}
            <motion.div
              key={current}
              animate={{
                background: `radial-gradient(ellipse 70% 60% at 50% 55%, ${video.glowColor}, transparent 70%)`,
              }}
              transition={{ duration: 0.7 }}
              className="pointer-events-none absolute inset-0 scale-[1.15]"
            />

            <Safari url="youtube.com/watch" className="w-full drop-shadow-2xl">
              <div className="relative h-full w-full overflow-hidden bg-black">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 300, damping: 34, mass: 0.9 }}
                    className="absolute inset-0"
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </Safari>
          </div>

          {/* Dot navigation */}
          <div className="flex items-center gap-2">
            {VIDEOS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 bg-blue-500"
                    : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
