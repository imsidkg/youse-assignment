// 'use client';
// import React, { useState } from 'react';
// import { useTaskContext } from '../context/TaskContext';
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
// import { Button } from '@/components/ui/button';
// import TaskList from '@/components/TaskList';
// import TaskForm from '@/components/TaskForm';
// import ProtectedRoute from '@/components/ProtectedRoute';

// const DashboardPage: React.FC = () => {
//   const { tasks, loading, error } = useTaskContext();
//   const [filter, setFilter] = useState('all');
//   const [sortBy, setSortBy] = useState('dueDate');
//   const [showForm, setShowForm] = useState(false);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!tasks) return <div>No tasks available</div>;

//   const filteredTasks = tasks.filter(task => {
//     if (filter === 'all') return true;
//     return task.status === filter;
//   });

//   const sortedTasks = [...filteredTasks].sort((a, b) => {
//     if (sortBy === 'dueDate') {
//       return new Date(a.dueDate || 0).getTime() - new Date(b.dueDate || 0).getTime();
//     }
//     return (a[sortBy as keyof typeof a] as string).localeCompare(b[sortBy as keyof typeof b] as string);
//   });

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
//       <div className="flex justify-between mb-4">
//         <Select onValueChange={(value) => setFilter(value)} defaultValue="all">
//           <SelectTrigger>
//             <SelectValue placeholder="Filter by status" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All</SelectItem>
//             <SelectItem value="To Do">To Do</SelectItem>
//             <SelectItem value="In Progress">In Progress</SelectItem>
//             <SelectItem value="Completed">Completed</SelectItem>
//           </SelectContent>
//         </Select>

//         <Select onValueChange={(value) => setSortBy(value)} defaultValue="dueDate">
//           <SelectTrigger>
//             <SelectValue placeholder="Sort by" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="dueDate">Due Date</SelectItem>
//             <SelectItem value="priority">Priority</SelectItem>
//             <SelectItem value="title">Title</SelectItem>
//           </SelectContent>
//         </Select>

//         <Button onClick={() => setShowForm(true)}>Create New Task</Button>
//       </div>
//       <TaskList tasks={sortedTasks} />
//       {showForm && (
//         <TaskForm 
//           onClose={() => setShowForm(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default ProtectedRoute(DashboardPage);


'use client';
import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import ProtectedRoute from '@/components/ProtectedRoute';

const DashboardPage: React.FC = () => {
  const { tasks, loading, error } = useTaskContext();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [showForm, setShowForm] = useState(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!tasks || !Array.isArray(tasks) || tasks.length === 0) return <div>No tasks available</div>;

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate || 0).getTime() - new Date(b.dueDate || 0).getTime();
    }
    return (a[sortBy as keyof typeof a] as string).localeCompare(b[sortBy as keyof typeof b] as string);
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
      <div className="flex justify-between mb-4">
        <Select onValueChange={(value) => setFilter(value)} defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="To Do">To Do</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setSortBy(value)} defaultValue="dueDate">
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dueDate">Due Date</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
            <SelectItem value="title">Title</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={() => setShowForm(true)}>Create New Task</Button>
      </div>
      <TaskList tasks={sortedTasks} />
      {showForm && (
        <TaskForm 
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default ProtectedRoute(DashboardPage);