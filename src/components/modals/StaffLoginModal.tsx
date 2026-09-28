"use client";

import { useState } from "react";
import { useCafeState } from "@/context/CafeStateContext";

export default function StaffLoginModal() {
  const { loginModalOpen, setLoginModalOpen, setIsOwnerMode } = useCafeState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!loginModalOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    const validEmails = ["admin@thebasilcafe.in", "owner@thebasilcafe.in"];
    const validPasswords = ["basil2026", "admin123"];

    if (validEmails.includes(cleanEmail) && validPasswords.includes(cleanPass)) {
      setError("");
      setIsOwnerMode(true);
      setLoginModalOpen(false);
      setEmail("");
      setPassword("");
    } else {
      setError("Invalid credentials. Use demo access: admin@thebasilcafe.in / basil2026");
    }
  }

  function handleAutoFill() {
    setEmail("admin@thebasilcafe.in");
    setPassword("basil2026");
    setError("");
    setIsOwnerMode(true);
    setLoginModalOpen(false);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={() => setLoginModalOpen(false)}
    >
      <div
        className="bg-[#FAF7F2] border border-[#1B3B2B]/15 rounded-3xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setLoginModalOpen(false)}
          aria-label="Close login modal"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#1B3B2B]/5 hover:bg-[#1B3B2B]/10 flex items-center justify-center text-[#1B3B2B] transition cursor-pointer border-none"
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
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-[#1B3B2B]/15 bg-[#84BE38] shadow-sm">
            <img
              src="/images/logo.jpg"
              alt="The Basil Cafe & Restro"
              className="w-full h-full object-cover scale-[1.05]"
            />
          </div>
          <div>
            <h2
              className="text-xl sm:text-2xl font-bold text-[#1B3B2B] leading-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Staff Portal Login
            </h2>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#C86446]">
              Management Access
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#5A635D] leading-relaxed mb-6">
          Authorized access for The Basil Cafe management to update live menu items, stock, pricing, and tags.
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A635D] mb-1.5">
              Staff Email
            </label>
            <input
              type="email"
              required
              placeholder="admin@thebasilcafe.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#1B3B2B]/20 bg-white text-[#222623] text-sm focus:outline-none focus:border-[#1B3B2B]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A635D] mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#1B3B2B]/20 bg-white text-[#222623] text-sm focus:outline-none focus:border-[#1B3B2B]"
            />
          </div>

          {error && (
            <p className="text-xs text-red-700 bg-red-50 p-2.5 rounded-xl border border-red-200">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#1B3B2B] text-[#F6F3EC] py-3.5 rounded-full font-semibold text-sm hover:bg-[#2a543f] transition shadow-sm cursor-pointer border-none mt-2"
          >
            Unlock Staff Controls
          </button>
        </form>

        {/* Pitch Demo Helper Box */}
        <div className="bg-[#E9EFEA] p-3.5 rounded-2xl mt-5 flex items-center justify-between text-xs text-[#1B3B2B] border border-[#1B3B2B]/10">
          <div>
            <span className="font-semibold block">Demo Pitch Access</span>
            <span className="text-[#5A635D] text-[11px]">admin@thebasilcafe.in / basil2026</span>
          </div>
          <button
            type="button"
            onClick={handleAutoFill}
            className="bg-[#1B3B2B] text-white hover:bg-[#2a543f] px-3 py-1.5 rounded-lg font-semibold text-[11px] transition cursor-pointer border-none shadow-sm whitespace-nowrap ml-2"
          >
            Auto-Fill &amp; Login
          </button>
        </div>
      </div>
    </div>
  );
}
