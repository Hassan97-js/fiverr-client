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

// export const ExternalGigsSchema = z
//   .object({
//     gigsPromise: z.promise(z.unknown())
//   })
//   .strict();

// export const ExternalGigSchema = z
//   .object({
//     gigPromise: z.promise(z.unknown())
//   })
//   .strict();

/* {
  "success": true,
  "reviews": [
    {
      "_id": "658838cfd38f919bced8ab52",
      "gigId": "648613c63289c603d276d5f4",
      "userId": {
        "_id": "6507109b3d8ba35a119d9881",
        "username": "john",
        "email": "john@dev.com",
        "country": "Germany",
        "isSeller": false,
        "image": "https://res.cloudinary.com/fiverr-assets-cloud/image/upload/v1695902651/fiverr-assets/glvddccmcir3wnjvdvbi.jpg"
      },
      "starNumber": 4,
      "description": "This is my opinion (John)"
    }
  ]
} */
