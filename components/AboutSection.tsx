"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 3, suffix: "+", label: "Years of Experience" },
  { value: 100, suffix: "+", label: "Projects Completed" },
  { value: 10, suffix: "+", label: "Clients Worked With" },
];

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

function useCountUp(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

function StatCard({
  value,
  suffix,
  label,
  active,
  index,
}: (typeof STATS)[number] & { active: boolean; index: number }) {
  const count = useCountUp(value, 1600, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease, delay: index * 0.1 }}
      className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-foreground/8 bg-foreground/3 px-8 py-10 backdrop-blur-sm"
    >
      <span className="mb-3 font-mono text-5xl font-bold text-blue-400 md:text-6xl">
        {count}{suffix}
      </span>
      <span className="text-sm font-medium text-foreground/45">{label}</span>
    </motion.div>
  );
}

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative px-4 py-28">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="mb-6 flex items-center justify-center gap-4"
      >
        <span className="h-px w-12 bg-blue-500/50" />
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-400">
          About Me
        </span>
        <span className="h-px w-12 bg-blue-500/50" />
      </motion.div>

      {/* Heading */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-8 text-center text-4xl font-black text-foreground md:text-5xl"
      >
        The person behind the pixels
      </motion.h2>

      {/* Bio */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease, delay: 0.1 }}
        className="mx-auto mb-20 max-w-2xl text-center text-[16px] leading-[1.85] text-foreground/55"
      >
        I&apos;m Aniket Patil — a video editor based in Bangalore. I blend sharp
        storytelling instincts with tools like Premiere Pro, After Effects, and
        DaVinci Resolve to craft visuals that stop the scroll. From brand films
        to cinematic reels, I help creators and companies tell stories that
        leave a lasting impression.
      </motion.p>

      {/* Stats */}
      <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row">
        {STATS.map((s, i) => (
          <StatCard key={s.label} {...s} active={visible} index={i} />
        ))}
      </div>
    </section>
  );
}
