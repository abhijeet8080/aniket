"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { ModeToggle } from "@/components/mode-toggle";

import NavHeader from "./Navheader";
import { ShimmerButton } from "./ui/shimmer-button";

const NAV_LINKS = ["Home", "About", "Work", "Contact"];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <div className="flex shrink-0 items-center">
            <span className="font-heading text-xl font-semibold tracking-tight">Aniket</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden min-w-0 flex-1 justify-center md:flex">
            <NavHeader />
          </div>

          {/* Right side */}
          <div className="flex shrink-0 items-center gap-2">
            <ModeToggle />
            <ShimmerButton className="hidden h-9 px-4 text-sm md:flex">
              Let&apos;s Talk
            </ShimmerButton>

            {/* Hamburger — mobile only */}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-md text-foreground/70 transition-colors hover:text-foreground md:hidden"
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
                    transition={{ duration: 0.15 }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
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
                    transition={{ duration: 0.15 }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
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

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="sticky top-16 z-40 border-b border-border/40 bg-background/95 backdrop-blur-md md:hidden"
          >
            <nav className="mx-auto max-w-7xl px-4 py-3">
              <div className="flex flex-col gap-0.5">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link}
                    href="#"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
                  >
                    {link}
                  </a>
                ))}
              </div>
              <div className="mt-3 border-t border-border/40 pt-3">
                <ShimmerButton className="h-10 w-full text-sm">
                  Let&apos;s Talk
                </ShimmerButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
