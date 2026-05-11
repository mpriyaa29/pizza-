"use client";
import FloatingPizza from "./FloatingPizza";

const ingredients = [
  { label: "Dough", detail: "12-day cold ferment" },
  { label: "Tomato", detail: "San Marzano D.O.P." },
  { label: "Cheese", detail: "Mozzarella di Bufala" },
  { label: "Fire", detail: "Quercia oak, 900°F" },
];

export default function Prologue() {
  return (
    <section id="prologue" className="relative border-t border-hairline py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <FloatingPizza size={200} frame={40} opacity={0.06} parallax={-0.15} className="absolute -right-20 top-20 hidden lg:block" />
      <FloatingPizza size={140} frame={100} opacity={0.05} parallax={0.1} className="absolute -left-16 bottom-32 hidden lg:block" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Left rail */}
        <div className="md:col-span-3" data-reveal>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/30 block mb-2">(02)</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 block mb-4">PROLOGUE</span>
          <span className="font-serif italic text-sm text-ink/40">Naples, 1962.</span>
          <div className="mt-4 h-px w-12 bg-hairline hidden md:block" />
        </div>

        {/* Right content */}
        <div className="md:col-span-9">
          <p className="drop-cap font-serif italic text-lg sm:text-xl md:text-2xl leading-relaxed text-ink/80 max-w-2xl" data-reveal>
            In a narrow vicolo off Via dei Tribunali, where the scent of wood smoke married the salt air from the bay, a single oven was lit for the first time. The dough had rested for twelve days — cold, patient, alive. The tomatoes had been crushed by hand that morning, still warm from the Campanian sun. When the first pie emerged, blistered and sighing, the neighbourhood gathered without being called. That oven has never gone cold.
          </p>

          {/* Ingredient credits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 md:mt-16" data-reveal data-reveal-delay="2">
            {ingredients.map((ing) => (
              <div key={ing.label} className="border-t border-hairline pt-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-red block mb-1">{ing.label}</span>
                <span className="font-mono text-[11px] text-ink/50">{ing.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
