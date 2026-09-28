"use client";

import { INTERIOR_IMAGES, CAFE_INFO } from "@/data/cafeData";

export default function LocationAndHoursSection() {
  return (
    <section id="location" className="max-w-6xl mx-auto px-4 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-md mb-6 bg-[#E9EFEA]">
            <img
              src={INTERIOR_IMAGES.sideWindowView}
              alt="Sunlit seating by the window at The Basil Cafe"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3
              className="text-2xl md:text-3xl font-bold text-[#1B3B2B] mb-1 tracking-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              THE BASIL CAFE &amp; RESTRO
            </h3>
            <p className="text-sm text-[#5A635D] leading-relaxed">
              {CAFE_INFO.address}, Odisha
            </p>
            <p className="text-xs text-[#5A635D]/80 mt-1">
              {CAFE_INFO.landmarkNote}
            </p>
          </div>
        </div>

        {/* Right Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <p
            className="text-[#C86446] text-lg mb-1 italic"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Our Location
          </p>
          <h2
            className="text-3xl md:text-5xl font-semibold text-[#1B3B2B] leading-tight mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            You Are Always Welcome at THE BASIL
          </h2>
          <p className="text-[#5A635D] text-base leading-relaxed mb-8">
            Step into our first-floor sunlit space in Kalinganagar for freshly brewed coffee,
            wood-fired pizzas, and unhurried conversations.
          </p>

          <h4 className="text-sm font-bold tracking-[0.15em] uppercase text-[#1B3B2B] mb-2">
            OPEN HOURS
          </h4>
          <ul className="space-y-1.5 text-sm md:text-base text-[#222623] font-medium mb-8 list-disc list-inside">
            <li>Mon &ndash; Fri: 10:00 am &ndash; 10:30 pm</li>
            <li>Sat &ndash; Sun: 8:30 am &ndash; 11:30 pm</li>
          </ul>

          {/* Secondary horizontal preview image */}
          <div className="w-64 h-36 rounded-2xl overflow-hidden shadow-sm mb-8 bg-[#E9EFEA]">
            <img
              src={INTERIOR_IMAGES.reception}
              alt="Reception and coffee counter at The Basil Cafe"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Primary Action Button */}
          <div>
            <a
              href="https://maps.app.goo.gl/ZXQBdMExMKxirjed9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1B3B2B] text-[#F6F3EC] hover:bg-[#2a543f] px-8 py-3.5 rounded-full text-sm font-semibold transition shadow-sm"
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
              <span>Location</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
