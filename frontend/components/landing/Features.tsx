// components/landing/Features.tsx
"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { CheckCircle, Users, BarChart3 } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: CheckCircle,
      title: 'Neural Tasking',
      description: 'Advanced heuristic categorization and strategic priority nodes for maximum output.',
    },
    {
      icon: Users,
      title: 'Collective Sync',
      description: 'Distributed network architecture allowing real-time collaborative task execution.',
    },
    {
      icon: BarChart3,
      title: 'Temporal Matrix',
      description: 'High-fidelity analytics and metric visualization of your productivity timeline.',
    },
  ];

  return (
    <section className="py-24 md:py-48 px-4 bg-surface-dark relative overflow-hidden">
      {/* Background Mist */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-4">
          <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase">Protocol <span className="text-primary-500">Modules.</span></h2>
          <p className="text-primary-50/40 font-medium text-lg tracking-widest uppercase">High performance task infrastructure</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="glass-card p-10 group hover:-translate-y-4 transition-all duration-700 animate-in fade-in zoom-in"
              >
                <div className="mb-8 inline-flex p-4 rounded-2xl bg-primary-500/10 border border-primary-500/20 group-hover:bg-primary-500/20 transition-colors">
                  <Icon className="w-10 h-10 text-primary-500" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-white italic tracking-tight uppercase">
                  {feature.title}
                </h3>
                <p className="text-primary-50/60 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
