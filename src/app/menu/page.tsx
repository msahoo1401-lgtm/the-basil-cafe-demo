"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useCafeState } from "@/context/CafeStateContext";
import { MenuItem, MenuCategory } from "@/data/cafeData";
import WhatsAppBookingModal from "@/components/modals/WhatsAppBookingModal";
import StaffLoginModal from "@/components/modals/StaffLoginModal";
import AddDishModal from "@/components/modals/AddDishModal";
import StaffAdminBar from "@/components/layout/StaffAdminBar";
import BlurredFooter from "@/components/layout/BlurredFooter";
import OrderAndDineBanner from "@/components/sections/OrderAndDineBanner";
import BrandWordmark from "@/components/layout/BrandWordmark";

type FilterTab = "all" | MenuCategory | "coffee-beverages" | "mains" | "small-plates" | "desserts";

const FILTER_TABS: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All Items" },
  { id: "coffee-beverages", label: "Coffee & Beverages" },
  { id: "mains", label: "Pastas, Pizzas & Mains" },
  { id: "small-plates", label: "Small Plates" },
  { id: "desserts", label: "Desserts" },
];

const PRESET_TAGS = ["Bestseller", "Most Liked", "Chef's Special", "Vegan"];

function PushMenuCard({
  item,
  isOwnerMode,
  toggleItemStock,
  updateItemPrice,
  removeMenuItem,
  toggleItemTag,
  addCustomTag,
}: {
  item: MenuItem;
  isOwnerMode: boolean;
  toggleItemStock: (id: string) => void;
  updateItemPrice: (id: string, newPrice: number) => void;
  removeMenuItem: (id: string) => void;
  toggleItemTag: (id: string, tag: string) => void;
  addCustomTag: (id: string, customTag: string) => void;
}) {
  const [customTagInput, setCustomTagInput] = useState("");
  const itemTags = item.tags || [];

  function handleAddTag() {
    if (customTagInput.trim()) {
      addCustomTag(item.id, customTagInput.trim());
      setCustomTagInput("");
    }
  }

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
          <div className="absolute top-3 right-3 bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-red-200 shadow-sm z-10">
            Sold Out Today
          </div>
        )}

        {/* Refined Tag Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1 max-w-[75%] z-10">
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

        {/* Expanded Staff Editor Panel */}
        {isOwnerMode && (
          <div
            className="mt-3 pt-3 border-t border-[#1B3B2B]/15 flex flex-col gap-2.5 text-xs text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 1. Stock & Price Row + Delete Dish */}
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

            {/* 2. Tag Preset Quick-Toggles */}
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

            {/* 3. Active Custom Tags with remove button & Inline Add Input */}
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
                placeholder="+ Add custom tag..."
                value={customTagInput}
                onChange={(e) => setCustomTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                className="flex-1 px-2 py-1 rounded-lg border border-[#1B3B2B]/20 bg-white text-xs text-[#222623] focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddTag}
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
}

export default function MenuPage() {
  const {
    menuItems,
    isOwnerMode,
    toggleItemStock,
    updateItemPrice,
    removeMenuItem,
    toggleItemTag,
    addCustomTag,
    setAddDishModalOpen,
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
        subtitle: "Slow-simmered mushroom sauces, hand-stretched crusts, and warm parsley rice",
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
      {/* Sticky Staff Admin Bar when logged in */}
      <StaffAdminBar />

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#F6F3EC]/90 backdrop-blur-md border-b border-[#1B3B2B]/10">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 h-14 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Interactive pill Back to Home button with animated chevron */}
          <Link
            href="/"
            className="group inline-flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-full border border-[#1B3B2B]/15 bg-white/70 hover:bg-white text-xs sm:text-sm font-semibold text-[#1B3B2B] hover:text-[#C86446] transition-all shadow-sm flex-shrink-0 whitespace-nowrap"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:-translate-x-1 transition-transform duration-300"
              aria-hidden
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </Link>

          {/* Center: Circular emblem logo paired with BrandWordmark */}
          <Link href="/" className="flex items-center gap-1.5 sm:gap-3 group flex-shrink-0">
            <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0 border border-[#1B3B2B]/15 bg-[#84BE38] shadow-sm group-hover:scale-105 transition-transform duration-300">
              <img
                src="/images/brand_icon.png"
                alt="The Basil Cafe & Restro"
                className="w-full h-full object-cover scale-[1.05]"
              />
            </div>
            <BrandWordmark
              variant="dark"
              className="h-6 sm:h-10 w-auto max-w-[100px] sm:max-w-[160px] object-contain"
            />
          </Link>

          {/* Right: Table Reservation CTA */}
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={() => setBookingModalOpen(true)}
              className="bg-[#1B3B2B] text-[#F6F3EC] hover:bg-[#2a543f] text-xs sm:text-sm font-semibold px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full transition cursor-pointer border-none shadow-sm whitespace-nowrap"
            >
              Reserve
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 pt-8 md:pt-12 pb-24">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-6">
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
            Hover over any dish to see adjacent cards push aside. All items are prepared fresh to order in our Kalinganagar kitchen.
          </p>

          {/* Add New Menu Item button when staff logged in */}
          {isOwnerMode && (
            <div className="mt-5">
              <button
                onClick={() => setAddDishModalOpen(true)}
                className="inline-flex items-center gap-2 bg-[#C86446] hover:bg-[#b55539] text-white px-6 py-2.5 rounded-full text-xs font-semibold shadow-sm transition cursor-pointer border-none"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span>+ Add New Menu Item</span>
              </button>
            </div>
          )}
        </div>

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
                      removeMenuItem={removeMenuItem}
                      toggleItemTag={toggleItemTag}
                      addCustomTag={addCustomTag}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Reusable Swiggy, Zomato & Dine-In Booking Banner */}
        <OrderAndDineBanner />
      </main>

      <BlurredFooter />
      <WhatsAppBookingModal />
      <StaffLoginModal />
      <AddDishModal />
    </div>
  );
}
