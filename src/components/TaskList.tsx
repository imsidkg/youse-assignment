import { useState, useEffect } from 'react';
import { getTasks } from '../lib/api';


const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksData = await getTasks();
      setTasks(tasksData);
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Task List</h2>
      <ul>
        {tasks.map((task: any) => (
          <li key={task._id}>
            <p>{task.title}</p>
            <p>{task.description}</p>
            <p>{task.status}</p>
            <p>{task.priority}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
