// 'use client'
// import { useTaskContext } from '@/app/context/TaskContext';
// import { Task } from '@/app/types/types';
// import React from 'react';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
// import { Badge } from './ui/badge';
// import { Button } from './ui/button';


// interface TaskCardProps {
//   task: Task;
// }

// const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
//   const { deleteTask } = useTaskContext();

//   const priorityColors = {
//     Low: 'bg-blue-100 text-blue-800',
//     Medium: 'bg-yellow-100 text-yellow-800',
//     High: 'bg-red-100 text-red-800',
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>{task.title}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <p className="text-sm text-gray-600">{task.description}</p>
//         <div className="mt-2 flex items-center space-x-2">
//           <Badge variant="secondary">{task.status}</Badge>
//           <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
//         </div>
//         {task.dueDate && (
//           <p className="mt-2 text-sm text-gray-600">
//             Due: {new Date(task.dueDate).toLocaleDateString()}
//           </p>
//         )}
//       </CardContent>
//       <CardFooter className="flex justify-between">
//         <Button variant="outline" size="sm" onClick={() => {/* Implement edit logic */}}>
//           Edit
//         </Button>
//         <Button variant="destructive" size="sm" onClick={() => deleteTask(task._id)}>
//           Delete
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default TaskCard;


'use client'
import { useTaskContext } from '@/app/context/TaskContext';
import { Task } from '@/app/types/types';
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select } from './ui/select';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { updateTask, deleteTask } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const priorityColors = {
    Low: 'bg-blue-100 text-blue-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800',
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateTask(task._id, editedTask);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <Input
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          />
        </CardHeader>
        <CardContent>
          <Input
            value={editedTask.description || ''}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            placeholder="Description"
            className="mb-2"
          />
          <Select
            value={editedTask.status}
            onValueChange={(value) => setEditedTask({ ...editedTask, status: value as Task['status'] })}
            
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Select>
          <Select
            value={editedTask.priority}
            onValueChange={(value) => setEditedTask({ ...editedTask, priority: value as Task['priority'] })}
          
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Select>
          <Input
            type="date"
            value={editedTask.dueDate ? new Date(editedTask.dueDate).toISOString().split('T')[0] : ''}
            onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
            className="mb-2"
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm" onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" size="sm" onClick={handleCancel}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{task.description}</p>
        <div className="mt-2 flex items-center space-x-2">
          <Badge variant="secondary">{task.status}</Badge>
          <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
        </div>
        {task.dueDate && (
          <p className="mt-2 text-sm text-gray-600">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={() => deleteTask(task._id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;