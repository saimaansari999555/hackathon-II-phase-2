import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    low: "text-green-600 bg-green-50",
    medium: "text-yellow-600 bg-yellow-50",
    high: "text-red-600 bg-red-50",
  };
  return colors[priority.toLowerCase()] || "text-gray-600 bg-gray-50";
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: "text-gray-600 bg-gray-50",
    in_progress: "text-blue-600 bg-blue-50",
    completed: "text-green-600 bg-green-50",
    archived: "text-gray-400 bg-gray-100",
  };
  return colors[status.toLowerCase()] || "text-gray-600 bg-gray-50";
}
