"use client";

import { useEffect, useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        mounted
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-[0.99]"
      }`}
    >
      {children}
    </div>
  );
}
