// components/layout/PublicNavbar.tsx
"use client";

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

const PublicNavbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <header className="sticky top-0 w-full z-[100] backdrop-blur-xl border-b border-primary-500/10 bg-surface-dark/90 px-4 md:px-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-2.5 md:py-6">
        <Link href="/" className="group flex items-center space-x-2">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-primary-500 rounded-full flex items-center justify-center shadow-mist group-hover:shadow-mist-premium transition-all duration-500">
            <span className="text-white font-black text-lg md:text-xl italic">T</span>
          </div>
          <span className="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-100 tracking-tighter italic">
            TodoMaster
          </span>
        </Link>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-primary-400 hover:text-primary-300 transition-colors"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/login"
            className="text-slate-400 hover:text-primary-400 font-bold transition-all duration-300 text-sm uppercase tracking-widest px-4 py-2"
          >
            Entry
          </Link>

          <Link
            href="/register"
            className="premium-button bg-primary-500 hover:bg-primary-400 text-white !py-3 !px-8 text-[10px]"
          >
            Initialize Account
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Logic added but styling kept minimal) */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-surface-dark/95 backdrop-blur-2xl border-b border-primary-500/10 py-6 px-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-4">
            <Link
              href="/login"
              className="text-primary-100/60 font-black text-xs uppercase tracking-widest px-4 py-3 hover:bg-primary-500/5 rounded-xl transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Entry
            </Link>
            <Link
              href="/register"
              className="premium-button bg-primary-600 text-white w-full text-center py-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Initialize Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicNavbar;