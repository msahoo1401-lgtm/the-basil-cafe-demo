"use client";

import { useCafeState } from "@/context/CafeStateContext";

export default function OwnerModeBar() {
  const { isOwnerMode, setIsOwnerMode, resetDemoData } = useCafeState();

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 z-50 flex flex-col items-start gap-2">
      {isOwnerMode && (
        <div className="bg-[#C86446]/10 border border-[#C86446]/30 text-[#C86446] text-xs font-medium px-3 py-1.5 rounded-xl max-w-[220px] leading-snug">
          Tap any dish to mark Sold Out or edit price
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOwnerMode((v) => !v)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-semibold shadow-lg border transition-all cursor-pointer ${
            isOwnerMode
              ? "bg-[#C86446] text-white border-[#C86446]/50 shadow-[#C86446]/25"
              : "bg-[#F6F3EC] text-[#1B3B2B] border-[#1B3B2B]/20 hover:border-[#1B3B2B]/40"
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="whitespace-nowrap">
            {isOwnerMode ? "Owner Admin Active" : "Customer View"}
          </span>
        </button>

        {isOwnerMode && (
          <button
            onClick={resetDemoData}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold bg-[#F6F3EC] text-[#5A635D] border border-[#1B3B2B]/15 hover:border-[#1B3B2B]/30 shadow-sm transition-all cursor-pointer"
          >
            Reset Demo
          </button>
        )}
      </div>
    </div>
  );
}
