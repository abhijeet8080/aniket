"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bebas_Neue } from "next/font/google";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const displayFont = Bebas_Neue({ weight: "400", subsets: ["latin"] });

/* ─── Data ────────────────────────────────────────────────────────── */
const MILESTONES = [
  { year: "2018", title: "First Cut",      desc: "Picked up Premiere Pro" },
  { year: "2020", title: "First Campaign", desc: "Brand clients, real stakes" },
  { year: "2022", title: "1M+ Views",      desc: "Retention editing clicks" },
  { year: "2024", title: "Global Reach",   desc: "International creator work" },
  { year: "2026", title: "100M+ Views",    desc: "Combined milestone" },
];

const STATS = [
  { value: 100, suffix: "M+", label: "Frames Viewed\nBy Audiences" },
  { value: 150, suffix: "+",  label: "Stories\nEdited" },
  { value: 5,   suffix: "+",  label: "Years Obsessing\nOver Details" },
  { value: 30,  suffix: "+",  label: "Creators &\nBrands Served" },
];

const SKILLS: { text: string; size: string; x: string; y: string }[] = [
  { text: "Storytelling",      size: "5.5vw", x: "5%",  y: "14%" },
  { text: "Retention Editing", size: "4vw",   x: "46%", y: "7%"  },
  { text: "Motion Design",     size: "4.6vw", x: "60%", y: "53%" },
  { text: "Color Grading",     size: "3.8vw", x: "7%",  y: "62%" },
  { text: "Sound Design",      size: "3.4vw", x: "30%", y: "80%" },
];

/* ─── Grain ───────────────────────────────────────────────────────── */
function Grain({ id, opacity = 0.04 }: { id: string; opacity?: number }) {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden style={{ opacity }}>
      <defs>
        <filter id={id}>
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  );
}

