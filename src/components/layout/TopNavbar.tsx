"use client";

import { useState } from "react";
import { useCafeState } from "@/context/CafeStateContext";

export function VegIndicator({ className = "" }: { className?: string }) {
  return (
    <span
      aria-label="Pure Vegetarian"
      className={`inline-flex items-center justify-center w-3.5 h-3.5 border border-[#008000] rounded-sm bg-white flex-shrink-0 ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#008000] block" />
    </span>
  );
}

export default function TopNavbar() {
  const { setBookingModalOpen } = useCafeState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function scrollTo(id: string) {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <header className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-6xl px-4">
      <div className="bg-[#F6F3EC]/85 backdrop-blur-md border border-[#1B3B2B]/10 rounded-full px-6 h-16 flex items-center justify-between shadow-md">
        <div className="flex flex-col">
          <span
            className="font-bold text-xl md:text-2xl text-[#1B3B2B] tracking-tight leading-none"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            The Basil
          </span>
          <span className="text-[9px] tracking-[0.25em] text-[#5A635D] block -mt-1 uppercase font-medium">
            Cafe &amp; Restro
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#222623]">
          <button onClick={() => scrollTo("specials")} className="hover:text-[#1B3B2B] transition-colors cursor-pointer bg-transparent border-none p-0">Menu</button>
          <button onClick={() => scrollTo("about")} className="hover:text-[#1B3B2B] transition-colors cursor-pointer bg-transparent border-none p-0">About Us</button>
          <button onClick={() => scrollTo("space")} className="hover:text-[#1B3B2B] transition-colors cursor-pointer bg-transparent border-none p-0">Space</button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setBookingModalOpen(true)}
            className="bg-[#1B3B2B] text-[#F6F3EC] hover:bg-[#2a543f] text-xs md:text-sm font-medium px-5 py-2.5 rounded-full transition cursor-pointer border-none"
          >
            Reserve a Table
          </button>
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden relative flex flex-col items-center justify-center w-9 h-9 gap-[7px] bg-transparent border-none cursor-pointer"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span className={`block w-5 h-[1.5px] bg-[#1B3B2B] rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? "rotate-45 translate-y-[4.25px]" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-[#1B3B2B] rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? "-rotate-45 -translate-y-[4.25px]" : ""}`} />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden mt-2 bg-[#F6F3EC]/95 backdrop-blur-md border border-[#1B3B2B]/10 rounded-2xl px-6 py-4 shadow-lg flex flex-col gap-1">
          {[
            { label: "Menu", id: "specials" },
            { label: "About Us", id: "about" },
            { label: "Space", id: "space" },
          ].map(({ label, id }) => (
            <button key={id} onClick={() => scrollTo(id)} className="text-left text-sm font-medium text-[#222623] hover:text-[#1B3B2B] transition-colors bg-transparent border-none cursor-pointer py-2">{label}</button>
          ))}
        </nav>
      )}
    </header>
  );
}
