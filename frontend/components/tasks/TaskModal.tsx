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
                className="absolute inset-0 bg-slate-100/40 backdrop-blur-md animate-in fade-in duration-500"
                onClick={onClose}
            ></div>

            {/* Command Menu Style Modal */}
            <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 overflow-hidden border border-slate-200/60">
                {/* Header Section */}
                <div className="flex items-center justify-between px-10 pt-10 pb-6 border-b border-slate-100">
                    <div className="flex items-center space-x-6">
                        <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100">
                            <Plus className="w-7 h-7 text-indigo-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h2>
                            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mt-0.5">Productivity Workflow • Task Engine</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="hidden sm:flex px-3 py-1 bg-primary-500/5 rounded-lg text-[10px] font-black text-primary-100/20 border border-primary-500/10 uppercase tracking-widest italic">Esc Protocol</span>
                        <button
                            onClick={onClose}
                            className="p-3 hover:bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 transition-all active:scale-95 border border-transparent"
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
                <div className="bg-slate-50/50 px-10 py-6 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
                        <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3 animate-pulse shadow-[0_0_8px_rgba(79,70,229,0.4)]"></span>
                        Tip: Set priorities to optimize your productivity flow.
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
