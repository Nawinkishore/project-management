import { z } from "zod";
import { UserSchema } from "./user.schema";
import { CommentSchema } from "./comment.schema";
import { AttachmentSchema } from "./attachment.schema";
export const StatusEnum = z.enum([
  "To Do",
  "Work In Progress",
  "Under Review",
  "Completed",
]);

export const PriorityEnum = z.enum([
  "Urgent",
  "High",
  "Medium",
  "Low",
  "Backlog",
]);



export const TaskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  status: StatusEnum.nullable(),
  priority: PriorityEnum.nullable(),
  tags: z.string().nullable(),
  startDate: z.string().datetime().nullable(),
  dueDate: z.string().datetime().nullable(),
  points: z.number().nullable(),
  projectId: z.number(),
  authorUserId: z.number(),
  assignedUserId: z.number().nullable(),

  author: UserSchema.optional(),
  assignee: UserSchema.optional(),

  comments: z.array(CommentSchema).optional(),
  attachments: z.array(AttachmentSchema).optional(),
});


export const TasksSchema = z.array(TaskSchema);

export const CreateTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().nullable().optional(),
  status: StatusEnum.optional(),
  priority: PriorityEnum.optional(),
  tags: z.string().nullable().optional(),
  startDate: z.string().datetime().nullable().optional(),
  dueDate: z.string().datetime().nullable().optional(),
  points: z.number().nullable().optional(),
  projectId: z.number(),
  authorUserId: z.number(),
  assignedUserId: z.number().nullable().optional(),
});

export const UpdateTaskSchema = z.object({
    taskId: z.number(),
    status: StatusEnum,
});

export type Task = z.infer<typeof TaskSchema>;
export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskInput = z.infer<typeof UpdateTaskSchema>;