"use client";
import { Flame, ShieldCheck, Timer, Waves } from "lucide-react";

const features = [
  {
    icon: Flame,
    title: "900° Wood Fire",
    desc: "Oak and beech wood, imported from the Campania region, burned at extreme temperatures for the perfect char.",
  },
  {
    icon: Timer,
    title: "288h Fermentation",
    desc: "A twelve-day cold fermentation process that breaks down complex sugars for a light, digestible, and airy crust.",
  },
  {
    icon: ShieldCheck,
    title: "D.O.P. Ingredients",
    desc: "San Marzano tomatoes grown in the volcanic soil of Mt. Vesuvius and Mozzarella di Bufala Campana.",
  },
  {
    icon: Waves,
    title: "Hydration Balance",
    desc: "Specially filtered water with a specific mineral profile to match the ancient springs of Naples.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative border-t border-hairline py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        <div className="md:col-span-3" data-reveal>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/30 block mb-2">(06)</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 block">ARTIGIANO</span>
          <div className="mt-4 h-px w-12 bg-hairline hidden md:block" />
        </div>

        <div className="md:col-span-9">
          <h2 className="font-serif italic text-4xl sm:text-5xl md:text-6xl mb-16 max-w-2xl leading-tight" data-reveal>
            The secret is that there <span className="text-red">is no secret.</span> Just devotion.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
            {features.map((f, i) => (
              <div key={f.title} className="group" data-reveal data-reveal-delay={i % 2 === 0 ? 1 : 2}>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-sm border border-hairline bg-ink/5 text-gold group-hover:bg-red group-hover:text-black transition-all duration-500">
                  <f.icon size={24} strokeWidth={1} />
                </div>
                <h3 className="font-serif italic text-2xl mb-3 text-ink group-hover:text-red transition-colors">
                  {f.title}
                </h3>
                <p className="font-sans text-sm text-ink/50 leading-relaxed max-w-sm">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
