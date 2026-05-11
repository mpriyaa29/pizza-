"use client";

const stats = [
  { label: "Pies Served", value: "240k+", detail: "Since 1962" },
  { label: "Fermentation", value: "288h", detail: "Cold & slow" },
  { label: "Temp", value: "900°", detail: "Quercia wood" },
  { label: "D.O.P.", value: "100%", detail: "Certified" },
];

export default function Stats() {
  return (
    <section id="stats" className="relative border-t border-hairline py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Rail */}
        <div className="md:col-span-3" data-reveal>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/30 block mb-2">(04)</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 block">METRICS</span>
          <div className="mt-4 h-px w-12 bg-hairline hidden md:block" />
        </div>

        {/* Content */}
        <div className="md:col-span-9 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((s, i) => (
            <div key={s.label} className="group" data-reveal data-reveal-delay={i + 1}>
              <div className="mb-2 flex items-baseline gap-2">
                <span className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-red group-hover:text-gold transition-colors duration-500">
                  {s.value}
                </span>
              </div>
              <div className="border-t border-hairline pt-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink block mb-1">
                  {s.label}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink/40">
                  {s.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 font-serif italic text-[20vw] text-ink/[0.02] whitespace-nowrap pointer-events-none select-none">
        NUMERI DI NAPOLI
      </div>
    </section>
  );
}
