import { z } from "zod";

export const ActionErrorSchema = z.object({
  hasError: z.boolean(),
  message: z.string().trim()
});
