"use client";

import { useState, useRef } from "react";

function GoldStar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="#F59E0B" className={`w-5 h-5 ${className}`} aria-hidden>
      <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.92 5.33L10 13.28l-4.78 2.44.92-5.33L2.27 6.62l5.34-.78L10 1z" />
    </svg>
  );
}

function FiveStars({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-0.5 ${className}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <GoldStar key={i} />
      ))}
    </div>
  );
}

function GoogleGIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`w-6 h-6 ${className}`} aria-label="Google">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function GoogleWordmark() {
  return (
    <span className="text-sm font-medium tracking-tight">
      <span className="text-[#4285F4]">G</span>
      <span className="text-[#EA4335]">o</span>
      <span className="text-[#FBBC05]">o</span>
      <span className="text-[#4285F4]">g</span>
      <span className="text-[#34A853]">l</span>
      <span className="text-[#EA4335]">e</span>
    </span>
  );
}

interface ReviewData {
  author: string;
  initial: string;
  avatarColor: string;
  timeAgo: string;
  text: string;
}

const REVIEWS: ReviewData[] = [
  {
    author: "Aniket Mohapatra",
    initial: "A",
    avatarColor: "#C86446",
    timeAgo: "2 weeks ago",
    text: "I usually avoid pure-veg cafes, but the Mushroom Stroganoff here changed my mind completely. The sauce is properly reduced and seasoned without feeling heavy. My friend ordered the creamy mushroom pasta and both plates arrived steaming hot.",
  },
  {
    author: "Priyadarshini Mishra",
    initial: "P",
    avatarColor: "#1B3B2B",
    timeAgo: "2 months ago",
    text: "Celebrated my sister\u2019s 25th birthday with 8 family members in the private dining nook. The wood-fired Margherita pizza was a table favorite \u2014 crispy base with proper char marks. Hot chocolate was rich and not overly sweet.",
  },
  {
    author: "Debasish Rout",
    initial: "D",
    avatarColor: "#4A7B6F",
    timeAgo: "3 weeks ago",
    text: "Came primarily to meet Radha and Rani. They are the gentlest cafe dogs. The space is spotless and smells like fresh espresso and basil rather than animals. Huge windows with plenty of morning sunlight throughout the first floor.",
  },
  {
    author: "Sneha Pattnaik",
    initial: "S",
    avatarColor: "#8B6E4E",
    timeAgo: "1 month ago",
    text: "Spent three hours here working on college assignments. The Wi-Fi is consistently fast, there are wall charging points next to the window tables, and nobody rushes you. Great cold brew and a peaceful book corner.",
  },
  {
    author: "Ritika Sen",
    initial: "R",
    avatarColor: "#5A635D",
    timeAgo: "1 week ago",
    text: "Their cappuccino has proper micro-foam density and the espresso comes through strong. The cold brew is steeped well \u2014 you can tell they use quality Chikmagalur beans. I come here most Saturday mornings for the window seat and a double shot.",
  },
];

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);

  function next() {
    setCurrentIndex((i) => (i + 1) % REVIEWS.length);
  }

  function prev() {
    setCurrentIndex((i) => (i - 1 + REVIEWS.length) % REVIEWS.length);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  }

  const review = REVIEWS[currentIndex];

  return (
    <section className="max-w-5xl mx-auto px-4 py-16 md:py-24">
      <h2
        className="text-3xl md:text-5xl font-semibold text-center text-[#1B3B2B] mb-10"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        More Reviews
      </h2>

      {/* Summary bar */}
      <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-[#1B3B2B]/10 flex flex-wrap items-center justify-between gap-4 mb-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xl font-bold text-[#222623]">Excellent</span>
          <FiveStars />
          <span className="text-base font-bold text-[#222623]">4.6</span>
          <span className="text-sm text-[#5A635D]">
            <GoogleWordmark /> Rating &mdash; Based on 600+ reviews
          </span>
        </div>
        <a
          href="https://maps.app.goo.gl/8rtiiE8igKdkyiGh6"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1B3B2B] hover:bg-[#2a543f] text-[#F6F3EC] px-5 py-2.5 rounded-xl text-sm font-semibold transition"
        >
          Write a review
        </a>
      </div>

      {/* Review slider */}
      <div className="relative flex items-center justify-center">
        {/* Left arrow */}
        <button
          onClick={prev}
          aria-label="Previous review"
          className="w-11 h-11 rounded-full bg-white border border-[#1B3B2B]/15 flex items-center justify-center shadow-sm hover:bg-[#E9EFEA] transition cursor-pointer flex-shrink-0"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#1B3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Review card */}
        <div
          className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#1B3B2B]/10 max-w-2xl w-full mx-4 transition-all"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Reviewer info */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              style={{ backgroundColor: review.avatarColor }}
            >
              {review.initial}
            </div>
            <div>
              <p className="font-bold text-[#222623] text-sm">{review.author}</p>
              <p className="text-xs text-[#5A635D]">{review.timeAgo}</p>
            </div>
          </div>

          {/* Review text */}
          <p className="text-base md:text-lg text-[#222623] my-5 leading-relaxed">
            &ldquo;{review.text}&rdquo;
          </p>

          {/* Bottom: stars + Google icon */}
          <div className="flex items-center justify-between">
            <FiveStars />
            <GoogleGIcon />
          </div>
        </div>

        {/* Right arrow */}
        <button
          onClick={next}
          aria-label="Next review"
          className="w-11 h-11 rounded-full bg-white border border-[#1B3B2B]/15 flex items-center justify-center shadow-sm hover:bg-[#E9EFEA] transition cursor-pointer flex-shrink-0"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#1B3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {REVIEWS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to review ${idx + 1}`}
            className={`h-2 rounded-full border-none cursor-pointer transition-all duration-300 ${
              idx === currentIndex
                ? "bg-[#1B3B2B] w-6"
                : "bg-[#1B3B2B]/25 w-2 hover:bg-[#1B3B2B]/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
