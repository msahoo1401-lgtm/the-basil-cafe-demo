"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useCafeState } from "@/context/CafeStateContext";
import { MenuCategory } from "@/data/cafeData";
import WhatsAppBookingModal from "@/components/modals/WhatsAppBookingModal";

type FilterTab = "all" | MenuCategory | "coffee-beverages" | "mains" | "small-plates" | "desserts";

const FILTER_TABS: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All Items" },
  { id: "coffee-beverages", label: "Coffee & Beverages" },
  { id: "mains", label: "Pastas, Pizzas & Mains" },
  { id: "small-plates", label: "Small Plates" },
  { id: "desserts", label: "Desserts" },
];

export default function MenuPage() {
  const {
    menuItems,
    isOwnerMode,
    setIsOwnerMode,
    toggleItemStock,
    updateItemPrice,
    setBookingModalOpen,
  } = useCafeState();

  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [veganOnly, setVeganOnly] = useState(false);

  const filteredItems = useMemo(() => {
    let items = menuItems;
    if (activeTab === "coffee-beverages") {
      items = items.filter((i) => i.category === "coffee" || i.category === "beverages");
    } else if (activeTab !== "all") {
      items = items.filter((i) => i.category === activeTab);
    }
    if (veganOnly) {
      items = items.filter((i) => i.isVegan);
    }
    return items;
  }, [menuItems, activeTab, veganOnly]);

  return (
    <div className="min-h-screen bg-[#F6F3EC] pb-24 text-[#222623]">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#F6F3EC]/90 backdrop-blur-md border-b border-[#1B3B2B]/10">
        <div className="max-w-6xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B3B2B] hover:text-[#C86446] transition"
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
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back to Home</span>
          </Link>

          <div className="text-center">
            <h1
              className="text-lg sm:text-xl font-bold text-[#1B3B2B] leading-none"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              The Basil
            </h1>
            <span className="text-[10px] tracking-widest text-[#5A635D] uppercase font-semibold">
              Digital Menu
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOwnerMode((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${
                isOwnerMode
                  ? "bg-[#C86446] text-white border-[#C86446]"
                  : "bg-white text-[#1B3B2B] border-[#1B3B2B]/20 hover:border-[#1B3B2B]/40"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3 h-3"
                aria-hidden
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="hidden sm:inline">
                {isOwnerMode ? "Owner Editing Active" : "Staff Portal"}
              </span>
            </button>
            <button
              onClick={() => setBookingModalOpen(true)}
              className="bg-[#1B3B2B] text-[#F6F3EC] hover:bg-[#2a543f] text-xs font-semibold px-4 py-2 rounded-full transition cursor-pointer border-none"
            >
              Reserve
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 pt-8 md:pt-12">
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C86446] font-semibold mb-2">
            100% Pure Vegetarian &amp; Vegan Kitchen
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold text-[#1B3B2B] mb-3"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Freshly Prepared Everyday
          </h2>
          <p className="text-sm text-[#5A635D] leading-relaxed">
            All dishes are prepared fresh to order in our Kalinganagar kitchen. Inform our staff if
            you have specific dietary restrictions or milk preferences.
          </p>
        </div>

        {/* Live Admin Banner */}
        {isOwnerMode && (
          <div className="mb-8 p-3 rounded-xl bg-[#C86446]/10 border border-[#C86446]/30 text-[#C86446] text-xs sm:text-sm font-medium text-center">
            Staff Portal Active: Click &ldquo;In Stock / Sold Out&rdquo; or edit price directly on any card below to simulate live menu updates.
          </div>
        )}

        {/* Filter Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full border transition cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#1B3B2B] text-[#F6F3EC] border-[#1B3B2B]"
                  : "bg-white text-[#5A635D] border-[#1B3B2B]/15 hover:border-[#1B3B2B]/35 hover:text-[#1B3B2B]"
              }`}
            >
              {tab.label}
            </button>
          ))}

          {/* Vegan Only Toggle */}
          <button
            onClick={() => setVeganOnly((prev) => !prev)}
            className={`flex-shrink-0 ml-auto text-xs sm:text-sm font-semibold px-4 py-2 rounded-full border transition cursor-pointer whitespace-nowrap ${
              veganOnly
                ? "bg-[#1B3B2B] text-[#F6F3EC] border-[#1B3B2B]"
                : "bg-white text-[#5A635D] border-[#1B3B2B]/15 hover:border-[#1B3B2B]/35 hover:text-[#1B3B2B]"
            }`}
          >
            Vegan Only
          </button>
        </div>

        {/* Boxed Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 text-[#5A635D]">
            <p className="font-semibold text-lg text-[#1B3B2B] mb-1">No items match this filter</p>
            <p className="text-sm">Try choosing another category or unchecking Vegan Only.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#FAF7F2] rounded-2xl overflow-hidden shadow-sm border border-[#1B3B2B]/10 flex flex-col hover:shadow-md transition duration-300 group"
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
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#EDE8DF] text-[#1B3B2B]/30">
                      <span
                        className="text-4xl font-bold"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {item.name.charAt(0)}
                      </span>
                    </div>
                  )}

                  {!item.inStock && (
                    <div className="absolute top-3 right-3 bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-red-200 shadow-sm">
                      Sold Out Today
                    </div>
                  )}

                  {item.isBestseller && item.inStock && (
                    <div className="absolute top-3 left-3 bg-[#C86446]/90 text-white text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full shadow-sm">
                      Bestseller
                    </div>
                  )}
                  {item.isVegan && (
                    <div
                      className={`absolute ${
                        item.isBestseller && item.inStock ? "top-9 left-3" : "top-3 left-3"
                      } bg-[#E9EFEA]/90 backdrop-blur-sm text-[#1B3B2B] text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border border-[#1B3B2B]/10`}
                    >
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
        )}

        {/* Footer Order Note */}
        <div className="mt-12 p-6 rounded-2xl bg-[#EDE8DF] border border-[#1B3B2B]/10 text-center text-sm text-[#5A635D]">
          <p className="font-semibold text-[#1B3B2B] mb-1">
            Looking for home delivery or table reservations?
          </p>
          <p>
            Find us on Swiggy and Zomato in Bhubaneswar, or reserve your table directly via WhatsApp with zero booking fees.
          </p>
        </div>
      </main>

      <WhatsAppBookingModal />
    </div>
  );
}
