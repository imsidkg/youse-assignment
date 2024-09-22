import React from 'react';


interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { deleteTask } = useTaskContext();

  const priorityColors = {
    Low: 'bg-blue-100 text-blue-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800',
  };

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
        <Button variant="outline" size="sm" onClick={() => {/* Implement edit logic */}}>
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