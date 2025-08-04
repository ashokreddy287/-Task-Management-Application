"use client";

import { useState } from 'react';
import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Save, X } from 'lucide-react';

interface EditTaskModalProps {
  task: Task;
  onSave: (id: number, updates: Partial<Task>) => void;
  onClose: () => void;
}

export function EditTaskModal({ task, onSave, onClose }: EditTaskModalProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(task.id, {
        title: title.trim(),
        description: description.trim(),
        completed
      });
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Edit Task
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="edit-title" className="text-sm font-medium text-gray-700">
              Task Title *
            </Label>
            <Input
              id="edit-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              className="mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="edit-description" className="text-sm font-medium text-gray-700">
              Description
            </Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description..."
              rows={4}
              className="mt-2 resize-none"
            />
          </div>

          <div className="flex items-center space-x-3">
            <Switch
              id="edit-completed"
              checked={completed}
              onCheckedChange={setCompleted}
            />
            <Label htmlFor="edit-completed" className="text-sm font-medium text-gray-700">
              Mark as completed
            </Label>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || !title.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}