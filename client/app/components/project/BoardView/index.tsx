"use client";
// data fetching
import { useGetTasks, useUpdateTaskStatus } from "@/features/tasks/api";

// ui and drag and drop
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card } from "@/components/ui/card";
import {EllipsisVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

// Schemas
import { z } from "zod";
import { StatusEnum, TaskSchema } from "@/schemas/task.schema";
type TaskStatus = z.infer<typeof StatusEnum>;
type Task = z.infer<typeof TaskSchema>;


// Types
type BoardProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

type TaskColumnProps = {
  status: TaskStatus;
  tasks: Task[];
  moveTask: (taskId: number, toStatus: TaskStatus) => void;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const taskStatus: TaskStatus[] = [
  "To Do",
  "Work In Progress",
  "Under Review",
  "Completed",
];

const statusColorMap = {
  "To Do": "bg-red-500",
  "Work In Progress": "bg-yellow-500",
  "Under Review": "bg-blue-500",
  "Completed": "bg-green-500",
};


const TaskColumn = ({
  status,
  tasks,
  moveTask,
  setIsModalNewTaskOpen
}: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number }) => {
      moveTask(item.id, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <div
      ref={(instance) => {
        drop(instance)
      }}
      className={`rounded-lg p-3 transition-colors ${isOver ? "bg-blue-100" : ""
        }`}
    >
      {/* Column Header */}
      <div className="mb-3 flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <div className={`h-6 w-2 rounded ${statusColorMap[status]}`} />
          <h3 className="font-semibold text-sm">
            {status} <span className="text-muted-foreground">({filteredTasks.length})
            </span>
          </h3>
        </div>
        <div>
          <Button variant="ghost" size="icon">
            <EllipsisVertical /></Button>
          <Button variant="ghost" size="icon"
            onClick={() => setIsModalNewTaskOpen(true)}
          ><Plus /></Button>
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-2">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="p-3 text-sm shadow-sm ">
           <h1 className="text-muted-foreground">{task.title}</h1>
           <h2>{task.description}</h2>

          </Card>
        ))}
      </div>
    </div>
  );
};


const Board = ({ id, setIsModalNewTaskOpen }: BoardProps) => {

  const projectId = Number(id);
  const { data: tasks = [], isLoading, error } = useGetTasks(projectId);
  const { mutate: updateTask } = useUpdateTaskStatus();


  const moveTask = (taskId: number, toStatus: TaskStatus) => {
    updateTask({ taskId, status: toStatus });
  };

  if (isLoading) return <div>Loading...</div>;


  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
        {taskStatus.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks}
            moveTask={moveTask}
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          />
        ))}
      </div>
    </DndProvider>
  );
};


export default Board;
