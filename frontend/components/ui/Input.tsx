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
            "flex h-12 w-full rounded-xl border border-slate-700 bg-slate-900/50 px-6 py-2 text-sm text-white transition-all duration-300",
            "placeholder:text-slate-500",
            "focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500/50 focus:ring-red-500/20",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
