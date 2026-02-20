"use client";

import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
            <div className="relative">
                <div className="w-20 h-20 bg-primary-100 rounded-[2rem] flex items-center justify-center animate-pulse">
                    <LoadingSpinner size="lg" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-lg">
                    <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
                </div>
            </div>
            <div className="text-center">
                <p className="text-xl font-bold text-slate-900 tracking-tight">Preparing your workspace</p>
                <p className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-widest">Applying glassmorphism effects...</p>
            </div>
        </div>
    );
}
