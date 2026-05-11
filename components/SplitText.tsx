"use client";
import { useEffect, useRef } from "react";

type Part = string | { text: string; className?: string };

interface Props {
  parts: Part[];
  stagger?: number;
  delay?: number;
  by?: "char" | "word";
  className?: string;
}

export default function SplitText({ parts, stagger = 32, delay = 0, by = "char", className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("split-visible");
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("split-visible"); io.disconnect(); } },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let idx = 0;
  const rendered = parts.map((part, pi) => {
    const text = typeof part === "string" ? part : part.text;
    const cls = typeof part === "string" ? "" : part.className || "";
    const units = by === "char" ? text.split("") : text.split(/(\s+)/);

    const spans = units.map((unit) => {
      if (by === "word" && /^\s+$/.test(unit)) return unit;
      const d = delay + idx * stagger;
      idx++;
      return (
        <span className="split-piece" key={`${pi}-${idx}`}>
          <span className="split-inner" style={{ transitionDelay: `${d}ms` }}>
            {unit === " " ? "\u00A0" : unit}
          </span>
        </span>
      );
    });

    return cls ? <span key={pi} className={cls}>{spans}</span> : <span key={pi}>{spans}</span>;
  });

  return <span ref={ref} className={className}>{rendered}</span>;
}
