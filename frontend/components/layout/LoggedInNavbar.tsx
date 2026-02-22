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
    { href: "/dashboard", label: "DASHBOARD", icon: LayoutDashboard },
    { href: "/tasks", label: "TASKS", icon: CheckSquare },
    { href: "/calendar", label: "CALENDAR", icon: Calendar },
    { href: "/chat", label: "AI CHAT", icon: MessageSquare },
  ];

  return (
    <header className="relative md:sticky md:top-0 z-40 w-full border-b backdrop-blur-xl border-slate-200 bg-white/90 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-full text-indigo-600 hover:bg-indigo-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link href="/tasks" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg transition-all">
              T
            </div>
            <span className="hidden sm:inline-block text-xl font-bold text-slate-900 tracking-tight">
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
                  className={`flex items-center px-4 py-2 rounded-xl transition-all duration-300 ${isActive
                    ? "bg-indigo-50 text-indigo-600 font-bold"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
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
              <div className="absolute right-0 mt-4 w-64 origin-top-right rounded-2xl bg-white border border-slate-100 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 z-50">
                <div className="p-4">
                  <div className="p-4 rounded-xl bg-slate-50 mb-2 border border-slate-100">
                    <p className="font-bold text-slate-900 truncate">{user?.name}</p>
                    <p className="text-[11px] text-slate-400 truncate font-medium">
                      {user?.email}
                    </p>
                  </div>

                  <Link href="/profile" className="flex items-center px-4 py-3 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                    <User className="w-4 h-4 mr-3" />
                    My Profile
                  </Link>

                  <div className="h-px bg-slate-100 my-2"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 text-sm font-medium text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white backdrop-blur-2xl z-50 animate-in fade-in slide-in-from-top-4 duration-300 border-t border-slate-100 shadow-xl">
          <nav className="p-6 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center p-4 rounded-xl font-bold text-sm tracking-tight ${isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-500"
                    }`}
                >
                  <item.icon className="w-5 h-5 mr-4" />
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center p-4 rounded-xl font-bold text-sm tracking-tight text-rose-500"
            >
              <LogOut className="w-5 h-5 mr-4" />
              Sign Out
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};


export default LoggedInNavbar;
