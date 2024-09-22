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
//   if (!tasks || !Array.isArray(tasks) || tasks.length === 0) return <div>No tasks available</div>;

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



// 'use client';
// import React, { useState, useEffect } from 'react';
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

//   useEffect(() => {
//     console.log('DashboardPage mounted');
//     return () => console.log('DashboardPage unmounted');
//   }, []);

//   useEffect(() => {
//     console.log('Tasks updated:', tasks);
//   }, [tasks]);

//   console.log('Rendering DashboardPage', { loading, error, tasksLength: tasks?.length });

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   const filteredTasks = tasks && Array.isArray(tasks) 
//     ? tasks.filter(task => filter === 'all' || task.status === filter)
//     : [];

//   const sortedTasks = [...filteredTasks].sort((a, b) => {
//     if (sortBy === 'dueDate') {
//       return new Date(a.dueDate || 0).getTime() - new Date(b.dueDate || 0).getTime();
//     }
//     return (a[sortBy as keyof typeof a] as string).localeCompare(b[sortBy as keyof typeof b] as string);
//   });

//   const handleCreateTask = () => {
//     console.log('Create New Task button clicked');
//     setShowForm(true);
//   };

//   const handleCloseForm = () => {
//     console.log('TaskForm closed');
//     setShowForm(false);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
//       <div className="flex justify-between mb-4">
//         <Select onValueChange={(value) => setFilter(value)} defaultValue="all">
//           <SelectTrigger className="w-[180px]">
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
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Sort by" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="dueDate">Due Date</SelectItem>
//             <SelectItem value="priority">Priority</SelectItem>
//             <SelectItem value="title">Title</SelectItem>
//           </SelectContent>
//         </Select>

//         <Button 
//           onClick={handleCreateTask}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Create New Task
//         </Button>
//       </div>

//       {filteredTasks.length === 0 ? (
//         <div className="text-center py-4">No tasks available</div>
//       ) : (
//         <TaskList tasks={sortedTasks} />
//       )}

//       {showForm && (
//         <TaskForm onClose={handleCloseForm} />
//       )}
//     </div>
//   );
// };

// export default ProtectedRoute(DashboardPage);


// 'use client';
// import React, { useState, useEffect } from 'react';
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

//   useEffect(() => {
//     console.log('DashboardPage mounted');
//     return () => console.log('DashboardPage unmounted');
//   }, []);

//   useEffect(() => {
//     console.log('Tasks updated:', tasks);
//   }, [tasks]);

//   console.log('Rendering DashboardPage', { loading, error, tasksLength: tasks?.length });

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   const filteredTasks = Array.isArray(tasks) 
//     ? tasks.filter(task => filter === 'all' || task.status === filter)
//     : [];

//   const sortedTasks = [...filteredTasks].sort((a, b) => {
//     if (sortBy === 'dueDate') {
//       return new Date(a.dueDate || 0).getTime() - new Date(b.dueDate || 0).getTime();
//     }
//     return ((a[sortBy as keyof typeof a] as string) || '').localeCompare((b[sortBy as keyof typeof b] as string) || '');
//   });

//   const handleCreateTask = () => {
//     console.log('Create New Task button clicked');
//     setShowForm(true);
//   };

//   const handleCloseForm = () => {
//     console.log('TaskForm closed');
//     setShowForm(false);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
//       <div className="flex justify-between mb-4">
//         <Select onValueChange={(value) => setFilter(value)} defaultValue="all">
//           <SelectTrigger className="w-[180px]">
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
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Sort by" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="dueDate">Due Date</SelectItem>
//             <SelectItem value="priority">Priority</SelectItem>
//             <SelectItem value="title">Title</SelectItem>
//           </SelectContent>
//         </Select>

//         <Button 
//           onClick={handleCreateTask}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Create New Task
//         </Button>
//       </div>

//       {filteredTasks.length === 0 ? (
//         <div className="text-center py-4">No tasks available</div>
//       ) : (
//         <TaskList tasks={sortedTasks} />
//       )}

//       {showForm && (
//         <TaskForm onClose={handleCloseForm} />
//       )}
//     </div>
//   );
// };

// export default ProtectedRoute(DashboardPage);



// 'use client';
// import { useTaskContext } from '../context/TaskContext';

// export default function DashboardPage() {
//   const { tasks, loading, error } = useTaskContext();

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       {tasks.map(task => (
//         <div key={task._id}>{task.title}</div>
//       ))}
//     </div>
//   );
// }

// 'use client';
// import React from 'react';
// import { useTaskContext } from '../context/TaskContext';

// const DashboardPage: React.FC = () => {
//   const { tasks, loading, error } = useTaskContext();

//   console.log('Tasks in DashboardPage:', tasks); // Add this line for debugging

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   // Check if tasks is an array and has items
//   if (!Array.isArray(tasks) || tasks.length === 0) {
//     return <div>No tasks available</div>;
//   }

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       {tasks.map(task => (
//         <div key={task._id}>{task.title}</div>
//       ))}
//     </div>
//   );
// };

// export default DashboardPage;



// 'use client';
// import React, { useState } from 'react';
// import { useTaskContext } from '../context/TaskContext';
// import TaskCard from '@/components/TaskCard';
// import TaskForm from '@/components/TaskForm';

// export default function DashboardPage() {
//   const { tasks, loading, error, createTask, updateTask, deleteTask } = useTaskContext();
//   const [showForm, setShowForm] = useState(false);

//   if (loading) return <div>Loading tasks...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
//       <button 
//         onClick={() => setShowForm(true)}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
//       >
//         Add New Task
//       </button>
//       {showForm && (
//         <TaskForm 
//           onClose={() => setShowForm(false)}
//         />
//       )}
//       {tasks.length === 0 ? (
//         <p>No tasks available. Create a new task to get started!</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {tasks && tasks.map(task => (
//             <TaskCard
//               key={task._id} 
//               task={task} 
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useTaskContext } from '../context/TaskContext';
// import TaskCard from '@/components/TaskCard';
// import TaskForm from '@/components/TaskForm';

// export default function DashboardPage() {
//   const { tasks, loading, error, createTask, updateTask, deleteTask } = useTaskContext();
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     console.log('Tasks in DashboardPage:', tasks);
//     console.log('Loading state:', loading);
//     console.log('Error state:', error);
//   }, [tasks, loading, error]);

//   if (loading) return <div>Loading tasks...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
//       <button 
//         onClick={() => setShowForm(true)}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
//       >
//         Add New Task
//       </button>
//       {showForm && (
//         <TaskForm 
//           onClose={() => setShowForm(false)}
//         />
//       )}
//       {!tasks || tasks.length === 0 ? (
//         <p>No tasks available. Create a new task to get started!</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {tasks.map(task => (
//             <TaskCard
//               key={task._id} 
//               task={task} 
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


'use client';
import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';

export default function DashboardPage() {
  const { tasks, loading, error, createTask, updateTask, deleteTask } = useTaskContext();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    console.log('Tasks in DashboardPage:', tasks);
    console.log('Loading state:', loading);
    console.log('Error state:', error);
  }, [tasks, loading, error]);

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
      <button 
        onClick={() => setShowForm(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add New Task
      </button>
      {showForm && (
        <TaskForm 
          onClose={() => setShowForm(false)}
        />
      )}
      {Array.isArray(tasks) && tasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map(task => (
            <TaskCard
              key={task._id} 
              task={task} 
            />
          ))}
        </div>
      ) : (
        <p>No tasks available. Create a new task to get started!</p>
      )}
    </div>
  );
}
