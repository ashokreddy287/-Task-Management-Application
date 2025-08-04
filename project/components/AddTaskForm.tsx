"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';

interface AddTaskFormProps {
  onSubmit: (data: { title: string; description: string }) => void;
  onCancel: () => void;
}

export function AddTaskForm({ onSubmit, onCancel }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim()
      });
      
      // Reset form
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error submitting task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-white shadow-lg border-blue-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <Plus className="w-5 h-5" />
          Add New Task
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Task Title *
            </label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              className="w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description..."
              rows={4}
              className="w-full resize-none"
            />
          </div>

          <div className="flex items-center gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || !title.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              {isSubmitting ? 'Creating...' : 'Create Task'}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}