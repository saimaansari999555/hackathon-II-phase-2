"use client";

import Link from "next/link";
import { ReactNode, useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { useSession } from "@/lib/auth/provider";
import { Search, Bell, User, Menu, Settings, LogOut, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden relative transition-colors duration-500">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Modern Header */}
        <header className="h-16 glass-morphism bg-white/70 dark:bg-slate-900/70 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-4 lg:px-8 z-30 sticky top-0 transition-all duration-500">
          <div className="flex items-center flex-1 max-w-xl">
            {/* Hamburger Menu Mobile */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 mr-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="relative group flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 group-focus-within:text-primary-500 transition-colors" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-slate-100/50 dark:bg-slate-800/50 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-primary-200 dark:focus:border-primary-800 focus:ring-4 focus:ring-primary-500/5 rounded-2xl py-2 pl-10 pr-16 text-sm transition-all outline-none text-slate-900 dark:text-slate-100"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center space-x-1 px-1.5 py-0.5 bg-slate-200/50 dark:bg-slate-700/50 rounded-md border border-slate-300/50 dark:border-slate-600/50">
                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase">⌘</span>
                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase">K</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 lg:space-x-4 ml-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all group hidden sm:flex"
            >
              {mounted && (theme === 'dark' ? <Sun className="w-5 h-5 group-hover:rotate-90 transition-transform" /> : <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform" />)}
            </button>
            <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

            <div className="relative group/profile">
              <div className="flex items-center space-x-3 cursor-pointer group px-3 py-1.5 hover:bg-slate-100/50 rounded-2xl transition-all">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                    {session?.user?.id.split('-')[0] || "User"}
                  </p>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Premium Member</p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary-100 to-secondary-100 flex items-center justify-center border border-white shadow-sm overflow-hidden group-hover:scale-105 transition-transform">
                  <User className="w-5 h-5 text-primary-600" />
                </div>
              </div>

              {/* Profile Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white/80 backdrop-blur-xl border border-slate-100 rounded-[1.5rem] shadow-2xl opacity-0 invisible group-hover/profile:opacity-100 group-hover/profile:visible transition-all duration-300 transform origin-top-right group-hover/profile:translate-y-0 translate-y-2 p-2 z-50">
                <div className="px-4 py-3 border-b border-slate-50 mb-1">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">My Account</p>
                </div>
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
                <div className="h-px bg-slate-50 my-1 mx-2"></div>
                <button
                  onClick={async () => {
                    const { logout } = await import("@/lib/auth/hooks");
                    await logout();
                    window.location.href = "/";
                  }}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 relative">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
