"use client";

import { useRef, useState, useEffect } from "react";
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
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const specialItems = menuItems.filter((item) => SPECIALS_IDS.has(item.id));

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    function handleScroll() {
      if (!container) return;
      const firstChild = container.firstElementChild as HTMLElement | null;
      if (!firstChild) return;
      const cardWidth = firstChild.offsetWidth;
      const gap = 24;
      const idx = Math.round(container.scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(idx, Math.max(0, specialItems.length - 1)));
    }

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [specialItems.length]);

  function scrollToCard(index: number) {
    const container = carouselRef.current;
    if (!container) return;
    const card = container.children[index] as HTMLElement | undefined;
    if (card) {
      container.scrollTo({ left: card.offsetLeft - 16, behavior: "smooth" });
    }
  }

  return (
    <section id="specials" className="max-w-6xl mx-auto px-4 py-14 md:py-20">
      {/* Centered Header */}
      <div className="text-center mb-10">
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
      </div>

      {/* Horizontal Carousel with compact boxed cards */}
      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-none"
      >
        {specialItems.map((item) => (
          <div
            key={item.id}
            className="w-[280px] sm:w-[320px] md:w-[340px] flex-shrink-0 snap-start group bg-[#FAF7F2] rounded-2xl overflow-hidden shadow-sm border border-[#1B3B2B]/10 flex flex-col hover:shadow-md transition duration-300"
          >
            {/* 1. Top Image with slightly reduced height */}
            <div className="w-full h-48 sm:h-52 overflow-hidden bg-[#E9EFEA] relative">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#EDE8DF] text-[#1B3B2B]/40 font-serif text-3xl font-bold">
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
            <div className="p-5 flex flex-col flex-1 text-center">
              <h3
                className="text-lg md:text-xl font-bold text-[#1B3B2B] mb-1.5 leading-snug"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {item.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#5A635D] leading-relaxed line-clamp-2 mb-4">
                {item.description}
              </p>

              {/* Centered Price at Bottom */}
              <div className="mt-auto pt-2 text-lg md:text-xl font-bold text-[#C86446] tabular-nums text-center">
                &#x20B9;{item.price}
              </div>

              {/* Owner Admin Controls */}
              {isOwnerMode && (
                <div className="mt-3 pt-3 border-t border-[#1B3B2B]/10 flex items-center justify-between gap-2 text-xs">
                  <button
                    onClick={() => toggleItemStock(item.id)}
                    className={`px-2.5 py-1 rounded-full font-semibold border transition cursor-pointer ${
                      item.inStock
                        ? "bg-[#E9EFEA] text-[#1B3B2B] border-[#1B3B2B]/20"
                        : "bg-red-50 text-red-700 border-red-200"
                    }`}
                  >
                    {item.inStock ? "In Stock" : "Sold Out"}
                  </button>
                  <div className="flex items-center gap-1">
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

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {specialItems.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => scrollToCard(idx)}
            aria-label={`Go to ${item.name}`}
            className={`h-2 rounded-full border-none cursor-pointer transition-all duration-300 ${
              idx === activeIndex
                ? "bg-[#1B3B2B] w-6"
                : "bg-[#1B3B2B]/25 w-2 hover:bg-[#1B3B2B]/50"
            }`}
          />
        ))}
      </div>

      {/* Bottom Centered CTA */}
      <div className="text-center mt-10">
        <Link
          href="/menu"
          className="inline-flex items-center bg-[#1B3B2B] text-[#F6F3EC] px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-[#2a543f] transition shadow-sm"
        >
          View Full Menu
        </Link>
      </div>
    </section>
  );
}
