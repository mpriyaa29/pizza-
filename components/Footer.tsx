"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-hairline py-12 px-4 md:px-8 bg-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Brand */}
        <div className="max-w-xs">
          <div className="font-serif text-2xl italic tracking-tight text-ink mb-4">
            PIOZZA<span className="text-red">.</span>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 leading-relaxed">
            Preserving the sacred traditions of Neapolitan pizza since 1962. Hand-crushed, wood-fired, and served with devotion.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-12 sm:gap-24">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/20 block mb-6">NAVIGATION</span>
            <ul className="flex flex-col gap-4">
              {["Menu", "Story", "Artigiano", "Contact"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50 hover:text-red transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/20 block mb-6">SOCIAL</span>
            <ul className="flex flex-col gap-4">
              {["Instagram", "Twitter", "Facebook", "Vimeo"].map((link) => (
                <li key={link}>
                  <a href="#" className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50 hover:text-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Info */}
        <div className="text-left md:text-right">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/20 block mb-6">LOCALE</span>
          <address className="not-italic font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50 leading-loose">
            VIA DEI TRIBUNALI 19<br />
            80138 NAPOLI, ITALY<br />
            +39 081 555 1234
          </address>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-hairline/30 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink/20">
          © {currentYear} PIOZZA ARTIGIANO. ALL RIGHTS RESERVED.
        </span>
        <div className="flex gap-8">
          <a href="#" className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink/20 hover:text-ink">PRIVACY</a>
          <a href="#" className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink/20 hover:text-ink">TERMS</a>
        </div>
      </div>
    </footer>
  );
}
