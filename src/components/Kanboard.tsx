import { getTasks, updateTaskStatus } from '@/lib/api';
import { useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface Task {
  _id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
}

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksData = await getTasks();
      setTasks(tasksData);
    };
    fetchTasks();
  }, []);

  const handleDrop = async (taskId: string, newStatus: string) => {
    await updateTaskStatus(taskId, newStatus);
    const updatedTasks = tasks.map(task =>
      task._id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  interface ColumnProps {
    status: string;
    children: React.ReactNode;
  }

  const Column: React.FC<ColumnProps> = ({ status, children }) => {
    const [, drop] = useDrop({
      accept: 'task',
      drop: (item: any) => handleDrop(item.taskId, status),
    });

    return (
      <div ref={drop} className="kanban-column">
        <h2>{status}</h2>
        {children}
      </div>
    );
  };

  return (
    <div className="kanban-board">
      <Column status="To Do">
        {tasks.filter(task => task.status === 'To Do').map(task => (
          <TaskCard key={task._id} task={task} />
        ))}
      </Column>
      <Column status="In Progress">
        {tasks.filter(task => task.status === 'In Progress').map(task => (
          <TaskCard key={task._id} task={task} />
        ))}
      </Column>
      <Column status="Completed">
        {tasks.filter(task => task.status === 'Completed').map(task => (
          <TaskCard key={task._id} task={task} />
        ))}
      </Column>
    </div>
  );
};

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [, drag] = useDrag({
    type: 'task',
    item: { taskId: task._id },
  });

  return (
    <div ref={drag} className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>{task.priority}</p>
    </div>
  );
};

export default KanbanBoard;
