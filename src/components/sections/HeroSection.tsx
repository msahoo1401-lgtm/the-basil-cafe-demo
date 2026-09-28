"use client";

import { INTERIOR_IMAGES } from "@/data/cafeData";
import { useCafeState } from "@/context/CafeStateContext";

export default function HeroSection() {
  const { setBookingModalOpen } = useCafeState();

  function scrollToSpecials() {
    const el = document.getElementById("specials");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="relative w-screen min-h-[88vh] md:min-h-[95vh] flex items-center justify-center overflow-hidden">
      <img
        src={INTERIOR_IMAGES.windowView}
        alt="Warm sunlit interior of The Basil Cafe with large windows and natural light"
        className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/75" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-16">
        <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#F6F3EC]/90 font-medium mb-4">
          100% Pure Vegetarian &amp; Vegan &bull; Kalinganagar
        </p>
        <h1
          className="text-4xl sm:text-6xl md:text-7xl text-[#F6F3EC] font-semibold leading-[1.08] mb-8"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Sunlit corners, specialty coffee, and wood-fired slices.
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={scrollToSpecials}
            className="bg-[#F6F3EC] text-[#1B3B2B] hover:bg-white px-8 py-4 rounded-full text-sm md:text-base font-semibold transition shadow-lg cursor-pointer border-none"
          >
            Explore Menu
          </button>
          <button
            onClick={() => setBookingModalOpen(true)}
            className="bg-white/15 hover:bg-white/25 text-[#F6F3EC] border border-white/40 backdrop-blur-md px-8 py-4 rounded-full text-sm md:text-base font-semibold transition cursor-pointer"
          >
            Reserve a Table
          </button>
        </div>
      </div>
    </section>
  );
}
