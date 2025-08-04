"use client";

import { useState, useEffect } from 'react';
import { TaskList } from '@/components/TaskList';
import { AddTaskForm } from '@/components/AddTaskForm';
import { EditTaskModal } from '@/components/EditTaskModal';
import { Task } from '@/types/task';
import { taskApi } from '@/lib/api';
import { Plus, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const fetchedTasks = await taskApi.getAllTasks();
      setTasks(fetchedTasks);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData: { title: string; description: string }) => {
    try {
      const newTask = await taskApi.createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
      setShowAddForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to create task');
      console.error('Error creating task:', err);
    }
  };

  const handleUpdateTask = async (id: number, updates: Partial<Task>) => {
    try {
      const updatedTask = await taskApi.updateTask(id, updates);
      setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
      setEditingTask(null);
      setError(null);
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await taskApi.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    await handleUpdateTask(task.id, { completed: !task.completed });
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckSquare className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Task Manager</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Stay organized and get things done
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
              <span className="text-2xl font-bold text-blue-600">{totalCount}</span>
              <p className="text-sm text-gray-600">Total Tasks</p>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
              <span className="text-2xl font-bold text-green-600">{completedCount}</span>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
              <span className="text-2xl font-bold text-orange-600">{totalCount - completedCount}</span>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Add Task Button */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Task
          </Button>
        </div>

        {/* Add Task Form */}
        {showAddForm && (
          <div className="mb-8">
            <AddTaskForm
              onSubmit={handleAddTask}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

        {/* Task List */}
        <TaskList
          tasks={tasks}
          loading={loading}
          onToggleComplete={handleToggleComplete}
          onEdit={setEditingTask}
          onDelete={handleDeleteTask}
        />

        {/* Edit Task Modal */}
        {editingTask && (
          <EditTaskModal
            task={editingTask}
            onSave={handleUpdateTask}
            onClose={() => setEditingTask(null)}
          />
        )}
      </div>
    </div>
  );
}