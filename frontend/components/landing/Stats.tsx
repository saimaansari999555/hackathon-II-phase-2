// components/landing/Stats.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Users, CheckCircle, Zap } from "lucide-react";

const Stats = () => {
  const stats = [
    { icon: Users, label: "Network nodes", value: "10k+" },
    { icon: CheckCircle, label: "Tasks Decrypted", value: "1M+" },
    { icon: Zap, label: "Uptime Frequency", value: "99.9%" },
  ];

  return (
    <section className="py-24 md:py-48 px-4 bg-surface-dark_variant/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-12 rounded-[2rem] border border-primary-500/10 bg-surface-dark/40 shadow-mist hover:shadow-mist-premium hover:-translate-y-2 transition-all duration-500"
              >
                <div className="mb-6 inline-flex p-4 rounded-full bg-primary-500/10 border border-primary-500/20">
                  <Icon className="w-8 h-8 text-primary-500" />
                </div>
                <p className="text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-br from-primary-400 to-primary-600 tracking-tighter italic">
                  {stat.value}
                </p>
                <p className="text-sm font-black text-primary-50/40 uppercase tracking-[0.3em] italic">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
