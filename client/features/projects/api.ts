import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import {
  ProjectsSchema,
  ProjectSchema,
  CreateProjectSchema,
  type CreateProjectInput,
} from "@/schemas/project.schema";

export const useGetProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await api.get("/projects");

      // optional but recommended: Zod validation
      return res.data;
    },
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateProjectInput) => {
      const validated = CreateProjectSchema.parse(input);
      const res = await api.post("/projects", validated);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
