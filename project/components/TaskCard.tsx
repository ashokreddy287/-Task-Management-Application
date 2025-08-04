"use client";

import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Edit3, Trash2, Clock, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export function TaskCard({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  return (
    <Card className={`transition-all duration-200 hover:shadow-lg ${
      task.completed 
        ? 'bg-green-50 border-green-200 opacity-75' 
        : 'bg-white border-gray-200 hover:border-blue-300'
    }`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Completion Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleComplete(task)}
            className={`mt-1 p-1 rounded-full transition-colors ${
              task.completed
                ? 'text-green-600 hover:text-green-700 bg-green-100 hover:bg-green-200'
                : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <Check className={`w-5 h-5 ${task.completed ? 'opacity-100' : 'opacity-0'}`} />
          </Button>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className={`text-lg font-semibold ${
                task.completed ? 'text-gray-600 line-through' : 'text-gray-900'
              }`}>
                {task.title}
              </h3>
              
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge variant={task.completed ? "secondary" : "default"}>
                  {task.completed ? 'Completed' : 'Pending'}
                </Badge>
              </div>
            </div>

            <p className={`text-gray-600 mb-4 leading-relaxed ${
              task.completed ? 'line-through opacity-75' : ''
            }`}>
              {task.description}
            </p>

            {/* Timestamps */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Created {formatDistanceToNow(new Date(task.created_at), { addSuffix: true })}</span>
              </div>
              {task.updated_at !== task.created_at && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Updated {formatDistanceToNow(new Date(task.updated_at), { addSuffix: true })}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(task)}
                className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300"
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                className="flex items-center gap-2 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}