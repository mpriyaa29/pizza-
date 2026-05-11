"use client";
import { useEffect, useRef } from "react";
import { FRAME_EXT } from "@/lib/constants";

interface Props {
  size: number;
  frame: number;
  opacity?: number;
  spin?: boolean;
  parallax?: number;
  className?: string;
}

export default function FloatingPizza({ size, frame, opacity = 0.08, spin = false, parallax = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parallax || !ref.current) return;
    const el = ref.current;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.setProperty("--parallax-y", `${center * parallax}px`);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [parallax]);

  const src = `/frames/frame_${String(frame).padStart(4, "0")}.${FRAME_EXT}`;

  return (
    <div
      ref={ref}
      className={`pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        opacity,
        borderRadius: "50%",
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "0 0 80px rgba(255,58,38,0.15)",
        animation: `${spin ? "spin-slow 40s linear infinite," : ""} float-y 8s ease-in-out infinite`,
        transform: parallax ? "translate3d(0, var(--parallax-y, 0), 0)" : undefined,
      }}
      aria-hidden="true"
    />
  );
}
