"use client";

import { useEffect, useRef } from "react";

const TAGS = ["Premiere Pro", "After Effects", "DaVinci Resolve", "Final Cut Pro", "Cinema 4D", "Motion"];

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.1 + 0.2,
      opacity: Math.random() * 0.6 + 0.1,
      speed: Math.random() * 0.15 + 0.05,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.fill();
        s.y -= s.speed;
        if (s.y + s.r < 0) {
          s.y = canvas.height + s.r;
          s.x = Math.random() * canvas.width;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-4 text-center overflow-hidden">
      {/* Canvas starfield */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      {/* Blue radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 42%, rgba(59,130,246,0.11) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Available badge */}
        <div className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[11px] font-semibold tracking-widest uppercase text-white/50 backdrop-blur-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
          </span>
          Available for Work
        </div>

        {/* Hero name */}
        <h1
          className="mb-6 font-black leading-[0.88] tracking-tight"
          style={{ fontSize: "clamp(3.8rem, 13vw, 8.5rem)" }}
        >
          <span className="text-white">Aniket </span>
          <span style={{ color: "#3B82F6" }}>Patil</span>
        </h1>

        {/* Subtitle */}
        <p className="mb-10 max-w-[480px] text-[15px] leading-relaxed text-white/40">
          Video editor crafting compelling visual stories
          <br className="hidden sm:block" />
          that captivate audiences and elevate brands.
        </p>

        {/* CTAs */}
        <div className="mb-16 flex flex-wrap items-center justify-center gap-3">
          <button className="group flex items-center gap-2 rounded-full bg-blue-500 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-400 hover:shadow-[0_0_24px_rgba(59,130,246,0.4)]">
            View Portfolio
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </button>
          <button className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white/70 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:text-white">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Contact for Work
          </button>
        </div>

        {/* Tech tags */}
        <div className="flex max-w-lg flex-wrap justify-center gap-2">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-medium tracking-wide text-white/35"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
