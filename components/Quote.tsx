"use client";
import SplitText from "./SplitText";

export default function Quote() {
  return (
    <section id="quote" className="relative border-t border-hairline py-32 md:py-48 px-4 md:px-8 bg-zinc-950/30 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-block mb-12" data-reveal>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/30 block mb-2">(05)</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 block">THE PHILOSOPHY</span>
        </div>

        <blockquote className="font-serif italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-ink/90">
          <SplitText 
            parts={[
              "\"The pizza is not a recipe,",
              { text: " it is a ritual.\"", className: "text-gold" }
            ]} 
            stagger={30} 
            by="char" 
          />
        </blockquote>

        <div className="mt-16 flex flex-col items-center gap-4" data-reveal data-reveal-delay="4">
          <div className="h-12 w-px bg-red/40" />
          <cite className="not-italic font-mono text-[11px] uppercase tracking-[0.3em] text-ink/40">
            ENZO MARTELLO — FOUNDER
          </cite>
        </div>
      </div>

      {/* Decorative text */}
      <div className="absolute top-1/2 left-0 w-full flex justify-between px-8 pointer-events-none -translate-y-1/2 -z-10 opacity-5">
        <span className="font-serif italic text-9xl">P</span>
        <span className="font-serif italic text-9xl">Z</span>
      </div>
    </section>
  );
}
