// components/layout/LoggedInNavbar.tsx
"use client";

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { LayoutDashboard, CheckSquare, User, LogOut, ChevronDown, Sun, Moon, Menu, X, Calendar, MessageSquare } from 'lucide-react';

const LoggedInNavbar = () => {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (isLoading) return null;

  const navItems = [
    { href: "/dashboard", label: "NODE", icon: LayoutDashboard },
    { href: "/tasks", label: "LOGS", icon: CheckSquare },
    { href: "/calendar", label: "TIMELINE", icon: Calendar },
    { href: "/chat", label: "AI ASSISTANT", icon: MessageSquare },
  ];

  return (
    <header className="relative md:sticky md:top-0 z-40 w-full border-b backdrop-blur-xl border-violet-500/10 bg-[#020617]/90 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-full text-primary-500 hover:bg-primary-500/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link href="/tasks" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center font-black text-white shadow-mist group-hover:shadow-mist-premium transition-all">
              T
            </div>
            <span className="hidden sm:inline-block text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-100 italic tracking-tighter">
              TodoMaster
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest italic">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-5 py-2.5 rounded-full transition-all duration-500 ${isActive
                    ? "bg-primary-500/10 text-primary-400 border border-primary-500/20"
                    : "text-primary-50/30 hover:text-primary-400 hover:bg-primary-500/5"
                    }`}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-4 rounded-full p-1 group transition-all"
            >
              <div className="w-11 h-11 rounded-full bg-primary-500 flex items-center justify-center text-white font-black shadow-mist group-hover:shadow-mist-premium ring-2 ring-primary-500/20 transition-all">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-xs font-black uppercase text-white tracking-widest italic">{user?.name}</span>
                <span className="text-[9px] font-black uppercase text-primary-500 tracking-[0.2em] mt-0.5">Operative</span>
              </div>
              <ChevronDown className={`w-3 h-3 text-primary-50/20 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-6 w-72 origin-top-right rounded-2xl bg-surface-dark border border-primary-500/10 shadow-mist-premium animate-in fade-in slide-in-from-top-4 duration-500 z-50">
                <div className="p-4">
                  <div className="p-4 rounded-xl bg-primary-500/5 mb-4 border border-primary-500/10">
                    <p className="font-black text-white italic tracking-tight truncate">{user?.name}</p>
                    <p className="text-[10px] text-primary-50/30 truncate uppercase tracking-widest font-black mt-1">
                      {user?.email}
                    </p>
                  </div>

                  <Link href="/profile" className="flex items-center px-4 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-primary-50/40 hover:text-primary-400 hover:bg-primary-500/5 rounded-xl transition-all italic">
                    <User className="w-4 h-4 mr-4" />
                    Security Protocol
                  </Link>

                  <div className="h-px bg-primary-500/10 my-4"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-red-500/40 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all italic"
                  >
                    <LogOut className="w-4 h-4 mr-4" />
                    Terminate Session
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-surface-dark/95 backdrop-blur-2xl z-50 animate-in fade-in slide-in-from-top-4 duration-500 border-t border-primary-500/10">
          <nav className="p-8 space-y-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center p-6 rounded-2xl font-black uppercase tracking-[0.2em] italic ${isActive
                    ? "bg-primary-500/10 text-primary-400 border border-primary-500/20"
                    : "text-primary-50/30"
                    }`}
                >
                  <item.icon className="w-6 h-6 mr-6" />
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center p-6 rounded-2xl font-black uppercase tracking-[0.2em] italic text-red-500/60"
            >
              <LogOut className="w-6 h-6 mr-6" />
              Terminate
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};


export default LoggedInNavbar;
