export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskData {
  title: string;
  description: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  completed?: boolean;
}