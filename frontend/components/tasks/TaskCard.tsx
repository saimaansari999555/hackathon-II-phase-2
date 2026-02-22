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
    high: 'bg-rose-50 text-rose-600 border-rose-100',
    medium: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    low: 'bg-slate-50 text-slate-600 border-slate-200',
  };

  return (
    <div
      className={`bg-white hover:bg-slate-50/50 border border-slate-200/60 p-8 rounded-[2rem] shadow-xl shadow-slate-200/30 transition-all duration-300 relative group ${isCompleted ? 'bg-slate-50 border-slate-200 opacity-70' : ''
        }`}
    >
      {/* Card Mist Background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -z-10 group-hover:bg-indigo-500/10 transition-all duration-700"></div>

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
          className="w-6 h-6 rounded-full border-slate-200 checked:bg-indigo-600 checked:border-indigo-600 transition-all duration-500"
        />
      </div>

      <Link href={`/tasks/${task.id}`} className="block mb-4">
        <h3
          className={`font-semibold text-xl truncate transition-all duration-300 group-hover:text-indigo-600 ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-900'
            }`}
        >
          {task.title}
        </h3>
      </Link>

      {task.description && (
        <p className={`text-sm line-clamp-2 mb-8 font-medium leading-relaxed ${isCompleted ? 'text-slate-400' : 'text-slate-600'
          }`}>
          {task.description}
        </p>
      )}

      {/* Progress Matrix */}
      <div className="mb-8 p-4 rounded-[1.5rem] bg-slate-50 border border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Progress Track
          </span>
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
            {isCompleted ? '100% COMPLETE' : 'IN PROGRESS'}
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-200/50 overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ${isCompleted ? 'bg-indigo-600 shadow-[0_0_12px_rgba(79,70,229,0.3)]' : 'bg-indigo-600/30'
              }`}
            style={{ width: isCompleted ? '100%' : '25%' }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
        <div className="flex items-center space-x-2 text-slate-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[11px] font-bold uppercase tracking-wider">
            {formatDate(task.dueDate || task.createdAt)}
          </span>
        </div>

        <button
          onClick={() => onDelete(task.id)}
          className="p-3 rounded-full hover:bg-rose-50 text-slate-300 hover:text-rose-500 transition-all duration-500 opacity-0 group-hover:opacity-100"
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
