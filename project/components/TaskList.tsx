"use client";

import { Task } from '@/types/task';
import { TaskCard } from './TaskCard';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onToggleComplete: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export function TaskList({ tasks, loading, onToggleComplete, onEdit, onDelete }: TaskListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <CheckCircle2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No tasks yet</h3>
        <p className="text-gray-500">Create your first task to get started!</p>
      </div>
    );
  }

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div className="space-y-8">
      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            Pending Tasks ({pendingTasks.length})
          </h2>
          <div className="grid gap-4">
            {pendingTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            Completed Tasks ({completedTasks.length})
          </h2>
          <div className="grid gap-4">
            {completedTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}