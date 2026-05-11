"use client";

import React, { useState, useEffect } from "react";
import { X, Minus, Plus, Trash2, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CheckoutModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { cart, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-checkout", handleOpen);
    return () => window.removeEventListener("open-checkout", handleOpen);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: formData.name,
          customer_email: formData.email,
          customer_address: formData.address,
          items: cart,
          total: cartTotal,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setIsOpen(false);
          clearCart();
          setFormData({ name: "", email: "", address: "" });
        }, 3000);
      } else {
        const data = await response.json();
        alert(data.error || "Failed to place order. Check your console for details.");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("An error occurred. Is your Supabase configured?");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal content */}
      <div className="relative w-full max-w-5xl bg-bg border border-hairline overflow-hidden rounded-sm shadow-2xl flex flex-col md:flex-row max-h-[90vh] animate-in zoom-in-95 duration-300">
        
        {/* Left Side: Order Summary */}
        <div className="flex-1 p-6 md:p-10 border-b md:border-b-0 md:border-r border-hairline overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif italic text-3xl">Your Order</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="md:hidden text-ink/40 hover:text-red transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-ink/30 mb-6">Your cart is empty</p>
              <button 
                onClick={() => setIsOpen(false)}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-red border-b border-red/30 pb-1"
              >
                Go find a pie
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-6 group">
                  <div className="relative h-24 w-24 flex-shrink-0 bg-black rounded-sm overflow-hidden border border-hairline">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover opacity-80" />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-serif italic text-xl">{item.name}</h3>
                      <span className="font-mono text-xs text-gold">${item.price * item.quantity}</span>
                    </div>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-hairline rounded-sm px-2 py-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-ink/40 hover:text-ink transition-colors p-1"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-mono text-xs w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-ink/40 hover:text-ink transition-colors p-1"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-ink/20 hover:text-red transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-8 border-t border-hairline">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40">Total</span>
                  <span className="font-serif italic text-3xl text-gold">${cartTotal}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Checkout Form */}
        <div className="w-full md:w-[400px] bg-ink/5 p-6 md:p-10 flex flex-col">
          <div className="hidden md:flex justify-end mb-8">
            <button 
              onClick={() => setIsOpen(false)}
              className="text-ink/40 hover:text-red transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {isSuccess ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
              <CheckCircle2 size={64} className="text-red mb-6" />
              <h3 className="font-serif italic text-3xl mb-4">Grazie Mille!</h3>
              <p className="font-sans text-sm text-ink/60 mb-8">Your order has been placed. The oven is warming up.</p>
              <div className="w-full h-px bg-hairline mb-8" />
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink/30">Redirecting...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
              <h2 className="font-serif italic text-2xl mb-8">Details</h2>
              
              <div className="space-y-6 flex-1">
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 block">Full Name</label>
                  <input 
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-hairline py-2 font-sans text-sm outline-none focus:border-red transition-colors"
                    placeholder="Enzo Ferrari"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 block">Email Address</label>
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-hairline py-2 font-sans text-sm outline-none focus:border-red transition-colors"
                    placeholder="enzo@modena.it"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 block">Delivery Address</label>
                  <textarea 
                    required
                    rows={3}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-transparent border border-hairline p-3 font-sans text-sm outline-none focus:border-red transition-colors resize-none rounded-sm"
                    placeholder="Via dei Tribunali 19, Napoli"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="mt-10 group relative h-16 w-full bg-red text-black font-mono text-xs uppercase tracking-[0.2em] font-bold overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(255,58,38,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>PLACE ORDER <ArrowRight size={16} /></>
                  )}
                </span>
                <div className="absolute inset-0 bg-gold translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
