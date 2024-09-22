import { Request, Response } from "express";
import Task from "../models/Task";

interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    console.log('Received task data:', req.body);
    console.log('User ID:', req.user?.userId);
    console.log('Full request user object:', req.user);
    
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    
    const task = new Task({ ...req.body, userId: req.user.userId });
    
    console.log('Task before save:', task);
    await task.save();
    console.log('Task after save:', task);
    
    res.status(201).json(task);
  } catch (error) {
    console.error('Error in createTask:', error);
    res.status(500).json({ message: 'Error creating task', error: (error as Error).message });
  }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const tasks = await Task.find({ userId: req.user.userId });
    res.json(tasks);
  } catch (error) {
    console.error('Error in getTasks:', error);
    res.status(500).json({ message: 'Error fetching tasks', error: (error as Error).message });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    console.error('Error in updateTask:', error);
    res.status(500).json({ message: 'Error updating task', error: (error as Error).message });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error in deleteTask:', error);
    res.status(500).json({ message: 'Error deleting task', error: (error as Error).message });
  }
};