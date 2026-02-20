// components/landing/Hero.tsx
"use client";

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const Hero = () => {
  return (
    <section className="relative text-center py-24 md:py-48 px-4 overflow-hidden">
      {/* Background Mist Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-500/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-primary-500/20 bg-primary-500/5 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
            <span className="text-[10px] font-black text-primary-400 uppercase tracking-[0.2em]">Deployment Active</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] italic">
            Architect Your <br />
            <span className="text-gradient italic">Neural Roadmap.</span>
          </h1>
          <p className="text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed text-primary-50/60 tracking-tight">
            The next-generation protocol for strategic task management and productivity optimization.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 px-4 sm:px-0">
          <Link
            href="/register"
            className="premium-button bg-primary-500 hover:bg-primary-400 text-white min-w-[220px] uppercase tracking-widest text-[10px] sm:text-xs font-black"
          >
            Initialize Account
          </Link>
          <Link
            href="/login"
            className="premium-button bg-transparent border-2 border-primary-500/30 text-primary-400 hover:bg-primary-500/10 min-w-[220px]"
          >
            Access Node
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
