"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, MapPin } from "lucide-react";

export default function CalendarPage() {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Mock events for the premium look
    const events = [
        { date: 15, title: "Product Sync α", type: "meeting" },
        { date: 18, title: "Deploy Workspace", type: "task" },
        { date: 22, title: "Core Architecture Review", type: "review" }
    ];

    return (
        <div className="space-y-12 pb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 relative">
            {/* Page Heading */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 relative z-10">
                <div>
                    <div className="flex items-center space-x-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                        <span className="text-[10px] font-black text-primary-100/40 uppercase tracking-[0.2em] italic">Temporal Core Active</span>
                    </div>
                    <h1 className="text-5xl font-black text-white tracking-tighter leading-none mb-4 italic">Neural <span className="text-primary-500/50">Timeline.</span></h1>
                    <p className="text-primary-100/40 font-medium text-lg tracking-tight">Navigating through your strategic roadmap for <span className="text-white font-black">January '26</span>.</p>
                </div>

                <div className="flex items-center gap-4">
                    <button className="premium-button bg-primary-600 text-white hover:bg-primary-500 flex items-center space-x-3 py-4 px-10 shadow-mist-premium group italic">
                        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
                        <span>Schedule Node</span>
                    </button>
                </div>
            </div>

            {/* Premium Calendar Grid */}
            <div className="glass-card !bg-surface-card p-4 md:p-10 rounded-3xl md:rounded-[3rem] border border-primary-500/10 shadow-mist-premium relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 md:mb-12 relative z-10">
                    <h2 className="text-xl md:text-2xl font-black text-white italic uppercase tracking-tighter">January 2026</h2>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 md:p-3 hover:bg-primary-500/10 rounded-lg md:rounded-2xl text-primary-100/40 transition-all border border-primary-500/10">
                            <ChevronLeft className="w-4 md:w-5 h-4 md:h-5" />
                        </button>
                        <button className="p-2 md:p-3 hover:bg-primary-500/10 rounded-lg md:rounded-2xl text-primary-100/40 transition-all border border-primary-500/10">
                            <ChevronRight className="w-4 md:w-5 h-4 md:h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-2 md:gap-4 relative z-10 overflow-x-auto">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                        <div key={day} className="text-center pb-3 md:pb-6">
                            <span className="text-[8px] md:text-[10px] font-black text-primary-100/20 uppercase tracking-[0.1em] md:tracking-[0.2em] italic">{day}</span>
                        </div>
                    ))}

                    {Array.from({ length: 31 }).map((_, i) => {
                        const day = i + 1;
                        const hasEvent = events.find(e => e.date === day);
                        const isToday = day === 28;

                        return (
                            <div key={i} className={`min-h-[80px] md:min-h-[140px] p-2 md:p-6 rounded-lg md:rounded-[2rem] border transition-all relative group cursor-pointer ${isToday
                                ? 'bg-primary-600 border-primary-500 shadow-mist-premium scale-[1.02] md:scale-[1.05] z-20'
                                : 'bg-primary-500/5 border-primary-500/10 hover:bg-primary-500/10 hover:shadow-mist active:scale-95'
                                }`}>
                                <span className={`text-sm md:text-xl font-black italic tracking-tighter transition-colors ${isToday ? 'text-white' : 'text-primary-100/20 group-hover:text-white'
                                    }`}>
                                    {day < 10 ? `0${day}` : day}
                                </span>

                                {hasEvent && (
                                    <div className="mt-4 space-y-2">
                                        <div className={`p-2.5 rounded-xl border flex flex-col items-start gap-1 transition-all ${isToday ? 'bg-white/10 border-white/20 text-white' : 'bg-surface-dark/50 border-primary-500/20 shadow-sm'
                                            }`}>
                                            <span className={`text-[8px] font-black uppercase tracking-wider italic ${isToday ? 'text-white' : 'text-primary-400'
                                                }`}>
                                                {hasEvent.type}
                                            </span>
                                            <span className={`text-[10px] font-bold line-clamp-1 ${isToday ? 'text-white' : 'text-primary-50'}`}>{hasEvent.title}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                <div className="glass-card !bg-surface-card p-8 rounded-[2.5rem] border border-primary-500/10 shadow-mist-premium group hover:scale-[1.02] transition-all">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="w-12 h-12 bg-primary-500/10 rounded-2xl flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-primary-500" />
                        </div>
                        <h3 className="text-lg font-black text-white italic tracking-tighter uppercase">Local Nodes.</h3>
                    </div>
                    <p className="text-sm font-medium text-primary-100/40 italic">Syncing across 3 strategic locations for today's roadmap execution.</p>
                </div>
            </div>
        </div>
    );
}
