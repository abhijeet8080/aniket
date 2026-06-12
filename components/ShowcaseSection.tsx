"use client";

import { motion, useInView } from "framer-motion";
import { Bebas_Neue } from "next/font/google";
import { useRef, useState } from "react";

const displayFont = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const ease = [0.22, 1, 0.36, 1] as const;

/* ─── Data ────────────────────────────────────────────────────────── */
const SHORT_FORM = [
  { title: "Fitness Brand Reel",  views: "2.3M", retention: "78%", platform: "Instagram Reel",  tags: ["Retention Editing", "Motion Graphics"], featured: true },
  { title: "Fashion Edit",        views: "1.1M", retention: "72%", platform: "TikTok",           tags: ["Short Form", "Color Grade"] },
  { title: "Brand Film",          views: "890K", retention: "68%", platform: "Instagram Reel",  tags: ["Brand Story", "Motion"] },
  { title: "Lifestyle Vlog",      views: "540K", retention: "65%", platform: "YouTube Shorts",  tags: ["Vlog Edit", "Music Sync"] },
  { title: "Product Launch",      views: "1.8M", retention: "81%", platform: "Instagram Reel",  tags: ["Commercial", "Retention"] },
];

const LONG_FORM = [
  { title: "Podcast Episode",    duration: "45 min", platform: "YouTube",    views: "1.4M", type: "Podcast Edit",   tags: ["Podcast", "Audio Design"] },
  { title: "Documentary Edit",   duration: "18 min", platform: "YouTube",    views: "780K", type: "Documentary",    tags: ["Cinematic", "Colour Grade"] },
  { title: "Brand Story",        duration: "12 min", platform: "Commercial", views: "2.1M", type: "Commercial",     tags: ["Brand Film", "Motion"] },
  { title: "Event Recap Film",   duration: "8 min",  platform: "YouTube",    views: "320K", type: "Event Film",     tags: ["Event", "Highlights"] },
];

