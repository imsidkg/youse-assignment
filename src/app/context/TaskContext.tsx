'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Task } from '../types/types';


interface TaskResponse {
  tasks: Task[];
}

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (task: Omit<Task, '_id'>) => Promise<void>;
  updateTask: (id: string, task: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get<TaskResponse>('/api/tasks'); // Specify TaskResponse type
      setTasks(response.data.tasks); // Assuming the response has a 'tasks' field
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (task: Omit<Task, '_id'>) => {
    try {
      const response = await axios.post<Task>('/api/tasks', task); // Specify Task type
      setTasks([...tasks, response.data]); // response.data is of type Task
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const updateTask = async (id: string, updatedTask: Partial<Task>) => {
    try {
      const response = await axios.put<Task>(`/api/tasks/${id}`, updatedTask); // Specify Task type
      setTasks(tasks.map(task => task._id === id ? response.data : task)); // response.data is of type Task
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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
