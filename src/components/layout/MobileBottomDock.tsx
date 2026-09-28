"use client";

import { useCafeState } from "@/context/CafeStateContext";

export default function MobileBottomDock() {
  const { setBookingModalOpen } = useCafeState();

  function scrollToMenu() {
    const el = document.getElementById("specials") || document.getElementById("menu");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#F6F3EC]/95 backdrop-blur-md border-t border-[#1B3B2B]/15 px-3 py-2.5 shadow-lg">
      <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto">
        {/* Menu scroll */}
        <button
          onClick={scrollToMenu}
          className="flex flex-col items-center justify-center gap-1 py-1 rounded-xl text-[#1B3B2B] hover:bg-[#E9EFEA] transition-colors cursor-pointer bg-transparent border-none"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          <span className="text-[11px] font-semibold tracking-tight">Menu</span>
        </button>

        {/* Primary CTA */}
        <button
          onClick={() => setBookingModalOpen(true)}
          className="flex flex-col items-center justify-center gap-1 py-2 rounded-full bg-[#1B3B2B] text-[#F6F3EC] font-semibold shadow-sm hover:bg-[#1B3B2B]/90 transition-colors cursor-pointer border-none"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="text-[11px] font-semibold tracking-tight">Book Table</span>
        </button>

        {/* Maps link */}
        <a
          href="https://maps.app.goo.gl/8rtiiE8igKdkyiGh6"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-1 rounded-xl text-[#1B3B2B] hover:bg-[#E9EFEA] transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="text-[11px] font-semibold tracking-tight">Map</span>
        </a>
      </div>
    </div>
  );
}
