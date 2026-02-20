"use client";

import React from "react";

interface ChatMessageBubbleProps {
    content: string;
    role: "user" | "assistant";
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ content, role }) => {
    const isUser = role === "user";

    return (
        <div
            className={`flex w-full mb-4 ${isUser ? "justify-end" : "justify-start"
                }`}
        >
            <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${isUser
                        ? "bg-primary-600 text-white rounded-tr-none"
                        : "bg-surface-dark_variant border border-primary-500/10 text-primary-50 rounded-tl-none"
                    }`}
            >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
            </div>
        </div>
    );
};

export default ChatMessageBubble;
