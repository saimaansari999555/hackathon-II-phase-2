// app/register/page.tsx
"use client";

import { RegisterForm } from '@/components/forms/RegisterForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function RegisterPage() {
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-[150px] -z-10 text-center"></div>

      <div className="absolute top-8 left-8">
        <Link href="/" className="inline-flex items-center text-primary-50/40 hover:text-primary-400 transition-all group font-black uppercase tracking-widest text-[10px] italic">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Abort Sequence
        </Link>
      </div>

      <div className="w-full max-w-md animate-in fade-in slide-in-from-top-12 duration-700">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-primary-400 to-primary-600 mb-2 tracking-tighter italic uppercase">
            Mobilize.
          </h1>
          <p className="text-primary-50/40 font-black uppercase tracking-[0.2em] text-[10px] italic">
            Initialize distributed intelligence
          </p>
        </div>

        <div className="glass-card p-10 !shadow-mist-premium border-primary-500/20">
          <RegisterForm />
        </div>

        <p className="text-center mt-12 text-primary-50/40 font-medium">
          Already verified?{' '}
          <Link href="/login" className="text-primary-400 hover:text-primary-300 font-black italic uppercase tracking-wider underline underline-offset-8 decoration-primary-500/30 transition-all">
            Execute Entry
          </Link>
        </p>
      </div>
    </div>
  );
}
