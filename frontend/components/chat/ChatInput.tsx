"use client";

import React, { useState, FormEvent } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
    onSend: (message: string) => void;
    isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading }) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSend(input);
            setInput("");
        }
    };

    return (
        <div className="p-6 border-t border-primary-500/10 bg-surface-dark/80 backdrop-blur-xl rounded-b-2xl">
            <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything about your tasks..."
                    disabled={isLoading}
                    className="flex-1 bg-surface-dark border border-primary-900/40 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all duration-300 outline-none font-medium placeholder:text-slate-600 text-primary-50 disabled:opacity-50"
                />
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="p-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
                    aria-label="Send message"
                >
                    <Send className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
};

export default ChatInput;
