"use client";

import Link from "next/link";
import PublicNavbar from "@/components/layout/PublicNavbar";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <>
            <PublicNavbar />
            <div className="min-h-screen bg-surface-dark flex flex-col items-center justify-center p-6 text-center">
                <div className="relative mb-12">
                    <div className="text-[12rem] font-black text-primary-500/10 leading-none select-none italic tracking-tighter">
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-40 h-40 bg-primary-600 rounded-[3rem] rotate-12 flex items-center justify-center shadow-mist-premium border border-primary-500/20">
                            <span className="text-white font-black text-6xl -rotate-12 italic">?</span>
                        </div>
                    </div>
                </div>

                <h1 className="text-5xl font-black text-white mb-4 tracking-tighter italic uppercase">
                    Nexus <span className="text-primary-500">Severed.</span>
                </h1>
                <p className="text-primary-100/40 max-w-sm mx-auto mb-12 text-lg font-medium italic">
                    The requested node is currently inaccessible or has been purged from the network.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                        href="/"
                        className="premium-button bg-primary-600 text-white flex items-center space-x-3 px-10 py-4 shadow-mist-premium italic"
                    >
                        <Home className="w-5 h-5" />
                        <span>Return to Core</span>
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center space-x-3 px-10 py-4 bg-primary-500/5 border border-primary-500/20 rounded-full text-primary-400 font-black text-[10px] uppercase tracking-widest hover:bg-primary-500/10 transition-all active:scale-95 italic"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Recover Path</span>
                    </button>
                </div>
            </div>
        </>
    );
}
