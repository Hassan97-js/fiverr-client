import { z } from "zod";

import { ObjectIdSchema } from "./id-validator";

export const UserSchema = z
  .object({
    _id: ObjectIdSchema,
    username: z.string().trim().toLowerCase(),
    email: z.string().trim().toLowerCase().email(),
    country: z.string().trim().toLowerCase(),
    isSeller: z.boolean(),
    image: z.string().trim().toLowerCase().optional()
  })
  .strict();

export const ExternalUserSchema = z
  .object({
    user: UserSchema
  })
  .strict();

export const FromApiUserSchema = z
  .object({
    success: z.boolean(),
    user: UserSchema
  })
  .strict();
