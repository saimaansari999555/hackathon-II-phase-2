// app/login/page.tsx
"use client";

import { LoginForm } from '@/components/forms/LoginForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-surface-dark relative overflow-hidden">
      {/* Background Mist */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px] -z-10"></div>

      <div className="absolute top-8 left-8">
        <Link href="/" className="inline-flex items-center text-primary-50/40 hover:text-primary-400 transition-all group font-black uppercase tracking-widest text-[10px] italic">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Retreat to Origin
        </Link>
      </div>

      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600 mb-2 tracking-tighter italic uppercase">
            Identify.
          </h1>
          <p className="text-primary-50/40 font-black uppercase tracking-[0.2em] text-[10px] italic">
            Access secure productivity node
          </p>
        </div>

        <div className="glass-card p-10 !shadow-mist-premium border-primary-500/20">
          <LoginForm />
        </div>

        <p className="text-center mt-12 text-primary-50/40 font-medium">
          New operative?{' '}
          <Link href="/register" className="text-primary-400 hover:text-primary-300 font-black italic uppercase tracking-wider underline underline-offset-8 decoration-primary-500/30 transition-all">
            Join the Network
          </Link>
        </p>
      </div>
    </div>
  );
}
