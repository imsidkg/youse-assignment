import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Your Express backend

// API request to fetch tasks
export const getTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data;
};

// API request to create a new task
export const createTask = async (task: { title: string; description?: string; status: string; priority: string; dueDate?: string; }) => {
  const response = await axios.post(`${API_URL}/tasks`, task);
  return response.data;
};

// API request to update task status
export const updateTaskStatus = async (taskId: string, status: string) => {
  const response = await axios.patch(`${API_URL}/tasks/${taskId}`, { status });
  return response.data;
};
