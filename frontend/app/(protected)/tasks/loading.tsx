"use client";

import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-10">
            <div className="relative">
                <div className="w-24 h-24 bg-primary-500/5 rounded-[2.5rem] flex items-center justify-center animate-pulse border border-primary-500/10 ring-8 ring-primary-500/5">
                    <LoadingSpinner size="lg" className="text-primary-500" />
                </div>
                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-surface-dark border border-primary-500/20 rounded-2xl flex items-center justify-center shadow-mist-premium ring-4 ring-primary-500/5">
                    <div className="w-2.5 h-2.5 bg-primary-500 rounded-full animate-bounce"></div>
                </div>
            </div>
            <div className="text-center space-y-4">
                <p className="text-2xl font-black text-white tracking-tighter italic uppercase">Synchronizing <span className="text-primary-500">Workspace.</span></p>
                <p className="text-[10px] font-black text-primary-100/30 uppercase tracking-[0.3em] italic">Applying encryption protocols...</p>
            </div>
        </div>
    );
}
