"use client";

import { useGetTasks, useUpdateTaskStatus } from "@/features/tasks/api";
import { z } from "zod";
import { StatusEnum } from "@/schemas/task.schema";

type TaskStatus = z.infer<typeof StatusEnum>;

type BoardProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const taskStatus: TaskStatus[] = [
  "To Do",
  "Work In Progress",
  "Under Review",
  "Completed",
];

const Board = ({ id }: BoardProps) => {
  const { data: fetchTasks, isLoading , error} = useGetTasks(Number(id));
  const { mutate: updateTask } = useUpdateTaskStatus();

  const moveTask = (taskId: number, toStatus: TaskStatus) => {
    updateTask({ taskId, status: toStatus });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks</div>;

  return <div>{/* Kanban UI here */}</div>;
};

export default Board;
