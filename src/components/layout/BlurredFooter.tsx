"use client";

import { INTERIOR_IMAGES } from "@/data/cafeData";
import { useCafeState } from "@/context/CafeStateContext";

export default function BlurredFooter() {
  const { isOwnerMode, setIsOwnerMode } = useCafeState();

  return (
    <footer className="relative w-full py-20 md:py-28 overflow-hidden text-center text-[#F6F3EC]">
      {/* Blurred background image */}
      <img
        src={INTERIOR_IMAGES.middleArea}
        alt="Interior atmosphere at The Basil Cafe"
        className="absolute inset-0 w-full h-full object-cover blur-[6px] scale-110"
      />
      {/* Dark warm espresso/forest overlay */}
      <div className="absolute inset-0 bg-[#1A1412]/80" />

      {/* Centered foreground content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 flex flex-col items-center">
        {/* Circular masked official logo */}
        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border border-[#F6F3EC]/20 mb-4 shadow-lg bg-[#84BE38]">
          <img
            src="/images/logo.jpg"
            alt="The Basil Cafe & Restro"
            className="w-full h-full object-cover scale-[1.05]"
          />
        </div>

        <h2
          className="text-4xl md:text-6xl font-semibold text-[#F6F3EC] mb-3 italic tracking-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          The Basil
        </h2>
        <p className="text-sm md:text-base text-[#F6F3EC]/85 mb-8">
          Crafted with warmth &amp; freshly brewed coffee in Bhubaneswar.
        </p>

        {/* Social media icons row */}
        <div className="flex items-center gap-6 mb-10">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/thebasilcafeandrestro"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[#F6F3EC] hover:text-[#C86446] transition"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
              aria-hidden
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[#F6F3EC] hover:text-[#C86446] transition"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
              aria-hidden
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/918018491379"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[#F6F3EC] hover:text-[#C86446] transition"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
              aria-hidden
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </a>

          {/* Google Maps */}
          <a
            href="https://maps.app.goo.gl/ZXQBdMExMKxirjed9"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Google Maps"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[#F6F3EC] hover:text-[#C86446] transition"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
              aria-hidden
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </a>
        </div>

        {/* Bottom Copyright & Discreet Owner Toggle */}
        <div className="text-xs md:text-sm text-[#F6F3EC]/70 flex flex-wrap items-center justify-center gap-2">
          <span>&copy; 2026 The Basil Cafe &amp; Restro. All rights reserved.</span>
          <span className="hidden sm:inline">|</span>
          <button
            onClick={() => {
              setIsOwnerMode((prev) => !prev);
              const specialsEl = document.getElementById("specials");
              if (specialsEl) {
                specialsEl.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="inline-flex items-center gap-1.5 hover:text-[#C86446] transition cursor-pointer border-none bg-transparent p-0 underline decoration-[#F6F3EC]/40 hover:decoration-[#C86446]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5"
              aria-hidden
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>
              Staff Portal {isOwnerMode ? "(Live Editing Active)" : ""}
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
