import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import {
  TasksSchema,
  TaskSchema,
  CreateTaskSchema,
  type CreateTaskInput,
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

      // single task response
      return TaskSchema.parse(res.data);
    },
    onSuccess: (createdTask) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", createdTask.projectId],
      });
    },
  });
};
