"use client";

import { useState } from "react";
import Link from "next/link";
import { useCafeState } from "@/context/CafeStateContext";
import BrandWordmark from "./BrandWordmark";

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

  return (
    <header className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-6xl px-4">
      <div className="bg-[#F6F3EC]/85 backdrop-blur-md border border-[#1B3B2B]/10 rounded-full px-5 sm:px-6 h-16 flex items-center justify-between shadow-md">
        {/* Left: Brand with circular masked official logo and wordmark */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden flex-shrink-0 border border-[#1B3B2B]/15 shadow-sm bg-[#84BE38]">
            <img
              src="/images/logo.jpg"
              alt="The Basil Cafe & Restro"
              className="w-full h-full object-cover scale-[1.05]"
            />
          </div>
          <BrandWordmark variant="dark" className="h-8 sm:h-9 w-auto" />
        </Link>

        {/* Center: Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#222623]">
          <Link
            href="/"
            className="hover:text-[#1B3B2B] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/menu"
            className="hover:text-[#1B3B2B] transition-colors"
          >
            Menu
          </Link>
          <Link
            href="/#about"
            className="hover:text-[#1B3B2B] transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/space"
            className="hover:text-[#1B3B2B] transition-colors"
          >
            Space
          </Link>
        </nav>

        {/* Right CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setBookingModalOpen(true)}
            className="bg-[#1B3B2B] text-[#F6F3EC] hover:bg-[#2a543f] text-xs md:text-sm font-medium px-5 py-2.5 rounded-full transition cursor-pointer border-none shadow-sm"
          >
            Reserve a Table
          </button>
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden relative flex flex-col items-center justify-center w-9 h-9 gap-[7px] bg-transparent border-none cursor-pointer"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span
              className={`block w-5 h-[1.5px] bg-[#1B3B2B] rounded-full transition-all duration-300 origin-center ${
                mobileMenuOpen ? "rotate-45 translate-y-[4.25px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-[#1B3B2B] rounded-full transition-all duration-300 origin-center ${
                mobileMenuOpen ? "-rotate-45 -translate-y-[4.25px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <nav className="md:hidden mt-2 bg-[#F6F3EC]/95 backdrop-blur-md border border-[#1B3B2B]/10 rounded-2xl px-6 py-4 shadow-lg flex flex-col gap-1">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-left text-sm font-medium text-[#222623] hover:text-[#1B3B2B] transition-colors py-2"
          >
            Home
          </Link>
          <Link
            href="/menu"
            onClick={() => setMobileMenuOpen(false)}
            className="text-left text-sm font-medium text-[#222623] hover:text-[#1B3B2B] transition-colors py-2"
          >
            Menu
          </Link>
          <Link
            href="/#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-left text-sm font-medium text-[#222623] hover:text-[#1B3B2B] transition-colors py-2"
          >
            About Us
          </Link>
          <Link
            href="/space"
            onClick={() => setMobileMenuOpen(false)}
            className="text-left text-sm font-medium text-[#222623] hover:text-[#1B3B2B] transition-colors py-2"
          >
            Space
          </Link>
        </nav>
      )}
    </header>
  );
}
