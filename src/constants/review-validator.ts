import { z } from "zod";

import { UserSchema } from "./user-validator";
import { GigSchema } from "./gig-validator";
import { ObjectIdSchema } from "./id-validator";

export const ReviewSchema = z
  .object({
    _id: ObjectIdSchema,
    gigId: z.union([GigSchema, ObjectIdSchema]),
    userId: z.union([UserSchema, ObjectIdSchema]),
    starNumber: z.number(),
    description: z.string(),
    __v: z.number().optional()
  })
  .strict();

export const FromApiReviewsSchema = z
  .object({
    success: z.boolean(),
    reviews: z.array(ReviewSchema)
  })
  .strict();

export const FromApiReviewSchema = z
  .object({
    success: z.boolean(),
    review: ReviewSchema
  })
  .strict();
