"use client";

import { useState } from "react";
import Link from "next/link";
import { useCafeState } from "@/context/CafeStateContext";
import OrderAndDineBanner from "./OrderAndDineBanner";

const SPECIALS_IDS = new Set([
  "margherita-pizza",
  "creamy-mushroom-pasta",
  "mushroom-stroganoff",
  "cappuccino",
  "tofu-veg-maki",
  "grilled-veg-sandwich",
  "crispy-french-fries",
]);

const PRESET_TAGS = ["Bestseller", "Most Liked", "Chef's Special"];

export default function SpecialsMenuSection() {
  const {
    menuItems,
    isOwnerMode,
    toggleItemStock,
    updateItemPrice,
    removeMenuItem,
    toggleItemTag,
    addCustomTag,
    setAddDishModalOpen,
  } = useCafeState();

  const [customTagInputMap, setCustomTagInputMap] = useState<Record<string, string>>({});

  const specialItems = menuItems.filter((item) => SPECIALS_IDS.has(item.id));

  function handleCustomTagChange(id: string, val: string) {
    setCustomTagInputMap((prev) => ({ ...prev, [id]: val }));
  }

  function submitCustomTag(id: string) {
    const val = customTagInputMap[id] || "";
    if (val.trim()) {
      addCustomTag(id, val.trim());
      setCustomTagInputMap((prev) => ({ ...prev, [id]: "" }));
    }
  }

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

        {/* Staff mode: Add New Menu Item button */}
        {isOwnerMode && (
          <div className="mt-4">
            <button
              onClick={() => setAddDishModalOpen(true)}
              className="inline-flex items-center gap-1.5 bg-[#C86446] hover:bg-[#b55539] text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-sm transition cursor-pointer border-none"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span>+ Add New Menu Item</span>
            </button>
          </div>
        )}
      </div>

      {/* Flex Row with Physical "Push Adjacent Cards" Hover Effect */}
      <div className="flex items-stretch gap-5 overflow-x-auto py-6 px-2 scrollbar-none">
        {specialItems.map((item) => {
          const itemTags = item.tags || [];

          return (
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

                {/* Sold Out badge */}
                {!item.inStock && (
                  <div className="absolute top-3 right-3 bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-red-200 shadow-sm z-10">
                    Sold Out Today
                  </div>
                )}

                {/* Tags displayed over the image top-left */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1 max-w-[70%] z-10">
                  {itemTags.map((tag) => {
                    const isBestseller = tag === "Bestseller";
                    const isMostLiked = tag === "Most Liked";
                    return (
                      <span
                        key={tag}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm ${
                          isBestseller
                            ? "bg-[#C86446] text-white"
                            : isMostLiked
                            ? "bg-[#1B3B2B] text-[#F6F3EC]"
                            : "bg-[#E9EFEA] text-[#1B3B2B] border border-[#1B3B2B]/15"
                        }`}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
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

                {/* Owner Admin Controls Panel */}
                {isOwnerMode && (
                  <div
                    className="mt-3 pt-3 border-t border-[#1B3B2B]/15 flex flex-col gap-2.5 text-xs text-left"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Row 1: Stock, Price & Delete */}
                    <div className="flex items-center justify-between gap-1.5">
                      <button
                        type="button"
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
                          className="w-14 rounded border border-[#1B3B2B]/20 bg-white text-center font-bold text-xs py-0.5 tabular-nums focus:outline-none focus:border-[#C86446]"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => removeMenuItem(item.id)}
                        title="Remove dish"
                        className="w-7 h-7 rounded-full bg-red-100 hover:bg-red-200 text-red-700 flex items-center justify-center transition cursor-pointer border-none"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>

                    {/* Row 2: Tag Preset Quick-Toggles */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {PRESET_TAGS.map((tag) => {
                        const hasTag = itemTags.includes(tag);
                        return (
                          <button
                            type="button"
                            key={tag}
                            onClick={() => toggleItemTag(item.id, tag)}
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border transition cursor-pointer ${
                              hasTag
                                ? "bg-[#1B3B2B] text-white border-[#1B3B2B]"
                                : "bg-white text-[#5A635D] border-[#1B3B2B]/20 hover:border-[#1B3B2B]/40"
                            }`}
                          >
                            {hasTag ? (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-2.5 h-2.5">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            ) : (
                              <span>+</span>
                            )}
                            <span>{tag}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Row 3: Active Custom Tags with remove button & Inline Add Input */}
                    <div className="flex flex-wrap gap-1">
                      {itemTags
                        .filter((t) => !PRESET_TAGS.includes(t))
                        .map((customT) => (
                          <span
                            key={customT}
                            className="inline-flex items-center gap-1 bg-[#E9EFEA] text-[#1B3B2B] border border-[#1B3B2B]/15 px-2 py-0.5 rounded-full text-[10px] font-medium"
                          >
                            <span>{customT}</span>
                            <button
                              type="button"
                              onClick={() => toggleItemTag(item.id, customT)}
                              className="text-[#5A635D] hover:text-red-700 font-bold ml-0.5 bg-transparent border-none cursor-pointer p-0"
                            >
                              &times;
                            </button>
                          </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-1 pt-0.5">
                      <input
                        type="text"
                        placeholder="Add tag..."
                        value={customTagInputMap[item.id] || ""}
                        onChange={(e) => handleCustomTagChange(item.id, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            submitCustomTag(item.id);
                          }
                        }}
                        className="flex-1 px-2 py-1 rounded-lg border border-[#1B3B2B]/20 bg-white text-xs text-[#222623] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => submitCustomTag(item.id)}
                        className="bg-[#1B3B2B] text-white px-2.5 py-1 rounded-lg text-[10px] font-semibold hover:bg-[#2a543f] transition border-none cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Prominent Centered Button linking to /menu with interactive hover & animated right chevron */}
      <div className="text-center mt-10">
        <Link
          href="/menu"
          className="group inline-flex items-center gap-2.5 bg-[#FAF7F2] hover:bg-[#1B3B2B] text-[#1B3B2B] hover:text-[#F6F3EC] border border-[#1B3B2B]/20 hover:border-[#1B3B2B] px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-lg cursor-pointer"
        >
          <span>View Full Menu</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300"
            aria-hidden
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>

      {/* Swiggy, Zomato & Dine-In Booking Conversion Banner */}
      <OrderAndDineBanner />
    </section>
  );
}
