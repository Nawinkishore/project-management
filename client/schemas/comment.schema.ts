import { z } from "zod";
import { UserSchema } from "./user.schema";

export const CommentSchema = z.object({
  id: z.number(),
  text: z.string(),
  taskId: z.number(),
  userId: z.number(),

  user: UserSchema.optional(),
});

export const CommentsSchema = z.array(CommentSchema);

export type Comment = z.infer<typeof CommentSchema>;
