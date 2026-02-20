"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTasks } from "@/hooks/useTasks";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskFilter } from "@/components/tasks/TaskFilter";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/Modal";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import type { TaskFilters, TaskStatus, TaskPriority } from "@/types/task";

export default function TasksPage() {
  const router = useRouter();
  const {
    tasks,
    isLoading,
    error,
    fetchTasks,
    updateTask,
    deleteTask,
    setTasks,
  } = useTasks();

  const [completingId, setCompletingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleToggleComplete = useCallback(
    async (id: string) => {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      const newStatus: TaskStatus =
        task.status === "completed" ? "pending" : "completed";

      setCompletingId(id);
      try {
        const updatedTask = await updateTask(id, { status: newStatus });
        // Optimistic update already handled in hook
      } catch (err) {
        console.error("Failed to toggle task:", err);
        // Revert would happen here if we tracked previous state
      } finally {
        setCompletingId(null);
      }
    },
    [tasks, updateTask]
  );

  const handleDeleteClick = useCallback((id: string) => {
    setTaskToDelete(id);
    setShowDeleteDialog(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!taskToDelete) return;

    setDeletingId(taskToDelete);
    setShowDeleteDialog(false);
    try {
      await deleteTask(taskToDelete);
    } catch (err) {
      console.error("Failed to delete task:", err);
    } finally {
      setDeletingId(null);
      setTaskToDelete(null);
    }
  }, [taskToDelete, deleteTask]);

  const handleFilterChange = useCallback(
    async (filters: {
      search?: string;
      status?: TaskStatus;
      priority?: TaskPriority;
      sortBy?: string;
      dueDate?: string;
    }) => {
      await fetchTasks(filters as TaskFilters);
    },
    [fetchTasks]
  );

  const handleClearFilters = useCallback(() => {
    setTasks([]);
    fetchTasks();
  }, [setTasks, fetchTasks]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 text-red-500 mx-auto mb-4">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => fetchTasks()}>Try again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 relative">
      {/* Vercel-style Background Grid */}
      <div className="absolute inset-x-0 -top-24 h-96 opacity-[0.03] pointer-events-none -z-10" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 relative z-10">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Neural Workspace Active</span>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter leading-none mb-4 italic">Core <span className="text-primary-500/50">Engine.</span></h1>
          <p className="text-primary-100/40 font-medium text-lg tracking-tight">Managing <span className="text-primary-400 font-black">{tasks.length}</span> active vectors in your current workflow.</p>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/tasks/new">
            <button className="premium-button bg-primary-600 text-white hover:bg-primary-500 flex items-center space-x-3 py-4 px-10 shadow-mist-premium group">
              <svg className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
              <span>Add Vector</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="relative z-10">
        <TaskFilter onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />
      </div>

      {isLoading && tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-6">
          <LoadingSpinner size="lg" />
          <p className="text-slate-400 font-medium animate-pulse tracking-widest uppercase text-[10px]">Syncing Workspace Core...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="glass-card p-20 text-center max-w-2xl mx-auto mt-12 shadow-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="relative z-10">
            <div className="w-24 h-24 bg-primary-950/20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner border border-primary-500/10">
              <svg className="w-12 h-12 text-primary-500/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </div>
            <h3 className="text-3xl font-black text-white mb-4 tracking-tighter italic uppercase">Workspace Empty.</h3>
            <p className="text-primary-100/40 mb-10 text-lg font-medium leading-relaxed max-w-md mx-auto">Your neural engine is clear. Initialize your first strategic task to begin the cycle.</p>
            <Link href="/tasks/new">
              <button className="premium-button bg-primary-600 text-white shadow-mist-premium px-12 italic">Initialize Task α</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex lg:grid lg:grid-cols-3 gap-8 overflow-x-auto lg:overflow-visible pb-12 snap-x snap-mandatory -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide relative z-10">
          {/* Kanban Columns */}
          {[
            { id: "pending", label: "Registry", color: "bg-slate-400", count: tasks.filter(t => t.status === 'pending').length },
            { id: "in_progress", label: "Active", color: "bg-primary-500", count: tasks.filter(t => t.status === 'in_progress').length },
            { id: "completed", label: "Archive", color: "bg-green-500", count: tasks.filter(t => t.status === 'completed').length }
          ].map((column) => (
            <div key={column.id} className="flex flex-col space-y-6 min-h-[600px] min-w-[85vw] md:min-w-[420px] lg:min-w-0 snap-center">
              <div className="flex items-center justify-between px-4 mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${column.color} shadow-[0_0_15px_rgba(16,185,129,0.3)]`}></div>
                  <h3 className="font-black text-primary-100 uppercase tracking-[0.2em] text-[10px] italic">{column.label}</h3>
                  <span className="bg-primary-500/10 text-primary-400 text-[10px] px-2.5 py-0.5 rounded-full font-black italic border border-primary-500/20">{column.count}</span>
                </div>
                <button className="p-2 hover:bg-primary-500/5 rounded-xl text-primary-100/20 hover:text-primary-400 transition-all">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                </button>
              </div>

              <div className="space-y-6">
                {tasks.filter(t => t.status === column.id).map((task) => (
                  <div key={task.id} className="group glass-card p-6 !bg-surface-card hover:scale-[1.02] hover:shadow-mist-premium transition-all border-primary-500/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/5 -mr-12 -mt-12 rounded-full group-hover:scale-110 transition-transform duration-700"></div>

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <span className={`text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-[0.15em] italic ${task.priority === 'high' ? 'bg-red-950/30 text-red-500 border border-red-900/20' :
                          task.priority === 'medium' ? 'bg-orange-950/30 text-orange-500 border border-orange-900/20' :
                            'bg-primary-950/30 text-primary-400 border border-primary-900/20'
                          }`}>
                          {task.priority} Focus
                        </span>
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 transition-transform">
                          <button onClick={() => router.push(`/tasks/${task.id}`)} className="p-2 hover:bg-primary-500/10 rounded-xl text-primary-100/20 hover:text-primary-400 transition-all">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </button>
                          <button onClick={() => handleDeleteClick(task.id)} className="p-2 hover:bg-red-500/10 rounded-xl text-primary-100/20 hover:text-red-500 transition-all">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      </div>

                      <h4 className="font-black text-white mb-2 leading-[1.3] text-lg tracking-tighter group-hover:text-primary-400 transition-colors italic">{task.title}</h4>
                      {task.category && (
                        <div className="mb-2">
                          <span className="text-[9px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider bg-primary-500/10 text-primary-400 border border-primary-500/20">
                            {task.category.name}
                          </span>
                        </div>
                      )}
                      {task.description && (
                        <p className="text-sm font-medium text-primary-100/30 line-clamp-2 mb-6 leading-relaxed italic">{task.description}</p>
                      )}

                      {/* Premium Progress Tracking */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest italic">Sync Progress</span>
                          <span className="text-[9px] font-black text-primary-500 italic">
                            {task.status === 'completed' ? '100%' : '60%'}
                          </span>
                        </div>
                        <div className="h-1 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full bg-primary-500 dark:bg-primary-600 rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(99,102,241,0.3)] ${task.status === 'completed' ? 'w-full' : 'w-2/3 group-hover:w-[75%]'}`}></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-primary-500/10">
                        <div className="flex items-center space-x-2 text-primary-100/20">
                          <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          <span className="text-[10px] font-black uppercase tracking-widest italic">Jan 27 '26</span>
                        </div>

                        <button
                          onClick={() => handleToggleComplete(task.id)}
                          className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${task.status === 'completed'
                            ? 'bg-primary-600 text-white shadow-mist-glow'
                            : 'bg-primary-500/5 text-primary-100/20 hover:bg-primary-500/20 hover:text-primary-400 border border-primary-500/10'
                            }`}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        </button>
                      </div>
                    </div>
                    {completingId === task.id && (
                      <div className="absolute inset-0 bg-surface-dark/60 backdrop-blur-sm rounded-[2rem] flex items-center justify-center z-20">
                        <LoadingSpinner size="sm" />
                      </div>
                    )}
                  </div>
                ))}

                <button className="w-full py-8 border-2 border-dashed border-primary-500/5 rounded-[2rem] text-primary-100/10 hover:border-primary-500/20 hover:bg-primary-500/5 hover:text-primary-400 transition-all font-black text-[10px] uppercase tracking-[0.25em] flex items-center justify-center space-x-3 group italic shadow-sm hover:shadow-mist">
                  <svg className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                  <span>Queue Integration</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setTaskToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Purge Vector"
        message="Initiate permanent deletion of this strategic data point? This action bypasses the neural archive."
        confirmLabel="Initiate Purge"
        variant="danger"
        isLoading={!!deletingId}
      />
    </div>
  );
}
