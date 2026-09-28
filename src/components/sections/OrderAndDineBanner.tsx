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

      {/* Right Side-by-Side Hover-Expanding Tiles */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 flex-shrink-0">
        {/* Swiggy Tile */}
        <div className="group px-1 hover:px-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col items-center">
          <a
            href="https://www.swiggy.com/restaurants/bhubaneswar/kalinga-nagar/the-basil-cafe-and-restro-1101007/dineout"
            target="_blank"
            rel="noopener noreferrer"
            title="Order on Swiggy"
            className="w-16 h-16 sm:w-20 sm:h-20 group-hover:w-24 group-hover:h-24 sm:group-hover:w-28 sm:group-hover:h-28 rounded-2xl bg-white border border-[#FC8019]/25 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 p-2.5 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden"
          >
            <img
              src="/images/swiggy.webp"
              alt="Order on Swiggy"
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </a>
          <span className="mt-2 text-[11px] sm:text-xs font-semibold text-[#1B3B2B] opacity-75 group-hover:opacity-100 group-hover:text-[#FC8019] transition-all whitespace-nowrap">
            Swiggy
          </span>
        </div>

        {/* Zomato Tile */}
        <div className="group px-1 hover:px-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col items-center">
          <a
            href="https://www.zomato.com/bhubaneswar/the-basil-cafe-restro-kalinga-nagar-bhubaneshwar"
            target="_blank"
            rel="noopener noreferrer"
            title="Order on Zomato"
            className="w-16 h-16 sm:w-20 sm:h-20 group-hover:w-24 group-hover:h-24 sm:group-hover:w-28 sm:group-hover:h-28 rounded-2xl bg-white border border-[#E23744]/25 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 p-2 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden"
          >
            <img
              src="/images/zomato.webp"
              alt="Order on Zomato"
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </a>
          <span className="mt-2 text-[11px] sm:text-xs font-semibold text-[#1B3B2B] opacity-75 group-hover:opacity-100 group-hover:text-[#E23744] transition-all whitespace-nowrap">
            Zomato
          </span>
        </div>

        {/* Dining Reservation Tile */}
        <div className="group px-1 hover:px-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col items-center">
          <button
            type="button"
            onClick={() => setBookingModalOpen(true)}
            title="Book Table for Dining"
            className="w-16 h-16 sm:w-20 sm:h-20 group-hover:w-24 group-hover:h-24 sm:group-hover:w-28 sm:group-hover:h-28 rounded-2xl bg-[#E9EFEA] border border-[#1B3B2B]/25 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden cursor-pointer"
          >
            <img
              src="/images/dinning image.png"
              alt="Book Table for Dining"
              className="w-full h-[118%] object-cover object-top mix-blend-multiply p-2 group-hover:scale-105 transition-transform duration-500"
            />
          </button>
          <span className="mt-2 text-[11px] sm:text-xs font-semibold text-[#1B3B2B] opacity-75 group-hover:opacity-100 transition-all whitespace-nowrap">
            Dine-In
          </span>
        </div>
      </div>
    </div>
  );
}
