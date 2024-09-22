import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';


export default function DashboardPage() {
  const { tasks, loading, error } = useTaskContext();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [showForm, setShowForm] = useState(false);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return a[sortBy].localeCompare(b[sortBy]);
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
      <div className="flex justify-between mb-4">
        <Select
          value={filter}
          onValueChange={(value) => setFilter(value)}
          options={[
            { value: 'all', label: 'All' },
            { value: 'To Do', label: 'To Do' },
            { value: 'In Progress', label: 'In Progress' },
            { value: 'Completed', label: 'Completed' },
          ]}
        />
        <Select
          value={sortBy}
          onValueChange={(value) => setSortBy(value)}
          options={[
            { value: 'dueDate', label: 'Due Date' },
            { value: 'priority', label: 'Priority' },
            { value: 'title', label: 'Title' },
          ]}
        />
        <Button onClick={() => setShowForm(true)}>Add Task</Button>
      </div>
      <TaskList tasks={sortedTasks} />
      {showForm && <TaskForm onClose={() => setShowForm(false)} />}
    </div>
  );
}