/* ─── Drag carousel ───────────────────────────────────────────────── */
function DragCarousel({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref      = useRef<HTMLDivElement>(null);
  const startX   = useRef(0);
  const dragging = useRef(false);
  const moved    = useRef(false);

  return (
    <div
      ref={ref}
      className={`flex select-none overflow-x-auto ${className ?? ""}`}
      style={
        {
          cursor: "grab",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        } as React.CSSProperties
      }
      onMouseDown={(e) => {
        dragging.current = true;
        moved.current    = false;
        startX.current   = e.clientX + (ref.current?.scrollLeft ?? 0);
        ref.current && (ref.current.style.cursor = "grabbing");
      }}
      onMouseMove={(e) => {
        if (!dragging.current || !ref.current) return;
        moved.current = true;
        ref.current.scrollLeft = startX.current - e.clientX;
      }}
      onMouseUp={() => {
        dragging.current = false;
        if (ref.current) ref.current.style.cursor = "grab";
      }}
      onMouseLeave={() => {
        dragging.current = false;
        if (ref.current) ref.current.style.cursor = "grab";
      }}
    >
      {children}
    </div>
  );
}

/* ─── Short form card ─────────────────────────────────────────────── */
function ShortCard({
  item, index, featured, hoveredIndex, setHoveredIndex,
}: {
  item: typeof SHORT_FORM[number];
  index: number;
  featured?: boolean;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isHovered  = hoveredIndex === index;
  const isDimmed   = hoveredIndex !== null && !isHovered;

  const onEnter = () => {
    setHoveredIndex(index);
    videoRef.current?.play();
  };
  const onLeave = () => {
    setHoveredIndex(null);
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease, delay: index * 0.07 }}
      className="relative shrink-0 overflow-hidden"
      style={{
        width:   featured ? 280 : 220,
        height:  featured ? 500 : 390,
        opacity: isDimmed ? 0.35 : 1,
        transition: "opacity 0.3s ease, transform 0.35s ease, box-shadow 0.35s ease",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
        boxShadow: isHovered ? "0 0 40px 4px rgba(250,204,21,0.18)" : "none",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Thumbnail / video */}
      <video
        ref={videoRef}
        src="/assets/videos/hero.mp4"
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        style={{ transition: "transform 0.4s ease", transform: isHovered ? "scale(1.08)" : "scale(1)" }}
      />

      {/* Base overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: isHovered
            ? "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 100%)",
          transition: "background 0.3s ease",
        }}
      />

      {/* Featured badge */}
      {featured && (
        <div className="absolute left-3 top-3">
          <span
            className="font-mono text-[8px] tracking-[0.2em] uppercase px-2 py-1"
            style={{ background: "#FACC15", color: "#000" }}
          >
            Featured
          </span>
        </div>
      )}

      {/* Hover: amber corner accents */}
      {isHovered && (
        <>
          <div className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-l border-t border-amber-400/70" />
          <div className="pointer-events-none absolute right-0 top-0 h-6 w-6 border-r border-t border-amber-400/70" />
        </>
      )}

      {/* Bottom info */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        {/* Tags — slide up on hover */}
        <div
          className="mb-3 flex flex-wrap gap-1.5"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.25s ease, transform 0.25s ease",
          }}
        >
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[7px] tracking-[0.15em] uppercase px-2 py-1"
              style={{ border: "1px solid rgba(250,204,21,0.4)", color: "rgba(250,204,21,0.75)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/35 mb-1">
          {item.platform}
        </p>
        <h3
          className={`${displayFont.className} leading-none text-white tracking-[0.02em] uppercase`}
          style={{ fontSize: featured ? "1.6rem" : "1.3rem" }}
        >
          {item.title}
        </h3>

        {/* Stats — slide up on hover */}
        <div
          className="mt-2 flex items-center gap-3"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s",
          }}
        >
          <span className="font-mono text-[9px] text-white/55">{item.views} Views</span>
          <span className="h-px w-3 bg-white/20" />
          <span className="font-mono text-[9px]" style={{ color: "#FACC15" }}>{item.retention} Retention</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Long form card ──────────────────────────────────────────────── */
function LongCard({
  item, index, hoveredIndex, setHoveredIndex,
}: {
  item: typeof LONG_FORM[number];
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
}) {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const isHovered = hoveredIndex === index;
  const isDimmed  = hoveredIndex !== null && !isHovered;

  const onEnter = () => {
    setHoveredIndex(index);
    videoRef.current?.play();
  };
  const onLeave = () => {
    setHoveredIndex(null);
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease, delay: index * 0.07 }}
      className="relative shrink-0 overflow-hidden"
      style={{
        width:   480,
        height:  270,
        opacity: isDimmed ? 0.35 : 1,
        transition: "opacity 0.3s ease, transform 0.35s ease, box-shadow 0.35s ease",
        transform: isHovered ? "scale(1.04)" : "scale(1)",
        boxShadow: isHovered ? "0 0 40px 4px rgba(250,204,21,0.15)" : "none",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <video
        ref={videoRef}
        src="/assets/videos/hero.mp4"
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        style={{ transition: "transform 0.4s ease", transform: isHovered ? "scale(1.06)" : "scale(1)" }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: isHovered
            ? "linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.05) 100%)"
            : "linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0) 100%)",
          transition: "background 0.3s ease",
        }}
      />

      {/* Amber corner accents on hover */}
      {isHovered && (
        <>
          <div className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-l border-t border-amber-400/60" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b border-r border-amber-400/60" />
        </>
      )}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        {/* Tags */}
        <div
          className="mb-3 flex flex-wrap gap-1.5"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.25s ease, transform 0.25s ease",
          }}
        >
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[7px] tracking-[0.15em] uppercase px-2 py-1"
              style={{ border: "1px solid rgba(250,204,21,0.4)", color: "rgba(250,204,21,0.7)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/30 mb-1">
              {item.type}
            </p>
            <h3
              className={`${displayFont.className} text-white leading-none tracking-[0.02em] uppercase`}
              style={{ fontSize: "1.55rem" }}
            >
              {item.title}
            </h3>
          </div>

          {/* Meta — appears on hover */}
          <div
            className="text-right"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "translateX(0)" : "translateX(8px)",
              transition: "opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s",
            }}
          >
            <p className="font-mono text-[9px] text-white/50">{item.duration}</p>
            <p className="font-mono text-[9px]" style={{ color: "#FACC15" }}>{item.views} Views</p>
            <p className="font-mono text-[8px] text-white/30">{item.platform}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Lane ────────────────────────────────────────────────────────── */
function Lane({
  label, children, delay,
}: {
  label: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative">
      {/* Watermark label */}
      <div className="pointer-events-none absolute inset-0 flex items-center overflow-hidden">
        <span
          className={`${displayFont.className} whitespace-nowrap text-white`}
          style={{ fontSize: "clamp(5rem, 12vw, 9rem)", opacity: 0.04, letterSpacing: "0.04em" }}
        >
          {label}
        </span>
      </div>

      {/* Visible label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease, delay: delay ?? 0 }}
        className="mb-6 flex items-center gap-4"
      >
        <span className="h-px w-6 bg-amber-400/50" />
        <span
          className="font-mono text-[9px] uppercase tracking-[0.3em]"
          style={{ color: "#FACC15" }}
        >
          {label}
        </span>
      </motion.div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, x: -32 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.75, ease, delay: (delay ?? 0) + 0.1 }}
      >
        <DragCarousel className="gap-4 pb-4 pr-12">
          {/* Left padding sentinel */}
          <div className="shrink-0 w-0" />
          {children}
          <div className="shrink-0 w-8" />
        </DragCarousel>
      </motion.div>
    </div>
  );
}

/* ─── Section ─────────────────────────────────────────────────────── */
export default function ShowcaseSection() {
  const [shortHover, setShortHover] = useState<number | null>(null);
  const [longHover,  setLongHover]  = useState<number | null>(null);

  return (
    <section
      id="showcase"
      className="relative py-24 lg:py-32"
      style={{ background: "#0e0e0e" }}
    >
      {/* Subtle grain */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.028]"
        aria-hidden="true"
      >
        <defs>
          <filter id="showcase-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#showcase-grain)" />
      </svg>

      {/* Top / bottom border accents */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="relative z-10">
        {/* ── Header ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="mb-16 px-6 lg:px-12"
        >
          <div className="mx-auto max-w-7xl">
            <p
              className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em]"
              style={{ color: "#FACC15" }}
            >
              Selected Projects
            </p>
            <h2
              className={`${displayFont.className} text-white leading-[0.88] tracking-[0.02em] uppercase`}
              style={{ fontSize: "clamp(3.5rem, 10vw, 7.5rem)" }}
            >
              Every Format<br />
              <span className="text-white/12 [-webkit-text-stroke:1px_rgba(255,255,255,0.25)]">
                Tells a Story
              </span>
            </h2>
            <p className="mt-6 max-w-[440px] text-[14px] leading-relaxed text-white/35">
              From high-retention short-form content to cinematic long-form
              storytelling — every project is crafted with intent.
            </p>
          </div>
        </motion.div>

        {/* ── Short Form lane ─────────────────────────────────────── */}
        <div className="mb-16 pl-6 lg:pl-12">
          <Lane label="Short Form" delay={0}>
            {SHORT_FORM.map((item, i) => (
              <ShortCard
                key={item.title}
                item={item}
                index={i}
                featured={item.featured}
                hoveredIndex={shortHover}
                setHoveredIndex={setShortHover}
              />
            ))}
          </Lane>
        </div>

        {/* ── Long Form lane ──────────────────────────────────────── */}
        <div className="pl-6 lg:pl-12">
          <Lane label="Long Form" delay={0.1}>
            {LONG_FORM.map((item, i) => (
              <LongCard
                key={item.title}
                item={item}
                index={i}
                hoveredIndex={longHover}
                setHoveredIndex={setLongHover}
              />
            ))}
          </Lane>
        </div>
      </div>
    </section>
  );
}
