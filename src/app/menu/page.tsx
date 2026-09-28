"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useCafeState } from "@/context/CafeStateContext";
import { MenuItem, MenuCategory } from "@/data/cafeData";
import WhatsAppBookingModal from "@/components/modals/WhatsAppBookingModal";
import BlurredFooter from "@/components/layout/BlurredFooter";

type FilterTab = "all" | MenuCategory | "coffee-beverages" | "mains" | "small-plates" | "desserts";

const FILTER_TABS: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All Items" },
  { id: "coffee-beverages", label: "Coffee & Beverages" },
  { id: "mains", label: "Pastas, Pizzas & Mains" },
  { id: "small-plates", label: "Small Plates" },
  { id: "desserts", label: "Desserts" },
];

function PushMenuCard({
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
    <div className="w-[270px] sm:w-[300px] hover:w-[340px] sm:hover:w-[380px] flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-xl bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#1B3B2B]/10 cursor-pointer flex flex-col group">
      {/* 1. Top Image */}
      <div className="h-48 sm:h-52 w-full overflow-hidden bg-[#E9EFEA] relative flex-shrink-0">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#EDE8DF] text-[#1B3B2B]/35">
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
      <div className="flex flex-col flex-1 p-4 pb-5 text-center">
        {/* Dish Name */}
        <h3
          className="text-lg md:text-xl font-bold text-[#1B3B2B] text-center mt-1 mb-1.5 leading-snug line-clamp-1"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {item.name}
        </h3>

        {/* Short 1–2 line real ingredient description */}
        <p className="text-xs sm:text-sm text-[#5A635D] text-center line-clamp-2 px-2 mb-3 leading-relaxed">
          {item.description}
        </p>

        {/* Price centered at the bottom */}
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
  );
}

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

  const categoriesToRender = useMemo(() => {
    const cats: { id: string; title: string; subtitle: string; filter: (item: MenuItem) => boolean }[] = [
      {
        id: "coffee-beverages",
        title: "Specialty Coffee & Botanical Brews",
        subtitle: "18-hour cold brew, Chikmagalur espresso, Belgian hot chocolate, and flower teas",
        filter: (i) => i.category === "coffee" || i.category === "beverages",
      },
      {
        id: "mains",
        title: "Pastas, Wood-Fired Pizzas & Mains",
        subtitle: "Slow-simmered mushroom sauces, hand-stretched crusts, and warm herb rice",
        filter: (i) => i.category === "mains",
      },
      {
        id: "small-plates",
        title: "Small Plates & Quick Bites",
        subtitle: "Crispy skin-on fries, grilled multigrain sandwiches, garlic bread, and maki",
        filter: (i) => i.category === "small-plates",
      },
      {
        id: "desserts",
        title: "Artisanal Desserts",
        subtitle: "Belgian dark chocolate walnut brownies with Madagascar vanilla gelato",
        filter: (i) => i.category === "desserts",
      },
    ];

    if (activeTab === "all") {
      return cats;
    }
    return cats.filter((c) => c.id === activeTab);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#F6F3EC] text-[#222623]">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#F6F3EC]/90 backdrop-blur-md border-b border-[#1B3B2B]/10">
        <div className="max-w-6xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B3B2B] hover:text-[#C86446] transition group"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
              aria-hidden
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span className="hidden sm:inline">Back to Home</span>
          </Link>

          {/* Logo & Brand in Header */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-[#1B3B2B]/15 bg-[#84BE38]">
              <img
                src="/images/logo.jpg"
                alt="The Basil"
                className="w-full h-full object-cover scale-[1.05]"
              />
            </div>
            <div className="flex flex-col text-center sm:text-left">
              <span
                className="text-base sm:text-lg font-bold text-[#1B3B2B] leading-none"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                The Basil
              </span>
              <span className="text-[9px] tracking-widest text-[#5A635D] uppercase font-semibold">
                Digital Menu
              </span>
            </div>
          </Link>

          {/* Right Header Buttons */}
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
                className="w-3.5 h-3.5"
                aria-hidden
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>{isOwnerMode ? "Owner Active" : "Staff Portal"}</span>
            </button>
            <button
              onClick={() => setBookingModalOpen(true)}
              className="bg-[#1B3B2B] text-[#F6F3EC] hover:bg-[#2a543f] text-xs font-semibold px-4 py-2 rounded-full transition cursor-pointer border-none shadow-sm"
            >
              Reserve
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 pt-8 md:pt-12 pb-24">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C86446] font-semibold mb-2">
            100% PURE VEGETARIAN &amp; VEGAN KITCHEN
          </p>
          <h1
            className="text-3xl md:text-5xl font-bold text-[#1B3B2B] mb-3"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Freshly Prepared Everyday
          </h1>
          <p className="text-sm text-[#5A635D] leading-relaxed">
            Hover over any dish to see adjacent cards push aside. All 14 items are prepared fresh to order in our Kalinganagar kitchen.
          </p>
        </div>

        {/* Live Admin Notification */}
        {isOwnerMode && (
          <div className="mb-8 p-3 rounded-2xl bg-[#C86446]/10 border border-[#C86446]/30 text-[#C86446] text-xs sm:text-sm font-medium text-center">
            Staff Portal Active: Click &ldquo;In Stock / Sold Out&rdquo; or edit price directly on any card below to simulate live menu updates.
          </div>
        )}

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-10 scrollbar-none">
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

        {/* Category Sections with Flex-Push Hover Rows */}
        <div className="space-y-12">
          {categoriesToRender.map((category) => {
            let catItems = menuItems.filter(category.filter);
            if (veganOnly) {
              catItems = catItems.filter((i) => i.isVegan);
            }

            if (catItems.length === 0) return null;

            return (
              <section key={category.id} className="pt-2">
                <div className="mb-4">
                  <h2
                    className="text-xl sm:text-2xl font-bold text-[#1B3B2B]"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {category.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5A635D] mt-0.5">
                    {category.subtitle}
                  </p>
                </div>

                {/* Flex row with push hover effect */}
                <div className="flex items-stretch gap-5 overflow-x-auto py-4 px-2 scrollbar-none">
                  {catItems.map((item) => (
                    <PushMenuCard
                      key={item.id}
                      item={item}
                      isOwnerMode={isOwnerMode}
                      toggleItemStock={toggleItemStock}
                      updateItemPrice={updateItemPrice}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Footer Order Note */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-[#EDE8DF] border border-[#1B3B2B]/10 text-center text-sm text-[#5A635D] max-w-2xl mx-auto">
          <p className="font-semibold text-base text-[#1B3B2B] mb-2">
            Home Delivery or Table Booking
          </p>
          <p className="leading-relaxed mb-4">
            Find The Basil Cafe &amp; Restro on Swiggy and Zomato in Bhubaneswar, or reserve your table directly via WhatsApp with zero booking fees.
          </p>
          <button
            onClick={() => setBookingModalOpen(true)}
            className="inline-flex items-center bg-[#1B3B2B] text-[#F6F3EC] hover:bg-[#2a543f] px-6 py-2.5 rounded-full text-xs font-semibold transition"
          >
            Book Table via WhatsApp
          </button>
        </div>
      </main>

      <BlurredFooter />
      <WhatsAppBookingModal />
    </div>
  );
}
