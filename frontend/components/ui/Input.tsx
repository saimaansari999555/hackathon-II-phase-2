import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(
            "flex h-14 w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-6 py-2 text-sm text-slate-900 transition-all duration-300",
            "placeholder:text-slate-400 font-medium",
            "focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-rose-500/50 focus:ring-rose-500/10",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
