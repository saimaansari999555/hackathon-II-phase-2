"use client";

import React, { useEffect, useRef } from "react";
import ChatMessageBubble from "./ChatMessageBubble";

interface Message {
    role: "user" | "assistant";
    content: string;
}

interface ChatMessagesProps {
    messages: Message[];
    isLoading: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    return (
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 custom-scrollbar">
            {messages.map((msg, index) => (
                <ChatMessageBubble key={index} content={msg.content} role={msg.role} />
            ))}

            {isLoading && (
                <div className="flex justify-start mb-4">
                    <div className="bg-primary-950/20 border border-primary-500/10 rounded-2xl rounded-tl-none px-5 py-4 shadow-mist">
                        <div className="flex space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        </div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default ChatMessages;
