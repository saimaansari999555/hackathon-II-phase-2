"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/tasks", label: "Tasks", icon: "✓" },
    { href: "/categories", label: "Categories", icon: "📂" },
    { href: "/profile", label: "Profile", icon: "👤" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-72 bg-surface-dark border-r border-primary-500/10 transition-transform duration-500 z-50 lg:relative lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-primary-500/10">
          <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-100 italic tracking-tighter">
            TodoMaster
          </h1>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-primary-500/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-primary-500" />
          </button>
        </div>

        <nav className="p-6 space-y-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center space-x-4 px-6 py-4 rounded-full transition-all duration-500 font-bold uppercase tracking-widest text-[10px] italic ${isActive
                    ? "bg-primary-500 text-white shadow-mist-premium"
                    : "text-primary-50/40 hover:text-primary-400 hover:bg-primary-500/5"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
