"use client";
// data fetching
import { useGetTasks, useUpdateTaskStatus } from "@/features/tasks/api";

// ui and drag and drop
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card } from "@/components/ui/card";
import { EllipsisVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

// Schemas
import { z } from "zod";
import { StatusEnum, TaskSchema } from "@/schemas/task.schema";
import { format } from "date-fns";

import Image from "next/image";

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
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

type TaskProps = {
  task: Task;

}

const Task = ({ task }: TaskProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),

    }),
  }));

  const taskTags = task.tags ? task.tags.split(',') : [];
  const formattedStartDate = task.startDate ? format(new Date(task.startDate), "P") : '';
  const formattedDueDate = task.dueDate ? format(new Date(task.dueDate), "P") : '';
  const numberOfComments = (task.comments && task.comments.length) || 0;
  const PriorityTag = ({ priority }: { priority: Task["priority"] }) => {
    <div className={`rounded-full px-2 py-1 text-xs font-semibold
       ${priority === "Urgent" ? "bg-red-500 text-red-700" : priority === "High" ? "bg-orange-500 text-orange-700" : priority === "Medium" ? "bg-yellow-500 text-yellow-700" :
        priority === "Low" ? "bg-green-500 text-green-700" : priority === "Backlog" ? "bg-gray-500 text-gray-700" : ""}`}>
      {priority}
    </div>
  };

  return (
    <div 
    ref={(instance) => {
      drag(instance)
    }}
    className={`mb-4 rounded-md ${
      isDragging ? "opacity-50" : "opacity-100"}`}
    >
      {task.attachments && task.attachments.length > 0 && (
        <Image 
        src={`/${task.attachments[0].fileURL}`}
        alt={task.attachments[0].fileName as string}
        width={400}
        height={200}
        className="h-auto w-full rounded-t-md"
        />
      )}
    </div>
  )
}
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
