"use client";

import { TaskForm } from "@/components/forms/TaskForm";
import { X, Plus } from "lucide-react";

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

export function TaskModal({ isOpen, onClose, title }: TaskModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-12">
            {/* Backdrop with Ultra Blur */}
            <div
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-500"
                onClick={onClose}
            ></div>

            {/* Command Menu Style Modal */}
            <div className="relative w-full max-w-2xl bg-[#0f172a] rounded-2xl shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 overflow-hidden border border-violet-500/20">
                {/* Header Section */}
                <div className="flex items-center justify-between px-10 pt-10 pb-6 border-b border-primary-500/10">
                    <div className="flex items-center space-x-6">
                        <div className="w-14 h-14 bg-violet-500/10 rounded-xl flex items-center justify-center border border-violet-500/20">
                            <Plus className="w-7 h-7 text-violet-500" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white tracking-tighter italic uppercase">{title}.</h2>
                            <p className="text-violet-400/30 text-[10px] font-black uppercase tracking-[0.2em] mt-1 italic">SaaS Workflow • Core Engine</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="hidden sm:flex px-3 py-1 bg-primary-500/5 rounded-lg text-[10px] font-black text-primary-100/20 border border-primary-500/10 uppercase tracking-widest italic">Esc Protocol</span>
                        <button
                            onClick={onClose}
                            className="p-3 hover:bg-primary-500/10 rounded-2xl text-primary-100/20 hover:text-white transition-all active:scale-95 border border-transparent hover:border-primary-500/20"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="p-10">
                    <TaskForm
                        onSubmit={async (data) => {
                            onClose();
                        }}
                    />
                </div>

                {/* Bottom Tip Section */}
                <div className="bg-primary-500/5 px-10 py-6 border-t border-primary-500/10 flex items-center justify-between">
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] italic flex items-center">
                        <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mr-3 animate-pulse shadow-[0_0_8px_#8b5cf6]"></span>
                        Tip: Set priorities to optimize your dashboard analytics.
                    </p>
                    <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-primary-500/10"></div>
                        <div className="w-2 h-2 rounded-full bg-primary-500/10"></div>
                        <div className="w-2 h-2 rounded-full bg-primary-500 shadow-mist"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
