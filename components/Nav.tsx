"use client";
import { ArrowUpRight, User, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";

export default function Nav() {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-hairline backdrop-blur-md bg-black/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-8">
        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-3">
          <span className="font-serif text-xl italic tracking-tight text-ink">
            PIOZZA<span className="text-red">.</span>
          </span>
          <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">
            EST. 1962
          </span>
        </Link>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "MENU", id: "menu" },
            { label: "STORY", id: "prologue" },
            { label: "LOCAL", id: "features" },
            { label: "BOOK", id: "booking" },
          ].map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50 hover:text-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
          
          {user?.role === "admin" && (
            <a
              href="#orders-dashboard"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-red hover:text-red/80 transition-colors flex items-center gap-1.5"
            >
              <LayoutDashboard size={12} /> DASHBOARD
            </a>
          )}
        </div>

        {/* Auth & CTA */}
        <div className="flex items-center gap-4 md:gap-8">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="hidden lg:flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-ink/40">
                <User size={12} /> {user.role}
              </span>
              <button 
                onClick={logout}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/30 hover:text-red transition-colors flex items-center gap-1"
              >
                <LogOut size={12} /> <span className="hidden sm:inline">LOGOUT</span>
              </button>
            </div>
          ) : (
            <Link 
              href="/login"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50 hover:text-ink transition-colors flex items-center gap-1"
            >
              <User size={12} /> LOGIN
            </Link>
          )}

          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-checkout"))}
            className="group flex items-center gap-2 rounded-full bg-red px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] font-mono uppercase tracking-wider text-black font-semibold transition-all hover:shadow-[0_0_20px_rgba(255,58,38,0.4)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black/40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-black/60" />
            </span>
            ORDER<span className="hidden sm:inline">&nbsp;NOW</span>
            <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
