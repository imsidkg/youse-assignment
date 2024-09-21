import { createTask } from '@/lib/api';
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';


const TaskForm = ({ onTaskCreated }: { onTaskCreated: () => void }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [status, setStatus] = useState('To Do');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTask({ title, description, status, priority });
    onTaskCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <Button type="submit">Create Task</Button>
    </form>
  );
};

export default TaskForm;
