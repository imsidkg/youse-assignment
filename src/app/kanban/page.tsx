'use client'
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

import TaskCard from '@/components/TaskCard';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useTaskContext } from '../context/TaskContext';

const columns = ['To Do', 'In Progress', 'Completed'];

const KanbanPage: React.FC = () => {
  const { tasks, updateTask, loading } = useTaskContext();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setEnabled(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId as 'To Do' | 'In Progress' | 'Completed';
    updateTask(draggableId, { status: newStatus });
  };

  if (!enabled || loading) {
    return <div>Loading...</div>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4">
        {columns.map((column) => (
          <div key={column} className="flex-1">
            <h2 className="text-xl font-bold mb-2">{column}</h2>
            <Droppable droppableId={column}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-gray-100 p-4 rounded-lg min-h-[500px]"
                >
                  {tasks
                    .filter((task) => task.status === column)
                    .map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default ProtectedRoute(KanbanPage);