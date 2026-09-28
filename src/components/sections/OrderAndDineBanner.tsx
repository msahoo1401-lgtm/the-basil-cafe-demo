"use client";

import { useCafeState } from "@/context/CafeStateContext";

export default function OrderAndDineBanner() {
  const { setBookingModalOpen } = useCafeState();

  return (
    <div className="bg-[#EDE8DF] border border-[#1B3B2B]/15 rounded-3xl p-6 sm:p-10 mt-12 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left shadow-sm">
      {/* Left Copy */}
      <div className="max-w-xl">
        <p className="text-xs tracking-[0.2em] uppercase text-[#C86446] font-semibold mb-2">
          DINE WITH US OR ORDER HOME
        </p>
        <h3
          className="text-2xl sm:text-3xl font-bold text-[#1B3B2B] mb-2 leading-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Craving The Basil at home, or planning a table hangout?
        </h3>
        <p className="text-sm text-[#5A635D] leading-relaxed">
          Order direct delivery &amp; dineout offers via Swiggy and Zomato, or reserve your sunlit table in Kalinganagar.
        </p>
      </div>

      {/* Right Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3.5">
        {/* Swiggy Button */}
        <a
          href="https://www.swiggy.com/restaurants/bhubaneswar/kalinga-nagar/the-basil-cafe-and-restro-1101007/dineout"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#FC8019] hover:bg-[#e57012] text-white font-semibold px-6 py-3.5 rounded-full text-sm flex items-center gap-2 shadow-sm transition"
        >
          <span>Order on Swiggy</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5"
            aria-hidden
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>

        {/* Zomato Button */}
        <a
          href="https://www.zomato.com/bhubaneswar/the-basil-cafe-restro-kalinga-nagar-bhubaneshwar"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#E23744] hover:bg-[#c92c38] text-white font-semibold px-6 py-3.5 rounded-full text-sm flex items-center gap-2 shadow-sm transition"
        >
          <span>Order on Zomato</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5"
            aria-hidden
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>

        {/* Book Table for Dining Button */}
        <button
          onClick={() => setBookingModalOpen(true)}
          className="bg-[#1B3B2B] hover:bg-[#2a543f] text-[#F6F3EC] font-semibold px-6 py-3.5 rounded-full text-sm flex items-center gap-2 shadow-sm transition cursor-pointer border-none"
        >
          <span>Book Table for Dining</span>
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
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </button>
      </div>
    </div>
  );
}
