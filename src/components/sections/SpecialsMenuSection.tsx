"use client";

import Link from "next/link";
import { useCafeState } from "@/context/CafeStateContext";

const SPECIALS_IDS = new Set([
  "margherita-pizza",
  "creamy-mushroom-pasta",
  "mushroom-stroganoff",
  "cappuccino",
  "tofu-veg-maki",
  "grilled-veg-sandwich",
  "crispy-french-fries",
]);

export default function SpecialsMenuSection() {
  const { menuItems, isOwnerMode, toggleItemStock, updateItemPrice } = useCafeState();

  const specialItems = menuItems.filter((item) => SPECIALS_IDS.has(item.id));

  return (
    <section id="specials" className="max-w-6xl mx-auto px-4 py-14 md:py-20">
      {/* Centered Header */}
      <div className="text-center mb-6">
        <p
          className="text-[#C86446] text-lg mb-1 italic"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Our Specials Menu
        </p>
        <h2
          className="text-3xl md:text-5xl text-[#1B3B2B] font-semibold"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Discover Our Signature Dishes
        </h2>
        <p className="text-xs sm:text-sm text-[#5A635D] mt-2 max-w-lg mx-auto">
          Hover over any card below to preview dish details. Freshly prepared to order.
        </p>
      </div>

      {/* Flex Row with Physical "Push Adjacent Cards" Hover Effect */}
      <div className="flex items-stretch gap-5 overflow-x-auto py-6 px-2 scrollbar-none">
        {specialItems.map((item) => (
          <div
            key={item.id}
            className="w-[270px] sm:w-[300px] hover:w-[340px] sm:hover:w-[380px] flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-xl bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#1B3B2B]/10 cursor-pointer flex flex-col group"
          >
            {/* 1. Top image */}
            <div className="h-48 sm:h-52 w-full overflow-hidden bg-[#E9EFEA] relative flex-shrink-0">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#EDE8DF] text-[#1B3B2B]/35 font-serif text-3xl font-bold">
                  {item.name.charAt(0)}
                </div>
              )}
              {!item.inStock && (
                <div className="absolute top-3 right-3 bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-red-200 shadow-sm">
                  Sold Out Today
                </div>
              )}
              {item.isVegan && item.inStock && (
                <div className="absolute top-3 left-3 bg-[#E9EFEA]/90 backdrop-blur-sm text-[#1B3B2B] text-[11px] font-semibold px-2 py-0.5 rounded-full border border-[#1B3B2B]/10">
                  Vegan
                </div>
              )}
            </div>

            {/* 2. Card Body */}
            <div className="flex flex-col flex-1 p-4 pb-5 text-center">
              <h3
                className="text-lg md:text-xl font-bold text-[#1B3B2B] text-center mt-1 mb-1.5 leading-snug line-clamp-1"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {item.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#5A635D] text-center line-clamp-2 px-2 mb-3 leading-relaxed">
                {item.description}
              </p>

              {/* Price Centered at Bottom */}
              <div className="mt-auto pt-2 text-lg md:text-xl font-bold text-[#C86446] text-center tabular-nums">
                &#x20B9;{item.price}
              </div>

              {/* Owner Admin Controls */}
              {isOwnerMode && (
                <div className="mt-3 pt-3 border-t border-[#1B3B2B]/10 flex items-center justify-between gap-2 text-xs">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleItemStock(item.id);
                    }}
                    className={`px-2.5 py-1 rounded-full font-semibold border transition cursor-pointer ${
                      item.inStock
                        ? "bg-[#E9EFEA] text-[#1B3B2B] border-[#1B3B2B]/20"
                        : "bg-red-50 text-red-700 border-red-200"
                    }`}
                  >
                    {item.inStock ? "In Stock" : "Sold Out"}
                  </button>
                  <div
                    className="flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="font-semibold text-[#1B3B2B]">&#x20B9;</span>
                    <input
                      type="number"
                      value={item.price}
                      min={0}
                      step={5}
                      onChange={(e) => updateItemPrice(item.id, Number(e.target.value))}
                      className="w-16 rounded border border-[#1B3B2B]/20 bg-white text-center font-bold text-xs py-0.5 tabular-nums focus:outline-none focus:border-[#C86446]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Prominent Centered Button linking to /menu */}
      <div className="text-center mt-8">
        <Link
          href="/menu"
          className="inline-flex items-center bg-[#1B3B2B] text-[#F6F3EC] px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-[#2a543f] transition shadow-md"
        >
          View Full Menu
        </Link>
      </div>
    </section>
  );
}
