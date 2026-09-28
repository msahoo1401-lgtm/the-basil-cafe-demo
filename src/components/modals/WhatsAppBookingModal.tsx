"use client";

import { useState } from "react";
import { useCafeState } from "@/context/CafeStateContext";
import { CAFE_INFO } from "@/data/cafeData";

export default function WhatsAppBookingModal() {
  const { bookingModalOpen, setBookingModalOpen, bookingPrefillNote } = useCafeState();

  const [dateSelection, setDateSelection] = useState<"today" | "tomorrow" | "custom">("today");
  const [customDate, setCustomDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Evening Coffee (4:30 PM)");
  const [partySize, setPartySize] = useState("2");
  const [withPet, setWithPet] = useState(false);
  const [privateDining, setPrivateDining] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [notes, setNotes] = useState(bookingPrefillNote || "");

  if (!bookingModalOpen) return null;

  function handleConfirmBooking(e: React.FormEvent) {
    e.preventDefault();

    const selectedDateStr =
      dateSelection === "today"
        ? "Today"
        : dateSelection === "tomorrow"
        ? "Tomorrow"
        : customDate || "Date TBD";

    let message = `Hello The Basil Cafe! I would like to reserve a table:\n\n`;
    if (guestName.trim()) {
      message += `Name: ${guestName.trim()}\n`;
    }
    message += `Date: ${selectedDateStr}\n`;
    message += `Time: ${timeSlot}\n`;
    message += `Party Size: ${partySize} Guests\n`;

    if (withPet) {
      message += `Note: Bringing a pet\n`;
    }
    if (privateDining) {
      message += `Request: Private Dining Area\n`;
    }
    if (notes.trim()) {
      message += `Additional Notes: ${notes.trim()}\n`;
    }

    const whatsappUrl = `https://wa.me/${CAFE_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setBookingModalOpen(false);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={() => setBookingModalOpen(false)}
    >
      <div
        className="bg-[#FAF7F2] w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#1B3B2B]/10 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6 pb-4 border-b border-[#1B3B2B]/10">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C86446] font-semibold">
              Table &amp; Group Booking
            </span>
            <h2
              className="text-2xl font-bold text-[#1B3B2B] mt-1"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Reserve at The Basil
            </h2>
          </div>
          <button
            onClick={() => setBookingModalOpen(false)}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-[#1B3B2B]/5 hover:bg-[#1B3B2B]/10 flex items-center justify-center text-[#1B3B2B] transition cursor-pointer border-none"
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
        </div>

        {/* Booking Form */}
        <form onSubmit={handleConfirmBooking} className="space-y-5">
          {/* Guest Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A635D] mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              placeholder="e.g. Priyadarshini Mishra"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#1B3B2B]/15 bg-white text-[#222623] text-sm focus:outline-none focus:border-[#1B3B2B]"
            />
          </div>

          {/* Date Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A635D] mb-1.5">
              Select Date
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setDateSelection("today")}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                  dateSelection === "today"
                    ? "bg-[#1B3B2B] text-[#F6F3EC] border-[#1B3B2B]"
                    : "bg-white text-[#222623] border-[#1B3B2B]/15 hover:border-[#1B3B2B]/30"
                }`}
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setDateSelection("tomorrow")}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                  dateSelection === "tomorrow"
                    ? "bg-[#1B3B2B] text-[#F6F3EC] border-[#1B3B2B]"
                    : "bg-white text-[#222623] border-[#1B3B2B]/15 hover:border-[#1B3B2B]/30"
                }`}
              >
                Tomorrow
              </button>
              <button
                type="button"
                onClick={() => setDateSelection("custom")}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                  dateSelection === "custom"
                    ? "bg-[#1B3B2B] text-[#F6F3EC] border-[#1B3B2B]"
                    : "bg-white text-[#222623] border-[#1B3B2B]/15 hover:border-[#1B3B2B]/30"
                }`}
              >
                Pick Date
              </button>
            </div>
            {dateSelection === "custom" && (
              <input
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className="mt-2 w-full px-4 py-2 rounded-xl border border-[#1B3B2B]/15 bg-white text-[#222623] text-sm focus:outline-none focus:border-[#1B3B2B]"
              />
            )}
          </div>

          {/* Time Slot */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A635D] mb-1.5">
              Time Slot
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                "Lunch (12:30 PM)",
                "Evening Coffee (4:30 PM)",
                "Dinner (8:00 PM)",
              ].map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTimeSlot(slot)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition cursor-pointer text-center ${
                    timeSlot === slot
                      ? "bg-[#1B3B2B] text-[#F6F3EC] border-[#1B3B2B]"
                      : "bg-white text-[#222623] border-[#1B3B2B]/15 hover:border-[#1B3B2B]/30"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Party Size */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A635D] mb-1.5">
              Party Size
            </label>
            <div className="grid grid-cols-4 gap-2">
              {["2", "3–4", "5–8", "8+ Group"].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setPartySize(size)}
                  className={`py-2 rounded-xl text-xs font-semibold border transition cursor-pointer text-center ${
                    partySize === size
                      ? "bg-[#1B3B2B] text-[#F6F3EC] border-[#1B3B2B]"
                      : "bg-white text-[#222623] border-[#1B3B2B]/15 hover:border-[#1B3B2B]/30"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Checkbox Preferences */}
          <div className="space-y-2 pt-1">
            <label className="flex items-center gap-2.5 text-xs text-[#222623] font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={withPet}
                onChange={(e) => setWithPet(e.target.checked)}
                className="w-4 h-4 rounded border-[#1B3B2B]/30 text-[#1B3B2B] focus:ring-0 cursor-pointer"
              />
              <span>Bringing a pet (we are pet-friendly)</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-[#222623] font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={privateDining}
                onChange={(e) => setPrivateDining(e.target.checked)}
                className="w-4 h-4 rounded border-[#1B3B2B]/30 text-[#1B3B2B] focus:ring-0 cursor-pointer"
              />
              <span>Private Dining / Birthday Enquiry</span>
            </label>
          </div>

          {/* Optional Notes */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A635D] mb-1.5">
              Special Requests (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Window seating preferred, high chair needed"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-[#1B3B2B]/15 bg-white text-[#222623] text-sm focus:outline-none focus:border-[#1B3B2B]"
            />
          </div>

          {/* Action button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#1B3B2B] hover:bg-[#2a543f] text-[#F6F3EC] py-3.5 rounded-full font-semibold text-sm transition flex items-center justify-center gap-2 shadow-sm cursor-pointer border-none"
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
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span>Confirm via WhatsApp</span>
            </button>
            <p className="text-[11px] text-center text-[#5A635D] mt-2">
              Direct booking with zero booking fees to +91 80184 91379
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
