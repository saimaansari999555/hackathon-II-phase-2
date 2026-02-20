"use client";

import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { taskApi } from "@/lib/api/tasks";
import { TaskForm } from "@/components/forms/TaskForm";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/Button";
import type { Task, UpdateTaskRequest } from "@/types/task";

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const taskId = params.id as string;

  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskData = await taskApi.getById(taskId);
        setTask(taskData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load task");
      } finally {
        setIsLoading(false);
      }
    };

    if (taskId) {
      fetchTask();
    }
  }, [taskId]);

  const handleSubmit = async (data: UpdateTaskRequest) => {
    if (!task) return;

    setIsSaving(true);
    try {
      await taskApi.update(task.id, data);
      router.push("/tasks");
      router.refresh();
    } catch (err) {
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link
            href="/tasks"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to tasks
          </Link>
        </div>

        <div className="glass-card p-12 !shadow-mist-premium border-primary-500/20">
          <div className="text-center">
            <div className="w-16 h-16 text-red-500 mx-auto mb-6 bg-red-500/5 rounded-2xl flex items-center justify-center border border-red-500/10">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-white mb-4 tracking-tighter italic uppercase">Vector Not Found</h3>
            <p className="text-primary-100/40 mb-8 font-medium leading-relaxed uppercase tracking-widest text-[10px] italic">{error}</p>
            <Link href="/tasks">
              <Button className="premium-button bg-primary-600 text-white hover:bg-primary-500 px-10 italic">Return to Nexus</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
          Return to Nexus
        </Link>
      </div>

      <div className="glass-card p-10 !shadow-mist-premium border-primary-500/20">
        <h1 className="text-4xl font-black text-white mb-10 tracking-tighter italic uppercase">Modulate <span className="text-primary-500">Vector.</span></h1>
        {task && (
          <TaskForm task={task} onSubmit={handleSubmit} isLoading={isSaving} />
        )}
      </div>
    </div>
  );
}
