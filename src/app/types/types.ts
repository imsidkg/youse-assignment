export interface Task {
    _id: string;
    title: string;
    description?: string;
    status: 'To Do' | 'In Progress' | 'Completed';
    priority: 'Low' | 'Medium' | 'High';
    dueDate?: string; // or Date, depending on how you handle it
  }
  
  export interface User {
    _id: string;
    username: string;
    email: string;
  }
  