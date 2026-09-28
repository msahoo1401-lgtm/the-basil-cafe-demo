"use client";

import Link from "next/link";
import { INTERIOR_IMAGES } from "@/data/cafeData";

const HIGHLIGHTS = [
  "Pet-Friendly (Radha & Rani)",
  "Live Music & Jam Nights",
  "Books & Board Games",
];

export default function AboutAndSpaceSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* ── Left Column — About ── */}
        <div id="about" className="lg:col-span-5">
          <p className="text-xs tracking-[0.25em] uppercase text-[#C86446] font-semibold mb-2">
            About Our Cafe
          </p>
          <h2
            className="text-3xl md:text-4xl text-[#1B3B2B] mb-4 leading-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            A green, pet-friendly sanctuary built around music and comfort food.
          </h2>
          <p className="text-[#5A635D] text-base leading-relaxed mb-6">
            Our kitchen is 100% vegetarian and vegan-friendly &mdash; every dish, from the mushroom
            stroganoff to the wood-fired margherita pizza, is prepared fresh to order. Most weekends
            include acoustic jam sessions in the singing area and Mandala and Lippan art workshops
            on the activity floor. Radha and Rani, our two resident dogs, usually roam between the
            bookshelf corner and the sunlit window tables.
          </p>

          {/* Highlight pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {HIGHLIGHTS.map((label) => (
              <span
                key={label}
                className="border border-[#1B3B2B]/15 bg-[#E9EFEA]/60 px-4 py-2 rounded-full text-xs font-medium text-[#1B3B2B]"
              >
                {label}
              </span>
            ))}
          </div>

          {/* Link to dedicated /space page */}
          <div>
            <Link
              href="/space"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B3B2B] hover:text-[#C86446] transition group"
            >
              <span>Explore The Space, Pets &amp; Events</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                aria-hidden
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ── Right Column — Space Photo Grid ── */}
        <div id="space" className="lg:col-span-7 grid grid-cols-2 gap-3">
          {/* Top: bookshelf / seating — spans both columns */}
          <div className="col-span-2 relative rounded-2xl overflow-hidden h-56 sm:h-64 lg:h-72">
            <img
              src={INTERIOR_IMAGES.bookStand}
              alt="Bookshelf and reading corner at The Basil Cafe"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-3 left-3 bg-[#F6F3EC]/90 backdrop-blur-sm text-[#1B3B2B] text-[11px] font-semibold px-2.5 py-1 rounded-lg">
              Book corner &amp; seating
            </span>
          </div>

          {/* Bottom left: Radha & Rani */}
          <div className="relative rounded-2xl overflow-hidden h-40 sm:h-48">
            <img
              src={INTERIOR_IMAGES.radhaAndRani}
              alt="Radha and Rani, the resident dogs at The Basil Cafe"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2 left-2 bg-[#F6F3EC]/90 backdrop-blur-sm text-[#1B3B2B] text-[10px] font-semibold px-2 py-0.5 rounded-lg">
              Radha &amp; Rani
            </span>
          </div>

          {/* Bottom right: Entrance */}
          <div className="relative rounded-2xl overflow-hidden h-40 sm:h-48">
            <img
              src={INTERIOR_IMAGES.entrance}
              alt="First-floor entrance to The Basil Cafe"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2 left-2 bg-[#F6F3EC]/90 backdrop-blur-sm text-[#1B3B2B] text-[10px] font-semibold px-2 py-0.5 rounded-lg">
              First-floor entrance
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
