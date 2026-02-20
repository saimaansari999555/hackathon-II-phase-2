import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-primary-500/10",
        className
      )}
    />
  );
}

export function TaskCardSkeleton() {
  return (
    <div className="glass-card !bg-surface-card rounded-2xl border border-primary-500/10 p-6 space-y-4 shadow-mist">
      <div className="flex items-start gap-4">
        <Skeleton className="h-6 w-6 rounded-lg bg-primary-500/20" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-5 w-3/4 bg-primary-100/10" />
          <Skeleton className="h-4 w-1/2 bg-primary-100/5" />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <Skeleton className="h-6 w-16 rounded-full bg-primary-500/10" />
        <Skeleton className="h-6 w-20 rounded-full bg-primary-600/10" />
      </div>
    </div>
  );
}

export function TaskListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <TaskCardSkeleton key={i} />
      ))}
    </div>
  );
}
