"use client";

import { useRef, useState, useEffect } from "react";

interface CounterData {
  target: number;
  suffix: string;
  decimals: number;
  label: string;
  showStar?: boolean;
}

const COUNTERS: CounterData[] = [
  { target: 12, suffix: "k+", decimals: 0, label: "Happy Guests" },
  { target: 35, suffix: "+", decimals: 0, label: "Signature Dishes" },
  { target: 20, suffix: "+", decimals: 0, label: "Music & Art Nights" },
  { target: 4.6, suffix: "", decimals: 1, label: "Customer Rating", showStar: true },
];

function StarIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="w-5 h-5 sm:w-6 sm:h-6 ml-1.5 inline-block -mt-1"
      aria-label="Star rating"
    >
      <path
        d="M10 1.5l2.18 4.41 4.87.71-3.52 3.44.83 4.85L10 12.67l-4.36 2.24.83-4.85L2.95 6.62l4.87-.71L10 1.5z"
        fill="#F59E0B"
      />
    </svg>
  );
}

function CounterCell({
  data,
  shouldAnimate,
  borderClasses,
}: {
  data: CounterData;
  shouldAnimate: boolean;
  borderClasses: string;
}) {
  const [displayValue, setDisplayValue] = useState(data.decimals > 0 ? "0.0" : "0");
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!shouldAnimate || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1800; // 1800ms visible count-up animation
    let startTime: number | null = null;
    let frame: number;

    function tick(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic curve for natural smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * data.target;

      setDisplayValue(
        data.decimals > 0 ? current.toFixed(data.decimals) : Math.floor(current).toString()
      );

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplayValue(
          data.decimals > 0 ? data.target.toFixed(data.decimals) : data.target.toString()
        );
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [shouldAnimate, data.target, data.decimals]);

  return (
    <div className={`flex flex-col items-center justify-center py-8 md:py-10 px-4 ${borderClasses}`}>
      <div className="flex items-baseline mb-2">
        <span
          className="text-4xl md:text-5xl text-[#C86446] font-semibold tabular-nums"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {displayValue}
        </span>
        {data.suffix && (
          <span
            className="text-2xl md:text-3xl text-[#C86446] font-semibold ml-0.5"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {data.suffix}
          </span>
        )}
        {data.showStar && <StarIcon />}
      </div>
      <span className="text-sm text-[#5A635D] font-medium">{data.label}</span>
    </div>
  );
}

// Per-cell borders for clean 2-col mobile / 4-col desktop dividers
const CELL_BORDERS = [
  "",
  "border-l border-[#1B3B2B]/15",
  "border-t border-[#1B3B2B]/15 md:border-t-0 md:border-l",
  "border-t border-l border-[#1B3B2B]/15 md:border-t-0",
];

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="max-w-6xl mx-auto px-4 py-16 md:py-20 text-center">
      <p className="text-xs tracking-[0.25em] uppercase text-[#C86446] font-semibold mb-2">
        Our Journey
      </p>
      <h2
        className="text-3xl md:text-5xl text-[#222623] font-semibold mb-12"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        The Basil by Numbers
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-[#1B3B2B]/15">
        {COUNTERS.map((counter, idx) => (
          <CounterCell
            key={counter.label}
            data={counter}
            shouldAnimate={animate}
            borderClasses={CELL_BORDERS[idx]}
          />
        ))}
      </div>
    </section>
  );
}
