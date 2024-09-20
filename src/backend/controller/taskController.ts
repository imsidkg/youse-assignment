// Create a custom interface to extend the default Request
import { Request, Response } from "express";
import Task from "../models/Task";

// Extend the Request interface to include the 'user' property
interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    
    const task = new Task({ ...req.body, userId: req.user?.userId });
    
  
    await task.save();
    
    
    res.status(201).json(task);
  } catch (error) {
    
    res.status(500).json({ message: 'Error creating task', error });
  }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
    try {
      const tasks = await Task.find({ userId: req.user?.userId });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tasks', error });
    }
  };
  
  export const updateTask = async (req: AuthRequest, res: Response) => {
    try {
      const task = await Task.findOneAndUpdate(
        { _id: req.params.id, userId: req.user?.userId },
        req.body,
        { new: true }
      );
      if (!task) return res.status(404).json({ message: 'Task not found' });
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error updating task', error });
    }
  };
  
  export const deleteTask = async (req: AuthRequest, res: Response) => {
    try {
      const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user?.userId });
      if (!task) return res.status(404).json({ message: 'Task not found' });
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting task', error });
    }
  };
