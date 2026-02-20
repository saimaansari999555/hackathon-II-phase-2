import { LoadingSpinner } from "./LoadingSpinner";

interface LoadingOverlayProps {
  message?: string;
}

export function LoadingOverlay({ message = "Loading..." }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 bg-surface-dark/80 backdrop-blur-2xl flex flex-col items-center justify-center z-[100] animate-in fade-in duration-500">
      <div className="relative">
        <div className="w-20 h-20 bg-primary-500/10 rounded-[2rem] flex items-center justify-center animate-pulse border border-primary-500/20">
          <LoadingSpinner size="lg" className="text-primary-500" />
        </div>
      </div>
      {message && (
        <p className="mt-8 text-primary-100/40 text-[10px] font-black uppercase tracking-[0.3em] italic">{message}</p>
      )}
    </div>
  );
}
