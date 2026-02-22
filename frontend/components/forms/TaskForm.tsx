"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCategories } from "@/hooks/useCategories";
import { createTaskSchema, type CreateTaskSchema } from "@/lib/validation/schemas";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import type { Task, CreateTaskRequest, UpdateTaskRequest } from "@/types/task";

interface TaskFormProps {
  task?: Task;
  onSubmit: (data: CreateTaskRequest | UpdateTaskRequest) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function TaskForm({ task, onSubmit, onCancel, isLoading }: TaskFormProps) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { categories, fetchCategories } = useCategories();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: task
      ? {
        title: task.title,
        description: task.description || "",
        priority: task.priority,
        categoryId: task.categoryId || "",
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
      }
      : {
        priority: "medium",
        categoryId: "",
      },
  });

  const onFormSubmit = async (data: CreateTaskSchema) => {
    setSubmitError(null);
    try {
      const submitData: CreateTaskRequest | UpdateTaskRequest = {
        title: data.title,
        description: data.description || undefined,
        priority: data.priority,
        categoryId: data.categoryId || undefined,
        dueDate: data.dueDate || undefined,
      };
      await onSubmit(submitData);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to save task");
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6" noValidate>
      {submitError && (
        <div
          className="p-4 text-sm font-semibold border border-rose-100 bg-rose-50 text-rose-600 rounded-2xl"
          role="alert"
        >
          Error: {submitError}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-semibold text-slate-700 ml-1">Task Title *</Label>
        <Input
          id="title"
          type="text"
          placeholder="e.g. Design System Overhaul"
          className="w-full"
          disabled={isLoading}
          {...register("title")}
          aria-invalid={errors.title ? "true" : "false"}
        />
        {errors.title && (
          <p className="text-xs text-rose-500 font-medium ml-1" role="alert">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-semibold text-slate-700 ml-1">Notes & Context</Label>
        <textarea
          id="description"
          className="flex w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-6 py-4 text-sm text-slate-900 transition-all duration-300 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white min-h-[120px] resize-none"
          placeholder="What are the key details for this task?"
          disabled={isLoading}
          {...register("description")}
        />
        {errors.description && (
          <p className="text-xs text-rose-500 font-medium ml-1" role="alert">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="priority" className="text-sm font-semibold text-slate-700 ml-1">Priority Level</Label>
          <Select
            id="priority"
            className="w-full"
            options={[
              { value: "low", label: "Low Priority" },
              { value: "medium", label: "Medium Priority" },
              { value: "high", label: "High Priority" },
            ]}
            disabled={isLoading}
            {...register("priority")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="categoryId" className="text-sm font-semibold text-slate-700 ml-1">Category</Label>
          <Select
            id="categoryId"
            className="w-full"
            options={[
              { value: "", label: "No Category" },
              ...categories.map(c => ({ value: c.id, label: c.name }))
            ]}
            disabled={isLoading}
            {...register("categoryId")}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="dueDate" className="text-sm font-semibold text-slate-700 ml-1">Target Date</Label>
          <Input
            id="dueDate"
            type="date"
            className="w-full [color-scheme:light]"
            disabled={isLoading}
            {...register("dueDate")}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="rounded-2xl font-bold px-8"
            disabled={isLoading}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" className="rounded-2xl px-12 font-bold" disabled={isLoading}>
          {isLoading
            ? (
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              </div>
            )
            : task
              ? "Update Task"
              : "Create Task"}
        </Button>
      </div>
    </form>
  );
}
