"use client";

import { useState, useMemo } from "react";
import { useCafeState } from "@/context/CafeStateContext";
import { MenuItem, MenuCategory } from "@/data/cafeData";
import { VegIndicator } from "@/components/layout/TopNavbar";

type FilterTab = "bestsellers" | MenuCategory | "all";

const CATEGORY_TABS: { id: FilterTab; label: string }[] = [
  { id: "bestsellers", label: "Must-Try Bestsellers" },
  { id: "coffee", label: "Coffee & Beverages" },
  { id: "mains", label: "Pastas, Pizzas & Mains" },
  { id: "small-plates", label: "Soups & Small Plates" },
  { id: "desserts", label: "Desserts" },
];

function LeafMonogram({ name }: { name: string }) {
  const initial = name.charAt(0).toUpperCase();
  return (
    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl flex-shrink-0 bg-[#EDE8DF] flex flex-col items-center justify-center gap-1 border border-[#1B3B2B]/10">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z"
          fill="#1B3B2B"
          opacity="0.25"
        />
      </svg>
      <span className="text-lg font-bold text-[#1B3B2B]/40" style={{ fontFamily: "var(--font-serif)" }}>
        {initial}
      </span>
    </div>
  );
}

function MenuCard({
  item,
  isOwnerMode,
  toggleItemStock,
  updateItemPrice,
}: {
  item: MenuItem;
  isOwnerMode: boolean;
  toggleItemStock: (id: string) => void;
  updateItemPrice: (id: string, newPrice: number) => void;
}) {
  return (
    <div
      className={`bg-[#E9EFEA]/70 border border-[#1B3B2B]/10 rounded-2xl p-3.5 flex gap-4 items-start transition-opacity ${
        !item.inStock ? "opacity-70" : ""
      }`}
    >
      {/* Thumbnail */}
      {item.image ? (
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover flex-shrink-0"
        />
      ) : (
        <LeafMonogram name={item.name} />
      )}

      {/* Content */}
      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        {/* Name row */}
        <div className="flex items-start gap-2 flex-wrap">
          <VegIndicator className="mt-0.5" />
          <span className="font-semibold text-[#1B3B2B] text-sm leading-snug flex-1">
            {item.name}
          </span>
          <span className="font-bold text-[#1B3B2B] text-sm tabular-nums flex-shrink-0 ml-auto">
            &#x20B9;{item.price}
          </span>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5">
          {item.isBestseller && (
            <span className="inline-flex items-center gap-1 bg-[#C86446]/15 text-[#C86446] text-[11px] font-semibold px-2 py-0.5 rounded-full">
              Bestseller
            </span>
          )}
          {!item.inStock && (
            <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 text-[11px] font-semibold px-2 py-0.5 rounded-full">
              Sold Out Today
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-[#5A635D] leading-snug line-clamp-2">{item.description}</p>

        {/* Owner admin controls */}
        {isOwnerMode && (
          <div className="bg-[#F6F3EC] p-2 rounded-lg border border-[#C86446]/40 mt-2 flex items-center justify-between gap-2 flex-wrap">
            <button
              onClick={() => toggleItemStock(item.id)}
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
                item.inStock
                  ? "bg-[#E9EFEA] text-[#1B3B2B] border-[#1B3B2B]/20 hover:border-[#1B3B2B]/40"
                  : "bg-red-50 text-red-700 border-red-200 hover:border-red-300"
              }`}
            >
              {item.inStock ? "In Stock" : "Sold Out"}
            </button>

            <div className="flex items-center gap-1 text-xs text-[#5A635D] font-medium">
              <span className="text-[#1B3B2B] font-semibold">&#x20B9;</span>
              <input
                type="number"
                value={item.price}
                min={0}
                step={5}
                onChange={(e) => updateItemPrice(item.id, Number(e.target.value))}
                className="w-20 rounded-lg border border-[#1B3B2B]/20 bg-white text-[#1B3B2B] font-bold text-sm px-2 py-1 tabular-nums focus:outline-none focus:border-[#C86446]/60"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function InteractiveMenu() {
  const { menuItems, isOwnerMode, toggleItemStock, updateItemPrice } = useCafeState();
  const [activeTab, setActiveTab] = useState<FilterTab>("bestsellers");

  const filtered = useMemo(() => {
    let items = menuItems;
    if (activeTab === "bestsellers") items = items.filter((i) => i.isBestseller);
    else if (activeTab !== "all") items = items.filter((i) => i.category === activeTab);
    return items;
  }, [menuItems, activeTab]);

  return (
    <section id="menu" className="max-w-6xl mx-auto px-4 py-12">
      {/* Section header */}
      <div className="mb-6">
        <h2
          className="font-serif font-bold text-2xl sm:text-3xl text-[#1B3B2B] mb-1"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Crowd Favorites &amp; Daily Menu
        </h2>
        <p className="text-[#5A635D] text-sm sm:text-base">
          Start with the Mushroom Stroganoff, creamy pasta, or Margherita pizza&mdash;rated highest across
          600+ Google reviews.
        </p>
      </div>

      {/* Category pills row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {CATEGORY_TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-shrink-0 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full border transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === id
                ? "bg-[#1B3B2B] text-[#F6F3EC] border-[#1B3B2B]"
                : "bg-transparent text-[#5A635D] border-[#1B3B2B]/20 hover:border-[#1B3B2B]/40 hover:text-[#1B3B2B]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Dish grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center text-[#5A635D]">
          <p className="font-semibold text-[#1B3B2B] mb-1">No dishes match this filter</p>
          <p className="text-sm">Try switching to a different category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              isOwnerMode={isOwnerMode}
              toggleItemStock={toggleItemStock}
              updateItemPrice={updateItemPrice}
            />
          ))}
        </div>
      )}

      {/* Bottom banner */}
      <div className="mt-8 bg-[#EDE8DF] border border-[#1B3B2B]/10 rounded-2xl px-5 py-4 text-sm text-[#5A635D] leading-relaxed">
        <span className="font-semibold text-[#1B3B2B]">Want home delivery in Bhubaneswar?</span>{" "}
        Order via Swiggy or Zomato. Planning a group hangout? Reserve your table directly below with
        zero booking fees.
      </div>
    </section>
  );
}
