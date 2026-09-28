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
      ? "invert hue-rotate-180 mix-blend-screen brightness-110 contrast-125"
      : "mix-blend-multiply brightness-[0.45] contrast-125";

  return (
    <img
      src="/images/the branding text.png"
      alt="The Basil Cafe & Restro"
      className={`object-contain select-none transition-all duration-300 ${filterClass} ${className}`}
    />
  );
}
