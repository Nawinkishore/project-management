import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import {
  CreateProjectSchema,
  CreateProjectInput,
} from "@/schemas/project.create.schema";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateProjectInput) => {
      const validated = CreateProjectSchema.parse(input);

      const res = await api.post("/projects", validated);
      return res.data;
    },

    onSuccess: () => {
      // refresh project list later
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
