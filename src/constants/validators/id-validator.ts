import { z } from "zod";

export const ObjectIdSchema = z.string().trim().toLowerCase().min(1).max(24, {
  message: "Object Id must be 24 characters long"
});

export type TObjectId = z.infer<typeof ObjectIdSchema>;
