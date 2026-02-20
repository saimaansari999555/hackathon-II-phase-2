"use client";

import { useTasks } from "@/hooks/useTasks";
import { ProductivityChart } from "@/components/dashboard/ProductivityChart";
import {
    Zap,
    CheckCircle2,
    Clock,
    Target,
    ArrowUpRight,
    TrendingUp,
    Flame
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function DashboardPage() {
    const { tasks, fetchTasks } = useTasks();

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const stats = [
        { label: "Total Tasks", value: tasks.length, icon: Target, color: "text-primary-400", bg: "bg-primary-950/20" },
        { label: "Completed", value: tasks.filter(t => t.status === 'completed').length, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-950/20" },
        { label: "In Progress", value: tasks.filter(t => t.status === 'in_progress').length, icon: Clock, color: "text-primary-400", bg: "bg-primary-950/20" },
        { label: "Current Streak", value: "12", icon: Flame, color: "text-orange-400", bg: "bg-orange-950/20" },
    ];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Welcome Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <div className="flex items-center space-x-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                        <span className="text-[10px] font-black text-primary-100/40 uppercase tracking-[0.2em] italic">System Status: Operational</span>
                    </div>
                    <h1 className="text-5xl font-black text-white tracking-tighter leading-none mb-4 italic">
                        Workspace <span className="text-primary-500/50">Insights.</span>
                    </h1>
                    <p className="text-primary-100/40 font-medium text-lg tracking-tight">Your productivity overview and core performance metrics.</p>
                </div>

                <div className="flex items-center space-x-3">
                    <Link href="/tasks/new">
                        <button className="premium-button bg-primary-600 text-white hover:bg-primary-500 flex items-center space-x-3 py-4 px-10 shadow-mist-premium group italic">
                            <Zap className="w-4 h-4 text-primary-300 fill-current group-hover:scale-125 transition-transform" />
                            <span>New Entry</span>
                        </button>
                    </Link>
                </div>
            </div>

            {/* Stats Quick View */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((s, i) => (
                    <div key={i} className="glass-card p-8 rounded-[2.5rem] group hover:scale-[1.02] transition-all cursor-pointer border-primary-500/10 relative overflow-hidden !bg-surface-card">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 -mr-16 -mt-16 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                                <div className={`w-14 h-14 ${s.bg} rounded-2xl flex items-center justify-center shadow-sm border border-primary-500/10`}>
                                    <s.icon className={`w-7 h-7 ${s.color}`} />
                                </div>
                                <ArrowUpRight className="w-5 h-5 text-primary-100/20 group-hover:text-primary-500 transition-colors" />
                            </div>
                            <p className="text-primary-100/30 text-[10px] font-black uppercase tracking-[0.2em] mb-1 italic">{s.label}</p>
                            <h3 className="text-4xl font-black text-white tracking-tighter italic">{s.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
                {/* Productivity Chart */}
                <div className="lg:col-span-2">
                    <ProductivityChart />
                </div>

                {/* Right Sidebar - Logic & Promo */}
                <div className="space-y-8">
                    <div className="glass-card !bg-surface-dark border-primary-500/20 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-mist-premium group">
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-600/10 rounded-full blur-[100px] group-hover:scale-125 transition-transform duration-1000"></div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-primary-500/10 rounded-2xl flex items-center justify-center mb-10 border border-primary-500/20">
                                <TrendingUp className="w-6 h-6 text-primary-400" />
                            </div>
                            <h3 className="text-2xl font-black mb-4 tracking-tighter italic">Pro Ecosystem.</h3>
                            <p className="text-primary-100/40 text-sm font-medium mb-10 leading-relaxed italic">Ignite your potential with global sync and AI-driven workflow engines.</p>
                            <button className="w-full py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl active:scale-95 italic">Upgrade Workflow</button>
                        </div>
                    </div>

                    <div className="glass-card !bg-surface-card border-primary-500/10 rounded-[3rem] p-10 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/5 -mr-12 -mt-12 rounded-full"></div>
                        <h3 className="font-black text-white mb-8 tracking-tighter text-xl relative z-10 italic uppercase">Core Targets.</h3>
                        <div className="space-y-5 relative z-10">
                            {[
                                { title: "Executive Review: TodoMaster v2.0", time: "High Focus" },
                                { title: "Strategic Resource Management", time: "Critical Path" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center space-x-4 p-4 bg-primary-500/5 rounded-2xl border border-primary-500/10 hover:border-primary-500/30 hover:bg-primary-500/10 transition-all cursor-pointer group">
                                    <div className="w-3 h-3 rounded-full bg-primary-600 shadow-[0_0_12px_rgba(16,185,129,0.5)]"></div>
                                    <div>
                                        <p className="text-xs font-black text-primary-100 line-clamp-1 truncate italic">{item.title}</p>
                                        <p className="text-[10px] text-primary-100/30 font-black uppercase tracking-widest mt-0.5 italic">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
