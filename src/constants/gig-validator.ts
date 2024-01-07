import { z } from "zod";

import { UserSchema } from "./user-validator";
import { ObjectIdSchema } from "./id-validator";

export const GigSchema = z
  .object({
    _id: ObjectIdSchema,
    userId: z.union([UserSchema, ObjectIdSchema]),
    category: z.string().trim().toLowerCase(),
    coverImage: z.string().trim().toLowerCase().optional(),
    createdAt: z.coerce.date({
      required_error: "Please select a date and time",
      invalid_type_error: "That's not a date!"
    }),
    updatedAt: z.coerce.date({
      required_error: "Please select a date and time",
      invalid_type_error: "That's not a date!"
    }),
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

export const OptionalGigSchema = GigSchema.partial();

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

export const GigsPromiseSchema = z
  .object({
    gigsPromise: z.promise(z.unknown())
  })
  .strict();

export const PrivateGigsPromiseSchema = z
  .object({
    privateGigsPromise: z.promise(z.unknown())
  })
  .strict();

export const GigPromiseSchema = z
  .object({
    gigPromise: z.promise(z.unknown())
  })
  .strict();

export type TFromApiGigs = z.infer<typeof FromApiGigsSchema>;
export type TFromApiGig = z.infer<typeof FromApiGigSchema>;
export type TGig = z.infer<typeof GigSchema>;
export type TGigsPromise = z.infer<typeof GigsPromiseSchema>;
export type TPrivateGigsPromise = z.infer<typeof PrivateGigsPromiseSchema>;
export type TGigPromise = z.infer<typeof GigPromiseSchema>;
