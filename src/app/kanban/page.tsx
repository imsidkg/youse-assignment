'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import TaskCard from '@/components/TaskCard';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useTaskContext } from '../context/TaskContext';
import { Task } from '../types/types';

const columns = [
  { id: 'todo', title: 'To Do' },
  { id: 'inprogress', title: 'In Progress' },
  { id: 'completed', title: 'Completed' }
] as const;

type ColumnType = typeof columns[number]['id'];

const KanbanPage: React.FC = () => {
  const { tasks, updateTask, loading } = useTaskContext();
  const [enabled, setEnabled] = useState(false);
  const [columnTasks, setColumnTasks] = useState<Record<ColumnType, Task[]>>({} as Record<ColumnType, Task[]>);

  useEffect(() => {
    const timeout = setTimeout(() => setEnabled(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const newColumnTasks = columns.reduce((acc, column) => {
      acc[column.id] = tasks.filter(task => task.status === column.title);
      return acc;
    }, {} as Record<ColumnType, Task[]>);
    setColumnTasks(newColumnTasks);
  }, [tasks]);

  const onDragEnd = useCallback((result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = columnTasks[source.droppableId as ColumnType];
    const destColumn = columnTasks[destination.droppableId as ColumnType];
    const draggedTask = sourceColumn.find(task => task._id === draggableId);

    if (!draggedTask) return;

    setColumnTasks(prev => {
      const newColumnTasks = { ...prev };
      newColumnTasks[source.droppableId as ColumnType] = sourceColumn.filter(task => task._id !== draggableId);
      newColumnTasks[destination.droppableId as ColumnType] = [
        ...destColumn.slice(0, destination.index),
        draggedTask,
        ...destColumn.slice(destination.index)
      ];
      return newColumnTasks;
    });

    const newStatus = columns.find(col => col.id === destination.droppableId)?.title;
    if (newStatus) {
      updateTask(draggableId, { status: newStatus });
    }
  }, [columnTasks, updateTask]);

  if (!enabled || loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4">
        {columns.map((column) => (
          <div key={column.id} className="flex-1 bg-gray-200 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">{column.title}</h2>
            <Droppable droppableId={column.id} key={column.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="min-h-[300px] md:min-h-[500px]"
                >
                  {columnTasks[column.id]?.map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`mb-2 p-2 md:p-4 ${snapshot.isDragging ? 'opacity-50' : ''} bg-white rounded-lg shadow`}
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
