"use client";

import React, { useEffect } from "react";
import ChatContainer from "@/components/chat/ChatContainer";
import LoggedInNavbar from "@/components/layout/LoggedInNavbar";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function ChatPage() {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        document.title = "AI Assistant | TodoMaster";
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-surface-dark">
                <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-surface-dark">
            <LoggedInNavbar />
            <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-black text-white italic tracking-tighter mb-2">
                        AI <span className="text-primary-500">OPERATIVE</span>
                    </h1>
                    <p className="text-primary-50/30 uppercase tracking-[0.3em] text-[10px] font-black">
                        Direct interface with task management intelligence
                    </p>
                </div>

                <ChatContainer />
            </main>
        </div>
    );
}
