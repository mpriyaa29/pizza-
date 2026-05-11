"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { TOTAL_FRAMES, FRAME_EXT } from "@/lib/constants";

function clamp01(v: number) { return Math.max(0, Math.min(1, v)); }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const orbRedRef = useRef<HTMLDivElement>(null);
  const orbGoldRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const creditsRef = useRef<HTMLDivElement>(null);

  const [ready, setReady] = useState(false);
  const [loadPct, setLoadPct] = useState(0);

  const imgsRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const pRef = useRef(0);
  const winHeightRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const curRotRef = useRef({ rx: 0, ry: 0, tx: 0 });
  const rafRef = useRef(0);
  const tickRef = useRef(false);

  // Cache window height to avoid mobile address bar jumps
  useEffect(() => {
    winHeightRef.current = window.innerHeight;
    const handleResize = () => { winHeightRef.current = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    const img = imgsRef.current[idx];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const scale = Math.min((cw * dpr) / img.width, (ch * dpr) / img.height) * 0.9;
    const w = img.width * scale;
    const h = img.height * scale;
    const x = (canvas.width - w) / 2;
    const y = (canvas.height - h) / 2;
    ctx.drawImage(img, x, y, w, h);
  }, []);

  // Preload frames
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    let loaded = 0;
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/frame_${String(i).padStart(4, "0")}.${FRAME_EXT}`;
      img.onload = () => {
        loaded++;
        const pct = Math.round((loaded / TOTAL_FRAMES) * 100);
        setLoadPct(pct);
        if (loaded >= Math.ceil(TOTAL_FRAMES * 0.8)) setReady(true);
      };
      imgs.push(img);
    }
    imgsRef.current = imgs;
  }, []);

  // Draw first frame when ready
  useEffect(() => {
    if (ready) drawFrame(0);
  }, [ready, drawFrame]);

  // Scroll handler + rAF loop
  useEffect(() => {
    if (!ready) return;

    const onScroll = () => {
      if (tickRef.current) return;
      tickRef.current = true;
      requestAnimationFrame(() => {
        const sec = sectionRef.current;
        if (!sec) { tickRef.current = false; return; }
        const rect = sec.getBoundingClientRect();
        const winH = winHeightRef.current || window.innerHeight;
        
        // Stable progress calculation - avoids mobile address bar jumps
        const totalScrollable = sec.offsetHeight - winH;
        const p = clamp01(-rect.top / totalScrollable);
        
        pRef.current = p;
        
        // Smooth frame interpolation for touch
        const targetIdx = Math.round(p * (TOTAL_FRAMES - 1));
        if (targetIdx !== frameRef.current) {
          frameRef.current = targetIdx;
          drawFrame(targetIdx);
        }
        tickRef.current = false;
      });
    };

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    let t = 0;
    const loop = () => {
      t += 1 / 60;
      const p = pRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const ww = window.innerWidth;
      const wh = window.innerHeight;

      // Canvas direct mapping + Stabilization
      if (wrapRef.current) {
        // Stabilization: If the frames have vertical movement, we counter it here.
        // We'll apply a subtle counter-curve to keep the pizza "locked" in center.
        const stabilizer = p < 0.4 ? lerp(0, -30, p / 0.4) : lerp(-30, 0, (p - 0.4) / 0.6);
        
        const scale = 0.9 + p * 0.3; 
        wrapRef.current.style.transform = `translateY(${stabilizer}px) scale(${scale})`;
      }

      // Cursor parallax on stage
      if (stageRef.current) {
        const targetRx = ((my / wh) - 0.5) * 12;
        const targetRy = ((mx / ww) - 0.5) * 15;
        const targetTx = ((mx / ww) - 0.5) * 20;
        curRotRef.current.rx = lerp(curRotRef.current.rx, targetRx, 0.1);
        curRotRef.current.ry = lerp(curRotRef.current.ry, targetRy, 0.1);
        curRotRef.current.tx = lerp(curRotRef.current.tx, targetTx, 0.1);
        
        stageRef.current.style.transform =
          `perspective(1200px) rotateX(${curRotRef.current.rx}deg) rotateY(${curRotRef.current.ry}deg) translateX(${curRotRef.current.tx}px)`;
      }

      // Spotlight and Halo - Fast response for layered feel
      if (spotRef.current) {
        spotRef.current.style.transform = `translate3d(${mx - 150}px, ${my - 150}px, 0)`;
        spotRef.current.style.opacity = String(0.2 + p * 0.5);
      }
      if (haloRef.current) {
        haloRef.current.style.transform = `scale(${0.8 + p * 1.2})`;
        haloRef.current.style.opacity = String(0.3 + p * 0.7);
      }

      // Shadow response to height/bob
      if (shadowRef.current) {
        const bob = Math.sin(t * 1.1) * 5;
        const sy = 1 - (bob + 5) / 20;
        const sO = p < 0.2 ? p / 0.2 : 1;
        shadowRef.current.style.transform = `scaleY(${0.6 + sy * 0.4}) scaleX(${0.9 + p * 0.2})`;
        shadowRef.current.style.opacity = String(0.4 * sO);
      }

      // Ambient orbs parallax
      if (orbRedRef.current) orbRedRef.current.style.transform = `translateY(${p * -120}px)`;
      if (orbGoldRef.current) orbGoldRef.current.style.transform = `translateY(${p * 90}px)`;

      // Text overlays driven by p
      if (eyebrowRef.current) {
        const o = p < 0.6 ? 1 : Math.max(0, 1 - (p - 0.6) / 0.2);
        eyebrowRef.current.style.opacity = String(o);
      }
      if (headlineRef.current) {
        const ty = p * -60;
        const s = 1 - p * 0.15;
        headlineRef.current.style.transform = `translateY(${ty}px) scale(${s})`;
      }
      if (subheadRef.current) {
        const o = p > 0.75 ? Math.min(1, (p - 0.75) / 0.25) : 0;
        const ty = p > 0.75 ? (1 - (p - 0.75) / 0.25) * 30 : 30;
        subheadRef.current.style.opacity = String(o);
        subheadRef.current.style.transform = `translateY(${ty}px)`;
      }
      if (scrollCueRef.current) {
        const o = p < 0.2 ? 1 - p / 0.2 : 0;
        scrollCueRef.current.style.opacity = String(o);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    rafRef.current = requestAnimationFrame(loop);
    onScroll();

    const onResize = () => drawFrame(frameRef.current);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [ready, drawFrame]);

  return (
    <section id="hero" ref={sectionRef} className="hero relative h-[250vh]">
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden bg-black pt-16">
        {/* Loading veil */}
        {!ready && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink/50 mb-4">
              PREPARING… {loadPct}%
            </span>
            <div className="h-px w-48 bg-hairline overflow-hidden">
              <div className="h-full bg-red transition-all duration-300" style={{ width: `${loadPct}%` }} />
            </div>
          </div>
        )}

        {/* Ambient orbs */}
        <div ref={orbRedRef} className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-red/10 blur-[120px] pointer-events-none" />
        <div ref={orbGoldRef} className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-gold/10 blur-[120px] pointer-events-none" />

        {/* Text block */}
        <div className="relative z-10 text-center px-4 pt-4 md:pt-8">
          <div ref={eyebrowRef} className="entrance-eyebrow font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.5em] text-ink/50 mb-3">
            — A SLICE OF NAPLES —
          </div>
          <h1 ref={headlineRef} className="entrance-headline font-serif italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-ink leading-[0.95]">
            Taste the <span className="text-red">Tradition.</span>
          </h1>
          <p ref={subheadRef} className="entrance-subhead mt-4 font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-ink/40" style={{ opacity: 0 }}>
            900° wood-fired. 60 seconds. Centuries of devotion.
          </p>
        </div>

        {/* Canvas stage */}
        <div ref={stageRef} className="relative flex-1 flex items-center justify-center" style={{ perspective: "1200px" }}>
          {/* Halo */}
          <div ref={haloRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[70%] h-[70%] rounded-full bg-red/5 blur-[80px]" />
          </div>

          {/* Canvas wrap */}
          <div ref={wrapRef} className="relative w-full h-full">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 h-full w-full"
              style={{
                filter: "contrast(1.18) brightness(0.95) saturate(1.15)",
                WebkitMaskImage: "radial-gradient(ellipse 50% 60% at 50% 50%, #000 30%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.45) 70%, transparent 92%)",
                maskImage: "radial-gradient(ellipse 50% 60% at 50% 50%, #000 30%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.45) 70%, transparent 92%)",
              }}
            />
          </div>

          {/* Shadow */}
          <div ref={shadowRef} className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[40%] h-8 rounded-full bg-black/40 blur-xl pointer-events-none" />

          {/* Spotlight */}
          <div
            ref={spotRef}
            className="pointer-events-none fixed w-[300px] h-[300px] rounded-full bg-red/20 blur-[100px] opacity-30"
            style={{ mixBlendMode: "screen" }}
          />
        </div>

        {/* Scroll cue */}
        <div ref={scrollCueRef} className="entrance-credits absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink/30">SCROLL TO TASTE</span>
          <div className="w-px h-8 bg-ink/20 animate-pulse-line origin-top" />
        </div>

        {/* Side rails — desktop only */}
        <div className="entrance-rail-left hidden md:block absolute left-6 top-1/2 -translate-y-1/2 z-10">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink/20" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
            PIOZZA · NAPOLI · 1962 · ARTIGIANO
          </span>
        </div>
        <div className="entrance-rail-right hidden md:block absolute right-6 top-1/2 -translate-y-1/2 z-10">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink/20" style={{ writingMode: "vertical-rl" }}>
            FOR. SCROLL — TASTE — TRADITION — ETERNAL
          </span>
        </div>

        {/* Top-corner micro-labels — desktop only */}
        <div className="hidden md:flex absolute top-20 left-8 z-10">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/20">(01) — HERO</span>
        </div>
        <div className="hidden md:flex absolute top-20 right-8 z-10">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/20">NEAPOLITAN / WOOD-FIRED</span>
        </div>

        {/* Bottom credits */}
        <div ref={creditsRef} className="entrance-credits hidden md:flex absolute bottom-8 left-8 right-8 z-10 justify-between items-end">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/20">FRESCO / DAILY · NO PRESERVATIVES</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/20">01 / 04 — SECTIONS</span>
        </div>
      </div>
    </section>
  );
}
