"use client";

import React, { useState } from "react";
import { Lock, User, Mail, ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [mode, setMode] = useState<"customer" | "admin">("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (mode === "admin") {
      try {
        const res = await fetch(`/api/admin/orders?password=${encodeURIComponent(password)}`);
        if (res.ok) {
          login("admin");
          router.push("/");
        } else {
          setError("Invalid admin password.");
        }
      } catch (err) {
        setError("Connection error. Please try again.");
      }
    } else {
      // Validate email contains @
      if (!email.includes("@")) {
        setError("Please enter a valid email address containing '@'.");
        setIsLoading(false);
        return;
      }

      // Mock customer login
      if (email && password === "pizza123") {
        login("customer", email);
        
        // Send welcome email
        try {
          await fetch("/api/auth/welcome", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
        } catch (err) {
          console.error("Failed to send welcome email:", err);
        }

        router.push("/");
      } else {
        setError("Invalid customer credentials. (Use 'pizza123' for test)");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-ink/5 border border-hairline p-8 md:p-10 rounded-sm relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red/5 rounded-full blur-3xl -mr-16 -mt-16" />
        
        <div className="relative z-10">
          <div className="flex justify-center mb-10">
            <Link href="/" className="font-serif text-4xl italic tracking-tight text-ink">
              PIOZZA<span className="text-red">.</span>
            </Link>
          </div>

          <div className="flex border-b border-hairline mb-10">
            <button 
              onClick={() => { setMode("customer"); setError(""); }}
              className={`flex-1 pb-4 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${mode === "customer" ? "text-red border-b border-red" : "text-ink/30 hover:text-ink/60"}`}
            >
              CUSTOMER
            </button>
            <button 
              onClick={() => { setMode("admin"); setError(""); }}
              className={`flex-1 pb-4 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${mode === "admin" ? "text-red border-b border-red" : "text-ink/30 hover:text-ink/60"}`}
            >
              ADMIN
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            {mode === "customer" && (
              <div className="space-y-2">
                <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40 block">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-ink/20 group-focus-within:text-red transition-colors" size={16} />
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-hairline pl-8 py-3 font-sans text-sm outline-none focus:border-red transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40 block">
                {mode === "admin" ? "Admin Password" : "Password"}
              </label>
              <div className="relative group">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-ink/20 group-focus-within:text-red transition-colors" size={16} />
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-hairline pl-8 py-3 font-sans text-sm outline-none focus:border-red transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && <p className="text-red font-mono text-[9px] uppercase tracking-wider bg-red/5 p-3 border border-red/20">{error}</p>}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-ink text-bg font-mono text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-red hover:text-black transition-all flex items-center justify-center gap-3 group"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  SIGN IN <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 flex justify-between items-center border-t border-hairline pt-8">
            <Link href="/" className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-ink/30 hover:text-ink transition-colors">
              <ArrowLeft size={12} /> BACK TO SITE
            </Link>
            <span className="font-mono text-[9px] uppercase tracking-widest text-ink/10">SECURE PORTAL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
