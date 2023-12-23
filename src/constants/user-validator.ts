import { z } from "zod";

export const loaderDataUserSchema = z
  .object({
    user: z.object({
      id: z.string().trim().toLowerCase(),
      username: z.string().trim().toLowerCase(),
      email: z.string().trim().toLowerCase().email(),
      country: z.string().trim().toLowerCase(),
      isSeller: z.boolean(),
      image: z.string().trim().toLowerCase().optional()
    })
  })
  .strict();

export const userSchema = z
  .object({
    _id: z.string().trim().toLowerCase(),
    username: z.string().trim().toLowerCase(),
    email: z.string().trim().toLowerCase().email(),
    country: z.string().trim().toLowerCase(),
    isSeller: z.boolean(),
    image: z.string().trim().toLowerCase().optional()
  })
  .strict();

export const fromApiUserSchema = z
  .object({
    success: z.boolean(),
    user: z.object({
      id: z.string().trim().toLowerCase(),
      username: z.string().trim().toLowerCase(),
      email: z.string().trim().toLowerCase().email(),
      country: z.string().trim().toLowerCase(),
      isSeller: z.boolean(),
      image: z.string().trim().toLowerCase().optional()
    })
  })
  .strict();
