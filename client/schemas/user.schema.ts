import { z } from "zod";

export const UserSchema = z.object({
  userId: z.number(),
  authId: z.string(),
  username: z.string(),
  profilePictureUrl: z.string().url().nullable(),
  teamId: z.number().nullable(),
});

export type User = z.infer<typeof UserSchema>;
