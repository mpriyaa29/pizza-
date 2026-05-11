"use client";

import React, { useState } from "react";
import { MapPin, Clock, Phone, Mail, Calendar, Users, Loader2, CheckCircle } from "lucide-react";
import SplitText from "./SplitText";

export default function LocationBooking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: "2",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) setIsSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="booking" className="py-24 lg:py-32 bg-bg border-t border-hairline overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left: Info & Map */}
          <div className="lg:col-span-5 space-y-12">
            <header>
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-red block mb-4">CONTATTI</span>
              <h2 className="font-serif italic text-5xl md:text-7xl text-ink leading-tight">
                Visit our <br /> <span className="text-gold">Santuario.</span>
              </h2>
            </header>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-ink/5 border border-hairline rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-red" />
                </div>
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/30 mb-2">Location</h4>
                  <p className="font-serif italic text-xl">Via dei Tribunali, 32<br />80138 Napoli, Italia</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-ink/5 border border-hairline rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock size={20} className="text-red" />
                </div>
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/30 mb-2">Hours</h4>
                  <p className="font-serif italic text-xl">Mon—Sun: 12:00 — 23:00<br />Orario Continuato</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-ink/5 border border-hairline rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-red" />
                </div>
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/30 mb-2">Reservation Line</h4>
                  <p className="font-serif italic text-xl">+39 081 123 4567</p>
                </div>
              </div>
            </div>

            {/* Stylized Map Iframe (Monochrome/Dark) */}
            <div className="relative h-64 w-full border border-hairline grayscale invert contrast-125 opacity-40 hover:opacity-60 transition-opacity rounded-sm overflow-hidden">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3018.15086036128!2d14.2541!3d40.8522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b08466e3b567d%3A0xc3911f93f1d8c1c4!2sVia%20dei%20Tribunali%2C%20Napoli%20NA%2C%20Italy!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
              />
            </div>
          </div>

          {/* Right: Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-ink/5 border border-hairline p-8 md:p-12 rounded-sm relative overflow-hidden">
              {isSuccess ? (
                <div className="py-20 text-center space-y-6 animate-in zoom-in-95 duration-500">
                  <CheckCircle size={64} className="mx-auto text-red" />
                  <h3 className="font-serif italic text-3xl text-ink">Prenotazione Ricevuta.</h3>
                  <p className="font-sans text-ink/50 max-w-sm mx-auto">We have sent a confirmation email to {formData.email}. We look forward to hosting you.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="font-mono text-[10px] uppercase tracking-widest text-red hover:text-ink transition-colors"
                  >
                    MAKE ANOTHER BOOKING
                  </button>
                </div>
              ) : (
                <>
                  <header className="mb-12">
                    <h3 className="font-serif italic text-3xl mb-2 text-gold">Reservations.</h3>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">Secure your table at the heart of Napoli</p>
                  </header>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="font-mono text-[9px] uppercase tracking-widest text-ink/40">Full Name</label>
                        <input 
                          required
                          className="w-full bg-transparent border-b border-hairline py-3 outline-none focus:border-red transition-colors font-sans text-sm"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-mono text-[9px] uppercase tracking-widest text-ink/40">Email</label>
                        <input 
                          required
                          type="email"
                          className="w-full bg-transparent border-b border-hairline py-3 outline-none focus:border-red transition-colors font-sans text-sm"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-2">
                        <label className="font-mono text-[9px] uppercase tracking-widest text-ink/40">Date</label>
                        <div className="relative">
                          <input 
                            required
                            type="date"
                            className="w-full bg-transparent border-b border-hairline py-3 outline-none focus:border-red transition-colors font-sans text-sm"
                            value={formData.date}
                            onChange={e => setFormData({...formData, date: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="font-mono text-[9px] uppercase tracking-widest text-ink/40">Time</label>
                        <input 
                          required
                          type="time"
                          className="w-full bg-transparent border-b border-hairline py-3 outline-none focus:border-red transition-colors font-sans text-sm"
                          value={formData.time}
                          onChange={e => setFormData({...formData, time: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-mono text-[9px] uppercase tracking-widest text-ink/40">Guests</label>
                        <select 
                          className="w-full bg-transparent border-b border-hairline py-3 outline-none focus:border-red transition-colors font-sans text-sm appearance-none"
                          value={formData.guests}
                          onChange={e => setFormData({...formData, guests: e.target.value})}
                        >
                          {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n} className="bg-bg text-ink">{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-[9px] uppercase tracking-widest text-ink/40">Special Requests</label>
                      <textarea 
                        rows={1}
                        className="w-full bg-transparent border-b border-hairline py-3 outline-none focus:border-red transition-colors font-sans text-sm resize-none"
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-16 bg-red text-black font-mono text-xs uppercase tracking-[0.3em] font-bold hover:shadow-[0_0_30px_rgba(255,58,38,0.3)] transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
                    >
                      {isLoading ? <Loader2 className="animate-spin" size={18} /> : (
                        <>REQUEST TABLE <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowRight({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}
    >
      <path d="M5 12h14m-7-7 7 7-7 7" />
    </svg>
  );
}
