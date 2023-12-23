import { z } from "zod";
import { userSchema } from "./user-validator";

export const gigSchema = z
  .object({
    _id: z.string().trim().toLowerCase(),
    userId: userSchema,
    category: z.string().trim().toLowerCase(),
    coverImage: z.string().trim().toLowerCase(),
    createdAt: z.string().trim().toLowerCase(),
    updatedAt: z.string().trim().toLowerCase(),
    deliveryTime: z.number(),
    description: z.string().trim().toLowerCase(),
    features: z.array(z.string().trim().toLowerCase()),
    images: z.array(z.string().trim().toLowerCase()),
    price: z.number(),
    revisionNumber: z.number(),
    sales: z.number(),
    shortDescription: z.string().trim().toLowerCase(),
    shortTitle: z.string().trim().toLowerCase(),
    starNumber: z.number(),
    title: z.string().trim().toLowerCase(),
    totalStars: z.number(),
    __v: z.number().optional()
  })
  .strict();

export const fromApiGigSchema = z
  .object({
    success: z.boolean(),
    gigs: z.array(gigSchema)
  })
  .strict();

export const deferredApiGigSchema = z
  .object({
    gigsPromise: z.promise(z.unknown())
  })
  .strict();
