

'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'To Do' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: string;
  userId: string;
}

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (task: Omit<Task, '_id' | 'userId'>) => Promise<void>;
  updateTask: (id: string, task: Partial<Omit<Task, '_id' | 'userId'>>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching tasks from:', `${API_URL}/tasks`);
      const response = await axios.get<Task[]>(`${API_URL}/tasks`, getAuthHeaders());
      console.log('Fetched tasks:', response.data);
      setTasks(Array.isArray(response.data) ? response.data : []);
    } catch (err: unknown) {
      console.error('Error fetching tasks:', err);
      setError('Failed to fetch tasks');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (newTask: Omit<Task, '_id' | 'userId'>) => {
    try {
      console.log('Creating task:', newTask);
      console.log('API URL:', API_URL);
      console.log('Auth headers:', getAuthHeaders());
      const response = await axios.post<Task>(`${API_URL}/tasks`, newTask, getAuthHeaders());
      console.log('Created task response:', response.data);
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      setTasks(prevTasks => {
        const updatedTasks = [...prevTasks, response.data];
        console.log('Updated tasks after creation:', updatedTasks);
        return updatedTasks;
      });
    } catch (err: unknown) {
      console.error('Error creating task:', err);
      if (err && typeof err === 'object' && 'isAxiosError' in err) {
        const axiosError = err as { response?: { data?: unknown, status?: number, headers?: unknown } };
        console.error('Axios error details:', axiosError.response?.data);
        console.error('Axios error status:', axiosError.response?.status);
        console.error('Axios error headers:', axiosError.response?.headers);
      }
      setError('Failed to create task');
      throw err;
    }
  };

  const updateTask = async (id: string, updatedTask: Partial<Omit<Task, '_id' | 'userId'>>) => {
    try {
      console.log('Updating task:', id, updatedTask);
      const response = await axios.put<Task>(`${API_URL}/tasks/${id}`, updatedTask, getAuthHeaders());
      console.log('Updated task response:', response.data);
      setTasks(prevTasks => prevTasks.map(task => task._id === id ? response.data : task));
    } catch (err: unknown) {
      console.error('Error updating task:', err);
      setError('Failed to update task');
      throw err;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      console.log('Deleting task:', id);
      await axios.delete(`${API_URL}/tasks/${id}`, getAuthHeaders());
      console.log('Task deleted successfully');
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
    } catch (err: unknown) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task');
      throw err;
    }
  };

  useEffect(() => {
    fetchTasks();
    const refreshTasks = setTimeout(() => {
      fetchTasks(); 
    }, 3000);
  
   
    return () => clearInterval(refreshTasks);
  }, []);

  useEffect(() => {
    console.log('Tasks in context:', tasks);
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};