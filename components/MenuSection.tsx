"use client";
import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { TOTAL_FRAMES, FRAME_EXT } from "@/lib/constants";
import SplitText from "./SplitText";
import { useCart } from "@/lib/cart-context";
import { MENU } from "@/lib/menu";

export default function MenuSection() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const featuredPies = MENU.filter(item => item.category === "Pizzas").slice(0, 3);

  const handleAddToCart = (item: any, src: string) => {
    addToCart({ id: item.id, name: item.name, price: item.price, image: src });
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section id="menu" className="relative border-t border-hairline py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Left rail + header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16">
        <div className="md:col-span-3" data-reveal>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/30 block mb-2">(03)</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 block">MENU</span>
          <div className="mt-4 h-px w-12 bg-hairline hidden md:block" />
        </div>
        <div className="md:col-span-9 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="font-serif italic text-3xl sm:text-5xl md:text-6xl leading-[1.05]">
            <SplitText parts={["Our signature"]} stagger={42} by="char" />
            <br />
            <SplitText parts={[{ text: "selections.", className: "text-red" }]} stagger={42} delay={400} by="char" />
          </h2>
          
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent("open-full-menu"))}
            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 hover:text-red transition-colors"
          >
            VIEW FULL MENU <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {featuredPies.map((pie, idx) => {
          // Using indexes for frames to ensure variety in the featured section
          const frames = [1, Math.round(TOTAL_FRAMES * 0.3), Math.round(TOTAL_FRAMES * 0.6)];
          const src = `/frames/frame_${String(frames[idx]).padStart(4, "0")}.${FRAME_EXT}`;
          
          return (
            <div key={pie.id} className="group" data-reveal>
              {/* Image */}
              <div className="relative aspect-square overflow-hidden rounded-sm mb-5 bg-black">
                <img
                  src={src}
                  alt={pie.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50 border border-hairline px-2 py-1">
                  № {pie.roman || `0${idx + 1}`}
                </span>
                <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60">
                  — {pie.sub || "SIGNATURE PIE"}
                </span>
              </div>

              {/* Meta row */}
              <div className="flex items-center justify-between border-b border-hairline pb-3 mb-4">
                <span className="font-serif italic text-lg text-red">{pie.roman || (idx + 1)}</span>
                <span className="font-serif italic text-lg text-gold">${pie.price}</span>
              </div>

              {/* Name */}
              <h3 className="font-serif italic text-2xl sm:text-3xl mb-2">
                <SplitText parts={[pie.name]} stagger={35} by="char" />
              </h3>

              {/* Desc */}
              <p className="font-sans text-sm text-ink/50 max-w-md mb-3">{pie.description}</p>

              {/* Ingredients */}
              {pie.ingredients && (
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/30 mb-4">
                  {pie.ingredients.join(" · ")}
                </p>
              )}

              {/* CTA */}
              <button
                onClick={() => handleAddToCart(pie, src)}
                className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-all border-b pb-1 ${
                  addedId === pie.id ? "text-red border-red" : "text-ink/60 hover:text-red border-hairline"
                }`}
              >
                {addedId === pie.id ? (
                  <>ADDED TO CART <Check size={12} /></>
                ) : (
                  <>ADD TO CART <ArrowRight size={12} /></>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
