"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HeroSection() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Navbar ── */ }
      <header className="border-b border-white/10 bg-[#0a1628]">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */ }
          <div className="flex flex-col leading-none">
            <span className="text-white font-black text-xl tracking-widest">WOLF</span>
            <span className="text-[8px] text-white/50 tracking-[0.25em] uppercase mt-0.5">
              Wealth Management · Legal Family
            </span>
            <span className="text-[7px] text-white/40 tracking-[0.2em] uppercase">
              Trusts & Estate Planning
            </span>
          </div>

          {/* Nav links */ }
          <nav className="hidden md:flex items-center gap-8">
            { [ "Home", "How It Works", "Pricing", "FAQ" ].map((item, i) => (
              <Link
                key={ item }
                href="#"
                className={ `text-sm font-medium transition-colors ${i === 0
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                  }` }
              >
                { item }
              </Link>
            )) }
          </nav>

          {/* Auth buttons */ }
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-white hover:text-white hover:bg-white/10 font-medium"
            >
              Sign In
            </Button>
            <Button
              className="bg-[#2a6fbd] hover:bg-[#1e5fa8] text-white border-0 font-semibold px-6 rounded-md"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */ }
      <section className="relative overflow-hidden bg-[#0d1f3c] min-h-[calc(100vh-64px)]">

        {/* Diagonal stripe texture */ }
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={ {
            backgroundImage: `repeating-linear-gradient(
              -55deg,
              transparent,
              transparent 18px,
              rgba(255,255,255,0.8) 18px,
              rgba(255,255,255,0.8) 20px
            )`,
          } }
        />

        {/* Subtle radial glow left */ }
        <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#1a3a6e]/60 blur-[120px] pointer-events-none" />
        {/* Subtle radial glow right */ }
        <div className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full bg-[#102952]/50 blur-[100px] pointer-events-none" />

        <div className="relative container mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-64px-8rem)]">

            {/* ── Left: Copy ── */ }
            <div className="flex flex-col gap-6 max-w-xl">

              {/* Gold accent tagline */ }
              <p className="text-[#c9a84c] text-sm font-medium tracking-wide">
                Attorney-reviewed. Built for real life – not just end-of-life.
              </p>

              {/* Headline */ }
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.12] tracking-tight">
                Create a{ " " }
                <em className="not-italic font-bold italic text-white">
                  Revocable Living Trust Online
                </em>{ " " }
                – Avoid Probate and Protect Your Family
              </h1>

              {/* Subtext */ }
              <div className="space-y-2">
                <p className="text-white/75 text-base leading-relaxed">
                  Affordable, trust-based estate planning for everyday Americans who want to
                  protect their family without paying $3,500+ to an attorney.
                </p>
                <p className="text-white/75 text-base leading-relaxed">
                  Avoid probate. Stay in control. Keep your plan updated as life changes.
                </p>
              </div>

              {/* Trust badges */ }
              <div className="flex flex-wrap gap-2 pt-1">
                { [
                  "✓ Attorney Reviewed",
                  "✓ No Court Required",
                  "✓ Update Anytime",
                ].map(b => (
                  <Badge
                    key={ b }
                    variant="outline"
                    className="border-white/20 text-white/70 bg-white/5 text-xs px-3 py-1 rounded-full font-medium"
                  >
                    { b }
                  </Badge>
                )) }
              </div>

              {/* CTA buttons */ }
              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-[#0d1f3c] border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-semibold h-12 px-7 rounded-md transition-all"
                >
                  See How It Works
                </Button>
                <Button
                  size="lg"
                  className="bg-[#2a6fbd] hover:bg-[#1e5fa8] text-white border-0 font-semibold h-12 px-7 rounded-md shadow-lg shadow-blue-900/40 transition-all"
                >
                  Create Your Trust
                </Button>
              </div>

              {/* Social proof */ }
              <div className="flex items-center gap-3 pt-2">
                <div className="flex -space-x-2">
                  { [ "JD", "SM", "RK", "AL" ].map((initials, i) => (
                    <div
                      key={ i }
                      className="w-8 h-8 rounded-full border-2 border-[#0d1f3c] flex items-center justify-center text-[9px] font-bold text-white"
                      style={ {
                        background: [ "#2a6fbd", "#3b82f6", "#1d4ed8", "#1e40af" ][ i ],
                      } }
                    >
                      { initials }
                    </div>
                  )) }
                </div>
                <p className="text-white/50 text-xs">
                  <span className="text-white/80 font-semibold">4,800+</span> families protected
                </p>
                <span className="text-yellow-400 text-xs">★★★★★</span>
              </div>
            </div>

            {/* ── Right: Overlapping photos ── */ }
            <div className="relative flex items-center justify-center h-[480px] lg:h-[540px]">

              {/* Photo 1 — top left, slightly tilted */ }
              <div
                className="absolute top-0 left-0 lg:left-10 w-[55%] lg:w-[52%] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border-4 border-white/10"
                style={ { transform: "rotate(-1.5deg)" } }
              >
                <Image
                  src="/family1.jpg"   // ← replace with your image
                  alt="Happy multi-generation family"
                  fill
                  className="object-cover"
                  // Fallback gradient while image loads
                  onError={ (e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  } }
                />
                {/* Placeholder when no image */ }
                <div className="absolute inset-0 bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-white/30 text-sm">
                  Family Photo 1
                </div>
              </div>

              {/* Photo 2 — bottom right, slightly tilted other way */ }
              <div
                className="absolute bottom-0 right-0 lg:right-4 w-[58%] lg:w-[54%] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border-4 border-white/10 z-10"
                style={ { transform: "rotate(1deg)" } }
              >
                <Image
                  src="/family2.jpg"   // ← replace with your image
                  alt="Happy multi-generation family outdoors"
                  fill
                  className="object-cover"
                  onError={ (e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  } }
                />
                {/* Placeholder when no image */ }
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-white/30 text-sm">
                  Family Photo 2
                </div>
              </div>

              {/* Floating trust badge */ }
              <div className="absolute top-6 right-2 z-20 bg-white rounded-xl shadow-xl px-4 py-3 flex items-center gap-2.5 border border-gray-100">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={ 2.5 }>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800 leading-none">Attorney Reviewed</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Legal & Compliant</p>
                </div>
              </div>

              {/* Floating savings badge */ }
              <div className="absolute bottom-10 left-0 z-20 bg-[#0d1f3c] border border-white/10 rounded-xl shadow-xl px-4 py-3">
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Save up to</p>
                <p className="text-xl font-black text-[#c9a84c] leading-none mt-0.5">$3,500+</p>
                <p className="text-[10px] text-white/50 mt-0.5">vs. attorney fees</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}