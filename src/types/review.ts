import { z } from "zod";

import {
  FromApiReviewSchema,
  FromApiReviewsSchema,
  ReviewSchema
} from "../constants/review-validator";

export type TFromApiReviews = z.infer<typeof FromApiReviewsSchema>;
export type TFromApiReview = z.infer<typeof FromApiReviewSchema>;
export type TReview = z.infer<typeof ReviewSchema>;
