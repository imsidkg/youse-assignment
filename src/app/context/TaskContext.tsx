// 'use client'
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// interface Task {
//   _id: string;
//   title: string;
//   description?: string;
//   status: 'To Do' | 'In Progress' | 'Completed';
//   priority: 'Low' | 'Medium' | 'High';
//   dueDate?: string;
//   userId: string;
// }

// interface TaskContextType {
//   tasks: Task[];
//   loading: boolean;
//   error: string | null;
//   fetchTasks: () => Promise<void>;
//   createTask: (task: Omit<Task, '_id' | 'userId'>) => Promise<void>;
//   updateTask: (id: string, task: Partial<Omit<Task, '_id' | 'userId'>>) => Promise<void>;
//   deleteTask: (id: string) => Promise<void>;
// }

// const TaskContext = createContext<TaskContextType | undefined>(undefined);

// const getAuthHeaders = () => {
//   const token = localStorage.getItem('token');
//   return {
//     headers: { Authorization: `Bearer ${token}` }
//   };
// };

// export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get<Task[]>(`${API_URL}/tasks`, getAuthHeaders());
//       setTasks(response.data);
//       setError(null);
//     } catch (err) {
//       setError('Failed to fetch tasks');
//       console.error('Error fetching tasks:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createTask = async (newTask: Omit<Task, '_id' | 'userId'>) => {
//     try {
//       const response = await axios.post<Task>(`${API_URL}/tasks`, newTask, getAuthHeaders());
//       setTasks(prevTasks => [...prevTasks, response.data]);
//     } catch (err) {
//       setError('Failed to create task');
//       console.error('Error creating task:', err);
//       throw err;
//     }
//   };

//   const updateTask = async (id: string, updatedTask: Partial<Omit<Task, '_id' | 'userId'>>) => {
//     try {
//       const response = await axios.put<Task>(`${API_URL}/tasks/${id}`, updatedTask, getAuthHeaders());
//       setTasks(prevTasks => prevTasks.map(task => task._id === id ? response.data : task));
//     } catch (err) {
//       setError('Failed to update task');
//       console.error('Error updating task:', err);
//       throw err;
//     }
//   };

//   const deleteTask = async (id: string) => {
//     try {
//       await axios.delete(`${API_URL}/tasks/${id}`, getAuthHeaders());
//       setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
//     } catch (err) {
//       setError('Failed to delete task');
//       console.error('Error deleting task:', err);
//       throw err;
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
//     <TaskContext.Provider value={{ tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask }}>
//       {children}
//     </TaskContext.Provider>
//   );
// };

// export const useTaskContext = () => {
//   const context = useContext(TaskContext);
//   if (context === undefined) {
//     throw new Error('useTaskContext must be used within a TaskProvider');
//   }
//   return context;
// };



// 'use client';
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// interface Task {
//   _id: string;
//   title: string;
//   description?: string;
//   status: 'To Do' | 'In Progress' | 'Completed';
//   priority: 'Low' | 'Medium' | 'High';
//   dueDate?: string;
//   userId: string;
// }

// interface TaskContextType {
//   tasks: Task[];
//   loading: boolean;
//   error: string | null;
//   fetchTasks: () => Promise<void>;
//   createTask: (task: Omit<Task, '_id' | 'userId'>) => Promise<void>;
//   updateTask: (id: string, task: Partial<Omit<Task, '_id' | 'userId'>>) => Promise<void>;
//   deleteTask: (id: string) => Promise<void>;
// }

// const TaskContext = createContext<TaskContextType | undefined>(undefined);

// const getAuthHeaders = () => {
//   const token = localStorage.getItem('token');
//   return {
//     headers: { Authorization: `Bearer ${token}` }
//   };
// };

// export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get<Task[]>(`${API_URL}/tasks`, getAuthHeaders());
//       setTasks(response.data);
//       setError(null);
//     } catch (err) {
//       setError('Failed to fetch tasks');
//       console.error('Error fetching tasks:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createTask = async (newTask: Omit<Task, '_id' | 'userId'>) => {
//     try {
//       const response = await axios.post<Task>(`${API_URL}/tasks`, newTask, getAuthHeaders());
//       setTasks(prevTasks => [...prevTasks, response.data]);
//     } catch (err) {
//       setError('Failed to create task');
//       console.error('Error creating task:', err);
//       throw err;
//     }
//   };

