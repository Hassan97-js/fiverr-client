import { z } from "zod";

import { UserSchema } from "./user-validator";
import { ObjectIdSchema } from "./id-validator";

export const GigSchema = z
  .object({
    _id: ObjectIdSchema,
    userId: z.union([UserSchema, ObjectIdSchema]),
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

export const FromApiGigsSchema = z
  .object({
    success: z.boolean(),
    gigs: z.array(GigSchema)
  })
  .strict();

export const FromApiGigSchema = z
  .object({
    success: z.boolean(),
    gig: GigSchema
  })
  .strict();

export const ExternalGigsSchema = z
  .object({
    gigsPromise: z.promise(z.unknown())
  })
  .strict();

export const ExternalGigSchema = z
  .object({
    gigPromise: z.promise(z.unknown())
  })
  .strict();
