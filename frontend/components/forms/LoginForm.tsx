"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { login } from "@/lib/auth/hooks";
import { useSession } from "@/lib/auth/provider";
import { loginSchema, type LoginSchema } from "@/lib/validation/schemas";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export function LoginForm() {
  const router = useRouter();
  const { theme } = useTheme();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { session, refreshSession } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 🔥 Redirect ONLY when session exists - to /tasks instead of /dashboard
  useEffect(() => {
    if (session && mounted) {
      router.push("/tasks");
    }
  }, [session, router, mounted]);

  const onSubmit = async (data: LoginSchema) => {
    setError(null);
    setIsLoading(true);

    try {
      await login(data.email, data.password);
      await refreshSession(); // just update session
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      {error && (
        <div className="p-4 text-xs font-black uppercase tracking-widest border border-red-500/20 bg-red-500/5 text-red-500 rounded-xl animate-pulse italic">
          !! Error: {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-50/30 ml-1 italic">Operative Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="id@network.com"
          className="premium-input w-full"
          disabled={isLoading}
          {...register("email")}
        />
        {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1 italic uppercase tracking-wider">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between ml-1">
          <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-50/30 italic">Access Phrase</Label>
          <a href="#" className="text-[10px] font-black italic uppercase tracking-widest text-primary-500 hover:text-primary-400">Recovery</a>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          className="premium-input w-full"
          disabled={isLoading}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-[10px] text-red-500 font-bold ml-1 italic uppercase tracking-wider">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="premium-button w-full bg-primary-500 text-white hover:bg-primary-400" disabled={isLoading}>
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          </div>
        ) : "Authenticate Operative"}
      </Button>
    </form>
  );
}
