"use client";

import { Folder, Hash, Star, LayoutGrid, Plus, MoreHorizontal } from "lucide-react";

export default function CategoriesPage() {
    const categories = [
        { title: "Core Architecture", count: 8, color: "from-blue-500 to-indigo-600", icon: Folder },
        { title: "Strategic Roadmap", count: 12, color: "from-purple-500 to-pink-600", icon: LayoutGrid },
        { title: "Neural Research", count: 5, color: "from-amber-400 to-orange-500", icon: Hash },
        { title: "Priority Vectors", count: 15, color: "from-emerald-400 to-teal-500", icon: Star }
    ];

    return (
        <div className="space-y-12 pb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 relative">
            {/* Page Heading */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 relative z-10">
                <div>
                    <div className="flex items-center space-x-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                        <span className="text-[10px] font-black text-primary-100/40 uppercase tracking-[0.2em] italic">Classification Engine Active</span>
                    </div>
                    <h1 className="text-5xl font-black text-white tracking-tighter leading-none mb-4 italic">Neural <span className="text-primary-500/50">Clusters.</span></h1>
                    <p className="text-primary-100/40 font-medium text-lg tracking-tight">Organizing your workspace into <span className="text-white font-black">strategic data pools</span>.</p>
                </div>

                <div className="flex items-center gap-4">
                    <button className="premium-button bg-primary-600 text-white hover:bg-primary-500 flex items-center space-x-3 py-4 px-10 shadow-mist-premium group italic">
                        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
                        <span>Initialize Cluster</span>
                    </button>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {categories.map((category, i) => (
                    <div key={i} className="group cursor-pointer">
                        <div className="glass-card !bg-surface-card p-8 rounded-[3rem] border border-primary-500/10 shadow-mist-premium group-hover:scale-[1.05] group-hover:shadow-mist-glow transition-all relative overflow-hidden h-full">
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.color} opacity-[0.05] group-hover:opacity-[0.15] -mr-16 -mt-16 rounded-full transition-all duration-700`}></div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-10">
                                    <div className={`w-16 h-16 bg-gradient-to-tr ${category.color} rounded-[2rem] flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500 shadow-primary-500/20`}>
                                        <category.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <button className="p-2 hover:bg-primary-500/10 rounded-xl text-primary-100/20 transition-all">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </div>

                                <h3 className="text-2xl font-black text-white mb-2 italic tracking-tighter uppercase">{category.title}.</h3>
                                <div className="flex items-center justify-between mt-8 pt-6 border-t border-primary-500/10">
                                    <span className="text-[10px] font-black text-primary-100/30 uppercase tracking-[0.2em] italic">{category.count} Strategic Nodes</span>
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(j => (
                                            <div key={j} className="w-6 h-6 rounded-full border-2 border-surface-dark bg-primary-950/40"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Create New Category Placeholder */}
                <div className="group cursor-pointer">
                    <div className="h-full border-2 border-dashed border-primary-500/10 rounded-[3rem] p-8 flex flex-col items-center justify-center gap-6 hover:bg-primary-500/5 hover:border-primary-500/30 transition-all group-hover:scale-[1.02]">
                        <div className="w-16 h-16 bg-primary-500/5 rounded-[2rem] flex items-center justify-center group-hover:bg-primary-600 transition-all">
                            <Plus className="w-8 h-8 text-primary-100/20 group-hover:text-white" />
                        </div>
                        <span className="text-[10px] font-black text-primary-100/30 uppercase tracking-[0.3em] italic">New Cluster α</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
