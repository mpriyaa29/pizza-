"use client";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CartBubble() {
  const { cartCount } = useCart();

  return (
    <button
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-red text-black font-mono text-[11px] uppercase tracking-wider font-semibold h-11 px-3 sm:h-12 sm:px-4 shadow-lg hover:shadow-[0_0_24px_rgba(255,58,38,0.4)] transition-shadow"
      aria-label="Shopping cart"
      onClick={() => {
        // Dispatch custom event to open checkout modal
        window.dispatchEvent(new CustomEvent("open-checkout"));
      }}
    >
      <ShoppingBag size={16} />
      <span>CART ({cartCount})</span>
    </button>
  );
}
