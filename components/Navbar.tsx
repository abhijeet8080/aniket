import React from "react";

import { ModeToggle } from "@/components/mode-toggle";

import NavHeader from "./Navheader";
import { ShimmerButton } from "./ui/shimmer-button";

const Navbar = () => {
  return (
    <header className="w-full border-b border-white/5 bg-background/70 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex w-28 shrink-0 items-center">
          <span className="font-heading text-xl font-semibold tracking-tight">Aniket</span>
        </div>

        <div className="flex min-w-0 flex-1 justify-center">
          <NavHeader />
        </div>

        <div className="flex shrink-0 items-center justify-between gap-2">
          <ModeToggle />
          <ShimmerButton className="h-9 px-4 text-sm">Let's Talk</ShimmerButton>
        </div>
      </div>
    </header>
  );
};

export default Navbar;