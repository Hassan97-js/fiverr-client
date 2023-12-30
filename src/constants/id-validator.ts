import { z } from "zod";

export const ObjectIdSchema = z.string().trim().toLowerCase().min(1).max(24);

export type TObjectId = z.infer<typeof ObjectIdSchema>;
