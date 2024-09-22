import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useTaskContext } from '../context/TaskContext';
import TaskCard from '@/components/TaskCard';


const columns = ['To Do', 'In Progress', 'Completed'];

export default function KanbanPage() {
  const { tasks, updateTask } = useTaskContext();

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
}