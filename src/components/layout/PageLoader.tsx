"use client";

import { useEffect, useState } from "react";
import BrandWordmark from "./BrandWordmark";

export default function PageLoader() {
  const [isSliding, setIsSliding] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);

  useEffect(() => {
    // 0.9s presentation duration before curtain slide
    const slideTimer = setTimeout(() => {
      setIsSliding(true);
    }, 900);

    // After slide transition (700ms duration), remove from DOM
    const unmountTimer = setTimeout(() => {
      setIsUnmounted(true);
    }, 1650);

    return () => {
      clearTimeout(slideTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (isUnmounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 w-screen h-screen z-[9999] bg-[#1B3B2B] flex flex-col items-center justify-center transition-all duration-700 ease-in-out select-none ${
        isSliding
          ? "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100"
      }`}
    >
      {/* Pulsing circular brand emblem */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden flex-shrink-0 border border-[#F6F3EC]/20 shadow-2xl bg-[#84BE38] animate-pulse">
        <img
          src="/images/brand_icon.png"
          alt="The Basil Cafe & Restro"
          className="w-full h-full object-cover scale-[1.05]"
        />
      </div>

      {/* Brand title & location */}
      <div className="mt-5 flex flex-col items-center text-center">
        <BrandWordmark variant="light" className="h-9 sm:h-12 w-auto mb-2" />
        <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#F6F3EC]/80 font-medium font-sans">
          KALINGANAGAR &bull; BHUBANESWAR
        </p>
      </div>
    </div>
  );
}
