"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bebas_Neue } from "next/font/google";
import { useEffect, useState } from "react";

const displayFont = Bebas_Neue({ weight: "400", subsets: ["latin"] });

const NAV_LINKS = [
  { label: "Home",    href: "#" },
  { label: "Work",    href: "#work" },
  { label: "About",   href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={[
          "sticky top-0 z-50 w-full transition-all duration-400",
          scrolled
            ? "border-b border-foreground/[0.07] bg-background/90 backdrop-blur-md"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="relative flex h-16 w-full items-center pl-4 pr-4 sm:pl-5 sm:pr-5 lg:pl-6 lg:pr-14">

          {/* ── Brand — aligned with hero bottom-left ─────────────── */}
          <a
            href="#"
            onClick={() => setActiveLink("Home")}
            className="group z-10 flex shrink-0 items-center gap-2.5"
          >
            <span
              className={`${displayFont.className} text-[2rem] leading-none tracking-tight transition-colors duration-200`}
              style={{ color: scrolled ? "var(--foreground)" : "#fff" }}
            >
              AP<span className="text-amber-400">.</span>
            </span>
            <span
              className="hidden font-mono text-[9px] tracking-[0.28em] uppercase transition-colors duration-200 sm:block"
              style={{
                color: scrolled
                  ? "oklch(var(--foreground-l, 0.145) 0 0 / 0.35)"
                  : "rgba(255,255,255,0.35)",
              }}
            >
              Aniket Patil
            </span>
          </a>

          {/* ── Desktop nav — centered in viewport ──────────────────── */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setActiveLink(link.label)}
                className="relative px-5 py-2 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-150"
                style={{
                  color:
                    activeLink === link.label
                      ? scrolled ? "var(--foreground)" : "#fff"
                      : scrolled ? "oklch(0.556 0 0)" : "rgba(255,255,255,0.45)",
                }}
              >
                {link.label}
                {activeLink === link.label && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-5 bottom-0 h-px bg-amber-400"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* ── Right controls — aligned with hero stats column ─────── */}
          <div className="z-10 ml-auto flex shrink-0 items-center gap-2.5">

            {/* Book a Call — desktop */}
            <a
              href="#contact"
              className="group hidden items-center gap-2 px-5 py-2 font-mono text-[10px] tracking-[0.16em] uppercase transition-all duration-200 hover:bg-amber-400 hover:text-black md:inline-flex"
              style={{
                border: "1px solid #FACC15",
                color: "#FACC15",
              }}
            >
              Book a Call
            </a>

            {/* Hamburger — mobile */}
            <button
              className="flex h-8 w-8 items-center justify-center transition-colors hover:opacity-80 md:hidden"
              style={{ color: scrolled ? "var(--foreground)" : "#fff" }}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.svg
                    key="close"
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.14 }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="h-5 w-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="open"
                    initial={{ opacity: 0, rotate: 45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -45 }}
                    transition={{ duration: 0.14 }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="h-5 w-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile menu ───────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="sticky top-16 z-40 border-b border-white/[0.07] bg-black/95 backdrop-blur-md md:hidden"
          >
            <nav className="px-4 pb-5 pt-3 sm:px-5 lg:px-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    setMenuOpen(false);
                    setActiveLink(link.label);
                  }}
                  className="flex items-center justify-between border-b border-white/[0.05] py-3.5 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors"
                  style={{
                    color:
                      activeLink === link.label
                        ? "#fff"
                        : "rgba(255,255,255,0.4)",
                  }}
                >
                  {link.label}
                  {activeLink === link.label && (
                    <span className="h-px w-5 bg-amber-400" />
                  )}
                </a>
              ))}
              <div className="mt-4">
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center py-3 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors hover:bg-amber-400 hover:text-black"
                  style={{ border: "1px solid #FACC15", color: "#FACC15" }}
                >
                  Book a Call
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
