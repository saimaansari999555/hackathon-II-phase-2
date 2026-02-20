"use client";

import Link from "next/link";
import { Task } from "@/types/task";
import { formatDate } from "@/lib/utils";
import { Checkbox } from "@/components/ui/Checkbox";
import { Trash2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  isCompleting?: boolean;
}

export function TaskCard({
  task,
  onToggleComplete,
  onDelete,
  isCompleting,
}: TaskCardProps) {
  const isCompleted = task.status === "completed";
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  const priorityStyles = {
    high: 'bg-red-500/10 text-red-500 border-red-500/20',
    medium: 'bg-primary-500/10 text-primary-400 border-primary-500/20',
    low: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  };

  return (
    <div
      className={`bg-[#0f172a]/80 hover:bg-[#161e31] border border-violet-500/20 p-8 rounded-xl shadow-xl transition-all duration-300 ${isCompleted ? 'bg-violet-950/20 border-violet-900/40 opacity-60' : ''
        }`}
    >
      {/* Card Mist Background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl -z-10 group-hover:bg-primary-500/10 transition-all duration-700"></div>

      <div className="flex justify-between items-start mb-6">
        <span
          className={`text-[9px] px-3 py-1.5 rounded-full font-black uppercase tracking-[0.2em] border italic ${priorityStyles[task.priority as keyof typeof priorityStyles] || priorityStyles.low
            }`}
        >
          {task.priority} Priority
        </span>
        <Checkbox
          checked={isCompleted}
          onChange={() => onToggleComplete(task.id)}
          disabled={isCompleting}
          className="w-6 h-6 rounded-full border-primary-500/40 checked:bg-primary-500 checked:border-primary-500 transition-all duration-500"
        />
      </div>

      <Link href={`/tasks/${task.id}`} className="block mb-4">
        <h3
          className={`font-bold text-2xl truncate transition-all duration-300 group-hover:text-violet-400 ${isCompleted ? 'text-white/40 line-through' : 'text-white'
            }`}
        >
          {task.title}
        </h3>
      </Link>

      {task.description && (
        <p className={`text-md line-clamp-2 mb-8 font-medium leading-relaxed ${isCompleted ? 'text-white/20' : 'text-white/60'
          }`}>
          {task.description}
        </p>
      )}

      {/* Progress Matrix */}
      <div className="mb-8 p-4 rounded-2xl bg-primary-500/5 border border-primary-500/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary-50/20 italic">
            Synchronization
          </span>
          <span className="text-[10px] font-black text-primary-500 italic">
            {isCompleted ? '100% COMPLETE' : 'PENDING'}
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-slate-900/50 overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ${isCompleted ? 'bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]' : 'bg-violet-500/20'
              }`}
            style={{ width: isCompleted ? '100%' : '15%' }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-primary-500/10 mt-auto">
        <div className="flex items-center space-x-3 text-primary-50/30">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[10px] font-black italic uppercase tracking-widest">
            {formatDate(task.dueDate || task.createdAt)}
          </span>
        </div>

        <button
          onClick={() => onDelete(task.id)}
          className="p-3 rounded-full hover:bg-red-500/10 text-primary-50/20 hover:text-red-500 transition-all duration-500 opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {isCompleting && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface-dark/80 backdrop-blur-sm z-10 transition-all">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
