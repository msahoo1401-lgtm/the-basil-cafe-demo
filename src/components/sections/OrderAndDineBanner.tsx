"use client";

import { useCafeState } from "@/context/CafeStateContext";

export default function OrderAndDineBanner() {
  const { setBookingModalOpen } = useCafeState();

  return (
    <div className="bg-[#EDE8DF] border border-[#1B3B2B]/15 rounded-3xl p-6 sm:p-10 mt-12 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left shadow-sm">
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
          Order direct delivery via Swiggy and Zomato, or reserve your sunlit table in Kalinganagar.
        </p>
      </div>

      {/* Right Side-by-Side Hover-Expanding Tiles with Fixed Vertical Height (Zero Shaking) */}
      <div className="h-28 sm:h-32 flex items-center justify-center gap-8 sm:gap-12 flex-shrink-0">
        {/* Swiggy */}
        <a
          href="https://www.swiggy.com/restaurants/bhubaneswar/kalinga-nagar/the-basil-cafe-and-restro-1101007/dineout"
          target="_blank"
          rel="noopener noreferrer"
          title="Order on Swiggy"
          className="group flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ease-out hover:px-3"
        >
          <img
            src="/images/final swiggy.png"
            alt="Order on Swiggy"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain transition-transform duration-300 ease-out group-hover:scale-125 group-hover:-translate-y-1"
          />
          <span className="mt-2 text-[11px] sm:text-xs font-semibold text-[#1B3B2B] opacity-75 group-hover:opacity-100 group-hover:text-[#FC8019] transition-all whitespace-nowrap">
            Swiggy
          </span>
        </a>

        {/* Zomato */}
        <a
          href="https://www.zomato.com/bhubaneswar/the-basil-cafe-restro-kalinga-nagar-bhubaneshwar"
          target="_blank"
          rel="noopener noreferrer"
          title="Order on Zomato"
          className="group flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ease-out hover:px-3"
        >
          <img
            src="/images/final zomato.png"
            alt="Order on Zomato"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain transition-transform duration-300 ease-out group-hover:scale-125 group-hover:-translate-y-1"
          />
          <span className="mt-2 text-[11px] sm:text-xs font-semibold text-[#1B3B2B] opacity-75 group-hover:opacity-100 group-hover:text-[#E23744] transition-all whitespace-nowrap">
            Zomato
          </span>
        </a>

        {/* Book Dining */}
        <button
          type="button"
          onClick={() => setBookingModalOpen(true)}
          title="Book Table for Dining"
          className="group flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ease-out hover:px-3 border-none bg-transparent p-0"
        >
          <img
            src="/images/final dining image.png"
            alt="Book Table for Dining"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain transition-transform duration-300 ease-out group-hover:scale-125 group-hover:-translate-y-1"
          />
          <span className="mt-2 text-[11px] sm:text-xs font-semibold text-[#1B3B2B] opacity-75 group-hover:opacity-100 transition-all whitespace-nowrap">
            Book Dining
          </span>
        </button>
      </div>
    </div>
  );
}
