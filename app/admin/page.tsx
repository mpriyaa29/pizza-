"use client";

import React, { useState, useEffect } from "react";
import { Lock, Package, User, MapPin, Calendar, CreditCard, ChevronDown, ChevronUp, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  customer_address: string;
  items: any[];
  total: number;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/orders?password=${encodeURIComponent(password)}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
        setIsAuthorized(true);
      } else {
        setError("Invalid password. Access denied.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-ink/5 border border-hairline p-8 md:p-10 rounded-sm">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-red/10 rounded-full flex items-center justify-center">
              <Lock className="text-red" size={32} />
            </div>
          </div>
          <h1 className="font-serif italic text-3xl text-center mb-2">Admin Portal</h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 text-center mb-10">
            Secure Access Required
          </p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 block">Password</label>
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-hairline py-3 font-sans text-sm outline-none focus:border-red transition-colors"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-red font-mono text-[10px] uppercase tracking-wider">{error}</p>}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-red text-black font-mono text-xs uppercase tracking-[0.2em] font-bold hover:shadow-[0_0_30px_rgba(255,58,38,0.2)] transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : "AUTHENTICATE"}
            </button>
          </form>

          <Link href="/" className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink/30 hover:text-ink transition-colors mt-8 justify-center">
            <ArrowLeft size={12} /> BACK TO SITE
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg p-4 md:p-10 lg:p-16">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink/30 block mb-2">DASHBOARD AMMINISTRATORE</span>
            <h1 className="font-serif italic text-4xl md:text-6xl text-gold">Recent Orders</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/30 block">Total Volume</span>
              <span className="font-serif italic text-2xl text-ink">${orders.reduce((acc, curr) => acc + curr.total, 0)}</span>
            </div>
            <div className="h-10 w-px bg-hairline" />
            <div className="text-right">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/30 block">Order Count</span>
              <span className="font-serif italic text-2xl text-ink">{orders.length}</span>
            </div>
          </div>
        </header>

        {orders.length === 0 ? (
          <div className="py-32 text-center border border-dashed border-hairline">
            <Package className="mx-auto text-ink/10 mb-4" size={48} />
            <p className="font-mono text-xs uppercase tracking-widest text-ink/30">No orders yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div 
                key={order.id} 
                className={`border border-hairline rounded-sm transition-all overflow-hidden ${
                  expandedOrder === order.id ? "bg-ink/[0.03] shadow-lg" : "bg-transparent hover:bg-ink/[0.01]"
                }`}
              >
                <div 
                  className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Package className="text-red" size={20} />
                    </div>
                    <div>
                      <h3 className="font-serif italic text-xl">{order.customer_name}</h3>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40">{order.id.slice(0, 8)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:flex items-center gap-8 md:gap-12">
                    <div className="flex flex-col">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-ink/30 mb-1">Date</span>
                      <span className="font-sans text-xs flex items-center gap-1.5"><Calendar size={12} className="text-red" /> {formatDate(order.created_at)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-ink/30 mb-1">Total</span>
                      <span className="font-serif italic text-lg text-gold">${order.total}</span>
                    </div>
                    <div className="flex items-center justify-end col-span-2 md:col-span-1">
                      {expandedOrder === order.id ? <ChevronUp className="text-ink/20" /> : <ChevronDown className="text-ink/20" />}
                    </div>
                  </div>
                </div>

                {expandedOrder === order.id && (
                  <div className="px-6 pb-8 animate-in slide-in-from-top-4 duration-300">
                    <div className="h-px bg-hairline mb-8" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                      {/* Customer Info */}
                      <div className="md:col-span-4 space-y-8">
                        <div>
                          <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-red mb-4">Customer Details</h4>
                          <div className="space-y-4">
                            <p className="flex items-start gap-3 font-sans text-sm">
                              <User size={16} className="text-ink/30 mt-0.5" />
                              <span>{order.customer_name}<br/><span className="text-ink/40 text-xs">{order.customer_email}</span></span>
                            </p>
                            <p className="flex items-start gap-3 font-sans text-sm">
                              <MapPin size={16} className="text-ink/30 mt-0.5" />
                              <span>{order.customer_address}</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="md:col-span-8">
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-red mb-4">Ordered Items</h4>
                        <div className="bg-ink/5 border border-hairline rounded-sm">
                          <table className="w-full text-left font-sans text-sm">
                            <thead>
                              <tr className="border-b border-hairline">
                                <th className="px-4 py-3 font-mono text-[9px] uppercase tracking-widest text-ink/30">Item</th>
                                <th className="px-4 py-3 font-mono text-[9px] uppercase tracking-widest text-ink/30 text-center">Qty</th>
                                <th className="px-4 py-3 font-mono text-[9px] uppercase tracking-widest text-ink/30 text-right">Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.items.map((item, i) => (
                                <tr key={i} className={i !== order.items.length - 1 ? "border-b border-hairline/50" : ""}>
                                  <td className="px-4 py-4">
                                    <div className="flex items-center gap-3">
                                      {item.image && <img src={item.image} alt={item.name} className="w-8 h-8 rounded-sm object-cover opacity-60" />}
                                      <span className="font-serif italic text-base">{item.name}</span>
                                    </div>
                                  </td>
                                  <td className="px-4 py-4 text-center font-mono text-xs">{item.quantity}</td>
                                  <td className="px-4 py-4 text-right font-mono text-xs text-gold">${item.price * item.quantity}</td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot>
                              <tr className="bg-ink/10">
                                <td colSpan={2} className="px-4 py-3 font-mono text-[9px] uppercase tracking-widest">Total Amount</td>
                                <td className="px-4 py-3 text-right font-serif italic text-xl text-gold">${order.total}</td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <footer className="mt-20 pt-10 border-t border-hairline flex justify-between items-center">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink/20">PIOZZA BACK-OFFICE SYSTEM v1.0</p>
          <button 
            onClick={() => setIsAuthorized(false)}
            className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink/40 hover:text-red transition-colors"
          >
            LOGOUT
          </button>
        </footer>
      </div>
    </div>
  );
}
