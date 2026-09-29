"use client";

interface BrandWordmarkProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function BrandWordmark({
  variant = "dark",
  className = "h-8 sm:h-9 w-auto",
}: BrandWordmarkProps) {
  const filterClass =
    variant === "light"
      ? "brightness-0 invert opacity-95"
      : "brightness-[0.45] contrast-125";

  return (
    <img
      src="/images/the branding text.png"
      alt="The Basil Cafe & Restro"
      className={`object-contain select-none transition-all duration-300 ${filterClass} ${className}`}
    />
  );
}
