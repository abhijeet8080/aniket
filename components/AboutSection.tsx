"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 3, suffix: "+", label: "Years of Experience" },
  { value: 100, suffix: "+", label: "Projects Completed" },
  { value: 10, suffix: "+", label: "Clients Worked With" },
];

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

function StatCard({ value, suffix, label, active }: (typeof STATS)[number] & { active: boolean }) {
  const count = useCountUp(value, 1600, active);
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-white/8 bg-white/3 px-8 py-10 backdrop-blur-sm">
      <span className="mb-3 font-mono text-5xl font-bold text-blue-400 md:text-6xl">
        {count}{suffix}
      </span>
      <span className="text-sm font-medium text-white/45">{label}</span>
    </div>
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
      <div className="mb-6 flex items-center justify-center gap-4">
        <span className="h-px w-12 bg-blue-500/50" />
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-400">
          About Me
        </span>
        <span className="h-px w-12 bg-blue-500/50" />
      </div>

      {/* Heading */}
      <h2 className="mb-8 text-center text-4xl font-black text-white md:text-5xl">
        The person behind the pixels
      </h2>

      {/* Bio */}
      <p className="mx-auto mb-20 max-w-2xl text-center text-[16px] leading-[1.85] text-white/45">
        I&apos;m Aniket Patil — a video editor based in Pune. I blend sharp
        storytelling instincts with tools like Premiere Pro, After Effects, and
        DaVinci Resolve to craft visuals that stop the scroll. From brand films
        to cinematic reels, I help creators and companies tell stories that
        leave a lasting impression.
      </p>

      {/* Stats */}
      <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row">
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} active={visible} />
        ))}
      </div>
    </section>
  );
}
