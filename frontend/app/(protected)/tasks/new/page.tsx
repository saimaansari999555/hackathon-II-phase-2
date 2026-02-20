"use client";

export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTasks } from "@/hooks/useTasks";
import { TaskForm } from "@/components/forms/TaskForm";
import { Button } from "@/components/ui/Button";
import type { CreateTaskRequest, UpdateTaskRequest } from "@/types/task";

export default function NewTaskPage() {
  const router = useRouter();
  const { createTask, isLoading } = useTasks();

  const handleSubmit = async (data: CreateTaskRequest | UpdateTaskRequest) => {
    await createTask(data as CreateTaskRequest);
    router.push("/tasks");
    router.refresh();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-10">
        <Link
          href="/tasks"
          className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-primary-100/40 hover:text-primary-400 transition-all italic group"
        >
          <svg
            className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Abort Integration
        </Link>
      </div>

      <div className="glass-card p-10 !shadow-mist-premium border-primary-500/20">
        <h1 className="text-4xl font-black text-white mb-10 tracking-tighter italic uppercase">Initialize <span className="text-primary-500">Vector.</span></h1>
        <TaskForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