//   const updateTask = async (id: string, updatedTask: Partial<Omit<Task, '_id' | 'userId'>>) => {
//     try {
//       const response = await axios.put<Task>(`${API_URL}/tasks/${id}`, updatedTask, getAuthHeaders());
//       setTasks(prevTasks => prevTasks.map(task => task._id === id ? response.data : task));
//     } catch (err) {
//       setError('Failed to update task');
//       console.error('Error updating task:', err);
//       throw err;
//     }
//   };

//   const deleteTask = async (id: string) => {
//     try {
//       await axios.delete(`${API_URL}/tasks/${id}`, getAuthHeaders());
//       setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
//     } catch (err) {
//       setError('Failed to delete task');
//       console.error('Error deleting task:', err);
//       throw err;
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
//     <TaskContext.Provider value={{ tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask }}>
//       {children}
//     </TaskContext.Provider>
//   );
// };

// export const useTaskContext = () => {
//   const context = useContext(TaskContext);
//   if (context === undefined) {
//     throw new Error('useTaskContext must be used within a TaskProvider');
//   }
//   return context;
// };



// 'use client';
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// interface Task {
//   _id: string;
//   title: string;
//   description?: string;
//   status: 'To Do' | 'In Progress' | 'Completed';
//   priority: 'Low' | 'Medium' | 'High';
//   dueDate?: string;
//   userId: string;
// }

// interface TaskContextType {
//   tasks: Task[];
//   loading: boolean;
//   error: string | null;
//   fetchTasks: () => Promise<void>;
//   createTask: (task: Omit<Task, '_id' | 'userId'>) => Promise<void>;
//   updateTask: (id: string, task: Partial<Omit<Task, '_id' | 'userId'>>) => Promise<void>;
//   deleteTask: (id: string) => Promise<void>;
// }

// const TaskContext = createContext<TaskContextType | undefined>(undefined);

// const getAuthHeaders = () => {
//   const token = localStorage.getItem('token');
//   return {
//     headers: { Authorization: `Bearer ${token}` }
//   };
// };

// export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get<Task[]>(`${API_URL}/tasks`, getAuthHeaders());
//       setTasks(response.data || []);
//       setError(null);
//     } catch (err) {
//       setError('Failed to fetch tasks');
//       console.error('Error fetching tasks:', err);
//       setTasks([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createTask = async (newTask: Omit<Task, '_id' | 'userId'>) => {
//     try {
//       const response = await axios.post<Task>(`${API_URL}/tasks`, newTask, getAuthHeaders());
//       setTasks(prevTasks => [...prevTasks, response.data]);
//     } catch (err) {
//       setError('Failed to create task');
//       console.error('Error creating task:', err);
//       throw err;
//     }
//   };

//   const updateTask = async (id: string, updatedTask: Partial<Omit<Task, '_id' | 'userId'>>) => {
//     try {
//       const response = await axios.put<Task>(`${API_URL}/tasks/${id}`, updatedTask, getAuthHeaders());
//       setTasks(prevTasks => prevTasks.map(task => task._id === id ? response.data : task));
//     } catch (err) {
//       setError('Failed to update task');
//       console.error('Error updating task:', err);
//       throw err;
//     }
//   };

//   const deleteTask = async (id: string) => {
//     try {
//       await axios.delete(`${API_URL}/tasks/${id}`, getAuthHeaders());
//       setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
//     } catch (err) {
//       setError('Failed to delete task');
//       console.error('Error deleting task:', err);
//       throw err;
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   // Debugging logs
//   useEffect(() => {
//     console.log('Tasks updated:', tasks);
//   }, [tasks]);

//   useEffect(() => {
//     console.log('Loading state:', loading);
//   }, [loading]);

//   useEffect(() => {
//     console.log('Error state:', error);
//   }, [error]);

//   return (
//     <TaskContext.Provider value={{ tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask }}>
//       {children}
//     </TaskContext.Provider>
//   );
// };

// export const useTaskContext = () => {
//   const context = useContext(TaskContext);
//   if (context === undefined) {
//     throw new Error('useTaskContext must be used within a TaskProvider');
//   }
//   return context;
// };



// 'use client';
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// interface Task {
//   _id: string;
//   title: string;
//   description?: string;
//   status: 'To Do' | 'In Progress' | 'Completed';
//   priority: 'Low' | 'Medium' | 'High';
//   dueDate?: string;
//   userId: string;
// }

