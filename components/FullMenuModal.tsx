"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, Check, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { MENU, MenuItem } from "@/lib/menu";

export default function FullMenuModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<MenuItem["category"] | "All">("All");
  const { addToCart, cartCount } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-full-menu", handleOpen);
    return () => window.removeEventListener("open-full-menu", handleOpen);
  }, []);

  if (!isOpen) return null;

  const categories: (MenuItem["category"] | "All")[] = ["All", "Pizzas", "Sides", "Desserts", "Drinks"];
  
  const filteredMenu = activeCategory === "All" 
    ? MENU 
    : MENU.filter(item => item.category === activeCategory);

  const handleAddToCart = (item: MenuItem) => {
    addToCart({ 
      id: item.id, 
      name: item.name, 
      price: item.price, 
      image: item.image || "/frames/frame_0001.webp" 
    });
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-500"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal content */}
      <div className="relative w-full max-w-6xl bg-bg border border-hairline overflow-hidden rounded-sm shadow-2xl flex flex-col h-[85vh] animate-in zoom-in-95 duration-500">
        
        {/* Header */}
        <div className="p-6 md:p-10 border-b border-hairline flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink/30 block mb-2">CATALOGO COMPLETO</span>
            <h2 className="font-serif italic text-4xl">Full Menu</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                setIsOpen(false);
                window.dispatchEvent(new CustomEvent("open-checkout"));
              }}
              className="flex items-center gap-2 px-4 py-2 bg-ink text-bg font-mono text-[10px] uppercase tracking-widest rounded-full hover:bg-red hover:text-black transition-colors"
            >
              <ShoppingBag size={14} />
              VIEW CART ({cartCount})
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-ink/40 hover:text-red transition-colors p-2"
            >
              <X size={28} />
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="px-6 md:px-10 py-4 border-b border-hairline bg-ink/5 overflow-x-auto">
          <div className="flex items-center gap-8 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-[10px] uppercase tracking-[0.3em] transition-all relative py-2 ${
                  activeCategory === cat ? "text-red" : "text-ink/40 hover:text-ink"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-red animate-in fade-in slide-in-from-left-2" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {filteredMenu.map((item) => (
              <div key={item.id} className="group animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="relative aspect-[4/5] bg-ink/5 rounded-sm overflow-hidden mb-4 border border-hairline group-hover:border-ink/20 transition-colors">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-serif italic text-6xl text-ink/5 select-none">{item.name.charAt(0)}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className={`absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 ${
                      addedId === item.id ? "bg-red text-black" : "bg-bg text-ink hover:bg-red hover:text-black"
                    }`}
                  >
                    {addedId === item.id ? <Check size={18} /> : <Plus size={18} />}
                  </button>
                </div>

                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif italic text-xl group-hover:text-red transition-colors">{item.name}</h3>
                  <span className="font-mono text-xs text-gold">${item.price}</span>
                </div>
                
                <p className="font-sans text-xs text-ink/40 line-clamp-2 mb-3 h-8">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/20">{item.category}</span>
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40 hover:text-red flex items-center gap-1 transition-colors"
                  >
                    {addedId === item.id ? "ADDED" : "ADD TO CART"} <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="p-6 border-t border-hairline bg-black text-center">
          <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-ink/20">
            PREPARATO CON AMORE — NAPOLI 1962
          </p>
        </div>
      </div>
    </div>
  );
}
