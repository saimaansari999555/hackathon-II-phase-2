"use client";

import { TrendingUp } from "lucide-react";

export function ProductivityChart() {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const values = [40, 65, 45, 90, 75, 55, 80]; // Mock statistics

    return (
        <div className="glass-card !bg-surface-card border border-primary-500/10 p-10 shadow-mist-premium relative overflow-hidden group">
            {/* Minimalist Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            <div className="flex items-center justify-between mb-12 relative z-10">
                <div>
                    <h3 className="text-2xl font-black text-white tracking-tighter italic uppercase">Weekly <span className="text-primary-500">Velocity.</span></h3>
                    <p className="text-primary-100/30 text-[10px] font-black uppercase tracking-[0.2em] mt-1 italic">Consistency Analysis</p>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1.5 px-3 py-1 bg-primary-500/10 rounded-full border border-primary-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
                        <span className="text-[9px] font-black text-primary-400 uppercase tracking-widest italic">Live Engine</span>
                    </div>
                </div>
            </div>

            <div className="flex items-end justify-between h-48 px-2 relative z-10">
                {values.map((v, i) => (
                    <div key={i} className="flex flex-col items-center space-y-6 group/bar relative">
                        {/* Hover Tooltip */}
                        <div className="absolute -top-12 opacity-0 group-hover/bar:opacity-100 transition-all duration-300 translate-y-2 group-hover/bar:translate-y-0">
                            <div className="bg-primary-600 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-mist-premium uppercase tracking-widest whitespace-nowrap italic">
                                {v}% DONE
                            </div>
                        </div>

                        <div className="relative w-12 bg-primary-500/5 rounded-[1rem] overflow-hidden h-full border border-primary-500/10">
                            <div
                                className="absolute bottom-0 w-full bg-gradient-to-t from-primary-950 via-primary-600 to-primary-400 rounded-t-[1rem] transition-all duration-1000 group-hover/bar:brightness-125 shadow-lg"
                                style={{ height: `${v}%` }}
                            >
                                <div className="absolute top-3 w-full flex justify-center opacity-40">
                                    <div className="w-1 h-3 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>
                        <span className="text-[10px] font-black text-primary-100/20 uppercase tracking-widest italic">{days[i]}</span>
                    </div>
                ))}
            </div>

            <div className="mt-10 pt-10 border-t border-primary-500/10 flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-6">
                    <div className="text-left">
                        <p className="text-lg font-black text-white tracking-tighter italic">142.4</p>
                        <p className="text-[10px] font-black text-primary-100/30 uppercase tracking-widest italic">Avg Flow</p>
                    </div>
                    <div className="w-px h-8 bg-primary-500/10"></div>
                    <div className="text-left">
                        <p className="text-lg font-black text-primary-500 tracking-tighter italic">92.8%</p>
                        <p className="text-[10px] font-black text-primary-100/30 uppercase tracking-widest italic">Precision</p>
                    </div>
                </div>
                <button className="p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-500 transition-all group shadow-mist">
                    <TrendingUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>
            </div>
        </div>
    );
}