/* ─── Section ─────────────────────────────────────────────────────── */
export default function AboutMeSection() {
  const sectionRef      = useRef<HTMLElement>(null);
  const portraitCardRef = useRef<HTMLDivElement>(null);
  const portraitGlareRef = useRef<HTMLDivElement>(null);

  const handleTiltMove = (e: React.MouseEvent) => {
    const el = portraitCardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x =  (e.clientX - left) / width;
    const y =  (e.clientY - top)  / height;
    const rotY =  (x - 0.5) * 2 * 10;
    const rotX = -(y - 0.5) * 2 * 10;
    el.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    if (portraitGlareRef.current) {
      portraitGlareRef.current.style.background =
        `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.07) 0%, transparent 60%)`;
    }
  };

  const handleTiltEnter = () => {
    if (portraitCardRef.current)
      portraitCardRef.current.style.transition = "transform 0.08s ease";
  };

  const handleTiltLeave = () => {
    const el = portraitCardRef.current;
    if (el) {
      el.style.transition = "transform 0.65s cubic-bezier(0.23,1,0.32,1)";
      el.style.transform  = "rotateX(0deg) rotateY(0deg)";
    }
    if (portraitGlareRef.current)
      portraitGlareRef.current.style.background = "transparent";
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      /* ══════════════════════════════════════════════
         BLOCK 1 — OPENING POSTER
      ══════════════════════════════════════════════ */

      // Initial states
      gsap.set(".watermark-word", { autoAlpha: 0, scale: 1.1 });
      gsap.set(".about-label",    { autoAlpha: 0, y: 12 });
      gsap.set(".headline-clip-inner", { y: "112%" });
      gsap.set(".about-divider",  { scaleX: 0, autoAlpha: 0 });
      gsap.set(".scroll-hint",    { autoAlpha: 0 });

      const posterTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-poster",
          start: "top 70%",
          once: true,
        },
      });

      posterTl
        .to(".watermark-word",       { autoAlpha: 1, scale: 1, duration: 2.2, ease: "power2.out" }, 0)
        .to(".about-label",          { autoAlpha: 1, y: 0,     duration: 0.9, ease: "power3.out" }, 0.35)
        .to(".headline-clip-inner",  { y: "0%",  stagger: 0.18, duration: 1.5, ease: "expo.out"  }, 0.55)
        .to(".about-divider",        { scaleX: 1, autoAlpha: 1, duration: 1.5, ease: "expo.out", transformOrigin: "center" }, 1.1)
        .to(".scroll-hint",          { autoAlpha: 1, duration: 0.7, ease: "power2.out" }, 1.5);

      // Bobbing scroll line
      gsap.to(".scroll-line", {
        y: 9,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.2,
      });

      // Cursor-parallax on watermark
      const poster    = document.querySelector(".about-poster") as HTMLElement | null;
      const watermark = document.querySelector(".watermark-word") as HTMLElement | null;
      if (poster && watermark) {
        poster.addEventListener("mousemove", (e: MouseEvent) => {
          const r = poster.getBoundingClientRect();
          const nx = (e.clientX - r.left - r.width  / 2) / r.width;
          const ny = (e.clientY - r.top  - r.height / 2) / r.height;
          gsap.to(watermark, { x: nx * -40, y: ny * -22, duration: 1.4, ease: "power2.out", overwrite: "auto" });
        });
        poster.addEventListener("mouseleave", () => {
          gsap.to(watermark, { x: 0, y: 0, duration: 1.8, ease: "power3.out", overwrite: "auto" });
        });
      }

      /* ══════════════════════════════════════════════
         BLOCK 2 — SPLIT SCREEN: PORTRAIT + NARRATIVE
      ══════════════════════════════════════════════ */

      gsap.set(".portrait-frame", { autoAlpha: 0, x: -55 });
      gsap.set(".narrative-line",  { autoAlpha: 0, x: 32 });

      // Portrait entrance
      gsap.to(".portrait-frame", {
        autoAlpha: 1,
        x: 0,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-split",
          start: "top 60%",
          once: true,
        },
      });

      // Narrative lines — batch reveal with stagger
      ScrollTrigger.batch(".narrative-line", {
        onEnter: (els) =>
          gsap.to(els, {
            autoAlpha: 1,
            x: 0,
            stagger: 0.12,
            duration: 0.95,
            ease: "power3.out",
            overwrite: true,
          }),
        start: "top 82%",
        once: true,
      });

      /* ══════════════════════════════════════════════
         BLOCK 3 — NLE TIMELINE
      ══════════════════════════════════════════════ */

      gsap.set(".timeline-fill",     { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".timeline-playhead", { x: 0 });
      gsap.set(".nle-milestone",     { autoAlpha: 0, y: 18 });
      gsap.set(".nle-label",         { autoAlpha: 0, x: -14 });

      const timelineST = {
        trigger: ".about-timeline",
        start: "top 65%",
        end: "bottom 35%",
        scrub: 1.8,
      };

      gsap.to(".timeline-fill", { scaleX: 1, ease: "none", scrollTrigger: timelineST });

      gsap.to(".timeline-playhead", {
        x: () => {
          const t = document.querySelector(".timeline-track") as HTMLElement | null;
          return (t?.offsetWidth ?? 300) - 6;
        },
        ease: "none",
        scrollTrigger: { ...timelineST, invalidateOnRefresh: true },
      });

      // Label + milestones reveal
      gsap.to(".nle-label", {
        autoAlpha: 1, x: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".about-timeline", start: "top 72%", once: true },
      });

      ScrollTrigger.batch(".nle-milestone", {
        onEnter: (els) =>
          gsap.to(els, {
            autoAlpha: 1,
            y: 0,
            stagger: 0.11,
            duration: 0.75,
            ease: "power3.out",
            overwrite: true,
          }),
        start: "top 78%",
        once: true,
      });

      /* ══════════════════════════════════════════════
         BLOCK 4 — CINEMATIC STATS
      ══════════════════════════════════════════════ */

      gsap.set(".stat-label", { autoAlpha: 0, y: 10 });
      gsap.set(".stat-bar",   { scaleX: 0, transformOrigin: "left" });

      // Animated counters — each updates DOM directly
      STATS.forEach((stat, i) => {
        const numEl = document.querySelector(`[data-counter="${i}"]`);
        const obj   = { value: 0 };
        gsap.to(obj, {
          value: stat.value,
          duration: 2.4,
          ease: "power2.out",
          delay: i * 0.14,
          onUpdate() {
            if (numEl) numEl.textContent = String(Math.round(obj.value));
          },
          scrollTrigger: { trigger: ".about-stats", start: "top 70%", once: true },
        });
      });

      // Labels fade in after numbers
      gsap.to(".stat-label", {
        autoAlpha: 1, y: 0,
        stagger: 0.13,
        duration: 0.75,
        ease: "power3.out",
        delay: 0.85,
        scrollTrigger: { trigger: ".about-stats", start: "top 70%", once: true },
      });

      // Accent bars scale in
      gsap.to(".stat-bar", {
        scaleX: 1,
        stagger: 0.13,
        duration: 0.9,
        ease: "expo.out",
        delay: 1.1,
        scrollTrigger: { trigger: ".about-stats", start: "top 70%", once: true },
      });

      /* ══════════════════════════════════════════════
         BLOCK 5 — SIGNATURE MOMENT (PINNED + SCRUB)
      ══════════════════════════════════════════════ */

      gsap.set(".sig-glow",        { scale: 0.5, autoAlpha: 0 });
      gsap.set(".sig-ambient-ring",{ scale: 0.6, autoAlpha: 0 });
      gsap.set(".sig-line-1, .sig-line-2, .sig-line-3", { autoAlpha: 0, y: 55 });

      const sigTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-signature",
          start: "top top",
          end: "+=280%",
          pin: true,
          anticipatePin: 1,
          scrub: 1.8,
        },
      });

      sigTl
        .to(".sig-glow",         { scale: 1.5, autoAlpha: 1, duration: 2 }, 0)
        .to(".sig-ambient-ring", { scale: 2.5, autoAlpha: 1, duration: 3 }, 0.5)
        .to(".sig-line-1",       { autoAlpha: 1, y: 0, duration: 1.5 }, "+=0.6")
        .to(".sig-line-2",       { autoAlpha: 1, y: 0, duration: 1.5 }, "+=1.0")
        .to(".sig-line-3",       { autoAlpha: 1, y: 0, duration: 1.5 }, "+=1.6");

      // Ambient pulse — runs independently of scrub
      gsap.to(".sig-ambient-ring", {
        scale: 2.8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });

      /* ══════════════════════════════════════════════
         BLOCK 6 — FLOATING SKILLS
      ══════════════════════════════════════════════ */

      // Animate in: 0 → 0.12 opacity (resting dim state)
      gsap.fromTo(
        ".skill-word-inner",
        { autoAlpha: 0, y: 30 },
        {
          opacity: 0.12,
          visibility: "visible",
          y: 0,
          stagger: { each: 0.13, from: "random" },
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-skills", start: "top 70%", once: true },
        }
      );

      // Hover: individual GSAP tweens (no React state, zero re-renders)
      const skillEls = gsap.utils.toArray<HTMLElement>(".skill-word-inner");
      skillEls.forEach((el) => {
        el.addEventListener("mouseenter", () =>
          gsap.to(el, { opacity: 0.9, y: -7, duration: 0.35, ease: "power2.out", overwrite: true })
        );
        el.addEventListener("mouseleave", () =>
          gsap.to(el, { opacity: 0.12, y: 0, duration: 0.55, ease: "power2.inOut", overwrite: true })
        );
      });

      /* ══════════════════════════════════════════════
         BLOCK 7 — CLOSING STATEMENT
      ══════════════════════════════════════════════ */

      gsap.set(".closing-clip-inner", { y: "112%" });
      gsap.set(".closing-gold",       { scaleX: 0, autoAlpha: 0, transformOrigin: "left" });

      const closingTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-closing",
          start: "top 65%",
          once: true,
        },
      });

      closingTl
        .to(".closing-clip-inner", {
          y: "0%",
          stagger: 0.22,
          duration: 1.35,
          ease: "expo.out",
        })
        .to(".closing-gold", {
          scaleX: 1,
          autoAlpha: 1,
          duration: 1.7,
          ease: "expo.out",
        }, "-=0.4");

    }, sectionRef); // scope all selectors to sectionRef

    return () => ctx.revert();
  }, []);

  /* ─── JSX ─────────────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-x-hidden"
      style={{ background: "#050505" }}
    >

      {/* ══════════════════════════════════════════════════════════
          BLOCK 1 — OPENING POSTER
      ══════════════════════════════════════════════════════════ */}
      <div className="about-poster relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
        <Grain id="ag1" opacity={0.045} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/15 to-transparent" />

        {/* Cursor-parallax watermark */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none">
          <span
            className={`watermark-word ${displayFont.className} whitespace-nowrap text-white`}
            style={{ fontSize: "clamp(8rem, 22vw, 22rem)", opacity: 0, letterSpacing: "0.06em" }}
          >
            EDITOR
          </span>
        </div>

        <div className="relative z-10 text-center">
          <p className="about-label mb-7 font-mono text-[10px] uppercase tracking-[0.38em]"
            style={{ color: "#FACC15", opacity: 0 }}>
            The Editor
          </p>

          {/* Clip-reveal headlines */}
          <div className="overflow-hidden">
            <h2 className={`headline-clip-inner ${displayFont.className} block text-white leading-[0.84] tracking-[0.02em] uppercase`}
              style={{ fontSize: "clamp(4.5rem, 14vw, 13rem)" }}>
              Behind
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2
              className={`headline-clip-inner ${displayFont.className} block leading-[0.84] tracking-[0.02em] uppercase`}
              style={{
                fontSize: "clamp(4.5rem, 14vw, 13rem)",
                WebkitTextStroke: "1px rgba(255,255,255,0.22)",
                color: "transparent",
              }}
            >
              The Story
            </h2>
          </div>

          {/* Amber divider */}
          <div
            className="about-divider mx-auto mt-10 h-px origin-center"
            style={{
              width: "clamp(120px, 28vw, 260px)",
              background: "linear-gradient(90deg, transparent, rgba(250,204,21,0.55), transparent)",
              opacity: 0,
            }}
          />

          {/* Scroll indicator */}
          <div className="scroll-hint mt-14 flex flex-col items-center gap-2" style={{ opacity: 0 }}>
            <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/20">Scroll</span>
            <div className="scroll-line h-7 w-px bg-gradient-to-b from-white/25 to-transparent" />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          BLOCK 2 — SPLIT SCREEN
      ══════════════════════════════════════════════════════════ */}
      <div className="about-split relative" style={{ background: "#060606" }}>
        <Grain id="ag2" opacity={0.036} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-16 px-6 py-24 lg:flex-row lg:gap-0 lg:px-0 lg:py-0">

          {/* Portrait */}
          <div className="relative flex w-full shrink-0 items-center justify-center lg:w-1/2 lg:min-h-screen">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none">
              <span
                className={`${displayFont.className} whitespace-nowrap text-white`}
                style={{ fontSize: "clamp(5rem, 16vw, 14rem)", opacity: 0.026, rotate: "-6deg", letterSpacing: "0.04em" }}
              >
                ANIKET PATIL
              </span>
            </div>

            <div
              className="portrait-frame relative"
              style={{ width: "clamp(200px, 30vw, 360px)", opacity: 0, perspective: "900px" }}
            >
              {/* Film perforations — left */}
              <div className="absolute -left-6 top-0 bottom-0 flex flex-col justify-between py-2">
                {Array.from({ length: 11 }).map((_, i) => (
                  <div key={i} className="h-3 w-4 rounded-[2px] border border-white/8 bg-black/50" />
                ))}
              </div>

              {/* Tilt target */}
              <div
                ref={portraitCardRef}
                className="relative overflow-hidden"
                style={{
                  aspectRatio: "2/3",
                  border: "1px solid rgba(255,255,255,0.07)",
                  willChange: "transform",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.7)",
                }}
                onMouseMove={handleTiltMove}
                onMouseEnter={handleTiltEnter}
                onMouseLeave={handleTiltLeave}
              >
                {/* Cinematic placeholder — dark gradient */}
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(160deg, #0e0b04 0%, #110e05 35%, #0a0905 65%, #060606 100%)" }}
                />

                {/* Amber spotlight — bottom center */}
                <div className="absolute inset-0"
                  style={{ background: "radial-gradient(ellipse at 50% 85%, rgba(250,204,21,0.13) 0%, transparent 60%)" }}
                />

                {/* Ghost "AP" monogram */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className={`${displayFont.className} select-none`}
                    style={{
                      fontSize: "clamp(6rem, 18vw, 12rem)",
                      color: "transparent",
                      WebkitTextStroke: "1px rgba(250,204,21,0.09)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    AP
                  </span>
                </div>

                {/* Scan lines — film texture */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.09) 0px, rgba(0,0,0,0.09) 1px, transparent 1px, transparent 3px)",
                  }}
                />

                {/* Heavy grain */}
                <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]" aria-hidden>
                  <defs>
                    <filter id="pgrain">
                      <feTurbulence type="fractalNoise" baseFrequency="0.66" numOctaves="4" stitchTiles="stitch" />
                      <feColorMatrix type="saturate" values="0" />
                    </filter>
                  </defs>
                  <rect width="100%" height="100%" filter="url(#pgrain)" />
                </svg>

                {/* Vignette */}
                <div className="absolute inset-0"
                  style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.65) 100%)" }}
                />

                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-2/5"
                  style={{ background: "linear-gradient(to top, rgba(6,6,6,0.97) 0%, transparent 100%)" }}
                />

                {/* Amber corner brackets */}
                <div className="pointer-events-none absolute left-0 top-0 h-10 w-10 border-l-2 border-t-2 border-amber-400/45" />
                <div className="pointer-events-none absolute right-0 top-0 h-10 w-10 border-r-2 border-t-2 border-amber-400/45" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-10 w-10 border-b-2 border-l-2 border-amber-400/45" />
                <div className="pointer-events-none absolute bottom-0 right-0 h-10 w-10 border-b-2 border-r-2 border-amber-400/45" />

                {/* Name plate */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/25">Bangalore, India</p>
                  <p className={`${displayFont.className} text-[1.5rem] tracking-wide text-white leading-none mt-1`}>
                    Aniket Patil
                  </p>
                </div>

                {/* Glare layer */}
                <div
                  ref={portraitGlareRef}
                  className="pointer-events-none absolute inset-0"
                  style={{ mixBlendMode: "screen" }}
                />
              </div>

              {/* Film perforations — right */}
              <div className="absolute -right-6 top-0 bottom-0 flex flex-col justify-between py-2">
                {Array.from({ length: 11 }).map((_, i) => (
                  <div key={i} className="h-3 w-4 rounded-[2px] border border-white/8 bg-black/50" />
                ))}
              </div>
            </div>
          </div>

          {/* Narrative */}
          <div className="w-full max-w-[520px] lg:w-1/2 lg:max-w-none lg:pl-16 lg:pr-20">

            {/* Film slate accent */}
            <p
              className="narrative-line mb-8 font-mono text-[9px] uppercase tracking-[0.35em]"
              style={{ color: "#FACC15", opacity: 0 }}
            >
              ░░ Statement
            </p>

            {/* Opening — italic, warm white */}
            <p
              className="narrative-line mb-2 font-sans italic leading-relaxed"
              style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.48)", opacity: 0 }}
            >
              Most people see the final video.
            </p>
            <p
              className="narrative-line mb-10 font-sans italic leading-snug"
              style={{ fontSize: "clamp(1.15rem, 2.4vw, 1.4rem)", color: "rgba(255,255,255,0.75)", opacity: 0 }}
            >
              I see every frame{" "}
              <span style={{ color: "#FACC15", fontStyle: "normal", fontWeight: 600 }}>before it exists.</span>
            </p>

            {/* Amber rule */}
            <div
              className="narrative-line mb-10 flex items-center gap-3"
              style={{ opacity: 0 }}
            >
              <div style={{ height: "1px", width: "2.5rem", background: "rgba(250,204,21,0.45)" }} />
              <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(250,204,21,0.45)" }} />
            </div>

            {/* Bebas Neue impact triad — ascending opacity */}
            <div className="narrative-line mb-10" style={{ opacity: 0 }}>
              <p
                className={`${displayFont.className} block leading-[0.88] tracking-[0.04em]`}
                style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", color: "rgba(255,255,255,0.14)" }}
              >
                The Pauses.
              </p>
              <p
                className={`${displayFont.className} block leading-[0.88] tracking-[0.04em]`}
                style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", color: "rgba(255,255,255,0.38)" }}
              >
                The Rhythm.
              </p>
              <p
                className={`${displayFont.className} block leading-[0.88] tracking-[0.04em]`}
                style={{ fontSize: "clamp(2.8rem, 6.5vw, 5rem)", color: "rgba(255,255,255,0.92)" }}
              >
                The Story.
              </p>
            </div>

            {/* Thin amber line */}
            <div
              className="narrative-line mb-8"
              style={{ height: "1px", width: "3rem", background: "rgba(250,204,21,0.38)", opacity: 0 }}
            />

            {/* Closing lines — mono label + yellow climax */}
            <p
              className="narrative-line mb-3 font-mono uppercase"
              style={{ fontSize: "0.62rem", letterSpacing: "0.22em", color: "rgba(255,255,255,0.2)", opacity: 0 }}
            >
              Because great editing isn't about software.
            </p>
            <p
              className="narrative-line font-sans"
              style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", opacity: 0 }}
            >
              <span style={{ color: "rgba(255,255,255,0.42)" }}>It's about </span>
              <span style={{ color: "#FACC15", fontWeight: 700, letterSpacing: "0.03em" }}>attention.</span>
            </p>

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          BLOCK 3 — NLE TIMELINE
      ══════════════════════════════════════════════════════════ */}
      <div className="about-timeline relative px-6 py-20 lg:px-12 lg:py-28" style={{ background: "#070707" }}>
        <Grain id="ag3" opacity={0.032} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="relative z-10">
          {/* Label */}
          <div className="nle-label mb-10 flex items-center gap-4" style={{ opacity: 0 }}>
            <span className="h-px w-6 bg-amber-400/50" />
            <span className="font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: "#FACC15" }}>Journey</span>
          </div>

          {/* Track */}
          <div className="relative mb-8">
            <div className="timeline-track relative h-px w-full bg-white/8">
              {/* Scrubbed fill */}
              <div className="timeline-fill absolute inset-y-0 left-0 w-full origin-left bg-amber-400/55" />
              {/* Red playhead */}
              <div className="timeline-playhead absolute -top-[5px] left-0 flex flex-col items-center">
                <div className="h-[14px] w-[1.5px] bg-red-500" />
                <div className="mt-0.5 h-[5px] w-[5px] rounded-full bg-red-500" />
              </div>
            </div>
          </div>

          {/* Milestones */}
          <div className="flex justify-between">
            {MILESTONES.map((m) => (
              <div key={m.year} className="nle-milestone flex flex-col items-center text-center" style={{ opacity: 0 }}>
                <div className="mb-2 h-px w-px" /> {/* tick placeholder */}
                <span className={`${displayFont.className} text-white tracking-wide`}
                  style={{ fontSize: "clamp(1.3rem, 2.8vw, 2rem)" }}>
                  {m.year}
                </span>
                <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.18em] text-white/35 max-w-[80px]">
                  {m.title}
                </span>
                <span className="mt-0.5 hidden font-mono text-[7px] text-white/18 max-w-[80px] lg:block">
                  {m.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          BLOCK 4 — CINEMATIC STATISTICS
      ══════════════════════════════════════════════════════════ */}
      <div className="about-stats relative px-6 py-24 lg:px-12 lg:py-32" style={{ background: "#060606" }}>
        <Grain id="ag4" opacity={0.03} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-12 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <div key={i}>
                {/* Number — GSAP writes here via onUpdate */}
                <div className={`${displayFont.className} leading-none text-white`}
                  style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}>
                  <span data-counter={i}>0</span>
                  <span className="text-amber-400">{stat.suffix}</span>
                </div>

                <p className="stat-label mt-3 font-mono text-[9px] uppercase leading-relaxed text-white/28"
                  style={{ letterSpacing: "0.2em", whiteSpace: "pre-line", opacity: 0 }}>
                  {stat.label}
                </p>

                <div className="stat-bar mt-4 h-px w-10 origin-left bg-amber-400/35" style={{ transform: "scaleX(0)" }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          BLOCK 5 — SIGNATURE MOMENT (PINNED + SCRUBBED)
      ══════════════════════════════════════════════════════════ */}
      <div
        className="about-signature relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
        style={{ background: "#020202" }}
      >
        <Grain id="ag5" opacity={0.065} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* Core amber glow */}
        <div className="sig-glow pointer-events-none absolute inset-0 flex items-center justify-center" style={{ opacity: 0 }}>
          <div style={{
            width: "55vw", height: "55vh",
            background: "radial-gradient(ellipse at center, rgba(250,204,21,0.07) 0%, transparent 70%)",
            filter: "blur(72px)",
          }} />
        </div>

        {/* Pulsing ambient ring */}
        <div className="sig-ambient-ring pointer-events-none absolute inset-0 flex items-center justify-center" style={{ opacity: 0 }}>
          <div style={{
            width: "35vw", height: "35vw",
            borderRadius: "50%",
            border: "1px solid rgba(250,204,21,0.06)",
          }} />
        </div>

        <div className="relative z-10 max-w-3xl">
          <p
            className="sig-line-1 mb-6 font-sans leading-snug"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)", color: "rgba(255,255,255,0.55)", fontStyle: "italic", opacity: 0 }}
          >
            People don't remember videos.
          </p>
          <p
            className="sig-line-2 mb-8 font-sans leading-snug"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)", color: "rgba(255,255,255,0.7)", fontStyle: "italic", opacity: 0 }}
          >
            They remember how those videos<br className="hidden lg:block" /> made them feel.
          </p>
          <p
            className="sig-line-3 font-sans leading-snug"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#FACC15", fontStyle: "italic", opacity: 0 }}
          >
            That's what I edit for.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          BLOCK 6 — FLOATING SKILLS
      ══════════════════════════════════════════════════════════ */}
      <div
        className="about-skills relative overflow-hidden"
        style={{ background: "#060606", minHeight: "60vh" }}
      >
        <Grain id="ag6" opacity={0.032} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* Label */}
        <div className="absolute left-6 top-8 lg:left-12">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: "#FACC15" }}>
            Expertise
          </span>
        </div>

        {SKILLS.map((skill) => (
          <div
            key={skill.text}
            className="skill-word absolute cursor-default"
            style={{ left: skill.x, top: skill.y }}
          >
            <span
              className={`skill-word-inner ${displayFont.className} text-white uppercase tracking-[0.04em]`}
              style={{ fontSize: `clamp(1.2rem, ${skill.size}, 4.5rem)`, opacity: 0, display: "block" }}
            >
              {skill.text}
            </span>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════
          BLOCK 7 — CLOSING STATEMENT
      ══════════════════════════════════════════════════════════ */}
      <div
        className="about-closing relative px-6 py-28 lg:px-12 lg:py-36"
        style={{ background: "#050505" }}
      >
        <Grain id="ag7" opacity={0.04} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl">
          {[
            "Every frame has a purpose.",
            "Every cut tells a story.",
            "Every second earns attention.",
          ].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <h3
                className={`closing-clip-inner ${displayFont.className} text-white uppercase leading-[0.9] tracking-[0.02em]`}
                style={{ fontSize: "clamp(2.6rem, 7vw, 6.5rem)" }}
              >
                {i === 2 ? (
                  <>{line.slice(0, -1)}<span style={{ color: "#FACC15" }}>.</span></>
                ) : line}
              </h3>
            </div>
          ))}

          {/* Gold line */}
          <div
            className="closing-gold mt-16 h-px origin-left"
            style={{
              width: "clamp(80px, 20vw, 210px)",
              background: "linear-gradient(90deg, #FACC15, rgba(250,204,21,0.15))",
              opacity: 0,
            }}
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-400/12 to-transparent" />
      </div>

    </section>
  );
}
