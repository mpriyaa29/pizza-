"use client";
import { useEffect, useState } from "react";
import { SECTIONS } from "@/lib/constants";

export default function ScrollProgress() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
        const idx = Math.min(
          SECTIONS.length - 1,
          Math.floor((scrollY / Math.max(scrollMax, 1)) * SECTIONS.length)
        );
        setActive(idx);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 lg:flex flex-col gap-3" aria-label="Section progress">
      {SECTIONS.map((s, i) => {
        const isActive = i === active;
        return (
          <button
            key={s.id}
            onClick={() => jump(s.id)}
            className="flex items-center gap-2 group text-right"
          >
            <span
              className="block transition-all duration-300"
              style={{
                width: isActive ? 32 : 18,
                height: 1,
                background: isActive ? "#ff3a26" : "rgba(247,241,232,0.2)",
              }}
            />
            <span
              className="font-mono text-[10px] uppercase tracking-widest transition-colors duration-300"
              style={{ color: isActive ? "#ff3a26" : "rgba(247,241,232,0.3)" }}
            >
              {s.num}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
