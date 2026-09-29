"use client";

import { useState } from "react";
import { useCafeState } from "@/context/CafeStateContext";
import { MenuCategory } from "@/data/cafeData";

const PRESET_IMAGES = [
  { label: "Cappuccino", path: "/images/foodings/cappuccino coffee.jpg" },
  { label: "Margherita Pizza", path: "/images/foodings/margherita pizza.jpg" },
  { label: "Mushroom Pasta", path: "/images/foodings/mushroom creamy pasta.jpg" },
  { label: "Mushroom Stroganoff", path: "/images/foodings/Mushroom Stroganoff.jpg" },
  { label: "French Fries", path: "/images/foodings/french fries.jpg" },
  { label: "Veg Sandwich", path: "/images/foodings/sandwich.jpg" },
  { label: "Tofu Maki", path: "/images/foodings/tofu tanuki umaki.jpg" },
  { label: "Cold Brew Glass", path: "/images/foodings/coffee.png" },
  { label: "Belgian Chocolate", path: "/images/foodings/meal.png" },
];

const PRESET_TAG_OPTIONS = ["Bestseller", "Most Liked", "Chef's Special", "New"];

export default function AddDishModal() {
  const { addDishModalOpen, setAddDishModalOpen, addMenuItem } = useCafeState();

  const [name, setName] = useState("");
  const [category, setCategory] = useState<MenuCategory>("mains");
  const [price, setPrice] = useState<number | "">(260);
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("/images/foodings/margherita pizza.jpg");
  const [selectedTags, setSelectedTags] = useState<string[]>(["Bestseller"]);
  const [customTagInput, setCustomTagInput] = useState("");

  if (!addDishModalOpen) return null;

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function handleAddCustomTag() {
    const trimmed = customTagInput.trim();
    if (trimmed && !selectedTags.includes(trimmed)) {
      setSelectedTags((prev) => [...prev, trimmed]);
      setCustomTagInput("");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    const numPrice = typeof price === "number" ? price : Number(price) || 0;

    addMenuItem({
      name: name.trim(),
      category,
      price: numPrice,
      description: description.trim() || "Freshly prepared in our Kalinganagar kitchen.",
      image: imagePreview,
      isBestseller: selectedTags.includes("Bestseller"),
      inStock: true,
      tags: selectedTags,
    });

    // Reset & close
    setName("");
    setDescription("");
    setPrice(260);
    setSelectedTags(["Bestseller"]);
    setAddDishModalOpen(false);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={() => setAddDishModalOpen(false)}
    >
      <div
        className="bg-[#FAF7F2] border border-[#1B3B2B]/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setAddDishModalOpen(false)}
          aria-label="Close modal"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#1B3B2B]/5 hover:bg-[#1B3B2B]/10 flex items-center justify-center text-[#1B3B2B] transition cursor-pointer border-none"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6">
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#C86446]">
            Staff Menu Management
          </span>
          <h2
            className="text-2xl font-bold text-[#1B3B2B] mt-1"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Add New Menu Item
          </h2>
          <p className="text-xs text-[#5A635D] mt-1">
            Publish a new dish to the live digital menu and homepage specials.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Dish Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A635D] mb-1">
              Dish Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Truffle Mushroom Risotto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#1B3B2B]/20 bg-white text-[#222623] text-sm focus:outline-none focus:border-[#1B3B2B]"
            />
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A635D] mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MenuCategory)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#1B3B2B]/20 bg-white text-[#222623] text-sm focus:outline-none focus:border-[#1B3B2B]"
              >
                <option value="mains">Pastas, Pizzas &amp; Mains</option>
                <option value="coffee">Coffee</option>
                <option value="beverages">Beverages</option>
                <option value="small-plates">Small Plates</option>
                <option value="desserts">Desserts</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A635D] mb-1">
                Price (&#x20B9;) *
              </label>
              <input
                type="number"
                required
                min={0}
                step={5}
                value={price}
                onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")}
                className="w-full px-4 py-2.5 rounded-xl border border-[#1B3B2B]/20 bg-white text-[#222623] text-sm font-semibold tabular-nums focus:outline-none focus:border-[#1B3B2B]"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A635D] mb-1">
              Short Description (1&ndash;2 lines)
            </label>
            <textarea
              rows={2}
              placeholder="Fresh ingredients, house reduction, and seasoning..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-[#1B3B2B]/20 bg-white text-[#222623] text-sm focus:outline-none focus:border-[#1B3B2B]"
            />
          </div>

          {/* Image Selection / Upload */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A635D] mb-1.5">
              Dish Image
            </label>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#E9EFEA] border border-[#1B3B2B]/15 flex-shrink-0">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-[#5A635D]">
                    No image
                  </div>
                )}
              </div>
              <div className="flex-1">
                <label className="inline-block bg-white hover:bg-[#E9EFEA] text-[#1B3B2B] border border-[#1B3B2B]/20 px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition shadow-sm mb-1">
                  Upload Photo from Device
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-[11px] text-[#5A635D]">
                  Supports JPG, PNG, WebP via camera or gallery.
                </p>
              </div>
            </div>

            {/* Quick preset selection */}
            <p className="text-[11px] font-semibold text-[#5A635D] mb-1.5">
              Or pick from cafe kitchen library:
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {PRESET_IMAGES.map((img) => (
                <button
                  type="button"
                  key={img.path}
                  onClick={() => setImagePreview(img.path)}
                  className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-medium border transition cursor-pointer ${
                    imagePreview === img.path
                      ? "bg-[#1B3B2B] text-white border-[#1B3B2B]"
                      : "bg-white text-[#222623] border-[#1B3B2B]/15 hover:border-[#1B3B2B]/35"
                  }`}
                >
                  {img.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tags Manager */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A635D] mb-1.5">
              Initial Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {PRESET_TAG_OPTIONS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border transition cursor-pointer ${
                      isSelected
                        ? tag === "Bestseller"
                          ? "bg-[#C86446] text-white border-[#C86446]"
                          : tag === "Most Liked"
                          ? "bg-[#1B3B2B] text-white border-[#1B3B2B]"
                          : "bg-[#84BE38] text-[#1B3B2B] border-[#84BE38]"
                        : "bg-white text-[#5A635D] border-[#1B3B2B]/20 hover:border-[#1B3B2B]/40"
                    }`}
                  >
                    {isSelected ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3">
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

            {/* Custom Tag Input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add custom tag (e.g. Seasonal, Must Try)..."
                value={customTagInput}
                onChange={(e) => setCustomTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCustomTag();
                  }
                }}
                className="flex-1 px-3 py-1.5 rounded-xl border border-[#1B3B2B]/20 bg-white text-[#222623] text-xs focus:outline-none focus:border-[#1B3B2B]"
              />
              <button
                type="button"
                onClick={handleAddCustomTag}
                className="bg-[#1B3B2B] text-white px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-[#2a543f] transition cursor-pointer border-none"
              >
                Add
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full bg-[#1B3B2B] hover:bg-[#2a543f] text-[#F6F3EC] py-3.5 rounded-full font-semibold text-sm transition shadow-sm cursor-pointer border-none"
            >
              Add to Menu Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
