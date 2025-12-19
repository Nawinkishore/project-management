import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import {
  TasksSchema,
  TaskSchema,
  CreateTaskSchema,
  UpdateTaskSchema,
  type CreateTaskInput,
  type UpdateTaskInput,
} from "@/schemas/task.schema";

export const useGetTasks = (projectId: number) => {
  return useQuery({
    queryKey: ["tasks", projectId],
    queryFn: async () => {
      const res = await api.get(`/tasks?projectId=${projectId}`);
      return TasksSchema.parse(res.data);
    },
    enabled: !!projectId,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateTaskInput) => {
      const validated = CreateTaskSchema.parse(input);
      const res = await api.post("/tasks", validated);
      return TaskSchema.parse(res.data);
    },
    onSuccess: (createdTask) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", createdTask.projectId],
      });
    },
  });
};

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateTaskInput) => {
      const validated = UpdateTaskSchema.parse(input);

      const res = await api.patch(
        `/tasks/${validated.taskId}/status`,
        { status: validated.status }
      );

      return TaskSchema.parse(res.data);
    },
    onSuccess: (updatedTask) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", updatedTask.projectId],
      });
    },
  });
};