// interface TaskContextType {
//   tasks: Task[];
//   loading: boolean;
//   error: string | null;
//   fetchTasks: () => Promise<void>;
//   createTask: (task: Omit<Task, '_id' | 'userId'>) => Promise<void>;
//   updateTask: (id: string, task: Partial<Omit<Task, '_id' | 'userId'>>) => Promise<void>;
//   deleteTask: (id: string) => Promise<void>;
// }

// const TaskContext = createContext<TaskContextType | undefined>(undefined);

// const getAuthHeaders = () => {
//   const token = localStorage.getItem('token');
//   return {
//     headers: { Authorization: `Bearer ${token}` }
//   };
// };

// export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get<Task[]>(`${API_URL}/tasks`, getAuthHeaders());
//       console.log('Fetched tasks:', response.data);
//       setTasks(response.data || []);
//       setError(null);
//     } catch (err) {
//       console.error('Error fetching tasks:', err);
//       setError('Failed to fetch tasks');
//       setTasks([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createTask = async (newTask: Omit<Task, '_id' | 'userId'>) => {
//     try {
//       const response = await axios.post<Task>(`${API_URL}/tasks`, newTask, getAuthHeaders());
//       console.log('Created task:', response.data);
//       setTasks(prevTasks => [...prevTasks, response.data]);
//     } catch (err) {
//       console.error('Error creating task:', err);
//       setError('Failed to create task');
//       throw err;
//     }
//   };

//   const updateTask = async (id: string, updatedTask: Partial<Omit<Task, '_id' | 'userId'>>) => {
//     try {
//       const response = await axios.put<Task>(`${API_URL}/tasks/${id}`, updatedTask, getAuthHeaders());
//       console.log('Updated task:', response.data);
//       setTasks(prevTasks => prevTasks.map(task => task._id === id ? response.data : task));
//     } catch (err) {
//       console.error('Error updating task:', err);
//       setError('Failed to update task');
//       throw err;
//     }
//   };

