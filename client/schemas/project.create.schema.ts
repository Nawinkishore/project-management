import { z } from "zod";

export const CreateProjectSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters"),
  description: z.string().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

export type CreateProjectInput = z.infer<
  typeof CreateProjectSchema
>;
