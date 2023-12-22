import { z } from "zod";

export const loaderDataUserSchema = z.object({
  user: z.object({
    id: z.string(),
    username: z.string(),
    email: z.string().email(),
    country: z.string(),
    isSeller: z.boolean(),
    image: z.string().optional()
  })
});

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  country: z.string(),
  isSeller: z.boolean(),
  image: z.string().optional()
});

export const fromApiUserSchema = z.object({
  success: z.boolean(),
  user: z.object({
    id: z.string(),
    username: z.string(),
    email: z.string().email(),
    country: z.string(),
    isSeller: z.boolean(),
    image: z.string().optional()
  })
});