//   const deleteTask = async (id: string) => {
//     try {
//       await axios.delete(`${API_URL}/tasks/${id}`, getAuthHeaders());
//       console.log('Deleted task:', id);
//       setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
//     } catch (err) {
//       console.error('Error deleting task:', err);
//       setError('Failed to delete task');
//       throw err;
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   useEffect(() => {
//     console.log('Tasks in context:', tasks);
//   }, [tasks]);

//   useEffect(() => {
//     console.log('Loading state:', loading);
//   }, [loading]);

//   useEffect(() => {
//     console.log('Error state:', error);
//   }, [error]);

//   return (
//     <TaskContext.Provider value={{ tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask }}>
//       {children}
//     </TaskContext.Provider>
//   );
// };

// export const useTaskContext = () => {
//   const context = useContext(TaskContext);
//   if (context === undefined) {
//     throw new Error('useTaskContext must be used within a TaskProvider');
//   }
//   return context;
// };



// 'use client';
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// interface Task {
//   _id: string;
//   title: string;
//   description?: string;
//   status: 'To Do' | 'In Progress' | 'Completed';
//   priority: 'Low' | 'Medium' | 'High';
//   dueDate?: string;
//   userId: string;
// }

// interface TaskContextType {
//   tasks: Task[];
//   loading: boolean;
//   error: string | null;
//   fetchTasks: () => Promise<void>;
//   createTask: (task: Omit<Task, '_id' | 'userId'>) => Promise<void>;
//   updateTask: (id: string, task: Partial<Omit<Task, '_id' | 'userId'>>) => Promise<void>;
//   deleteTask: (id: string) => Promise<void>;
// }

// const TaskContext = createContext<TaskContextType | undefined>(undefined);

// const getAuthHeaders = () => {
//   const token = localStorage.getItem('token');
//   return {
//     headers: { Authorization: `Bearer ${token}` }
//   };
// };

// export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get<Task[]>(`${API_URL}/tasks`, getAuthHeaders());
//       console.log('Fetched tasks:', response.data);
//       setTasks(response.data || []);
//       setError(null);
//     } catch (err) {
//       console.error('Error fetching tasks:', err);
//       setError('Failed to fetch tasks');
//       setTasks([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createTask = async (newTask: Omit<Task, '_id' | 'userId'>) => {
//     try {
//       const response = await axios.post<Task>(`${API_URL}/tasks`, newTask, getAuthHeaders());
//       console.log('Created task:', response.data);
//       setTasks(prevTasks => [...prevTasks, response.data]);
//     } catch (err) {
//       console.error('Error creating task:', err);
//       setError('Failed to create task');
//       throw err;
//     }
//   };

//   const updateTask = async (id: string, updatedTask: Partial<Omit<Task, '_id' | 'userId'>>) => {
//     try {
//       const response = await axios.put<Task>(`${API_URL}/tasks/${id}`, updatedTask, getAuthHeaders());
//       console.log('Updated task:', response.data);
//       setTasks(prevTasks => prevTasks.map(task => task._id === id ? response.data : task));
//     } catch (err) {
//       console.error('Error updating task:', err);
//       setError('Failed to update task');
//       throw err;
//     }
//   };

//   const deleteTask = async (id: string) => {
//     try {
//       await axios.delete(`${API_URL}/tasks/${id}`, getAuthHeaders());
//       console.log('Deleted task:', id);
//       setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
//     } catch (err) {
//       console.error('Error deleting task:', err);
//       setError('Failed to delete task');
//       throw err;
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   useEffect(() => {
//     console.log('Tasks in context:', tasks);
//   }, [tasks]);

//   useEffect(() => {
//     console.log('Loading state:', loading);
//   }, [loading]);

//   useEffect(() => {
//     console.log('Error state:', error);
//   }, [error]);

//   return (
//     <TaskContext.Provider value={{ tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask }}>
//       {children}
//     </TaskContext.Provider>
//   );
// };

// export const useTaskContext = () => {
//   const context = useContext(TaskContext);
//   if (context === undefined) {
//     throw new Error('useTaskContext must be used within a TaskProvider');
//   }
//   return context;
// };



// 'use client';
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// interface Task {
//   _id: string;
//   title: string;
//   description?: string;
//   status: 'To Do' | 'In Progress' | 'Completed';
//   priority: 'Low' | 'Medium' | 'High';
//   dueDate?: string;
//   userId: string;
// }

// interface TaskContextType {
//   tasks: Task[];
//   loading: boolean;
//   error: string | null;
//   fetchTasks: () => Promise<void>;
//   createTask: (task: Omit<Task, '_id' | 'userId'>) => Promise<void>;
//   updateTask: (id: string, task: Partial<Omit<Task, '_id' | 'userId'>>) => Promise<void>;
//   deleteTask: (id: string) => Promise<void>;
// }

// const TaskContext = createContext<TaskContextType | undefined>(undefined);

// const getAuthHeaders = () => {
//   const token = localStorage.getItem('token');
//   return {
//     headers: { Authorization: `Bearer ${token}` }
//   };
// };

// export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchTasks = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get<Task[]>(`${API_URL}/tasks`, getAuthHeaders());
//       setTasks(response.data || []);
//     } catch (err) {
//       console.error('Error fetching tasks:', err);
//       setError('Failed to fetch tasks');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createTask = async (newTask: Omit<Task, '_id' | 'userId'>) => {
//     try {
//       const response = await axios.post<Task>(`${API_URL}/tasks`, newTask, getAuthHeaders());
//       setTasks(prevTasks => [...prevTasks, response.data]);
//     } catch (err) {
//       console.error('Error creating task:', err);
//       setError('Failed to create task');
//       throw err; // Rethrow to handle in the component
//     }
//   };

//   const updateTask = async (id: string, updatedTask: Partial<Omit<Task, '_id' | 'userId'>>) => {
//     try {
//       const response = await axios.put<Task>(`${API_URL}/tasks/${id}`, updatedTask, getAuthHeaders());
//       setTasks(prevTasks => prevTasks.map(task => task._id === id ? response.data : task));
//     } catch (err) {
//       console.error('Error updating task:', err);
//       setError('Failed to update task');
//       throw err; // Rethrow to handle in the component
//     }
//   };

//   const deleteTask = async (id: string) => {
//     try {
//       await axios.delete(`${API_URL}/tasks/${id}`, getAuthHeaders());
//       setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
//     } catch (err) {
//       console.error('Error deleting task:', err);
//       setError('Failed to delete task');
//       throw err; // Rethrow to handle in the component
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
//     <TaskContext.Provider value={{ tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask }}>
//       {children}
//     </TaskContext.Provider>
//   );
// };

// export const useTaskContext = () => {
//   const context = useContext(TaskContext);
//   if (context === undefined) {
//     throw new Error('useTaskContext must be used within a TaskProvider');
//   }
//   return context;
// };



// 'use client';
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// interface Task {
//   _id: string;
//   title: string;
//   description?: string;
//   status: 'To Do' | 'In Progress' | 'Completed';
//   priority: 'Low' | 'Medium' | 'High';
//   dueDate?: string;
//   userId: string;
// }

// interface TaskContextType {
//   tasks: Task[];
//   loading: boolean;
//   error: string | null;
//   fetchTasks: () => Promise<void>;
//   createTask: (task: Omit<Task, '_id' | 'userId'>) => Promise<void>;
//   updateTask: (id: string, task: Partial<Omit<Task, '_id' | 'userId'>>) => Promise<void>;
//   deleteTask: (id: string) => Promise<void>;
// }

// const TaskContext = createContext<TaskContextType | undefined>(undefined);

// const getAuthHeaders = () => {
//   const token = localStorage.getItem('token');
//   return {
//     headers: { Authorization: `Bearer ${token}` }
//   };
// };

// export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchTasks = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get<Task[]>(`${API_URL}/tasks`, getAuthHeaders());
//       setTasks(Array.isArray(response.data) ? response.data : []);
//     } catch (err) {
//       console.error('Error fetching tasks:', err);
//       setError('Failed to fetch tasks');
//       setTasks([]); // Ensure tasks is an empty array on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createTask = async (newTask: Omit<Task, '_id' | 'userId'>) => {
//     try {
//       const response = await axios.post<Task>(`${API_URL}/tasks`, newTask, getAuthHeaders());
//       console.log('Created task response:', response.data);
//       setTasks(prevTasks => {
//         const updatedTasks = [...prevTasks, response.data];
//         console.log('Updated tasks after creation:', updatedTasks);
//         return updatedTasks;
//       });
//     } catch (err) {
//       console.error('Error creating task:', err);
//       setError('Failed to create task');
//       throw err;
//     }
//   };

//   const updateTask = async (id: string, updatedTask: Partial<Omit<Task, '_id' | 'userId'>>) => {
//     try {
//       const response = await axios.put<Task>(`${API_URL}/tasks/${id}`, updatedTask, getAuthHeaders());
//       setTasks(prevTasks => prevTasks.map(task => task._id === id ? response.data : task));
//     } catch (err) {
//       console.error('Error updating task:', err);
//       setError('Failed to update task');
//       throw err; // Rethrow to handle in the component
//     }
//   };

//   const deleteTask = async (id: string) => {
//     try {
//       await axios.delete(`${API_URL}/tasks/${id}`, getAuthHeaders());
//       setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
//     } catch (err) {
//       console.error('Error deleting task:', err);
//       setError('Failed to delete task');
//       throw err; // Rethrow to handle in the component
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
//     <TaskContext.Provider value={{ tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask }}>
//       {children}
//     </TaskContext.Provider>
//   );
// };

// export const useTaskContext = () => {
//   const context = useContext(TaskContext);
//   if (context === undefined) {
//     throw new Error('useTaskContext must be used within a TaskProvider');
//   }
//   return context;
// };



'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

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

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Task[]>(`${API_URL}/tasks`, getAuthHeaders());
      console.log('Fetched tasks:', response.data);
      setTasks(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to fetch tasks');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (newTask: Omit<Task, '_id' | 'userId'>) => {
    try {
      const response = await axios.post<Task>(`${API_URL}/tasks`, newTask, getAuthHeaders());
      console.log('Created task response:', response.data);
      setTasks(prevTasks => {
        const updatedTasks = [...prevTasks, response.data];
        console.log('Updated tasks after creation:', updatedTasks);
        return updatedTasks;
      });
    } catch (err) {
      console.error('Error creating task:', err);
      setError('Failed to create task');
      throw err;
    }
  };

  const updateTask = async (id: string, updatedTask: Partial<Omit<Task, '_id' | 'userId'>>) => {
    try {
      const response = await axios.put<Task>(`${API_URL}/tasks/${id}`, updatedTask, getAuthHeaders());
      setTasks(prevTasks => prevTasks.map(task => task._id === id ? response.data : task));
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Failed to update task');
      throw err;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`, getAuthHeaders());
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task');
      throw err;
    }
  };

  useEffect(() => {
    fetchTasks();
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