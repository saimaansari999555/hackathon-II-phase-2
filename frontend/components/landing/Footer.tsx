// components/landing/Footer.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";

const Footer = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <footer className="border-t border-primary-500/10 bg-surface-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          <div className="space-y-6">
            <Link href="/" className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-100 italic tracking-tighter">
              TodoMaster
            </Link>
            <p className="text-sm text-primary-100/40 font-medium leading-relaxed">
              Synthesize your workflow and amplify productivity through neural task management.
            </p>
          </div>

          <div>
            <h4 className="font-black text-white uppercase tracking-widest text-[10px] mb-8 italic">
              Infrastructure
            </h4>
            <ul className="space-y-4">
              {["Features", "Scalability", "Security"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs font-bold text-primary-100/30 hover:text-primary-400 transition-all italic">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white uppercase tracking-widest text-[10px] mb-8 italic">
              Foundation
            </h4>
            <ul className="space-y-4">
              {["About", "Intelligence", "Careers"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs font-bold text-primary-100/30 hover:text-primary-400 transition-all italic">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white uppercase tracking-widest text-[10px] mb-8 italic">
              Protocol
            </h4>
            <ul className="space-y-4">
              {["Privacy", "Terms", "Compliance"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs font-bold text-primary-100/30 hover:text-primary-400 transition-all italic">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-500/10 pt-10 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-100/20 italic">
            &copy; {new Date().getFullYear()} TodoMaster // Neural Architecture Active.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
