"use client";

import { useCafeState } from "@/context/CafeStateContext";

export default function StaffAdminBar() {
  const { isOwnerMode, logoutOwnerMode, resetDemoData, setAddDishModalOpen } = useCafeState();

  if (!isOwnerMode) return null;

  return (
    <div className="sticky top-0 z-50 bg-[#1B3B2B] text-[#F6F3EC] px-4 py-2.5 shadow-md flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm border-b border-[#F6F3EC]/20">
      {/* Left indicator */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#84BE38] animate-pulse" />
        <span className="font-semibold tracking-wide">
          Staff Mode Active: Live Menu &amp; Tag Editor Enabled
        </span>
      </div>

      {/* Right Action buttons */}
      <div className="flex items-center gap-2 ml-auto">
        <button
          onClick={() => setAddDishModalOpen(true)}
          className="bg-[#C86446] hover:bg-[#b55539] text-white px-3.5 py-1.5 rounded-full font-semibold transition cursor-pointer border-none shadow-sm flex items-center gap-1.5"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Add New Dish</span>
        </button>

        <button
          onClick={resetDemoData}
          className="bg-white/10 hover:bg-white/20 text-[#F6F3EC] px-3 py-1.5 rounded-full font-medium transition cursor-pointer border border-white/20"
        >
          Reset Demo
        </button>

        <button
          onClick={logoutOwnerMode}
          className="bg-red-500/20 hover:bg-red-500/30 text-red-200 px-3 py-1.5 rounded-full font-medium transition cursor-pointer border border-red-400/30 flex items-center gap-1"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>Lock Portal</span>
        </button>
      </div>
    </div>
  );
}
