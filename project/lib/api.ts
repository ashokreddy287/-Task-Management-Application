import { Task, CreateTaskData, UpdateTaskData } from '@/types/task';

// Mock API base URL - replace with your Django API URL
const API_BASE_URL = 'http://localhost:8000/api';

// Mock data for development
let mockTasks: Task[] = [
  {
    id: 1,
    title: "Complete project documentation",
    description: "Write comprehensive documentation for the task management system including API endpoints and frontend components.",
    completed: false,
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    title: "Review code changes",
    description: "Review the latest pull requests and provide feedback to team members.",
    completed: true,
    created_at: "2024-01-14T14:20:00Z",
    updated_at: "2024-01-15T09:15:00Z"
  },
  {
    id: 3,
    title: "Setup CI/CD pipeline",
    description: "Configure automated testing and deployment pipeline for the application.",
    completed: false,
    created_at: "2024-01-13T16:45:00Z",
    updated_at: "2024-01-13T16:45:00Z"
  }
];

let nextId = 4;

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const taskApi = {
  // GET /api/tasks/ - Retrieve all tasks
  async getAllTasks(): Promise<Task[]> {
    await delay(500); // Simulate network delay
    
    // In production, replace with:
    // const response = await fetch(`${API_BASE_URL}/tasks/`);
    // if (!response.ok) throw new Error('Failed to fetch tasks');
    // return response.json();
    
    return [...mockTasks].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  // POST /api/tasks/ - Create a new task
  async createTask(data: CreateTaskData): Promise<Task> {
    await delay(300);
    
    // In production, replace with:
    // const response = await fetch(`${API_BASE_URL}/tasks/`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // Add authentication headers if needed
    //     // 'Authorization': `Bearer ${token}`
    //   },
    //   body: JSON.stringify(data)
    // });
    // if (!response.ok) throw new Error('Failed to create task');
    // return response.json();
    
    const now = new Date().toISOString();
    const newTask: Task = {
      id: nextId++,
      title: data.title,
      description: data.description,
      completed: false,
      created_at: now,
      updated_at: now
    };
    
    mockTasks.push(newTask);
    return newTask;
  },

  // GET /api/tasks/<id>/ - Retrieve a task by ID
  async getTask(id: number): Promise<Task> {
    await delay(200);
    
    // In production, replace with:
    // const response = await fetch(`${API_BASE_URL}/tasks/${id}/`);
    // if (!response.ok) throw new Error('Failed to fetch task');
    // return response.json();
    
    const task = mockTasks.find(t => t.id === id);
    if (!task) throw new Error('Task not found');
    return task;
  },

  // PUT /api/tasks/<id>/ - Update an existing task
  async updateTask(id: number, updates: UpdateTaskData): Promise<Task> {
    await delay(300);
    
    // In production, replace with:
    // const response = await fetch(`${API_BASE_URL}/tasks/${id}/`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // Add authentication headers if needed
    //     // 'Authorization': `Bearer ${token}`
    //   },
    //   body: JSON.stringify(updates)
    // });
    // if (!response.ok) throw new Error('Failed to update task');
    // return response.json();
    
    const taskIndex = mockTasks.findIndex(t => t.id === id);
    if (taskIndex === -1) throw new Error('Task not found');
    
    const updatedTask = {
      ...mockTasks[taskIndex],
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    mockTasks[taskIndex] = updatedTask;
    return updatedTask;
  },

  // DELETE /api/tasks/<id>/ - Delete a task
  async deleteTask(id: number): Promise<void> {
    await delay(200);
    
    // In production, replace with:
    // const response = await fetch(`${API_BASE_URL}/tasks/${id}/`, {
    //   method: 'DELETE',
    //   headers: {
    //     // Add authentication headers if needed
    //     // 'Authorization': `Bearer ${token}`
    //   }
    // });
    // if (!response.ok) throw new Error('Failed to delete task');
    
    const taskIndex = mockTasks.findIndex(t => t.id === id);
    if (taskIndex === -1) throw new Error('Task not found');
    
    mockTasks.splice(taskIndex, 1);
  }
};