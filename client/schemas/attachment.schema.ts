import { z } from "zod";
import { UserSchema } from "./user.schema";

export const AttachmentSchema = z.object({
  id: z.number(),
  fileURL: z.string().url(),
  fileName: z.string().nullable(),
  taskId: z.number(),
  uploadedById: z.number(),

  uploadedBy: UserSchema.optional(),
});

export const AttachmentsSchema = z.array(AttachmentSchema);

export type Attachment = z.infer<typeof AttachmentSchema>;
