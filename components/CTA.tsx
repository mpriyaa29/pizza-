"use client";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section id="cta" className="relative border-t border-hairline py-32 md:py-48 px-4 md:px-8 overflow-hidden bg-bg">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden flex flex-col justify-around">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="font-serif italic text-8xl md:text-[12vw] leading-none whitespace-nowrap animate-spin-slow" style={{ animationDirection: i % 2 === 0 ? 'normal' : 'reverse', animationDuration: '60s' }}>
            PIOZZA PIOZZA PIOZZA PIOZZA PIOZZA PIOZZA PIOZZA PIOZZA PIOZZA PIOZZA
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-block mb-12" data-reveal>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/30 block mb-2">(07)</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 block">FINAL CHAPTER</span>
        </div>

        <h2 className="font-serif italic text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-12 text-ink leading-[0.9]" data-reveal>
          The oven <br /> is <span className="text-red">waiting.</span>
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6" data-reveal data-reveal-delay="2">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent("open-checkout"))}
            className="group relative h-16 w-full sm:w-64 bg-red text-black font-mono text-xs uppercase tracking-[0.2em] font-bold overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(255,58,38,0.3)]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              RESERVE A PIE <ArrowRight size={16} />
            </span>
            <div className="absolute inset-0 bg-gold translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
          </button>

          <button 
            onClick={() => window.dispatchEvent(new CustomEvent("open-full-menu"))}
            className="h-16 w-full sm:w-64 border border-hairline bg-transparent text-ink font-mono text-xs uppercase tracking-[0.2em] hover:bg-ink hover:text-black transition-colors"
          >
            VIEW FULL MENU
          </button>
        </div>

        <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.4em] text-ink/30" data-reveal data-reveal-delay="4">
          VIA DEI TRIBUNALI 19 — NAPOLI
        </p>
      </div>
    </section>
  );
}
